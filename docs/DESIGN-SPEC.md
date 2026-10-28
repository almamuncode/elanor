> Copied from `design-proposal/DESIGN-SPEC.md` in the ÉLANOR project workspace. The visual review board (`design-proposal/index.html`) and image exports live there, outside this repository.

# ÉLANOR: website design specification

**Status:** Design proposal v1, approved on 28 October 2026 and implemented in this repository.
**Visual designs:** open `design-proposal/index.html` in a browser (Chrome, Safari or Firefox). Static exports are in `design-proposal/exports/`.
**Sources:** `website-kit/WEBSITE-PLAN.md`, `ASSET-GUIDE.md`, `asset-manifest.json`, `BUILD-PROMPT.md` (the eventual implementation brief), the 36 images in `website-kit/images/`, and the 13 references in `reference/`, all inspected visually.

---

## 1. Creative direction

ÉLANOR should feel like a fashion magazine you can shop: oversized condensed headlines, warm photography given room to breathe, and a calm, honest store underneath.

**What we take from the references:** the scale contrast between huge condensed black type and small, quiet UI; photography offset against whitespace; thin rules; price-first product captions; one handwritten orange flourish.

**What we don't take:** the BEAUCLAIRE name, logo, script signature, copy, pill buttons, orange price-tag bubbles, floating keyword pills and concentric guide circles. ÉLANOR uses its own type pairing, square controls, sentence-case UI and its own copy.

**The one bold move.** The hero headline *A NEW POINT OF VIEW* is set larger than the photo's margin. It crosses from the ivory page onto the empty plaster wall of `hero-campaign.png` and stops well short of the model. The giant ÉLANOR wordmark that closes every page in the footer is its only echo. Everything else stays disciplined.

**Restraint rules**
- Burnt orange is reserved for: add to bag, selected and active states, counts, errors, focus rings, the "Sample product" tag, and the single *élan* flourish.
- Sentence case for all UI text (navigation, buttons, labels, tabs). Only Anton headlines are uppercase.
- No eyebrow labels above headings, no "→" on links, no numbered markers on content that isn't a sequence.
- No gradients, glass, decorative shadows or rounded cards. Corners are square everywhere. The only circles are colour swatches and radio buttons.

### Proposed brand messaging

| Use | Copy |
| --- | --- |
| Positioning line | Everyday pieces with an individual point of view. |
| Hero headline | A new point of view |
| Hero supporting copy | Everyday pieces with an individual point of view. Tailoring, dresses and easy layers in warm, wearable colour. |
| Brand statement | Chosen with care. Worn with élan. |
| About headline | Pieces with a point of view |
| Name story | ÉLANOR takes its name from *élan*: energy, flair, a certain ease. |
| Closing line (About) | Dress for the day you're having. |

**Voice:** plain, warm, confident; active verbs; sentence case. Errors say what happened and how to fix it. Empty states give one next step.
**Never claim:** founders, founding year, address, manufacturing origin, materials or composition, certifications, sustainability, delivery times, discounts, reviews or scarcity.

---

## 2. Design tokens

### Colour

| Token | Hex | Role | Contrast on ivory |
| --- | --- | --- | --- |
| `paper` | `#F6F4EF` | Page background | — |
| `paper-2` | `#EEEAE2` | Image placeholders, quiet panels | — |
| `ink` | `#171714` | Text, primary buttons, footer background | 16.3:1 |
| `accent` | `#B94726` | Burnt orange: add to bag, selection, counts, errors, focus | 4.8:1 (paper text on accent 4.8:1) |
| `accent-deep` | `#9C3A1E` | Accent hover and pressed | 6.3:1 |
| `muted` | `#746F66` | Secondary text | 4.5:1 |
| `rule` | `#DCD7CD` | Hairlines, borders | decorative |
| `scrim` | `rgba(23,23,20,.42)` | Overlay backdrop (no blur) | — |

Footer uses ink background, paper text, secondary text `#A9A397`, rules `#3A3934`.

### Typography

Bundled locally in `design-proposal/assets/fonts/` (all SIL Open Font License), so pages render offline. Production uses `next/font/local` with the same files.

| Role | Face | Size (mobile to desktop) | Leading | Notes |
| --- | --- | --- | --- | --- |
| Display XXL | Anton 400 | 60 to 232 px (`clamp(60px, 14.6vw, 232px)`) | 0.86 | Hero only. Uppercase. |
| Display XL | Anton 400 | 52 to 144 px | 0.94 | Page titles, statements. |
| Display L | Anton 400 | 44 to 104 px | 0.96 | Section titles. |
| Display M | Anton 400 | 34 to 64 px (product title 44 to 72 px) | 0.94 | Product title, related heading. |
| Display S | Anton 400 | 26 to 36 px | 1.0 | Category names, panel titles. |
| Lede | Instrument Sans 400 | 17 to 18 px | 1.5 | Max 34 to 46 characters per line. |
| Body | Instrument Sans 400 | 16 px | 1.55 | Max ~70 characters per line. |
| Small | Instrument Sans 400 | 13 to 14 px | 1.5 | Captions, hints. |
| UI label | Instrument Sans 500 | 14 to 15 px | 1.0 to 1.3 | Navigation, buttons, tabs, labels. Sentence case. |
| Price | Instrument Sans 500, tabular | 16 px mobile cards, 20 px desktop cards, 24 px product | 1.1 | "BDT" at 62% size in `muted`. |
| Flourish | Mrs Saint Delafield | 64 to 150 px | 1 | The word *élan* only, aria-hidden, at most one per page. |

Any Anton heading containing **É** gets leading of at least 1.06 (`.lh-acc`) so the accent never touches the line above. The wordmark ÉLANOR is always live text with the accented É, never an image.

### Spacing, grid and layout

- 4 px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Section rhythm: 96 px vertical on mobile, 128 px on desktop.
- Content max width 1600 px.
- **Mobile (<768 px):** 4 columns, 20 px side padding, 12 px gaps.
- **Tablet (768 to 1279 px):** 12 columns, 32 px side padding, 24 px gaps.
- **Desktop (≥1280 px):** 12 columns, 48 px side padding, 32 px gaps.
- Breakpoints: 768 px (desktop hero image and 12-column grid), 1024 px (desktop header navigation, 4-column product grid, sticky product info), 1280 px (wider gutters).
- Header height: 60, 68 or 72 px. Sticky, paper background, 1 px hairline below.

### Buttons

All buttons: 52 px tall (48 px in the mobile sticky bar), square corners, 28 px horizontal padding, Instrument Sans 500 15 px in sentence case, 200 ms colour transition.

| Variant | Default | Hover | Use |
| --- | --- | --- | --- |
| Primary | ink fill, paper text | accent fill | Explore the collection, Checkout, Show results |
| Accent | accent fill, paper text | accent-deep fill | **Add to bag only** |
| Secondary | transparent, 1 px ink border | ink fill, paper text | View bag, save (square 52 × 52) |
| Disabled | paper-2 fill, muted text, rule border | — | Uses `aria-disabled` and stays focusable with an explanation |
| Text link | 15 px, 1 px underline at 5 px offset | accent colour | Shop the look, View all 8 looks |

Focus (all interactive elements): 2 px accent outline, 3 px offset.

### Forms and selection

- **Text input:** no box, 1 px ink bottom border, 52 px tall, 17 px text. Focus: 2 px accent bottom border. Error: accent border plus an accent message with an icon below, linked with `aria-describedby`.
- **Size chips:** 52 × 44 px minimum, 1 px rule border. Hover: ink border. Selected: ink fill. Unavailable (only if real inventory exists): dashed border, struck-through text, `aria-disabled`.
- **Colour chip:** shows overlapping swatches and the colour label. Each look has one colourway.
- **Checkbox and radio:** 18 px, ink outline, ink fill when on. The whole row is the label (44 px target).
- **Quantity stepper:** 52 px (40 px compact), range 1 to 10, with live-announced value.
- **Segmented control** (size-guide units): 36 px, ink fill on the pressed option.
- **Tag:** 1 px accent border, 13 px accent text ("Sample product").
- **Note:** 2 px accent left rule, faint accent tint, 13 px muted text. Used for demo and placeholder disclosures.

### Image treatments

- Square corners, no borders, frames, shadows or colour overlays. Text over a photo only sits on empty wall, never over faces or garments.
- **Product images:** always the native 2:3, `object-fit: cover` with no actual crop, so hems and shoes stay visible. Background `paper-2` while loading.
- **Campaign images:** 3:2 native, or 16:9 on desktop for `campaign-soft-structure.png` (object-position 30% 50%). Never squeezed.
- **Category panels:** 4:5 (object-position 50% 30%). Everyday is 2:3 on desktop.
- **Hero:** desktop crop ≈1.42:1, anchored right so the model is never cut. Mobile is native 2:3, anchored bottom.
- Hover: product cards cross-fade to the mapped back view (350 ms). Category images scale to 1.03 (600 ms). Both are disabled under `prefers-reduced-motion`.

---

## 3. Sitemap and navigation

```
/                 Home
/shop             Collection: ?category=tailoring|dresses|everyday, ?q=, ?size=, ?sort=
/product/[slug]   8 product pages (rust-tailoring, black-knit, striped-shirt, olive-dress,
                  ivory-cardigan, sand-trench, burgundy-dress, cream-coord)
/about            About (proposed copy)
/bag              Shopping bag
/saved            Saved pieces
/policies/[slug]  Delivery, Returns, Privacy, Terms (clearly labelled draft pages)
```

**Header, desktop (≥1024 px):** wordmark on the left; Shop, New arrivals, About in the centre; Search (icon and label), Saved (heart and count), Bag (icon, label and count) on the right.
**Header, mobile:** menu button on the left, wordmark centred, search and bag on the right. Saved is reached through the menu.
**Footer:** Shop (All looks, Tailoring, Dresses, Everyday), ÉLANOR (About, Saved pieces, Bag), Policies (each marked "Draft"), a demo disclosure, the giant wordmark, then "© 2026 ÉLANOR. A concept demo." and "Prices in BDT (sample)". Social and contact links are omitted until real destinations exist.
**"New arrivals":** opens `/shop?sort=new`, which shows all eight looks in collection order. See the approval checklist.

---

## 4. Sample catalogue

Price is a sample in BDT. Sizes XS, S, M, L and XL are samples. Images come from `asset-manifest.json`.

| # | Slug | Name | Category | Colour label | Sample price |
| --- | --- | --- | --- | --- | --- |
| 1 | rust-tailoring | The Rust Tailoring Look | Tailoring | Rust and ivory | BDT 14,500 |
| 2 | black-knit | The Cognac Knit Look | Everyday | Black and cognac | BDT 9,800 |
| 3 | striped-shirt | The Striped Shirt Look | Everyday | Pale blue and ivory | BDT 7,900 |
| 4 | olive-dress | The Olive Midi Dress | Dresses | Olive | BDT 11,200 |
| 5 | ivory-cardigan | The Ivory Cardigan Look | Everyday | Ivory and chocolate | BDT 10,400 |
| 6 | sand-trench | The Sand Trench Look | Tailoring | Sand and black | BDT 16,900 |
| 7 | burgundy-dress | The Burgundy Shirt Dress | Dresses | Burgundy | BDT 10,800 |
| 8 | cream-coord | The Cream Co-ord Look | Everyday | Cream | BDT 12,600 |

Each look's gallery is `product-{slug}.png` (front), `product-{slug}-back.png`, `product-{slug}-detail.png`, in that order.

---

## 5. Page layouts, copy and image placements

### 5.1 Home `/`

| # | Section | Desktop | Mobile | Images | Copy |
| --- | --- | --- | --- | --- | --- |
| 1 | Header | As in section 3 | As in section 3 | — | — |
| 2 | Hero | Photo spans columns 4 to 12 and bleeds off the right edge. The headline (Display XXL, three lines: A NEW / POINT / OF VIEW) starts at column 1 and runs onto the plaster wall. Lede and CTA sit at the bottom of columns 1 to 3. The *élan* flourish sits on the wall right of "POINT". A caption row runs under the photo. | Full-bleed 2:3 photo. The headline sits in the top copy space above the model. The flourish is on the right. Lede, CTA and caption sit below the photo. | `hero-campaign.png` (≥768 px), `hero-mobile.png` (<768 px) via `<picture>`. The only preloaded image. | H1 "A new point of view". Lede "Everyday pieces with an individual point of view. Tailoring, dresses and easy layers in warm, wearable colour." CTA "Explore the collection" → /shop. Caption "Worn here: The Rust Tailoring Look", link "Shop the look" → /product/rust-tailoring |
| 3 | The edit | Heading in columns 1 to 7, intro and link in columns 9 to 12. 4 product cards with cards 2 and 4 dropped 112 px. | 2 columns, cards 2 and 4 dropped 48 px. | `product-black-knit.png`, `product-olive-dress.png`, `product-sand-trench.png`, `product-striped-shirt.png` (and their `-back` views on hover) | H2 "The edit". "Four looks to start with: a knit for every day, a soft midi, a trench and a striped shirt." Link "View all 8 looks" |
| 4 | Dresses campaign | 16:9 photo across the content width. Copy block sits over the empty right wall (right 4%, 34% wide, vertically centred). | 3:2 full-bleed photo, copy below. | `campaign-soft-structure.png` | H2 "Soft structure". "A gathered waist, full sleeves and a skirt that moves. Dresses that hold their shape through the whole day." Link "Shop dresses" → /shop?category=dresses |
| 5 | Shop by category | Asymmetric spread: Tailoring in columns 1 to 5 (4:5), Dresses in columns 6 to 9 dropped 160 px (4:5), Everyday in columns 10 to 12 dropped 56 px (2:3). Name and count sit under each, over a hairline. | Horizontal swipe row, panels 78% wide with snap points. | `category-tailoring.png`, `category-dresses.png`, `category-everyday.png` | H2 "Shop by category". "Three ways into the collection." Panels: Tailoring (2 looks), Dresses (2 looks), Everyday (4 looks), each linking to /shop?category= |
| 6 | Brand statement | Hairline above. Display XL headline across the page. Below it, intro and link in columns 1 to 4 over a small knit image, with a large fabric image in columns 6 to 12. | Stacked: headline, text, knit, fabric. | `story-fabric-detail.png` (large), `detail-ivory-knit.png` (small) | H2 "Chosen with care. Worn with élan." "ÉLANOR is built around a simple idea: fewer, better-considered pieces that work together and feel like yours. Clean lines, warm colour, nothing that asks for attention it hasn't earned." Link "Our point of view" → /about. Caption "Illustrative texture study." |
| 7 | Newsletter | Hairline above. Heading in columns 1 to 6, form in columns 8 to 12. | Stacked. | — | H2 "Letters from ÉLANOR". "Occasional notes on new looks and how to wear them." Field "Email address", button "Sign up". Hint "Demo only. Sign-up isn't connected, so no email is sent or stored." After a valid submit: "Demo only—your email has not been submitted." |
| 8 | Footer | As in section 3 | 2-column link groups | — | — |

### 5.2 Shop `/shop`

| Section | Desktop | Mobile | Images / copy |
| --- | --- | --- | --- |
| Breadcrumb and title | "Home / Shop". Display XL "The collection" in columns 1 to 8, intro in columns 9 to 12. | Stacked | "Eight looks across tailoring, dresses and everyday pieces. Sample products for the demo." |
| Toolbar (sticky under the header) | Left: tabs All 8, Tailoring 2, Dresses 2, Everyday 4 (active has a 2 px accent underline). Right: result count, Filter, "Sort: featured". | Tabs scroll horizontally. Below them: count and a "Filter & sort" button. | — |
| Grid, row 1 | 4 columns, 56 px row gap | 2 columns, 32 px row gap | Looks 1 to 4 (front views, back view on hover) |
| City Layers banner | Photo in columns 1 to 8 (3:2). Text in columns 9 to 12, bottom-aligned, outside the photo. | Full-bleed photo, text below | `campaign-city-layers.png`. H2 "City layers". "A trench over black, a cream co-ord in easy knit. Two looks for days that move between places." Link "Shop tailoring" |
| Grid, row 2 | 4 columns | 2 columns | Looks 5 to 8 |
| End note | Hairline and centred text | Same | "You've seen all 8 looks." |
| Empty result | Replaces the grid | Same | "No looks match these filters." Button "Clear all" |

When filters reduce the grid to 4 or fewer looks, the City Layers banner moves below the results.

### 5.3 Product `/product/[slug]` (shown with rust-tailoring)

| Section | Desktop | Mobile | Images / copy |
| --- | --- | --- | --- |
| Breadcrumb | Home / Shop / {Category} / {Name} | Wraps | — |
| Gallery | 96 px vertical thumbnail column beside a 2:3 main image (columns 1 to 7 overall). The selected thumbnail has an ink outline. An enlarge button sits top-right. | Full-bleed 2:3 swipe gallery with a "1 / 3" counter, a 3 px progress bar and 3 thumbnails below. | `product-{slug}.png`, `-back.png`, `-detail.png` in that order |
| Buy panel (sticky, columns 9 to 12) | "Sample product" tag; title (Anton, 44 to 72 px); price with "Sample price"; hairline; Colour (label and chip); Size (label with the chosen size, "Size guide" link, XS to XL chips); quantity, Add to bag (accent), save (square); demo note; accordions. | Same order, full width | Note: "Concept look. The exact garments included will be confirmed before sale." Accordions: "Details & fit" (open, labelled Placeholder), "Care" (Placeholder), "Delivery & returns" (Draft policy) |
| The detail | Text in columns 2 to 5, detail image in columns 7 to 12 | Stacked | H2 "The detail". "A closer look at the jacket and trousers. Alternate views are illustrative concept images and may differ slightly from the front view." |
| You may also like | 4 cards: same category first, then the next looks in collection order | 2 columns | Link "View all looks" |
| Sticky add-to-bag bar | — | Appears once the main Add to bag button leaves the viewport: price plus "Add to bag, size M" (or "Choose a size", which scrolls to the sizes) | — |

### 5.4 About `/about`

| Section | Desktop | Mobile | Images / copy |
| --- | --- | --- | --- |
| Hero | *élan* flourish above the Display XL heading in columns 1 to 7, lede below. Portrait in columns 8 to 12 (2:3), bleeding right. | Stacked; portrait at 4:5 full-bleed | `story-editorial-portrait.png`, captioned "Editorial portrait of a model." H1 "Pieces with a point of view". "ÉLANOR takes its name from *élan*: energy, flair, a certain ease. We make everyday clothes for women who already know what they like, and want pieces that keep up." |
| Proposed-copy notice | Full-width bordered row | Same | "This page is a draft. Founding story, team, location, materials and production details will be added once they're confirmed by the owner." |
| Principles | 3 columns, each with an ink top rule | Stacked | "Everyday first": Pieces planned around the days you actually have: work, travel, dinner, the walk home. "Warm, wearable colour": Rust, olive, burgundy, sand and ivory. Colours that sit together, so a wardrobe builds itself. "Your way of wearing it": We show looks, not rules. Take the trench, keep the trousers, make it your own. |
| Studio imagery | Still life in columns 1 to 8, texture and text in columns 9 to 12 | Stacked | `story-design-table.png` ("Illustrative styling still life, not a documented studio."), `detail-striped-cotton.png` ("Illustrative shirt texture."). "Texture matters as much as shape: the weight of a cuff, the hand of a knit. We'll share real fabric details product by product." |
| Close | Centred Display XL and CTA | Same | "Dress for the day you're having." Button "Explore the collection" |

### 5.5 Shopping bag `/bag`

- Title "Your bag", then "3 items. Your bag is kept on this device."
- **Desktop:** line items in columns 1 to 8 (ink top rule), summary in columns 9 to 12 (sticky, bordered).
- **Line item:** 120 px thumbnail (front view; 96 px on mobile), name (links to the product), colour, size, "Sample product", compact stepper, "Move to saved", "Remove", line price. Lines are unique by slug, colour and size.
- **Summary:** Subtotal (from sample prices), Delivery "To be confirmed", Estimated total, Checkout button, then the note "Checkout isn't available in this concept demo. No payment is taken and no order is placed." and a "Continue shopping" link. Checkout never shows a confirmation.
- **Empty:** bag icon, "Your bag is empty", "Looks you add will appear here and stay on this device.", button "Explore the collection".

### 5.6 Saved pieces `/saved`

- Title "Saved pieces", then "3 looks. Saved on this device only. Choose a size on the product page to add to bag."
- Grid of 4 columns (2 on mobile) using product cards with a remove (×) button and a "View look" link.
- **Empty:** heart icon, "Nothing saved yet", "Tap the heart on any look to keep it here for later.", button "Explore the collection".

---

## 6. Overlays

All overlays: `role="dialog"`, `aria-modal="true"`, labelled title, focus moves inside on open, focus is trapped, Escape and scrim click close, focus returns to the trigger, background scroll is locked. Entrance: 200 ms fade for the scrim; drawers slide 24 px; reduced motion makes both instant.

| Overlay | Desktop | Mobile | Contents |
| --- | --- | --- | --- |
| Navigation | Not needed (inline navigation) | Full screen | Wordmark and close; Anton links (52 px) Shop (8 looks), New arrivals, About; categories with counts; footer with Saved and Bag counts |
| Search | Top sheet (max 86% of viewport height) over the scrim | Full screen | Large input (36 px desktop, 26 px mobile) with Clear; "Try" chips (Tailoring, Dresses, Everyday, Trench, Knit); live count "3 looks match 'ivory'" (aria-live); results with thumbnail, name, colour (match highlighted in accent) and price; "See all results in shop" → /shop?q=. Matches name, colour label and category, case-insensitive. Arrow keys move through results. |
| Filters and sort | 460 px right drawer | Full screen | Sort by (radio): Featured, Name A–Z, Price low to high, Price high to low. Category (checkbox with counts). Size (chips) with "Sample sizes. Real availability will come from inventory." Colour (checkbox and swatch). Footer: "Clear all" and "Show {n} looks". |
| Size guide | Centred 640 px dialog | Bottom sheet (max 88% height) with a grab handle | Title "Size guide"; note "Illustrative measurements for this concept demo only…"; cm/in toggle; table of Size, Bust, Waist, Hip (XS 80/62/88, S 84/66/92, M 88/70/96, L 94/76/102, XL 100/82/108 cm) with the selected size highlighted; how-to-measure text |
| Bag drawer | 460 px right drawer | Full screen | "Bag 3"; confirmation "Added to your bag: {name}, size {size}" (role="status"); compact lines with stepper and Remove; Subtotal; "Delivery and taxes to be confirmed. Sample prices."; View bag (secondary) and Checkout (primary); demo checkout note |

## 7. Component states and key interactions

| Component | States |
| --- | --- |
| Header links | Default; hover or current page shows a 1 px ink underline; focus ring |
| Counts | Accent numerals next to the heart and bag. Hidden at 0. Announced in the button label ("Bag, 3 items"). |
| Product card | Default (front); hover or focus shows the back view; save toggles to a filled accent heart (`aria-pressed`); the whole image and name are links |
| Category tab | Muted; hover ink; selected ink with a 2 px accent underline (`aria-selected`) |
| Size | Unselected, hover, selected, unavailable; **error**: all chips outlined in accent, the message "Choose a size to add this look to your bag." (role="alert"), and focus moves to the first size |
| Add to bag | Default, hover, focus. On success the drawer opens with the confirmation. Adding the same slug, colour and size increases quantity; a different size adds a new line. |
| Quantity | Minus is disabled at 1, plus at 10; the value is announced |
| Accordion | Open shows "–", closed shows "+"; built on `<details>`/`<summary>` |
| Newsletter | Empty submit: "Enter your email address." Invalid: "Enter an email address like name@example.com." Valid: "Demo only—your email has not been submitted." No storage, no network call. |
| Checkout | Shows the demo notice. Never navigates to a success page. |
| Gallery | Thumbnail click or arrow keys change the main image; mobile swipe updates the counter and progress bar; enlarge opens a full-screen image view with Escape to close |

**Motion:** subtle only. Colour transitions take 200 ms, the card hover cross-fade 350 ms, the category image scale 600 ms, and drawers 200 ms. No scroll-jacking, parallax, custom cursor or staggered section entrances. All of it is disabled under `prefers-reduced-motion`.

## 8. Accessibility baseline

Skip link; landmarks (header, nav, main, footer); one H1 per page; all text meets WCAG AA contrast (lowest is `muted` on ivory at 4.54:1); touch targets of at least 44 × 44 px; visible focus everywhere; labelled icon buttons; alt text taken from `asset-manifest.json` (decorative hover images use empty alt with `aria-hidden`); the flourish is `aria-hidden`; no horizontal overflow from 320 px up (checked on all six pages and the search, filter and size-guide overlays at 320 px).

## 9. Planned implementation stack (after approval)

- **Next.js** with App Router, **TypeScript**, **Tailwind CSS** (tokens above mapped into `theme.extend`), built in `storefront/`.
- **Next Image** (`next/image`) for responsive, lazy-loaded delivery from the PNG masters copied into `public/images/` with their original filenames. Only the hero uses `priority`. `sizes` is set per placement.
- **Fonts** via `next/font/local` using the bundled woff2 files (Anton, Instrument Sans 400/500/600, Mrs Saint Delafield). No network font dependency.
- **State:** React context plus localStorage for the bag and saved items, with safe hydration (render counts after mount) and defensive JSON parsing.
- Server Components by default; client components for header counts, filters, gallery, dialogs, bag and saved.
- Typed catalogue in one module derived from `asset-manifest.json`.
- Shared components: Header, Footer, ProductCard, ProductGallery, ProductFilters, BagDrawer, SearchDialog, SizeGuide, and Dialog/Drawer primitives.
- **Not in phase one:** no backend, accounts, real payments, Shopify or deployment.

## 10. Files in this proposal

```
design-proposal/
  index.html              Review board: overview, design system, 6 pages (desktop and mobile),
                          overlays and states, image map
  pages/*.html            Static responsive mockups (home, shop, product, about, bag, saved).
                          Add #menu, #search, #filters, #sizeguide, #cart, #size-error or #empty
                          to a page URL to see that overlay or state.
  assets/styles.css       Design tokens and component styles (design artifact, not production code)
  assets/ui.js            Review helper: shows overlay states and sizes board frames
  assets/fonts/           Bundled OFL fonts and licence
  exports/*.jpg           25 static captures (pages at 1440 and 390 px; overlays and states)
  DESIGN-SPEC.md          This document
  APPROVAL-CHECKLIST.md   Decisions to approve
```

The mockups reference the original images at `../website-kit/images/` directly. No image was copied, edited or recompressed. `reference/`, `website-kit/` and `generated_images/` are untouched.
