# Theogony — A Web of Becoming

Interactive "celestial atlas" of Greek mythology — a D3 force-directed star map where each figure is a star whose brightness reflects its renown (connection count). Features cinematic guided tours, a 3D zodiac sphere, and a detail panel with original prose retellings. Built with React 18, D3 v7, and Tailwind CSS 3.

## Commands

```bash
npm run dev      # Vite dev server (localhost:5173)
npm run build    # Production build → dist/
npm run preview  # Preview built output
```

No test runner or linter is configured. `npm run build` is the only correctness gate — run it after editing data or components to catch broken imports/references.

## Deployment

Vercel, building from GitHub: every push to `claude/theogony-mythology-graph-79uv2` (the repo's default branch) redeploys production at **https://deities.vercel.app**. The per-deployment URLs (`deities-<hash>-dilyana.vercel.app`) sit behind Vercel login. The host builds from the repo, so `public/portraits/` and the portrait manifest are **tracked** — commit them after running the generator.

- **`vercel.json` sets browser caching.** `/assets/*` is content-hashed by Vite, so it is `immutable` for a year. `/portraits/*` is **not** hashed, so it gets `max-age=86400`: a regenerated portrait can take up to a day to reach a returning visitor — hard-refresh (Ctrl+F5) to check one. Don't drop the portrait header: the panel's hero warming depends on it (see Portrait loading).
- **`server.allowedHosts: ['.vercel.run']`** in `vite.config.js` lets the dev server answer inside a Vercel Sandbox preview. It affects `npm run dev`/`preview` only — production is static files.
- **`manualChunks` splits react and d3 out of the app chunk**, so a deploy that only changes app code leaves the vendor files (cached for a year) untouched. It matches on **module id, not package name**: naming `'d3'` alone catches only the umbrella entry, while the graph's actual code lives in the `d3-*` sub-packages, which would stay in the app chunk and be re-downloaded every deploy. Current split: app ~641KB, react ~138KB, d3 ~60KB, plus the three lazy overlays (23/7/6KB).

## Stack

| Layer | Tech |
|---|---|
| UI | React 18, JSX via Vite |
| Graph | D3 v7 (force simulation + zoom; D3 owns the SVG DOM directly) |
| Styles | Tailwind CSS 3 + custom CSS in `src/index.css` |
| Build | Vite 5 |
| Fonts | Cinzel (headings/labels), Crimson Pro (body/italics) — also EB Garamond, Caveat, Kalam loaded in `index.html` |

## Project Layout

```
src/
├── App.jsx                        # State root + all UI chrome (header, search, tours, path-finder, legend, detail panel, zodiac/guided-sky launchers)
├── main.jsx                       # React DOM entry
├── index.css                      # Tailwind + starfield/twinkle/float keyframes + graph & panel classes
├── components/
│   ├── SkyGraph.jsx               # THE graph — D3 celestial atlas, exposed as an imperative React ref
│   ├── DetailPanel.jsx            # Right-hand slide-in detail view (opens on node select)
│   ├── GuidedSky.jsx              # Full-screen guided tour overlay — a fixed reading column against the tale drawn as a constellation
│   ├── ConstellationStage.jsx     # Imperative SVG engine for abstract constellation animations — DEAD CODE: nothing imports it
│   ├── StoryOrbit.jsx             # Full-screen story overlay — a deity's tale as beat-planets on orbits — DEAD CODE: nothing imports it; ENTER THE STORY opens GuidedSky with a figureId
│   ├── ZodiacSky.jsx              # Full-screen zodiac view — auto-advancing carousel with caption panel + glyph strip
│   └── ZodiacSphere.jsx           # Interactive 3D-projected celestial globe of all 12 zodiac constellations
└── data/
    ├── mythology.js               # nodes[] (137 nodes) + links[] (256 links) — the entire dataset
    ├── deityStories.js            # Original prose retellings keyed by node id ({ story, source, beats? })
    ├── tours.js                   # Guided tour narratives — 11 tours with { id, title, kicker, beats: [{ fig, text }] }
    ├── zodiac.js                  # 12 zodiac signs with myth text, star coordinates, element accents
    ├── constellations.js          # Abstract constellation specs per deity for the ConstellationStage engine
    ├── categoryConfig.js          # category display labels + categoryOrder
    ├── linkTypeConfig.js          # link type labels + inverseLabel + linkTypeOrder
    └── archetypeMap.js            # Jungian archetypes: { description, color } + archetypeOrder
                                   # (retained but no longer rendered — see Detail Panel)

public/
├── portraits/                     # Drop portraits here — resolved by id, no code changes needed
│   ├── {id}-node.webp             # 192px head crop — tier-2 stars, StoryOrbit/GuidedSky orbs
│   ├── {id}-head.webp             # 360px head crop — the 12 tier-1 stars
│   └── {id}-full.webp             # 820px full-body — the Colossus figure in the DetailPanel
│                                  # all three are generated by scripts/gen-portraits.mjs, which
│                                  # also writes src/data/portraitManifest.generated.js — the only
│                                  # thing the runtime reads. Absent from the manifest = absent.
└── deities/                       # Legacy portrait folder — same conventions, still scanned
```

> **Color source of truth:** graph/category/link colors live in the `CAT` and `LCOL` OKLCH maps exported from `SkyGraph.jsx` — **not** in `categoryConfig`/`linkTypeConfig`, which now provide only display labels and ordering. `App` imports `CAT`/`LCOL` from `SkyGraph` (and `DetailPanel` imports `CAT`) to stay consistent.

> **Legacy note:** an earlier React-driven implementation (`GraphCanvas.jsx`, `DeityModal.jsx`, `FilterBar`, `LegendBar`, `NodeTooltip`, `Lightbox`, the `hooks/` and `utils/` dirs) was removed once `SkyGraph` + `DetailPanel` superseded it. Don't reintroduce per-tick React state for the graph — see the architecture section.

## Data Model

### Node schema (`src/data/mythology.js`)
```js
{
  id:               'zeus',               // unique; used for portrait filenames
  name:             'Zeus',
  epithet:          'Lord of Olympus',
  category:         'olympian',           // one of the 9 categories below
  gender:           'male',
  domains:          ['sky', 'thunder'],
  description:      '...',                // fallback prose if no deityStories entry
  origins:          '...',
  jungian_archetype:'King',              // key into archetypeMap; stored, not currently rendered
  notable_myths:    ['Titanomachy'],
  symbols:          ['thunderbolt'],
  roman_equivalent: 'Jupiter',           // shown as "≡ Jupiter" in the panel
  image_prompt:     '...'                // image-gen prompt; stored, not currently rendered
}
```

Portraits are resolved purely from `id` by convention (no `head_image`/`full_image` fields are read by the current code). `degree` and `prom` (renown) are computed at runtime, not stored.

### Story schema (`src/data/deityStories.js`)
```js
{ chaos: { story: 'Before anything else there was Chaos…', source: 'Hesiod, Theogony.', beats: [...] } }
```
Keyed by node id. `DetailPanel`'s "Origins" section renders `story` (falling back to `node.description`) with `source` as a citation line. Entries with `beats` array render as a vertical "Story Spine" constellation — each beat has `{ label, weight, text, figures? }` where `figures` are clickable navigation links. All prose is original; sources are public-domain (Hesiod, Ovid, Homer, Apollodorus).

### Tour schema (`src/data/tours.js`)
```js
{ id: 'titans', title: 'The Fall of the Titans', kicker: 'A Cosmogony', hero: 'cronus',
  beats: [{ fig: 'chaos', text: 'In the beginning…' }, …] }
```
11 guided tours. Every beat's `fig` must be a valid node id in `mythology.js` — `check-data` fails the build on a dangling one.

**`hero` is the figure the tale follows**, not its first beat: GuidedSky burns that one face at the centre of the constellation for the whole tour, which is the only place a tour says whose tale it is — the column's "Following …" credit line was dropped, so the face *is* the credit. It is an editorial choice — several tours open on the god who sets things in motion rather than on their protagonist (the Argonautica opens on Hera and is Jason's; the Gorgon opens on Poseidon and is Perseus's). `check-data` validates it too; absent, GuidedSky falls back to `beats[0].fig`.

A beat no longer needs a spec in `constellations.js` — nothing imports `ConstellationStage` any more (see the legacy note), so the checker's missing-spec message is a warning, not an error.

### Zodiac schema (`src/data/zodiac.js`)
```js
{ id:'aries', name:'Aries', symbol:'♈', figure:'The Golden Ram',
  element:'Fire', dates:'Mar 21 – Apr 19', motion:'rock',
  text:'When Phrixus and Helle fled…',
  b:[1], n:[[-64,24],[-28,10],…], e:[[0,1],[1,2],…] }
```
12 self-contained zodiac signs. `n` = star node `[x,y]` coordinates (-100..100 viewBox), `e` = edge index pairs, `b` = bright node indices. Element accents (Fire/Earth/Air/Water) map to OKLCH colors.

### Constellation schema (`src/data/constellations.js`)
```js
{ m:'breathe', hero:0, b:[0], n:[[0,-2],[…]], e:[[0,1],…] }
```
Keyed by node id. Same coordinate/edge format as zodiac. `hero` marks the focal star (largest, gold-tinged). `m` is the motion type (`breathe`, `drift`, `sweep`, `cradle`, `pulse`, `undulate`, `rock`, `shimmer`, `tip`, `writhe`).

### Link schema
```js
{ source: 'cronus', target: 'zeus', type: 'parent_of', label: 'father of' }
```

**9 categories:** `primordial`, `titan`, `olympian`, `chthonic`, `monster`, `hero`, `sea_deity`, `nymph_minor`, `mortal`
**9 relationship types:** `parent_of`, `birthed`, `transformed_into`, `cursed_into`, `created_by`, `lover_of`, `enemy_of`, `merged_with`, `split_from`

## Architecture: D3 + React Integration

This is **not** a React-renders-the-graph design. `SkyGraph` runs the whole D3 simulation inside a single `useEffect` and owns every element under `<svg id="sky">` directly — React never re-renders per tick. The component is wrapped in `forwardRef` and exposes an **imperative handle** (`useImperativeHandle`); `App` holds a `graphRef` and drives the graph by method calls.

```
App ──graphRef.select(id) / flyTo / highlightPath / setTourLock / litEdge / resetView──▶ SkyGraph (D3)
SkyGraph ──onSelect(id) callback──▶ App.setSelectedId(id) ──▶ <DetailPanel nodeId> renders
```

**The map is keyboard-operable through a roving tabindex.** 139 stars in the tab order would be unusable, so exactly one is tabbable (`tabindex 0`, the rest -1): the biggest hub at rest, then whichever star was last reached. Arrow keys move that stop to the nearest star within a ~60° cone of the pressed direction (scored `distance / alignment`, so it prefers close *and* well-aligned), Enter/Space selects, Escape clears; every star carries `role="button"` and an `aria-label` of name + epithet. **`api.select` calls `setRoving(id)`** so a mouse or search selection moves the stop too — otherwise tabbing back into the map returns the viewer to wherever they last were by keyboard, not to what they are looking at.

**Imperative API exposed by `SkyGraph`:**
`select(id, fly)`, `clearSelection()`, `flyTo(id, scale)`, `resetView()`, `highlightPath(ids)`, `clearPathHighlight()`, `setTourLock(v)`, `litEdge(a, b)`, `clearLitEdge()`.

**Selection/hover are CSS-class driven.** SkyGraph toggles `lit` / `faded` / `selected` / `route` / `focusing` classes on node `<g>` and link `<line>` selections; `index.css` styles the rest. `pathLock` (path-finder active) and `tourLock` (guided tour active) suppress hover so those modes stay stable.

**Force config** (`SkyGraph.jsx`):
- `forceLink` distance **`52 + (bodyR(source) + bodyR(target)) * 0.55`** (size-aware — see the tier table), strength **0.23**
- `forceManyBody` strength **-250**, `distanceMax` 480
- **`clusterForce` 0.065** — custom force pulling each node toward its category's anchor, so categories settle into constellations
- **`domeForce` 0.6** — soft ellipse containment: nodes past ρ 0.92 of the `DOME` ellipse get pulled back, keeping the field's silhouette circular
- `forceCollide` **`bodyR`** + **per-tier padding** (`COLLIDE_PAD` = 18/20/13), strength 0.92
- `alphaDecay` 0.028
- Pre-settles in **two passes**: 160 synchronous `sim.tick()`s, then collide is re-armed with **bake-corrected** radii and the sim is re-energised to `alpha(0.4)` for 200 more. Then the bake is applied, a **portrait separation pass** finishes the job, and it idles (a drag re-energises it)

**No portrait may overlap another, in any state — and the forces cannot promise that, so the last word is a pass over the final geometry.** `forceCollide` is a *soft* force at strength .92 in a field ~60% reserved by area, it reserves the pre-bake space, and its bake correction is radial-only; what it delivers is a good layout, not a guarantee about the rectangle the browser paints. So after the bake, `separatePortraits` relaxes the drawn geometry directly: no two portraits may come within `SEP_GAP` (4) of each other, measured on **`drawnR`** — the largest box a node ever draws, i.e. its *selected* size — so the guarantee survives hover, selection and a highlighted path rather than holding only at rest. Half the correction per pass, split so the smaller node yields more; ~60 passes converge to a 0.1px shortfall and it breaks early at a quarter-pixel. Tier 3 draws no `<image>`, so there the star is the mark.

  It is surgical, not a re-layout: **24-35 of the 139 nodes move at all, median move 0, largest ~19px, field ρmax unchanged.** Auditing every hover, selection and path state over 10 settles, overlapping pairs go **59 (worst 29px) → 0**, and the tightest resting gap between two portraits **15px → 24px**. Doing the same job by inflating the collide radius to the full box instead costs ~22% more reserved area, *still* leaves a residual pair or two, and pushes ρmax to 1.12 — which pulls the resting camera back and shrinks every glyph.

**After the bake the collide force stops correcting for the bake.** From that point the sim only ever runs on baked positions (a drag is the only thing that wakes it), so dividing by `bakeScaleAt` a second time double-counts — it inflates rim radii by up to 1/0.64 and the field blows outward on every drag. Measured over one 120px haul of Zeus: **ρmax 1.28-1.35 with the correction still in, 1.14-1.19 without**, and the overlap it leaves behind goes to zero. The woken sim reserves `max(drawnR + SEP_GAP, spaceFor)` — the drawn box, floored at the pre-bake per-tier reserve so the tail keeps its spacing — which is exactly what the separation pass established, so a drag maintains it instead of undoing it.

**The collide force has to undo the fisheye bake, and that is a second pass.** The bake below is not a uniform scale: radially it multiplies spacing by `dρ'/dρ = A·cos(ρA)/sin(A)` — **1.26× at the centre but 0.76× at ρ 0.8 and 0.64× at 0.9** — while tangentially it *expands* by `sin(ρA)/ρ·sin(A)`. `COLLIDE_PAD` is written in the screen space on the far side of that, so before this correction a gap the simulation satisfied *exactly* out in the monster/sea pocket arrived on screen a fifth to a third short. That was the entire residual overlap, and it is measurable by inverting the bake: every offending pair came back `simSatisfied: true` at 110.6px against 110.7 required, then squeezed to 88 (Typhon/Echidna), 50 (Echidna/Chimera), 21 (Sphinx/Hector). Dividing the collide radius by `bakeScaleAt` asks the sim for the pre-bake gap that lands on the intended one. **Measured: ~1.4 portrait overlaps per settle → 0 across 8.** Three things about it are load-bearing:
  - **It must be a second pass.** `forceCollide` reads its radius accessor once, in `initialize()`, when every node is still at its random start — a ρ-dependent radius computed then is computed from noise. Re-setting the force re-initializes it against settled positions.
  - **Alpha is re-energised to 0.4 for that pass**, not left at the ~0.01 it has decayed to. Collide can only push apart, never draw together, so a pass with cluster/dome/link asleep is a one-way inflation: the field grew past the resting camera's fit, the camera pulled back, every glyph shrank and the tier-2 labels dropped below their zoom threshold. Awake, the correction stays *redistributive* — tighter at the centre, wider at the rim, uniform once baked.
  - **Radial, not tangential.** A circular collide radius can only carry one, and the compressive axis is the one that collides.

  Things that look like fixes and are not, both measured: `forceCollide.iterations(3)` (7 overlaps / 6 settles → 10 / 8 — the pocket is over-subscribed, not under-relaxed) and doubling the pre-settle to 320 ticks (17 / 12 → 17 / 12).

**Celestial dome** (`DOME` in `SkyGraph.jsx`): the start-page field is shaped like a night sky projected on a sphere. Category `ANCHOR`s are remapped onto an ellipse (`DOME_ANCHOR`, outermost at ρ ≈ 0.8), `domeForce` keeps the silhouette elliptical, and after the pre-settle a **fisheye bake** (`ρ' = sin(ρA)/sin(A)`, `DOME_A` = 1.15, declared up beside `DOME` because the collide force has to undo it) is written into `d.x/d.y` once — the mid-field bulges and the rim compresses like a star globe seen face-on. Because the warp is baked into positions, every consumer (camera, hover, drag, labels, tours, path-finder) works in one coordinate space. A `dome-grid` layer draws the planisphere furniture: sky glow, declination rings, meridian spokes, a whispered horizon ring with degree ticks, and a tilted dashed gold ecliptic.

**The horizon is the limb glow, not a ring.** `dome-limb-glow` peaks *on* the horizon (offset 82% of a `RIM` 1.22 ellipse, so 1/RIM lands the peak exactly at ρ 1) at 0.30 of a desaturated navy and falls to nothing in both directions — outward into the void, inward into the core shade, which swallows the band's inner half. The drawn ring is held at **0.03** and its blurred 2.4px under-glow was deleted.

**The band's amplitude is calibrated to `ZodiacSphere`.** That view builds a boundary with *no* glow and *no* ring: a feathered mask (opaque to 68%, .45 at 88%, 0 at 100%) over a disc whose entire lift above the page background is `#111828` over `#06090f` — about **+11,+15,+25 of 255**. The sphere ends because its contents dissolve. So the limb's peak screens `#26324c` at 0.30, adding ≈ **+11,+15,+23** — the same delta, matched deliberately. The band can whisper because **four things already agree on where the horizon is**: the core shade sinks everything inside it, the frame vignette sinks everything outside it, `rimBias` peaks the starfield at this same radius, and the band marks the inflection between the two dark zones. It is not lighting the sky. Don't push the stops back up to make it read on a bright monitor — a saturated blue at 0.5 becomes atmosphere with a *colour*, which is a weather effect, not a limb. **The ring's 0.03 is tied to this amplitude, not chosen for itself:** `GRID` at 0.05 adds ~+7 of 255, a quarter of the band's whole peak concentrated in one pixel, so against a Zodiac-calibrated band the hairline read louder than the horizon it sits on. The ticks (0.07/0.035) track it for the same reason. Move the band and all three move together. This is the node glow fix at dome scale: a stroke there is a **bezel around the sphere** however soft the light behind it is, and a blur held at 0.12 is fog the gradient already does better across 250px than 3. The **degree ticks** dropped to 0.07/0.035 with it — 36 strokes left standing on a vanished ring are a dashed bezel, which is the same edge by another name; radial marks at a whisper read as a fringe *in* the band. No edge exists at any radius, and the sphere still ends somewhere you can point to. Don't restore the ring, the under-glow, or the ticks' old values.

**Renown / node size — three discrete tiers, not one curve.** `prom = sqrt(degree) / sqrt(maxDegree)` still ranks the figures, but size is a **step function**: 137 stars on a continuous curve all land in a mushy middle band and average into texture, leaving the eye nowhere to settle.

| tier | membership | count | radius | portrait | label at rest |
|---|---|---|---|---|---|
| **1 primary** | top `PRIMARY_COUNT` (12) by degree | 12 | 30 → 44 | yes | **always** |
| **2 secondary** | degree 3–8 | 63 | 8 → 12 | yes | no — at `#sky.zoomed-mid` |
| **3 tail** | degree ≤ 2 | 62 | 3.4 flat | **no** | no — at `#sky.zoomed-in` |

Tier 1 is **rank-based** (top N) so the count stays at a dozen as the dataset grows; 2/3 split on degree, where the distribution has its own shelf. Within tiers 1 and 2 a gentle `prom` ramp keeps figures distinguishable, normalised against **that tier's own prom span** (`tierBand`) so no tier collapses to a single size when the data shifts — but the ramps never approach each other, so tier membership reads at a glance.

`n.tier` (1/2/3) is the source of truth; **`n._tier`** ('primary'/'secondary'/'tail') is a derived string alias read by the lineage trace, band-label repulsion and portrait scheduling. The rule itself is **`TIER_BY_ID`, at module scope** — it falls out of the static dataset alone, and hoisting it is what lets the DetailPanel ask `mapPortraitVariant` which crop the map drew.

Consequences worth knowing before you touch it:
- **Tier 3 gets no `<image>` at all** (`gNode.filter(d => d.tier !== 3)`). A portrait inside a 3.4px dot is an unreadable smudge and 62 of them are noise; those figures keep their art in the DetailPanel. ~50 tail figures have portraits on disk that deliberately never appear on the map.
- **Selection grows to an absolute radius, not a multiplier** (`selRadius`) — `×1.7` on a 3.4px dot is still invisible, so tail dots jump to 13 while primaries only go ×1.3. `sizeNode(id, grown)` takes a **boolean**, not a scale. The ambient trace's `flareTerminal` floors against `selRadius` for the same reason.
- **Forces follow the glyph.** Link distance is `52 + (bodyR(source) + bodyR(target)) * 0.55` and collide padding is per-tier (`COLLIDE_PAD` 18/20/13) — the old flat `distance(66)` + `radius + 26` assumed one node size and, at a 13× spread, starves the primaries while the tail hoards space. Net field density actually *drops* (~72% → ~46%), because shrinking 62 tail nodes frees more than the 12 primaries take.
- **Spacing and labels measure the portrait, not the star — two different fractions of it.** A primary's star is ~32px but the art drawn on it reaches 46 (`IMG_SCALE`), so anything sized off `radius()` alone is measuring a mark nobody can see: Typhon's and Echidna's portraits sat inside each other while the simulation considered them a comfortable 30px apart, and every primary wore its own name across its face. Two helpers, because the two jobs want different amounts of the box:
  - **`bodyR`** (`radius × IMG_SCALE × 0.8`, tier 3 = `radius`) — art-vs-art spacing, used by the link and collide forces. The mask holds full alpha only to 55% of the box and is under .55 by 80%, so two portraits whose outermost fifths interleave don't read as a collision; reserving the whole box would spread the primaries for nothing.
  - **`glyphR`** (`radius × IMG_SCALE`, tier 3 = `radius`) — clearance for **opaque type**, which has to miss even the faint fringe: the node's own label offset (birth *and* `sizeNode`, via `glyphRAt(n, r)` so a grown node's name moves with it), the label-side test, and the band-label repel/dim passes, which already measured this and now share the helper.

`prom` itself is recomputed in DetailPanel and App's autocomplete for their own scales — those are independent of the graph radius and don't need to match it.

## Background Layer Stack

**Where the frames go, measured.** The whole atlas is one raster and it is regenerated every frame that anything in it animates, so per-element micro-optimisation buys nothing and the wins are all structural. Benchmarked head-to-head, 4 interleaved runs per build, 1440x900, headless software raster (so the absolute numbers are far below real hardware — the ratios are the point):

| | first pass | second pass | |
|---|---|---|---|
| resting sky | 4.5 → 13.0 fps | **19.7 → 57.0** | **2.9x** again |
| opening cosmogony | 6.5 → 12.8 | **16.0 → 33.3** | **2.1x** |
| dragging the sky | 3.7 → 10.0 | **19.5 → 59.8** | **3.1x** |
| opening a figure | 3.5 → 12.0 | **23.0 → 51.4** | **2.2x** |

Two rounds of work, on the same harness. (The two "before" columns don't line up because the harness was rebuilt for the second round and the machine differs; each round's own before/after is head-to-head, two runs each, and those are the ratios to trust.)

The **first pass** was three changes, each documented where it lives: the category halos stopped blending (1.81x), the field's slow drift stopped being a rotation (1.62x), and the selection bloom stopped being an SVG blur attached to all 139 nodes.

The **second pass** was one change and one deletion: every always-on CSS animation inside the two svgs became one stepped JS ticker (see *Ambient motion* below), and `.dome-limb` stopped blending (1.21x before the ticker, 1.25x after). **The resting sky is now at the vsync ceiling on this harness** — 57 of a possible 60 — so there is essentially nothing left to win at rest, and the remaining scenarios are bounded by work that has to happen (the cosmogony's own transitions, a camera flight's repaints), not by ambient motion.

**No SVG filter and no blend mode is charged on the resting atlas.** Two live exceptions, both deliberate and both measured: `.node .core.pip` carries two `drop-shadow()`s on the 12 primaries (measured at 1.02x — inside the noise, because it is 12 small elements), and `.depth-haze` still screen-blends in the backdrop (free now that the backdrop repaints 10 times a second instead of 60: 59.6 fps blended vs 56.2 unblended vs 60.0 deleted, all within noise — and unlike the limb its blend is *not* cosmetically neutral, at mean 4.08/255 with 11% of pixels moving. Don't "finish the job" on this one).

**Two stacked SVGs, not one.** `#sky-bg` holds the backdrop and `#sky` the atlas, absolutely positioned over each other; the backdrop takes no pointer events, so every click, drag and wheel still belongs to `#sky`. Everything inside one `<svg>` shares a single raster — Chrome gives an SVG's children no compositor layers — so before the split, one of the 139 node glows breathing re-rasterized the haze, the limb's blend and the starfield underneath it, and every star's twinkle re-rasterized the portraits, filters and edges above it. Three things keep the two halves in step, and all three are load-bearing:

- **The backdrop rides the camera.** It is inside the zoom, so `bgZoom` mirrors `zoomLayer`'s transform in the zoom handler — one attribute write per zoom event, against a whole raster per frame at rest. Verified equal to the digit after a settle.
- **`applyDormancy` sets `paused` on both**, and the CSS pause rules are keyed on bare **`.paused`** rather than `#sky.paused`: half those animations now live in the other svg. Nothing else in the app uses the class.
- **Neither svg isolates blending**, which used to matter because `.cat-halo` was `mix-blend-mode: screen` and reached the starfield through the layer below. **The category halos no longer blend at all.** A blend has to read its backdrop back, and nine halos spread across the viewport meant nine readbacks on every repaint of the atlas — which, per the note below, is every frame anything in it animates. They were the single most expensive thing on the field: dropping the blend took the resting sky from 4.8 to 8.7 fps (**1.81x**), nearly all of the 1.86x that deleting them outright would buy, for a mean image delta of **1.06/255** (A/B'd inside one page load, so same layout and same frame; deleting them is 17.33). At 0.12 peak alpha on a near-black sky, `screen` and source-over are the same picture. Don't put it back.
  **`.dome-limb` no longer blends either**, for the same reason and with the same verdict: it spans the viewport in the layer the backdrop repaints, so it was charged on every one of those repaints (1.21x before the ambient ticker, 1.25x after), and at 0.30 alpha over a near-black sky screen and source-over are the same picture — mean delta **0.59/255**, with only **16 pixels of 1.14M** moving more than 16/255 (bright stars under the band, which screen added to rather than covered). Deleting the limb outright is 1.98 by the same measure. The isolation rule still holds for anything that *does* blend in the atlas layer: if a stacking context is ever forced on `#sky` — `opacity`, `filter`, `will-change`, a `z-index` — such a blend silently stops seeing the sky behind it.

Bottom to top:

1. **Container gradient** — dark radial background (`#06080e` root), on the page under both svgs
2. **`haze-layer`** *(in `#sky-bg`)* — the drifting nebula (`.depth-haze`), an **annulus** whose peak sits at ~62% of a deliberately oversized, off-centre ellipse
3. **`bg` star layer** *(in `#sky-bg`)* — 420 procedurally-seeded background stars (seeded LCG, so the field is identical on every load at a given size); the brightest also get a soft-gradient `flare` that blooms and fades, and ~15% of the dots shimmer. Both are pulsed by the ambient ticker off `--flare-peak` and their own stored phases. Size/brightness peak in a **ring** via `rimBias`, not at the centre
4. **`limb-layer`** *(in `#sky-bg`)* — `.dome-limb`, the atmosphere glow that peaks on the horizon and *is* the horizon. Deliberately **not** inside `float-x`, so it sits in the same layer as the stars it lights rather than above them. It reads as a screen blend but is not one any more — see the layer note above
5. **`celestial-drift` group** — the whole atlas drifts a few px over ~2 min, against the backdrop's own `bg-drift`, for two-layer parallax. Written by the ambient ticker (below) as one composed translate that also carries `float-y`/`float-x`. **It used to be a ~3° rotation, and that one property was the most expensive thing left on the map.** The cost is not the animating, it is the *angle*: a subtree under a non-zero, non-right-angle rotation loses every axis-aligned fast path beneath it, and this subtree is 139 portraits, 139 text labels and 258 edges — rotated text in particular cannot come from the cached glyph atlas and is re-rendered as outlines on every repaint. Measured (median of 3, settled sky): animated rotate **8.3 fps**, *static* `rotate(2.8deg)` **9.1**, static `rotate(0deg)` **18.6**. Holding the field at an angle costs about half the frame budget whether or not the angle moves; stepping it from JS recovers **1.05x** and promoting the svg **1.10x**. Swapping the rotation for a translation keeps the drift and the parallax and is the whole win: **1.62x**. **Never give this layer, or `float-x`/`float-y` under it, a `rotate()`** — which now means never writing one into the ticker's composed transform. A third route was tried and rejected later: moving the drift onto the `<svg>` **element** as a CSS transform, hoping for a composited layer. An svg root with this much content in it is repainted, not composited — **22.1 fps, 1.13x**, against 57 for the ticker. `bg-drift` may still rotate — it carries no text and no images, and removing its angle measured nothing (1.56x vs 1.62x, inside the noise).
6. **`float-y` → `float-x` nested groups** — the bob and the slower drift that compose with `celestial-drift` into gentle organic floating, leaving physics positions untouched. **They are not GPU-composited**: Chrome gives an SVG's children no compositor layers, so a transform on a group inside `#sky` is not *moved*, it is **redrawn** — the whole field, every frame it changes. All three translations are now written as a **single composed `transform` on `celestial-drift`** by the ambient ticker; the two groups remain in the DOM as the wrappers everything else appends into, but nothing animates them and they carry no CSS of their own.

**Ambient motion — one stepped ticker, not 240 CSS animations.** Everything that moves on the idle sky (the drift and float above, 139 glows twinkling, ~6 hubs breathing, 63 background stars shimmering, 17 flares blooming, the haze, the backdrop's parallax) is driven from `stepAmbient` in `SkyGraph.jsx` at **`AMBIENT_HZ`** (10). It used to be one CSS animation per element, and replacing them is the single biggest win on this page: **19.7 → 57.0 fps at rest.**

The mechanism, and the correction it forces to what this file used to say here: **a *running* CSS animation is priced per frame, not per frame it changes.** Chrome regenerates the layer's raster while any animation on it runs, value change or not — so `steps()` buys nothing, which the old note here measured correctly (1.06x for stepping every twinkle, 1.05x for driving the drift from JS at 1/s). But it drew the wrong conclusion from it. It said the cost is *all-or-nothing per layer*, so the only remaining lever was **less motion**. That is wrong twice over, and both corrections are measured:

  - **It is not all-or-nothing.** Cost tracks the screen area the animating elements cover. 139 CSS-animated glows measure 18.8 fps, 75 of them 28.7, and 12 of them **38.5** — a third of the frame budget for a dozen elements. (Which is also why cutting the *count* is not a fix on its own: 12 is already too many when each is a 130px halo.)
  - **Stepping works, but only from JS.** The same 139 glows written from JS at 5Hz measure **57.0** — a frame nobody writes to is a frame nobody repaints, whereas a `steps()` animation is still *running* on every one of them. So the motion did not have to go; it had to change author.

  Measured at 1440x900, headless software raster, interleaved in one page load (60 = vsync ceiling, so 60 means free): whole ticker at 6Hz **55.0**, 10Hz **52.8**, 15Hz **48.7**; every CSS animation simply disabled, 60.0. 10Hz is the chosen rate — 6Hz measures ~4% better and looks it on the flares' quick bloom.

  Three things about the implementation are load-bearing, each with a failure mode:
  - **The glow writes go through `style`, not `setAttribute`.** The old keyframes animated the `opacity` and `r` *properties*, which outrank the attribute d3's transitions write. The ticker has to sit in the same channel to own it as unambiguously; write the attribute instead and its 10Hz steps interleave with a 60Hz d3 transition on the same node — the select nova and the ignition flare both write glow opacity that way — and the glow flickers between two authors.
  - **It stands aside for whoever owns a glow's radius.** `r` is cleared off a breathing hub while d3 drives it (hover swell, selection nova, lineage-arrival flare), tracked by `_grownId` / `_hoverId` / `_flareId`. This also fixes the reverse, which was a latent bug: the old CSS `hub-breath` silently overrode all three of those on exactly the ~6 nodes most likely to be hovered.
  - **Brightness still arrives through `--glow-base`.** It is the one per-element custom property that survived, because every emphasis path expresses brightness by writing it and the ticker reads it back on each step — so `hoverOn`, `applySelectVisual` and `flareTerminal` needed no change at all. The rest (`--twinkle-dur/-delay`, `--breath-dur/-delay`, `--glow-r/-peak`, `--shimmer-dur/-delay`, `--flare-dur/-delay`) went with the keyframes; the ticker holds those numbers itself, drawn off the same seeded stream in the same counts, so the field is still identical on every load at a given size.

  The ticker is rAF-throttled rather than a `setInterval`, so its writes land at the top of a frame; it stops on dormancy and never starts under `prefers-reduced-motion`, where the birth attributes leave a complete but static sky (verified: 139 nodes, 75 portraits, 420 stars, glows and flares visible).
7. **`dome-grid` layer** — the celestial-sphere furniture (`.dome-core` shade, declination rings, meridian spokes, the 0.05 horizon ring + its ticks, ecliptic) that frames the field as a night-sky dome
8. **`clusters` / `links` / `residues` / `traces` / `nodes` layers** — cluster labels, relationship lines, the accumulated lineage web, the live comet, node glyphs

Adding `.paused` to either `<svg>` halts the few animations that are still CSS (the selection bloom, the dash-flow on lit transformation/curse edges); `applyDormancy` sets it on both, and — the part that now matters far more — stops the ambient ticker.

**The sky sleeps when nothing can see it.** A hidden tab and a full-screen overlay are the same condition, so one switch (`applyDormancy`) owns the `paused` class, and `setDormant(v)` on the imperative API is how `App` reports that GuidedSky / StoryOrbit / ZodiacSky are up. Each of those is `position: fixed; inset: 0` over an **opaque** ground at z-index 1000, so everything the map draws under one is unseen: ~63 shimmering stars and 17 blurred flare blooms, 12 dash-flow links, the top 6 hubs' breath, the drifting haze, the ambient comet — and above all the two float layers, which transform the whole graph group (139 nodes, 258 edges) and so re-rasterize it every frame. It is charged **twice**, because the overlays hold `backdrop-filter` panels over that region (`.so-caption` blur(10px), `.so-tale-veil` blur(6px)) and a backdrop that changes every frame can never be cached — the blur is recomputed for each one.

- **Dormancy's main job is stopping the ticker**, which is where the sky's motion now lives; the `paused` class only reaches what is still a CSS animation.
- **Dormancy pauses animation, not the camera.** GuidedSky flies the map to each beat's figure *underneath itself*, so closing a tour reveals the sky already standing on the last figure. `paused` is CSS-only; `select()` and zoom transitions keep working. What dormancy does take is the **820ms camera flight** — `frameSelection` jumps instead while dormant, since the arrival is the point and nobody can watch the travel. StoryOrbit's figure chips are the exception and lift dormancy *before* calling `select`, because there the viewer asked to travel and is about to be looking at the map.
- **`.so-root.reading` stills the orbit while the full tale is open**, for the same backdrop-cache reason: `.so-tale-veil` is a full-viewport `backdrop-filter`, and every twinkle behind it re-blurs the whole screen. The orbit under it is already 6px blurred and dimmed, so nothing is lost.

**Value structure — the sky is lit from its rim.** The brightest band of the composition is the limb straddling the dome's horizon, and the core falls away toward black, so every node reads as a **light mark on a dark ground**. Five things enforce it together and are only correct as a set: the limb glow (`dome-limb-glow`), the core shade (`dome-core-shade`, near-black at ρ 0, gone by the horizon — it sits above the starfield, so it sinks the centre stars too), the ring-shaped haze, `rimBias` on the starfield, and the `.atlas-main::after` frame vignette, which stays clear until **68%** so it cannot bite into the limb and then drives the corners (outside the sky ellipse) hard toward black. The vignette's clear zone is coupled to the band's width — at 62% it clipped the outward half, which is the half that has to fade to nothing on its own. The inner declination rings and the ecliptic carry a small opacity lift to survive the darkened core they cross.

Don't reintroduce a centre-bright wash anywhere in this stack. It lifts the backdrop above the content's own values, and the field sinks into a hole. For the same reason the **`cat-halos` are kept faint** (0.12 → 0.045): they land directly behind the nodes, so every point of opacity there is contrast taken from the figures standing on them. They are drawn with **normal** blending, not `screen` — see the layer-stack note above.

## Opening Cosmogony & the Resting Sky

The sky builds itself once, then keeps a slow pulse. Both live in `SkyGraph.jsx`.

**The ignition** (`startIgnition`) is a ~13.4s generational film: starfield out of black → dome grid → category halos → generation titles → edges drawing in gold → nodes flaring wave by wave (Primordials → Titans → Olympians → sea/wild → heroes/monsters) → a parallax settle from 20% over-zoom.

- **`PACE` is the only tempo knob.** Every wave time, duration, delay and stagger in the sequence is written as `pace(n)`, so the whole film stretches or tightens from one number while the phases keep their relative rhythm. `1` = the original ~8.4s cut; it currently runs at `1.6`. Don't re-tune the individual literals against each other.
- **It plays once per page load, not once per browser session.** `cosmogonySeen()` / `markCosmogonySeen()` gate it with a plain **in-memory module flag** (`_cosmogonySeenThisLoad`) — *not* `sessionStorage`, which this doc claimed for a while. The flag lives as long as the module does, so it scopes the film to a StrictMode remount and resets on every real refresh: **every reload replays the whole ~13.4s film.** **Add `#intro` to the URL to force a replay** within a load.
- **Seen is marked in `finishIgnition`, not at the start**, so only a run the viewer actually reached the end of (or deliberately skipped) burns the flag — a reload halfway through, or StrictMode's throwaway first mount in dev, still owes them the film.
- **The kickoff is the last statement in the effect**, because `finishIgnition` starts the ambient heartbeat and that timer is declared far below the old call site — calling earlier lands in its temporal dead zone. Nothing has painted yet, so its position is visually irrelevant.
- `finishIgnition()` is the single landing function for all three routes (natural end, deliberate skip, already-seen); it sets every layer to the values phase 5 arrives at. The one thing `armIgnition` touches that it doesn't is the `links`/`nodes`/`clusters` layer opacities, which are 1 by default — that's why the already-seen path can skip arming entirely.
- `App`'s hint timer imports `cosmogonySeen` to fade at 5s instead of 14s when there's no film to wait out.

**The resting motion is the ambient lineage trace** (`runAmbient` / `traceChain`) — every few idle seconds a gold comet paints a thread along one line of descent, the heir it reaches flares, and the thread stays behind as residue. It lives in its own `traceLayer`, never touches selection/hover edge state, and yields the instant the viewer hovers, selects, or opens a path or tour.

**The comet arrives, and the arrival persists** — the sky at minute ten is not the sky at minute one. On the arrival of each trace, `layResidue` clones the thread into `residueLayer` at `RESIDUE_OP` 0.12 over a 4s fade-in and `flareTerminal` blooms the heir's glow (~700ms). A full cycle draws all nine descents; the web of becoming literally accumulates.

- **Residue lives in `residueLayer`, a sibling of `traceLayer`, not inside it** — `highlightPath`/`clearPathHighlight` clear `traceLayer` with `selectAll('*').remove()`, and the accumulated web has to survive the path-finder.
- **Residue is keyed by lineage index (`data-lin`) and replaced, never appended to.** Nine threads re-traced forever would otherwise pile 0.12 on 0.12 until the genealogy was a bright cage; re-laying also re-reads current geometry, so a thread stays true after a drag has moved its stars. Verified: 14 lay events → 9 paths in the DOM, each a `rm`+`add` pair, opacity flat at 0.12.
- **No `#trace-glow` on residue**, unlike the live comet: a blur held at 0.12 reads as fog rather than a line, and nine permanently filtered paths are a standing cost on every frame the sky drifts.
- **Arrival hangs off the draw transition's `end`, not a timer.** An interrupted comet fires `interrupt` instead, so a descent nobody watched to the finish leaves no residue and no flare.
- **`flareTerminal`'s peak radius is `max(r * GLOW_R_NOVA, selRadius(d) * GLOW_R)`, not a bare multiplier** — the same reason `selRadius` floors tier 3 at an absolute 13. `growLineage` walks to the *furthest* heir, and the furthest heir of a line is by construction a leaf, so this lands on a tail dot far more often than a primary: ×2.2 of a 5px halo is 7px of nothing and the arrival goes unseen (measured ×1.4 → invisible, vs ×3.8 → reads). Primaries still take the full nova, which outruns the floor on its own.
- **`.residues.hushed` (0.25) whenever the viewer drives anything.** Toggled off/on by `stopAmbient`/`scheduleAmbient`, which every mode entry and exit already calls — no new call sites. A faded link sits at `.03`, so 0.12 of gold left standing over a dimmed field would outshine the very route being highlighted.
- **`stopAmbient` restores a flaring glow without a transition.** `hoverOn` calls it and then immediately starts its own `glow-shimmer` on `r`; two live transitions writing one attribute is a coin flip per frame.
- The nine `LINEAGES_RAW` entries are **seeds, not final chains.** `growLineage` extends each one down to its furthest heir and back up to its eldest ancestor along `parent_of`/`birthed` edges only, so a thread stays a strict descent rather than wandering into a marriage or a feud. `extend` takes the **longest** branch rather than the first it steps into — Zeus alone has ten children and most are leaves, so a greedy walk stalls after one hop. Result: avg 5.2 hops (was 2.8), 47 hop-traversals per full cycle. This genealogy tops out at 7 hops.
- **Build `kids`/`sires` through `srcId`/`tgtId`.** By the time this block runs, the simulation has replaced every link's `source`/`target` string id with the node **object**; reading `l.source` raw yields an `[object Object]` key, and the resulting `undefined.push` takes down the whole effect (blank sky).
- Comet duration is **pace, not a fixed span**: length-driven with a ~0.9s-per-hop floor. A fixed span makes a longer thread simply travel faster, which is where the eye loses the hop it's following.

## Node Glyphs & Portraits

Each node `<g>` stacks: a `glow` halo circle, a gold `sel-halo` bloom circle (invisible until `.selected`/`.route`), a `core` circle, a **frameless** portrait `<image>`, and a `node-label` text.

- **The core is a disc for tiers 2/3 and a *pip* for tier 1.** `coreRadius(n, r)` returns `r` for the small tiers — there the disc IS the mark, so it carries a lot of the family colour and is the most legible thing on the field — but `r * CORE_R` (0.2) for a primary, near-white/gold (`#fff7e0`, `.core.pip`, the same `.cl-core.hero` mark the constellation stages use for a hero star). At 30–44px a full-radius pale disc is a lit *plate*: its hard circular edge reads as a bezel around the face however softly the portrait's own mask fades, and it lifts the backdrop the figure has to stand on. Shrunk to a point, the gradient halo carries the light outward and the figure floats *in* that light — a star that happens to have a face in it. The pip stays **under** the portrait (the light the face is lit by, not a glint punched over it), so on most primaries it burns invisibly; what it is really for is the primaries with no artwork, which have to read as stars on their own. It also drops the primary's prom opacity ramp — the tier's radius ramp already carries that difference into the pip.
- **Both core paths go through `coreRadius`** — birth and `sizeNode` — since a pip on one of them only is a flicker on selection.

- **The glow's softness is a gradient, not a filter.** It fills with a per-category `node-glow-{cat}` radial gradient (1 → 0.58 → 0.19 → 0 alpha) and carries **no `#glow` filter**. A flat fill softened by the shared 3.2px blur is a glow on a 3.4px tail dot and a hard-edged disc on a 44px primary, where 3px of feather is 7% of the radius — and the filter was conditional on `prom > 0.65`, so hubs just under it (Hera, 0.638) drew a crisp coloured circle ~140px across. Because the gradient is `objectBoundingBox`, one falloff holds from the tail dot to a nova'd primary. Don't put a flat `fill` back on `.glow`.
- **Every glow radius goes through `GLOW_R` / `GLOW_R_PEAK` / `GLOW_R_NOVA`** (1.5 / 1.8 / 2.2 × the star radius) — rest, hub-breath peak, hover flare, ignition flare, selection nova, and `sizeNode`. These were six scattered literals; sizing one path alone puts the halo out of proportion with its star on that path only.
- **The lit-state swell is tier-aware — the portrait's as well as the halo's.** `.nodes.focusing .lit .glow` scales 1.5 and `.core`/`image` scale 1.3, but tier 1 overrides both: **1.12** for the halo (already ~65px of radius; 1.5 pushes two lit primaries into each other and over the small stars between them) and **1.08** for the portrait, which is the part that can actually collide. A primary's art is 87-128px across and the field is spaced for that box, so the old shared 1.4 added a fifth of it back on every node of a lit constellation at once — hovering Cronus drove Zeus's and Hera's faces 25px into each other, and Gaia's over Uranus. It also swallowed the node's own name, parked at `glyphR + 6` in *resting* geometry: 1.4× on Zeus's 64px box lands 19px past it, printing the label across the face the hover just revealed. **Measured across every hover/selection/path state over 8 settles: 1.4/1.4 → 43 overlapping pairs, 1.08/1.3 → 0.** A lit primary's emphasis is carried by its glow and by the field dimming around it; at 128px, 8% is already a visible step.

- Portraits are **not** cropped to a circle and have **no ring** — the `<image>` spans `IMG_SCALE` (1.45×) the node radius and dissolves into the sky via a CSS radial-gradient mask (`.node image` in `index.css`). A CSS mask (not an SVG one) is deliberate: it re-rasterizes at paint resolution, so the fade stays smooth at any zoom.
- Selection/route emphasis is **light, not a frame**: `.sel-halo` (a soft gold disc behind the core) breathes via `@keyframes gold-bloom` and leaks through the portrait's faded edges as a rim-light. **Its falloff is a radial gradient (`#sel-bloom`), not an `feGaussianBlur`** — the same swap the starfield flares took. The filter was attached to all 139 nodes at birth even though the halo is invisible at rest and shows on at most a couple of nodes at a time, so the whole field carried a blur region forever; the map now uses **no SVG filters at all** at rest. The gradient is held **flat to 70%** of `SEL_BLOOM_R` and only then falls away, because the old `feMerge` put the sharp disc back over its own blur: the bloom was a flat disc out to 1.45r with a ~10px spill, not a soft ball. A gradient that starts fading early visibly drains the selection — that was tried and rejected.
- The portrait `<image>` stays at opacity 0 until a candidate actually loads (otherwise the browser paints a broken-image glyph if a generated file is damaged after manifesting), and its `href` is set lazily by the bounded portrait queue.
- URLs come from **`portraitSources(id, prefer)`** / **`portraitEntries(id, prefer)`** (exported from `SkyGraph.jsx`, shared with `DetailPanel`, `StoryOrbit` and `GuidedSky`; **`mapPortraitVariant(id)`** goes with them, answering *which* variant the map itself drew), read straight out of `portraitManifest.generated.js`. **A consumer names the size it is about to draw** — `'node'` (192px), `'head'` (360px) or `'full'` (820px) — and gets that variant first, then larger ones as fallbacks. `portraitEntries` returns the full record (`src`, `width`, `height`, `bytes`, `type`), so a consumer can reserve the right shape *without decoding the image first* — the DetailPanel does exactly this. Absence from the manifest means absence on disk, so the sigil/orb fallback raises immediately rather than being discovered through a chain of 404s.

**Portrait loading is a level-of-detail system, and the sizes are the point.** Three rules, each measured:
  - **Tier 2 draws the `node` tier, tier 1 draws `head`** (`nodeVariant` in `SkyGraph`). A tier-2 star spans ~30–45 CSS px at rest and ~65–100 at the k=1.9–2.2 that `flyTo` and search land on, so the 360px crop it used to load was 16–36× the pixels it could ever show. Measured: the tier-2 sweep on a zoom-in went **1738KB → 513KB (−71%)**, with a quarter of the decode. Past ~2.5× manual zoom `node` does go soft — that is the deliberate ceiling, and the node mask (full alpha only to 55% of the box) carries most of it. Don't "fix" it with an upgrade fetch; that spends the win back on the one path nobody navigates.
  - **The 12 primaries are queued at the foot of the effect, not from `finishIgnition`.** The cosmogony is a ~13.4s film (`IGNITION_MS`) with an idle network under it, and the primaries used to wait it out — so **not one image byte was requested for the first 13.4 seconds** and the first face landed well after the sky did. Starting at t=0 is invisible either way: the `<image>` holds opacity 0 until it loads and its node is dark for most of the film. **Secondaries deliberately do not come forward with them** — `loadVisibleSecondaryPortraits` gates on `_ignitionDone`, because phase 5's parallax settle drives `zoom.transform` at k > 1 and would otherwise fire a secondary sweep mid-film that takes the four queue slots from the faces the entrance is about to reveal.
  - **`prefetchFull` warms the DetailPanel hero on hover *dwell*, not on hover.** ~180ms of rest, because pointer-crossing the field fires `hoverOn` for every node under the path and speculating on each would put megabytes of full-tier art on the wire. It is **not tier-gated** — a tail dot has no portrait on the map but opens the same panel, and is the case with nothing cached — and sits outside the portrait queue, so one speculative image can't take a slot from a face on screen. Skipped under `navigator.connection.saveData`.
  - **The panel warms where the reader goes next.** Once its own hero's bytes arrive (or it turns out to have no art), `PanelContent` warms the heroes of its linked Bonds — `BOND_MAX` (3), the same constant that caps the row, ~700KB — through **`warmFullPortrait(id)`**, exported from `SkyGraph` at module scope so the hover dwell and the panel share one ledger and never fetch a plate twice. Never *before* the hero lands, so a warm can't slow the figure being opened. Measured on bond-to-bond navigation at 20 Mbit/s, 150ms RTT: median hero-ready **~420ms → ~100ms**, worst 1022 → 258.
  - **A plate that was already cached skips the long dissolve.** `.col-figure-img.instant` / `.col-figure-ground.instant` cut the .5s transition to `FAST_FADE_MS` (.16s) when the bitmap was ready within `CACHED_UNDER_MS` (200) of the box mounting — the dissolve exists to cover a fetch, and a warmed Bond has none, so at .5s the figure landed well after the panel it belongs to. Both flags are set in one commit so the shortened duration is in place for the same style recalc that flips the opacity. Worth knowing what this does **not** fix: a switch flies the camera, and the flight repaints the whole map at **7-11 fps**, so time-to-opaque only goes 696-903ms → 443-712ms. The frame rate during the flight is the floor, not the transition.
  - **Warming only pays off with the `vercel.json` cache header.** Under Vercel's default `max-age=0, must-revalidate`, a warmed plate is *still* revalidated when the panel mounts it — a 0-byte 304 that costs the whole round trip, which is most of the wait. `/portraits/*` now carries `max-age=86400` (see Deployment), so a warmed or previously-seen plate comes off disk in ~2ms.
- Always-on; no toggle — but **only for tiers 1 and 2** (see the tier table above; tier 3 has no `<image>` element at all). Nodes carry `.tier-1` / `.tier-2` / `.tier-3`, which drive both label visibility and the lit-state scale; `degree === 0` additionally gets `.nolabel`.

## Detail Panel — "Colossus"

`DetailPanel` is a right-hand slide-in `<aside class="detail-panel">` (off-canvas via `translateX`, `.open` slides it in). It renders for the selected node and is the only detail surface (there is no modal/lightbox).

It is a **stage, not a scrolling column of sections** (layout `3a Colossus` from `Detail Panel.dc.html`). The figure takes the right two-thirds outright at near-full panel height; all type is held to **one narrow measure on a strict left margin**, with the name's optical centre level with her face. There is no hero card, no section rules, no scroll.

**Geometry** is proportional to the design frame (940px panel over 1400×848) and lives entirely in `index.css`:

| band | span | element |
|---|---|---|
| wash | 0 → `--panel-wash` (11%) | `.col-wash` — transparent→plate gradient; the star field bleeds under it |
| plate | 11% → 100% | `.col-plate` — the opaque `#07090f` surface |
| measure | 11% → 45% | `.col-type` — `min(34%, 384px)`, never wider |
| figure | 47% → 105% | `.col-figure` — deliberately overruns; the panel clips it |

- **Panel width is `--panel-w`** (`:root` in `index.css`, `clamp(520px, 67vw, 1180px)`) — the single source of truth, alongside `--panel-wash`. `.tourbar` sizes itself against it (floored at 300px so the wider panel can't squeeze it to nothing).
- **`SkyGraph` measures `.detail-panel .col-plate`, not the panel** (falling back to `.detail-panel`). The wash is see-through sky, so reserving it would throw away screen the graph can still use.
- **The panel is `pointer-events: none`;** only `.col-plate`, `.col-type` and `.col-close` re-enable it. The wash *looks* like open sky, so clicks have to pass through to the stars under it.
- **Figure — the box takes the art's shape, not a share of the panel.** `.col-figure` is the *zone* (45% → -6%, flex-centred, ambient bob); `.col-figure-in` is the box, `aspect-ratio: var(--fig-ar, 2/3)` where `--fig-ar` is written from the img's `naturalWidth/naturalHeight` on load. **This is load-bearing:** on most screens the panel is far wider relative to its height than the 1400×848 design frame, so a percentage box comes out near-square, `contain` renders 2:3 art well inside it, and every mask's falloff lands on empty box while the art's own rectangular edge stays hard at ~70% opacity. Box = art, and the masks dissolve edges you can actually see.
- **Three nested elements, because each can carry only one mask** without `mask-composite`, and no single mask takes all four edges to zero: `.col-figure-in` fades head and feet (vertical linear), `.col-figure-veil` fades left and right (horizontal linear), `.col-figure-img` carries the radial vignette. The img holds `opacity: 0` until `.ready`, so a 404 in the candidate chain can't flash a broken glyph across 800px.
- **The figure arrives in two passes, and the stage is shaped before either.** The hero is an 820px plate (~230KB) and used to be the only thing in the box, so opening a figure meant a blank stage until all of it arrived. Three fixes, none costing a bundle byte: (1) `--fig-ar` comes from **`portraitEntries(id,'full')`** — the manifest has carried exact dimensions since generation, so the box takes the art's shape on the first render instead of reflowing when a decode finishes; (2) `.col-figure-ground` sits under the hero — a head crop standing in for a whole figure, so it is blurred past legibility and scaled to cover: it contributes the plate's colour and value in roughly the right place and nothing else, which is all a placeholder has to do; (3) the two **cross-fade**. Because the box is now `.ready` on the first frame, **the hero fades on its own `.loaded` class** — hanging that off `.ready` (as it did while `--fig-ar` came from `onLoad`) now lands before any pixel does and skips the fade entirely.
  - **The ground asks `mapPortraitVariant(id)`, not `'node'`.** Its whole premise is that the crop is already cached because it is the star just clicked — but the map only draws the 192px `node` crop for **tier 2**; the 12 primaries are drawn from the 360px `head`. Hardcoding `'node'` therefore made the placeholder a second, *cold* request on exactly the dozen faces most likely to be clicked — the one case the two-pass exists for and the one case it was missing. `mapPortraitVariant` is exported from `SkyGraph` off the module-scope `TIER_BY_ID`, which is also what the effect stamps onto its node clones, so there is one tier rule rather than two that can drift.
  - **`load` is not the moment the hero is visible** — it is the moment it starts a 0.5s climb from opacity 0. Dropping the ground there emptied the stage for precisely the interval the ground was mounted to cover. It is held through the fade and taken out from under a hero that is already up (`.col-figure-ground.out`, then unmounted on a timer — `transitionend` never fires if the browser collapses the fade, and the ground would sit in the DOM forever as an invisible blurred layer). The hero also waits on **`img.decode()`** before flipping `.loaded`: with `decoding="async"` the first frames of a fade can land on nothing, and the wait is free underneath a placeholder that is still up.
  - **That dissolve is what now carries the "materialize".** `holo-materialize` used to animate `filter: blur(7px) brightness(1.4)` on `.col-figure-in` — the box holding both the hero *and* the ground's static `blur(26px)` — so every frame of every figure switch re-rasterized that subtree through two nested blurs. It is opacity + transform only now (composited), at **.46s** rather than .7s: the panel's own entrance is .34s (slide) and .38s (sections), so the largest element in it was taking twice as long as everything around it. Blurred plate → sharp figure reads as the same gesture and a static blur rasterizes once.
  - A **16px LQIP data-URI per figure was measured and rejected**: 28.7KB in the main bundle, on the critical path this work exists to shorten, to speed up a secondary interaction the cached `node` tier already covers for free.
- **`HoloSigil` fallback** (no portrait, i.e. `ratio` still null): the rotating 3D constellation of the node's top neighbors — perspective-projected, depth-sorted, rAF-driven, pausing when the tab is hidden — centred in her place via `.col-sigil`.
- **Name sizing is length-driven.** Cinzel renders lowercase as small caps and runs **~0.71em/glyph** with the .03em tracking, so at the design's 96px "Persephone" is four columns wide. `.col-type` is a `container-type: inline-size` container and `nameCq()` sets `--name-cq` in `cqw` from the name's **longest word** (not its total length — "Colchian Dragon" wraps at the space and only has to fit eight glyphs), with 0.84 as the per-glyph divisor for headroom on wide-letter names. `.col-name` caps it at 96px. That keeps the display size right at every panel width — don't reintroduce a viewport-only `clamp()` here, and don't lower the divisor: `.col-type` is `overflow-x: hidden`, so an over-wide name is silently chopped.
- **Prose** (`Prose`) shows the opening only — `deityStories[id].beats[0].text` for a chaptered figure, else the head of `story.story` (→ `node.description`); the rest is behind ENTER THE STORY in the GuidedSky overlay. No citation line: the source sits with the prose it credits, in the overlay. `.col-prose` caps at ~7 lines; a `ResizeObserver` toggles `.clamped` (a bottom fade mask) only when it *actually* overflows the live measure — a character count would be right at 384px and wrong at 200px.
- **One story door per figure, and it is ENTER THE STORY.** The panel holds the opening; the overlay holds the rest, for **every** figure — so the panel has no reading surface of its own. It used to: `READ THE FULL STORY` (`.col-read`) swapped the measure into a scrolling in-panel reader (`.col-story`) of `story.story`. That put two gold doors on one measure, and on the 119 chaptered figures it was a *third* path to prose the overlay already showed behind FULL TALE. Both are deleted — the button, the reader view, the `reading` state and its focus/scroll effect, and ~75 lines of `.col-read*` / `.col-story*` / `.col-type.reading` CSS. What made that possible is that **GuidedSky now opens a chapterless figure too** (see `tale.prose`); before, `figureTale` returned `null` without beats and those 20 figures had nowhere else to read.
  - **`hasTale` is `chapters || story.story`, not `beats.length`.** All 139 figures have a `deityStories` entry (119 chaptered, 20 prose), so every figure gets the door. A figure added with no entry at all gets none — there is nothing for the overlay to open — and falls back to `node.description` in the measure.
- **The foot is five `Row`s in two registers.** Every row shares one skeleton — a Cinzel label, dot-joined values, truncated with the remainder spelled out in **arabic** (`+14 more`, so the count reads as information rather than roman decoration), no chips/borders/bullets — but they are split into two groups, because five identical italic lines of the same size read as a receipt rather than as information. `.col-rows-attr` holds **Domains, Symbols, Myths** (attributes: italic, 16px, dim, 5px gaps — one tight block); `.col-rows-nav` holds **Bonds** and **Tales** (navigation: upright, 17px, a step brighter, gold hover underline on `.col-link`). **Upright type is the click affordance — don't set a non-navigable row in it.** That is why **Myths stays with the attributes** despite reading as titles: a myth name is a keyword with no target behind it. **Bonds** are the top-degree neighbours and call `onNavigate(id)`; **Tales** come from the module-level `_talesByFig` index (walks `TOURS` once, mapping node id → tales with the **first** beat index where the figure takes the stage) and call `onOpenTale(tourId, beat)` → the Guided Sky overlay opens *at that chapter*. Myths use `emphasize={_famousMyths}` (shared by 3+ figures) → `.col-em`.
- **The eyebrow accent is gold, not the family colour.** The panel's chrome is uniformly gold (`#cdb88a`) — the eyebrow ✦, the epithet, the CTA — so the eyebrow star is gold too; the category's coral/violet/etc. lives on the figure aura (`.col-aura`), the sigil, and the map, never orphaned on a single glyph in the text column. The `roman_equivalent` (`≡ Jupiter`) sits **before** the `.col-eyebrow-rule`, so the rule always runs to the measure's right edge — the same column boundary the CTA's right border lands on (one shared, visible right edge for the measure).
- **ENTER THE STORY is a real button, not a caption.** `.col-enter` is a bordered, padded, full-measure hit area (hover: brighter border + fill + shadow), with a dotted leader pushing its `meta` to the right. **`meta` is the tale's length in the unit the figure actually has** — `5 CHAPTERS` where it was cut into them, `2 MIN` (`readMinutes`) for a prose figure, both spelled in arabic. A prose figure has no chapter count, and labelling it `1 CHAPTER` off the synthesized beat would be a lie about what opens. Its right border defines the measure's column boundary (see the eyebrow rule above).
- **Cut in this layout:** the holographic hero chrome (scanlines, light sweep, opacity flicker, cursor tilt — calibrated for a small square hero, noise across 820px of face), the `StorySpine` vertical constellation and its `MiniConstellation` (already unreachable, since `App` always passes `onOpenStory`), and the per-section `Section`/`QuietList`/`TaleList` scaffolding. **Archetype** and the **Connections** list were cut earlier and stay cut — the graph is the relationship surface.
- **`{id}-head.webp` is a real head crop.** A node glyph is ~40px across and a whole standing figure shrunk into that is an unreadable speck, so `scripts/gen-portraits.mjs` frames the head *before* downscaling. Framing comes from `scripts/head-boxes.json` — 71 figures framed by hand as `{ cx, cy, s }` (head centre as a fraction of source width/height; square side as a fraction of source **width**) — and from a fallback for everything else: square sources are already busts and pass through whole, while a standing figure gets the top 42% of its detected subject, centred on the median x of its upper band. Detection keys on local **detail energy**, not brightness: the figures are often the same value as their backdrop, but the backdrop is smooth and they are not. Re-running needs `portraits-src/` (gitignored, not in the repo). Sources that are pure landscape or artefact (charybdis, rhea, uranus, tartarus, helios) have no head to find — they crop to their subject and that is the intended result.

  **A hand box can be wrong, and it fails silently — as a dark disc.** A full audit of all 118 head tiers re-framed **32** of them (`scripts/head-boxes.json` now holds 80 hand boxes). The failure is always the same shape: the crop lands on the crest, the crown, the neck texture or a blank flank, with the eyes clipped off an edge and the rest of the square filled by the plate's backdrop. Masked into a node that is a shadow with a sliver of figure in it, not a face — the symptom to look for. Three rules the audit produced:

  - **Frame for the circle, not the square.** The `.node image` mask holds full alpha only to **55% of the box** and is under .55 by 80%, so a crop that looks perfectly composed as a square renders as a tight centre circle — a face that fills its square arrives on the node as a pair of eyes (`theia`, `cronus` and `medusa` all failed exactly this way). Size `s` so the whole head sits inside the middle ~60%, which usually means a **visibly loose** square.
  - **The animal and creature plates need a much larger `s` than the human busts** — .48–.85 vs ~.30. A dragon's, whale's or lion's head is a far bigger fraction of its plate than a person's.
  - **Verify by rendering, don't estimate off the plate.** Reading `{cx, cy, s}` by eye off a source contact sheet was wrong more often than right here (`sphinx` was estimated at cx .29 and is actually **.86**). The reliable loop is to render candidate boxes *through the mask* and look at them; three or four rounds converged where eyeballing did not.

  Sources that genuinely have no head are a separate category and are working as intended: `helios`, `uranus`, `charybdis`, `rhea`, `tartarus` (landscape/artefact), `erebus` (an empty hood — that *is* the figure), `ariadne` (the figure is back-turned; the box frames the head from behind), `phorcys` (a spiky mass with no face).

  **Name the file for the node id — this is still biting.** `proteus`'s artwork was filed under **`porteus`**, a transposition, so that node rendered as a bare star. Renamed in `portraits-src/`, `public/portraits/` and the `head-boxes.json` key. Four orphan outputs generated from raw Midjourney filenames (`u1722994559_Diomedes_…`, `u1722994559_Salmacis_…`) were deleted; the two raw sources still sit in `portraits-src/` beside the correctly-named copies and will regenerate them on the next run — delete the raw pair if you want that to stop.

## Guided Sky — the Reading Column

`GuidedSky.jsx` is a full-screen overlay presenting the tours from `tours.js` (layout `Guided Sky - Reading Column.dc.html`). The screen is cut in two and **the cut never moves**: an opaque column of type on the left, the tale drawn as a constellation across everything to its right. Its own namespace is `.gsr-*`; the `.gs-*` classes it used to wear are now only ZodiacSky's and StoryOrbit's.

**The column is a three-row grid — `auto minmax(0,1fr) auto` — and that is the layout.** Which tale this is sits in the top row, the chapter in play in the middle, the transport at the foot, and none of the three moves as the story advances; only the prose changes, so a reader settles their eye once and never hunts for it again. That is the whole difference from the caption card this replaced, which sat over the art and grew and shrank with the beat.

- **The middle row hangs its prose from the bottom** (`.gsr-read-pad`, a flex spacer above it), so a two-line beat and a six-line one share a baseline instead of floating at different heights. The pad shrinks to nothing before any text is clipped, and the row scrolls only if a beat genuinely outruns a short viewport. Two things make that true and are easy to undo by accident:
  - **The spacer is `flex: 1 1 0`, not `1 1 auto`.** On a basis of `auto` it contributes its own height to the row's intrinsic size, which is a rounding error away from overflowing a row it exactly fills — a scrollbar down the measure with nothing to scroll.
  - **The beat sits inside `.gsr-beat-block`, which clips.** The entrance rises from `translateY(14px)`, and **a transform counts toward a scroll container's scrollable overflow** — with the beat as the row's last child, every chapter change grew a scrollbar for the whole second of the animation, 14px of phantom overflow, exactly the translate. The block clips it; at rest there is no transform and nothing is clipped, and a genuinely long beat still makes the block too tall and scrolls the row.
  - Both scroll surfaces (the row, and the tale picker) restyle the scrollbar: the app's global one paints an 8px `#090c13` track, which down the right edge of a text measure reads as a rule someone drew there.
- **The column's ground is a horizontal gradient** — opaque to 55%, gone by 100% — so the constellation's left edge drifts under type rather than stopping at a seam. Nothing is drawn under it: every hand-set path starts at x ≥ 18% of the plane.
- **The constellation is hand-set per beat count** (`PATHS`, 4–8 — every length the dataset actually has), each sweeping from the lower left up over the top and down to the right, irregular on purpose: no orbit, no symmetry, no equal spacing, so it reads as a figure someone traced rather than a diagram. Measured over 1280×800 / 1440×900 / 1920×1080, the tightest star↔star gap is 88px and the tightest star↔hero 29px, with nothing off-frame.
- **A longer tour added later is relaxed, not just jittered.** `pathFor` falls back to an even sweep of the same corridor with a fixed-hash jitter, then runs 60 separation passes against `sep` (`clamp(160/n, 13, 20)` units) and the hero's clearance. The jitter alone is not enough: at nine chapters it leaves a pair **30px inside each other**, and at twelve, 11px. Relaxed, the same counts come out **+66 / +27px** clear.
- **The hero is static; the chapters are not.** One face holds the centre for the whole tour while the narration travels around it — which is why the tour needs a `hero` in its data rather than reusing the beat's figure the way StoryOrbit's sun does.
- **A dashed grey polyline draws the whole figure from the first chapter**, with the told part inked over it in gold. The reader can see the tale's shape and how much sky is left before they have read any of it. Both strokes are `vector-effect: non-scaling-stroke` under a `preserveAspectRatio: none` viewBox — the viewBox is stretched to the plane, so without it the dashes come out as long dashes on one axis and dots on the other.
- **The plane leans, it does not pan** — 13% of the current chapter's offset from the hero, over 2.2s. Enough that an advance reads as the sky turning under the tale; more, and the constellation reads as a map being scrolled past a fixed camera.
- **The rail is place-marker and dwell timer in one.** At rest it stands at the end of the chapter in play; under autoplay (`.ticking`, keyed on the chapter so it restarts) it crosses that chapter's own segment over exactly `beatMs`, so it always ends where the resting position would have put it. The inline `animationDuration` is what supplies the shorthand's missing duration.
- **Chapter labels are the numeral alone.** The figure's name is set once, large, in the column; repeating it eight times across the sky only competes with it.
- **Portrait tiers follow the drawn size**, as everywhere else: chapter stars are 44–96px and ask `portraitSources(id, 'node')` for the 192px crop, the hero orb asks for `'head'`. Both are frameless, dissolving through the same radial mask `.node image` uses on the map.
- **The hero's diameter is `--hero-d`, `clamp(190px, min(15vw, 26vh), 240px)`** (was a flat 164px), with `.gsr-hero-glow` at 1.8× it — the ratio the old flat 300/164 had, so the light the face floats in grows with the face. The room it has belongs to the *plane*, not the viewport, so it scales: **192px at 1280×800, 216 at 1440×900, 240 from 1600×900 up.** Two things bound it:
  - **Spacing is measured on 0.8 of the box**, the map's `bodyR` rule — both orbs carry the same mask (full alpha to 55%, under .55 by 80%), so interleaving outer fifths are not a collision. Over every live tale length against `PATHS` 4–8, the tightest hero↔chapter body gap runs **44px at 1280×800 to 107px at 1920×1080** (against 55–138px at 164px). The binding case is always the 8-chapter path's second star at `[32,51]` on the smallest plane; two tours are 8 chapters long, so it is live. Narrow (`--pscale` .5) the orb goes 82 → 95px and the tightest gap is 18px on a 390px phone.
  - **The head crop caps it.** The orb draws from the 360px `head` variant, so 240px is a 1.33× upscale at DPR 2 — carried by the mask's soft outer fifth, but it is the ceiling. Raising the cap means generating a larger crop first (needs `portraits-src/`, which is not in the repo), not just changing the number.
- **Autoplay** dwell scales with the beat's length (`beatMs`), rests at the last chapter; ▶ or spacebar toggles. **Navigation:** arrow keys, ‹ ›, or clicking a star. **Tale picker:** OTHER STORIES in the column head; esc closes it, then the overlay.
- **A figure whose story was never cut into chapters opens here as prose** (`tale.prose`, set by `figureTale` when `deityStories[id]` has `story` but no `beats` — 20 of 139). ENTER THE STORY is every figure's only door, so this view is what is behind it for them: the reading row opens on the retelling entire (`showFull`, the `gsr-full` block, headed *The Tale*), the plane keeps the hero orb and stands everything else down — no chapter stars, no dashed figure, no rail or transport — and the foot's hint shrinks to *esc to close*. Two details are load-bearing:
  - **The tale carries one synthesized beat** (`{ fig: id, text: story.story }`) that is never rendered. `beat.fig`, `beatMs(beat)`, `stars[cur]` and `onBeatChange` are read unconditionally all through the component, so the alternative is a guard at every one of them; a placeholder object keeps the chapter machinery honest instead.
  - **`showFull = fullOpen || tale.prose`, and `fullOpen` stays the reader's own toggle.** Everything that leaves the full tale — the FULL TALE button, arrow keys, ▶, Escape, `selectTale` — is keyed on `showFull` or gated on `!tale.prose`, so a view with nothing behind it cannot be stepped out of into a blank chapter. Escape closes the overlay from there rather than "going back to chapters" that do not exist.
- **`initialBeat` prop:** the chapter to open on (clamped to the tour's length). The DetailPanel's Tales rows use it to land the reader on the chapter where that figure enters; the gold thread still traces from chapter Ⅰ up to it.
- **Narrow (≤900px) the cut turns horizontal** — column across the foot, constellation above — and `--pscale` shrinks every orb at once, since their sizes are inline px chosen for the wide stage. **The plane has to end exactly where the column starts** (`bottom` = the column's `height`): it is not enough for it to be merely shorter than the column is tall, because the constellation is laid out in % of the plane and its lowest chapters sit at 75% — at `bottom: 36%` against a 66%-tall column, the opening chapter and the hero both parked behind the plate. The column's rows also keep a `max-width` there, so a full-viewport-wide column still has a reading measure and one shared right edge, and `.gsr-read-pad` is dropped — the row is short and the measure wide, so a beat is two or three lines and the spacer only opens a void above it.
- **`ConstellationStage` is not involved** and has not been for some time; it remains dead code (see the legacy note).

## Zodiac Sky (3D Celestial Sphere)

`ZodiacSky.jsx` + `ZodiacSphere.jsx` render a full-screen 3D-projected celestial globe with all 12 zodiac constellations on the ecliptic.

- **Auto-advance carousel** cycles through signs every 6s; resets on any manual interaction
- **3D projection:** sphere radius 220 SVG units, ~22° ecliptic tilt, perpetual slow drift (0.03 rad/s). Smooth rotation easing (8x/s) toward the selected sign.
- **Selected sign prominence:** 1.8x node scale, doubled halo glow, thicker edges (1.5px + 3px glow), 17px bold label — non-selected dimmed to 0.25 opacity for high contrast
- **Interaction:** click a constellation or a glyph in the bottom strip; drag to rotate the sphere; arrow keys advance signs
- **Caption panel:** shows sign glyph, name, figure, element, dates, and myth text

## App Features (`App.jsx`)

`App.jsx` holds all state and renders the chrome around `<SkyGraph>`:

- **Search** — `SearchBox` with an `AutocompleteInput`; picking a figure calls `graphRef.select(id, true)`.
- **Tours** — two entry points: the in-graph TourBar (older, step-by-step with `litEdge` highlights) and the full-screen GuidedSky overlay (cinematic, autoplay). Both use `tours.js` data.
- **Path** — `PathPanel` runs `bfs()` over an adjacency map between two figures and calls `highlightPath(ids)` to route the graph; the panel lists each hop with its relationship label.
- **Legend** — `LegendPanel` popover, built from `categoryOrder`/`linkTypeOrder` + `CAT`/`LCOL`.
- **Zodiac** — launches `ZodiacSky` as a full-screen overlay.
- **No hover tooltip — hover names the star itself.** The `<div id="tip">` card (category dot, name, epithet, connection count) was removed, along with its `mousemove` positioner. Its headline was a second copy of something already on screen: `.nodes.focusing .node.lit .node-label` lights the hovered node's name **and every lit neighbour's** to full opacity at any zoom and any tier, 14px from the star, so for 136 of the 139 figures the card restated a label it was simultaneously covering. What it uniquely carried — the epithet and the connection count — is one click away in the panel, whose Bonds row spells the remainder in arabic. It was also the last piece of furniture in a design that had removed every other one: a 1px border, a radius, a drop shadow and a `backdrop-filter` blur, on a map that argues at length for frameless portraits, a core pip instead of a lit plate, and a horizon ring held at 0.03 because a stroke there is a bezel. **Don't reintroduce it** — and read a proposal to make it dodge as the symptom it is: a card that needs to project all 139 nodes and score eight seats to stop covering the stars the hover just lit is a card in the wrong place by construction.
- **Both full-screen overlays are `React.lazy`** — GuidedSky and ZodiacSky each drag in their own engine and are only reachable behind a button, so they leave the initial bundle (verified: a cold load fetches `index`/`react`/`d3` only, and `GuidedSky-*.js` arrives on the first STORY click). A `<Suspense>` veil covers that fetch, and **`OverlayBoundary`** sits above it: a lazy chunk that fails to arrive — a blip, or a stale chunk name after a deploy — throws during render and would otherwise white-screen an atlas that is still perfectly good, so the boundary offers Reload / Back to the sky.

### State

```
selectedId       — selected node id (drives DetailPanel + graph highlight); null = none
legendOpen       — legend popover visible
pathOpen         — path-finder panel visible (hides search; clears selection)
tourMenuOpen     — tour dropdown visible
activeTour       — current TOURS entry (null = no tour)
tourStep         — index within the active tour
hintFaded        — fades the "click a star" hint after first interaction / 9s
storyOpen        — GuidedSky cinematic overlay visible
storyTourId      — which tour the GuidedSky overlay opened with
storyBeat        — which chapter it opens on (0 from the STORY button; the figure's
                   entry chapter when opened from a DetailPanel Stories row)
storyFigId       — set by ENTER THE STORY: the figure whose own tale GuidedSky opens
                   with (chaptered, or prose — see tale.prose). null for a tour
zodiacOpen       — ZodiacSky overlay visible
```

Selection is push-based: graph → `onSelect` → `selectedId`; App → `graphRef` imperative calls → graph. Opening Path or starting a Tour clears the current selection so modes don't overlap.

## Extending the Dataset

Edit `src/data/mythology.js` (nodes/links) and optionally add a matching `src/data/deityStories.js` entry. For guided tours, add the beat to `src/data/tours.js`; a tour also names a `hero` (see the tour schema). Run `npm run build` to verify there are no broken references. To add imagery, drop the artwork in `portraits-src/` and run `node scripts/gen-portraits.mjs` — it writes all three tiers into `public/portraits/` (head-cropping the two small ones from **one** shared box) and regenerates `src/data/portraitManifest.generated.js`. **Files dropped straight into `public/portraits/` are no longer picked up**: the runtime reads only the manifest, so art has to go through the generator to exist. `--manifest-only` rebuilds just the manifest; `--dry` reports without writing. **Then commit both `public/portraits/` and the manifest** — the deployed site is built from the repo, so art that exists only on your disk never ships, and an untracked manifest fails the host's build outright (`SkyGraph` imports it). If the auto-framing misses a face, add a `{ cx, cy, s }` entry for that id to `scripts/head-boxes.json` and re-run. **Name the source file for the node id exactly** — that id is the only thing a portrait is resolved by, so art filed under a variant spelling silently never loads and its figure stays a bare star. (`callisto`, `euryale`, `tethys`, `graeae`, `muses` and `gorgons` were each filed under a variant once, and were invisible until renamed.)

## Type Readability Floor

The sky is dark and the chrome is deliberately quiet, but "quiet" was being spent
down to where QA could not read it. Two floors now hold across `index.css` and the
inline styles in `App.jsx` / `DetailPanel.jsx`, and both are easy to undo one
declaration at a time:

- **No reading text below 4.5:1** against the surface behind it. The app's grounds
  run `#06080e` (page) → `#07090f` (panel plate) → `#131a2b` (the lightest overlay
  core), so a colour is only safe if it clears 4.5 on the *lightest* of those. The
  muted scale is three steps, all measured against all four grounds:
  **`#9aa3b4`** (6.8–7.9, bright secondary — row values, prose asides),
  **`#8a94a6`** (5.7–6.6, mid — the default for quiet chrome, and `--faint`),
  **`#7a8396`** (4.6–5.3, floor — captions, tooltips' second line, hints).
  Gold-family labels take **`#a2916a`** (5.6–6.4) or **`#9b8b63`** (5.2–6.0) rather
  than the old `--gold-dim` `#8c7d59`. Anything dimmer than the floor now is either
  a border, a gradient stop, a separator, or dead `.wf-page` CSS.
- **No Cinzel label below 12px, and no reading text below 14px.** Cinzel renders
  lowercase as small caps and every eyebrow here carries .12–.34em tracking, so a
  small label is letterforms with more gap than stroke. The first pass at this only
  lifted the worst cases to 10.5px and left the rest, which on a real screen still
  read as decoration rather than as text; the floors are now a whole step up and
  applied across every surface at once, so the app has one scale rather than a
  per-component one:

  | register | size | where |
  |---|---|---|
  | Cinzel eyebrow / row key / small-caps button | **12 – 13.5px** | `.gsr-kicker`, `.gs-kicker`, `.col-row-k`, `.so-cap-head`, `S.hbtn`, the legend heads |
  | Cinzel title inside a panel | **15 – 17.5px** | `.gsr-tale-t`, `.so-sun-name`, `.so-tale-head .t` |
  | Cinzel heading *over its own prose* | **19 – 24px** | `.gsr-beat-head .l` — the chapter in play, which has to outsize the beat under it |
  | italic caption / citation / hint | **14 – 15.5px** | `.gsr-source`, `.gsr-hint`, `.gs-hint`, the atlas's bottom hint |
  | italic epithet under a title | **15.5 – 18px** | `.gsr-following` — a figure's epithet in the reading column, at `#9aa3b4` |
  | body a reader actually reads | **16.5 – 20.5px** | `.col-prose`, `.gsr-beat`, `.gsr-full p`, `.gs-narration`, `.so-cap-body p` |

  The graph's relationship labels (`.link-labels text`) are the one exception at
  **11px** — they ride an edge and cannot take more, but 9.5px was reading as
  texture on the line rather than as a word.

Three things move with the sizes and are not independent of them:

- **Tracking comes down as size goes up.** .26–.4em was holding a 10.5px label
  together; at 12.5px the same tracking only adds width the measure has to find, and
  every tracked eyebrow here sits in a narrow column. So each label that grew lost
  .02–.06em with it (`.gs-kicker` .4 → .34, `.col-row-k` .26 → .2, `.gsr-beat-head
  .l` .22 → .12). Don't raise one without the other.
- **A box measured in px has to grow with the type inside it**, and three did:
  `.col-row-k`'s fixed **84px** (was 62 — "SYMBOLS" at 12px is ~74px and spilled
  into the gap onto its own value), the legend popover's **290px** (was 248 — the
  two-column grid wrapped "Nymphs & Minor"), and `#tip`'s **276px** max-width.
  `EDGE_LABEL_H` in `SkyGraph` (10 → 12) is the same thing for the edge labels'
  de-collision boxes, and `StoryOrbit`'s `capMinHeight` (`maxLen / 71 * 28`) for the
  caption's reserved height. `.col-enter` also gained `flex-wrap`, since at a narrow
  measure it can no longer hold its label, leader and chapter count on one line.

- **A floor is measured on a colour and read on a *face*.** `.gsr-following`
  (a figure's epithet under the title) sat at `#7e879c` — **5.6:1** on the
  reading column's ground, comfortably over the floor, and still hard to read:
  fine-stroked EB Garamond *italic* at the dimmest step in the column, directly
  under 30px of near-white title. Passing the ratio is necessary, not
  sufficient; a light italic serif needs a step or two of headroom that upright
  Crimson at the same size does not. It is `#9aa3b4` (7.9:1) now, which also
  undid an **inversion** worth checking for elsewhere: at `#7e879c` it was
  *dimmer* than the citation line beneath it (`#8a94a6`), so the head read
  title → source → epithet. (`#7e879c` survives once more, on `.zs-label` in
  the zodiac sphere — a different ground, and dimmed to .25 for unselected
  signs, so it was left alone.)
- **A floor is not a hierarchy.** Raising every reading size at once inverted
  one pair: `.gsr-beat` went to `clamp(17.5px, min(1.7vw, 3.3vh), 28px)` while
  its own heading stayed flat at 16px, so the chapter head read as a caption on
  a body — and because only the prose scaled, the inversion got worse the wider
  the window (0.65:1 at 1440, 0.57:1 at 1920). A heading and the prose it heads
  are **one relationship, not two sizes**: both are now written on the same
  `min(vw, vh)` and hold **~1.2:1** at every viewport (head 19–24px, prose
  17–20.5px). Two things that look incidental and are not: the head's floor is
  the *higher* one (19 vs 17), because both bottom out at the ≤900px breakpoint
  and the ratio would vanish exactly where the column is widest; and the ≤900px
  block then steps both up (22/18.5), since the measure there is up to 620px
  against 330–440 wide, and a 17px line across 620px runs ~78 characters.
  `.gsr-full p` shares `.gsr-beat`'s expression exactly — it is the same prose
  in the same measure, and a size step on the FULL TALE toggle read as a
  different typeface.
- **Opacity multiplies the contrast.** A tier-2 node label at `.52` of `#c4cad6`
  lands near 3.4:1 however bright the fill is, so the zoom-gated label opacities are
  **.74 / .88** (tier 2 at `zoomed-mid` / `zoomed-in`), **.76** (tier 3), **.92**
  (tier 1). Same reason the GuidedSky chapter numerals run **.58 → .82 → 1**
  (ahead → told → current) instead of starting at .34: the three states still read
  as a progression, just above the floor rather than through it.
- **The value structure is untouched.** These changes are all *type* — the limb
  glow, core shade, haze, `rimBias`, vignette, `cat-halos` and the dashed
  constellation strokes keep their measured values. Lifting a backdrop to make text
  readable is the fix this section exists to avoid; brighten the glyph, never the
  ground behind it.

## CSS Classes of Note

| Class | Purpose |
|---|---|
| `.node` + `.lit` / `.faded` / `.selected` / `.route` | Per-node highlight states toggled by SkyGraph (hover, selection, path/tour routes) |
| `.node .glow` (+ `.hub-breath`) | The family-coloured halo. Its `opacity` — and a hub's `r` — are written by the ambient ticker through inline `style`, so anything that wants to brighten a glow writes `--glow-base` instead and lets the ticker read it |
| `.nodes.focusing` | Dims the field while one node + neighbors are emphasized |
| `.node.tier-1` / `.tier-2` / `.tier-3` | Renown tier — primaries (permanent 15px label), secondaries (label at `zoomed-mid`), tail dots (label at `zoomed-in`, and a harder `scale(2.8)` when lit so 3.4px dots read inside a constellation) |
| `.node.nolabel` | Hide the label at rest for isolated (`degree === 0`) nodes — a lone name in empty sky is clutter. **Hover overrides it** (`.nodes.focusing .node.nolabel.lit`): with the tooltip gone, that label is the only thing that names those three figures (`hecate`, `daphne`, `gorgons`) short of opening them |
| `.cluster-label` | Category constellation labels above each cluster |
| `.node-label` | Per-node name text |
| `.star` / `.flare` | Background starfield dots and the soft-gradient bloom that flares on them — both pulsed by the ambient ticker, which is also the only thing that sets their `opacity` |
| `.dome-limb` / `.dome-core` / `.depth-haze` | The sky's value structure: rim glow that peaks on the horizon and **is** the horizon, at the Zodiac sphere's amplitude (the drawn ring is 0.03; **not** blended — see the layer stack) / near-black core shade / drifting nebula **ring**, turned by the ambient ticker and still screen-blended, deliberately. Rim-lit, never centre-lit |
| `.float-y` / `.float-x` | Inert wrappers now — the bob and drift they used to animate are composed into `.celestial-drift`'s transform by the ambient ticker. Everything still appends into `float-x`. **Translations only — never a `rotate()`**: an angle puts every portrait, label and edge under it on a rotated raster path (see `.celestial-drift`) |
| `.residues` (+ `.hushed`) / `.residue` | The accumulated web of becoming — one faint gold thread per traced descent, kept outside `.traces` so the path-finder can't clear it. `.hushed` (0.25) while the viewer drives anything |
| `.link-transformed` / `.link-cursed` | Animated dash-flow on transformation/curse links (`@keyframes dashFlow`) |
| `.detail-panel` (+ `.open`) | Off-canvas right panel; `.open` slides it in. `pointer-events: none` — its children opt back in |
| `.col-wash` / `.col-plate` | Colossus panel surface: see-through left gradient / opaque plate (SkyGraph measures the plate) |
| `.col-figure-ground` (+ `.out`) | The map's own crop of this star (`mapPortraitVariant` — `node` for tier 2, `head` for a primary) held under the hero — blurred hard, `cover`. `.out` fades it as the hero fades in; unmounted after |
| `.col-figure` > `.col-figure-in` > `.col-figure-veil` > `.col-figure-img` | The figure: zone + ambient bob / art-shaped box (`--fig-ar`) + head-foot mask / left-right mask / radial vignette biased up-left (face survives, busy lower-right corner falls off — two intersected mask layers). `.ready` fades the img in |
| `.col-type` | The measure — a `container-type: inline-size` container so `.col-name` can size in `cqw` |
| `.col-name` / `.col-epithet` / `.col-prose` (+ `.clamped`) | Display name (capped 96px, `--name-cq`) / gold epithet / opening prose with overflow fade (no drop-cap — the title carries the opening flourish) |
| `.col-row` + `.col-row-k` / `.col-row-v` | Foot rows: Cinzel label → dot-joined values (`.col-sep`, `.col-more`, `.col-em`) |
| `.col-rows-attr` / `.col-rows-nav` | The two foot registers — quiet italic attributes / upright navigable rows whose `.col-link`s underline in gold on hover |
| `.col-enter` (+ `.col-enter-rule`) / `.col-close` | ENTER THE STORY — the panel's one story door: bordered CTA button, dotted leader to the tale's length (chapters, or minutes for a prose figure) / bare ✕ |
| `.panel-section` | Staggered fade-in, used by the Colossus main + foot blocks (`@keyframes panelFadeIn`) |
| `.story-text::first-letter` | Drop-cap on the StoryOrbit reader prose |
| `.tourbar` (+ `.open`) | Bottom guided-tour caption bar |
| `.pop-in` | Quick scale/fade entrance for popovers (legend, path, tour menu) |
| `.sel-halo` | Gold selection bloom behind the star (`@keyframes gold-bloom`) — a `#sel-bloom` radial gradient, no filter |
| `.core` (+ `.pip`) | The star mark — a family-coloured disc on tiers 2/3; on tier 1 a near-white `.pip` at 0.2r with a tight bloom, so the portrait floats in the gradient glow instead of on a plate |
| `.gsr-root` / `.gsr-column` / `.gsr-plane` | Guided Sky: overlay root / the three-row reading column (`auto minmax(0,1fr) auto`) / the constellation, which leans against the chapter in play |
| `.gsr-star` (+ `.on` / `.told` / `.ahead`) / `.gsr-hero` | A chapter, ignited in story order — halo + frameless orb + numeral / the figure the tale follows, static at the centre |
| `.gsr-web-all` / `.gsr-web-trace` | The tale's whole figure in dashed grey / the told part inked over it in gold |
| `.gsr-rail-fill` (+ `.ticking`) | Place-marker and autoplay dwell timer in one — `.ticking` crosses the current chapter's segment over `beatMs` |
| `.gs-root` / `.gs-caption` / `.gs-name` | Shared cinematic-overlay chrome — now ZodiacSky's and StoryOrbit's only (GuidedSky wears `.gsr-*`) |
| `.zs-root` / `.zs-strip` / `.zs-glyph-btn` | ZodiacSky-specific: root, glyph strip, sign buttons |
| `.zs-selected` / `.zs-hovered` | ZodiacSphere constellation highlight states (gold edges/halos) |
| `.zs-edge` / `.zs-halo` / `.zs-core` | ZodiacSphere star elements: connecting lines, glow halos, core dots |
