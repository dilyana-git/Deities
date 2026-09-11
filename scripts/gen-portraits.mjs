/*
 * gen-portraits.mjs — generate right-sized webp portrait tiers.
 *
 * Produces three variants per deity id and records their exact URLs + metadata
 * in src/data/portraitManifest.generated.js:
 *
 *   {id}-node.webp  — the head crop at NODE size, for tier-2 stars + StoryOrbit
 *   {id}-head.webp  — the head crop at PRIMARY size, for the 12 tier-1 stars
 *   {id}-full.webp  — the whole figure, for the DetailPanel hero
 *
 * The head tiers are a crop, not just a downscale: a node glyph is ~40px
 * across, and a whole standing figure shrunk into that is an unreadable speck.
 * Framing comes from head-boxes.json where a figure has been framed by hand,
 * and from a subject-detection fallback otherwise (see headBox).
 *
 * `node` and `head` are the same crop at two sizes because the graph draws the
 * same art at wildly different scales. A tier-2 star spans ~30-45 CSS px, so
 * the 360px `head` it used to load was 16-36x the pixels it could ever show —
 * 28KB and a 360-square decode apiece, 63 of them on a zoom-in. At 192px that
 * is ~8KB and a quarter of the decode, and it still holds up to about 2x zoom
 * on a HiDPI screen. The 12 primaries keep `head`: they reach ~110-165 CSS px
 * at rest and are the faces the whole map is composed around.
 *
 * The runtime reads only that generated manifest; it never probes speculative
 * png/jpg or legacy paths. Source PNGs are left untouched (kept as backup).
 * Nothing is ever enlarged past its source resolution.
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
import { nodes } from '../src/data/mythology.js'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(REPO, 'public', 'portraits')      // served webp tiers land here
const SRC_ROOT = join(REPO, 'portraits-src')           // high-res originals (gitignored)
const MANIFEST_PATH = join(REPO, 'src', 'data', 'portraitManifest.generated.js')
const DRY = process.argv.includes('--dry')
const MANIFEST_ONLY = process.argv.includes('--manifest-only')

const TIERS = [
  { suffix: 'node', width: 192, quality: 74, crop: 'head' },
  { suffix: 'head', width: 360, quality: 80, crop: 'head' },
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

/* Match source filenames to the mythology dataset automatically. Exact node
   ids and display names win; a conservative one-character typo match is used
   only when one candidate is clearly better than every other candidate.

   The tier files we generate are never sources, so a re-run can't feed a
   shrunken output back into itself.

   `-node` is deliberately NOT in this pattern even though we now emit that
   tier: `portraits-src/_gen/` holds 98 legacy originals under that very
   suffix, and for at least one figure (thetis) it is the ONLY source there
   is. Excluding it dropped her out of generation silently, leaving stale
   files from an earlier run on disk. Outputs live in OUT_DIR, which is never
   walked for sources, so the guard only has to catch outputs copied back into
   the source tree by hand — and `bestSource` takes the highest resolution
   available anyway, so a 192px legacy file can never beat a real plate. */
const isOutput = f => /-(head|full)\.webp$/i.test(f)
const SRC_RE = /\.(png|webp|jpg|jpeg)$/i
const sourceKey = value => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '_')
  .replace(/^_+|_+$/g, '')

const keysById = new Map(nodes.map(node => [
  node.id,
  new Set([
    sourceKey(node.id),
    sourceKey(node.name),
    sourceKey(node.name.replace(/^the\s+/i, '')),
  ]),
]))

const exactIdsByKey = new Map()
for (const [id, keys] of keysById) for (const key of keys) {
  if (!key) continue
  let ids = exactIdsByKey.get(key)
  if (!ids) exactIdsByKey.set(key, ids = new Set())
  ids.add(id)
}

function editDistance(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const next = [i]
    for (let j = 1; j <= b.length; j++) {
      next[j] = Math.min(
        next[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    prev = next
  }
  return prev[b.length]
}

const commonPrefixLength = (a, b) => {
  let i = 0
  while (i < a.length && i < b.length && a[i] === b[i]) i++
  return i
}

function resolveNodeId(file) {
  // Browsers and chat uploads sometimes preserve the original extension and
  // append another one (for example `pasiphae.png.png`). Peel all repeated
  // image extensions before resolving the optional tier suffix.
  let stem = file
  while (SRC_RE.test(stem)) stem = stem.replace(SRC_RE, '')
  stem = stem.replace(/[-_ ](head|full|node|panel)$/i, '')
  const key = sourceKey(stem)

  const exact = exactIdsByKey.get(key)
  if (exact?.size === 1) return { id: [...exact][0], how: 'exact' }
  if (key.length < 4) return null

  const ranked = []
  for (const [id, keys] of keysById) {
    let distance = Infinity, prefix = 0
    for (const candidate of keys) {
      const d = editDistance(key, candidate)
      if (d < distance) { distance = d; prefix = commonPrefixLength(key, candidate) }
      else if (d === distance) prefix = Math.max(prefix, commonPrefixLength(key, candidate))
    }
    ranked.push({ id, distance, prefix })
  }
  ranked.sort((a, b) => a.distance - b.distance || b.prefix - a.prefix || a.id.localeCompare(b.id))
  const [best, next] = ranked
  if (best.distance !== 1) return null
  if (next?.distance === best.distance && next.prefix === best.prefix) return null
  return { id: best.id, how: 'typo', stem }
}

function* sourceFiles(dir) {
  if (!existsSync(dir)) return
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* sourceFiles(path)
    else if (entry.isFile()) yield { file: entry.name, path }
  }
}

/* Gather candidate source files recursively, then resolve each filename from
   the current mythology data instead of a maintained filename/id list. */
const cand = {}  // id -> [path, ...]
for (const { file, path } of sourceFiles(SRC_ROOT)) {
  if (!SRC_RE.test(file) || isOutput(file)) continue
  const match = resolveNodeId(file)
  // Raw download filenames are kept as backups, but only a mythology node id
  // can ever resolve in the app, so do not emit unusable portrait tiers.
  if (!match) continue
  if (match.how === 'typo') console.log(`  ↳ discovered ${match.stem} as ${match.id}`)
  ;(cand[match.id] ??= []).push(path)
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

if (!MANIFEST_ONLY) {
  for (const id of ids) {
    const src = await bestSource(id)
    if (!src) { console.warn(`  ! ${id}: no readable source`); continue }
    const from = src.p.split(/[\\/]/).slice(-2).join('/')

    /* Resolved once and shared by every cropping tier: headBox's fallback runs
       gradient-magnitude subject detection over the plate, which is far too
       expensive to repeat per output size — and two tiers must in any case be
       the same crop at two scales, not two independent framings. */
    let _box
    const headBoxOnce = async () => (_box ??= await headBox(id, src.buf, src.w, src.h))

    for (const tier of TIERS) {
      const outPath = join(OUT_DIR, `${id}-${tier.suffix}.webp`)
      try {
        /* the head tiers are framed on the head first, then downscaled */
        const box = tier.crop === 'head' ? await headBoxOnce() : null
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
}

/* Build-time source of truth for portrait availability. The browser imports
   this instead of probing legacy folders/name styles and learning about absent
   art through 404s. Dimensions travel with each exact URL so consumers can
   reserve the right shape without decoding the image first. */
async function writePortraitManifest() {
  const manifest = {}
  const files = existsSync(OUT_DIR) ? readdirSync(OUT_DIR).sort() : []
  for (const file of files) {
    const match = /^(.*)-(node|head|full)\.webp$/i.exec(file)
    if (!match) continue
    const [, id, variant] = match
    const path = join(OUT_DIR, file)
    try {
      const meta = await sharp(path).metadata()
      if (!meta.width || !meta.height) continue
      ;(manifest[id] ??= {})[variant] = {
        src: `/portraits/${file}`,
        width: meta.width,
        height: meta.height,
        bytes: statSync(path).size,
        type: 'image/webp',
      }
    } catch (e) {
      console.warn(`  ! manifest skipped ${file}: ${e.message}`)
    }
  }

  const source = `// Generated by scripts/gen-portraits.mjs. Do not edit by hand.\n` +
    `// Regenerate only the manifest: node scripts/gen-portraits.mjs --manifest-only\n` +
    `export const portraitManifest = Object.freeze(${JSON.stringify(manifest, null, 2)})\n`

  if (DRY) {
    console.log(`[dry] would write ${Object.keys(manifest).length} portrait entries to ${MANIFEST_PATH}`)
  } else {
    writeFileSync(MANIFEST_PATH, source)
    console.log(`wrote ${Object.keys(manifest).length} portrait entries to ${MANIFEST_PATH}`)
  }
}

await writePortraitManifest()
