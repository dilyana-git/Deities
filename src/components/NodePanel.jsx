import { useMemo, useState } from 'react'
import { nodes as allNodes, links as allLinks } from '../data/mythology.js'
import { categoryConfig } from '../data/categoryConfig.js'
import { linkTypeConfig } from '../data/linkTypeConfig.js'
import { archetypeMap } from '../data/archetypeMap.js'

const nodeMap = Object.fromEntries(allNodes.map(n => [n.id, n]))

export default function NodePanel({ nodeId, onClose, onNavigate, activeCategories, activeLinkTypes }) {
  const node = nodeMap[nodeId]

  // Collect connected nodes from visible links
  const connections = useMemo(() => {
    if (!node) return []
    const results = []
    allLinks.forEach(l => {
      const srcId = typeof l.source === 'object' ? l.source.id : l.source
      const tgtId = typeof l.target === 'object' ? l.target.id : l.target

      if (!activeLinkTypes.has(l.type)) return

      if (srcId === nodeId && nodeMap[tgtId] && activeCategories.has(nodeMap[tgtId].category)) {
        results.push({ node: nodeMap[tgtId], type: l.type, label: l.label, direction: 'outgoing' })
      } else if (tgtId === nodeId && nodeMap[srcId] && activeCategories.has(nodeMap[srcId].category)) {
        results.push({ node: nodeMap[srcId], type: l.type, label: l.label, direction: 'incoming' })
      }
    })
    // Deduplicate by other-node-id + type
    const seen = new Set()
    return results.filter(c => {
      const key = `${c.node.id}:${c.type}:${c.direction}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [nodeId, activeCategories, activeLinkTypes, node])

  if (!node) return null

  const catCfg       = categoryConfig[node.category] || {}
  const archetype    = archetypeMap[node.jungian_archetype]
  const archetypeClr = archetype?.color || '#94a3b8'

  return (
    <div className="text-sm">

      {/* Full portrait */}
      <PortraitImage key={nodeId} nodeId={nodeId} accentColor={catCfg.stroke} />

      {/* Header */}
      <div
        className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-[#1e2a3a]"
        style={{ borderLeftColor: catCfg.stroke, borderLeftWidth: 3 }}
      >
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[9px] font-cinzel tracking-widest px-1.5 py-0.5 rounded border"
              style={{ color: catCfg.stroke, borderColor: catCfg.stroke, background: catCfg.fill }}
            >
              {catCfg.label?.toUpperCase()}
            </span>
            {node.roman_equivalent && (
              <span className="text-[9px] text-[#4a5568] italic font-crimson">
                ≡ {node.roman_equivalent}
              </span>
            )}
          </div>
          <h2 className="font-cinzel text-[#e2e8f0] text-base leading-tight">
            {node.name}
          </h2>
          <p className="text-[#64748b] text-xs font-crimson italic leading-tight mt-0.5">
            {node.epithet}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-[#4a5568] hover:text-[#94a3b8] transition-colors text-lg leading-none mt-0.5 flex-shrink-0"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Scrollable body */}
      <div className="px-4 py-3 space-y-4">

        {/* Archetype */}
        {node.jungian_archetype && (
          <div>
            <Label>Jungian Archetype</Label>
            <div className="flex items-start gap-2 mt-1">
              <span
                className="text-[10px] font-cinzel tracking-wider px-2 py-0.5 rounded-full border mt-0.5 flex-shrink-0"
                style={{ color: archetypeClr, borderColor: archetypeClr + '66' }}
              >
                {node.jungian_archetype}
              </span>
              {archetype && (
                <p className="text-[#64748b] text-xs font-crimson italic leading-snug">
                  {archetype.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <Label>Description</Label>
          <p className="text-[#94a3b8] font-crimson text-sm leading-relaxed mt-1">
            {node.description}
          </p>
        </div>

        {/* Origins */}
        {node.origins && (
          <div>
            <Label>Origins</Label>
            <p className="text-[#94a3b8] font-crimson text-sm leading-relaxed mt-1">
              {node.origins}
            </p>
          </div>
        )}

        {/* Domains */}
        {node.domains?.length > 0 && (
          <div>
            <Label>Domains</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {node.domains.map(d => (
                <span
                  key={d}
                  className="text-[10px] px-1.5 py-0.5 rounded border border-[#1e2a3a] text-[#64748b] font-crimson italic"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notable myths */}
        {node.notable_myths?.length > 0 && (
          <div>
            <Label>Myths</Label>
            <ul className="mt-1 space-y-0.5">
              {node.notable_myths.map(m => (
                <li key={m} className="text-[#64748b] text-xs font-crimson flex items-start gap-1.5">
                  <span className="text-[#3e4d60] mt-1 flex-shrink-0">◆</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Symbols */}
        {node.symbols?.length > 0 && (
          <div>
            <Label>Symbols</Label>
            <p className="text-[#4a5568] font-crimson text-xs italic mt-1">
              {node.symbols.join(' · ')}
            </p>
          </div>
        )}

        {/* Connections */}
        {connections.length > 0 && (
          <div>
            <Label>Connections ({connections.length})</Label>
            <ul className="mt-1 space-y-1">
              {connections.map((c, i) => {
                const linkCfg = linkTypeConfig[c.type] || {}
                const otherCat = categoryConfig[c.node.category] || {}
                return (
                  <li key={i}>
                    <button
                      onClick={() => onNavigate(c.node.id)}
                      className="w-full text-left flex items-start gap-2 px-2 py-1 rounded hover:bg-[#0d111c] transition-colors group"
                    >
                      {/* Link-type stripe */}
                      <span
                        className="w-0.5 self-stretch rounded mt-0.5 flex-shrink-0"
                        style={{ background: linkCfg.stroke || '#555' }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className="text-[10px] font-cinzel tracking-wider"
                            style={{ color: linkCfg.stroke || '#555' }}
                          >
                            {linkCfg.label}
                          </span>
                          <span
                            className="font-cinzel text-xs group-hover:text-white transition-colors truncate"
                            style={{ color: otherCat.stroke || '#94a3b8' }}
                          >
                            {c.node.name}
                          </span>
                        </div>
                        {c.label && (
                          <p className="text-[10px] text-[#3e4d60] font-crimson italic leading-tight truncate">
                            {c.label}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function Label({ children }) {
  return (
    <p className="text-[9px] font-cinzel tracking-widest text-[#3e4d60] uppercase">
      {children}
    </p>
  )
}

function PortraitImage({ nodeId, accentColor }) {
  const candidates = [
    `/portraits/${nodeId}-full.webp`,
    `/portraits/${nodeId}-full.png`,
    `/portraits/${nodeId}.webp`,
    `/portraits/${nodeId}.png`,
    `/portraits/${nodeId}-head.webp`,
    `/portraits/${nodeId}-head.png`,
  ]
  const [idx, setIdx] = useState(0)
  const [gone, setGone]  = useState(false)

  if (gone || idx >= candidates.length) return null

  return (
    <div className="w-full flex-shrink-0 relative" style={{ maxHeight: '260px', overflow: 'hidden' }}>
      <img
        src={candidates[idx]}
        alt=""
        onError={() => {
          if (idx + 1 < candidates.length) setIdx(idx + 1)
          else setGone(true)
        }}
        className="w-full object-cover object-top block"
        style={{ maxHeight: '260px' }}
      />
      {/* Category-coloured gradient at the bottom so it blends into the header */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, #08090f)` }}
      />
    </div>
  )
}
