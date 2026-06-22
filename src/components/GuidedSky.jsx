import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import ConstellationStage from './ConstellationStage.jsx'
import { TOURS } from '../data/tours.js'
import { nodes as allNodes } from '../data/mythology.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { CAT } from './SkyGraph.jsx'

const AUTO_MS = 6500

/* ════════════════════════════════════════════════════════════════════════
   Guided Sky — full-screen cinematic story presentation. Each tour beat is
   a "slide": the figure's abstract constellation fills the frame while its
   narration sits over it. Plays like a film — autoplay, keyboard nav, a
   chapter scrubber, and a tale picker.
   ════════════════════════════════════════════════════════════════════════ */
export default function GuidedSky({ initialTourId, onClose, onBeatChange }) {
  const initialIdx = Math.max(0, TOURS.findIndex(t => t.id === initialTourId))
  const [tourIdx, setTourIdx]   = useState(initialIdx)
  const [step, setStep]         = useState(0)
  const [playing, setPlaying]   = useState(false)
  const [talesOpen, setTalesOpen] = useState(false)

  const captionRef = useRef(null)
  const talesRef   = useRef(null)

  const nodeById = useMemo(() => Object.fromEntries(allNodes.map(n => [n.id, n])), [])

  const tour  = TOURS[tourIdx]
  const beat  = tour.beats[step]
  const node  = nodeById[beat.fig]
  const accent   = CAT[node?.category] || CAT.primordial
  const catLabel = (categoryConfig[node?.category]?.label || '').toUpperCase()

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
  }, [tourIdx, step])

  /* graph sync: light the figure behind the overlay as the story advances */
  useEffect(() => {
    onBeatChange?.(beat.fig)
  }, [beat.fig, onBeatChange])

  const next = useCallback(() => {
    setStep(s => {
      if (s >= tour.beats.length - 1) { setPlaying(false); return s }
      return s + 1
    })
  }, [tour])

  const prev = useCallback(() => setStep(s => Math.max(0, s - 1)), [])

  function goto(i) { setStep(Math.min(Math.max(0, i), tour.beats.length - 1)) }

  function selectTour(i) {
    setTourIdx(i)
    setStep(0)
    setTalesOpen(false)
  }

  /* autoplay — restarts whenever the beat (or play state) changes */
  useEffect(() => {
    if (!playing) return
    const timer = setTimeout(next, AUTO_MS)
    return () => clearTimeout(timer)
  }, [tourIdx, step, playing, next])

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

  /* close the tale picker on outside click */
  useEffect(() => {
    if (!talesOpen) return
    function outside(e) { if (talesRef.current && !talesRef.current.contains(e.target)) setTalesOpen(false) }
    document.addEventListener('click', outside)
    return () => document.removeEventListener('click', outside)
  }, [talesOpen])

  return (
    <div className="gs-root" style={{ '--accent': accent }}>
      <ConstellationStage fig={beat.fig} accent={accent} />
      <div className="grade wash" />
      <div className="grade stars" />
      <div className="grade vig" />

      <button className="gs-exit" onClick={onClose} aria-label="Close story mode">✕</button>

      {/* top chrome — the rail (bottom) owns position; no competing counter here */}
      <div className="gs-top">
        <div className="gs-story">
          <div className="gs-kicker">{tour.kicker}</div>
          <div className="gs-storytitle">{tour.title}</div>
        </div>
      </div>

      {/* story switcher (between tours — distinct from the rail's chapter nav) */}
      <div className={`gs-tales ${talesOpen ? 'open' : ''}`} ref={talesRef}>
        <button className="gs-tales-btn" onClick={() => setTalesOpen(o => !o)}>
          <span>Stories</span><span className="car">▾</span>
        </button>
        <div className="gs-tales-list">
          {TOURS.map((t, i) => (
            <button key={t.id} className={`gs-tale ${i === tourIdx ? 'on' : ''}`} onClick={() => selectTour(i)}>
              <span className="gs-tale-k">{t.kicker}</span>
              <span className="gs-tale-t">{t.title}</span>
              <span className="gs-tale-n">{t.beats.length} chapters</span>
            </button>
          ))}
        </div>
      </div>

      {/* caption */}
      <div className="gs-caption" ref={captionRef}>
        <div className="gs-cat" style={{ color: accent }}>{catLabel}</div>
        <h1 className="gs-name">{node?.name || beat.fig}</h1>
        <div className="gs-epithet">{node?.epithet}</div>
        <p className="gs-narration">{beat.text}</p>
      </div>

      <div className="gs-hint">← → to move · space to play</div>

      {/* bottom scrubber */}
      <div className="gs-bottom">
        <div className="gs-rail">
          <div className="gs-rail-fill" style={{ width: `${((step + 1) / tour.beats.length) * 100}%` }} />
        </div>
        <div className="gs-strip-row">
          <button className="gs-nav" onClick={prev} aria-label="Previous">◂</button>
          <button className={`gs-play ${playing ? 'playing' : ''}`} onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'}>
            <span className="play">▶</span><span className="pause">❚❚</span>
          </button>
          <div className="gs-strip">
            {tour.beats.map((b, i) => (
              <button key={i} className={`gs-cell ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`} onClick={() => goto(i)}>
                <span className="gs-cell-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="gs-cell-name">{nodeById[b.fig]?.name || b.fig}</span>
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
