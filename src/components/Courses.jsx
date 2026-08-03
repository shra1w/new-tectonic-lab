import Link from "next/link";
import { LuArrowUpRight, LuChartNoAxesColumn, LuBrainCircuit, LuBoxes } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import ImageSlot from "./ui/ImageSlot";
import { courses } from "@/lib/site";

const ICONS = {
  "data-analytics-course": LuChartNoAxesColumn,
  "data-science-course": LuBrainCircuit,
  "sap-course": LuBoxes,
};

const IMAGE_IDS = {
  "data-analytics-course": "IMG-09",
  "data-science-course": "IMG-10",
  "sap-course": "IMG-11",
};

function CourseCard({ course }) {
  const Icon = ICONS[course.slug];

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-acid/35">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 p-5 sm:p-6">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid transition-transform duration-300 group-hover:-translate-y-0.5">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
          {course.flag}
        </span>
      </div>

      <ImageSlot
        id={IMAGE_IDS[course.slug]}
        className="aspect-[16/9] w-full border-x-0 border-t-0"
        rounded="rounded-none"
        sizes="(max-width: 768px) 100vw, 33vw"
        note={`${course.name} — course card`}
        hint="See IMAGE-PROMPTS.md"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-50">
          {course.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{course.blurb}</p>

        {/* Spec-sheet motif — the data-table language of the subject */}
        <dl className="mt-6">
          {[
            ["Duration", course.duration],
            ["Next batch", course.nextBatch],
            ["Mode", course.mode],
            ["Fee", course.fee],
          ].map(([k, v]) => (
            <div key={k} className="spec-row">
              <dt className="shrink-0 text-zinc-500">{k}</dt>
              <dd className="text-right font-medium text-zinc-100">{v}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {course.tools.map((tool) => (
            <li key={tool} className="chip">
              {tool}
            </li>
          ))}
        </ul>

        <Link
          href={`/${course.slug}`}
          className="mt-auto flex items-center justify-between gap-3 pt-7 text-sm font-semibold text-zinc-100 transition-colors hover:text-acid"
        >
          Explore the {course.name} course
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-ink-950">
            <LuArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </Link>

        {/* Section 6.3 — deep links with descriptive anchor text, not "read more" */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4">
          <Link
            href={`/${course.slug}/syllabus`}
            className="text-xs text-zinc-500 transition-colors hover:text-acid"
          >
            {course.name} syllabus
          </Link>
          <Link
            href={`/${course.slug}/fees`}
            className="text-xs text-zinc-500 transition-colors hover:text-acid"
          >
            {course.name} fees
          </Link>
          <Link
            href="/batches"
            className="text-xs text-zinc-500 transition-colors hover:text-acid"
          >
            Batch dates
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Courses() {
  return (
    <section id="courses" aria-labelledby="courses-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHead
          id="courses-title"
          eyebrow="Our courses"
          title="Three courses. One clear path."
          intro="Each runs three months of core training plus a month of corporate grooming. Same fee, same grooming, same placement preparation across all three."
        />

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
