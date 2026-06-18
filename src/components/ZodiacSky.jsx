import { useState, useRef, useEffect, useCallback } from 'react'
import ConstellationStage from './ConstellationStage.jsx'
import { ZODIAC } from '../data/zodiac.js'

const AUTO_MS = 7000

/* ════════════════════════════════════════════════════════════════════════
   Zodiac Sky — a standalone cinematic presentation of the twelve zodiac
   signs, each told through the Greek myth that set it among the stars.
   Shares the Guided Sky "slide" look (.gs-* / .cl-* styles) but stands on
   its own: a single fixed sequence of 12 signs, real constellation shapes,
   and no atlas graph behind it.
   ════════════════════════════════════════════════════════════════════════ */
export default function ZodiacSky({ onClose }) {
  const [step, setStep]       = useState(0)
  const [playing, setPlaying] = useState(false)

  const captionRef = useRef(null)

  const sign   = ZODIAC[step]
  const accent = sign.accent

  /* lock page scroll while the overlay is open */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  /* caption re-entrance: commit hidden, then release next frame so the
     transition plays back to its visible resting state */
  useEffect(() => {
    const el = captionRef.current
    if (!el) return
    el.classList.add('enter')
    const raf = requestAnimationFrame(() => el.classList.remove('enter'))
    return () => cancelAnimationFrame(raf)
  }, [step])

  const next = useCallback(() => {
    setStep(s => {
      if (s >= ZODIAC.length - 1) { setPlaying(false); return s }
      return s + 1
    })
  }, [])

  const prev = useCallback(() => setStep(s => Math.max(0, s - 1)), [])

  function goto(i) { setStep(Math.min(Math.max(0, i), ZODIAC.length - 1)) }

  /* autoplay — restarts whenever the sign (or play state) changes */
  useEffect(() => {
    if (!playing) return
    const timer = setTimeout(next, AUTO_MS)
    return () => clearTimeout(timer)
  }, [step, playing, next])

  /* keyboard nav */
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p) }
      else if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, onClose])

  return (
    <div className="gs-root" style={{ '--accent': accent }}>
      <ConstellationStage fig={sign.id} accent={accent} spec={sign} />
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
        <div className="gs-counter">
          <span className="gs-stepnum">{String(step + 1).padStart(2, '0')}</span>
          <span className="sl">/</span>
          <span className="gs-steptotal">{String(ZODIAC.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* caption */}
      <div className="gs-caption" ref={captionRef}>
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

      <div className="gs-hint">← → to move · space to play</div>

      {/* bottom scrubber */}
      <div className="gs-bottom">
        <div className="gs-rail">
          <div className="gs-rail-fill" style={{ width: `${((step + 1) / ZODIAC.length) * 100}%` }} />
        </div>
        <div className="gs-strip-row">
          <button className="gs-nav" onClick={prev} aria-label="Previous">◂</button>
          <button className={`gs-play ${playing ? 'playing' : ''}`} onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'}>
            <span className="play">▶</span><span className="pause">❚❚</span>
          </button>
          <div className="gs-strip">
            {ZODIAC.map((z, i) => (
              <button key={z.id} className={`gs-cell ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`} onClick={() => goto(i)}>
                <span className="gs-cell-n">{z.symbol} {String(i + 1).padStart(2, '0')}</span>
                <span className="gs-cell-name">{z.name}</span>
                <span className="gs-cell-bar" />
              </button>
            ))}
          </div>
          <button className="gs-nav" onClick={next} aria-label="Next">▸</button>
        </div>
      </div>
    </div>
  )
}
