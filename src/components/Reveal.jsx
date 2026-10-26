import { useInView } from '../hooks/useInView'

// Fades or wipes content in once, as it scrolls into view. Variants: up, fade, wipe.
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag ref={ref} className={`reveal reveal--${variant}${inView ? ' is-in' : ''} ${className}`.trim()} style={{ '--delay': `${delay}ms`, ...style }} {...rest}>
      {variant === 'wipe' ? <div className="reveal__clip">{children}</div> : children}
    </Tag>
  )
}
