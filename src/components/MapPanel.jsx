import { SITE } from '../config/site'
import Button from './Button'
import CopyButton from './CopyButton'

export default function MapPanel() {
  if (SITE.MAP_EMBED_URL) {
    return (
      <div>
        <iframe title="Map of the restaurant location" src={SITE.MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0, width: '100%', minHeight: 360 }} />
        <p className="label" style={{ marginTop: 8 }}>Map not loading? <a href={SITE.DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
      </div>
    )
  }
  return (
    <div className="map-panel" role="group" aria-label="Map placeholder">
      <h3>Map placeholder</h3>
      <p>The Google Maps embed appears here once MAP_EMBED_URL is set. Until then, use the links below.</p>
      <p className="mono">{SITE.ADDRESS} <span className="label">{SITE.ADDRESS_NOTE}</span></p>
      <div className="btn-row">
        <Button as="a" variant="primary" href={SITE.DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Open in Google Maps</Button>
        <CopyButton text={SITE.ADDRESS} label="Copy address" what="address" />
      </div>
    </div>
  )
}
