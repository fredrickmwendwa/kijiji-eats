import { useState } from 'react'
import { SITE } from '../config/site'
import { formatKES } from '../lib/format'
import CopyButton from './CopyButton'

function Detail({ label, value, copy, what }) {
  return (
    <div className="detail">
      <div>
        <div className="label">{label}</div>
        <div className="detail__value">{value}</div>
      </div>
      <CopyButton text={copy ?? value} what={what} />
    </div>
  )
}

// Payment GUIDANCE only. This never takes or verifies payment.
export default function PaymentPanel({ amount, accountName }) {
  const methods = SITE.PAYMENT_METHODS
  const [method, setMethod] = useState(methods[0])
  const amountText = amount ? formatKES(amount) : 'your order total'

  return (
    <div>
      <div className="notice"><strong>Instructions only.</strong> This page cannot see your payment. We confirm it on WhatsApp.</div>

      {methods.length > 1 && (
        <div style={{ marginBottom: 12 }}>
          <div className="label" style={{ marginBottom: 6 }}>Choose how to pay</div>
          <div className="segmented" role="group" aria-label="Payment method">
            {methods.map((m) => (
              <button key={m} type="button" aria-pressed={method === m} onClick={() => setMethod(m)}>
                {m === 'till' ? 'Till' : 'Paybill'}
              </button>
            ))}
          </div>
        </div>
      )}

      {amount ? <Detail label="Pay exactly" value={formatKES(amount)} copy={String(amount)} what="amount" /> : null}

      {method === 'till' ? (
        <>
          <Detail label="Till number" value={SITE.TILL_NUMBER || SITE.TILL_DISPLAY} what="Till number" />
          <ol className="steps" style={{ marginTop: 12 }}>
            <li>Open M-Pesa and choose Lipa na M-Pesa, then Buy Goods and Services.</li>
            <li>Enter the Till number above.</li>
            <li>Enter the amount: {amountText}.</li>
            <li>Check the name shown is {SITE.MERCHANT_NAME} before you enter your PIN.</li>
            <li>Enter your M-Pesa PIN and confirm.</li>
          </ol>
        </>
      ) : (
        <>
          <Detail label="Business number" value={SITE.PAYBILL_NUMBER || SITE.PAYBILL_DISPLAY} what="business number" />
          <Detail label="Account number" value={accountName || 'Your order name'} what="account name" />
          <ol className="steps" style={{ marginTop: 12 }}>
            <li>Open M-Pesa and choose Lipa na M-Pesa, then Pay Bill.</li>
            <li>Enter the Business number above.</li>
            <li>Enter the account number: your order name.</li>
            <li>Enter the amount: {amountText}.</li>
            <li>Enter your M-Pesa PIN and confirm.</li>
          </ol>
        </>
      )}
      <p style={{ marginTop: 12, fontSize: '0.875rem' }}><strong>Never share your PIN.</strong> We will never ask for it.</p>
      <p className="muted" style={{ fontSize: '0.75rem' }}>Menu names can differ by phone. Follow the prompts on your screen. Payment details shown here are placeholders until the owner confirms them.</p>
    </div>
  )
}
