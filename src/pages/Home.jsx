import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { FEATURED_IDS, getItem } from '../data/menu'
import { SITE, hoursToday } from '../config/site'
import Img from '../components/Img'
import Button from '../components/Button'
import DishRow from '../components/DishRow'
import MapPanel from '../components/MapPanel'
import { Hours, Reviews } from '../components/Sections'

export default function Home() {
  usePageMeta('Kijiji Eats | Nyama choma, Nairobi', 'Goat, beef and chicken grilled over charcoal. See clear prices, build your order and send it on WhatsApp. Portfolio concept for a Nairobi nyama choma house.')
  const today = hoursToday()

  return (
    <div className="page container">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="label">Nyama choma house, Nairobi</p>
          <h1 id="hero-title">Meat by the half kilo. Priced in plain sight.</h1>
          <p className="lede">Goat, beef and chicken grilled over charcoal, with ugali, kachumbari and sukuma. Pick your cut, see your total, send it on WhatsApp.</p>
          <div className="btn-row">
            <Button as={Link} variant="primary" to="/menu">See the menu</Button>
            <Button as="a" href="#how">How ordering works</Button>
          </div>
        </div>
        <div className="hero__image media">
          <Img alt="Goat ribs on a board, placeholder for hero photograph" label="hero: goat ribs, overhead, ember grade" w={800} h={1000} dark loading="eager" />
        </div>
      </section>

      <dl className="facts" style={{ margin: 0 }}>
        <div><dt className="label">Today (sample hours)</dt><dd className="mono" style={{ margin: 0 }}>{today?.time}</dd></div>
        <div><dt className="label">Place (example)</dt><dd className="mono" style={{ margin: 0 }}>{SITE.ADDRESS}</dd></div>
        <div><dt className="label">Order</dt><dd className="mono" style={{ margin: 0 }}>WhatsApp, pay by M-Pesa</dd></div>
      </dl>

      <section className="band" aria-labelledby="featured-title">
        <div className="grid-2 grid-2--4-8">
          <div>
            <p className="label">Featured</p>
            <h2 id="featured-title">On the fire today</h2>
            <p className="muted">Sample prices. Every dish shows its portion and what it comes with.</p>
            <Button as={Link} to="/menu">Full menu</Button>
          </div>
          <ul>{FEATURED_IDS.map((id) => <DishRow key={id} item={getItem(id)} />)}</ul>
        </div>
      </section>

      <section className="band" id="how" aria-labelledby="how-title">
        <p className="label">How ordering works</p>
        <h2 id="how-title">Three steps. No account.</h2>
        <div className="steps-3">
          <div><span className="tally" aria-hidden="true">1 |</span><div><h3>Pick</h3><p>Add dishes to your order. The total updates as you go.</p></div></div>
          <div><span className="tally" aria-hidden="true">2 ||</span><div><h3>Send</h3><p>We open WhatsApp with your order written out. You press send.</p></div></div>
          <div><span className="tally" aria-hidden="true">3 |||</span><div><h3>Pay</h3><p>Pay by M-Pesa using the steps shown. We confirm on WhatsApp.</p></div></div>
        </div>
      </section>

      <section className="band" aria-labelledby="idea-title">
        <div className="grid-2 grid-2--5-7">
          <div className="media story-image"><Img alt="Cook at the grill, placeholder for story photograph" label="story: cook at the grill" w={800} h={600} /></div>
          <div>
            <p className="label">The idea</p>
            <h2 id="idea-title">Kijiji means village</h2>
            <p className="lede">A village keeps honest count: what is on the fire, what it weighs, what it costs. We cook that way. Charcoal, good cuts, a short menu and no surprises at the till.</p>
            <Button as={Link} to="/visit">Our story and visit</Button>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="reviews-title">
        <h2 id="reviews-title">What people say</h2>
        <Reviews limit={2} />
      </section>

      <section className="band" aria-labelledby="visit-title">
        <div className="grid-2 grid-2--5-7">
          <div>
            <p className="label">Visit (example details)</p>
            <h2 id="visit-title">Come hungry</h2>
            <Hours />
            <div style={{ marginTop: 16 }}><Button as="a" variant="primary" href={SITE.DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Get directions</Button></div>
          </div>
          <MapPanel />
        </div>
      </section>
    </div>
  )
}
