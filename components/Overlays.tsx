"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { CATEGORIES, countIn, getProduct, PRODUCTS, searchProducts } from "@/lib/products";
import { lineKey, useStore } from "@/lib/store";
import Dialog from "./Dialog";
import Price from "./Price";
import Quantity from "./Quantity";
import { NAV } from "./Header";
import { CheckIcon, CloseIcon, SearchIcon } from "./Icons";

/** Global overlays that can open from any page: mobile menu, search and the bag drawer. */
export default function Overlays() {
  const { overlay, closeOverlay } = useStore();
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  // Close any global overlay after navigating to a new route.
  useEffect(() => {
    if (pathname !== firstPath.current) {
      firstPath.current = pathname;
      closeOverlay();
    }
  }, [pathname, closeOverlay]);

  return (
    <>
      <MobileMenu open={overlay === "menu"} onClose={closeOverlay} />
      <SearchDialog open={overlay === "search"} onClose={closeOverlay} />
      <BagDrawer open={overlay === "bag"} onClose={closeOverlay} />
    </>
  );
}

function PanelHead({ children, onClose, closeLabel, id }: { children: ReactNode; onClose: () => void; closeLabel: string; id?: string }) {
  return (
    <div className="panel__head">
      <div id={id}>{children}</div>
      <button type="button" className="close" onClick={onClose} aria-label={closeLabel}>
        <CloseIcon />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- menu */

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { saved, bagCount, hydrated, openOverlay } = useStore();
  return (
    <Dialog open={open} onClose={onClose} variant="full" label="Menu">
      <PanelHead onClose={onClose} closeLabel="Close menu">
        <span className="wordmark">ÉLANOR</span>
      </PanelHead>
      <div className="panel__body">
        <nav aria-label="Menu">
          <ul className="menu-links">
            {NAV.map((n) => (
              <li key={n.label}>
                <Link href={n.href} onClick={onClose}>
                  {n.label} {n.href === "/shop" && <sup>{PRODUCTS.length} looks</sup>}
                </Link>
              </li>
            ))}
          </ul>
          <p className="label muted" style={{ margin: "20px 0 6px" }}>
            Categories
          </p>
          <ul className="menu-sub">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} onClick={onClose}>
                  {c.label} <span className="muted">{countIn(c.slug)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="panel__foot">
        <div className="menu-foot">
          <Link href="/saved" onClick={onClose}>
            Saved {hydrated && saved.length > 0 && <span className="n">{saved.length}</span>}
          </Link>
          <button type="button" onClick={() => openOverlay("bag")}>
            Bag {hydrated && bagCount > 0 && <span className="n">{bagCount}</span>}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

/* -------------------------------------------------------------- search */

function highlight(text: string, query: string): ReactNode {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return text;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return text.split(re).map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part));
}

const SUGGESTIONS = ["Tailoring", "Dresses", "Everyday", "Trench", "Knit"];

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listId = useId();
  const results = useMemo(() => searchProducts(query), [query]);
  const q = query.trim();

  const onChange = (value: string) => {
    setQuery(value);
    setActive(0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) {
      if (e.key === "Enter" && q) router.push(`/shop?q=${encodeURIComponent(q)}`);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/product/${results[active].slug}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} variant="search" label="Search" initialFocus={inputRef}>
      <PanelHead onClose={onClose} closeLabel="Close search">
        <span className="wordmark">ÉLANOR</span>
      </PanelHead>
      <div className="panel__body">
        <label className="sr-only" htmlFor="site-search">
          Search the collection
        </label>
        <div className="search-row">
          <SearchIcon />
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search looks, colours, categories"
            autoComplete="off"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-activedescendant={results.length ? `${listId}-${results[active]?.slug}` : undefined}
          />
          {query && (
            <button type="button" className="label muted" onClick={() => onChange("")}>
              Clear
            </button>
          )}
        </div>
        <div className="search-grid">
          <div>
            <p className="label muted">Try</p>
            <ul className="sugg">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button type="button" className="chip" onClick={() => onChange(s)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label muted" aria-live="polite">
              {!q ? "Type to search all 8 looks." : results.length ? `${results.length} ${results.length === 1 ? "look matches" : "looks match"} “${q}”` : `No looks match “${q}”. Try a colour like rust or a category like dresses.`}
            </p>
            <ul className="res" id={listId} role="listbox" aria-label="Results">
              {results.map((p, i) => (
                <li key={p.slug} role="presentation">
                  <Link
                    href={`/product/${p.slug}`}
                    id={`${listId}-${p.slug}`}
                    role="option"
                    aria-selected={i === active}
                    className={i === active ? "is-active" : undefined}
                    onMouseEnter={() => setActive(i)}
                    tabIndex={-1}
                  >
                    <Image src={p.front.src} alt="" width={72} height={108} sizes="72px" />
                    <span>
                      <b>{highlight(p.name, q)}</b>
                      <span className="body-s muted">{highlight(p.colorLabel, q)}</span>
                    </span>
                    <Price amount={p.price} />
                  </Link>
                </li>
              ))}
            </ul>
            {q && (
              <p style={{ marginTop: 22 }}>
                <Link className="link" href={`/shop?q=${encodeURIComponent(q)}`}>
                  See all results in shop
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

/* ----------------------------------------------------------- bag drawer */

function BagDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, bagCount, subtotal, setQty, removeLine, lastAdded } = useStore();
  const [checkoutTried, setCheckoutTried] = useState(false);
  const added = lastAdded ? getProduct(lastAdded.slug) : undefined;

  const close = () => {
    setCheckoutTried(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={close} variant="drawer" labelledBy="bag-title">
      <PanelHead onClose={close} closeLabel="Close bag" id="bag-title">
        <span className="label">
          Bag {bagCount > 0 && <span style={{ color: "var(--accent)" }}>{bagCount}</span>}
        </span>
      </PanelHead>
      <div className="panel__body">
        {added && lastAdded && (
          <div className="added" role="status">
            <CheckIcon />
            Added to your bag: {added.name}, size {lastAdded.size}
          </div>
        )}
        {lines.length === 0 ? (
          <div className="empty" style={{ padding: "48px 0" }}>
            <p>Your bag is empty. Looks you add will appear here.</p>
            <Link className="btn" href="/shop" onClick={close}>
              Explore the collection
            </Link>
          </div>
        ) : (
          lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            const key = lineKey(l);
            return (
              <div className="cline" key={key}>
                <Image src={p.front.src} alt={p.front.alt} width={72} height={108} sizes="72px" />
                <div>
                  <p className="line__name">
                    <Link href={`/product/${p.slug}`} onClick={close}>
                      {p.name}
                    </Link>
                  </p>
                  <div className="line__meta">
                    <span>
                      {l.color}, size {l.size}
                    </span>
                  </div>
                  <div className="line__ctrl">
                    <Quantity small value={l.qty} onChange={(n) => setQty(key, n)} label={`Quantity for ${p.name}, size ${l.size}`} />
                    <Price amount={p.price * l.qty} style={{ fontSize: 16 }} />
                  </div>
                  <div className="line__acts" style={{ marginTop: 10 }}>
                    <button type="button" onClick={() => removeLine(key)}>
                      Remove<span className="sr-only"> {p.name}, size {l.size}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {lines.length > 0 && (
        <div className="panel__foot">
          <div className="sum__row" style={{ fontWeight: 600 }}>
            <span>Subtotal</span>
            <Price amount={subtotal} style={{ fontSize: 17 }} />
          </div>
          <p className="hint" style={{ margin: 0 }}>
            Delivery and taxes to be confirmed. Sample prices.
          </p>
          <div className="foot-row">
            <Link className="btn btn--ghost" href="/bag" onClick={close}>
              View bag
            </Link>
            <button type="button" className="btn" aria-describedby="drawer-checkout-note" onClick={() => setCheckoutTried(true)}>
              Checkout
            </button>
          </div>
          <p id="drawer-checkout-note" className={checkoutTried ? "status status--accent" : "hint"} style={{ margin: 0 }} role={checkoutTried ? "status" : undefined}>
            Checkout isn&apos;t available in this concept demo. No order will be placed.
          </p>
        </div>
      )}
    </Dialog>
  );
}
