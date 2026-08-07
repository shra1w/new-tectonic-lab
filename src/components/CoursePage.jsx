import Link from "next/link";
import {
  LuArrowRight,
  LuDownload,
  LuCheck,
  LuBriefcase,
  LuUsers,
  LuFolderGit2,
  LuCalendarDays,
  LuChevronRight,
} from "react-icons/lu";

import PageHero from "./ui/PageHero";
import FactTable from "./ui/FactTable";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Stagger from "./ui/Stagger";
import FaqList from "./ui/FaqList";
import ImageSlot from "./ui/ImageSlot";
import CourseVisual from "./ui/CourseVisual";
import RelatedCourses from "./RelatedCourses";
import CtaBand from "./CtaBand";
import LeadForm from "./LeadForm";

import { faculty } from "@/lib/site";
import { batches } from "@/lib/content";

export default function CoursePage({ course, detail, breadcrumbs }) {
  const courseFaculty = faculty.filter((f) => f.teaches.includes(course.name));
  const upcoming = batches.filter((b) => b.slug === course.slug).slice(0, 4);

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={`${course.duration} · ${course.fee} · Next batch ${course.nextBatch}`}
        title={detail.h1}
        summary={detail.summary}
        aside={
          <CourseVisual
            src={course.image}
            alt={course.imageAlt || `${course.name} course illustration`}
            variant="hero"
            className="aspect-[4/3] w-full lg:aspect-[1]"
            rounded="rounded-3xl"
            priority
          />
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
            Book a free demo class
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href={`/${course.slug}/syllabus`} className="btn-ghost w-full sm:w-auto">
            <LuDownload aria-hidden="true" className="h-4 w-4" />
            Download the course brochure
          </Link>
        </div>
      </PageHero>

      {/* ---- Quick facts (GEO Section 7.1) ---- */}
      <section aria-labelledby="quick-facts-title" className="py-16 sm:py-20">
        <div className="shell">
          <h2 id="quick-facts-title" className="sr-only">
            Quick facts about the {course.name} course
          </h2>
          <Reveal>
            <FactTable
              rows={[
                ["Duration", `${course.duration} — 3 months training + 1 month grooming`],
                ["Mode", course.mode],
                ["Next batch", course.nextBatch],
                ["Fee", `${course.fee} all-inclusive · EMI available`],
                ["Prerequisites", detail.prerequisites],
                ["Certification", detail.certification],
                ["Placement support", "Yes — assistance, not a guarantee"],
                ["Language", detail.language],
                ["Campuses", "Somalwada and Jaitala Road, Nagpur"],
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ---- Who is this for ---- */}
      <section
        aria-labelledby="audience-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="audience-title"
            eyebrow="Who it is for"
            title={`Who is the ${course.name} course for?`}
            intro="Three groups enrol in every batch. If you do not see yourself here, say so on the call and we will tell you honestly whether this is the right route."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" itemClassName="h-full">
            {detail.audience.map((a) => (
              <div key={a.segment} className="card h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                  <LuUsers aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">
                  {a.segment}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{a.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Curriculum ---- */}
      <section id="curriculum" aria-labelledby="curriculum-title" className="scroll-mt-24 py-20 sm:py-28">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              id="curriculum-title"
              eyebrow="Curriculum"
              title="What you will actually build, module by module"
              intro="Six modules across four months. Every module lists the topics, the tools and the thing you finish with."
            />
            <Link href={`/${course.slug}/syllabus`} className="link-underline shrink-0 text-sm">
              Full syllabus with hours
              <LuArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          {/* CRIT-1 — native details, so every topic ships in the initial HTML */}
          <Stagger className="mt-10 space-y-3" step={0.05}>
            {detail.modules.map((m) => (
              <details key={m.n} className="card group overflow-hidden" open={m.n === "01"}>
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden sm:p-6">
                  <span className="font-display text-sm font-semibold text-acid">{m.n}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold text-zinc-50 sm:text-lg">
                      {m.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-500">{m.hours}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-zinc-400 transition-all duration-300 group-open:rotate-90 group-open:border-acid group-open:text-acid"
                  >
                    <LuChevronRight className="h-4 w-4" />
                  </span>
                </summary>

                <div className="border-t border-white/10 p-5 sm:p-6">
                  <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    <div>
                      <h4 className="text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Topics covered
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
                      <h4 className="mt-6 text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        You finish with
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{m.project}</p>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Projects ---- */}
      <section
        aria-labelledby="projects-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="projects-title"
            eyebrow="Portfolio"
            title="Four projects, not forty exercises"
            intro="Each one is documented, reviewed and defended out loud. A hiring manager reads projects far more closely than a certificate."
          />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2" itemClassName="h-full">
            {detail.projects.map((p, i) => (
              <article key={p.title} className="card flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-acid">
                    <LuFolderGit2 aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span className="font-display text-sm font-semibold text-zinc-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{p.body}</p>
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
        </div>
      </section>

      {/* ---- Careers ---- */}
      <section aria-labelledby="careers-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="careers-title"
            eyebrow="Careers"
            title="Where this course leads"
            intro="Indicative salary bands for Nagpur and the wider Vidarbha region. These are market observations, not offers — and they move with your project quality far more than with your marks."
          />
          <Reveal className="mt-10">
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[34rem] text-sm">
                  <caption className="sr-only">
                    Roles and indicative salary ranges after the {course.name} course
                  </caption>
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      <th scope="col" className="px-5 py-4 text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:px-6">
                        Role
                      </th>
                      <th scope="col" className="px-5 py-4 text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:px-6">
                        Entry level
                      </th>
                      <th scope="col" className="px-5 py-4 text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:px-6">
                        2–4 years
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.careers.map((c) => (
                      <tr key={c.role} className="border-b border-white/[0.06] last:border-b-0">
                        <th scope="row" className="px-5 py-4 text-left font-medium text-zinc-100 sm:px-6">
                          {c.role}
                        </th>
                        <td className="px-5 py-4 text-zinc-400 sm:px-6">{c.entry}</td>
                        <td className="px-5 py-4 text-acid sm:px-6">{c.mid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Faculty for this course ---- */}
      <section
        aria-labelledby="course-faculty-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              id="course-faculty-title"
              eyebrow="Who teaches it"
              title={`Faculty for the ${course.name} course`}
              intro="The people who will actually be in the room, named, with the years behind each of them."
            />
            <Link href="/faculty" className="link-underline shrink-0 text-sm">
              Meet all six faculty members
              <LuArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
            {courseFaculty.map((f) => (
              <article key={f.name} className="card flex h-full flex-col overflow-hidden">
                <ImageSlot
                  className="aspect-[4/3] w-full"
                  rounded="rounded-none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  note={`Portrait — ${f.name}`}
                  hint={`Real photograph. 800×600px → /public/faculty/${f.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.jpg`}
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold text-zinc-50">{f.name}</h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    {f.title} · <span className="text-acid">{f.years}</span>
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{f.bio}</p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Batch schedule ---- */}
      <section aria-labelledby="batch-title" className="py-20 sm:py-24">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              id="batch-title"
              eyebrow="Batch schedule"
              title="When the next intakes start"
              intro="Published in advance so you can plan around a notice period or a semester."
            />
            <Link href="/batches" className="link-underline shrink-0 text-sm">
              Every batch across all three courses
              <LuArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" itemClassName="h-full">
            {upcoming.map((b) => (
              <div key={`${b.startISO}-${b.mode}`} className="card h-full p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-display text-lg font-semibold text-zinc-50">
                    <LuCalendarDays aria-hidden="true" className="h-4 w-4 text-acid" />
                    {b.start}
                  </p>
                  <span
                    className={`chip ${
                      b.status === "Filling" ? "!border-amber-400/30 !text-amber-300" : ""
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <dl className="mt-4">
                  <div className="spec-row">
                    <dt className="text-zinc-500">Mode</dt>
                    <dd className="font-medium text-zinc-100">{b.mode}</dd>
                  </div>
                  <div className="spec-row">
                    <dt className="text-zinc-500">Timing</dt>
                    <dd className="text-right font-medium text-zinc-100">{b.timing}</dd>
                  </div>
                  <div className="spec-row">
                    <dt className="text-zinc-500">Campus</dt>
                    <dd className="font-medium text-zinc-100">{b.campus}</dd>
                  </div>
                  <div className="spec-row">
                    <dt className="text-zinc-500">Seats left</dt>
                    <dd className="font-medium text-acid">{b.seats}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Fees ---- */}
      <section
        aria-labelledby="course-fee-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <SectionHead
            id="course-fee-title"
            eyebrow="Fees"
            title="₹50,000, itemised"
            intro="One price for the whole four months. No registration fee, no examination fee, no certificate fee, and no tier above this one."
          />
          <Reveal delay={0.08}>
            <div className="card p-6 sm:p-7">
              <p className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold tracking-tightest text-acid">
                  {course.fee}
                </span>
                <span className="text-xs text-zinc-500">all-inclusive</span>
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                or ₹8,334 × 6 months on EMI · no hidden charges
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                {course.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                    {i}
                  </li>
                ))}
              </ul>
              <Link href={`/${course.slug}/fees`} className="btn-ghost mt-7 w-full !py-3 !text-[0.8125rem]">
                Full fee breakdown and EMI terms
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section id="faq" aria-labelledby="course-faq-title" className="scroll-mt-24 py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="course-faq-title"
              eyebrow="FAQ"
              title={`${course.name} — questions people actually ask`}
              intro="If yours is not here, WhatsApp it to us. We answer within the hour on working days."
            />
          </div>
          <FaqList items={detail.faqs} />
        </div>
      </section>

      {/* ---- Enquiry ---- */}
      <section
        aria-labelledby="course-enquiry-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHead
              id="course-enquiry-title"
              eyebrow="Enquire"
              title={`Ask about the ${course.name} course`}
              intro="We call within four business hours, Monday to Saturday. No sales script — if a different route suits your background better, we will say so."
            />
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-acid/25 bg-acid/[0.06] p-4">
              <LuBriefcase aria-hidden="true" className="h-5 w-5 shrink-0 text-acid" />
              <p className="text-sm text-zinc-300">
                Next batch starts <strong className="text-acid">{course.nextBatch}</strong> ·{" "}
                {course.mode}
              </p>
            </div>
          </div>
          <LeadForm courseDefault={course.name} source={course.slug} />
        </div>
      </section>

      <RelatedCourses exclude={course.slug} />

      <CtaBand
        title={`Ready to start the ${course.name} course?`}
        body="Book a free 20-minute consultation, or come and sit in on a live session before you decide. Both are free and neither commits you to anything."
        primary={{ href: "/connect-with-us", label: "Book a free consultation" }}
        secondary={{ href: "/placements", label: "See our placement records" }}
      />
    </>
  );
}