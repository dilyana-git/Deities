import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { getNodeRadius } from '../utils/graphHelpers'

const LINK_DISTANCE = {
  parent_of:      70,
  birthed:        70,
  lover_of:      110,
  enemy_of:      140,
  transformed_into: 100,
  cursed_into:   100,
  created_by:     90,
  merged_with:    60,
  split_from:     90,
}

export function useGraphSimulation(nodes, links, width, height) {
  const [positions, setPositions] = useState({})
  const simNodesRef    = useRef([])
  const simulationRef  = useRef(null)
  const tickCountRef   = useRef(0)

  useEffect(() => {
    if (!nodes.length || !width || !height) return

    // Shallow-copy nodes so D3 mutates copies, not source objects
    const simNodes = nodes.map(n => ({ id: n.id, _r: getNodeRadius(n) }))

    // Build link objects referencing the copies by id
    const simLinks = links.map(l => ({
      source: typeof l.source === 'object' ? l.source.id : l.source,
      target: typeof l.target === 'object' ? l.target.id : l.target,
      type:   l.type,
    }))

    const sim = d3.forceSimulation(simNodes)
      .force('link', d3.forceLink(simLinks)
        .id(d => d.id)
        .distance(d => LINK_DISTANCE[d.type] ?? 90)
        .strength(0.4)
      )
      .force('charge',  d3.forceManyBody().strength(-600))
      .force('center',  d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(d => d._r + 8).strength(0.7))
      .alphaDecay(0.02)
      .velocityDecay(0.4)

    sim.on('tick', () => {
      tickCountRef.current++
      // Update React state every 2 ticks to stay near 60fps without thrashing
      if (tickCountRef.current % 2 === 0) {
        const next = {}
        simNodes.forEach(n => { next[n.id] = { x: n.x ?? 0, y: n.y ?? 0 } })
        setPositions({ ...next })
      }
    })

    sim.on('end', () => {
      // Final snapshot when simulation fully settles
      const final = {}
      simNodes.forEach(n => { final[n.id] = { x: n.x ?? 0, y: n.y ?? 0 } })
      setPositions({ ...final })
    })

    simNodesRef.current   = simNodes
    simulationRef.current = sim

    return () => sim.stop()
  // Re-run only when topology or canvas size changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length, links.length, width, height])

  function restart(alpha = 0.3) {
    if (simulationRef.current) {
      simulationRef.current.alpha(alpha).restart()
    }
  }

  return { positions, simNodesRef, simulationRef, restart }
}
