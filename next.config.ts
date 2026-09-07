import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy, deployed Report-Only first: violations are POSTed
 * to /api/report (logged server-side) without blocking anything. Promote to
 * the enforcing header once the log stays clean for a few weeks.
 *
 * `'unsafe-inline'` for scripts is deliberate: Next's hydration payload, the
 * theme/consent/a11y bootstraps and the JSON-LD are inline, and nonces would
 * require per-request rendering — which would undo the static generation
 * restored in audit item U1. Hash-pinning the three bootstraps is the next
 * hardening step.
 *
 * When analytics land (audit item U2) add the vendor origins to script-src,
 * connect-src and img-src.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
  "report-uri /api/report",
].join("; ");

const securityHeaders = [
  // Two years, subdomains, preload-list eligible. Ignored over plain HTTP.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // The contact form must never be embeddable in a third-party iframe.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  ...(isProd ? [{ key: "Content-Security-Policy-Report-Only", value: csp }] : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow running a second dev server with its own build cache to avoid
  // ".next" lock conflicts (set NEXT_DIST_DIR for the secondary instance).
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    // Portfolio images request quality 85; Next 15 requires it to be listed.
    qualities: [75, 85],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
