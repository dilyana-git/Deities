import { useState, useCallback } from 'react'

export function useNodeSelection() {
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [hoveredNodeId,  setHoveredNodeId]  = useState(null)

  // Pan the SVG zoom so the selected node is centred.
  // Call after setSelectedNodeId so positions are current.
  const navigateTo = useCallback((nodeId, positions, zoomBehaviorRef, svgRef) => {
    if (!nodeId || !positions[nodeId] || !zoomBehaviorRef?.current || !svgRef?.current) return

    const svg    = svgRef.current
    const bounds = svg.getBoundingClientRect()
    const { x, y } = positions[nodeId]
    const cx = bounds.width  / 2
    const cy = bounds.height / 2

    const t = d3Transform(cx - x, cy - y, 1)
    import('d3').then(({ select, zoomIdentity }) => {
      select(svg)
        .transition()
        .duration(600)
        .call(
          zoomBehaviorRef.current.transform,
          zoomIdentity.translate(cx - x, cy - y)
        )
    })
  }, [])

  const selectNode = useCallback((id) => {
    setSelectedNodeId(prev => (prev === id ? null : id))
  }, [])

  return {
    selectedNodeId,
    setSelectedNodeId: selectNode,
    hoveredNodeId,
    setHoveredNodeId,
    navigateTo,
  }
}

// Tiny helper to avoid importing d3 at top-level in this hook
function d3Transform(x, y, k) {
  return { x, y, k }
}
