import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import SkyGraph, { CAT, LCOL, cosmogonySeen } from './components/SkyGraph.jsx'
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

/* ── adjacency helpers ───────────────────────────────────────────────────
   D3 replaces a link's source/target string id with the node object once the
   simulation is running elsewhere in the app; these two helpers are the one
   place that normalizes either shape, shared by every adjacency/BFS user. */
function linkEndpoints(l) {
  return [
    typeof l.source === 'object' ? l.source.id : l.source,
    typeof l.target === 'object' ? l.target.id : l.target,
  ]
}
function buildAdjacency(nodes, links) {
  const a = {}
  nodes.forEach(n => (a[n.id] = new Set()))
  links.forEach(l => {
    const [s, t] = linkEndpoints(l)
    a[s]?.add(t); a[t]?.add(s)
  })
  return a
}

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
  root: { width:'100%', height:'100vh', position:'relative', background:'#06080e', overflow:'hidden' },
  /* The chrome belongs to the sky, not to a web page. No pills, no strokes, no
     panels — just letterspaced small caps floating directly on the void, dim
     until the cursor finds them. */
  hbtn: {
    fontFamily:'Cinzel, serif', fontSize:11, letterSpacing:'.22em', color:'#525c6e',
    background:'transparent', border:'none', padding:'6px 3px', cursor:'pointer',
    transition:'color .18s', display:'inline-flex', alignItems:'center', gap:7,
    textTransform:'uppercase',
  },
  hbtnActive: { color:'#cdb88a' },
  bareInput: {
    width:'100%', background:'transparent', border:'none',
    borderBottom:'1px solid #2a3242', borderRadius:0, padding:'9px 2px',
    color:'#dbe1ec', fontFamily:"'Crimson Pro', serif", fontSize:22,
    letterSpacing:'.01em', outline:'none',
  },
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
function AutocompleteInput({ value, onChange, onPick, placeholder, sortedNodes, style, inputStyle, autoFocus }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inputRef = useRef(null)
  useEffect(() => { if (autoFocus) inputRef.current?.focus() }, [autoFocus])

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
        ref={inputRef}
        style={inputStyle || S.input}
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

/* ── summoned search ─────────────────────────────────────────────────────
   No standing search pill sits on the chart. Press "/" (or click the wordmark's
   search cue) and a single bare line drops from the upper sky — dissolved
   chrome, summoned only when wanted, gone on Escape or pick. */
function SummonSearch({ open, onClose, sortedNodes, onPick }) {
  const [q, setQ] = useState('')
  useEffect(() => { if (open) setQ('') }, [open])
  useEffect(() => {
    if (!open) return
    function esc(e) { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }
    document.addEventListener('keydown', esc, true)
    return () => document.removeEventListener('keydown', esc, true)
  }, [open, onClose])

  if (!open) return null
  return (
    <div style={{ position:'absolute', inset:0, zIndex:40, background:'rgba(4,6,12,.55)', backdropFilter:'blur(3px)' }}
      onMouseDown={onClose}>
      <div className="pop-in" onMouseDown={e => e.stopPropagation()}
        style={{ position:'absolute', top:'20vh', left:'50%', transform:'translateX(-50%)', width:'min(440px,84vw)' }}>
        <p style={{ fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:'.28em', color:'#5c6678',
          textTransform:'uppercase', margin:'0 0 6px' }}>Name a figure</p>
        <AutocompleteInput
          value={q} onChange={setQ} onPick={n => { onPick(n.id); onClose() }}
          placeholder="Zeus, Medusa, Chaos…" sortedNodes={sortedNodes}
          inputStyle={S.bareInput} autoFocus
        />
        <p style={{ fontStyle:'italic', fontSize:12.5, color:'#3a4354', margin:'8px 2px 0' }}>
          Enter to leap · Esc to dismiss
        </p>
      </div>
    </div>
  )
}

/* ── era axis ─────────────────────────────────────────────────────────────
   A generational depth scale set into the otherwise-empty lower-left corner:
   the cosmogony reads top-down, oldest to youngest, so the eye has a sense of
   how deep in time any star sits. Colours are the family accents of the wave
   that dominates each generation. */
const ERAS = [
  { r:'Ⅰ', label:'Primordials',        c: CAT.primordial },
  { r:'Ⅱ', label:'Titans',             c: CAT.titan },
  { r:'Ⅲ', label:'Olympians',          c: CAT.olympian },
  { r:'Ⅳ', label:'Sea & the Wild',     c: CAT.sea_deity },
  { r:'Ⅴ', label:'Heroes & Monsters',  c: CAT.monster },
]
function EraAxis() {
  return (
    <div style={{ position:'absolute', left:20, bottom:18, zIndex:12, pointerEvents:'none',
      opacity:0.72 }}>
      <p style={{ fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:'.26em', color:'#4a5364',
        textTransform:'uppercase', margin:'0 0 9px 2px' }}>Depth of Ages</p>
      <div style={{ display:'flex' }}>
        {/* the axis line */}
        <div style={{ width:1, marginLeft:5, marginRight:12,
          background:'linear-gradient(#2a3242, #2a3242 92%, transparent)' }}/>
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          {ERAS.map(e => (
            <div key={e.r} style={{ display:'flex', alignItems:'center', gap:9, position:'relative' }}>
              <span style={{ position:'absolute', left:-18, width:7, height:7, borderRadius:'50%',
                background:e.c, boxShadow:`0 0 7px ${e.c}` }}/>
              <span style={{ fontFamily:'Cinzel, serif', fontSize:11, color:'#7c8698', width:16 }}>{e.r}</span>
              <span style={{ fontFamily:"'Crimson Pro', serif", fontStyle:'italic', fontSize:13,
                color:'#6b7488' }}>{e.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── path panel ──────────────────────────────────────────────────────── */
function PathPanel({ sortedNodes, nodeById, adj, onClose, onFlyTo, onHighlight }) {
  const [fromQ, setFromQ] = useState('')
  const [toQ,   setToQ]   = useState('')
  const [from,  setFrom]  = useState(null)
  const [to,    setTo]    = useState(null)

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
                      const [s, t] = linkEndpoints(l)
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
      position:'absolute', right:20, bottom:52, zIndex:24, width:248,
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
  const [searchOpen,      setSearchOpen]      = useState(false)

  const prevBeatFigRef = useRef(null)

  /* precompute for autocomplete + BFS */
  const { sortedNodes, nodeById, adj } = useMemo(() => {
    const a = buildAdjacency(allNodes, allLinks)
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

  /* fade hint on first interaction, or just after the sky settles — which is
     the ignition's ~13.4 s on a first arrival, and almost immediately on a
     later load, where the cosmogony is skipped and there is nothing to wait on */
  const fadeHint = useCallback(() => setHintFaded(true), [])
  useEffect(() => {
    const t = setTimeout(fadeHint, cosmogonySeen() ? 5000 : 14000)
    return () => clearTimeout(t)
  }, [fadeHint])

  /* "/" summons the search line from anywhere (unless already typing) */
  useEffect(() => {
    function onKey(e) {
      if (e.key === '/' && !searchOpen) {
        const t = e.target
        const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
        if (typing || pathOpen || storyOpen || zodiacOpen || orbitOpen) return
        e.preventDefault()
        setSearchOpen(true)
        setHintFaded(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [searchOpen, pathOpen, storyOpen, zodiacOpen, orbitOpen])

  /* Esc closes the detail panel — advertised in the Shortcuts overlay ("Esc —
     Close panel / overlay") but never actually wired up for it. Guarded so it
     defers to whichever full-screen overlay is on top, since GuidedSky/
     ZodiacSky/StoryOrbit already own Escape for themselves; without the guard,
     dismissing one of those would also blow away the selection underneath. */
  useEffect(() => {
    function onKey(e) {
      if (e.key !== 'Escape') return
      if (searchOpen || pathOpen || storyOpen || zodiacOpen || orbitOpen || shortcutsOpen) return
      if (selectedId) closeDetail()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selectedId, searchOpen, pathOpen, storyOpen, zodiacOpen, orbitOpen, shortcutsOpen])

  /* The three full-screen overlays are opaque and cover the map completely,
     so the sky is told to stop drawing under them. It keeps animating
     otherwise — both float layers re-rasterizing the whole graph every frame,
     the shimmer, the flares, the ambient comet — and the overlays' own
     `backdrop-filter` panels then have to re-blur that moving backdrop every
     frame on top of it. GuidedSky still flies the
     camera underneath (dormancy pauses animation, not the camera), so closing
     a tour still reveals the sky standing on the last figure. */
  useEffect(() => {
    graphRef.current?.setDormant(storyOpen || zodiacOpen || orbitOpen)
  }, [storyOpen, zodiacOpen, orbitOpen])

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

  /* detail panel close — shared by the panel's own ✕, the reset-view button,
     and Escape (below), so all three ways out of a figure agree */
  function closeDetail() {
    setSelectedId(null)
    graphRef.current?.clearSelection()
    graphRef.current?.resetView()
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

  /* header button style helper — dissolved text; brighten on hover */
  function hbtn(active) {
    return { ...S.hbtn, ...(active ? S.hbtnActive : {}) }
  }
  function navHover(active) {
    return {
      onMouseEnter: e => { e.currentTarget.style.color = '#cdb88a' },
      onMouseLeave: e => { e.currentTarget.style.color = active ? '#cdb88a' : '#525c6e' },
    }
  }

  return (
    <div style={S.root}>

      {/* ── main (full-bleed sky; chrome floats over it) ───────────── */}
      <main className="atlas-main" style={{ position:'absolute', inset:0, overflow:'hidden' }}>
        <SkyGraph ref={graphRef} onSelect={handleNodeSelect}/>

        {/* ── wordmark + invitation, floating on the void ──────────── */}
        <div style={{ position:'absolute', top:20, left:22, zIndex:30, pointerEvents:'none' }}>
          <div style={{ fontFamily:'Cinzel, serif', fontWeight:500, fontSize:19, letterSpacing:'.34em',
            color:'#cdb88a', paddingLeft:'.34em' }}>THEOGONY</div>
          <div style={{ fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:'.24em', color:'#4a5364',
            textTransform:'uppercase', margin:'5px 0 0 .34em' }}>A Web of Becoming</div>
          {/* the invitation — the one line that says what to do */}
          <button
            onClick={openStory}
            style={{ pointerEvents:'auto', display:'block', margin:'11px 0 0 .1em', padding:0,
              background:'none', border:'none', cursor:'pointer', textAlign:'left',
              fontFamily:"'Crimson Pro', serif", fontStyle:'italic', fontSize:16.5, color:'#8891a3',
              transition:'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#cdb88a'}
            onMouseLeave={e => e.currentTarget.style.color = '#8891a3'}
          >
            Trace any figure back to Chaos&nbsp;
            <span style={{ color:'#cdb88a' }}>→</span>
          </button>
        </div>

        {/* ── dissolved nav, floating top-right ────────────────────── */}
        <nav style={{ position:'absolute', top:22, right:24, zIndex:30,
          display:'flex', gap:22, alignItems:'center' }}>
          <button style={hbtn(pathOpen)} {...navHover(pathOpen)} onClick={() => pathOpen ? closePath() : openPath()}>
            Path
          </button>
          <button style={hbtn(legendOpen)} {...navHover(legendOpen)} onClick={() => setLegendOpen(v => !v)}>
            Legend
          </button>
          <button style={hbtn(storyOpen)} {...navHover(storyOpen)} onClick={openStory}>
            Story
          </button>
          <button style={hbtn(zodiacOpen)} {...navHover(zodiacOpen)} onClick={() => setZodiacOpen(true)}>
            Zodiac
          </button>
          <button style={hbtn(false)} {...navHover(false)}
            onClick={() => setShortcutsOpen(v => !v)} aria-label="Keyboard shortcuts">?</button>
        </nav>

        {/* path panel */}
        {pathOpen && (
          <PathPanel
            sortedNodes={sortedNodes}
            nodeById={nodeById}
            adj={adj}
            onClose={closePath}
            onFlyTo={id => graphRef.current?.flyTo(id, 2.2)}
            onHighlight={ids => ids ? graphRef.current?.highlightPath(ids) : graphRef.current?.clearPathHighlight()}
          />
        )}

        {/* legend */}
        {legendOpen && <LegendPanel onClose={() => setLegendOpen(false)}/>}

        {/* era axis — generational depth scale in the lower-left corner (hidden
            while the path panel occupies that side of the screen) */}
        {!pathOpen && <EraAxis/>}

        {/* detail panel */}
        <DetailPanel
          nodeId={selectedId}
          nodeById={nodeById}
          onClose={closeDetail}
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
          Click a star to explore · Drag to roam · Scroll to zoom · <span style={{ color:'#5c6678' }}>/</span> to search
        </p>

        {/* reset view — dissolved to bare small caps like the rest of the chrome */}
        <button
          onClick={closeDetail}
          style={{
            position:'absolute', right:24, bottom:18, zIndex:22,
            fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:'.2em', color:'#3e4654',
            background:'none', border:'none', padding:'6px 3px', cursor:'pointer',
            transition:'color .18s', textTransform:'uppercase',
          }}
          onMouseEnter={e => { e.currentTarget.style.color='#cdb88a' }}
          onMouseLeave={e => { e.currentTarget.style.color='#3e4654' }}
        >
          ⤢ Reset View
        </button>

        {/* summoned search line ("/") */}
        <SummonSearch
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          sortedNodes={sortedNodes}
          onPick={id => { graphRef.current?.select(id, true); setHintFaded(true) }}
        />
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
            /* Wake the sky BEFORE the camera call: `setOrbitOpen` only lands in
               the effect after this handler returns, and a dormant graph jumps
               its camera instead of flying it. Here the viewer asked to travel
               to a figure and is about to be looking at the map, so they get
               the flight. */
            graphRef.current?.setDormant(false)
            graphRef.current?.select(id, true)
            setSelectedId(id)
          }}
        />
      )}
    </div>
  )
}