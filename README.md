# Theogony — A Web of Becoming

An interactive "celestial atlas" of Greek mythology. Every figure is a star in a
D3 force-directed night sky; the brighter and larger the star, the more myths
bind it to others. Trace any figure back to Chaos, follow cinematic guided
tours, spin a 3D zodiac sphere, or open a figure's original-prose retelling.

139 figures, 258 relationships, 11 guided tours.

Built with **React 18**, **D3 v7**, and **Tailwind CSS 3**, bundled by **Vite**.
Live at **https://deities.vercel.app**.

## Commands

```bash
npm install         # install dependencies
npm run dev         # Vite dev server → http://localhost:5173
npm run check:data  # validate the dataset's cross-references
npm run build       # production build → dist/  (runs the data check first)
npm run preview     # serve the built output
```

There is no unit-test runner. Correctness gates are:

- **`npm run build`** — catches broken imports and references (no TypeScript, so
  this is the compile check).
- **`npm run check:data`** — walks the dataset and fails on dangling references:
  a link pointing at a missing node, a tour beat or hero whose figure isn't a
  node, an unknown category or relationship type. Content gaps that degrade
  gracefully (a figure with no constellation spec, prose keyed to no one) print
  as warnings. It runs automatically before every build.

## The map at a glance

- **Three size tiers** give the eye somewhere to land: a dozen primary hubs
  (large, always labelled), secondaries at a fraction of that size, and a long
  tail of plain dots. The first two carry portraits, sized to how large they are
  actually drawn; the tail's figures keep their art for the detail panel, where
  there is room to see it.
- **Ambient motion**: a slow celestial drift, a parallax starfield, and — while
  you are idle — a lineage thread that periodically ignites and travels a line
  of descent (Chaos → Gaia → Uranus → Cronus → Zeus, and others), leaving the
  thread behind, so the sky at minute ten is not the sky at minute one.
- **An opening cosmogony** builds the sky once per page load, generation by
  generation. Any key, click or scroll skips it; `#intro` on the URL replays it.
- **Keyboard**: `/` searches; on the map, arrow keys move between stars and
  `Enter` opens one; `?` lists every shortcut.

## Extending the dataset

Edit `src/data/mythology.js` (nodes/links) and optionally add a
`src/data/deityStories.js` entry. For guided tours, each beat's `fig` and the
tour's `hero` must be valid node ids. Run `npm run build` — the data check runs
first and fails loudly on anything dangling.

For artwork, drop the source in `portraits-src/` **named exactly for the node
id**, run `node scripts/gen-portraits.mjs`, and commit both `public/portraits/`
and the generated manifest — the site is built from the repo, so art that only
exists on your disk never ships.

## Architecture

See **[CLAUDE.md](./CLAUDE.md)** for the full architecture notes — the D3 +
React imperative integration, the celestial-dome background stack, the portrait
level-of-detail system, the detail panel layout, and the data schemas.
