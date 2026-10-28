"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import { CATEGORIES, countIn, PRODUCTS, type Category } from "@/lib/products";
import { activeFilterCount, applyShopState, EMPTY_STATE, isSort, parseShopState, SORTS, toQuery, type ShopState } from "@/lib/shop-filters";
import ProductCard from "./ProductCard";
import FiltersDrawer from "./FiltersDrawer";
import EditBanner from "./EditBanner";
import { FilterIcon } from "./Icons";

export default function ShopView() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const state = useMemo(() => parseShopState(new URLSearchParams(sp.toString())), [sp]);
  const results = useMemo(() => applyShopState(state), [state]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const update = (next: ShopState) => router.replace(toQuery(next), { scroll: false });
  const filterCount = activeFilterCount(state);
  const single = state.categories.length === 1 ? state.categories[0] : null;
  const tabHref = (category: Category | null) => toQuery({ ...state, categories: category ? [category] : [] });

  // Close the drawer if Next hides this route (Activity) so it is not open on return.
  useLayoutEffect(() => () => setFiltersOpen(false), []);

  return (
    <>
      <div className="toolbar">
        <div className="wrap toolbar__in">
          <nav className="tabs" aria-label="Categories">
            <Link className="tab" href={tabHref(null)} scroll={false} aria-current={state.categories.length === 0 ? "true" : undefined}>
              All<sup>{PRODUCTS.length}</sup>
            </Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} className="tab" href={tabHref(c.slug)} scroll={false} aria-current={single === c.slug ? "true" : undefined}>
                {c.label}
                <sup>{countIn(c.slug)}</sup>
              </Link>
            ))}
          </nav>
          <div className="tools desk-only">
            <span className="body-s muted">
              {results.length} {results.length === 1 ? "look" : "looks"}
            </span>
            <button type="button" className="tool" onClick={() => setFiltersOpen(true)} aria-haspopup="dialog">
              <FilterIcon />
              Filter{filterCount > 0 && ` (${filterCount})`}
            </button>
            <label className="tool">
              <span className="tool-label">Sort:</span>
              <select className="select" value={state.sort} onChange={(e) => {
                  const v = e.target.value;
                  if (isSort(v)) update({ ...state, sort: v });
                }}>
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="mob-tools mob-only">
          <span className="body-s muted">
            {results.length} {results.length === 1 ? "look" : "looks"}
          </span>
          <button type="button" className="tool" onClick={() => setFiltersOpen(true)} aria-haspopup="dialog">
            <FilterIcon />
            Filter &amp; sort{filterCount > 0 && ` (${filterCount})`}
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {results.length} {results.length === 1 ? "look" : "looks"} shown
        </p>

        {state.q && (
          <p className="body-s" style={{ margin: "24px 0 0" }}>
            Results for “{state.q}”.{" "}
            <Link className="link" href={toQuery({ ...state, q: "" })} scroll={false}>
              Clear search
            </Link>
          </p>
        )}

        {results.length === 0 ? (
          <div className="empty">
            <h2 className="d-m">No looks match these filters</h2>
            <p>Try removing a filter or clearing your search.</p>
            <button type="button" className="btn" onClick={() => update(EMPTY_STATE)}>
              Clear all
            </button>
          </div>
        ) : (
          <>
            <div className="pgrid">
              {results.slice(0, 4).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
            {results.length > 4 ? (
              <>
                <EditBanner />
                <div className="pgrid" style={{ paddingTop: 0 }}>
                  {results.slice(4).map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </>
            ) : (
              <EditBanner />
            )}
          </>
        )}
        {results.length > 0 && (
          <p className="endnote">
            {results.length === PRODUCTS.length ? `You've seen all ${PRODUCTS.length} looks.` : `Showing ${results.length} of ${PRODUCTS.length} looks.`}
          </p>
        )}
      </div>

      <FiltersDrawer key={`${pathname}?${sp.toString()}`} open={filtersOpen} state={state} onClose={() => setFiltersOpen(false)} onApply={update} />
    </>
  );
}
