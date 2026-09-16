// src/components/AlumniEmployers.jsx
import Image from "next/image";
import { LuBadgeCheck, LuBuilding2, LuUsers } from "react-icons/lu";

import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import Reveal from "./ui/Reveal";
import { alumniEmployers, placementStats, moreEmployersCount } from "@/lib/site";

/* ---------------------------------------------------------------------------
 * AlumniEmployers
 *
 * A record of where TECHTONIC LAB graduates have gone on to build their
 * careers. This is an outcomes claim about our alumni, not a partnership
 * claim about the companies — every entry is here because a real student
 * of ours works there.
 *
 * Design notes
 *   - Logo band uses a hairline grid backdrop (the site's recurring motif)
 *     so the mark sits on texture rather than a flat wash.
 *   - Cards hover-lift with a top accent line — same interaction as the
 *     Hero rail, keeps the language consistent across the page.
 *   - Verified pill is small and inline; the badge is a signal, not a
 *     decoration, so it doesn't dominate the card.
 *   - Logos are constrained by max-height, not width, so wide marks
 *     (WNS, Capgemini) and tall marks (TCS, Reliance) both read at a
 *     comparable optical weight.
 * ------------------------------------------------------------------------ */

function EmployerCard({ e }) {
  const verified = e.verified !== false;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-acid/40 hover:bg-ink-900/85">
      {/* Hairline accent line on hover — matches the Hero rail */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Logo band */}
      <div className="relative flex h-24 shrink-0 items-center justify-center overflow-hidden border-b border-white/10 bg-white/[0.015] px-4 sm:h-28">
        {/* Site-wide hairline grid motif */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        {/* Soft radial vignette to lift the mark off the grid */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,253,86,0.05),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {e.logo ? (
          <Image
            src={e.logo}
            alt={`${e.company} logo`}
            width={240}
            height={120}
            loading="lazy"
            decoding="async"
            className={`relative block max-h-14 w-auto max-w-[72%] object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${
              e.company==="Capgemini" ? "scale-[250%] " : " scale-[80%]"
            }`}
          />
        ) : (
          <span className="relative text-center font-display text-base font-semibold tracking-tight text-zinc-200 sm:text-lg">
            {e.company}
          </span>
        )}
      </div>

      {/* Meta strip */}
      <div className="flex flex-1 items-start justify-between gap-2 p-3.5">
        <div className="min-w-0">
          <h3 className="truncate font-display text-sm font-semibold tracking-tight text-zinc-50">
            {e.company}
          </h3>
          {/* {e.role || e.alumnus ? (
            <p className="mt-1 truncate text-xs leading-relaxed text-zinc-500">
              {e.role || `Alumni: ${e.alumnus}`}
            </p>
          ) : null} */}
        </div>

        {verified && (
          <span
            title="Alumnus presence verified"
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-acid/25 bg-acid/10 px-2 py-0.5 text-2xs font-semibold uppercase tracking-[0.1em] text-acid"
          >
            <LuBadgeCheck aria-hidden="true" className="h-3 w-3" />
            Verified
          </span>
        )}
      </div>
    </article>
  );
}

export default function AlumniEmployers({ standalone = false }) {
  const total = alumniEmployers.length;

  return (
    <section
      aria-labelledby="employers-title"
      className={
        standalone
          ? "py-20 sm:py-24"
          : "border-y border-white/10 bg-ink-900/40 py-20 sm:py-28"
      }
    >
      <div className="shell">
        <SectionHead
          id="employers-title"
          align="center"
          eyebrow="Outcomes"
          title="Where our alumni work"
          intro="A record of the companies our graduates have joined — from Nagpur's industrial names to the country's largest IT services firms."
        />

        {/* Compact stats strip — factual, no puffery */}
        {/* <Reveal delay={0.05}>
          <div className="mx-auto mt-8 flex w-fit flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-white/10 bg-ink-950/60 px-5 py-2.5 backdrop-blur">
            <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
              <LuBuilding2 aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
              <strong className="font-display font-semibold text-zinc-100">{total}</strong>
              companies
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-white/15" />
            <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
              <LuUsers aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
              <strong className="font-display font-semibold text-zinc-100">{placementStats.named}</strong>
              named alumni on record
            </span>
          </div>
        </Reveal> */}

        <Stagger
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          itemClassName="h-full"
        >
          {alumniEmployers.map((e) => (
            <EmployerCard key={e.company} e={e} />
          ))}

          <article className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-ink-900/60 p-5 text-center backdrop-blur-sm">
            <p className="font-display text-2xl font-semibold tracking-tight text-acid sm:text-3xl">
              {moreEmployersCount}+
            </p>
            <p className="mt-1.5 text-sm font-semibold text-zinc-100">more companies</p>
            <p className="mt-0.5 text-xs text-zinc-500">where our alumni work</p>
          </article>
        </Stagger>

        {/* Positive, factual footnote — replaces the defensive disclaimer.
            Reads as pride in outcomes rather than a legal hedge. */}
        <Reveal delay={0.12}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-zinc-500">
            Every company shown employs at least one TECHTONIC LAB alumnus — a record we
            are proud to publish, and one our graduates have earned through their own
            work. All logos and trade marks belong to their respective owners.
          </p>
        </Reveal>
      </div>
    </section>
  );
}