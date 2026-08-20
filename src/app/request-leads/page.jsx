"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LuLock,
  LuLogOut,
  LuRefreshCw,
  LuSearch,
  LuMail,
  LuPhone,
  LuCalendar,
  LuUser,
  LuBookOpen,
  LuMessageSquare,
  LuGlobe,
  LuTag,
  LuCircleAlert,
  LuInbox,
  LuChevronDown,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";

const PWD_KEY = "tl_admin_pwd";

/* ─── Password overlay ──────────────────────────────────────────── */
function PasswordOverlay({ onAuth }) {
  const [pwd, setPwd] = useState("");
  const [status, setStatus] = useState("idle"); // idle | checking | error
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!pwd) return;
    setStatus("checking");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "x-admin-password": pwd },
      });
      if (res.status === 401) {
        setStatus("error");
        setError("That password isn't right.");
        return;
      }
      if (!res.ok) throw new Error("Server error");
      window.sessionStorage.setItem(PWD_KEY, pwd);
      onAuth(pwd);
    } catch (err) {
      setStatus("error");
      setError("Could not reach the server. Try again.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-xl"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,253,86,0.08),transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <motion.form
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={submit}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-ink-900/80 p-8 backdrop-blur-xl"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/60 to-transparent"
        />

        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-acid/30 bg-acid/10 text-acid">
          <LuLock aria-hidden="true" className="h-5 w-5" />
        </span>

        <h1 className="mt-5 font-display text-2xl font-semibold text-zinc-50">
          Restricted area
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Enter the admin password to view lead submissions. Your session ends when
          you close this tab.
        </p>

        <label htmlFor="pwd" className="mt-6 mb-2 block text-xs font-semibold text-zinc-300">
          Password
        </label>
        <input
          id="pwd"
          type="password"
          autoFocus
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="w-full rounded-xl border border-white/[0.12] bg-ink-950 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-acid focus:outline-none"
          placeholder="••••••••••"
          aria-invalid={status === "error"}
        />

        {error ? (
          <p
            role="alert"
            className="mt-3 flex items-center gap-1.5 text-xs text-red-400"
          >
            <LuCircleAlert aria-hidden="true" className="h-3.5 w-3.5" />
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "checking" || !pwd}
          className="btn-primary mt-6 w-full disabled:opacity-60"
        >
          {status === "checking" ? "Verifying…" : "Unlock"}
        </button>

        <p className="mt-6 text-center text-2xs text-zinc-500">
          Techtonic Lab · Leads Console
        </p>
      </motion.form>
    </motion.div>
  );
}

/* ─── Utilities ─────────────────────────────────────────────────── */
function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

function timeAgo(iso) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  const d = Math.floor(s / 86400);
  if (d < 7) return `${d}d ago`;
  return fmtDate(iso);
}

/* ─── Lead card (expandable) ────────────────────────────────────── */
function LeadCard({ lead }) {
  const [open, setOpen] = useState(false);
  const fullName = `${lead.first_name} ${lead.last_name}`.trim();
  const initials = `${lead.first_name?.[0] || ""}${lead.last_name?.[0] || ""}`.toUpperCase();

  const hasUtm =
    lead.utm_source ||
    lead.utm_medium ||
    lead.utm_campaign ||
    lead.utm_term ||
    lead.utm_content ||
    lead.gclid ||
    lead.referrer;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 transition-colors hover:border-white/20">
      {/* Header row */}
      <div className="flex flex-wrap items-start gap-4 p-5 sm:flex-nowrap">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-acid/25 to-acid/[0.06] font-display text-sm font-semibold text-acid">
          {initials || "?"}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-display text-base font-semibold text-zinc-50">
              {fullName}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-acid/30 bg-acid/10 px-2 py-0.5 text-2xs font-semibold text-acid">
              <LuBookOpen aria-hidden="true" className="h-3 w-3" />
              {lead.course}
            </span>
            {lead.status && lead.status !== "new" ? (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-2xs font-medium capitalize text-zinc-400">
                {lead.status}
              </span>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <LuCalendar aria-hidden="true" className="h-3 w-3" />
              {timeAgo(lead.created_at)}
            </span>
            <span className="hidden sm:inline">·</span>
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-acid"
            >
              <LuMail aria-hidden="true" className="h-3 w-3" />
              {lead.email}
            </a>
            <span className="hidden sm:inline">·</span>
            <a
              href={`tel:+91${lead.mobile}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-acid"
            >
              <LuPhone aria-hidden="true" className="h-3 w-3" />
              +91 {lead.mobile}
            </a>
            <a
              href={`https://wa.me/91${lead.mobile}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] transition-opacity hover:opacity-80"
            >
              <FaWhatsapp aria-hidden="true" className="h-3 w-3" />
              WhatsApp
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-acid/30 hover:text-acid"
          aria-expanded={open}
        >
          {open ? "Less" : "Details"}
          <LuChevronDown
            aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Message preview always visible if present */}
      {lead.message ? (
        <div className="border-t border-white/[0.06] px-5 py-4">
          <p className="flex gap-2 text-sm leading-relaxed text-zinc-300">
            <LuMessageSquare aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
            <span className="whitespace-pre-wrap">{lead.message}</span>
          </p>
        </div>
      ) : null}

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/[0.06]"
          >
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Submission
                </p>
                <dl className="space-y-1.5 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">Received</dt>
                    <dd className="text-zinc-300">{fmtDate(lead.created_at)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">Source</dt>
                    <dd className="text-zinc-300">{lead.source || "website"}</dd>
                  </div>
                  {lead.landing_page ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-zinc-500">Landing</dt>
                      <dd className="truncate text-zinc-300" title={lead.landing_page}>
                        {lead.landing_page}
                      </dd>
                    </div>
                  ) : null}
                  {lead.ip ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-zinc-500">IP</dt>
                      <dd className="text-zinc-300">{lead.ip}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <div>
                <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Attribution
                </p>
                {hasUtm ? (
                  <dl className="space-y-1.5 text-xs">
                    {lead.utm_source ? (
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">utm_source</dt>
                        <dd className="text-zinc-300">{lead.utm_source}</dd>
                      </div>
                    ) : null}
                    {lead.utm_medium ? (
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">utm_medium</dt>
                        <dd className="text-zinc-300">{lead.utm_medium}</dd>
                      </div>
                    ) : null}
                    {lead.utm_campaign ? (
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">utm_campaign</dt>
                        <dd className="text-zinc-300">{lead.utm_campaign}</dd>
                      </div>
                    ) : null}
                    {lead.gclid ? (
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">gclid</dt>
                        <dd className="truncate text-zinc-300">{lead.gclid}</dd>
                      </div>
                    ) : null}
                    {lead.referrer ? (
                      <div className="flex justify-between gap-4">
                        <dt className="text-zinc-500">Referrer</dt>
                        <dd className="truncate text-zinc-300" title={lead.referrer}>
                          {lead.referrer}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                ) : (
                  <p className="text-xs text-zinc-500">Direct / no attribution.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

/* ─── Console ───────────────────────────────────────────────────── */
function Console({ pwd, onSignOut }) {
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  async function load() {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        headers: { "x-admin-password": pwd },
        cache: "no-store",
      });
      if (res.status === 401) {
        onSignOut();
        return;
      }
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed");
      setLeads(data.leads);
      setStatus("ready");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const courses = useMemo(
    () => Array.from(new Set(leads.map((l) => l.course))).sort(),
    [leads]
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return leads.filter((l) => {
      if (courseFilter !== "all" && l.course !== courseFilter) return false;
      if (!needle) return true;
      const hay = `${l.first_name} ${l.last_name} ${l.email} ${l.mobile} ${l.course} ${l.message || ""}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [leads, q, courseFilter]);

  const stats = useMemo(() => {
    const now = Date.now();
    const day = 86_400_000;
    return {
      total: leads.length,
      today: leads.filter((l) => now - new Date(l.created_at).getTime() < day).length,
      week: leads.filter((l) => now - new Date(l.created_at).getTime() < 7 * day).length,
      newCount: leads.filter((l) => (l.status || "new") === "new").length,
    };
  }, [leads]);

  return (
    <div className="min-h-screen bg-ink-950 text-zinc-100">
      {/* Ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(234,253,86,0.05),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-acid" />
              <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Leads Console
              </p>
            </div>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Techtonic Lab
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={load}
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-acid/30 hover:text-acid disabled:opacity-50"
            >
              <LuRefreshCw
                aria-hidden="true"
                className={`h-3.5 w-3.5 ${status === "loading" ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-red-500/40 hover:text-red-300"
            >
              <LuLogOut aria-hidden="true" className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total", value: stats.total },
            { label: "Today", value: stats.today },
            { label: "This week", value: stats.week },
            { label: "New", value: stats.newCount, accent: true },
          ].map((s) => (
            <div
              key={s.label}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 p-5 backdrop-blur-sm"
            >
              {s.accent && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/60 to-transparent"
                />
              )}
              <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {s.label}
              </p>
              <p
                className={`mt-2 font-display text-3xl font-semibold tracking-tight ${
                  s.accent ? "text-acid" : "text-zinc-50"
                }`}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <LuSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email, phone, message…"
              className="w-full rounded-xl border border-white/10 bg-ink-900/60 py-3 pl-11 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors focus:border-acid focus:outline-none"
            />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-zinc-100 transition-colors focus:border-acid focus:outline-none sm:w-56"
          >
            <option value="all">All courses ({leads.length})</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c} ({leads.filter((l) => l.course === c).length})
              </option>
            ))}
          </select>
        </div>

        {/* List */}
        <div className="mt-6 space-y-3">
          {status === "loading" ? (
            <div className="rounded-2xl border border-white/10 bg-ink-900/40 p-12 text-center">
              <LuRefreshCw
                aria-hidden="true"
                className="mx-auto h-6 w-6 animate-spin text-acid"
              />
              <p className="mt-3 text-sm text-zinc-500">Loading leads…</p>
            </div>
          ) : status === "error" ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
              <p className="flex items-center gap-2 text-sm text-red-300">
                <LuCircleAlert aria-hidden="true" className="h-4 w-4" />
                {error}
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-ink-900/40 p-12 text-center">
              <LuInbox
                aria-hidden="true"
                className="mx-auto h-8 w-8 text-zinc-700"
              />
              <p className="mt-3 font-display text-base font-semibold text-zinc-300">
                {q || courseFilter !== "all" ? "No matching leads" : "No leads yet"}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {q || courseFilter !== "all"
                  ? "Try clearing the filters above."
                  : "New submissions will appear here as they come in."}
              </p>
            </div>
          ) : (
            filtered.map((lead) => <LeadCard key={lead.id} lead={lead} />)
          )}
        </div>

        <p className="mt-12 text-center text-2xs text-zinc-500">
          Showing {filtered.length} of {leads.length} · Session ends when you close this tab.
        </p>
      </div>
    </div>
  );
}

/* ─── Page shell ────────────────────────────────────────────────── */
export default function RequestLeadsPage() {
  const [pwd, setPwd] = useState(null); // null = unknown yet, "" = unauth, string = auth

  // On mount, revalidate whatever's in sessionStorage against the server.
  // If the password has changed on the server side, we log the user out cleanly.
  useEffect(() => {
    const stored = window.sessionStorage.getItem(PWD_KEY);
    if (!stored) {
      setPwd("");
      return;
    }
    fetch("/api/leads", {
      method: "POST",
      headers: { "x-admin-password": stored },
    })
      .then((res) => {
        if (res.ok) setPwd(stored);
        else {
          window.sessionStorage.removeItem(PWD_KEY);
          setPwd("");
        }
      })
      .catch(() => setPwd(stored)); // network flakes shouldn't kick out — the console will retry.
  }, []);

  function signOut() {
    window.sessionStorage.removeItem(PWD_KEY);
    setPwd("");
  }

  if (pwd === null) {
    // First-paint state before we know auth status — dark screen, no flash.
    return <div className="min-h-screen bg-ink-950" />;
  }

  return (
    <>
      {pwd ? <Console pwd={pwd} onSignOut={signOut} /> : null}
      <AnimatePresence>
        {!pwd && <PasswordOverlay onAuth={setPwd} />}
      </AnimatePresence>
    </>
  );
}