# Design — Theogony

The design language for **Theogony, A Web of Becoming**: a celestial atlas of
Greek mythology. The guiding metaphor is a **night sky observed through an old
brass instrument** — deep space-black grounds, soft starlight, antique gold
accents, and engraved serif type. Everything should feel quiet, cinematic, and
hand-bound, never flat or "UI-ish."

This file is the reference for any visual change — by Claude or a human. When in
doubt, defer to the tokens below and to the metaphor: *if it wouldn't belong on a
star chart, it doesn't belong here.*

---

## 1. Principles

1. **The sky is the hero.** Chrome recedes; stars, constellations, and prose
   carry the page. Backgrounds are near-black; controls are low-contrast until
   focused. Add light, don't add boxes.
2. **One accent.** Antique **gold** (`--gold #cdb88a`) is the single UI accent.
   Category and element hues live *inside* the content (a node's color, a
   caption's "AIR ·" label) — they never tint buttons, borders, or panels.
3. **Light, not fills.** Emphasis comes from glow, opacity, and blur — not solid
   backgrounds or hard strokes. Selected things get brighter and bloom; deselected
   things fade rather than disappear.
4. **Motion is ambient, never busy.** Slow drifts, breathing glows, asynchronous
   twinkles measured in tens of seconds. Nothing snaps or bounces. All motion is
   transform/opacity only (GPU-composited) and must honor
   `prefers-reduced-motion`.
5. **Engraved, literary type.** Cinzel for anything titular or labelled; Crimson
   Pro for prose. Generous letter-spacing on small caps; drop-caps and italics
   for storytelling.
6. **Color is meaning.** A hue always encodes something (category, relationship,
   element). Never decorate with color that carries no data.

---

## 2. Color

### Surfaces (space-black, cool-blue undertone)

| Token | Value | Use |
|---|---|---|
| Root background | `#06080e` | `html, body, #root` |
| Overlay gradient | `radial-gradient(130% 100% at 72% 30%, #0e1322, #080a12 52%, #04060c)` | full-screen overlays (`.gs-root`) |
| Scrollbar track / thumb | `#090c13` / `#19202d` | custom scrollbar |

### Accent & ink (defined on `.gs-root`, used app-wide)

| Token | Value | Use |
|---|---|---|
| `--gold` | `#cdb88a` | the one accent — active states, hairlines, glyphs |
| `--gold-dim` | `#8c7d59` | muted gold (de-emphasized) |
| `--ink` | `#d6dbe6` | primary body text |
| `--ink-dim` | `#9aa3b4` | secondary text |
| `--faint` | `#5a6273` | tertiary / dividers |
| selection | `#cdb88a44` | `::selection` (gold at ~27%) |

> Pure white (`#fff`, `#fff7e0`) is reserved for **star cores** at peak
> brightness — the literal brightest points of light. Don't use it for text.

### Category hues — `CAT` map (`src/components/SkyGraph.jsx`)

OKLCH, held near L≈0.65 / low chroma so they read as *tinted starlight*, not
saturated UI colors. **This is the source of truth** — `DetailPanel` and `App`
import `CAT`/`LCOL` from `SkyGraph`. `categoryConfig`/`linkTypeConfig` carry only
labels and ordering, never color.

| Category | OKLCH | Reads as |
|---|---|---|
| `primordial` | `0.64 0.062 300` | violet |
| `titan` | `0.70 0.060 75` | amber |
| `olympian` | `0.66 0.058 250` | blue |
| `chthonic` | `0.62 0.018 285` | near-grey violet |
| `monster` | `0.62 0.078 25` | red |
| `hero` | `0.68 0.058 150` | green |
| `sea_deity` | `0.68 0.055 220` | cyan-blue |
| `nymph_minor` | `0.68 0.052 330` | magenta-pink |
| `mortal` | `0.66 0.012 250` | neutral |

### Relationship hues — `LCOL` map (`src/components/SkyGraph.jsx`)

Edge colors, deliberately dimmer/lower-chroma than nodes so links sit *behind*
stars. Neutral edge fallback: `oklch(0.45 0.005 270)`.

| Type | OKLCH |
|---|---|
| `parent_of` | `0.56 0.012 270` |
| `birthed` | `0.62 0.052 150` |
| `transformed_into` | `0.62 0.060 300` |
| `cursed_into` | `0.56 0.080 22` |
| `created_by` | `0.64 0.055 75` |
| `lover_of` | `0.64 0.062 12` |
| `enemy_of` | `0.60 0.090 25` |
| `merged_with` | `0.70 0.050 90` |
| `split_from` | `0.60 0.020 250` |

### Element accents — Zodiac (`src/data/zodiac.js`)

Four classical elements; each triad shares a hue. Carried in caption *text* only
(the Zodiac UI itself stays gold).

| Element | OKLCH | |
|---|---|---|
| Fire | `0.71 0.10 55` | amber |
| Earth | `0.67 0.07 148` | green |
| Air | `0.69 0.07 270` | periwinkle |
| Water | `0.69 0.07 210` | teal |

---

## 3. Typography

Loaded in `index.html` (Google Fonts):

| Family | Role | Notes |
|---|---|---|
| **Cinzel** | Headings, labels, titles, glyph names | engraved Roman caps; weights 400–700. Always letter-spaced when small (`.08–.65em`). |
| **Crimson Pro** | Body, prose, narration | the default `body` serif; italics for citations/asides; weights 300/400/600. |
| EB Garamond | Secondary literary text | italics available |
| Caveat / Kalam | Hand annotation accents | use sparingly — marginalia feel only |

Conventions:
- **Small-caps labels** (category, "FIRE · Mar 21"): Cinzel, ~9–11px, letter-spacing `.3–.4em`, often gold.
- **Display titles** (`.gs-name`): Cinzel 700, 40–54px, tight line-height (~0.98), soft dark text-shadow for legibility over stars.
- **Prose** (`.gs-narration`, story text): Crimson Pro, 15–18px, line-height ~1.55, `max-width ~38–42ch`. Break long myth text into ~2-sentence paragraphs (see `ZodiacSky.toParagraphs`) so it reads as stanzas, not a wall.
- **Drop-cap**: `.story-text::first-letter` on Origins prose.

---

## 4. Motion

All ambient, slow, asynchronous, and reduced-motion aware. Representative timings:

| Effect | Where | Cadence |
|---|---|---|
| Star flare | `@keyframes star-flare` | ~2.4s, quick bloom (peak 18%) → long fade, randomized phase |
| Star shimmer | `@keyframes star-shimmer` | 3–7s, ~15% of bg stars, never in unison |
| Node twinkle / hub-breath | `.node .glow` | ~6s twinkle + ~4s hub pulse on major gods |
| Selection gold bloom | `@keyframes gold-bloom` on `.sel-halo` | 2.4s opacity-only breathing of the blurred gold disc behind the selected star |
| Float (bob + drift) | `.float-y` / `.float-x` | 14s bob, 70s drift — composed organic float |
| Celestial rotate / parallax | `.celestial-rotate` / `.bg-drift` | 130s / 180s — two-layer depth |
| Zodiac sphere drift | `ZodiacSphere DRIFT` | 0.03 rad/s, ~1 turn / 3.5 min |
| Panel section fade-in | `@keyframes panelFadeIn` | staggered entrance |

Rules:
- **Transform & opacity only** — never animate layout. Physics positions stay untouched; visual drift is a compositor transform on top.
- Every animation has a `@media (prefers-reduced-motion: reduce)` off-switch.
- Animations pause when the tab is hidden (`#sky.paused`, `visibilitychange`).
- Easing is gentle (`ease-in-out`, soft cubic-beziers). No bounce, no snap.

---

## 5. Layout & composition

- **Cinematic overlays** (`GuidedSky`, `ZodiacSky`) are full-screen, `z-index 1000`, with a left-hand **caption column** and the visual (constellation/sphere) holding the right two-thirds. Keep the two in balance: the active figure should ride near the caption's vertical center, not float small and high.
- **Caption column**: `max-width ~400px`, vertically centered against the visual. Generous left padding (~56px). Text left-aligned.
- **Detail panel**: off-canvas right `<aside>`, slides in via `translateX`. Sections fade in staggered.
- **Vignette**: a soft radial darkening at the edges (`.atlas-main::after`) keeps focus center-stage.
- **Glow depth stack**: background stars → drift groups → links → nodes, bottom to top. Light accumulates upward.

---

## 6. Iconography & glyphs

- **Stars are the primary glyph.** A node = blurred glow + gold selection halo + pale core + frameless portrait + label. Portraits are never cropped to a circle or ringed — they spread past the star and dissolve into the sky through a radial CSS mask, back-lit by the category-tinted core. Renown drives size and brightness (`prom = sqrt(degree)/sqrt(maxDegree)`; bigger, brighter = more connected).
- **Zodiac symbols** (♈♉♊…) rendered as text glyphs, gold, `font-variant-emoji: text` (never the OS emoji rendering).
- Controls use restrained line marks (`‹ ›`, `✕`) over filled icons.

---

## 7. Do / Don't

**Do**
- Reach for glow, opacity, and blur before a background or border.
- Keep gold as the only accent; let content hues carry meaning.
- Make new motion slow, asynchronous, and reduced-motion-safe.
- Match the surrounding code's OKLCH idiom and comment density.

**Don't**
- Introduce a second accent color or saturated UI chrome.
- Use pure white for text (reserve it for star cores).
- Animate layout, or add motion that pulses in unison or snaps.
- Duplicate color values — import `CAT`/`LCOL` from `SkyGraph` instead.
- Add hard-edged cards, heavy borders, or drop-shadow "elevation."
