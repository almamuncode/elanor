# ÉLANOR storefront (concept demo)

A responsive, editorial storefront demo for ÉLANOR, a womenswear brand, built from the approved design in `../design-proposal/`.

> **This is a frontend demo, not a working shop.** Products, prices (BDT), sizes, size-guide measurements and policies are sample data. There is no backend, no accounts and no payments. Checkout explains that it is unavailable, and the newsletter form doesn't submit anything.

## Run it

Requires Node.js 20.9 or newer.

```bash
cd storefront
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Checks:

```bash
npm run lint
npx tsc --noEmit   # run `npx next typegen` first on a fresh clone
```

## Stack

- Next.js 16 (App Router, Cache Components and Partial Prefetching enabled), React 19, TypeScript
- Tailwind CSS v4: design tokens in `@theme`, component styles in `@layer components` (`app/globals.css`)
- `next/image` for responsive delivery from the PNG masters in `public/images/`. The home hero uses `getImageProps` to serve `hero-campaign.png` from 768 px up and `hero-mobile.png` below.
- `next/font/local` for the bundled fonts (Anton, Instrument Sans, Mrs Saint Delafield; SIL OFL, see `app/fonts/OFL-LICENSE.txt`). No network font requests.
- React context and `localStorage` for the bag and saved pieces (`lib/store.tsx`), with hydration after mount and defensive parsing of stored data

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home: hero, the edit, dresses campaign, categories, brand statement, newsletter |
| `/shop` | Collection. URL params: `category` (comma list), `size`, `color`, `q`, `sort` (`featured`, `new`, `name`, `price-asc`, `price-desc`) |
| `/product/[slug]` | 8 prerendered product pages with gallery, size validation, size guide and bag |
| `/about` | Proposed brand story (marked as draft) |
| `/bag` | Bag page with quantities, remove, move to saved, and a subtotal |
| `/saved` | Saved pieces |
| `/policies/[slug]` | Draft placeholders for delivery, returns, privacy and terms |

Overlays: mobile menu, search, bag drawer (global, in `components/Overlays.tsx`), filters drawer (shop), size guide and image viewer (product). All of them use `components/Dialog.tsx`, which traps focus, closes on Escape or a scrim click, restores focus to the control that opened it, locks background scrolling and makes the page behind inert.

## Project layout

```
app/                routes, layout, globals.css, fonts
components/         Header, Footer, Overlays, Dialog, ProductCard, ProductGallery, BuyPanel,
                    SizeGuide, ShopView, FiltersDrawer, BagView, SavedView, Newsletter, …
lib/products.ts     typed sample catalogue (from website-kit/asset-manifest.json)
lib/shop-filters.ts URL ⇄ filter state, sorting and search
lib/store.tsx       bag and saved state with localStorage persistence
lib/policies.ts     draft policy copy
public/images/      the 36 supplied images (copies; originals stay in website-kit/images)
```

## Before this can sell anything

Business inputs still needed:

- Real products: which garments each "look" includes, prices, currency confirmation, sizes and stock
- Verified product photography (the supplied images are generated concepts; back and detail views are illustrative)
- Fabric composition, care instructions and fit or garment measurements
- Delivery areas, costs and timings, plus returns, privacy and terms policies
- Brand story facts for the About page (founding, team, location, production)
- Contact details and social links
- A backend for orders, payments, inventory and accounts, and a real newsletter provider
