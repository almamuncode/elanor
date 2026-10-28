"use client";

import Link from "next/link";
import { getProduct, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import { CloseIcon, HeartIcon } from "./Icons";

export default function SavedView() {
  const { hydrated, saved, toggleSaved } = useStore();

  if (!hydrated) {
    return (
      <p className="body-s muted" style={{ paddingBottom: "var(--s10)" }} aria-live="polite">
        Loading saved pieces…
      </p>
    );
  }

  const items = saved.map(getProduct).filter((p): p is Product => p !== undefined);

  if (items.length === 0) {
    return (
      <div className="empty">
        <HeartIcon />
        <h2 className="d-l">Nothing saved yet</h2>
        <p>Tap the heart on any look to keep it here for later.</p>
        <Link className="btn" href="/shop">
          Explore the collection
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="body-s" style={{ margin: "calc(var(--s7) * -1) 0 var(--s6)" }}>
        {items.length} {items.length === 1 ? "look" : "looks"}.{" "}
        <span className="muted">Saved on this device only. Choose a size on the product page to add to bag.</span>
      </p>
      <div className="saved-grid">
        {items.map((p) => (
          <ProductCard
            key={p.slug}
            product={p}
            action={
              <button type="button" className="card__x" onClick={() => toggleSaved(p.slug)} aria-label={`Remove ${p.name} from saved pieces`}>
                <CloseIcon />
              </button>
            }
          >
            <Link className="link" href={`/product/${p.slug}`} style={{ marginTop: 12, fontSize: 14 }}>
              View look<span className="sr-only">: {p.name}</span>
            </Link>
          </ProductCard>
        ))}
      </div>
    </>
  );
}
