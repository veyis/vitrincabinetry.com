import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { towns } from "@/lib/towns";
import { shareMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListJsonLd, toJsonLd } from "@/lib/schema";

const PAGE_TITLE = "Custom Kitchen Cabinets by Town";
const PAGE_DESC = `Custom kitchen cabinets for Easton, Bethlehem, Allentown and ${towns.length - 3} more Lehigh Valley and Bucks County towns. Pick your town for local process notes and a free design consultation.`;
const PAGE_PATH = "/custom-kitchen-cabinets";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_PATH },
  ...shareMetadata(PAGE_PATH, PAGE_TITLE, PAGE_DESC, {
    imagePath: "/images/heros/inset-shaker-kitchen-pennsylvania-stone-farmhouse.png",
    imageAlt: "Pennsylvania stone farmhouse custom inset kitchen cabinets by Vitrin Cabinetry",
  }),
};

function firstSentence(text: string): string {
  const m = text.match(/^[\s\S]*?[.!?](?=\s|$)/);
  return (m ? m[0] : text).trim();
}

export default function CustomKitchenCabinetsHub() {
  const pageUrl = `${site.url}${PAGE_PATH}`;
  const bucksUrl = `${pageUrl}/bucks-county`;

  const listLd = itemListJsonLd({
    name: "Custom kitchen cabinets by town",
    description: PAGE_DESC,
    url: `${pageUrl}#towns`,
    items: [
      {
        name: "Custom kitchen cabinets in Bucks County, PA",
        description: "Overview of custom kitchen cabinets across Bucks County.",
        url: bucksUrl,
      },
      ...towns.map((t) => ({
        name: `Custom kitchen cabinets in ${t.name}, PA`,
        description: firstSentence(t.intro),
        url: `${pageUrl}/${t.slug}`,
      })),
    ],
  });

  return (
    <main>
      <Navbar />

      <section className="hero" style={{ minHeight: "60vh", padding: "180px 0 80px" }}>
        <Image
          src="/images/heros/inset-shaker-kitchen-pennsylvania-stone-farmhouse.png"
          alt="Pennsylvania stone farmhouse custom inset kitchen cabinets by Vitrin Cabinetry"
          fill
          priority
          sizes="100vw"
          className="hero__image"
        />
        <div className="hero__overlay" />
        <div className="hero__inner">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ color: "rgba(255,255,255,0.8)" }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link>
            <span className="sep">/</span>
            <span aria-current="page" style={{ color: "#fff" }}>Custom kitchen cabinets</span>
          </nav>
          <span className="eyebrow" style={{ color: "#e6c87a" }}>Where we work</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", marginBottom: "1.25rem", color: "#fff" }}>
            Custom kitchen cabinets in Easton, the Lehigh Valley and Bucks County.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.92)", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
            {site.name} serves {site.areaServed.slice(0, -1).join(", ")} and {site.areaServed[site.areaServed.length - 1]}. Choose your town for local housing notes, permit information and a free design consultation.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-center">
            <span className="eyebrow">Choose your town</span>
            <h2 className="section-heading">Custom kitchen cabinets by town.</h2>
            <p className="section-sub">
              In Bucks County, see our <Link href="/custom-kitchen-cabinets/new-hope" className="text-link">wood kitchen cabinets in New Hope</Link> and the{" "}
              <Link href="/custom-kitchen-cabinets/bucks-county" className="text-link">Bucks County overview</Link>. In the Lehigh Valley, start with{" "}
              <Link href="/custom-kitchen-cabinets/easton" className="text-link">custom cabinets in Easton</Link>,{" "}
              <Link href="/custom-kitchen-cabinets/bethlehem" className="text-link">Bethlehem</Link> or{" "}
              <Link href="/custom-kitchen-cabinets/allentown" className="text-link">Allentown</Link>.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            <Link href="/custom-kitchen-cabinets/bucks-county" className="card">
              <h3 className="card__title">Bucks County, PA</h3>
              <p className="card__desc">
                Our overview of custom kitchen cabinets across Bucks County, with the process, pricing tiers and questions homeowners ask.
              </p>
              <div className="card__more">Bucks County overview →</div>
            </Link>
            {towns.map((t) => (
              <Link key={t.slug} href={`/custom-kitchen-cabinets/${t.slug}`} className="card">
                <h3 className="card__title">{t.name}, PA</h3>
                <p className="card__desc">{firstSentence(t.intro)}</p>
                <div className="card__more">Custom kitchen cabinets in {t.name} →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section--surface">
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <h2 className="section-heading">Not sure which page fits?</h2>
          <p className="section-sub" style={{ margin: "1rem auto 2rem" }}>
            If your town is not listed, ask us. We will confirm whether we can serve your address.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">Start a Conversation</Link>
            <Link href="/process" className="btn-secondary">See Our Process</Link>
          </div>
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Custom kitchen cabinets", url: pageUrl },
            ])
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(listLd) }} />
    </main>
  );
}
