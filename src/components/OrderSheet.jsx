import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import { getItem } from '../data/menu'
import { describeSelections } from '../lib/cart'
import { formatKES } from '../lib/format'
import { buildOrderMessage, paidMessage, whatsappUrl } from '../lib/whatsapp'
import { SITE } from '../config/site'
import Dialog from './Dialog'
import Button from './Button'
import CopyButton from './CopyButton'
import PaymentPanel from './PaymentPanel'
import AnimatedNumber from './AnimatedNumber'

const TITLES = { review: 'Your order', handoff: 'Order ready', pay: 'Pay with M-Pesa' }

function ReviewStep({ onSent }) {
  const { lines, total, details, setDetails, setQty, removeLine, openCustomise, closeSheet, clear } = useOrder()
  const [error, setError] = useState('')
  const alertRef = useRef(null)
  const empty = lines.length === 0

  const send = () => {
    if (!details.name.trim()) {
      setError('Add your name to continue.')
      setTimeout(() => alertRef.current?.focus(), 0)
      return
    }
    setError('')
    const text = buildOrderMessage({ lines, ...details })
    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer')
    onSent(text)
  }

  if (empty) {
    return (
      <>
        <div className="sheet__body">
          <h3 style={{ fontSize: '2rem' }}>Nothing here yet</h3>
          <p className="muted" style={{ marginTop: 8 }}>Add a dish from the menu and it will show up here with your total.</p>
          <Button as={Link} to="/menu" block onClick={closeSheet}>Browse the menu</Button>
        </div>
        <div className="sheet__foot">
          <Button block disabled aria-describedby="why-disabled">Send on WhatsApp</Button>
          <p className="small" id="why-disabled">Add at least one item to send an order.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="sheet__body">
        {error && (
          <div ref={alertRef} tabIndex={-1} role="alert" className="notice notice--error">Check one thing: {error}</div>
        )}
        <ul>
          {lines.map((l, idx) => {
            const item = getItem(l.itemId)
            const opts = describeSelections(item, l.selections)
            return (
              <li key={l.key} className="order-line" style={{ '--i': idx }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  {(opts || l.note) && <div className="order-line__opts">{[opts, l.note].filter(Boolean).join('. ')}</div>}
                </div>
                <div className="mono">{formatKES(l.qty * l.unitPrice)}</div>
                <div className="stepper" role="group" aria-label={`Quantity of ${item.name}`}>
                  <button type="button" aria-label={`Decrease quantity of ${item.name}`} onClick={() => setQty(l.key, l.qty - 1)}>-</button>
                  <output aria-live="polite">{l.qty}</output>
                  <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => setQty(l.key, l.qty + 1)}>+</button>
                </div>
                <div className="order-line__actions">
                  {item.options && <button type="button" className="link-btn" onClick={() => openCustomise(item, l)}>Edit<span className="sr-only"> {item.name}</span></button>}
                  <button type="button" className="link-btn" onClick={() => removeLine(l.key, item.name)}>Remove<span className="sr-only"> {item.name}</span></button>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="order-total">
          <span className="label">Total</span>
          <output><AnimatedNumber value={total} /></output>
        </div>

        <div className="field">
          <label htmlFor="order-name">Name for the order</label>
          <input id="order-name" type="text" autoComplete="given-name" value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            aria-invalid={error ? 'true' : undefined} aria-describedby={error ? 'name-error' : undefined} placeholder="Wanjiru" />
          {error && <p className="field-error" id="name-error">Error: enter your name so we can find your order</p>}
        </div>
        <div className="field">
          <fieldset>
            <legend>Collection or dine in</legend>
            {[['collection', 'Collection'], ['dine-in', 'Dine in']].map(([v, l]) => (
              <label key={v} className="choice" style={{ borderTop: 0, minHeight: 44 }}>
                <span><input type="radio" name="mode" checked={details.mode === v} onChange={() => setDetails({ ...details, mode: v })} />{l}</span>
              </label>
            ))}
          </fieldset>
        </div>
        <div className="field">
          <label htmlFor="order-note">Note (optional)</label>
          <input id="order-note" type="text" maxLength={200} value={details.note} onChange={(e) => setDetails({ ...details, note: e.target.value })} placeholder="Pilipili on the side" />
        </div>
        <button type="button" className="link-btn" style={{ marginTop: 8 }} onClick={clear}>Clear order</button>
      </div>
      <div className="sheet__foot">
        <Button variant="primary" block onClick={send}>Send order on WhatsApp</Button>
        <p className="small">This opens WhatsApp with your order written out. Your order is not confirmed until the restaurant replies.</p>
        <Button as={Link} variant="outline" size="sm" to="/menu" onClick={closeSheet}>Keep browsing the menu</Button>
      </div>
    </>
  )
}

function HandoffStep({ message, onBack, onPay }) {
  const url = whatsappUrl(message)
  return (
    <>
      <div className="sheet__body">
        <h3 style={{ fontSize: '2rem' }}>Opening WhatsApp</h3>
        <p style={{ marginTop: 8 }}>Your order is written out and ready. <strong>Press send in WhatsApp to place it.</strong> It is not confirmed until the restaurant replies.</p>
        {!SITE.WHATSAPP_NUMBER && (
          <div className="notice notice--sand">Demo note: no WhatsApp number is set yet (WHATSAPP_NUMBER in src/config/site.js). WhatsApp will ask you to choose a chat.</div>
        )}
        <div className="label" style={{ margin: '16px 0 6px' }}>Message prepared</div>
        <pre className="preview" style={{ margin: 0 }}>{message}</pre>
        <div style={{ marginTop: 12 }}><CopyButton text={message} label="Copy message" what="order message" block /></div>
      </div>
      <div className="sheet__foot">
        <Button as="a" variant="primary" block href={url} target="_blank" rel="noopener noreferrer">Open WhatsApp again</Button>
        <Button block style={{ marginTop: 8 }} onClick={onPay}>How to pay with M-Pesa</Button>
        <button type="button" className="link-btn" onClick={onBack}>Back to my order</button>
      </div>
    </>
  )
}

function PayStep({ onBack }) {
  const { total, details } = useOrder()
  const url = whatsappUrl(paidMessage({ name: details.name, total }))
  return (
    <>
      <div className="sheet__body"><PaymentPanel amount={total} accountName={details.name.trim()} /></div>
      <div className="sheet__foot">
        <Button as="a" variant="primary" block href={url} target="_blank" rel="noopener noreferrer">Tell us you have paid on WhatsApp</Button>
        <p className="small">Opens WhatsApp with a message ready. Paste your M-Pesa confirmation message or code before sending.</p>
        <button type="button" className="link-btn" onClick={onBack}>Back to my order</button>
      </div>
    </>
  )
}

export default function OrderSheet() {
  const { sheet, setStep, closeSheet, lines } = useOrder()
  const [message, setMessage] = useState('')
  const step = lines.length === 0 ? 'review' : sheet.step
  const stepRef = useRef(null)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    stepRef.current?.focus()
  }, [step])

  return (
    <Dialog label={TITLES[step]} onClose={closeSheet}>
      <div className="sheet__head on-ink">
        <h2>{TITLES[step]}</h2>
        <Button size="sm" onClick={closeSheet} aria-label="Close order" style={{ width: 44, padding: 0 }}>x</Button>
      </div>
      <div key={step} ref={stepRef} tabIndex={-1} className="sheet-step">
        {step === 'review' && <ReviewStep onSent={(text) => { setMessage(text); setStep('handoff') }} />}
        {step === 'handoff' && <HandoffStep message={message} onBack={() => setStep('review')} onPay={() => setStep('pay')} />}
        {step === 'pay' && <PayStep onBack={() => setStep('review')} />}
      </div>
    </Dialog>
  )
}
