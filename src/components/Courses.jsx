import Link from "next/link";
import Image from "next/image";
import { LuArrowUpRight, LuChartNoAxesColumn, LuBrainCircuit, LuBoxes } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import CourseVisual from "./ui/CourseVisual";
import { courses } from "@/lib/site";

const ICONS = {
  "data-analytics-course": LuChartNoAxesColumn,
  "data-science-course": LuBrainCircuit,
  "sap-course": LuBoxes,
};

function CourseCard({ course }) {
  const Icon = ICONS[course.slug];

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-acid/35">
      {/* Image sits at the very top, bleeding to the card edges */}
      <div className="relative">
        <CourseVisual
          src={course.image}
          alt={course.imageAlt || `${course.name} course illustration`}
          variant="card"
          className="aspect-[16/10] w-full"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Icon + flag float over the blended lower portion of the image */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-acid/25 bg-ink-950/70 text-acid backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.14em] text-zinc-300 backdrop-blur-sm">
            {course.flag}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-zinc-50">
          {course.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{course.blurb}</p>

        <dl className="mt-6">
          {[
            ["Duration", course.duration],
            ["Upcoming batch", course.nextBatch],
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