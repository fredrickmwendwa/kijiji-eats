# Kijiji Eats

A mobile-first website for a fictional Nairobi nyama choma house. Customers browse a menu with clear
KES prices, build an order in a cart, and send it to the restaurant through WhatsApp. M-Pesa Till or
Paybill instructions guide payment. Built as a portfolio project, from an approved ten-phase design
(brand, design system, homepage, menu, ordering, payment, visit page, states, audit).

This is a concept. The restaurant, menu, prices, hours, address and reviews are examples. See
[Placeholders](#placeholders-and-honesty).

## Features

- Three routes: Home, Menu, Visit, plus a 404 page. The cart is a sheet, not a page.
- Menu with sticky category chips, search, portion and VEG tags, and a no-results state.
- Item customisation (size, accompaniment, note) with the price change shown before adding.
- Cart with quantity steppers, edit, remove, live totals, and local storage persistence.
  A saved order is restored with a notice the customer can review or clear.
- WhatsApp click-to-chat: a formatted, URL-encoded order message. Handoff screen says the order is
  not confirmed until the restaurant replies, and offers Copy message.
- M-Pesa guidance for Till, Paybill or both, with copyable details, a clear "instructions only"
  notice and a prefilled "I have paid" WhatsApp message.
- Visit page: story, hours (today marked), map panel with fallback links, FAQ, reviews.
- Accessible dialogs (focus trap, Escape, focus return), skip link, visible focus, live regions,
  reduced-motion support, per-page titles and meta descriptions.

## Tech stack

React 18, Vite 5, React Router 6, plain modern CSS with design tokens. JavaScript only (no TypeScript).
No UI library and no animation library. Tests: Vitest, jsdom, Testing Library.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build
npm test          # run the tests
```

Node 18 or later is recommended.

## Placeholders and honesty

Every unconfirmed business detail lives in `src/config/site.js` and is clearly marked:

| Setting | Status |
| --- | --- |
| `WHATSAPP_NUMBER` | Empty. While empty, the WhatsApp link opens WhatsApp so the user can pick a chat, and the handoff screen shows a demo note. |
| `TILL_NUMBER`, `PAYBILL_NUMBER`, `MERCHANT_NAME`, `PAYMENT_METHODS` | Placeholders. One method hides the method selector. |
| `ADDRESS`, `MAP_EMBED_URL`, `DIRECTIONS_URL` | Example location. With no embed URL a map placeholder with links is shown. |
| `HOURS`, `REVIEW_URL` | Sample hours. Reviews are labelled sample content and no ratings are shown. |

The menu is sample data in `src/data/menu.js`. Images are labelled placeholder SVGs from
`src/lib/images.js`; the `Img` component accepts a real `src` and falls back to the placeholder if it fails
to load.

Opening WhatsApp is a handoff. The site never shows an order as confirmed. M-Pesa instructions are
guidance only: there is no payment gateway and no payment verification.

## Project structure

```
src/
  config/      site settings and owner placeholders
  data/        menu and page content
  lib/         cart logic, WhatsApp message, formatting, placeholder images
  context/     OrderProvider (cart, order details, sheets, persistence)
  hooks/       usePageMeta
  components/  UI building blocks, dialogs, order sheet, payment panel
  pages/       Home, Menu, Visit, NotFound
  styles/      tokens.css, base.css, components.css, pages.css
  test/        test setup
```

## Testing

`npm test` runs 18 tests: cart pricing, merging and replacement; the WhatsApp message and encoded
URL; every route; menu filtering and search; customisation pricing; the order flow from empty cart through
name validation, WhatsApp handoff and payment guidance; saved order restore; and mobile navigation.

What has not been done: no real browser was available when this was built, so layout at real widths,
scrolling, sticky behaviour, touch targets and visual accuracy have not been checked here, and there are no
screenshots yet. Before shipping, check the pages at 320, 360, 390, 768, 1280 and 1440 pixels and on real phones.

## Deployment note

This is a single-page app. Host it with a rewrite to `index.html` for unknown paths (a Netlify
`_redirects` file is included in `public/`). Set the base path in `vite.config.js` if it is not served from `/`.

## Lessons learned

- Treat the design as data first. Putting the menu, options and prices in one structure made the same
  dish row work on Home and Menu, and made totals impossible to get out of sync.
- Build the cart as a reducer with a line key (item plus chosen options) so identical choices merge and
  different choices stay separate.
- A shared dialog component with one focus-trap implementation kept the order sheet, customise sheet and
  mobile navigation consistent. A scroll-lock counter stopped one closing dialog unlocking the page under another.
- Class names collide quietly. A section class named like a button modifier once added spacing to every button
  in the design stage; tokens and a clear naming pattern avoid that.
- Being honest in the interface (not confirmed, instructions only, sample content) is a design feature,
  not a disclaimer.
