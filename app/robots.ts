import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

/** The concept demo is hidden from search engines until NEXT_PUBLIC_ALLOW_INDEXING=true. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOW_INDEXING ? { userAgent: "*", allow: "/", disallow: ["/bag", "/saved"] } : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
