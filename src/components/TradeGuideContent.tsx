import Link from "next/link";

type GuideSection = {
  heading: string;
  paragraphs: string[];
  checklist?: string[];
  link?: { href: string; label: string };
};

const content = {
  "setting-up-a-trade-cabinet-account": [
    {
      heading: "Who the trade account is for",
      paragraphs: [
        "Vitrin works with general contractors, kitchen and bath installers, builders, interior designers, and architects. A trade account gives you a standing contact for cabinet quotes and orders; it does not require you to hand over the installation or your client relationship. Tell us whether you need ready-to-order stock cabinets, built-to-spec Vitrin Signature cabinetry, or both.",
        "Start with a real project, even if the dimensions are preliminary. The first conversation is more useful when we know the site, schedule, desired finish, and whether your crew or ours will install. We can then tell you which details are needed for a firm cabinet order and which can wait until a site measure.",
      ],
      checklist: ["Your company name and primary contact", "The project location and target install window", "A plan, sketch, or rough room dimensions", "Cabinet style, finish, hardware, and appliance information you already have"],
      link: { href: "/trade", label: "See the trade program" },
    },
    {
      heading: "From application to first order",
      paragraphs: [
        "Apply through the trade contact form and describe the project you want priced. The trade page says the pricing sheet is sent after approval, with a response target of two business days. Stock orders can usually be priced the same day once the items are specified; most preliminary custom quotes take up to five business days. These are quoting targets, not a promise that a cabinet order will be ready on that date.",
        "Before approving an order, check the written cabinet list, dimensions, finish, panel and trim requirements, delivery method, and who is responsible for site measurement. A custom order enters the shop queue after specifications are settled. The published Signature planning range is four to eight weeks; ask your rep to confirm the window for your actual order and any selections that may change it.",
      ],
      checklist: ["Request an itemized quote and identify allowances", "Confirm whether installation, delivery, tax, and handling are included", "Approve the final drawings and finish samples before fabrication", "Ask for the confirmed pickup or delivery date in writing"],
    },
    {
      heading: "Pricing and account terms",
      paragraphs: [
        "Vitrin's trade pricing is tiered by volume, with additional terms discussed for multi-unit and new-construction work. The pricing sheet follows approval; a public page cannot tell you what your particular order will cost. Account terms are considered after the first paid order, so plan to agree the first order's payment schedule before production or pickup.",
        "Your rep can coordinate future quotes using the same product and finish decisions where they still apply. Keep a record of approved drawings and change orders so the next kitchen does not inherit a dimension or appliance assumption from the last one.",
      ],
      link: { href: "/contact?type=trade", label: "Apply for trade pricing" },
    },
  ],
  "stock-vs-custom-cabinets-when-to-choose-each": [
    {
      heading: "Choose for the room and the deadline",
      paragraphs: [
        "Stock cabinets are the useful choice when a standard size and available finish fit the plan and the schedule is tight. You trade some control over dimensions and details for a shorter path to an order. Custom cabinets are the useful choice when the room has awkward dimensions, a specific design intent, or storage needs that standard boxes cannot solve cleanly.",
        "At Vitrin, stock and Signature custom are separate paths through the same Easton shop. The trade program lists stock orders as ready for pickup or shipment on a shorter schedule and Signature builds as a four-to-eight-week planning range. Check current availability and the actual production slot before promising an install date to a client.",
      ],
      checklist: ["Measure the room and note out-of-square walls, soffits, and ceiling changes", "List appliances and required clearances before choosing cabinet widths", "Decide which visible details must match exactly", "Set the latest acceptable delivery date before comparing options"],
      link: { href: "/cabinets/stock", label: "Explore stock cabinets" },
    },
    {
      heading: "Compare the full installed scope",
      paragraphs: [
        "A lower cabinet price does not always produce a lower finished-kitchen price. Stock layouts may need fillers, wider trim, or changes to the planned storage. A custom layout can make better use of a difficult corner or a narrow run, but requires design approval and shop time. Price the same countertop, hardware, installation, delivery, and finish scope on both quotes before comparing totals.",
        "Ask who measures the room, who orders replacement pieces if a dimension changes, and how the installer will handle walls that are not straight. For custom work, approve drawings and finish samples before fabrication. For stock, confirm the exact boxes and any end panels are available together, not just the headline door style.",
      ],
      checklist: ["Cabinet boxes and door finish", "Panels, fillers, moldings, and toe kicks", "Hardware, organizers, and specialty storage", "Delivery or pickup, installation, and disposal"],
    },
    {
      heading: "A practical decision rule",
      paragraphs: [
        "Use stock when the layout works with standard boxes, the finish is acceptable, and speed matters more than exact sizing. Use custom when forcing standard boxes into the room would compromise the result, or when a particular construction, finish, or storage detail is the point of the project. A mixed plan can also work: reserve custom for the focal run and use stock where dimensions are ordinary, provided the finishes coordinate.",
        "Bring the same plan to both quote conversations. Vitrin can price the alternatives against one set of dimensions so the tradeoffs are visible rather than theoretical.",
      ],
      link: { href: "/cabinets/custom", label: "Explore Vitrin Signature custom cabinets" },
    },
  ],
  "buying-cabinets-for-a-spec-home": [
    {
      heading: "Set the specification before you shop",
      paragraphs: [
        "A spec-home cabinet package must fit the target buyer, the floor plan, and the construction schedule. Start with the kitchen, bath, and utility-room plans rather than a door sample. Mark every appliance, window, outlet, and plumbing rough-in that controls a cabinet dimension. Decide which choices are fixed for the build and which can remain buyer selections without stopping the cabinet order.",
        "If the home is meant to be sold before finishes are chosen, document a base package and a small set of priced upgrades. Too many open decisions delay drawings and make allowances hard to explain. The cabinet quote should make the base scope and each optional change distinct.",
      ],
      checklist: ["Floor plans and current framing dimensions", "Appliance specifications and service rough-ins", "Base door style, finish, hardware, and interior features", "A date for final selections and a date for installation"],
      link: { href: "/trade", label: "See Vitrin's builder program" },
    },
    {
      heading: "Match stock or custom to the sales plan",
      paragraphs: [
        "Stock cabinets can suit a repeatable plan when sizes and finish options cover the room. Vitrin's trade program offers volume pricing on stock for spec homes. Custom cabinetry is worth evaluating when a distinctive kitchen is part of the home's position, or when a buyer is involved early enough to approve the design before production. A late custom change can move the finish schedule even if the cabinet price is acceptable.",
        "Compare cabinet construction, finish availability, replacement-piece lead time, and the complete installed scope. Do not compare a stock box-only number with a custom quote that includes panels, drawings, delivery, or installation. Ask for the exclusions and change-order process in writing.",
      ],
      checklist: ["Price one base package per floor plan", "Identify buyer upgrades with decision deadlines", "Confirm pickup or delivery for each lot", "Keep an approved drawing set for every address"],
    },
    {
      heading: "Protect the build sequence",
      paragraphs: [
        "The cabinet order should follow verified field dimensions and precede countertop templating. Confirm that drywall, floors, and access are ready before scheduling delivery. If several homes share a cabinet package, label orders by address and room so a late change in one home does not contaminate another order.",
        "Vitrin's Easton shop offers will-call pickup by appointment and scheduled jobsite delivery in its stated local service areas. Ask your rep to confirm the production slot, delivery zone, and handling requirements for the specific lot; do not treat a preliminary quote as a firm ship date.",
      ],
      link: { href: "/contact?type=trade", label: "Request a builder quote" },
    },
  ],
  "cabinet-delivery-and-jobsite-coordination": [
    {
      heading: "Choose the handoff that fits the job",
      paragraphs: [
        "Vitrin offers will-call pickup at its Easton shop by appointment, local delivery, scheduled jobsite delivery, and lift-gate or inside delivery on request. The trade page lists Bucks County, the Lehigh Valley, and Montgomery County for local delivery, with flat-fee tiers by zone. Ask for the exact fee and handling scope on your quote rather than assuming every jobsite uses the same service.",
        "Will-call gives your crew control of transport. Jobsite delivery saves a trip but requires a receiving person, clear access, and a place to stage the cabinets safely. Lift-gate and inside handling matter when there is no dock, the order is large, or unloading by hand would put the boxes or crew at risk.",
      ],
      checklist: ["Full site address and a working contact for delivery day", "Vehicle access, parking, stairs, lift requirements, and receiving hours", "Who unloads and where each room's boxes will be staged", "The date the site will be dry, secure, and ready for cabinets"],
      link: { href: "/trade", label: "Review pickup and delivery options" },
    },
    {
      heading: "Work backward from installation",
      paragraphs: [
        "Confirm the final cabinet list and drawings before booking an install crew. Check that walls, rough-ins, and flooring are at the stage the cabinet plan assumes; late changes to an appliance, window, or plumbing location can change the boxes you need. Schedule countertop templating after the cabinets are installed and checked, not merely after their expected arrival.",
        "For Signature custom work, Vitrin publishes a four-to-eight-week planning range with weekly progress updates. That is not a substitute for the confirmed date on your order. For stock work, availability must be checked for the whole package, including fillers and panels. Leave room in the schedule for inspection and any correction before the next trade depends on the cabinetry.",
      ],
      checklist: ["Confirm the release date and delivery appointment", "Tell the foreman which rooms and items are arriving", "Keep the approved drawings available on site", "Leave time to check boxes before the installer begins"],
    },
    {
      heading: "Receive and check the order",
      paragraphs: [
        "At handoff, compare the delivered box count and labels with the packing list and approved cabinet schedule. Photograph any obvious packaging damage before moving the unit. Set aside questionable pieces and tell your rep promptly, with the item label and photos, so the right replacement or correction can be identified. The specific claim window and remedy belong to your order terms; confirm them before delivery.",
        "Store cabinetry in a dry, secure interior space and avoid blocking other trades or exits. If the site is not ready, contact Vitrin before the truck leaves rather than accepting cabinets into an exposed area. A clear handoff keeps the install date credible and makes responsibility for damage easier to establish.",
      ],
      link: { href: "/contact?type=trade", label: "Coordinate a trade delivery" },
    },
  ],
  "contractor-cabinet-pricing-explained": [
    {
      heading: "What the trade price covers",
      paragraphs: [
        "A cabinet price is useful only when you know what is included. Ask for the box, door, finish, hardware, panels, fillers, moldings, and specialty interiors as separate or clearly described parts of the quote. Measure the room and list appliances first; a change to the refrigerator size or island layout can change the cabinet package more than a small discount on boxes.",
        "Vitrin offers stock and Signature custom cabinetry. Stock can be priced quickly once the exact items are known. Most preliminary custom quotes take up to five business days because the shop needs to understand dimensions, finish, and construction details. Neither preliminary number should be treated as an installed-project total unless installation and delivery are expressly included.",
      ],
      checklist: ["Approved room dimensions and cabinet layout", "Door style, finish, box construction, and hardware", "Panels, trim, organizers, and appliance surrounds", "Pickup, delivery, installation, tax, and change-order terms"],
      link: { href: "/cabinets", label: "Compare cabinet paths" },
    },
    {
      heading: "How volume tiers and terms work",
      paragraphs: [
        "Vitrin's trade program describes standing pricing tiered by volume, with additional terms for multi-unit and new-construction orders. Your pricing sheet is sent after account approval and your first project is discussed. It is the right place to see your actual tier; this public guide cannot responsibly publish a universal contractor discount or promise a margin for every job.",
        "Account terms are available after the first paid order, subject to approval. Clarify deposit, balance, delivery, and any credit terms before you commit a schedule to your own customer. For repeat work, make sure the pricing sheet and quoted selections are still current when a new purchase order is issued.",
      ],
      checklist: ["Ask which volume tier applies to this order", "Request a separate line for upgrades and optional finishes", "Confirm when prices and availability expire", "Agree payment and delivery terms in writing"],
      link: { href: "/trade", label: "Read the trade program terms" },
    },
    {
      heading: "Compare quotes fairly",
      paragraphs: [
        "Two bids can look different because one includes drawings, panels, delivery, or installation and the other does not. Put the same floor plan and finish brief in front of each supplier. Compare lead time, replacement-piece process, warranty scope, and who resolves a measurement discrepancy, as well as the total.",
        "The lowest box price may still be the right choice for a straightforward stock job. A custom build can earn its cost when it avoids awkward filler runs or gives the homeowner a result standard sizes cannot provide. Show the client what each option buys, and keep your own installation labor and project contingency separate from the cabinet purchase price.",
      ],
      link: { href: "/contact?type=trade", label: "Request your trade pricing sheet" },
    },
  ],
} satisfies Record<string, GuideSection[]>;

export type TradeGuideSlug = keyof typeof content;

export function TradeGuideContent({ slug }: { slug: TradeGuideSlug }) {
  return (
    <>
      <article>
        {content[slug].map((section) => (
          <section key={section.heading} style={{ padding: "52px 0 0" }}>
            <div className="container--narrow prose">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.checklist && (
                <ul>{section.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
              )}
              {section.link && <p><Link href={section.link.href} className="text-link">{section.link.label} →</Link></p>}
            </div>
          </section>
        ))}
      </article>
      <section className="section--surface" style={{ marginTop: "64px" }}>
        <div className="container--narrow" style={{ textAlign: "center" }}>
          <h2 className="section-heading">Price your next cabinet project</h2>
          <p className="section-sub">Send the plan, deadline, and selections you have. We will tell you what else is needed for a usable quote.</p>
          <Link href="/contact?type=trade" className="btn-primary">Ask Vitrin for a trade quote</Link>
        </div>
      </section>
    </>
  );
}
