import { describe, expect, it } from 'vitest'
import { buildLine, cartReducer, countItems, initialState, priceFor, sanitizeLines, totalOf } from './cart'
import { getItem } from '../data/menu'
import { buildOrderMessage, whatsappUrl } from './whatsapp'
import { SITE } from '../config/site'

const goat = getItem('goat-ribs')
const sukuma = getItem('sukuma')

describe('cart', () => {
  it('prices options as base plus deltas', () => {
    expect(priceFor(goat, { size: 'half', side: 'ugali' })).toBe(1400)
    expect(priceFor(goat, { size: 'kilo', side: 'chips' })).toBe(2800)
  })

  it('merges identical lines and keeps different options apart', () => {
    let s = cartReducer(initialState, { type: 'add', line: buildLine(goat, { size: 'half', side: 'ugali' }) })
    s = cartReducer(s, { type: 'add', line: buildLine(goat, { size: 'half', side: 'ugali' }) })
    s = cartReducer(s, { type: 'add', line: buildLine(goat, { size: 'kilo', side: 'ugali' }) })
    expect(s.lines).toHaveLength(2)
    expect(countItems(s.lines)).toBe(3)
    expect(totalOf(s.lines)).toBe(1400 * 2 + 2700)
  })

  it('removes a line when quantity reaches zero', () => {
    const line = buildLine(sukuma)
    let s = cartReducer(initialState, { type: 'add', line })
    s = cartReducer(s, { type: 'setQty', key: line.key, qty: 0 })
    expect(s.lines).toEqual([])
  })

  it('replaces a line when options are edited', () => {
    const a = buildLine(goat, { size: 'half', side: 'ugali' })
    let s = cartReducer(initialState, { type: 'add', line: a })
    s = cartReducer(s, { type: 'replace', oldKey: a.key, line: buildLine(goat, { size: 'kilo', side: 'ugali' }, a.qty) })
    expect(s.lines).toHaveLength(1)
    expect(s.lines[0].unitPrice).toBe(2700)
  })

  it('drops invalid saved lines', () => {
    expect(sanitizeLines([{ itemId: 'nope', qty: 1, unitPrice: 1, key: 'x' }, null, 'junk'])).toEqual([])
    expect(sanitizeLines('not an array')).toEqual([])
  })
})

describe('WhatsApp message', () => {
  const lines = [
    buildLine(goat, { size: 'half', side: 'ugali' }),
    buildLine(getItem('kuku-half'), {}, 2),
    buildLine(sukuma),
  ]

  it('lists items, quantities, subtotals, total and note', () => {
    const text = buildOrderMessage({ lines, name: ' Wanjiru ', mode: 'collection', note: 'Pilipili on the side' })
    expect(text).toContain('*Kijiji Eats order*')
    expect(text).toContain('Name: Wanjiru')
    expect(text).toContain('Collection')
    expect(text).toContain('1 x Goat ribs, grilled (Half kilo, Ugali): KES 1,400')
    expect(text).toContain('2 x Kuku choma, half: KES 1,900 (2 x 950)')
    expect(text).toContain('*Total: KES 3,500*')
    expect(text).toContain('Note: Pilipili on the side')
  })

  it('encodes the message for a wa.me link and never invents a number', () => {
    expect(SITE.WHATSAPP_NUMBER).toBe('')
    const url = whatsappUrl('Hi\n*Total: KES 1*')
    expect(url.startsWith('https://wa.me/?text=')).toBe(true)
    expect(url).toContain('%0A')
    expect(url).not.toContain('\n')
  })
})

describe('menu images', () => {
  it('every referenced dish image exists in public/images/dishes', async () => {
    const { MENU } = await import('../data/menu')
    const fs = await import('node:fs')
    const missing = MENU.filter((m) => m.image && !fs.existsSync(`public/images/dishes/${m.image}`))
    expect(missing).toEqual([])
  })
})
