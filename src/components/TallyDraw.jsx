import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

// The brand's tally mark, drawn stroke by stroke. `auto` plays on mount, otherwise on scroll.
export default function TallyDraw({ count = 4, strike = false, auto = false, onInk = false, size = 44, className = '' }) {
  const [ref, seen] = useInView({ threshold: 0.5 })
  const [played, setPlayed] = useState(false)
  useEffect(() => {
    if (!auto) return undefined
    const id = requestAnimationFrame(() => setPlayed(true))
    return () => cancelAnimationFrame(id)
  }, [auto])

  const on = auto ? played : seen
  const w = count * 10 + 6
  return (
    <svg ref={ref} className={`tally-svg${on ? ' is-in' : ''} ${className}`.trim()} width={(size * w) / 44} height={size} viewBox={`0 0 ${w} 44`} aria-hidden="true" focusable="false">
      <g fill="none" stroke={onInk ? '#E8593F' : '#C8321E'} strokeWidth="5" strokeLinecap="square">
        {Array.from({ length: count }, (_, i) => (
          <path key={i} d={`M${6 + i * 10} 6V38`} pathLength="1" style={{ '--i': i }} />
        ))}
      </g>
      {strike && <path className="tally-strike" d={`M2 32L${w - 4} 12`} pathLength="1" fill="none" stroke={onInk ? '#F4F2EE' : '#14130F'} strokeWidth="4" style={{ '--i': count }} />}
    </svg>
  )
}
