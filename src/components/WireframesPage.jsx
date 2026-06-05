import { useState, useMemo } from 'react'

/* ════════════════════════════════════════════════════════════════════
   Seeded RNG — deterministic star scatter per direction
   ════════════════════════════════════════════════════════════════════ */
function seedRnd(seed) {
  let s = seed
  return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff }
}

/* ════════════════════════════════════════════════════════════════════
   SVG string helpers  (produce raw SVG markup for dangerouslySetInnerHTML)
   ════════════════════════════════════════════════════════════════════ */
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const rrect = (x, y, w, h, r, cls) =>
  `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`

function star(x, y, r, k, label, bright) {
  const cls = k === 'b' ? 'wfstar wfbright' : k === 'm' ? 'wfstar wfmid' : 'wfstar'
  let s = `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`
  if (k === 'b') s = `<circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="#cdb88a" opacity="0.10"/>` + s
  if (label) s += `<text class="wfstarlbl${bright ? ' wflbright' : ''}" x="${x + r + 5}" y="${y + 4}">${esc(label)}</text>`
  return s
}

function scatter(rnd, n, x0, y0, x1, y1) {
  let s = ''
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * rnd(), y = y0 + (y1 - y0) * rnd()
    const r = 0.6 + rnd() * 1.3
    s += `<circle class="wfstar" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" opacity="${(0.25 + rnd() * 0.5).toFixed(2)}"/>`
  }
  return s
}

const cline = (pts, active) =>
  `<polyline class="wfcline${active ? ' active' : ''}" points="${pts.map(p => p.join(',')).join(' ')}"/>`

function arrowSVG(x1, y1, x2, y2, bend = 0.25) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  const cx = mx - dy * bend, cy = my + dx * bend
  const ang = Math.atan2(y2 - cy, x2 - cx)
  const [a1, a2, hl] = [ang + 2.5, ang - 2.5, 8]
  const head = `<path class="wfarrow" d="M${x2} ${y2} L${(x2 - hl * Math.cos(a1)).toFixed(1)} ${(y2 - hl * Math.sin(a1)).toFixed(1)} M${x2} ${y2} L${(x2 - hl * Math.cos(a2)).toFixed(1)} ${(y2 - hl * Math.sin(a2)).toFixed(1)}"/>`
  return `<path class="wfarrow" d="M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}"/>` + head
}

const anno = (x, y, text, sm = false) =>
  `<text class="wfanno${sm ? ' sm' : ''}" x="${x}" y="${y}">${esc(text)}</text>`

function screen(x, y, w, h) {
  return `
    ${rrect(x, y, w, h, 10, 'wfscreenframe')}
    <line x1="${x}" y1="${y + 34}" x2="${x + w}" y2="${y + 34}" stroke="#2a3140" stroke-width="1"/>
    <text x="${x + 16}" y="${y + 22}" font-family="EB Garamond" font-size="12" letter-spacing="0.34em" fill="#cdb88a">THEOGONY</text>
    <text class="wfuitext sm" x="${x + w - 150}" y="${y + 22}">filter</text>
    <text class="wfuitext sm" x="${x + w - 100}" y="${y + 22}">legend</text>
    <circle cx="${x + w - 58}" cy="${y + 18}" r="2" fill="#4b5468"/>`
}

/* ════════════════════════════════════════════════════════════════════
   Direction A — Celestial Atlas
   ════════════════════════════════════════════════════════════════════ */
function buildDirA(rnd) {
  const S = screen(46, 28, 1108, 684)
  const bg = scatter(rnd, 150, 70, 70, 1120, 690)

  const clusters = [
    { name: 'OLYMPIANS', lx: 250, ly: 560,
      stars: [[300,330,'Zeus',1],[360,300,'Hera'],[250,360,'Poseidon'],[330,400,'Athena'],[400,360,'Apollo'],[280,290,'Artemis']],
      lines: [[[300,330],[360,300],[400,360],[330,400],[250,360],[300,330]]] },
    { name: 'TITANS', lx: 560, ly: 230,
      stars: [[560,310,'Cronus'],[620,280,'Rhea'],[660,350,'Oceanus'],[600,360,'Hyperion']],
      lines: [[[560,310],[620,280],[660,350],[600,360],[560,310]]] },
    { name: 'PRIMORDIALS', lx: 880, ly: 200,
      stars: [[900,300,'Chaos',1],[960,250,'Nyx'],[980,360,'Gaia'],[860,360,'Uranus'],[940,420,'Erebus']],
      lines: [[[900,300],[960,250]],[[900,300],[980,360]],[[900,300],[860,360]],[[900,300],[940,420]]] },
    { name: 'MONSTERS', lx: 300, ly: 620,
      stars: [[330,560,'Medusa'],[270,600,'Cerberus'],[380,610,'Hydra']],
      lines: [[[330,560],[270,600],[380,610],[330,560]]] },
    { name: 'HEROES', lx: 560, ly: 640,
      stars: [[560,580,'Heracles'],[640,610,'Perseus']],
      lines: [[[560,580],[640,610]]] },
  ]

  let cl = '', cn = ''
  clusters.forEach(c => {
    c.lines.forEach(l => cl += cline(l, false))
    c.stars.forEach(s => cn += star(s[0], s[1], s[3] ? 3.4 : 2.2, s[3] ? 'b' : 'm', s[2], s[3]))
    cn += `<text class="wfringlbl" x="${c.lx}" y="${c.ly}" text-anchor="middle">${c.name}</text>`
  })

  const route = cline([[560,310],[430,330],[300,330]], true)

  const ui = `
    ${rrect(70,60,210,30,15,'wfuifill')}<text class="wfuitext" x="92" y="80">⌕  find a star…</text>
    ${rrect(905,60,225,86,10,'wfuifill')}
      <text class="wfuitext sm" x="922" y="80" fill="#cdb88a">PATH BETWEEN</text>
      ${rrect(922,90,90,22,11,'wfuidash')}<text class="wfuitext sm" x="934" y="105">Cronus</text>
      ${rrect(1024,90,90,22,11,'wfuidash')}<text class="wfuitext sm" x="1040" y="105">Zeus</text>
      <text class="wfuitext sm" x="922" y="134">→ 2 steps lit on map</text>
    ${rrect(360,610,470,72,10,'wfuifill')}
      <text x="378" y="634" font-family="EB Garamond" font-size="13" letter-spacing="0.22em" fill="#cdb88a">TOUR · THE FALL OF THE TITANS</text>
      <text class="wfuitext sm" x="378" y="654">"Cronus swallowed his children, until one was hidden away…"</text>
      <text class="wfuitext sm" x="378" y="673">◂ prev</text>
      <text class="wfuitext sm" x="780" y="673">next ▸</text>
      <text class="wfuitext sm" x="640" y="673" fill="#cdb88a">3 / 9</text>
    ${rrect(992,170,162,400,10,'wfuidash')}
      <text class="wfuitext sm" x="1010" y="194" fill="#cdb88a">▸ ZEUS</text>
      <text class="wfuitext sm" x="1010" y="214">detail slides in</text>
      <text class="wfuitext sm" x="1010" y="232">on select</text>
      <line x1="1010" y1="244" x2="1140" y2="244" stroke="#161b25"/>
      <text class="wfuitext sm" x="1010" y="266">domains · myths</text>
      <text class="wfuitext sm" x="1010" y="284">connections →</text>`

  const A = `
    ${anno(96,640,'stars = entities;')}${anno(96,663,'brightness = renown',true)}
    ${arrowSVG(150,648,300,345,0.18)}
    ${anno(150,180,'named groups read')}${anno(150,203,'as constellations',true)}
    ${arrowSVG(250,205,255,290,-0.2)}
    ${anno(120,48,'jump straight to any figure',true)}
    ${arrowSVG(160,52,150,58,0.3)}
    ${anno(820,44,'pick two — route lights up',true)}
    ${arrowSVG(905,52,1010,60,0.2)}
    ${anno(700,560,'a tour walks the')}${anno(700,583,'sky star-by-star',true)}
    ${arrowSVG(700,566,540,330,0.25)}`

  return S + bg + cl + route + cn + ui + A
}

/* ════════════════════════════════════════════════════════════════════
   Direction B — Orrery
   ════════════════════════════════════════════════════════════════════ */
function buildDirB(rnd) {
  const cx = 600, cy = 372
  const S = screen(46, 28, 1108, 684)
  const bg = scatter(rnd, 120, 70, 70, 1120, 690)

  const rings = [
    { r: 70,  lbl: 'PRIMORDIALS' },
    { r: 155, lbl: 'TITANS' },
    { r: 245, lbl: 'OLYMPIANS · CHTHONIC' },
    { r: 330, lbl: 'HEROES · MONSTERS · MORTALS' },
  ]
  let rg = ''
  rings.forEach(R => {
    rg += `<circle class="wfring" cx="${cx}" cy="${cy}" r="${R.r}"/>`
    rg += `<text class="wfringlbl" x="${cx}" y="${cy - R.r - 7}" text-anchor="middle">${R.lbl}</text>`
  })

  let cn = star(cx, cy, 4, 'b', 'Chaos', 1)
  const place = (r, deg, name, b) => {
    const a = deg * Math.PI / 180
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a)
    cn += star(x, y, b ? 3.2 : 2.2, b ? 'b' : 'm', name, b)
    return [x, y]
  }
  const gaia    = place(70,  40,  'Gaia',     1)
  const uranus  = place(70, -120, 'Uranus')
  const cronus  = place(155, 150, 'Cronus',   1)
  const rhea    = place(155,  90, 'Rhea')
  /* eslint-disable no-unused-vars */
  const ocean   = place(155, -30, 'Oceanus')
  const zeus    = place(245, 170, 'Zeus',     1)
  const hera    = place(245, 200, 'Hera')
  const pos     = place(245, 120, 'Poseidon')
  const hades   = place(245, 235, 'Hades')
  const heracles = place(330, 180, 'Heracles')
  const med     = place(330, 150, 'Medusa')
  const per     = place(330, 210, 'Perseus')
  /* eslint-enable no-unused-vars */

  const radial = [
    cline([gaia, uranus],   false),
    cline([gaia, cronus],   false),
    cline([cronus, zeus],   true),
    cline([rhea, zeus],     false),
    cline([zeus, heracles], true),
    cline([pos, med],       false),
  ].join('')

  const armX = (cx + 330 * Math.cos(170 * Math.PI / 180)).toFixed(1)
  const armY = (cy + 330 * Math.sin(170 * Math.PI / 180)).toFixed(1)
  const arm = `<line x1="${cx}" y1="${cy}" x2="${armX}" y2="${armY}" stroke="#5c5536" stroke-width="1.3" stroke-dasharray="6 5"/>`
  const handle = `<circle cx="${cx + 330}" cy="${cy}" r="9" class="wfuigold"/>
    <text class="wfuitext sm" x="${cx + 345}" y="${cy + 4}" fill="#cdb88a">drag to rotate</text>`

  const ui = `
    ${rrect(70,60,210,30,15,'wfuifill')}<text class="wfuitext" x="92" y="80">⌕  find a star…</text>
    ${rrect(905,60,225,72,10,'wfuifill')}
      <text class="wfuitext sm" x="922" y="80" fill="#cdb88a">PATH · Gaia → Heracles</text>
      <text class="wfuitext sm" x="922" y="100">arc traced across 3 rings</text>
      <text class="wfuitext sm" x="922" y="120">Gaia ▸ Cronus ▸ Zeus ▸ …</text>
    ${rrect(70,612,360,72,10,'wfuifill')}
      <text x="88" y="636" font-family="EB Garamond" font-size="13" letter-spacing="0.22em" fill="#cdb88a">TOUR · THE FALL OF THE TITANS</text>
      <text class="wfuitext sm" x="88" y="656">the wheel turns through the story, ring by ring</text>
      <text class="wfuitext sm" x="88" y="675">◂ prev   ·   next ▸   ·   3 / 9</text>`

  const A = `
    ${anno(150,150,'cosmos expands outward —')}${anno(150,173,'oldest at the centre',true)}
    ${arrowSVG(230,168,440,300,0.18)}
    ${anno(96,44,'search re-centres the wheel',true)}
    ${arrowSVG(150,52,150,58,0.3)}
    ${anno(940,150,'lineage arcs')}${anno(940,173,'cut across rings',true)}
    ${arrowSVG(940,165,760,330,0.25)}
    ${anno(470,605,'spin to read time as motion',true)}
    ${arrowSVG(560,600,900,402,0.2)}`

  return S + bg + rg + radial + arm + cn + handle + ui + A
}

/* ════════════════════════════════════════════════════════════════════
   Direction C — Guided Sky
   ════════════════════════════════════════════════════════════════════ */
function buildDirC(rnd) {
  const S = screen(46, 28, 1108, 684)
  const bg = scatter(rnd, 140, 70, 70, 1120, 560)
  const horizon = `<path class="wfhorizon" d="M60,520 Q600,470 1140,520"/>`

  const consts = [
    { x: 200,  y: 230, name: 'CHAOS',      stars: [[200,230,'Chaos',1],[250,200],[170,270],[230,290]] },
    { x: 480,  y: 260, name: 'THE TITANS', stars: [[480,200,'Cronus',1],[540,240,'Rhea'],[440,290],[520,300],[460,250]] },
    { x: 830,  y: 210, name: 'OLYMPUS',    stars: [[830,180,'Zeus',1],[890,220,'Hera'],[780,250],[860,280],[920,180]] },
    { x: 1050, y: 300, name: 'HEROES',     stars: [[1040,280,'Heracles'],[1090,320],[1010,330]] },
  ]
  let cn = '', cl = ''
  consts.forEach(c => {
    for (let i = 0; i < c.stars.length - 1; i++) cl += cline([c.stars[i], c.stars[i + 1]], false)
    c.stars.forEach(s => cn += star(s[0], s[1], s[2] ? 3.2 : 2.1, s[2] ? 'b' : 'm', s[2], s[2]))
    cn += `<text class="wfringlbl" x="${c.x}" y="${c.y + 90}" text-anchor="middle" opacity="0.7">${c.name}</text>`
  })

  const vp = `
    ${rrect(400,150,200,200,8,'wfuigold')}
    <line x1="500" y1="150" x2="500" y2="130" stroke="#5c5536"/>
    <line x1="400" y1="250" x2="380" y2="250" stroke="#5c5536"/>
    <text class="wfuitext sm" x="410" y="170" fill="#cdb88a">in view</text>`

  let strip = `
    ${rrect(70,560,1060,124,10,'wfuifill')}
    <text x="88" y="586" font-family="EB Garamond" font-size="13" letter-spacing="0.24em" fill="#cdb88a">STORY · THE FALL OF THE TITANS</text>
    <text class="wfuitext sm" x="430" y="586">›  pick a tale</text>
    <line x1="88" y1="660" x2="1112" y2="660" stroke="#161b25"/>`

  const chapters = ['Chaos','Gaia & Uranus','Cronus rises','The swallowing','Zeus hidden','Titanomachy']
  for (let i = 0; i < 6; i++) {
    const x = 96 + i * 168, on = i === 2
    strip += rrect(x, 600, 150, 44, 7, on ? 'wfuigold' : 'wfuidash')
    strip += `<text class="wfuitext sm" x="${x + 12}" y="618" ${on ? 'fill="#cdb88a"' : ''}>ch.${i + 1}</text>`
    strip += `<text class="wfuitext sm" x="${x + 12}" y="634">${chapters[i]}</text>`
    strip += `<circle cx="${x + 75}" cy="668" r="${on ? 4 : 2.5}" fill="${on ? '#cdb88a' : '#4b5468'}"/>`
  }
  strip += `<text class="wfuitext sm" x="96" y="678">◂</text><text class="wfuitext sm" x="1100" y="678">▸</text>`

  const ui = `
    ${rrect(905,60,225,30,15,'wfuifill')}<text class="wfuitext" x="927" y="80">⌕  jump to a figure…</text>
    ${rrect(70,60,150,28,14,'wfuidash')}<text class="wfuitext sm" x="86" y="79">⤫ free-roam mode</text>`

  const A = `
    ${anno(620,140,'a moving "telescope" frames')}${anno(620,163,'one constellation at a time',true)}
    ${arrowSVG(620,150,600,200,0.25)}
    ${anno(430,455,'the story scrubber is the main way in —')}${anno(430,478,'scrub chapters like a film',true)}
    ${arrowSVG(560,490,560,556,0.15)}
    ${anno(96,118,'opt out to explore freely',true)}
    ${arrowSVG(150,112,150,92,-0.3)}
    ${anno(940,118,'search still jumps anywhere',true)}
    ${arrowSVG(1010,112,1010,92,0.3)}`

  return S + bg + horizon + cl + cn + vp + ui + strip + A
}

/* ════════════════════════════════════════════════════════════════════
   Direction D — Almagest
   ════════════════════════════════════════════════════════════════════ */
function buildDirD(rnd) {
  const S = screen(46, 28, 1108, 684)
  const split = 820
  const bg = scatter(rnd, 90, 70, 70, split - 10, 690)
  const divider = `<line x1="${split}" y1="62" x2="${split}" y2="712" stroke="#2a3140" stroke-width="1"/>`

  const stars = [
    [260,300,'Medusa',1],[210,260],[320,260],[300,360],[200,340],
    [480,220,'Athena'],[560,300],[420,440,'Perseus'],[640,420],[520,520,'Cetus'],
    [380,150],[680,250],[600,180],
  ]
  let cn = '', cl = ''
  cl += cline([[260,300],[210,260],[320,260],[300,360],[200,340],[260,300]], true)
  cl += cline([[480,220],[560,300],[600,180]], false)
  cl += cline([[420,440],[640,420],[520,520]], false)
  stars.forEach(s => cn += star(s[0], s[1], s[2] ? 3.4 : 2.1, s[2] ? 'b' : 'm', s[2], s[2]))
  cn += `<text class="wfringlbl" x="260" y="405" text-anchor="middle" fill="#cdb88a">MEDUSA</text>`

  let cat = `
    <text x="${split + 22}" y="92" font-family="EB Garamond" font-size="13" letter-spacing="0.24em" fill="#cdb88a">STAR CATALOG</text>
    ${rrect(split+20,104,310,28,14,'wfuifill')}
    <text class="wfuitext" x="${split + 40}" y="123">⌕  search the index…</text>`

  const rows = [
    ['OLYMPIANS','header'],
    ['Zeus','· king of the gods'],
    ['Hera','· marriage, the heavens'],
    ['Athena','· wisdom, war'],
    ['MONSTERS','header'],
    ['Medusa','· gorgon · SELECTED'],
    ['Cerberus','· hound of the dead'],
    ['HEROES','header'],
    ['Perseus','· slayer of Medusa'],
  ]
  let yy = 158
  rows.forEach(r => {
    if (r[1] === 'header') {
      cat += `<text class="wfringlbl" x="${split + 22}" y="${yy}" fill="#5b6476">${r[0]}</text>`; yy += 26
    } else {
      const sel = r[1].includes('SELECTED')
      if (sel) cat += rrect(split + 16, yy - 15, 318, 24, 5, 'wfuigold')
      cat += `<text class="wfuitext" x="${split + 24}" y="${yy}" ${sel ? 'fill="#cdb88a"' : ''}>${r[0]}</text>`
      cat += `<text class="wfuitext sm" x="${split + 24 + (r[0].length * 8 + 12)}" y="${yy}" fill="#7b7565">${r[1].replace(' · SELECTED', '')}</text>`
      yy += 27
    }
  })

  yy += 8
  cat += `<line x1="${split + 20}" y1="${yy - 14}" x2="${split + 330}" y2="${yy - 14}" stroke="#161b25"/>`
  cat += `<text x="${split + 22}" y="${yy + 6}" font-family="EB Garamond" font-size="12" letter-spacing="0.2em" fill="#cdb88a">STORY ROUTES</text>`
  yy += 30
  ;['The Fall of the Titans','Perseus & the Gorgon','Children of Night'].forEach(t => {
    cat += rrect(split + 20, yy - 15, 310, 30, 7, 'wfuidash')
    cat += `<text class="wfuitext sm" x="${split + 32}" y="${yy + 4}">▸ ${t}</text>`
    yy += 38
  })
  cat += `
    ${rrect(split+20,yy+6,310,52,8,'wfuifill')}
    <text class="wfuitext sm" x="${split + 32}" y="${yy + 26}" fill="#cdb88a">PATH  Medusa → Zeus</text>
    <text class="wfuitext sm" x="${split + 32}" y="${yy + 44}">listed as steps + drawn on chart</text>`

  const A = `
    ${anno(110,560,'a quiet chart — mostly')}${anno(110,583,'dark, little colour',true)}
    ${arrowSVG(220,575,300,360,0.2)}
    ${anno(110,150,'pick on the map OR in the list —')}${anno(110,173,'the two stay in sync',true)}
    ${arrowSVG(250,180,260,290,0.2)}
    ${anno(560,640,'browse & read like an index')}
    ${arrowSVG(700,632,860,150,0.12)}`

  return S + bg + divider + cl + cn + cat + A
}

/* ════════════════════════════════════════════════════════════════════
   Direction metadata
   ════════════════════════════════════════════════════════════════════ */
const DIRS = [
  {
    id: 'A', label: 'Celestial Atlas', num: 'A',
    titlePrefix: 'Celestial ', titleEmph: 'Atlas',
    tag: "The gentlest leap from today's web: every figure is a star on an open night sky, related figures joined by faint constellation lines, and each category reads as its own named constellation. Pan and zoom freely. Brightness — not a loud colour — signals renown, so the sky stays calm.",
    pills: ['Free exploration', 'Brightness = importance', 'Closest to current app'],
    seed: 11, build: buildDirA,
  },
  {
    id: 'B', label: 'Orrery', num: 'B',
    titlePrefix: 'The ', titleEmph: 'Orrery',
    tag: "A cosmogony you can spin. Chaos sits at the centre; rings ripple outward through Primordials, Titans, Olympians, and out to the mortal rim — so “a web of becoming” reads literally as an expanding cosmos. Lineage arcs cut across the rings; rotating the wheel turns time into motion.",
    pills: ['Time = radius', 'Rotatable', 'Most structured'],
    seed: 23, build: buildDirB,
  },
  {
    id: 'C', label: 'Guided Sky', num: 'C',
    titlePrefix: 'Guided ', titleEmph: 'Sky',
    tag: "Story-first, built for someone who just wants to be told a tale. A moving 'telescope' frames one constellation at a time while a film-strip scrubber along the bottom walks you through chapters. Free-roam is one tap away, but the default is a guided journey across the heavens.",
    pills: ['Narrative-led', 'Scrubber = main control', 'Best for newcomers'],
    seed: 31, build: buildDirC,
  },
  {
    id: 'D', label: 'Almagest', num: 'D',
    titlePrefix: 'The ', titleEmph: 'Almagest',
    tag: "Map plus manuscript. A deliberately quiet star chart on the left, an old-style star catalogue on the right — search, browse by group, open story routes, all as calm text. Selecting in either side syncs the other. The most low-colour, low-overwhelm answer to 'it's too bright.'",
    pills: ['Map + index', 'Reading-friendly', 'Calmest palette'],
    seed: 43, build: buildDirD,
  },
]

const BG_RECT = `<rect x="0" y="0" width="1200" height="740" fill="#090b0f"/>`

/* ════════════════════════════════════════════════════════════════════
   Shared sub-components
   ════════════════════════════════════════════════════════════════════ */

function MockSVG({ content, style }) {
  return (
    <svg
      viewBox="0 0 1200 740"
      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 9, ...style }}
      dangerouslySetInnerHTML={{ __html: BG_RECT + content }}
    />
  )
}

function Pill({ children }) {
  return (
    <span style={{
      fontFamily: 'Caveat, cursive', fontSize: 16, color: '#7b7565',
      border: '1.3px solid #1e2430', borderRadius: 20, padding: '2px 11px 1px',
    }}>
      {children}
    </span>
  )
}

function TabBtn({ active, num, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'Caveat, cursive', fontSize: 21, lineHeight: 1,
        color: active ? '#cabfa9' : '#5b6476',
        background: active ? '#11151e' : 'transparent',
        border: `1.5px solid ${active ? '#2a3140' : 'transparent'}`,
        borderRadius: 9, padding: '7px 14px 6px', cursor: 'pointer',
        transition: '.15s', whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#9aa3b4' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#5b6476' }}
    >
      <span style={{
        fontFamily: "'EB Garamond', serif", fontSize: 13,
        color: active ? '#cdb88a' : '#7b7565',
        marginRight: 7, letterSpacing: '.1em',
      }}>
        {num}
      </span>
      {label}
    </button>
  )
}

function TweakBtn({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'Caveat, cursive', fontSize: 17,
        color: active ? '#cdb88a' : '#5b6476',
        cursor: 'pointer',
        border: `1.4px ${active ? 'solid' : 'dashed'} ${active ? '#5c5536' : '#2a3140'}`,
        borderRadius: 20, padding: '4px 12px 3px',
        background: 'transparent', transition: '.15s', userSelect: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = active ? '#e0c97a' : '#9aa3b4' }}
      onMouseLeave={e => { e.currentTarget.style.color = active ? '#cdb88a' : '#5b6476' }}
    >
      {children}
    </button>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Overview — card grid with thumbnails
   ════════════════════════════════════════════════════════════════════ */
function OverviewSheet({ svgs, onGoTo }) {
  const briefItems = [
    ['metaphor', 'constellation / star-map'],
    ['for', 'casual explorers'],
    ['fix', 'calmer, less bright'],
    ['must show', 'search · story tours · path-finding'],
  ]
  return (
    <div style={{ animation: 'wfFade .35s ease' }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 33, color: '#cabfa9', margin: '0 0 4px', lineHeight: 1 }}>
          Four ways to read the <span style={{ color: '#cdb88a' }}>sky</span>
        </h2>
        <p style={{ fontFamily: 'Kalam, cursive', fontWeight: 300, fontSize: 15.5, color: '#5b6476', maxWidth: 760, lineHeight: 1.5, margin: 0 }}>
          All four keep the constellation metaphor and a muted, mostly-dark palette — they differ in how you <em>move</em> through it. Skim the thumbnails, then open any direction full-size.
        </p>
      </div>

      {/* Brief box */}
      <div style={{
        border: '1px dashed #2a3140', borderRadius: 13, padding: '15px 20px', marginBottom: 18,
        display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'Caveat, cursive', fontSize: 23, color: '#cabfa9', fontWeight: 700 }}>the brief, captured</span>
        {briefItems.map(([k, v]) => (
          <div key={k}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 17, color: '#8b93a4', fontWeight: 700 }}>{k}</div>
            <div style={{ fontFamily: 'Kalam, cursive', fontWeight: 300, fontSize: 13.5, color: '#5b6476', lineHeight: 1.4 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {DIRS.map((d, i) => (
          <OverviewCard key={d.id} dir={d} svgContent={svgs[i]} onClick={() => onGoTo(i + 1)} />
        ))}
      </div>
    </div>
  )
}

function OverviewCard({ dir, svgContent, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? '#2a3140' : '#161b25'}`,
        borderRadius: 13, background: '#0a0c11',
        padding: '16px 18px 18px', cursor: 'pointer',
        transition: 'border-color .18s, transform .18s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <span style={{ position: 'absolute', top: 14, right: 16, fontFamily: 'Caveat, cursive', fontSize: 18, color: hovered ? '#cabfa9' : '#5b6476', transition: '.15s' }}>
        open ▸
      </span>
      <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 12, letterSpacing: '.2em', color: '#cdb88a', textTransform: 'uppercase' }}>
        Direction {dir.num}
      </span>
      <h3 style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 27, color: '#cabfa9', margin: '3px 0 5px', lineHeight: 1 }}>
        {dir.label}
      </h3>
      <p style={{ fontFamily: 'Kalam, cursive', fontWeight: 300, fontSize: 14, color: '#5b6476', margin: '0 0 13px', lineHeight: 1.55 }}>
        {dir.pills.join(' · ')}
      </p>
      <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #161b25' }}>
        <MockSVG content={svgContent} />
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   Direction sheet — full-size SVG with description
   ════════════════════════════════════════════════════════════════════ */
function DirectionSheet({ dir, svgContent }) {
  return (
    <div style={{ animation: 'wfFade .35s ease' }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: 33, color: '#cabfa9', margin: '0 0 6px', lineHeight: 1 }}>
          {dir.titlePrefix}<span style={{ color: '#cdb88a' }}>{dir.titleEmph}</span>
        </h2>
        <p style={{ fontFamily: 'Kalam, cursive', fontWeight: 300, fontSize: 15.5, color: '#5b6476', maxWidth: 760, lineHeight: 1.5, margin: '0 0 9px' }}>
          {dir.tag}
        </p>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {dir.pills.map(p => <Pill key={p}>{p}</Pill>)}
        </div>
      </div>
      <div style={{
        border: '1px solid #161b25', borderRadius: 14,
        background: 'linear-gradient(180deg,#0a0c11,#090b0f)',
        padding: 8,
      }}>
        <MockSVG content={svgContent} />
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   WireframesPage — root component
   ════════════════════════════════════════════════════════════════════ */
export default function WireframesPage({ onClose }) {
  const [activeTab,  setActiveTab]  = useState(0)
  const [showAnnos,  setShowAnnos]  = useState(true)
  const [dimStars,   setDimStars]   = useState(true)

  /* pre-compute all SVG strings once */
  const svgs = useMemo(() =>
    DIRS.map(d => d.build(seedRnd(d.seed)))
  , [])

  const pageClass = [
    'wf-page',
    showAnnos  ? '' : 'hide-anno',
    dimStars   ? 'dim-stars' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={pageClass}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        background: 'radial-gradient(1200px 700px at 70% -10%, #11151e 0%, transparent 60%), #0b0d12',
        color: '#9aa3b4', fontFamily: 'Kalam, cursive',
        animation: 'wfSlide .38s cubic-bezier(.4,0,.2,1)',
      }}
    >
      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap',
        padding: '14px 26px 0', flexShrink: 0,
      }}>
        <span style={{ fontFamily: "'EB Garamond', serif", letterSpacing: '.42em', fontSize: 19, color: '#cdb88a', textTransform: 'uppercase', fontWeight: 400, paddingLeft: '.42em' }}>
          Theogony
        </span>
        <span style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#7b7565' }}>
          constellation wireframes
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'Caveat, cursive', fontSize: 18, color: '#7b7565' }}>
          low-fi · 4 directions · for casual explorers
        </span>
        <button
          onClick={onClose}
          style={{
            marginLeft: 12, fontFamily: 'Caveat, cursive', fontSize: 17, color: '#5b6476',
            background: 'none', border: '1.4px dashed #2a3140', borderRadius: 20,
            padding: '4px 14px 3px', cursor: 'pointer', transition: '.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#cabfa9'; e.currentTarget.style.borderColor = '#39414f' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#5b6476'; e.currentTarget.style.borderColor = '#2a3140' }}
        >
          ✕ close
        </button>
      </header>

      {/* ── Nav ── */}
      <nav style={{
        display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center',
        padding: '10px 26px 12px', borderBottom: '1px solid #161b25', flexShrink: 0,
      }}>
        <TabBtn active={activeTab === 0} num="·" label="Overview" onClick={() => setActiveTab(0)} />
        {DIRS.map((d, i) => (
          <TabBtn key={d.id} active={activeTab === i + 1} num={d.num} label={d.label} onClick={() => setActiveTab(i + 1)} />
        ))}

        <span style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <TweakBtn active={showAnnos} onClick={() => setShowAnnos(v => !v)}>
            ✎ annotations
          </TweakBtn>
          <TweakBtn active={!dimStars} onClick={() => setDimStars(v => !v)}>
            ✦ brighter
          </TweakBtn>
        </span>
      </nav>

      {/* ── Content ── */}
      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '18px 26px 40px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          {activeTab === 0 && (
            <OverviewSheet svgs={svgs} onGoTo={setActiveTab} />
          )}
          {DIRS.map((d, i) => activeTab === i + 1 && (
            <DirectionSheet key={d.id} dir={d} svgContent={svgs[i]} />
          ))}
        </div>
      </main>
    </div>
  )
}
