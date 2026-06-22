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

const R         = 220     // sphere radius in SVG units
const TILT      = 0.38    // ~22° ecliptic tilt for a nice oblique view
const SPREAD    = 0.17    // radians — how wide each constellation spreads on the sphere
const BG_STAR   = 160     // number of random background stars on the sphere
const IDLE_SPIN = 0.06    // radians/sec — gentle default rotation while no sign is selected

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
    this.reduced = reduced     // honour prefers-reduced-motion: skip the idle auto-spin
    this.destroyed = false

    this.va = 0                // current view angle (Y-rotation)
    this.target = null         // target view angle (or null = idle)
    this.selected = -1
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
  }

  select(i) {
    this.selected = i
    if (i < 0) { this.target = null; return }
    this.target = (i / 12) * TAU - HALF
  }

  /* ── build all SVG elements once ────────────────────────────────── */
  _build() {
    const svg = this.svg

    // sphere body
    const defs = document.createElementNS(SVGNS, 'defs')
    const grad = document.createElementNS(SVGNS, 'radialGradient')
    grad.id = 'sphere-grad'
    grad.innerHTML = `
      <stop offset="0%"  stop-color="#111828" stop-opacity=".9"/>
      <stop offset="65%" stop-color="#0a0e18" stop-opacity=".95"/>
      <stop offset="100%" stop-color="#06090f" stop-opacity="1"/>
    `
    defs.appendChild(grad)
    svg.appendChild(defs)

    this.disc = this._circle(0, 0, R, 'zs-disc')
    this.disc.setAttribute('fill', 'url(#sphere-grad)')
    this.disc.setAttribute('stroke', '#1a2438')
    this.disc.setAttribute('stroke-width', '1.2')
    svg.appendChild(this.disc)

    // background stars
    const rnd = mulberry32(42)
    this.bgStars = []
    const bgG = document.createElementNS(SVGNS, 'g')
    bgG.setAttribute('class', 'zs-bg')
    for (let i = 0; i < BG_STAR; i++) {
      const lon = rnd() * TAU
      const lat = (rnd() - 0.5) * Math.PI * 0.92
      const c = this._circle(0, 0, 0.6 + rnd() * 0.7, 'zs-bgstar')
      c.style.opacity = '0'
      bgG.appendChild(c)
      this.bgStars.push({ lon, lat, el: c })
    }
    svg.appendChild(bgG)

    // ecliptic ring
    this.eclipticPath = document.createElementNS(SVGNS, 'path')
    this.eclipticPath.setAttribute('class', 'zs-ecliptic')
    svg.appendChild(this.eclipticPath)

    // constellation groups
    this.consts = this.signs.map((sign, si) => {
      const g = document.createElementNS(SVGNS, 'g')
      g.setAttribute('class', 'zs-const')
      g.setAttribute('data-idx', si)

      const signLon = (si / 12) * TAU
      const bright = new Set(sign.b || [])

      const edges = sign.e.map(([a, b]) => {
        const ln = document.createElementNS(SVGNS, 'line')
        ln.setAttribute('class', 'zs-edge')
        g.appendChild(ln)
        return { a, b, el: ln }
      })

      const nodes = sign.n.map((p, ni) => {
        const isB = bright.has(ni)
        const halo = this._circle(0, 0, isB ? 5 : 3, 'zs-halo')
        const core = this._circle(0, 0, isB ? 2.2 : 1.4, isB ? 'zs-core bright' : 'zs-core')
        g.appendChild(halo)
        g.appendChild(core)
        return {
          localX: p[0], localY: p[1], isB, halo, core,
          lon: signLon + (p[0] / 100) * SPREAD,
          lat: (-p[1] / 100) * SPREAD,
        }
      })

      const label = document.createElementNS(SVGNS, 'text')
      label.setAttribute('class', 'zs-label')
      label.textContent = `${sign.symbol} ${sign.name}`
      g.appendChild(label)

      svg.appendChild(g)
      return { g, nodes, edges, label, signLon }
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
      if (!this.drag) return
      const dx = e.clientX - this.drag.startX
      totalDelta = Math.abs(dx)
      const rect = this.svg.getBoundingClientRect()
      this.va = this.drag.startVA + (dx / rect.width) * Math.PI * 1.6
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

  _handleClick(e) {
    const rect = this.svg.getBoundingClientRect()
    const scaleX = 600 / rect.width, scaleY = 600 / rect.height
    const mx = (e.clientX - rect.left) * scaleX - 300
    const my = (e.clientY - rect.top)  * scaleY - 300

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

    // smooth rotation toward target
    if (this.target != null && !this.drag) {
      let diff = this.target - this.va
      diff = ((diff % TAU) + TAU + Math.PI) % TAU - Math.PI
      this.va += diff * Math.min(1, 5 * dt)
      if (Math.abs(diff) < 0.003) this.va = this.target
    }
    // gentle default spin while no sign is selected (skipped for reduced-motion)
    if (this.target == null && !this.drag && !this.reduced) {
      this.va += IDLE_SPIN * dt
    }

    const t = (now - this.t0) / 1000

    // background stars
    this.bgStars.forEach(s => {
      const p = this._projectPoint(s.lon, s.lat)
      s.el.setAttribute('cx', p.x)
      s.el.setAttribute('cy', p.y)
      s.el.style.opacity = p.z > 0.02 ? (0.15 + 0.2 * p.z).toFixed(3) : '0'
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

    // constellations
    this.consts.forEach((c, ci) => {
      const isSel = ci === this.selected
      const center = this._projectSign(c.signLon, 0)
      const front = center.z > -0.05

      const positions = c.nodes.map(nd => this._projectPoint(nd.lon, nd.lat))

      c.nodes.forEach((nd, ni) => {
        const p = positions[ni]
        const vis = p.z > -0.02
        const depthFade = vis ? Math.min(1, 0.3 + 0.7 * Math.max(0, p.z)) : 0
        const selBoost = isSel ? 1 : 0.55
        const o = depthFade * selBoost
        const twinkle = 1 + 0.12 * Math.sin(t * (1.2 + ni * 0.3) + ci * 2.1)

        nd.core.setAttribute('cx', p.x)
        nd.core.setAttribute('cy', p.y)
        nd.core.style.opacity = o.toFixed(3)
        nd.core.setAttribute('r', ((nd.isB ? 2.2 : 1.4) * twinkle * (isSel ? 1.3 : 1)).toFixed(2))

        nd.halo.setAttribute('cx', p.x)
        nd.halo.setAttribute('cy', p.y)
        nd.halo.style.opacity = (o * (nd.isB ? 0.5 : 0.3)).toFixed(3)
        nd.halo.setAttribute('r', ((nd.isB ? 5 : 3) * (isSel ? 1.4 : 1)).toFixed(1))
      })

      c.edges.forEach(e => {
        const a = positions[e.a], b = positions[e.b]
        const eVis = a.z > -0.02 && b.z > -0.02
        const eo = eVis ? Math.min(1, 0.2 + 0.8 * Math.max(0, Math.min(a.z, b.z))) * (isSel ? 0.7 : 0.3) : 0
        e.el.setAttribute('x1', a.x); e.el.setAttribute('y1', a.y)
        e.el.setAttribute('x2', b.x); e.el.setAttribute('y2', b.y)
        e.el.style.opacity = eo.toFixed(3)
      })

      // label
      if (front) {
        const labelO = Math.min(1, 0.15 + 0.85 * Math.max(0, center.z)) * (isSel ? 1 : 0.55)
        c.label.setAttribute('x', center.x)
        c.label.setAttribute('y', center.y + (isSel ? -32 : -22))
        c.label.style.opacity = labelO.toFixed(3)
        c.label.setAttribute('font-size', isSel ? '14' : '10')
      } else {
        c.label.style.opacity = '0'
      }

      c.g.classList.toggle('zs-selected', isSel)
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
