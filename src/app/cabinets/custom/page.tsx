import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConstructionSpecs from "@/components/ConstructionSpecs";
import InstallOptionalNote from "@/components/InstallOptionalNote";
import { site } from "@/lib/site";
import { breadcrumbSchema, toJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Custom Kitchen Cabinets, Built in Easton",
  description:
    "Discuss custom cabinetry with Vitrin Cabinetry in Easton. Our showroom is in prelaunch; design options, pricing, and production timing are confirmed with your inquiry.",
  alternates: { canonical: "/cabinets/custom" },
};

const orderSteps = [
  { title: "Discovery", body: "Discuss your scope, location, budget tier, and target dates. Call arrangements are confirmed with your inquiry." },
  { title: "In-home survey", body: "Measurement and survey arrangements are confirmed before an appointment is booked." },
  { title: "Design & quote", body: "Discuss 3D renderings and a line-item written quote. Design scope and timing are confirmed for your project." },
  { title: "Fabrication", body: "Production timing and progress-update arrangements are confirmed with your project quote." },
  { title: "Delivery (install optional)", body: "Discuss home or jobsite delivery and optional installation. Availability and timing are confirmed with your quote." },
];

export default function CustomPage() {
  const pageUrl = `${site.url}/cabinets/custom`;
  return (
    <main>
      <Navbar />

      <section className="hero" style={{ minHeight: "55vh", padding: "180px 0 60px" }}>
        <Image
          src="/images/heros/calacatta-marble-kitchen-island-overhead.png"
          alt="Custom Vitrin Signature kitchen with honed Calacatta marble island, built at our Easton bench"
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
            <Link href="/cabinets" style={{ color: "inherit" }}>Cabinets</Link>
            <span className="sep">/</span>
            <span aria-current="page" style={{ color: "#fff" }}>Custom</span>
          </nav>
          <span className="eyebrow" style={{ color: "#e6c87a" }}>Vitrin Signature</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", marginBottom: "1.25rem", color: "#fff" }}>
            Custom cabinets, built at our Easton bench.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.92)", maxWidth: "640px", margin: "0 auto", lineHeight: 1.6 }}>
            Discuss cabinetry for your kitchen&apos;s dimensions, style, and finish. Our Easton showroom is in prelaunch; design options, pricing, and production timing are confirmed with your inquiry.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="two-col">
            <div>
              <span className="eyebrow">What custom means</span>
              <h2 className="section-heading">Built to fit your house — not the next house over.</h2>
              <div className="prose">
                <p>
                  Vitrin Signature cabinets are drawn, milled, assembled, and finished at our Easton shop. We don&apos;t resell a manufactured line. Every box is built for your dimensions, in the door style and finish you chose.
                </p>
                <p>
                  Most of our Signature kitchens land between $35,000 and $90,000 in cabinetry alone. Final figure depends on box count, door style, wood species, and accessory choices.
                </p>
              </div>
            </div>
            <div>
              <h3 style={{ marginTop: 0, fontSize: "1.3rem", marginBottom: "0.75rem", color: "var(--text)" }}>What you can choose</h3>
              <ul style={{ paddingLeft: "1.1rem", color: "var(--text-secondary)" }}>
                <li><strong>Door styles:</strong> inset Shaker, full-overlay Shaker, beaded inset, slab modern, raised panel, mullion glass — and bespoke styles drawn to your reference.</li>
                <li><strong>Wood species:</strong> rift-cut white oak, walnut, cherry, maple, paint-grade poplar/MDF.</li>
                <li><strong>Finishes:</strong> any Benjamin Moore, Sherwin-Williams, or Farrow &amp; Ball color — plus stained, glazed, or limed.</li>
                <li><strong>Accessories:</strong> integrated trash pull-outs, spice racks, knife drawers, plate slots, lighted interiors, charging stations.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ConstructionSpecs />

      <section className="section--surface">
        <div className="container--narrow">
          <div className="section-center">
            <span className="eyebrow">How ordering works</span>
            <h2 className="section-heading">From first sketch to delivery — five steps.</h2>
          </div>
          <ol role="list" aria-label="Custom kitchen ordering steps" style={{ listStyle: "none", padding: 0 }}>
            {orderSteps.map((s, i) => (
              <li key={s.title} className="step">
                <div className="step__num">{String(i + 1).padStart(2, "0")}</div>
                <div className="step__body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/process" className="btn-secondary">See the full ordering process</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-center">
            <span className="eyebrow">Lead time</span>
            <h2 className="section-heading">Confirm the schedule for your project.</h2>
            <p className="section-sub">
              Tell us your target dates. We will confirm design, fabrication, and collection or delivery timing with your quote. You can also ask about <Link href="/cabinets/stock" className="text-link">Vitrin Stock</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section--surface">
        <div className="container--narrow">
          <InstallOptionalNote />
        </div>
      </section>

      <section>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-heading">Start a custom kitchen</h2>
          <p className="section-sub" style={{ margin: "1rem auto 2rem" }}>
            Tell us the room, budget tier, and target dates. We will follow up about options and any discovery-call arrangements.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact?type=custom" className="btn-primary">Ask about custom cabinetry</Link>
            <Link href="/showroom" className="btn-secondary">Ask about a showroom visit</Link>
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
              { name: "Cabinets", url: `${site.url}/cabinets` },
              { name: "Custom", url: pageUrl },
            ])
          ),
        }}
      />
    </main>
  );
}
