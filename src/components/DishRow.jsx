import { useOrder } from '../context/OrderContext'
import { buildLine, qtyForItem } from '../lib/cart'
import { formatKES } from '../lib/format'
import { dishImage } from '../data/menu'
import Img from './Img'
import Button from './Button'
import Reveal from './Reveal'

export default function DishRow({ item, index = 0 }) {
  const { lines, addLine, setQty, openCustomise } = useOrder()
  const qty = qtyForItem(lines, item.id)
  const hasOptions = Boolean(item.options)
  const line = lines.find((l) => l.itemId === item.id)

  return (
    <Reveal as="li" delay={Math.min(index, 6) * 70} className={`dish${qty > 0 ? ' dish--added' : ''}`}>
      <div className="media">
        <Img alt={item.image ? item.name : `${item.name}, placeholder image`} label={item.name} src={dishImage(item)} w={320} h={320} />
      </div>
      <div className="dish__main">
        <div className="dish__head">
          <div className="dish__title">
            <span className="dish__name">{item.name}</span>
            {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
          <span className="dish__leader" aria-hidden="true" />
          <span className="dish__price">{hasOptions ? 'From ' : ''}{formatKES(item.price)}</span>
        </div>
        <div className="dish__desc">{item.description}</div>
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
            <Button size="sm" aria-label={`Add ${item.name}`} onClick={() => (hasOptions ? openCustomise(item) : addLine(buildLine(item), item.name))}>Add</Button>
          </>
        )}
      </div>
    </Reveal>
  )
}
