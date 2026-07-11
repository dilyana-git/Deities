# Theogony — A Web of Becoming

Interactive "celestial atlas" of Greek mythology — a D3 force-directed star map where each figure is a star whose brightness reflects its renown (connection count). Features cinematic guided tours, a 3D zodiac sphere, and a detail panel with original prose retellings. Built with React 18, D3 v7, and Tailwind CSS 3.

## Commands

```bash
npm run dev      # Vite dev server (localhost:5173)
npm run build    # Production build → dist/
npm run preview  # Preview built output
```

No test runner or linter is configured. `npm run build` is the only correctness gate — run it after editing data or components to catch broken imports/references.

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
│   ├── GuidedSky.jsx              # Full-screen cinematic guided tour overlay (autoplay/manual, chapter scrubber, tale picker)
│   ├── ConstellationStage.jsx     # Imperative SVG engine for abstract constellation animations (used by GuidedSky)
│   ├── ZodiacSky.jsx              # Full-screen zodiac view — auto-advancing carousel with caption panel + glyph strip
│   └── ZodiacSphere.jsx           # Interactive 3D-projected celestial globe of all 12 zodiac constellations
└── data/
    ├── mythology.js               # nodes[] (116 nodes) + links[] (208 links) — the entire dataset
    ├── deityStories.js            # Original prose retellings keyed by node id ({ story, source, beats? })
    ├── tours.js                   # Guided tour narratives — 11 tours with { id, title, kicker, beats: [{ fig, text }] }
    ├── zodiac.js                  # 12 zodiac signs with myth text, star coordinates, element accents
    ├── constellations.js          # Abstract constellation specs per deity for the ConstellationStage engine
    ├── categoryConfig.js          # category display labels + categoryOrder
    ├── linkTypeConfig.js          # link type labels + inverseLabel + linkTypeOrder
    └── archetypeMap.js            # Jungian archetypes: { description, color } + archetypeOrder

public/
├── portraits/                     # Drop portraits here — resolved by id, no code changes needed
│   ├── {id}-head.webp             # Tight bust — clipped to the node circle on the graph
│   └── {id}-full.webp             # Full-body — shown at the top of the DetailPanel
│                                  # .png/.jpg and bare {id}.* also accepted (see portraitSources)
└── deities/                       # Legacy portrait folder — same conventions, still scanned
```

> **Color source of truth:** graph/category/link colors live in the `CAT` and `LCOL` OKLCH maps exported from `SkyGraph.jsx` — **not** in `categoryConfig`/`linkTypeConfig`, which now provide only display labels and ordering. `DetailPanel` and `App` import `CAT`/`LCOL` from `SkyGraph` to stay consistent.

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
  jungian_archetype:'King',              // key into archetypeMap
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
{ id: 'titans', title: 'The Fall of the Titans', kicker: 'A Cosmogony',
  beats: [{ fig: 'chaos', text: 'In the beginning…' }, …] }
```
11 guided tours. Each beat's `fig` must be a valid node id in `mythology.js` AND have a matching constellation spec in `constellations.js`.

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

**Imperative API exposed by `SkyGraph`:**
`select(id, fly)`, `clearSelection()`, `flyTo(id, scale)`, `resetView()`, `highlightPath(ids)`, `clearPathHighlight()`, `setTourLock(v)`, `litEdge(a, b)`, `clearLitEdge()`.

**Selection/hover are CSS-class driven.** SkyGraph toggles `lit` / `faded` / `selected` / `route` / `focusing` classes on node `<g>` and link `<line>` selections; `index.css` styles the rest. `pathLock` (path-finder active) and `tourLock` (guided tour active) suppress hover so those modes stay stable.

**Force config** (`SkyGraph.jsx`):
- `forceLink` distance **66**, strength **0.23**
- `forceManyBody` strength **-250**, `distanceMax` 480
- **`clusterForce` 0.065** — custom force pulling each node toward its category's anchor, so categories settle into constellations
- **`domeForce` 0.6** — soft ellipse containment: nodes past ρ 0.92 of the `DOME` ellipse get pulled back, keeping the field's silhouette circular
- `forceCollide` radius + 26, strength 0.92
- `alphaDecay` 0.028
- Pre-settles with 160 synchronous `sim.tick()`s, then the sim idles (a drag re-energises it)

**Celestial dome** (`DOME` in `SkyGraph.jsx`): the start-page field is shaped like a night sky projected on a sphere. Category `ANCHOR`s are remapped onto an ellipse (`DOME_ANCHOR`, outermost at ρ ≈ 0.8), `domeForce` keeps the silhouette elliptical, and after the pre-settle a **fisheye bake** (`ρ' = sin(ρA)/sin(A)`, A = 1.15) is written into `d.x/d.y` once — the mid-field bulges and the rim compresses like a star globe seen face-on. Because the warp is baked into positions, every consumer (camera, hover, drag, labels, tours, path-finder) works in one coordinate space. A `dome-grid` layer draws the planisphere furniture: sky glow, declination rings, meridian spokes, glowing horizon ring with degree ticks, and a tilted dashed gold ecliptic.

**Renown / node size:** `prom = sqrt(degree) / sqrt(maxDegree)`; `radius = 2.4 + Math.pow(prom, 1.3) * 17`. More-connected figures are larger and brighter. This formula is recomputed wherever needed (SkyGraph, DetailPanel, App's autocomplete) — keep them in sync if you change it.

## Background Layer Stack

All inside `<svg id="sky">`, bottom to top:

1. **Container gradient** — dark radial background (`#06080e` root)
2. **`bg` star layer** — 420 procedurally-seeded background stars; the brightest also get a blurred glow `flare` that twinkles (`@keyframes star-flare`, randomized `--flare-peak/-dur/-delay` CSS vars)
3. **`float-y` → `float-x` nested groups** — two transform-only animations (a ~bob and a slower ~drift) compose into gentle organic floating; GPU-composited, leaves physics positions untouched
4. **`dome-grid` layer** — the celestial-sphere furniture (sky glow, declination rings, meridian spokes, horizon ring, ecliptic) that frames the field as a night-sky dome
5. **`clusters` / `links` / `nodes` layers** — cluster labels, relationship lines, node glyphs

Adding `.paused` to the `<svg>` halts twinkle/flow animations; a `visibilitychange` listener applies it when the tab is hidden.

## Node Glyphs & Portraits

Each node `<g>` stacks: a blurred `glow` circle (`#glow` filter), a gold `sel-halo` bloom circle (invisible until `.selected`/`.route`), a pale `core` circle, a **frameless** portrait `<image>`, and a `node-label` text.

- Portraits are **not** cropped to a circle and have **no ring** — the `<image>` spans `IMG_SCALE` (1.45×) the node radius and dissolves into the sky via a CSS radial-gradient mask (`.node image` in `index.css`). A CSS mask (not an SVG one) is deliberate: it re-rasterizes at paint resolution, so the fade stays smooth at any zoom.
- Selection/route emphasis is **light, not a frame**: `.sel-halo` (a blurred gold disc behind the core) breathes via `@keyframes gold-bloom` and leaks through the portrait's faded edges as a rim-light.
- The portrait `<image>` stays at opacity 0 until a candidate actually loads (otherwise the browser paints a broken-image glyph while the chain walks its 404s), and its `href` is set lazily by `loadPortraits()` so ~100 mostly-missing portraits don't fire a request/404 storm during the opening ignition.
- Candidate URLs come from **`portraitSources(id, preferFull)`** (exported from `SkyGraph.jsx`, shared with `DetailPanel`): both folders (`/portraits/` and the legacy `/deities/`) × three name styles (`{id}-head`, `{id}-full`, `{id}`) × three formats (`.webp`, `.png`, `.jpg`). An `onerror` handler walks the chain, then removes the `<image>` (leaving the bare star) if none exist.
- Always-on; no toggle. Nodes with `degree === 0` get `.nolabel`; `prom > 0.55` get `.prominent` (brighter label).

## Detail Panel

`DetailPanel` is a right-hand slide-in `<aside class="detail-panel">` (off-canvas via `translateX`, `.open` slides it in). It renders for the selected node and is the only detail surface (there is no modal/lightbox). Scrolls to top automatically when navigating to a new deity.

- **Hero:** a holographic stage (`.holo-*` classes in `index.css`) — cursor-tracking 3D perspective tilt, ambient float, opacity flicker, scanlines, and a category-tinted light sweep, with a "materialize" entrance on every node change. Inside it: the full-body `Portrait` (with a gradient overlay carrying the name/epithet/category badge) **or**, if no portrait exists, a **`HoloSigil`** — a rotating 3D constellation of the node's top neighbors (perspective-projected, depth-sorted, rAF-driven; pauses when the tab is hidden) hovering above an emitter dais with a projection cone.
- **Sections (in order):** Archetype (color + description from `archetypeMap`), Origins/Story Spine (`deityStories` prose + source, falling back to `description`; entries with `beats` render as a vertical constellation), Domains, Myths, Symbols, Connections.
- **Connections** are clickable buttons → `onNavigate(id)`, which re-selects + flies the graph to that node and scrolls the panel to top. Direction-aware labels use `linkTypeConfig`'s `label` (→) vs `inverseLabel` (←).

## Guided Sky (Cinematic Tours)

`GuidedSky.jsx` is a full-screen overlay that presents the guided tours from `tours.js`. Each tour beat shows an abstract constellation (from `ConstellationStage.jsx` + `constellations.js`) with narration text.

- **Autoplay** at 6.5s per beat; pause/resume via play button or spacebar
- **Navigation:** arrow keys, prev/next buttons, or clickable chapter scrubber dots
- **Tale picker:** dropdown to switch between the 11 tours
- **ConstellationStage:** imperative SVG engine that ignites stars one-by-one, traces connecting edges, then applies a looping motion (`breathe`, `drift`, `sweep`, etc.). Three brightness tiers: hero (largest, gold-tinged) → bright → dim.

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
- **Tooltip** — a single `<div id="tip">` that `SkyGraph` positions on `mousemove` and fills on hover (SkyGraph no-ops gracefully if the element is absent).

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
zodiacOpen       — ZodiacSky overlay visible
```

Selection is push-based: graph → `onSelect` → `selectedId`; App → `graphRef` imperative calls → graph. Opening Path or starting a Tour clears the current selection so modes don't overlap.

## Extending the Dataset

Edit `src/data/mythology.js` (nodes/links) and optionally add a matching `src/data/deityStories.js` entry. For guided tours, also add a constellation spec to `src/data/constellations.js` with the same node id. Run `npm run build` to verify there are no broken references. To add imagery, drop `{id}-head.webp` / `{id}-full.webp` (or `.png`) in `public/portraits/` — they're picked up by id on next load, no code change needed.

## CSS Classes of Note

| Class | Purpose |
|---|---|
| `.node` + `.lit` / `.faded` / `.selected` / `.route` | Per-node highlight states toggled by SkyGraph (hover, selection, path/tour routes) |
| `.nodes.focusing` | Dims the field while one node + neighbors are emphasized |
| `.node.prominent` / `.node.nolabel` | High-renown label boost / hide label for isolated nodes |
| `.cluster-label` | Category constellation labels above each cluster |
| `.node-label` | Per-node name text |
| `.star` / `.flare` | Background starfield dots and twinkling glow-bloom (`@keyframes star-flare`) |
| `.float-y` / `.float-x` | Nested transform-only ambient drift of the whole graph |
| `.link-transformed` / `.link-cursed` | Animated dash-flow on transformation/curse links (`@keyframes dashFlow`) |
| `.detail-panel` (+ `.open`) | Off-canvas right panel; `.open` slides it in |
| `.panel-section` | Staggered fade-in for DetailPanel sections (`@keyframes panelFadeIn`) |
| `.story-text::first-letter` | Drop-cap on the Origins prose |
| `.tourbar` (+ `.open`) | Bottom guided-tour caption bar |
| `.pop-in` | Quick scale/fade entrance for popovers (legend, path, tour menu) |
| `.sel-halo` | Gold selection bloom behind the star (`@keyframes gold-bloom`) |
| `.gs-root` / `.gs-caption` / `.gs-name` | GuidedSky + ZodiacSky shared cinematic overlay classes |
| `.zs-root` / `.zs-strip` / `.zs-glyph-btn` | ZodiacSky-specific: root, glyph strip, sign buttons |
| `.zs-selected` / `.zs-hovered` | ZodiacSphere constellation highlight states (gold edges/halos) |
| `.zs-edge` / `.zs-halo` / `.zs-core` | ZodiacSphere star elements: connecting lines, glow halos, core dots |
