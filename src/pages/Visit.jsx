import { usePageMeta } from '../hooks/usePageMeta'
import { SITE } from '../config/site'
import { asset } from '../lib/images'
import Img from '../components/Img'
import Button from '../components/Button'
import MapPanel from '../components/MapPanel'
import PaymentPanel from '../components/PaymentPanel'
import PageHero from '../components/PageHero'
import OpenNow from '../components/OpenNow'
import Band from '../components/Band'
import Reveal from '../components/Reveal'
import { Faq, Hours, Reviews } from '../components/Sections'
import { whatsappUrl } from '../lib/whatsapp'

export default function Visit() {
  usePageMeta('Story and Visit | Kijiji Eats', 'The idea behind Kijiji Eats, where to find us, opening hours, how to pay by M-Pesa, and answers to common questions. Example details for a portfolio concept.')

  return (
    <div className="page">
      <PageHero label="Story and visit" lines={['Come', 'hungry']}>
        <div className="page-hero__tools">
          <OpenNow />
          <div className="btn-row">
            <Button as="a" variant="primary" href={SITE.DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Get directions</Button>
            <Button as="a" href={whatsappUrl('Hi Kijiji Eats, ')} target="_blank" rel="noopener noreferrer">Message on WhatsApp</Button>
          </div>
        </div>
      </PageHero>

      <section className="story" aria-labelledby="story-title">
        <div className="container grid-2">
          <Reveal>
            <p className="label">Our story</p>
            <h2 id="story-title">Kijiji means village</h2>
            <p className="lede">A village keeps honest count: what is on the fire, what it weighs, what it costs. Kijiji Eats cooks that way.</p>
            <p>We grill goat, beef and chicken over charcoal and serve it with ugali, kachumbari and sukuma wiki. The menu is short on purpose, and every dish shows its portion and price before you order.</p>
          </Reveal>
          <div className="story__frame">
            <Reveal variant="wipe" className="media story-image">
              <Img alt="Chicken legs grilling over charcoal in rising smoke" label="story" src={asset('story.jpg')} w={1200} h={900} />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="container">
        <Band aria-labelledby="find-title">
          <p className="label">Find us (example details)</p>
          <h2 id="find-title">Location and hours</h2>
          <div className="grid-2">
            <Reveal>
              <ul className="rows">
                <li><span className="label">Address</span><span style={{ textAlign: 'right' }}>{SITE.ADDRESS}<br /><span className="label">{SITE.ADDRESS_NOTE}</span></span></li>
                <li><span className="label">WhatsApp</span><span className="mono">{SITE.WHATSAPP_DISPLAY}</span></li>
                <li><span className="label">Phone</span><span className="mono">{SITE.PHONE_DISPLAY}</span></li>
              </ul>
              <h3 style={{ margin: '24px 0 8px' }}>Opening hours (sample)</h3>
              <Hours />
            </Reveal>
            <Reveal delay={120}><MapPanel /></Reveal>
          </div>
        </Band>

        <Band aria-labelledby="pay-title" id="pay">
          <p className="label">How to pay</p>
          <h2 id="pay-title">Order first, then pay</h2>
          <div className="grid-2">
            <Reveal><p className="lede">Send your order on WhatsApp, then pay by M-Pesa using the steps here. We confirm payment on WhatsApp.</p></Reveal>
            <Reveal delay={120}><PaymentPanel /></Reveal>
          </div>
        </Band>

        <Band aria-labelledby="faq-title">
          <p className="label">Questions</p>
          <h2 id="faq-title">Good to know</h2>
          <div style={{ maxWidth: 760 }}><Faq /></div>
        </Band>

        <Band aria-labelledby="reviews-title">
          <h2 id="reviews-title">What people say</h2>
          <Reviews showRealSlot />
        </Band>
      </div>
    </div>
  )
}
