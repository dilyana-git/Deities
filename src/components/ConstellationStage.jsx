import { useEffect, useRef } from 'react'
import { getConstellation } from '../data/constellations.js'

/* ════════════════════════════════════════════════════════════════════════
   Guided Sky · Constellation engine
   Each deity is an abstract constellation — a set of connected star-nodes
   that ignites star-by-star, traces its connecting lines, twinkles, and
   carries a signature looping motion. One <svg> is reused; show(fig, accent)
   dissolves the current figure while the next draws itself in.

   Three brightness tiers give every figure a focal point: a single HERO star
   (largest, gold-tinged), a few BRIGHT stars, and the rest DIM — so the eye
   lands on the hero immediately. The engine owns its DOM imperatively (same
   contract as SkyGraph): nodes/edges are plain SVG elements mutated per frame.
   ════════════════════════════════════════════════════════════════════════ */

const SVGNS = 'http://www.w3.org/2000/svg'
const INTRO = 0.62          // seconds — the draw-in (ignite + trace) duration

function rot(x, y, deg) {
  const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a)
  return [x * c - y * s, x * s + y * c]
}
const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v)
const easeOut = v => 1 - Math.pow(1 - v, 3)

/* gentle quadratic bow, always curving outward from the figure's centre, so
   the lines read as a deliberate constellation rather than a string ball */
function edgePath(ax, ay, bx, by) {
  const mx = (ax + bx) / 2, my = (ay + by) / 2
  const dx = bx - ax, dy = by - ay
  const len = Math.hypot(dx, dy) || 1
  let px = -dy / len, py = dx / len
  if (mx * px + my * py < 0) { px = -px; py = -py }
  const bow = Math.min(len * 0.09, 9)
  return `M${ax.toFixed(1)} ${ay.toFixed(1)} Q${(mx + px * bow).toFixed(1)} ${(my + py * bow).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`
}

class ConstellationEngine {
  constructor(svg, reduced) {
    this.svg = svg
    this.reduced = reduced
    this.layerA = this._group()
    this.layerB = this._group()
    this.cur = null
    this.t0 = performance.now()
    this.raf = null
    this.destroyed = false
    if (!reduced) this.raf = requestAnimationFrame(this._tick.bind(this))
  }

  destroy() {
    this.destroyed = true
    if (this.raf != null) cancelAnimationFrame(this.raf)
  }

  _group() {
    const g = document.createElementNS(SVGNS, 'g')
    g.setAttribute('class', 'cl-inner')
    this.svg.appendChild(g)
    return { g, nodes: [], edges: [], fig: null, spec: null, bornT: 0, dead: false, idle: false }
  }

  show(fig, accent, specOverride) {
    const spec = specOverride || getConstellation(fig)
    if (!spec) return
    this.svg.style.setProperty('--accent', accent)
    // dissolve the current layer; draw the new one in
    const old = this.cur
    const layer = (old === this.layerA) ? this.layerB : this.layerA
    if (old) { old.dead = true; old.g.style.transition = 'opacity .5s ease'; old.g.style.opacity = '0' }
    this._build(layer, fig, spec)
    this.cur = layer
  }

  _build(layer, fig, spec) {
    const { g } = layer
    g.innerHTML = ''
    g.style.transition = 'none'           // group fully opaque; the reveal is per-element
    g.style.opacity = '1'
    layer.fig = fig; layer.spec = spec; layer.dead = false; layer.idle = true
    layer.bornT = (performance.now() - this.t0) / 1000

    const hidden = !this.reduced          // ignite from hidden, unless reduced-motion
    const bright = new Set(spec.b || [])
    const hero = spec.hero ?? ((spec.b && spec.b.length) ? spec.b[0] : 0)

    // edges first (under nodes) — curved paths; pathLength=1 lets us trace them
    layer.edges = spec.e.map(([a, b], i) => {
      const ln = document.createElementNS(SVGNS, 'path')
      ln.setAttribute('class', 'cl-edge')
      ln.setAttribute('pathLength', '1')
      // resting geometry so the figure is complete even if the rAF loop never
      // runs (reduced-motion); the loop re-derives this per frame when it does
      ln.setAttribute('d', edgePath(spec.n[a][0], spec.n[a][1], spec.n[b][0], spec.n[b][1]))
      ln.style.opacity = hidden ? '0' : '0.42'
      g.appendChild(ln)
      return { a, b, el: ln, igniteAt: 0.18 + i * 0.03 }
    })

    // nodes — three tiers: hero (gold), bright, dim
    layer.nodes = spec.n.map((p, i) => {
      const tier   = i === hero ? 'hero' : bright.has(i) ? 'bright' : 'dim'
      const baseR  = tier === 'hero' ? 4.3 : tier === 'bright' ? 3.1 : 2.0
      const haloR  = tier === 'hero' ? 14  : tier === 'bright' ? 9   : 6
      const coreOp = tier === 'dim'  ? 0.8 : 1
      const haloOp = tier === 'hero' ? 0.6 : tier === 'bright' ? 0.48 : 0.28

      const halo = document.createElementNS(SVGNS, 'circle')
      halo.setAttribute('class', 'cl-halo' + (tier === 'hero' ? ' hero' : ''))
      halo.setAttribute('r', haloR)
      halo.setAttribute('cx', p[0]); halo.setAttribute('cy', p[1])
      halo.style.opacity = hidden ? '0' : String(haloOp)

      const core = document.createElementNS(SVGNS, 'circle')
      core.setAttribute('class', 'cl-core' + (tier === 'hero' ? ' hero' : tier === 'bright' ? ' bright' : ''))
      core.setAttribute('r', baseR)
      core.setAttribute('cx', p[0]); core.setAttribute('cy', p[1])
      core.style.opacity = hidden ? '0' : String(coreOp)

      g.appendChild(halo); g.appendChild(core)
      const ang = Math.atan2(p[1], p[0])
      const igniteAt = (tier === 'hero' ? 0 : tier === 'bright' ? 0.05 : 0.1) + i * 0.025
      return {
        x: p[0], y: p[1], tier, baseR, haloR, coreOp, haloOp, halo, core, igniteAt,
        phx: Math.random() * 6.28, phy: Math.random() * 6.28,
        fx: 0.4 + Math.random() * 0.5, fy: 0.4 + Math.random() * 0.5,
        tw: 0.8 + Math.random() * 1.2, twph: Math.random() * 6.28,
        dir: [Math.cos(ang), Math.sin(ang)],
      }
    })
  }

  _tick(now) {
    if (this.destroyed) return
    const t = (now - this.t0) / 1000
    ;[this.layerA, this.layerB].forEach(layer => {
      if (!layer.fig) return
      if (layer.dead && getComputedStyle(layer.g).opacity === '0') return
      this._animate(layer, t)
    })
    this.raf = requestAnimationFrame(this._tick.bind(this))
  }

  _animate(layer, t) {
    const spec = layer.spec, m = spec.m
    const age = t - layer.bornT
    const intro = age < INTRO

    // signature motion — suppressed during the draw-in so the figure traces in place
    let gt = ''
    if (!intro) {
      if (m === 'swirl')        gt = `rotate(${Math.sin(t * 0.25) * 10 + t * 4})`
      else if (m === 'breathe') gt = `scale(${1 + Math.sin(t * 0.8) * 0.045})`
      else if (m === 'drift')   gt = `translate(0 ${Math.sin(t * 0.5) * 5})`
      else if (m === 'sweep')   gt = `rotate(${Math.sin(t * 0.5) * 9} -55 41)`
      else if (m === 'cradle')  gt = `rotate(${Math.sin(t * 0.6) * 4})`
      else if (m === 'rock')    gt = `rotate(${Math.sin(t * 0.7) * 3.5})`
    }
    layer.g.setAttribute('transform', gt)

    const amp  = (m === 'swirl') ? 2.6 : 1.5
    const wob  = intro ? 0 : 1
    const beam = spec.beam ? new Set(spec.beam) : null
    const tend = spec.tendril ? new Set(spec.tendril) : null
    const tipA = beam ? Math.sin(t * 0.6) * 7 : 0

    // live node positions (wander + motion offsets suppressed during the draw-in)
    const pos = layer.nodes.map((nd, i) => {
      let x = nd.x, y = nd.y
      x += Math.sin(t * nd.fx + nd.phx) * amp * wob
      y += Math.cos(t * nd.fy + nd.phy) * amp * wob
      if (!intro) {
        if (m === 'undulate') y += Math.sin(t * 1.3 + nd.x * 0.06) * 8
        else if (m === 'pulse' && i !== 0) { const k = Math.sin(t * 1.6) * 4; x += nd.dir[0] * k; y += nd.dir[1] * k }
        else if (m === 'writhe' && tend && tend.has(i)) { x += Math.sin(t * 2.2 + i) * 5; y += Math.cos(t * 1.9 + i * 1.3) * 5 }
        else if (m === 'tip' && beam && beam.has(i)) { const r = rot(nd.x, nd.y + 30, tipA); x = r[0]; y = r[1] - 30 + Math.cos(t * nd.fy + nd.phy) * amp }
        else if (m === 'shimmer') x += Math.sin(t * 0.6 + i) * 1.2
      }
      return [x, y]
    })

    const flash = (!intro && m === 'flash') ? (0.5 + 0.5 * Math.pow(Math.max(0, Math.sin(t * 0.9)), 8)) : 0
    const glint = (!intro && m === 'glint')

    layer.nodes.forEach((nd, i) => {
      const [x, y] = pos[i]
      nd.core.setAttribute('cx', x); nd.core.setAttribute('cy', y)
      nd.halo.setAttribute('cx', x); nd.halo.setAttribute('cy', y)
      if (layer.dead) return

      if (intro) {
        // ignite: stagger opacity + scale up from a point (hero first)
        const e = easeOut(clamp01((age - nd.igniteAt) / 0.4))
        nd.core.style.opacity = (nd.coreOp * e).toFixed(3)
        nd.core.setAttribute('r', (nd.baseR * (0.35 + 0.65 * e)).toFixed(2))
        nd.halo.style.opacity = (nd.haloOp * e).toFixed(3)
        nd.halo.setAttribute('r', (nd.haloR * (0.5 + 0.5 * e)).toFixed(2))
        return
      }

      // settled twinkle — tiers stay distinct so the hero keeps the eye
      let o = 0.55 + 0.45 * Math.abs(Math.sin(t * nd.tw + nd.twph))
      if (nd.tier === 'dim') o *= 0.82
      else o = Math.max(o, 0.85)
      if (nd.tier === 'hero') o = Math.max(o, 0.92)
      if (m === 'flash') o = Math.min(1, o + flash * 0.5)
      if (m === 'pulse' && i === 0) o = 0.7 + 0.3 * Math.sin(t * 1.6)
      if (glint && nd.tier !== 'dim' && i === 5) o = 0.6 + 0.4 * Math.pow(Math.max(0, Math.sin(t * 1.1)), 6)
      nd.core.style.opacity = Math.min(1, o).toFixed(3)
      nd.core.setAttribute('r', (nd.baseR * (1 + 0.18 * Math.sin(t * nd.tw * 1.3 + nd.twph) + flash * 0.6)).toFixed(2))
      nd.halo.style.opacity = nd.haloOp.toFixed(3)
      nd.halo.setAttribute('r', nd.haloR.toFixed(2))
    })

    // curved edges follow the nodes; trace themselves in during the draw-in
    layer.edges.forEach(edge => {
      const a = pos[edge.a], b = pos[edge.b]
      edge.el.setAttribute('d', edgePath(a[0], a[1], b[0], b[1]))
      if (layer.dead) return
      if (intro) {
        const e = easeOut(clamp01((age - edge.igniteAt) / 0.42))
        edge.el.style.strokeDasharray = '1 1'
        edge.el.style.strokeDashoffset = (1 - e).toFixed(3)
        edge.el.style.opacity = (0.42 * e).toFixed(3)
      } else {
        edge.el.style.strokeDasharray = 'none'
        edge.el.style.strokeDashoffset = '0'
        edge.el.style.opacity = (m === 'flash') ? (0.4 + flash * 0.5).toFixed(3) : '0.42'
      }
    })
  }
}

export default function ConstellationStage({ fig, accent, spec }) {
  const svgRef = useRef(null)
  const engineRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    engineRef.current = new ConstellationEngine(svgRef.current, reduced)
    return () => engineRef.current?.destroy()
  }, [])

  useEffect(() => {
    engineRef.current?.show(fig, accent, spec)
  }, [fig, accent, spec])

  return (
    <svg
      ref={svgRef}
      className="cl-stage"
      viewBox="-100 -100 200 200"
      preserveAspectRatio="xMidYMid meet"
      style={{ '--accent': accent }}
    />
  )
}
