import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

window.scrollTo = vi.fn()
// Tests run with reduced motion so animated numbers settle immediately.
window.matchMedia = (query) => ({ matches: query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  document.body.className = ''
})
