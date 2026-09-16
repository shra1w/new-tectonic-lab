"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuArrowRight, LuLinkedin } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import Reveal from "./ui/Reveal";
import { directors, mentors, teamGroups, facultyYearsTotal } from "@/lib/site";

/* One portrait treatment for every card in the section, so the whole team —
   directors, mentors and the wider team — sits on the same uniform background.
   A missing file degrades to an acid initials monogram rather than a broken
   image box, so photos can be added one at a time. */
function Portrait({ person, aspect = "aspect-[4/3]", sizes = "(max-width: 768px) 100vw, 33vw" }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = person.photo && !failed;

  return (
    <div className={`relative ${aspect} w-full overflow-hidden bg-ink-950`}>
      {showPhoto ? (
        <Image
          src={person.photo}
          alt={`${person.name}, ${person.role || person.title}`}
          fill
          sizes={sizes}
          onError={() => setFailed(true)}
          className="object-cover object-top"
        />
      ) : (
        <span className="ruled grid h-full w-full place-items-center bg-gradient-to-br from-acid/20 to-acid/[0.04] font-display text-4xl font-semibold text-acid">
          {person.initials}
        </span>
      )}
    </div>
  );
}

/* ---- Directors — the leadership tier, shown first ---- */
function DirectorCard({ person }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-acid/35">
      <Portrait person={person} sizes="(max-width: 640px) 100vw, 50vw" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-zinc-50">{person.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-acid">{person.title}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{person.bio}</p>
        {person.highlights?.length ? (
          <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
            {person.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm leading-relaxed text-zinc-400">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-acid" />
                {h}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

/* ---- Mentors — industry depth, deliberately not framed as trainers ---- */
function MentorCard({ person }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-acid/35 sm:flex-row">
      <div className="sm:w-2/5">
        <Portrait person={person} aspect="aspect-[4/3] sm:h-full sm:aspect-auto" sizes="(max-width: 640px) 100vw, 25vw" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit items-center rounded-full border border-acid/30 bg-acid/10 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-acid">
          {person.role}
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold text-zinc-50">{person.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">{person.focus}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{person.note}</p>
        {person.linkedin ? (
          <div className="mt-6 border-t border-white/10 pt-4">
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              className="inline-flex items-center gap-1.5 rounded-md border border-acid/40 bg-acid/10 px-4 py-2 text-2xs font-semibold text-acid transition-colors hover:bg-acid/20"
            >
              <LuLinkedin aria-hidden="true" className="h-3.5 w-3.5" />
              Connect on LinkedIn
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

/* ---- Wider team — compact horizontal cards (photo left, details right), so a
   two-column grid reads left-to-right and fills the width evenly ---- */
function TeamMemberCard({ person }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = person.photo && !failed;
  return (
    <article className="card group flex h-full min-h-[11rem] overflow-hidden transition-colors duration-300 hover:border-acid/35">
      <div className="relative w-28 shrink-0 overflow-hidden bg-ink-950 sm:w-32">
        {showPhoto ? (
          <Image
            src={person.photo}
            alt={`${person.name}, ${person.role}`}
            fill
            sizes="(max-width: 640px) 30vw, 8rem"
            onError={() => setFailed(true)}
            className="object-cover object-top"
          />
        ) : (
          <span className="ruled grid h-full w-full place-items-center bg-gradient-to-br from-acid/20 to-acid/[0.04] font-display text-3xl font-semibold text-acid">
            {person.initials}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
        <h4 className="font-display text-base font-semibold leading-snug text-zinc-50">{person.name}</h4>
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{person.role}</p>
        {person.linkedin ? (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${person.name} on LinkedIn`}
            className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md border border-acid/40 bg-acid/10 px-3 py-1.5 text-2xs font-semibold text-acid transition-colors hover:bg-acid/20"
          >
            <LuLinkedin aria-hidden="true" className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function Faculty() {
  return (
    <section id="faculty" aria-labelledby="faculty-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            id="faculty-title"
            eyebrow="The team"
            title="Meet the team"
            intro={`Led by our two directors, backed by industry mentors and taught by trainers still working in the field — ${facultyYearsTotal}+ years of combined experience across SAP, data analytics and data science.`}
          />
          <Link href="/faculty" className="link-underline shrink-0 text-sm">
            Meet the faculty
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        {/* 1 — Directors */}
        <div className="mt-12">
          <Reveal>
            <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-acid">Directors</p>
          </Reveal>
          <Stagger className="mt-4 grid gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl" itemClassName="h-full">
            {directors.map((d) => (
              <DirectorCard key={d.name} person={d} />
            ))}
          </Stagger>
        </div>

        {/* 2 — Mentors */}
        <div className="mt-16">
          <Reveal>
            <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-acid">Mentors</p>
            <p className="mt-1 text-sm text-zinc-500">Senior industry hands who shape the curriculum and mentor every batch.</p>
          </Reveal>
          <Stagger className="mt-4 grid gap-5 lg:grid-cols-2" itemClassName="h-full">
            {mentors.map((m) => (
              <MentorCard key={m.name} person={m} />
            ))}
          </Stagger>
        </div>

        {/* 3 — The wider team, in labelled pairs (left / right) */}
        {teamGroups.map((group) => (
          <div key={group.key} className="mt-16">
            <Reveal>
              <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-acid">{group.eyebrow}</p>
              <h3 className="mt-1 font-display text-xl font-semibold text-zinc-50">{group.title}</h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-500">{group.intro}</p>
            </Reveal>
            <Stagger
              className="mt-6 grid gap-5 sm:grid-cols-2"
              itemClassName="h-full"
            >
              {group.members.map((person, i) => (
                <TeamMemberCard key={`${group.key}-${person.name}-${i}`} person={person} />
              ))}
            </Stagger>
          </div>
        ))}
      </div>
    </section>
  );
}
