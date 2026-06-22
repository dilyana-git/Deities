import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import SkyGraph, { CAT, LCOL } from './components/SkyGraph.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import GuidedSky from './components/GuidedSky.jsx'
import ZodiacSky from './components/ZodiacSky.jsx'
import { nodes as allNodes, links as allLinks } from './data/mythology.js'
import { categoryConfig, categoryOrder } from './data/categoryConfig.js'
import { linkTypeConfig, linkTypeOrder } from './data/linkTypeConfig.js'

/* ── tour data ───────────────────────────────────────────────────────── */
const TOURS = [
  { id: 'titans', title: 'The Fall of the Titans',
    steps: [
      ['chaos',  "In the beginning there was neither earth nor sky nor sea — only Chaos, the vast and yawning dark, the first gap out of which all things would one day be drawn."],
      ['gaia',   "Out of that emptiness rose Gaia, the broad-breasted Earth, the firm ground beneath all that lives. From herself alone, without seed or mate, she brought forth the world's first shapes."],
      ['uranus', "She bore Uranus, the star-strewn Sky, to cover her on every side — and then took her own son as her husband, in the first marriage of all: the wedding of Earth and Heaven."],
      ['cronus', "But Uranus despised the children she bore and crushed them back into the dark of her body. So Gaia forged a jagged sickle, and her youngest, Cronus, unmanned his father and seized the cosmos for his own."],
      ['rhea',   "Warned that his own child would unseat him in turn, Cronus swallowed each baby that Rhea bore — until, grief-stricken, she hid the last away in a Cretan cave and gave her husband a swaddled stone to gulp down instead."],
      ['zeus',   "That hidden child was Zeus. Grown to his strength, he forced his father to disgorge the swallowed gods, and in a ten-year war he cast the Titans down into the bottomless pit of Tartarus."],
    ] },
  { id: 'night', title: 'The Children of Night',
    steps: [
      ['nyx',      "Nyx, the Lady of Night, is among the eldest powers of all — so ancient and so dread that even Zeus, king of the gods, feared to do anything that might cross her."],
      ['erebus',   "With Erebus, the deep primordial darkness, she keeps the unlit places between the worlds; and from those two shadows, strangely, came the shining Day and the bright upper air."],
      ['thanatos', "From her own darkness, needing no father, she bore Thanatos — Death himself, iron-hearted and pitiless, who carries the breathless across the last threshold and takes no offering to be turned aside."],
      ['hypnos',   "And she bore his gentler twin, Hypnos — Sleep, who walks the world on silent feet and can lay even the king of the gods to rest, for nothing under heaven may refuse him forever."],
      ['nemesis',  "She bore Nemesis too, the cold measure of the universe, who watches the proud and brings down the weight that balances every fortune swollen past its rightful due."],
      ['eris',     "And Eris, Strife, the mother of quarrel and ruin — whose single golden apple, tossed unbidden among the goddesses, would one day set the whole world to war beneath the walls of Troy."],
    ] },
  { id: 'gorgon', title: 'Perseus & the Gorgon',
    steps: [
      ['poseidon',  "It began with a violation: Poseidon, lord of the sea, took the lovely maiden Medusa by force within the sacred walls of Athena's own temple."],
      ['medusa',    "Unable to strike at a god, Athena turned her wrath upon the girl instead — and Medusa's glorious hair became a nest of hissing serpents, her gaze a thing that froze every living man to stone."],
      ['athena',    "Yet the same goddess who made the monster would arm the hero to end her. Athena lent Perseus her mirror-bright shield, that he might look upon Medusa and still live."],
      ['perseus',   "Watching only her reflection in the polished bronze, Perseus crept upon the sleeping Gorgon and struck off her head — and from the severed neck leapt the winged horse Pegasus, beauty born of blood."],
      ['andromeda', "With that same terrible head he turned a rising sea-beast to stone and freed Andromeda from her chains — becoming one of the very few heroes ever to win a happy ending."],
    ] },
  { id: 'odyssey', title: 'The Long Way Home',
    steps: [
      ['odysseus',  "Odysseus, cleverest of the Greeks, broke ten-walled Troy with the trick of the wooden horse — and then turned for home, where the wide sea would turn ten more years against him."],
      ['poseidon',  "For he had blinded the Cyclops Polyphemus, a son of Poseidon; and the sea-god swore in his fury that the wanderer would not look upon his island of Ithaca for a weary age."],
      ['circe',     "On the green isle of Aiaia the enchantress Circe touched his crew with her wand and made them swine — then, her magic broken against him, took the hero as her lover and kept him a year in her hall."],
      ['scylla',    "In the narrow strait he passed six-mouthed Scylla, who reached down from her cliff and snatched six screaming men from the deck before he could so much as draw his sword."],
      ['charybdis', "Across the same water her sister Charybdis swallowed the whole sea and spat it roaring back; between the two terrors there was no safe passage, and he threaded the deadly gap by a hair."],
      ['helios',    "Marooned and starving, his men slaughtered the forbidden cattle of the Sun — and Helios, who sees all that is done beneath the light, swore that not one of them would ever come home."],
      ['calypso',   "Wrecked and alone, the last of all his fleet, he was held seven long years by the nymph Calypso, who loved him and offered him a deathless, ageless life — which, weeping for home, he refused."],
      ['athena',    "Through every trial it was grey-eyed Athena, his unwavering champion, who watched over him — and won the wanderer, at the very last, his long-denied return to Ithaca."],
    ] },

  { id: 'theseus', title: 'Theseus & the Labyrinth',
    steps: [
      ['poseidon', "Poseidon — whom some name the true father of Theseus — sent a magnificent white bull rising from the waves to Crete, a gift that proud King Minos could not bring himself to give back."],
      ['minotaur', "In punishment the queen of Crete was cursed to bear the Minotaur: a man with a bull's head and a beast's hunger, shut away in the winding Labyrinth and fed on youths sent in tribute."],
      ['ariadne',  "When Theseus came among the tribute, the princess Ariadne fell in love at the sight of him, and slipped into his hand a single ball of thread to unwind behind him through the maze."],
      ['theseus',  "He killed the beast at the heart of the Labyrinth and followed the thread back to the light — then sailed away and left Ariadne sleeping on the shore of Naxos, his triumph shadowed by betrayal."],
    ] },

  { id: 'argonautica', title: 'Jason & the Golden Fleece',
    steps: [
      ['hera',            "Hera, who loathed the usurper King Pelias, set young Jason upon an errand meant to destroy him: to sail to the world's end and carry home the Golden Fleece."],
      ['jason',           "He gathered the greatest heroes of the age aboard the ship Argo and sailed east into the unknown, all the way to far Colchis, where the Fleece hung guarded in a sacred grove."],
      ['medea',           "There the sorceress Medea, struck with sudden and helpless love, betrayed her own father to save him — giving everything for a man who would one day cast her aside, to his utter ruin."],
      ['colchian_dragon', "By her drugs and her whispered charms she lulled the sleepless dragon coiled about the Fleece into its first and only slumber, and the prize was lifted from the tree at last."],
    ] },

  { id: 'labours', title: 'The Labours of Heracles',
    steps: [
      ['heracles',       "Driven to madness by the hatred of Hera, Heracles killed his own wife and children with his bare hands — and to purge that horror he was bound to twelve impossible labours."],
      ['nemean_lion',    "First he strangled the Nemean Lion, whose golden hide turned aside every blade; finding no weapon could pierce it, he skinned the beast with its own claws and wore the pelt as armour ever after."],
      ['lernaean_hydra', "He faced the Lernaean Hydra, which sprouted two heads for every one he struck away — and overcame it only by searing each raw stump with fire before it could grow anew."],
      ['geryon',         "At the far western edge of the world he slew the three-bodied giant Geryon, killed the hound that guarded him, and drove the great herd of red cattle all the long way home."],
      ['ladon',          "He took the golden apples of the Hesperides from the coils of Ladon, the hundred-headed serpent that never once closed all its eyes in sleep."],
      ['cerberus',       "And for the last and hardest labour, he went down living into the land of the dead and dragged its three-headed guardian, Cerberus, up into the light of day."],
    ] },

  { id: 'metamorphoses', title: 'Bodies Changed',
    steps: [
      ['daphne',   "Fleeing the god Apollo through the woods, the nymph Daphne begged the earth to take from her the beauty that doomed her — and felt bark close over her heart as she became the laurel tree."],
      ['io',       "Io, loved by Zeus and hidden in the shape of a white heifer, was given no rest by jealous Hera, who set a single stinging fly to drive her wandering across the whole width of the world."],
      ['callisto', "Callisto, seduced by Zeus and then turned into a shaggy bear, was almost killed by her own hunting son — until Zeus caught them both up and set them among the stars as the Bears."],
      ['arachne',  "Arachne wove the cruelties of the gods so flawlessly that Athena, unable to fault the work, struck her down — and where she hanged herself, shrank her into the first spider, to spin forever."],
      ['medusa',   "Medusa, punished for a violation that was never her fault, wore serpents for hair and carried stone in her gaze, exiled to the world's edge among the statues of the men who had looked on her."],
      ['scylla',   "And Scylla, a sea-nymph poisoned by a rival's envy, watched in horror as a ring of baying dogs burst howling from her waist — and became the six-mouthed terror that haunts the strait."],
    ] },
  { id: 'brood', title: 'The Brood of Typhon',
    steps: [
      ['typhon',         "Typhon, storm-born and crowned with a hundred serpent heads, was the last and most terrible child of Gaia — a monster so vast that he rose to challenge Zeus for the throne of heaven itself."],
      ['echidna',        "With Echidna, half-lovely-woman and half-monstrous-serpent, he sired in a deep cave the whole brood of horrors that the heroes of later ages would be born to hunt and to kill."],
      ['cerberus',       "From them came Cerberus, the three-headed hound, set to guard the one gate of the underworld — fawning upon the dead who enter, and tearing apart any who dare to leave."],
      ['lernaean_hydra', "And the Lernaean Hydra of the black marsh, which answered every severed head by sprouting two more in its place, until at last it was burned into stillness."],
      ['chimera',        "And the Chimera, an impossible beast of three natures — lion, goat, and serpent — that breathed living fire from a single throat across the fields of Lycia."],
      ['sphinx',         "And the Sphinx, lion-bodied and winged, who crouched before Thebes and strangled every traveller who could not answer the deadly riddle she set."],
    ] },

  { id: 'phorcys', title: 'The House of Phorcys & Ceto',
    steps: [
      ['pontus',  "Pontus, the primal Sea, was born of Earth alone before there was any sailor to cross him — the salt deep in person, the oldest face of the ocean."],
      ['phorcys', "His son Phorcys, grey god of the sea's hidden dangers — the unseen reef, the whirlpool, the dark unfathomed deep — took his own sister Ceto to wife."],
      ['ceto',    "Ceto, the mother of sea-terrors whose very name became the word for monster, bore him a long lineage of horrors gathered at the edge of the world."],
      ['graeae',  "First the Grey Sisters, born already old and withered, who share a single eye and a single tooth between them, passed from hand to groping hand."],
      ['gorgons', "Then the Gorgons, serpent-haired and stone-gazing — and among the three immortal sisters, one alone who could die: ill-fated Medusa."],
      ['ladon',   "And Ladon, the hundred-headed serpent that never slept, coiled forever about the tree of golden apples at the sunset rim of the world."],
    ] },
  { id: 'ovid', title: 'Tales from Ovid',
    steps: [
      ['daphne',         "Daphne, fleeing Apollo's pursuit, chose to lose herself rather than be caught — and as the god's hands closed upon her, her body stiffened into the first laurel tree."],
      ['actaeon',        "Actaeon, a hunter who by sheer ill chance glimpsed the goddess Artemis bathing, was turned into a stag for the trespass — and run down and torn apart by his own faithful hounds."],
      ['narcissus',      "Narcissus, so cold that he scorned every lover, was punished by Nemesis to fall hopelessly in love with his own reflection, and wasted away by the pool into the flower that bears his name."],
      ['echo',           "Echo, the nymph cursed to do nothing but repeat the last words of others, loved him in vain — and faded in her grief until nothing was left of her at all but a voice."],
      ['arachne',        "Arachne, who out-wove Athena herself and dared to picture the cruelties of the gods, was struck down for the truth of it and shrunk into the first spider, condemned to spin forever."],
      ['tiresias',       "Tiresias, who lived seven years as a woman before returning to a man, settled a quarrel of the gods with his answer — and was blinded by Hera for it, then given prophecy by Zeus in recompense."],
      ['adonis',         "Adonis, a youth so beautiful that two goddesses warred over him, was gored on a wild boar's tusk and died in Aphrodite's arms — and from his blood she raised the wind-scattered anemone."],
      ['hermaphroditus', "Hermaphroditus, seized in the still water by the desperate nymph Salmacis, was fused with her by the gods into a single body, both man and woman and wholly neither."],
    ] },
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
  const [storyOpen,       setStoryOpen]       = useState(false)
  const [storyTourId,     setStoryTourId]     = useState(null)
  const [zodiacOpen,      setZodiacOpen]      = useState(false)

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

  /* tour step: drive the graph whenever tour/step changes */
  useEffect(() => {
    if (!activeTour || !graphRef.current) return
    const [id] = activeTour.steps[tourStep]
    graphRef.current.setTourLock(false)
    graphRef.current.select(id, true, { tour: true })
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
    graphRef.current?.resetView()   // enter path mode at the opening overview
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

  /* ── Guided Sky (cinematic story mode) ──────────────────────────── */
  function openStory() {
    const tid = activeTour?.id ?? null
    if (activeTour) endTour()
    if (pathOpen) closePath()
    setTourMenuOpen(false)
    prevBeatFigRef.current = null
    setStoryTourId(tid)
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
          <button style={hbtn(!!activeTour)} onClick={e => {
            e.stopPropagation()
            if (!tourMenuOpen) {            // opening the menu → reset to the overview
              setSelectedId(null)
              graphRef.current?.clearSelection()
              graphRef.current?.resetView()
            }
            setTourMenuOpen(v => !v)
          }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'currentColor', opacity:.7 }}/>
            TOURS
          </button>
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
            graphRef.current?.resetView()   // return to the opening overview
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

      {/* guided sky — cinematic story overlay */}
      {storyOpen && (
        <GuidedSky
          initialTourId={storyTourId}
          onClose={closeStory}
          onBeatChange={handleStoryBeat}
        />
      )}

      {/* zodiac sky — standalone cinematic zodiac view */}
      {zodiacOpen && <ZodiacSky onClose={() => setZodiacOpen(false)} />}
    </div>
  )
}