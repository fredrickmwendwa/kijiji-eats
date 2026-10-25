import { HOURS, SITE } from '../config/site'
import { FAQ, REVIEWS } from '../data/content'
import Button from './Button'

export function Hours() {
  const today = new Date().getDay()
  return (
    <ul className="rows" aria-label="Opening hours (sample)">
      {HOURS.map((h) => {
        const isToday = h.days.includes(today)
        return (
          <li key={h.label} className={isToday ? 'row--today' : undefined}>
            <span>{h.label}{isToday ? ' (today)' : ''}</span>
            <span className="mono">{h.time}</span>
          </li>
        )
      })}
    </ul>
  )
}

export function Faq() {
  return (
    <div className="faq">
      {FAQ.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <p className="label" style={{ marginTop: 12 }}>Answers are samples for the portfolio concept.</p>
    </div>
  )
}

export function Reviews({ limit = 3, showRealSlot = false }) {
  return (
    <>
      <p className="label">Sample content, not real customers</p>
      <div className="review-grid" style={{ marginTop: 16 }}>
        {REVIEWS.slice(0, limit).map((text) => (
          <figure key={text} className="review" style={{ margin: 0 }}>
            <blockquote style={{ margin: 0 }}><p>&quot;{text}&quot;</p></blockquote>
            <figcaption className="label">Sample reviewer, sample date</figcaption>
          </figure>
        ))}
      </div>
      {showRealSlot && (
        <div className="real-data">
          <div>
            <div className="label">When real data is connected</div>
            <p className="mono">[RATING] from [COUNT] Google reviews</p>
            <p className="muted" style={{ fontSize: '0.875rem' }}>Shown only with a real source link. Until then the sample label stays on.</p>
          </div>
          {SITE.REVIEW_URL
            ? <Button as="a" href={SITE.REVIEW_URL} target="_blank" rel="noopener noreferrer">Read reviews on Google</Button>
            : <Button as="span" aria-disabled="true" role="link">Read reviews on Google [REVIEW_URL]</Button>}
        </div>
      )}
    </>
  )
}
