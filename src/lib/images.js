// Placeholder images only. Each src is an inline SVG data URI labelled "PLACEHOLDER"
// so it is never mistaken for real photography. Swap for real files later.

export function placeholderSrc(label, w = 400, h = 300, dark = false) {
  const bg = dark ? '#3A2418' : '#E6E1D6'
  const fg = dark ? '#F4F2EE' : '#55534B'
  const bar = dark ? '#E8593F' : '#C9C6BB'
  const safe = String(label).replace(/[<>&"]/g, '')
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="100%" height="100%" fill="${bg}"/>` +
    `<g stroke="${bar}" stroke-width="4"><path d="M${w * 0.12} ${h * 0.2}V${h * 0.7}M${w * 0.2} ${h * 0.2}V${h * 0.7}M${w * 0.28} ${h * 0.2}V${h * 0.7}"/></g>` +
    `<text x="${w * 0.06}" y="${h * 0.92}" font-family="monospace" font-size="${Math.max(10, Math.round(w / 32))}" fill="${fg}">PLACEHOLDER: ${safe}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

// Path to a file in public/images, correct under any base path.
export const asset = (file) => `${import.meta.env.BASE_URL}images/${file}`
