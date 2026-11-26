import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you requested could not be found. Browse custom and stock cabinetry, recent projects, or contact our Easton, PA shop.",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main>
      <Navbar />

      <section
        className="section--surface"
        style={{
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          padding: "180px 0 100px",
        }}
      >
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <span className="eyebrow">404 — Page Not Found</span>
          <h1 className="section-heading">We couldn&apos;t find that page.</h1>
          <p className="section-sub" style={{ margin: "1rem auto 2.5rem" }}>
            The link may be outdated or the page may have moved. Explore our cabinet lines,
            recent Bucks County and Lehigh Valley projects, or get in touch with our Easton team.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/cabinets" className="btn-primary">
              Browse Cabinets
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              View Portfolio
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
