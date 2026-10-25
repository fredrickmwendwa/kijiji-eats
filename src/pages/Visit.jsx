import { usePageMeta } from '../hooks/usePageMeta'
import { SITE } from '../config/site'
import Img from '../components/Img'
import Button from '../components/Button'
import MapPanel from '../components/MapPanel'
import PaymentPanel from '../components/PaymentPanel'
import { Faq, Hours, Reviews } from '../components/Sections'
import { whatsappUrl } from '../lib/whatsapp'

export default function Visit() {
  usePageMeta('Story and Visit | Kijiji Eats', 'The idea behind Kijiji Eats, where to find us, opening hours, how to pay by M-Pesa, and answers to common questions. Example details for a portfolio concept.')

  return (
    <div className="page container">
      <header className="page-head">
        <p className="label">Story and visit</p>
        <h1>Come hungry</h1>
      </header>

      <section className="band" aria-labelledby="story-title">
        <div className="grid-2">
          <div>
            <p className="label">Our story</p>
            <h2 id="story-title">Kijiji means village</h2>
            <p className="lede">A village keeps honest count: what is on the fire, what it weighs, what it costs. Kijiji Eats cooks that way.</p>
            <p>We grill goat, beef and chicken over charcoal and serve it with ugali, kachumbari and sukuma wiki. The menu is short on purpose, and every dish shows its portion and price before you order.</p>
          </div>
          <div className="media story-image"><Img alt="The grill with hands and smoke, placeholder for story photograph" label="story: the grill, hands and smoke" w={800} h={600} /></div>
        </div>
      </section>

      <section className="band" aria-labelledby="find-title">
        <p className="label">Find us (example details)</p>
        <h2 id="find-title">Location and hours</h2>
        <div className="grid-2">
          <div>
            <ul className="rows">
              <li><span className="label">Address</span><span style={{ textAlign: 'right' }}>{SITE.ADDRESS}<br /><span className="label">{SITE.ADDRESS_NOTE}</span></span></li>
              <li><span className="label">WhatsApp</span><span className="mono">{SITE.WHATSAPP_DISPLAY}</span></li>
              <li><span className="label">Phone</span><span className="mono">{SITE.PHONE_DISPLAY}</span></li>
            </ul>
            <div className="btn-row visit-actions" style={{ margin: '16px 0 24px' }}>
              <Button as="a" variant="primary" href={SITE.DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Get directions</Button>
              <Button as="a" href={whatsappUrl('Hi Kijiji Eats, ')} target="_blank" rel="noopener noreferrer">Message on WhatsApp</Button>
            </div>
            <h3 style={{ marginBottom: 8 }}>Opening hours (sample)</h3>
            <Hours />
          </div>
          <MapPanel />
        </div>
      </section>

      <section className="band" aria-labelledby="pay-title" id="pay">
        <p className="label">How to pay</p>
        <h2 id="pay-title">Order first, then pay</h2>
        <div className="grid-2">
          <div>
            <p>Send your order on WhatsApp, then pay by M-Pesa using the steps here. We confirm payment on WhatsApp.</p>
          </div>
          <PaymentPanel />
        </div>
      </section>

      <section className="band" aria-labelledby="faq-title">
        <p className="label">Questions</p>
        <h2 id="faq-title">Good to know</h2>
        <div style={{ maxWidth: 760 }}><Faq /></div>
      </section>

      <section className="band" aria-labelledby="reviews-title">
        <h2 id="reviews-title">What people say</h2>
        <Reviews showRealSlot />
      </section>
    </div>
  )
}
