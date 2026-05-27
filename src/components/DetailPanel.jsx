import { useMemo } from 'react'
import { nodes } from '../data/mythology'
import { categoryConfig } from '../data/categoryConfig'
import { archetypeMap } from '../data/archetypeMap'
import { getConnectedNodes } from '../utils/graphHelpers'
import { links } from '../data/mythology'

// ─── helpers ──────────────────────────────────────────────────────────────────
const HR = () => (
  <div style={{ borderTop: '1px solid #1e2a3a', margin: '10px 0' }} />
)

const SectionLabel = ({ children }) => (
  <div
    className="text-[9px] uppercase tracking-[0.2em] mb-1"
    style={{ color: '#4b5563', fontFamily: 'Cinzel, serif' }}
  >
    {children}
  </div>
)

const ConnectedGroup = ({ icon, label, entries, onNodeSelect }) => {
  if (!entries?.length) return null
  return (
    <div className="mb-2">
      <span
        className="text-[10px] uppercase tracking-wider"
        style={{ color: '#6b7280', fontFamily: 'Cinzel, serif' }}
      >
        {icon} {label}
      </span>
      <div className="flex flex-wrap gap-1 mt-1">
        {entries.map(({ node }) => (
          <button
            key={node.id}
            onClick={() => onNodeSelect(node.id)}
            className="text-xs px-2 py-0.5 transition-colors"
            style={{
              fontFamily:  'Cinzel, serif',
              fontSize:    11,
              color:       '#c9a84c',
              background:  '#c9a84c11',
              border:      '1px solid #c9a84c44',
              cursor:      'pointer',
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

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  const randomNode = useMemo(() => {
    const pool = nodes.filter(n => n.description)
    return pool[Math.floor(Math.random() * pool.length)]
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div
        style={{
          fontFamily:    'Cinzel, serif',
          fontSize:      28,
          letterSpacing: '0.2em',
          color:         '#c9a84c22',
          lineHeight:    1,
          marginBottom:  20,
        }}
      >
        ✦
      </div>
      <p
        style={{
          fontFamily: '"Crimson Pro", Georgia, serif',
          fontStyle:  'italic',
          fontSize:   14,
          color:      '#4b5563',
          lineHeight: 1.6,
        }}
      >
        Click any node to explore its myth
      </p>
      {randomNode && (
        <div className="mt-8 w-full text-left" style={{ borderTop: '1px solid #1e2a3a', paddingTop: 16 }}>
          <div
            className="text-[9px] uppercase tracking-[0.2em] mb-2"
            style={{ color: '#4b5563', fontFamily: 'Cinzel, serif' }}
          >
            Myth of the Day
          </div>
          <div
            style={{ fontFamily: 'Cinzel, serif', fontSize: 13, color: '#6b7280' }}
          >
            {randomNode.name}
          </div>
          <div
            style={{
              fontFamily: '"Crimson Pro", Georgia, serif',
              fontStyle:  'italic',
              fontSize:   12,
              color:      '#374151',
              marginTop:   4,
            }}
          >
            {randomNode.epithet}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────────────
export default function DetailPanel({ selectedNodeId, onNodeSelect }) {
  const node = useMemo(
    () => nodes.find(n => n.id === selectedNodeId) ?? null,
    [selectedNodeId]
  )

  const connected = useMemo(
    () => node ? getConnectedNodes(node.id, nodes, links) : null,
    [node]
  )

  const cat = node ? (categoryConfig[node.category] ?? {}) : {}

  return (
    <div
      className="detail-scroll flex flex-col"
      style={{
        background:   '#0d111c',
        borderLeft:   '1px solid #1e2a3a',
        overflowY:    'auto',
        overflowX:    'hidden',
        height:       '100%',
      }}
    >
      {!node ? (
        <EmptyState />
      ) : (
        <div className="p-5">

          {/* Category + Roman equivalent */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] uppercase tracking-widest px-2 py-0.5"
              style={{
                fontFamily: 'Cinzel, serif',
                color:      cat.stroke ?? '#6b7280',
                border:     `1px solid ${cat.stroke ?? '#1e2a3a'}`,
                background: `${cat.stroke ?? '#6b7280'}11`,
              }}
            >
              {cat.label ?? node.category}
            </span>
            {node.roman_equivalent && (
              <span
                className="text-[10px]"
                style={{ color: '#4b5563', fontFamily: '"Crimson Pro", Georgia, serif', fontStyle: 'italic' }}
              >
                Roman: <span style={{ color: '#6b7280' }}>{node.roman_equivalent}</span>
              </span>
            )}
          </div>

          {/* Name */}
          <h2
            style={{
              fontFamily:    'Cinzel, serif',
              fontWeight:     700,
              fontSize:       20,
              color:          '#e2e8f0',
              letterSpacing:  '0.05em',
              lineHeight:      1.2,
              marginBottom:    2,
            }}
          >
            {node.name}
          </h2>

          {/* Epithet */}
          <div
            style={{
              fontFamily: '"Crimson Pro", Georgia, serif',
              fontStyle:  'italic',
              fontSize:    14,
              color:       '#6b7280',
              marginBottom: 12,
            }}
          >
            {node.epithet}
          </div>

          <HR />

          {/* Origins */}
          <SectionLabel>Origins</SectionLabel>
          <p
            style={{
              fontFamily: '"Crimson Pro", Georgia, serif',
              fontStyle:  'italic',
              fontSize:    13,
              color:       '#9ca3af',
              lineHeight:  1.6,
              marginBottom: 10,
            }}
          >
            {node.origins}
          </p>

          <HR />

          {/* Description */}
          <p
            style={{
              fontFamily: '"Crimson Pro", Georgia, serif',
              fontSize:    14,
              color:       '#cbd5e1',
              lineHeight:  1.7,
              marginBottom: 12,
            }}
          >
            {node.description}
          </p>

          <HR />

          {/* Domains */}
          {node.domains?.length > 0 && (
            <div className="mb-2">
              <SectionLabel>Domains</SectionLabel>
              <p style={{ fontFamily: '"Crimson Pro", Georgia, serif', fontSize: 13, color: '#9ca3af' }}>
                {node.domains.join(' · ')}
              </p>
            </div>
          )}

          {/* Archetype */}
          {node.jungian_archetype && (
            <div className="mb-2">
              <SectionLabel>Jungian Archetype</SectionLabel>
              <p
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize:    12,
                  color:       archetypeMap[node.jungian_archetype]?.color ?? '#9ca3af',
                }}
              >
                {node.jungian_archetype}
              </p>
            </div>
          )}

          {/* Symbols */}
          {node.symbols?.length > 0 && (
            <div className="mb-2">
              <SectionLabel>Symbols</SectionLabel>
              <p style={{ fontFamily: '"Crimson Pro", Georgia, serif', fontSize: 13, color: '#9ca3af' }}>
                {node.symbols.join(' · ')}
              </p>
            </div>
          )}

          <HR />

          {/* Connected To */}
          {connected && (
            <div className="mb-2">
              <SectionLabel>Connected To</SectionLabel>
              <ConnectedGroup icon="↑" label="Parent of"       entries={connected.parent_of}      onNodeSelect={onNodeSelect} />
              <ConnectedGroup icon="↓" label="Born from"       entries={connected.born_from}      onNodeSelect={onNodeSelect} />
              <ConnectedGroup icon="♡" label="Lover of"        entries={connected.lover_of}       onNodeSelect={onNodeSelect} />
              <ConnectedGroup icon="✕" label="Enemy of"        entries={connected.enemy_of}       onNodeSelect={onNodeSelect} />
              <ConnectedGroup icon="⟳" label="Transformed by"  entries={connected.transformed_by} onNodeSelect={onNodeSelect} />
              <ConnectedGroup icon="⚡" label="Cursed by"       entries={connected.cursed_by}      onNodeSelect={onNodeSelect} />
              <ConnectedGroup icon="↪" label="Transforms"      entries={connected.transforms}     onNodeSelect={onNodeSelect} />
              <ConnectedGroup icon="⚡" label="Curses"          entries={connected.curses}         onNodeSelect={onNodeSelect} />
              <ConnectedGroup icon="✦" label="Created by"      entries={connected.created_by}     onNodeSelect={onNodeSelect} />
              <ConnectedGroup icon="⊕" label="Merged with"     entries={connected.merged_with}    onNodeSelect={onNodeSelect} />
            </div>
          )}

          {/* Notable Myths */}
          {node.notable_myths?.length > 0 && (
            <>
              <HR />
              <SectionLabel>Notable Myths</SectionLabel>
              <p style={{ fontFamily: '"Crimson Pro", Georgia, serif', fontStyle: 'italic', fontSize: 13, color: '#6b7280' }}>
                {node.notable_myths.join(' · ')}
              </p>
            </>
          )}

        </div>
      )}
    </div>
  )
}
