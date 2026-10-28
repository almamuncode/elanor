> Copied from `design-proposal/APPROVAL-CHECKLIST.md` in the ÉLANOR project workspace. The visual review board (`design-proposal/index.html`) and image exports live there, outside this repository.

# ÉLANOR design proposal: approval checklist

Open `design-proposal/index.html` and work through the tabs. For each item, reply **approve** or **change** (with a note). Implementation starts only after you explicitly approve.

Items marked ★ shape the whole site and are the most important to settle.

## A. Direction and identity
- [ ] ★ **Overall direction:** an editorial magazine feel, with oversized condensed headlines, warm photography and generous whitespace (Overview tab).
- [ ] ★ **The one bold move:** the hero headline crossing from the ivory page onto the plaster wall of the photo (Home tab, desktop).
- [ ] **Separation from the references:** no BEAUCLAIRE name, logo, script signature, copy, pill buttons, price bubbles or keyword pills.
- [ ] **Wordmark:** ÉLANOR set in Anton with wide letter spacing, as live text. Is this enough for now, or do you want a dedicated logo later?

## B. Messaging and copy
- [ ] ★ **Positioning line:** "Everyday pieces with an individual point of view."
- [ ] **Hero headline:** "A new point of view".
- [ ] **Brand statement:** "Chosen with care. Worn with élan."
- [ ] **About story:** the name comes from *élan*, plus the three principles (Everyday first, Warm wearable colour, Your way of wearing it). This is proposed copy with a visible draft notice.
- [ ] **Voice:** plain, warm and confident, in sentence case, with no invented business claims.

## C. Visual system
- [ ] ★ **Colour:** ivory #F6F4EF, ink #171714, burnt orange #B94726 (actions and states only), stone #746F66, hairline #DCD7CD.
- [ ] ★ **Typefaces:** Anton for display, Instrument Sans for text, bundled locally. Instrument Sans replaces the earlier Inter Tight for a crisper contrast with Anton.
- [ ] **Script flourish:** the single word *élan* in Mrs Saint Delafield, at most once per page (hero and About). Keep it, or remove it entirely?
- [ ] **Sentence-case UI:** navigation, buttons, labels and tabs in sentence case rather than the references' tracked capitals.
- [ ] **Buttons:** square corners. Ink for primary actions; burnt orange only for **Add to bag**.
- [ ] **Dark footer:** ink background with the giant ivory ÉLANOR wordmark. The alternative is an ivory footer with an ink wordmark.
- [ ] **Price style:** price first and large, the product name small beside it, "BDT" smaller in stone.

## D. Layout and imagery
- [ ] ★ **Image placements** as listed on each page tab and in the Image map tab (all 36 images; hero desktop and mobile split at 768 px).
- [ ] **Staggered featured cards** on the home page (the 2nd and 4th drop lower).
- [ ] **Featured four:** Cognac Knit, Olive Midi, Sand Trench, Striped Shirt. Rust Tailoring is already the hero.
- [ ] **Category spread:** asymmetric on desktop, a swipe row on mobile.
- [ ] **City Layers banner** breaking the shop grid after the first row.
- [ ] **Product page:** vertical thumbnails on desktop, a swipe gallery with a counter on mobile, a sticky buy panel on desktop, and a sticky add-to-bag bar on mobile.
- [ ] **"The detail" section** on the product page, repeating the detail image large.

## E. Navigation and interactions
- [ ] ★ **Bag pattern:** a slide-in bag drawer after add to bag, **plus** a full `/bag` page.
- [ ] **Saved items:** a heart on cards and the product page, and a `/saved` page. On mobile, Saved is reached through the menu rather than a header icon.
- [ ] **"New arrivals" navigation item:** with only eight looks, it opens the shop sorted as new. Keep it, rename it (for example, "The edit"), or remove it?
- [ ] **Search:** a top sheet on desktop and full screen on mobile, matching name, colour and category.
- [ ] **Filters:** a drawer with sort, category, size and colour (the real demo attributes only). Is price-range filtering needed? (Not proposed.)
- [ ] **Size guide:** a centred dialog on desktop and a bottom sheet on mobile, with illustrative measurements clearly labelled.
- [ ] **Size validation:** add to bag without a size shows an inline error and moves focus to the sizes.
- [ ] **Checkout in the demo:** the button shows a clear "not available in this concept demo" notice and never a fake confirmation.

## F. Sample data and business inputs
- [ ] ★ **Currency:** BDT as the working assumption. Is this correct?
- [ ] **Sample prices:** BDT 7,900 to 16,900 (Overview tab and spec section 4). Are they realistic enough for the demo?
- [ ] **Sizes:** XS, S, M, L, XL for every look.
- [ ] **Size-guide measurements:** illustrative values (bust, waist, hip in cm). Do you have real ones?
- [ ] **Sold as "looks":** each product is a full outfit, with the note "exact garments included will be confirmed before sale". Or should looks be split into individual garments later?
- [ ] **Footer policies:** Delivery, Returns, Privacy and Terms as clearly marked draft pages. Social and contact links omitted until real ones exist.

## G. Implementation plan (for after approval)
- [ ] Next.js App Router, TypeScript, Tailwind CSS, Next Image, `next/font/local`, React context with localStorage, in `storefront/`.
- [ ] No backend, accounts, payments, Shopify or deployment in phase one.
- [ ] Originals stay in `website-kit/images/`. Copies with the same filenames go into `storefront/public/images/`.

---

**To approve:** reply "Approved" or list the items to change, e.g. "Approved, except: remove the script flourish; rename New arrivals to The edit".
