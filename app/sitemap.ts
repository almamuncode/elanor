import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { POLICIES } from "@/lib/policies";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
  ];
  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
    images: [`${SITE_URL}${p.front.src}`],
  }));
  const policies: MetadataRoute.Sitemap = POLICIES.map((p) => ({
    url: `${SITE_URL}/policies/${p.slug}`,
    changeFrequency: "yearly",
    priority: 0.2,
  }));
  return [...pages, ...products, ...policies];
}
