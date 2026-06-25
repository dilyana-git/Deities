import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import * as d3 from 'd3'
import { nodes as rawNodes, links as rawLinks } from '../data/mythology.js'
import { linkTypeConfig } from '../data/linkTypeConfig.js'
import { categoryConfig } from '../data/categoryConfig.js'

/* ── muted OKLCH palettes (matching atlas-core.js) ────────────────────── */
const CAT = {
  primordial : 'oklch(0.64 0.062 300)',
  titan      : 'oklch(0.70 0.060 75)',
  olympian   : 'oklch(0.66 0.058 250)',
  chthonic   : 'oklch(0.62 0.018 285)',
  monster    : 'oklch(0.62 0.078 25)',
  hero       : 'oklch(0.68 0.058 150)',
  sea_deity  : 'oklch(0.68 0.055 220)',
  nymph_minor: 'oklch(0.68 0.052 330)',
  mortal     : 'oklch(0.66 0.012 250)',
}

const LCOL = {
  parent_of       : 'oklch(0.56 0.012 270)',
  birthed         : 'oklch(0.62 0.052 150)',
  transformed_into: 'oklch(0.62 0.060 300)',
  cursed_into     : 'oklch(0.56 0.080 22)',
  created_by      : 'oklch(0.64 0.055 75)',
  lover_of        : 'oklch(0.64 0.062 12)',
  enemy_of        : 'oklch(0.60 0.090 25)',
  merged_with     : 'oklch(0.70 0.050 90)',
  split_from      : 'oklch(0.60 0.020 250)',
}

/* cluster anchor positions (fraction of canvas W×H) */
const ANCHOR = {
  primordial : [0.85, 0.30],
  chthonic   : [0.38, 0.72],
  titan      : [0.58, 0.45],
  olympian   : [0.31, 0.50],
  nymph_minor: [0.11, 0.20],
  mortal     : [0.09, 0.62],
  monster    : [0.28, 0.82],
  hero       : [0.42, 0.90],
  sea_deity  : [0.70, 0.74],
}

const CAT_LABEL = {
  primordial :'PRIMORDIALS', titan:'TITANS', olympian:'OLYMPIANS', chthonic:'CHTHONIC',
  monster    :'MONSTERS',    hero:'HEROES',  sea_deity:'SEA DEITIES',
  nymph_minor:'NYMPHS & MINOR', mortal:'MORTALS',
}

const LINK_DASH = {
  created_by: '2 4', split_from: '6 3 2 3', enemy_of: '5 3',
}

const W = 1200, H = 740

/* ════════════════════════════════════════════════════════════════════════
   SkyGraph — D3 celestial-atlas graph, exposed as an imperative React ref
   ════════════════════════════════════════════════════════════════════════ */
const SkyGraph = forwardRef(function SkyGraph({ onSelect }, ref) {
  const svgEl  = useRef(null)
  const apiRef = useRef(null)

  useImperativeHandle(ref, () => ({
    select           : (id, fly, opts) => apiRef.current?.select(id, fly, opts),
    clearSelection   : ()         => apiRef.current?.clearSelection(),
    flyTo            : (id, scale)=> apiRef.current?.flyTo(id, scale),
    resetView        : ()         => apiRef.current?.resetView(),
    highlightPath    : (ids)      => apiRef.current?.highlightPath(ids),
    clearPathHighlight: ()        => apiRef.current?.clearPathHighlight(),
    setTourLock      : (v)        => apiRef.current?.setTourLock(v),
    litEdge          : (a, b)     => apiRef.current?.litEdge(a, b),
    clearLitEdge     : ()         => apiRef.current?.clearLitEdge(),
  }))

  useEffect(() => {
    const el = svgEl.current
    if (!el) return

    /* ── data ───────────────────────────────────────────────────── */
    const nodes = rawNodes.map(n => ({ ...n }))
    const byId  = Object.fromEntries(nodes.map(n => [n.id, n]))
    const links = rawLinks
      .filter(l => byId[l.source] && byId[l.target])
      .map(l => ({ ...l }))

    /* adjacency + degree (renown) */
    const adj = {}
    nodes.forEach(n => (adj[n.id] = new Set()))
    links.forEach(l => { adj[l.source].add(l.target); adj[l.target].add(l.source) })
    nodes.forEach(n => { n.degree = adj[n.id].size })
    const maxDeg = Math.max(...nodes.map(n => n.degree))
    nodes.forEach(n => { n.prom = Math.sqrt(n.degree) / Math.sqrt(maxDeg) })
    /* node size scales with connection count (renown). The wider range and
       steeper exponent make hubs (Zeus, Gaia) dramatically larger while leaf
       stars stay small — the hierarchy reads instantly across the field. */
    const radius = n => 4 + Math.pow(n.prom, 1.4) * 22

    /* ── birth-order generation (BFS along parent_of / birthed edges) ── */
    const childAdj = {}
    nodes.forEach(n => (childAdj[n.id] = []))
    links.forEach(l => {
      if (l.type === 'parent_of' || l.type === 'birthed')
        childAdj[l.source].push(l.target)
    })
    const gen = {}
    const roots = nodes.filter(n => n.category === 'primordial').map(n => n.id)
    const queue = roots.map(id => ({ id, g: 0 }))
    roots.forEach(id => (gen[id] = 0))
    while (queue.length) {
      const { id, g } = queue.shift()
      for (const cid of childAdj[id]) {
        if (gen[cid] == null) { gen[cid] = g + 1; queue.push({ id: cid, g: g + 1 }) }
      }
    }
    const maxGen = Math.max(...Object.values(gen), 1)
    nodes.forEach(n => {
      if (gen[n.id] == null) gen[n.id] = maxGen + 1
    })
    const genOrder = nodes.slice().sort((a, b) => gen[a.id] - gen[b.id] || a.id.localeCompare(b.id))
    const birthRank = {}
    genOrder.forEach((n, i) => (birthRank[n.id] = i))

    /* ── svg scaffold ───────────────────────────────────────────── */
    const svg = d3.select(el)
    svg.selectAll('*').remove()
    svg.attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet')

    const defs = svg.append('defs')
    const flt  = defs.append('filter').attr('id','glow').attr('x','-80%').attr('y','-80%').attr('width','260%').attr('height','260%')
    flt.append('feGaussianBlur').attr('stdDeviation', 3.2).attr('result','b')
    const fm = flt.append('feMerge')
    fm.append('feMergeNode').attr('in','b')
    fm.append('feMergeNode').attr('in','SourceGraphic')

    /* trace-dot glow — tighter blur for the lineage-trace traveling dots */
    const tFlt = defs.append('filter').attr('id','trace-glow').attr('x','-200%').attr('y','-200%').attr('width','500%').attr('height','500%')
    tFlt.append('feGaussianBlur').attr('stdDeviation', 4).attr('result','b')
    const tFm = tFlt.append('feMerge')
    tFm.append('feMergeNode').attr('in','b')
    tFm.append('feMergeNode').attr('in','SourceGraphic')

    /* circular clip path per node for portrait images */
    defs.selectAll('.node-clip')
      .data(nodes)
      .join('clipPath')
      .attr('class', 'node-clip')
      .attr('id', d => `clip-${d.id}`)
      .append('circle')
      .attr('r', d => radius(d))

    const zoomLayer    = svg.append('g').attr('class','zoom')

    /* ── depth haze: a faint nebula gradient that drifts behind everything ── */
    const hazeLayer = zoomLayer.append('g').attr('class','haze-layer')
    const hazeGrad = defs.append('radialGradient').attr('id', 'haze-grad')
      .attr('cx', '50%').attr('cy', '50%').attr('r', '50%')
    hazeGrad.append('stop').attr('offset', '0%').attr('stop-color', '#2a1a3a').attr('stop-opacity', 0.35)
    hazeGrad.append('stop').attr('offset', '55%').attr('stop-color', '#1a2436').attr('stop-opacity', 0.15)
    hazeGrad.append('stop').attr('offset', '100%').attr('stop-color', '#06080e').attr('stop-opacity', 0)
    hazeLayer.append('ellipse')
      .attr('class', 'depth-haze')
      .attr('cx', W * 0.55).attr('cy', H * 0.45)
      .attr('rx', W * 0.7).attr('ry', H * 0.6)
      .attr('fill', 'url(#haze-grad)')
      .attr('opacity', 0.4)

    /* background stars sit inside their own slow-drift wrapper so they
       move at a different speed from the constellation field — parallax depth */
    const bgDrift      = zoomLayer.append('g').attr('class','bg-drift')
    const bgLayer      = bgDrift.append('g').attr('class','bg')
    /* celestial-rotate wraps the entire constellation field in a very slow
       rotation (~3° over 2 min) so the sky feels alive even untouched.
       The bg stars drift on a DIFFERENT period (bg-drift), creating a
       two-layer parallax: background lags behind foreground. */
    const celestialRotate = zoomLayer.append('g').attr('class','celestial-rotate')
    const floatYLayer  = celestialRotate.append('g').attr('class','float-y')
    const floatXLayer  = floatYLayer.append('g').attr('class','float-x')
    const clusterLayer = floatXLayer.append('g').attr('class','clusters')
    const linkLayer    = floatXLayer.append('g').attr('class','links')
    const traceLayer   = floatXLayer.append('g').attr('class','traces')
    const linkLabelLayer = floatXLayer.append('g').attr('class','link-labels')
    const nodeLayer    = floatXLayer.append('g').attr('class','nodes')

    /* enriched background starfield — three tiers:
       1. faint dust (many tiny dots, low opacity) for depth
       2. mid-field stars (varied sizes, warm/cool tint)
       3. bright flares (large blurred halos that twinkle)
       More stars toward the center via a mild radial density gradient. */
    let _s = 7
    const rnd = () => { _s = (_s * 1103515245 + 12345) & 0x7fffffff; return _s / 0x7fffffff }
    const big = Math.max(W, H) * 2.2
    const TINTS = ['#d6dce8', '#c8c0b8', '#b8c4d8', '#e0d8c8', '#c0c8d6', '#d8ccc0']
    const starData = d3.range(420).map(() => {
      const x = -big * 0.3 + rnd() * big
      const y = -big * 0.3 + rnd() * big
      const distFromCenter = Math.sqrt((x - W/2)**2 + (y - H/2)**2) / (big * 0.5)
      const depthBias = Math.max(0, 1 - distFromCenter * 0.6)
      const r = 0.25 + rnd() * 0.6 + depthBias * rnd() * 0.9
      const o = 0.12 + rnd() * 0.3 + depthBias * rnd() * 0.32
      const tint = TINTS[Math.floor(rnd() * TINTS.length)]
      return { x, y, r, o, tint }
    })
    const flareStars = starData.filter(d => d.o > 0.48)

    bgLayer.selectAll('circle.flare')
      .data(flareStars)
      .join('circle')
      .attr('class', 'flare')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r',    d => d.r * 5.5)
      .attr('fill', d => d.tint)
      .attr('filter', 'url(#glow)')
      .style('--flare-peak',  d => (0.28 + d.o * 0.55).toFixed(2))
      .style('--flare-dur',   () => `${(1.5 + rnd() * 2.0).toFixed(2)}s`)
      .style('--flare-delay', () => `-${(rnd() * 6).toFixed(2)}s`)

    bgLayer.selectAll('circle.star')
      .data(starData)
      .join('circle')
      .attr('class', d => 'star' + (rnd() < 0.15 ? ' star-shimmer' : ''))
      .attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => d.r)
      .attr('fill', d => d.tint).attr('opacity', d => d.o)
      .filter('.star-shimmer')
      .style('--shimmer-base', d => d.o.toFixed(3))
      .style('--shimmer-dur', () => `${(3 + rnd() * 4).toFixed(2)}s`)
      .style('--shimmer-delay', () => `-${(rnd() * 7).toFixed(2)}s`)

    /* ── shooting stars: a rare meteor every 20-40s ─────────────── */
    const meteorLayer = bgDrift.append('g').attr('class', 'meteors')
    let _meteorTimer = null
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function spawnMeteor() {
      if (document.hidden || reduced) {
        _meteorTimer = setTimeout(spawnMeteor, 5000)
        return
      }
      const delay = 20000 + Math.random() * 20000
      _meteorTimer = setTimeout(() => {
        const edge = Math.floor(Math.random() * 4)
        let sx, sy, angle
        if (edge === 0) { sx = Math.random() * big; sy = -big * 0.2; angle = 0.3 + Math.random() * 0.5 }
        else if (edge === 1) { sx = big; sy = Math.random() * big * 0.5; angle = Math.PI * 0.55 + Math.random() * 0.4 }
        else if (edge === 2) { sx = Math.random() * big; sy = big * 0.8; angle = -0.5 + Math.random() * 0.3 }
        else { sx = -big * 0.15; sy = Math.random() * big * 0.4; angle = -0.2 + Math.random() * 0.4 }
        const len = 80 + Math.random() * 160
        const ex = sx + Math.cos(angle) * len
        const ey = sy + Math.sin(angle) * len
        const grad = defs.append('linearGradient')
          .attr('id', 'mg-' + Date.now())
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', sx).attr('y1', sy).attr('x2', ex).attr('y2', ey)
        grad.append('stop').attr('offset', '0%').attr('stop-color', '#fff').attr('stop-opacity', 0)
        grad.append('stop').attr('offset', '40%').attr('stop-color', '#e8dcc8').attr('stop-opacity', 0.7)
        grad.append('stop').attr('offset', '100%').attr('stop-color', '#fff').attr('stop-opacity', 0.9)
        const gId = grad.attr('id')
        const line = meteorLayer.append('line')
          .attr('x1', sx).attr('y1', sy).attr('x2', sx).attr('y2', sy)
          .attr('stroke', `url(#${gId})`)
          .attr('stroke-width', 1.2 + Math.random() * 0.8)
          .attr('stroke-linecap', 'round')
          .attr('opacity', 0)
        const dur = 350 + Math.random() * 250
        line.transition().duration(dur * 0.15).attr('opacity', 0.8)
          .transition().duration(dur)
          .attr('x1', ex).attr('y1', ey)
          .attr('x2', ex + Math.cos(angle) * len * 0.4)
          .attr('y2', ey + Math.sin(angle) * len * 0.4)
          .transition().duration(dur * 0.3)
          .attr('opacity', 0)
          .on('end', () => { line.remove(); grad.remove() })
        spawnMeteor()
      }, delay)
    }
    spawnMeteor()

    /* initial positions — cluster anchors + jitter */
    nodes.forEach(n => {
      const a = ANCHOR[n.category] || [0.5, 0.5]
      n.ax = a[0]; n.ay = a[1]
      n.x  = a[0] * W + (Math.random() - 0.5) * 120
      n.y  = a[1] * H + (Math.random() - 0.5) * 120
    })

    /* cluster-pull force */
    function clusterForce(strength) {
      let ns
      function force(alpha) {
        const k = strength * alpha
        for (const n of ns) { n.vx += (n.ax * W - n.x) * k; n.vy += (n.ay * H - n.y) * k }
      }
      force.initialize = _ => (ns = _)
      return force
    }

    /* ── simulation ─────────────────────────────────────────────── */
    const sim = d3.forceSimulation(nodes)
      .force('link',    d3.forceLink(links).id(d => d.id).distance(66).strength(0.23))
      .force('charge',  d3.forceManyBody().strength(-250).distanceMax(480))
      .force('cluster', clusterForce(0.065))
      .force('collide', d3.forceCollide().radius(d => radius(d) + 26).strength(0.92))
      .alpha(1).alphaDecay(0.028)

    /* ── links ──────────────────────────────────────────────────── */
    const NEUTRAL_EDGE = 'oklch(0.45 0.005 270)'
    const linkSel = linkLayer.selectAll('path').data(links).join('path')
      .attr('class', 'link')
      .attr('stroke', NEUTRAL_EDGE)
      .attr('stroke-width', 0.7)
      .attr('stroke-linecap', 'round')
      .attr('fill', 'none')
      .attr('opacity', 0)
      .attr('data-type-color', d => LCOL[d.type] || '#555')
      .attr('data-type-dash', d => LINK_DASH[d.type] || '')

    /* ── cluster labels ─────────────────────────────────────────── */
    const cats       = [...new Set(nodes.map(n => n.category))]
    const clusterSel = clusterLayer.selectAll('text').data(cats).join('text')
      .attr('class', 'cluster-label')
      .attr('text-anchor', 'middle')
      .attr('opacity', 0)
      .text(c => CAT_LABEL[c] || c)

    /* Densest-sub-blob anchoring + mutual de-collision (computed every tick,
       cheap — see below). Several categories are spatially multi-modal (e.g.
       `chthonic`: Hades sits among the Olympians while the dream-gods cluster
       by Nyx), so a plain centroid lands the label in empty space between the
       two groups. Instead each label anchors over its category's main mass —
       the member with the most same-category neighbours within CLUSTER_R, plus
       that blob — then overlapping label boxes are separated with a spring
       back to their anchor so de-collision can't carry a label away from the
       cluster it names. */
    const CLUSTER_R = 95
    const LABEL_PAD = 16, LABEL_H = 24
    const labelSize = new Map()
    clusterSel.each(function(c) {
      labelSize.set(c, { w: this.getComputedTextLength() + LABEL_PAD, h: LABEL_H })
    })
    const labelPos  = new Map()
    const catNodes  = new Map(cats.map(c => [c, nodes.filter(n => n.category === c)]))

    /* ── nodes ──────────────────────────────────────────────────── */
    /* hub-only labels at default zoom: only the top ~10 most-connected figures
       get visible labels initially. The rest appear on zoom-in (CSS rule on
       #sky.zoomed-in) or on hover/selection. The threshold is set dynamically
       so it always picks roughly 10-12 hubs regardless of data changes. */
    const promValues = nodes.map(n => n.prom).sort((a, b) => b - a)
    const hubThreshold = promValues[Math.min(11, promValues.length - 1)] || 0.4

    const gNode = nodeLayer.selectAll('g').data(nodes).join('g')
      .attr('class', 'node')
      .classed('prominent', d => d.prom >= hubThreshold)
      .classed('mid-label', d => d.prom > 0.3 && d.prom < hubThreshold)
      .classed('nolabel',   d => d.degree === 0)
      .style('cursor', 'pointer')
      .on('click',      (e, d) => { e.stopPropagation(); api.select(d.id, true) })
      .on('mouseenter', (e, d) => hoverOn(d))
      .on('mouseleave', ()     => hoverOff())
      .call(d3.drag()
        .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.18).restart(); d.fx = d.x; d.fy = d.y })
        .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; d.x = e.x; d.y = e.y; ticked() })
        .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null }))

    /* hub breathing — the top ~5 nodes are gravitational centers; they get a
       dedicated slow pulse (radius + opacity over ~4s) that reads as a beacon
       even before any interaction. Separate from the general twinkle. */
    const hubBreathThreshold = promValues[Math.min(5, promValues.length - 1)] || 0.6

    gNode.append('circle').attr('class','glow')
      .attr('r',        d => radius(d) * 1.25)
      .attr('fill',     d => CAT[d.category])
      .attr('opacity',  d => 0.07 + d.prom * 0.14)
      .attr('filter',   d => d.prom > 0.65 ? 'url(#glow)' : null)
      .classed('hub-breath', d => d.prom >= hubBreathThreshold)
      .style('--glow-base',     d => (0.07 + d.prom * 0.14).toFixed(3))
      .style('--glow-r',        d => (radius(d) * 1.25).toFixed(1))
      .style('--glow-r-peak',   d => (radius(d) * 1.5).toFixed(1))
      .style('--twinkle-dur',   () => `${(4.5 + rnd() * 4.5).toFixed(2)}s`)
      .style('--twinkle-delay', () => `-${(rnd() * 7).toFixed(2)}s`)
      .style('--breath-dur',    () => `${(3.5 + rnd() * 1.5).toFixed(2)}s`)
      .style('--breath-delay',  () => `-${(rnd() * 5).toFixed(2)}s`)

    gNode.append('circle').attr('class','core')
      .attr('r',       d => radius(d))
      .attr('fill',    '#ece6d6')
      .attr('opacity', d => 0.72 + d.prom * 0.28)

    /* head portrait — clipped to the node circle */
    gNode.append('image')
      .attr('href',               d => `/portraits/${d.id}-head.webp`)
      .attr('x',                  d => -radius(d))
      .attr('y',                  d => -radius(d))
      .attr('width',              d => radius(d) * 2)
      .attr('height',             d => radius(d) * 2)
      .attr('clip-path',          d => `url(#clip-${d.id})`)
      .attr('preserveAspectRatio','xMidYMid slice')
      .attr('opacity', 0.95)
      .on('error', function(_, d) {
        const el = d3.select(this)
        const chain = [
          `/portraits/${d.id}-head.webp`,
          `/portraits/${d.id}-head.png`,
          `/portraits/${d.id}-full.webp`,
          `/portraits/${d.id}-full.png`,
        ]
        const i = +(el.attr('data-fb') || 0) + 1
        el.attr('data-fb', i)
        if (i < chain.length) el.attr('href', chain[i])
        else el.remove()
      })

    gNode.append('circle').attr('class','ring')
      .attr('r',            d => radius(d) + 0.5)
      .attr('fill',         'none')
      .attr('stroke',       d => CAT[d.category])
      .attr('stroke-width', 0.8)
      .attr('opacity',      0.55)

    /* gold pulse ring — invisible until the node has `.selected`, then the
       CSS animation kicks in. The ring sits outside the category ring. */
    gNode.append('circle').attr('class','sel-ring')
      .attr('r',            d => radius(d) + 3)
      .attr('fill',         'none')
      .attr('stroke',       '#cdb88a')
      .attr('stroke-width', 1.2)
      .attr('opacity',      0)

    gNode.append('text').attr('class','node-label')
      .attr('x', d => radius(d) + 6).attr('y', 4)
      .text(d => d.name)

    /* ── label placement — avoid overlapping nearby nodes ─────── */
    function assignLabelSides() {
      const labelW = 60
      gNode.each(function (d) {
        const r = radius(d)
        let rightBlocked = false
        for (const other of nodes) {
          if (other.id === d.id) continue
          const dx = other.x - d.x, dy = other.y - d.y
          const ro = radius(other)
          if (dx > -ro && dx < r + labelW + ro && Math.abs(dy) < ro + 8) {
            rightBlocked = true
            break
          }
        }
        const side = rightBlocked ? -1 : 1
        d._labelSide = side
        const g = d3.select(this)
        g.select('.node-label')
          .attr('x', side > 0 ? r + 6 : -(r + 6))
          .attr('text-anchor', side > 0 ? 'start' : 'end')
      })
    }

    /* ── tick ───────────────────────────────────────────────────── */
    let _tickCount = 0

    function updateClusterLabels() {
      const anchor = new Map()
      for (const c of cats) {
        const ms = catNodes.get(c)
        if (!ms.length) continue
        let best = ms[0], bestCount = -1
        for (const m of ms) {
          let cnt = 0
          for (const n of ms) {
            if (n === m) continue
            const dx = n.x - m.x, dy = n.y - m.y
            if (dx * dx + dy * dy <= CLUSTER_R * CLUSTER_R) cnt++
          }
          if (cnt > bestCount) { bestCount = cnt; best = m }
        }
        const blob = ms.filter(n => {
          const dx = n.x - best.x, dy = n.y - best.y
          return dx * dx + dy * dy <= CLUSTER_R * CLUSTER_R
        })
        anchor.set(c, { x: d3.mean(blob, n => n.x), y: d3.min(blob, n => n.y) - 26 })
      }

      for (const c of cats) {
        if (!labelPos.has(c)) labelPos.set(c, { ...anchor.get(c) })
      }
      for (let iter = 0; iter < 80; iter++) {
        let moved = false
        for (const c of cats) {
          const p = labelPos.get(c), a = anchor.get(c)
          const dx = (a.x - p.x) * 0.15, dy = (a.y - p.y) * 0.15
          if (Math.abs(dx) > 0.02 || Math.abs(dy) > 0.02) moved = true
          p.x += dx; p.y += dy
        }
        for (let i = 0; i < cats.length; i++) {
          for (let j = i + 1; j < cats.length; j++) {
            const pi = labelPos.get(cats[i]), pj = labelPos.get(cats[j])
            const bi = labelSize.get(cats[i]), bj = labelSize.get(cats[j])
            const dx = pj.x - pi.x, dy = pj.y - pi.y
            const ox = (bi.w + bj.w) / 2 - Math.abs(dx)
            const oy = (bi.h + bj.h) / 2 - Math.abs(dy)
            if (ox > 0 && oy > 0) {
              moved = true
              if (ox < oy) {
                const shift = ox / 2 * (Math.sign(dx) || 1)
                pi.x -= shift; pj.x += shift
              } else {
                const shift = oy / 2 * (Math.sign(dy) || 1)
                pi.y -= shift; pj.y += shift
              }
            }
          }
        }
        if (!moved) break
      }

      for (const c of cats) {
        const p = labelPos.get(c), b = labelSize.get(c)
        p.x = Math.min(Math.max(p.x, b.w / 2), W - b.w / 2)
        p.y = Math.min(Math.max(p.y, b.h / 2), H - b.h / 2)
      }

      clusterSel.attr('x', c => labelPos.get(c).x).attr('y', c => labelPos.get(c).y)
    }

    function ticked() {
      linkSel.attr('d', d => {
        const sx = d.source.x, sy = d.source.y, tx = d.target.x, ty = d.target.y
        const dx = tx - sx, dy = ty - sy
        const len = Math.sqrt(dx * dx + dy * dy) || 1
        const off = Math.min(len * 0.12, 14)
        const mx = (sx + tx) / 2 - (dy / len) * off
        const my = (sy + ty) / 2 + (dx / len) * off
        return `M${sx},${sy}Q${mx},${my} ${tx},${ty}`
      })
      gNode.attr('transform', d => `translate(${d.x},${d.y})`)

      if (++_tickCount % 8 === 0) updateClusterLabels()

      if (!linkLabelLayer.selectAll('text').empty()) positionEdgeLabels()
    }

    /* Pre-settle the layout off-screen, then STOP. Holding the sim "warm" used to
       rewrite every edge path + node transform on every frame, forever — that
       starved the main thread and made interaction janky. The layout is fixed
       after the pre-settle; gentle perpetual motion now comes from the GPU-cheap
       CSS float layers instead. A drag re-energises the sim; it then cools to rest. */
    sim.stop()
    for (let i = 0; i < 160; i++) sim.tick()
    updateClusterLabels()
    assignLabelSides()
    ticked()
    sim.on('tick', ticked)
    /* no warm restart — the sim idles (no per-frame DOM churn) until a drag wakes it */

    /* birth-order entrance is handled by the cosmogony ignition below */

    /* ── zoom / pan ─────────────────────────────────────────────── */
    const zoom = d3.zoom().scaleExtent([0.35, 4.5])
      .on('zoom', e => {
        zoomLayer.attr('transform', e.transform)
        svg.classed('zoomed-mid', e.transform.k > 1.0)
        svg.classed('zoomed-in', e.transform.k > 1.7)
        /* cluster labels dim as you zoom in (individual names take over) */
        const clOp = e.transform.k > 1.7 ? 0.12 : e.transform.k > 1.0 ? 0.28 : 0.45
        clusterSel.attr('opacity', clOp)
      })
    svg.call(zoom).on('dblclick.zoom', null)
    svg.on('click', () => api.clearSelection())

    /* pause CSS animations AND the warm sim when the tab is hidden — the sim
       would otherwise tick forever in the background, wasting CPU */
    const handleVisibility = () => {
      svg.classed('paused', document.hidden)
      if (document.hidden) sim.stop()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    /* fit view — fill ~80% of the viewport (tight padding) */
    function fitView(animate = true) {
      const pad = 36
      const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y)
      const x0 = Math.min(...xs), x1 = Math.max(...xs)
      const y0 = Math.min(...ys), y1 = Math.max(...ys)
      const bw = x1 - x0, bh = y1 - y0
      if (!(bw > 0 && bh > 0)) return
      const k = Math.min((W - pad * 2) / bw, (H - pad * 2) / bh, 1.3)
      if (!isFinite(k) || k <= 0) return
      const tx = W / 2 - k * (x0 + bw / 2), ty = H / 2 - k * (y0 + bh / 2)
      if (animate) {
        svg.transition().duration(900).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k))
      } else {
        svg.call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k))
      }
    }

    /* ── cosmogony ignition ────────────────────────────────────────
       The cosmos builds itself generationally. Starfield emerges from
       black; Chaos sparks first, then the Primordials, Titans, Olympians
       — each generation's nodes flare into existence with sparkle
       particles, edges trace glowing lines from parent to child. The
       camera starts over-zoomed and eases out with gentle overshoot.
       Skippable on any interaction. */

    const CAT_WAVE = {
      primordial: 1, titan: 2, olympian: 3, chthonic: 3,
      sea_deity: 4, nymph_minor: 4, monster: 5, hero: 5, mortal: 5,
    }
    const WAVE_MS = [500, 1600, 3000, 4200, 5200, 6000]
    const WAVE_LABEL = ['', 'PRIMORDIALS', 'TITANS', 'OLYMPIANS', 'THE SEA & THE WILD', 'HEROES & MONSTERS']
    nodes.forEach(n => { n._wave = n.id === 'chaos' ? 0 : (CAT_WAVE[n.category] ?? 5) })

    /* compute resting transform, then start 20% over-zoomed */
    const _xs = nodes.map(n => n.x), _ys = nodes.map(n => n.y)
    const _x0 = Math.min(..._xs), _x1 = Math.max(..._xs)
    const _y0 = Math.min(..._ys), _y1 = Math.max(..._ys)
    const _bw = _x1 - _x0, _bh = _y1 - _y0
    const restK = (_bw > 0 && _bh > 0)
      ? Math.min((W - 72) / _bw, (H - 72) / _bh, 1.3)
      : 1
    const _cx = _x0 + _bw / 2, _cy = _y0 + _bh / 2
    const startK = restK * 1.20
    const restTx  = d3.zoomIdentity.translate(W / 2 - restK  * _cx, H / 2 - restK  * _cy).scale(restK)
    const startTx = d3.zoomIdentity.translate(W / 2 - startK * _cx, H / 2 - startK * _cy).scale(startK)

    /* sparkle layer for ignition particles */
    const sparkLayer = floatXLayer.append('g').attr('class', 'sparks').attr('pointer-events', 'none')
    /* generation title layer */
    const genTitleLayer = zoomLayer.append('g').attr('class', 'gen-titles').attr('pointer-events', 'none')

    /* initial state: starfield dim, everything else invisible */
    svg.call(zoom.transform, startTx)
    bgLayer.attr('opacity', 0)
    linkLayer.attr('opacity', 1)
    nodeLayer.attr('opacity', 1)
    clusterLayer.attr('opacity', 1)
    clusterSel.attr('opacity', 0)
    gNode.attr('opacity', 0)

    /* edges: hidden via dashoffset, golden during draw-in */
    linkSel
      .attr('stroke-dasharray', 2000)
      .attr('stroke-dashoffset', 2000)
      .attr('opacity', 0.22)

    /* bloom overlay — fades with parallax */
    const bloom = zoomLayer.append('rect')
      .attr('width', W * 4).attr('height', H * 4)
      .attr('x', -W * 1.5).attr('y', -H * 1.5)
      .attr('fill', '#0e1220').attr('opacity', 0.22)
      .attr('pointer-events', 'none')

    let _ignitionDone = false

    /* sparkle burst — spawn small gold circles that scatter outward */
    function spawnSparks(x, y, count, r) {
      if (_ignitionDone) return
      const sparks = d3.range(count).map(() => {
        const angle = Math.random() * Math.PI * 2
        const dist  = (r + 4) + Math.random() * (r * 2.5 + 10)
        return { sx: x, sy: y, ex: x + Math.cos(angle) * dist, ey: y + Math.sin(angle) * dist }
      })
      sparkLayer.selectAll(null).data(sparks).join('circle')
        .attr('cx', d => d.sx).attr('cy', d => d.sy)
        .attr('r', 1.0 + Math.random() * 0.8)
        .attr('fill', '#e8d5a0')
        .attr('opacity', 0.85)
        .attr('filter', 'url(#glow)')
        .transition('spark').duration(500 + Math.random() * 300)
        .ease(d3.easeCubicOut)
        .attr('cx', d => d.ex).attr('cy', d => d.ey)
        .attr('opacity', 0)
        .attr('r', 0.2)
        .on('end', function () { d3.select(this).remove() })
    }

    /* phase 1: starfield materialises from black */
    bgLayer.transition('ign').duration(1200).delay(100)
      .ease(d3.easeCubicOut)
      .attr('opacity', 1)

    /* phase 2: generation title flashes */
    WAVE_LABEL.forEach((label, i) => {
      if (!label) return
      const title = genTitleLayer.append('text')
        .attr('class', 'genesis-title')
        .attr('x', W / 2).attr('y', H / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('opacity', 0)
        .text(label)
      title.transition('ign').duration(400).delay(WAVE_MS[i] - 200)
        .attr('opacity', 0.5)
        .transition('ign').duration(900)
        .attr('opacity', 0)
        .on('end', function () { d3.select(this).remove() })
    })

    /* phase 3: edges draw in with a golden glow that settles to neutral */
    linkSel.each(function (d) {
      const sW = d.source._wave ?? 5, tW = d.target._wave ?? 5
      const delay = WAVE_MS[Math.max(sW, tW)] + rnd() * 300
      d3.select(this)
        .attr('stroke', '#c9a84c')
        .transition('ign').duration(700).delay(delay)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0)
        .attr('opacity', 0.28)
        .transition('ign').duration(800)
        .attr('stroke', NEUTRAL_EDGE)
        .attr('opacity', 0.08)
        .on('end', function () {
          d3.select(this).attr('stroke-dasharray', null)
        })
    })

    /* phase 4: nodes ignite in genealogical waves with sparkle + flare */
    gNode.each(function (d) {
      const isHub = d.prom >= hubThreshold
      const stagger = isHub ? 300 : rnd() * 250
      const delay = WAVE_MS[d._wave] + stagger
      const g = d3.select(this)

      g.transition('ign').duration(500).delay(delay)
        .ease(d3.easeCubicOut)
        .attr('opacity', 1)
        .on('start', function () {
          spawnSparks(d.x, d.y, isHub ? 8 : 4, radius(d))
        })

      /* glow flare — all nodes get a brief brightness spike when born */
      d3.select(this).select('.glow')
        .transition('ign').duration(200).delay(delay)
        .attr('opacity', isHub ? 0.4 : 0.2)
        .attr('r', radius(d) * (isHub ? 2.0 : 1.6))
        .transition('ign').duration(1100).ease(d3.easeCubicOut)
        .attr('opacity', 0.07 + d.prom * 0.14)
        .attr('r', radius(d) * 1.25)
    })

    /* cluster labels seep in once their category's nodes have arrived */
    clusterSel.each(function (c) {
      const wave = CAT_WAVE[c] ?? 5
      d3.select(this)
        .transition('ign').duration(800).delay(WAVE_MS[wave] + 400)
        .attr('opacity', 0.45)
    })

    /* phase 5: parallax settle — ease back from over-zoom to rest */
    svg.transition('ign').duration(2200).delay(1200)
      .ease(d3.easeBackOut.overshoot(0.3))
      .call(zoom.transform, restTx)

    bloom.transition('ign').duration(2000).delay(1400)
      .ease(d3.easeCubicOut)
      .attr('opacity', 0)
      .on('end', function () { d3.select(this).remove() })

    /* skip on any input — jump everything to its end state */
    function finishIgnition() {
      if (_ignitionDone) return
      _ignitionDone = true

      bgLayer.interrupt('ign').attr('opacity', 1)
      linkSel.interrupt('ign')
        .attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null)
        .attr('stroke', NEUTRAL_EDGE)
        .attr('opacity', 0.08)
      gNode.interrupt('ign').attr('opacity', 1)
      gNode.selectAll('.glow').interrupt('ign')
        .each(function (d) {
          d3.select(this).attr('opacity', 0.09 + d.prom * 0.16).attr('r', radius(d) * 1.6)
        })
      clusterSel.interrupt('ign').attr('opacity', 0.45)
      bloom.interrupt('ign').remove()
      sparkLayer.selectAll('*').interrupt('spark').remove()
      genTitleLayer.selectAll('*').interrupt('ign').remove()
      svg.interrupt('ign').call(zoom.transform, restTx)

      teardownSkip()
    }

    function onSkipInput(e) {
      if (_ignitionDone) return
      if (e.type === 'keydown' && e.key === 'Tab') return
      finishIgnition()
    }

    const skipOpts = { capture: true }
    window.addEventListener('pointerdown', onSkipInput, skipOpts)
    window.addEventListener('keydown',     onSkipInput, skipOpts)
    window.addEventListener('wheel',       onSkipInput, skipOpts)

    function teardownSkip() {
      window.removeEventListener('pointerdown', onSkipInput, skipOpts)
      window.removeEventListener('keydown',     onSkipInput, skipOpts)
      window.removeEventListener('wheel',       onSkipInput, skipOpts)
    }

    /* natural completion */
    const ignitionTimer = setTimeout(() => {
      _ignitionDone = true; teardownSkip()
    }, WAVE_MS[5] + 2400)

    /* drag hint — after entrance, gently nudge a hub node to suggest dragging */
    const dragHintTimer = setTimeout(() => {
      const hub = nodes.slice().sort((a, b) => b.degree - a.degree)[0]
      if (!hub) return
      const g = gNode.filter(n => n.id === hub.id)
      g.transition('drag-hint')
        .duration(400).ease(d3.easeSinInOut)
        .attr('transform', `translate(${hub.x + 8},${hub.y - 6})`)
        .transition().duration(400).ease(d3.easeSinInOut)
        .attr('transform', `translate(${hub.x - 5},${hub.y + 4})`)
        .transition().duration(350).ease(d3.easeSinOut)
        .attr('transform', `translate(${hub.x},${hub.y})`)
    }, WAVE_MS[5] + 3600)

    /* ── tooltip positioning ────────────────────────────────────── */
    const tip = document.getElementById('tip')
    if (tip) {
      svg.on('mousemove', e => {
        tip.style.left = (e.clientX + 14) + 'px'
        tip.style.top  = (e.clientY - 8)  + 'px'
      })
    }

    /* ── hover / selection state ────────────────────────────────── */
    const state = { selected: null, pathLock: false, tourLock: false }

    const srcId = l => (typeof l.source === 'object' ? l.source.id : l.source)
    const tgtId = l => (typeof l.target === 'object' ? l.target.id : l.target)

    /* edge labels — short relationship names riding the selected node's lit edges */
    const MAX_EDGE_LABELS = 10
    const EDGE_LABEL_PAD = 6, EDGE_LABEL_H = 10
    const edgeKey = l => srcId(l) + '|' + tgtId(l) + '|' + l.type
    const edgeLabelSize = new Map()
    const edgeLabelPos  = new Map()

    // direction-aware: "label" when the selected node is the source (matches
    // DetailPanel's dir === '→'), "inverseLabel" when it's the target (dir === '←')
    function resolveLabel(l, id) {
      const cfg = linkTypeConfig[l.type]
      return (srcId(l) === id ? cfg?.label : cfg?.inverseLabel) || l.type
    }

    function renderEdgeLabels(id) {
      if (!id) { linkLabelLayer.selectAll('text').remove(); edgeLabelPos.clear(); return }
      const inc = links.filter(l => srcId(l) === id || tgtId(l) === id)

      // dedupe: if several edges would show the same resolved text (e.g. many
      // "Parent of" children), keep only the highest-renown neighbour's label
      const byText = new Map()
      for (const l of inc) {
        const neighborId = srcId(l) === id ? tgtId(l) : srcId(l)
        const prom = byId[neighborId]?.prom || 0
        const text = resolveLabel(l, id)
        const cur = byText.get(text)
        if (!cur || prom > cur.prom) byText.set(text, { l, prom, text })
      }
      let items = [...byText.values()]

      // clutter guard: keep the highest-renown neighbours; the rest rely on hover
      if (items.length > MAX_EDGE_LABELS) {
        items = items.sort((a, b) => b.prom - a.prom).slice(0, MAX_EDGE_LABELS)
      }

      const sel = linkLabelLayer.selectAll('text')
        .data(items, d => edgeKey(d.l))
        .join('text')
        .attr('class', 'link-label')
        .attr('text-anchor', 'middle')
        .attr('fill', d => LCOL[d.l.type] || '#888')
        .text(d => d.text)

      edgeLabelSize.clear()
      edgeLabelPos.clear()
      sel.each(function(d) {
        edgeLabelSize.set(edgeKey(d.l), { w: this.getComputedTextLength() + EDGE_LABEL_PAD, h: EDGE_LABEL_H })
      })
      positionEdgeLabels()
    }

    function positionEdgeLabels() {
      const sel = linkLabelLayer.selectAll('text')
      if (sel.empty()) return

      // seed/refresh each label's spring anchor at its edge midpoint
      const items = []
      sel.each(function(d) {
        const key = edgeKey(d.l)
        const anchor = { x: (d.l.source.x + d.l.target.x) / 2, y: (d.l.source.y + d.l.target.y) / 2 }
        let pos = edgeLabelPos.get(key)
        if (!pos) { pos = { x: anchor.x, y: anchor.y }; edgeLabelPos.set(key, pos) }
        items.push({ anchor, pos, size: edgeLabelSize.get(key) || { w: 30, h: EDGE_LABEL_H } })
      })

      // light nudge pass: spring each label toward its edge midpoint, then
      // separate any pair whose boxes overlap along their shallowest axis
      for (let iter = 0; iter < 20; iter++) {
        let moved = false
        for (let i = 0; i < items.length; i++) {
          const a = items[i]
          a.pos.x += (a.anchor.x - a.pos.x) * 0.15
          a.pos.y += (a.anchor.y - a.pos.y) * 0.15
          for (let j = i + 1; j < items.length; j++) {
            const b = items[j]
            const dx = b.pos.x - a.pos.x
            const dy = b.pos.y - a.pos.y
            const overlapX = (a.size.w + b.size.w) / 2 - Math.abs(dx)
            const overlapY = (a.size.h + b.size.h) / 2 - Math.abs(dy)
            if (overlapX > 0 && overlapY > 0) {
              moved = true
              if (overlapX < overlapY) {
                const shift = overlapX / 2 + 0.5
                a.pos.x -= dx >= 0 ? shift : -shift
                b.pos.x += dx >= 0 ? shift : -shift
              } else {
                const shift = overlapY / 2 + 0.5
                a.pos.y -= dy >= 0 ? shift : -shift
                b.pos.y += dy >= 0 ? shift : -shift
              }
            }
          }
        }
        if (!moved) break
      }

      sel.attr('x', d => edgeLabelPos.get(edgeKey(d.l)).x)
         .attr('y', d => edgeLabelPos.get(edgeKey(d.l)).y)
    }

    /* grow the clicked node above the field. Every sized piece of the glyph —
       glow, core, clipped portrait, ring, label offset — plus the portrait's
       clipPath circle in <defs> is rescaled off one shared transition so they
       enlarge in lockstep (the clip MUST move too or the portrait overflows it).
       Physics radius is left alone, so the layout doesn't reflow. */
    const SEL_GROW = 1.7
    let _grownId = null
    function sizeNode(id, scale) {
      const g = gNode.filter(n => n.id === id)
      if (g.empty()) return
      const d = g.datum()
      const r = radius(d) * scale
      const t = d3.transition().duration(280).ease(d3.easeCubicOut)
      g.select('.glow').transition(t).attr('r', r * 1.25)
      g.select('.core').transition(t).attr('r', r)
      g.select('image').transition(t)
        .attr('x', -r).attr('y', -r).attr('width', r * 2).attr('height', r * 2)
      g.select('.ring').transition(t).attr('r', r + 0.5)
      g.select('.sel-ring').transition(t).attr('r', r + 3)
      const side = d._labelSide || 1
      g.select('.node-label').transition(t).attr('x', side > 0 ? r + 6 : -(r + 6))
      defs.select(`#clip-${d.id} circle`).transition(t).attr('r', r)
    }
    function enlargeSelected(id) {
      if (_grownId === id) return            // already correct — skip redundant transitions
      if (_grownId) sizeNode(_grownId, 1)    // restore the previously selected node
      if (id) sizeNode(id, SEL_GROW)
      _grownId = id
    }

    /* Apply per-type color/dash to lit edges, reset to neutral grey otherwise */
    function styleEdgesByState() {
      linkSel.each(function(d) {
        const el = d3.select(this)
        if (el.classed('lit') || el.classed('route')) {
          el.attr('stroke', el.attr('data-type-color'))
            .attr('stroke-dasharray', el.attr('data-type-dash') || null)
            .classed('link-animated', !!LINK_DASH[d.type])
            .classed('link-transformed', d.type === 'transformed_into')
            .classed('link-cursed', d.type === 'cursed_into')
        } else {
          el.attr('stroke', NEUTRAL_EDGE)
            .attr('stroke-dasharray', null)
            .classed('link-animated', false)
            .classed('link-transformed', false)
            .classed('link-cursed', false)
        }
      })
    }

    /* constellation focus: on select, unrelated nodes desaturate and recede,
       the selected lineage rises forward, edges illuminate with type colour
       in a staggered ripple outward, and the camera eases to re-centre. */
    function applySelectVisual(id) {
      gNode.classed('selected', n => n.id === id)
      if (id) {
        const center = byId[id]
        const near = adj[id] || new Set()
        gNode.classed('faded',    n => n.id !== id && !near.has(n.id))
             .classed('receded',  n => n.id !== id && !near.has(n.id))
             .classed('lit',      n => n.id === id || near.has(n.id))

        /* stagger edge illumination outward from the selected node */
        linkSel.each(function(l) {
          const el = d3.select(this)
          const s = srcId(l), t = tgtId(l)
          const touches = s === id || t === id
          el.classed('faded', !touches).classed('lit', touches)
          if (touches && center) {
            const nb = byId[s === id ? t : s]
            const dist = nb ? Math.sqrt((center.x - nb.x) ** 2 + (center.y - nb.y) ** 2) : 0
            const delay = Math.min(dist * 0.5, 100)
            el.attr('stroke', NEUTRAL_EDGE).attr('opacity', 0.08)
            el.transition('sel-ripple').duration(200).delay(delay)
              .attr('opacity', 0.8)
              .attr('stroke-width', 1.6)
              .attr('stroke', el.attr('data-type-color'))
          }
        })

        nodeLayer.classed('focusing', true)
      } else {
        linkSel.interrupt('sel-ripple')
        /* smooth de-focus: edges fade back via a brief transition instead
           of snapping; the CSS transition on .node handles nodes already */
        linkSel.each(function() {
          d3.select(this)
            .transition('defocus').duration(300).ease(d3.easeCubicOut)
            .attr('opacity', 0.08)
            .attr('stroke-width', 0.7)
            .attr('stroke', NEUTRAL_EDGE)
        })
        gNode.classed('faded', false).classed('lit', false).classed('receded', false)
        linkSel.classed('faded', false).classed('lit', false)
        nodeLayer.classed('focusing', false)
      }
      styleEdgesByState()
      renderEdgeLabels(id)
      enlargeSelected(id)

      /* selection glow nova — brief radius/opacity burst on the selected
         node's glow circle, settling back to rest. Reads as a star flaring
         on activation before dimming to its steady state. */
      if (id) {
        const g = gNode.filter(n => n.id === id)
        const d = g.datum()
        const r = radius(d)
        const baseOp = 0.07 + d.prom * 0.14
        g.select('.glow')
          .transition('nova').duration(180).ease(d3.easeCubicOut)
          .attr('r', r * 2.0).attr('opacity', Math.min(baseOp * 3.5, 0.4))
          .transition('nova').duration(600).ease(d3.easeCubicOut)
          .attr('r', r * 1.25).attr('opacity', baseOp)
      }
    }

    /* ── magnetic hover ───────────────────────────────────────────
       On hover, neighbors lean slightly toward the hovered node (a
       temporary spring nudge) and connecting edges brighten/thicken
       in a staggered ripple outward — relationships flow OUT rather
       than snapping on uniformly. */
    let _hoverNudges = null

    function hoverOn(d) {
      if (state.pathLock || state.tourLock || !_ignitionDone) return
      const near = adj[d.id]
      nodeLayer.classed('focusing', true)
      gNode.classed('faded', n => n.id !== d.id && !near.has(n.id))
           .classed('lit',   n => n.id === d.id || near.has(n.id))

      /* ring shimmer: the hovered node's ring briefly flares brighter */
      const hg = gNode.filter(n => n.id === d.id)
      hg.select('.ring')
        .transition('ring-shimmer').duration(140).ease(d3.easeCubicOut)
        .attr('opacity', 0.9).attr('stroke-width', 1.2)

      /* magnetic lean: temporarily nudge neighbors toward the hovered node */
      _hoverNudges = []
      const LEAN = 0.12
      near.forEach(nid => {
        const nb = byId[nid]; if (!nb) return
        const dx = d.x - nb.x, dy = d.y - nb.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const nudge = Math.min(dist * LEAN, 12)
        const ox = nb.x, oy = nb.y
        nb.x += (dx / dist) * nudge
        nb.y += (dy / dist) * nudge
        _hoverNudges.push({ node: nb, ox, oy })
      })
      ticked()

      /* ripple: stagger edge transitions outward from the hovered node */
      linkSel.each(function(l) {
        const el = d3.select(this)
        const s = srcId(l), t = tgtId(l)
        const touches = s === d.id || t === d.id
        el.classed('faded', !touches).classed('lit', touches)
        if (touches) {
          const nbId = s === d.id ? t : s
          const nb = byId[nbId]
          const dist = nb ? Math.sqrt((d.x - nb.x) ** 2 + (d.y - nb.y) ** 2) : 0
          const delay = Math.min(dist * 0.6, 120)
          el.transition('ripple').duration(180).delay(delay)
            .attr('opacity', 0.8)
            .attr('stroke-width', 1.6)
            .attr('stroke', el.attr('data-type-color'))
        }
      })

      if (tip) {
        const catLabel = categoryConfig[d.category]?.label || d.category
        const nConn = adj[d.id]?.size || 0
        tip.innerHTML = `<span class="tip-cat" style="background:${CAT[d.category]}"></span>`
          + `<span class="tip-name">${d.name}</span>`
          + (d.epithet ? `<span class="tip-epi">${d.epithet}</span>` : '')
          + `<span class="tip-conn">${nConn} connection${nConn !== 1 ? 's' : ''}</span>`
        tip.style.opacity = '1'
      }
    }

    function hoverOff() {
      if (state.pathLock || state.tourLock) return
      if (tip) tip.style.opacity = '0'

      /* restore ring from hover shimmer */
      gNode.selectAll('.ring').interrupt('ring-shimmer')
        .transition('ring-restore').duration(220).ease(d3.easeCubicOut)
        .attr('opacity', 0.45).attr('stroke-width', 0.8)

      /* release magnetic lean — spring nodes back */
      if (_hoverNudges) {
        for (const { node, ox, oy } of _hoverNudges) {
          node.x = ox; node.y = oy
        }
        _hoverNudges = null
        ticked()
      }

      /* cancel any in-flight ripple transitions */
      linkSel.interrupt('ripple')

      if (state.selected) {
        applySelectVisual(state.selected)
      } else {
        nodeLayer.classed('focusing', false)
        gNode.classed('faded', false).classed('lit', false)
        linkSel.classed('faded', false).classed('lit', false)
        styleEdgesByState()
      }
    }

    function frameNodes(ids) {
      const ns = ids.map(i => byId[i]).filter(Boolean)
      if (!ns.length) return
      const pad = 130
      const x0 = Math.min(...ns.map(n => n.x)), x1 = Math.max(...ns.map(n => n.x))
      const y0 = Math.min(...ns.map(n => n.y)), y1 = Math.max(...ns.map(n => n.y))
      const bw = Math.max(x1 - x0, 60), bh = Math.max(y1 - y0, 60)
      const k  = Math.min((W - pad * 2) / bw, (H - pad * 2) / bh, 2.4)
      const tx = W / 2 - k * (x0 + bw / 2), ty = H / 2 - k * (y0 + bh / 2)
      svg.transition().duration(820).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k))
    }

    /* Frame the selected node together with ALL its neighbours, fitting them
       into the slice of screen NOT covered by the right-hand detail panel.
       The panel is a fixed pixel width but the graph lives in viewBox units
       (preserveAspectRatio "meet"), so we convert px → viewBox via the meet
       scale `s`, shrink the usable width by the panel, and shift the target
       centre left by half the panel so nothing the user clicked hides under it. */
    function frameSelection(id, opts = {}) {
      const center = byId[id]; if (!center) return
      const near = adj[id] || new Set()
      const ns = [center, ...[...near].map(i => byId[i]).filter(Boolean)]
      const xs = ns.map(n => n.x), ys = ns.map(n => n.y)
      const x0 = Math.min(...xs), x1 = Math.max(...xs)
      const y0 = Math.min(...ys), y1 = Math.max(...ys)
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
      const bw = Math.max(x1 - x0, 80), bh = Math.max(y1 - y0, 80)

      const rect = el.getBoundingClientRect()
      const s = Math.min(rect.width / W, rect.height / H) || 1   // screen px per viewBox unit

      // Reserve screen space for whatever chrome covers the graph, then fit the
      // cluster into the UNcovered region. Normal selection: the 356px right
      // detail panel. Tour step: the panel is hidden, but the bottom caption
      // bar is, so reserve height there instead. Both insets convert px →
      // viewBox via the meet scale s, and the centre shifts away from the
      // covered side by half the inset (same derivation on each axis).
      const rightPx  = opts.tour ? 0 : (document.querySelector('.detail-panel')?.getBoundingClientRect().width || 356)
      const bottomPx = opts.tour ? 188 : 0   // clear the (now taller) tour caption bar
      const rightV   = rightPx  / s
      const bottomV  = bottomPx / s

      const padX = 96, padY = 80
      const usableW = Math.max((rect.width  - rightPx)  / s, 120)
      const usableH = Math.max((rect.height - bottomPx) / s, 120)
      let k = Math.min((usableW - padX * 2) / bw, (usableH - padY * 2) / bh, 2.2)
      k = Math.max(Math.min(k, 2.2), 0.35)                      // keep within zoom scaleExtent

      const tx = (W / 2 - rightV  / 2) - k * cx                 // centre in the un-panelled width
      const ty = (H / 2 - bottomV / 2) - k * cy                 // lift above the tour caption bar
      svg.transition().duration(820).call(
        zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k))
    }

    /* ── public API ─────────────────────────────────────────────── */
    const api = {
      select(id, fly, opts) {
        if (!_ignitionDone) finishIgnition()
        if (state.pathLock) return
        state.selected = id
        applySelectVisual(id)
        if (fly && id) frameSelection(id, opts)
        onSelect(id)
      },
      clearSelection() {
        if (state.pathLock || state.tourLock) return
        state.selected = null
        applySelectVisual(null)
        onSelect(null)
      },
      flyTo(id, scale) {
        const n = byId[id]; if (!n) return
        const k = scale || 1.9
        svg.transition().duration(820).call(
          zoom.transform,
          d3.zoomIdentity.translate(W / 2 - k * n.x, H / 2 - k * n.y).scale(k)
        )
      },
      resetView() { fitView() },
      highlightPath(ids) {
        state.pathLock = true
        renderEdgeLabels(null)
        const set = new Set(ids)
        const edgeSet = new Set()
        for (let i = 0; i < ids.length - 1; i++) edgeSet.add(ids[i] + '|' + ids[i + 1])
        gNode.classed('faded',    n => !set.has(n.id))
             .classed('receded',  n => !set.has(n.id))
             .classed('lit',      n => set.has(n.id))
             .classed('selected', false)
             .classed('route',    n => set.has(n.id))
        linkSel.classed('faded', true).classed('lit', false)
               .classed('route', l => {
                 const a = srcId(l), b = tgtId(l)
                 return edgeSet.has(a + '|' + b) || edgeSet.has(b + '|' + a)
               })
        styleEdgesByState()
        nodeLayer.classed('focusing', true)
        frameNodes(ids)

        /* ── lineage trace: animate glowing dots along the path edges ── */
        traceLayer.selectAll('*').remove()
        cancelAnimationFrame(state._traceRaf)

        /* collect the actual <path> elements in path order */
        const routePaths = []
        for (let i = 0; i < ids.length - 1; i++) {
          const a = ids[i], b = ids[i + 1]
          linkSel.each(function(l) {
            const s = srcId(l), t = tgtId(l)
            if ((s === a && t === b) || (s === b && t === a)) {
              routePaths.push({ el: this, reversed: s !== a, hop: i })
            }
          })
        }

        /* create trace dots — one per hop, staggered */
        const TRACE_DUR = 900
        const TRACE_GAP = 350
        const dots = routePaths.map((rp, i) => {
          const dot = traceLayer.append('circle')
            .attr('r', 3.5)
            .attr('fill', '#cdb88a')
            .attr('filter', 'url(#trace-glow)')
            .attr('opacity', 0)
          const tail = traceLayer.append('circle')
            .attr('r', 7)
            .attr('fill', '#cdb88a')
            .attr('opacity', 0)
            .attr('filter', 'url(#trace-glow)')
          return { dot, tail, path: rp.el, reversed: rp.reversed, hop: i,
                   startT: i * TRACE_GAP, dur: TRACE_DUR,
                   pathLen: rp.el.getTotalLength() }
        })

        const totalT = (dots.length - 1) * TRACE_GAP + TRACE_DUR
        let t0 = null
        state._traceActive = true

        function animateTrace(ts) {
          if (!state._traceActive) return
          if (!t0) t0 = ts
          const elapsed = ts - t0

          for (const d of dots) {
            const local = elapsed - d.startT
            if (local < 0 || local > d.dur) {
              d.dot.attr('opacity', 0)
              d.tail.attr('opacity', 0)
              continue
            }
            let frac = local / d.dur
            if (d.reversed) frac = 1 - frac
            const pt = d.path.getPointAtLength(frac * d.pathLen)
            const fade = frac < 0.1 ? frac / 0.1 : frac > 0.9 ? (1 - frac) / 0.1 : 1
            d.dot.attr('cx', pt.x).attr('cy', pt.y).attr('opacity', fade * 0.95)
            d.tail.attr('cx', pt.x).attr('cy', pt.y).attr('opacity', fade * 0.25)
          }

          /* loop: restart after a pause */
          if (elapsed > totalT + 600) {
            t0 = ts
          }
          state._traceRaf = requestAnimationFrame(animateTrace)
        }
        state._traceRaf = requestAnimationFrame(animateTrace)
      },
      clearPathHighlight() {
        state.pathLock = false
        state._traceActive = false
        cancelAnimationFrame(state._traceRaf)
        traceLayer.selectAll('*').remove()
        gNode.classed('route', false).classed('receded', false)
        linkSel.classed('route', false).classed('faded', false)
        applySelectVisual(state.selected)
      },
      setTourLock(v) { state.tourLock = v },
      litEdge(a, b) {
        linkSel.classed('route', l => {
          const s = srcId(l), t = tgtId(l)
          return (s === a && t === b) || (s === b && t === a)
        })
      },
      clearLitEdge() { linkSel.classed('route', false) },
    }

    apiRef.current = api

    return () => {
      clearTimeout(ignitionTimer)
      clearTimeout(dragHintTimer)
      clearTimeout(_meteorTimer)
      teardownSkip()
      state._traceActive = false
      cancelAnimationFrame(state._traceRaf)
      document.removeEventListener('visibilitychange', handleVisibility)
      sim.stop()
      svg.selectAll('*').remove()
      apiRef.current = null
    }
  }, [onSelect])

  return (
    <svg
      ref={svgEl}
      id="sky"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
    />
  )
})

export default SkyGraph
export { CAT, LCOL }
