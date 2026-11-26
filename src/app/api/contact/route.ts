import { NextResponse } from "next/server";
import { getClientIP, getUserAgent, getGeolocationFromIP } from "@/lib/geolocation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Same format as vmpowerconstruction.com: forward leads to the PxlPeak
// /api/v1/leads platform (storage, fraud scoring, owner notification,
// customer auto-reply all handled there).

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_KEYS = 1_000;
const submissionTimestamps = new Map<string, number[]>();

function getRateLimitIP(req: Request): string {
  const vercelForwarded = req.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) {
    const first = vercelForwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return getClientIP(req);
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  // Prune stale timestamps for this IP
  const existing = (submissionTimestamps.get(ip) ?? []).filter((ts) => ts > cutoff);

  if (existing.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissionTimestamps.set(ip, existing);
    const oldestActive = existing[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldestActive + RATE_LIMIT_WINDOW_MS - now) / 1000));
    return { allowed: false, retryAfterSec };
  }

  // Bound map size to avoid unbounded memory growth across long-lived warm lambdas
  if (!submissionTimestamps.has(ip) && submissionTimestamps.size >= RATE_LIMIT_MAX_KEYS) {
    for (const [key, timestamps] of submissionTimestamps) {
      const fresh = timestamps.filter((ts) => ts > cutoff);
      if (fresh.length === 0) {
        submissionTimestamps.delete(key);
      } else {
        submissionTimestamps.set(key, fresh);
      }
      if (submissionTimestamps.size < RATE_LIMIT_MAX_KEYS) break;
    }
    if (submissionTimestamps.size >= RATE_LIMIT_MAX_KEYS) {
      const oldestKey = submissionTimestamps.keys().next().value;
      if (oldestKey !== undefined) submissionTimestamps.delete(oldestKey);
    }
  }

  existing.push(now);
  submissionTimestamps.set(ip, existing);
  return { allowed: true, retryAfterSec: 0 };
}

const PROJECT_TYPE_LABEL: Record<string, string> = {
  stock: "Vitrin Stock cabinets",
  custom: "Vitrin Signature (custom kitchen)",
  kitchen: "Kitchen cabinets",
  bath: "Bath cabinets",
  "built-ins": "Built-ins / library / mudroom",
  "aging-in-place": "Aging-in-place cabinetry",
  remodeling: "Kitchen / bath remodeling",
  countertops: "Countertops",
  flooring: "Flooring",
  closets: "Custom closets",
  install: "Installation add-on",
  trade: "Trade pricing inquiry",
  other: "Other",
};

type ContactBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  audienceType?: string;
  projectType?: string;
  message?: string;
  honeypot?: string;
};

function isString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  const ipAddress = getRateLimitIP(req);
  const rateLimit = checkRateLimit(ipAddress);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many inquiries submitted. Please wait a few minutes and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSec) },
      },
    );
  }

  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const required = ["firstName", "lastName", "email", "projectType", "message"] as const;
  for (const k of required) {
    if (!isString(body[k])) {
      return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email!)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (body.message!.length > 5000) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const apiUrl = process.env.PXLPEAK_API_URL;
  const apiKey = process.env.PXLPEAK_API_KEY;
  if (!apiUrl || !apiKey) {
    console.error("PXLPEAK_API_URL or PXLPEAK_API_KEY not configured");
    return NextResponse.json(
      { error: "Server configuration error. Please try again later." },
      { status: 500 },
    );
  }

  const userAgent = getUserAgent(req);
  const referrer = req.headers.get("referer") || undefined;

  // Best-effort geolocation — fraud scoring works without it
  let geoData: Awaited<ReturnType<typeof getGeolocationFromIP>> | null = null;
  try {
    geoData = await getGeolocationFromIP(ipAddress, req.headers);
  } catch {
    geoData = null;
  }

  const messageParts = [
    body.audienceType ? `Audience: ${body.audienceType}` : null,
    `Project: ${PROJECT_TYPE_LABEL[body.projectType!] ?? body.projectType}`,
    "",
    body.message!,
  ].filter((p): p is string => p !== null);

  const leadPayload: Record<string, unknown> = {
    name: `${body.firstName} ${body.lastName}`.trim(),
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone || undefined,
    // PxlPeak caps message at 5000 chars; prefix lines can push us over
    message: messageParts.join("\n").slice(0, 5000),
    source: "contact_form",
    pageUrl: referrer,
    referrer,
    clientIP: ipAddress,
    clientUserAgent: userAgent,
    notifications: { admin: true, confirmation: true },
    // PxlPeak records and classifies honeypot hits, suppressing auto-replies.
    honeypots: body.honeypot ? { companyName: body.honeypot } : undefined,
  };

  if (geoData?.country) {
    leadPayload.geoData = {
      city: geoData.city || "Unknown",
      region: geoData.region || "Unknown",
      country: geoData.country || "Unknown",
      timezone: geoData.timezone,
      lat: geoData.latitude,
      lon: geoData.longitude,
      isp: geoData.isp,
    };
  }

  try {
    const resp = await fetch(`${apiUrl}/api/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Forwarded-For": ipAddress,
        "User-Agent": userAgent,
      },
      body: JSON.stringify(leadPayload),
      signal: AbortSignal.timeout(15_000),
    });

    if (!resp.ok) {
      console.error("PxlPeak leads API error:", resp.status);
      if (resp.status === 422) {
        return NextResponse.json(
          { error: "Please check your form details and try again." },
          { status: 400 },
        );
      }
      return NextResponse.json({ error: "Could not send message" }, { status: 500 });
    }

    const result: unknown = await resp.json().catch(() => null);
    if (
      !result || typeof result !== "object" ||
      !("success" in result) || result.success !== true ||
      !("id" in result) || typeof result.id !== "string" || !result.id.trim()
    ) {
      console.error("PxlPeak leads API did not confirm persistence");
      return NextResponse.json(
        { error: "We couldn't confirm your message. Please contact us before trying again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, id: result.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}
