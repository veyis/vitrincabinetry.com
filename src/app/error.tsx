"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <main>
      <section
        className="section--surface"
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          padding: "160px 0 100px",
        }}
      >
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <span className="eyebrow">Something went wrong</span>
          <h1 className="section-heading">We hit a snag loading this page.</h1>
          <p className="section-sub" style={{ margin: "1rem auto 2.5rem" }}>
            Please try again, or head back to explore our cabinetry and showroom in Easton, PA.
            If the issue persists, call us at{" "}
            <a href={`tel:${site.phone}`} className="text-link">
              {site.phoneDisplay}
            </a>
            .
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" onClick={reset} className="btn-primary">
              Try again
            </button>
            <Link href="/" className="btn-secondary">
              Back to home
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
