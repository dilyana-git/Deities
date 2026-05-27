import { categoryConfig } from '../data/categoryConfig'

export default function NodeTooltip({ node, x, y }) {
  if (!node) return null

  const cat = categoryConfig[node.category] ?? {}

  return (
    <div
      className="absolute z-50 pointer-events-none"
      style={{
        left: x + 14,
        top:  y - 10,
        transition: 'opacity 0.1s',
        opacity: node ? 1 : 0,
      }}
    >
      <div
        className="px-3 py-2 text-sm"
        style={{
          background:  '#0d111c',
          border:      `1px solid ${cat.stroke ?? '#1e2a3a'}`,
          minWidth:    160,
          maxWidth:    240,
          boxShadow:   `0 0 12px ${cat.stroke ?? '#1e2a3a'}44`,
        }}
      >
        {/* Category badge */}
        <div className="flex items-center gap-1.5 mb-1">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: cat.stroke ?? '#6b7280' }}
          />
          <span
            className="text-[10px] uppercase tracking-widest"
            style={{ color: cat.stroke ?? '#6b7280', fontFamily: 'Cinzel, serif' }}
          >
            {cat.label ?? node.category}
          </span>
        </div>

        {/* Name */}
        <div
          className="font-semibold leading-tight"
          style={{ color: '#c9a84c', fontFamily: 'Cinzel, serif', fontSize: 13 }}
        >
          {node.name}
        </div>

        {/* Epithet */}
        {node.epithet && (
          <div
            className="mt-0.5 leading-snug"
            style={{ color: '#94a3b8', fontFamily: '"Crimson Pro", Georgia, serif', fontSize: 12, fontStyle: 'italic' }}
          >
            {node.epithet}
          </div>
        )}
      </div>
    </div>
  )
}
