import { useEffect, useState } from 'react'
import Button from './Button'

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

export default function CopyButton({ text, label = 'Copy', copiedLabel = 'Copied', what, block = false, onResult }) {
  const [state, setState] = useState('idle')

  useEffect(() => {
    if (state !== 'copied') return undefined
    const t = setTimeout(() => setState('idle'), 2000)
    return () => clearTimeout(t)
  }, [state])

  const onClick = async () => {
    const ok = await copyText(text)
    setState(ok ? 'copied' : 'failed')
    onResult?.(ok)
  }

  return (
    <>
      <Button size="sm" block={block} onClick={onClick} aria-label={what ? `${label} ${what}` : undefined}>
        {state === 'copied' ? copiedLabel : label}
      </Button>
      <span className="sr-only" role="status">{state === 'copied' ? `Copied ${what || ''}` : ''}</span>
      {state === 'failed' && <span className="field-error" role="alert">Could not copy. Press and hold the text to copy it yourself.</span>}
    </>
  )
}
