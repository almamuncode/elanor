import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires an explicit allowlist of image qualities.
    qualities: [75],
    // Prefer AVIF (smallest), then WebP; the PNG masters are only used as the source.
    formats: ["image/avif", "image/webp"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
