import React from "react";
import Link from "next/link";

/**
 * Full-width dark band CTA — "Bulk pricing for contractors and trade."
 * Used on /, /cabinets, /cabinets/stock.
 */
export default function TradeCalloutStrip() {
  return (
    <section className="section--dark" aria-label="Trade pricing">
      <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 320px" }}>
          <div className="eyebrow" style={{ color: "var(--accent-on-dark)" }}>For Trade</div>
          <p style={{ fontSize: "1.15rem", lineHeight: 1.5, margin: "0.5rem 0 0", color: "var(--text-on-dark)" }}>
            <strong>Bulk pricing for contractors, builders, and trade.</strong>{" "}
            No minimums on the first order.
          </p>
        </div>
        <Link href="/trade" className="btn-primary" style={{ background: "var(--accent-on-dark)", color: "var(--surface-dark)" }}>
          Apply for trade pricing →
        </Link>
      </div>
    </section>
  );
}
