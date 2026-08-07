import Link from "next/link";
import {
  LuMapPin,
  LuArrowRight,
  LuCalendarDays,
  LuIndianRupee,
  LuLaptop,
  LuGraduationCap,
  LuBadgeCheck,
  LuArrowDown,
} from "react-icons/lu";

import Reveal from "./ui/Reveal";
import HeroBackdrop from "./HeroBackdrop";
import { courses, placements, facultyYearsTotal } from "@/lib/site";


const U = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=70`;

const BACKDROP = [
  // Learners at desks with laptops — a room mid-session
  { src: U("1718220216044-006f43e3a9b1") },
  // Students in front of monitors in a lab
  { src: U("1629904853716-f0bc54eea481") },
  // Code on a dark monitor — the darkest of the four
  { src: U("1632251141959-40b21a6c118c") },
  // A computer lab, desks and chairs
  { src: U("1623479322729-28b25c16b011") },
];
const rail = [
  { icon: LuGraduationCap, k: "Courses", v: "3 job-ready tracks" },
  { icon: LuIndianRupee, k: "Fee", v: "₹49,999 all-in" },
  { icon: LuCalendarDays, k: "Duration", v: "4 months" },
  { icon: LuLaptop, k: "Modes", v: "Class · Online · Weekend" },
];

export default function Hero() {
  const soonest = courses.reduce((a, b) => (a.startDateISO < b.startDateISO ? a : b));

  return (
    <section className="relative isolate flex min-h-[92svh] items-center justify-center overflow-hidden py-20 sm:py-24 lg:min-h-[94svh]">
      <HeroBackdrop images={BACKDROP} />


      <div className="shell w-full">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <p className="chip !bg-white/[0.06] backdrop-blur">
                <LuMapPin aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
                Nagpur · Somalwada &amp; Jaitala Road
              </p>
              <p className="chip !border-acid/30 !bg-acid/10 !text-acid backdrop-blur">
                <LuBadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                {placements.length} named alumni on record
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-7 font-display text-[2.5rem] font-semibold leading-[1.02] tracking-tightest text-zinc-50 sm:text-6xl lg:text-[4.5rem]">
              IT courses in Nagpur to elevate your{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-md bg-acid"
                />
                <span className="relative text-ink-950">Tech career</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Job-ready training in Data Analytics, Data Science and SAP — three months
              of hands-on work plus a month of corporate grooming, taught by consultants
              who still work in the field.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
                Book a free consultation
                <LuArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="#courses"
                className="btn-ghost w-full !border-white/20 !bg-white/[0.05] backdrop-blur-md sm:w-auto"
              >
                Explore the three courses
              </Link>
            </div>
          </Reveal>

          {/* Upcoming batch strip */}
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-white/10 bg-ink-950/60 px-5 py-3 backdrop-blur-xl">
              <p className="flex items-center gap-2 text-sm">
                <span aria-hidden="true" className="h-2 w-2 animate-pulse-dot rounded-full bg-acid" />
                <span className="text-zinc-400">Upcoming batch</span>
                <strong className="font-display font-semibold text-zinc-50">
                  {soonest.nextBatch}
                </strong>
              </p>
              <span aria-hidden="true" className="hidden h-4 w-px bg-white/15 sm:block" />
              <p className="text-xs text-zinc-400">
                {soonest.name} · {soonest.mode}
              </p>
              <Link href="/batches" className="link-underline text-xs">
                All dates
                <LuArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {rail.map(({ icon: Icon, k, v }) => (
              <div key={k} className="bg-ink-950/75 p-4 backdrop-blur-xl sm:p-5">
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

        <Reveal delay={0.36}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-zinc-500">
            {facultyYearsTotal}+ years of combined faculty experience · Live SAP S/4HANA
            server access · Placement assistance, not a guarantee
          </p>
        </Reveal>

        <Reveal delay={0.44}>
          <div className="mt-12 flex justify-center">
            <Link
              href="#courses"
              aria-label="Scroll to the courses"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-zinc-500 transition-colors hover:border-acid/60 hover:text-acid"
            >
              <LuArrowDown aria-hidden="true" className="h-4 w-4 animate-bounce" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}