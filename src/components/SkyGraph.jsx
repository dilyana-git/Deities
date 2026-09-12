import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import * as d3 from 'd3'
import { nodes as rawNodes, links as rawLinks } from '../data/mythology.js'
import { linkTypeConfig } from '../data/linkTypeConfig.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { portraitManifest } from '../data/portraitManifest.generated.js'

/* ── category palettes (OKLCH) ─────────────────────────────────────────
   Each of the 9 families gets a distinct hue with enough chroma to read as
   its own colour region on the map. The hues are spread around the wheel so
   neighbouring constellations never read as the same family; `chthonic` and
   `mortal` stay deliberately desaturated (dusk-grey / plain) but keep just
   enough tint to separate from one another. */
const CAT = {
  primordial : 'oklch(0.66 0.115 300)',   // violet
  titan      : 'oklch(0.72 0.115 75)',    // amber-gold
  olympian   : 'oklch(0.68 0.115 250)',   // sky-blue
  chthonic   : 'oklch(0.60 0.055 290)',   // dusk grey-violet
  monster    : 'oklch(0.63 0.140 25)',    // ember-red
  hero       : 'oklch(0.70 0.115 150)',   // laurel-green
  sea_deity  : 'oklch(0.70 0.110 220)',   // teal
  nymph_minor: 'oklch(0.70 0.105 330)',   // rose-magenta
  mortal     : 'oklch(0.68 0.022 250)',   // plain near-grey
}

const LCOL = {
  parent_of       : 'oklch(0.56 0.012 270)',
  birthed         : 'oklch(0.62 0.052 150)',
  transformed_into: 'oklch(0.62 0.060 300)',
  cursed_into     : 'oklch(0.56 0.080 22)',
  created_by      : 'oklch(0.64 0.055 75)',
  lover_of        : 'oklch(0.64 0.062 12)',
  enemy_of        : 'oklch(0.60 0.090 25)',
  merged_with     : 'oklch(0.70 0.050 90)',
  split_from      : 'oklch(0.60 0.020 250)',
}

/* cluster anchor positions (fraction of canvas W×H) */
const ANCHOR = {
  primordial : [0.85, 0.30],
  chthonic   : [0.38, 0.72],
  titan      : [0.58, 0.45],
  olympian   : [0.31, 0.50],
  nymph_minor: [0.11, 0.20],
  mortal     : [0.09, 0.62],
  monster    : [0.28, 0.82],
  hero       : [0.42, 0.90],
  sea_deity  : [0.70, 0.74],
}

const CAT_LABEL = {
  primordial :'PRIMORDIALS', titan:'TITANS', olympian:'OLYMPIANS', chthonic:'CHTHONIC',
  monster    :'MONSTERS',    hero:'HEROES',  sea_deity:'SEA DEITIES',
  nymph_minor:'NYMPHS & MINOR', mortal:'MORTALS',
}

const LINK_DASH = {
  created_by: '2 4', split_from: '6 3 2 3', enemy_of: '5 3',
}

const W = 1200, H = 740

/* Exact portrait variants generated alongside the image tiers. Absence in the
   manifest means absence on disk, so the UI can use its sigil/orb fallback
   immediately instead of discovering missing art through a chain of 404s.

   A consumer asks for the size it is about to DRAW, not for "a portrait":
   `node` (192px head crop), `head` (360px head crop) or `full` (820px figure).
   Everything after the first entry is a fallback, so a figure that is missing
   a tier still renders instead of vanishing. Ordering the rest largest-first
   matters — a fallback is a last resort, and arriving too sharp is a wasted
   download while arriving too soft is a visible defect.

   Why `node` exists at all: a tier-2 star spans ~30-45 CSS px at rest and
   ~65-100 at the k=1.9-2.2 that flyTo and search land on, so 192px covers
   every path the UI actually navigates, at ~8KB against the 360px tier's
   ~28KB. Past roughly 2.5x manual zoom it does go soft — that is the
   deliberate ceiling of the level-of-detail system, and the node mask (full
   alpha only to 55% of the box) carries most of it. */
const PORTRAIT_CHAIN = {
  node: ['node', 'head', 'full'],
  head: ['head', 'full', 'node'],
  full: ['full', 'head', 'node'],
}

function portraitEntries(id, prefer = 'head') {
  const entry = portraitManifest[id]
  if (!entry) return []
  return (PORTRAIT_CHAIN[prefer] || PORTRAIT_CHAIN.head)
    .map(variant => entry[variant]).filter(Boolean)
}

function portraitSources(id, prefer = 'head') {
  return portraitEntries(id, prefer).map(entry => entry.src)
}

/* Fetch a figure's 820px DetailPanel hero ahead of the click, so the panel
   reads it back out of the browser's cache instead of the network. Module
   scope because two callers share one ledger: the map's hover dwell (below,
   in the effect) and the panel itself, which warms its Bonds — the figures a
   reader goes to next. Low priority and outside the node-portrait queue, so
   a speculative plate never takes a slot from a face on screen. */
const _fullWarmed = new Set()
const _saveData = typeof navigator !== 'undefined' && !!navigator.connection?.saveData
function warmFullPortrait(id) {
  if (!id || _saveData || _fullWarmed.has(id)) return
  const src = portraitSources(id, 'full')[0]
  if (!src) return
  _fullWarmed.add(id)
  const img = new Image()
  img.decoding = 'async'
  if ('fetchPriority' in img) img.fetchPriority = 'low'
  img.src = src
}

/* ── renown tiers, at module scope ───────────────────────────────────────
   The three registers (1 primary / 2 secondary / 3 tail) fall out of the
   static dataset alone, so they are derived once here rather than inside the
   simulation effect, and the effect stamps them onto its own node clones.
   Hoisting them buys one thing the effect could not: `mapPortraitVariant`,
   which lets a consumer OUTSIDE the graph ask which crop the map drew for a
   figure.

   That matters to the DetailPanel's placeholder. Its whole premise is that the
   192px `node` crop is already in the browser's cache — it is the star the
   viewer just clicked — but the map only draws that crop for tier 2. The 12
   primaries are drawn from the 360px `head`, so asking them for `node` was a
   second, cold request for the same face, on exactly the dozen figures most
   likely to be clicked. Ask for what was drawn and it costs nothing.

   Tier 1 is rank-based (top N) so the count stays at a dozen as the dataset
   grows; 2/3 split on degree, where the distribution has its own shelf. */
const PRIMARY_COUNT = 12
const TIER_BY_ID = (() => {
  const adj = {}
  rawNodes.forEach(n => (adj[n.id] = new Set()))
  rawLinks.forEach(l => { adj[l.source]?.add(l.target); adj[l.target]?.add(l.source) })
  const deg = id => adj[id]?.size || 0
  const maxDeg = Math.max(...rawNodes.map(n => deg(n.id)))
  const prom = id => Math.sqrt(deg(id)) / Math.sqrt(maxDeg)
  const rank = rawNodes.map(n => prom(n.id)).sort((a, b) => b - a)
  const hub  = rank[Math.min(PRIMARY_COUNT - 1, rank.length - 1)] || 0.4
  return Object.fromEntries(rawNodes.map(n =>
    [n.id, prom(n.id) >= hub ? 1 : deg(n.id) >= 3 ? 2 : 3]))
})()

/* Which crop the MAP draws for a figure: the 12 primaries span ~110-165 CSS px
   and take the 360px head, everything else in tier 2 draws at a fraction of
   that and takes the 192px one. Tier 3 draws no portrait at all, so it falls
   to `node` — the cheapest thing to fetch cold. */
const mapPortraitVariant = id => (TIER_BY_ID[id] === 1 ? 'head' : 'node')

/* The cosmogony is a first-arrival event within a page's lifetime, not the
   cost of every re-render: it is a ~13s film, and replaying it on, say, a
   StrictMode remount would turn the sky's opening into a toll. A plain
   in-memory flag (not sessionStorage) is what gives it that scope exactly —
   it lives only as long as this module does, so it resets itself on every
   real refresh for free, with nothing to clear. `#intro` on the URL still
   forces a replay on demand within a load. */
let _cosmogonySeenThisLoad = false
function cosmogonySeen() {
  if (typeof location !== 'undefined' && location.hash === '#intro') return false
  return _cosmogonySeenThisLoad
}
function markCosmogonySeen() {
  _cosmogonySeenThisLoad = true
}

/* ════════════════════════════════════════════════════════════════════════
   SkyGraph — D3 celestial-atlas graph, exposed as an imperative React ref
   ════════════════════════════════════════════════════════════════════════ */
const SkyGraph = forwardRef(function SkyGraph({ onSelect }, ref) {
  const svgEl  = useRef(null)
  const apiRef = useRef(null)

  /* The D3 setup below is a single ~2000-line effect that owns the whole
     simulation, forces, and event listeners — it must not tear down and
     rebuild just because a parent re-render happened to hand it a new
     onSelect closure identity. Routing calls through a ref keeps onSelect
     out of that effect's dependency array entirely. */
  const onSelectRef = useRef(onSelect)
  useEffect(() => { onSelectRef.current = onSelect }, [onSelect])

  useImperativeHandle(ref, () => ({
    select           : (id, fly, opts) => apiRef.current?.select(id, fly, opts),
    clearSelection   : ()         => apiRef.current?.clearSelection(),
    flyTo            : (id, scale)=> apiRef.current?.flyTo(id, scale),
    resetView        : ()         => apiRef.current?.resetView(),
    highlightPath    : (ids)      => apiRef.current?.highlightPath(ids),
    clearPathHighlight: ()        => apiRef.current?.clearPathHighlight(),
    setTourLock      : (v)        => apiRef.current?.setTourLock(v),
    setDormant       : (v)        => apiRef.current?.setDormant(v),
    litEdge          : (a, b)     => apiRef.current?.litEdge(a, b),
    clearLitEdge     : ()         => apiRef.current?.clearLitEdge(),
  }))

  useEffect(() => {
    const el = svgEl.current
    if (!el) return

    /* ── data ───────────────────────────────────────────────────── */
    const nodes = rawNodes.map(n => ({ ...n }))
    const byId  = Object.fromEntries(nodes.map(n => [n.id, n]))
    const links = rawLinks
      .filter(l => byId[l.source] && byId[l.target])
      .map(l => ({ ...l }))

    /* adjacency + degree (renown) */
    const adj = {}
    nodes.forEach(n => (adj[n.id] = new Set()))
    links.forEach(l => { adj[l.source].add(l.target); adj[l.target].add(l.source) })
    nodes.forEach(n => { n.degree = adj[n.id].size })
    const maxDeg = Math.max(...nodes.map(n => n.degree))
    nodes.forEach(n => { n.prom = Math.sqrt(n.degree) / Math.sqrt(maxDeg) })
    /* prom, ranked high to low. Tier membership no longer needs it — that rule
       moved to module scope as `TIER_BY_ID` — but the hub BREATH does: it is a
       tighter set than tier 1 (the top ~6, not the top 12), so it still has to
       ask where a given prom falls in the ranking. */
    const promRank = nodes.map(n => n.prom).sort((a, b) => b - a)

    /* ── three tiers of renown ──────────────────────────────────────
       ~137 stars drawn on one continuous size curve average out into
       texture: almost everything lands in a mushy middle band and the eye
       has nowhere to settle. So the field is cut into three discrete
       registers instead, with a visible gap between each.

         1  PRIMARY    — the 12 most-connected figures. 3-4x a secondary,
                         portrait, permanent label. The landmarks.
         2  SECONDARY  — the working middle (degree 3-8). Today's size and
                         portrait; label only on zoom / hover / selection.
         3  TAIL       — degree <= 2. A plain dot: no portrait, no label.
                         The sky the constellations are drawn on.

       Tier 1 is rank-based (top N) rather than a degree cutoff so the count
       stays at a dozen as the dataset grows; 2/3 split on degree, where the
       distribution has its own shelf (29 nodes at degree 3, 40 at degree 2).

       The rule itself lives at module scope (`TIER_BY_ID`) so the DetailPanel
       can read it too — see `mapPortraitVariant`. This only stamps it onto the
       clones the simulation owns. */
    nodes.forEach(n => { n.tier = TIER_BY_ID[n.id] || 3 })

    /* String alias for the same three registers. The lineage trace, band-label
       repulsion and portrait scheduling all read the tier by name; keeping one
       derived alias means there is still a single source of truth (`n.tier`). */
    const TIER_NAME = { 1: 'primary', 2: 'secondary', 3: 'tail' }
    nodes.forEach(n => { n._tier = TIER_NAME[n.tier] })

    /* Size is a step function, not a curve. Tiers 1 and 2 keep a gentle prom
       ramp inside themselves so figures stay distinguishable, but the ramps
       never approach each other: the largest secondary (12) stays under half
       the smallest primary (30), and a typical secondary (~9) sits a clean
       3.4x below a typical primary, so tier reads at a glance rather than
       having to be inferred from a size two neighbours apart.
       Each ramp is normalised against its tier's OWN prom span, so no tier
       collapses to a single size when the data shifts. */
    const TIER_R = { 1: [30, 44], 2: [8, 12], 3: [3.4, 3.4] }
    const tierBand = {}
    for (const t of [1, 2, 3]) {
      const ps = nodes.filter(n => n.tier === t).map(n => n.prom)
      tierBand[t] = ps.length ? [Math.min(...ps), Math.max(...ps)] : [0, 1]
    }
    const radius = n => {
      const [lo, hi]   = TIER_R[n.tier]
      const [pLo, pHi] = tierBand[n.tier]
      const t = pHi > pLo ? (n.prom - pLo) / (pHi - pLo) : 0
      return lo + t * (hi - lo)
    }

    /* Selection has to stay legible for a 3.4px tail dot, so a grown node
       targets an absolute radius rather than a flat multiplier — primaries
       barely need to move, tail dots need to become visible marks. */
    const selRadius = n => n.tier === 3 ? 13 : radius(n) * (n.tier === 1 ? 1.3 : 1.7)

    /* Glow halo size, as a multiple of the star's radius. Every place that
       resizes a `.glow` — rest, hub-breath peak, hover flare, ignition
       flare, selection nova — goes through these, so the halo can never
       drift out of proportion with the star on one code path only. */
    const GLOW_R      = 1.5    // resting halo
    const GLOW_R_PEAK = 1.8    // hub-breath / hover swell
    const GLOW_R_NOVA = 2.2    // transient burst on selection & ignition

    /* portrait half-width as a multiple of the node radius — portraits spread
       beyond the star and fade into the sky (see the `portrait-mask` in defs)
       instead of being cropped to a circle. */
    const IMG_SCALE = 1.45

    /* What a node actually OCCUPIES on screen. For tiers 1 and 2 that is the
       portrait, not the star: the <image> spans IMG_SCALE × the radius, so a
       primary's art overhangs its own core by half again. Anything that has to
       clear the glyph — its own label, the band labels — measures against
       this; `radius()` alone puts a name on top of the face it belongs to.
       Tier 3 has no <image> at all, so there the star IS the glyph. */
    const glyphRAt = (n, r) => n.tier === 3 ? r : r * IMG_SCALE
    const glyphR   = n => glyphRAt(n, radius(n))

    /* …but for art-vs-art spacing the fringe doesn't count. The portrait mask
       holds full alpha only to 55% of the box and is under .55 by 80%, so two
       portraits whose outermost fifths interleave don't read as a collision —
       reserving the whole box would spread the primaries for nothing. The
       forces reserve the SOLID footprint; opaque type clears the whole thing. */
    const IMG_SOLID = 0.8
    const bodyR = n => n.tier === 3 ? radius(n) : radius(n) * IMG_SCALE * IMG_SOLID

    /* Core radius as a multiple of the star radius. Tiers 2 and 3 keep the full
       disc — there the disc IS the mark. A primary does not: at 30–44px a
       full-radius pale disc is a lit plate the portrait sits on, and its hard
       circular edge reads as a bezel around the face no matter how softly the
       portrait's own mask fades. Shrunk to a pip it becomes what a star on a
       chart actually is — a bright point — and the gradient halo carries the
       light out from it, so the figure floats in that light instead of on a
       plate. Sized once here because two paths draw a core (birth and
       `sizeNode`) and a pip on one of them only is a flicker on selection. */
    const CORE_R = 0.2
    const coreRadius = (n, r) => n.tier === 1 ? r * CORE_R : r

    /* Resting-camera bleed. A disc floating dead-centre with even margins on
       every side reads as small — a coin on a table. Overscaling it slightly
       and biasing the camera down-and-right pushes the field's lower-right off
       the frame while leaving a generous open margin at the top-left (where the
       wordmark lives and the dome's rim curves into the void). The crop is what
       implies scale — you are looking at part of a much larger sky. */
    const BLEED_K = 1.11         // overscale past a clean fit
    const BLEED_DX = 0.045       // shove the field's centre right (fraction of W)
    const BLEED_DY = 0.055       // …and down (fraction of H)

    /* ── birth-order generation (BFS along parent_of / birthed edges) ── */
    const childAdj = {}
    nodes.forEach(n => (childAdj[n.id] = []))
    links.forEach(l => {
      if (l.type === 'parent_of' || l.type === 'birthed')
        childAdj[l.source].push(l.target)
    })
    const gen = {}
    const roots = nodes.filter(n => n.category === 'primordial').map(n => n.id)
    const queue = roots.map(id => ({ id, g: 0 }))
    roots.forEach(id => (gen[id] = 0))
    while (queue.length) {
      const { id, g } = queue.shift()
      for (const cid of childAdj[id]) {
        if (gen[cid] == null) { gen[cid] = g + 1; queue.push({ id: cid, g: g + 1 }) }
      }
    }
    const maxGen = Math.max(...Object.values(gen), 1)
    nodes.forEach(n => {
      if (gen[n.id] == null) gen[n.id] = maxGen + 1
    })
    const genOrder = nodes.slice().sort((a, b) => gen[a.id] - gen[b.id] || a.id.localeCompare(b.id))
    const birthRank = {}
    genOrder.forEach((n, i) => (birthRank[n.id] = i))

    /* ── svg scaffold ───────────────────────────────────────────── */
    const svg = d3.select(el)
    svg.selectAll('*').remove()
    svg.attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet')

    const defs = svg.append('defs')
    /* color-interpolation-filters:sRGB — the default (linearRGB) forces a
       gamma round-trip on every pixel of every blur pass, ~2-3x the cost for
       no perceptible gain at these glow sizes. Set on every blur filter. */
    const flt  = defs.append('filter').attr('id','glow').attr('x','-80%').attr('y','-80%').attr('width','260%').attr('height','260%')
      .attr('color-interpolation-filters','sRGB')
    flt.append('feGaussianBlur').attr('stdDeviation', 3.2).attr('result','b')
    const fm = flt.append('feMerge')
    fm.append('feMergeNode').attr('in','b')
    fm.append('feMergeNode').attr('in','SourceGraphic')

    /* trace-dot glow — tighter blur for the lineage-trace traveling dots */
    const tFlt = defs.append('filter').attr('id','trace-glow').attr('x','-200%').attr('y','-200%').attr('width','500%').attr('height','500%')
      .attr('color-interpolation-filters','sRGB')
    tFlt.append('feGaussianBlur').attr('stdDeviation', 4).attr('result','b')
    const tFm = tFlt.append('feMerge')
    tFm.append('feMergeNode').attr('in','b')
    tFm.append('feMergeNode').attr('in','SourceGraphic')

    const zoomLayer    = svg.append('g').attr('class','zoom')

    /* ── depth haze: a faint nebula that drifts behind everything ──────
       It is an ANNULUS, not a blob. A centre-bright nebula puts the sky's
       highest value exactly where the content is, so the field reads as
       mud-on-mist; the glow belongs out at the limb with the middle of the
       sky falling away to black. The peak sits at ~62% of this (deliberately
       oversized, off-centre) ellipse, so the bright band rides near the frame
       edge and drifts asymmetrically. */
    const hazeLayer = zoomLayer.append('g').attr('class','haze-layer')
    const hazeGrad = defs.append('radialGradient').attr('id', 'haze-grad')
      .attr('cx', '50%').attr('cy', '50%').attr('r', '50%')
    hazeGrad.append('stop').attr('offset', '0%').attr('stop-color', '#0a0f1c').attr('stop-opacity', 0)
    hazeGrad.append('stop').attr('offset', '44%').attr('stop-color', '#141a2c').attr('stop-opacity', 0)
    hazeGrad.append('stop').attr('offset', '62%').attr('stop-color', '#2a1a3a').attr('stop-opacity', 0.30)
    hazeGrad.append('stop').attr('offset', '78%').attr('stop-color', '#1a2436').attr('stop-opacity', 0.20)
    hazeGrad.append('stop').attr('offset', '100%').attr('stop-color', '#06080e').attr('stop-opacity', 0)
    hazeLayer.append('ellipse')
      .attr('class', 'depth-haze')
      .attr('cx', W * 0.55).attr('cy', H * 0.45)
      .attr('rx', W * 0.7).attr('ry', H * 0.6)
      .attr('fill', 'url(#haze-grad)')
      .attr('opacity', 0.55)

    /* background stars sit inside their own slow-drift wrapper so they
       move at a different speed from the constellation field — parallax depth */
    const bgDrift      = zoomLayer.append('g').attr('class','bg-drift')
    const bgLayer      = bgDrift.append('g').attr('class','bg')
    /* the dome's limb glow lives HERE, not with the rest of the dome furniture
       inside float-x, for one reason: float-x is a stacking context (it is
       `will-change: transform`), and a screen blend inside it can only reach
       its own siblings — not the starfield. Out here it composites additively
       over the stars, which is what makes it read as atmosphere rather than a
       blue film laid across them. It is populated in the dome block below,
       once DOME geometry exists; the layer is created now for z-order. */
    const limbLayer    = zoomLayer.append('g').attr('class','limb-layer').attr('pointer-events','none')
    /* celestial-rotate wraps the entire constellation field in a very slow
       rotation (~3° over 2 min) so the sky feels alive even untouched.
       The bg stars drift on a DIFFERENT period (bg-drift), creating a
       two-layer parallax: background lags behind foreground. */
    const celestialRotate = zoomLayer.append('g').attr('class','celestial-rotate')
    const floatYLayer  = celestialRotate.append('g').attr('class','float-y')
    const floatXLayer  = floatYLayer.append('g').attr('class','float-x')
    const domeLayer    = floatXLayer.append('g').attr('class','dome-grid').attr('pointer-events','none')
    const catHaloLayer = floatXLayer.append('g').attr('class','cat-halos').attr('pointer-events','none')
    const clusterLayer = floatXLayer.append('g').attr('class','clusters')
    const linkLayer    = floatXLayer.append('g').attr('class','links')
    /* residues holds what the ambient lineage traces leave behind — one faint
       thread per descent, kept OUTSIDE traceLayer because the path-finder
       clears that layer wholesale and the accumulated web has to survive it. */
    const residueLayer = floatXLayer.append('g').attr('class','residues').attr('pointer-events','none')
    const traceLayer   = floatXLayer.append('g').attr('class','traces')
    const linkLabelLayer = floatXLayer.append('g').attr('class','link-labels')
    const nodeLayer    = floatXLayer.append('g').attr('class','nodes')

    /* enriched background starfield — three tiers:
       1. faint dust (many tiny dots, low opacity) for depth
       2. mid-field stars (varied sizes, warm/cool tint)
       3. bright flares (large blurred halos that twinkle)
       Size/brightness peak in an ANNULUS around the dome's limb, not at the
       centre: the middle of the sky is the darkest part of the frame so the
       node field reads light-on-dark. `rimBias` peaks at ρ≈0.34 of the star
       field's radius — where the dome horizon falls — and reaches zero at
       dead centre. */
    let _s = 7
    const rnd = () => { _s = (_s * 1103515245 + 12345) & 0x7fffffff; return _s / 0x7fffffff }
    const big = Math.max(W, H) * 2.2
    const TINTS = ['#d6dce8', '#c8c0b8', '#b8c4d8', '#e0d8c8', '#c0c8d6', '#d8ccc0']
    const starData = d3.range(420).map(() => {
      const x = -big * 0.3 + rnd() * big
      const y = -big * 0.3 + rnd() * big
      const distFromCenter = Math.sqrt((x - W/2)**2 + (y - H/2)**2) / (big * 0.5)
      const rimBias = Math.max(0, 1 - Math.abs(distFromCenter - 0.34) / 0.30)
      const r = 0.25 + rnd() * 0.6 + rimBias * rnd() * 0.9
      const o = 0.12 + rnd() * 0.3 + rimBias * rnd() * 0.32
      const tint = TINTS[Math.floor(rnd() * TINTS.length)]
      return { x, y, r, o, tint }
    })
    const flareStars = starData.filter(d => d.o > 0.48)

    /* Soft-glow gradients for the flare blooms. Each flare used to be an
       feGaussianBlur (`url(#glow)`) — a per-pixel convolution ~70× over, all
       twinkling at once, which was the heaviest always-on raster cost. A radial
       gradient fill rasterizes as a plain gradient (near-free) and reads the
       same at flare scale. One gradient per tint so each keeps its colour. */
    TINTS.forEach((t, i) => {
      const g = defs.append('radialGradient').attr('id', `flare-${i}`)
      g.append('stop').attr('offset', '0%').attr('stop-color', t).attr('stop-opacity', 1)
      g.append('stop').attr('offset', '35%').attr('stop-color', t).attr('stop-opacity', 0.55)
      g.append('stop').attr('offset', '100%').attr('stop-color', t).attr('stop-opacity', 0)
    })

    bgLayer.selectAll('circle.flare')
      .data(flareStars)
      .join('circle')
      .attr('class', 'flare')
      .attr('cx', d => d.x).attr('cy', d => d.y)
      .attr('r',    d => d.r * 5.5)
      .attr('fill', d => `url(#flare-${TINTS.indexOf(d.tint)})`)
      .style('--flare-peak',  d => (0.28 + d.o * 0.55).toFixed(2))
      .style('--flare-dur',   () => `${(1.5 + rnd() * 2.0).toFixed(2)}s`)
      .style('--flare-delay', () => `-${(rnd() * 6).toFixed(2)}s`)

    bgLayer.selectAll('circle.star')
      .data(starData)
      .join('circle')
      .attr('class', d => 'star' + (rnd() < 0.15 ? ' star-shimmer' : ''))
      .attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => d.r)
      .attr('fill', d => d.tint).attr('opacity', d => d.o)
      .filter('.star-shimmer')
      .style('--shimmer-base', d => d.o.toFixed(3))
      .style('--shimmer-dur', () => `${(3 + rnd() * 4).toFixed(2)}s`)
      .style('--shimmer-delay', () => `-${(rnd() * 7).toFixed(2)}s`)

    /* ── shooting stars: a rare meteor every 20-40s ─────────────── */
    const meteorLayer = bgDrift.append('g').attr('class', 'meteors')
    let _meteorTimer = null
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function spawnMeteor() {
      if (document.hidden || reduced) {
        _meteorTimer = setTimeout(spawnMeteor, 5000)
        return
      }
      const delay = 20000 + Math.random() * 20000
      _meteorTimer = setTimeout(() => {
        const edge = Math.floor(Math.random() * 4)
        let sx, sy, angle
        if (edge === 0) { sx = Math.random() * big; sy = -big * 0.2; angle = 0.3 + Math.random() * 0.5 }
        else if (edge === 1) { sx = big; sy = Math.random() * big * 0.5; angle = Math.PI * 0.55 + Math.random() * 0.4 }
        else if (edge === 2) { sx = Math.random() * big; sy = big * 0.8; angle = -0.5 + Math.random() * 0.3 }
        else { sx = -big * 0.15; sy = Math.random() * big * 0.4; angle = -0.2 + Math.random() * 0.4 }
        const len = 80 + Math.random() * 160
        const ex = sx + Math.cos(angle) * len
        const ey = sy + Math.sin(angle) * len
        const grad = defs.append('linearGradient')
          .attr('id', 'mg-' + Date.now())
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', sx).attr('y1', sy).attr('x2', ex).attr('y2', ey)
        grad.append('stop').attr('offset', '0%').attr('stop-color', '#fff').attr('stop-opacity', 0)
        grad.append('stop').attr('offset', '40%').attr('stop-color', '#e8dcc8').attr('stop-opacity', 0.7)
        grad.append('stop').attr('offset', '100%').attr('stop-color', '#fff').attr('stop-opacity', 0.9)
        const gId = grad.attr('id')
        const line = meteorLayer.append('line')
          .attr('x1', sx).attr('y1', sy).attr('x2', sx).attr('y2', sy)
          .attr('stroke', `url(#${gId})`)
          .attr('stroke-width', 1.2 + Math.random() * 0.8)
          .attr('stroke-linecap', 'round')
          .attr('opacity', 0)
        const dur = 350 + Math.random() * 250
        line.transition().duration(dur * 0.15).attr('opacity', 0.8)
          .transition().duration(dur)
          .attr('x1', ex).attr('y1', ey)
          .attr('x2', ex + Math.cos(angle) * len * 0.4)
          .attr('y2', ey + Math.sin(angle) * len * 0.4)
          .transition().duration(dur * 0.3)
          .attr('opacity', 0)
          .on('end', () => { line.remove(); grad.remove() })
        spawnMeteor()
      }, delay)
    }
    spawnMeteor()

    /* ── celestial dome ────────────────────────────────────────────
       The field is shaped into an elliptical "sky disc" so the start page
       reads as a night sky projected on a sphere: anchors are remapped onto
       the disc, a soft containment force keeps the silhouette circular, and
       after the pre-settle a gentle fisheye bake bulges the centre and
       compresses the rim like a star globe seen face-on. */
    const DOME = { cx: W / 2, cy: H / 2, rx: W * 0.465, ry: H * 0.47 }
    /* normalized ellipse-metric distance from dome centre: 1 = on the horizon */
    const domeRho = (x, y) => Math.hypot((x - DOME.cx) / DOME.rx, (y - DOME.cy) / DOME.ry)
    /* fisheye strength of that bake (applied far below, after the pre-settle).
       Declared up here because the collide force has to undo it — see
       `bakeScaleAt` in the simulation block. */
    const DOME_A = 1.15

    /* remap category anchors: uniformly scale the anchor constellation about
       the dome centre so the outermost anchor lands at ρ ≈ 0.8 — clusters keep
       their relative arrangement but settle inside the disc, not a rectangle */
    const maxAnchorRho = Math.max(...Object.values(ANCHOR).map(([fx, fy]) => domeRho(fx * W, fy * H)))
    const anchorScale = maxAnchorRho > 0 ? 0.8 / maxAnchorRho : 1
    const DOME_ANCHOR = Object.fromEntries(Object.entries(ANCHOR).map(([c, [fx, fy]]) => [c, [
      (DOME.cx + (fx * W - DOME.cx) * anchorScale) / W,
      (DOME.cy + (fy * H - DOME.cy) * anchorScale) / H,
    ]]))

    /* dome furniture — planisphere-style celestial grid behind the field:
       a limb glow, a core shade, concentric declination rings, meridian
       spokes, a whispered horizon ring with degree ticks, and a tilted dashed
       ecliptic.

       THE HORIZON IS THE LIMB GLOW, not the ring. The boundary is a bright
       band that fades outward to nothing and inward into the core shade — no
       edge exists at any radius, and the sphere still ends somewhere you can
       point to. The ring is held at 0.05 for that reason.

       VALUE STRUCTURE — the dome is lit from its RIM, not its centre. The
       sky's brightest band sits just outside the horizon and the core falls
       away toward black, so every node is a light mark on a dark ground.
       (The inverse — a glowing centre — puts the field's own values below
       their backdrop and the content sinks into a hole.) The two elements
       below carry it: `dome-limb` is the atmosphere behind the ellipse,
       `dome-core` is the well it surrounds. Both live under the grid lines,
       the links and the nodes, so only the sky is affected. */
    {
      const { cx, cy, rx, ry } = DOME
      const GRID = 'rgb(130,155,205)'

      /* limb glow: THE horizon. Not a halo behind a drawn ring — the boundary
         itself, carried entirely by a gradient that peaks ON the horizon and
         falls to nothing in both directions. There is no edge anywhere in it,
         yet the eye reads exactly where the sphere ends, because a band of
         light is a boundary just as legibly as a line is.
         (Same reasoning as `.glow` on a node: a stroke or a hard-edged fill at
         this scale is a bezel, and a bezel announces the drawing instead of
         the sphere. See the ring below, now near-zero.)

         Drawn on an ellipse 1.22× the dome so the gradient has room to fall
         off outward — the outer tail clips at the frame edge on the sides the
         resting camera already bleeds off, and runs out into open void at the
         top-left, which is where the fade is actually read. Goes into
         `limbLayer` (outside float-x) so it can screen-blend over the stars. */
      const RIM = 1.22
      /* the horizon sits at offset 1/RIM ≈ 82% — the peak is pinned there.

         AMPLITUDE IS CALIBRATED TO THE ZODIAC SPHERE, deliberately. That view
         builds a boundary with no glow and no ring at all: a feathered mask
         (opaque to 68%, .45 at 88%, 0 at 100%) over a disc whose entire lift
         above the page background is #111828 over #06090f — about +11,+15,+25
         of 255. The sphere ends because its contents dissolve, and that is
         enough. So the peak here screens a *desaturated* navy at 0.30, which
         adds ≈ +11,+15,+23 — the same delta, matched on purpose.
         The band does not need to be bright, because it is not lighting the
         sky; it is the inflection between two darker zones. The core shade
         sinks everything inside it, the frame vignette sinks everything
         outside it, and `rimBias` peaks the starfield at this same radius. Four
         things agree on where the horizon is, so the band only has to whisper.
         Don't push these stops back up to read it on a bright monitor — a
         saturated blue band at 0.5 becomes atmosphere with a colour, which is
         a weather effect, not a limb. */
      const limbGrad = defs.append('radialGradient').attr('id', 'dome-limb-glow')
        .attr('cx', '50%').attr('cy', '50%').attr('r', '50%')
      limbGrad.append('stop').attr('offset', '0%').attr('stop-color', '#141c2c').attr('stop-opacity', 0)
      limbGrad.append('stop').attr('offset', '58%').attr('stop-color', '#141c2c').attr('stop-opacity', 0)
      limbGrad.append('stop').attr('offset', '68%').attr('stop-color', '#1a2338').attr('stop-opacity', 0.04)
      limbGrad.append('stop').attr('offset', '74%').attr('stop-color', '#1f2942').attr('stop-opacity', 0.11)
      limbGrad.append('stop').attr('offset', '78%').attr('stop-color', '#232e49').attr('stop-opacity', 0.20)
      limbGrad.append('stop').attr('offset', '82%').attr('stop-color', '#26324c').attr('stop-opacity', 0.30)
      limbGrad.append('stop').attr('offset', '86%').attr('stop-color', '#232e46').attr('stop-opacity', 0.24)
      limbGrad.append('stop').attr('offset', '90%').attr('stop-color', '#1e2740').attr('stop-opacity', 0.15)
      limbGrad.append('stop').attr('offset', '94%').attr('stop-color', '#1b1e35').attr('stop-opacity', 0.08)
      limbGrad.append('stop').attr('offset', '97%').attr('stop-color', '#181829').attr('stop-opacity', 0.03)
      limbGrad.append('stop').attr('offset', '100%').attr('stop-color', '#16162a').attr('stop-opacity', 0)
      limbLayer.append('ellipse')
        .attr('class', 'dome-limb')
        .attr('cx', cx).attr('cy', cy).attr('rx', rx * RIM).attr('ry', ry * RIM)
        .attr('fill', 'url(#dome-limb-glow)')

      /* core shade: near-black poured into the middle of the disc, fading to
         nothing by the horizon. It sits above the background starfield, so it
         also sinks the stars behind the content — the centre is meant to read
         as depth, not as a field of competing points. */
      const coreGrad = defs.append('radialGradient').attr('id', 'dome-core-shade')
        .attr('cx', '50%').attr('cy', '50%').attr('r', '50%')
      coreGrad.append('stop').attr('offset', '0%').attr('stop-color', '#01030a').attr('stop-opacity', 0.86)
      coreGrad.append('stop').attr('offset', '38%').attr('stop-color', '#01030a').attr('stop-opacity', 0.72)
      coreGrad.append('stop').attr('offset', '68%').attr('stop-color', '#02040c').attr('stop-opacity', 0.38)
      coreGrad.append('stop').attr('offset', '88%').attr('stop-color', '#03050e').attr('stop-opacity', 0.10)
      coreGrad.append('stop').attr('offset', '100%').attr('stop-color', '#04060f').attr('stop-opacity', 0)
      domeLayer.append('ellipse')
        .attr('class', 'dome-core')
        .attr('cx', cx).attr('cy', cy).attr('rx', rx).attr('ry', ry)
        .attr('fill', 'url(#dome-core-shade)')

      /* declination rings — inner rings are lifted to compensate for the core
         shade underneath them; without it the innermost ring reads at almost
         the same value as the near-black it crosses and the grid dissolves */
      for (const k of [0.35, 0.62, 0.85]) {
        domeLayer.append('ellipse')
          .attr('cx', cx).attr('cy', cy).attr('rx', rx * k).attr('ry', ry * k)
          .attr('fill', 'none').attr('stroke', GRID)
          .attr('stroke-width', 0.6).attr('opacity', 0.10 + (0.85 - k) * 0.12)
      }

      /* meridian spokes — from the inner ring out to the horizon */
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2
        domeLayer.append('line')
          .attr('x1', cx + Math.cos(a) * rx * 0.35).attr('y1', cy + Math.sin(a) * ry * 0.35)
          .attr('x2', cx + Math.cos(a) * rx).attr('y2', cy + Math.sin(a) * ry)
          .attr('stroke', GRID).attr('stroke-width', 0.5).attr('opacity', 0.075)
      }

      /* horizon ring — near zero, and no under-glow at all. The limb gradient
         above IS the horizon now; a line drawn on top of it re-supplies the
         hard edge the band exists to avoid, and (as with the primary's core
         pip) that edge reads as a bezel around the sphere however soft the
         light behind it is. What survives is 0.03 of a hairline: enough that
         the band has a locus at very close range, not enough to be seen as a
         drawn circle. The blurred 2.4px under-glow is gone outright — a blur
         held at 0.12 is fog, and the gradient covers that job across 250px
         instead of 3. Don't restore either one.

         0.03 is tied to the band's amplitude, not chosen for itself: GRID at
         0.05 adds ~+7 of 255, a quarter of the band's whole peak concentrated
         into one pixel, so on a Zodiac-calibrated band the line was reading
         *louder* than the horizon it sits on. Raise the band and this can rise
         with it; leave the band quiet and this stays inaudible. */
      domeLayer.append('ellipse')
        .attr('cx', cx).attr('cy', cy).attr('rx', rx).attr('ry', ry)
        .attr('fill', 'none').attr('stroke', GRID)
        .attr('stroke-width', 1).attr('opacity', 0.03)
      /* degree ticks — radial, so they mark the boundary without closing it
         into a line. Dimmed with the ring: at their old values 36 strokes on a
         vanished ring read as a dashed bezel, which is the same edge by
         another name. Here they are a fringe in the band. */
      for (let i = 0; i < 36; i++) {
        const a = (i / 36) * Math.PI * 2
        const major = i % 3 === 0
        domeLayer.append('line')
          .attr('x1', cx + Math.cos(a) * rx * (major ? 0.975 : 0.985))
          .attr('y1', cy + Math.sin(a) * ry * (major ? 0.975 : 0.985))
          .attr('x2', cx + Math.cos(a) * rx * 1.012)
          .attr('y2', cy + Math.sin(a) * ry * 1.012)
          .attr('stroke', GRID).attr('stroke-width', major ? 0.9 : 0.5)
          .attr('opacity', major ? 0.07 : 0.035)
      }

      /* ecliptic — the sun's path, a tilted dashed gold band */
      domeLayer.append('ellipse')
        .attr('cx', cx).attr('cy', cy).attr('rx', rx * 0.97).attr('ry', ry * 0.34)
        .attr('transform', `rotate(-16 ${cx} ${cy})`)
        .attr('fill', 'none').attr('stroke', '#cdb88a')
        .attr('stroke-width', 0.7).attr('stroke-dasharray', '4 8').attr('opacity', 0.17)
    }

    /* initial positions — cluster anchors + jitter */
    nodes.forEach(n => {
      const a = DOME_ANCHOR[n.category] || [0.5, 0.5]
      n.ax = a[0]; n.ay = a[1]
      n.x  = a[0] * W + (Math.random() - 0.5) * 120
      n.y  = a[1] * H + (Math.random() - 0.5) * 120
    })

    /* cluster-pull force */
    function clusterForce(strength) {
      let ns
      function force(alpha) {
        const k = strength * alpha
        for (const n of ns) { n.vx += (n.ax * W - n.x) * k; n.vy += (n.ay * H - n.y) * k }
      }
      force.initialize = _ => (ns = _)
      return force
    }

    /* dome containment — nodes drifting past the horizon (ρ > 0.92) get a
       soft linear pull back toward the centre, keeping the field's silhouette
       an ellipse rather than the charge force's rectangle-filling spread */
    function domeForce(strength) {
      let ns
      function force(alpha) {
        const k = strength * alpha
        for (const n of ns) {
          const rho = domeRho(n.x, n.y)
          if (rho <= 0.92) continue
          const f = (rho - 0.92) / rho * k
          n.vx -= (n.x - DOME.cx) * f
          n.vy -= (n.y - DOME.cy) * f
        }
      }
      force.initialize = _ => (ns = _)
      return force
    }

    /* ── simulation ─────────────────────────────────────────────── */
    /* Personal space per tier. The old flat +26 was label clearance for a
       field where every node was roughly one size; with a 13x spread between
       a primary and a tail dot it has to follow the glyph, or the primaries
       have no room to stand and the tail wastes the space they need.
       Both forces measure `bodyR`, not `radius` — a primary's star is 32px
       but the art on it is 46, so spacing computed off the core let Typhon's
       and Echidna's portraits sit inside each other while the simulation
       considered them a comfortable 30px apart. */
    const COLLIDE_PAD = { 1: 18, 2: 20, 3: 13 }
    const spaceFor = d => bodyR(d) + COLLIDE_PAD[d.tier]

    /* The spherical bake below is not a uniform scale, and the pads above are
       written in the screen space that comes out the far side of it. Radially
       it multiplies spacing by dρ'/dρ = A·cos(ρA)/sin(A) — 1.26x at the centre
       but 0.76x at ρ 0.8 and 0.64x at 0.9 — so a gap the simulation satisfies
       exactly out in the monster/sea pocket arrives on screen a fifth to a
       third short. That is the whole of the residual overlap: measured by
       inverting the bake, every offending pair is `simSatisfied: true` at
       110.6px against 110.7 required, then squeezed to 88 (Typhon/Echidna),
       50 (Echidna/Chimera), 21 (Sphinx/Hector). Dividing the collide radius
       by the local radial scale asks the sim for the pre-bake gap that lands
       on the intended one — tighter at the centre, wider at the rim, uniform
       once baked. Radial (not tangential, which the bake *expands* by
       sin(ρA)/ρsin(A)) because a circle can only carry one and the
       compressive axis is the one that collides. */
    const bakeScaleAt = (x, y) => {
      const rho = Math.min(domeRho(x, y), 1)
      return Math.max(0.5, DOME_A * Math.cos(rho * DOME_A) / Math.sin(DOME_A))
    }
    const sim = d3.forceSimulation(nodes)
      .force('link',    d3.forceLink(links).id(d => d.id)
        .distance(l => 52 + (bodyR(l.source) + bodyR(l.target)) * 0.55).strength(0.23))
      .force('charge',  d3.forceManyBody().strength(-250).distanceMax(480))
      .force('cluster', clusterForce(0.065))
      .force('dome',    domeForce(0.6))
      .force('collide', d3.forceCollide().radius(spaceFor).strength(0.92))
      .alpha(1).alphaDecay(0.028)

    /* ── links ──────────────────────────────────────────────────── */
    const NEUTRAL_EDGE = 'oklch(0.45 0.005 270)'
    const linkSel = linkLayer.selectAll('path').data(links).join('path')
      .attr('class', 'link')
      .attr('stroke', NEUTRAL_EDGE)
      .attr('stroke-width', 0.7)
      .attr('stroke-linecap', 'round')
      .attr('fill', 'none')
      .attr('opacity', 0)
      .attr('data-type-color', d => LCOL[d.type] || '#555')
      .attr('data-type-dash', d => LINK_DASH[d.type] || '')

    /* ── cluster labels ─────────────────────────────────────────── */
    const cats       = [...new Set(nodes.map(n => n.category))]
    const clusterSel = clusterLayer.selectAll('text').data(cats).join('text')
      .attr('class', 'cluster-label')
      .attr('text-anchor', 'middle')
      .attr('opacity', 0)
      .style('fill', c => CAT[c])
      .text(c => CAT_LABEL[c] || c)

    /* Densest-sub-blob anchoring + mutual de-collision (computed every tick,
       cheap — see below). Several categories are spatially multi-modal (e.g.
       `chthonic`: Hades sits among the Olympians while the dream-gods cluster
       by Nyx), so a plain centroid lands the label in empty space between the
       two groups. Instead each label anchors over its category's main mass —
       the member with the most same-category neighbours within CLUSTER_R, plus
       that blob — then overlapping label boxes are separated with a spring
       back to their anchor so de-collision can't carry a label away from the
       cluster it names. */
    const CLUSTER_R = 95
    const LABEL_PAD = 16, LABEL_H = 24
    const labelSize = new Map()
    clusterSel.each(function(c) {
      labelSize.set(c, { w: this.getComputedTextLength() + LABEL_PAD, h: LABEL_H })
    })
    const labelPos  = new Map()
    const labelDim  = new Map()   // category -> still overlapping a portrait after the relax
    const catNodes  = new Map(cats.map(c => [c, nodes.filter(n => n.category === c)]))
    /* Dimmed labels fall to this fraction of whatever opacity the zoom level
       (or the ignition wave-in) would otherwise give them — routing failed
       to clear a dense pocket, so the label steps back rather than sitting
       on the portrait at full brightness. */
    const LABEL_DIM_FACTOR = 0.35
    const labelOpacity = (c, base) => base * (labelDim.get(c) ? LABEL_DIM_FACTOR : 1)

    /* ── category territory halos ───────────────────────────────────
       A soft radial colour field behind each cluster, tinted with the
       family colour, so every category occupies its own glowing region of
       sky. Geometry (centre + radius) is recomputed from each category's
       node spread alongside the cluster labels; `screen` blending lets
       overlapping fields add luminously rather than muddy out.

       Kept deliberately faint. These fields land directly behind the nodes,
       so every point of opacity here is a point of contrast taken away from
       the figures standing on them — a halo bright enough to be read as
       colour on its own is bright enough to turn its own cluster to mud.
       Against the darkened core they now read at roughly half the alpha. */
    cats.forEach(c => {
      const g = defs.append('radialGradient').attr('id', `cat-halo-${c}`)
      g.append('stop').attr('offset', '0%').attr('stop-color', CAT[c]).attr('stop-opacity', 0.12)
      g.append('stop').attr('offset', '55%').attr('stop-color', CAT[c]).attr('stop-opacity', 0.045)
      g.append('stop').attr('offset', '100%').attr('stop-color', CAT[c]).attr('stop-opacity', 0)
    })
    const haloSel = catHaloLayer.selectAll('ellipse').data(cats).join('ellipse')
      .attr('class', 'cat-halo')
      .attr('fill', c => `url(#cat-halo-${c})`)

    /* ── per-node glow gradients ────────────────────────────────────
       The star's glow has to be a real falloff, not a flat disc.
       It used to be a solid `CAT[c]` fill softened only by the shared
       3.2px `#glow` blur — which is a glow on a 3.4px tail dot and a
       hard-edged circle on a 44px primary, where 3px of feather is 7%
       of the radius. And the filter was only attached above prom 0.65,
       so a hub like Hera (0.638) drew a crisp coloured disc ~140px
       across that swallowed her neighbours and collided with Zeus's.
       An objectBoundingBox gradient scales with `r` for free, so the
       same falloff holds from the tail dot to a nova'd primary. */
    cats.forEach(c => {
      const g = defs.append('radialGradient').attr('id', `node-glow-${c}`)
      g.append('stop').attr('offset', '0%').attr('stop-color', CAT[c]).attr('stop-opacity', 1)
      g.append('stop').attr('offset', '32%').attr('stop-color', CAT[c]).attr('stop-opacity', 0.58)
      g.append('stop').attr('offset', '64%').attr('stop-color', CAT[c]).attr('stop-opacity', 0.19)
      g.append('stop').attr('offset', '100%').attr('stop-color', CAT[c]).attr('stop-opacity', 0)
    })

    function updateCatHalos() {
      for (const c of cats) {
        const ms = catNodes.get(c)
        if (!ms || !ms.length) continue
        const cx = d3.mean(ms, n => n.x), cy = d3.mean(ms, n => n.y)
        let maxd = 0
        for (const n of ms) {
          const dx = n.x - cx, dy = n.y - cy
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > maxd) maxd = d
        }
        const r = Math.max(maxd + 75, 95)
        haloSel.filter(d => d === c)
          .attr('cx', cx).attr('cy', cy).attr('rx', r).attr('ry', r * 0.82)
      }
    }

    /* ── nodes ──────────────────────────────────────────────────── */
    /* Labels follow the tiers: only the 12 primaries are labelled at rest.
       Secondaries appear at #sky.zoomed-mid, the tail only at #sky.zoomed-in
       — so the resting field carries a dozen names, not a hundred, and zoom
       is what buys detail. Hover and selection override all of it (CSS). */
    const gNode = nodeLayer.selectAll('g').data(nodes).join('g')
      .attr('class', 'node')
      .classed('tier-1',  d => d.tier === 1)
      .classed('tier-2',  d => d.tier === 2)
      .classed('tier-3',  d => d.tier === 3)
      .classed('nolabel', d => d.degree === 0)
      .style('cursor', 'pointer')
      .on('click',      (e, d) => { e.stopPropagation(); api.select(d.id, true) })
      .on('mouseenter', (e, d) => hoverOn(d))
      .on('mouseleave', ()     => hoverOff())
      .call(d3.drag()
        .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.18).restart(); d.fx = d.x; d.fy = d.y })
        .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; d.x = e.x; d.y = e.y; ticked() })
        .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null }))

    /* ── keyboard operability (roving tabindex) ──────────────────────────
       139 stars in the tab order would be unusable, so exactly ONE is tabbable
       at a time — the field's biggest hub to start with, then whichever star
       was last reached. Arrow keys move that single stop to the nearest star in
       the pressed direction, Enter/Space opens it, Escape clears. Selecting by
       mouse or search keeps the stop in sync (see `api.select`), so tabbing
       back into the map lands where the viewer actually is. */
    const _topHubId = nodes.reduce((a, b) => (b.degree > (a?.degree ?? -1) ? b : a), null)?.id
    gNode
      .attr('tabindex',   d => d.id === _topHubId ? 0 : -1)
      .attr('role',       'button')
      .attr('aria-label', d => d.epithet ? `${d.name} — ${d.epithet}` : d.name)
      .on('keydown', onNodeKey)

    function setRoving(id, doFocus) {
      if (!id) return
      gNode.attr('tabindex', n => n.id === id ? 0 : -1)
      if (doFocus) gNode.filter(n => n.id === id).node()?.focus()
    }
    const _DIRS = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }
    function nearestInDirection(d, vx, vy) {
      let best = null, bestScore = Infinity
      for (const n of nodes) {
        if (n === d) continue
        const dx = n.x - d.x, dy = n.y - d.y
        const dist = Math.hypot(dx, dy) || 1
        const dot = (dx * vx + dy * vy) / dist        // alignment with the pressed direction
        if (dot < 0.5) continue                       // keep to a ~60° cone
        const score = dist / dot                      // prefer close and well-aligned
        if (score < bestScore) { bestScore = score; best = n }
      }
      return best
    }
    function onNodeKey(e, d) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); api.select(d.id, true) }
      else if (e.key === 'Escape') { api.clearSelection() }
      else if (_DIRS[e.key]) {
        e.preventDefault()
        const [vx, vy] = _DIRS[e.key]
        const nb = nearestInDirection(d, vx, vy)
        if (nb) setRoving(nb.id, true)
      }
    }

    /* hub breathing — the top ~5 nodes are gravitational centers; they get a
       dedicated slow pulse (radius + opacity over ~4s) that reads as a beacon
       even before any interaction. Separate from the general twinkle. */
    const hubBreathThreshold = promRank[Math.min(5, promRank.length - 1)] || 0.6

    /* No `filter` here any more: the gradient IS the softness, so the glow
       reads the same at every radius instead of depending on a fixed-pixel
       blur that only some nodes were even given. That also drops a
       per-pixel convolution from ~137 nodes. */
    gNode.append('circle').attr('class','glow')
      .attr('r',        d => radius(d) * GLOW_R)
      .attr('fill',     d => `url(#node-glow-${d.category})`)
      .attr('opacity',  d => 0.07 + d.prom * 0.14)
      .classed('hub-breath', d => d.prom >= hubBreathThreshold)
      .style('--glow-base',     d => (0.07 + d.prom * 0.14).toFixed(3))
      .style('--glow-r',        d => (radius(d) * GLOW_R).toFixed(1))
      .style('--glow-r-peak',   d => (radius(d) * GLOW_R_PEAK).toFixed(1))
      .style('--twinkle-dur',   () => `${(4.5 + rnd() * 4.5).toFixed(2)}s`)
      .style('--twinkle-delay', () => `-${(rnd() * 7).toFixed(2)}s`)
      .style('--breath-dur',    () => `${(3.5 + rnd() * 1.5).toFixed(2)}s`)
      .style('--breath-delay',  () => `-${(rnd() * 5).toFixed(2)}s`)

    /* gold selection bloom — a blurred gold disc BEHIND the star, invisible
       until the node has `.selected` (or `.route`). It back-lights the
       portrait so gold leaks through the fading edges as a rim-light aura —
       the frameless replacement for the old stroked selection ring. */
    gNode.append('circle').attr('class','sel-halo')
      .attr('r',       d => radius(d) * 1.45)
      .attr('fill',    '#cdb88a')
      .attr('filter',  'url(#glow)')
      .attr('opacity', 0)

    /* the core. For the secondaries and the tail — which show NO portrait at
       rest — it is a full-radius disc carrying a lot of the family colour;
       those saturated little discs are the most legible things on the field and
       do the identifying work portraits used to. A primary instead gets a `pip`
       at CORE_R (see above): the same near-white/gold mark the constellation
       stages use for a hero star (`.cl-core.hero`), so the same vocabulary
       stands for a figure on the map as in its tale. It stays under the
       portrait — the light the face is lit by, not a glint punched over it —
       and needs no prom ramp, since the tier's radius ramp already carries the
       size difference into the pip. */
    gNode.append('circle').attr('class','core')
      .classed('pip',  d => d.tier === 1)
      .attr('r',       d => coreRadius(d, radius(d)))
      .attr('fill',    d => d.tier === 1
        ? '#fff7e0'
        : `color-mix(in oklab, ${CAT[d.category]} 66%, #efe8d6)`)
      .attr('opacity', d => d.tier === 1 ? 1 : 0.92)

    /* head portrait — unframed. Drawn ~45% larger than the star and softened
       into the sky by a CSS radial-gradient mask (`.node image` in index.css;
       CSS masks re-rasterize at paint resolution, so the fade stays smooth at
       any zoom — an SVG objectBoundingBox mask pixelates when zoomed). The
       figure floats over its category-tinted core like an apparition — no
       circular crop or ring competing with the artwork. The `href` is set
       later by the bounded portrait queue, and only when the node's tier or an
       interaction calls for it.

       Tier 3 is skipped entirely: a portrait inside a 3.4px dot is an
       unreadable smudge, and 62 of them turn the tail into noise. Those
       figures keep their portrait where it can actually be seen — the
       DetailPanel — and stay plain dots on the map. */
    /* The 12 primaries draw at ~110-165 CSS px and are the faces the map is
       composed around, so they take the 360px crop. Everything in tier 2 draws
       at a fraction of that and takes the 192px one — same framing, a quarter
       of the bytes and of the decode. */
    const nodeVariant = d => mapPortraitVariant(d.id)

    gNode.filter(d => d.tier !== 3 && portraitEntries(d.id).length > 0).append('image')
      .attr('x',                  d => -radius(d) * IMG_SCALE)
      .attr('y',                  d => -radius(d) * IMG_SCALE)
      .attr('width',              d => radius(d) * 2 * IMG_SCALE)
      .attr('height',             d => radius(d) * 2 * IMG_SCALE)
      .attr('preserveAspectRatio','xMidYMid slice')
      /* invisible until an exact manifest entry loads — this also suppresses a
         broken-image glyph if a generated file is damaged after manifesting */
      .attr('opacity', 0)
      .on('load', function() {
        d3.select(this).attr('opacity', 0.95)
        finishPortraitRequest(this)
      })
      .on('error', function(_, d) {
        const el = d3.select(this)
        const chain = portraitSources(d.id, nodeVariant(d))
        const i = +(el.attr('data-fb') || 0) + 1
        el.attr('data-fb', i)
        if (i < chain.length) el.attr('href', chain[i])
        else {
          finishPortraitRequest(this)
          el.remove()
        }
      })

    /* Portrait scheduling is intentionally a level-of-detail system:
         - the 12 primaries are queued immediately, during the cosmogony;
         - secondaries load only on hover, selection, or when they enter a
           zoomed-in viewport, and not before the entrance ends;
         - the tail never receives a graph portrait.
       Four in flight is enough to fill faces quickly without releasing a burst
       of image decodes onto the main thread. A direct interaction moves an
       already-queued portrait to the front.

       The primaries are queued at the FOOT OF THE EFFECT, not from
       finishIgnition, because the cosmogony is a ~13.4s film (IGNITION_MS) with
       an idle network under it, and that used to be 13.4s in which not one
       image byte was requested — the first face then landed well after the sky
       did. Starting them at t=0 is invisible either way: the <image> holds
       opacity 0 until it loads, and its node is still dark for most of the
       film. Secondaries deliberately do NOT come forward with them (see
       loadVisibleSecondaryPortraits) — they would compete for the four slots
       against the faces the entrance is actually about to reveal. */
    const MAX_PORTRAIT_LOADS = 4
    const _portraitRequested = new Set()
    const _portraitShown = new Set()
    const _portraitQueue = []
    let _portraitActive = 0
    let _primariesQueued = false

    function pumpPortraitQueue() {
      while (_portraitActive < MAX_PORTRAIT_LOADS && _portraitQueue.length) {
        const d = _portraitQueue.shift()
        const src = portraitSources(d.id, nodeVariant(d))[0]
        const image = gNode.filter(n => n.id === d.id).select('image')
        if (!src || image.empty()) continue
        _portraitShown.add(d.id)
        _portraitActive++
        image.attr('data-loading', '1').attr('href', src)
      }
    }

    function finishPortraitRequest(element) {
      const image = d3.select(element)
      if (image.attr('data-loading') !== '1') return
      image.attr('data-loading', null)
      _portraitActive = Math.max(0, _portraitActive - 1)
      pumpPortraitQueue()
    }

    function showPortrait(d, urgent = false) {
      if (!d || d.tier === 3 || !portraitEntries(d.id).length) return
      if (_portraitRequested.has(d.id)) {
        if (urgent && !_portraitShown.has(d.id)) {
          const i = _portraitQueue.findIndex(n => n.id === d.id)
          if (i > 0) _portraitQueue.unshift(..._portraitQueue.splice(i, 1))
        }
        return
      }
      _portraitRequested.add(d.id)
      if (urgent) _portraitQueue.unshift(d)
      else _portraitQueue.push(d)
      pumpPortraitQueue()
    }

    /* Warm the DetailPanel's 820px hero while the viewer is still deciding.
       Clicking a star otherwise means ~225KB of silence before the figure
       appears, because the panel only starts that fetch once React has
       rendered it — and the head crop already on the node is a different
       image, not a smaller version of the same one, so it cannot stand in.

       Gated on DWELL, not on hover: pointer-crossing the field fires hoverOn
       for every node under the path, and speculating on each one would put
       megabytes of unwanted full-tier art on the wire. ~180ms of rest is the
       difference between passing over a star and looking at it. Deliberately
       outside the node-portrait queue — this is one image, it must not take a
       slot from the faces actually on screen, and the browser's own cache is
       what the panel will read it back out of. */
    const PREFETCH_DWELL_MS = 180
    let _prefetchTimer = null

    function cancelFullPrefetch() {
      clearTimeout(_prefetchTimer)
      _prefetchTimer = null
    }

    function prefetchFull(d) {
      cancelFullPrefetch()
      /* tier is irrelevant here: a tail dot has no portrait ON THE MAP but
         still opens the same panel, and is the case with nothing cached */
      if (!d) return
      _prefetchTimer = setTimeout(() => warmFullPortrait(d.id), PREFETCH_DWELL_MS)
    }

    function loadPrimaryPortraits() {
      if (_primariesQueued) return
      _primariesQueued = true
      nodes.filter(d => d.tier === 1).forEach(d => showPortrait(d))
    }

    /* `_ignitionDone`, not `_primariesQueued`: the primaries are now queued
       before the film starts, so the old flag no longer marks the end of the
       entrance. The parallax settle in phase 5 drives `zoom.transform` at
       k > 1, which reaches this handler — without the gate a secondary sweep
       would fire mid-film and take the queue slots. */
    function loadVisibleSecondaryPortraits(transform) {
      if (!_ignitionDone || transform.k <= 1) return
      const margin = 48
      const visible = nodes.filter(d => {
        if (d.tier !== 2 || _portraitRequested.has(d.id)) return false
        const x = transform.applyX(d.x), y = transform.applyY(d.y)
        return x >= -margin && x <= W + margin && y >= -margin && y <= H + margin
      })
      visible.sort((a, b) => {
        const ax = transform.applyX(a.x) - W / 2, ay = transform.applyY(a.y) - H / 2
        const bx = transform.applyX(b.x) - W / 2, by = transform.applyY(b.y) - H / 2
        return ax * ax + ay * ay - bx * bx - by * by
      })
      visible.forEach(d => showPortrait(d))
    }

    /* The name clears the PORTRAIT, not the star (`glyphR`) — offset off
       `radius` alone lands "Typhon" across the dragon's own face, since the
       art overhangs the core it is drawn on by 45%. */
    gNode.append('text').attr('class','node-label')
      .attr('x', d => glyphR(d) + 6).attr('y', 4)
      .text(d => d.name)

    /* ── label placement — avoid overlapping nearby nodes ─────── */
    function assignLabelSides() {
      const labelW = 60
      gNode.each(function (d) {
        const r = glyphR(d)
        let rightBlocked = false
        for (const other of nodes) {
          if (other.id === d.id) continue
          const dx = other.x - d.x, dy = other.y - d.y
          const ro = glyphR(other)
          if (dx > -ro && dx < r + labelW + ro && Math.abs(dy) < ro + 8) {
            rightBlocked = true
            break
          }
        }
        const side = rightBlocked ? -1 : 1
        d._labelSide = side
        const g = d3.select(this)
        g.select('.node-label')
          .attr('x', side > 0 ? r + 6 : -(r + 6))
          .attr('text-anchor', side > 0 ? 'start' : 'end')
      })
    }

    /* ── tick ───────────────────────────────────────────────────── */
    let _tickCount = 0

    function updateClusterLabels() {
      const anchor = new Map()
      for (const c of cats) {
        const ms = catNodes.get(c)
        if (!ms.length) continue
        let best = ms[0], bestCount = -1
        for (const m of ms) {
          let cnt = 0
          for (const n of ms) {
            if (n === m) continue
            const dx = n.x - m.x, dy = n.y - m.y
            if (dx * dx + dy * dy <= CLUSTER_R * CLUSTER_R) cnt++
          }
          if (cnt > bestCount) { bestCount = cnt; best = m }
        }
        const blob = ms.filter(n => {
          const dx = n.x - best.x, dy = n.y - best.y
          return dx * dx + dy * dy <= CLUSTER_R * CLUSTER_R
        })
        /* Set the label on the OUTER rim of its cluster, not on top of it.
           A label parked at the blob's centroid (or its top) inevitably sits on
           a member star — "OLYMPIANS" landing squarely on Helios. Instead we
           find the blob's centre, then push the label radially outward, away
           from the dome centre, just past the farthest member: it floats off
           the constellation's outer edge like a name set along an arc, and the
           stars themselves stay clear. */
        const bcx = d3.mean(blob, n => n.x), bcy = d3.mean(blob, n => n.y)
        let br = 0
        for (const n of blob) {
          const dx = n.x - bcx, dy = n.y - bcy
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > br) br = d
        }
        let ox = bcx - DOME.cx, oy = bcy - DOME.cy
        let ol = Math.hypot(ox, oy)
        if (ol < 1e-3) { ox = 0; oy = -1; ol = 1 }   // dead-centre cluster: park it above
        const off = br + 20
        /* clamp the outward push so a rim cluster's label doesn't sail past the
           dome horizon (and off the bled frame) — keep it inside ρ ≈ 0.94 */
        let lx = bcx + (ox / ol) * off, ly = bcy + (oy / ol) * off
        const rho = domeRho(lx, ly)
        if (rho > 0.94) {
          const s = 0.94 / rho
          lx = DOME.cx + (lx - DOME.cx) * s
          ly = DOME.cy + (ly - DOME.cy) * s
        }
        anchor.set(c, { x: lx, y: ly })
      }

      for (const c of cats) {
        if (!labelPos.has(c)) labelPos.set(c, { ...anchor.get(c) })
      }
      /* Portrait-bearing stars (tiers 1 and 2) are the field's landmarks — a
         band label must never sit on one (the "OLYMPIANS on Helios",
         "MONSTERS on Typhon" collision). We repel labels off them explicitly,
         since the label-vs-label pass below can't see nodes. Clearance uses
         the *portrait's* footprint (IMG_SCALE × radius), not the bare core
         radius — the collide-force clearance is right for star-vs-star
         spacing but under-covers the image, which visibly overhangs it. */
      const portraitNodes = nodes.filter(n => n.tier !== 3)
      for (let iter = 0; iter < 80; iter++) {
        let moved = false
        for (const c of cats) {
          const p = labelPos.get(c), a = anchor.get(c)
          const dx = (a.x - p.x) * 0.15, dy = (a.y - p.y) * 0.15
          if (Math.abs(dx) > 0.02 || Math.abs(dy) > 0.02) moved = true
          p.x += dx; p.y += dy
        }
        for (const c of cats) {
          const p = labelPos.get(c), b = labelSize.get(c)
          for (const n of portraitNodes) {
            const rr = glyphR(n) + 10
            const dx = p.x - n.x, dy = p.y - n.y
            const ox = b.w / 2 + rr - Math.abs(dx)
            const oy = b.h / 2 + rr - Math.abs(dy)
            if (ox > 0 && oy > 0) {
              moved = true
              if (ox < oy) p.x += (dx >= 0 ? ox : -ox)
              else         p.y += (dy >= 0 ? oy : -oy)
            }
          }
        }
        for (let i = 0; i < cats.length; i++) {
          for (let j = i + 1; j < cats.length; j++) {
            const pi = labelPos.get(cats[i]), pj = labelPos.get(cats[j])
            const bi = labelSize.get(cats[i]), bj = labelSize.get(cats[j])
            const dx = pj.x - pi.x, dy = pj.y - pi.y
            const ox = (bi.w + bj.w) / 2 - Math.abs(dx)
            const oy = (bi.h + bj.h) / 2 - Math.abs(dy)
            if (ox > 0 && oy > 0) {
              moved = true
              if (ox < oy) {
                const shift = ox / 2 * (Math.sign(dx) || 1)
                pi.x -= shift; pj.x += shift
              } else {
                const shift = oy / 2 * (Math.sign(dy) || 1)
                pi.y -= shift; pj.y += shift
              }
            }
          }
        }
        if (!moved) break
      }

      for (const c of cats) {
        const p = labelPos.get(c), b = labelSize.get(c)
        p.x = Math.min(Math.max(p.x, b.w / 2), W - b.w / 2)
        p.y = Math.min(Math.max(p.y, b.h / 2), H - b.h / 2)
      }

      /* A dense pocket (the monster/sea-deity tangle) can leave no position
         that clears every nearby portrait within 80 iterations — check what
         actually landed against the portraits' real footprint (no padding,
         unlike the repel pass above) and dim any label still sitting on one,
         instead of shipping a readable-on-paper position that isn't. */
      for (const c of cats) {
        const p = labelPos.get(c), b = labelSize.get(c)
        let dim = false
        for (const n of portraitNodes) {
          const rr = glyphR(n)
          const dx = p.x - n.x, dy = p.y - n.y
          if (b.w / 2 + rr - Math.abs(dx) > 0 && b.h / 2 + rr - Math.abs(dy) > 0) { dim = true; break }
        }
        labelDim.set(c, dim)
      }

      clusterSel.attr('x', c => labelPos.get(c).x).attr('y', c => labelPos.get(c).y)
    }

    /* edge curve path — a gentle quadratic bow so parallel relations don't
       overlap. Extracted so the full ticked() and hover's partial tickSubset()
       share one definition. */
    function edgePath(d) {
      const sx = d.source.x, sy = d.source.y, tx = d.target.x, ty = d.target.y
      const dx = tx - sx, dy = ty - sy
      const len = Math.sqrt(dx * dx + dy * dy) || 1
      const off = Math.min(len * 0.12, 14)
      const mx = (sx + tx) / 2 - (dy / len) * off
      const my = (sy + ty) / 2 + (dx / len) * off
      return `M${sx},${sy}Q${mx},${my} ${tx},${ty}`
    }

    function ticked() {
      linkSel.attr('d', edgePath)
      gNode.attr('transform', d => `translate(${d.x},${d.y})`)

      if (++_tickCount % 8 === 0) { updateClusterLabels(); updateCatHalos() }

      if (!linkLabelLayer.selectAll('text').empty()) positionEdgeLabels()
    }

    /* Pre-settle the layout off-screen, then STOP. Holding the sim "warm" used to
       rewrite every edge path + node transform on every frame, forever — that
       starved the main thread and made interaction janky. The layout is fixed
       after the pre-settle; gentle perpetual motion now comes from the GPU-cheap
       CSS float layers instead. A drag re-energises the sim; it then cools to rest. */
    sim.stop()
    for (let i = 0; i < 160; i++) sim.tick()

    /* Second pass: re-arm collide with bake-corrected radii and relax again.
       It has to be a second pass because `forceCollide` reads its radius
       accessor once, in initialize() — at that point every node is still at
       its random start position, so a ρ-dependent radius would be computed
       from noise. Re-setting the force re-initializes it, now against settled
       positions. Alpha is re-energised for it rather than left at the ~0.01
       it has decayed to: collide can only push apart, never draw together, so
       a pass with the other forces asleep is a one-way inflation — the field
       grew past the resting camera's fit, which pulled back, which shrank
       every glyph and dropped the tier-2 labels below their zoom threshold.
       With cluster/dome/link awake the correction stays redistributive, which
       is what it is: tighter at the centre, wider at the rim, uniform once
       baked. */
    sim.force('collide', d3.forceCollide()
      .radius(d => spaceFor(d) / bakeScaleAt(d.x, d.y)).strength(0.92))
    sim.alpha(0.4)
    for (let i = 0; i < 200; i++) sim.tick()

    /* spherical bake — remap the settled layout through a mild fisheye:
       ρ' = sin(ρA)/sin(A) expands the mid-field and compresses spacing toward
       the horizon, the signature foreshortening of a sphere seen face-on.
       Baked into d.x/d.y once so every downstream consumer (camera, labels,
       hover, drag) keeps working in a single coordinate space. */
    nodes.forEach(n => {
      const ex = (n.x - DOME.cx) / DOME.rx
      const ey = (n.y - DOME.cy) / DOME.ry
      const rho = Math.hypot(ex, ey)
      if (rho < 1e-6) return
      const warped = rho <= 1 ? Math.sin(rho * DOME_A) / Math.sin(DOME_A) : 1 + (rho - 1) * 0.3
      const s = warped / rho
      n.x = DOME.cx + ex * s * DOME.rx
      n.y = DOME.cy + ey * s * DOME.ry
    })

    /* ── portrait separation — the last word on overlap ──────────────
       The forces above reserve `bodyR` (the solid 80% of the box) in the
       PRE-bake space, and both of those are approximations: collide is a soft
       force at strength .92 in a field that is ~60% reserved area, and the
       bake correction is radial-only. Neither can promise anything about the
       rectangle the browser actually paints. So the final geometry gets one
       deterministic pass in the space the art is drawn in: no two portraits
       may come within SEP_GAP of each other, measured on `drawnR` — the
       LARGEST box a node ever draws, i.e. its selected size, so the guarantee
       holds through hover, selection and a highlighted path and not merely at
       rest. (Tier 3 draws no <image> at all, so there the star is the mark.)

       It is surgical, not a re-layout: measured over 6 settles, 24-35 of the
       139 nodes move at all, the median move is 0, the largest ~19px, and the
       field's ρmax is unchanged (1.07-1.10, against 1.085-1.12 without it).
       Overlaps across every interaction state go 43 → 0, and the tightest
       resting gap between two portraits goes 8-14px → 24px. Doing the same job
       by inflating the collide radius to the full box instead needs ~22% more
       reserved area, still leaves a residual pair or two (a soft force cannot
       promise a hard constraint), and pushes ρmax out to 1.12 — which pulls
       the resting camera back and shrinks every glyph.

       Half the correction per pass, split so the smaller node yields more;
       ~60 passes converge to a 0.1px shortfall, and it breaks early once the
       worst pair is within a quarter-pixel. O(n²) once, off-screen, next to
       360 sim ticks that already ran. */
    const SEP_GAP = 4
    const drawnR  = n => n.tier === 3 ? radius(n) : selRadius(n) * IMG_SCALE
    const sepR    = nodes.map(n => drawnR(n) + SEP_GAP)
    for (let pass = 0; pass < 60; pass++) {
      let worst = 0
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const want = sepR[i] + sepR[j]
          const dx = b.x - a.x, dy = b.y - a.y
          const d = Math.hypot(dx, dy) || 0.01
          if (d >= want) continue
          if (want - d > worst) worst = want - d
          const shift = (want - d) * 0.5
          const ux = dx / d, uy = dy / d
          const sa = sepR[j] / want, sb = sepR[i] / want   // the smaller node yields
          a.x -= ux * shift * sa; a.y -= uy * shift * sa
          b.x += ux * shift * sb; b.y += uy * shift * sb
        }
      }
      if (worst < 0.25) break
    }

    /* From here the simulation only ever runs on BAKED positions — a drag is
       the only thing that wakes it — so the collide force stops correcting for
       a bake that has already happened. Dividing by `bakeScaleAt` a second
       time inflates the rim radii by up to 1/0.64, and the field blows outward
       on every drag: measured over 4 settles, one 120px haul of Zeus leaves
       ρmax at 1.28-1.35 with the correction still in, against 1.14-1.19
       without it. It reserves the drawn box instead, so a drag maintains the
       separation the pass above just established (measured: 0 overlaps after
       the same drag, against an occasional 3px pair), floored at the pre-bake
       per-tier reserve so the tail keeps its own spacing. */
    sim.force('collide', d3.forceCollide()
      .radius(d => Math.max(drawnR(d) + SEP_GAP, spaceFor(d))).strength(0.92))

    updateClusterLabels()
    updateCatHalos()
    assignLabelSides()
    ticked()
    sim.on('tick', ticked)
    /* no warm restart — the sim idles (no per-frame DOM churn) until a drag wakes it */

    /* birth-order entrance is handled by the cosmogony ignition below */

    /* ── zoom / pan ─────────────────────────────────────────────── */
    const zoom = d3.zoom().scaleExtent([0.35, 4.5])
      .on('zoom', e => {
        zoomLayer.attr('transform', e.transform)
        svg.classed('zoomed-mid', e.transform.k > 1.0)
        svg.classed('zoomed-in', e.transform.k > 1.7)
        loadVisibleSecondaryPortraits(e.transform)
        /* cluster labels dim as you zoom in (individual names take over) */
        const clOp = e.transform.k > 1.7 ? 0.12 : e.transform.k > 1.0 ? 0.28 : 0.45
        clusterSel.attr('opacity', c => labelOpacity(c, clOp))
      })
    svg.call(zoom).on('dblclick.zoom', null)
    svg.on('click', () => api.clearSelection())

    /* The sky sleeps when nothing can see it — see `applyDormancy` below.
       A hidden tab and a full-screen overlay are the same condition, so they
       share one switch instead of fighting over the `paused` class. */
    const handleVisibility = () => applyDormancy()
    document.addEventListener('visibilitychange', handleVisibility)

    /* fit view — fill ~80% of the viewport (tight padding) */
    function fitView(animate = true) {
      const pad = 36
      const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y)
      const x0 = Math.min(...xs), x1 = Math.max(...xs)
      const y0 = Math.min(...ys), y1 = Math.max(...ys)
      const bw = x1 - x0, bh = y1 - y0
      if (!(bw > 0 && bh > 0)) return
      const k = Math.min((W - pad * 2) / bw, (H - pad * 2) / bh, 1.3) * BLEED_K
      if (!isFinite(k) || k <= 0) return
      const tx = W / 2 - k * (x0 + bw / 2) + W * BLEED_DX
      const ty = H / 2 - k * (y0 + bh / 2) + H * BLEED_DY
      if (animate) {
        svg.transition().duration(900).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k))
      } else {
        svg.call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k))
      }
    }

    /* ── cosmogony ignition ────────────────────────────────────────
       The cosmos builds itself generationally. Starfield emerges from
       black; Chaos sparks first, then the Primordials, Titans, Olympians
       — each generation's nodes flare into existence with sparkle
       particles, edges trace glowing lines from parent to child. The
       camera starts over-zoomed and eases out with gentle overshoot.
       Skippable on any interaction. */

    const CAT_WAVE = {
      primordial: 1, titan: 2, olympian: 3, chthonic: 3,
      sea_deity: 4, nymph_minor: 4, monster: 5, hero: 5, mortal: 5,
    }
    /* Tempo of the entire sequence, in one number. Every wave time, duration
       and delay below is expressed through `pace()`, so the cosmogony can be
       given more room (or tightened) without re-balancing two dozen literals
       against each other — the phases keep their relative rhythm.
       1 = the original ~8.4s run. */
    const PACE = 1.6
    const pace = v => Math.round(v * PACE)
    const WAVE_MS = [500, 1600, 3000, 4200, 5200, 6000].map(pace)
    const WAVE_LABEL = ['', 'PRIMORDIALS', 'TITANS', 'OLYMPIANS', 'THE SEA & THE WILD', 'HEROES & MONSTERS']
    nodes.forEach(n => { n._wave = n.id === 'chaos' ? 0 : (CAT_WAVE[n.category] ?? 5) })

    /* compute resting transform, then start 20% over-zoomed */
    const _xs = nodes.map(n => n.x), _ys = nodes.map(n => n.y)
    const _x0 = Math.min(..._xs), _x1 = Math.max(..._xs)
    const _y0 = Math.min(..._ys), _y1 = Math.max(..._ys)
    const _bw = _x1 - _x0, _bh = _y1 - _y0
    const restK = (_bw > 0 && _bh > 0)
      ? Math.min((W - 72) / _bw, (H - 72) / _bh, 1.3) * BLEED_K
      : 1
    const _cx = _x0 + _bw / 2, _cy = _y0 + _bh / 2
    const startK = restK * 1.20
    const restTx  = d3.zoomIdentity.translate(W / 2 - restK  * _cx + W * BLEED_DX, H / 2 - restK  * _cy + H * BLEED_DY).scale(restK)
    const startTx = d3.zoomIdentity.translate(W / 2 - startK * _cx + W * BLEED_DX, H / 2 - startK * _cy + H * BLEED_DY).scale(startK)

    /* sparkle layer for ignition particles */
    const sparkLayer = floatXLayer.append('g').attr('class', 'sparks').attr('pointer-events', 'none')
    /* generation title layer */
    const genTitleLayer = zoomLayer.append('g').attr('class', 'gen-titles').attr('pointer-events', 'none')

    /* bloom overlay — fades with parallax */
    const bloom = zoomLayer.append('rect')
      .attr('width', W * 4).attr('height', H * 4)
      .attr('x', -W * 1.5).attr('y', -H * 1.5)
      .attr('fill', '#0e1220').attr('opacity', 0.22)
      .attr('pointer-events', 'none')

    const IGNITION_MS = WAVE_MS[5] + pace(2400)

    /* The sequence runs ~13s, and it used to lose that time to input nobody
       meant as a skip: the click that focuses the browser window after a
       reload, a touchpad momentum tail from a gesture that began before the
       page did, a bare modifier key. Input only skips past the grace period,
       and only when it reads as deliberate. */
    const SKIP_GRACE_MS = 900
    const REFOCUS_MS    = 350
    /* And it is rAF-driven, so a hidden tab freezes every transition while the
       wall-clock completion timer keeps counting — load in a background tab (or
       glance away mid-run) and you came back to a sky that was already lit. It
       now waits for a visible tab and rewinds if it loses one, capped so
       flipping back and forth can't loop the ignition forever. */
    const MAX_RESTARTS  = 2

    let _ignitionDone = false
    let _running      = false
    let _restarts     = 0
    let _runStart     = 0
    let _lastFocus    = 0
    let ignitionTimer = null
    let dragHintTimer = null

    /* sparkle burst — spawn small gold circles that scatter outward */
    function spawnSparks(x, y, count, r) {
      if (_ignitionDone) return
      const sparks = d3.range(count).map(() => {
        const angle = Math.random() * Math.PI * 2
        const dist  = (r + 4) + Math.random() * (r * 2.5 + 10)
        return { sx: x, sy: y, ex: x + Math.cos(angle) * dist, ey: y + Math.sin(angle) * dist }
      })
      sparkLayer.selectAll(null).data(sparks).join('circle')
        .attr('cx', d => d.sx).attr('cy', d => d.sy)
        .attr('r', 1.0 + Math.random() * 0.8)
        .attr('fill', '#e8d5a0')
        .attr('opacity', 0.85)
        .attr('filter', 'url(#glow)')
        .transition('spark').duration(pace(500) + Math.random() * pace(300))
        .ease(d3.easeCubicOut)
        .attr('cx', d => d.ex).attr('cy', d => d.ey)
        .attr('opacity', 0)
        .attr('r', 0.2)
        .on('end', function () { d3.select(this).remove() })
    }

    /* frame zero: starfield dim, everything else invisible. Also where a
       restart rewinds to, so it must undo any transition already in flight. */
    function armIgnition() {
      svg.interrupt('ign').call(zoom.transform, startTx)
      bgLayer.interrupt('ign').attr('opacity', 0)
      domeLayer.interrupt('ign').attr('opacity', 0)
      limbLayer.interrupt('ign').attr('opacity', 0)
      catHaloLayer.interrupt('ign').attr('opacity', 0)
      linkLayer.attr('opacity', 1)
      nodeLayer.attr('opacity', 1)
      clusterLayer.attr('opacity', 1)
      clusterSel.interrupt('ign').attr('opacity', 0)
      gNode.interrupt('ign').attr('opacity', 0)
      gNode.selectAll('.glow').interrupt('ign').each(function (d) {
        d3.select(this).attr('opacity', 0.07 + d.prom * 0.14).attr('r', radius(d) * GLOW_R)
      })
      sparkLayer.selectAll('*').interrupt('spark').remove()
      genTitleLayer.selectAll('*').interrupt('ign').remove()
      bloom.interrupt('ign').attr('opacity', 0.22)

      /* edges: hidden via dashoffset, golden during draw-in */
      linkSel.interrupt('ign')
        .attr('stroke', '#c9a84c')
        .attr('stroke-dasharray', 2000)
        .attr('stroke-dashoffset', 2000)
        .attr('opacity', 0.22)
    }

    function startIgnition() {
      if (_ignitionDone || _running) return
      _running  = true
      _runStart = performance.now()
      armIgnition()

      /* phase 1: starfield materialises from black */
      bgLayer.transition('ign').duration(pace(1200)).delay(pace(100))
        .ease(d3.easeCubicOut)
        .attr('opacity', 1)

      /* the celestial grid etches in just behind the starfield */
      domeLayer.transition('ign').duration(pace(1600)).delay(pace(400))
        .ease(d3.easeCubicOut)
        .attr('opacity', 1)

      /* the limb glow swells in slower and later — the sky lights at its rim
         last, after the stars are already out */
      limbLayer.transition('ign').duration(pace(2400)).delay(pace(700))
        .ease(d3.easeCubicOut)
        .attr('opacity', 1)

      /* category territory halos seep in just after the starfield */
      catHaloLayer.transition('ign').duration(pace(1800)).delay(pace(600))
        .ease(d3.easeCubicOut)
        .attr('opacity', 1)

      /* phase 2: generation title flashes */
      WAVE_LABEL.forEach((label, i) => {
        if (!label) return
        const title = genTitleLayer.append('text')
          .attr('class', 'genesis-title')
          .attr('x', W / 2).attr('y', H / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('opacity', 0)
          .text(label)
        title.transition('ign').duration(pace(400)).delay(WAVE_MS[i] - pace(200))
          .attr('opacity', 0.5)
          .transition('ign').duration(pace(900))
          .attr('opacity', 0)
          .on('end', function () { d3.select(this).remove() })
      })

      /* phase 3: edges draw in with a golden glow that settles to neutral */
      linkSel.each(function (d) {
        const sW = d.source._wave ?? 5, tW = d.target._wave ?? 5
        const delay = WAVE_MS[Math.max(sW, tW)] + rnd() * pace(300)
        d3.select(this)
          .attr('stroke', '#c9a84c')
          .transition('ign').duration(pace(700)).delay(delay)
          .ease(d3.easeCubicOut)
          .attr('stroke-dashoffset', 0)
          .attr('opacity', 0.28)
          .transition('ign').duration(pace(800))
          .attr('stroke', NEUTRAL_EDGE)
          .attr('opacity', 0.08)
          .on('end', function () {
            d3.select(this).attr('stroke-dasharray', null)
          })
      })

      /* phase 4: nodes ignite in genealogical waves with sparkle + flare */
      gNode.each(function (d) {
        /* `d.tier === 1` IS the old `prom >= hubThreshold`: that threshold was
           `promRank[PRIMARY_COUNT - 1]`, which is precisely the tier-1 cutoff
           `TIER_BY_ID` now applies. Reading the tier keeps one rule. */
        const isHub = d.tier === 1
        const stagger = isHub ? pace(300) : rnd() * pace(250)
        const delay = WAVE_MS[d._wave] + stagger
        const g = d3.select(this)

        g.transition('ign').duration(pace(500)).delay(delay)
          .ease(d3.easeCubicOut)
          .attr('opacity', 1)
          .on('start', function () {
            spawnSparks(d.x, d.y, isHub ? 8 : 4, radius(d))
          })

        /* glow flare — all nodes get a brief brightness spike when born */
        d3.select(this).select('.glow')
          .transition('ign').duration(pace(200)).delay(delay)
          .attr('opacity', isHub ? 0.4 : 0.2)
          .attr('r', radius(d) * (isHub ? GLOW_R_NOVA : GLOW_R_PEAK))
          .transition('ign').duration(pace(1100)).ease(d3.easeCubicOut)
          .attr('opacity', 0.07 + d.prom * 0.14)
          .attr('r', radius(d) * GLOW_R)
      })

      /* cluster labels seep in once their category's nodes have arrived */
      clusterSel.each(function (c) {
        const wave = CAT_WAVE[c] ?? 5
        d3.select(this)
          .transition('ign').duration(pace(800)).delay(WAVE_MS[wave] + pace(400))
          .attr('opacity', labelOpacity(c, 0.45))
      })

      /* phase 5: parallax settle — ease back from over-zoom to rest */
      svg.transition('ign').duration(pace(2200)).delay(pace(1200))
        .ease(d3.easeBackOut.overshoot(0.3))
        .call(zoom.transform, restTx)

      bloom.transition('ign').duration(pace(2000)).delay(pace(1400))
        .ease(d3.easeCubicOut)
        .attr('opacity', 0)
        .on('end', function () { d3.select(this).remove() })

      /* natural completion */
      ignitionTimer = setTimeout(finishIgnition, IGNITION_MS)

      /* drag hint — after entrance, gently nudge a hub node to suggest dragging */
      dragHintTimer = setTimeout(() => {
        const hub = nodes.slice().sort((a, b) => b.degree - a.degree)[0]
        if (!hub) return
        const g = gNode.filter(n => n.id === hub.id)
        g.transition('drag-hint')
          .duration(400).ease(d3.easeSinInOut)
          .attr('transform', `translate(${hub.x + 8},${hub.y - 6})`)
          .transition().duration(400).ease(d3.easeSinInOut)
          .attr('transform', `translate(${hub.x - 5},${hub.y + 4})`)
          .transition().duration(350).ease(d3.easeSinOut)
          .attr('transform', `translate(${hub.x},${hub.y})`)
      }, IGNITION_MS + pace(1200))
    }

    /* land everything on its resting state — the same values phase 5 arrives at
       on its own, so skipping and watching it through end in the same sky */
    function finishIgnition() {
      if (_ignitionDone) return
      _ignitionDone = true
      _running = false
      clearTimeout(ignitionTimer)

      bgLayer.interrupt('ign').attr('opacity', 1)
      domeLayer.interrupt('ign').attr('opacity', 1)
      limbLayer.interrupt('ign').attr('opacity', 1)
      catHaloLayer.interrupt('ign').attr('opacity', 1)
      linkSel.interrupt('ign')
        .attr('stroke-dasharray', null)
        .attr('stroke-dashoffset', null)
        .attr('stroke', NEUTRAL_EDGE)
        .attr('opacity', 0.08)
      gNode.interrupt('ign').attr('opacity', 1)
      gNode.selectAll('.glow').interrupt('ign')
        .each(function (d) {
          d3.select(this).attr('opacity', 0.07 + d.prom * 0.14).attr('r', radius(d) * GLOW_R)
        })
      clusterSel.interrupt('ign').attr('opacity', c => labelOpacity(c, 0.45))
      bloom.interrupt('ign').remove()
      sparkLayer.selectAll('*').interrupt('spark').remove()
      genTitleLayer.selectAll('*').interrupt('ign').remove()
      svg.interrupt('ign').call(zoom.transform, restTx)

      /* Marked here rather than at the start, so only a cosmogony the viewer
         actually reached the end of (or deliberately skipped past) counts as
         seen — a reload halfway through, or StrictMode's throwaway first mount
         in dev, still owes them the film. */
      markCosmogonySeen()

      scheduleAmbient(3200)   // let the sky settle, then begin its heartbeat
      teardownSkip()
    }

    /* skip — but only on input that reads as a deliberate "let me in" */
    function onSkipInput(e) {
      if (_ignitionDone || !_running) return
      if (performance.now() - _runStart < SKIP_GRACE_MS) return
      if (e.type === 'keydown') {
        /* a bare modifier is someone reaching for a shortcut, not skipping */
        if (e.key === 'Tab' || e.key === 'Shift' || e.key === 'Control' ||
            e.key === 'Alt' || e.key === 'Meta'  || e.key === 'CapsLock') return
      } else if (e.type === 'wheel') {
        /* momentum tail from a gesture that started before the page did */
        if (Math.abs(e.deltaY) + Math.abs(e.deltaX) < 8) return
      } else if (e.type === 'pointerdown') {
        /* the click that focuses the window is not a request to skip */
        if (performance.now() - _lastFocus < REFOCUS_MS) return
      }
      finishIgnition()
    }

    function onWinFocus() { _lastFocus = performance.now() }

    /* hold at frame zero while the tab is hidden, rather than burning the
       sequence down a wall clock nobody is watching */
    function onIgnitionVisibility() {
      if (_ignitionDone) return
      if (!document.hidden) { startIgnition(); return }
      if (!_running) return
      _running = false
      clearTimeout(ignitionTimer)
      clearTimeout(dragHintTimer)
      if (_restarts >= MAX_RESTARTS) { finishIgnition(); return }
      _restarts++
      armIgnition()
    }

    const skipOpts = { capture: true }
    window.addEventListener('pointerdown', onSkipInput, skipOpts)
    window.addEventListener('keydown',     onSkipInput, skipOpts)
    window.addEventListener('wheel',       onSkipInput, skipOpts)
    window.addEventListener('focus',       onWinFocus)
    document.addEventListener('visibilitychange', onIgnitionVisibility)

    function teardownSkip() {
      window.removeEventListener('pointerdown', onSkipInput, skipOpts)
      window.removeEventListener('keydown',     onSkipInput, skipOpts)
      window.removeEventListener('wheel',       onSkipInput, skipOpts)
      window.removeEventListener('focus',       onWinFocus)
      document.removeEventListener('visibilitychange', onIgnitionVisibility)
    }

    /* the sequence is kicked off at the very foot of this effect, once every
       declaration it reaches into exists — see "opening state" below */

    /* ── tooltip positioning ────────────────────────────────────── */
    const tip = document.getElementById('tip')
    if (tip) {
      svg.on('mousemove', e => {
        tip.style.left = (e.clientX + 14) + 'px'
        tip.style.top  = (e.clientY - 8)  + 'px'
      })
    }

    /* ── hover / selection state ────────────────────────────────── */
    const state = { selected: null, pathLock: false, tourLock: false }
    let _hoverActive = false

    const srcId = l => (typeof l.source === 'object' ? l.source.id : l.source)
    const tgtId = l => (typeof l.target === 'object' ? l.target.id : l.target)

    /* Partial re-render for hover's magnetic lean: reposition ONLY the nudged
       nodes and the edges incident to them, instead of the global ticked()
       (which rewrites all 208 edge paths + 116 transforms and can trip the
       80-iteration cluster-label relax). Keeps hover smooth on the dense field. */
    function tickSubset(movedNodes) {
      const moved = new Set(movedNodes.map(n => n.id))
      if (!moved.size) return
      gNode.filter(d => moved.has(d.id)).attr('transform', d => `translate(${d.x},${d.y})`)
      linkSel.filter(l => moved.has(srcId(l)) || moved.has(tgtId(l))).attr('d', edgePath)
    }

    /* edge labels — short relationship names riding the selected node's lit edges */
    const MAX_EDGE_LABELS = 10
    const EDGE_LABEL_PAD = 6, EDGE_LABEL_H = 10
    const edgeKey = l => srcId(l) + '|' + tgtId(l) + '|' + l.type
    const edgeLabelSize = new Map()
    const edgeLabelPos  = new Map()

    // direction-aware: "label" when the selected node is the source (matches
    // DetailPanel's dir === '→'), "inverseLabel" when it's the target (dir === '←')
    function resolveLabel(l, id) {
      const cfg = linkTypeConfig[l.type]
      return (srcId(l) === id ? cfg?.label : cfg?.inverseLabel) || l.type
    }

    function renderEdgeLabels(id) {
      if (!id) { linkLabelLayer.selectAll('text').remove(); edgeLabelPos.clear(); return }
      const inc = links.filter(l => srcId(l) === id || tgtId(l) === id)

      // dedupe: if several edges would show the same resolved text (e.g. many
      // "Parent of" children), keep only the highest-renown neighbour's label
      const byText = new Map()
      for (const l of inc) {
        const neighborId = srcId(l) === id ? tgtId(l) : srcId(l)
        const prom = byId[neighborId]?.prom || 0
        const text = resolveLabel(l, id)
        const cur = byText.get(text)
        if (!cur || prom > cur.prom) byText.set(text, { l, prom, text })
      }
      let items = [...byText.values()]

      // clutter guard: keep the highest-renown neighbours; the rest rely on hover
      if (items.length > MAX_EDGE_LABELS) {
        items = items.sort((a, b) => b.prom - a.prom).slice(0, MAX_EDGE_LABELS)
      }

      const sel = linkLabelLayer.selectAll('text')
        .data(items, d => edgeKey(d.l))
        .join('text')
        .attr('class', 'link-label')
        .attr('text-anchor', 'middle')
        .attr('fill', d => LCOL[d.l.type] || '#888')
        .text(d => d.text)

      edgeLabelSize.clear()
      edgeLabelPos.clear()
      sel.each(function(d) {
        edgeLabelSize.set(edgeKey(d.l), { w: this.getComputedTextLength() + EDGE_LABEL_PAD, h: EDGE_LABEL_H })
      })
      positionEdgeLabels()
    }

    function positionEdgeLabels() {
      const sel = linkLabelLayer.selectAll('text')
      if (sel.empty()) return

      // seed/refresh each label's spring anchor at its edge midpoint
      const items = []
      sel.each(function(d) {
        const key = edgeKey(d.l)
        const anchor = { x: (d.l.source.x + d.l.target.x) / 2, y: (d.l.source.y + d.l.target.y) / 2 }
        let pos = edgeLabelPos.get(key)
        if (!pos) { pos = { x: anchor.x, y: anchor.y }; edgeLabelPos.set(key, pos) }
        items.push({ anchor, pos, size: edgeLabelSize.get(key) || { w: 30, h: EDGE_LABEL_H } })
      })

      // light nudge pass: spring each label toward its edge midpoint, then
      // separate any pair whose boxes overlap along their shallowest axis
      for (let iter = 0; iter < 20; iter++) {
        let moved = false
        for (let i = 0; i < items.length; i++) {
          const a = items[i]
          a.pos.x += (a.anchor.x - a.pos.x) * 0.15
          a.pos.y += (a.anchor.y - a.pos.y) * 0.15
          for (let j = i + 1; j < items.length; j++) {
            const b = items[j]
            const dx = b.pos.x - a.pos.x
            const dy = b.pos.y - a.pos.y
            const overlapX = (a.size.w + b.size.w) / 2 - Math.abs(dx)
            const overlapY = (a.size.h + b.size.h) / 2 - Math.abs(dy)
            if (overlapX > 0 && overlapY > 0) {
              moved = true
              if (overlapX < overlapY) {
                const shift = overlapX / 2 + 0.5
                a.pos.x -= dx >= 0 ? shift : -shift
                b.pos.x += dx >= 0 ? shift : -shift
              } else {
                const shift = overlapY / 2 + 0.5
                a.pos.y -= dy >= 0 ? shift : -shift
                b.pos.y += dy >= 0 ? shift : -shift
              }
            }
          }
        }
        if (!moved) break
      }

      sel.attr('x', d => edgeLabelPos.get(edgeKey(d.l)).x)
         .attr('y', d => edgeLabelPos.get(edgeKey(d.l)).y)
    }

    /* grow the clicked node above the field. Every sized piece of the glyph —
       glow, gold halo, core, portrait, label offset — is rescaled off one
       shared transition so they enlarge in lockstep. The portrait's soft-fade
       CSS mask is sized in percentages, so it follows the image for free.
       Physics radius is left alone, so the layout doesn't reflow. */
    let _grownId = null
    function sizeNode(id, grown) {
      const g = gNode.filter(n => n.id === id)
      if (g.empty()) return
      const d = g.datum()
      const r = grown ? selRadius(d) : radius(d)
      const t = d3.transition().duration(280).ease(d3.easeCubicOut)
      g.select('.glow').transition(t).attr('r', r * GLOW_R)
      g.select('.sel-halo').transition(t).attr('r', r * 1.45)
      g.select('.core').transition(t).attr('r', coreRadius(d, r))
      g.select('image').transition(t)
        .attr('x', -r * IMG_SCALE).attr('y', -r * IMG_SCALE)
        .attr('width', r * 2 * IMG_SCALE).attr('height', r * 2 * IMG_SCALE)
      const side = d._labelSide || 1
      const lr = glyphRAt(d, r) + 6
      g.select('.node-label').transition(t).attr('x', side > 0 ? lr : -lr)
    }
    function enlargeSelected(id) {
      if (_grownId === id) return                // already correct — skip redundant transitions
      if (_grownId) sizeNode(_grownId, false)    // restore the previously selected node
      if (id) sizeNode(id, true)
      _grownId = id
    }

    /* Apply per-type color/dash to lit edges, reset to neutral grey otherwise */
    function styleEdgesByState() {
      linkSel.each(function(d) {
        const el = d3.select(this)
        if (el.classed('lit') || el.classed('route')) {
          el.attr('stroke', el.attr('data-type-color'))
            .attr('stroke-dasharray', el.attr('data-type-dash') || null)
            .classed('link-animated', !!LINK_DASH[d.type])
            .classed('link-transformed', d.type === 'transformed_into')
            .classed('link-cursed', d.type === 'cursed_into')
        } else {
          el.attr('stroke', NEUTRAL_EDGE)
            .attr('stroke-dasharray', null)
            .classed('link-animated', false)
            .classed('link-transformed', false)
            .classed('link-cursed', false)
        }
      })
    }

    /* constellation focus: on select, unrelated nodes desaturate and recede,
       the selected lineage rises forward, edges illuminate with type colour
       in a staggered ripple outward, and the camera eases to re-centre. */
    function applySelectVisual(id) {
      gNode.classed('selected', n => n.id === id)
      if (id) {
        const center = byId[id]
        const near = adj[id] || new Set()
        gNode.classed('faded',    n => n.id !== id && !near.has(n.id))
             .classed('receded',  n => n.id !== id && !near.has(n.id))
             .classed('lit',      n => n.id === id || near.has(n.id))

        /* stagger edge illumination outward from the selected node */
        linkSel.each(function(l) {
          const el = d3.select(this)
          const s = srcId(l), t = tgtId(l)
          const touches = s === id || t === id
          el.classed('faded', !touches).classed('lit', touches)
          if (touches && center) {
            const nb = byId[s === id ? t : s]
            const dist = nb ? Math.sqrt((center.x - nb.x) ** 2 + (center.y - nb.y) ** 2) : 0
            const delay = Math.min(dist * 0.5, 100)
            el.attr('stroke', NEUTRAL_EDGE).attr('opacity', 0.08)
            el.transition('sel-ripple').duration(200).delay(delay)
              .attr('opacity', 0.8)
              .attr('stroke-width', 1.6)
              .attr('stroke', el.attr('data-type-color'))
          }
        })

        nodeLayer.classed('focusing', true)
      } else {
        linkSel.interrupt('sel-ripple')
        /* smooth de-focus: edges fade back via a brief transition instead
           of snapping; the CSS transition on .node handles nodes already */
        linkSel.each(function() {
          d3.select(this)
            .transition('defocus').duration(300).ease(d3.easeCubicOut)
            .attr('opacity', 0.08)
            .attr('stroke-width', 0.7)
            .attr('stroke', NEUTRAL_EDGE)
        })
        gNode.classed('faded', false).classed('lit', false).classed('receded', false)
        linkSel.classed('faded', false).classed('lit', false)
        nodeLayer.classed('focusing', false)
      }
      styleEdgesByState()
      renderEdgeLabels(id)
      enlargeSelected(id)

      /* selection glow nova — brief radius/opacity burst on the selected
         node's glow circle, settling back to rest. Reads as a star flaring
         on activation before dimming to its steady state. */
      if (id) {
        const g = gNode.filter(n => n.id === id)
        const d = g.datum()
        const r = radius(d)
        const baseOp = 0.07 + d.prom * 0.14
        g.select('.glow')
          .transition('nova').duration(180).ease(d3.easeCubicOut)
          .attr('r', r * GLOW_R_NOVA).attr('opacity', Math.min(baseOp * 3.5, 0.4))
          .transition('nova').duration(600).ease(d3.easeCubicOut)
          .attr('r', r * GLOW_R).attr('opacity', baseOp)
      }
    }

    /* ── magnetic hover ───────────────────────────────────────────
       On hover, neighbors lean slightly toward the hovered node (a
       temporary spring nudge) and connecting edges brighten/thicken
       in a staggered ripple outward — relationships flow OUT rather
       than snapping on uniformly. */
    let _hoverNudges = null

    function hoverOn(d) {
      if (state.pathLock || state.tourLock || !_ignitionDone) return
      _hoverActive = true
      stopAmbient()                 // the viewer is driving now — hush the ambient sky
      showPortrait(d, true)         // the face is the reward of leaning in
      prefetchFull(d)               // and the panel's hero, if they linger
      const near = adj[d.id]
      nodeLayer.classed('focusing', true)
      gNode.classed('faded', n => n.id !== d.id && !near.has(n.id))
           .classed('lit',   n => n.id === d.id || near.has(n.id))

      /* glow flare: the hovered node's category glow swells and brightens.
         Brightness rides through --glow-base (the twinkle keyframes read it),
         so it works even while the CSS twinkle animation owns `opacity`. */
      if (d.id !== _grownId) {
        gNode.filter(n => n.id === d.id).select('.glow')
          .style('--glow-base', Math.min((0.07 + d.prom * 0.14) * 2.2, 0.4).toFixed(3))
          .transition('glow-shimmer').duration(140).ease(d3.easeCubicOut)
          .attr('r', radius(d) * GLOW_R_PEAK)
      }

      /* magnetic lean: temporarily nudge neighbors toward the hovered node */
      _hoverNudges = []
      const LEAN = 0.12
      near.forEach(nid => {
        const nb = byId[nid]; if (!nb) return
        const dx = d.x - nb.x, dy = d.y - nb.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const nudge = Math.min(dist * LEAN, 12)
        const ox = nb.x, oy = nb.y
        nb.x += (dx / dist) * nudge
        nb.y += (dy / dist) * nudge
        _hoverNudges.push({ node: nb, ox, oy })
      })
      tickSubset(_hoverNudges.map(h => h.node))

      /* ripple: stagger edge transitions outward from the hovered node */
      linkSel.each(function(l) {
        const el = d3.select(this)
        const s = srcId(l), t = tgtId(l)
        const touches = s === d.id || t === d.id
        el.classed('faded', !touches).classed('lit', touches)
        if (touches) {
          const nbId = s === d.id ? t : s
          const nb = byId[nbId]
          const dist = nb ? Math.sqrt((d.x - nb.x) ** 2 + (d.y - nb.y) ** 2) : 0
          const delay = Math.min(dist * 0.6, 120)
          el.transition('ripple').duration(180).delay(delay)
            .attr('opacity', 0.8)
            .attr('stroke-width', 1.6)
            .attr('stroke', el.attr('data-type-color'))
        }
      })

      if (tip) {
        const catLabel = categoryConfig[d.category]?.label || d.category
        const nConn = adj[d.id]?.size || 0
        tip.innerHTML = `<span class="tip-cat" style="background:${CAT[d.category]}"></span>`
          + `<span class="tip-name">${d.name}</span>`
          + (d.epithet ? `<span class="tip-epi">${d.epithet}</span>` : '')
          + `<span class="tip-conn">${nConn} connection${nConn !== 1 ? 's' : ''}</span>`
        tip.style.opacity = '1'
      }
    }

    function hoverOff() {
      if (state.pathLock || state.tourLock) return
      cancelFullPrefetch()          // they were passing over, not looking
      _hoverActive = false
      if (!state.selected) scheduleAmbient(5000)   // idle again — let the sky resume its pulse
      if (tip) tip.style.opacity = '0'

      /* restore glow from hover flare (leave the grown/selected node alone —
         sizeNode owns its glow radius) */
      gNode.filter(n => n.id !== _grownId).select('.glow').interrupt('glow-shimmer')
        .style('--glow-base', d => (0.07 + d.prom * 0.14).toFixed(3))
        .transition('glow-restore').duration(220).ease(d3.easeCubicOut)
        .attr('r', d => radius(d) * GLOW_R)

      /* release magnetic lean — spring nodes back */
      if (_hoverNudges) {
        const moved = _hoverNudges.map(h => h.node)
        for (const { node, ox, oy } of _hoverNudges) {
          node.x = ox; node.y = oy
        }
        _hoverNudges = null
        tickSubset(moved)
      }

      /* cancel any in-flight ripple transitions */
      linkSel.interrupt('ripple')

      if (state.selected) {
        applySelectVisual(state.selected)
      } else {
        nodeLayer.classed('focusing', false)
        gNode.classed('faded', false).classed('lit', false)
        linkSel.classed('faded', false).classed('lit', false)
        styleEdgesByState()
      }
    }

    function frameNodes(ids) {
      const ns = ids.map(i => byId[i]).filter(Boolean)
      if (!ns.length) return
      const pad = 130
      const x0 = Math.min(...ns.map(n => n.x)), x1 = Math.max(...ns.map(n => n.x))
      const y0 = Math.min(...ns.map(n => n.y)), y1 = Math.max(...ns.map(n => n.y))
      const bw = Math.max(x1 - x0, 60), bh = Math.max(y1 - y0, 60)
      const k  = Math.min((W - pad * 2) / bw, (H - pad * 2) / bh, 2.4)
      const tx = W / 2 - k * (x0 + bw / 2), ty = H / 2 - k * (y0 + bh / 2)
      svg.transition().duration(820).call(zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k))
    }

    /* Frame the selected node together with ALL its neighbours, fitting them
       into the slice of screen NOT covered by the right-hand detail panel.
       The panel is a fixed pixel width but the graph lives in viewBox units
       (preserveAspectRatio "meet"), so we convert px → viewBox via the meet
       scale `s`, shrink the usable width by the panel, and shift the target
       centre left by half the panel so nothing the user clicked hides under it. */
    function frameSelection(id, opts = {}) {
      const center = byId[id]; if (!center) return
      const near = adj[id] || new Set()
      const ns = [center, ...[...near].map(i => byId[i]).filter(Boolean)]
      const xs = ns.map(n => n.x), ys = ns.map(n => n.y)
      const x0 = Math.min(...xs), x1 = Math.max(...xs)
      const y0 = Math.min(...ys), y1 = Math.max(...ys)
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
      const bw = Math.max(x1 - x0, 80), bh = Math.max(y1 - y0, 80)

      const rect = el.getBoundingClientRect()
      const s = Math.min(rect.width / W, rect.height / H) || 1   // screen px per viewBox unit

      // Reserve screen space for whatever chrome covers the graph, then fit the
      // cluster into the UNcovered region. Normal selection: the 420px right
      // detail panel. Tour step: the panel is hidden, but the bottom caption
      // bar is, so reserve height there instead. Both insets convert px →
      // viewBox via the meet scale s, and the centre shifts away from the
      // covered side by half the inset (same derivation on each axis).
      // Measure the panel's opaque *plate*, not the whole panel: the Colossus
      // panel's left ~11% is a wash the star field bleeds under, so reserving
      // it would throw away screen the graph can still use.
      const panelEl  = document.querySelector('.detail-panel .col-plate')
                    || document.querySelector('.detail-panel')
      const rightPx  = opts.tour ? 0 : (panelEl?.getBoundingClientRect().width || 420)
      const bottomPx = opts.tour ? 188 : 0   // clear the (now taller) tour caption bar
      const rightV   = rightPx  / s
      const bottomV  = bottomPx / s

      const padX = 96, padY = 80
      const usableW = Math.max((rect.width  - rightPx)  / s, 120)
      const usableH = Math.max((rect.height - bottomPx) / s, 120)
      let k = Math.min((usableW - padX * 2) / bw, (usableH - padY * 2) / bh, 2.2)
      k = Math.max(Math.min(k, 2.2), 0.35)                      // keep within zoom scaleExtent

      const tx = (W / 2 - rightV  / 2) - k * cx                 // centre in the un-panelled width
      const ty = (H / 2 - bottomV / 2) - k * cy                 // lift above the tour caption bar
      /* A tour drives this from behind its own opaque overlay — the camera has
         to ARRIVE (closing the tour reveals the sky standing on the last
         figure) but nobody can watch it travel, so while dormant it jumps.
         That is ~800ms of full-graph repaint saved on every beat, under a
         `backdrop-filter` that would otherwise re-blur across all of it. */
      svg.transition().duration(_dormant ? 0 : 820).call(
        zoom.transform, d3.zoomIdentity.translate(tx, ty).scale(k))
    }

    /* ── ambient lineage trace ─────────────────────────────────────
       The heartbeat of the resting sky. Every few seconds — only while the
       viewer is doing nothing — one line of descent quietly ignites and a
       comet travels it, drawing a gold thread from ancestor to heir
       (Chaos → Gaia → Uranus → Cronus → Zeus, and a handful of other
       descents). It lives entirely in `traceLayer` as its own overlay, so it
       never touches selection/hover edge state, and it yields the instant the
       viewer hovers, selects, opens a path or a tour. */
    const LINEAGES_RAW = [
      ['chaos', 'gaia', 'uranus', 'cronus', 'zeus', 'apollo'],
      ['chaos', 'gaia', 'cronus', 'hades'],
      ['uranus', 'cronus', 'poseidon'],
      ['gaia', 'pontus', 'nereus'],
      ['cronus', 'zeus', 'athena'],
      ['chaos', 'nyx', 'hypnos'],
      ['uranus', 'iapetus', 'atlas'],
      ['gaia', 'pontus', 'phorcys', 'medusa'],
      ['hyperion', 'helios', 'pasiphae'],
    ]

    /* A hand-written seed is 2–4 hops, and at rest that is a thread the eye has
       barely begun to follow before it fades. So each seed is grown out to the
       whole line it sits on — on down to its furthest heir, then back up to its
       eldest ancestor — along `parent_of`/`birthed` edges only, so the thread
       stays a strict line of descent rather than wandering sideways into a
       marriage or a feud. The walk takes the *longest* branch rather than the
       first one it steps into, so a descent doesn't stop at an early dead end
       (Zeus alone has a dozen children, most of them leaves). This genealogy
       tops out at 7 hops; the seeds below now reach 5 or 6 instead of 3. */
    const TRACE_HOPS = 10
    const kids = {}, sires = {}
    nodes.forEach(n => { kids[n.id] = []; sires[n.id] = [] })
    /* the sim has long since swapped these string ids for node objects */
    links.forEach(l => {
      if (l.type !== 'parent_of' && l.type !== 'birthed') return
      const s = srcId(l), t = tgtId(l)
      kids[s].push(t)
      sires[t].push(s)
    })
    const byRenown = (a, b) => byId[b].degree - byId[a].degree
    Object.values(kids).forEach(c => c.sort(byRenown))
    Object.values(sires).forEach(c => c.sort(byRenown))

    /* longest simple chain leading out of `start` through `tree`, ≤ budget hops */
    function extend(start, seen, tree, budget) {
      if (budget <= 0) return []
      let best = []
      for (const next of tree[start]) {
        if (seen.has(next)) continue
        seen.add(next)
        const chain = [next, ...extend(next, seen, tree, budget - 1)]
        seen.delete(next)
        if (chain.length > best.length) best = chain
        if (best.length === budget) break
      }
      return best
    }
    function growLineage(seed) {
      const seen = new Set(seed)
      const room  = TRACE_HOPS - (seed.length - 1)
      const heirs = extend(seed[seed.length - 1], seen, kids, room)
      heirs.forEach(id => seen.add(id))
      const elders = extend(seed[0], seen, sires, room - heirs.length)
      return [...elders.reverse(), ...seed, ...heirs]
    }

    function findHop(a, b) {
      let res = null
      linkSel.each(function(l) {
        if (res) return
        const s = srcId(l), t = tgtId(l)
        if ((s === a && t === b) || (s === b && t === a)) res = { el: this, reversed: s !== a }
      })
      return res
    }
    /* keep only the chains every hop of which is a real edge in this dataset */
    const LINEAGES = LINEAGES_RAW.map(growLineage).map(ids => {
      const hops = []
      for (let i = 0; i < ids.length - 1; i++) {
        const h = findHop(ids[i], ids[i + 1])
        if (!h) return null
        hops.push(h)
      }
      return { ids, hops }
    }).filter(Boolean)

    let _ambientTimer = null
    let _ambientIdx = 0
    let _flareId = null
    let _dormant = false      // a full-screen overlay is covering the sky

    /* The comet used to erase itself completely, so the sky at minute ten looked
       exactly like the sky at minute one. Now each completed descent leaves a
       hairline behind and the web of becoming literally draws itself.

       Residue is keyed by lineage, one path each, replaced rather than stacked:
       nine threads re-traced forever would otherwise pile 0.12 on 0.12 until the
       genealogy was a bright cage. Re-laying also re-reads the current geometry,
       so a thread stays true after a drag has moved its stars.

       No `#trace-glow` here, unlike the live comet — a blur held at 0.12 reads as
       fog rather than a line, and nine permanently filtered paths are a standing
       cost on every frame the sky drifts. */
    const RESIDUE_OP = 0.12
    function layResidue(key, dstr) {
      residueLayer.selectAll('.residue').filter(function () {
        return this.getAttribute('data-lin') === String(key)
      }).remove()
      residueLayer.append('path')
        .attr('class', 'residue').attr('data-lin', key)
        .attr('d', dstr).attr('fill', 'none')
        .attr('stroke', '#cdb88a').attr('stroke-width', 1)
        .attr('stroke-linecap', 'round').attr('stroke-linejoin', 'round')
        .attr('opacity', 0)
        .transition('residue').duration(4000).ease(d3.easeSinInOut)
        .attr('opacity', RESIDUE_OP)
    }

    /* The thread has to arrive at somebody. Without this the comet just stops
       being, and the descent it spent nine seconds tracing never names its heir
       — so the terminal star takes one nova-sized breath as the trace lands.
       Brightness rides --glow-base because the CSS twinkle owns `opacity`.

       The radius is `max(nova, selection-halo)` rather than a bare
       `r * GLOW_R_NOVA`, for the same reason `selRadius` floors tier 3 at an
       absolute 13: `growLineage` walks each descent to its *furthest* heir, and
       the furthest heir of a line is by construction a leaf — so this lands on a
       tail dot far more often than on a primary. ×2.2 of a 5px halo is 7px of
       nothing, and the arrival the whole feature exists to deliver goes unseen.
       Floored to the halo the node would wear if you had clicked it, primaries
       still take the full nova (it outruns the floor on its own). */
    function flareTerminal(id) {
      const d = byId[id]
      if (!d || id === _grownId) return
      const peak = Math.max(radius(d) * GLOW_R_NOVA, selRadius(d) * GLOW_R)
      const baseOp = 0.07 + d.prom * 0.14
      _flareId = id
      gNode.filter(n => n.id === id).select('.glow')
        .interrupt('ambient-flare')
        .style('--glow-base', Math.min(baseOp * 3.2, 0.38).toFixed(3))
        .transition('ambient-flare').duration(260).ease(d3.easeCubicOut)
        .attr('r', peak)
        .transition('ambient-flare').duration(440).ease(d3.easeCubicIn)
        .attr('r', radius(d) * GLOW_R)
        .on('end', () => { _flareId = null; restoreFlareGlow(id) })
    }
    /* Restored without a transition on purpose: hoverOn calls stopAmbient and
       then immediately starts its own 'glow-shimmer' on `r`. Two live
       transitions writing one attribute is a coin flip per frame. */
    function restoreFlareGlow(id) {
      const d = byId[id]; if (!d || id === _grownId) return
      gNode.filter(n => n.id === id).select('.glow')
        .style('--glow-base', (0.07 + d.prom * 0.14).toFixed(3))
    }

    function stopAmbient() {
      clearTimeout(_ambientTimer)
      traceLayer.selectAll('.ambient').interrupt('ambient').remove()
      residueLayer.classed('hushed', true)
      if (_flareId) {
        const id = _flareId, d = byId[id]
        _flareId = null
        const sel = gNode.filter(n => n.id === id).select('.glow').interrupt('ambient-flare')
        if (d && id !== _grownId) sel.attr('r', radius(d) * GLOW_R)
        restoreFlareGlow(id)
      }
    }
    function scheduleAmbient(delay) {
      clearTimeout(_ambientTimer)
      residueLayer.classed('hushed', false)
      _ambientTimer = setTimeout(runAmbient, delay)
    }
    /* ── dormancy — the sky sleeps when nothing can see it ────────────
       A full-screen overlay (Guided Sky, Story Orbit, Zodiac) is
       `position: fixed; inset: 0` over an OPAQUE ground at z-index 1000, so
       every frame the map draws under one is work nobody sees: ~63 shimmering
       stars and 17 blurred flare blooms, 12 dash-flow links, the top 6 hubs'
       breath, the drifting haze, the ambient comet's blurred stroke — and,
       above all, the two float layers, which transform the whole graph group
       (139 nodes and 258 edges) and so re-rasterize it every frame.
       And it is not merely wasted — the overlays hold `backdrop-filter` panels
       over that region (`.so-caption` blur(10px), `.so-tale-veil` blur(6px),
       `.gs-exit` blur(6px)), and a backdrop that changes every frame can never
       be cached: the blur is recomputed for each one. So animation under an
       overlay is charged twice, once to paint and once to re-blur, which is
       why the story overlays felt heavy on machines the map alone is fine on.
       The camera is deliberately NOT frozen: GuidedSky flies the map to each
       beat's figure underneath itself, so closing a tour reveals the sky
       already standing on the last figure. `paused` only halts CSS animation;
       zoom transitions and `select()` keep working. */
    function applyDormancy() {
      const asleep = _dormant || document.hidden
      svg.classed('paused', asleep)
      if (asleep) { sim.stop(); stopAmbient() }
      /* Re-arm the heartbeat only if the viewer is not driving something:
         `scheduleAmbient` un-hushes the residue web, which has to stay hushed
         while a selection, a path or a tour owns the field. */
      else if (!state.selected && !state.pathLock && !state.tourLock) scheduleAmbient(2500)
    }

    function ambientIdle() {
      return _ignitionDone && !reduced && !document.hidden && !_dormant
        && !state.selected && !state.pathLock && !state.tourLock && !_hoverActive
    }
    function runAmbient() {
      if (!LINEAGES.length) return
      if (!ambientIdle()) { scheduleAmbient(4500); return }
      const key = _ambientIdx % LINEAGES.length
      _ambientIdx++
      traceChain(LINEAGES[key], key)
    }
    function traceChain(chain, key) {
      traceLayer.selectAll('.ambient').interrupt('ambient').remove()
      /* sample every hop path into one polyline, walked in ancestor→heir order */
      const pts = []
      for (const hop of chain.hops) {
        const L = hop.el.getTotalLength()
        const N = Math.max(10, Math.round(L / 5))
        for (let i = 0; i <= N; i++) {
          const f = hop.reversed ? 1 - i / N : i / N
          const p = hop.el.getPointAtLength(f * L)
          pts.push(p)
        }
      }
      if (pts.length < 2) { scheduleAmbient(6000); return }
      const dstr = 'M' + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('L')
      const trail = traceLayer.append('path').attr('class', 'ambient')
        .attr('d', dstr).attr('fill', 'none')
        .attr('stroke', '#cdb88a').attr('stroke-width', 1.5)
        .attr('stroke-linecap', 'round').attr('stroke-linejoin', 'round')
        .attr('filter', 'url(#trace-glow)').attr('opacity', 0.8)
      const total = trail.node().getTotalLength()
      trail.attr('stroke-dasharray', total).attr('stroke-dashoffset', total)
      const comet = traceLayer.append('circle').attr('class', 'ambient')
        .attr('r', 3.2).attr('fill', '#f3e6bd')
        .attr('filter', 'url(#trace-glow)').attr('opacity', 0.95)
      /* Pace, not a fixed span. A thread twice as long squeezed into the same
         2.8–5.6s just doubles the comet's speed, which is exactly where the eye
         loses the hop it is following — so length sets the duration, floored at
         ~0.9s a hop so a short descent still reads as a journey. */
      const DUR = Math.min(9500, Math.max(900 * chain.hops.length, total * 3.4))
      /* Arrival. Hung on this transition's 'end' rather than the fade's, and
         deliberately on 'end' rather than a timer: an interrupted comet (the
         viewer hovered, selected, opened a tour) fires 'interrupt' instead, so a
         descent nobody watched to the finish leaves no residue and no flare. */
      const run = trail.transition('ambient').duration(DUR).ease(d3.easeSinInOut)
        .attr('stroke-dashoffset', 0)
        .tween('comet', () => t => {
          const p = trail.node().getPointAtLength(t * total)
          comet.attr('cx', p.x).attr('cy', p.y)
        })
        .on('end', () => {
          layResidue(key, dstr)
          flareTerminal(chain.ids[chain.ids.length - 1])
        })
      run.transition('ambient').duration(1500).ease(d3.easeCubicIn)
        .attr('opacity', 0)
        .on('end', () => { trail.remove(); comet.remove(); scheduleAmbient(6000 + Math.random() * 4000) })
      comet.transition('ambient').delay(DUR).duration(1100).attr('opacity', 0)
    }

    /* ── public API ─────────────────────────────────────────────── */
    const api = {
      select(id, fly, opts) {
        if (!_ignitionDone) finishIgnition()
        if (state.pathLock) return
        stopAmbient()
        state.selected = id
        if (id) showPortrait(byId[id], true)
        if (id) setRoving(id)          // keep the keyboard tab stop on the active star
        applySelectVisual(id)
        if (fly && id) frameSelection(id, opts)
        onSelectRef.current(id)
      },
      clearSelection() {
        if (state.pathLock || state.tourLock) return
        state.selected = null
        applySelectVisual(null)
        scheduleAmbient(5000)
        onSelectRef.current(null)
      },
      flyTo(id, scale) {
        const n = byId[id]; if (!n) return
        const k = scale || 1.9
        svg.transition().duration(820).call(
          zoom.transform,
          d3.zoomIdentity.translate(W / 2 - k * n.x, H / 2 - k * n.y).scale(k)
        )
      },
      resetView() { fitView() },
      highlightPath(ids) {
        state.pathLock = true
        stopAmbient()
        renderEdgeLabels(null)
        const set = new Set(ids)
        const edgeSet = new Set()
        for (let i = 0; i < ids.length - 1; i++) edgeSet.add(ids[i] + '|' + ids[i + 1])
        gNode.classed('faded',    n => !set.has(n.id))
             .classed('receded',  n => !set.has(n.id))
             .classed('lit',      n => set.has(n.id))
             .classed('selected', false)
             .classed('route',    n => set.has(n.id))
        linkSel.classed('faded', true).classed('lit', false)
               .classed('route', l => {
                 const a = srcId(l), b = tgtId(l)
                 return edgeSet.has(a + '|' + b) || edgeSet.has(b + '|' + a)
               })
        styleEdgesByState()
        nodeLayer.classed('focusing', true)
        frameNodes(ids)

        /* ── lineage trace: animate glowing dots along the path edges ── */
        traceLayer.selectAll('*').remove()
        cancelAnimationFrame(state._traceRaf)

        /* collect the actual <path> elements in path order */
        const routePaths = []
        for (let i = 0; i < ids.length - 1; i++) {
          const a = ids[i], b = ids[i + 1]
          linkSel.each(function(l) {
            const s = srcId(l), t = tgtId(l)
            if ((s === a && t === b) || (s === b && t === a)) {
              routePaths.push({ el: this, reversed: s !== a, hop: i })
            }
          })
        }

        /* create trace dots — one per hop, staggered */
        const TRACE_DUR = 900
        const TRACE_GAP = 350
        const dots = routePaths.map((rp, i) => {
          const dot = traceLayer.append('circle')
            .attr('r', 3.5)
            .attr('fill', '#cdb88a')
            .attr('filter', 'url(#trace-glow)')
            .attr('opacity', 0)
          const tail = traceLayer.append('circle')
            .attr('r', 7)
            .attr('fill', '#cdb88a')
            .attr('opacity', 0)
            .attr('filter', 'url(#trace-glow)')
          return { dot, tail, path: rp.el, reversed: rp.reversed, hop: i,
                   startT: i * TRACE_GAP, dur: TRACE_DUR,
                   pathLen: rp.el.getTotalLength() }
        })

        const totalT = (dots.length - 1) * TRACE_GAP + TRACE_DUR
        let t0 = null
        state._traceActive = true

        function animateTrace(ts) {
          if (!state._traceActive) return
          if (!t0) t0 = ts
          const elapsed = ts - t0

          for (const d of dots) {
            const local = elapsed - d.startT
            if (local < 0 || local > d.dur) {
              d.dot.attr('opacity', 0)
              d.tail.attr('opacity', 0)
              continue
            }
            let frac = local / d.dur
            if (d.reversed) frac = 1 - frac
            const pt = d.path.getPointAtLength(frac * d.pathLen)
            const fade = frac < 0.1 ? frac / 0.1 : frac > 0.9 ? (1 - frac) / 0.1 : 1
            d.dot.attr('cx', pt.x).attr('cy', pt.y).attr('opacity', fade * 0.95)
            d.tail.attr('cx', pt.x).attr('cy', pt.y).attr('opacity', fade * 0.25)
          }

          /* loop: restart after a pause */
          if (elapsed > totalT + 600) {
            t0 = ts
          }
          state._traceRaf = requestAnimationFrame(animateTrace)
        }
        state._traceRaf = requestAnimationFrame(animateTrace)
      },
      clearPathHighlight() {
        state.pathLock = false
        state._traceActive = false
        cancelAnimationFrame(state._traceRaf)
        traceLayer.selectAll('*').remove()
        gNode.classed('route', false).classed('receded', false)
        linkSel.classed('route', false).classed('faded', false)
        applySelectVisual(state.selected)
        if (!state.selected) scheduleAmbient(5000)
      },
      /* the sky is covered by a full-screen overlay — stop drawing under it */
      setDormant(v) {
        if (_dormant === !!v) return
        _dormant = !!v
        applyDormancy()
      },
      setTourLock(v) {
        state.tourLock = v
        if (v) stopAmbient()
        else if (!state.selected) scheduleAmbient(5000)
      },
      litEdge(a, b) {
        linkSel.classed('route', l => {
          const s = srcId(l), t = tgtId(l)
          return (s === a && t === b) || (s === b && t === a)
        })
      },
      clearLitEdge() { linkSel.classed('route', false) },
    }

    apiRef.current = api

    /* ── opening state ──────────────────────────────────────────────
       Kicked off at the foot of the effect because finishIgnition starts the
       ambient heartbeat, and that timer is declared most of the way down here
       — called any earlier it lands in the temporal dead zone. Nothing has
       painted yet either way, so this looks identical to running at the top. */
    /* Ahead of the branch, so all three routes in (film, hidden-tab hold,
       already-seen) start their image fetches at the same moment: now. */
    loadPrimaryPortraits()

    if (cosmogonySeen()) {
      /* Already watched this session: open on the finished sky. finishIgnition
         lands every layer on exactly the values phase 5 arrives at, and starts
         the ambient heartbeat on its way out — so from here the only motion is
         lineages painting themselves across the edges, now and then. */
      finishIgnition()
    } else {
      armIgnition()
      if (!document.hidden) startIgnition()
    }

    return () => {
      clearTimeout(ignitionTimer)
      clearTimeout(dragHintTimer)
      cancelFullPrefetch()
      clearTimeout(_meteorTimer)
      clearTimeout(_ambientTimer)
      teardownSkip()
      state._traceActive = false
      cancelAnimationFrame(state._traceRaf)
      document.removeEventListener('visibilitychange', handleVisibility)
      sim.stop()
      svg.selectAll('*').remove()
      apiRef.current = null
    }
  }, [])

  return (
    <svg
      ref={svgEl}
      id="sky"
      role="group"
      aria-label="Star map of Greek mythological figures — arrow keys move between stars, Enter opens one"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
    />
  )
})

export default SkyGraph
export { CAT, LCOL, portraitEntries, portraitSources, mapPortraitVariant, warmFullPortrait, cosmogonySeen }
