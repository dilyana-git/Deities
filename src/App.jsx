import { useState } from 'react'
import FilterBar         from './components/FilterBar'
import GraphCanvas       from './components/GraphCanvas'
import DetailPanel       from './components/DetailPanel'
import LegendBar         from './components/LegendBar'
import Lightbox          from './components/Lightbox'
import { usePortraitLoader } from './hooks/usePortraitLoader'

export default function App() {
  const [selectedNodeId,  setSelectedNodeId]  = useState(null)
  const [filterCategory,  setFilterCategory]  = useState('all')
  const [filterArchetype, setFilterArchetype] = useState('all')
  const [searchTerm,      setSearchTerm]      = useState('')
  const [focusMode,       setFocusMode]       = useState(false)
  const [legendCollapsed, setLegendCollapsed] = useState(false)
  const [portraitMode,    setPortraitMode]    = useState(false)
  const [lightboxNodeId,  setLightboxNodeId]  = useState(null)

  // Probe all portrait images once; both GraphCanvas and DetailPanel read this Set.
  const portraitLoaded = usePortraitLoader()

  const handleNodeSelect = (id) => {
    setSelectedNodeId(prev => prev === id ? null : id)
  }

  return (
    <div
      style={{ background: '#05080f', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}
    >
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <FilterBar
        searchTerm={searchTerm}           onSearch={setSearchTerm}
        filterCategory={filterCategory}   onFilterCategory={setFilterCategory}
        filterArchetype={filterArchetype} onFilterArchetype={setFilterArchetype}
        focusMode={focusMode}             onToggleFocusMode={() => setFocusMode(f => !f)}
        portraitMode={portraitMode}       onTogglePortraitMode={() => setPortraitMode(p => !p)}
      />

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <main
        style={{
          flex:          1,
          display:       'flex',
          overflow:      'hidden',
          minHeight:     0,
          flexDirection: 'column',
        }}
        className="md-row"
      >
        {/* Graph */}
        <div style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
          <GraphCanvas
            selectedNodeId={selectedNodeId}
            onNodeSelect={handleNodeSelect}
            filterCategory={filterCategory}
            filterArchetype={filterArchetype}
            searchTerm={searchTerm}
            focusMode={focusMode}
            portraitMode={portraitMode}
            portraitLoaded={portraitLoaded}
            onOpenLightbox={setLightboxNodeId}
          />
        </div>

        {/* Detail panel */}
        <div className="detail-panel-container" style={{ flexShrink: 0 }}>
          <DetailPanel
            selectedNodeId={selectedNodeId}
            onNodeSelect={handleNodeSelect}
            portraitLoaded={portraitLoaded}
            onOpenLightbox={setLightboxNodeId}
          />
        </div>
      </main>

      {/* ── Legend bar ──────────────────────────────────────────────────── */}
      <LegendBar
        collapsed={legendCollapsed}
        onToggle={() => setLegendCollapsed(c => !c)}
      />

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      {lightboxNodeId && (
        <Lightbox
          nodeId={lightboxNodeId}
          onClose={() => setLightboxNodeId(null)}
        />
      )}
    </div>
  )
}
