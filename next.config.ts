import type { NextConfig } from "next";

// Phone/email are literals in src/lib/site.ts now; only the street is still env-driven.
const street = process.env.NEXT_PUBLIC_BUSINESS_STREET ?? "";
if (process.env.VERCEL_ENV === "production" && (!street.trim() || street.includes("TBD"))) {
  console.warn(
    "\n[vitrincabinetry] SEO: set NEXT_PUBLIC_BUSINESS_STREET to the real showroom address (NAP must match Google Business Profile).\n"
  );
}

// Static pages can't carry a per-request nonce, so inline scripts stay allowed.
// React needs eval in development only.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://*.clarity.ms`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  experimental: {
    inlineCss: true,
    optimizePackageImports: ["lucide-react"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/services/kitchen-cabinets",
        destination: "/cabinets/kitchen",
        permanent: true,
      },
      {
        source: "/services/bathroom-vanities",
        destination: "/cabinets/bath",
        permanent: true,
      },
      {
        source: "/services/living-room-units",
        destination: "/cabinets/built-ins",
        permanent: true,
      },
      {
        source: "/services/aging-in-place",
        destination: "/cabinets/aging-in-place",
        permanent: true,
      },
      // Legacy / guessed URLs that currently hard-404 (GSC "Blocked due to other 4xx").
      // www host 308s to apex; these keep crawl equity on real pages.
      { source: "/services", destination: "/cabinets", permanent: true },
      { source: "/services/:path*", destination: "/cabinets", permanent: true },
      { source: "/shop", destination: "/shop-tour", permanent: true },
      { source: "/products", destination: "/cabinets", permanent: true },
      { source: "/product", destination: "/cabinets", permanent: true },
      { source: "/kitchen", destination: "/cabinets/kitchen", permanent: true },
      { source: "/kitchen-cabinets", destination: "/cabinets/kitchen", permanent: true },
      { source: "/bathroom", destination: "/cabinets/bath", permanent: true },
      { source: "/bath", destination: "/cabinets/bath", permanent: true },
      { source: "/vanities", destination: "/cabinets/bath", permanent: true },
      { source: "/blog", destination: "/guides", permanent: true },
      { source: "/blog/:path*", destination: "/guides", permanent: true },
      { source: "/gallery", destination: "/portfolio", permanent: true },
      { source: "/projects", destination: "/portfolio", permanent: true },
      { source: "/our-work", destination: "/portfolio", permanent: true },
      // GSC 404 ghosts (not in sitemap) — send crawl equity to the Bucks County hub
      { source: "/locations", destination: "/custom-kitchen-cabinets/bucks-county", permanent: true },
      { source: "/locations/:path*", destination: "/custom-kitchen-cabinets/bucks-county", permanent: true },
      { source: "/areas", destination: "/custom-kitchen-cabinets/bucks-county", permanent: true },
      { source: "/areas/:path*", destination: "/custom-kitchen-cabinets/bucks-county", permanent: true },
      // GSC leftover schema SearchAction placeholder.
      { source: "/search", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
