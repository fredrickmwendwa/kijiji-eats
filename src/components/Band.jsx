import { useInView } from '../hooks/useInView'

// A page section whose top rule draws itself in as it scrolls into view.
export default function Band({ className = '', children, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.04, rootMargin: '0px 0px -4% 0px' })
  return (
    <section ref={ref} className={`band${inView ? ' is-in' : ''} ${className}`.trim()} {...rest}>
      {children}
    </section>
  )
}
