import { useEffect, useRef } from 'react'

let locks = 0
const stack = []
const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

// Shared modal behaviour: focus moves in, Tab is trapped, Escape closes,
// page scroll locks, and focus returns to what opened it.
export default function Dialog({ label, onClose, className = 'sheet', scrim = true, children }) {
  const ref = useRef(null)
  const opener = useRef(null)

  const closeRef = useRef(onClose)
  closeRef.current = onClose

  // Escape closes the top-most dialog, even if focus has moved outside it.
  useEffect(() => {
    const entry = {}
    stack.push(entry)
    const onKey = (e) => {
      if (e.key === 'Escape' && stack[stack.length - 1] === entry) { e.stopPropagation(); closeRef.current() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); stack.splice(stack.indexOf(entry), 1) }
  }, [])

  useEffect(() => {
    opener.current = document.activeElement
    locks += 1
    document.body.classList.add('is-locked')
    const node = ref.current
    const first = node.querySelector('[data-autofocus]') || node.querySelector(FOCUSABLE) || node
    first.focus()
    return () => {
      locks -= 1
      if (locks <= 0) document.body.classList.remove('is-locked')
      if (opener.current && opener.current.isConnected) opener.current.focus()
    }
  }, [])

  const onKeyDown = (e) => {
    if (e.key !== 'Tab') return
    const items = [...ref.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement)
    if (!items.length) return
    const firstEl = items[0]
    const lastEl = items[items.length - 1]
    if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus() }
    else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus() }
  }

  return (
    <>
      {scrim && <div className="scrim" onClick={onClose} aria-hidden="true" />}
      <div ref={ref} className={className} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} onKeyDown={onKeyDown}>
        {children}
      </div>
    </>
  )
}
