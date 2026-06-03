import { useState, useEffect } from 'react'
import { nodes } from '../data/mythology'

// ── URL helpers ──────────────────────────────────────────────────────────────

export function getHeadImageUrl(node) {
  return `/deities/${node.head_image ?? node.id + '-head.webp'}`
}

export function getFullImageUrl(node) {
  return `/deities/${node.full_image ?? node.id + '-full.webp'}`
}

// Backward-compat alias (DetailPanel / Lightbox still import this)
export function getPortraitUrl(node) {
  return getHeadImageUrl(node)
}

// ── Head loader hook ─────────────────────────────────────────────────────────

// Probes all head images on mount; returns a Set that grows as images load.
export function useHeadLoader() {
  const [loaded, setLoaded] = useState(() => new Set())

  useEffect(() => {
    nodes.forEach(node => {
      const img = new Image()
      img.onload = () => setLoaded(prev => {
        const next = new Set(prev)
        next.add(node.id)
        return next
      })
      img.src = getHeadImageUrl(node)
    })
  }, [])

  return loaded
}

// Backward-compat alias
export function usePortraitLoader() {
  return useHeadLoader()
}
