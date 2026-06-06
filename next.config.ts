import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow running a second dev server with its own build cache to avoid
  // ".next" lock conflicts (set NEXT_DIST_DIR for the secondary instance).
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
