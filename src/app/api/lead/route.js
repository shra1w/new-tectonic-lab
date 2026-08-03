import { NextResponse } from "next/server";

// -----------------------------------------------------------------------------
// POST /api/lead  —  audit Section 5.2
//
// Server-side validation (never trust the client), honeypot rejection, per-IP
// rate limiting, and a single place to fan the lead out to your CRM, the
// auto-response email and the WhatsApp Cloud API.
//
// Everything below the "DELIVERY" comment is deliberately left as TODO with the
// exact shape you need — plug in your own credentials and it ships.
// -----------------------------------------------------------------------------

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple in-memory limiter. Fine for a single instance; swap for Upstash Redis
// or Vercel KV the moment you run more than one.
const HITS = new Map();
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  const now = Date.now();
  const hits = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  HITS.set(ip, hits);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (HITS.size > 5000) {
    for (const [k, v] of HITS) {
      if (!v.some((t) => now - t < WINDOW_MS)) HITS.delete(k);
    }
  }
  return false;
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isMobile = (v) => /^[6-9]\d{9}$/.test(String(v).replace(/\D/g, ""));
const clean = (v, max = 500) => String(v ?? "").trim().slice(0, max);

function validate(b) {
  const errors = {};
  if (!clean(b.firstName)) errors.firstName = "First name is required.";
  if (!clean(b.lastName)) errors.lastName = "Last name is required.";
  if (!isEmail(clean(b.email))) errors.email = "A valid email address is required.";
  if (!isMobile(b.mobile)) errors.mobile = "A valid 10-digit Indian mobile number is required.";
  if (!clean(b.course)) errors.course = "Course selection is required.";
  return errors;
}

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please call us on +91 87660 69947." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot. Bots fill it, people never see it. Return 200 so the bot believes
  // it succeeded and does not retry with a different strategy.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const errors = validate(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const lead = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 160).toLowerCase(),
    mobile: String(body.mobile).replace(/\D/g, "").slice(-10),
    course: clean(body.course, 80),
    message: clean(body.message, 2000),

    // Section 5.2 — attribution travels with the lead so Google Ads offline
    // conversion import works later. Do not drop these.
    source: clean(body.source, 80),
    utm_source: clean(body.utm_source, 120),
    utm_medium: clean(body.utm_medium, 120),
    utm_campaign: clean(body.utm_campaign, 160),
    utm_term: clean(body.utm_term, 160),
    utm_content: clean(body.utm_content, 160),
    gclid: clean(body.gclid, 200),
    landingPage: clean(body.landing_page, 300),
    referrer: clean(body.referrer, 300),

    receivedAt: new Date().toISOString(),
    ip,
    userAgent: clean(request.headers.get("user-agent"), 300),
  };

  // ---------------------------------------------------------------------------
  // DELIVERY — wire these three up. Each is independent, so one failing must not
  // lose the lead: log it and carry on rather than throwing.
  // ---------------------------------------------------------------------------

  // 1. CRM or Google Sheet
  //    await fetch(process.env.CRM_WEBHOOK_URL, {
  //      method: "POST",
  //      headers: { "Content-Type": "application/json" },
  //      body: JSON.stringify(lead),
  //    });

  // 2. Auto-response email with the brochure attached
  //    await sendMail({
  //      to: lead.email,
  //      subject: `Your ${lead.course} course details — Techtonic Lab`,
  //      ...
  //    });

  // 3. WhatsApp notification to the counselling team via the Meta Cloud API
  //    await fetch(`https://graph.facebook.com/v21.0/${process.env.WA_PHONE_ID}/messages`, {
  //      method: "POST",
  //      headers: {
  //        Authorization: `Bearer ${process.env.WA_TOKEN}`,
  //        "Content-Type": "application/json",
  //      },
  //      body: JSON.stringify({ messaging_product: "whatsapp", to: ..., type: "template", ... }),
  //    });

  console.log("[lead]", JSON.stringify(lead));

  return NextResponse.json({
    ok: true,
    message: "We will call you within 4 business hours, Monday to Saturday.",
  });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Use POST." }, { status: 405 });
}
