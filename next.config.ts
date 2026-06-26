import type { NextConfig } from "next";

// basePath is empty by default (works at domain root, e.g. Vercel).
// GitHub Pages serves the site under /fashion-hero-shop, so the deploy
// workflow sets NEXT_PUBLIC_BASE_PATH=/fashion-hero-shop at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
