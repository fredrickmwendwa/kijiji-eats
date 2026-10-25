import { useOrder } from '../context/OrderContext'
import { buildLine, qtyForItem } from '../lib/cart'
import { formatKES } from '../lib/format'
import Img from './Img'
import Button from './Button'

export default function DishRow({ item }) {
  const { lines, addLine, setQty, openCustomise } = useOrder()
  const qty = qtyForItem(lines, item.id)
  const hasOptions = Boolean(item.options)
  const line = lines.find((l) => l.itemId === item.id)

  return (
    <li className={`dish${qty > 0 ? ' dish--added' : ''}`}>
      <div className="media">
        <Img alt={`${item.name}, placeholder image`} label={item.name} w={176} h={176} />
      </div>
      <div>
        <div className="dish__name">
          {item.name}
          {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="dish__desc">{item.description}</div>
        <div className="dish__price">{hasOptions ? 'From ' : ''}{formatKES(item.price)}</div>
      </div>
      <div className="dish__action">
        {!hasOptions && qty > 0 ? (
          <div className="stepper" role="group" aria-label={`Quantity of ${item.name}`}>
            <button type="button" aria-label={`Decrease quantity of ${item.name}`} onClick={() => setQty(line.key, qty - 1)}>-</button>
            <output aria-live="polite">{qty}</output>
            <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => setQty(line.key, qty + 1)}>+</button>
          </div>
        ) : (
          <>
            {hasOptions && qty > 0 && <span className="dish__count">In order: {qty}</span>}
            <Button size="sm" aria-label={`Add ${item.name}`} onClick={() => (hasOptions ? openCustomise(item) : addLine(buildLine(item), item.name))}>
              Add
            </Button>
          </>
        )}
      </div>
    </li>
  )
}
