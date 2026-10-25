import { Link } from 'react-router-dom'

export function LogoMark({ onInk = false, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <g stroke={onInk ? '#E8593F' : '#C8321E'} strokeWidth="5" strokeLinecap="square">
        <path d="M6 6V38M16 6V38M26 6V38M36 6V38" />
      </g>
      <path d="M2 32L40 12" stroke={onInk ? '#F4F2EE' : '#14130F'} strokeWidth="4" />
    </svg>
  )
}

export default function Logo({ onInk = false, onClick }) {
  return (
    <Link to="/" className="logo" aria-label="Kijiji Eats, home" onClick={onClick}>
      <LogoMark onInk={onInk} />
      <span className="logo__full">Kijiji Eats</span>
      <span className="logo__short">Kijiji</span>
    </Link>
  )
}
