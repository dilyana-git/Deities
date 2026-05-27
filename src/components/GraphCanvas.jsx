import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { nodes as allNodes, links as allLinks } from '../data/mythology'
import { categoryConfig } from '../data/categoryConfig'
import { linkTypeConfig } from '../data/linkTypeConfig'
import { useGraphSimulation } from '../hooks/useGraphSimulation'
import { getNodeRadius, getNeighborIds } from '../utils/graphHelpers'
import NodeTooltip from './NodeTooltip'

// Arrowhead marker IDs keyed by link type
const ARROW_TYPES = ['parent_of', 'birthed', 'transformed_into', 'cursed_into', 'created_by']

export default function GraphCanvas({
  selectedNodeId, onNodeSelect,
  filterCategory, searchTerm, filterArchetype,
  focusMode,
}) {
  const containerRef = useRef(null)
  const svgRef       = useRef(null)
  const zoomRef      = useRef(null)
  const [dims, setDims]         = useState({ w: 800, h: 600 })
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 })
  const [tooltip, setTooltip]   = useState({ node: null, x: 0, y: 0 })

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
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <svg
        ref={svgRef}
        width="100%" height="100%"
        style={{ display: 'block', cursor: 'grab' }}
      >
        <defs>
          {/* Radial gradient background */}
          <radialGradient id="bg-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%"   stopColor="#0d1424" />
            <stop offset="70%"  stopColor="#05080f" />
            <stop offset="100%" stopColor="#020408" />
          </radialGradient>

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

        {/* Background */}
        <rect width="100%" height="100%" fill="url(#bg-grad)" />
        <rect width="100%" height="100%" fill="transparent" filter="url(#grain)" opacity="0.18" />

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
                onClick={() => onNodeSelect(node.id)}
                onPointerDown={e => handleNodePointerDown(e, node.id)}
                onPointerEnter={e => setTooltip({
                  node,
                  x: e.clientX - (svgRef.current?.getBoundingClientRect().left ?? 0),
                  y: e.clientY - (svgRef.current?.getBoundingClientRect().top  ?? 0),
                })}
                onPointerLeave={() => setTooltip({ node: null, x: 0, y: 0 })}
              >
                {/* Selected ring — gold pulse */}
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

                {/* Main circle */}
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

                {/* Label */}
                <text
                  y={r + 13}
                  textAnchor="middle"
                  fontSize="12"
                  fontFamily="Cinzel, serif"
                  fill="rgba(255,255,255,0.88)"
                  filter="url(#label-shadow)"
                  style={{ pointerEvents: 'none' }}
                >
                  {node.name}
                </text>
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
