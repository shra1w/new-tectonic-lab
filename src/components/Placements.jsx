"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuArrowRight, LuInfo, LuBadgeCheck, LuQuote } from "react-icons/lu";

import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import { placements, placementStats, DISCLAIMER } from "@/lib/site";


const SPEED_SECONDS = 78; 

function Monogram({ initials }) {
  return (
    <span className="grid h-full w-full place-items-center rounded-2xl bg-gradient-to-br from-acid/25 to-acid/[0.06] font-display text-lg font-semibold text-acid">
      {initials}
    </span>
  );
}

function AlumniCard({ p, index }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = p.photo && !imgFailed;

  return (
    <article className="group/card relative flex h-full w-[268px] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/70 p-5 transition-colors duration-300 hover:border-acid/40 sm:w-[310px] sm:p-6">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-acid to-transparent transition-transform duration-500 group-hover/card:scale-x-100"
      />
      <span aria-hidden="true" className="ruled absolute inset-0 opacity-40" />

      <span
        aria-hidden="true"
        className="absolute right-5 top-4 font-display text-4xl font-semibold leading-none text-white/[0.04]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-center gap-3.5">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-ink-950">
          {showPhoto ? (
            <Image
              src={p.photo}
              alt={`${p.name}, ${p.placedAs}`}
              width={112}
              height={112}
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <Monogram initials={p.initials} />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold text-zinc-50">
            {p.name}
          </h3>
          <p className="mt-0.5 truncate text-xs text-zinc-500">{p.placedAs}</p>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-1.5">
        {p.employer ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/30 bg-acid/10 px-2.5 py-1 text-2xs font-semibold text-acid">
            <LuBadgeCheck aria-hidden="true" className="h-3 w-3" />
            {p.employer}
          </span>
        ) : null}
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-2xs font-medium text-zinc-400">
          {p.programme}
        </span>
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-2xs font-medium text-zinc-400">
          Batch {p.batch}
        </span>
      </div>

      {p.background ? (
        <p className="relative mt-5 flex-1 border-t border-white/10 pt-4 text-xs leading-relaxed text-zinc-400">
          <LuQuote
            aria-hidden="true"
            className="mb-1.5 h-3.5 w-3.5 text-acid/60 transition-transform duration-300 group-hover/card:scale-110"
          />
          Started with {p.background.charAt(0).toLowerCase() + p.background.slice(1)}.
        </p>
      ) : null}
    </article>
  );
}

export default function Placements() {
  const [paused, setPaused] = useState(false);

  const years = placementStats.years;
  const yearLabel =
    years.length > 1 ? `${years[0]} and ${years[years.length - 1]}` : years[0];

  const strip = (duplicate) => (
    <ul
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 items-stretch gap-4 pr-4 sm:gap-5 sm:pr-5"
    >
      {placements.map((p, i) => (
        <li key={`${duplicate ? "dup" : "src"}-${p.name}`} className="flex">
          <AlumniCard p={p} index={i} />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="placements"
      aria-labelledby="placements-title"
      className="scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHead
          id="placements-title"
          align="center"
          eyebrow="Placement stories"
          title="Real names. Real records."
          intro={`All ${placementStats.named} alumni we can name, across the ${yearLabel} batches, with the programme they took and the role they were hired into. We publish records rather than a percentage — a percentage cannot be checked, and a name can.`}
        />
      </div>

      <Reveal delay={0.1}>
        <div
          className="mask-fade-x relative mt-12 select-none"
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
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {strip(false)}
            {strip(true)}
          </div>
        </div>

        <p className="shell mt-5 text-center text-2xs text-zinc-600">
          <span className="hidden sm:inline">Hover to pause</span>
          <span className="sm:hidden">Touch and hold to pause</span>
        </p>
      </Reveal>

      <div className="shell">
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-6">
            <Link href="/placements" className="btn-ghost !py-3 !text-[0.8125rem]">
              See all placement records
              <LuArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>

            <p className="flex max-w-2xl items-start gap-2.5 text-center text-xs leading-relaxed text-zinc-500 sm:text-left">
              <LuInfo
                aria-hidden="true"
                className="mt-0.5 hidden h-4 w-4 shrink-0 text-zinc-600 sm:block"
              />
              <span>
                Every alumnus named here gave written consent, and we remove an entry the
                moment one asks. Individual results vary. {DISCLAIMER}
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}