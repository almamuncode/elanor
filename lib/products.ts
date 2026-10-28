/**
 * ÉLANOR sample catalogue.
 * Derived from website-kit/asset-manifest.json. Names, categories, colour labels and images
 * come from the manifest; prices and sizes are SAMPLE DATA for the demo and must be replaced
 * with confirmed product information before anything is sold.
 */

export const CURRENCY = { code: "BDT", locale: "en-US" } as const;

export const CATEGORIES = [
  { slug: "tailoring", label: "Tailoring" },
  { slug: "dresses", label: "Dresses" },
  { slug: "everyday", label: "Everyday" },
] as const;
export type Category = (typeof CATEGORIES)[number]["slug"];

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  colorLabel: string;
  /** Swatch colours used to illustrate the colourway. */
  swatches: string[];
  /** Sample price in whole BDT. */
  price: number;
  /** Short description shown under "Details & fit" (placeholder until real specs exist). */
  summary: string;
  front: ProductImage;
  back: ProductImage;
  detail: ProductImage;
}

const img = (file: string, alt: string): ProductImage => ({ src: `/images/${file}`, alt });

function look(
  slug: string,
  name: string,
  category: Category,
  colorLabel: string,
  swatches: string[],
  price: number,
  altBase: string,
  summary: string,
): Product {
  return {
    slug,
    name,
    category,
    colorLabel,
    swatches,
    price,
    summary,
    front: img(`product-${slug}.png`, `${altBase}, front view`),
    back: img(`product-${slug}-back.png`, `${altBase}, back view`),
    detail: img(`product-${slug}-detail.png`, `${altBase}, detail view`),
  };
}

/** Collection order (also used for "Featured" and "New arrivals" sorting). */
export const PRODUCTS: readonly Product[] = [
  look("rust-tailoring", "The Rust Tailoring Look", "tailoring", "Rust and ivory", ["#A4482A", "#EDE6D8"], 14500,
    "Rust blazer over an ivory top with ivory wide-leg trousers",
    "A tailored rust blazer worn over an ivory top, with high-rise, wide-leg ivory trousers."),
  look("black-knit", "The Cognac Knit Look", "everyday", "Black and cognac", ["#1A1A1A", "#9A5530"], 9800,
    "Black long-sleeve knit with cognac wide-leg trousers",
    "A fitted black long-sleeve knit with pleated, wide-leg cognac trousers."),
  look("striped-shirt", "The Striped Shirt Look", "everyday", "Pale blue and ivory", ["#AFC3E3", "#EDE6D8"], 7900,
    "Pale-blue striped shirt with ivory wide-leg trousers",
    "A relaxed pale-blue striped shirt with rolled sleeves and wide-leg ivory trousers."),
  look("olive-dress", "The Olive Midi Dress", "dresses", "Olive", ["#5A5E32"], 11200,
    "Olive long-sleeve midi dress",
    "A long-sleeve olive midi dress with full sleeves, a gathered waist and a flowing skirt."),
  look("ivory-cardigan", "The Ivory Cardigan Look", "everyday", "Ivory and chocolate", ["#EDE6D8", "#4A2E22"], 10400,
    "Ivory button-front cardigan with chocolate wide-leg trousers",
    "A cropped ivory button-front cardigan over a ribbed top, with chocolate wide-leg trousers."),
  look("sand-trench", "The Sand Trench Look", "tailoring", "Sand and black", ["#D2B98F", "#1A1A1A"], 16900,
    "Sand trench coat over a black top and black trousers",
    "A belted sand trench coat worn open over a black top and straight black trousers."),
  look("burgundy-dress", "The Burgundy Shirt Dress", "dresses", "Burgundy", ["#74202A"], 10800,
    "Burgundy long-sleeve button-front midi dress with waist tie",
    "A long-sleeve burgundy shirt dress with a button front, waist tie and midi skirt."),
  look("cream-coord", "The Cream Co-ord Look", "everyday", "Cream", ["#EFE7D6"], 12600,
    "Cream long-sleeve knit top with cream wide-leg trousers",
    "A soft cream knit top and matching wide-leg trousers, worn together as a co-ord."),
];

export const FEATURED_SLUGS = ["black-knit", "olive-dress", "sand-trench", "striped-shirt"] as const;

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function isCategory(value: string): value is Category {
  return CATEGORIES.some((c) => c.slug === value);
}

export function isSize(value: unknown): value is Size {
  return typeof value === "string" && (SIZES as readonly string[]).includes(value);
}

export function categoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.slug === category)?.label ?? category;
}

export function countIn(category: Category): number {
  return PRODUCTS.filter((p) => p.category === category).length;
}

/** Related looks: same category first, then the rest in collection order. */
export function relatedTo(slug: string, limit = 4): Product[] {
  const current = getProduct(slug);
  if (!current) return PRODUCTS.slice(0, limit);
  const others = PRODUCTS.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export const ALL_COLORS: readonly { label: string; swatch: string }[] = PRODUCTS.map((p) => ({
  label: p.colorLabel,
  swatch: p.swatches[0],
}));

/** Case-insensitive search across name, colour label and category. */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return PRODUCTS.filter((p) => {
    const hay = `${p.name} ${p.colorLabel} ${p.category} ${categoryLabel(p.category)}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

/** Illustrative size guide (cm). Not a real fit specification. */
export const SIZE_GUIDE: readonly { size: Size; bust: number; waist: number; hip: number }[] = [
  { size: "XS", bust: 80, waist: 62, hip: 88 },
  { size: "S", bust: 84, waist: 66, hip: 92 },
  { size: "M", bust: 88, waist: 70, hip: 96 },
  { size: "L", bust: 94, waist: 76, hip: 102 },
  { size: "XL", bust: 100, waist: 82, hip: 108 },
];
