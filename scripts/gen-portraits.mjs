/*
 * gen-portraits.mjs — generate right-sized webp portrait tiers.
 *
 * Produces two variants per deity id, matching the naming convention that
 * portraitSources() in SkyGraph.jsx already resolves:
 *
 *   {id}-head.webp  — a HEAD CROP, for the graph nodes + StoryOrbit
 *   {id}-full.webp  — the whole figure, for the DetailPanel hero
 *
 * The head tier is a crop, not just a downscale: a node glyph is ~40px across,
 * and a whole standing figure shrunk into that is an unreadable speck. Framing
 * comes from head-boxes.json where a figure has been framed by hand, and from
 * a subject-detection fallback otherwise (see headBox).
 *
 * webp is preferred over png/jpg by the fallback chain, so these win with no
 * code change. Source PNGs are left untouched (kept as backup). Nothing is
 * ever enlarged past its source resolution.
 *
 * Each id's source is read into a buffer BEFORE any output is written, so a
 * tier can never cannibalise a same-named file it's about to overwrite. The
 * source is always the highest-resolution file available for that id (across
 * /portraits and the legacy /portraits/_gen tier), so downscales stay sharp.
 *
 *   node scripts/gen-portraits.mjs            # write files
 *   node scripts/gen-portraits.mjs --dry      # report only, write nothing
 */
import sharp from 'sharp'
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(REPO, 'public', 'portraits')      // served webp tiers land here
const SRC_DIRS = [join(REPO, 'portraits-src'), join(REPO, 'portraits-src', '_gen')]  // high-res originals (gitignored)
const DRY = process.argv.includes('--dry')

const TIERS = [
  { suffix: 'head', width: 360, quality: 80 },
  { suffix: 'full', width: 820, quality: 82 },
]

/* ── head framing ─────────────────────────────────────────────────────────
   Hand-framed boxes win; everything else falls back to headBox() below.
   A box is { cx, cy, s }: centre of the head as a fraction of the source's
   width/height, and the square's side as a fraction of its WIDTH. */
const BOXES = JSON.parse(readFileSync(join(REPO, 'scripts', 'head-boxes.json'), 'utf8'))

/* Where the figure sits, by local detail energy. Brightness can't separate
   these figures from their backdrops — they're often the same value — but the
   backdrops are smooth and the figures are not, so gradient magnitude can.
   The cut scales with the row profile because most plates carry drifting gold
   dust: a fixed threshold calls the whole canvas "subject" on a wide shot. */
async function subject(buf, PW = 160) {
  const { data, info } = await sharp(buf).removeAlpha().greyscale().blur(1.2)
    .resize({ width: PW }).raw().toBuffer({ resolveWithObject: true })
  const W = info.width, H = info.height, at = (x, y) => data[y * W + x]
  const rowN = new Int32Array(H), colN = new Int32Array(W), pts = []
  for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
    const g = Math.abs(at(x + 1, y) - at(x - 1, y)) + Math.abs(at(x, y + 1) - at(x, y - 1))
    if (g > 12) { rowN[y]++; colN[x]++; pts.push([x, y]) }
  }
  const pct = (a, q) => { const v = [...a].sort((m, n) => m - n); return v[Math.floor(v.length * q)] }
  const minR = Math.max(4, Math.round(pct(rowN, 0.9) * 0.18))
  const minC = Math.max(4, Math.round(pct(colN, 0.9) * 0.18))
  let top = 0; while (top < H - 2 && !(rowN[top] >= minR && rowN[top + 1] >= minR)) top++
  let bot = H - 1; while (bot > top + 1 && !(rowN[bot] >= minR && rowN[bot - 1] >= minR)) bot--
  let l = 0; while (l < W - 2 && !(colN[l] >= minC && colN[l + 1] >= minC)) l++
  let r = W - 1; while (r > l + 1 && !(colN[r] >= minC && colN[r - 1] >= minC)) r--
  return { W, H, top, bot, l, r, pts }
}

/* The head square in source pixels. Square sources are already busts in this
   set, so they're left whole; a standing figure gets the top of the subject,
   centred on the median x of its upper band (a median, not a mean, so a wing
   or a raised spear on one side can't drag the crop off the face). */
async function headBox(id, buf, w, h) {
  const b = BOXES[id]
  if (b) {
    const S = Math.min(Math.round(b.s * w), w, h)
    return {
      left: Math.max(0, Math.min(Math.round(b.cx * w - S / 2), w - S)),
      top:  Math.max(0, Math.min(Math.round(b.cy * h - S / 2), h - S)),
      width: S, height: S, how: 'hand',
    }
  }
  if (w / h >= 0.9) {
    const S = Math.min(w, h)
    return { left: Math.round((w - S) / 2), top: 0, width: S, height: S, how: 'bust' }
  }
  const s = await subject(buf)
  const subH = Math.max(1, s.bot - s.top)
  const band = s.pts.filter(([, y]) => y < s.top + subH * 0.16).map(([x]) => x).sort((m, n) => m - n)
  const cx = band.length ? band[band.length >> 1] : (s.l + s.r) / 2
  const k = w / s.W
  const S = Math.min(Math.round(subH * 0.42 * k), w, h)
  return {
    left: Math.max(0, Math.min(Math.round(cx * k - S / 2), w - S)),
    top:  Math.max(0, Math.min(Math.round(s.top * k - S * 0.03), h - S)),
    width: S, height: S, how: 'auto',
  }
}

/* Source files are named for the node id in mythology.js, because that id is
   the ONLY thing a portrait is resolved by — art filed under any other
   spelling silently never loads and its figure renders as a bare star.
   (callisto, euryale, tethys, graeae, muses and gorgons were each filed under
   a variant once; they were renamed rather than aliased.)

   the two tier files we generate — never treat these as a source, so a re-run
   can't feed a shrunken output back into itself */
const isOutput = f => /-(head|full)\.webp$/i.test(f)
const SRC_RE = /\.(png|webp|jpg|jpeg)$/i
const idOf = f => f.replace(/-(head|full|node|panel)?\.(png|webp|jpg|jpeg)$/i, '')

/* gather candidate source files for every id from the backup source dirs */
const cand = {}  // id -> [path, ...]
for (const dir of SRC_DIRS) {
  if (!existsSync(dir)) continue
  for (const f of readdirSync(dir)) {
    if (!SRC_RE.test(f) || isOutput(f)) continue
    const p = join(dir, f)
    try { if (statSync(p).isDirectory()) continue } catch { continue }
    ;(cand[idOf(f)] ??= []).push(p)
  }
}

/* the highest-resolution source for an id, read once into a buffer */
async function bestSource(id) {
  let best = null
  for (const p of cand[id] || []) {
    try {
      const buf = readFileSync(p)
      const m = await sharp(buf).metadata()
      const area = (m.width || 0) * (m.height || 0)
      if (!best || area > best.area) best = { p, buf, area, w: m.width, h: m.height }
    } catch { /* unreadable — skip */ }
  }
  return best
}

const ids = Object.keys(cand).sort()
let written = 0, skipped = 0

for (const id of ids) {
  const src = await bestSource(id)
  if (!src) { console.warn(`  ! ${id}: no readable source`); continue }
  const from = src.p.split(/[\\/]/).slice(-2).join('/')

  for (const tier of TIERS) {
    const outPath = join(OUT_DIR, `${id}-${tier.suffix}.webp`)
    try {
      /* the head tier is framed on the head first, then downscaled */
      const box = tier.suffix === 'head' ? await headBox(id, src.buf, src.w, src.h) : null
      const pipe = sharp(src.buf)
      if (box) pipe.extract({ left: box.left, top: box.top, width: box.width, height: box.height })
      const out = await pipe
        .resize({ width: tier.width, withoutEnlargement: true })
        .webp({ quality: tier.quality })
        .toBuffer()
      if (!DRY) writeFileSync(outPath, out)
      const inW = box ? box.width : src.w
      const cap = Math.min(tier.width, inW)
      console.log(`  ${DRY ? '~' : '✓'} ${`${id}-${tier.suffix}.webp`.padEnd(30)} ${from.padEnd(34)} ${box ? `${box.how} crop ` : ''}${inW}→${cap}px  ${(out.length / 1024).toFixed(0)}KB`)
      written++
    } catch (e) {
      console.error(`  ✗ ${id}-${tier.suffix}: ${e.message}`); skipped++
    }
  }
}

console.log(`\n${DRY ? '[dry] would write' : 'wrote'} ${written} files, ${skipped} errors, across ${ids.length} ids.`)
