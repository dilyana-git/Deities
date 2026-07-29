import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { nodes as allNodes } from '../data/mythology.js'
import { deityStories } from '../data/deityStories.js'
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

/* figure chip with a tiny portrait — falls back to the coloured dot */
function FigChip({ fig, color, onNavigate }) {
  const other = _nodeMap[fig]
  const { src, onError } = usePortrait(fig)
  if (!other) return null
  return (
    <button className="so-chip" style={{ '--chip': color }}
      title={`Fly to ${other.name}`} onClick={() => onNavigate?.(fig)}>
      {src
        ? <img className="face" src={src} alt="" draggable="false" onError={onError}/>
        : <span className="dot"/>}
      {other.name}<span className="fly">⤢</span>
    </button>
  )
}

/* orbital plane: sun centre + the two rings planets alternate between, all in
   % of `.so-plane` — a square box sized from ONE base radius in min-axis units
   (see index.css). Both radii of a ring derive from that base, so the ellipse
   holds its shape at every aspect instead of stretching with the stage. */
const CX = 50, CY = 50               // the sun, at the plane's centre
const TILT = 0.62                    // ry ÷ rx — how far the plane is tipped
const RINGS = [0.63, 1].map(f => ({ rx: 50 * f, ry: 50 * f * TILT }))

/* one beat = a planet. Its face is the primary figure's portrait (falling
   back to the deity's own), dissolving to the gradient orb if none loads */
function BeatPlanet({ beat, i, cur, planet, figId, onSelect }) {
  const p = planet
  const { src, onError } = usePortrait(figId)
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
      aria-label={`Beat ${i + 1}: ${beat.label}`}
    >
      <span className="so-float">
        <span className={`so-orb ${p.ringed ? 'ringed' : ''} ${src ? 'has-face' : ''}`}>
          {src && <img className="face" src={src} alt="" draggable="false" onError={onError}/>}
        </span>
      </span>
      <span className="so-tag"><span className="n">{NUMERALS[i] || i + 1}</span>{beat.label}</span>
    </button>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   Story Orbit — one deity's tale as a small solar system. The deity burns
   at the centre; each story beat is a planet floating on its orbit,
   arranged clockwise from the lower left. As the reader moves through the
   beats a golden thread is traced from the sun through every chapter told,
   so the finished tale hangs in the sky as a constellation. One beat at a
   time shows in the caption; ▶ / spacebar autoplays at reading pace.
   ════════════════════════════════════════════════════════════════════════ */
export default function StoryOrbit({ nodeId, onClose, onNavigate }) {
  const node = _nodeMap[nodeId]
  const story = deityStories[nodeId]
  const beats = story?.beats || []
  const accent = CAT[node?.category] || '#cdb88a'
  const [cur, setCur] = useState(0)
  const [taleOpen, setTaleOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const sun = usePortrait(nodeId)

  /* where the reader last was — staggers the trace draw on multi-beat jumps */
  const prevCurRef = useRef(0)
  useEffect(() => { prevCurRef.current = cur }, [cur])

  /* lock page scroll while the overlay is open */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

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
      const fig = b.figures?.[0]
      const color = CAT[_nodeMap[fig]?.category] || accent
      return {
        left: CX + ring.rx * Math.cos(a),
        top: CY + ring.ry * Math.sin(a),
        size: Math.round(26 + (b.weight ?? 0.7) * 22),
        color,
        ringed: (b.figures?.length || 0) >= 2,
      }
    })
  }, [beats, accent])

  /* reserve room for the story's longest beat so the caption never jumps
     while stepping through — ~78 chars per line at the caption's width;
     the mobile media query scales this up via the --capmin custom prop */
  const capMinHeight = useMemo(() => {
    const maxLen = Math.max(0, ...beats.map(b => b.text.length))
    const anyFigs = beats.some(b => b.figures?.length)
    return Math.ceil(maxLen / 78) * 26 + (anyFigs ? 40 : 0)
  }, [beats])

  const next = useCallback(() => setCur(c => (c + 1) % beats.length), [beats.length])
  const prev = useCallback(() => setCur(c => (c - 1 + beats.length) % beats.length), [beats.length])

  /* autoplay — dwell scales with the beat's length, rests at the last beat;
     opening the full tale suspends the clock until it closes */
  useEffect(() => {
    if (!playing || taleOpen || !beats[cur]) return
    const t = setTimeout(() => {
      if (cur >= beats.length - 1) setPlaying(false)
      else setCur(cur + 1)
    }, beatMs(beats[cur]))
    return () => clearTimeout(t)
  }, [playing, cur, taleOpen, beats])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') { taleOpen ? setTaleOpen(false) : onClose?.(); return }
      if (taleOpen) return
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, onClose, taleOpen])

  if (!node || !beats.length) return null
  const beat = beats[cur]
  const catLabel = (categoryConfig[node.category]?.label || node.category).toUpperCase()

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

        {/* the tale traced so far: sun → chapter Ⅰ → … → current chapter
            (plane percent space, so no resize math) */}
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

        {/* the deity sun */}
        <div className="so-sun" style={{ left: `${CX}%`, top: `${CY}%` }}>
          <div className="so-sun-orb">
            {sun.src && (
              <img src={sun.src} alt="" draggable="false" onError={sun.onError}/>
            )}
          </div>
          <div className="so-sun-name">{node.name}</div>
          {node.epithet && <div className="so-sun-epithet">{node.epithet}</div>}
        </div>

        {/* beat planets — told chapters stay lit, ones ahead are faint embers */}
        {beats.map((b, i) => (
          <BeatPlanet key={i} beat={b} i={i} cur={cur} planet={planets[i]}
            figId={b.figures?.[0] || nodeId} onSelect={setCur}/>
        ))}
      </div>

      <button className="gs-exit" onClick={onClose} aria-label="Close story orbit">✕</button>

      <div className="gs-top" style={{ pointerEvents: 'none' }}>
        <div className="gs-story">
          <div className="gs-kicker">The Story in Stars</div>
          <div className="gs-storytitle">{node.name} · {catLabel}</div>
        </div>
      </div>

      <div className="gs-hint">← → to move · space to play · esc to close</div>

      {/* caption — one beat at a time, fixed footprint */}
      <div className="so-caption">
        {playing && !taleOpen && (
          <div className="so-progress" key={`p${cur}`}
            style={{ animationDuration: `${beatMs(beat)}ms` }}/>
        )}
        <div className="so-cap-head">
          <span className="n">{NUMERALS[cur] || cur + 1}</span>
          <span className="l">{beat.label}</span>
          {story.story && (
            <button className="so-tale-btn" onClick={() => setTaleOpen(true)}>
              ❧ Full tale
            </button>
          )}
          <span className="c">{cur + 1} / {beats.length}</span>
        </div>
        <div className="so-cap-body" key={cur} style={{ '--capmin': `${capMinHeight}px` }}>
          <p>{beat.text}</p>
          {beat.figures?.length > 0 && (
            <div className="so-figs">
              {beat.figures.map(fig => (
                <FigChip key={fig} fig={fig}
                  color={CAT[_nodeMap[fig]?.category] || accent}
                  onNavigate={onNavigate}/>
              ))}
            </div>
          )}
        </div>
        <div className="so-cap-nav">
          <button className={`so-nav-btn so-play ${playing ? 'on' : ''}`}
            onClick={() => setPlaying(p => !p)}
            aria-label={playing ? 'Pause the tale' : 'Play the tale'}>
            {playing ? '❚❚' : '▶'}
          </button>
          <button className="so-nav-btn" onClick={prev} aria-label="Previous beat">‹</button>
          <div className="so-dots">
            {beats.map((_, i) => (
              <button key={i} className={`so-dot ${i === cur ? 'on' : ''}`}
                onClick={() => setCur(i)} aria-label={`Beat ${i + 1}`}/>
            ))}
          </div>
          {story.source && <span className="so-src">— {story.source}</span>}
          <button className="so-nav-btn" onClick={next} aria-label="Next beat">›</button>
        </div>
      </div>

      {/* full tale — the complete prose retelling as a reading panel */}
      {taleOpen && (
        <div className="so-tale-veil" onClick={() => setTaleOpen(false)}>
          <div className="so-tale" onClick={e => e.stopPropagation()}>
            <div className="so-tale-head">
              <span className="k">The Full Tale</span>
              <span className="t">{node.name}</span>
              <button className="x" onClick={() => setTaleOpen(false)} aria-label="Close tale">✕</button>
            </div>
            <div className="so-tale-body">
              {story.story.split('\n\n').map((para, i) => (
                <p key={i} className={i === 0 ? 'story-text' : ''}>{para}</p>
              ))}
              {story.source && <p className="src">— {story.source}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
