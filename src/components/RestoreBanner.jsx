import { useOrder } from '../context/OrderContext'
import Button from './Button'

export default function RestoreBanner() {
  const { restored, count, openSheet, clear, dismissRestored } = useOrder()
  if (!restored || count === 0) return null
  return (
    <div className="restore-banner" role="status">
      <div className="container">
        <strong>We kept your order from earlier.</strong>
        <div className="btn-row">
          <Button size="sm" onClick={() => openSheet('review')}>Review order</Button>
          <Button size="sm" onClick={clear}>Clear order</Button>
          <button type="button" className="link-btn" onClick={dismissRestored}>Dismiss</button>
        </div>
      </div>
    </div>
  )
}
