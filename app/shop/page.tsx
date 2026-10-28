import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ShopView from "@/components/ShopView";
import ProductCard from "@/components/ProductCard";
import EditBanner from "@/components/EditBanner";
import { CATEGORIES, countIn, PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop the collection",
  description: "Eight sample looks across tailoring, dresses and everyday pieces.",
};

/** Rendered in the static shell before the URL's filters are read on the client. */
function ShopFallback() {
  return (
    <>
      <div className="toolbar">
        <div className="wrap toolbar__in">
          <nav className="tabs" aria-label="Categories">
            <Link className="tab" href="/shop" aria-current="true">
              All<sup>{PRODUCTS.length}</sup>
            </Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} className="tab" href={`/shop?category=${c.slug}`}>
                {c.label}
                <sup>{countIn(c.slug)}</sup>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="wrap">
        <div className="pgrid">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <EditBanner />
        <div className="pgrid" style={{ paddingTop: 0 }}>
          {PRODUCTS.slice(4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Shop</span>
        </nav>
        <div className="pagehead">
          <h1 className="d-xl">The collection</h1>
          <p>
            Eight looks across tailoring, dresses and everyday pieces. <span className="muted">Sample products for the demo.</span>
          </p>
        </div>
      </div>
      <Suspense fallback={<ShopFallback />}>
        <ShopView />
      </Suspense>
    </>
  );
}
