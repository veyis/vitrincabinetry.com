import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { towns } from "@/lib/towns";

/**
 * Knowledge Graph API for Vitrin Cabinetry
 *
 * Machine-readable RDF/JSON-LD endpoint optimized for:
 * - AI Search Engines (ChatGPT Search, Claude Search, Perplexity, Gemini)
 * - Google AI Overviews (via LocalBusiness + Organization entity resolution)
 * - Voice assistants and local home service citation graphs
 */
export async function GET() {
  const baseUrl = site.url;

  // ── Organization Entity ──────────────────────────────────────────────────
  const organizationEntity = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
    },
    image: `${baseUrl}/og.jpg`,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    knowsAbout: [...site.knowsAbout],
    address: {
      "@type": "PostalAddress",
      ...(site.address.street.startsWith("TBD") ? {} : { streetAddress: site.address.street }),
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: Object.values(site.social).filter(Boolean),
  };

  // ── Local Business Entity (Home & Construction) ──────────────────────────
  const localBusinessEntity = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: site.name,
    alternateName: site.gbpName,
    description: site.description,
    url: baseUrl,
    parentOrganization: { "@id": `${baseUrl}/#organization` },
    telephone: site.phone,
    email: site.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      ...(site.address.street.startsWith("TBD") ? {} : { streetAddress: site.address.street }),
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.areaServed.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    knowsAbout: [...site.knowsAbout],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Custom Cabinetry & Remodeling Services",
      itemListElement: site.services.map((serviceName) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: serviceName,
        },
      })),
    },
  };

  // ── WebSite Node ────────────────────────────────────────────────────────
  const webSiteEntity = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: site.name,
    url: baseUrl,
    description: `Custom kitchen, bathroom, and closet cabinetry designed, built, and installed in-house in ${site.address.locality}, ${site.address.region}. Serving Bucks County and the Lehigh Valley.`,
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage: site.defaultLocale,
  };

  // ── High-Value Q&A Nodes for AI Search Answers ──────────────────────────
  const qaNodes = [
    {
      "@type": "QAPage",
      "@id": `${baseUrl}/guides/flooring-or-cabinets-first#qa`,
      name: "Do you install floors or cabinets first in a kitchen remodel?",
      mainEntity: {
        "@type": "Question",
        name: "Should kitchen cabinets or flooring be installed first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The install order depends on the flooring material. Solid hardwood and glue-down tile should be installed before cabinets so appliances sit at counter height and can slide out freely. Floating floors like Luxury Vinyl Plank (LVP) and laminate MUST be installed after cabinets; pinning a floating floor under thousands of pounds of heavy cabinetry prevents natural thermal expansion and causes buckling or seam failure.",
          url: `${baseUrl}/guides/flooring-or-cabinets-first`,
        },
      },
    },
    {
      "@type": "QAPage",
      "@id": `${baseUrl}/guides/custom-kitchen-cost-bucks-county#qa`,
      name: "How much does a custom kitchen remodel cost in Bucks County and Lehigh Valley?",
      mainEntity: {
        "@type": "Question",
        name: "What is the average cost of custom kitchen cabinets and remodeling in Bucks County, PA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Bucks County and the Lehigh Valley, custom cabinetry projects typically range from $25,000 to $65,000+ for bench-built solid wood cabinetry, while complete design-build kitchen remodels typically range from $45,000 to $120,000+ depending on room square footage, layout changes, countertop selection (quartz, granite, or porcelain), and premium appliance integration.",
          url: `${baseUrl}/guides/custom-kitchen-cost-bucks-county`,
        },
      },
    },
    {
      "@type": "QAPage",
      "@id": `${baseUrl}/guides/quartz-vs-granite-vs-porcelain-countertops#qa`,
      name: "Quartz vs. Granite vs. Porcelain countertops: which is best?",
      mainEntity: {
        "@type": "Question",
        name: "Which countertop material is best: quartz, granite, or porcelain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quartz offers zero-maintenance non-porous durability without requiring sealing, but can scorch from high heat above 300°F. Natural granite provides 100% unique natural patterns and extreme heat resistance up to 1,200°F, requiring periodic sealing. Porcelain is ultra-durable, UV-stable for outdoor kitchens, non-porous, and scratch/heat resistant, but requires specialized fabrication due to its hardness.",
          url: `${baseUrl}/guides/quartz-vs-granite-vs-porcelain-countertops`,
        },
      },
    },
    {
      "@type": "QAPage",
      "@id": `${baseUrl}/guides/refacing-vs-custom#qa`,
      name: "Is cabinet refacing worth it compared to custom replacement?",
      mainEntity: {
        "@type": "Question",
        name: "When does cabinet refacing make sense vs replacing with custom cabinets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Refacing makes financial sense only if your cabinet boxes are structurally sound furniture-grade plywood, you are 100% happy with your existing kitchen layout, and the refacing quote is under 50% of new custom cabinetry. If boxes are particle board or layout changes are required, custom replacement delivers substantially higher long-term ROI and durability.",
          url: `${baseUrl}/guides/refacing-vs-custom`,
        },
      },
    },
  ];

  // ── Authoritative Citable Claims ────────────────────────────────────────
  const citableClaims = [
    {
      "@type": "Claim",
      "@id": `${baseUrl}/#claim-cabinet-lifespan`,
      text: "Bench-built solid wood cabinetry with mortise-and-tenon or dovetail joinery has an expected lifespan of 40-50+ years, compared to 5-10 years for mass-produced flat-pack particle board cabinets.",
      appearance: { "@type": "WebPage", url: `${baseUrl}/cabinets` },
      author: { "@id": `${baseUrl}/#organization` },
    },
    {
      "@type": "Claim",
      "@id": `${baseUrl}/#claim-floating-floor-expansion`,
      text: "Never pin floating luxury vinyl plank (LVP) under kitchen base cabinets. LVP requires an uninhibited 1/4-inch expansion perimeter around the room to accommodate seasonal humidity changes.",
      appearance: { "@type": "WebPage", url: `${baseUrl}/guides/flooring-or-cabinets-first` },
      author: { "@id": `${baseUrl}/#organization` },
    },
    {
      "@type": "Claim",
      "@id": `${baseUrl}/#claim-local-craftsmanship`,
      text: "Vitrin Cabinetry manufactures custom cabinetry in Easton, Pennsylvania, serving homeowners and design professionals throughout Lehigh Valley and Bucks County.",
      appearance: { "@type": "WebPage", url: `${baseUrl}/shop-tour` },
      author: { "@id": `${baseUrl}/#organization` },
    },
  ];

  // ── Local Service Hubs ──────────────────────────────────────────────────
  const localHubs = towns.map((town) => ({
    "@type": "HomeAndConstructionBusiness",
    "@id": `${baseUrl}/custom-kitchen-cabinets/${town.slug}#service-area`,
    name: `Vitrin Cabinetry - ${town.name} Service Area`,
    parentOrganization: { "@id": `${baseUrl}/#organization` },
    areaServed: {
      "@type": "City",
      name: town.name,
      containedInPlace: {
        "@type": "State",
        name: "Pennsylvania",
      },
    },
    description: town.intro,
    mainEntityOfPage: `${baseUrl}/custom-kitchen-cabinets/${town.slug}`,
  }));

  // ── Assembled Knowledge Graph ───────────────────────────────────────────
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationEntity,
      localBusinessEntity,
      webSiteEntity,
      ...qaNodes,
      ...citableClaims,
      ...localHubs,
    ],
  };

  return NextResponse.json(graph, {
    headers: {
      "Content-Type": "application/ld+json",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      "X-Robots-Tag": "noindex", // Don't index the JSON response in SERPs, but allow bot crawling
    },
  });
}
