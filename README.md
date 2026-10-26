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
- Motion with purpose: the hero headline rises line by line while the tally mark draws itself, section rules draw in
  on scroll, images wipe in, menu rows stagger, buttons fill on hover, totals count up, and a bar sweeps across the top
  on page changes. All of it is disabled under `prefers-reduced-motion`.
- A scrolling ticker of real menu prices and a live "Open now" pill that reads the sample hours in Nairobi time.
- Ledger-style menu rows with dotted leaders from dish to price.
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

The menu is sample data in `src/data/menu.js`. Dishes without a photo (`Goat and liver`, `Chicken wings`,
`Soda`) show a labelled placeholder from `src/lib/images.js`. The `Img` component also falls back to the
placeholder if a file fails to load, so there are no broken-image icons.

Opening WhatsApp is a handoff. The site never shows an order as confirmed. M-Pesa instructions are
guidance only: there is no payment gateway and no payment verification.

## Images

Photos live in `public/images/` (hero 960x1200, story 1200x900, dish thumbnails 320x320, all compressed JPEGs
under 150 KB). To add or swap one, drop the file in `public/images/dishes/` and set `image: 'name.jpg'` on the item
in `src/data/menu.js`.

**Credits and rights.** These are temporary portfolio images. Replace them with owner photography before any
commercial use.

- Unsplash: hero by Emerson Vieira, story photo by Bradley Pritchard-Jones, beef ribs by Alexandru-Bogdan Ghita.
  (A fourth Unsplash photo by Gang Hao is in the project folder's source set but not used.)
- The remaining dish photos (goat, chicken, platters, sides, juice, water) came from recipe blogs and
  image sites, and their licences are unconfirmed. Do not publish them commercially.
- Cropped to remove visible watermarks where possible. The kachumbari photo carries a very faint blog watermark and the
  water photo a faint stock watermark that cannot be cropped out.

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

`npm test` runs 22 tests: cart pricing, merging and replacement; the WhatsApp message and encoded
URL; every route; menu filtering and search; customisation pricing; the order flow from empty cart through
name validation, WhatsApp handoff and payment guidance; saved order restore; and mobile navigation.

Browser checks: the built site was also run in headless Chromium at 320, 390, 768, 1280 and 1440 pixels on every
page. There were no console errors, no failed requests, no broken images, no horizontal overflow and no tap
targets under 40 pixels. The full phone and desktop ordering flow was clicked through (customise, add, validate
name, WhatsApp link contents, payment step, Escape to close, mobile navigation). That run found and fixed real bugs
(a reveal that left the story image invisible, dish rows overflowing at 320 pixels, Escape not closing the sheet
after a step change). The test run loaded the same three fonts from local files because the sandbox could not reach
Google Fonts.

What has not been done: testing on real phones and other browsers (Safari, Firefox), automated visual
regression tests, and screenshots in this README. Check the site on a real device before shipping.

## Deployment note

This is a single-page app. Host it with a rewrite to `index.html` for unknown paths (`vercel.json` is included for Vercel and a Netlify
`_redirects` file is in `public/`). Set the base path in `vite.config.js` if it is not served from `/`.

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
