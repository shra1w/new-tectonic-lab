import Link from "next/link";
import { LuCheck, LuClock, LuArrowRight, LuDownload, LuLayers } from "react-icons/lu";

import PageHero from "./ui/PageHero";
import FactTable from "./ui/FactTable";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Stagger from "./ui/Stagger";
import CtaBand from "./CtaBand";

export default function CourseSyllabusPage({ course, detail, breadcrumbs }) {
  const allTools = [...new Set(detail.modules.flatMap((m) => m.tools))];
  const totalTopics = detail.modules.reduce((n, m) => n + m.topics.length, 0);

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Syllabus"
        title={`${course.fullName} —`}
        highlight="full syllabus"
        summary={`Every module, every topic, every tool and the hours behind each. Published in full so you can compare it against any other institute in Nagpur before you pay anyone.`}
        aside={
          <FactTable
            rows={[
              ["Modules", String(detail.modules.length)],
              ["Topics", String(totalTopics)],
              ["Tools", String(allTools.length)],
              ["Projects", String(detail.projects.length)],
              ["Duration", course.duration],
              ["Prerequisites", detail.prerequisites],
            ]}
          />
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
            <LuDownload aria-hidden="true" className="h-4 w-4" />
            Get the brochure by email
          </Link>
          <Link href={`/${course.slug}`} className="btn-ghost w-full sm:w-auto">
            Back to the {course.name} course
          </Link>
        </div>
      </PageHero>

      {/* ---- Tools ---- */}
      <section aria-labelledby="tools-title" className="py-16 sm:py-20">
        <div className="shell">
          <SectionHead
            id="tools-title"
            eyebrow="Tool stack"
            title="Everything you will touch"
            intro="Named in full, because a syllabus that says “BI tools” is hiding something."
          />
          <Reveal className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {allTools.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- Modules, fully expanded ---- */}
      <section
        aria-labelledby="modules-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="modules-title"
            eyebrow="Module by module"
            title="The whole thing, in order"
            intro="Modules run in this sequence deliberately. Each one assumes the last, which is why the Excel or foundations block comes before anything harder."
          />

          <Stagger className="mt-10 space-y-4" step={0.05}>
            {detail.modules.map((m) => (
              <article key={m.n} className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-2xl font-semibold tracking-tightest text-acid">
                      {m.n}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-zinc-50">{m.title}</h3>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <LuClock aria-hidden="true" className="h-3.5 w-3.5" />
                    {m.hours}
                  </p>
                </div>

                <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                  <div>
                    <h4 className="text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Topics
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {m.topics.map((t) => (
                        <li key={t} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Tools
                    </h4>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {m.tools.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>

                    <h4 className="mt-6 flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      <LuLayers aria-hidden="true" className="h-3 w-3 text-acid" />
                      You finish with
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{m.project}</p>
                  </div>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Projects ---- */}
      <section aria-labelledby="syl-projects-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="syl-projects-title"
            eyebrow="Portfolio"
            title="The four projects you leave with"
            intro="Documented, reviewed and defended out loud. This is the part of the syllabus that gets you interviews."
          />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2" itemClassName="h-full">
            {detail.projects.map((p) => (
              <article key={p.title} className="card h-full p-6">
                <h3 className="font-display text-lg font-semibold text-zinc-50">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.body}</p>
                <dl className="mt-5">
                  <div className="spec-row">
                    <dt className="text-zinc-500">Tools</dt>
                    <dd className="text-right font-medium text-zinc-100">{p.tools.join(", ")}</dd>
                  </div>
                  <div className="spec-row">
                    <dt className="text-zinc-500">Dataset</dt>
                    <dd className="text-right font-medium text-zinc-100">{p.dataset}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/${course.slug}/fees`} className="link-underline text-sm">
                What the course costs
                <LuArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/batches" className="link-underline text-sm">
                When the Upcoming batch starts
                <LuArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/faculty" className="link-underline text-sm">
                Who teaches it
                <LuArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Compare this syllabus against anyone"
        body="Take it to another institute and ask for theirs in the same detail. That comparison is the whole reason we publish it."
        primary={{ href: "/connect-with-us", label: "Book a free consultation" }}
        secondary={{ href: `/${course.slug}`, label: `Back to the ${course.name} course` }}
      />
    </>
  );
}
