import { useMemo, useState } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'
import { CATEGORIES, MENU } from '../data/menu'
import DishRow from '../components/DishRow'
import Button from '../components/Button'

export default function Menu() {
  usePageMeta('Menu | Kijiji Eats', 'The Kijiji Eats menu: nyama choma, kuku, platters, sides and drinks with portions and prices in KES. Sample prices for a portfolio concept.')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CATEGORIES
      .filter((c) => category === 'all' || c.id === category)
      .map((c) => ({
        ...c,
        items: MENU.filter((m) => m.category === c.id && (!q || `${m.name} ${m.description}`.toLowerCase().includes(q))),
      }))
      .filter((c) => c.items.length)
  }, [category, query])

  return (
    <div className="page">
      <div className="container page-head">
        <p className="label">Sample prices in KES</p>
        <h1>The menu</h1>
        <div className="field menu-search">
          <label htmlFor="menu-search">Search the menu</label>
          <input id="menu-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try ribs or juice" autoComplete="off" />
        </div>
      </div>

      <div className="category-bar">
        <div className="category-bar__scroll" role="group" aria-label="Menu categories">
          {[{ id: 'all', name: 'All' }, ...CATEGORIES].map((c) => (
            <button key={c.id} type="button" className="chip" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>{c.name}</button>
          ))}
        </div>
      </div>

      <div className="container">
        <div role="status" className="sr-only">{sections.reduce((n, s) => n + s.items.length, 0)} dishes shown</div>
        {sections.length === 0 ? (
          <div className="menu-section state-box">
            <h2>Nothing for &quot;{query}&quot;</h2>
            <p className="muted" style={{ marginTop: 8 }}>We do not have that on the menu. Try a category instead.</p>
            <div className="btn-row" style={{ marginBottom: 12 }}>
              {CATEGORIES.slice(0, 3).map((c) => <button key={c.id} type="button" className="chip" aria-pressed="false" onClick={() => { setQuery(''); setCategory(c.id) }}>{c.name}</button>)}
            </div>
            <Button onClick={() => { setQuery(''); setCategory('all') }}>Clear search</Button>
          </div>
        ) : (
          sections.map((s) => (
            <section key={s.id} className="menu-section" aria-labelledby={`cat-${s.id}`}>
              <h2 id={`cat-${s.id}`}>{s.name}</h2>
              <ul className="dish-list">{s.items.map((item) => <DishRow key={item.id} item={item} />)}</ul>
            </section>
          ))
        )}
        <p className="label menu-note">Prices and portions are examples. Tell us about allergies in the order note or on WhatsApp.</p>
      </div>
    </div>
  )
}
