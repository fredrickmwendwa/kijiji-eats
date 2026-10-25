import { Link } from 'react-router-dom'
import { SITE } from '../config/site'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="site-footer on-ink">
      <div className="container">
        <div>
          <Logo onInk />
          <p style={{ marginTop: 12 }}>Fictional restaurant for a portfolio project.</p>
        </div>
        <div>
          <div className="label">Pages</div>
          <ul style={{ marginTop: 8 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/visit">Visit</Link></li>
          </ul>
        </div>
        <div>
          <div className="label">Contact (placeholder)</div>
          <p style={{ marginTop: 8 }}>WhatsApp: {SITE.WHATSAPP_DISPLAY}<br />Pay: [TILL OR PAYBILL]<br />{SITE.ADDRESS} {SITE.ADDRESS_NOTE}</p>
        </div>
      </div>
    </footer>
  )
}
