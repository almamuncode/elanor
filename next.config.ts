import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires an explicit allowlist of image qualities.
    qualities: [75],
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
