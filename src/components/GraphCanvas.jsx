import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { nodes as allNodes, links as allLinks } from '../data/mythology'
import { categoryConfig } from '../data/categoryConfig'
import { linkTypeConfig } from '../data/linkTypeConfig'
import { useGraphSimulation } from '../hooks/useGraphSimulation'
import { getNodeRadius, getNeighborIds } from '../utils/graphHelpers'
import { getHeadImageUrl } from '../hooks/usePortraitLoader'
import NodeTooltip from './NodeTooltip'

// One clipPath per unique node radius — shared across all nodes of the same size.
// clipPathUnits defaults to userSpaceOnUse, so cx/cy are relative to the
// referencing element's local coordinate system (i.e., each translated node <g>).
const CLIP_RADII = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26]

// Arrowhead marker IDs keyed by link type
const ARROW_TYPES = ['parent_of', 'birthed', 'transformed_into', 'cursed_into', 'created_by']

// Shorter display names for long monster names at low zoom
const SHORT_NAMES = {
  hydra:           'Hydra',
  caucasian_eagle: 'Eagle',
  colchian_dragon: 'Dragon',
  nemean_lion:     'Nemean Lion',
  moirai:          'Moirai',
  graeae:          'Graeae',
  muses:           'Muses',
  humanity:        'Humanity',
}
function getDisplayName(node, zoom) {
  if (zoom >= 1.4) return node.name
  return SHORT_NAMES[node.id] ?? node.name
}

export default function GraphCanvas({
  selectedNodeId, onNodeClick,
  filterCategory, searchTerm, filterArchetype,
  focusMode,
  headLoaded,
}) {
  const containerRef = useRef(null)
  const svgRef       = useRef(null)
  const zoomRef      = useRef(null)
  const cloudRef     = useRef(null)
  const [dims, setDims]         = useState({ w: 800, h: 600 })
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 })
  const [tooltip, setTooltip]   = useState({ node: null, x: 0, y: 0 })

  // ── Pause cloud animations when tab is hidden (saves battery) ───────────
  useEffect(() => {
    const el = cloudRef.current
    if (!el) return
    const handler = () => el.classList.toggle('paused', document.hidden)
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  // ── Resize observer ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setDims({ w: width, h: height })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // ── Simulation ───────────────────────────────────────────────────────────
  const { positions, simNodesRef, simulationRef, restart } =
    useGraphSimulation(allNodes, allLinks, dims.w, dims.h)

  // ── Zoom behaviour ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!svgRef.current) return
    const zoom = d3.zoom()
      .scaleExtent([0.25, 4])
      .on('zoom', event => {
        const { x, y, k } = event.transform
        setTransform({ x, y, k })
      })
    d3.select(svgRef.current).call(zoom)
    zoomRef.current = zoom
    return () => d3.select(svgRef.current).on('.zoom', null)
  }, [])

  // ── Reset view ───────────────────────────────────────────────────────────
  const resetView = useCallback(() => {
    if (!svgRef.current || !zoomRef.current) return
    d3.select(svgRef.current)
      .transition().duration(500)
      .call(zoomRef.current.transform, d3.zoomIdentity)
  }, [])

  // ── Navigate to a node (from DetailPanel click) ──────────────────────────
  const navigateToNode = useCallback((nodeId) => {
    if (!positions[nodeId] || !svgRef.current || !zoomRef.current) return
    const { x, y } = positions[nodeId]
    const tx = dims.w / 2 - x
    const ty = dims.h / 2 - y
    d3.select(svgRef.current)
      .transition().duration(600)
      .call(zoomRef.current.transform, d3.zoomIdentity.translate(tx, ty).scale(1.2))
  }, [positions, dims])

  // Navigate when selectedNodeId changes
  useEffect(() => {
    if (selectedNodeId) navigateToNode(selectedNodeId)
  }, [selectedNodeId]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Filter logic ─────────────────────────────────────────────────────────
  const visibleNodeIds = useMemo(() => {
    const ids = new Set()
    allNodes.forEach(n => {
      if (filterCategory !== 'all' && n.category !== filterCategory) return
      if (filterArchetype !== 'all' && n.jungian_archetype !== filterArchetype) return
      ids.add(n.id)
    })
    return ids
  }, [filterCategory, filterArchetype])

  const searchIds = useMemo(() => {
    if (!searchTerm.trim()) return null
    const term = searchTerm.toLowerCase()
    const ids = new Set()
    allNodes.forEach(n => {
      if (n.name.toLowerCase().includes(term) ||
          n.epithet?.toLowerCase().includes(term) ||
          n.domains?.some(d => d.toLowerCase().includes(term))) {
        ids.add(n.id)
      }
    })
    return ids
  }, [searchTerm])

  const neighborIds = useMemo(() =>
    selectedNodeId ? getNeighborIds(selectedNodeId, allLinks) : null,
  [selectedNodeId])

  // ── Label direction — push label away from neighbor centroid ──────────────
  const labelOffsets = useMemo(() => {
    const offsets = {}
    allNodes.forEach(node => {
      const pos = positions[node.id]
      if (!pos) return
      const r = getNodeRadius(node)
      let sx = 0, sy = 0, count = 0
      for (const link of allLinks) {
        const src = typeof link.source === 'object' ? link.source.id : link.source
        const tgt = typeof link.target === 'object' ? link.target.id : link.target
        const otherId = src === node.id ? tgt : tgt === node.id ? src : null
        if (!otherId) continue
        const other = positions[otherId]
        if (!other) continue
        sx += other.x - pos.x
        sy += other.y - pos.y
        count++
      }
      if (!count) {
        offsets[node.id] = { dx: 0, dy: r + 14, anchor: 'middle' }
      } else {
        const angle = Math.atan2(-sy / count, -sx / count)
        const dist  = r + 14
        const dx    = Math.cos(angle) * dist
        const dy    = Math.sin(angle) * dist
        offsets[node.id] = {
          dx,
          dy,
          anchor: dx > 6 ? 'start' : dx < -6 ? 'end' : 'middle',
        }
      }
    })
    return offsets
  }, [positions])

  // ── Label visibility — proximity culling + zoom gating ────────────────────
  const labelVisible = useMemo(() => {
    const k = transform.k
    const visible = new Set()

    // Always show selected node and its immediate neighbors
    if (selectedNodeId) {
      visible.add(selectedNodeId)
      if (neighborIds) neighborIds.forEach(id => visible.add(id))
    }

    if (k < 0.45) return visible          // nothing else at very low zoom
    if (k < 0.72) return visible          // only selected+neighbors at medium-low zoom

    // At higher zoom: show labels for nodes not crowded by neighbors
    // threshold in graph-space: shrinks as you zoom in → more labels appear on zoom
    const thresh2 = (62 / k) ** 2
    const nodeList = allNodes
      .filter(n => visibleNodeIds.has(n.id) && positions[n.id])
      .map(n => ({ id: n.id, pos: positions[n.id] }))

    nodeList.forEach(({ id, pos }) => {
      if (visible.has(id)) return
      for (const other of nodeList) {
        if (other.id === id) continue
        const dx = other.pos.x - pos.x
        const dy = other.pos.y - pos.y
        if (dx * dx + dy * dy < thresh2) return  // too close — skip
      }
      visible.add(id)
    })

    return visible
  }, [positions, transform.k, selectedNodeId, neighborIds, visibleNodeIds])

  // ── Drag handlers ────────────────────────────────────────────────────────
  const handleNodePointerDown = useCallback((e, nodeId) => {
    e.stopPropagation()
    const simNode = simNodesRef.current.find(n => n.id === nodeId)
    if (!simNode) return

    const svgRect = svgRef.current.getBoundingClientRect()

    const onMove = (mv) => {
      const svgX = (mv.clientX - svgRect.left - transform.x) / transform.k
      const svgY = (mv.clientY - svgRect.top  - transform.y) / transform.k
      simNode.fx = svgX
      simNode.fy = svgY
      if (simulationRef.current) simulationRef.current.alphaTarget(0.3).restart()
    }
    const onUp = () => {
      simNode.fx = null
      simNode.fy = null
      if (simulationRef.current) simulationRef.current.alphaTarget(0)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup',   onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup',   onUp)
  }, [transform, simNodesRef, simulationRef])

  // ── Node opacity ─────────────────────────────────────────────────────────
  const getNodeOpacity = useCallback((node) => {
    if (!visibleNodeIds.has(node.id))   return 0   // filtered out
    if (searchIds && !searchIds.has(node.id)) return 0.12
    if (!selectedNodeId)                return 1
    if (node.id === selectedNodeId)     return 1
    if (neighborIds?.has(node.id))      return 1
    return focusMode ? 0.06 : 0.22
  }, [visibleNodeIds, searchIds, selectedNodeId, neighborIds, focusMode])

  // ── Link opacity ─────────────────────────────────────────────────────────
  const getLinkOpacity = useCallback((link) => {
    const src = typeof link.source === 'object' ? link.source.id : link.source
    const tgt = typeof link.target === 'object' ? link.target.id : link.target
    if (!visibleNodeIds.has(src) || !visibleNodeIds.has(tgt)) return 0
    if (!selectedNodeId) return 0.35
    if (src === selectedNodeId || tgt === selectedNodeId) return 0.9
    return focusMode ? 0.03 : 0.1
  }, [visibleNodeIds, selectedNodeId, focusMode])

  const { x: tx, y: ty, k: tk } = transform

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, #0d1424 0%, #05080f 70%, #020408 100%)' }}
    >
      {/* ── Cloud layers (parallax, GPU-composited) ──────────────────────── */}
      <div ref={cloudRef} className="bg-clouds" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>

        {/* Far cloud stratum — slow horizontal drift + gentle sway */}
        <div className="cloud-sway-far" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div className="cloud-far-track" style={{ width: '200%', height: '100%', willChange: 'transform', transform: 'translateZ(0)' }} />
        </div>

        {/* Near wisp stratum — opposite drift direction, slightly faster */}
        <div className="cloud-sway-near" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div className="cloud-near-track" style={{ width: '200%', height: '100%', willChange: 'transform', transform: 'translateZ(0)' }} />
        </div>

      </div>

      <svg
        ref={svgRef}
        width="100%" height="100%"
        style={{ display: 'block', cursor: 'grab', position: 'relative' }}
      >
        <defs>
          {/* Grain texture */}
          <filter id="grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise"/>
            <feColorMatrix type="saturate" values="0" in="noise" result="grey"/>
            <feBlend in="SourceGraphic" in2="grey" mode="multiply" result="blend"/>
            <feComponentTransfer in="blend">
              <feFuncA type="linear" slope="0.97"/>
            </feComponentTransfer>
          </filter>

          {/* Label shadow */}
          <filter id="label-shadow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#000000" floodOpacity="0.9"/>
          </filter>

          {/* Portrait clip paths — one per unique node radius */}
          {CLIP_RADII.map(r => (
            <clipPath key={r} id={`clip-r${r}`}>
              <circle cx="0" cy="0" r={r} />
            </clipPath>
          ))}

          {/* Arrowhead markers */}
          {ARROW_TYPES.map(type => {
            const cfg = linkTypeConfig[type]
            if (!cfg) return null
            return (
              <marker
                key={type}
                id={`arrow-${type}`}
                markerWidth="8" markerHeight="8"
                refX="7" refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L8,3 z" fill={cfg.stroke} opacity="0.8" />
              </marker>
            )
          })}
        </defs>

        {/* Grain texture overlay — sits above the HTML cloud layers */}
        <rect width="100%" height="100%" fill="#07090e" filter="url(#grain)" opacity="0.22" />

        {/* Zoomable graph group */}
        <g transform={`translate(${tx},${ty}) scale(${tk})`}>

          {/* ── LINKS ───────────────────────────────────────────────────── */}
          {allLinks.map((link, i) => {
            const srcId = typeof link.source === 'object' ? link.source.id : link.source
            const tgtId = typeof link.target === 'object' ? link.target.id : link.target
            const sp = positions[srcId]
            const tp = positions[tgtId]
            if (!sp || !tp) return null

            const cfg      = linkTypeConfig[link.type] ?? linkTypeConfig.parent_of
            const opacity  = getLinkOpacity(link)
            if (opacity === 0) return null

            const hasArrow = cfg.arrow && ARROW_TYPES.includes(link.type)
            const markerId = hasArrow ? `url(#arrow-${link.type})` : undefined

            // Shorten line so it doesn't overlap node circles
            const srcNode = allNodes.find(n => n.id === srcId)
            const tgtNode = allNodes.find(n => n.id === tgtId)
            const r1 = getNodeRadius(srcNode) + 2
            const r2 = getNodeRadius(tgtNode) + 2
            const dx = tp.x - sp.x
            const dy = tp.y - sp.y
            const dist = Math.sqrt(dx * dx + dy * dy) || 1
            const x1 = sp.x + (dx / dist) * r1
            const y1 = sp.y + (dy / dist) * r1
            const x2 = tp.x - (dx / dist) * r2
            const y2 = tp.y - (dy / dist) * r2

            // Curved paths for lover_of
            if (cfg.curved) {
              const mx = (x1 + x2) / 2 - (dy / dist) * 30
              const my = (y1 + y2) / 2 + (dx / dist) * 30
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                  fill="none"
                  stroke={cfg.stroke}
                  strokeWidth={cfg.strokeWidth}
                  strokeDasharray={cfg.strokeDasharray ?? undefined}
                  opacity={opacity}
                  markerEnd={markerId}
                  className={cfg.animated ? `link-${link.type.replace('_into','')}` : ''}
                />
              )
            }

            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={cfg.stroke}
                strokeWidth={cfg.strokeWidth}
                strokeDasharray={cfg.strokeDasharray ?? undefined}
                opacity={opacity}
                markerEnd={markerId}
                className={cfg.animated ? `link-${link.type.replace('_into','')}` : ''}
              />
            )
          })}

          {/* ── NODES ───────────────────────────────────────────────────── */}
          {allNodes.map(node => {
            const pos = positions[node.id]
            if (!pos) return null
            const opacity = getNodeOpacity(node)
            if (opacity === 0) return null

            const r       = getNodeRadius(node)
            const cat     = categoryConfig[node.category] ?? {}
            const isSelected = node.id === selectedNodeId
            const isHovered  = node.id === tooltip.node?.id

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{ opacity, cursor: 'pointer' }}
                onClick={() => onNodeClick(node.id)}
                onPointerDown={e => handleNodePointerDown(e, node.id)}
                onPointerEnter={e => setTooltip({
                  node,
                  x: e.clientX - (svgRef.current?.getBoundingClientRect().left ?? 0),
                  y: e.clientY - (svgRef.current?.getBoundingClientRect().top  ?? 0),
                })}
                onPointerLeave={() => setTooltip({ node: null, x: 0, y: 0 })}
              >
                {/* Selected ring — gold pulse (always outside portrait/circle) */}
                {isSelected && (
                  <circle
                    r={r + 8}
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="1.5"
                    className="node-selected-ring"
                    style={{ pointerEvents: 'none' }}
                  />
                )}

                {headLoaded?.has(node.id) ? (
                  /* ── Head portrait: clipped image + category ring ─────── */
                  <>
                    <image
                      href={getHeadImageUrl(node)}
                      x={-r} y={-r} width={r * 2} height={r * 2}
                      clipPath={`url(#clip-r${r})`}
                      preserveAspectRatio="xMidYMid slice"
                      style={{ pointerEvents: 'none' }}
                    />
                    {/* Category-colored ring on top of portrait */}
                    <circle
                      r={r}
                      fill="none"
                      stroke={isSelected ? '#c9a84c' : cat.stroke ?? '#666'}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.5}
                      style={{ pointerEvents: 'none' }}
                    />
                  </>
                ) : (
                  /* ── No image: solid colored circle ──────────────────── */
                  <circle
                    r={r}
                    fill={cat.fill ?? '#111'}
                    stroke={isSelected ? '#c9a84c' : cat.stroke ?? '#666'}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.5}
                    style={{
                      transform: isHovered && !isSelected ? 'scale(1.25)' : 'scale(1)',
                      transformOrigin: '0 0',
                      transition: 'transform 0.15s, stroke-width 0.15s',
                    }}
                  />
                )}

                {/* Label — only when not crowded */}
                {labelVisible.has(node.id) && (() => {
                  const off = labelOffsets[node.id] ?? { dx: 0, dy: r + 14, anchor: 'middle' }
                  return (
                    <text
                      x={off.dx}
                      y={off.dy}
                      textAnchor={off.anchor}
                      dominantBaseline="central"
                      fontSize={isSelected ? '13' : '11.5'}
                      fontFamily="Cinzel, serif"
                      fill={isSelected ? '#c9a84c' : 'rgba(255,255,255,0.82)'}
                      filter="url(#label-shadow)"
                      style={{ pointerEvents: 'none' }}
                    >
                      {getDisplayName(node, transform.k)}
                    </text>
                  )
                })()}
              </g>
            )
          })}
        </g>
      </svg>

      {/* Reset view button */}
      <button
        onClick={resetView}
        className="absolute bottom-4 right-4 px-3 py-1.5 text-[11px] transition-colors"
        style={{
          fontFamily:    'Cinzel, serif',
          letterSpacing: '0.1em',
          color:         '#6b7280',
          background:    '#0d111c',
          border:        '1px solid #1e2a3a',
          cursor:        'pointer',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
        onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
      >
        ⊙ RESET VIEW
      </button>

      {/* Hover tooltip */}
      <NodeTooltip node={tooltip.node} x={tooltip.x} y={tooltip.y} />
    </div>
  )
}
