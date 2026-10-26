export default function PageHero({ label, lines, children }) {
  return (
    <header className="page-hero on-ink">
      <div className="container page-hero__inner">
        <p className="label">{label}</p>
        <h1>
          {lines.map((line, i) => (
            <span key={line}>
              <span className="line"><span style={{ '--i': i }}>{line}</span></span>{i < lines.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        {children}
      </div>
    </header>
  )
}
