import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { nodes as allNodes, links as allLinks } from '../data/mythology.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { linkTypeConfig } from '../data/linkTypeConfig.js'

export default function ForceGraph({
  selectedNodeId,
  onNodeSelect,
  activeCategories,
  activeLinkTypes,
}) {
  const containerRef   = useRef(null)
  const nodeSelRef     = useRef(null)   // d3 selection of <g.node>
  const linkSelRef     = useRef(null)   // d3 selection of <path.link>
  const getRadiusRef   = useRef(null)   // (node) => number
  const degreeRef      = useRef({})
  const svgRef         = useRef(null)   // d3 SVG selection (for zoom transitions)
  const zoomRef        = useRef(null)   // d3 zoom behaviour
  const viewportRef    = useRef({ width: 0, height: 0 })
  const simNodesRef    = useRef([])     // live simulation nodes (have .x / .y)

  // Serialize filter sets so useEffect dependency comparison works
  const catKey  = [...activeCategories].sort().join()
  const linkKey = [...activeLinkTypes].sort().join()

  // ── Build / rebuild graph whenever filters change ──────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    d3.select(container).selectAll('*').remove()

    const width  = container.clientWidth
    const height = container.clientHeight

    // ── Filter data ────────────────────────────────────────────────────────
    const filteredNodes = allNodes
      .filter(n => activeCategories.has(n.category))
      .map(n => ({ ...n }))

    const nodeIds = new Set(filteredNodes.map(n => n.id))

    const filteredLinks = allLinks
      .filter(l =>
        nodeIds.has(l.source) &&
        nodeIds.has(l.target) &&
        activeLinkTypes.has(l.type)
      )
      .map(l => ({ ...l }))

    // ── Degree map for node sizing ─────────────────────────────────────────
    const degree = {}
    filteredNodes.forEach(n => { degree[n.id] = 0 })
    filteredLinks.forEach(l => {
      degree[l.source] = (degree[l.source] || 0) + 1
      degree[l.target] = (degree[l.target] || 0) + 1
    })
    degreeRef.current = degree

    const getRadius = n => Math.max(7, Math.min(26, 5 + (degree[n.id] || 0) * 1.5))
    getRadiusRef.current = getRadius

    viewportRef.current = { width, height }
    simNodesRef.current = filteredNodes   // same array D3 mutates with .x / .y

    // ── SVG root ───────────────────────────────────────────────────────────
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('display', 'block')

    svgRef.current = svg

    // ── Defs: glow + arrows ────────────────────────────────────────────────
    const defs = svg.append('defs')

    // Glow filter
    const gf = defs.append('filter')
      .attr('id', 'node-glow')
      .attr('x', '-60%').attr('y', '-60%')
      .attr('width', '220%').attr('height', '220%')
    gf.append('feGaussianBlur')
      .attr('in', 'SourceGraphic')
      .attr('stdDeviation', 3)
      .attr('result', 'blur')
    const fm = gf.append('feMerge')
    fm.append('feMergeNode').attr('in', 'blur')
    fm.append('feMergeNode').attr('in', 'SourceGraphic')

    // Clip paths — one per node, sized to its circle radius
    defs.selectAll('.node-clip')
      .data(filteredNodes)
      .join('clipPath')
      .attr('class', 'node-clip')
      .attr('id', d => `clip-${d.id}`)
      .append('circle')
      .attr('r', d => getRadius(d))

    // Arrow markers per link type (tip of path = node edge)
    Object.entries(linkTypeConfig).forEach(([type, cfg]) => {
      if (!cfg.arrow) return
      defs.append('marker')
        .attr('id', `arr-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 9)
        .attr('refY', 0)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', cfg.stroke)
        .attr('opacity', 0.85)
    })

    // ── Zoom ───────────────────────────────────────────────────────────────
    const zoom = d3.zoom()
      .scaleExtent([0.05, 6])
      .on('zoom', e => g.attr('transform', e.transform))

    zoomRef.current = zoom
    svg.call(zoom).on('dblclick.zoom', null)
    svg.on('click', e => {
      if (e.target === svg.node()) onNodeSelect(null)
    })

    const g = svg.append('g')

    // ── Links ──────────────────────────────────────────────────────────────
    const linkSel = g.append('g').attr('class', 'links')
      .selectAll('path')
      .data(filteredLinks)
      .join('path')
      .attr('fill', 'none')
      .attr('class', d => linkTypeConfig[d.type]?.animated ? 'link-animated' : null)
      .attr('stroke', d => linkTypeConfig[d.type]?.stroke || '#555')
      .attr('stroke-width', d => linkTypeConfig[d.type]?.strokeWidth || 1)
      .attr('stroke-dasharray', d => linkTypeConfig[d.type]?.strokeDasharray || null)
      .attr('marker-end', d =>
        linkTypeConfig[d.type]?.arrow ? `url(#arr-${d.type})` : null
      )
      .attr('opacity', 0.55)

    linkSelRef.current = linkSel

    // ── Nodes ──────────────────────────────────────────────────────────────
    const nodeSel = g.append('g').attr('class', 'nodes')
      .selectAll('g')
      .data(filteredNodes)
      .join('g')
      .attr('class', 'node')
      .attr('cursor', 'pointer')
      .on('click', (e, d) => { e.stopPropagation(); onNodeSelect(d.id) })
      .on('mouseenter', function(_, d) {
        // Highlight connected neighbours
        const connected = new Set([d.id])
        filteredLinks.forEach(l => {
          const s = typeof l.source === 'object' ? l.source.id : l.source
          const t = typeof l.target === 'object' ? l.target.id : l.target
          if (s === d.id) connected.add(t)
          if (t === d.id) connected.add(s)
        })
        nodeSel.attr('opacity', n => connected.has(n.id) ? 1 : 0.15)
        linkSel.attr('opacity', l => {
          const s = typeof l.source === 'object' ? l.source.id : l.source
          const t = typeof l.target === 'object' ? l.target.id : l.target
          return (s === d.id || t === d.id) ? 0.85 : 0.05
        })
        // Show this node's label regardless of degree
        d3.select(this).select('text').style('display', 'block')
      })
      .on('mouseleave', function(_, d) {
        nodeSel.attr('opacity', 1)
        linkSel.attr('opacity', 0.55)
        d3.select(this).select('text')
          .style('display', (degree[d.id] || 0) >= 3 ? 'block' : 'none')
      })

    nodeSelRef.current = nodeSel

    // Node body
    nodeSel.append('circle')
      .attr('class', 'node-body')
      .attr('r', getRadius)
      .attr('fill', d => categoryConfig[d.category]?.fill || '#0d111c')
      .attr('stroke', d => categoryConfig[d.category]?.stroke || '#555')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#node-glow)')

    // Portrait image — clipped to circle; falls back through full → png → bare name
    nodeSel.append('image')
      .attr('href', d => `/portraits/${d.id}-head.webp`)
      .attr('x', d => -getRadius(d))
      .attr('y', d => -getRadius(d))
      .attr('width',  d => getRadius(d) * 2)
      .attr('height', d => getRadius(d) * 2)
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .on('error', function(_, d) {
        const el = d3.select(this)
        const fallbacks = [
          `/portraits/${d.id}-head.webp`,
          `/portraits/${d.id}-full.webp`,
          `/portraits/${d.id}-full.png`,
          `/portraits/${d.id}.webp`,
        ]
        const next = fallbacks[fallbacks.indexOf(el.attr('href')) + 1]
        if (next) el.attr('href', next)
        else el.remove()
      })

    // Label (only for important nodes)
    nodeSel.append('text')
      .text(d => d.name)
      .attr('dy', d => getRadius(d) + 13)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Cinzel, serif')
      .attr('font-size', d => (degree[d.id] || 0) >= 6 ? '11px' : '9px')
      .attr('fill', '#94a3b8')
      .attr('pointer-events', 'none')
      .attr('letter-spacing', '0.03em')
      .style('display', d => (degree[d.id] || 0) >= 3 ? 'block' : 'none')

    // ── Drag ──────────────────────────────────────────────────────────────
    nodeSel.call(
      d3.drag()
        .on('start', (e, d) => {
          if (!e.active) sim.alphaTarget(0.3).restart()
          d.fx = d.x; d.fy = d.y
        })
        .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y })
        .on('end', (e, d) => {
          if (!e.active) sim.alphaTarget(0)
          d.fx = null; d.fy = null
        })
    )

    // ── Simulation ────────────────────────────────────────────────────────
    const sim = d3.forceSimulation(filteredNodes)
      .force('link',
        d3.forceLink(filteredLinks)
          .id(d => d.id)
          .distance(85)
          .strength(0.3)
      )
      .force('charge',
        d3.forceManyBody()
          .strength(d => -120 - (degree[d.id] || 0) * 12)
      )
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.05))
      .force('collision',
        d3.forceCollide(d => getRadius(d) + 6)
      )

    // Helper: path d attribute (stops at node circumference so arrows land right)
    const pathD = d => {
      const sx = d.source.x ?? 0, sy = d.source.y ?? 0
      const tx = d.target.x ?? 0, ty = d.target.y ?? 0
      const dx = tx - sx, dy = ty - sy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 1) return ''

      const cfg = linkTypeConfig[d.type]
      const srcR = getRadius(d.source) + 2
      const tgtR = getRadius(d.target) + (cfg?.arrow ? 10 : 2)

      const ratio0 = Math.min(srcR / dist, 0.9)
      const ratio1 = Math.max(1 - tgtR / dist, ratio0 + 0.01)

      const x0 = sx + dx * ratio0, y0 = sy + dy * ratio0
      const x1 = sx + dx * ratio1, y1 = sy + dy * ratio1

      if (cfg?.curved) {
        const mx = (sx + tx) / 2 - dy * 0.25
        const my = (sy + ty) / 2 + dx * 0.25
        return `M${x0},${y0}Q${mx},${my} ${x1},${y1}`
      }
      return `M${x0},${y0}L${x1},${y1}`
    }

    sim.on('tick', () => {
      linkSel.attr('d', pathD)
      nodeSel.attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`)
    })

    // Auto-fit after 1.5 s (simulation mostly settled)
    const fitTimer = setTimeout(() => {
      try {
        const bounds = g.node().getBBox()
        if (bounds.width > 10 && bounds.height > 10) {
          const pad    = 60
          const scaleX = (width  - pad * 2) / bounds.width
          const scaleY = (height - pad * 2) / bounds.height
          const scale  = Math.min(scaleX, scaleY, 1.2)
          const tx     = (width  - scale * (bounds.x * 2 + bounds.width))  / 2
          const ty     = (height - scale * (bounds.y * 2 + bounds.height)) / 2
          svg.transition().duration(800).call(
            zoom.transform,
            d3.zoomIdentity.translate(tx, ty).scale(scale)
          )
        }
      } catch (_) { /* getBBox may fail before first paint */ }
    }, 1500)

    return () => {
      clearTimeout(fitTimer)
      sim.stop()
      d3.select(container).selectAll('*').remove()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catKey, linkKey])

  // ── Update selection highlight + zoom to node ─────────────────────────────
  useEffect(() => {
    const nodeSel   = nodeSelRef.current
    const getRadius = getRadiusRef.current
    if (!nodeSel || !getRadius) return

    // Visual highlight
    nodeSel.select('.node-body')
      .attr('stroke', d =>
        d.id === selectedNodeId
          ? '#ffffff'
          : categoryConfig[d.category]?.stroke || '#555'
      )
      .attr('stroke-width', d => d.id === selectedNodeId ? 3.5 : 2)
      .attr('r', d => getRadius(d) + (d.id === selectedNodeId ? 4 : 0))

    // Always show label for selected node
    nodeSel.select('text')
      .style('display', d =>
        d.id === selectedNodeId || (degreeRef.current[d.id] || 0) >= 3
          ? 'block'
          : 'none'
      )

    // ── Zoom to selected node ──────────────────────────────────────────────
    if (!selectedNodeId) return
    const svg  = svgRef.current
    const zoom = zoomRef.current
    if (!svg || !zoom) return

    const target = simNodesRef.current.find(n => n.id === selectedNodeId)
    if (!target || target.x == null) return

    const { width, height } = viewportRef.current
    const scale = 2.2
    svg.transition()
      .duration(600)
      .ease(d3.easeCubicInOut)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(scale)
          .translate(-target.x, -target.y)
      )
  }, [selectedNodeId])

  return <div ref={containerRef} className="w-full h-full" />
}
