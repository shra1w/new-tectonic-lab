import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import { courses } from "@/lib/site";


export default function RelatedCourses({ exclude }) {
  const others = courses.filter((c) => c.slug !== exclude);

  return (
    <section aria-labelledby="related-title" className="border-t border-white/10 py-20 sm:py-24">
      <div className="shell">
        <SectionHead
          id="related-title"
          eyebrow="Explore other courses"
          title="The other two tracks"
          intro="Same fee, same four-month shape, same grooming month. Different destination."
        />

        <Stagger className="mt-10 grid gap-5 md:grid-cols-2" itemClassName="h-full">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="card group flex h-full flex-col p-6 transition-colors duration-300 hover:border-acid/35"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-zinc-50">{c.name}</h3>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-zinc-400 transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-ink-950">
                  <LuArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{c.blurb}</p>
              <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                <span>{c.duration}</span>
                <span aria-hidden="true">·</span>
                <span>{c.fee}</span>
                <span aria-hidden="true">·</span>
                <span>Upcoming batch {c.nextBatch}</span>
              </p>
              <span className="mt-5 text-sm font-semibold text-acid">
                Explore the {c.name} course
              </span>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
