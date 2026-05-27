// ─── Node radius by category + special overrides ─────────────────────────────
const CATEGORY_RADII = {
  primordial:  22,
  titan:       17,
  olympian:    19,
  chthonic:    14,
  monster:     15,
  hero:        15,
  sea_deity:   13,
  nymph_minor: 11,
  mortal:      11,
}

const SPECIAL_RADII = {
  chaos:    26,
  gaia:     24,
  zeus:     22,
  poseidon: 21,
  typhon:   20,
  hera:     20,
  athena:   19,
  echidna:  17,
}

export function getNodeRadius(node) {
  if (!node) return 12
  return SPECIAL_RADII[node.id] ?? CATEGORY_RADII[node.category] ?? 12
}

// ─── Connected nodes — direction-aware grouping ───────────────────────────────
export function getConnectedNodes(nodeId, nodes, links) {
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  const result = {
    parent_of:      [],   // this node is SOURCE of parent_of / birthed
    born_from:      [],   // this node is TARGET of parent_of / birthed
    lover_of:       [],   // bidirectional
    enemy_of:       [],   // bidirectional
    transformed_by: [],   // this node is TARGET of transformed_into
    cursed_by:      [],   // this node is TARGET of cursed_into
    created_by:     [],   // this node is TARGET of created_by
    merged_with:    [],   // bidirectional
    transforms:     [],   // this node is SOURCE of transformed_into (it transforms others)
    curses:         [],   // this node is SOURCE of cursed_into
  }

  for (const link of links) {
    const src = typeof link.source === 'object' ? link.source.id : link.source
    const tgt = typeof link.target === 'object' ? link.target.id : link.target

    if (src !== nodeId && tgt !== nodeId) continue

    const isSource = src === nodeId
    const otherId  = isSource ? tgt : src
    const other    = nodeMap[otherId]
    if (!other) continue

    const entry = { node: other, label: link.label }

    switch (link.type) {
      case 'parent_of':
      case 'birthed':
        isSource ? result.parent_of.push(entry) : result.born_from.push(entry)
        break
      case 'transformed_into':
        isSource ? result.transforms.push(entry) : result.transformed_by.push(entry)
        break
      case 'cursed_into':
        isSource ? result.curses.push(entry) : result.cursed_by.push(entry)
        break
      case 'created_by':
        isSource ? result.created_by.push(entry) : result.created_by.push(entry)
        break
      case 'lover_of':
        result.lover_of.push(entry)
        break
      case 'enemy_of':
        result.enemy_of.push(entry)
        break
      case 'merged_with':
        result.merged_with.push(entry)
        break
      default:
        break
    }
  }

  // Deduplicate lover_of / enemy_of (bidirectional links appear twice)
  const dedup = arr => {
    const seen = new Set()
    return arr.filter(e => {
      if (seen.has(e.node.id)) return false
      seen.add(e.node.id)
      return true
    })
  }
  result.lover_of   = dedup(result.lover_of)
  result.enemy_of   = dedup(result.enemy_of)
  result.merged_with = dedup(result.merged_with)

  return result
}

// ─── All adjacent node IDs (for focus-mode opacity) ───────────────────────────
export function getNeighborIds(nodeId, links) {
  const ids = new Set()
  for (const link of links) {
    const src = typeof link.source === 'object' ? link.source.id : link.source
    const tgt = typeof link.target === 'object' ? link.target.id : link.target
    if (src === nodeId) ids.add(tgt)
    if (tgt === nodeId) ids.add(src)
  }
  return ids
}
