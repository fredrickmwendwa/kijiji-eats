import { SITE } from '../config/site'
import { getItem } from '../data/menu'
import { describeSelections } from './cart'
import { formatKES } from './format'

export function buildOrderMessage({ lines, name, mode, note }) {
  const out = [`*${SITE.name} order*`, `Name: ${name.trim()}`, mode === 'dine-in' ? 'Dine in' : 'Collection', '']
  let total = 0
  for (const l of lines) {
    const item = getItem(l.itemId)
    const opts = describeSelections(item, l.selections)
    const sub = l.qty * l.unitPrice
    total += sub
    const label = opts ? `${item.name} (${opts})` : item.name
    const calc = l.qty > 1 ? ` (${l.qty} x ${l.unitPrice.toLocaleString('en-KE')})` : ''
    const itemNote = l.note ? ` [${l.note}]` : ''
    out.push(`${l.qty} x ${label}${itemNote}: ${formatKES(sub)}${calc}`)
  }
  out.push('', `*Total: ${formatKES(total)}*`)
  if (note && note.trim()) out.push(`Note: ${note.trim().slice(0, 200)}`)
  return out.join('\n')
}

export function whatsappUrl(text) {
  const number = SITE.WHATSAPP_NUMBER.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

export const paidMessage = ({ name, total }) =>
  `Hi ${SITE.name}, I have paid ${formatKES(total)} for order ${name.trim() || '[name]'} by M-Pesa. Code: `
