import { getProduct, isSize, type Size } from "./products";

/* Pure helpers for the bag and saved pieces, kept free of React so they can be unit tested. */

export interface BagLine {
  slug: string;
  color: string;
  size: Size;
  qty: number;
}

export const MAX_QTY = 10;
export const BAG_KEY = "elanor.bag.v1";
export const SAVED_KEY = "elanor.saved.v1";

export const lineKey = (l: Pick<BagLine, "slug" | "color" | "size">) => `${l.slug}|${l.color}|${l.size}`;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export function isBagLine(v: unknown): v is BagLine {
  if (!isRecord(v)) return false;
  const product = typeof v.slug === "string" ? getProduct(v.slug) : undefined;
  return (
    product !== undefined &&
    v.color === product.colorLabel &&
    isSize(v.size) &&
    typeof v.qty === "number" &&
    Number.isInteger(v.qty) &&
    v.qty >= 1 &&
    v.qty <= MAX_QTY
  );
}

function isSavedSlug(v: unknown): v is string {
  return typeof v === "string" && getProduct(v) !== undefined;
}

/** Keep valid lines only and merge duplicates (quantity capped at MAX_QTY). */
export function parseBag(v: unknown): BagLine[] {
  if (!Array.isArray(v)) return [];
  const seen = new Map<string, BagLine>();
  for (const item of v.filter(isBagLine)) {
    const key = lineKey(item);
    const prev = seen.get(key);
    seen.set(key, prev ? { ...prev, qty: Math.min(MAX_QTY, prev.qty + item.qty) } : { ...item });
  }
  return [...seen.values()];
}

/** Keep known product slugs only, without duplicates. */
export function parseSaved(v: unknown): string[] {
  return Array.isArray(v) ? [...new Set(v.filter(isSavedSlug))] : [];
}

/** Parse a stored JSON string; anything unreadable becomes null. */
export function safeParse(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
