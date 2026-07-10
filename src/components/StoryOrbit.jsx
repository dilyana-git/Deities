import { useState, useEffect, useMemo, useCallback } from 'react'
import { nodes as allNodes } from '../data/mythology.js'
import { deityStories } from '../data/deityStories.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { CAT } from './SkyGraph.jsx'

const NUMERALS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ']
const _nodeMap = Object.fromEntries(allNodes.map(n => [n.id, n]))

/* orbital plane: sun centre + the two rings planets alternate between,
   all in % of the stage so the layout is resolution-independent */
const CX = 50, CY = 40
const RINGS = [{ rx: 24, ry: 19 }, { rx: 38, ry: 30 }]

/* ════════════════════════════════════════════════════════════════════════
   Story Orbit — one deity's tale as a small solar system. The deity burns
   at the centre; each story beat is a planet floating on its orbit,
   arranged clockwise from the lower left. One beat at a time shows in the
   caption, so the whole tale is a handful of clicks — no scrolling.
   ════════════════════════════════════════════════════════════════════════ */
export default function StoryOrbit({ nodeId, onClose, onNavigate }) {
  const node = _nodeMap[nodeId]
  const story = deityStories[nodeId]
  const beats = story?.beats || []
  const accent = CAT[node?.category] || '#cdb88a'
  const [cur, setCur] = useState(0)
  const [portrait, setPortrait] = useState(`/portraits/${nodeId}-head.webp`)

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

  const next = useCallback(() => setCur(c => (c + 1) % beats.length), [beats.length])
  const prev = useCallback(() => setCur(c => (c - 1 + beats.length) % beats.length), [beats.length])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, onClose])

  if (!node || !beats.length) return null
  const beat = beats[cur]
  const active = planets[cur]
  const catLabel = (categoryConfig[node.category]?.label || node.category).toUpperCase()

  return (
    <div className="so-root" style={{ '--accent': accent }}>
      {bgStars.map((s, i) => (
        <div key={i} className="so-star" style={{
          left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size,
          '--lo': s.lo, '--hi': s.hi, '--dur': `${s.dur}s`, '--delay': `${s.delay}s`,
        }}/>
      ))}

      {RINGS.map((r, i) => (
        <div key={i} className="so-ring" style={{
          left: `${CX - r.rx}%`, top: `${CY - r.ry}%`,
          width: `${r.rx * 2}%`, height: `${r.ry * 2}%`,
        }}/>
      ))}

      {/* gold thread: sun → active planet (percent space, so no resize math) */}
      <svg className="so-thread" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1={CX} y1={CY} x2={active.left} y2={active.top}
          stroke="#cdb88a" strokeWidth="1" opacity="0.38" strokeDasharray="2 6"
          vectorEffect="non-scaling-stroke"/>
      </svg>

      {/* the deity sun */}
      <div className="so-sun" style={{ left: `${CX}%`, top: `${CY}%` }}>
        <div className="so-sun-orb">
          {portrait && (
            <img src={portrait} alt="" draggable="false"
              onError={() => setPortrait(p =>
                p.endsWith('.webp') ? `/portraits/${nodeId}-head.png` : null)}/>
          )}
        </div>
        <div className="so-sun-name">{node.name}</div>
        {node.epithet && <div className="so-sun-epithet">{node.epithet}</div>}
      </div>

      {/* beat planets */}
      {beats.map((b, i) => {
        const p = planets[i]
        return (
          <button key={i}
            className={`so-planet ${i === cur ? 'on' : ''}`}
            style={{
              left: `${p.left}%`, top: `${p.top}%`,
              '--sz': `${p.size}px`, '--mid-c': p.color,
              '--fdur': `${5 + i * 0.9}s`, '--fdelay': `${i * 0.7}s`,
            }}
            onClick={() => setCur(i)}
            aria-label={`Beat ${i + 1}: ${b.label}`}
          >
            <span className="so-float">
              <span className={`so-orb ${p.ringed ? 'ringed' : ''}`}/>
            </span>
            <span className="so-tag"><span className="n">{NUMERALS[i] || i + 1}</span>{b.label}</span>
          </button>
        )
      })}

      <button className="gs-exit" onClick={onClose} aria-label="Close story orbit">✕</button>

      <div className="gs-top" style={{ pointerEvents: 'none' }}>
        <div className="gs-story">
          <div className="gs-kicker">The Story in Stars</div>
          <div className="gs-storytitle">{node.name} · {catLabel}</div>
        </div>
      </div>

      <div className="gs-hint">← → to move · esc to close</div>

      {/* caption — one beat at a time, fixed footprint */}
      <div className="so-caption">
        <div className="so-cap-head">
          <span className="n">{NUMERALS[cur] || cur + 1}</span>
          <span className="l">{beat.label}</span>
          <span className="c">{cur + 1} / {beats.length}</span>
        </div>
        <div className="so-cap-body" key={cur}>
          <p>{beat.text}</p>
          {beat.figures?.length > 0 && (
            <div className="so-figs">
              {beat.figures.map(fig => {
                const other = _nodeMap[fig]
                if (!other) return null
                const c = CAT[other.category] || accent
                return (
                  <button key={fig} className="so-chip" style={{ '--chip': c }}
                    title={`Fly to ${other.name}`}
                    onClick={() => onNavigate?.(fig)}>
                    <span className="dot"/>{other.name}<span className="fly">⤢</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
        <div className="so-cap-nav">
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
    </div>
  )
}
