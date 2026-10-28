import { categoryLabel, isCategory, isSize, PRODUCTS, searchProducts, type Category, type Product, type Size } from "./products";

export const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "new", label: "New arrivals" },
  { value: "name", label: "Name, A–Z" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
] as const;
export type Sort = (typeof SORTS)[number]["value"];

export interface ShopState {
  categories: Category[];
  sizes: Size[];
  colors: string[];
  q: string;
  sort: Sort;
}

export const EMPTY_STATE: ShopState = { categories: [], sizes: [], colors: [], q: "", sort: "featured" };

export const colorSlug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const COLOR_BY_SLUG = new Map(PRODUCTS.map((p) => [colorSlug(p.colorLabel), p.colorLabel]));

export function isSort(v: string | null): v is Sort {
  return SORTS.some((s) => s.value === v);
}

function list(sp: URLSearchParams, key: string): string[] {
  return (sp.get(key) ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function parseShopState(sp: URLSearchParams): ShopState {
  const sort = sp.get("sort");
  return {
    categories: [...new Set(list(sp, "category").filter(isCategory))],
    sizes: [...new Set(list(sp, "size").map((s) => s.toUpperCase()).filter(isSize))],
    colors: [...new Set(list(sp, "color").map((c) => COLOR_BY_SLUG.get(c)).filter((c): c is string => c !== undefined))],
    q: (sp.get("q") ?? "").slice(0, 80),
    sort: isSort(sort) ? sort : "featured",
  };
}

export function toQuery(state: ShopState): string {
  const sp = new URLSearchParams();
  if (state.categories.length) sp.set("category", state.categories.join(","));
  if (state.sizes.length) sp.set("size", state.sizes.join(","));
  if (state.colors.length) sp.set("color", state.colors.map(colorSlug).join(","));
  if (state.q.trim()) sp.set("q", state.q.trim());
  if (state.sort !== "featured") sp.set("sort", state.sort);
  const s = sp.toString();
  return s ? `/shop?${s}` : "/shop";
}

export function applyShopState(state: ShopState): Product[] {
  let items: Product[] = state.q.trim() ? searchProducts(state.q) : [...PRODUCTS];
  if (state.categories.length) items = items.filter((p) => state.categories.includes(p.category));
  // Size: every sample look is offered in every sample size, so a size filter keeps all looks
  // until real inventory data exists. Filter here by availability once stock is known.
  if (state.colors.length) items = items.filter((p) => state.colors.includes(p.colorLabel));
  const order = new Map(PRODUCTS.map((p, i) => [p.slug, i]));
  switch (state.sort) {
    case "name":
      return items.sort((a, b) => a.name.localeCompare(b.name));
    case "price-asc":
      return items.sort((a, b) => a.price - b.price);
    case "price-desc":
      return items.sort((a, b) => b.price - a.price);
    default:
      return items.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
  }
}

export function activeFilterCount(state: ShopState): number {
  return state.categories.length + state.sizes.length + state.colors.length;
}

export function describeCategories(state: ShopState): string {
  return state.categories.map(categoryLabel).join(", ");
}
