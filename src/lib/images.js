// Placeholder images only. Each src is an inline SVG data URI labelled "PLACEHOLDER"
// so it is never mistaken for real photography. Swap for real files later.

export function placeholderSrc(label, w = 400, h = 300, dark = false) {
  const bg = dark ? '#3A2418' : '#E6E1D6'
  const bar = dark ? '#E8593F' : '#C8321E'
  const strike = dark ? '#F4F2EE' : '#14130F'
  const safe = String(label).replace(/[<>&"]/g, '')
  const u = Math.min(w, h) / 100
  const cx = w / 2, cy = h / 2
  const xs = [-15, -5, 5, 15].map((d) => cx + d * u)
  const bars = xs.map((x) => `<path d="M${x} ${cy - 16 * u}V${cy + 16 * u}"/>`).join('')
  const text = w >= 500 ? `<text x="${w * 0.05}" y="${h * 0.94}" font-family="monospace" font-size="${Math.max(11, Math.round(w / 40))}" fill="${dark ? '#F4F2EE' : '#55534B'}">PLACEHOLDER: ${safe}</text>` : ''
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="${bg}"/><g stroke="${bar}" stroke-width="${3.2 * u}" stroke-linecap="square">${bars}</g><path d="M${cx - 22 * u} ${cy + 11 * u}L${cx + 22 * u} ${cy - 11 * u}" stroke="${strike}" stroke-width="${2.6 * u}"/>${text}</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// Path to a file in public/images, correct under any base path.
export const asset = (file) => `${import.meta.env.BASE_URL}images/${file}`
