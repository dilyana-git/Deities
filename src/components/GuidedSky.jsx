import { useState, useRef, useEffect, useMemo, useCallback, Fragment } from 'react'
import { TOURS } from '../data/tours.js'
import { deityStories } from '../data/deityStories.js'
import { nodes as allNodes } from '../data/mythology.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { CAT, portraitSources } from './SkyGraph.jsx'

const NUMERALS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ']
const _nodeMap = Object.fromEntries(allNodes.map(n => [n.id, n]))

/* autoplay dwell: long enough to read the beat — base + per-character */
const beatMs = b => 4200 + Math.min(b.text.length, 360) * 26

/* ── tales ─────────────────────────────────────────────────────────────────
   Two kinds of tale, one layout. A tour (tours.js) crosses many figures, one
   per chapter. A figure's own tale (deityStories.js, behind the DetailPanel's
   ENTER THE STORY) is one life in titled chapters: each chapter's star wears
   the first figure it names, falling back to the teller, and every figure it
   names becomes a link under the prose. Both normalise to one shape, so the
   overlay below only ever reads `tale`. */
const TOUR_TALES = TOURS.map(t => ({
  key: t.id, kicker: t.kicker, title: t.title, hero: t.hero || t.beats[0].fig, beats: t.beats,
}))
function figureTale(id) {
  const node  = _nodeMap[id]
  const story = deityStories[id]
  if (!node || !story?.beats?.length) return null
  return {
    key: `fig:${id}`, figure: id, hero: id,
    kicker: 'The Story in Stars', title: node.name, epithet: node.epithet,
    source: story.source, full: story.story,
    beats: story.beats.map(b => {
      const figures = (b.figures || []).filter(f => _nodeMap[f])
      return { fig: figures[0] || id, label: b.label, text: b.text, figures }
    }),
  }
}

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

/* Fetch a figure's 360px centre face ahead of its chapter. Low priority, once
   per session, and never on a data-saver connection — the orb holds the
   previous face until this one arrives anyway, so warming only buys speed. */
const _warmedHeads = new Set()
function warmHead(id) {
  if (!id || _warmedHeads.has(id) || navigator.connection?.saveData) return
  const src = portraitSources(id, 'head')[0]
  if (!src) return
  _warmedHeads.add(id)
  const img = new Image()
  img.decoding = 'async'
  if ('fetchPriority' in img) img.fetchPriority = 'low'
  img.src = src
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
      aria-label={`Chapter ${i + 1}: ${beat.label || node?.name || beat.fig}`}
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

/* the figure of the chapter in play, anchored at the constellation's centre.
   It cross-fades rather than cuts: the outgoing face is held underneath until
   the incoming one has loaded, so the orb never blinks through to its own
   gradient while a plate is on the wire. Both faces are keyed by src, which
   is what lets React carry the lit element over into the held slot instead
   of remounting it. */
function HeroOrb({ fig }) {
  const { src, onError } = usePortrait(fig, 'head')
  const [lit, setLit]   = useState(null)   // src of the face fully up
  const [held, setHeld] = useState(null)   // the face left standing under an incoming one
  const [at, setAt]     = useState(fig)

  /* Adjusted during render, not in an effect. An effect lands one commit late,
     and that commit still carries the old `held` — step back onto that very
     face and it holds two images under one key, which React resolves by
     leaving stale copies stacked in the orb (five after one there-and-back).
     On `fig`, not `src`: a step down the fallback chain is the same face still
     arriving. Returning to the face already up keeps it up with no fade; a
     figure with no art clears the orb rather than leaving the wrong face
     standing, and the manifest answers that without a fetch. */
  if (at !== fig) {
    setAt(fig)
    const next = portraitSources(fig, 'head')[0]
    if (next && next === held) {
      /* back onto the face still standing under the incoming one: that <img>
         is reused already loaded, and never fires `load` a second time */
      setLit(next)
      setHeld(null)
    } else {
      setHeld(next && next !== lit ? lit : null)
      if (!next) setLit(null)
    }
  }

  return (
    <div className="gsr-hero" style={{ left: `${HERO.x}%`, top: `${HERO.y}%` }}>
      <div className="gsr-hero-glow"/>
      <div className="gsr-hero-orb">
        {held && <img key={held} className="held" src={held} alt="" draggable="false"/>}
        {src && (
          <img key={src} className={`lead ${lit === src ? 'on' : ''}`} src={src} alt="" draggable="false"
            onLoad={() => setLit(src)} onError={onError}/>
        )}
      </div>
    </div>
  )
}

/* ── the sky chart ─────────────────────────────────────────────────────────
   The atlas's own planisphere, standing behind the tale, so opening a story
   reads as the camera moving closer into the same sky rather than as a new
   screen. The values are SkyGraph's dome furniture, copied rather than
   shared — move them together: the limb gradient that IS the horizon, the
   core shade, three declination rings, 24 meridian spokes, the 0.03 ring and
   its degree ticks. Three deliberate differences:
   - circles, not the map's ellipse — the chart is `slice`-scaled to cover
     the plane, so it stays round at any aspect ratio;
   - the limb takes a third of the chapter figure's family colour (`--gsr-tint`,
     which cross-fades between chapters);
   - the ecliptic is solid and quieter. The tale's own thread is the dashed
     gold line here, and a second dashed gold curve reads as part of it.
   No screen blend either: the layer's mask isolates it, so the limb is plain
   alpha over the backdrop, which lands at about the map's lift. */
const CHART = { w: 1190, h: 1020, cx: 620, cy: 530, r: 600 }
const CHART_GRID = 'rgb(130,155,205)'
const CHART_LIMB = [
  [0, '#141c2c', 0], [58, '#141c2c', 0], [68, '#1a2338', 0.04], [74, '#1f2942', 0.11],
  [78, '#232e49', 0.2], [82, '#26324c', 0.3], [86, '#232e46', 0.24], [90, '#1e2740', 0.15],
  [94, '#1b1e35', 0.08], [97, '#181829', 0.03], [100, '#16162a', 0],
]
const CHART_CORE = [
  [0, '#01030a', 0.86], [38, '#01030a', 0.72], [68, '#02040c', 0.38], [88, '#03050e', 0.1], [100, '#04060f', 0],
]
const chartAt = (a, k) => [CHART.cx + Math.cos(a) * CHART.r * k, CHART.cy + Math.sin(a) * CHART.r * k]
const CHART_SPOKES = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2
  return [...chartAt(a, 0.35), ...chartAt(a, 1)]
})
const CHART_TICKS = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2, major = i % 3 === 0
  return { major, p: [...chartAt(a, major ? 0.975 : 0.985), ...chartAt(a, 1.012)] }
})

/* the Milky Way — the chart's one light of its own, and the one thing here
   the map doesn't have. A soft river of light crossing the ecliptic at a
   steeper tilt, brightest in a bulge that sits just behind the centre face so
   the chapter's figure is backlit, cut by a thin dust lane and grained with
   its own fine stars. Gradient fills on ellipses, never a blur filter, so it
   rasterizes once however large the screen. Seeded, so the band's stars fall
   the same way on every open. */
const BAND_TILT  = -38
const BAND_BULGE = -130                    // along the band's axis from the chart centre — behind the hero
const BAND_STARS = (() => {
  let s = 20240913
  const rnd   = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296
  const gauss = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd())
  return Array.from({ length: 160 }, () => {
    const along  = clamp(gauss() * 330, -780, 780)
    const across = gauss() * 58 * (1 - Math.abs(along) / 1100)   // the river narrows toward its ends
    return {
      x: CHART.cx + along, y: CHART.cy + across,
      r: 0.5 + rnd() ** 2, o: 0.15 + rnd() * 0.5, warm: rnd() < 0.2,
    }
  })
})()

function SkyChart({ lean }) {
  const { cx, cy, r } = CHART
  return (
    <div className="gsr-dome" aria-hidden="true" style={{ transform: lean }}>
      <svg viewBox={`0 0 ${CHART.w} ${CHART.h}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="gsr-dome-limb">
            {CHART_LIMB.map(([o, c, a]) => (
              <stop key={o} offset={`${o}%`} stopOpacity={a}
                style={{ stopColor: `color-mix(in oklch, ${c} 65%, var(--gsr-tint) 35%)` }}/>
            ))}
          </radialGradient>
          <radialGradient id="gsr-band-haze">
            <stop offset="0%" stopOpacity={0.2} style={{ stopColor: 'color-mix(in oklch, #3b4f86 70%, var(--gsr-tint) 30%)' }}/>
            <stop offset="40%" stopOpacity={0.1} style={{ stopColor: 'color-mix(in oklch, #34467a 70%, var(--gsr-tint) 30%)' }}/>
            <stop offset="75%" stopColor="#2a3860" stopOpacity={0.03}/>
            <stop offset="100%" stopColor="#2a3860" stopOpacity={0}/>
          </radialGradient>
          <radialGradient id="gsr-band-core">
            <stop offset="0%" stopColor="#efe3c4" stopOpacity={0.1}/>
            <stop offset="40%" stopColor="#dcc79c" stopOpacity={0.055}/>
            <stop offset="75%" stopColor="#cdb88a" stopOpacity={0.018}/>
            <stop offset="100%" stopColor="#cdb88a" stopOpacity={0}/>
          </radialGradient>
          <radialGradient id="gsr-band-bulge">
            <stop offset="0%" stopColor="#f6e9c8" stopOpacity={0.18}/>
            <stop offset="35%" stopColor="#d9b98a" stopOpacity={0.09}/>
            <stop offset="70%" stopOpacity={0.03} style={{ stopColor: 'color-mix(in oklch, #d9b98a 50%, var(--gsr-tint) 50%)' }}/>
            <stop offset="100%" stopColor="#d9b98a" stopOpacity={0}/>
          </radialGradient>
          <radialGradient id="gsr-band-dust">
            <stop offset="0%" stopColor="#02030a" stopOpacity={0.26}/>
            <stop offset="60%" stopColor="#02030a" stopOpacity={0.1}/>
            <stop offset="100%" stopColor="#02030a" stopOpacity={0}/>
          </radialGradient>
          <radialGradient id="gsr-dome-core">
            {CHART_CORE.map(([o, c, a]) => <stop key={o} offset={`${o}%`} stopColor={c} stopOpacity={a}/>)}
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r * 1.22} fill="url(#gsr-dome-limb)"/>
        <circle cx={cx} cy={cy} r={r} fill="url(#gsr-dome-core)"/>
        {/* above the core shade, so the band still lights the dark centre
            the shade has made of the backdrop */}
        <g transform={`rotate(${BAND_TILT} ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx={r * 1.35} ry={r * 0.36} fill="url(#gsr-band-haze)"/>
          <ellipse cx={cx} cy={cy} rx={r * 1.15} ry={r * 0.19} fill="url(#gsr-band-core)"/>
          <ellipse cx={cx + BAND_BULGE} cy={cy} rx={r * 0.42} ry={r * 0.2} fill="url(#gsr-band-bulge)"/>
          {/* dust lanes wide and faint: a narrow dark lane beside the bright
              core gave the river a hard edge and read as a beam, not a galaxy */}
          <ellipse cx={cx + 20} cy={cy + 14} rx={r * 0.95} ry={r * 0.05} fill="url(#gsr-band-dust)"/>
          <ellipse cx={cx - 210} cy={cy - 20} rx={r * 0.34} ry={r * 0.034} fill="url(#gsr-band-dust)"/>
          {BAND_STARS.map((st, i) => (
            <circle key={i} cx={st.x} cy={st.y} r={st.r} fill={st.warm ? '#f3e2bd' : '#e6ebf5'} opacity={st.o}/>
          ))}
        </g>
        <g fill="none" stroke={CHART_GRID}>
          {[0.35, 0.62, 0.85].map(k => (
            <circle key={k} cx={cx} cy={cy} r={r * k} strokeWidth={0.6} opacity={0.1 + (0.85 - k) * 0.12}/>
          ))}
          {CHART_SPOKES.map((p, i) => (
            <line key={i} x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]} strokeWidth={0.5} opacity={0.075}/>
          ))}
          <circle cx={cx} cy={cy} r={r} strokeWidth={1} opacity={0.03}/>
          {CHART_TICKS.map(({ major, p }, i) => (
            <line key={i} x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]}
              strokeWidth={major ? 0.9 : 0.5} opacity={major ? 0.07 : 0.035}/>
          ))}
        </g>
        <ellipse cx={cx} cy={cy} rx={r * 0.97} ry={r * 0.34} transform={`rotate(-16 ${cx} ${cy})`}
          fill="none" stroke="#cdb88a" strokeWidth={0.7} opacity={0.1}/>
      </svg>
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
   constellation: the figure of the chapter in play burns at the centre,
   every chapter is a star scattered around it, a dashed grey line shows the
   whole figure and a gold thread inks itself over the part already told.
   The centre face changes with the chapter; the column's "Following" line
   keeps the credit for whose tale it is. The plane drifts a little against
   the chapter in play, so each advance reads as the sky turning rather than
   a swap. ▶ / spacebar autoplays at reading pace; OTHER STORIES switches
   tales.

   It tells two kinds of tale the same way: a tour from tours.js, or — opened
   from a figure's ENTER THE STORY — that figure's own titled chapters from
   deityStories.js, with the figures each chapter names as links under the
   prose and the whole retelling one click away in the column.
   ════════════════════════════════════════════════════════════════════════ */
export default function GuidedSky({ initialTourId, initialBeat = 0, figureId, onClose, onBeatChange, onNavigate }) {
  /* the figure's own tale, when opened from its panel. It stays at the head of
     the tale picker after the reader switches to a tour, so they can go back. */
  const ownTale  = useMemo(() => (figureId ? figureTale(figureId) : null), [figureId])
  const pickable = useMemo(() => (ownTale ? [ownTale, ...TOUR_TALES] : TOUR_TALES), [ownTale])

  const [taleKey, setTaleKey] = useState(() =>
    ownTale?.key || (TOUR_TALES.find(t => t.key === initialTourId) || TOUR_TALES[0]).key)
  const tale  = pickable.find(t => t.key === taleKey) || pickable[0]
  const beats = tale.beats
  /* opening mid-tale (from a figure's Tales row) starts at that chapter */
  const [cur, setCur]             = useState(() => Math.min(Math.max(initialBeat, 0), beats.length - 1))
  const [playing, setPlaying]     = useState(true)
  const [talesOpen, setTalesOpen] = useState(false)
  const [fullOpen, setFullOpen]   = useState(false)

  const talesRef = useRef(null)
  const readRef  = useRef(null)

  const beat  = beats[cur]
  const node  = _nodeMap[beat.fig]
  const heroNode = _nodeMap[tale.hero]
  const accent = CAT[node?.category] || CAT.primordial
  const catLabel = (categoryConfig[node?.category]?.label || node?.category || '').toUpperCase()
  const following = tale.figure ? tale.epithet : `Following ${heroNode?.name || tale.hero}`
  /* the "With …" line is held on every chapter of a tale that names anyone,
     so chapters with and without names hang from the same baseline */
  const withLine = !!onNavigate && beats.some(b => b.figures?.length)
  /* autoplay holds while the full tale is open */
  const ticking  = playing && !fullOpen

  /* a figure's own tale hands the reader back to that figure — the panel they
     opened it from — while a tour leaves the sky on its last chapter */
  const close = useCallback(() => onClose?.(tale.figure || null), [onClose, tale.figure])

  /* lock page scroll while the overlay is open */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  /* graph sync: light the figure behind the overlay as the story advances */
  useEffect(() => { onBeatChange?.(beat.fig) }, [beat.fig, onBeatChange])

  /* the centre face changes with the chapter, so the next one is fetched
     during this beat's dwell and the advance cross-fades out of cache. Only
     forward: a step back returns to a face that was just at the centre. */
  useEffect(() => { warmHead(beats[cur + 1]?.fig) }, [beats, cur])

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

  /* moving to a chapter always brings the row back from the full tale */
  const next = useCallback(() => { setFullOpen(false); setCur(c => Math.min(c + 1, beats.length - 1)) }, [beats.length])
  const prev = useCallback(() => { setFullOpen(false); setCur(c => Math.max(c - 1, 0)) }, [])
  const goTo = useCallback(i => { setFullOpen(false); setCur(i) }, [])

  function selectTale(key) {
    setTaleKey(key)
    setCur(0)
    setTalesOpen(false)
    setFullOpen(false)
  }

  function togglePlay() {
    if (fullOpen) { setFullOpen(false); setPlaying(true) }
    else setPlaying(p => !p)
  }

  /* the chapters and the full tale share one scroll container, so switching
     between them — or between tales — starts the new text at its top */
  useEffect(() => { if (readRef.current) readRef.current.scrollTop = 0 }, [fullOpen, taleKey])

  /* autoplay — dwell scales with the beat's length, rests at the last beat */
  useEffect(() => {
    if (!ticking || !beats[cur]) return
    const t = setTimeout(() => {
      if (cur >= beats.length - 1) setPlaying(false)
      else setCur(cur + 1)
    }, beatMs(beats[cur]))
    return () => clearTimeout(t)
  }, [ticking, cur, beats])

  /* keyboard nav */
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        if (talesOpen) setTalesOpen(false)
        else if (fullOpen) setFullOpen(false)
        else close()
        return
      }
      /* the full tale is read, not stepped through — the keys wait for it */
      if (fullOpen) return
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, close, talesOpen, fullOpen])

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
    <div className="gsr-root" style={{ '--accent': accent, '--gsr-tint': accent }}>
      {bgStars.map((s, i) => (
        <div key={i} className="gsr-bgstar" style={{
          left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size,
          '--lo': s.lo, '--hi': s.hi, '--dur': `${s.dur}s`, '--delay': `${s.delay}s`,
        }}/>
      ))}

      {/* the atlas's sky chart behind the tale. It leans half as far as the
          plane in front of it, so it reads as farther away. */}
      <SkyChart lean={`translate(${((HERO.x - stars[cur].x) * 0.065).toFixed(2)}%, ${((HERO.y - stars[cur].y) * 0.065).toFixed(2)}%)`}/>

      {/* the constellation plane — the whole screen right of the column. It
          drifts against the chapter in play (a fraction of the offset from
          the hero, so the motion is a lean, not a pan). */}
      <div className="gsr-plane" style={{
        transform: `translate(${((HERO.x - stars[cur].x) * 0.13).toFixed(2)}%, ${((HERO.y - stars[cur].y) * 0.13).toFixed(2)}%)`,
      }}>
        {/* the chapter light — a soft pool standing behind the chapter in
            play, travelling with it along the figure as the tale advances */}
        <div className="gsr-light" style={{
          transform: `translate(${(stars[cur].x - 50).toFixed(2)}%, ${(stars[cur].y - 50).toFixed(2)}%)`,
        }}/>
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
          <polyline className="gsr-web-trace" key={`${tale.key}-${cur}`} points={tracePts}/>
        </svg>

        {/* keyed on the tale, not the figure: within a tale the orb has to
            persist so it can cross-fade; a new tale replays its entrance */}
        <HeroOrb key={tale.key} fig={beat.fig}/>

        {beats.map((b, i) => (
          <ChapterStar key={`${tale.key}-${i}`} beat={b} i={i} cur={cur} at={stars[i]} onSelect={goTo}/>
        ))}
      </div>

      {/* the reading column — three fixed rows: which tale, the chapter in
          play, the transport. Nothing in it moves between chapters except
          the prose. */}
      <div className="gsr-column">
        <div className="gsr-col-head" ref={talesRef}>
          <div className="gsr-kicker">{tale.kicker}</div>
          <div className="gsr-title">{tale.title}</div>
          {following && <div className="gsr-following">{following}</div>}
          {tale.source && <div className="gsr-source">— {tale.source}</div>}
          <div className="gsr-head-actions">
            <button className={`gsr-tales-btn ${talesOpen ? 'open' : ''}`}
              onClick={() => setTalesOpen(o => !o)} aria-expanded={talesOpen}>
              OTHER STORIES <span className="car">▾</span>
            </button>
            {tale.full && (
              <button className={`gsr-tales-btn ${fullOpen ? 'open' : ''}`}
                onClick={() => setFullOpen(o => !o)} aria-pressed={fullOpen}>
                {fullOpen ? 'BACK TO CHAPTERS' : 'FULL TALE'}
              </button>
            )}
          </div>
          {talesOpen && (
            <div className="gsr-tales">
              {pickable.map(t => (
                <button key={t.key} className={`gsr-tale ${t.key === tale.key ? 'on' : ''}`}
                  onClick={() => selectTale(t.key)}>
                  <span className="gsr-tale-k">{t.kicker}</span>
                  <span className="gsr-tale-t">{t.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="gsr-col-read" ref={readRef}>
          {fullOpen ? (
            /* the whole retelling takes the chapter's place in the column —
               already the reading surface, so no veil goes over the sky */
            <div className="gsr-full" key={`f${tale.key}`}>
              <div className="gsr-beat-head"><span className="l">The Full Tale</span></div>
              {tale.full.split('\n\n').map((para, i) => (
                <p key={i} className={i === 0 ? 'story-text' : undefined}>{para}</p>
              ))}
              {tale.source && <p className="gsr-full-src">— {tale.source}</p>}
            </div>
          ) : (
            <>
              <div className="gsr-read-pad"/>
              {/* the entrance rises from 14px below, and a transform counts toward
                  a scroll container's overflow — so without this clip the row grew
                  a scrollbar for the length of every chapter change */}
              <div className="gsr-beat-block">
                <div className="gsr-beat-head" key={`h${tale.key}-${cur}`}>
                  <span className="n">{NUMERALS[cur] || cur + 1}</span>
                  {tale.figure ? (
                    /* a figure's tale titles its chapters; who is in them is
                       the "With" line under the prose */
                    <span className="l">{beat.label}</span>
                  ) : (
                    <>
                      <span className="l">{node?.name || beat.fig}</span>
                      <span className="cat" style={{ color: accent }}>{catLabel}</span>
                    </>
                  )}
                </div>
                <p className="gsr-beat" key={`b${tale.key}-${cur}`}>{beat.text}</p>
                {withLine && (
                  <div className="gsr-figs" key={`w${tale.key}-${cur}`}>
                    {beat.figures?.length > 0 && <span className="k">With</span>}
                    {beat.figures?.map((f, i) => (
                      <Fragment key={f}>
                        {i > 0 && <span className="sep">·</span>}
                        <button className="gsr-fig" onClick={() => onNavigate(f)}
                          title={`Fly to ${_nodeMap[f].name}`}>
                          {_nodeMap[f].name}
                        </button>
                      </Fragment>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="gsr-col-foot">
          <div className="gsr-rail">
            <div className={`gsr-rail-fill ${ticking ? 'ticking' : ''}`}
              key={ticking ? `r${tale.key}-${cur}` : 'rest'}
              style={{
                width: railTo, '--from': railFrom, '--to': railTo,
                animationDuration: `${beatMs(beat)}ms`,
              }}/>
          </div>
          <div className="gsr-transport">
            <button className={`gsr-play ${ticking ? 'on' : ''}`}
              onClick={togglePlay}
              aria-label={ticking ? 'Pause the tale' : 'Play the tale'}>
              {ticking ? '❚❚' : '▶'}
            </button>
            <button className="gsr-step" onClick={prev} aria-label="Previous chapter">‹</button>
            <button className="gsr-step" onClick={next} aria-label="Next chapter">›</button>
            <span className="gsr-counter">CHAPTER {cur + 1} / {beats.length}</span>
          </div>
          <div className="gsr-hint">← → to move · space to play · esc to close</div>
        </div>
      </div>

      <button className="gsr-exit" onClick={close} aria-label="Close story mode">✕</button>
    </div>
  )
}
