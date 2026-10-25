export default function Button({ as: Tag = 'button', variant = 'outline', size, block, className = '', type, ...props }) {
  const cls = ['btn', `btn--${variant}`, size === 'sm' && 'btn--sm', block && 'btn--block', className].filter(Boolean).join(' ')
  const extra = Tag === 'button' ? { type: type || 'button' } : {}
  return <Tag className={cls} {...extra} {...props} />
}
