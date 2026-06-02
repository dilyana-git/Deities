import { useState, useEffect } from 'react'
import { nodes } from '../data/mythology'

export function getPortraitUrl(node) {
  return `/deities/${node.image ?? node.id + '.webp'}`
}

// Returns a Set of node IDs whose primary portrait image has loaded successfully.
// Images are probed once on mount; results arrive asynchronously as files load.
export function usePortraitLoader() {
  const [loaded, setLoaded] = useState(() => new Set())

  useEffect(() => {
    nodes.forEach(node => {
      const img = new Image()
      img.onload = () => setLoaded(prev => {
        const next = new Set(prev)
        next.add(node.id)
        return next
      })
      img.src = getPortraitUrl(node)
    })
  }, [])

  return loaded
}
