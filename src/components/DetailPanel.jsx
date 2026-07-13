import { useMemo, useState, useRef, useEffect } from 'react'
import { nodes as allNodes, links as allLinks } from '../data/mythology.js'
import { archetypeMap } from '../data/archetypeMap.js'
import { CAT, LCOL, portraitSources } from './SkyGraph.jsx'
import { linkTypeConfig } from '../data/linkTypeConfig.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { deityStories } from '../data/deityStories.js'
import { getConstellation } from '../data/constellations.js'

/* precompute adjacency + prom */
const _adj = {}
allNodes.forEach(n => (_adj[n.id] = new Set()))
allLinks.forEach(l => { _adj[l.source]?.add(l.target); _adj[l.target]?.add(l.source) })

/* myths shared by 3+ nodes are "famous" — highlighted in the panel */
const _mythFreq = {}
allNodes.forEach(n => (n.notable_myths || []).forEach(m => (_mythFreq[m] = (_mythFreq[m] || 0) + 1)))
const _famousMyths = new Set(Object.entries(_mythFreq).filter(([, c]) => c >= 3).map(([m]) => m))
const _maxDeg = Math.max(...allNodes.map(n => _adj[n.id]?.size || 0))
const _nodeMap = Object.fromEntries(allNodes.map(n => ({
  ...n,
  degree: _adj[n.id]?.size || 0,
  prom:   Math.sqrt(_adj[n.id]?.size || 0) / Math.sqrt(_maxDeg),
})).map(n => [n.id, n]))

/* ── vertical rhythm scale (4px base) ─────────────────────────────────────
   Each tier is clearly larger than the one it nests inside, so the eye groups
   content without borders:  within-a-thought < label→content < between-sections.
   Tune the whole panel's density by editing these four numbers. */
const SP = {
  tight:   8,   // intra-element: chip/list gaps, label→inline value
  label:  12,   // a section's rule label → its content
  section:24,   // between whole sections (body column gap)
  padX:   18,   // horizontal padding — constant across the panel
}

/* ── holographic sigil ───────────────────────────────────────────────────
   Rotating 3D constellation projected above an emitter dais. The hero star
   sits at the axis; its top neighbors orbit on a slowly spinning ring with
   varying heights, perspective-projected and depth-sorted each frame.
   Follows the SkyGraph pattern: the SVG DOM is owned imperatively inside a
   single effect (rAF loop) — React never re-renders per frame. */
function HoloSigil({ node, catColor }) {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    const NS = 'http://www.w3.org/2000/svg'
    const cx = 160, cy = 104, F = 340
    const near = [...(_adj[node.id] || [])].map(id => _nodeMap[id]).filter(Boolean)
      .sort((a, b) => b.degree - a.degree).slice(0, 10)

    const mk = (tag, attrs) => {
      const el = document.createElementNS(NS, tag)
      for (const k in attrs) el.setAttribute(k, attrs[k])
      return el
    }

    const stars = near.map((m, i) => {
      const col  = CAT[m.category] || '#888'
      const g    = mk('g', {})
      const line = mk('line', { stroke: col, 'stroke-dasharray': '1 5' })
      const halo = mk('circle', { fill: col })
      const dot  = mk('circle', { fill: '#ece6d6' })
      const ring = mk('circle', { fill: 'none', stroke: col })
      g.append(line, halo, dot, ring)
      layer.appendChild(g)
      return {
        g, line, halo, dot, ring, prom: m.prom,
        ang: (Math.PI * 2 / near.length) * i,
        R: 62 + (i % 3) * 11,        // orbit radius — three interleaved shells
        h: -34 + (i % 5) * 15,       // orbit height above/below the hero
      }
    })

    const cr = 5 + node.prom * 5.5
    const heroG    = mk('g', {})
    const heroGlow = mk('circle', { cx, cy, fill: catColor })
    const heroCore = mk('circle', { cx, cy, fill: '#f3eede' })
    const heroGold = mk('circle', { cx, cy, fill: 'none', stroke: GOLD, 'stroke-width': 1.1, opacity: 0.9 })
    const heroCat  = mk('circle', { cx, cy, fill: 'none', stroke: catColor, 'stroke-width': 0.5, opacity: 0.35 })
    heroG.append(heroGlow, heroCore, heroGold, heroCat)
    layer.appendChild(heroG)

    let raf
    const t0 = performance.now()
    const frame = now => {
      const t = (now - t0) / 1000
      const spin = t * 0.4
      const order = [{ z: 0, el: heroG }]

      stars.forEach(s => {
        const a  = s.ang + spin
        const z3 = Math.sin(a) * s.R
        const k  = F / (F + z3)                 // perspective scale
        const x  = cx + Math.cos(a) * s.R * k
        const y  = cy + (s.h + Math.sin(t * 0.9 + s.ang * 3) * 3) * k
        const front = (1 - z3 / s.R) / 2        // 0 = far side, 1 = near side
        const r = (1.9 + s.prom * 2.9) * k
        s.line.setAttribute('x1', cx); s.line.setAttribute('y1', cy)
        s.line.setAttribute('x2', x.toFixed(1)); s.line.setAttribute('y2', y.toFixed(1))
        s.line.setAttribute('stroke-width', (0.7 * k).toFixed(2))
        s.line.setAttribute('opacity', (0.12 + front * 0.3).toFixed(2))
        for (const el of [s.halo, s.dot, s.ring]) {
          el.setAttribute('cx', x.toFixed(1)); el.setAttribute('cy', y.toFixed(1))
        }
        s.halo.setAttribute('r', (r + 3).toFixed(1))
        s.halo.setAttribute('opacity', (0.05 + front * 0.12).toFixed(2))
        s.dot.setAttribute('r', r.toFixed(1))
        s.dot.setAttribute('opacity', (0.25 + front * (0.3 + s.prom * 0.4)).toFixed(2))
        s.ring.setAttribute('r', (r + 2).toFixed(1))
        s.ring.setAttribute('stroke-width', (0.8 * k).toFixed(2))
        s.ring.setAttribute('opacity', (0.12 + front * 0.35).toFixed(2))
        order.push({ z: z3, el: s.g })
      })

      const pulse = 1 + Math.sin(t * 1.6) * 0.05
      heroGlow.setAttribute('r', (cr * 2.6 * pulse).toFixed(1))
      heroGlow.setAttribute('opacity', (0.11 + Math.sin(t * 1.6) * 0.04).toFixed(2))
      heroCore.setAttribute('r', (cr * pulse).toFixed(1))
      heroGold.setAttribute('r', (cr * pulse + 2.4).toFixed(1))
      heroCat.setAttribute('r', (cr * pulse + 6).toFixed(1))

      order.sort((a, b) => b.z - a.z).forEach(o => layer.appendChild(o.el))  // paint far → near
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
      layer.replaceChildren()
    }
  }, [node.id])

  const bgId   = `holo-bg-${node.id}`
  const coneId = `holo-cone-${node.id}`
  return (
    <svg viewBox="0 0 320 224" style={{ width:'100%', height:'auto', display:'block' }}
      preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id={bgId} cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor={catColor} stopOpacity="0.12"/>
          <stop offset="100%" stopColor={catColor} stopOpacity="0"/>
        </radialGradient>
        <linearGradient id={coneId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={catColor} stopOpacity="0.2"/>
          <stop offset="55%" stopColor={catColor} stopOpacity="0.06"/>
          <stop offset="100%" stopColor={catColor} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="104" rx="150" ry="96" fill={`url(#${bgId})`}/>
      {/* projection cone rising from the emitter */}
      <path d="M 134 196 L 68 30 L 252 30 L 186 196 Z" fill={`url(#${coneId})`}/>
      {/* emitter dais */}
      <ellipse className="holo-ring" cx="160" cy="196" rx="64" ry="13" fill="none"
        stroke={catColor} strokeWidth="0.8" opacity="0.45" strokeDasharray="3 6"/>
      <ellipse cx="160" cy="196" rx="42" ry="8.5" fill="none" stroke={GOLD} strokeWidth="0.7" opacity="0.3"/>
      <ellipse cx="160" cy="196" rx="26" ry="5.5" fill={catColor} opacity="0.13"/>
      <ellipse cx="160" cy="196" rx="13" ry="3.2" fill={catColor} opacity="0.5"/>
      <g ref={layerRef}/>
    </svg>
  )
}

/* ── portrait image with fallback chain ──────────────────────────────── */
function Portrait({ nodeId, onLoaded }) {
  const chain = portraitSources(nodeId, true)
  const [idx, setIdx] = useState(0)
  const [gone, setGone] = useState(false)
  if (gone || idx >= chain.length) return null
  return (
    <img
      key={chain[idx]}
      className="holo-portrait"
      src={chain[idx]}
      alt=""
      onLoad={onLoaded}
      onError={() => idx + 1 < chain.length ? setIdx(idx + 1) : setGone(true)}
      style={{ width:'100%', display:'block', objectFit:'cover', objectPosition:'top center' }}
    />
  )
}

/* ── section with ornamental horizontal-rule label ───────────────────── */
function Section({ label, children, index = 0 }) {
  return (
    <div className="panel-section" style={{ animationDelay: `${index * 0.065 + 0.08}s` }}>
      <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:SP.label }}>
        <div style={{ flex:1, height:1, background:'#19202d' }}/>
        <span style={{
          fontFamily:'Cinzel, serif', fontSize:8.5, letterSpacing:'.22em',
          color:'#6b604a', textTransform:'uppercase',
        }}>
          {label}
        </span>
        <div style={{ flex:1, height:1, background:'#19202d' }}/>
      </div>
      {children}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   DetailPanel
   ════════════════════════════════════════════════════════════════════════ */
export default function DetailPanel({ nodeId, onClose, onNavigate, onOpenOrbit }) {
  const node = nodeId ? _nodeMap[nodeId] : null
  const asideRef = useRef(null)

  useEffect(() => {
    if (node && asideRef.current) asideRef.current.scrollTop = 0
  }, [nodeId])

  const connections = useMemo(() => {
    if (!node) return []
    const out = [], seen = new Set()
    allLinks.forEach(l => {
      const s = typeof l.source === 'object' ? l.source.id : l.source
      const t = typeof l.target === 'object' ? l.target.id : l.target
      let other = null, dir = ''
      if (s === node.id && _nodeMap[t]) { other = _nodeMap[t]; dir = '→' }
      else if (t === node.id && _nodeMap[s]) { other = _nodeMap[s]; dir = '←' }
      if (!other) return
      const key = other.id + l.type + dir
      if (seen.has(key)) return
      seen.add(key)
      out.push({ other, type: l.type, label: l.label, dir })
    })
    return out
  }, [node])

  return (
    <aside ref={asideRef} className={`detail-panel ${node ? 'open' : ''}`}>
      {node && (
        <PanelContent
          key={node.id}
          node={node}
          connections={connections}
          onClose={onClose}
          onNavigate={onNavigate}
          onOpenOrbit={onOpenOrbit}
        />
      )}
    </aside>
  )
}

const GOLD = '#cdb88a'

function MiniConstellation({ spec, weight, catColor }) {
  const w = weight ?? 0.7
  const sz = 28
  const vb = 200
  const scale = vb / 200
  const heroIdx = spec.hero ?? 0
  const bright = new Set(spec.b || [])

  return (
    <svg viewBox={`-100 -100 ${vb} ${vb}`} width={sz} height={sz}
      style={{ display:'block', overflow:'visible' }}>
      <circle cx="0" cy="0" r="90" fill={catColor} opacity={0.06} />
      {spec.e.map(([a, b], i) => (
        <line key={i}
          x1={spec.n[a][0]} y1={spec.n[a][1]}
          x2={spec.n[b][0]} y2={spec.n[b][1]}
          stroke={catColor} strokeWidth={1.2 * scale} opacity={0.35 + w * 0.2} />
      ))}
      {spec.n.map(([x, y], i) => {
        const isHero = i === heroIdx
        const isBright = bright.has(i)
        const r = isHero ? (3.5 + w * 3) * scale
          : isBright ? (2.5 + w * 2) * scale
          : (1.8 + w * 1.2) * scale
        return (
          <g key={i}>
            {(isHero || isBright) && (
              <circle cx={x} cy={y} r={r * 2.2}
                fill={isHero ? GOLD : catColor} opacity={0.12} />
            )}
            <circle cx={x} cy={y} r={r}
              fill={isHero ? '#f3eede' : isBright ? '#ece6d6' : '#b8bfcc'}
              opacity={isHero ? 1 : isBright ? 0.85 : 0.5 + w * 0.3} />
          </g>
        )
      })}
    </svg>
  )
}

function StorySpine({ beats, catColor, source, onNavigate, nodeId }) {
  return (
    <div style={{ position:'relative' }}>
      <div style={{ position:'absolute', left:14, top:14, bottom: source ? 34 : 14, width:0,
        borderLeft:`1px dashed ${catColor}44` }}/>
      {beats.map((b, i) => {
        const w = b.weight ?? 0.7
        const fig = b.figures?.[0]
        // a figure shows its bespoke emblem on first mention; repeat mentions
        // (and figure-less beats) get a unique per-beat pattern so no two
        // constellations in one story panel look identical
        const firstUse = fig && beats.findIndex(x => x.figures?.[0] === fig) === i
        const specKey = firstUse ? fig : `${nodeId || 'beat'}-${i}`
        const spec = getConstellation(specKey)
        const nav = (fig && onNavigate) ? () => onNavigate(fig) : null
        return (
          <div key={i}
            onClick={nav || undefined}
            onKeyDown={nav ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nav() } } : undefined}
            onMouseEnter={nav ? e => { e.currentTarget.style.transform = 'translateX(3px)' } : undefined}
            onMouseLeave={nav ? e => { e.currentTarget.style.transform = 'translateX(0)' } : undefined}
            role={nav ? 'button' : undefined}
            tabIndex={nav ? 0 : undefined}
            title={nav ? `Fly to ${_nodeMap[fig]?.name || fig}` : undefined}
            style={{ position:'relative', paddingLeft:38,
              paddingBottom: i < beats.length - 1 ? 22 : 0,
              cursor: nav ? 'pointer' : 'default', transition:'transform .15s', outline:'none' }}>
            <div style={{ position:'absolute', left:0, top:1 }}>
              <MiniConstellation spec={spec} weight={w} catColor={catColor} />
            </div>
            <div style={{ fontFamily:'Cinzel, serif', fontSize:9.5, letterSpacing:'.16em',
              textTransform:'uppercase', color:GOLD, marginBottom:5, marginTop:1 }}>{b.label}</div>
            <p style={{ margin:0, fontSize:14.5, lineHeight:1.58, color:'#c2cad8' }}>{b.text}</p>
          </div>
        )
      })}
      {source && (
        <p style={{ margin:'20px 0 0', paddingLeft:38, fontStyle:'italic', fontSize:12,
          color:'#3a4354' }}>— {source}</p>
      )}
    </div>
  )
}

/* ── main panel body ─────────────────────────────────────────────────── */
function PanelContent({ node, connections, onClose, onNavigate, onOpenOrbit }) {
  const catCfg   = categoryConfig[node.category] || {}
  const archetype = archetypeMap[node.jungian_archetype]
  const catColor = CAT[node.category] || '#888'
  const [hasPortrait, setHasPortrait] = useState(false)
  const story     = deityStories[node.id]
  const storyText = story?.story || node.description
  const storySource = story?.source || null

  /* hologram tilt — perspective follows the cursor, written straight to the
     element (no per-move React state) */
  const heroTilt = useRef(null)
  const onTilt = e => {
    const el = heroTilt.current
    if (!el) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform =
      `perspective(900px) rotateY(${(px * 14).toFixed(2)}deg) rotateX(${(-py * 10).toFixed(2)}deg)`
  }
  const offTilt = () => { if (heroTilt.current) heroTilt.current.style.transform = '' }

  let sectionIdx = 0

  return (
    <div style={{ fontFamily:"'Crimson Pro', Georgia, serif", minHeight:'100%' }}>

      {/* ── Hero: holographic portrait OR 3D sigil hologram ─────────── */}
      <div
        className="holo-stage"
        style={{
          position:'relative', flexShrink:0, '--holo': catColor,
          background:`radial-gradient(ellipse at 50% 42%, ${catColor}10, #060810 74%)`,
          borderBottom:'1px solid #19202d',
        }}
        onMouseMove={onTilt}
        onMouseLeave={offTilt}
      >
        {/* materialize / float / flicker+tilt each own their layer so their
            transform & opacity animations don't override one another */}
        <div className="holo-materialize">
          <div className="holo-float">
            <div ref={heroTilt} className="holo-tilt holo-flicker">
              <Portrait nodeId={node.id} onLoaded={() => setHasPortrait(true)}/>
              {/* 3D sigil hologram shown while no portrait (or forever if none exists) */}
              {!hasPortrait && <HoloSigil node={node} catColor={catColor}/>}
            </div>
          </div>
        </div>

        {/* holographic chrome — static over the floating content */}
        <div className="holo-scanlines"/>
        <div className="holo-sweep"/>

        {/* Close button — top-right, frosted */}
        <button
          onClick={onClose}
          style={{
            position:'absolute', top:12, right:14, zIndex:10,
            background:'rgba(6,8,14,.7)', border:'1px solid rgba(38,46,60,.85)',
            backdropFilter:'blur(6px)', borderRadius:6,
            width:28, height:28, color:'#5c6678', cursor:'pointer', fontSize:13,
            display:'flex', alignItems:'center', justifyContent:'center', transition:'.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color='#aab2c0'; e.currentTarget.style.borderColor='#3a4354' }}
          onMouseLeave={e => { e.currentTarget.style.color='#5c6678'; e.currentTarget.style.borderColor='rgba(38,46,60,.85)' }}
        >✕</button>

        {/* Portrait overlay: top tint + bottom gradient + name */}
        {hasPortrait && (
          <>
            <div style={{
              position:'absolute', inset:'0 0 auto 0', height:56, pointerEvents:'none',
              background:`linear-gradient(to bottom, ${catColor}22, transparent)`,
            }}/>
            <div style={{
              position:'absolute', inset:'auto 0 0 0', pointerEvents:'none',
              padding:'72px 18px 18px',
              background:'linear-gradient(to top, #090c13 28%, rgba(9,12,19,.65) 60%, transparent)',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <span style={{
                  fontFamily:'Cinzel, serif', fontSize:8.5, letterSpacing:'.18em',
                  padding:'2px 8px', border:`1px solid ${catColor}77`,
                  borderRadius:4, color:catColor,
                  background:'rgba(6,8,14,.55)', backdropFilter:'blur(4px)',
                }}>
                  {(catCfg.label || node.category).toUpperCase()}
                </span>
                {node.roman_equivalent && (
                  <span style={{ fontStyle:'italic', fontSize:11.5, color:'rgba(92,102,120,.9)' }}>
                    ≡ {node.roman_equivalent}
                  </span>
                )}
              </div>
              <h2 style={{
                fontFamily:'Cinzel, serif', fontWeight:500, fontSize:24, color:'#f0ecdf',
                margin:'0 0 4px', lineHeight:1.1,
                textShadow:'0 2px 16px rgba(0,0,0,.9), 0 1px 4px rgba(0,0,0,.6)',
              }}>
                {node.name}
              </h2>
              {node.epithet && (
                <p style={{
                  fontStyle:'italic', fontSize:13.5, color:'rgba(170,178,192,.8)', margin:0,
                  textShadow:'0 1px 8px rgba(0,0,0,.8)',
                }}>
                  {node.epithet}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Header when no portrait — category-bordered block */}
      {!hasPortrait && (
        <div style={{
          padding:'14px 18px 13px',
          borderLeft:`3px solid ${catColor}`,
          borderBottom:'1px solid #19202d',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:5 }}>
            <span style={{
              fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:'.16em',
              padding:'2px 8px', border:`1px solid ${catColor}`, borderRadius:4, color:catColor,
            }}>
              {(catCfg.label || node.category).toUpperCase()}
            </span>
            {node.roman_equivalent && (
              <span style={{ fontStyle:'italic', fontSize:12, color:'#3a4354' }}>
                ≡ {node.roman_equivalent}
              </span>
            )}
          </div>
          <h2 style={{ fontFamily:'Cinzel, serif', fontWeight:500, fontSize:23, color:'#e9edf4', margin:'0 0 3px', lineHeight:1.1 }}>
            {node.name}
          </h2>
          {node.epithet && (
            <p style={{ fontStyle:'italic', fontSize:15, color:'#5c6678', margin:0 }}>
              {node.epithet}
            </p>
          )}
        </div>
      )}

      {/* Renown bar */}
      {/* <div style={{ padding:'11px 18px 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{
            fontFamily:'Cinzel, serif', fontSize:8, letterSpacing:'.24em',
            color:'#2e3545', textTransform:'uppercase', flexShrink:0,
          }}>Renown</span>
          <div style={{ flex:1, height:2, background:'#0e1219', borderRadius:1 }}>
            <div style={{
              width:`${Math.max(node.prom * 100, 3)}%`, height:'100%',
              background:`linear-gradient(to right, ${catColor}55, ${catColor}cc)`,
              borderRadius:1, boxShadow:`0 0 6px ${catColor}44`,
            }}/>
          </div>
          <span style={{ fontFamily:'Cinzel, serif', fontSize:8.5, color:'#2e3545', flexShrink:0 }}>
            {node.degree}
          </span>
        </div>
      </div> */}

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div style={{ padding:`22px ${SP.padX}px 40px`, display:'flex', flexDirection:'column', gap:SP.section }}>

        {/* Ornamental separator */}
        {/* <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ flex:1, height:1, background:'#141820' }}/>
          <span style={{ color:'#2e3545', fontSize:8 }}>✦</span>
          <div style={{ flex:1, height:1, background:'#141820' }}/>
        </div> */}

        {node.jungian_archetype && (
          <Section label="Archetype" index={sectionIdx++}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
              {archetype && (
                <span style={{
                  width:8, height:8, borderRadius:'50%', flexShrink:0, marginTop:4,
                  background: archetype.color,
                  boxShadow:`0 0 8px ${archetype.color}88`,
                }}/>
              )}
              <span style={{
                fontFamily:'Cinzel, serif', fontSize:10.5, letterSpacing:'.08em',
                padding:'3px 11px', border:`1px solid ${(archetype?.color||'#94a3b8')}55`,
                borderRadius:14, color: archetype?.color || '#94a3b8',
              }}>
                {node.jungian_archetype}
              </span>
            </div>
            {archetype && (
              <p style={{ margin:`${SP.tight}px 0 0`, fontStyle:'italic', fontSize:14, color:'#4e5a6a', lineHeight:1.55 }}>
                {archetype.description}
              </p>
            )}
          </Section>
        )}

        {(story?.beats?.length || storyText) && (
          <Section label={story?.beats?.length ? 'The Story in Stars' : 'Origins'} index={sectionIdx++}>
            {story?.beats?.length && onOpenOrbit ? (
              /* teaser + launcher — the full tale lives in the Story Orbit overlay */
              <>
                <p
                  className={`story-text story-teaser ${story.beats[0].text.length > 230 ? 'clamped' : ''}`}
                  style={{ margin:0, fontSize:15, lineHeight:1.6, color:'#bcc4d2' }}
                >
                  {story.beats[0].text}
                </p>
                <button
                  onClick={onOpenOrbit}
                  style={{
                    marginTop:14, width:'100%', padding:'10px 14px', cursor:'pointer',
                    fontFamily:'Cinzel, serif', fontSize:11, letterSpacing:'.18em',
                    color:GOLD, background:'rgba(205,184,138,.05)',
                    border:'1px solid rgba(205,184,138,.35)', borderRadius:8,
                    display:'flex', alignItems:'center', justifyContent:'center', gap:9,
                    transition:'border-color .2s, background .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=GOLD; e.currentTarget.style.background='rgba(205,184,138,.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(205,184,138,.35)'; e.currentTarget.style.background='rgba(205,184,138,.05)' }}
                >
                  <span style={{ fontSize:12 }}>✦</span>
                  ENTER THE STORY
                  <span style={{ fontSize:9, opacity:.6 }}>{story.beats.length} chapters</span>
                </button>
              </>
            ) : story?.beats?.length ? (
              <StorySpine beats={story.beats} catColor={catColor} source={storySource} onNavigate={onNavigate} nodeId={node.id}/>
            ) : (
              <>
                {storyText.split(/\n\s*\n/).map((para, i) => (
                  <p
                    key={i}
                    className={i === 0 ? 'story-text' : undefined}
                    style={{ margin: i === 0 ? 0 : `${SP.tight}px 0 0`, fontSize:15.5, lineHeight:1.65, color:'#bcc4d2' }}
                  >
                    {para}
                  </p>
                ))}
                {storySource && (
                  <p style={{ margin:`${SP.tight}px 0 0`, fontStyle:'italic', fontSize:12, color:'#3a4354', letterSpacing:'.02em' }}>
                    — {storySource}
                  </p>
                )}
              </>
            )}
          </Section>
        )}

        {node.domains?.length > 0 && (
          <Section label="Domains" index={sectionIdx++}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 /* dense inline tags — one notch under SP.tight */ }}>
              {node.domains.map(d => (
                <span key={d} style={{
                  fontSize:12.5, fontStyle:'italic', color:'#5c6678',
                  border:'1px solid #1c2333', borderRadius:5, padding:'2px 9px',
                  background:'#0c1018',
                }}>{d}</span>
              ))}
            </div>
          </Section>
        )}

        {node.notable_myths?.length > 0 && (
          <Section label="Myths" index={sectionIdx++}>
            <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:SP.tight }}>
              {node.notable_myths.map(m => {
                const famous = _famousMyths.has(m)
                return (
                  <li key={m} style={{ display:'flex', gap:9, fontSize:14, color:'#4e5a6a', lineHeight:1.45 }}>
                    <span style={{ color: famous ? GOLD : '#4a4030', fontSize: famous ? 9 : 8, marginTop:5, flexShrink:0, textShadow: famous ? `0 0 6px ${GOLD}55` : 'none' }}>✦</span>
                    <span style={{ color: famous ? '#bcc4d2' : '#6a7585' }}>{m}</span>
                  </li>
                )
              })}
            </ul>
          </Section>
        )}

        {node.symbols?.length > 0 && (
          <Section label="Symbols" index={sectionIdx++}>
            <p style={{ fontStyle:'italic', fontSize:13, color:'#3a4354', margin:0, letterSpacing:'.04em' }}>
              {node.symbols.join('  ·  ')}
            </p>
          </Section>
        )}

        {connections.length > 0 && (
          <Section label={`Connections · ${connections.length}`} index={sectionIdx++}>
            <div style={{ display:'flex', flexDirection:'column', gap:4 /* padded rows already carry 7px of internal space */ }}>
              {connections.map((c, i) => {
                const lc  = LCOL[c.type] || '#888'
                const cfg = linkTypeConfig[c.type] || {}
                return (
                  <button key={i} onClick={() => onNavigate(c.other.id)}
                    style={{
                      display:'flex', gap:10, width:'100%', textAlign:'left',
                      background:'none', border:'none', cursor:'pointer',
                      padding:'7px 6px', borderRadius:7, transition:'.13s', alignItems:'stretch',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background='#0e1320'}
                    onMouseLeave={e => e.currentTarget.style.background='none'}
                  >
                    <span style={{
                      width:2.5, borderRadius:2, flexShrink:0, alignSelf:'stretch',
                      background:lc, boxShadow:`0 0 5px ${lc}44`,
                    }}/>
                    <span style={{ display:'flex', flexDirection:'column', gap:1, minWidth:0 }}>
                      <span style={{ fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:'.08em', color:lc }}>
                        {(c.dir === '←' ? cfg.inverseLabel : cfg.label) || c.type}
                      </span>
                      <span style={{
                        fontFamily:'Cinzel, serif', fontSize:13.5, lineHeight:1.2,
                        color: CAT[c.other.category] || '#94a3b8',
                      }}>
                        {c.other.name}
                      </span>
                      {c.label && (
                        <span style={{ fontStyle:'italic', fontSize:12, color:'#3a4354', lineHeight:1.3 }}>
                          {c.label}
                        </span>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </Section>
        )}

      </div>
    </div>
  )
}
