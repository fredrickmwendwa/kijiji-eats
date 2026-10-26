import { MENU } from '../data/menu'
import { formatKES } from '../lib/format'

const ITEMS = ['goat-ribs', 'beef-nyama-choma', 'kuku-half', 'sharing-platter', 'ugali', 'sukuma', 'chips', 'passion-juice']
  .map((id) => MENU.find((m) => m.id === id))

// Decorative: the same prices are on the menu. Hidden from screen readers.
export default function Ticker() {
  const row = (suffix) => ITEMS.map((m) => (
    <span className="ticker__item" key={`${m.id}${suffix}`}>
      <span className="ticker__name">{m.name}</span>
      <span className="ticker__price">{formatKES(m.price)}</span>
      <span className="ticker__sep">|||</span>
    </span>
  ))
  return (
    <div className="ticker on-ink" aria-hidden="true">
      <div className="ticker__track">{row('a')}{row('b')}</div>
    </div>
  )
}
