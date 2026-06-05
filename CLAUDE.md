# Theogony — A Web of Becoming

Interactive force-directed graph of Greek mythology built with React 18, D3 v7, and Tailwind CSS 3.

## Commands

```bash
npm run dev      # Vite dev server (localhost:5173)
npm run build    # Production build → dist/
npm run preview  # Preview built output
```

No test runner or linter is configured.

## Stack

| Layer | Tech |
|---|---|
| UI | React 18, JSX via Vite |
| Graph | D3 v7 (force simulation, zoom, SVG rendering) |
| Styles | Tailwind CSS 3 + custom CSS in `src/index.css` |
| Build | Vite 5 |
| Fonts | Cinzel (headings/labels), Crimson Pro (body), DM Mono (code/prompts) — Google Fonts |

## Project Layout

```
src/
├── App.jsx                   # State root: filters, modal, focus mode
├── main.jsx                  # React DOM entry
├── index.css                 # Tailwind + keyframes + layout classes
├── components/
│   ├── GraphCanvas.jsx       # SVG force-directed graph (zoom/pan/drag/portraits)
│   ├── DeityModal.jsx        # Primary detail view — opens on node click
│   ├── FilterBar.jsx         # Search input, category pills, archetype select, focus toggle
│   ├── LegendBar.jsx         # Collapsible bottom bar (category dots + link type samples)
│   ├── NodeTooltip.jsx       # Hover tooltip
│   ├── DetailPanel.jsx       # (kept but unmounted — superseded by DeityModal)
│   └── Lightbox.jsx          # (kept but unused — superseded by DeityModal)
├── hooks/
│   ├── useGraphSimulation.js # D3 force simulation lifecycle
│   ├── usePortraitLoader.js  # Probes head/full portrait images on mount
│   └── useNodeSelection.js   # Selection state (unused; logic lifted to App)
├── utils/
│   └── graphHelpers.js       # getNodeRadius, getConnectedNodes, getNeighborIds
└── data/
    ├── mythology.js          # nodes[] + links[] — the entire dataset (~95 nodes, 179 links)
    ├── categoryConfig.js     # 9 categories with fill/stroke colors and display labels
    ├── linkTypeConfig.js     # 9 link types with stroke, dasharray, arrow, animation flags
    └── archetypeMap.js       # 12 Jungian archetypes with description and color

public/
└── deities/                  # Drop deity images here — no code changes needed
    ├── {id}-head.webp        # Tight bust — clipped to node circle on the graph
    └── {id}-full.webp        # Full-body — lazy-loaded in the DeityModal image column
```

## Data Model

### Node schema (`src/data/mythology.js`)
```js
{
  id:               'zeus',               // unique, used for image filenames
  name:             'Zeus',
  epithet:          'Lord of Olympus',
  category:         'olympian',           // see categoryConfig
  gender:           'male',
  domains:          ['sky', 'thunder'],
  description:      '...',
  origins:          '...',
  jungian_archetype:'King',              // see archetypeMap
  notable_myths:    ['Titanomachy'],
  symbols:          ['thunderbolt'],
  roman_equivalent: 'Jupiter',
  image_prompt:     '...',               // Midjourney prompt shown in modal
  // optional overrides:
  head_image:       'zeus_bust.webp',    // defaults to `${id}-head.webp`
  full_image:       'zeus_standing.webp' // defaults to `${id}-full.webp`
}
```

### Link schema
```js
{ source: 'cronus', target: 'zeus', type: 'parent_of', label: 'father of' }
```

**9 relationship types:** `parent_of`, `birthed`, `transformed_into`, `cursed_into`, `created_by`, `lover_of`, `enemy_of`, `merged_with`, `split_from`

## Architecture: D3 + React Integration

D3 mutates shallow-copied simulation nodes only — never the source `nodes` array from `mythology.js`. React owns all state; D3 is used purely for layout math and zoom behavior.

```
useGraphSimulation  →  positions{ [id]: {x,y} }  →  GraphCanvas renders SVG
                                                      (nodes as <g>, links as <line>/<path>)
d3.zoom on svgRef   →  transform{ x,y,k }         →  <g transform="translate/scale">
React pointerMove   →  simNode.fx/fy               →  node drag (no d3.drag)
```

**Force config** (`useGraphSimulation.js`):
- `forceManyBody` strength: **-600** (prevents center-cluster hairball)
- `forceLink` distances: `parent_of`/`birthed` = 70, `lover_of` = 110, `enemy_of` = 140, default = 90
- `forceCollide` radius + 8, strength 0.7
- `alphaDecay` 0.02 — simulation stops at alpha < 0.005
- Positions emitted to React state every 2 ticks (reduces render frequency)

## Background Layer Stack

Layers from bottom to top (all in `GraphCanvas`):

1. **CSS radial gradient** — container div background (`#0d1424` → `#05080f`)
2. **Far cloud stratum** — HTML div, procedural radial-gradient clouds, `translateX` 150s + vertical sway 40s
3. **Near wisp stratum** — HTML div, thinner gradients, opposite drift 90s + sway 55s offset
4. **SVG grain rect** — `feTurbulence` overlay
5. **SVG graph** — links, nodes, labels, zoom group

Cloud animations are GPU-only (`transform` only, `will-change: transform`). A `visibilitychange` listener toggles `.bg-clouds.paused` to halt all animations when the tab is hidden. `@media (prefers-reduced-motion: reduce)` disables drift entirely.

## Node Portraits

- `useHeadLoader()` (exported from `usePortraitLoader.js`) probes all `{id}-head.webp` images on app mount via `new Image()`. Returns a growing `Set<nodeId>`.
- In `GraphCanvas`, nodes with a loaded head image render an SVG `<image>` clipped to the node circle via `<clipPath id="clip-r{radius}">`. 13 clip paths cover all unique node radii — shared across same-size nodes.
- Portrait rendering is always-on (no toggle) when a head image exists.
- `usePortraitLoader()` is a backward-compat alias for `useHeadLoader()`.

## Deity Modal

`DeityModal` is the primary detail view. It mounts as a fixed overlay; the graph keeps running behind it.

- **Left column (45% desktop):** Full-body image lazy-loaded on modal open; animated skeleton placeholder until loaded; falls back to head image, then category dot.
- **Right column (55% desktop):** Scrollable — category badge, name, epithet, origins, description, domains/archetype/symbols, connected-to chips, notable myths, collapsible Midjourney prompt.
- **Navigation:** Chip clicks swap modal content (no close/reopen) and pan the graph. Back stack stored in `App.jsx` (`backStack: string[]`).
- **Accessibility:** `role="dialog"`, `aria-modal`, focus trap (Tab/Shift-Tab), heading focus on open and navigation, focus restored to trigger on close, Escape key closes.

## State Flow (App.jsx)

```
selectedNodeId   — highlighted node (neighbors dimmed in focus mode)
filterCategory   — 'all' | category id
filterArchetype  — 'all' | archetype name
searchTerm       — string (dims non-matching nodes to 0.12 opacity)
focusMode        — bool (non-neighbors → 0.06 opacity)
modalNodeId      — currently open deity id (null = closed)
backStack        — string[] of previously viewed deity ids
```

Node click → `handleNodeClick(id)` → sets `selectedNodeId` + `modalNodeId`, clears `backStack`.
Modal chip click → `handleModalNavigate(id)` → pushes old id onto `backStack`, pans graph.

## Extending the Dataset

To add or edit mythology data, edit `src/data/mythology.js`. The structure is self-documenting. Run `npm run build` to verify there are no broken references. To add new images, drop `.webp` files in `public/deities/` — the app picks them up automatically on next load.

## CSS Classes of Note

| Class | Purpose |
|---|---|
| `.detail-scroll` | Custom thin scrollbar for dark panels |
| `.md-row` | `flex-direction: row` at ≥768px (unused after panel removal but kept) |
| `.bg-clouds` | Cloud animation container; add `.paused` to halt all child animations |
| `.cloud-far-track` / `.cloud-near-track` | Animated 200%-wide cloud gradient tracks |
| `.deity-modal-body` | Two-column (desktop) / single-column (mobile) modal layout |
| `.deity-modal-image` | Image panel — 300px tall mobile, auto height desktop |
| `.image-skeleton` | Pulsing placeholder shown while full-body image loads |
| `.node-selected-ring` | Gold pulse animation on selected node |
| `.link-transformed` / `.link-cursed` | Animated dash-flow on transformation/curse links |
