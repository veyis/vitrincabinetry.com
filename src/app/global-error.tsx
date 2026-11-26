"use client";

import { useEffect } from "react";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--surface)",
            color: "var(--text)",
            padding: "4rem 1.5rem",
          }}
        >
          <div className="container--narrow" style={{ textAlign: "center" }}>
            <span className="eyebrow">{site.name}</span>
            <h1 className="section-heading">We ran into an unexpected error.</h1>
            <p className="section-sub" style={{ margin: "1rem auto 2.5rem" }}>
              Try reloading the page, or reach our Easton shop directly at{" "}
              <a href={`tel:${site.phone}`} className="text-link">
                {site.phoneDisplay}
              </a>
              .
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button type="button" onClick={reset} className="btn-primary">
                Reload page
              </button>
              <Link href="/" className="btn-secondary">
                Return home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
