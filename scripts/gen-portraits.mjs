/*
 * gen-portraits.mjs — generate right-sized webp portrait tiers.
 *
 * Produces two variants per deity id, matching the naming convention that
 * portraitSources() in SkyGraph.jsx already resolves:
 *
 *   {id}-head.webp  — small,  for the graph nodes + StoryOrbit (sun/planets/chips)
 *   {id}-full.webp  — larger, for the DetailPanel hero
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

/* the two tier files we generate — never treat these as a source, so a re-run
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
      if (!best || area > best.area) best = { p, buf, area, w: m.width }
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
      const out = await sharp(src.buf)
        .resize({ width: tier.width, withoutEnlargement: true })
        .webp({ quality: tier.quality })
        .toBuffer()
      if (!DRY) writeFileSync(outPath, out)
      const cap = Math.min(tier.width, src.w)
      console.log(`  ${DRY ? '~' : '✓'} ${`${id}-${tier.suffix}.webp`.padEnd(30)} ${from.padEnd(34)} ${src.w}→${cap}px  ${(out.length / 1024).toFixed(0)}KB`)
      written++
    } catch (e) {
      console.error(`  ✗ ${id}-${tier.suffix}: ${e.message}`); skipped++
    }
  }
}

console.log(`\n${DRY ? '[dry] would write' : 'wrote'} ${written} files, ${skipped} errors, across ${ids.length} ids.`)
