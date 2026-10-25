import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import Button from '../components/Button'

export default function NotFound() {
  usePageMeta('Page not found | Kijiji Eats', 'This page does not exist. Go to the menu, home or visit page.')
  return (
    <div className="page container page-head" style={{ paddingBottom: 48 }}>
      <p className="label">Error 404</p>
      <h1>Not on the menu</h1>
      <p className="lede" style={{ marginTop: 16 }}>We could not find that page. Try one of these.</p>
      <div className="btn-row" style={{ maxWidth: 360, flexDirection: 'column' }}>
        <Button as={Link} variant="primary" to="/menu">See the menu</Button>
        <Button as={Link} to="/">Home</Button>
        <Button as={Link} to="/visit">Visit us</Button>
      </div>
    </div>
  )
}
