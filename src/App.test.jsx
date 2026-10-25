import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { OrderProvider } from './context/OrderContext'

const renderAt = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <OrderProvider><App /></OrderProvider>
    </MemoryRouter>,
  )

describe('routes', () => {
  it.each([
    ['/', /Meat by the half kilo/i],
    ['/menu', /The menu/i],
    ['/visit', /Come hungry/i],
    ['/does-not-exist', /Not on the menu/i],
  ])('renders %s with one h1', (path, heading) => {
    renderAt(path)
    const h1 = screen.getAllByRole('heading', { level: 1 })
    expect(h1).toHaveLength(1)
    expect(h1[0]).toHaveTextContent(heading)
  })

  it('updates the document title per page', () => {
    renderAt('/menu')
    expect(document.title).toMatch(/^Menu/)
  })
})

describe('menu', () => {
  it('filters by category and shows a no results state', async () => {
    const user = userEvent.setup()
    renderAt('/menu')
    await user.click(screen.getByRole('button', { name: 'Drinks' }))
    expect(screen.queryByText('Goat ribs, grilled')).not.toBeInTheDocument()
    expect(screen.getByText('Soda')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'All' }))
    await user.type(screen.getByLabelText('Search the menu'), 'biryani')
    expect(screen.getByRole('heading', { name: /Nothing for/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(screen.getByText('Goat ribs, grilled')).toBeInTheDocument()
  })

  it('adds simple items with a stepper and updates the cart bar', async () => {
    const user = userEvent.setup()
    renderAt('/menu')
    await user.click(screen.getByRole('button', { name: 'Add Sukuma wiki' }))
    await user.click(screen.getByRole('button', { name: 'Increase quantity of Sukuma wiki' }))
    const bar = screen.getByRole('region', { name: 'Order summary' })
    expect(within(bar).getByText('2 items')).toBeInTheDocument()
    expect(within(bar).getByText('KES 400')).toBeInTheDocument()
  })

  it('customises an item and prices the choice', async () => {
    const user = userEvent.setup()
    renderAt('/menu')
    await user.click(screen.getByRole('button', { name: 'Add Goat ribs, grilled' }))
    const dialog = screen.getByRole('dialog', { name: /Customise/i })
    await user.click(within(dialog).getByLabelText(/One kilo/))
    await user.click(within(dialog).getByLabelText(/Chips/))
    expect(within(dialog).getByRole('button', { name: /Add to order/ })).toHaveTextContent('KES 2,800')
    await user.click(within(dialog).getByRole('button', { name: /Add to order/ }))
    expect(screen.getByRole('region', { name: 'Order summary' })).toHaveTextContent('KES 2,800')
  })
})

describe('ordering flow', () => {
  it('shows an empty order, validates the name, hands off to WhatsApp and shows payment guidance', async () => {
    const user = userEvent.setup()
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    renderAt('/menu')

    await user.click(screen.getByRole('button', { name: /Open order, 0 items/ }))
    expect(screen.getByRole('heading', { name: 'Nothing here yet' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send on WhatsApp' })).toBeDisabled()
    await user.keyboard('{Escape}')

    await user.click(screen.getByRole('button', { name: 'Add Kuku choma, half' }))
    await user.click(screen.getByRole('button', { name: /Open order, 1 items/ }))
    await user.click(screen.getByRole('button', { name: 'Send order on WhatsApp' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/name/i)
    expect(open).not.toHaveBeenCalled()

    await user.type(screen.getByLabelText('Name for the order'), 'Wanjiru')
    await user.click(screen.getByRole('button', { name: 'Send order on WhatsApp' }))
    expect(open).toHaveBeenCalledTimes(1)
    expect(open.mock.calls[0][0]).toContain('https://wa.me/?text=')
    expect(screen.getByText(/not confirmed until the restaurant replies/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'How to pay with M-Pesa' }))
    expect(screen.getByText(/Instructions only/)).toBeInTheDocument()
    expect(screen.getByText('KES 950', { selector: '.detail__value' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Paybill' }))
    expect(screen.getByText('Business number')).toBeInTheDocument()
    open.mockRestore()
  })

  it('restores a saved order after a reload', async () => {
    window.localStorage.setItem('kijiji-eats-order-v1', JSON.stringify([{ key: 'sukuma', itemId: 'sukuma', selections: {}, note: '', unitPrice: 200, qty: 2 }]))
    renderAt('/')
    expect(screen.getByText(/We kept your order from earlier/)).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Order summary' })).toHaveTextContent('KES 400')
  })
})

describe('mobile navigation', () => {
  it('opens as a dialog, links to pages and closes on navigation', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    const nav = screen.getByRole('dialog', { name: 'Main navigation' })
    await user.click(within(nav).getByRole('link', { name: 'Menu' }))
    expect(screen.queryByRole('dialog', { name: 'Main navigation' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/The menu/i)
  })
})
