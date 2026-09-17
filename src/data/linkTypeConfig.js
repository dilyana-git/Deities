export const linkTypeConfig = {
  parent_of: {
    stroke: '#6b7280',
    strokeWidth: 1.5,
    strokeDasharray: null,
    animated: false,
    arrow: true,
    label: 'Parent of',
    inverseLabel: 'Child of',
    description: 'Genealogical descent',
    cssClass: 'link-parent',
  },
  birthed: {
    stroke: '#16a34a',
    strokeWidth: 2,
    strokeDasharray: null,
    animated: false,
    arrow: true,
    label: 'Birthed',
    inverseLabel: 'Birthed by',
    description: 'Parthenogenesis or emergence from',
    cssClass: 'link-birthed',
  },
  transformed_into: {
    stroke: '#7c3aed',
    strokeWidth: 2,
    strokeDasharray: '10 5',
    animated: true,
    arrow: true,
    label: 'Transformed',
    inverseLabel: 'Transformed by',
    description: 'Divine metamorphosis',
    cssClass: 'link-transformed',
  },
  cursed_into: {
    stroke: '#991b1b',
    strokeWidth: 2,
    strokeDasharray: '8 4',
    animated: true,
    arrow: true,
    label: 'Cursed',
    inverseLabel: 'Cursed by',
    description: 'Punitive transformation by divine will',
    cssClass: 'link-cursed',
  },
  created_by: {
    stroke: '#d97706',
    strokeWidth: 1.5,
    strokeDasharray: '3 3',
    animated: false,
    arrow: true,
    label: 'Creator of',
    inverseLabel: 'Created by',
    description: 'Fashioned or brought into being',
    cssClass: 'link-created',
  },
  lover_of: {
    stroke: '#f43f5e',
    strokeWidth: 1.2,
    strokeDasharray: null,
    animated: false,
    arrow: false,
    label: 'Lover of',
    inverseLabel: 'Lover of',
    description: 'Union, love, or desire',
    cssClass: 'link-lover',
    curved: true,
  },
  enemy_of: {
    stroke: '#dc2626',
    strokeWidth: 2.5,
    strokeDasharray: '5 2',
    animated: false,
    arrow: false,
    label: 'Enemy of',
    inverseLabel: 'Enemy of',
    description: 'Enmity, conflict, or slaying',
    cssClass: 'link-enemy',
  },
  merged_with: {
    stroke: '#c9a84c',
    strokeWidth: 3,
    strokeDasharray: null,
    animated: false,
    arrow: false,
    label: 'Merged with',
    inverseLabel: 'Merged with',
    description: 'Absorbed, swallowed, or unified',
    cssClass: 'link-merged',
  },
  split_from: {
    stroke: '#64748b',
    strokeWidth: 1.5,
    strokeDasharray: '6 3 2 3',
    animated: false,
    arrow: true,
    label: 'Split from',
    inverseLabel: 'Split into',
    description: 'Separated or differentiated from',
    cssClass: 'link-split',
  },
}

/* A link reads from its source, which is the one acting: `athena cursed_into
   medusa` is Athena cursing Medusa, `prometheus created_by humanity` is
   Prometheus making humankind. So `label` is phrased from the source's side
   and `inverseLabel` from the target's. The path finder and the map's edge
   labels both resolve through here, so the two can't disagree. */
export function relationLabel(type, fromSource) {
  const cfg = linkTypeConfig[type]
  return (fromSource ? cfg?.label : cfg?.inverseLabel) || cfg?.label || type
}

export const linkTypeOrder = [
  'parent_of', 'birthed', 'transformed_into', 'cursed_into',
  'created_by', 'lover_of', 'enemy_of', 'merged_with', 'split_from',
]
