import { useState, useCallback } from 'react'
import FilterBar      from './components/FilterBar'
import GraphCanvas    from './components/GraphCanvas'
import LegendBar      from './components/LegendBar'
import DeityModal     from './components/DeityModal'
import { useHeadLoader } from './hooks/usePortraitLoader'

export default function App() {
  const [selectedNodeId,  setSelectedNodeId]  = useState(null)
  const [filterCategory,  setFilterCategory]  = useState('all')
  const [filterArchetype, setFilterArchetype] = useState('all')
  const [searchTerm,      setSearchTerm]      = useState('')
  const [focusMode,       setFocusMode]       = useState(false)
  const [legendCollapsed, setLegendCollapsed] = useState(false)

  // Modal state
  const [modalNodeId, setModalNodeId] = useState(null)
  const [backStack,   setBackStack]   = useState([])

  // Probe head images for all nodes once; passed to GraphCanvas + DeityModal
  const headLoaded = useHeadLoader()

  // Node click in the graph: select node + open modal fresh (clear back stack)
  const handleNodeClick = useCallback((id) => {
    setSelectedNodeId(id)
    setModalNodeId(id)
    setBackStack([])
  }, [])

  // Navigation inside the modal: push current to back stack, show new
  const handleModalNavigate = useCallback((id) => {
    setBackStack(prev => [...prev, modalNodeId])
    setModalNodeId(id)
    setSelectedNodeId(id)   // graph pans to newly viewed deity
  }, [modalNodeId])

  // Back button inside the modal: pop back stack
  const handleModalBack = useCallback(() => {
    const prev = backStack[backStack.length - 1]
    setBackStack(s => s.slice(0, -1))
    setModalNodeId(prev)
    setSelectedNodeId(prev)
  }, [backStack])

  const handleModalClose = useCallback(() => {
    setModalNodeId(null)
    setBackStack([])
  }, [])

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
      />

      {/* ── Graph — full main area ───────────────────────────────────────── */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        <GraphCanvas
          selectedNodeId={selectedNodeId}
          onNodeClick={handleNodeClick}
          filterCategory={filterCategory}
          filterArchetype={filterArchetype}
          searchTerm={searchTerm}
          focusMode={focusMode}
          headLoaded={headLoaded}
        />
      </main>

      {/* ── Legend bar ──────────────────────────────────────────────────── */}
      <LegendBar
        collapsed={legendCollapsed}
        onToggle={() => setLegendCollapsed(c => !c)}
      />

      {/* ── Deity modal (primary detail view) ───────────────────────────── */}
      {modalNodeId && (
        <DeityModal
          nodeId={modalNodeId}
          backStack={backStack}
          headLoaded={headLoaded}
          onClose={handleModalClose}
          onNavigate={handleModalNavigate}
          onBack={handleModalBack}
        />
      )}
    </div>
  )
}
