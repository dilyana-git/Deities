import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import SkyGraph, { CAT, LCOL } from './components/SkyGraph.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import WireframesPage from './components/WireframesPage.jsx'
import { nodes as allNodes, links as allLinks } from './data/mythology.js'
import { categoryConfig, categoryOrder } from './data/categoryConfig.js'
import { linkTypeConfig, linkTypeOrder } from './data/linkTypeConfig.js'

/* ── tour data ───────────────────────────────────────────────────────── */
const TOURS = [
  { id: 'titans', title: 'The Fall of the Titans',
    steps: [
      ['chaos',  'In the beginning was only Chaos — the formless gap from which all becoming erupts.'],
      ['gaia',   'From the void rose Gaia, the broad-breasted Earth, mother of all that has form.'],
      ['uranus', 'Gaia bore Uranus, the starry Sky, and took him as her equal and her mate.'],
      ['cronus', 'Their son Cronus seized a sickle, unmanned his father, and claimed the cosmos as his own.'],
      ['rhea',   'Cronus swallowed each child Rhea bore him — until she hid one away and fed him a stone.'],
      ['zeus',   'That hidden child was Zeus, who freed his siblings and cast the Titans down into Tartarus.'],
    ] },
  { id: 'night', title: 'The Children of Night',
    steps: [
      ['nyx',      'Nyx, Lady of Night, is so old and so dread that even Zeus feared to cross her.'],
      ['erebus',   'With Erebus, the deep darkness, she shares the unlit places between the worlds.'],
      ['thanatos', 'From her alone came Thanatos — Death, who carries the breathless away.'],
      ['hypnos',   'And Hypnos, gentle Sleep, his twin, who can still even the king of the gods.'],
      ['nemesis',  'She bore Nemesis too, the weight that balances every excess of fortune.'],
      ['eris',     'And Eris, Strife, whose single golden apple would set the world to war.'],
    ] },
  { id: 'gorgon', title: 'Perseus & the Gorgon',
    steps: [
      ['poseidon',  'Poseidon lay with the maiden Medusa within Athena\'s own temple.'],
      ['medusa',    'For that desecration Medusa was cursed — her hair to serpents, her gaze to stone.'],
      ['athena',    'Athena, wronged, later armed the hero who would end the monster she had made.'],
      ['perseus',   'Perseus, watching only her reflection, struck off Medusa\'s head.'],
      ['andromeda', 'With that same severed head he turned a sea-beast to rock, and won Andromeda.'],
    ] },
    { id: 'odyssey', title: 'The Long Way Home',
    steps: [
      ['odysseus',  'Odysseus, who broke Troy with the wooden horse, turned for home — and the sea turned ten years against him.'],
      ['poseidon',  'For blinding the Cyclops, his son, Poseidon swore the wanderer would not see Ithaca for an age.'],
      ['circe',     'On the isle of Aiaia, the witch Circe made swine of his crew, then kept him a year in her hall.'],
      ['scylla',    'In the narrow strait, six-mouthed Scylla snatched six screaming men from his deck.'],
      ['charybdis', 'Across the water her sister Charybdis drank the whole sea and spat it back; he threaded the gap between.'],
      ['helios',    'His starving men slaughtered the cattle of the Sun, and Helios swore they would never come home.'],
      ['calypso',   'Wrecked and alone, he was held seven years by Calypso, who offered him a deathless life he refused.'],
      ['athena',    'Only grey-eyed Athena, his unwavering champion, won him at last his long-denied return.'],
    ] },

  { id: 'theseus', title: 'Theseus & the Labyrinth',
    steps: [
      ['poseidon', 'Poseidon — some say Theseus\'s true father — sent a white bull from the waves to Crete.'],
      ['minotaur', 'From that bull was born the Minotaur, a man with a bull\'s head, caged in the winding Labyrinth.'], // NEW NODE
      ['ariadne',  'The princess Ariadne, in love, gave him a thread to unwind behind him through the maze.'],          // NEW NODE
      ['theseus',  'Theseus slew the beast at the maze\'s heart, followed the thread to the light — then abandoned Ariadne sleeping on an island.'],
    ] },

  { id: 'argonautica', title: 'Jason & the Golden Fleece',
    steps: [
      ['hera',            'Hera, who loathed King Pelias, set Jason upon the long quest for the Golden Fleece.'],
      ['jason',           'Jason gathered the greatest heroes aboard the Argo and sailed east to far Colchis.'],
      ['medea',           'There the sorceress Medea, struck with sudden love, betrayed her own father to aid him — and he would one day cast her aside, to his ruin.'], // NEW NODE
      ['colchian_dragon', 'She charmed the sleepless dragon coiled about the Fleece into slumber, and the prize was won.'],
    ] },

  { id: 'labours', title: 'The Labours of Heracles',
    steps: [
      ['heracles',       'Driven to madness by Hera, Heracles killed his own children — and was bound to twelve labours in penance.'],
      ['nemean_lion',    'He strangled the Nemean Lion, whose golden hide turned every blade, and wore its pelt thereafter.'],
      ['lernaean_hydra', 'He seared the necks of the Lernaean Hydra, which grew two heads for each he struck away.'],
      ['geryon',         'At the world\'s western edge he slew three-bodied Geryon and drove home the red cattle.'],
      ['ladon',          'He took the golden apples that the sleepless serpent Ladon coiled to guard.'],
      ['cerberus',       'And for the last, he dragged Cerberus himself, alive, up from the doorway of the dead.'],
    ] },

  { id: 'metamorphoses', title: 'Bodies Changed',
    steps: [
      ['daphne',   'Fleeing Apollo, the nymph Daphne begged to lose the beauty that doomed her — and became the laurel.'],
      ['io',       'Io, loved by Zeus and hidden as a white heifer, was driven across the earth by a single stinging fly.'],
      ['callisto', 'Callisto, seduced and then turned to a bear, was set among the stars to escape her hunting son.'],
      ['arachne',  'Arachne, who wove the gods\' cruelties too well, was shrunk by Athena into the first spider.'],
      ['medusa',   'Medusa, punished for a violation not her own, wore serpents for hair and stone in her gaze.'],
      ['scylla',   'And Scylla, poisoned by a rival\'s envy, sprouted howling dogs from her waist and haunted the strait.'],
    ] },
    { id: 'brood', title: 'The Brood of Typhon',
    steps: [
      ['typhon',         "Typhon, hundred-headed and storm-born, was the last and most fearsome child of Gaia."],
      ['echidna',        "With Echidna, half-woman and half-serpent, he sired the monsters the heroes were born to kill."],
      ['cerberus',       "Cerberus, three-headed, set to guard the gate that no shade may leave."],
      ['lernaean_hydra', "The Lernaean Hydra, regrowing two heads for every one cut away."],
      ['chimera',        "The Chimera — lion, goat, and serpent burning in a single body."],
      ['sphinx',         "And the Sphinx, who strangled all who could not answer her riddle."],
    ] },

  { id: 'phorcys', title: 'The House of Phorcys & Ceto',
    steps: [
      ['pontus',  "Pontus, the primal Sea, was born of Earth alone, before any sailor."],
      ['phorcys', "His son Phorcys, god of the deep's hidden dangers, took his own sister to wife."],
      ['ceto',    "Ceto, mother of sea-terrors, bore him a lineage of horrors."],
      ['graeae',  "The Grey Sisters, born old, sharing a single eye and tooth between them."],
      ['gorgons', "The Gorgons, serpent-haired — and among them, mortal Medusa."],
      ['ladon',   "And Ladon, the hundred-headed serpent coiled about the golden apples."],
    ] },
     { id: 'ovid', title: 'Tales from Ovid',
    steps: [
      ['daphne',         "Daphne, fleeing Apollo, became the laurel rather than be caught."],
      ['actaeon',        "Actaeon, who glimpsed Artemis bathing, was turned to a stag and torn apart by his own hounds."],
      ['narcissus',      "Narcissus, punished by Nemesis, wasted away in love with his own reflection and became a flower."],
      ['echo',           "Echo, cursed to only repeat, loved him in vain until nothing was left of her but a voice."],
      ['arachne',        "Arachne, who out-wove Athena and dared show the gods' cruelty, was shrunk into the first spider."],
      ['tiresias',       "Tiresias, who lived as both man and woman, was blinded by Hera and given prophecy by Zeus."],
      ['adonis',         "Adonis, beloved of two goddesses, died on a boar's tusk and rose again as the anemone."],
      ['hermaphroditus', "Hermaphroditus, seized by the nymph Salmacis, was fused with her into a single body."],
    ] 
  
}
]

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
  hbtnActive: { color:'#cdb88a', borderColor:'#5a5440', background:'#13110a' },
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
    <div style={{ position:'absolute', top:16, left:16, zIndex:20, width:262 }}>
      <div style={{
        display:'flex', alignItems:'center', gap:9, padding:'9px 13px',
        background:'rgba(10,13,20,.82)', border:'1px solid #262e3c', borderRadius:9,
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

/* ── tour bar ────────────────────────────────────────────────────────── */
function TourBar({ tour, step, onPrev, onNext, onExit }) {
  const [id, caption] = tour.steps[step]
  return (
    <div className="tourbar open">
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:7 }}>
        <span style={{ fontFamily:'Cinzel, serif', fontSize:12, letterSpacing:'.2em', color:'#cdb88a', textTransform:'uppercase' }}>
          {tour.title}
        </span>
        <button onClick={onExit}
          style={{ marginLeft:'auto', background:'none', border:'none', color:'#5c6678', cursor:'pointer', fontSize:16, lineHeight:1 }}>
          ✕
        </button>
      </div>
      <p style={{ fontFamily:"'Crimson Pro', serif", fontSize:18, lineHeight:1.5, color:'#cdd4e0', minHeight:54, margin:0 }}>
        {caption}
      </p>
      <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:8 }}>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          {tour.steps.map((_, i) => (
            <span key={i} style={{
              width:7, height:7, borderRadius:'50%', transition:'.2s',
              background: i === step ? '#cdb88a' : i < step ? '#5a5440' : '#19202d',
              boxShadow: i === step ? '0 0 8px #8c7f5e' : 'none',
            }}/>
          ))}
        </div>
        <button onClick={onPrev} disabled={step === 0}
          style={{
            fontFamily:'Cinzel, serif', fontSize:11, letterSpacing:'.12em', cursor:'pointer',
            border:'1px solid #262e3c', borderRadius:7, padding:'7px 14px',
            background:'transparent', color: step === 0 ? '#3a4354' : '#aab2c0',
            opacity: step === 0 ? .3 : 1, transition:'.15s',
          }}>
          ◂ Prev
        </button>
        <button onClick={onNext}
          style={{
            fontFamily:'Cinzel, serif', fontSize:11, letterSpacing:'.12em', cursor:'pointer',
            border:'1px solid #5a5440', borderRadius:7, padding:'7px 14px',
            background:'#13110a', color:'#cdb88a', transition:'.15s',
          }}>
          {step === tour.steps.length - 1 ? 'Finish' : 'Next ▸'}
        </button>
        <span style={{ fontFamily:'Cinzel, serif', fontSize:11, color:'#5c6678', marginLeft:'auto' }}>
          {step + 1} / {tour.steps.length}
        </span>
      </div>
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
  const [tourMenuOpen,    setTourMenuOpen]    = useState(false)
  const [activeTour,      setActiveTour]      = useState(null)
  const [tourStep,        setTourStep]        = useState(0)
  const [hintFaded,       setHintFaded]       = useState(false)
  const [wireframesOpen,  setWireframesOpen]  = useState(false)

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

  /* tour step: drive the graph whenever tour/step changes */
  useEffect(() => {
    if (!activeTour || !graphRef.current) return
    const [id] = activeTour.steps[tourStep]
    graphRef.current.setTourLock(false)
    graphRef.current.select(id, true)
    graphRef.current.setTourLock(true)
    if (tourStep > 0) graphRef.current.litEdge(activeTour.steps[tourStep - 1][0], id)
    else              graphRef.current.clearLitEdge()
  }, [activeTour, tourStep])

  /* close tour menu on outside click */
  useEffect(() => {
    if (!tourMenuOpen) return
    function outside() { setTourMenuOpen(false) }
    document.addEventListener('click', outside)
    return () => document.removeEventListener('click', outside)
  }, [tourMenuOpen])

  /* path panel: when it opens, clear selection; when closed, restore */
  function openPath() {
    if (activeTour) endTour()
    setPathOpen(true)
    setSelectedId(null)
    graphRef.current?.clearSelection()
  }
  function closePath() {
    setPathOpen(false)
    graphRef.current?.clearPathHighlight()
  }

  function startTour(tid) {
    const t = TOURS.find(t => t.id === tid)
    if (!t) return
    closePath()
    setActiveTour(t)
    setTourStep(0)
    setTourMenuOpen(false)
    setSelectedId(null)
  }
  function endTour() {
    graphRef.current?.setTourLock(false)
    graphRef.current?.clearLitEdge()
    graphRef.current?.clearSelection()
    graphRef.current?.resetView()
    setActiveTour(null)
    setTourStep(0)
    setSelectedId(null)
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
          <button style={hbtn(!!activeTour)} onClick={e => { e.stopPropagation(); setTourMenuOpen(v => !v) }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'currentColor', opacity:.7 }}/>
            TOURS
          </button>
          <button style={hbtn(pathOpen)} onClick={() => pathOpen ? closePath() : openPath()}>
            PATH
          </button>
          <button style={hbtn(legendOpen)} onClick={() => setLegendOpen(v => !v)}>
            LEGEND
          </button>
          <button
            style={{
              ...S.hbtn,
              borderStyle: 'dashed',
              borderColor: wireframesOpen ? '#5a5440' : '#19202d',
              color: wireframesOpen ? '#cdb88a' : '#3a4354',
              background: wireframesOpen ? '#13110a' : 'transparent',
            }}
            onClick={() => setWireframesOpen(v => !v)}
          >
            WIREFRAMES
          </button>
        </div>
      </header>

      {/* ── main ───────────────────────────────────────────────────── */}
      <main style={{ position:'relative', flex:1, overflow:'hidden' }}>
        <SkyGraph ref={graphRef} onSelect={handleNodeSelect}/>

        {/* floating search (hidden while path panel is open) */}
        {!pathOpen && (
          <SearchBox
            sortedNodes={sortedNodes}
            onPick={id => { graphRef.current?.select(id, true); setHintFaded(true) }}
          />
        )}

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

        {/* tour dropdown */}
        {tourMenuOpen && (
          <div style={{
            position:'absolute', top:54, right:142, zIndex:40, minWidth:248,
            ...S.overlay,
          }} className="pop-in" onClick={e => e.stopPropagation()}>
            {TOURS.map(t => (
              <button key={t.id}
                style={{
                  display:'flex', alignItems:'center', gap:10, width:'100%', textAlign:'left',
                  padding:'10px 12px', background:'none', border:'none', cursor:'pointer',
                  borderRadius:7, fontFamily:"'Crimson Pro', serif", fontSize:15.5, color:'#aab2c0',
                  transition:'.12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#12161f'; e.currentTarget.style.color='#e7ebf2' }}
                onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='#aab2c0' }}
                onClick={() => startTour(t.id)}
              >
                <span style={{ color:'#8c7f5e', fontSize:12 }}>✦</span>
                {t.title}
                <span style={{
                  marginLeft:'auto', fontFamily:'Cinzel, serif', fontSize:10, color:'#3a4354',
                  border:'1px solid #19202d', borderRadius:10, padding:'1px 7px',
                }}>{t.steps.length}</span>
              </button>
            ))}
          </div>
        )}

        {/* active tour bar */}
        {activeTour && (
          <TourBar
            tour={activeTour}
            step={tourStep}
            onPrev={() => setTourStep(s => Math.max(0, s - 1))}
            onNext={() => tourStep < activeTour.steps.length - 1 ? setTourStep(s => s + 1) : endTour()}
            onExit={endTour}
          />
        )}

        {/* legend */}
        {legendOpen && <LegendPanel onClose={() => setLegendOpen(false)}/>}

        {/* detail panel */}
        <DetailPanel
          nodeId={activeTour ? null : selectedId}
          nodeById={nodeById}
          onClose={() => {
            setSelectedId(null)
            graphRef.current?.clearSelection()
          }}
          onNavigate={id => {
            graphRef.current?.select(id, true)
            setSelectedId(id)
          }}
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
            fontFamily:'Cinzel, serif', fontSize:10, letterSpacing:'.14em', color:'#5c6678',
            background:'rgba(9,12,19,.8)', border:'1px solid #19202d', borderRadius:7,
            padding:'7px 12px', cursor:'pointer', transition:'.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color='#cdb88a'; e.currentTarget.style.borderColor='#5a5440' }}
          onMouseLeave={e => { e.currentTarget.style.color='#5c6678'; e.currentTarget.style.borderColor='#19202d' }}
        >
          ⤢ RESET VIEW
        </button>
      </main>

      {/* tooltip anchor (position driven by mousemove in SkyGraph) */}
      <div id="tip"/>

      {/* wireframes overlay */}
      {wireframesOpen && <WireframesPage onClose={() => setWireframesOpen(false)} />}/</div>)}
