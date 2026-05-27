import { useState } from 'react'
import FilterBar   from './components/FilterBar'
import GraphCanvas from './components/GraphCanvas'
import DetailPanel from './components/DetailPanel'
import LegendBar   from './components/LegendBar'

export default function App() {
  const [selectedNodeId,  setSelectedNodeId]  = useState(null)
  const [filterCategory,  setFilterCategory]  = useState('all')
  const [filterArchetype, setFilterArchetype] = useState('all')
  const [searchTerm,      setSearchTerm]      = useState('')
  const [focusMode,       setFocusMode]       = useState(false)
  const [legendCollapsed, setLegendCollapsed] = useState(false)

  // When navigating from the detail panel, also centre the graph
  const handleNodeSelect = (id) => {
    setSelectedNodeId(prev => prev === id ? null : id)
  }

  return (
    <div
      style={{ background: '#05080f', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <FilterBar
        searchTerm={searchTerm}         onSearch={setSearchTerm}
        filterCategory={filterCategory} onFilterCategory={setFilterCategory}
        filterArchetype={filterArchetype} onFilterArchetype={setFilterArchetype}
        focusMode={focusMode}           onToggleFocusMode={() => setFocusMode(f => !f)}
      />

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <main
        style={{
          flex:     1,
          display:  'flex',
          overflow: 'hidden',
          minHeight: 0,
          // Stack vertically on mobile
          flexDirection: 'column',
        }}
        className="md-row"
      >
        {/* Graph — flex-1 on desktop, 55vh on mobile */}
        <div style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
          <GraphCanvas
            selectedNodeId={selectedNodeId}
            onNodeSelect={handleNodeSelect}
            filterCategory={filterCategory}
            filterArchetype={filterArchetype}
            searchTerm={searchTerm}
            focusMode={focusMode}
          />
        </div>

        {/* Detail panel — 35% on desktop, auto on mobile */}
        <div
          className="detail-panel-container"
          style={{ flexShrink: 0 }}
        >
          <DetailPanel
            selectedNodeId={selectedNodeId}
            onNodeSelect={handleNodeSelect}
          />
        </div>
      </main>

      {/* ── Legend bar ──────────────────────────────────────────────────── */}
      <LegendBar
        collapsed={legendCollapsed}
        onToggle={() => setLegendCollapsed(c => !c)}
      />
    </div>
  )
}
