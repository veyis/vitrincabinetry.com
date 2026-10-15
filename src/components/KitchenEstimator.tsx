"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

interface KitchenEstimatorProps {
  townName?: string;
  townSlug?: string;
}

type LayoutType = "galley" | "l-shape" | "u-shape" | "island";
type CabinetTier = "studio" | "signature" | "estate";
type CountertopType = "none" | "quartz" | "porcelain";

interface LayoutOption {
  id: LayoutType;
  name: string;
  linearFeet: string;
  baseMultiplier: number;
  description: string;
}

const LAYOUTS: LayoutOption[] = [
  {
    id: "galley",
    name: "Galley / Compact",
    linearFeet: "10 – 14 linear ft",
    baseMultiplier: 1.0,
    description: "Efficient parallel or single-wall layout ideal for urban homes and historic rowhouses.",
  },
  {
    id: "l-shape",
    name: "L-Shaped",
    linearFeet: "15 – 20 linear ft",
    baseMultiplier: 1.35,
    description: "Classic corner configuration providing natural work-triangle flow and open dining sightlines.",
  },
  {
    id: "u-shape",
    name: "U-Shaped",
    linearFeet: "20 – 26 linear ft",
    baseMultiplier: 1.7,
    description: "Maximum perimeter storage with three connected walls of cabinetry and counter space.",
  },
  {
    id: "island",
    name: "Perimeter + Center Island",
    linearFeet: "26+ linear ft",
    baseMultiplier: 2.1,
    description: "Expansive open-concept design featuring a dedicated entertaining island and full cabinetry suite.",
  },
];

const TIERS = [
  {
    id: "studio" as CabinetTier,
    name: "Vitrin Studio",
    subtitle: "Semi-Custom",
    startingBase: 28000,
    features: [
      "All-plywood box construction (3/4\" shelves)",
      "Blum soft-close concealed hardware",
      "Factory-catalyzed baked finish",
      "Curated door styles & finishes",
    ],
  },
  {
    id: "signature" as CabinetTier,
    name: "Vitrin Signature",
    subtitle: "Bench-Built Custom",
    startingBase: 48000,
    badge: "Most Popular",
    features: [
      "Bench-built in our local workshop",
      "Exact 1/16\" dimensional tailoring to room walls",
      "Solid maple / white oak dovetail drawers",
      "Hand-scribed face frames & custom moldings",
      "Lifetime cabinetry craft warranty",
    ],
  },
  {
    id: "estate" as CabinetTier,
    name: "Architectural Estate",
    subtitle: "Full Bespoke Luxury",
    startingBase: 82000,
    features: [
      "Rare hardwood species (Rift White Oak, Walnut)",
      "Fully integrated appliance paneling & matching hutches",
      "Custom butler pantries & illuminated interiors",
      "Curved millwork & architectural metal insets",
      "White-glove design-to-installation supervision",
    ],
  },
];

export default function KitchenEstimator({ townName = "Upper Bucks", townSlug = "" }: KitchenEstimatorProps) {
  const [layout, setLayout] = useState<LayoutType>("l-shape");
  const [tier, setTier] = useState<CabinetTier>("signature");
  const [countertop, setCountertop] = useState<CountertopType>("quartz");
  const [includeRemodelScope, setIncludeRemodelScope] = useState<boolean>(false);

  const estimate = useMemo(() => {
    const selectedLayout = LAYOUTS.find((l) => l.id === layout)!;
    const selectedTier = TIERS.find((t) => t.id === tier)!;

    const baseCost = selectedTier.startingBase * selectedLayout.baseMultiplier;

    let counterCost = 0;
    if (countertop === "quartz") {
      counterCost = 4500 * selectedLayout.baseMultiplier;
    } else if (countertop === "porcelain") {
      counterCost = 8500 * selectedLayout.baseMultiplier;
    }

    let remodelScopeCost = 0;
    if (includeRemodelScope) {
      remodelScopeCost = 14000 * selectedLayout.baseMultiplier;
    }

    const totalLow = Math.round((baseCost + counterCost + remodelScopeCost) / 1000) * 1000;
    const totalHigh = Math.round(((baseCost * 1.25) + (counterCost * 1.2) + (remodelScopeCost * 1.3)) / 1000) * 1000;

    return {
      low: totalLow.toLocaleString(),
      high: totalHigh.toLocaleString(),
      cabinetsLow: Math.round(baseCost / 1000) * 1000,
      cabinetsHigh: Math.round((baseCost * 1.25) / 1000) * 1000,
    };
  }, [layout, tier, countertop, includeRemodelScope]);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "clamp(1.5rem, 4vw, 3rem)",
        margin: "2.5rem 0",
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 2.5rem" }}>
        <span
          style={{
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "var(--primary)",
            fontWeight: 600,
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Instant Project Estimator
        </span>
        <h3 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)", marginBottom: "0.75rem" }}>
          Estimate Your Custom Kitchen in {townName}, PA
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}>
          Select your floorplan and craftsmanship tier to generate an immediate, transparent budget range based on verified local project data.
        </p>
      </div>

      <div style={{ display: "grid", gap: "2rem" }}>
        {/* Step 1: Layout Selection */}
        <div>
          <label
            style={{
              display: "block",
              fontWeight: 600,
              fontSize: "0.95rem",
              marginBottom: "0.85rem",
              color: "var(--text)",
            }}
          >
            1. Select Kitchen Layout &amp; Approximate Size
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {LAYOUTS.map((item) => {
              const active = layout === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLayout(item.id)}
                  style={{
                    textAlign: "left",
                    padding: "1.2rem",
                    borderRadius: "10px",
                    border: `2px solid ${active ? "var(--primary)" : "var(--border)"}`,
                    background: active ? "rgba(130, 100, 48, 0.05)" : "var(--background)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: "1rem", color: "var(--text)", marginBottom: "0.25rem" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 500, marginBottom: "0.4rem" }}>
                    {item.linearFeet}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                    {item.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Cabinet Tier Selection */}
        <div>
          <label
            style={{
              display: "block",
              fontWeight: 600,
              fontSize: "0.95rem",
              marginBottom: "0.85rem",
              color: "var(--text)",
            }}
          >
            2. Choose Cabinetry Craftsmanship Level
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            {TIERS.map((item) => {
              const active = tier === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTier(item.id)}
                  style={{
                    position: "relative",
                    textAlign: "left",
                    padding: "1.25rem",
                    borderRadius: "10px",
                    border: `2px solid ${active ? "var(--primary)" : "var(--border)"}`,
                    background: active ? "rgba(130, 100, 48, 0.05)" : "var(--background)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "12px",
                        background: "var(--primary)",
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <div style={{ fontWeight: 600, fontSize: "1.05rem", color: "var(--text)" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 500, marginBottom: "0.75rem" }}>
                    {item.subtitle}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.8rem", color: "var(--text-secondary)", display: "grid", gap: "0.35rem" }}>
                    {item.features.map((f, i) => (
                      <li key={i} style={{ display: "flex", gap: "0.4rem", alignItems: "baseline" }}>
                        <span style={{ color: "var(--primary)" }}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Countertops & Complete Remodel Scope */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          <div>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "0.95rem",
                marginBottom: "0.6rem",
                color: "var(--text)",
              }}
            >
              3. Countertop Preference
            </label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {[
                { id: "none" as CountertopType, label: "Cabinets Only" },
                { id: "quartz" as CountertopType, label: "Custom Quartz / Granite" },
                { id: "porcelain" as CountertopType, label: "Calacatta Porcelain / Quartzite" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCountertop(opt.id)}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    border: `1px solid ${countertop === opt.id ? "var(--primary)" : "var(--border)"}`,
                    background: countertop === opt.id ? "var(--primary)" : "var(--background)",
                    color: countertop === opt.id ? "#fff" : "var(--text)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "0.95rem",
                marginBottom: "0.6rem",
                color: "var(--text)",
              }}
            >
              4. Complete Turnkey Remodeling Scope
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                cursor: "pointer",
                padding: "0.65rem 1rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                background: includeRemodelScope ? "rgba(130, 100, 48, 0.05)" : "var(--background)",
              }}
            >
              <input
                type="checkbox"
                checked={includeRemodelScope}
                onChange={(e) => setIncludeRemodelScope(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--primary)", cursor: "pointer" }}
              />
              <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>
                Include full demolition, electrical, plumbing, lighting &amp; tile installation
              </span>
            </label>
          </div>
        </div>

        {/* Calculation Result Callout */}
        <div
          style={{
            background: "var(--background)",
            border: "2px solid var(--primary)",
            borderRadius: "12px",
            padding: "1.75rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--primary)", fontWeight: 600 }}>
              Estimated Investment Range
            </div>
            <div style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700, color: "var(--text)", fontFamily: "var(--font-serif)", lineHeight: 1.1, margin: "0.3rem 0" }}>
              ${estimate.low} – ${estimate.high}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              *Includes custom fabrication at our local workshop, Blum soft-close hardware, delivery to {townName}, PA, and dedicated professional installation.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", justifyContent: "center" }}>
            <Link
              href={`/contact?town=${townSlug || "local"}`}
              className="btn-primary"
              style={{
                textAlign: "center",
                padding: "0.85rem 1.5rem",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Lock In Your {townName} Design Slot →
            </Link>
            <div style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Or call our team directly at <a href={`tel:${site.phone}`} style={{ color: "var(--primary)", fontWeight: 600 }}>{site.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
