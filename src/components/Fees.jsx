import Link from "next/link";
import { LuCheck, LuInfo, LuArrowRight } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import { courses, DISCLAIMER } from "@/lib/site";

export default function Fees() {
  return (
    <section
      id="fees"
      aria-labelledby="fees-title"
      className="scroll-mt-24 border-y border-white/10 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            id="fees-title"
            eyebrow="Fees and batches"
            title="One price. Published."
            intro="Every course is ₹49,999 for the full four months. No tiered upsell, no “contact us for pricing”, no separate registration or certificate fee."
          />
          <Link href="/fees" className="link-underline shrink-0 text-sm">
            Full fee breakdown
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {courses.map((course, i) => (
            <article
              key={course.slug}
              className={`card relative flex h-full flex-col p-6 transition-colors duration-300 hover:border-acid/35 ${
                i === 0 ? "ring-1 ring-acid/25" : ""
              }`}
            >
              {i === 0 ? (
                <span className="absolute -top-2.5 left-6 rounded-full bg-acid px-2.5 py-1 text-2xs font-bold uppercase tracking-[0.14em] text-ink-950">
                  {course.flag}
                </span>
              ) : null}

              <h3 className="font-display text-xl font-semibold text-zinc-50">{course.name}</h3>
              <p className="mt-1.5 text-xs text-zinc-500">
                3 months + 1 month corporate grooming
              </p>

              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold tracking-tightest text-acid">
                  {course.fee}
                </span>
                <span className="text-xs text-zinc-500">all-inclusive</span>
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                or ₹8,334 × 6 months on EMI · no hidden charges
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                {course.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 space-y-2.5">
                <Link
                  href={`/${course.slug}/fees`}
                  className="btn-ghost w-full !py-3 !text-[0.8125rem]"
                >
                  {course.name} fee breakdown
                </Link>
                <Link
                  href={`/${course.slug}`}
                  className="block text-center text-xs text-zinc-500 transition-colors hover:text-acid"
                >
                  View the {course.name} course
                </Link>
              </div>
            </article>
          ))}
        </Stagger>

        <p className="mt-8 flex items-start gap-2.5 text-xs leading-relaxed text-zinc-500">
          <LuInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
          <span>
            Techtonic Lab provides <strong className="font-semibold text-zinc-300">placement
            assistance, not a placement guarantee</strong>. {DISCLAIMER.split(". ").slice(1).join(". ")}
          </span>
        </p>
      </div>
    </section>
  );
}
