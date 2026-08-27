import Link from "next/link";
import { LuArrowUpRight, LuChartNoAxesColumn, LuBrainCircuit, LuBoxes, LuSparkles } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import CourseVisual from "./ui/CourseVisual";
import BuyCourseButton from "./BuyCourseButton";
import { courses, EMI_MONTHS, emiPerMonth, formatINR } from "@/lib/site";
import { sapModules } from "@/lib/courses";

const ICONS = {
  "data-analytics-course": LuChartNoAxesColumn,
  "data-science-course": LuBrainCircuit,
  "sap-course": LuBoxes,
};

/* Shared card shell so the SAP card and the two data-track cards sit at exactly
   the same size in the grid. The body between the blurb and the "Explore" link
   is the only part that differs, passed in as `children`. */
function CardShell({ course, children }) {
  const Icon = ICONS[course.slug];

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-acid/35">
      <div className="relative">
        <CourseVisual
          src={course.image}
          alt={course.imageAlt || `${course.name} course illustration`}
          variant="card"
          className="aspect-[16/10] w-full"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-acid/25 bg-ink-950/70 text-acid backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-zinc-300 backdrop-blur-sm">
            {course.flag}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">{children}</div>
    </article>
  );
}

/* Fee highlight — the price is the thing prospects scan for, so it gets its own
   tinted block with a large acid figure, the EMI line and an all-inclusive tag,
   instead of hiding in the spec rows. `unit` shows "/ module" for SAP. */
function FeeHighlight({ course, unit }) {
  const emi = formatINR(emiPerMonth(course.feeNumeric));

  return (
    <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-acid/25 bg-gradient-to-br from-acid/[0.12] to-acid/[0.03] px-4 py-3.5">
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-[1.875rem] font-semibold leading-none tracking-tightest text-acid">
            {course.fee}
          </span>
          {unit ? (
            <span className="text-sm font-medium text-zinc-300">{unit}</span>
          ) : null}
        </div>
        <p className="mt-1.5 text-2xs text-zinc-400">
          ≈ {emi}/mo · {EMI_MONTHS}-month no-cost EMI
        </p>
      </div>
      <span className="shrink-0 rounded-full border border-acid/30 bg-acid/10 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.12em] text-acid">
        All-inclusive
      </span>
    </div>
  );
}

function SpecRows({ rows }) {
  return (
    <dl className="mt-6">
      {rows.map(([k, v]) => (
        <div key={k} className="spec-row">
          <dt className="shrink-0 text-zinc-500">{k}</dt>
          <dd className="text-right font-medium text-zinc-100">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function SubLinks({ course }) {
  return (
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4">
      <Link href={`/${course.slug}/syllabus`} className="text-xs text-zinc-500 transition-colors hover:text-acid">
        {course.name} syllabus
      </Link>
      <Link href={`/${course.slug}/fees`} className="text-xs text-zinc-500 transition-colors hover:text-acid">
        {course.name} fees
      </Link>
      <Link href="/batches" className="text-xs text-zinc-500 transition-colors hover:text-acid">
        Batch dates
      </Link>
    </div>
  );
}

function ExploreLink({ course, label }) {
  return (
    <Link
      href={`/${course.slug}`}
      className="mt-auto flex items-center justify-between gap-3 pt-7 text-sm font-semibold text-zinc-100 transition-colors hover:text-acid"
    >
      {label || `Explore the ${course.name} course`}
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-ink-950">
        <LuArrowUpRight aria-hidden="true" className="h-4 w-4" />
      </span>
    </Link>
  );
}

function CourseCard({ course }) {
  return (
    <CardShell course={course}>
      <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-50">
        {course.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{course.blurb}</p>

      <FeeHighlight course={course} />

      <SpecRows
        rows={[
          ["Duration", course.duration],
          ["Upcoming batch", course.nextBatch],
          ["Mode", course.mode],
        ]}
      />

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {course.tools.map((tool) => (
          <li key={tool} className="chip">
            {tool}
          </li>
        ))}
      </ul>

      <ExploreLink course={course} />
      <SubLinks course={course} />
    </CardShell>
  );
}

/* SAP is four standalone modules at ₹49,999 each. On the card we show only the
   module NAMES (each a link to its own page) — every detail lives on the module
   page behind "View module". Same card size as the data-track cards. */
function SapCourseCard({ course }) {
  const modules = Object.values(sapModules);

  return (
    <CardShell course={course}>
      <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-50">
        {course.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
        Four job-ready S/4HANA modules, each a standalone course. Configure it yourself on live
        server access — pick the one that fits your background.
      </p>

      <FeeHighlight course={course} unit="/ module" />

      <SpecRows
        rows={[
          ["Duration", course.duration],
          ["Upcoming batch", course.nextBatch],
          ["Mode", course.mode],
        ]}
      />

      <div className="mt-5">
        <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Choose your module
        </p>
        <ul className="mt-2.5 grid grid-cols-2 gap-2">
          {modules.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/sap-course/${m.slug}`}
                className="group/mod flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-acid/40 hover:bg-acid/[0.06] hover:text-acid"
              >
                {m.name}
                <LuArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors group-hover/mod:text-acid"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ExploreLink course={course} />
      <SubLinks course={course} />
    </CardShell>
  );
}

export default function Courses() {
  // SAP first, then the two data tracks — all three the same card size.
  const sap = courses.find((c) => c.slug === "sap-course");
  const ordered = [sap, ...courses.filter((c) => c.slug !== "sap-course")];

  return (
    <section id="courses" aria-labelledby="courses-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHead
          id="courses-title"
          eyebrow="Our courses"
          title="Three career tracks. Four SAP modules."
          intro="Each pairs hands-on core training with a month of corporate grooming and the same placement preparation. SAP is offered as four standalone modules — take one, or stack more as you specialise."
        />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {ordered.map((course) =>
            course.slug === "sap-course" ? (
              <SapCourseCard key={course.slug} course={course} />
            ) : (
              <CourseCard key={course.slug} course={course} />
            )
          )}
        </Stagger>

        {/* Corporate Grooming — an add-on course. Free with any of the
            programmes above, but also available to buy on its own. */}
        <article className="card group relative mt-5 flex flex-col overflow-hidden transition-colors duration-300 hover:border-acid/35 md:flex-row">
          <div className="relative md:w-2/5">
            <CourseVisual
              src="/photos/grooming.jpeg"
              alt="Corporate grooming and interview training at Techtonic Lab, Nagpur"
              variant="card"
              className="aspect-[16/10] w-full md:h-full"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <span className="absolute left-4 top-4 rounded-full border border-acid/25 bg-ink-950/70 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-acid backdrop-blur-sm">
              Add-on course
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-50">
              Corporate Grooming
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              A one-month programme that turns trained learners into hireable
              professionals — resume and LinkedIn rebuild, three recorded mock
              interviews with feedback, aptitude practice and workplace
              communication. Included free with every course above, or enroll
              in it on its own.
            </p>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-2xl font-semibold text-acid">₹29,999</span>
              <span className="text-sm text-zinc-500">standalone</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/30 bg-acid/[0.08] px-3 py-1 text-xs font-medium text-acid">
                <LuSparkles aria-hidden="true" className="h-3.5 w-3.5" />
                Free with any course
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BuyCourseButton label="Buy grooming separately" ariaLabel="Buy the corporate grooming programme separately" />
              <Link
                href="/connect-with-us"
                className="text-sm font-semibold text-zinc-400 transition-colors hover:text-acid"
              >
                Ask about it
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
