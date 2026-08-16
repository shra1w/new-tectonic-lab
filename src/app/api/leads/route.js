// src/app/api/leads/route.js
//
// Admin console feed. Password check on every request via the
// `x-admin-password` header — matches LEADS_ADMIN_PASSWORD from env.
// No cookies, no JWT, no sessions server-side. The client keeps the
// password in sessionStorage and attaches it to each fetch.

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request) {
  const expected = process.env.LEADS_ADMIN_PASSWORD;
  if (!expected) return false;
  const provided = request.headers.get("x-admin-password") || "";
  // Constant-time-ish compare — good enough for a low-traffic admin gate.
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  }
  return diff === 0;
}

export async function GET(request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supa = getSupabase();
    const { data, error } = await supa
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.error("[api/leads] Supabase select failed:", error);
      return NextResponse.json({ ok: false, error: "Query failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, leads: data ?? [] });
  } catch (err) {
    console.error("[api/leads] Error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

// Password check without leaking any data — used by the overlay to test
// the entered password before saving it to sessionStorage.
export async function POST(request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}