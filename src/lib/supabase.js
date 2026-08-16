// src/lib/supabase.js
//
// Server-only Supabase client. We keep the anon key out of the browser and
// route every read/write through /api routes. RLS is disabled on `leads`,
// so the anon key is fully sufficient from the server side.

import "server-only";
import { createClient } from "@supabase/supabase-js";

let cached = null;

export function getSupabase() {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing — set SUPABASE_URL and SUPABASE_ANON_KEY in .env.local"
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}