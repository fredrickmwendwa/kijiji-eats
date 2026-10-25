import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import Header from './Header'
import Footer from './Footer'
import CartBar from './CartBar'
import RestoreBanner from './RestoreBanner'
import OrderSheet from './OrderSheet'
import CustomiseSheet from './CustomiseSheet'

export default function Layout() {
  const { sheet, customise, count, announcement } = useOrder()
  const { pathname } = useLocation()

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => {
    document.body.classList.toggle('has-cart-bar', count > 0)
    return () => document.body.classList.remove('has-cart-bar')
  }, [count])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <RestoreBanner />
      <main id="main" tabIndex={-1}><Outlet /></main>
      <Footer />
      <CartBar />
      <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
      {sheet.open && <OrderSheet />}
      {customise && <CustomiseSheet key={customise.editLine?.key || customise.item.id} />}
    </>
  )
}
