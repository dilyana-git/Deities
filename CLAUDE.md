# Theogony — A Web of Becoming

Interactive "celestial atlas" of Greek mythology — a D3 force-directed star map where each figure is a star whose brightness reflects its renown (connection count). Built with React 18, D3 v7, and Tailwind CSS 3.

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
├── App.jsx                   # State root + all UI chrome (header, search, tours, path-finder, legend, detail panel)
├── main.jsx                  # React DOM entry
├── index.css                 # Tailwind + starfield/twinkle/float keyframes + graph & panel classes
├── components/
│   ├── SkyGraph.jsx          # THE graph — D3 celestial atlas, exposed as an imperative React ref
│   └── DetailPanel.jsx       # Right-hand slide-in detail view (opens on node select)
└── data/
    ├── mythology.js          # nodes[] + links[] — the entire dataset
    ├── deityStories.js       # Original prose retellings keyed by node id ({ story, source })
    ├── categoryConfig.js     # category display labels + categoryOrder
    ├── linkTypeConfig.js     # link type labels + inverseLabel + linkTypeOrder
    └── archetypeMap.js       # Jungian archetypes: { description, color } + archetypeOrder

public/
└── portraits/                # Drop portraits here — resolved by id, no code changes needed
    ├── {id}-head.webp        # Tight bust — clipped to the node circle on the graph
    └── {id}-full.webp        # Full-body — shown at the top of the DetailPanel
                              # .png variants are accepted as fallbacks (see fallback chain below)
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
{ chaos: { story: 'Before anything else there was Chaos…', source: 'Hesiod, Theogony.' } }
```
Keyed by node id. `DetailPanel`'s "Origins" section renders `story` (falling back to `node.description`) with `source` as a citation line. All prose is original; sources are public-domain (Hesiod, Ovid, Homer, Apollodorus).

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
- `forceLink` distance **46**, strength **0.25**
- `forceManyBody` strength **-150**, `distanceMax` 360
- **`clusterForce` 0.09** — custom force pulling each node toward its category's `ANCHOR` position (fraction of the 1200×740 canvas), so categories settle into constellations
- `forceCollide` radius + 13, strength 0.85
- `alphaDecay` 0.028
- Pre-settles with 160 synchronous `sim.tick()`s, then `restart()`s for slow ambient drift

**Renown / node size:** `prom = sqrt(degree) / sqrt(maxDegree)`; `radius = 2.2 + prom * 13.8`. More-connected figures are larger and brighter. This formula is recomputed wherever needed (SkyGraph, DetailPanel, App's autocomplete) — keep them in sync if you change it.

## Background Layer Stack

All inside `<svg id="sky">`, bottom to top:

1. **Container gradient** — dark radial background (`#06080e` root)
2. **`bg` star layer** — 420 procedurally-seeded background stars; the brightest also get a blurred glow `flare` that twinkles (`@keyframes star-flare`, randomized `--flare-peak/-dur/-delay` CSS vars)
3. **`float-y` → `float-x` nested groups** — two transform-only animations (a ~bob and a slower ~drift) compose into gentle organic floating; GPU-composited, leaves physics positions untouched
4. **`clusters` / `links` / `nodes` layers** — cluster labels, relationship lines, node glyphs

Adding `.paused` to the `<svg>` halts twinkle/flow animations; a `visibilitychange` listener applies it when the tab is hidden.

## Node Glyphs & Portraits

Each node `<g>` stacks: a blurred `glow` circle (`#glow` filter), a pale `core` circle, a clipped portrait `<image>`, a category-colored `ring`, and a `node-label` text.

- The portrait `<image>` loads `/portraits/{id}-head.webp`, clipped to a per-node `clipPath` (`id="clip-{id}"`).
- An `onerror` handler walks a **fallback chain**: `head.webp → head.png → full.webp → full.png`, then removes the `<image>` (leaving the bare star) if none exist.
- Always-on; no toggle. Nodes with `degree === 0` get `.nolabel`; `prom > 0.55` get `.prominent` (brighter label).

## Detail Panel

`DetailPanel` is a right-hand slide-in `<aside class="detail-panel">` (off-canvas via `translateX`, `.open` slides it in). It renders for the selected node and is the only detail surface (there is no modal/lightbox).

- **Hero:** the full-body `Portrait` (with a gradient overlay carrying the name/epithet/category badge) **or**, if no portrait exists, a generated **`Sigil`** — an SVG "constellation" of the node plus its top neighbors, sized by their renown.
- **Renown bar:** visualizes `prom`, labeled with raw `degree`.
- **Sections (in order):** Archetype (color + description from `archetypeMap`), Origins (`deityStories` prose + source, falling back to `description`), Domains, Myths, Symbols, Connections.
- **Connections** are clickable buttons → `onNavigate(id)`, which re-selects + flies the graph to that node. Direction-aware labels use `linkTypeConfig`'s `label` (→) vs `inverseLabel` (←).

## App Features (`App.jsx`)

`App.jsx` holds all state and renders the chrome around `<SkyGraph>`:

- **Search** — `SearchBox` with an `AutocompleteInput`; picking a figure calls `graphRef.select(id, true)`.
- **Tours** — the `TOURS` array defines guided narratives (`{ id, title, steps: [[nodeId, caption], …] }`). On step change, `App` calls `select` + `setTourLock(true)` + `litEdge(prev, cur)`; `TourBar` drives prev/next.
- **Path** — `PathPanel` runs `bfs()` over an adjacency map between two figures and calls `highlightPath(ids)` to route the graph; the panel lists each hop with its relationship label.
- **Legend** — `LegendPanel` popover, built from `categoryOrder`/`linkTypeOrder` + `CAT`/`LCOL`.
- **Tooltip** — a single `<div id="tip">` that `SkyGraph` positions on `mousemove` and fills on hover (SkyGraph no-ops gracefully if the element is absent).

### State

```
selectedId    — selected node id (drives DetailPanel + graph highlight); null = none
legendOpen    — legend popover visible
pathOpen      — path-finder panel visible (hides search; clears selection)
tourMenuOpen  — tour dropdown visible
activeTour    — current TOURS entry (null = no tour)
tourStep      — index within the active tour
hintFaded     — fades the "click a star" hint after first interaction / 9s
```

Selection is push-based: graph → `onSelect` → `selectedId`; App → `graphRef` imperative calls → graph. Opening Path or starting a Tour clears the current selection so modes don't overlap.

## Extending the Dataset

Edit `src/data/mythology.js` (nodes/links) and optionally add a matching `src/data/deityStories.js` entry. Run `npm run build` to verify there are no broken references. To add imagery, drop `{id}-head.webp` / `{id}-full.webp` (or `.png`) in `public/portraits/` — they're picked up by id on next load, no code change needed.

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
| `.node-selected-ring` | Gold pulse animation (`@keyframes gold-pulse`) |
