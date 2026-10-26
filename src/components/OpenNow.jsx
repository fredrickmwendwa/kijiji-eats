import { useEffect, useState } from 'react'
import { openStatus } from '../lib/hours'

export default function OpenNow() {
  const [status, setStatus] = useState(() => openStatus())
  useEffect(() => {
    const id = setInterval(() => setStatus(openStatus()), 60000)
    return () => clearInterval(id)
  }, [])
  return (
    <p className={`open-pill${status.open ? ' is-open' : ''}`}>
      <span className="open-pill__dot" aria-hidden="true" />
      <span>{status.label}</span>
      <span className="sr-only">. Sample hours.</span>
    </p>
  )
}
