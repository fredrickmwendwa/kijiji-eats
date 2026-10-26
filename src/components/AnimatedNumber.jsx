import { useEffect, useRef, useState } from 'react'
import { formatKES } from '../lib/format'

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Counts smoothly to a new value. Screen readers get the final value only.
export default function AnimatedNumber({ value, format = formatKES, duration = 450 }) {
  const [shown, setShown] = useState(value)
  const current = useRef(value)

  useEffect(() => {
    if (prefersReduced() || current.current === value) { current.current = value; setShown(value); return undefined }
    const from = current.current
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      current.current = Math.round(from + (value - from) * eased)
      setShown(current.current)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <>
      <span aria-hidden="true">{format(shown)}</span>
      <span className="sr-only" aria-live="polite">{format(value)}</span>
    </>
  )
}
