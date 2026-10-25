import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import Logo, { LogoMark } from './Logo'
import Button from './Button'
import Dialog from './Dialog'

const LINKS = [['/', 'Home'], ['/menu', 'Menu'], ['/visit', 'Visit']]

export default function Header() {
  const { count, openSheet } = useOrder()
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setNavOpen(false), [pathname])

  return (
    <>
    <header className="site-header">
      <div className="container site-header__bar">
        <Logo />
        <nav className="nav-desktop" aria-label="Main">
          {LINKS.map(([to, label]) => <NavLink key={to} to={to} end>{label}</NavLink>)}
        </nav>
        <div className="header-actions">
          <Button size="sm" onClick={() => openSheet('review')} aria-label={`Open order, ${count} items`}>Order ({count})</Button>
          <Button size="sm" className="nav-toggle" aria-expanded={navOpen} aria-controls="mobile-nav" aria-label="Open navigation" onClick={() => setNavOpen(true)} style={{ width: 44, padding: 0 }}>=</Button>
        </div>
      </div>
    </header>
      {navOpen && (
      <Dialog label="Main navigation" onClose={() => setNavOpen(false)} className="mobile-nav" scrim={false}>
        <div className="mobile-nav__bar on-ink">
          <span className="logo" style={{ color: 'inherit' }}><LogoMark onInk /> Kijiji</span>
          <Button size="sm" aria-expanded="true" aria-controls="mobile-nav" onClick={() => setNavOpen(false)}>Close</Button>
        </div>
        <nav id="mobile-nav" aria-label="Main">
          {LINKS.map(([to, label]) => <NavLink key={to} to={to} end>{label}</NavLink>)}
          <button type="button" className="nav-order" onClick={() => { setNavOpen(false); openSheet('review') }}>Order ({count})</button>
          <div className="mobile-nav__foot">
            <Button as="a" block href="https://wa.me/" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</Button>
          </div>
        </nav>
      </Dialog>
    )}
    </>
  )
}
