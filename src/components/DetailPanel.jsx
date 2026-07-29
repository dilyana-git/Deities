import { useState, useRef, useEffect } from 'react'
import { nodes as allNodes, links as allLinks } from '../data/mythology.js'
import { CAT, portraitSources } from './SkyGraph.jsx'
import { categoryConfig } from '../data/categoryConfig.js'
import { deityStories } from '../data/deityStories.js'
import { TOURS } from '../data/tours.js'

/* precompute adjacency + prom */
const _adj = {}
allNodes.forEach(n => (_adj[n.id] = new Set()))
allLinks.forEach(l => { _adj[l.source]?.add(l.target); _adj[l.target]?.add(l.source) })

/* myths shared by 3+ nodes are "famous" — highlighted in the panel */
const _mythFreq = {}
allNodes.forEach(n => (n.notable_myths || []).forEach(m => (_mythFreq[m] = (_mythFreq[m] || 0) + 1)))
const _famousMyths = new Set(Object.entries(_mythFreq).filter(([, c]) => c >= 3).map(([m]) => m))

/* which tales feature each figure — node id → the tours it appears in, with the
   chapter where it first takes the stage, so a row can open the tale *there*
   rather than at its beginning. A figure that recurs in one tour lists it once. */
const _talesByFig = {}
TOURS.forEach(t => t.beats.forEach((b, i) => {
  const list = _talesByFig[b.fig] || (_talesByFig[b.fig] = [])
  if (!list.some(x => x.id === t.id)) {
    list.push({ id: t.id, title: t.title, kicker: t.kicker, beat: i, total: t.beats.length })
  }
}))
const _maxDeg = Math.max(...allNodes.map(n => _adj[n.id]?.size || 0))
const _nodeMap = Object.fromEntries(allNodes.map(n => ({
  ...n,
  degree: _adj[n.id]?.size || 0,
  prom:   Math.sqrt(_adj[n.id]?.size || 0) / Math.sqrt(_maxDeg),
})).map(n => [n.id, n]))

const GOLD = '#cdb88a'

/* ── holographic sigil ───────────────────────────────────────────────────
   Rotating 3D constellation projected above an emitter dais, shown in the
   figure's place when a node has no portrait. The hero star sits at the axis;
   its top neighbors orbit on a slowly spinning ring with varying heights,
   perspective-projected and depth-sorted each frame.
   Follows the SkyGraph pattern: the SVG DOM is owned imperatively inside a
   single effect (rAF loop) — React never re-renders per frame. */
function HoloSigil({ node, catColor }) {
  const layerRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    const NS = 'http://www.w3.org/2000/svg'
    const cx = 160, cy = 104, F = 340
    const near = [...(_adj[node.id] || [])].map(id => _nodeMap[id]).filter(Boolean)
      .sort((a, b) => b.degree - a.degree).slice(0, 10)

    const mk = (tag, attrs) => {
      const el = document.createElementNS(NS, tag)
      for (const k in attrs) el.setAttribute(k, attrs[k])
      return el
    }

    const stars = near.map((m, i) => {
      const col  = CAT[m.category] || '#888'
      const g    = mk('g', {})
      const line = mk('line', { stroke: col, 'stroke-dasharray': '1 5' })
      const halo = mk('circle', { fill: col })
      const dot  = mk('circle', { fill: '#ece6d6' })
      const ring = mk('circle', { fill: 'none', stroke: col })
      g.append(line, halo, dot, ring)
      layer.appendChild(g)
      return {
        g, line, halo, dot, ring, prom: m.prom,
        ang: (Math.PI * 2 / near.length) * i,
        R: 62 + (i % 3) * 11,        // orbit radius — three interleaved shells
        h: -34 + (i % 5) * 15,       // orbit height above/below the hero
      }
    })

    const cr = 5 + node.prom * 5.5
    const heroG    = mk('g', {})
    const heroGlow = mk('circle', { cx, cy, fill: catColor })
    const heroCore = mk('circle', { cx, cy, fill: '#f3eede' })
    const heroGold = mk('circle', { cx, cy, fill: 'none', stroke: GOLD, 'stroke-width': 1.1, opacity: 0.9 })
    const heroCat  = mk('circle', { cx, cy, fill: 'none', stroke: catColor, 'stroke-width': 0.5, opacity: 0.35 })
    heroG.append(heroGlow, heroCore, heroGold, heroCat)
    layer.appendChild(heroG)

    let raf
    const t0 = performance.now()
    const frame = now => {
      const t = (now - t0) / 1000
      const spin = t * 0.4
      const order = [{ z: 0, el: heroG }]

      stars.forEach(s => {
        const a  = s.ang + spin
        const z3 = Math.sin(a) * s.R
        const k  = F / (F + z3)                 // perspective scale
        const x  = cx + Math.cos(a) * s.R * k
        const y  = cy + (s.h + Math.sin(t * 0.9 + s.ang * 3) * 3) * k
        const front = (1 - z3 / s.R) / 2        // 0 = far side, 1 = near side
        const r = (1.9 + s.prom * 2.9) * k
        s.line.setAttribute('x1', cx); s.line.setAttribute('y1', cy)
        s.line.setAttribute('x2', x.toFixed(1)); s.line.setAttribute('y2', y.toFixed(1))
        s.line.setAttribute('stroke-width', (0.7 * k).toFixed(2))
        s.line.setAttribute('opacity', (0.12 + front * 0.3).toFixed(2))
        for (const el of [s.halo, s.dot, s.ring]) {
          el.setAttribute('cx', x.toFixed(1)); el.setAttribute('cy', y.toFixed(1))
        }
        s.halo.setAttribute('r', (r + 3).toFixed(1))
        s.halo.setAttribute('opacity', (0.05 + front * 0.12).toFixed(2))
        s.dot.setAttribute('r', r.toFixed(1))
        s.dot.setAttribute('opacity', (0.25 + front * (0.3 + s.prom * 0.4)).toFixed(2))
        s.ring.setAttribute('r', (r + 2).toFixed(1))
        s.ring.setAttribute('stroke-width', (0.8 * k).toFixed(2))
        s.ring.setAttribute('opacity', (0.12 + front * 0.35).toFixed(2))
        order.push({ z: z3, el: s.g })
      })

      const pulse = 1 + Math.sin(t * 1.6) * 0.05
      heroGlow.setAttribute('r', (cr * 2.6 * pulse).toFixed(1))
      heroGlow.setAttribute('opacity', (0.11 + Math.sin(t * 1.6) * 0.04).toFixed(2))
      heroCore.setAttribute('r', (cr * pulse).toFixed(1))
      heroGold.setAttribute('r', (cr * pulse + 2.4).toFixed(1))
      heroCat.setAttribute('r', (cr * pulse + 6).toFixed(1))

      order.sort((a, b) => b.z - a.z).forEach(o => layer.appendChild(o.el))  // paint far → near
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
      layer.replaceChildren()
    }
  }, [node.id])

  const bgId   = `holo-bg-${node.id}`
  const coneId = `holo-cone-${node.id}`
  return (
    <svg viewBox="0 0 320 224" style={{ width:'100%', height:'auto', display:'block' }}
      preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id={bgId} cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor={catColor} stopOpacity="0.12"/>
          <stop offset="100%" stopColor={catColor} stopOpacity="0"/>
        </radialGradient>
        <linearGradient id={coneId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={catColor} stopOpacity="0.2"/>
          <stop offset="55%" stopColor={catColor} stopOpacity="0.06"/>
          <stop offset="100%" stopColor={catColor} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="104" rx="150" ry="96" fill={`url(#${bgId})`}/>
      {/* projection cone rising from the emitter */}
      <path d="M 134 196 L 68 30 L 252 30 L 186 196 Z" fill={`url(#${coneId})`}/>
      {/* emitter dais */}
      <ellipse className="holo-ring" cx="160" cy="196" rx="64" ry="13" fill="none"
        stroke={catColor} strokeWidth="0.8" opacity="0.45" strokeDasharray="3 6"/>
      <ellipse cx="160" cy="196" rx="42" ry="8.5" fill="none" stroke={GOLD} strokeWidth="0.7" opacity="0.3"/>
      <ellipse cx="160" cy="196" rx="26" ry="5.5" fill={catColor} opacity="0.13"/>
      <ellipse cx="160" cy="196" rx="13" ry="3.2" fill={catColor} opacity="0.5"/>
      <g ref={layerRef}/>
    </svg>
  )
}

/* ── portrait image with fallback chain ──────────────────────────────── */
function Portrait({ nodeId, onLoaded }) {
  const chain = portraitSources(nodeId, true)
  const [idx, setIdx] = useState(0)
  const [gone, setGone] = useState(false)
  if (gone || idx >= chain.length) return null
  return (
    <img
      key={chain[idx]}
      className="col-figure-img"
      src={chain[idx]}
      alt=""
      /* report the art's own ratio so the figure box can take its shape — see
         .col-figure-in: the masks only dissolve the real edges if the box and
         the rendered image are the same rectangle */
      onLoad={e => onLoaded(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
      onError={() => idx + 1 < chain.length ? setIdx(idx + 1) : setGone(true)}
    />
  )
}

/* ── label → value row ───────────────────────────────────────────────────
   Same skeleton for every row — a Cinzel label on the left, dot-joined
   values on the right, truncated with the remainder spelled out ("+2 more")
   so the count reads as information, not decoration — but two registers, set
   by the group the row sits in (.col-rows-attr /
   .col-rows-nav in index.css). Attributes are italic, small and tight;
   navigation stands upright, larger, and underlines on hover, because those
   are the only lines you can press. Five identical italic rows read as a
   receipt — the split is the hierarchy. No chips, borders or bullets. */
function Row({ label, items, max = 4, emphasize, onPick, titleFor }) {
  if (!items?.length) return null
  const shown = items.slice(0, max)
  const rest  = items.length - shown.length
  return (
    <div className="col-row">
      <span className="col-row-k">{label}</span>
      <span className="col-row-v">
        {shown.map((it, i) => (
          <span key={it.key}>
            {i > 0 && <span className="col-sep">&nbsp;·&nbsp;</span>}
            {onPick
              ? <button className="col-link" title={titleFor?.(it)} onClick={() => onPick(it)}>{it.label}</button>
              : <span className={emphasize?.has(it.label) ? 'col-em' : undefined}>{it.label}</span>}
          </span>
        ))}
        {rest > 0 && (
          <>
            <span className="col-sep">&nbsp;·&nbsp;</span>
            <span className="col-more">+{rest} more</span>
          </>
        )}
      </span>
    </div>
  )
}

/* keyword arrays arrive as bare strings; the row wants { key, label } */
const words = list => (list || []).map(w => ({ key: w, label: w }))

/* the width one line of the display name can afford, in cqw against .col-type */
const nameCq = name =>
  `${(100 / (Math.max(...name.split(' ').map(w => w.length)) * 0.84)).toFixed(2)}cqw`

/* ── opening prose, held to the measure ──────────────────────────────────
   .col-prose caps at ~7 lines; the bottom fade only belongs on prose that
   actually overruns that, and whether it does depends on the live width of
   the column — a character count would be right at 384px and wrong at 200px.
   So measure it. Toggling .clamped only adds a mask, which changes no layout,
   so this can't feed back into the observer. */
function Prose({ text }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const sync = () => el.classList.toggle('clamped', el.scrollHeight > el.clientHeight + 2)
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => ro.disconnect()
  }, [text])
  return <p ref={ref} className="col-prose">{text}</p>
}

/* ════════════════════════════════════════════════════════════════════════
   DetailPanel
   ════════════════════════════════════════════════════════════════════════ */
export default function DetailPanel({ nodeId, onClose, onNavigate, onOpenOrbit, onOpenTale }) {
  const node = nodeId ? _nodeMap[nodeId] : null
  return (
    <aside className={`detail-panel ${node ? 'open' : ''}`}>
      {/* the wash and the plate are the panel's whole surface — the wash lets
          the star field bleed under the left edge instead of ending it on a rule */}
      <div className="col-wash"/>
      <div className="col-plate"/>
      {node && (
        <PanelContent
          key={node.id}
          node={node}
          onClose={onClose}
          onNavigate={onNavigate}
          onOpenOrbit={onOpenOrbit}
          onOpenTale={onOpenTale}
        />
      )}
    </aside>
  )
}

/* ── main panel body ─────────────────────────────────────────────────── */
function PanelContent({ node, onClose, onNavigate, onOpenOrbit, onOpenTale }) {
  const catCfg   = categoryConfig[node.category] || {}
  const catColor = CAT[node.category] || '#888'
  /* the portrait's own aspect ratio, once it has loaded — null while it hasn't,
     which is also what raises the HoloSigil fallback */
  const [ratio, setRatio] = useState(null)

  const story    = deityStories[node.id]
  const beats    = story?.beats
  /* a beat-based story only lends its opening to the measure — the whole tale
     lives in the Story Orbit overlay behind ENTER THE STORY */
  const canOrbit = !!(beats?.length && onOpenOrbit)
  const prose    = (canOrbit ? beats[0].text : story?.story || node.description) || ''
  const source   = canOrbit ? null : story?.source || null

  const bonds = [...(_adj[node.id] || [])]
    .map(id => _nodeMap[id]).filter(Boolean)
    .sort((a, b) => b.degree - a.degree)
    .map(m => ({ key: m.id, label: m.name, id: m.id }))
  const tales = ((onOpenTale && _talesByFig[node.id]) || [])
    .map(t => ({ key: t.id, label: t.title, ...t }))

  return (
    <>
      <div className="col-aura" style={{ '--holo': catColor }}/>

      {/* ── the figure — she takes the right two-thirds outright ──────
          Three nested elements because each can carry only one mask without
          mask-composite: the box fades head and feet, the veil fades left and
          right, the image itself carries the radial vignette. Together they
          take all four edges to zero. */}
      <div className="col-figure">
        <div className={`col-figure-in ${ratio ? 'ready' : ''}`}
          style={ratio ? { '--fig-ar': ratio.toFixed(4) } : undefined}>
          <div className="col-figure-veil">
            <Portrait nodeId={node.id} onLoaded={setRatio}/>
            {!ratio && (
              <div className="col-sigil">
                <HoloSigil node={node} catColor={catColor}/>
              </div>
            )}
          </div>
        </div>
      </div>

      <button className="col-close" onClick={onClose} aria-label="Close">✕</button>

      {/* ── the measure — one column, strict left margin ────────────── */}
      <div className="col-type">

        <div className="col-main panel-section" style={{ animationDelay:'.08s' }}>
          {/* the eyebrow's accent is GOLD like the rest of the panel's chrome —
              the family's coral/violet/etc. lives on the figure aura and the
              map, not orphaned on a single glyph here. The rule is the LAST
              child so it always runs to the measure's right edge — the same
              column boundary the CTA below shares. */}
          <div className="col-eyebrow">
            <span style={{ color:GOLD, fontSize:9, lineHeight:1 }}>✦</span>
            <span style={{
              fontFamily:'Cinzel, serif', fontSize:9, letterSpacing:'.34em',
              color:'#a2916a', whiteSpace:'nowrap',
            }}>
              {(catCfg.label || node.category).toUpperCase()}
            </span>
            {node.roman_equivalent && (
              <span style={{
                fontFamily:"'EB Garamond', Georgia, serif", fontStyle:'italic',
                fontSize:12.5, color:'#6b7486', whiteSpace:'nowrap',
              }}>
                ≡ {node.roman_equivalent}
              </span>
            )}
            <span className="col-eyebrow-rule"/>
          </div>

          {/* Cinzel renders lowercase as small caps and runs ~0.71em per glyph
              with the .03em tracking, so the display size has to fall out of the
              name against the measure — at the design's 96px "Persephone" is
              four columns wide. Size off the longest *word*, not the whole
              string: "Colchian Dragon" wraps at the space and only has to fit
              eight glyphs on a line. 0.84 leaves headroom for wide-letter names
              (Mnemosyne) over the measured average. cqw resolves against
              .col-type, so this stays right at every panel width. */}
          <h2 className="col-name" style={{ '--name-cq': nameCq(node.name) }}>
            {node.name}
          </h2>
          {node.epithet && <p className="col-epithet">{node.epithet}</p>}

          {prose && <Prose text={prose}/>}
          {source && <p className="col-source">— {source}</p>}
        </div>

        <div className="col-foot panel-section" style={{ animationDelay:'.22s' }}>
          {/* two registers, not five equal lines: what she *is* sits quiet and
              tight, what she *opens* stands upright and underlines on hover.
              Myths belongs to the first group despite reading as titles — a
              myth name is a keyword with nothing behind it to click. */}
          <div className="col-rows">
            <div className="col-rows-attr">
              <Row label="Domains" items={words(node.domains)}/>
              <Row label="Symbols" items={words(node.symbols)}/>
              <Row label="Myths"   items={words(node.notable_myths)} max={3} emphasize={_famousMyths}/>
            </div>
            <div className="col-rows-nav">
              <Row
                label="Bonds" items={bonds} max={3}
                onPick={onNavigate ? b => onNavigate(b.id) : undefined}
                titleFor={b => `Fly to ${b.label}`}
              />
              <Row
                label="Tales" items={tales} max={2}
                onPick={t => onOpenTale(t.id, t.beat)}
                titleFor={t => `Open “${t.title}” at chapter ${t.beat + 1} of ${t.total}`}
              />
            </div>
          </div>

          {/* the panel's primary action — a real, bordered hit area (not a
              caption), spanning the full measure so its right border lands on
              the same column boundary as the eyebrow rule above it */}
          {canOrbit && (
            <button className="col-enter" onClick={onOpenOrbit}>
              <span style={{ color:GOLD, fontSize:11 }}>✦</span>
              <span style={{
                fontFamily:'Cinzel, serif', fontSize:11.5, letterSpacing:'.28em',
                color:GOLD, whiteSpace:'nowrap',
              }}>
                ENTER THE STORY
              </span>
              <span className="col-enter-rule"/>
              <span style={{
                fontFamily:'Cinzel, serif', fontSize:9.5, letterSpacing:'.2em',
                color:'#8c7d59', whiteSpace:'nowrap',
              }}>
                {beats.length} CHAPTERS
              </span>
            </button>
          )}
        </div>

      </div>
    </>
  )
}
