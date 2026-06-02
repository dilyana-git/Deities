import { useEffect, useState } from 'react'
import { nodes } from '../data/mythology'
import { getPortraitUrl } from '../hooks/usePortraitLoader'

// Probe whether additional variant images ({id}-2.webp, {id}-3.webp …) exist.
function useGallery(node) {
  const [gallery, setGallery] = useState(() => [getPortraitUrl(node)])

  useEffect(() => {
    if (!node) return
    const base = node.id
    const urls = [getPortraitUrl(node)]
    let i = 2

    function tryNext() {
      const url = `/deities/${base}-${i}.webp`
      const img = new Image()
      img.onload = () => {
        urls.push(url)
        i++
        tryNext()
      }
      img.onerror = () => {
        if (urls.length > 1) setGallery([...urls])
      }
      img.src = url
    }
    tryNext()
  }, [node])

  return gallery
}

export default function Lightbox({ nodeId, onClose }) {
  const node = nodes.find(n => n.id === nodeId)
  const gallery = useGallery(node)
  const [index, setIndex] = useState(0)

  // Reset index when a different deity is opened
  useEffect(() => { setIndex(0) }, [nodeId])

  // Escape key closes
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!node) return null

  const hasPrev = index > 0
  const hasNext = index < gallery.length - 1

  return (
    <div
      onClick={onClose}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         1000,
        background:     'rgba(5,8,15,0.92)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position:   'absolute',
          top:        16,
          right:      20,
          background: 'none',
          border:     '1px solid #1e2a3a',
          color:      '#6b7280',
          fontFamily: 'Cinzel, serif',
          fontSize:   16,
          width:      36,
          height:     36,
          cursor:     'pointer',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
        onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
      >
        ✕
      </button>

      {/* Image + arrows */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}
      >
        {/* Left arrow */}
        <button
          onClick={() => setIndex(i => i - 1)}
          disabled={!hasPrev}
          style={{
            background: 'none',
            border:     '1px solid #1e2a3a',
            color:      hasPrev ? '#c9a84c' : '#1e2a3a',
            fontFamily: 'serif',
            fontSize:   28,
            width:      44,
            height:     44,
            cursor:     hasPrev ? 'pointer' : 'default',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          ‹
        </button>

        {/* Portrait */}
        <img
          key={gallery[index]}
          src={gallery[index]}
          alt={node.name}
          style={{
            maxWidth:   '80vw',
            maxHeight:  '78vh',
            objectFit:  'contain',
            display:    'block',
            border:     '1px solid #1e2a3a',
          }}
        />

        {/* Right arrow */}
        <button
          onClick={() => setIndex(i => i + 1)}
          disabled={!hasNext}
          style={{
            background: 'none',
            border:     '1px solid #1e2a3a',
            color:      hasNext ? '#c9a84c' : '#1e2a3a',
            fontFamily: 'serif',
            fontSize:   28,
            width:      44,
            height:     44,
            cursor:     hasNext ? 'pointer' : 'default',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          ›
        </button>
      </div>

      {/* Caption */}
      <div
        style={{ textAlign: 'center', marginTop: 20, pointerEvents: 'none' }}
        onClick={e => e.stopPropagation()}
      >
        <div
          style={{
            fontFamily:    'Cinzel, serif',
            fontSize:       18,
            color:          '#e2e8f0',
            letterSpacing:  '0.08em',
          }}
        >
          {node.name}
        </div>
        <div
          style={{
            fontFamily: '"Crimson Pro", Georgia, serif',
            fontStyle:  'italic',
            fontSize:    13,
            color:       '#6b7280',
            marginTop:   4,
          }}
        >
          {node.epithet}
        </div>
        {gallery.length > 1 && (
          <div
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize:    10,
              color:       '#374151',
              letterSpacing: '0.1em',
              marginTop:   8,
            }}
          >
            {index + 1} / {gallery.length}
          </div>
        )}
      </div>
    </div>
  )
}
