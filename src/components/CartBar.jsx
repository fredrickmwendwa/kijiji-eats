import { useOrder } from '../context/OrderContext'
import { formatKES } from '../lib/format'
import Button from './Button'

export default function CartBar() {
  const { count, total, openSheet } = useOrder()
  if (count === 0) return null
  return (
    <div className="cart-bar on-ink" role="region" aria-label="Order summary">
      <div>
        <div className="mono" style={{ fontSize: '0.875rem' }}>{count} {count === 1 ? 'item' : 'items'}</div>
        <div className="mono cart-bar__total">{formatKES(total)}</div>
      </div>
      <Button variant="primary" onClick={() => openSheet('review')}>View order</Button>
    </div>
  )
}
