import { useEffect, useRef, useState, useMemo } from 'react'
import { nodes, links } from '../data/mythology'
import { categoryConfig } from '../data/categoryConfig'
import { archetypeMap } from '../data/archetypeMap'
import { getConnectedNodes } from '../utils/graphHelpers'
import { getHeadImageUrl, getFullImageUrl } from '../hooks/usePortraitLoader'

// ── Shared primitives ────────────────────────────────────────────────────────

const HR = () => (
  <div style={{ borderTop: '1px solid #1e2a3a', margin: '12px 0' }} />
)

const SectionLabel = ({ children }) => (
  <div style={{
    fontFamily:    'Cinzel, serif',
    fontSize:       10,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color:          '#7b8494',
    marginBottom:   6,
  }}>
    {children}
  </div>
)

// ── Lazy full-body image panel ───────────────────────────────────────────────
// Keyed by nodeId in the parent so it remounts on every modal navigation,
// resetting load state without any useEffect cleanup dance.

function ImagePanel({ node, headLoaded }) {
  const [phase, setPhase]     = useState('loading') // loading | loaded | head | empty
  const fullUrl = getFullImageUrl(node)
  const headUrl = headLoaded?.has(node.id) ? getHeadImageUrl(node) : null

  const onFullLoad  = () => setPhase('loaded')
  const onFullError = () => setPhase(headUrl ? 'head' : 'empty')
  const onHeadLoad  = () => setPhase('loaded')
  const onHeadError = () => setPhase('empty')

  return (
    <div className="deity-modal-image">
      {/* Skeleton while loading */}
      {phase === 'loading' && <div className="image-skeleton" />}

      {/* Full-body image */}
      {(phase === 'loading' || phase === 'loaded') && (
        <img
          src={fullUrl}
          alt={node.name}
          onLoad={onFullLoad}
          onError={onFullError}
          style={{
            position:   'absolute',
            inset:       0,
            width:      '100%',
            height:     '100%',
            objectFit:  'contain',
            display:    phase === 'loaded' ? 'block' : 'none',
          }}
        />
      )}

      {/* Fallback: head image */}
      {phase === 'head' && headUrl && (
        <img
          src={headUrl}
          alt={node.name}
          onLoad={onHeadLoad}
          onError={onHeadError}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain' }}
        />
      )}

      {/* No-image: category dot */}
      {phase === 'empty' && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{
            width:        80,
            height:       80,
            borderRadius: '50%',
            background:   categoryConfig[node.category]?.fill ?? '#111',
            border:      `2px solid ${categoryConfig[node.category]?.stroke ?? '#444'}`,
          }} />
        </div>
      )}
    </div>
  )
}

// ── Midjourney prompt section ────────────────────────────────────────────────

function PromptSection({ prompt }) {
  const [open,   setOpen]   = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(prompt).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display:       'flex',
          alignItems:    'center',
          gap:            6,
          fontFamily:    'Cinzel, serif',
          fontSize:       10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:          '#7b8494',
          background:    'none',
          border:        'none',
          cursor:        'pointer',
          padding:        0,
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#9ca3af'}
        onMouseLeave={e => e.currentTarget.style.color = '#7b8494'}
      >
        {open ? '▾' : '▸'} Midjourney Prompt
      </button>

      {open && (
        <div style={{ marginTop: 10 }}>
          <p style={{
            fontFamily: '"DM Mono", "Fira Code", monospace',
            fontSize:    11,
            color:       '#6b7280',
            lineHeight:  1.65,
            marginBottom: 10,
            wordBreak:   'break-word',
          }}>
            {prompt}
          </p>
          <button
            onClick={copy}
            style={{
              fontFamily:    'Cinzel, serif',
              fontSize:       9,
              letterSpacing: '0.12em',
              color:          copied ? '#4ade80' : '#c9a84c',
              background:    'none',
              border:        `1px solid ${copied ? '#4ade8044' : '#c9a84c44'}`,
              padding:       '4px 12px',
              cursor:        'pointer',
            }}
          >
            {copied ? '✓ Copied' : 'Copy prompt'}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Relationship group display ────────────────────────────────────────────────

const REL_GROUPS = [
  { key: 'parent_of',      icon: '↑', label: 'Parent of' },
  { key: 'born_from',      icon: '↓', label: 'Born from' },
  { key: 'lover_of',       icon: '♡', label: 'Lover of' },
  { key: 'enemy_of',       icon: '✕', label: 'Enemy of' },
  { key: 'transformed_by', icon: '⟳', label: 'Transformed by' },
  { key: 'cursed_by',      icon: '⚡', label: 'Cursed by' },
  { key: 'transforms',     icon: '↪', label: 'Transforms' },
  { key: 'curses',         icon: '⚡', label: 'Curses' },
  { key: 'created_by',     icon: '✦', label: 'Created by' },
  { key: 'merged_with',    icon: '⊕', label: 'Merged with' },
]

function RelGroup({ icon, label, entries, onNavigate }) {
  if (!entries?.length) return null
  return (
    <div style={{ marginBottom: 8 }}>
      <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.1em', color: '#6b7280' }}>
        {icon} {label}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
        {entries.map(({ node }) => (
          <button
            key={node.id}
            onClick={() => onNavigate(node.id)}
            style={{
              fontFamily:    'Cinzel, serif',
              fontSize:       11,
              color:          '#c9a84c',
              background:    '#c9a84c11',
              border:        '1px solid #c9a84c44',
              padding:       '2px 8px',
              cursor:        'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#c9a84c22'}
            onMouseLeave={e => e.currentTarget.style.background = '#c9a84c11'}
          >
            {node.name}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main modal ────────────────────────────────────────────────────────────────

export default function DeityModal({
  nodeId,
  backStack,
  headLoaded,
  onClose,
  onNavigate,
  onBack,
}) {
  const node      = useMemo(() => nodes.find(n => n.id === nodeId) ?? null, [nodeId])
  const connected = useMemo(() => node ? getConnectedNodes(node.id, nodes, links) : null, [node])
  const cat       = node ? (categoryConfig[node.category] ?? {}) : {}

  const modalRef   = useRef(null)
  const headingRef = useRef(null)

  // Save and restore focus across open/close
  useEffect(() => {
    const prev = document.activeElement
    return () => prev?.focus()
  }, [])

  // Move focus to heading on open and on every navigation
  useEffect(() => {
    // Defer one tick so the new content is rendered
    const id = requestAnimationFrame(() => headingRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [nodeId])

  // Escape + Tab focus trap
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusable = Array.from(
        modalRef.current.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last  = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!node) return null

  const accent = cat.stroke ?? '#c9a84c'

  return (
    /* ── Backdrop ─────────────────────────────────────────────────────────── */
    <div
      onClick={onClose}
      style={{
        position:       'fixed',
        inset:           0,
        zIndex:          900,
        background:     'rgba(5,8,15,0.9)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '16px',
      }}
    >
      {/* ── Dialog ─────────────────────────────────────────────────────────── */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-deity-name"
        onClick={e => e.stopPropagation()}
        style={{
          width:      '100%',
          maxWidth:    960,
          maxHeight:  '85vh',
          background: '#0d111c',
          border:    `1px solid ${accent}55`,
          boxShadow: `0 0 60px ${accent}18, 0 8px 80px rgba(0,0,0,0.7)`,
          display:    'flex',
          flexDirection: 'column',
          overflow:   'hidden',
        }}
      >
        {/* ── Top bar ──────────────────────────────────────────────────────── */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '8px 14px',
          borderBottom:   '1px solid #1e2a3a',
          flexShrink:      0,
          gap:             8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {backStack.length > 0 && (
              <button
                onClick={onBack}
                style={{
                  fontFamily:    'Cinzel, serif',
                  fontSize:       10,
                  letterSpacing: '0.1em',
                  color:          '#9ca3af',
                  background:    'none',
                  border:        '1px solid #1e2a3a',
                  padding:       '3px 10px',
                  cursor:        'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
              >
                ← Back
              </button>
            )}
            {/* Breadcrumb trail (last 2 entries) */}
            {backStack.length > 0 && (
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, color: '#7b8494', letterSpacing: '0.08em' }}>
                {backStack.slice(-2).map(id => {
                  const n = nodes.find(x => x.id === id)
                  return n?.name ?? id
                }).join(' › ')} ›
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              fontFamily:     'serif',
              fontSize:        18,
              color:          '#6b7280',
              background:    'none',
              border:        '1px solid #1e2a3a',
              width:          32,
              height:         32,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              cursor:         'pointer',
              flexShrink:      0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >
            ✕
          </button>
        </div>

        {/* ── Body: image left + info right ────────────────────────────────── */}
        <div className="deity-modal-body">

          {/* Left: full-body image — keyed so it remounts on navigation */}
          <ImagePanel key={nodeId} node={node} headLoaded={headLoaded} />

          {/* Right: scrollable info */}
          <div className="deity-modal-info detail-scroll">

            {/* Category badge + Roman equivalent */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{
                fontFamily:    'Cinzel, serif',
                fontSize:       10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:          accent,
                border:        `1px solid ${accent}`,
                background:    `${accent}11`,
                padding:       '2px 8px',
              }}>
                {cat.label ?? node.category}
              </span>
              {node.roman_equivalent && (
                <span style={{ fontFamily: '"Crimson Pro", Georgia, serif', fontStyle: 'italic', fontSize: 11, color: '#7b8494' }}>
                  Roman: <span style={{ color: '#9ca3af' }}>{node.roman_equivalent}</span>
                </span>
              )}
            </div>

            {/* Name */}
            <h2
              id="modal-deity-name"
              ref={headingRef}
              tabIndex={-1}
              style={{
                fontFamily:    'Cinzel, serif',
                fontWeight:     700,
                fontSize:       22,
                color:          '#e2e8f0',
                letterSpacing: '0.06em',
                lineHeight:     1.2,
                margin:         0,
                outline:       'none',
              }}
            >
              {node.name}
            </h2>

            {/* Epithet */}
            <div style={{
              fontFamily: '"Crimson Pro", Georgia, serif',
              fontStyle:  'italic',
              fontSize:    14,
              color:       '#6b7280',
              marginTop:   4,
              marginBottom: 14,
            }}>
              {node.epithet}
            </div>

            <HR />

            {/* Origins */}
            <SectionLabel>Origins</SectionLabel>
            <p style={{ fontFamily: '"Crimson Pro", Georgia, serif', fontStyle: 'italic', fontSize: 13, color: '#9ca3af', lineHeight: 1.65, marginBottom: 12 }}>
              {node.origins}
            </p>

            <HR />

            {/* Description */}
            <p style={{ fontFamily: '"Crimson Pro", Georgia, serif', fontSize: 14, color: '#cbd5e1', lineHeight: 1.75, marginBottom: 12 }}>
              {node.description}
            </p>

            <HR />

            {/* Compact meta row */}
            {node.domains?.length > 0 && (
              <div style={{ marginBottom: 6 }}>
                <SectionLabel>Domains</SectionLabel>
                <p style={{ fontFamily: '"Crimson Pro", Georgia, serif', fontSize: 13, color: '#9ca3af', margin: 0 }}>
                  {node.domains.join(' · ')}
                </p>
              </div>
            )}

            {node.jungian_archetype && (
              <div style={{ marginBottom: 6 }}>
                <SectionLabel>Jungian Archetype</SectionLabel>
                <p style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize:    12,
                  color:       archetypeMap[node.jungian_archetype]?.color ?? '#9ca3af',
                  margin:      0,
                }}>
                  {node.jungian_archetype}
                </p>
              </div>
            )}

            {node.symbols?.length > 0 && (
              <div style={{ marginBottom: 6 }}>
                <SectionLabel>Symbols</SectionLabel>
                <p style={{ fontFamily: '"Crimson Pro", Georgia, serif', fontSize: 13, color: '#9ca3af', margin: 0 }}>
                  {node.symbols.join(' · ')}
                </p>
              </div>
            )}

            <HR />

            {/* Connected To */}
            {connected && (
              <div style={{ marginBottom: 4 }}>
                <SectionLabel>Connected To</SectionLabel>
                {REL_GROUPS.map(g => (
                  <RelGroup
                    key={g.key}
                    icon={g.icon}
                    label={g.label}
                    entries={connected[g.key]}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            )}

            {/* Notable Myths */}
            {node.notable_myths?.length > 0 && (
              <>
                <HR />
                <SectionLabel>Notable Myths</SectionLabel>
                <p style={{ fontFamily: '"Crimson Pro", Georgia, serif', fontStyle: 'italic', fontSize: 13, color: '#6b7280', margin: 0 }}>
                  {node.notable_myths.join(' · ')}
                </p>
              </>
            )}

            {/* Midjourney Prompt */}
            {node.image_prompt && (
              <>
                <HR />
                <PromptSection prompt={node.image_prompt} />
              </>
            )}

            {/* Bottom padding */}
            <div style={{ height: 24 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
