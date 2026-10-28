"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getProduct, type Size } from "./products";
import { BAG_KEY, MAX_QTY, SAVED_KEY, lineKey, parseBag, parseSaved, safeParse, type BagLine } from "./bag-storage";

export type { BagLine } from "./bag-storage";
export { MAX_QTY, lineKey } from "./bag-storage";

export type Overlay = "menu" | "search" | "bag" | null;

function readJSON(key: string): unknown {
  try {
    return safeParse(window.localStorage.getItem(key));
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode, quota): the session still works in memory */
  }
}

/* --------------------------------------------------------------- context */

interface StoreValue {
  hydrated: boolean;
  lines: BagLine[];
  bagCount: number;
  subtotal: number;
  saved: string[];
  addToBag: (slug: string, size: Size, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  moveToSaved: (key: string) => void;
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
  overlay: Overlay;
  openOverlay: (o: Exclude<Overlay, null>) => void;
  closeOverlay: () => void;
  lastAdded: { slug: string; size: Size } | null;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [lines, setLines] = useState<BagLine[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [lastAdded, setLastAdded] = useState<StoreValue["lastAdded"]>(null);
  const skipWrite = useRef(true);

  // Load persisted state after mount so server and first client render match.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating from localStorage must happen after mount
    setLines(parseBag(readJSON(BAG_KEY)));
    setSaved(parseSaved(readJSON(SAVED_KEY)));
    setHydrated(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === BAG_KEY) setLines(parseBag(readJSON(BAG_KEY)));
      if (e.key === SAVED_KEY) setSaved(parseSaved(readJSON(SAVED_KEY)));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (skipWrite.current) {
      skipWrite.current = false;
      return;
    }
    writeJSON(BAG_KEY, lines);
    writeJSON(SAVED_KEY, saved);
  }, [hydrated, lines, saved]);

  const addToBag = useCallback((slug: string, size: Size, qty: number) => {
    const product = getProduct(slug);
    if (!product) return;
    const add = Math.max(1, Math.min(MAX_QTY, Math.round(qty)));
    setLines((prev) => {
      const key = lineKey({ slug, color: product.colorLabel, size });
      const existing = prev.find((l) => lineKey(l) === key);
      if (existing) return prev.map((l) => (l === existing ? { ...l, qty: Math.min(MAX_QTY, l.qty + add) } : l));
      return [...prev, { slug, color: product.colorLabel, size, qty: add }];
    });
    setLastAdded({ slug, size });
    setOverlay("bag");
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    const next = Math.max(1, Math.min(MAX_QTY, Math.round(qty)));
    setLines((prev) => prev.map((l) => (lineKey(l) === key ? { ...l, qty: next } : l)));
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => lineKey(l) !== key));
    setLastAdded(null);
  }, []);

  const moveToSaved = useCallback(
    (key: string) => {
      const line = lines.find((l) => lineKey(l) === key);
      if (!line) return;
      setSaved((s) => (s.includes(line.slug) ? s : [...s, line.slug]));
      setLines((prev) => prev.filter((l) => lineKey(l) !== key));
      setLastAdded(null);
    },
    [lines],
  );

  const toggleSaved = useCallback((slug: string) => {
    setSaved((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const openOverlay = useCallback((o: Exclude<Overlay, null>) => {
    if (o !== "bag") setLastAdded(null);
    setOverlay(o);
  }, []);
  const closeOverlay = useCallback(() => {
    setOverlay(null);
    setLastAdded(null);
  }, []);

  const value = useMemo<StoreValue>(() => {
    const subtotal = lines.reduce((sum, l) => sum + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
    return {
      hydrated,
      lines,
      bagCount: lines.reduce((n, l) => n + l.qty, 0),
      subtotal,
      saved,
      addToBag,
      setQty,
      removeLine,
      moveToSaved,
      isSaved: (slug) => saved.includes(slug),
      toggleSaved,
      overlay,
      openOverlay,
      closeOverlay,
      lastAdded,
    };
  }, [hydrated, lines, saved, overlay, lastAdded, addToBag, setQty, removeLine, moveToSaved, toggleSaved, openOverlay, closeOverlay]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
