// Everything the owner must confirm lives here. Nothing below is real business data.
// Replace each PLACEHOLDER before going live.

export const SITE = {
  name: 'Kijiji Eats',
  tagline: 'Meat by the half kilo. Priced in plain sight.',

  // International format digits only, for example 2547XXXXXXXX. Left empty on purpose.
  // While empty, the WhatsApp link opens WhatsApp so the customer can pick a chat.
  WHATSAPP_NUMBER: '',
  WHATSAPP_DISPLAY: '[WHATSAPP_NUMBER]',
  PHONE_DISPLAY: '[PHONE_NUMBER]',

  // 'till', 'paybill' or both. One method hides the selector.
  PAYMENT_METHODS: ['till', 'paybill'],
  TILL_NUMBER: '',
  TILL_DISPLAY: '[TILL_NUMBER]',
  PAYBILL_NUMBER: '',
  PAYBILL_DISPLAY: '[PAYBILL_NUMBER]',
  MERCHANT_NAME: 'Kijiji Eats [PLACEHOLDER]',

  // Example location only.
  ADDRESS: 'Example Road, Nairobi',
  ADDRESS_NOTE: '[EXAMPLE ADDRESS]',
  MAP_EMBED_URL: '',
  DIRECTIONS_URL: 'https://www.google.com/maps/search/?api=1&query=Example+Road+Nairobi',

  REVIEW_URL: '',
}

// Sample opening hours. days: 0 = Sunday.
export const HOURS = [
  { label: 'Monday to Thursday', days: [1, 2, 3, 4], time: '11:00 to 21:00' },
  { label: 'Friday', days: [5], time: '11:00 to 23:00' },
  { label: 'Saturday', days: [6], time: '11:00 to 23:00' },
  { label: 'Sunday', days: [0], time: '11:00 to 21:00' },
]

export const hoursToday = (date = new Date()) =>
  HOURS.find((h) => h.days.includes(date.getDay()))
