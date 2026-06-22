import { useMemo, useState } from 'react'
import { nodes as allNodes, links as allLinks } from '../data/mythology.js'
import { archetypeMap } from '../data/archetypeMap.js'
import { CAT, LCOL } from './SkyGraph.jsx'
import { linkTypeConfig } from '../data/linkTypeConfig.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { deityStories } from '../data/deityStories.js'

/* precompute adjacency + prom */
const _adj = {}
allNodes.forEach(n => (_adj[n.id] = new Set()))
allLinks.forEach(l => { _adj[l.source]?.add(l.target); _adj[l.target]?.add(l.source) })
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

/* ── sigil ───────────────────────────────────────────────────────────── */
function Sigil({ node, catColor }) {
  const W = 320, H = 172, cx = W / 2, cy = H / 2 + 10
  const near = [...(_adj[node.id] || [])].map(id => _nodeMap[id]).filter(Boolean)
    .sort((a, b) => b.degree - a.degree).slice(0, 9)
  const R = 54
  const gid = `sg-${node.id}`

  const lines = near.map((m, i) => {
    const ang = (-90 + (360 / Math.max(near.length, 1)) * i) * Math.PI / 180
    const x = cx + Math.cos(ang) * (R + (i % 2) * 16)
    const y = cy + Math.sin(ang) * (R * 0.6 + (i % 2) * 10)
    return <line key={'l'+i} x1={cx} y1={cy} x2={x.toFixed(1)} y2={y.toFixed(1)}
      stroke={CAT[m.category]} strokeWidth="0.7" opacity="0.32" strokeDasharray="1 5"/>
  })

  const dots = near.map((m, i) => {
    const ang = (-90 + (360 / Math.max(near.length, 1)) * i) * Math.PI / 180
    const x = cx + Math.cos(ang) * (R + (i % 2) * 16)
    const y = cy + Math.sin(ang) * (R * 0.6 + (i % 2) * 10)
    const r = 1.8 + m.prom * 2.8
    return (
      <g key={'d'+i}>
        <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={r}
          fill="#ece6d6" opacity={0.38 + m.prom * 0.5}/>
        <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={r + 2}
          fill="none" stroke={CAT[m.category]} strokeWidth="0.8" opacity="0.4"/>
      </g>
    )
  })

  const cr = 5 + node.prom * 5.5
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:'auto', display:'block' }}
      preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id={gid} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={catColor} stopOpacity="0.16"/>
          <stop offset="100%" stopColor={catColor} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={W * 0.46} ry={H * 0.42} fill={`url(#${gid})`}/>
      {lines}
      {dots}
      <circle cx={cx} cy={cy} r={cr * 2.6} fill={catColor} opacity="0.1"/>
      <circle cx={cx} cy={cy} r={cr} fill="#f3eede"/>
      <circle cx={cx} cy={cy} r={cr + 2.4} fill="none" stroke="#cdb88a" strokeWidth="1.1" opacity="0.9"/>
      <circle cx={cx} cy={cy} r={cr + 6} fill="none" stroke={catColor} strokeWidth="0.5" opacity="0.35"/>
    </svg>
  )
}

/* ── portrait image with fallback chain ──────────────────────────────── */
function Portrait({ nodeId, onLoaded }) {
  const chain = [
    `/portraits/${nodeId}-full.webp`,
    `/portraits/${nodeId}-full.png`,
    `/portraits/${nodeId}-head.webp`,
    `/portraits/${nodeId}-head.png`,
    `/portraits/${nodeId}.webp`,
  ]
  const [idx, setIdx] = useState(0)
  const [gone, setGone] = useState(false)
  if (gone || idx >= chain.length) return null
  return (
    <img
      key={chain[idx]}
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
export default function DetailPanel({ nodeId, onClose, onNavigate }) {
  const node = nodeId ? _nodeMap[nodeId] : null

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
    <aside className={`detail-panel ${node ? 'open' : ''}`}>
      {node && (
        <PanelContent
          key={node.id}
          node={node}
          connections={connections}
          onClose={onClose}
          onNavigate={onNavigate}
        />
      )}
    </aside>
  )
}

const GOLD = '#cdb88a'

/* ── Constellation spine: the "Origins" story told as a vertical sequence of
   star-marked beats on a dashed thread in the left margin — a little vertical
   constellation. Each beat's star core scales and brightens with `weight`, so the
   pivotal turns read as the brightest stars. Beats carrying `figures` become
   clickable, flying the graph to the beat's central figure via onNavigate. The
   panel falls back to plain prose for any figure whose entry has no `beats`. */
function StorySpine({ beats, catColor, source, onNavigate }) {
  return (
    <div style={{ position:'relative' }}>
      {/* the thread */}
      <div style={{ position:'absolute', left:6, top:8, bottom: source ? 34 : 8, width:0,
        borderLeft:`1px dashed ${catColor}66` }}/>
      {beats.map((b, i) => {
        const w = b.weight ?? 0.7
        const core = 4 + w * 6
        const nav = (b.figures?.length && onNavigate) ? () => onNavigate(b.figures[0]) : null
        return (
          <div key={i}
            onClick={nav || undefined}
            onKeyDown={nav ? e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nav() } } : undefined}
            onMouseEnter={nav ? e => { e.currentTarget.style.transform = 'translateX(3px)' } : undefined}
            onMouseLeave={nav ? e => { e.currentTarget.style.transform = 'translateX(0)' } : undefined}
            role={nav ? 'button' : undefined}
            tabIndex={nav ? 0 : undefined}
            title={nav ? `Fly to ${_nodeMap[b.figures[0]]?.name || b.figures[0]}` : undefined}
            style={{ position:'relative', paddingLeft:30,
              paddingBottom: i < beats.length - 1 ? 22 : 0,
              cursor: nav ? 'pointer' : 'default', transition:'transform .15s', outline:'none' }}>
            {/* star node */}
            <div style={{ position:'absolute', left:0, top:3, width:13, height:13 }}>
              <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:catColor,
                opacity:.16, transform:'scale(2)', filter:'blur(2px)' }}/>
              <div style={{ position:'absolute', inset:`${(13 - core) / 2}px`, borderRadius:'50%',
                background:'#ece6d6', boxShadow:`0 0 ${4 + w * 6}px ${GOLD}${w > .8 ? 'aa' : '77'}` }}/>
              <div style={{ position:'absolute', inset:0, borderRadius:'50%',
                border:`1px solid ${catColor}`, opacity:.5 }}/>
            </div>
            <div style={{ fontFamily:'Cinzel, serif', fontSize:9.5, letterSpacing:'.16em',
              textTransform:'uppercase', color:GOLD, marginBottom:5, marginTop:1 }}>{b.label}</div>
            <p style={{ margin:0, fontSize:14.5, lineHeight:1.58, color:'#c2cad8' }}>{b.text}</p>
          </div>
        )
      })}
      {source && (
        <p style={{ margin:'20px 0 0', paddingLeft:30, fontStyle:'italic', fontSize:12,
          color:'#3a4354' }}>— {source}</p>
      )}
    </div>
  )
}

/* ── main panel body ─────────────────────────────────────────────────── */
function PanelContent({ node, connections, onClose, onNavigate }) {
  const catCfg   = categoryConfig[node.category] || {}
  const archetype = archetypeMap[node.jungian_archetype]
  const catColor = CAT[node.category] || '#888'
  const [hasPortrait, setHasPortrait] = useState(false)
  const story     = deityStories[node.id]
  const storyText = story?.story || node.description
  const storySource = story?.source || null

  let sectionIdx = 0

  return (
    <div style={{ fontFamily:"'Crimson Pro', Georgia, serif", minHeight:'100%' }}>

      {/* ── Hero: portrait + overlay OR sigil + header ──────────────── */}
      <div style={{ position:'relative', flexShrink:0 }}>
        <Portrait nodeId={node.id} onLoaded={() => setHasPortrait(true)}/>

        {/* Sigil shown while no portrait (or forever if none exists) */}
        {!hasPortrait && (
          <div style={{
            background: `radial-gradient(ellipse at 50% 42%, ${catColor}16, #060810 72%)`,
            borderBottom: '1px solid #19202d',
          }}>
            <Sigil node={node} catColor={catColor}/>
          </div>
        )}

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
            {story?.beats?.length ? (
              <StorySpine beats={story.beats} catColor={catColor} source={storySource} onNavigate={onNavigate}/>
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
              {node.notable_myths.map(m => (
                <li key={m} style={{ display:'flex', gap:9, fontSize:14, color:'#4e5a6a', lineHeight:1.45 }}>
                  <span style={{ color:'#4a4030', fontSize:8, marginTop:5, flexShrink:0 }}>✦</span>
                  <span style={{ color:'#6a7585' }}>{m}</span>
                </li>
              ))}
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
