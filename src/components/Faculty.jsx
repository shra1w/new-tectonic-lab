"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuArrowRight, LuLinkedin } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import { faculty, facultyYearsTotal } from "@/lib/site";

/* Who appears on the homepage, in this order. Everyone else still shows on
   /faculty — this only controls the three-card preview. Names must match
   `faculty` in site.js exactly; anything unmatched is skipped and the list is
   topped up from the full array, so a typo here can never empty the section. */
const HOME_ORDER = ["Sudhir Talekar", "Shrawan Wankhede", "Vivek Khubalkar"];

function pickHomeFaculty() {
  const chosen = HOME_ORDER.map((n) => faculty.find((f) => f.name === n)).filter(Boolean);
  const rest = faculty.filter((f) => !chosen.includes(f));
  return [...chosen, ...rest].slice(0, 3);
}

function Portrait({ person }) {
  // A missing file degrades to a lime initials monogram rather than a broken
  // image box — so photos can be added one at a time.
  const [failed, setFailed] = useState(false);
  const showPhoto = person.photo && !failed;

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-950">
      {showPhoto ? (
        <Image
          src={person.photo}
          alt={`${person.name}, ${person.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
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

export default function Faculty() {
  const shown = pickHomeFaculty();

  return (
    <section id="faculty" aria-labelledby="faculty-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            id="faculty-title"
            eyebrow="The team"
            title="Meet the faculty"
            intro={`Six instructors, ${facultyYearsTotal}+ years of combined industry experience across IT, ERP, business intelligence and HR.`}
          />
          <Link href="/faculty" className="link-underline shrink-0 text-sm">
            Meet all six faculty members
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {shown.map((p) => (
            <article
              key={p.name}
              className="card group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-acid/35"
            >
              <Portrait person={p} />

              <div className="flex flex-1 flex-col p-6">
                {/* Name + title */}
                <h3 className="font-display text-lg font-semibold text-zinc-50">{p.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{p.title}</p>

                {/* Experience — large, highlighted */}
                <div className="mt-5 flex items-end gap-2.5 border-l-2 border-acid/50 pl-3.5">
                  <span className="font-display text-4xl font-bold leading-none text-acid sm:text-5xl">
                    {p.yearsNum}+
                  </span>
                  <span className="pb-1 text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-400">
                    years
                    <br />
                    in field
                  </span>
                </div>

                {/* 2–3 highlights */}
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm leading-relaxed text-zinc-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-acid"
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* LinkedIn button at bottom, centred */}
                <div className="mt-6 flex justify-center border-t border-white/10 pt-4">
                  {p.linkedin ? (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} on LinkedIn`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-acid/40 bg-acid/10 px-4 py-2 text-2xs font-semibold text-acid transition-colors hover:bg-acid/20"
                    >
                      <LuLinkedin aria-hidden="true" className="h-3.5 w-3.5" />
                      Connect on LinkedIn
                    </a>
                  ) : (
                    <Link
                      href="/faculty"
                      className="inline-flex items-center gap-1.5 rounded-md border border-acid/40 bg-acid/10 px-4 py-2 text-2xs font-semibold text-acid transition-colors hover:bg-acid/20"
                    >
                      <LuLinkedin aria-hidden="true" className="h-3.5 w-3.5" />
                      See profile
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}