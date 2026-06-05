import { categoryConfig, categoryOrder } from '../data/categoryConfig'
import { linkTypeConfig, linkTypeOrder } from '../data/linkTypeConfig'

export default function LegendBar({ collapsed, onToggle }) {
  return (
    <div
      style={{ background: '#0d111c', borderTop: '1px solid #1e2a3a' }}
      className="shrink-0 select-none"
    >
      {/* Collapse strip */}
      <div className="flex items-center justify-between px-4 py-1">
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: '#4b5563', fontFamily: 'Cinzel, serif' }}
        >
          Legend
        </span>
        <button
          onClick={onToggle}
          className="text-[10px] px-2 py-0.5 transition-colors"
          style={{ color: '#6b7280', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}
        >
          {collapsed ? '▲ EXPAND' : '▼ COLLAPSE'}
        </button>
      </div>

      {!collapsed && (
        <div className="overflow-x-auto pb-2 px-4">
          <div className="flex gap-8 min-w-max">

            {/* Entity categories */}
            <div>
              <div
                className="text-[9px] uppercase tracking-widest mb-1.5"
                style={{ color: '#4b5563', fontFamily: 'Cinzel, serif' }}
              >
                Entities
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {categoryOrder.map(key => {
                  const c = categoryConfig[key]
                  return (
                    <div key={key} className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: c.stroke, boxShadow: `0 0 4px ${c.stroke}88` }}
                      />
                      <span
                        className="text-[11px] whitespace-nowrap"
                        style={{ color: '#9ca3af', fontFamily: 'Cinzel, serif' }}
                      >
                        {c.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: 1, background: '#1e2a3a', alignSelf: 'stretch' }} />

            {/* Relationship types */}
            <div>
              <div
                className="text-[9px] uppercase tracking-widest mb-1.5"
                style={{ color: '#4b5563', fontFamily: 'Cinzel, serif' }}
              >
                Relations
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                {linkTypeOrder.map(key => {
                  const lt = linkTypeConfig[key]
                  return (
                    <div key={key} className="flex items-center gap-2">
                      {/* Mini SVG line sample */}
                      <svg width="36" height="12" style={{ overflow: 'visible', flexShrink: 0 }}>
                        <line
                          x1="0" y1="6" x2="36" y2="6"
                          stroke={lt.stroke}
                          strokeWidth={lt.strokeWidth}
                          strokeDasharray={lt.strokeDasharray ?? undefined}
                        />
                        {lt.arrow && (
                          <polygon
                            points="36,6 30,3 30,9"
                            fill={lt.stroke}
                          />
                        )}
                      </svg>
                      <span
                        className="text-[11px] whitespace-nowrap"
                        style={{ color: '#9ca3af', fontFamily: 'Cinzel, serif' }}
                      >
                        {lt.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
