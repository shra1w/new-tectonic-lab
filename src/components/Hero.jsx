import Link from "next/link";
import {
  LuMapPin,
  LuArrowRight,
  LuCalendarDays,
  LuIndianRupee,
  LuLaptop,
  LuGraduationCap,
} from "react-icons/lu";
import Reveal from "./ui/Reveal";
import ImageSlot from "./ui/ImageSlot";
import { courses } from "@/lib/site";

const rail = [
  { icon: LuGraduationCap, k: "Courses", v: "3 job-ready tracks" },
  { icon: LuIndianRupee, k: "Fee", v: "₹50,000 all-inclusive" },
  { icon: LuCalendarDays, k: "Duration", v: "4 months end to end" },
  { icon: LuLaptop, k: "Modes", v: "Classroom · Online · Weekend" },
];

export default function Hero() {
  const soonest = courses.reduce((a, b) => (a.startDateISO < b.startDateISO ? a : b));

  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      {/* Signature: the dashboard hairline grid the whole page sits on */}
      <div aria-hidden="true" className="ruled ruled-fade absolute inset-0 -z-10 opacity-[0.55]" />
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -z-10 h-64 w-[42rem] -translate-x-1/2 bg-acid/[0.07] blur-[120px]"
      />

      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          {/* ---- Left: the thesis ---- */}
          <div>
            <Reveal>
              <p className="chip">
                <LuMapPin aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
                Nagpur · Somalwada &amp; Jaitala Road
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.03] tracking-tightest text-zinc-50 sm:text-6xl lg:text-[4.25rem]">
                IT courses in Nagpur to elevate your{" "}
                {/* Signature element: the "selected cell" highlight */}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-md bg-acid"
                  />
                  <span className="relative text-ink-950">tech career</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Job-ready training in Data Analytics, Data Science and SAP — three months of
                hands-on work plus a month of corporate grooming, taught by consultants who
                still work in the field.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
                  Book a free consultation
                  <LuArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link href="#courses" className="btn-ghost w-full sm:w-auto">
                  Explore the three courses
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {rail.map(({ icon: Icon, k, v }) => (
                  <div key={k} className="bg-ink-950 p-4">
                    <dt className="flex items-center gap-1.5 text-2xs uppercase tracking-[0.16em] text-zinc-500">
                      <Icon aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
                      {k}
                    </dt>
                    <dd className="mt-2 font-display text-sm font-semibold leading-snug text-zinc-100">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* ---- Right: campus image + next-batch ticket ---- */}
          <Reveal delay={0.2} className="lg:pt-4">
            <div className="relative">
              <ImageSlot
                src={"/photos/hero-lab.png"}
                className="aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[4/5]"
                rounded="rounded-3xl"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                id="IMG-01"
                note="Homepage hero"
                hint="See IMAGE-PROMPTS.md for the generation prompt."
              />

              {/* Next batch ticket */}
              <div className="card absolute -bottom-6 left-4 right-4 p-4 shadow-lift sm:left-6 sm:right-auto sm:w-[19rem]">
                <p className="eyebrow">
                  <span aria-hidden="true" className="h-2 w-2 animate-pulse-dot rounded-full bg-acid" />
                  Next batch
                </p>
                <p className="mt-2.5 font-display text-xl font-semibold text-zinc-50">
                  {soonest.nextBatch}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {soonest.name} · {soonest.mode}
                </p>
                <Link
                  href="/batches"
                  className="link-underline mt-3.5 text-xs"
                >
                  See every batch date
                  <LuArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
