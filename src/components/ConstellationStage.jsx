import { useEffect, useRef } from 'react'
import { getConstellation } from '../data/constellations.js'

/* ════════════════════════════════════════════════════════════════════════
   Guided Sky · Constellation engine
   Each deity is an abstract constellation — a set of connected star-nodes
   that draws itself in, twinkles, and carries a signature looping motion.
   One <svg> is reused; show(fig, accent) crossfades to a new figure.

   The engine owns its DOM imperatively (same contract as SkyGraph): nodes
   and edges are plain SVG elements mutated per animation frame, never JSX
   or React state. Resting state (built in _build) is always fully visible
   — the rAF loop in _animate layers motion on top of it additively, so a
   skipped/cancelled loop never leaves anything hidden.
   ════════════════════════════════════════════════════════════════════════ */

const SVGNS = 'http://www.w3.org/2000/svg'
function rot(x, y, deg) {
  const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a)
  return [x * c - y * s, x * s + y * c]
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
    return { g, nodes: [], edges: [], fig: null, spec: null, born: 0, dead: false, idle: false }
  }

  show(fig, accent) {
    const spec = getConstellation(fig)
    if (!spec) return
    this.svg.style.setProperty('--accent', accent)
    // retire the current layer (fade out), build into the other
    const old = this.cur
    const layer = (old === this.layerA) ? this.layerB : this.layerA
    if (old) { old.dead = true; old.g.style.opacity = '0' }
    this._build(layer, fig, spec, accent)
    this.cur = layer
  }

  _build(layer, fig, spec) {
    const { g } = layer
    g.innerHTML = ''
    g.style.transition = 'opacity .55s ease'
    g.style.opacity = '1'                 // resting state: visible
    layer.fig = fig; layer.spec = spec; layer.dead = false; layer.idle = true
    layer.born = performance.now()

    const bright = new Set(spec.b || [])
    // edges first (under nodes) — drawn at rest
    layer.edges = spec.e.map(([a, b]) => {
      const ln = document.createElementNS(SVGNS, 'line')
      ln.setAttribute('class', 'cl-edge')
      ln.setAttribute('x1', spec.n[a][0]); ln.setAttribute('y1', spec.n[a][1])
      ln.setAttribute('x2', spec.n[b][0]); ln.setAttribute('y2', spec.n[b][1])
      g.appendChild(ln)
      return { a, b, el: ln }
    })
    // nodes — visible at rest
    layer.nodes = spec.n.map((p, i) => {
      const isB = bright.has(i)
      const halo = document.createElementNS(SVGNS, 'circle')
      halo.setAttribute('class', 'cl-halo')
      halo.setAttribute('r', isB ? 9 : 6)
      halo.setAttribute('cx', p[0]); halo.setAttribute('cy', p[1])
      halo.style.opacity = isB ? '.5' : '.32'
      const core = document.createElementNS(SVGNS, 'circle')
      core.setAttribute('class', 'cl-core' + (isB ? ' bright' : ''))
      core.setAttribute('r', isB ? 3.1 : 2.0)
      core.setAttribute('cx', p[0]); core.setAttribute('cy', p[1])
      core.style.opacity = isB ? '1' : '.9'
      g.appendChild(halo); g.appendChild(core)
      const ang = Math.atan2(p[1], p[0])
      return { x: p[0], y: p[1], bright: isB, halo, core,
        phx: Math.random()*6.28, phy: Math.random()*6.28,
        fx: 0.4+Math.random()*0.5, fy: 0.4+Math.random()*0.5,
        tw: 0.8+Math.random()*1.2, twph: Math.random()*6.28,
        baseR: isB ? 3.1 : 2.0, dir: [Math.cos(ang), Math.sin(ang)] }
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
    // group transform per motion
    let gt = ''
    if (m === 'swirl')        gt = `rotate(${Math.sin(t*0.25)*10 + t*4})`
    else if (m === 'breathe') gt = `scale(${1 + Math.sin(t*0.8)*0.045})`
    else if (m === 'drift')   gt = `translate(0 ${Math.sin(t*0.5)*5})`
    else if (m === 'sweep')   gt = `rotate(${Math.sin(t*0.5)*9} -55 41)`
    else if (m === 'cradle')  gt = `rotate(${Math.sin(t*0.6)*4})`
    else if (m === 'rock')    gt = `rotate(${Math.sin(t*0.7)*3.5})`
    layer.g.setAttribute('transform', gt)

    const amp = (m === 'swirl') ? 2.6 : 1.5
    const beam = spec.beam ? new Set(spec.beam) : null
    const tend = spec.tendril ? new Set(spec.tendril) : null
    const tipA = beam ? Math.sin(t*0.6)*7 : 0

    // compute live positions
    const pos = layer.nodes.map((nd, i) => {
      let x = nd.x, y = nd.y
      // universal wander
      x += Math.sin(t*nd.fx + nd.phx) * amp
      y += Math.cos(t*nd.fy + nd.phy) * amp
      // motion-specific node offsets
      if (m === 'undulate') y += Math.sin(t*1.3 + nd.x*0.06) * 8
      else if (m === 'pulse' && i !== 0) { const k = Math.sin(t*1.6)*4; x += nd.dir[0]*k; y += nd.dir[1]*k }
      else if (m === 'writhe' && tend && tend.has(i)) { x += Math.sin(t*2.2 + i)*5; y += Math.cos(t*1.9 + i*1.3)*5 }
      else if (m === 'tip' && beam && beam.has(i)) { const r = rot(nd.x, nd.y + 30, tipA); x = r[0]; y = r[1] - 30 + Math.cos(t*nd.fy+nd.phy)*amp }
      else if (m === 'shimmer') x += Math.sin(t*0.6 + i)*1.2
      return [x, y]
    })

    // twinkle / glow
    const flash = (m === 'flash') ? (0.5 + 0.5*Math.pow(Math.max(0, Math.sin(t*0.9)), 8)) : 0
    const glint = (m === 'glint')
    layer.nodes.forEach((nd, i) => {
      const [x, y] = pos[i]
      nd.core.setAttribute('cx', x); nd.core.setAttribute('cy', y)
      nd.halo.setAttribute('cx', x); nd.halo.setAttribute('cy', y)
      if (layer.idle && !layer.dead) {
        let o = 0.55 + 0.45*Math.abs(Math.sin(t*nd.tw + nd.twph))
        if (nd.bright) o = Math.max(o, 0.85)
        if (m === 'flash') o = Math.min(1, o + flash*0.5)
        if (m === 'pulse' && i === 0) o = 0.7 + 0.3*Math.sin(t*1.6)
        if (glint && nd.bright && i === 5) o = 0.6 + 0.4*Math.pow(Math.max(0,Math.sin(t*1.1)),6)
        nd.core.style.opacity = o
        const r = nd.baseR * (1 + 0.18*Math.sin(t*nd.tw*1.3 + nd.twph) + flash*0.6)
        nd.core.setAttribute('r', r)
      }
    })
    // edges follow nodes
    layer.edges.forEach(e => {
      const a = pos[e.a], b = pos[e.b]
      e.el.setAttribute('x1', a[0]); e.el.setAttribute('y1', a[1])
      e.el.setAttribute('x2', b[0]); e.el.setAttribute('y2', b[1])
      if (m === 'flash') e.el.style.opacity = 0.4 + flash*0.5
    })
  }
}

export default function ConstellationStage({ fig, accent }) {
  const svgRef = useRef(null)
  const engineRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    engineRef.current = new ConstellationEngine(svgRef.current, reduced)
    return () => engineRef.current?.destroy()
  }, [])

  useEffect(() => {
    engineRef.current?.show(fig, accent)
  }, [fig, accent])

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
