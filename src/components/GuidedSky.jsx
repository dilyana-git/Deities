import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { TOURS } from '../data/tours.js'
import { nodes as allNodes } from '../data/mythology.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { CAT, portraitSources } from './SkyGraph.jsx'

const NUMERALS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ']
const _nodeMap = Object.fromEntries(allNodes.map(n => [n.id, n]))

/* autoplay dwell: long enough to read the beat — base + per-character */
const beatMs = b => 4200 + Math.min(b.text.length, 360) * 26

/* Walk only the exact generated variants that exist for this figure. `size` is
   the tier the caller is about to draw at: chapter stars are 44-96px and ask
   for the 192px `node` crop, the hero orb is 164px and asks for the 360px
   `head` one. */
function usePortrait(id, size = 'node') {
  const chain = useMemo(() => portraitSources(id, size), [id, size])
  const [attempt, setAttempt] = useState({ id, idx: 0 })
  const idx = attempt.id === id ? attempt.idx : 0
  return {
    src: idx < chain.length ? chain[idx] : null,
    onError: () => setAttempt(a => ({ id, idx: a.id === id ? a.idx + 1 : 1 })),
  }
}

/* ── the constellation ─────────────────────────────────────────────────────
   Hand-set scatters, one per beat count, in % of the plane. Each sweeps from
   the lower left up over the top and back down to the right — irregular on
   purpose: no orbit, no symmetry, no equal spacing, so the tale reads as a
   figure someone traced in the sky rather than as a diagram. Every path is
   drawn to leave HERO its room. */
const PATHS = {
  4: [[22, 70], [34, 40], [58, 20], [83, 47]],
  5: [[20, 73], [30, 44], [46, 18], [65, 33], [84, 58]],
  6: [[19, 75], [31, 50], [29, 24], [48, 15], [66, 34], [82, 60]],
  7: [[18, 76], [30, 54], [26, 28], [45, 14], [60, 31], [72, 58], [86, 44]],
  8: [[20, 74], [32, 51], [27, 27], [44, 15], [58, 30], [67, 57], [79, 73], [88, 40]],
}
const HERO = { x: 47, y: 63 }

/* separate b from a until they are `want` apart, closing half the shortfall
   per pass. `pinA` gives a the whole correction's benefit — the hero holds the
   centre and the chapters move around it. */
function push(a, b, want, pinA) {
  let dx = b.x - a.x, dy = b.y - a.y
  let d = Math.hypot(dx, dy)
  if (d >= want) return
  if (d < 1e-6) { dx = 1; dy = 0; d = 1 }   // coincident — pick an axis to leave on
  const step = (want - d) * 0.5 / d
  b.x += dx * step * (pinA ? 1 : 0.5); b.y += dy * step * (pinA ? 1 : 0.5)
  if (!pinA) { a.x -= dx * step * 0.5; a.y -= dy * step * 0.5 }
}
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)
const pt = p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`

/* Nothing hand-set for this length — lay the same corridor out evenly, jitter
   it from a fixed hash so it still scatters rather than arcs (and scatters the
   same way on every render), then relax it: no two chapters closer than `sep`,
   none inside the hero's clearance, none off the frame. The hand-set paths run
   ~20 units apart at their tightest and a pair of orbs starts touching around
   10 on a small screen, so a longer tour trades spacing down toward that floor
   instead of overlapping — the jitter alone leaves pairs 30px inside each
   other by nine chapters. */
function pathFor(n) {
  if (PATHS[n]) return PATHS[n].map(([x, y]) => ({ x, y }))
  const jitter = k => { const v = Math.sin(k) * 43758.5453; return v - Math.floor(v) - 0.5 }
  const pts = Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1)
    return {
      x: 18 + t * 70 + jitter((i + 1) * 12.9898) * 9,
      y: 74 - Math.sin(t * Math.PI * 0.86) * 58 + jitter((i + 1) * 78.233) * 9,
    }
  })
  const sep = clamp(160 / n, 13, 20)
  const heroSep = Math.max(sep, 16)
  for (let pass = 0; pass < 60; pass++) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) push(pts[i], pts[j], sep, false)
      push(HERO, pts[i], heroSep, true)
    }
    for (const p of pts) { p.x = clamp(p.x, 8, 92); p.y = clamp(p.y, 8, 92) }
  }
  return pts
}

/* one chapter = a star in that constellation. Its face is the figure's
   portrait, dissolving to a gradient orb if none loads. The label is the
   numeral alone — the name belongs to the reading column, where it is set
   once and can be read. */
function ChapterStar({ beat, i, cur, at, onSelect }) {
  const { src, onError } = usePortrait(beat.fig)
  const node = _nodeMap[beat.fig]
  const on = i === cur
  const size = on ? 96 : 50 + ((i * 5) % 3) * 7
  return (
    <button
      className={`gsr-star ${on ? 'on' : i < cur ? 'told' : 'ahead'}`}
      style={{
        left: `${at.x}%`, top: `${at.y}%`,
        '--sz': `${size}px`, '--halo': `${Math.round(size * 2.1)}px`,
        '--fdur': `${(11 + i * 1.7).toFixed(1)}s`, '--fdelay': `${(i * -1.9).toFixed(1)}s`,
        '--hdur': on ? '2.9s' : `${(6 + i * 0.8).toFixed(1)}s`, '--hdelay': `${(i * -1.3).toFixed(1)}s`,
        '--ig': `${(0.35 + i * 0.11).toFixed(2)}s`,
      }}
      onClick={() => onSelect(i)}
      aria-label={`Chapter ${i + 1}: ${node?.name || beat.fig}`}
      aria-current={on ? 'step' : undefined}
    >
      <span className="gsr-float">
        <span className="gsr-halo"/>
        <span className="gsr-orb">
          {src && <img src={src} alt="" draggable="false" onError={onError}/>}
        </span>
      </span>
      <span className="gsr-num">{NUMERALS[i] || i + 1}</span>
    </button>
  )
}

/* the figure the whole tale follows, anchored at the constellation's centre —
   static across chapters, so the tour has one face to hold on to while the
   narration travels */
function HeroOrb({ fig }) {
  const { src, onError } = usePortrait(fig, 'head')
  return (
    <div className="gsr-hero" style={{ left: `${HERO.x}%`, top: `${HERO.y}%` }}>
      <div className="gsr-hero-glow"/>
      <div className="gsr-hero-orb">
        {src && <img src={src} alt="" draggable="false" onError={onError}/>}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Guided Sky — full-screen cinematic story presentation, laid out as a
   reading column against a constellation.

   The left third is a quiet, opaque column of type on three fixed rows —
   which tale this is at the top, the chapter in play in the middle, the
   transport at the foot — so the reader's eye never has to hunt for the
   prose. It never moves. The rest of the screen is the tale drawn as a
   constellation: the tour's hero burns at the centre, every chapter is a
   star scattered around it, a dashed grey line shows the whole figure and a
   gold thread inks itself over the part already told. The plane drifts a
   little against the chapter in play, so each advance reads as the sky
   turning rather than a swap. ▶ / spacebar autoplays at reading pace;
   OTHER STORIES switches tours.
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
  const heroFig  = tour.hero || beats[0].fig
  const heroNode = _nodeMap[heroFig]
  const accent = CAT[node?.category] || CAT.primordial
  const catLabel = (categoryConfig[node?.category]?.label || node?.category || '').toUpperCase()

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

  /* the brighter motes drifting over the constellation itself */
  const dust = useMemo(() =>
    Array.from({ length: 14 }, () => ({
      left: Math.random() * 100, top: Math.random() * 100,
      dur: 7 + Math.random() * 6, delay: -Math.random() * 6,
    })), [])

  const stars = useMemo(() => pathFor(beats.length), [beats.length])
  const allPts   = useMemo(() => stars.map(pt).join(' '), [stars])
  const tracePts = stars.slice(0, cur + 1).map(pt).join(' ')

  const next = useCallback(() => setCur(c => Math.min(c + 1, beats.length - 1)), [beats.length])
  const prev = useCallback(() => setCur(c => Math.max(c - 1, 0)), [])

  function selectTour(i) {
    setTourIdx(i)
    setCur(0)
    setTalesOpen(false)
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

  /* the rail is the dwell timer as well as the place-marker: at rest it stands
     at the end of the chapter in play, and under autoplay it crosses that
     chapter's own segment over exactly the beat's dwell */
  const railTo   = `${(cur + 1) / beats.length * 100}%`
  const railFrom = `${cur / beats.length * 100}%`

  return (
    <div className="gsr-root" style={{ '--accent': accent }}>
      {bgStars.map((s, i) => (
        <div key={i} className="gsr-bgstar" style={{
          left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size,
          '--lo': s.lo, '--hi': s.hi, '--dur': `${s.dur}s`, '--delay': `${s.delay}s`,
        }}/>
      ))}

      {/* the constellation plane — the whole screen right of the column. It
          drifts against the chapter in play (a fraction of the offset from
          the hero, so the motion is a lean, not a pan). */}
      <div className="gsr-plane" style={{
        transform: `translate(${((HERO.x - stars[cur].x) * 0.13).toFixed(2)}%, ${((HERO.y - stars[cur].y) * 0.13).toFixed(2)}%)`,
      }}>
        <div className="gsr-bloom"/>

        {dust.map((d, i) => (
          <span key={i} className="gsr-dust" style={{
            left: `${d.left}%`, top: `${d.top}%`,
            '--dur': `${d.dur}s`, '--delay': `${d.delay}s`,
          }}/>
        ))}

        {/* the whole figure in dashed grey, the told part inked over it in
            gold — so the tale's shape is legible from the first chapter and
            the reader can see how much sky is left */}
        <svg className="gsr-web" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline className="gsr-web-all" points={allPts}/>
          <polyline className="gsr-web-trace" key={`${tourIdx}-${cur}`} points={tracePts}/>
        </svg>

        <HeroOrb key={heroFig} fig={heroFig}/>

        {beats.map((b, i) => (
          <ChapterStar key={`${tourIdx}-${i}`} beat={b} i={i} cur={cur} at={stars[i]} onSelect={setCur}/>
        ))}
      </div>

      {/* the reading column — three fixed rows: which tale, the chapter in
          play, the transport. Nothing in it moves between chapters except
          the prose. */}
      <div className="gsr-column">
        <div className="gsr-col-head" ref={talesRef}>
          <div className="gsr-kicker">{tour.kicker}</div>
          <div className="gsr-title">{tour.title}</div>
          <div className="gsr-following">Following {heroNode?.name || heroFig}</div>
          <button className={`gsr-tales-btn ${talesOpen ? 'open' : ''}`}
            onClick={() => setTalesOpen(o => !o)} aria-expanded={talesOpen}>
            OTHER STORIES <span className="car">▾</span>
          </button>
          {talesOpen && (
            <div className="gsr-tales">
              {TOURS.map((t, i) => (
                <button key={t.id} className={`gsr-tale ${i === tourIdx ? 'on' : ''}`}
                  onClick={() => selectTour(i)}>
                  <span className="gsr-tale-k">{t.kicker}</span>
                  <span className="gsr-tale-t">{t.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="gsr-col-read">
          <div className="gsr-read-pad"/>
          {/* the entrance rises from 14px below, and a transform counts toward
              a scroll container's overflow — so without this clip the row grew
              a scrollbar for the length of every chapter change */}
          <div className="gsr-beat-block">
            <div className="gsr-beat-head" key={`h${tourIdx}-${cur}`}>
              <span className="n">{NUMERALS[cur] || cur + 1}</span>
              <span className="l">{node?.name || beat.fig}</span>
              <span className="cat" style={{ color: accent }}>{catLabel}</span>
            </div>
            <p className="gsr-beat" key={`b${tourIdx}-${cur}`}>{beat.text}</p>
          </div>
        </div>

        <div className="gsr-col-foot">
          <div className="gsr-rail">
            <div className={`gsr-rail-fill ${playing ? 'ticking' : ''}`}
              key={playing ? `r${tourIdx}-${cur}` : 'rest'}
              style={{
                width: railTo, '--from': railFrom, '--to': railTo,
                animationDuration: `${beatMs(beat)}ms`,
              }}/>
          </div>
          <div className="gsr-transport">
            <button className={`gsr-play ${playing ? 'on' : ''}`}
              onClick={() => setPlaying(p => !p)}
              aria-label={playing ? 'Pause the tale' : 'Play the tale'}>
              {playing ? '❚❚' : '▶'}
            </button>
            <button className="gsr-step" onClick={prev} aria-label="Previous chapter">‹</button>
            <button className="gsr-step" onClick={next} aria-label="Next chapter">›</button>
            <span className="gsr-counter">CHAPTER {cur + 1} / {beats.length}</span>
          </div>
          <div className="gsr-hint">← → to move · space to play · esc to close</div>
        </div>
      </div>

      <button className="gsr-exit" onClick={onClose} aria-label="Close story mode">✕</button>
    </div>
  )
}
