import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import * as d3 from 'd3'
import { nodes as rawNodes, links as rawLinks } from '../data/mythology.js'

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
    select           : (id, fly)  => apiRef.current?.select(id, fly),
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
    const radius = n => 2.2 + n.prom * 13.8

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
    const nodeLayer    = floatXLayer.append('g').attr('class','nodes')

    /* faint background stars, plus soft glow-bloom flares behind the brightest ones.
       A 1px dot's opacity shifting by hundredths is imperceptible — but a much
       larger blurred halo (same #glow filter the nodes use) blooming from
       near-invisible to a soft glow reads clearly at this scale. */
    let _s = 7
    const rnd = () => { _s = (_s * 1103515245 + 12345) & 0x7fffffff; return _s / 0x7fffffff }
    const big = Math.max(W, H) * 2.2
    const starData = d3.range(420).map(() => ({
      x: -big * 0.3 + rnd() * big, y: -big * 0.3 + rnd() * big,
      r: 0.4 + rnd() * 1.1, o: 0.12 + rnd() * 0.4,
    }))
    const flareStars = starData.filter(d => d.o > 0.46)

    bgLayer.selectAll('circle.flare')
      .data(flareStars)
      .join('circle')
      .attr('class', 'flare')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r',    d => d.r * 5)
      .attr('fill', '#cdd2dc')
      .attr('filter', 'url(#glow)')
      .style('--flare-peak',  d => (0.32 + d.o * 0.5).toFixed(2))
      .style('--flare-dur',   () => `${(1.5 + rnd() * 1.7).toFixed(2)}s`)
      .style('--flare-delay', () => `-${(rnd() * 5).toFixed(2)}s`)

    bgLayer.selectAll('circle.star')
      .data(starData)
      .join('circle')
      .attr('class', 'star')
      .attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => d.r)
      .attr('fill', '#cdd2dc').attr('opacity', d => d.o)

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
    const linkSel = linkLayer.selectAll('line').data(links).join('line')
      .attr('class', 'link')
      .classed('link-transformed', d => d.type === 'transformed_into')
      .classed('link-cursed',      d => d.type === 'cursed_into')
      .attr('stroke',       d => LCOL[d.type] || '#555')
      .attr('stroke-width', d => d.type === 'enemy_of' ? 1.4 : 1.1)
      .attr('stroke-linecap', 'round')
      .attr('opacity', 0.22)
      .attr('stroke-dasharray', d => LINK_DASH[d.type] || null)
      .style('--breathe-delay', () => `-${(rnd() * 3).toFixed(2)}s`)

    /* ── cluster labels ─────────────────────────────────────────── */
    const cats       = [...new Set(nodes.map(n => n.category))]
    const clusterSel = clusterLayer.selectAll('text').data(cats).join('text')
      .attr('class', 'cluster-label')
      .attr('text-anchor', 'middle')
      .text(c => CAT_LABEL[c] || c)

    /* ── nodes ──────────────────────────────────────────────────── */
    const gNode = nodeLayer.selectAll('g').data(nodes).join('g')
      .attr('class', 'node')
      .classed('prominent', d => d.prom > 0.55)
      .classed('nolabel',   d => d.degree === 0)
      .style('cursor', 'pointer')
      .on('click',      (e, d) => { e.stopPropagation(); api.select(d.id, true) })
      .on('mouseenter', (e, d) => hoverOn(d))
      .on('mouseleave', ()     => hoverOff())
      .call(d3.drag()
        .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.18).restart(); d.fx = d.x; d.fy = d.y })
        .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; d.x = e.x; d.y = e.y; ticked() })
        .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null }))

    gNode.append('circle').attr('class','glow')
      .attr('r',        d => radius(d) * 2.4)
      .attr('fill',     d => CAT[d.category])
      .attr('opacity',  d => 0.05 + d.prom * 0.14)
      .attr('filter',  'url(#glow)')
      /* per-node twinkle: the glow halo breathes around its base opacity, out
         of phase from neighbour (mirrors the background --flare-* vars). The
         crisp core (next) stays put so figures shimmer without pulsing in size. */
      .style('--glow-base',     d => (0.05 + d.prom * 0.14).toFixed(3))
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
      linkSel
        .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
      gNode.attr('transform', d => `translate(${d.x},${d.y})`)
      clusterSel.each(function(c) {
        const ms = nodes.filter(n => n.category === c)
        if (!ms.length) return
        const cx = d3.mean(ms, n => n.x), cy = d3.min(ms, n => n.y) - 26
        d3.select(this).attr('x', cx).attr('y', cy)
      })
    }

    /* partial pre-settle then let sim run for gentle drift */
    sim.stop()
    for (let i = 0; i < 240; i++) sim.tick()
    ticked()
    sim.on('tick', ticked)
    sim.restart()

    /* ── zoom / pan ─────────────────────────────────────────────── */
    const zoom = d3.zoom().scaleExtent([0.35, 4.5])
      .on('zoom', e => {
        zoomLayer.attr('transform', e.transform)
        svg.classed('zoomed-in', e.transform.k > 1.7)
      })
    svg.call(zoom).on('dblclick.zoom', null)
    svg.on('click', () => api.clearSelection())

    /* pause twinkle/mythic-flow CSS animations when the tab is hidden */
    const handleVisibility = () => svg.classed('paused', document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)

    /* fit view */
    function fitView() {
      const pad = 80
      const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y)
      const x0 = Math.min(...xs), x1 = Math.max(...xs)
      const y0 = Math.min(...ys), y1 = Math.max(...ys)
      const bw = x1 - x0, bh = y1 - y0
      if (!(bw > 0 && bh > 0)) return
      const k = Math.min((W - pad * 2) / bw, (H - pad * 2) / bh, 1.1)
      if (!isFinite(k) || k <= 0) return
      const tx = W / 2 - k * (x0 + bw / 2), ty = H / 2 - k * (y0 + bh / 2)
      svg.transition().duration(900).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k))
    }
    fitView()
    requestAnimationFrame(fitView)

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
    }

    function hoverOn(d) {
      if (state.pathLock || state.tourLock) return
      const near = adj[d.id]
      nodeLayer.classed('focusing', true)
      gNode.classed('faded', n => n.id !== d.id && !near.has(n.id))
           .classed('lit',   n => n.id === d.id || near.has(n.id))
      linkSel.classed('faded', l => srcId(l) !== d.id && tgtId(l) !== d.id)
             .classed('lit',   l => srcId(l) === d.id || tgtId(l) === d.id)
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

    /* ── public API ─────────────────────────────────────────────── */
    const api = {
      select(id, fly) {
        if (state.pathLock) return
        state.selected = id
        applySelectVisual(id)
        if (fly && id) api.flyTo(id, 1.9)
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
