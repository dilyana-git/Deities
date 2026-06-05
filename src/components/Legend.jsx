import { categoryConfig, categoryOrder } from '../data/categoryConfig.js'
import { linkTypeConfig, linkTypeOrder } from '../data/linkTypeConfig.js'

export default function Legend({ onClose }) {
  return (
    <div className="bg-[#08090f]/95 backdrop-blur border border-[#1e2a3a] rounded-lg p-4 w-72 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-cinzel text-[#94a3b8] text-xs tracking-widest">LEGEND</h3>
        <button
          onClick={onClose}
          className="text-[#3e4d60] hover:text-[#94a3b8] transition-colors text-base leading-none"
        >
          ×
        </button>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <p className="text-[9px] font-cinzel tracking-widest text-[#3e4d60] mb-1.5">ENTITIES</p>
        <div className="space-y-1">
          {categoryOrder.map(cat => {
            const cfg = categoryConfig[cat]
            return (
              <div key={cat} className="flex items-center gap-2">
                <svg width="14" height="14" className="flex-shrink-0">
                  <circle
                    cx="7" cy="7" r="5"
                    fill={cfg.fill}
                    stroke={cfg.stroke}
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="text-[11px] font-cinzel tracking-wide" style={{ color: cfg.stroke }}>
                  {cfg.label}
                </span>
                <span className="text-[10px] text-[#3e4d60] font-crimson italic ml-auto truncate max-w-[120px]">
                  {cfg.description}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-[#1e2a3a] my-3" />

      {/* Link types */}
      <div>
        <p className="text-[9px] font-cinzel tracking-widest text-[#3e4d60] mb-1.5">RELATIONS</p>
        <div className="space-y-1.5">
          {linkTypeOrder.map(type => {
            const cfg = linkTypeConfig[type]
            return (
              <div key={type} className="flex items-center gap-2">
                {/* Mini link preview */}
                <svg width="28" height="10" className="flex-shrink-0">
                  <line
                    x1="2" y1="5" x2="26" y2="5"
                    stroke={cfg.stroke}
                    strokeWidth={cfg.strokeWidth}
                    strokeDasharray={cfg.strokeDasharray || undefined}
                  />
                  {cfg.arrow && (
                    <polygon
                      points="22,2 28,5 22,8"
                      fill={cfg.stroke}
                    />
                  )}
                </svg>
                <span className="text-[11px] font-cinzel tracking-wide" style={{ color: cfg.stroke }}>
                  {cfg.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-t border-[#1e2a3a] mt-3 pt-2">
        <p className="text-[9px] text-[#2a3548] font-crimson italic text-center">
          Node size reflects number of connections
        </p>
      </div>
    </div>
  )
}
