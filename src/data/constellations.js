/* ── Guided Sky constellation specs ──────────────────────────────────────
   Each deity is an abstract constellation — a set of connected star-nodes
   that draws itself in, twinkles, and carries a signature looping motion.
   Coordinate space is the viewBox -100..100 (centred on 0,0).

   spec: m = motion key · b = bright node indices · n = node [x,y] coords ·
   e = edges as index pairs · optional beam (for 'tip') / tendril (for
   'writhe') node-index groups. */
export const CONSTELLATIONS = {
  /* ── Titans ── */
  chaos: { m:'swirl', b:[8],
    n:[[-60,-30],[-22,-56],[20,-42],[56,-20],[42,26],[10,56],[-32,46],[-56,14],[0,0],[-34,-6],[32,-4]],
    e:[[0,9],[9,1],[1,2],[2,10],[10,3],[3,4],[4,5],[5,6],[6,7],[7,0],[8,9],[8,10],[8,2]] },
  gaia: { m:'breathe', b:[3],
    n:[[-72,40],[-46,8],[-16,-14],[18,-16],[46,6],[72,38],[0,-2]],
    e:[[0,1],[1,2],[2,6],[6,3],[3,4],[4,5],[0,5]] },
  uranus: { m:'drift', b:[2,3],
    n:[[-82,22],[-50,0],[-16,-13],[20,-13],[52,2],[82,24],[-30,-44],[34,-40],[2,-54]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,8],[8,3],[6,8],[8,7]] },
  cronus: { m:'sweep', b:[3],
    n:[[-52,30],[-56,0],[-40,-30],[-10,-48],[26,-50],[52,-38],[-50,30],[-60,52]],
    e:[[1,2],[2,3],[3,4],[4,5],[1,0],[0,7]] },
  rhea: { m:'cradle', b:[7],
    n:[[42,-46],[6,-54],[-30,-40],[-52,-8],[-50,30],[-30,54],[6,62],[8,2]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
  zeus: { m:'flash', b:[0,5],
    n:[[-30,-56],[6,-22],[-16,-10],[22,18],[-4,30],[32,58]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5]] },

  /* ── Children of Night ── */
  nyx: { m:'breathe', b:[],
    n:[[-76,-18],[-40,-36],[0,-42],[40,-34],[74,-16],[60,22],[30,46],[-30,48],[-62,22]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0]] },
  erebus: { m:'drift', b:[9],
    n:[[-60,-46],[-20,-46],[20,-46],[60,-46],[-34,-10],[0,-8],[34,-10],[-12,28],[12,28],[0,58]],
    e:[[0,4],[1,4],[1,5],[2,5],[2,6],[3,6],[4,7],[5,7],[5,8],[6,8],[7,9],[8,9]] },
  thanatos: { m:'drift', b:[6],
    n:[[-50,-40],[0,-50],[50,-40],[-25,-6],[25,-6],[0,20],[0,56]],
    e:[[1,0],[1,2],[0,3],[2,4],[3,5],[4,5],[5,6]] },
  hypnos: { m:'undulate', b:[],
    n:[[-76,0],[-50,-22],[-22,0],[6,22],[32,0],[58,-22],[78,0]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
  nemesis: { m:'tip', b:[0], beam:[1,2,3,4,5,6],
    n:[[0,-30],[-55,-30],[55,-30],[-72,6],[-38,6],[38,6],[72,6],[0,42]],
    e:[[1,0],[0,2],[1,3],[1,4],[3,4],[2,5],[2,6],[5,6],[0,7]] },
  eris: { m:'pulse', b:[0],
    n:[[0,0],[0,-56],[42,-30],[52,16],[20,50],[-26,48],[-52,12],[-40,-34]],
    e:[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]] },

  /* ── Perseus & the Gorgon ── */
  poseidon: { m:'rock', b:[1],
    n:[[-35,-50],[0,-58],[35,-50],[-30,-22],[0,-24],[30,-22],[-35,-22],[35,-22],[0,56]],
    e:[[0,3],[1,4],[2,5],[6,7],[4,8]] },
  medusa: { m:'writhe', b:[0], tendril:[5,6,7,8,9,10,11,12,13,14],
    n:[[0,-22],[20,-8],[12,16],[-12,16],[-20,-8],
       [0,-45],[40,-18],[26,40],[-26,40],[-40,-18],
       [8,-62],[58,-10],[36,58],[-36,58],[-58,-10]],
    e:[[0,1],[1,2],[2,3],[3,4],[4,0],
       [0,5],[5,10],[1,6],[6,11],[2,7],[7,12],[3,8],[8,13],[4,9],[9,14]] },
  athena: { m:'rock', b:[2,3],
    n:[[-30,-56],[30,-56],[-22,-30],[22,-30],[0,-14],[-36,10],[36,10],[0,46]],
    e:[[0,2],[1,3],[2,4],[3,4],[2,5],[3,6],[5,7],[6,7],[4,7]] },
  perseus: { m:'glint', b:[0,5],
    n:[[0,-55],[0,-32],[-26,-30],[26,-30],[44,-50],[52,-80],[0,-8],[-22,42],[22,42]],
    e:[[0,1],[1,2],[1,3],[3,4],[4,5],[1,6],[6,7],[6,8]] },
  andromeda: { m:'shimmer', b:[2],
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
