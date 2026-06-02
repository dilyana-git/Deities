import { categoryConfig, categoryOrder } from '../data/categoryConfig'
import { archetypeOrder } from '../data/archetypeMap'

export default function FilterBar({
  searchTerm, onSearch,
  filterCategory, onFilterCategory,
  filterArchetype, onFilterArchetype,
  focusMode, onToggleFocusMode,
  portraitMode, onTogglePortraitMode,
}) {
  return (
    <header
      className="shrink-0 flex items-center gap-3 px-4 flex-wrap"
      style={{
        background:  '#08090f',
        borderBottom: '1px solid #1e2a3a',
        minHeight:   52,
        paddingTop:   8,
        paddingBottom: 8,
      }}
    >
      {/* Wordmark */}
      <div className="flex flex-col leading-none mr-2 shrink-0">
        <span
          style={{
            fontFamily: 'Cinzel, serif',
            fontWeight:  700,
            fontSize:    20,
            letterSpacing: '0.18em',
            color:       '#c9a84c',
            lineHeight:  1,
          }}
        >
          THEOGONY
        </span>
        <span
          style={{
            fontFamily:  '"Crimson Pro", Georgia, serif',
            fontStyle:   'italic',
            fontSize:    11,
            color:       '#4b5563',
            letterSpacing: '0.06em',
            marginTop:   2,
          }}
        >
          A Web of Becoming
        </span>
      </div>

      {/* Search */}
      <div className="relative flex items-center shrink-0">
        <svg
          className="absolute left-2 pointer-events-none"
          width="13" height="13" viewBox="0 0 20 20" fill="none"
        >
          <circle cx="9" cy="9" r="7" stroke="#4b5563" strokeWidth="2"/>
          <line x1="14" y1="14" x2="19" y2="19" stroke="#4b5563" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search entities…"
          value={searchTerm}
          onChange={e => onSearch(e.target.value)}
          className="pl-7 pr-3 py-1 text-sm outline-none"
          style={{
            background:  '#0d111c',
            border:      '1px solid #1e2a3a',
            color:       '#e2e8f0',
            fontFamily:  '"Crimson Pro", Georgia, serif',
            fontSize:    13,
            width:       200,
            caretColor:  '#c9a84c',
          }}
          onFocus={e  => e.target.style.borderColor = '#c9a84c'}
          onBlur={e   => e.target.style.borderColor = '#1e2a3a'}
        />
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-1 flex-wrap">
        {['all', ...categoryOrder].map(key => {
          const isAll   = key === 'all'
          const active  = filterCategory === key
          const label   = isAll ? 'All' : (categoryConfig[key]?.label ?? key)
          const color   = isAll ? '#c9a84c' : (categoryConfig[key]?.stroke ?? '#6b7280')
          return (
            <button
              key={key}
              onClick={() => onFilterCategory(key)}
              className="px-2 py-0.5 text-[11px] transition-all"
              style={{
                fontFamily:    'Cinzel, serif',
                border:        `1px solid ${active ? color : '#1e2a3a'}`,
                background:    active ? `${color}22` : 'transparent',
                color:         active ? color : '#6b7280',
                cursor:        'pointer',
                whiteSpace:    'nowrap',
                letterSpacing: '0.05em',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Archetype filter */}
      <select
        value={filterArchetype}
        onChange={e => onFilterArchetype(e.target.value)}
        className="text-[11px] px-2 py-1 outline-none"
        style={{
          background:   '#0d111c',
          border:       '1px solid #1e2a3a',
          color:        '#9ca3af',
          fontFamily:   'Cinzel, serif',
          fontSize:     11,
          cursor:       'pointer',
          letterSpacing: '0.04em',
        }}
      >
        <option value="all">All Archetypes</option>
        {archetypeOrder.map(a => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      {/* Portraits toggle */}
      <button
        onClick={onTogglePortraitMode}
        className="px-2 py-1 text-[11px] transition-all shrink-0"
        style={{
          fontFamily:    'Cinzel, serif',
          letterSpacing: '0.08em',
          border:        `1px solid ${portraitMode ? '#a855f7' : '#1e2a3a'}`,
          background:    portraitMode ? '#a855f722' : 'transparent',
          color:         portraitMode ? '#a855f7' : '#6b7280',
          cursor:        'pointer',
        }}
      >
        {portraitMode ? '◉ PORTRAITS' : '◎ PORTRAITS'}
      </button>

      {/* Focus mode toggle */}
      <button
        onClick={onToggleFocusMode}
        className="px-2 py-1 text-[11px] transition-all shrink-0"
        style={{
          fontFamily:    'Cinzel, serif',
          letterSpacing: '0.08em',
          border:        `1px solid ${focusMode ? '#c9a84c' : '#1e2a3a'}`,
          background:    focusMode ? '#c9a84c22' : 'transparent',
          color:         focusMode ? '#c9a84c' : '#6b7280',
          cursor:        'pointer',
        }}
      >
        {focusMode ? '⦿ FOCUS ON' : '⦾ FOCUS'}
      </button>
    </header>
  )
}
