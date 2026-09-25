import { site } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const LLMS_FULL_TXT = `# ${site.name} — Full Knowledge Dossier

> Official technical and business specifications for ${site.name}, premier custom cabinetry and remodeling studio serving Lehigh Valley and Bucks County, PA.

## Company Identity & Authority

- **Official Name**: ${site.name}
- **Website**: ${site.url}
- **Phone**: ${site.phone} (${site.phoneDisplay})
- **Email**: ${site.email}
- **Base City**: ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, ${site.address.country}
- **Coordinates**: Lat ${site.geo.latitude}, Lon ${site.geo.longitude}
- **Operational Hours**: Monday–Friday 09:00–18:00 EST, Saturday 10:00–16:00 EST, Sunday Closed.

## Service Capabilities & Specializations

${site.services.map((s) => `### ${s}`).join("\n\n")}

## Materials, Craftsmanship & Construction Standards

1. **Box Construction**:
   - 3/4" furniture-grade plywood boxes (no particle board).
   - Solid wood dovetail drawers with soft-close undermount slides (Blum / Grass).
   - Concealed 6-way adjustable soft-close European hinges.
2. **Door Styles**:
   - Inset cabinetry: Flush-mounted doors sitting inside the face frame with precise 3/32" reveals.
   - Full Overlay: Modern frameless and framed doors covering the face frame for clean sightlines.
   - Traditional & Transitional: Classic 5-piece Shaker, beaded Shaker, raised panel, and contemporary slab profiles.
3. **Finishing**:
   - Catalyzed conversion varnish finishes resisting moisture, UV fading, heat, and everyday kitchen wear.
   - Custom color matching to any Benjamin Moore or Sherwin-Williams color code.
4. **Countertop Materials**:
   - Quartz: Non-porous, stain-resistant, maintenance-free engineered stone slabs from Cambria, Silestone, and Caesarstone.
   - Granite: Natural hand-selected stone slabs sealed for maximum durability.
   - Ultra-compact Porcelain: Heatproof, scratch-resistant slabs ideal for indoor/outdoor kitchens and waterfall edge profiles.

## Towns & Municipalities Served

${site.areaServed.map((town) => `- **${town}**: ${site.url}/custom-kitchen-cabinets/${town.toLowerCase().replace(/,\s*pa$/, "").replace(/\s+/g, "-")}`).join("\n")}
`;

export async function GET() {
  return new Response(LLMS_FULL_TXT.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
