"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SIZES, type Product, type Size } from "@/lib/products";
import { useStore } from "@/lib/store";
import Price from "./Price";
import Quantity from "./Quantity";
import SaveButton from "./SaveButton";
import SizeGuide from "./SizeGuide";
import { AlertIcon } from "./Icons";

type BuyProduct = Pick<Product, "slug" | "name" | "price" | "colorLabel" | "swatches" | "summary">;

export default function BuyPanel({ product }: { product: BuyProduct }) {
  const { addToBag } = useStore();
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [guide, setGuide] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const sizesRef = useRef<HTMLDivElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);

  // Reset transient UI when Next hides this route (Activity), so returning shows a closed guide.
  useLayoutEffect(
    () => () => {
      setGuide(false);
      setError(false);
    },
    [],
  );

  // Mobile sticky bar: show once the main Add to bag button has scrolled out of view above.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = addRef.current;
        setBarVisible(!!el && el.offsetParent !== null && el.getBoundingClientRect().bottom < 0);
      });
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const focusSizes = () => {
    const first = sizesRef.current?.querySelector<HTMLButtonElement>("button");
    sizesRef.current?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    first?.focus({ preventScroll: true });
  };

  const add = () => {
    if (!size) {
      setError(true);
      focusSizes();
      return;
    }
    setError(false);
    addToBag(product.slug, size, qty);
  };

  return (
    <div className="info">
      <div className="info__top">
        <div>
          <span className="tag">Sample product</span>
        </div>
        <h1 className="d-m">{product.name}</h1>
        <div className="pricerow">
          <Price amount={product.price} />
          <span className="body-s muted">Sample price</span>
        </div>
      </div>
      <hr className="rule" />

      <div className="opt">
        <div className="opt__head">
          <span className="label" id="colour-label">
            Colour<b>{product.colorLabel}</b>
          </span>
        </div>
        <div className="chips" role="group" aria-labelledby="colour-label">
          <button type="button" className="chip" aria-pressed="true">
            {product.swatches.map((c, i) => (
              <span key={c} className="swatch" style={{ background: c, marginLeft: i ? -12 : 0 }} aria-hidden="true" />
            ))}
            {product.colorLabel}
          </button>
        </div>
      </div>

      <div className="opt">
        <div className="opt__head">
          <span className="label" id="size-label">
            Size{size && <b>{size}</b>}
          </span>
          <button type="button" className="body-s" style={{ textDecoration: "underline", textUnderlineOffset: 4 }} onClick={() => setGuide(true)} aria-haspopup="dialog">
            Size guide
          </button>
        </div>
        <div
          ref={sizesRef}
          className={error ? "chips is-error" : "chips"}
          role="group"
          aria-labelledby="size-label"
          aria-describedby={error ? "size-error" : undefined}
        >
          {SIZES.map((z) => (
            <button
              key={z}
              type="button"
              className="chip"
              aria-pressed={size === z}
              onClick={() => {
                setSize(z);
                setError(false);
              }}
            >
              {z}
            </button>
          ))}
        </div>
        <div aria-live="assertive">
          {error && (
            <p className="err" id="size-error" style={{ margin: 0 }}>
              <AlertIcon />
              Choose a size to add this look to your bag.
            </p>
          )}
        </div>
      </div>

      <div className="buy">
        <Quantity value={qty} onChange={(n) => setQty(Math.max(1, Math.min(10, n)))} label="Quantity" />
        <button ref={addRef} type="button" className="btn btn--accent" onClick={add}>
          Add to bag
        </button>
        <SaveButton slug={product.slug} name={product.name} className="btn btn--ghost btn--sq" />
      </div>

      <p className="note" style={{ margin: 0 }}>
        Concept look. The exact garments included will be confirmed before sale.
      </p>

      <div className="acc">
        <details open>
          <summary>Details &amp; fit</summary>
          <div className="acc__body">
            <em>Placeholder</em>
            {product.summary} Garment details, fabric composition and fit notes will be added from verified product information.
          </div>
        </details>
        <details>
          <summary>Care</summary>
          <div className="acc__body">
            <em>Placeholder</em>Care instructions will be supplied with verified product information.
          </div>
        </details>
        <details>
          <summary>Delivery &amp; returns</summary>
          <div className="acc__body">
            <em>Draft policy</em>Delivery areas, timings and the returns policy will be confirmed before launch.
          </div>
        </details>
      </div>

      <div className={barVisible ? "sticky-buy is-visible" : "sticky-buy"} aria-hidden={!barVisible}>
        <Price amount={product.price} style={{ fontSize: 17 }} />
        <button type="button" className="btn btn--accent" onClick={size ? add : focusSizes} tabIndex={barVisible ? 0 : -1}>
          {size ? `Add to bag, size ${size}` : "Choose a size"}
        </button>
      </div>

      <SizeGuide open={guide} onClose={() => setGuide(false)} selected={size} />
    </div>
  );
}
