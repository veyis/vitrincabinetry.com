import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { getGuide } from "@/lib/guides";
import { TradeGuideContent } from "@/components/TradeGuideContent";
import { breadcrumbSchema, toJsonLd, articleJsonLd } from "@/lib/schema";

const SLUG = "stock-vs-custom-cabinets-when-to-choose-each";
const meta = getGuide(SLUG)!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.excerpt,
  alternates: { canonical: `/guides/${SLUG}` },
};

export default function StockVsCustomPage() {
  const pageUrl = `${site.url}/guides/${SLUG}`;

  const articleSchema = articleJsonLd({
    headline: meta.title,
    description: meta.excerpt,
    url: pageUrl,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified ?? meta.datePublished,
  });

  return (
    <main>
      <Navbar />

      <section className="subhero">
        <div className="container--narrow">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/guides">Guides</Link>
            <span className="sep">/</span>
            <span aria-current="page">Stock vs. Custom Cabinets</span>
          </nav>
          <span className="eyebrow">Decision Guide · {meta.readingMinutes} min read</span>
          <h1 className="section-heading">{meta.title}</h1>
          <p className="section-sub" style={{ margin: "1rem auto 0" }}>
            {meta.excerpt}
          </p>
        </div>
      </section>

      <TradeGuideContent slug={SLUG} />

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(articleSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Guides", url: `${site.url}/guides` },
              { name: meta.title, url: pageUrl },
            ])
          ),
        }}
      />
    </main>
  );
}
