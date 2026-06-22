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

/* hub-and-ring shape: a bright centre node radiating spokes to a ring of
   outer nodes, sized and angled by a hash of the figure's id so every
   un-authored figure still reads as a distinct constellation */
function generateSpec(fig) {
  const rnd = mulberry32(hashStr(fig))
  const count = 6 + Math.floor(rnd() * 3)
  const n = [[0, 0]]
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (rnd() - 0.5) * 0.5
    const radius = 48 + rnd() * 34
    n.push([Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius)])
  }
  const e = []
  for (let i = 1; i <= count; i++) e.push([0, i])
  for (let i = 1; i < count; i++) e.push([i, i + 1])
  e.push([count, 1])
  return { m: MOTIONS[Math.floor(rnd() * MOTIONS.length)], b: [0], n, e }
}

export function getConstellation(fig) {
  return CONSTELLATIONS[fig] || generateSpec(fig)
}
