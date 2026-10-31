import { site } from "@/lib/site";

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Visible byline and dates. Mirrors the Article JSON-LD (author = the
 * Organization, datePublished / dateModified) so users and crawlers see the
 * same facts the markup declares.
 */
export default function ArticleByline({
  datePublished,
  dateModified,
}: {
  datePublished: string;
  dateModified?: string;
}) {
  const showUpdated = dateModified && dateModified !== datePublished;
  return (
    <p className="article-byline" style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
      By {site.name} · Published <time dateTime={datePublished}>{formatDate(datePublished)}</time>
      {showUpdated ? (
        <>
          {" "}· Updated <time dateTime={dateModified}>{formatDate(dateModified)}</time>
        </>
      ) : null}
    </p>
  );
}
