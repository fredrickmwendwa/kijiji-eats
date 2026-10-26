import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { FEATURED_IDS, getItem } from '../data/menu'
import { SITE } from '../config/site'
import { asset } from '../lib/images'
import Img from '../components/Img'
import Button from '../components/Button'
import DishRow from '../components/DishRow'
import MapPanel from '../components/MapPanel'
import Band from '../components/Band'
import Reveal from '../components/Reveal'
import Ticker from '../components/Ticker'
import OpenNow from '../components/OpenNow'
import TallyDraw from '../components/TallyDraw'
import { Hours, Reviews } from '../components/Sections'

const STEPS = [
  ['Pick', 'Add dishes to your order. The total updates as you go.'],
  ['Send', 'We open WhatsApp with your order written out. You press send.'],
  ['Pay', 'Pay by M-Pesa using the steps shown. We confirm on WhatsApp.'],
]

export default function Home() {
  usePageMeta('Kijiji Eats | Nyama choma, Nairobi', 'Goat, beef and chicken grilled over charcoal. See clear prices, build your order and send it on WhatsApp. Portfolio concept for a Nairobi nyama choma house.')

  return (
    <div className="page">
      <section className="hero on-ink" aria-labelledby="hero-title">
        <div className="hero__image">
          <Img alt="A bone-in cut of meat searing on a grill beside open flame" label="hero" src={asset('hero.jpg')} w={960} h={1200} dark loading="eager" />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__top">
            <OpenNow />
            <TallyDraw count={4} strike auto onInk size={56} className="hero__tally" />
          </div>
          <div className="hero__copy">
            <p className="label hero__fade" style={{ '--i': 0 }}>Nyama choma house, Nairobi</p>
            <h1 id="hero-title">
              <span className="line"><span style={{ '--i': 0 }}>Honest</span></span>{' '}
              <span className="line"><span style={{ '--i': 1 }}>nyama</span></span>{' '}
              <span className="line"><span style={{ '--i': 2 }}>choma</span></span>
            </h1>
            <p className="lede hero__fade" style={{ '--i': 3 }}>Meat by the half kilo, priced in plain sight. Pick your cut, see your total, send it on WhatsApp.</p>
            <div className="btn-row hero__fade" style={{ '--i': 4 }}>
              <Button as={Link} variant="primary" to="/menu">See the menu</Button>
              <Button as="a" className="hero__secondary" href="#how">How ordering works</Button>
            </div>
            <dl className="hero__facts hero__fade" style={{ '--i': 5 }}>
              <div><dt className="label">Place (example)</dt><dd className="mono">{SITE.ADDRESS}</dd></div>
              <div><dt className="label">Order</dt><dd className="mono">WhatsApp, pay by <span style={{ whiteSpace: 'nowrap' }}>M-Pesa</span></dd></div>
            </dl>
          </div>
        </div>
      </section>

      <Ticker />

      <div className="container">
        <Band aria-labelledby="featured-title">
          <div className="grid-2 grid-2--4-8">
            <div className="sticky-head">
              <p className="label">Featured</p>
              <h2 id="featured-title">On the fire today</h2>
              <p className="muted">Sample prices. Every dish shows its portion and what it comes with.</p>
              <Button as={Link} to="/menu">Full menu</Button>
            </div>
            <ul>{FEATURED_IDS.map((id, i) => <DishRow key={id} item={getItem(id)} index={i} />)}</ul>
          </div>
        </Band>

        <Band id="how" aria-labelledby="how-title">
          <p className="label">How ordering works</p>
          <h2 id="how-title">Three steps. No account.</h2>
          <div className="steps-3">
            {STEPS.map(([title, text], i) => (
              <Reveal key={title} delay={i * 120} className="step">
                <TallyDraw count={i + 1} size={40} />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </Band>
      </div>

      <section className="story" aria-labelledby="idea-title">
        <div className="container grid-2 grid-2--5-7">
          <div className="story__frame">
            <Reveal variant="wipe" className="media story-image">
              <Img alt="Chicken legs grilling over charcoal in rising smoke" label="story" src={asset('story.jpg')} w={1200} h={900} />
            </Reveal>
          </div>
          <Reveal className="story__text">
            <p className="label">The idea</p>
            <h2 id="idea-title">Kijiji means village</h2>
            <p className="lede">A village keeps honest count: what is on the fire, what it weighs, what it costs. We cook that way. Charcoal, good cuts, a short menu and no surprises at the till.</p>
            <Button as={Link} to="/visit">Our story and visit</Button>
          </Reveal>
        </div>
      </section>

      <div className="container">
        <Band aria-labelledby="reviews-title">
          <h2 id="reviews-title">What people say</h2>
          <Reviews limit={2} />
        </Band>

        <Band aria-labelledby="visit-title">
          <div className="grid-2 grid-2--5-7">
            <Reveal>
              <p className="label">Visit (example details)</p>
              <h2 id="visit-title">Come hungry</h2>
              <Hours />
              <div style={{ marginTop: 16 }}><Button as="a" variant="primary" href={SITE.DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Get directions</Button></div>
            </Reveal>
            <Reveal delay={120}><MapPanel /></Reveal>
          </div>
        </Band>
      </div>
    </div>
  )
}
