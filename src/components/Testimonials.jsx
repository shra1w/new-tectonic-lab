"use client";

import { useState } from "react";
import { LuBadgeCheck, LuQuote } from "react-icons/lu";

import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import { testimonials } from "@/lib/site";

// Fail fast: a marquee with nothing to show is a bug, not an empty state.
if (!Array.isArray(testimonials) || testimonials.length === 0) {
  throw new Error("Testimonials: `testimonials` is empty — nothing to render.");
}

/* ── tuning knobs ───────────────────────────────── */
const SPEED_SECONDS = 78;   // same pace as Placements
const GAP_PX = 56;          // gap between testimonials (also the loop seam — keep in sync)
const CARD_WIDTH_PX = 330;
/* ───────────────────────────────────────────────── */

// Deterministic per-card flavour → different look, stable across renders.
const SKINS = [
  { bg: "bg-ink-900", edge: "border-acid/35",    accent: "text-acid",       ringGlow: "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]" },
  { bg: "bg-ink-950", edge: "border-white/12",   accent: "text-zinc-200",   ringGlow: "" },
  { bg: "bg-ink-900", edge: "border-white/20",   accent: "text-zinc-100",   ringGlow: "" },
  { bg: "bg-ink-950", edge: "border-acid/25",    accent: "text-acid",       ringGlow: "" },
];

// Rotating corner treatments so no two neighbours share a silhouette.
const CORNERS = [
  "rounded-[28px]",
  "rounded-[28px] rounded-tl-sm",
  "rounded-[28px] rounded-tr-sm",
  "rounded-[28px] rounded-bl-sm",
];

function TestimonialCard({ t, index }) {
  const skin = SKINS[index % SKINS.length];
  const corner = CORNERS[index % CORNERS.length];

  return (
    <article
      className="group/msg flex h-full shrink-0 flex-col"
      style={{ width: `${CARD_WIDTH_PX}px` }}
    >
      {/* ── solid message block ── */}
      <div
        className={`relative flex flex-1 flex-col overflow-hidden border p-6 pb-7 transition-transform duration-300  ${skin.bg} ${skin.edge} ${corner} ${skin.ringGlow}`}
      >
        {/* hairline sweep on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-acid to-transparent transition-transform duration-500 group-hover/msg:scale-x-100"
        />

        {/* ghost index numeral */}
        <span
          aria-hidden="true"
          className="absolute right-5 top-3 font-display text-5xl font-semibold leading-none text-white/[0.045]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <LuQuote
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover/msg:scale-110 ${skin.accent}`}
        />

        <p className="relative mt-4 text-[0.9375rem] leading-relaxed text-zinc-200">
          {t.quote}
        </p>

        <span className="mt-5 inline-flex w-fit items-center rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-1 text-2xs font-medium text-zinc-400">
          {t.course}
        </span>
      </div>

      {/* ── tail pointing down to the identity ── */}
      <span
        aria-hidden="true"
        className={`mx-auto -mt-2 h-4 w-4 rotate-45 border-b border-r ${skin.bg} ${skin.edge}`}
      />

      {/* ── identity, centred, at the bottom ── */}
      <div className="mt-4 flex flex-col items-center text-center">
        <span
          className={`grid h-14 w-14 place-items-center rounded-full border-2 bg-ink-950 font-display text-lg font-semibold transition-transform duration-300 group-hover/msg:scale-105 ${skin.edge} ${skin.accent}`}
        >
          {t.initials}
        </span>

        <div className="mt-3 flex items-center gap-1.5">
          <h3 className="font-display text-sm font-semibold text-zinc-50">{t.name}</h3>
          {t.verified ? (
            <LuBadgeCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-acid" />
          ) : null}
        </div>

        <p className="mt-0.5 text-2xs text-zinc-500">{t.role}</p>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [paused, setPaused] = useState(false);

  const strip = (duplicate) => (
    <ul
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 items-stretch"
      style={{ gap: `${GAP_PX}px`, paddingRight: `${GAP_PX}px` }}
    >
      {testimonials.map((t, i) => (
        <li key={`${duplicate ? "dup" : "src"}-${t.name}-${i}`} className="flex">
          <TestimonialCard t={t} index={i} />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHead
          id="testimonials-title"
          align="center"
          eyebrow="In their words"
          title="What the batches actually said"
          intro="The modules that clicked, the mock interviews that stung, the server login that changed an interview. Named alumni, named courses."
        />
      </div>

      <Reveal delay={0.1}>
        <div
          className="mask-fade-x relative mt-14 select-none"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onTouchCancel={() => setPaused(false)}
        >
          <div
            className="flex w-max animate-slide-x motion-reduce:animate-none"
            style={{
              animationDuration: `${SPEED_SECONDS}s`,
              animationDirection: "reverse", // opposite direction to Placements
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {strip(false)}
            {strip(true)}
          </div>
        </div>

        <p className="shell mt-6 text-center text-2xs text-zinc-600">
          <span className="hidden sm:inline">Hover to pause</span>
          <span className="sm:hidden">Touch and hold to pause</span>
        </p>
      </Reveal>
    </section>
  );
}