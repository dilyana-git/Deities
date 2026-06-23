import { useState, useRef, useEffect } from 'react'
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
  const [selected, setSelected] = useState(0)   // Aries leads on open — sign 01 of the zodiac year
  const captionRef = useRef(null)

  const sign   = selected >= 0 ? ZODIAC[selected] : null
  // the Zodiac view speaks in one accent — gold. Element identity is carried by
  // the caption text ("AIR · …"), never colour, so no sign tints the UI purple.
  const accent = 'var(--gold)'

  const autoRef = useRef(null)
  const AUTO_MS = 6000

  function resetAuto() {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setSelected(s => (s + 1) % 12), AUTO_MS)
  }

  useEffect(() => {
    autoRef.current = setInterval(() => setSelected(s => (s + 1) % 12), AUTO_MS)
    return () => clearInterval(autoRef.current)
  }, [])

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
      if (e.key === 'ArrowRight') { setSelected(s => (s + 1) % 12); resetAuto() }
      else if (e.key === 'ArrowLeft') { setSelected(s => (s + 11) % 12); resetAuto() }
      else if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="gs-root zs-root" style={{ '--accent': accent }}>
      <ZodiacSphere signs={ZODIAC} selectedIndex={selected} onSelect={i => { setSelected(i); resetAuto() }} />

      <div className="grade wash" />
      <div className="grade stars" />
      <div className="grade vig" />

      {/* header bar */}
      <div className="zs-header">
        <button className="gs-exit" onClick={onClose} aria-label="Close zodiac view">✕</button>
        <div className="zs-header-text">
          <div className="gs-kicker">Twelve Tales Written in Stars</div>
          <div className="gs-storytitle">The Zodiac</div>
        </div>
        {sign && (
          <div className="zs-progress">
            <span className="zs-step">{String(selected + 1).padStart(2, '0')}</span>
            <span className="zs-slash">/</span>
            <span className="zs-total">12</span>
          </div>
        )}
      </div>

      {/* caption — intro prompt until a sign is chosen */}
      {sign ? (
        <div className="gs-caption zs-caption" ref={captionRef}>
          <div className="gs-cat" style={{ color: accent }}>
            {sign.element.toUpperCase()} · {sign.dates}
          </div>
          <h1 className="gs-name">
            <span className="zs-glyph" style={{ color: accent }}>{sign.symbol}</span>
            {sign.name}
          </h1>
          <div className="gs-epithet" style={{ color: accent }}>{sign.figure}</div>
          <p className="gs-narration">{sign.text}</p>
        </div>
      ) : (
        <div className="gs-caption zs-caption" ref={captionRef}>
          <div className="gs-cat" style={{ color: accent }}>Twelve Tales · One Turning Sky</div>
          <h1 className="gs-name">The Turning Sky</h1>
          <p className="gs-narration">
            The sphere drifts slowly through the heavens. Drag to turn it by hand, or choose a
            sign below to hear how it was set among the stars.
          </p>
        </div>
      )}

      {/* glyph strip — a quiet index; prev/next at the ends mark it navigable */}
      <div className="zs-strip">
        <button
          className="zs-rail-nav"
          onClick={() => { setSelected(s => (s + 11) % 12); resetAuto() }}
          aria-label="Previous sign"
        >‹</button>
        {ZODIAC.map((z, i) => {
          const isOn = i === selected
          return (
            <button
              key={z.id}
              className={`zs-glyph-btn ${isOn ? 'on' : ''}`}
              onClick={() => { setSelected(i); resetAuto() }}
              aria-label={z.name}
            >
              <span className="zs-sym">{z.symbol}</span>
              <span className="zs-sname">{z.name}</span>
            </button>
          )
        })}
        <button
          className="zs-rail-nav"
          onClick={() => { setSelected(s => (s + 1) % 12); resetAuto() }}
          aria-label="Next sign"
        >›</button>
      </div>
    </div>
  )
}
