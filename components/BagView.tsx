"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProduct } from "@/lib/products";
import { lineKey, useStore } from "@/lib/store";
import Price from "./Price";
import Quantity from "./Quantity";
import { BagIcon } from "./Icons";

export default function BagView() {
  const { hydrated, lines, bagCount, subtotal, setQty, removeLine, moveToSaved } = useStore();
  const [checkoutTried, setCheckoutTried] = useState(false);

  if (!hydrated) {
    return (
      <p className="body-s muted" style={{ paddingBottom: "var(--s10)" }} aria-live="polite">
        Loading your bag…
      </p>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="empty">
        <BagIcon />
        <h2 className="d-l">Your bag is empty</h2>
        <p>Looks you add will appear here and stay on this device.</p>
        <Link className="btn" href="/shop">
          Explore the collection
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="body-s" style={{ margin: "calc(var(--s7) * -1) 0 var(--s6)" }}>
        {bagCount} {bagCount === 1 ? "item" : "items"}. <span className="muted">Your bag is kept on this device.</span>
      </p>
      <div className="bag">
        <div className="lines">
          {lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            const key = lineKey(l);
            return (
              <div className="line" key={key}>
                <Link href={`/product/${p.slug}`} tabIndex={-1} aria-hidden="true">
                  <Image src={p.front.src} alt="" width={120} height={180} sizes="120px" />
                </Link>
                <div>
                  <p className="line__name">
                    <Link href={`/product/${p.slug}`}>{p.name}</Link>
                  </p>
                  <div className="line__meta">
                    <span>Colour: {l.color}</span>
                    <span>Size: {l.size}</span>
                    <span>Sample product</span>
                  </div>
                  <div className="line__ctrl">
                    <Quantity small value={l.qty} onChange={(n) => setQty(key, n)} label={`Quantity for ${p.name}, size ${l.size}`} />
                    <div className="line__acts">
                      <button type="button" onClick={() => moveToSaved(key)}>
                        Move to saved<span className="sr-only">: {p.name}</span>
                      </button>
                      <button type="button" onClick={() => removeLine(key)}>
                        Remove<span className="sr-only"> {p.name}, size {l.size}</span>
                      </button>
                    </div>
                  </div>
                </div>
                <Price amount={p.price * l.qty} />
              </div>
            );
          })}
        </div>
        <aside className="sum" aria-labelledby="summary-title">
          <h2 className="label" id="summary-title" style={{ margin: "0 0 6px" }}>
            Order summary
          </h2>
          <div className="sum__row">
            <span>Subtotal</span>
            <Price amount={subtotal} style={{ fontSize: "inherit", fontWeight: "inherit" }} />
          </div>
          <div className="sum__row">
            <span>Delivery</span>
            <span className="muted">To be confirmed</span>
          </div>
          <div className="sum__row total">
            <span>Estimated total</span>
            <Price amount={subtotal} style={{ fontSize: "inherit", fontWeight: "inherit" }} />
          </div>
          <button type="button" className="btn btn--block" aria-describedby="checkout-note" onClick={() => setCheckoutTried(true)}>
            Checkout
          </button>
          <div className="note" id="checkout-note" role={checkoutTried ? "status" : undefined} style={checkoutTried ? { color: "var(--ink)" } : undefined}>
            Checkout isn&apos;t available in this concept demo. No payment is taken and no order is placed.
          </div>
          <Link className="link" href="/shop" style={{ justifySelf: "start" }}>
            Continue shopping
          </Link>
        </aside>
      </div>
    </>
  );
}
