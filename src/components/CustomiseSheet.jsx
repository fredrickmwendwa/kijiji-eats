import { useState } from 'react'
import { useOrder } from '../context/OrderContext'
import { buildLine, priceFor } from '../lib/cart'
import { formatKES } from '../lib/format'
import Dialog from './Dialog'
import Button from './Button'

export default function CustomiseSheet() {
  const { customise, closeCustomise, addLine, replaceLine } = useOrder()
  const { item, editLine } = customise
  const [selections, setSelections] = useState(() => {
    if (editLine) return editLine.selections
    const init = {}
    for (const g of item.options) if (g.required) init[g.id] = g.choices[0].id
    return init
  })
  const [note, setNote] = useState(editLine?.note || '')

  const missing = item.options.some((g) => g.required && !selections[g.id])
  const price = priceFor(item, selections)

  const submit = (e) => {
    e.preventDefault()
    if (missing) return
    const line = buildLine(item, selections, editLine ? editLine.qty : 1, note)
    if (editLine) replaceLine(editLine.key, line)
    else addLine(line, item.name)
    closeCustomise()
  }

  return (
    <Dialog label={`Customise ${item.name}`} onClose={closeCustomise}>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
        <div className="sheet__head">
          <h2>{item.name}</h2>
          <Button size="sm" onClick={closeCustomise} aria-label="Close" style={{ width: 44, padding: 0, color: 'inherit', borderColor: 'currentColor' }}>x</Button>
        </div>
        <div className="sheet__body">
          {item.options.map((g) => (
            <fieldset key={g.id} className="field opt-group" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="label" style={{ marginBottom: 4 }}>{g.label}{g.required ? ', choose one' : ''}</legend>
              {g.choices.map((c) => (
                <label key={c.id} className="choice">
                  <span>
                    <input type="radio" name={g.id} checked={selections[g.id] === c.id} onChange={() => setSelections({ ...selections, [g.id]: c.id })} />
                    {c.label}
                  </span>
                  <span className="mono">{c.price === 0 ? 'Included' : `+ ${formatKES(c.price)}`}</span>
                </label>
              ))}
            </fieldset>
          ))}
          <div className="field">
            <label htmlFor="item-note">Note (optional)</label>
            <input id="item-note" type="text" maxLength={80} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Pilipili on the side" />
          </div>
        </div>
        <div className="sheet__foot">
          <Button type="submit" variant="primary" block style={{ justifyContent: 'space-between' }} disabled={missing}>
            <span>{editLine ? 'Update item' : 'Add to order'}</span>
            <span className="mono">{formatKES(price)}</span>
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
