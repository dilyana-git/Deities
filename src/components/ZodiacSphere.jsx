import { useEffect, useRef } from 'react'

/* ════════════════════════════════════════════════════════════════════════
   Zodiac Sphere — an interactive 3D-projected celestial globe rendered in
   SVG. All twelve zodiac constellations sit on the ecliptic great circle;
   the sphere can be dragged to rotate. Clicking a constellation selects it.

   Architecture: imperative SVG DOM (same contract as SkyGraph /
   ConstellationEngine). A rAF loop projects every element per-frame; React
   re-renders only when the selected index changes.
   ════════════════════════════════════════════════════════════════════════ */

const SVGNS = 'http://www.w3.org/2000/svg'
const TAU   = Math.PI * 2
const HALF  = Math.PI / 2

const R             = 220   // sphere radius in SVG units
const TILT          = 0.38  // ~22° ecliptic tilt for a nice oblique view
const SPREAD        = 0.21  // radians — how wide each constellation spreads on the sphere (longer, airier figures)
const BG_STAR       = 200   // background stars on the sphere
const TWINKLE_COUNT = 30    // ~15% of bg stars flicker — asynchronous, never in unison
const DRIFT         = 0.03  // radians/sec — perpetual slow drift, ~one full turn in 3.5 min
const LABEL_Z       = 0.3   // only label signs this far onto the front face (no back-of-dome ghosts)
const VIEW_DX       = 150   // shift whole dome further right so the figure forms a clear right mass, balancing the left text column with open sky between
const VIEW_DY       = -18   // lift the dome slightly so the active figure rides near vertical centre while the band still fills the lower frame
const SEL_SCALE     = 1.5   // blow the active constellation up about its centroid — the hero mass of the right two-thirds, sized to fill without crowding the frame

/* ── math helpers ────────────────────────────────────────────────────── */
function rotY(p, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return [p[0]*c + p[2]*s, p[1], -p[0]*s + p[2]*c]
}
function rotX(p, a) {
  const c = Math.cos(a), s = Math.sin(a)
  return [p[0], p[1]*c - p[2]*s, p[1]*s + p[2]*c]
}
function sph(lon, lat) {
  return [Math.cos(lat)*Math.cos(lon), Math.sin(lat), Math.cos(lat)*Math.sin(lon)]
}

function mulberry32(seed) {
  return function() {
    seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ══════════════════════════════════════════════════════════════════════ */

class SphereEngine {
  constructor(svg, signs, onSelect, reduced) {
    this.svg = svg
    this.signs = signs
    this.onSelect = onSelect
    this.reduced = reduced     // honour prefers-reduced-motion: skip idle auto-spin + twinkle
    this.destroyed = false

    this.va = 0                // current view angle (Y-rotation)
    this.target = null         // target view angle (or null = idle)
    this.selected = -1
    this.hovered = -1
    this.drag = null           // { startX, startVA }
    this.t0 = performance.now()

    this._build()
    this._bindPointer()
    this.raf = requestAnimationFrame(this._tick.bind(this))
  }

  destroy() {
    this.destroyed = true
    cancelAnimationFrame(this.raf)
    this.svg.removeEventListener('pointerdown', this._pd)
    window.removeEventListener('pointermove', this._pm)
    window.removeEventListener('pointerup', this._pu)
    // Tear down every element _build() appended. Without this, a StrictMode
    // remount (or any re-init) leaves the dead engine's SVG subtree behind —
    // frozen on its last frame, including a half-faded label that reads as a
    // garbled ghost over the live dome. React renders <svg/> childless, so
    // everything under it is ours to clear.
    while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild)
  }

  select(i) {
    this.selected = i
    if (i < 0) { this.target = null; return }
    // Ease-in-out along the SHORTEST arc to the chosen sign, over a distance-scaled
    // duration — so neither a one-step auto-advance nor a far glyph jump ever lurches.
    const goal = (i / 12) * TAU - HALF
    let diff = goal - this.va
    diff = ((diff % TAU) + TAU + Math.PI) % TAU - Math.PI
    this.rotFrom = this.va
    this.rotTo = this.va + diff
    this.rotT0 = performance.now()
    this.rotDur = 700 + Math.min(900, Math.abs(diff) / Math.PI * 1500)
    this.target = this.rotTo
  }

  /* ── build all SVG elements once ────────────────────────────────── */
  _build() {
    const svg = this.svg

    const defs = document.createElementNS(SVGNS, 'defs')

    // sphere body gradient
    const grad = document.createElementNS(SVGNS, 'radialGradient')
    grad.id = 'sphere-grad'
    grad.innerHTML = `
      <stop offset="0%"  stop-color="#111828" stop-opacity=".9"/>
      <stop offset="65%" stop-color="#0a0e18" stop-opacity=".95"/>
      <stop offset="100%" stop-color="#06090f" stop-opacity="1"/>
    `
    defs.appendChild(grad)

    // feathered edge mask
    const mask = document.createElementNS(SVGNS, 'mask')
    mask.id = 'sphere-feather'
    mask.setAttribute('maskContentUnits', 'userSpaceOnUse')
    const maskGrad = document.createElementNS(SVGNS, 'radialGradient')
    maskGrad.id = 'feather-grad'
    maskGrad.innerHTML = `
      <stop offset="0%"   stop-color="white" stop-opacity="1"/>
      <stop offset="68%"  stop-color="white" stop-opacity="1"/>
      <stop offset="88%"  stop-color="white" stop-opacity=".45"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    `
    defs.appendChild(maskGrad)
    const maskCircle = document.createElementNS(SVGNS, 'circle')
    maskCircle.setAttribute('cx', '0')
    maskCircle.setAttribute('cy', '0')
    maskCircle.setAttribute('r', String(R + 20))
    maskCircle.setAttribute('fill', 'url(#feather-grad)')
    mask.appendChild(maskCircle)
    defs.appendChild(mask)

    // soft glow filter for ecliptic
    const eclGlow = document.createElementNS(SVGNS, 'filter')
    eclGlow.id = 'ecl-glow'
    eclGlow.setAttribute('x', '-20%')
    eclGlow.setAttribute('y', '-20%')
    eclGlow.setAttribute('width', '140%')
    eclGlow.setAttribute('height', '140%')
    eclGlow.innerHTML = `<feGaussianBlur in="SourceGraphic" stdDeviation="3"/>`
    defs.appendChild(eclGlow)

    // glow filter for selected constellation edges
    const selGlow = document.createElementNS(SVGNS, 'filter')
    selGlow.id = 'sel-edge-glow'
    selGlow.setAttribute('x', '-30%')
    selGlow.setAttribute('y', '-30%')
    selGlow.setAttribute('width', '160%')
    selGlow.setAttribute('height', '160%')
    selGlow.innerHTML = `<feGaussianBlur in="SourceGraphic" stdDeviation="2.5"/>`
    defs.appendChild(selGlow)

    svg.appendChild(defs)

    // world group — translates the whole dome so the band sits higher and toward
    // the right two-thirds (keeping the left-hand text column clear). All hit-testing
    // subtracts this offset so projection math stays centred on the origin.
    const worldG = document.createElementNS(SVGNS, 'g')
    worldG.setAttribute('transform', `translate(${VIEW_DX} ${VIEW_DY})`)
    svg.appendChild(worldG)

    // sphere disc — feathered
    const discGroup = document.createElementNS(SVGNS, 'g')
    discGroup.setAttribute('mask', 'url(#sphere-feather)')
    this.disc = this._circle(0, 0, R + 15, 'zs-disc')
    this.disc.setAttribute('fill', 'url(#sphere-grad)')
    discGroup.appendChild(this.disc)
    worldG.appendChild(discGroup)

    // stars + ecliptic + constellations live under the feather mask (soft limb)
    this.contentG = document.createElementNS(SVGNS, 'g')
    this.contentG.setAttribute('mask', 'url(#sphere-feather)')
    worldG.appendChild(this.contentG)

    // labels ride ABOVE the mask — so edge signs' names are never feathered or
    // clipped; their visibility is governed purely by depth in the tick.
    this.labelG = document.createElementNS(SVGNS, 'g')
    worldG.appendChild(this.labelG)

    // background stars
    const rnd = mulberry32(42)
    this.bgStars = []
    const bgG = document.createElementNS(SVGNS, 'g')
    bgG.setAttribute('class', 'zs-bg')
    for (let i = 0; i < BG_STAR; i++) {
      const lon = rnd() * TAU
      const lat = (rnd() - 0.5) * Math.PI * 0.92
      const baseR = 0.5 + rnd() * 0.8
      const c = this._circle(0, 0, baseR, 'zs-bgstar')
      c.style.opacity = '0'
      bgG.appendChild(c)
      this.bgStars.push({
        lon, lat, el: c, baseR,
        twinklePhase: rnd() * TAU,
        twinkleSpeed: 0.9 + rnd() * 1.2,   // ~3–7s loops, each star on its own phase
        twinkles: i < TWINKLE_COUNT,
      })
    }
    this.contentG.appendChild(bgG)

    // ecliptic ring — glow layer + crisp layer
    this.eclipticGlow = document.createElementNS(SVGNS, 'path')
    this.eclipticGlow.setAttribute('class', 'zs-ecliptic-glow')
    this.contentG.appendChild(this.eclipticGlow)

    this.eclipticPath = document.createElementNS(SVGNS, 'path')
    this.eclipticPath.setAttribute('class', 'zs-ecliptic')
    this.contentG.appendChild(this.eclipticPath)

    // constellation groups
    this.consts = this.signs.map((sign, si) => {
      const g = document.createElementNS(SVGNS, 'g')
      g.setAttribute('class', 'zs-const')
      g.setAttribute('data-idx', si)

      const signLon = (si / 12) * TAU
      const bright = new Set(sign.b || [])
      // the one named star of the figure (Spica for Virgo) — defaults to the
      // first bright star. It alone burns gold while its sign is active.
      const heroIdx = sign.hero != null ? sign.hero : (sign.b && sign.b.length ? sign.b[0] : -1)

      // edge glow layer (behind crisp edges, visible only for selected)
      const edgeGlows = sign.e.map(([a, b]) => {
        const ln = document.createElementNS(SVGNS, 'line')
        ln.setAttribute('class', 'zs-edge-glow')
        g.appendChild(ln)
        return { a, b, el: ln }
      })

      const edges = sign.e.map(([a, b]) => {
        const ln = document.createElementNS(SVGNS, 'line')
        ln.setAttribute('class', 'zs-edge')
        g.appendChild(ln)
        return { a, b, el: ln }
      })

      const nodes = sign.n.map((p, ni) => {
        // A delicate figure has near-even stars — a faint, restrained accent on the
        // marked ones, never a single blazing dot that flattens the rest. The lone
        // exception is the hero star, which the active sign lights gold (see CSS).
        const isB = bright.has(ni)
        const isHero = ni === heroIdx
        const halo = this._circle(0, 0, isB ? 2.8 : 2.2, isHero ? 'zs-halo zs-hero' : 'zs-halo')
        const core = this._circle(0, 0, isB ? 1.6 : 1.25,
          (isB ? 'zs-core bright' : 'zs-core') + (isHero ? ' zs-hero' : ''))
        g.appendChild(halo)
        g.appendChild(core)
        return {
          localX: p[0], localY: p[1], isB, isHero, halo, core,
          lon: signLon + (p[0] / 100) * SPREAD,
          lat: (-p[1] / 100) * SPREAD,
        }
      })

      const label = document.createElementNS(SVGNS, 'text')
      label.setAttribute('class', 'zs-label')
      label.textContent = sign.name
      this.labelG.appendChild(label)

      this.contentG.appendChild(g)
      return { g, nodes, edges, edgeGlows, label, signLon }
    })
  }

  _circle(cx, cy, r, cls) {
    const c = document.createElementNS(SVGNS, 'circle')
    c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r)
    if (cls) c.setAttribute('class', cls)
    return c
  }

  /* ── pointer events ──────────────────────────────────────────────── */
  _bindPointer() {
    let totalDelta = 0

    this._pd = (e) => {
      this.drag = { startX: e.clientX, startVA: this.va }
      totalDelta = 0
      this.target = null
      this.svg.setPointerCapture(e.pointerId)
    }
    this._pm = (e) => {
      if (this.drag) {
        const dx = e.clientX - this.drag.startX
        totalDelta = Math.abs(dx)
        const rect = this.svg.getBoundingClientRect()
        this.va = this.drag.startVA + (dx / rect.width) * Math.PI * 1.6
      } else {
        this._handleHover(e)
      }
    }
    this._pu = (e) => {
      if (!this.drag) return
      const wasDrag = totalDelta > 6
      this.drag = null
      if (!wasDrag) this._handleClick(e)
    }
    this.svg.addEventListener('pointerdown', this._pd)
    window.addEventListener('pointermove', this._pm)
    window.addEventListener('pointerup', this._pu)
  }

  _handleHover(e) {
    const rect = this.svg.getBoundingClientRect()
    const scaleX = 600 / rect.width, scaleY = 600 / rect.height
    const mx = (e.clientX - rect.left) * scaleX - 300 - VIEW_DX
    const my = (e.clientY - rect.top)  * scaleY - 300 - VIEW_DY

    let bestDist = 70, bestIdx = -1
    this.consts.forEach((c, i) => {
      const center = this._projectSign(c.signLon, 0)
      if (center.z < 0.05) return
      const dx = mx - center.x, dy = my - center.y
      const d = Math.sqrt(dx*dx + dy*dy)
      if (d < bestDist) { bestDist = d; bestIdx = i }
    })
    if (bestIdx !== this.hovered) {
      this.hovered = bestIdx
      this.svg.style.cursor = bestIdx >= 0 ? 'pointer' : 'grab'
    }
  }

  _handleClick(e) {
    const rect = this.svg.getBoundingClientRect()
    const scaleX = 600 / rect.width, scaleY = 600 / rect.height
    const mx = (e.clientX - rect.left) * scaleX - 300 - VIEW_DX
    const my = (e.clientY - rect.top)  * scaleY - 300 - VIEW_DY

    let bestDist = 80, bestIdx = -1
    this.consts.forEach((c, i) => {
      const center = this._projectSign(c.signLon, 0)
      if (center.z < 0.05) return
      const dx = mx - center.x, dy = my - center.y
      const d = Math.sqrt(dx*dx + dy*dy)
      if (d < bestDist) { bestDist = d; bestIdx = i }
    })
    if (bestIdx >= 0) this.onSelect(bestIdx)
  }

  /* ── projection helpers ──────────────────────────────────────────── */
  _projectPoint(lon, lat) {
    let p = sph(lon, lat)
    p = rotY(p, this.va)
    p = rotX(p, TILT)
    return { x: p[0] * R, y: -p[1] * R, z: p[2] }
  }

  _projectSign(lon, lat) {
    return this._projectPoint(lon, lat)
  }

  /* ── animation loop ──────────────────────────────────────────────── */
  _tick(now) {
    if (this.destroyed) return
    const dt = (now - (this._lastT || now)) / 1000
    this._lastT = now

    // rotation: ease toward a just-selected sign, then RELEASE into a perpetual
    // very-slow drift so the globe is always gently turning and never parks. The
    // ease snaps to dead-centre first, so a freshly chosen sign is momentarily
    // composed with symmetric flanks before the drift carries it on.
    if (!this.drag) {
      if (this.target != null) {
        let diff = this.target - this.va
        diff = ((diff % TAU) + TAU + Math.PI) % TAU - Math.PI
        this.va += diff * Math.min(1, 4 * dt)
        if (Math.abs(diff) < 0.01) this.target = null
      } else if (!this.reduced) {
        this.va += DRIFT * dt
      }
    }

    const t = (now - this.t0) / 1000
    const hasSel = this.selected >= 0

    // background stars
    this.bgStars.forEach(s => {
      const p = this._projectPoint(s.lon, s.lat)
      s.el.setAttribute('cx', p.x)
      s.el.setAttribute('cy', p.y)
      if (p.z > 0.02) {
        let o = 0.12 + 0.25 * p.z
        let tw = 1
        if (s.twinkles && !this.reduced) {
          // smooth, gentle breathing — NOT Math.abs(sin): its cusp made stars
          // blink sharply at double speed, which read as a glitchy screen
          tw = 0.85 + 0.15 * Math.sin(t * s.twinkleSpeed + s.twinklePhase)
          o *= tw
        }
        s.el.style.opacity = o.toFixed(3)
        s.el.setAttribute('r', (s.baseR * (0.85 + 0.3 * p.z) * (0.94 + 0.06 * tw)).toFixed(2))
      } else {
        s.el.style.opacity = '0'
      }
    })

    // ecliptic ring
    let ecl = '', needMove = true
    for (let i = 0; i <= 72; i++) {
      const lon = (i / 72) * TAU
      const p = this._projectPoint(lon, 0)
      if (p.z < -0.08) { needMove = true; continue }
      ecl += (needMove ? 'M' : 'L') + `${p.x.toFixed(1)},${p.y.toFixed(1)} `
      needMove = false
    }
    this.eclipticPath.setAttribute('d', ecl)
    this.eclipticGlow.setAttribute('d', ecl)

    // constellations
    this.consts.forEach((c, ci) => {
      const isSel = ci === this.selected
      const isHov = ci === this.hovered && !isSel
      const center = this._projectSign(c.signLon, 0)

      let positions = c.nodes.map(nd => this._projectPoint(nd.lon, nd.lat))

      // The active figure is the hero of the right two-thirds — blow it up about
      // its own projected centroid so it fills the frame instead of reading as a
      // tiny cluster, while staying anchored on the ecliptic where it sits.
      if (isSel) {
        let sx = 0, sy = 0
        positions.forEach(p => { sx += p.x; sy += p.y })
        const cx = sx / positions.length, cy = sy / positions.length
        positions = positions.map(p => ({
          x: cx + (p.x - cx) * SEL_SCALE,
          y: cy + (p.y - cy) * SEL_SCALE,
          z: p.z,
        }))
      }

      // nodes
      c.nodes.forEach((nd, ni) => {
        const p = positions[ni]
        const vis = p.z > -0.02
        const depthFade = vis ? Math.min(1, 0.3 + 0.7 * Math.max(0, p.z)) : 0

        let selMul
        if (isSel) selMul = 1
        else if (isHov) selMul = 0.6
        else selMul = hasSel ? 0.25 : 0.5

        const o = depthFade * selMul

        let twinkle = 1
        if (!this.reduced) {
          twinkle = 1 + 0.12 * Math.sin(t * (1.2 + ni * 0.3) + ci * 2.1)
        }

        // near-even, fine stars — a whisper of size on the marked ones, no blaze.
        // The hero star is the exception, but only while its sign holds the frame:
        // it swells and brightens so the gold core (CSS) reads as the named star.
        const coreBase = nd.isB ? 1.6 : 1.25
        const haloBase = nd.isB ? 2.8 : 2.2
        const sizeMul  = isSel ? 1.35 : isHov ? 1.1 : 0.85
        const heroLit  = isSel && nd.isHero

        nd.core.setAttribute('cx', p.x)
        nd.core.setAttribute('cy', p.y)
        nd.core.style.opacity = o.toFixed(3)
        nd.core.setAttribute('r', (coreBase * twinkle * sizeMul * (heroLit ? 1.5 : 1)).toFixed(2))

        nd.halo.setAttribute('cx', p.x)
        nd.halo.setAttribute('cy', p.y)
        nd.halo.style.opacity = (o * (nd.isB ? 0.4 : 0.3) * (isSel ? 1.6 : 1) * (heroLit ? 1.5 : 1)).toFixed(3)
        nd.halo.setAttribute('r', (haloBase * sizeMul * (isSel ? 1.35 : 1.1) * (heroLit ? 1.7 : 1)).toFixed(1))
      })

      // edges — crisp + glow layer
      c.edges.forEach((e, ei) => {
        const a = positions[e.a], b = positions[e.b]
        const eVis = a.z > -0.02 && b.z > -0.02
        const edgeDepth = eVis ? Math.min(1, 0.2 + 0.8 * Math.max(0, Math.min(a.z, b.z))) : 0

        let edgeMul
        if (isSel) edgeMul = 0.95
        else if (isHov) edgeMul = 0.4
        else edgeMul = hasSel ? 0.12 : 0.25

        const eo = edgeDepth * edgeMul

        e.el.setAttribute('x1', a.x); e.el.setAttribute('y1', a.y)
        e.el.setAttribute('x2', b.x); e.el.setAttribute('y2', b.y)
        e.el.style.opacity = eo.toFixed(3)
        e.el.style.strokeWidth = isSel ? '0.9' : '0.5'   // fine threads across a long span — delicate, not heavy

        // glow duplicate behind selected edges — a soft wash, not a thick halo
        const ge = c.edgeGlows[ei]
        ge.el.setAttribute('x1', a.x); ge.el.setAttribute('y1', a.y)
        ge.el.setAttribute('x2', b.x); ge.el.setAttribute('y2', b.y)
        ge.el.style.opacity = isSel ? (eo * 0.5).toFixed(3) : '0'
        ge.el.style.strokeWidth = isSel ? '2.2' : '2'
      })

      // label (unmasked layer) — gated strictly to the front face so no name ever
      // floats over the back of the dome. Because the selected sign now HOLDS dead
      // centre, the two flanking signs sit at mirror-image depths, so this single
      // depth-driven ramp renders them at matching opacity on both sides.
      if (center.z > LABEL_Z) {
        const d = (center.z - LABEL_Z) / (1 - LABEL_Z)   // 0 at the gate → 1 at front-centre
        let labelO, fill, lx = center.x, ly = center.y - 24
        if (isSel) {
          // seat the hero's name just above the top of its enlarged figure
          labelO = 1; fill = '#f6f1e3'
          let minY = Infinity, sx = 0
          positions.forEach(p => { if (p.y < minY) minY = p.y; sx += p.x })
          lx = sx / positions.length
          ly = minY - 16
        } else if (isHov) {
          labelO = 0.3 + 0.5 * d; fill = '#cfd5e2'
        } else {
          labelO = 0.14 + 0.4 * d; fill = '#8b93a6'   // floor keeps the ±60° flanks legible, not ghostly
        }

        c.label.setAttribute('x', lx)
        c.label.setAttribute('y', ly)
        c.label.style.opacity = labelO.toFixed(3)
        c.label.style.fill = fill
        c.label.setAttribute('font-size', isSel ? '18' : isHov ? '11' : '10')
        c.label.setAttribute('font-weight', isSel ? '700' : '400')
      } else {
        c.label.style.opacity = '0'
      }

      c.g.classList.toggle('zs-selected', isSel)
      c.g.classList.toggle('zs-hovered', isHov)
    })

    this.raf = requestAnimationFrame(this._tick.bind(this))
  }
}

/* ══════════════════════════════════════════════════════════════════════ */

export default function ZodiacSphere({ signs, selectedIndex, onSelect }) {
  const svgRef    = useRef(null)
  const engineRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    engineRef.current = new SphereEngine(svgRef.current, signs, onSelect, reduced)
    return () => engineRef.current?.destroy()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    engineRef.current?.select(selectedIndex)
  }, [selectedIndex])

  return (
    <svg
      ref={svgRef}
      className="zs-sphere"
      viewBox="-300 -300 600 600"
      preserveAspectRatio="xMidYMid meet"
    />
  )
}
