/**
 * Public site settings. Set NEXT_PUBLIC_SITE_URL to the deployed origin (e.g. https://elanor.example)
 * so canonical URLs, Open Graph images and the sitemap use absolute links.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const SITE_NAME = "ÉLANOR";

/** Search engines are asked not to index the demo unless explicitly enabled. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
