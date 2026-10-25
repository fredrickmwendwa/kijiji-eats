import { getItem } from '../data/menu'

// A line is one menu item with one set of selected options.
// key = item id plus the chosen option ids, so identical choices merge.
export const makeKey = (itemId, selections = {}, note = '') =>
  [itemId, ...Object.keys(selections).sort().map((g) => `${g}:${selections[g]}`), ...(note ? [`n:${note}`] : [])].join('|')

export function priceFor(item, selections = {}) {
  let price = item.price
  for (const group of item.options || []) {
    const choice = group.choices.find((c) => c.id === selections[group.id])
    if (choice) price += choice.price
  }
  return price
}

export function describeSelections(item, selections = {}) {
  return (item.options || [])
    .map((g) => g.choices.find((c) => c.id === selections[g.id])?.label)
    .filter(Boolean)
    .join(', ')
}

export function buildLine(item, selections = {}, qty = 1, note = '') {
  const clean = note.trim().slice(0, 80)
  return { key: makeKey(item.id, selections, clean), itemId: item.id, selections, note: clean, unitPrice: priceFor(item, selections), qty }
}

export const initialState = { lines: [] }

export function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { line } = action
      const found = state.lines.find((l) => l.key === line.key)
      if (found) return { lines: state.lines.map((l) => (l.key === line.key ? { ...l, qty: l.qty + line.qty } : l)) }
      return { lines: [...state.lines, line] }
    }
    case 'setQty':
      return { lines: state.lines.map((l) => (l.key === action.key ? { ...l, qty: action.qty } : l)).filter((l) => l.qty > 0) }
    case 'remove':
      return { lines: state.lines.filter((l) => l.key !== action.key) }
    case 'replace': {
      const without = state.lines.filter((l) => l.key !== action.oldKey)
      return cartReducer({ lines: without }, { type: 'add', line: action.line })
    }
    case 'clear':
      return initialState
    case 'load':
      return { lines: action.lines }
    default:
      return state
  }
}

export const countItems = (lines) => lines.reduce((n, l) => n + l.qty, 0)
export const totalOf = (lines) => lines.reduce((n, l) => n + l.qty * l.unitPrice, 0)
export const qtyForItem = (lines, itemId) => lines.filter((l) => l.itemId === itemId).reduce((n, l) => n + l.qty, 0)

// Drop saved lines that no longer match the menu, so old data can never break the page.
export const sanitizeLines = (lines) =>
  Array.isArray(lines)
    ? lines.filter((l) => l && getItem(l.itemId) && Number.isInteger(l.qty) && l.qty > 0 && typeof l.unitPrice === 'number' && typeof l.key === 'string')
    : []
