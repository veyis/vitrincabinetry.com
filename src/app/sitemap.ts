import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { towns } from "@/lib/towns";
import { projects } from "@/lib/projects";
import { guides } from "@/lib/guides";

const base = site.url;

// Real content-change dates, not build time. Google's John Mueller and Gary
// Illyes have both stated that if every URL in a sitemap carries the same
// lastmod — which `new Date()` at render time guarantees — Google stops
// trusting the field and ignores lastmod for the whole site. 45 of these 57
// URLs previously shared one timestamp to the millisecond.
//
// These are the last commit dates of the source each group renders from
// (`git log -1 --format=%cs -- <path>`). Bump the constant in the same commit
// that changes the content it covers.
const UPDATED = {
  core: "2026-08-02",          // src/app/page.tsx and the static marketing routes
  cabinets: "2026-07-04",      // src/app/cabinets/**
  services: "2026-07-04",      // remodeling, countertops, flooring, closets
  supporting: "2026-07-04",    // installation, showroom
  pillar: "2026-08-02",        // src/app/custom-kitchen-cabinets/**
  towns: "2026-07-04",         // src/lib/towns.ts
  projects: "2026-07-04",      // src/lib/projects.ts
} as const;

export default function sitemap(): MetadataRoute.Sitemap {

  const core: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: UPDATED.core, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/process`, lastModified: UPDATED.core, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/about`, lastModified: UPDATED.core, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/shop-tour`, lastModified: UPDATED.core, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/trade`, lastModified: UPDATED.core, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, lastModified: UPDATED.core, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/guides`, lastModified: UPDATED.core, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: UPDATED.core, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: UPDATED.core, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: UPDATED.core, changeFrequency: "yearly", priority: 0.2 },
  ];

  const cabinets: MetadataRoute.Sitemap = [
    { url: `${base}/cabinets`,                lastModified: UPDATED.cabinets, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/cabinets/stock`,          lastModified: UPDATED.cabinets, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/cabinets/custom`,         lastModified: UPDATED.cabinets, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/cabinets/kitchen`,        lastModified: UPDATED.cabinets, changeFrequency: "monthly", priority: 0.9  },
    { url: `${base}/cabinets/bath`,           lastModified: UPDATED.cabinets, changeFrequency: "monthly", priority: 0.9  },
    { url: `${base}/cabinets/built-ins`,      lastModified: UPDATED.cabinets, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/cabinets/aging-in-place`, lastModified: UPDATED.cabinets, changeFrequency: "monthly", priority: 0.8  },
  ];

  const services: MetadataRoute.Sitemap = [
    { url: `${base}/remodeling`,  lastModified: UPDATED.services, changeFrequency: "monthly", priority: 0.9  },
    { url: `${base}/countertops`, lastModified: UPDATED.services, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/flooring`,    lastModified: UPDATED.services, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/closets`,     lastModified: UPDATED.services, changeFrequency: "monthly", priority: 0.85 },
  ];

  const supporting: MetadataRoute.Sitemap = [
    { url: `${base}/installation`, lastModified: UPDATED.supporting, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${base}/showroom`,     lastModified: UPDATED.supporting, changeFrequency: "monthly", priority: 0.7 },
  ];

  const pillars: MetadataRoute.Sitemap = [
    { url: `${base}/custom-kitchen-cabinets/bucks-county`, lastModified: UPDATED.pillar, changeFrequency: "weekly", priority: 0.95 },
  ];

  const townPages: MetadataRoute.Sitemap = towns.map((t) => ({
    url: `${base}/custom-kitchen-cabinets/${t.slug}`,
    lastModified: UPDATED.towns,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: UPDATED.projects,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: new Date(g.datePublished),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...core, ...cabinets, ...services, ...supporting, ...pillars, ...townPages, ...projectPages, ...guidePages];
}
