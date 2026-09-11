// ─────────────────────────────────────────────────────────────────────────────
// check-data.mjs — validates the cross-references between src/data/*.js
//
// npm run build only catches broken imports; a dangling string id (a tour beat
// pointing at a fig with no node, a story keyed to an id nobody added) fails
// silently instead — the reference is just a miss on an object lookup. This
// walks every such reference once and reports the two classes separately:
// ERRORS are documented hard requirements (CLAUDE.md) and fail the build;
// WARNINGS are content gaps that degrade gracefully (a generated fallback
// constellation, orphaned prose) and are worth knowing about but not fatal.
// ─────────────────────────────────────────────────────────────────────────────
import { nodes, links } from '../src/data/mythology.js'
import { deityStories } from '../src/data/deityStories.js'
import { TOURS } from '../src/data/tours.js'
import { CONSTELLATIONS } from '../src/data/constellations.js'

const errors = []
const warnings = []

const nodeIds = new Set(nodes.map(n => n.id))

// ── duplicate node ids ──────────────────────────────────────────────────────
{
  const seen = new Set()
  for (const n of nodes) {
    if (seen.has(n.id)) errors.push(`duplicate node id "${n.id}"`)
    seen.add(n.id)
  }
}

// ── links must reference real nodes ─────────────────────────────────────────
for (const l of links) {
  if (!nodeIds.has(l.source)) errors.push(`link references unknown source "${l.source}" (→ ${l.target})`)
  if (!nodeIds.has(l.target)) errors.push(`link references unknown target "${l.target}" (${l.source} →)`)
}

// ── tours: every beat's fig must be a real node (documented hard requirement,
//    beats[].figures[] must resolve too — StoryOrbit/DetailPanel treat both as
//    clickable navigation targets) ───────────────────────────────────────────
for (const tour of TOURS) {
  // the hero is the face GuidedSky burns at the centre of the constellation
  // and the name its "Following …" line credits — a dangling id shows up as a
  // blank orb, which is exactly the silent failure this script is for
  if (tour.hero && !nodeIds.has(tour.hero)) {
    errors.push(`tour "${tour.id}" names unknown hero "${tour.hero}"`)
  }
  for (const beat of tour.beats) {
    if (!nodeIds.has(beat.fig)) {
      errors.push(`tour "${tour.id}" beat references unknown fig "${beat.fig}"`)
    } else if (!(beat.fig in CONSTELLATIONS)) {
      warnings.push(`tour "${tour.id}" beat "${beat.fig}" has no constellation spec — falls back to generateSpec()`)
    }
  }
}

// ── deityStories: keys and figures[] navigation targets ─────────────────────
for (const [id, entry] of Object.entries(deityStories)) {
  if (!nodeIds.has(id)) {
    warnings.push(`deityStories["${id}"] has no matching node — unreachable from the graph`)
  }
  for (const beat of entry.beats || []) {
    for (const fig of beat.figures || []) {
      if (!nodeIds.has(fig)) errors.push(`deityStories["${id}"] beat "${beat.label}" links to unknown figure "${fig}"`)
    }
  }
}

// ── constellations: specs authored for ids that no longer exist ─────────────
for (const id of Object.keys(CONSTELLATIONS)) {
  if (!nodeIds.has(id)) warnings.push(`constellations["${id}"] has no matching node — dead spec`)
}

// ── report ───────────────────────────────────────────────────────────────────
for (const w of warnings) console.warn(`⚠ ${w}`)
for (const e of errors) console.error(`✗ ${e}`)

if (errors.length) {
  console.error(`\ncheck-data: ${errors.length} error(s), ${warnings.length} warning(s)`)
  process.exit(1)
} else {
  console.log(`check-data: ok (${warnings.length} warning(s))`)
}
