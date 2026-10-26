import { HOURS } from '../config/site'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const toMinutes = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }

function nairobiNow(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Nairobi', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(date).map((p) => [p.type, p.value]),
  )
  return { day: DAYS.indexOf(parts.weekday), minutes: Number(parts.hour) * 60 + Number(parts.minute) }
}

function rangeFor(day) {
  const entry = HOURS.find((h) => h.days.includes(day))
  const [openText, closeText] = entry.time.split(' to ')
  return { open: toMinutes(openText), close: toMinutes(closeText), openText, closeText }
}

// Uses the sample hours in config and Nairobi time, wherever the visitor is.
export function openStatus(date = new Date()) {
  const { day, minutes } = nairobiNow(date)
  const today = rangeFor(day)
  if (minutes >= today.open && minutes < today.close) return { open: true, label: `Open now, until ${today.closeText}` }
  if (minutes < today.open) return { open: false, label: `Closed, opens ${today.openText}` }
  return { open: false, label: `Closed, opens tomorrow ${rangeFor((day + 1) % 7).openText}` }
}
