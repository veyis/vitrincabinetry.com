import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KitchenEstimator from "@/components/KitchenEstimator";
import { site } from "@/lib/site";
import { towns, getTown, type TownData } from "@/lib/towns";
import { breadcrumbSchema, cabinetStoreSchema, serviceSchema, faqPageJsonLd, toJsonLd } from "@/lib/schema";

type PageParams = { params: Promise<{ town: string }> };

const townProjectImages: Record<string, string> = {
  quakertown: "/images/heros/craftsman-hand-planing-white-oak-quakertown-workshop.png",
  perkasie: "/images/heros/heritage-green-custom-kitchen-cabinets-bucks-county.png",
  doylestown: "/images/heros/minimalist-white-oak-custom-kitchen-cabinetry.png",
  sellersville: "/images/heros/walnut-waterfall-island-modern-custom-kitchen.png",
  souderton: "/images/heros/sage-inset-cabinet-door-brass-cup-pull-detail.png",
  coopersburg: "/images/heros/calacatta-marble-kitchen-island-overhead.png",
  hellertown: "/images/heros/navy-blue-custom-kitchen-cabinets-twilight.png",
  emmaus: "/images/heros/indoor-outdoor-custom-kitchen-bucks-county-garden.png",
  harleysville: "/images/heros/inset-shaker-kitchen-pennsylvania-stone-farmhouse.png",
  lansdale: "/images/heros/minimalist-white-oak-custom-kitchen-cabinetry.png",
  "new-hope": "/images/heros/walnut-waterfall-island-modern-custom-kitchen.png",
  "center-valley": "/images/heros/heritage-green-custom-kitchen-cabinets-bucks-county.png",
  easton: "/images/heros/craftsman-hand-planing-white-oak-quakertown-workshop.png",
  bethlehem: "/images/heros/inset-shaker-kitchen-pennsylvania-stone-farmhouse.png",
  allentown: "/images/heros/calacatta-marble-kitchen-island-overhead.png",
};

export async function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { town: slug } = await params;
  const data = getTown(slug);
  if (!data) return {};
  return {
    title: `Custom Kitchen Cabinets in ${data.name}, PA`,
    description: slug === "new-hope"
      ? "Plan custom kitchen cabinets in New Hope, PA. Compare cabinet scope, prepare your measurements, and request confirmed pricing, availability, and delivery details."
      : `Custom kitchen cabinets in ${data.name}, PA built at our local workshop. Premium all-plywood boxes, dovetail drawers, lifetime warranty & transparent pricing tiers. Free 3D design consultation.`,
    alternates: { canonical: `/custom-kitchen-cabinets/${slug}` },
  };
}

const sharedWhyCards = [
  {
    title: "One shop, start to finish.",
    body: "The person who measures your kitchen is the person building your cabinets. No hand-offs, no catalog middleman — your project is built by the same shop that priced it.",
  },
  {
    title: "Bench-built, not catalog product.",
    body: "Every cabinet is built at our Easton shop — plywood box, dovetail drawers, soft-close hardware, finished in a dust-controlled spray booth.",
  },
  {
    title: "Transparent pricing tiers.",
    body: "We publish our project ranges so you can self-qualify before a single visit. No mystery, no \"call for pricing\" games.",
  },
  {
    title: "Lifetime cabinetry warranty.",
    body: "Our warranty covers our work for as long as you own the home — not the resale clock that catalog-cabinet warranties run on.",
  },
];

const sharedStyles = [
  { title: "Inset Shaker, painted", body: "Crisp lines, traditional bones, contemporary palette." },
  { title: "Two-tone (island contrast)", body: "Painted perimeter with a stained or contrasting island — fits farmhouse and transitional homes." },
  { title: "Rift-cut white oak, full-overlay", body: "Clean and modern. The favorite of newer construction and remodeled split-levels." },
  { title: "Traditional raised panel", body: "Holds up beautifully in historic homes where keeping period character matters." },
];

const sharedProcessSteps = [
  "Discovery call",
  "In-home survey & measurements",
  "Design & 3D renderings",
  "Materials & finishes",
  "Fabrication at our bench",
  "Installation by our crew",
  "Walkthrough & lifetime warranty",
];

function buildFaqs(data: TownData) {
  const base = [
    {
      q: `How long does a custom kitchen take in ${data.name}?`,
      a: "Most kitchens are 4–8 weeks in our shop after design lock, plus 1–2 weeks of installation. From signed contract to finished kitchen is typically 10–14 weeks depending on countertops and any structural scope.",
    },
    {
      q: `Do you handle permits in ${data.name}?`,
      a: `For straight cabinetry swaps no permit is usually needed. For projects that touch plumbing, electrical, structural walls, or HVAC, we coordinate with ${data.townships} and pull permits in your name. ${data.permitsNote}`,
    },
    {
      q: `What does a custom kitchen cost in ${data.name}?`,
      a: "Our Studio Semi-Custom kitchens run $30k–$55k. Signature Custom runs $55k–$95k. Signature Luxury starts at $95k. Pricing depends on cabinet count, materials, hardware, and counters. We publish line-item proposals so every dollar is accounted for.",
    },
    {
      q: `Can you match existing trim and millwork in older ${data.name} homes?`,
      a: "Yes. We build casework to match existing crown, base, and door casing profiles. For older homes we routinely scribe cabinets to plaster walls and uneven floors.",
    },
    {
      q: `Do you work with general contractors and designers in ${data.name}?`,
      a: `Yes — we run a Trade Program for designers, architects, and GCs in ${data.name} and the surrounding Bucks/Lehigh counties. See the Trade page for details.`,
    },
  ];
  return [...base, ...(data.extraFaqs ?? [])];
}

export default async function TownPage({ params }: PageParams) {
  const { town: slug } = await params;
  const data = getTown(slug);
  if (!data) notFound();

  const pageUrl = `${site.url}/custom-kitchen-cabinets/${data.slug}`;
  const faqs = buildFaqs(data);
  const faqSchema = faqPageJsonLd(faqs);

  const whyCards = [{ title: `We are local — actually local.`, body: data.whyLocalLine }, ...sharedWhyCards];

  return (
    <main>
      <Navbar />

      <section className="hero" style={{ minHeight: "70vh", padding: "180px 0 100px" }}>
        <Image
          src="/images/heros/inset-shaker-kitchen-pennsylvania-stone-farmhouse.png"
          alt={`Pennsylvania stone farmhouse custom inset kitchen cabinets by Vitrin Cabinetry, serving ${data.name}, PA`}
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
            <Link href="/custom-kitchen-cabinets/bucks-county" style={{ color: "inherit" }}>Bucks County</Link>
            <span className="sep">/</span>
            <span aria-current="page" style={{ color: "#fff" }}>{data.name}, PA</span>
          </nav>
          <span className="eyebrow" style={{ color: "#e6c87a" }}>{data.name}, PA</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", marginBottom: "1.25rem", color: "#fff" }}>
            Custom kitchen cabinets in {data.name}, PA.
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.92)", maxWidth: "640px", margin: "0 auto", lineHeight: 1.6 }}>{data.intro}</p>
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">Start a Conversation</Link>
            <Link href="/process" className="btn-secondary" style={{ background: "transparent", color: "#fff", borderColor: "#fff" }}>See Our Process</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-center">
            <span className="eyebrow">Two ways to buy in {data.name}</span>
            <h2 className="section-heading">Stock and custom cabinets — one Easton shop, both delivered to {data.name}.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            <Link href="/cabinets/stock" className="card">
              <h3 className="card__title">Stock cabinets in {data.name}</h3>
              <p className="card__desc">
                {slug === "new-hope"
                  ? "Ask which stock sizes, finishes, and hardware are available for your project. Confirm collection or delivery arrangements and timing with your quote; our Easton showroom is in prelaunch."
                  : <>In-showroom inventory ready for pickup or delivery to {data.name}. Plywood boxes, Blum hardware, dovetail drawers. Best for rentals, bath vanities, mudrooms, and fast-turn contractor jobs.</>}
              </p>
              <div className="card__more">Browse Vitrin Stock →</div>
            </Link>
            <Link href="/cabinets/custom" className="card">
              <h3 className="card__title">Custom kitchens in {data.name}</h3>
              <p className="card__desc">
                Built at our Easton bench to your kitchen&apos;s exact dimensions. Delivered to {data.name} when ready — install if you&apos;d like us to, or your contractor&apos;s crew if you wouldn&apos;t.
              </p>
              <div className="card__more">Order a Vitrin Signature kitchen →</div>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="two-col" style={{ alignItems: "center" }}>
            <div style={{ position: "relative", minHeight: "440px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
              <Image
                src={townProjectImages[slug] || "/images/heros/inset-shaker-kitchen-pennsylvania-stone-farmhouse.png"}
                alt={`Custom kitchen cabinetry project in ${data.name}, PA by Vitrin Cabinetry`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  background: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                {data.name}, PA Project · Handcrafted In-House
              </div>
            </div>
            <div>
              <span className="eyebrow">Recent Local Project</span>
              <h2 className="section-heading">{data.projectTitle}</h2>
              <div className="prose" style={{ marginTop: "1rem" }}>
                {data.projectBody.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {slug === "new-hope" && (
        <section className="section--surface" aria-labelledby="new-hope-planning">
          <div className="container--narrow prose">
            <span className="eyebrow">Plan your cabinet inquiry</span>
            <h2 id="new-hope-planning">What to prepare for a New Hope kitchen cabinet quote</h2>
            <p>
              Start with the room and the work you need, rather than a cabinet style alone.
              Tell us whether your project is in New Hope Borough or Solebury Township,
              whether you are keeping the current layout, and who will handle installation.
            </p>
            <ul>
              <li><strong>Room details:</strong> send approximate wall lengths, ceiling height, door and window positions, and appliance model numbers. Initial measurements support a discussion; confirm final dimensions before ordering.</li>
              <li><strong>Cabinet scope:</strong> identify the base and wall cabinets, island, pantry storage, fillers, finished end panels, and hardware you want included.</li>
              <li><strong>Related work:</strong> separate cabinetry from countertops, demolition, plumbing, electrical work, and installation so you can compare quotes on the same basis.</li>
              <li><strong>Site access and timing:</strong> describe stairs, door widths, delivery access, and where cabinets could be stored. Ask for confirmed availability and a delivery plan before scheduling other trades.</li>
            </ul>
            <h3>Confirm availability before arranging a visit or collection</h3>
            <p>
              Our Easton showroom is in prelaunch. Pricing, cabinet availability, delivery,
              and any appointment arrangements need confirmation with your inquiry.
              Check the <Link href="/showroom" className="text-link">current showroom information</Link> before travelling.
            </p>
            <p>
              <Link href="/contact" className="text-link">Send your New Hope cabinet inquiry</Link> with
              your approximate dimensions, preferred finish, budget range, and target dates.
            </p>
          </div>
        </section>
      )}

      <section>
        <div className="container">
          <KitchenEstimator townName={data.name} townSlug={data.slug} />
        </div>
      </section>

      <section className="section--surface">
        <div className="container">
          <div className="section-center">
            <span className="eyebrow">Why {data.name} Homeowners Pick Vitrin</span>
            <h2 className="section-heading">Five reasons clients in {data.name} choose us.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {whyCards.map((r) => (
              <div key={r.title} className="card">
                <h3 className="card__title">{r.title}</h3>
                <p className="card__desc">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-center">
            <span className="eyebrow">Styles Popular in {data.name}</span>
            <h2 className="section-heading">What looks right in a {data.name} house.</h2>
            <p className="section-sub">
              Built around the town&apos;s housing stock — {data.housing}. {data.popularStyleNote}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {sharedStyles.map((s) => (
              <div key={s.title} className="card">
                <h3 className="card__title">{s.title}</h3>
                <p className="card__desc">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--surface">
        <div className="container">
          <div className="two-col">
            <div>
              <span className="eyebrow">Our Process</span>
              <h2 className="section-heading">From discovery call to lifetime warranty.</h2>
              <p className="section-sub" style={{ marginTop: "1rem" }}>
                Seven steps, one team. Every step happens with the same people from start to finish — no hand-offs, no franchise process.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <Link href="/process" className="btn-secondary">See the Full Process</Link>
              </div>
            </div>
            <div>
              <ol style={{ listStyle: "none", padding: 0 }}>
                {sharedProcessSteps.map((step, i) => (
                  <li key={step} style={{ display: "flex", gap: "1rem", padding: "0.65rem 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--primary)", fontFamily: "var(--font-serif)", width: "1.5rem" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container--narrow">
          <div className="section-center">
            <span className="eyebrow">FAQs</span>
            <h2 className="section-heading">Questions {data.name} homeowners ask us.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <div key={f.q} className="faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container--narrow prose" style={{ textAlign: "center" }}>
          <h2>More than cabinets in {data.name}.</h2>
          <p>
            Most of our {data.name} projects grow past the cabinet order — <Link href="/countertops">quartz, granite, and porcelain countertops</Link> templated after the boxes are set, <Link href="/flooring">LVP, hardwood, and tile flooring</Link> sequenced correctly against the install, <Link href="/closets">custom closets</Link> off the same bench, or a <Link href="/remodeling">complete kitchen or bath remodel</Link> run on one calendar.
          </p>
        </div>
      </section>

      <section className="section--surface">
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <h2 className="section-heading">Ready to design your {data.name} kitchen?</h2>
          <p className="section-sub" style={{ margin: "1rem auto 2rem" }}>
            Free 30-minute discovery call. We&apos;ll talk through your space, budget tier, and what custom actually means for your house.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">Start a Conversation</Link>
            <Link href="/shop-tour" className="btn-secondary">Take the Shop Tour</Link>
          </div>
          <div style={{ marginTop: "2rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Vitrin Cabinetry · {site.address.locality}, {site.address.region} {site.address.postalCode} · {site.phoneDisplay}
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
              { name: "Bucks County", url: `${site.url}/custom-kitchen-cabinets/bucks-county` },
              { name: `${data.name}, PA`, url: pageUrl },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(cabinetStoreSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: toJsonLd(
            serviceSchema({
              name: `Custom Kitchen Cabinets in ${data.name}, PA`,
              description: `Custom kitchen cabinetry bench-built and installed in ${data.name}, PA by Vitrin Cabinetry. Plywood boxes, in-house crew, lifetime warranty.`,
              url: pageUrl,
              serviceType: "Custom Kitchen Cabinets",
            })
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }} />
    </main>
  );
}
