import { useState, useRef, useEffect, useCallback } from 'react'
import ZodiacSphere from './ZodiacSphere.jsx'
import { ZODIAC } from '../data/zodiac.js'

/* ════════════════════════════════════════════════════════════════════════
   Zodiac Sky — a full-screen cinematic view of the twelve zodiac signs,
   each told through the Greek myth that set it among the stars.

   The centrepiece is a 3D-projected celestial sphere (ZodiacSphere) with
   all twelve constellations visible at once. Click a constellation or a
   glyph at the bottom to select it; drag the sphere to rotate. The
   caption panel shows the selected sign's myth.
   ════════════════════════════════════════════════════════════════════════ */
export default function ZodiacSky({ onClose }) {
  const [selected, setSelected] = useState(0)
  const captionRef = useRef(null)

  const sign   = ZODIAC[selected]
  const accent = sign.accent

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const el = captionRef.current
    if (!el) return
    el.classList.add('enter')
    const raf = requestAnimationFrame(() => el.classList.remove('enter'))
    return () => cancelAnimationFrame(raf)
  }, [selected])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') setSelected(s => (s + 1) % 12)
      else if (e.key === 'ArrowLeft') setSelected(s => (s + 11) % 12)
      else if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="gs-root zs-root" style={{ '--accent': accent }}>
      <ZodiacSphere signs={ZODIAC} selectedIndex={selected} onSelect={setSelected} />

      <div className="grade wash" />
      <div className="grade stars" />
      <div className="grade vig" />

      <button className="gs-exit" onClick={onClose} aria-label="Close zodiac view">✕</button>

      {/* top chrome */}
      <div className="gs-top">
        <div className="gs-story">
          <div className="gs-kicker">Twelve Tales Written in Stars</div>
          <div className="gs-storytitle">The Zodiac</div>
        </div>
      </div>

      {/* caption (lower-left) */}
      <div className="gs-caption zs-caption" ref={captionRef}>
        <div className="gs-cat" style={{ color: accent }}>
          {sign.element.toUpperCase()} · {sign.dates}
        </div>
        <h1 className="gs-name">
          <span className="zs-glyph" style={{ color: accent }}>{sign.symbol}</span>
          {sign.name}
        </h1>
        <div className="gs-epithet">{sign.figure}</div>
        <p className="gs-narration">{sign.text}</p>
      </div>

      {/* glyph strip */}
      <div className="zs-strip">
        {ZODIAC.map((z, i) => (
          <button
            key={z.id}
            className={`zs-glyph-btn ${i === selected ? 'on' : ''}`}
            onClick={() => setSelected(i)}
            aria-label={z.name}
            style={{ '--sa': z.accent }}
          >
            <span className="zs-sym">{z.symbol}</span>
            <span className="zs-sname">{z.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
