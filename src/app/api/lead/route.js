// src/app/api/lead/route.js
//
// Receives the LeadForm submission. Order of operations:
//   1. Validate.
//   2. Honeypot check (silent 200 for bots).
//   3. Insert into Supabase — hard requirement, we don't want to lose leads.
//   4. Fire off both emails in parallel — soft, logged but not fatal.
// Any DB failure returns 500 so the client can prompt a retry.

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendLeadEmails } from "@/lib/mailer";

export const runtime = "nodejs"; // nodemailer needs Node runtime, not Edge

function bad(field) {
  return NextResponse.json({ ok: false, error: `Missing or invalid: ${field}` }, { status: 400 });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bot filled the hidden `website` field. Return 200 so it
  // doesn't retry, but do nothing.
  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Validation
  if (!body.firstName?.trim()) return bad("firstName");
  if (!body.lastName?.trim()) return bad("lastName");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((body.email || "").trim())) return bad("email");
  const mobile = String(body.mobile || "").replace(/\D/g, "");
  if (!/^[6-9]\d{9}$/.test(mobile)) return bad("mobile");
  if (!body.course?.trim()) return bad("course");

  // Server-side context
  const headers = request.headers;
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    null;
  const userAgent = headers.get("user-agent") || null;

  const row = {
    first_name: body.firstName.trim(),
    last_name: body.lastName.trim(),
    email: body.email.trim().toLowerCase(),
    mobile,
    course: body.course.trim(),
    message: body.message?.trim() || null,
    source: body.source || "website",
    landing_page: body.landing_page || null,
    referrer: body.referrer || null,
    utm_source: body.utm_source || null,
    utm_medium: body.utm_medium || null,
    utm_campaign: body.utm_campaign || null,
    utm_term: body.utm_term || null,
    utm_content: body.utm_content || null,
    gclid: body.gclid || null,
    submitted_at: body.submittedAt || new Date().toISOString(),
    ip,
    user_agent: userAgent,
  };

  // 1. Save to DB — hard requirement.
  try {
    const supa = getSupabase();
    const { error } = await supa.from("leads").insert(row);
    if (error) {
      console.error("[api/lead] Supabase insert failed:", error);
      return NextResponse.json(
        { ok: false, error: "Could not save your request. Please try again." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[api/lead] DB layer error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again in a moment." },
      { status: 500 }
    );
  }

  // 2. Send emails — soft. Log failures but don't fail the request.
  try {
    await sendLeadEmails({
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      mobile: row.mobile,
      course: row.course,
      message: row.message,
      source: row.source,
      landing_page: row.landing_page,
      referrer: row.referrer,
      utm_source: row.utm_source,
      utm_medium: row.utm_medium,
      utm_campaign: row.utm_campaign,
      utm_term: row.utm_term,
      utm_content: row.utm_content,
      gclid: row.gclid,
      submittedAt: row.submitted_at,
    });
  } catch (err) {
    console.error("[api/lead] Mailer error (non-fatal):", err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}