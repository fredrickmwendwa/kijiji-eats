import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { cartReducer, countItems, initialState, sanitizeLines, totalOf } from '../lib/cart'

const STORAGE_KEY = 'kijiji-eats-order-v1'
const OrderContext = createContext(null)

function loadLines() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? sanitizeLines(JSON.parse(raw)) : []
  } catch {
    return []
  }
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => ({ lines: loadLines() }))
  const [restored, setRestored] = useState(() => state.lines.length > 0)
  const [details, setDetails] = useState({ name: '', mode: 'collection', note: '' })
  const [sheet, setSheet] = useState({ open: false, step: 'review' })
  const [customise, setCustomise] = useState(null)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines))
    } catch {
      /* storage unavailable: the cart still works for this visit */
    }
  }, [state.lines])

  const openSheet = useCallback((step = 'review') => { setSheet({ open: true, step }); setRestored(false) }, [])
  const closeSheet = useCallback(() => setSheet((s) => ({ ...s, open: false })), [])
  const setStep = useCallback((step) => setSheet({ open: true, step }), [])

  const value = useMemo(() => ({
    lines: state.lines,
    count: countItems(state.lines),
    total: totalOf(state.lines),
    details, setDetails,
    sheet, openSheet, closeSheet, setStep,
    customise, openCustomise: (item, editLine = null) => setCustomise({ item, editLine }), closeCustomise: () => setCustomise(null),
    restored, dismissRestored: () => setRestored(false),
    announcement,
    addLine: (line, name) => { dispatch({ type: 'add', line }); setAnnouncement(`Added ${name}`) },
    replaceLine: (oldKey, line) => dispatch({ type: 'replace', oldKey, line }),
    setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
    removeLine: (key, name) => { dispatch({ type: 'remove', key }); setAnnouncement(`Removed ${name}`) },
    clear: () => { dispatch({ type: 'clear' }); setRestored(false); setAnnouncement('Order cleared') },
  }), [state.lines, details, sheet, customise, restored, announcement, openSheet, closeSheet, setStep])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider')
  return ctx
}
