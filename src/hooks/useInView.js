import { useEffect, useRef, useState } from 'react'

// True once the element has scrolled into view. Without IntersectionObserver
// (old browsers, tests) content is simply shown, never hidden.
export function useInView({ threshold = 0.1, rootMargin = '0px 0px -4% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return undefined
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold, rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [inView, threshold, rootMargin])

  return [ref, inView]
}
