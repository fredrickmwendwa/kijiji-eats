import { useState } from 'react'
import { placeholderSrc } from '../lib/images'

// Every image is a labelled placeholder until real photography is supplied.
// Pass `src` to use a real file. If it fails to load, the placeholder shows instead of a broken icon.
export default function Img({ alt, label, w = 400, h = 300, dark = false, src, loading = 'lazy' }) {
  const fallback = placeholderSrc(label || alt, w, h, dark)
  const [current, setCurrent] = useState(src || fallback)
  return (
    <img
      src={current}
      alt={alt}
      width={w}
      height={h}
      loading={loading}
      decoding="async"
      onError={() => current !== fallback && setCurrent(fallback)}
    />
  )
}
