import { site } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const LLMS_TXT = `# ${site.name}

> ${site.name} is a premier custom cabinetry, countertop, and kitchen & bathroom remodeling design studio based in Easton, PA, serving the Lehigh Valley and Bucks County.

Vitrin Cabinetry specializes in bench-built custom and semi-custom kitchen cabinets, bathroom vanities, custom closet systems, luxury countertops (quartz, granite, porcelain), and complete kitchen and bathroom remodeling. Every project combines photorealistic 3D design, precision engineering, and dedicated project management.

Phone: ${site.phoneDisplay}
Email: ${site.email}
Location: ${site.address.locality}, ${site.address.region} ${site.address.postalCode}
Primary Service Areas: ${site.areaServed.join(", ")}

## Products & Cabinets

- [Custom Kitchen Cabinets](${site.url}/cabinets/kitchen): Inset, full overlay, and frameless custom kitchen cabinetry built to exact architectural dimensions
- [Custom Bathroom Vanities](${site.url}/cabinets/bath): Custom and semi-custom bath storage, double vanities, and floating powder room designs
- [Custom Closets](${site.url}/closets): Walk-in wardrobes, reach-in closet organization, dressing rooms, and accessory islands
- [Built-In Cabinetry](${site.url}/cabinets/built-ins): Mudroom lockers, entertainment centers, home offices, and custom architectural millwork
- [Stock & Semi-Custom Cabinets](${site.url}/cabinets/stock): Value-engineered designer cabinetry with rapid lead times
- [Aging-In-Place Cabinets](${site.url}/cabinets/aging-in-place): Accessible cabinetry with pull-down shelving, touch-to-open hardware, and universal design

## Countertops & Surfaces

- [Countertops Overview](${site.url}/countertops): Premium fabricated and installed quartz, granite, and ultra-compact porcelain slabs
- [Flooring Collection](${site.url}/flooring): Luxury vinyl plank (LVP), engineered hardwood, solid hardwood, and custom tile installations

## Remodeling & Design Services

- [Kitchen Remodeling](${site.url}/remodeling): Complete design-build kitchen transformations including demolition, framing, plumbing, electrical, lighting, cabinetry, and tile
- [Design Process](${site.url}/process): Complimentary design consultation, laser site measurements, photorealistic 3D renderings, and turnkey installation
- [Showroom & Shop Tour](${site.url}/shop-tour): Explore cabinet finishes, door profiles, quartz displays, and drawer construction in person
- [Trade Accounts](${site.url}/trade): Dedicated trade pricing, wholesale programs, and priority drafting for builders, architects, and general contractors

## Regional Service Areas

${site.areaServed.map((town) => `- [Custom Cabinets in ${town}](${site.url}/custom-kitchen-cabinets/${town.toLowerCase().replace(/,\s*pa$/, "").replace(/\s+/g, "-")}): Cabinet design, measuring, and delivery in ${town}`).join("\n")}
`;

export async function GET() {
  return new Response(LLMS_TXT.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
