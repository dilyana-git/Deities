import { nodes } from './mythology.js'

/* ── Guided Sky constellation specs ──────────────────────────────────────
   Each deity is an abstract constellation — a set of connected star-nodes
   that draws itself in, twinkles, and carries a signature looping motion.
   Coordinate space is the viewBox -100..100 (centred on 0,0).

   spec: m = motion key · b = bright node indices · n = node [x,y] coords ·
   e = edges as index pairs · optional beam (for 'tip') / tendril (for
   'writhe') node-index groups. */
export const CONSTELLATIONS = {
  /* ── Titans: a cosmogony that grows. Chaos is one lonely star in the void;
     each chapter gains structure, climaxing in Zeus's thunderbolt. `hero` marks
     the single focal star (rendered largest + gold-tinged). ── */
  chaos: { m:'breathe', hero:0, b:[0],
    n:[[0,-2],[-66,-38],[60,-44],[42,52]],
    e:[] },
  gaia: { m:'breathe', hero:2, b:[2],
    n:[[-66,20],[-34,4],[0,-6],[34,4],[66,20]],
    e:[[0,1],[1,2],[2,3],[3,4]] },
  uranus: { m:'drift', hero:6, b:[6],
    n:[[-80,30],[-54,4],[-22,-14],[16,-14],[52,4],[80,30],[-2,-36]],
    e:[[0,1],[1,2],[2,6],[6,3],[3,4],[4,5]] },
  cronus: { m:'sweep', hero:6, b:[6],
    n:[[-44,52],[-50,28],[-46,2],[-30,-24],[-2,-40],[30,-40],[54,-26]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
  rhea: { m:'cradle', hero:7, b:[7],
    n:[[-54,-18],[-58,10],[-44,34],[-14,50],[20,52],[48,40],[58,16],[2,22]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[3,7],[7,4]] },
  zeus: { m:'flash', hero:6, b:[6,0,5],
    n:[[-34,-64],[-6,-30],[-24,-12],[8,16],[-8,34],[22,62],[0,0],[-48,-26],[42,28]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,7],[3,8]] },

  /* ── Children of Night ── (hero = the single focal star of each figure) */
  nyx: { m:'breathe', hero:0, b:[0],
    n:[[0,-32],[-30,-24],[-58,-4],[-78,24],[30,-24],[58,-4],[78,24]],
    e:[[0,1],[1,2],[2,3],[0,4],[4,5],[5,6]] },
  erebus: { m:'drift', hero:6, b:[6],
    n:[[-66,-30],[-22,-34],[22,-34],[66,-30],[-30,2],[30,2],[0,38]],
    e:[[0,4],[1,4],[2,5],[3,5],[4,6],[5,6]] },
  thanatos: { m:'drift', hero:5, b:[5],
    n:[[-50,-40],[0,-50],[50,-40],[-25,-6],[25,-6],[0,20],[0,56]],
    e:[[1,0],[1,2],[0,3],[2,4],[3,5],[4,5],[5,6]] },
  hypnos: { m:'undulate', hero:3, b:[3],
    n:[[-76,0],[-50,-22],[-22,0],[6,22],[32,0],[58,-22],[78,0]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
  nemesis: { m:'tip', hero:0, b:[0], beam:[1,2,3,4,5,6],
    n:[[0,-30],[-55,-30],[55,-30],[-72,6],[-38,6],[38,6],[72,6],[0,42]],
    e:[[1,0],[0,2],[1,3],[1,4],[3,4],[2,5],[2,6],[5,6],[0,7]] },
  eris: { m:'pulse', hero:0, b:[0],
    n:[[0,0],[0,-56],[42,-30],[52,16],[20,50],[-26,48],[-52,12],[-40,-34]],
    e:[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]] },

  /* ── Perseus & the Gorgon ── */
  poseidon: { m:'rock', hero:1, b:[1],
    n:[[-35,-50],[0,-58],[35,-50],[-30,-22],[0,-24],[30,-22],[-35,-22],[35,-22],[0,56]],
    e:[[0,3],[1,4],[2,5],[6,7],[4,8]] },
  medusa: { m:'writhe', hero:0, b:[0], tendril:[5,6,7,8,9,10,11,12,13,14],
    n:[[0,-22],[20,-8],[12,16],[-12,16],[-20,-8],
       [0,-45],[40,-18],[26,40],[-26,40],[-40,-18],
       [8,-62],[58,-10],[36,58],[-36,58],[-58,-10]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,0],
       [0,5],[5,10],[1,6],[6,11],[2,7],[7,12],[3,8],[8,13],[4,9],[9,14]] },
  athena: { m:'rock', hero:4, b:[4,2,3],
    n:[[-30,-56],[30,-56],[-22,-30],[22,-30],[0,-14],[-36,10],[36,10],[0,46]],
    e:[[0,2],[1,3],[2,4],[3,4],[2,5],[3,6],[5,7],[6,7],[4,7]] },
  perseus: { m:'glint', hero:0, b:[0,5],
    n:[[0,-55],[0,-32],[-26,-30],[26,-30],[44,-50],[52,-80],[0,-8],[-22,42],[22,42]],
    e:[[0,1],[1,2],[1,3],[3,4],[4,5],[1,6],[6,7],[6,8]] },
  andromeda: { m:'shimmer', hero:2, b:[2],
    n:[[-62,-28],[-32,-14],[0,-4],[30,6],[58,18],[-14,24],[22,28]],
    e:[[0,1],[1,2],[2,3],[3,4],[2,5],[3,6]] },

  /* ── Olympians & their emblems ── (the most-referenced figures across the
     story beats, each given a signature emblem-silhouette) */
  hera: { m:'breathe', hero:6, b:[6,2],                       // a queen's diadem
    n:[[-60,20],[-30,24],[0,26],[30,24],[60,20],[-30,-6],[0,-26],[30,-6]],
    e:[[0,1],[1,2],[2,3],[3,4],[1,5],[2,6],[3,7]] },
  apollo: { m:'shimmer', hero:0, b:[0],                       // the lyre (Lyra)
    n:[[0,-50],[-18,-20],[18,-24],[-26,20],[18,16]],
    e:[[0,1],[0,2],[1,2],[2,4],[4,3],[3,1]] },
  aphrodite: { m:'pulse', hero:0, b:[0],                      // the mirror of Venus ♀
    n:[[0,-46],[24,-22],[0,2],[-24,-22],[0,30],[-18,16],[18,16]],
    e:[[0,1],[1,2],[2,3],[3,0],[2,4],[5,6]] },
  hermes: { m:'drift', hero:1, b:[1],                         // the winged caduceus
    n:[[0,60],[0,-40],[-26,-50],[26,-50],[16,28],[-12,4],[16,-22],[-16,28],[12,4],[-16,-22]],
    e:[[0,1],[1,2],[1,3],[4,5],[5,6],[7,8],[8,9]] },
  hades: { m:'drift', hero:5, b:[3,4,5],                      // the two-pronged bident
    n:[[0,60],[0,10],[0,-20],[-22,-54],[22,-54],[0,-50],[-16,-16],[16,-16]],
    e:[[0,1],[1,2],[2,3],[2,4],[2,5],[6,7]] },
  persephone: { m:'cradle', hero:2, b:[3,4,5,6,7],            // a blossom on its stem
    n:[[0,60],[0,16],[0,-2],[0,-32],[28,-10],[17,26],[-17,26],[-28,-10],[-22,34],[20,36]],
    e:[[0,1],[1,2],[2,3],[2,4],[2,5],[2,6],[2,7],[0,8],[0,9]] },

  /* ── Heroes & their attributes ── */
  heracles: { m:'rock', hero:0, b:[0,5],                      // the strongman + raised club
    n:[[0,-54],[-26,-30],[26,-30],[-22,2],[22,2],[54,-44],[-30,40],[30,40]],
    e:[[0,1],[0,2],[1,2],[1,3],[2,4],[3,4],[2,5],[3,6],[4,7]] },
  odysseus: { m:'drift', hero:6, b:[2,6],                     // the great bow + nocked arrow
    n:[[-30,-60],[-50,-30],[-56,0],[-50,30],[-30,60],[-40,0],[40,0],[24,-8],[24,8]],
    e:[[0,1],[1,2],[2,3],[3,4],[0,4],[5,6],[6,7],[6,8]] },
  jason: { m:'rock', hero:5, b:[5],                           // the ship Argo
    n:[[-54,28],[-24,44],[22,44],[54,28],[0,44],[0,-52],[42,-6]],
    e:[[0,1],[1,2],[2,3],[4,5],[5,6],[6,4]] },
  daedalus: { m:'drift', hero:0, b:[0,9],                     // the labyrinth, a square spiral
    n:[[0,0],[16,0],[16,16],[-16,16],[-16,-16],[32,-16],[32,32],[-32,32],[-32,-32],[48,-32]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9]] },
  prometheus: { m:'flash', hero:6, b:[6,4,5],                 // the stolen flame, a torch
    n:[[0,62],[0,18],[-16,-6],[14,-8],[-8,-40],[10,-38],[0,-62]],
    e:[[0,1],[1,2],[1,3],[2,4],[3,5],[4,6],[5,6],[2,3]] },

  /* ── Titans, sea powers & monsters ── */
  helios: { m:'breathe', hero:3, b:[3,6],                     // the sun rising over the horizon
    n:[[-66,30],[0,32],[66,30],[0,8],[-44,-14],[-22,-30],[0,-40],[22,-30],[44,-14]],
    e:[[0,1],[1,2],[1,3],[3,4],[3,5],[3,6],[3,7],[3,8]] },
  oceanus: { m:'undulate', hero:3, b:[3],                     // the world-encircling river
    n:[[-80,-4],[-54,12],[-28,-6],[0,10],[28,-8],[54,8],[78,-12],[78,18]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[5,7]] },
  phorcys: { m:'undulate', hero:0, b:[0],                     // a sea-creature of the deep
    n:[[-50,-6],[-30,-18],[0,-20],[28,-12],[-30,16],[0,18],[28,12],[54,-20],[54,16]],
    e:[[0,1],[1,2],[2,3],[0,4],[4,5],[5,6],[3,7],[6,8],[7,8]] },
  typhon: { m:'writhe', hero:0, b:[0], tendril:[2,4,6,8,10,11,12],   // the hundred-headed storm
    n:[[0,10],[-30,-20],[-50,-48],[0,-32],[2,-66],[30,-20],[52,-46],[-46,18],[-74,30],[46,18],[72,28],[-20,46],[22,46]],
    e:[[0,1],[1,2],[0,3],[3,4],[0,5],[5,6],[0,7],[7,8],[0,9],[9,10],[0,11],[0,12]] },
  echidna: { m:'writhe', hero:0, b:[0], tendril:[1,2,3,4,5,6,7,8,9], // the coiled serpent-mother
    n:[[-40,-44],[-10,-50],[24,-34],[36,0],[20,30],[-12,36],[-34,14],[-20,-8],[8,-2],[12,18]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9]] },
}

/* ── deterministic fallback for figures without a hand-authored spec ──── */
const MOTIONS = ['breathe', 'drift', 'rock', 'cradle', 'pulse', 'shimmer', 'undulate']

function hashStr(s) {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return h >>> 0
}

function mulberry32(seed) {
  return function () {
    seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* Rather than one shape for everyone, a seeded hash picks among several
   constellation *silhouettes*, then jitters the chosen template — so every
   un-authored figure reads as a visibly distinct star pattern, not the same
   wheel. Each builder takes the seeded rng and returns { n, e, hero, b };
   coords live in the same -100..100 viewBox as the hand-authored specs. */
const R = v => Math.round(v)

// a meandering vertical zig-zag — a river of stars
function shChain(rnd) {
  const count = 5 + Math.floor(rnd() * 3)
  const n = [], e = []
  const step = 160 / (count - 1)
  for (let i = 0; i < count; i++) {
    const x = (i % 2 ? 1 : -1) * (18 + rnd() * 42)
    n.push([R(x), R(-80 + step * i)])
    if (i) e.push([i - 1, i])
  }
  return { n, e, hero: count >> 1, b: [0, count - 1] }
}

// a chevron / arrowhead: two arms diverging from a bright apex
function shChevron(rnd) {
  const arm = 2 + Math.floor(rnd() * 2)
  const spread = 26 + rnd() * 16
  const step = 36 + rnd() * 12
  const n = [[0, -72]], e = []
  for (const side of [-1, 1]) {
    let prev = 0
    for (let i = 1; i <= arm; i++) {
      n.push([R(side * spread * i), R(-72 + step * i)])
      e.push([prev, n.length - 1]); prev = n.length - 1
    }
  }
  return { n, e, hero: 0, b: [0] }
}

// a northern cross: a long spine crossed by a bar
function shCross(rnd) {
  const len = 70 + rnd() * 14
  const arm = 36 + rnd() * 14
  const cy = R(-len * 0.15)
  const n = [[0, R(-len)], [0, cy], [0, R(len * 0.45)], [0, R(len)],
            [R(-arm), cy + 6], [R(arm), cy + 6]]
  const e = [[0, 1], [1, 2], [2, 3], [4, 1], [1, 5]]
  return { n, e, hero: 1, b: [0, 3] }
}

// a loose scattered cluster threaded by nearest-neighbour links
function shCluster(rnd) {
  const count = 5 + Math.floor(rnd() * 3)
  const n = []
  for (let i = 0; i < count; i++) n.push([R((rnd() - 0.5) * 160), R((rnd() - 0.5) * 150)])
  const e = []
  for (let i = 1; i < count; i++) {
    let best = 0, bd = Infinity
    for (let j = 0; j < i; j++) {
      const dx = n[i][0] - n[j][0], dy = n[i][1] - n[j][1], d = dx * dx + dy * dy
      if (d < bd) { bd = d; best = j }
    }
    e.push([best, i])
  }
  return { n, e, hero: 0, b: [0, count - 1] }
}

// a kite/diamond trailing a comet-like tail
function shKite(rnd) {
  const w = 32 + rnd() * 16, h = 36 + rnd() * 12
  const n = [[0, -74], [R(-w), R(-74 + h)], [0, R(-74 + 2 * h)], [R(w), R(-74 + h)]]
  const e = [[0, 1], [1, 2], [2, 3], [3, 0]]
  let prev = 2, y = -74 + 2 * h
  const tail = 2 + Math.floor(rnd() * 2)
  for (let i = 0; i < tail; i++) {
    y = Math.min(y + 26 + rnd() * 10, 88)
    n.push([R((rnd() - 0.5) * 26), R(y)])
    e.push([prev, n.length - 1]); prev = n.length - 1
  }
  return { n, e, hero: 0, b: [2] }
}

// a smooth crown/arc rising in the middle (Corona Borealis)
function shArc(rnd) {
  const count = 5 + Math.floor(rnd() * 3)
  const w = 70, rise = 38 + rnd() * 22
  const n = [], e = []
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    n.push([R(-w + 2 * w * t), R(-rise * Math.sin(Math.PI * t) + rise * 0.4)])
    if (i) e.push([i - 1, i])
  }
  return { n, e, hero: count >> 1, b: [0, count - 1] }
}

// a fan/sheaf of stalks radiating up from a single base star
function shFan(rnd) {
  const count = 4 + Math.floor(rnd() * 3)
  const spread = Math.PI * (0.5 + rnd() * 0.32)
  const len = 76 + rnd() * 16
  const n = [[0, 62]], e = []
  for (let i = 0; i < count; i++) {
    const a = -Math.PI / 2 + (i / (count - 1) - 0.5) * spread
    n.push([R(Math.cos(a) * len), R(Math.sin(a) * len + 50)])
    e.push([0, n.length - 1])
  }
  return { n, e, hero: 0, b: [0] }
}

/* rotate + scale every node by a seeded amount, then keep it inside the
   viewBox. Because each silhouette has an orientation, this is what makes two
   same-family figures read differently — a tilted cross vs an upright one. */
function rotateScale(nodes, ang, k, flip = 1) {
  const ca = Math.cos(ang), sa = Math.sin(ang)
  let m = 0
  const out = nodes.map(([x, y]) => {
    const fx = x * flip
    const rx = (fx * ca - y * sa) * k, ry = (fx * sa + y * ca) * k
    m = Math.max(m, Math.abs(rx), Math.abs(ry))
    return [rx, ry]
  })
  const f = m > 94 ? 94 / m : 1
  return out.map(([x, y]) => [R(x * f), R(y * f)])
}

/* TODO(you): author one more silhouette — your pick of a real constellation
   shape (a "W" like Cassiopeia, a dipper, an Orion's-belt row…). Same contract
   as the builders above: take `rnd` (a seeded 0..1 generator), return
   { n:[[x,y]…], e:[[a,b]…], hero:<idx>, b:[<bright idxs>] }, coords in -100..100.
   While it returns null it simply stays out of the rotation. */
function shCustom(rnd) {
  return null  // ← replace null with your shape, e.g. return { n, e, hero, b }
}

// note: no hub-and-ring "wheel" — it is rotationally symmetric, so two of them
// always look alike. Every family here has an orientation that rotateScale varies.
const SHAPES = [shChain, shChevron, shCross, shCluster, shKite, shArc, shFan]
if (shCustom(mulberry32(1)) != null) SHAPES.push(shCustom)

/* A stable index per known figure, so distinct figures are *spread* across the
   shape space rather than left to hash luck (which produced look-alike pairs
   like cerberus/lernaean_hydra). Index drives the family + a golden-angle tilt;
   the per-figure hash still drives internal node count and jitter. */
const NODE_IDX = {}
nodes.forEach((n, i) => { NODE_IDX[n.id] = i })
const TAU = Math.PI * 2
const PHI = 0.6180339887498949   // golden ratio — low-discrepancy rotation spread

function generateSpec(fig) {
  const rnd = mulberry32(hashStr(fig))
  const idx = NODE_IDX[fig]
  if (idx != null) {
    // (family, cycle) = (idx % F, idx / F) is injective, so distinct figures
    // always differ in family OR cycle. Family picks the silhouette; cycle picks
    // a golden-spread rotation + mirror — guaranteeing same-family figures still
    // diverge (this is what separates leto/ceto, ladon/callisto, etc.).
    const cycle = Math.floor(idx / SHAPES.length)
    const shape = SHAPES[idx % SHAPES.length](rnd)
    const ang = ((cycle * PHI) % 1) * TAU - Math.PI
    const flip = cycle % 2 ? -1 : 1
    shape.n = rotateScale(shape.n, ang, 0.82 + ((idx * 0.37) % 1) * 0.18, flip)
    return { m: MOTIONS[idx % MOTIONS.length], hero: 0, b: [0], ...shape }
  }
  // per-beat keys (figure-less beats) — already unique within their own panel
  const shape = SHAPES[Math.floor(rnd() * SHAPES.length)](rnd)
  shape.n = rotateScale(shape.n, (rnd() - 0.5) * 1.4, 0.86 + rnd() * 0.14)
  return { m: MOTIONS[Math.floor(rnd() * MOTIONS.length)], hero: 0, b: [0], ...shape }
}

export function getConstellation(fig) {
  return CONSTELLATIONS[fig] || generateSpec(fig)
}
