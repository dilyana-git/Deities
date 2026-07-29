import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import SkyGraph, { CAT, LCOL } from './components/SkyGraph.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import GuidedSky from './components/GuidedSky.jsx'
import ZodiacSky from './components/ZodiacSky.jsx'
import StoryOrbit from './components/StoryOrbit.jsx'
import { nodes as allNodes, links as allLinks } from './data/mythology.js'
import { categoryConfig, categoryOrder } from './data/categoryConfig.js'
import { linkTypeConfig, linkTypeOrder } from './data/linkTypeConfig.js'

/* Legacy guided-tour data lived here. The narratives now live in
   src/data/tours.js (richer captions + kickers) and are presented by the
   Guided Sky "STORY" overlay — see components/GuidedSky.jsx. */

/* ── BFS path-finding ────────────────────────────────────────────────── */
function bfs(adj, from, to) {
  if (from === to) return [from]
  const q = [from], prev = { [from]: null }
  while (q.length) {
    const cur = q.shift()
    for (const nb of (adj[cur] || [])) {
      if (!(nb in prev)) {
        prev[nb] = cur
        if (nb === to) {
          const path = [to]; let c = to
          while (prev[c] != null) { c = prev[c]; path.unshift(c) }
          return path
        }
        q.push(nb)
      }
    }
  }
  return null
}

/* ── shared styles ───────────────────────────────────────────────────── */
const S = {
  root: { width:'100%', height:'100vh', display:'flex', flexDirection:'column', background:'#06080e', overflow:'hidden' },
  hbtn: {
    fontFamily:'Cinzel, serif', fontSize:11.5, letterSpacing:'.16em', color:'#5c6678',
    background:'transparent', border:'1px solid #19202d', borderRadius:7,
    padding:'7px 13px', cursor:'pointer', transition:'.16s',
    display:'inline-flex', alignItems:'center', gap:7,
  },
  hbtnActive: { color:'#cdb88a', border:'1px solid #5a5440', background:'#13110a' },
  overlay: {
    background:'rgba(9,12,19,.97)', border:'1px solid #262e3c', borderRadius:10,
    padding:6, boxShadow:'0 18px 48px rgba(0,0,0,.55)', backdropFilter:'blur(10px)',
  },
  input: {
    width:'100%', background:'rgba(6,8,14,.7)', border:'1px solid #262e3c', borderRadius:7,
    padding:'8px 11px', color:'#aab2c0', fontFamily:"'Crimson Pro', serif", fontSize:15,
    outline:'none',
  },
  acItem: {
    display:'flex', alignItems:'center', gap:9, width:'100%', textAlign:'left',
    padding:'8px 13px', background:'none', border:'none', cursor:'pointer',
    transition:'.12s', borderBottom:'1px solid #19202d', fontFamily:"'Crimson Pro', serif",
  },
}

/* ── autocomplete dropdown ───────────────────────────────────────────── */
function AutocompleteInput({ value, onChange, onPick, placeholder, sortedNodes, style }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase()
    if (!q) return []
    return sortedNodes.filter(n => n.name.toLowerCase().includes(q)).slice(0, 8)
  }, [value, sortedNodes])

  useEffect(() => {
    function outside(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', outside)
    return () => document.removeEventListener('click', outside)
  }, [])

  function pick(n) {
    onChange(n.name)
    setOpen(false)
    onPick(n)
  }

  return (
    <div ref={ref} style={{ position:'relative', ...style }}>
      <input
        style={S.input}
        value={value}
        placeholder={placeholder}
        onChange={e => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => value && setOpen(true)}
        onKeyDown={e => {
          if (e.key === 'Enter' && matches.length) pick(matches[0])
          if (e.key === 'Escape') setOpen(false)
        }}
      />
      {open && matches.length > 0 && (
        <div style={{
          position:'absolute', top:'100%', left:0, right:0, marginTop:5,
          ...S.overlay, padding:0, zIndex:50, overflow:'hidden',
        }}>
          {matches.map(n => (
            <button key={n.id} style={S.acItem}
              onMouseEnter={e => e.currentTarget.style.background='#11151f'}
              onMouseLeave={e => e.currentTarget.style.background='none'}
              onClick={() => pick(n)}
            >
              <span style={{ width:8, height:8, borderRadius:'50%', flexShrink:0,
                background: CAT[n.category] || '#888', boxShadow:`0 0 6px ${CAT[n.category]||'#888'}` }}/>
              <span style={{ fontSize:15, color:'#aab2c0', flex:1 }}>{n.name}</span>
              <span style={{ fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:'.12em',
                color:'#3a4354', textTransform:'uppercase' }}>
                {categoryConfig[n.category]?.label || n.category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── floating search bar ─────────────────────────────────────────────── */
function SearchBox({ sortedNodes, onPick }) {
  const [q, setQ] = useState('')
  function handlePick(node) { setQ(''); onPick(node.id) }
  return (
    <div style={{ position:'absolute', top:16, left:16, zIndex:20, width:262, opacity:0.65, transition:'opacity .2s' }}
      onMouseEnter={e => e.currentTarget.style.opacity='1'}
      onMouseLeave={e => e.currentTarget.style.opacity='0.65'}>
      <div style={{
        display:'flex', alignItems:'center', gap:9, padding:'9px 13px',
        background:'rgba(10,13,20,.72)', border:'1px solid #1e2530', borderRadius:9,
        backdropFilter:'blur(8px)',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5c6678" strokeWidth="2">
          <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>
        </svg>
        <AutocompleteInput
          value={q} onChange={setQ} onPick={handlePick}
          placeholder="find a figure…" sortedNodes={sortedNodes}
          style={{ flex:1 }}
        />
      </div>
    </div>
  )
}

/* ── path panel ──────────────────────────────────────────────────────── */
function PathPanel({ sortedNodes, nodeById, onClose, onFlyTo, links, onHighlight }) {
  const [fromQ, setFromQ] = useState('')
  const [toQ,   setToQ]   = useState('')
  const [from,  setFrom]  = useState(null)
  const [to,    setTo]    = useState(null)

  const adj = useMemo(() => {
    const a = {}
    allNodes.forEach(n => (a[n.id] = new Set()))
    allLinks.forEach(l => {
      const s = typeof l.source === 'object' ? l.source.id : l.source
      const t = typeof l.target === 'object' ? l.target.id : l.target
      a[s]?.add(t); a[t]?.add(s)
    })
    return a
  }, [])

  const path = useMemo(() => {
    if (!from || !to) return null
    return bfs(adj, from, to)
  }, [from, to, adj])

  useEffect(() => {
    onHighlight?.(path)
  }, [path, onHighlight])

  return (
    <div style={{
      position:'absolute', top:16, left:16, zIndex:24, width:288,
      ...S.overlay, padding:14,
      boxShadow:'0 18px 50px rgba(0,0,0,.5)', backdropFilter:'blur(10px)',
    }} className="pop-in">
      <div style={{ display:'flex', alignItems:'center', marginBottom:11 }}>
        <span style={{ fontFamily:'Cinzel, serif', fontSize:12, letterSpacing:'.18em', color:'#cdb88a', textTransform:'uppercase' }}>
          Trace a Path
        </span>
        <button onClick={onClose}
          style={{ marginLeft:'auto', background:'none', border:'none', color:'#5c6678', cursor:'pointer', fontSize:15 }}>
          ✕
        </button>
      </div>

      <PathSlot label="From" value={fromQ} onChange={v => { setFromQ(v); setFrom(null) }}
        onPick={n => { setFromQ(n.name); setFrom(n.id) }} sortedNodes={sortedNodes}/>
      <div style={{ marginBottom:8 }}/>
      <PathSlot label="To"   value={toQ}   onChange={v => { setToQ(v);   setTo(null)  }}
        onPick={n => { setToQ(n.name);   setTo(n.id)   }} sortedNodes={sortedNodes}/>

      {from && to && (
        <div style={{ marginTop:8 }}>
          {!path ? (
            <p style={{ fontStyle:'italic', color:'#5c6678', fontSize:14, margin:'8px 0 0' }}>
              No chain of relation links these two.
            </p>
          ) : (
            <>
              <div style={{ display:'flex', flexDirection:'column', gap:2, marginTop:8 }}>
                {path.map((id, i) => {
                  const n = nodeById[id]
                  if (!n) return null
                  const rel = i < path.length - 1 ? (() => {
                    const l = allLinks.find(l => {
                      const s = typeof l.source === 'object' ? l.source.id : l.source
                      const t = typeof l.target === 'object' ? l.target.id : l.target
                      return (s === id && t === path[i+1]) || (t === id && s === path[i+1])
                    })
                    return l ? (linkTypeConfig[l.type]?.label || l.type) : 'linked'
                  })() : null
                  return (
                    <div key={id}>
                      <button onClick={() => onFlyTo(id)}
                        style={{
                          display:'flex', alignItems:'center', gap:9, background:'none',
                          border:'none', cursor:'pointer', padding:'5px 6px',
                          borderRadius:6, transition:'.12s', textAlign:'left', width:'100%',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background='#12161f'}
                        onMouseLeave={e => e.currentTarget.style.background='none'}
                      >
                        <span style={{ width:9, height:9, borderRadius:'50%', flexShrink:0,
                          background: CAT[n.category]||'#888', boxShadow:`0 0 6px ${CAT[n.category]||'#888'}` }}/>
                        <span style={{ fontFamily:"'Crimson Pro', serif", fontSize:15.5, color:'#dbe1ec' }}>
                          {n.name}
                        </span>
                      </button>
                      {rel && (
                        <p style={{
                          fontStyle:'italic', fontSize:12.5, color:'#8c7f5e',
                          margin:0, marginLeft:18, paddingLeft:11,
                          borderLeft:'1px dotted #5a5440', lineHeight:1.4,
                        }}>{rel}</p>
                      )}
                    </div>
                  )
                })}
              </div>
              <p style={{ fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:'.1em', color:'#5c6678', margin:'9px 0 0' }}>
                {path.length - 1} steps · {path.length} figures
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function PathSlot({ label, value, onChange, onPick, sortedNodes }) {
  return (
    <div>
      <span style={{ fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:'.16em', color:'#5c6678',
        textTransform:'uppercase', display:'block', marginBottom:4 }}>
        {label}
      </span>
      <AutocompleteInput
        value={value} onChange={onChange} onPick={onPick}
        placeholder="a figure…" sortedNodes={sortedNodes}
      />
    </div>
  )
}

/* ── legend popover ──────────────────────────────────────────────────── */
function LegendPanel({ onClose }) {
  return (
    <div style={{
      position:'absolute', left:16, bottom:16, zIndex:24, width:248,
      ...S.overlay, padding:'14px 16px',
      boxShadow:'0 18px 50px rgba(0,0,0,.5)',
    }} className="pop-in">
      <button onClick={onClose}
        style={{ position:'absolute', top:11, right:13, background:'none', border:'none',
          color:'#5c6678', cursor:'pointer', fontSize:14 }}>✕</button>

      <LegHead>Entities — brightness is renown</LegHead>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px 12px' }}>
        {categoryOrder.map(c => (
          <div key={c} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:"'Crimson Pro', serif", fontSize:13.5, color:'#aab2c0' }}>
            <span style={{ width:9, height:9, borderRadius:'50%', flexShrink:0,
              background:'#ece6d6', boxShadow:`0 0 0 1.5px ${CAT[c]||'#888'}` }}/>
            {categoryConfig[c]?.label || c}
          </div>
        ))}
      </div>

      <LegHead style={{ marginTop:14 }}>Relations</LegHead>
      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
        {linkTypeOrder.map(t => (
          <div key={t} style={{ display:'flex', alignItems:'center', gap:8, fontFamily:"'Crimson Pro', serif", fontSize:13.5, color:'#aab2c0' }}>
            <span style={{ width:18, height:2, borderRadius:2, flexShrink:0, background: LCOL[t]||'#888' }}/>
            {linkTypeConfig[t]?.label || t}
          </div>
        ))}
      </div>

      <p style={{
        fontStyle:'italic', fontSize:12, color:'#3a4354', margin:'12px 0 0', lineHeight:1.4,
        borderTop:'1px solid #19202d', paddingTop:9,
      }}>
        A figure's star shines brighter the more myths bind it to others.
      </p>
    </div>
  )
}

function LegHead({ children, style }) {
  return (
    <p style={{ fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:'.2em', color:'#5c6678',
      textTransform:'uppercase', margin:'0 0 8px', ...style }}>
      {children}
    </p>
  )
}

/* ════════════════════════════════════════════════════════════════════════
   App
   ════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const graphRef = useRef(null)

  const [selectedId,      setSelectedId]      = useState(null)
  const [legendOpen,      setLegendOpen]      = useState(false)
  const [pathOpen,        setPathOpen]        = useState(false)
  const [hintFaded,       setHintFaded]       = useState(false)
  const [storyOpen,       setStoryOpen]       = useState(false)
  const [storyTourId,     setStoryTourId]     = useState(null)
  const [storyBeat,       setStoryBeat]       = useState(0)
  const [zodiacOpen,      setZodiacOpen]      = useState(false)
  const [orbitOpen,       setOrbitOpen]       = useState(false)
  const [shortcutsOpen,   setShortcutsOpen]   = useState(false)

  const prevBeatFigRef = useRef(null)

  /* precompute for autocomplete + BFS */
  const { sortedNodes, nodeById, adj } = useMemo(() => {
    const a = {}
    allNodes.forEach(n => (a[n.id] = new Set()))
    allLinks.forEach(l => {
      const s = typeof l.source === 'object' ? l.source.id : l.source
      const t = typeof l.target === 'object' ? l.target.id : l.target
      a[s]?.add(t); a[t]?.add(s)
    })
    const maxDeg = Math.max(...allNodes.map(n => a[n.id]?.size || 0))
    const enriched = allNodes.map(n => ({
      ...n, degree: a[n.id]?.size || 0,
      prom: Math.sqrt(a[n.id]?.size || 0) / Math.sqrt(maxDeg),
    }))
    return {
      sortedNodes: [...enriched].sort((a, b) => a.name.localeCompare(b.name)),
      nodeById:    Object.fromEntries(enriched.map(n => [n.id, n])),
      adj:         a,
    }
  }, [])

  /* fade hint on first interaction / after 9 s */
  const fadeHint = useCallback(() => setHintFaded(true), [])
  useEffect(() => { const t = setTimeout(fadeHint, 9000); return () => clearTimeout(t) }, [fadeHint])

  /* path panel: when it opens, clear selection; when closed, restore */
  function openPath() {
    setPathOpen(true)
    setSelectedId(null)
    graphRef.current?.clearSelection()
    graphRef.current?.resetView()   // enter path mode at the opening overview
  }
  function closePath() {
    setPathOpen(false)
    graphRef.current?.clearPathHighlight()
  }

  /* ── Guided Sky (cinematic story mode) ──────────────────────────── */
  function openStory() {
    if (pathOpen) closePath()
    prevBeatFigRef.current = null
    setStoryTourId(null)
    setStoryBeat(0)
    setStoryOpen(true)
  }
  /* opened from a figure's Stories list — lands on the chapter where it enters */
  function openTale(tourId, beat) {
    if (pathOpen) closePath()
    prevBeatFigRef.current = null
    setStoryTourId(tourId)
    setStoryBeat(beat || 0)
    setStoryOpen(true)
  }
  function closeStory() {
    setStoryOpen(false)
    graphRef.current?.setTourLock(false)
    graphRef.current?.clearLitEdge()
    prevBeatFigRef.current = null
  }
  function handleStoryBeat(fig) {
    graphRef.current?.select(fig, true, { tour: true })
    graphRef.current?.setTourLock(true)
    if (prevBeatFigRef.current && prevBeatFigRef.current !== fig) {
      graphRef.current?.litEdge(prevBeatFigRef.current, fig)
    } else {
      graphRef.current?.clearLitEdge()
    }
    prevBeatFigRef.current = fig
  }

  const handleNodeSelect = useCallback((id) => {
    setSelectedId(id)
    if (id) setHintFaded(true)
  }, [])

  /* header button style helper */
  function hbtn(active) {
    return { ...S.hbtn, ...(active ? S.hbtnActive : {}) }
  }

  return (
    <div style={S.root}>

      {/* ── header ─────────────────────────────────────────────────── */}
      <header style={{
        display:'flex', alignItems:'center', gap:16, padding:'13px 22px',
        borderBottom:'1px solid #19202d', flexShrink:0, zIndex:30,
        background:'linear-gradient(180deg,rgba(8,10,16,.9),rgba(8,10,16,.5))',
      }}>
        <span style={{ fontFamily:'Cinzel, serif', fontWeight:500, fontSize:19, letterSpacing:'.34em', color:'#cdb88a', paddingLeft:'.34em' }}>
          THEOGONY
        </span>
        <span style={{ fontStyle:'italic', fontSize:16, color:'#5c6678', marginRight:'auto', whiteSpace:'nowrap' }}>
          A Web of Becoming
        </span>

        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <button style={hbtn(pathOpen)} onClick={() => pathOpen ? closePath() : openPath()}>
            PATH
          </button>
          <button style={hbtn(legendOpen)} onClick={() => setLegendOpen(v => !v)}>
            LEGEND
          </button>
          <button style={hbtn(storyOpen)} onClick={openStory}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'currentColor', opacity:.7 }}/>
            STORY
          </button>
          <button style={hbtn(zodiacOpen)} onClick={() => setZodiacOpen(true)}>
            <span style={{ fontSize:12, lineHeight:1, opacity:.8 }}>✦</span>
            ZODIAC
          </button>
          <button
            style={{ ...S.hbtn, width:28, height:28, padding:0, display:'grid', placeItems:'center', borderRadius:'50%', fontSize:13 }}
            onClick={() => setShortcutsOpen(v => !v)}
            aria-label="Keyboard shortcuts"
          >?</button>
        </div>
      </header>

      {/* ── main ───────────────────────────────────────────────────── */}
      <main className="atlas-main" style={{ position:'relative', flex:1, overflow:'hidden' }}>
        <SkyGraph ref={graphRef} onSelect={handleNodeSelect}/>

        {/* floating search (dimmed while path panel is open) */}
        <div style={{ pointerEvents: pathOpen ? 'none' : 'auto', opacity: pathOpen ? 0.25 : 1, transition: 'opacity .3s' }}>
          <SearchBox
            sortedNodes={sortedNodes}
            onPick={id => { graphRef.current?.select(id, true); setHintFaded(true) }}
          />
        </div>

        {/* path panel */}
        {pathOpen && (
          <PathPanel
            sortedNodes={sortedNodes}
            nodeById={nodeById}
            links={allLinks}
            onClose={closePath}
            onFlyTo={id => graphRef.current?.flyTo(id, 2.2)}
            onHighlight={ids => ids ? graphRef.current?.highlightPath(ids) : graphRef.current?.clearPathHighlight()}
          />
        )}

        {/* legend */}
        {legendOpen && <LegendPanel onClose={() => setLegendOpen(false)}/>}

        {/* detail panel */}
        <DetailPanel
          nodeId={selectedId}
          nodeById={nodeById}
          onClose={() => {
            setSelectedId(null)
            graphRef.current?.clearSelection()
            graphRef.current?.resetView()   // return to the opening overview
          }}
          onNavigate={id => {
            graphRef.current?.select(id, true)
            setSelectedId(id)
          }}
          onOpenOrbit={() => setOrbitOpen(true)}
          onOpenTale={openTale}
        />

        {/* hint */}
        <p style={{
          position:'absolute', left:'50%', bottom:16, transform:'translateX(-50%)',
          zIndex:10, fontStyle:'italic', fontSize:13.5, color:'#3a4354',
          pointerEvents:'none', transition:'opacity .3s', opacity: hintFaded ? 0 : 1,
          whiteSpace:'nowrap', margin:0,
        }}>
          Click a star to explore · Drag to roam · Scroll to zoom
        </p>

        {/* reset view */}
        <button
          onClick={() => { setSelectedId(null); graphRef.current?.clearSelection(); graphRef.current?.resetView() }}
          style={{
            position:'absolute', right:16, bottom:16, zIndex:22,
            fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:'.14em', color:'#3e4654',
            background:'rgba(9,12,19,.6)', border:'1px solid #161c28', borderRadius:7,
            padding:'7px 12px', cursor:'pointer', transition:'opacity .2s, color .15s, border-color .15s',
            opacity:0.6,
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.color='#cdb88a'; e.currentTarget.style.borderColor='#5a5440' }}
          onMouseLeave={e => { e.currentTarget.style.opacity='0.6'; e.currentTarget.style.color='#3e4654'; e.currentTarget.style.borderColor='#161c28' }}
        >
          ⤢ RESET VIEW
        </button>
      </main>

      {/* tooltip anchor (position driven by mousemove in SkyGraph) */}
      <div id="tip"/>

      {/* keyboard shortcuts overlay */}
      {shortcutsOpen && (
        <div style={{
          position:'fixed', inset:0, zIndex:200, display:'grid', placeItems:'center',
          background:'rgba(4,6,12,.7)', backdropFilter:'blur(4px)',
        }} onClick={() => setShortcutsOpen(false)}>
          <div style={{
            background:'rgba(10,14,22,.95)', border:'1px solid #262e3c', borderRadius:14,
            padding:'28px 36px', maxWidth:360, width:'90%', boxShadow:'0 16px 48px rgba(0,0,0,.6)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <span style={{ fontFamily:'Cinzel, serif', fontSize:14, letterSpacing:'.18em', color:'#cdb88a' }}>SHORTCUTS</span>
              <button onClick={() => setShortcutsOpen(false)} style={{
                background:'none', border:'none', color:'#5c6678', fontSize:16, cursor:'pointer', padding:4,
              }}>✕</button>
            </div>
            {[
              ['Click node', 'Select & view details'],
              ['Drag node', 'Reposition a star'],
              ['Scroll / Pinch', 'Zoom in or out'],
              ['Click + drag canvas', 'Pan the view'],
              ['Esc', 'Close panel / overlay'],
              ['← →', 'Navigate tour or zodiac'],
              ['Space', 'Play / pause tour'],
            ].map(([key, desc]) => (
              <div key={key} style={{ display:'flex', justifyContent:'space-between', gap:16, padding:'7px 0', borderBottom:'1px solid #141820' }}>
                <span style={{ fontFamily:'Cinzel, serif', fontSize:11, letterSpacing:'.06em', color:'#ece6d6', whiteSpace:'nowrap' }}>{key}</span>
                <span style={{ fontSize:13, fontStyle:'italic', color:'#5c6678', textAlign:'right' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* guided sky — cinematic story overlay */}
      {storyOpen && (
        <GuidedSky
          initialTourId={storyTourId}
          initialBeat={storyBeat}
          onClose={closeStory}
          onBeatChange={handleStoryBeat}
        />
      )}

      {/* zodiac sky — standalone cinematic zodiac view */}
      {zodiacOpen && <ZodiacSky onClose={() => setZodiacOpen(false)} />}

      {/* story orbit — the selected deity's tale as floating planets */}
      {orbitOpen && selectedId && (
        <StoryOrbit
          nodeId={selectedId}
          onClose={() => setOrbitOpen(false)}
          onNavigate={id => {
            setOrbitOpen(false)
            graphRef.current?.select(id, true)
            setSelectedId(id)
          }}
        />
      )}
    </div>
  )
}