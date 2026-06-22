import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import * as d3 from 'd3'
import { nodes as rawNodes, links as rawLinks } from '../data/mythology.js'
import { linkTypeConfig } from '../data/linkTypeConfig.js'

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

/* perpetual "warm" sim energy — the antagonistic cluster/collide/charge forces
   never fully settle, so the graph keeps drifting gently. Higher = more motion. */
const WARM_ALPHA = 0.045

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
    /* node size scales with connection count (renown). The exponent on prom
       steepens the gradient past the area-true sqrt so degree differences read
       clearly across the field — leaf stars stay small, hubs (Zeus, Gaia)
       grow visibly larger. prom itself is left untouched (it still drives glow
       opacity, label prominence, renown bars). */
    const radius = n => 2.4 + Math.pow(n.prom, 1.3) * 17

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

    /* circular clip path per node for portrait images */
    defs.selectAll('.node-clip')
      .data(nodes)
      .join('clipPath')
      .attr('class', 'node-clip')
      .attr('id', d => `clip-${d.id}`)
      .append('circle')
      .attr('r', d => radius(d))

    const zoomLayer    = svg.append('g').attr('class','zoom')
    const bgLayer      = zoomLayer.append('g').attr('class','bg')
    /* float-y/float-x: two nested groups, each animating one transform axis on
       its own period — the same layered technique the cloud strata use
       (sway wrapper + drift track). Composed, they trace a slow organic
       loop rather than a mechanical back-and-forth: a faint vertical bob
       (float-y, ~14s) plus a slower, smaller horizontal drift (float-x,
       ~70s) reads as gentle floating, not scrolling. Pure transform → GPU
       compositor; physics-driven node positions underneath are untouched. */
    const floatYLayer  = zoomLayer.append('g').attr('class','float-y')
    const floatXLayer  = floatYLayer.append('g').attr('class','float-x')
    const clusterLayer = floatXLayer.append('g').attr('class','clusters')
    const linkLayer    = floatXLayer.append('g').attr('class','links')
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
    const starData = d3.range(680).map(() => {
      const x = -big * 0.3 + rnd() * big
      const y = -big * 0.3 + rnd() * big
      const distFromCenter = Math.sqrt((x - W/2)**2 + (y - H/2)**2) / (big * 0.5)
      const depthBias = Math.max(0, 1 - distFromCenter * 0.6)
      const r = 0.25 + rnd() * 0.6 + depthBias * rnd() * 0.9
      const o = 0.06 + rnd() * 0.22 + depthBias * rnd() * 0.25
      const tint = TINTS[Math.floor(rnd() * TINTS.length)]
      return { x, y, r, o, tint }
    })
    const flareStars = starData.filter(d => d.o > 0.38)

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
      .attr('class', 'star')
      .attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => d.r)
      .attr('fill', d => d.tint).attr('opacity', d => d.o)

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
      .attr('opacity', 0.08)
      .attr('data-type-color', d => LCOL[d.type] || '#555')
      .attr('data-type-dash', d => LINK_DASH[d.type] || '')

    /* ── cluster labels ─────────────────────────────────────────── */
    const cats       = [...new Set(nodes.map(n => n.category))]
    const clusterSel = clusterLayer.selectAll('text').data(cats).join('text')
      .attr('class', 'cluster-label')
      .attr('text-anchor', 'middle')
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
        .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(WARM_ALPHA); d.fx = null; d.fy = null }))

    gNode.append('circle').attr('class','glow')
      .attr('r',        d => radius(d) * 1.6)
      .attr('fill',     d => CAT[d.category])
      .attr('opacity',  d => 0.03 + d.prom * 0.08)
      .attr('filter',   d => d.prom > 0.5 ? 'url(#glow)' : null)
      /* per-node twinkle: the glow halo breathes around its base opacity, out
         of phase from neighbour (mirrors the background --flare-* vars). The
         crisp core (next) stays put so figures shimmer without pulsing in size. */
      .style('--glow-base',     d => (0.03 + d.prom * 0.08).toFixed(3))
      .style('--twinkle-dur',   () => `${(4.5 + rnd() * 4.5).toFixed(2)}s`)
      .style('--twinkle-delay', () => `-${(rnd() * 7).toFixed(2)}s`)

    gNode.append('circle').attr('class','core')
      .attr('r',       d => radius(d))
      .attr('fill',    '#ece6d6')
      .attr('opacity', d => 0.5 + d.prom * 0.5)

    /* head portrait — clipped to the node circle */
    gNode.append('image')
      .attr('href',               d => `/portraits/${d.id}-head.webp`)
      .attr('x',                  d => -radius(d))
      .attr('y',                  d => -radius(d))
      .attr('width',              d => radius(d) * 2)
      .attr('height',             d => radius(d) * 2)
      .attr('clip-path',          d => `url(#clip-${d.id})`)
      .attr('preserveAspectRatio','xMidYMid slice')
      .attr('opacity', 0.88)
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
      .attr('r',            d => radius(d) + 1.6)
      .attr('fill',         'none')
      .attr('stroke',       d => CAT[d.category])
      .attr('stroke-width', 1.1)
      .attr('opacity',      0.55)

    gNode.append('text').attr('class','node-label')
      .attr('x', d => radius(d) + 6).attr('y', 4)
      .text(d => d.name)

    /* ── tick ───────────────────────────────────────────────────── */
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

      // 1. anchor each cluster label over its category's densest sub-blob
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

      // 2. spring each label toward its anchor, separate overlapping label boxes
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

      // 3. clamp inside the viewBox
      for (const c of cats) {
        const p = labelPos.get(c), b = labelSize.get(c)
        p.x = Math.min(Math.max(p.x, b.w / 2), W - b.w / 2)
        p.y = Math.min(Math.max(p.y, b.h / 2), H - b.h / 2)
      }

      clusterSel.attr('x', c => labelPos.get(c).x).attr('y', c => labelPos.get(c).y)

      positionEdgeLabels()
    }

    /* Pre-settle the layout off-screen, then hold the sim "warm" so it never
       freezes: a low constant alphaTarget keeps cluster/charge/collide
       micro-adjusting forever. Those constraints can't all be satisfied at once
       (every node pulled to its cluster anchor yet pushed apart by collide), so
       the frustrated system drifts gently and perpetually — real physics, not a
       scripted loop. Stopped when the tab is hidden (visibility handler below). */
    sim.stop()
    for (let i = 0; i < 240; i++) sim.tick()
    ticked()
    sim.on('tick', ticked)
    sim.alphaTarget(WARM_ALPHA).alpha(WARM_ALPHA).restart()

    /* ── zoom / pan ─────────────────────────────────────────────── */
    const zoom = d3.zoom().scaleExtent([0.35, 4.5])
      .on('zoom', e => {
        zoomLayer.attr('transform', e.transform)
        svg.classed('zoomed-mid', e.transform.k > 1.0)
        svg.classed('zoomed-in', e.transform.k > 1.7)
      })
    svg.call(zoom).on('dblclick.zoom', null)
    svg.on('click', () => api.clearSelection())

    /* pause CSS animations AND the warm sim when the tab is hidden — the sim
       would otherwise tick forever in the background, wasting CPU */
    const handleVisibility = () => {
      svg.classed('paused', document.hidden)
      if (document.hidden) sim.stop()
      else sim.alphaTarget(WARM_ALPHA).restart()
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

    /* ── ignition sequence + parallax settle ────────────────────────
       The cosmogony unfolds: open on near-black starfield, edges draw
       themselves as thin light-traces (stroke-dashoffset sweep), nodes
       ignite in genealogical order — Chaos first, then Gaia, the Titans,
       the Olympians — hubs flare brightest, last. The whole web arrives
       slightly over-zoomed and eases back to rest with a gentle overshoot
       (parallax settle). Skippable on any input. */

    const CAT_WAVE = {
      primordial: 1, titan: 2, olympian: 3, chthonic: 3,
      sea_deity: 4, nymph_minor: 4, monster: 5, hero: 5, mortal: 5,
    }
    const WAVE_MS = [280, 520, 880, 1200, 1480, 1700]
    nodes.forEach(n => { n._wave = n.id === 'chaos' ? 0 : (CAT_WAVE[n.category] ?? 5) })

    /* compute resting transform, then start 15% over-zoomed */
    const _xs = nodes.map(n => n.x), _ys = nodes.map(n => n.y)
    const _x0 = Math.min(..._xs), _x1 = Math.max(..._xs)
    const _y0 = Math.min(..._ys), _y1 = Math.max(..._ys)
    const _bw = _x1 - _x0, _bh = _y1 - _y0
    const restK = (_bw > 0 && _bh > 0)
      ? Math.min((W - 72) / _bw, (H - 72) / _bh, 1.3)
      : 1
    const _cx = _x0 + _bw / 2, _cy = _y0 + _bh / 2
    const startK = restK * 1.15
    const restTx  = d3.zoomIdentity.translate(W / 2 - restK  * _cx, H / 2 - restK  * _cy).scale(restK)
    const startTx = d3.zoomIdentity.translate(W / 2 - startK * _cx, H / 2 - startK * _cy).scale(startK)

    /* initial state: starfield dim, everything else invisible */
    svg.call(zoom.transform, startTx)
    bgLayer.attr('opacity', 0)
    linkLayer.attr('opacity', 1)          // layer visible — edges hidden by dashoffset
    nodeLayer.attr('opacity', 1)          // layer visible — individual nodes hidden
    clusterLayer.attr('opacity', 1)
    clusterSel.attr('opacity', 0)
    gNode.attr('opacity', 0)

    /* edges: hidden via dashoffset, slightly brighter during draw-in */
    linkSel
      .attr('stroke-dasharray', 2000)
      .attr('stroke-dashoffset', 2000)
      .attr('opacity', 0.15)

    /* a light bloom overlay that fades out with the parallax (over-bright) */
    const bloom = zoomLayer.append('rect')
      .attr('width', W * 4).attr('height', H * 4)
      .attr('x', -W * 1.5).attr('y', -H * 1.5)
      .attr('fill', '#1a1e2a').attr('opacity', 0.18)
      .attr('pointer-events', 'none')

    let _ignitionDone = false

    /* phase 1: starfield materialises */
    bgLayer.transition('ign').duration(700).delay(80).attr('opacity', 1)

    /* phase 2: edges draw in — each timed to the later of its two endpoints */
    linkSel.each(function (d) {
      const sW = d.source._wave ?? 5, tW = d.target._wave ?? 5
      const delay = WAVE_MS[Math.max(sW, tW)] + rnd() * 180
      d3.select(this)
        .transition('ign').duration(550).delay(delay)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0)
        .transition('ign').duration(500)
        .attr('opacity', 0.08)
        .on('end', function () {
          d3.select(this).attr('stroke-dasharray', null)
        })
    })

    /* phase 3: nodes ignite in genealogical order */
    gNode.each(function (d) {
      const isHub = d.prom >= hubThreshold
      const delay = WAVE_MS[d._wave] + (isHub ? 220 : 0) + rnd() * 100
      d3.select(this)
        .transition('ign').duration(380).delay(delay)
        .ease(d3.easeCubicOut)
        .attr('opacity', 1)
    })

    /* hub flare: top nodes get a momentary glow boost when they ignite */
    gNode.filter(d => d.prom >= hubThreshold).each(function (d) {
      const delay = WAVE_MS[d._wave] + 250 + rnd() * 60
      d3.select(this).select('.glow')
        .transition('ign').duration(260).delay(delay)
        .attr('opacity', 0.3)
        .transition('ign').duration(900).ease(d3.easeCubicOut)
        .attr('opacity', 0.03 + d.prom * 0.08)
    })

    /* cluster labels seep in once their category's nodes have arrived */
    clusterSel.each(function (c) {
      const wave = CAT_WAVE[c] ?? 5
      d3.select(this)
        .transition('ign').duration(600).delay(WAVE_MS[wave] + 200)
        .attr('opacity', 0.45)
    })

    /* phase 4: parallax settle — ease back from over-zoom to rest */
    svg.transition('ign').duration(1500).delay(500)
      .ease(d3.easeBackOut.overshoot(0.35))
      .call(zoom.transform, restTx)

    bloom.transition('ign').duration(1600).delay(600)
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
        .attr('opacity', 0.08)
      gNode.interrupt('ign').attr('opacity', 1)
      gNode.selectAll('.glow').interrupt('ign')
        .each(function (d) { d3.select(this).attr('opacity', 0.03 + d.prom * 0.08) })
      clusterSel.interrupt('ign').attr('opacity', 0.45)
      bloom.interrupt('ign').remove()
      svg.interrupt('ign').call(zoom.transform, restTx)

      teardownSkip()
    }

    function onSkipInput(e) {
      if (_ignitionDone) return
      if (e.type === 'keydown' && e.key === 'Tab') return  // let tab work normally
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

    /* natural completion — clean up listeners once the last wave finishes */
    const ignitionTimer = setTimeout(() => {
      _ignitionDone = true; teardownSkip()
    }, WAVE_MS[5] + 1600)

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
      g.select('.glow').transition(t).attr('r', r * 1.6)
      g.select('.core').transition(t).attr('r', r)
      g.select('image').transition(t)
        .attr('x', -r).attr('y', -r).attr('width', r * 2).attr('height', r * 2)
      g.select('.ring').transition(t).attr('r', r + 1.6)
      g.select('.node-label').transition(t).attr('x', r + 6)
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

    function applySelectVisual(id) {
      gNode.classed('selected', n => n.id === id)
      if (id) {
        const near = adj[id] || new Set()
        gNode.classed('faded', n => n.id !== id && !near.has(n.id))
             .classed('lit',   n => n.id === id || near.has(n.id))
        linkSel.classed('faded', l => srcId(l) !== id && tgtId(l) !== id)
               .classed('lit',   l => srcId(l) === id || tgtId(l) === id)
        nodeLayer.classed('focusing', true)
      } else {
        gNode.classed('faded', false).classed('lit', false)
        linkSel.classed('faded', false).classed('lit', false)
        nodeLayer.classed('focusing', false)
      }
      styleEdgesByState()
      renderEdgeLabels(id)
      enlargeSelected(id)
    }

    function hoverOn(d) {
      if (state.pathLock || state.tourLock || !_ignitionDone) return
      const near = adj[d.id]
      nodeLayer.classed('focusing', true)
      gNode.classed('faded', n => n.id !== d.id && !near.has(n.id))
           .classed('lit',   n => n.id === d.id || near.has(n.id))
      linkSel.classed('faded', l => srcId(l) !== d.id && tgtId(l) !== d.id)
             .classed('lit',   l => srcId(l) === d.id || tgtId(l) === d.id)
      styleEdgesByState()
      if (tip) { tip.textContent = d.name; tip.style.opacity = '1' }
    }

    function hoverOff() {
      if (state.pathLock || state.tourLock) return
      if (tip) tip.style.opacity = '0'
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
      },
      clearPathHighlight() {
        state.pathLock = false
        gNode.classed('route', false)
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
      teardownSkip()
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
