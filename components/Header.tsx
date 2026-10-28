"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { useStore } from "@/lib/store";
import { BagIcon, HeartIcon, MenuIcon, SearchIcon } from "./Icons";

export const NAV = [
  { href: "/shop", label: "Shop", match: (p: string) => p.startsWith("/shop") || p.startsWith("/product") },
  { href: "/shop?sort=new", label: "New arrivals", match: () => false },
  { href: "/about", label: "About", match: (p: string) => p.startsWith("/about") },
] as const;

function NavLinks({ pathname }: { pathname: string | null }) {
  return (
    <nav className="hdr__nav" aria-label="Primary">
      {NAV.map((n) => (
        <Link key={n.label} href={n.href} aria-current={pathname && n.match(pathname) ? "page" : undefined}>
          {n.label}
        </Link>
      ))}
    </nav>
  );
}

function ActiveNavLinks() {
  return <NavLinks pathname={usePathname()} />;
}

export default function Header() {
  const { hydrated, bagCount, saved, openOverlay } = useStore();
  const savedCount = hydrated ? saved.length : 0;
  const bagN = hydrated ? bagCount : 0;

  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <button type="button" className="hdr__btn hdr__menu" onClick={() => openOverlay("menu")} aria-label="Open menu" aria-haspopup="dialog">
          <MenuIcon />
        </button>
        <Link className="wordmark" href="/" aria-label="ÉLANOR home">
          ÉLANOR
        </Link>
        <Suspense fallback={<NavLinks pathname={null} />}>
          <ActiveNavLinks />
        </Suspense>
        <div className="hdr__tools">
          <button type="button" className="hdr__btn" onClick={() => openOverlay("search")} aria-label="Search" aria-haspopup="dialog">
            <SearchIcon />
            <span className="txt">Search</span>
          </button>
          <Link className="hdr__btn desk-only" href="/saved" aria-label={`Saved pieces, ${savedCount} ${savedCount === 1 ? "item" : "items"}`}>
            <HeartIcon />
            {savedCount > 0 && <span className="n">{savedCount}</span>}
          </Link>
          <button
            type="button"
            className="hdr__btn"
            onClick={() => openOverlay("bag")}
            aria-label={`Bag, ${bagN} ${bagN === 1 ? "item" : "items"}`}
            aria-haspopup="dialog"
          >
            <BagIcon />
            <span className="txt">Bag</span>
            {bagN > 0 && <span className="n">{bagN}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
