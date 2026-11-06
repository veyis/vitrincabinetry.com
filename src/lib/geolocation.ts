interface GeolocationData {
  ip: string;
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isp?: string;
}

type GeoHeaders = Pick<Headers, "get">;

function geoText(headers: GeoHeaders | undefined, name: string): string | undefined {
  const value = headers?.get(name);
  if (!value) return undefined;
  try {
    return decodeURIComponent(value).slice(0, 200) || undefined;
  } catch {
    return undefined;
  }
}

function geoCoordinate(headers: GeoHeaders | undefined, name: string, limit: number): number | undefined {
  const raw = headers?.get(name);
  if (!raw?.trim()) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) && Math.abs(value) <= limit ? value : undefined;
}

export async function getGeolocationFromIP(
  ip: string,
  requestHeaders?: GeoHeaders,
): Promise<GeolocationData> {
  // Hosting-edge metadata is optional enrichment, never proof of identity.
  // Do not send visitor IPs to a third party or delay a lead for a lookup.
  return {
    ip,
    country: geoText(requestHeaders, "x-vercel-ip-country"),
    region: geoText(requestHeaders, "x-vercel-ip-country-region"),
    city: geoText(requestHeaders, "x-vercel-ip-city"),
    latitude: geoCoordinate(requestHeaders, "x-vercel-ip-latitude", 90),
    longitude: geoCoordinate(requestHeaders, "x-vercel-ip-longitude", 180),
    timezone: geoText(requestHeaders, "x-vercel-ip-timezone"),
  };
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return (forwarded.split(",")[0] ?? "").trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

export function getUserAgent(request: Request): string {
  return request.headers.get("user-agent") || "Unknown";
}
