import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { TOURS } from '../data/tours.js'
import { nodes as allNodes } from '../data/mythology.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { CAT, portraitSources } from './SkyGraph.jsx'

const NUMERALS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ']
const _nodeMap = Object.fromEntries(allNodes.map(n => [n.id, n]))

/* autoplay dwell: long enough to read the beat — base + per-character */
const beatMs = b => 4200 + Math.min(b.text.length, 360) * 26

/* walk the shared portrait candidate chain (both folders × name styles × formats) */
function usePortrait(id) {
  const chain = useMemo(() => portraitSources(id), [id])
  const [idx, setIdx] = useState(0)
  return { src: idx < chain.length ? chain[idx] : null, onError: () => setIdx(i => i + 1) }
}

/* orbital plane: sun centre + the two rings planets alternate between, all in
   % of `.so-plane` — a square box sized from ONE base radius in min-axis units
   (see index.css). Both radii of a ring derive from that base, so the ellipse
   holds its shape at every aspect instead of stretching with the stage. */
const CX = 50, CY = 50               // the sun, at the plane's centre
const TILT = 0.62                    // ry ÷ rx — how far the plane is tipped
const RINGS = [0.63, 1].map(f => ({ rx: 50 * f, ry: 50 * f * TILT }))

/* one tour beat = a planet. Its face is the figure's portrait, dissolving to
   the gradient orb if none loads */
function BeatPlanet({ beat, i, cur, planet, onSelect }) {
  const p = planet
  const { src, onError } = usePortrait(beat.fig)
  const node = _nodeMap[beat.fig]
  return (
    <button
      className={`so-planet ${i === cur ? 'on' : i < cur ? 'told' : 'ahead'}`}
      style={{
        left: `${p.left}%`, top: `${p.top}%`,
        '--sz': `${p.size}px`, '--mid-c': p.color,
        '--fdur': `${5 + i * 0.9}s`, '--fdelay': `${i * 0.7}s`,
        '--ig': `${0.55 + i * 0.11}s`,
      }}
      onClick={() => onSelect(i)}
      aria-label={`Chapter ${i + 1}: ${node?.name || beat.fig}`}
    >
      <span className="so-float">
        <span className={`so-orb ${src ? 'has-face' : ''}`}>
          {src && <img className="face" src={src} alt="" draggable="false" onError={onError}/>}
        </span>
      </span>
      <span className="so-tag"><span className="n">{NUMERALS[i] || i + 1}</span>{node?.name || beat.fig}</span>
    </button>
  )
}

/* the tour's current figure, burning at the centre — its portrait cross-fades
   in whenever the tale moves to a new star (the component is keyed by fig) */
function Sun({ fig }) {
  const { src, onError } = usePortrait(fig)
  const node = _nodeMap[fig]
  return (
    <div className="so-sun" style={{ left: `${CX}%`, top: `${CY}%` }}>
      <div className="so-sun-orb">
        {src && <img src={src} alt="" draggable="false" onError={onError}/>}
      </div>
      <div className="so-sun-name">{node?.name || fig}</div>
      {node?.epithet && <div className="so-sun-epithet">{node.epithet}</div>}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Guided Sky — full-screen cinematic story presentation, laid out as a small
   solar system (mirroring the Story Orbit). Each tour is a constellation of
   figures: every beat is a planet floating on its orbit, the figure the
   narration currently dwells on burns at the centre as the sun, and a golden
   thread is traced from chapter to chapter so the tale hangs in the sky. One
   beat shows in the caption at a time; ▶ / spacebar autoplays at reading pace,
   and the "Stories" picker switches between tours.
   ════════════════════════════════════════════════════════════════════════ */
export default function GuidedSky({ initialTourId, initialBeat = 0, onClose, onBeatChange }) {
  const initialIdx = Math.max(0, TOURS.findIndex(t => t.id === initialTourId))
  /* opening mid-tale (from a figure's Stories list) starts at that chapter */
  const initialCur = Math.min(Math.max(initialBeat, 0), TOURS[initialIdx].beats.length - 1)
  const [tourIdx, setTourIdx]     = useState(initialIdx)
  const [cur, setCur]             = useState(initialCur)
  const [playing, setPlaying]     = useState(true)
  const [talesOpen, setTalesOpen] = useState(false)

  const talesRef = useRef(null)

  const tour  = TOURS[tourIdx]
  const beats = tour.beats
  const beat  = beats[cur]
  const node  = _nodeMap[beat.fig]
  const accent = CAT[node?.category] || CAT.primordial
  const catLabel = (categoryConfig[node?.category]?.label || node?.category || '').toUpperCase()

  /* where the reader last was — staggers the trace draw on multi-beat jumps */
  const prevCurRef = useRef(0)
  useEffect(() => { prevCurRef.current = cur }, [cur])

  /* lock page scroll while the overlay is open */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  /* graph sync: light the figure behind the overlay as the story advances */
  useEffect(() => { onBeatChange?.(beat.fig) }, [beat.fig, onBeatChange])

  /* ambient backdrop stars — seeded once per mount */
  const bgStars = useMemo(() =>
    Array.from({ length: 130 }, () => ({
      left: Math.random() * 100, top: Math.random() * 100,
      size: Math.random() < 0.82 ? 1 : 2,
      lo: 0.05 + Math.random() * 0.15, hi: 0.3 + Math.random() * 0.5,
      dur: 2.5 + Math.random() * 4, delay: Math.random() * 4,
    })), [])

  /* planet placement: clockwise arc that skips the caption's sector,
     alternating inner/outer rings so neighbours never crowd */
  const planets = useMemo(() => {
    const n = beats.length
    return beats.map((b, i) => {
      const a = (130 + i * (280 / Math.max(n - 1, 1))) * Math.PI / 180
      const ring = RINGS[i % 2]
      const color = CAT[_nodeMap[b.fig]?.category] || '#cdb88a'
      return {
        left: CX + ring.rx * Math.cos(a),
        top: CY + ring.ry * Math.sin(a),
        size: 32 + (i % 3) * 7,
        color,
      }
    })
  }, [beats])

  /* reserve room for the tour's longest narration so the caption never jumps */
  const capMinHeight = useMemo(() => {
    const maxLen = Math.max(0, ...beats.map(b => b.text.length))
    return Math.ceil(maxLen / 78) * 26
  }, [beats])

  const next = useCallback(() => setCur(c => Math.min(c + 1, beats.length - 1)), [beats.length])
  const prev = useCallback(() => setCur(c => Math.max(c - 1, 0)), [])

  function selectTour(i) {
    setTourIdx(i)
    setCur(0)
    setTalesOpen(false)
    prevCurRef.current = 0
  }

  /* autoplay — dwell scales with the beat's length, rests at the last beat */
  useEffect(() => {
    if (!playing || !beats[cur]) return
    const t = setTimeout(() => {
      if (cur >= beats.length - 1) setPlaying(false)
      else setCur(cur + 1)
    }, beatMs(beats[cur]))
    return () => clearTimeout(t)
  }, [playing, cur, beats])

  /* keyboard nav */
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') { talesOpen ? setTalesOpen(false) : onClose?.(); return }
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, onClose, talesOpen])

  /* close the tale picker on outside click */
  useEffect(() => {
    if (!talesOpen) return
    function outside(e) { if (talesRef.current && !talesRef.current.contains(e.target)) setTalesOpen(false) }
    document.addEventListener('click', outside)
    return () => document.removeEventListener('click', outside)
  }, [talesOpen])

  return (
    <div className="so-root" style={{ '--accent': accent }}>
      <div className="so-wash"/>
      {bgStars.map((s, i) => (
        <div key={i} className="so-star" style={{
          left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size,
          '--lo': s.lo, '--hi': s.hi, '--dur': `${s.dur}s`, '--delay': `${s.delay}s`,
        }}/>
      ))}

      {/* the orbital plane — square, so a percent is the same distance on
          both axes and the orbit reads as a tipped circle, not a stretched one */}
      <div className="so-plane">
        {RINGS.map((r, i) => (
          <div key={i} className="so-ring" style={{
            left: `${CX - r.rx}%`, top: `${CY - r.ry}%`,
            width: `${r.rx * 2}%`, height: `${r.ry * 2}%`,
          }}/>
        ))}

        {/* the tale traced so far: centre → chapter Ⅰ → … → current chapter */}
        <svg className="so-thread" viewBox="0 0 100 100">
          {planets.slice(0, cur + 1).map((p, i) => {
            const from = i === 0 ? { left: CX, top: CY } : planets[i - 1]
            const stag = i === 0 ? 1.05 : Math.max(0, i - 1 - prevCurRef.current) * 0.12
            return (
              <line key={i} className="so-trace"
                x1={from.left} y1={from.top} x2={p.left} y2={p.top}
                pathLength="1" style={{ '--tstag': `${stag}s` }}/>
            )
          })}
        </svg>

        {/* the figure the tale currently dwells on, burning at the centre */}
        <Sun key={beat.fig} fig={beat.fig}/>

        {/* beat planets — told chapters stay lit, ones ahead are faint embers */}
        {beats.map((b, i) => (
          <BeatPlanet key={i} beat={b} i={i} cur={cur} planet={planets[i]} onSelect={setCur}/>
        ))}
      </div>

      <button className="gs-exit" onClick={onClose} aria-label="Close story mode">✕</button>

      {/* tour title */}
      <div className="gs-top" style={{ pointerEvents: 'none' }}>
        <div className="gs-story">
          <div className="gs-kicker">{tour.kicker}</div>
          <div className="gs-storytitle">{tour.title}</div>
        </div>
      </div>

      {/* story switcher — pick a different tour */}
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

      <div className="gs-hint">← → to move · space to play · esc to close</div>

      {/* caption — one beat at a time, fixed footprint */}
      <div className="so-caption">
        {playing && (
          <div className="so-progress" key={`p${tourIdx}-${cur}`}
            style={{ animationDuration: `${beatMs(beat)}ms` }}/>
        )}
        <div className="so-cap-head">
          <span className="n">{NUMERALS[cur] || cur + 1}</span>
          <span className="l">{node?.name || beat.fig}</span>
          <span className="so-cap-cat" style={{ color: accent }}>{catLabel}</span>
          <span className="c">{cur + 1} / {beats.length}</span>
        </div>
        <div className="so-cap-body" key={`${tourIdx}-${cur}`} style={{ '--capmin': `${capMinHeight}px` }}>
          <p>{beat.text}</p>
        </div>
        <div className="so-cap-nav">
          <button className={`so-nav-btn so-play ${playing ? 'on' : ''}`}
            onClick={() => setPlaying(p => !p)}
            aria-label={playing ? 'Pause the tale' : 'Play the tale'}>
            {playing ? '❚❚' : '▶'}
          </button>
          <button className="so-nav-btn" onClick={prev} aria-label="Previous chapter">‹</button>
          <div className="so-dots">
            {beats.map((_, i) => (
              <button key={i} className={`so-dot ${i === cur ? 'on' : ''}`}
                onClick={() => setCur(i)} aria-label={`Chapter ${i + 1}`}/>
            ))}
          </div>
          <button className="so-nav-btn" onClick={next} aria-label="Next chapter">›</button>
        </div>
      </div>
    </div>
  )
}
