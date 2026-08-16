// src/components/Hero.jsx
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
import { courses, facultyYearsTotal, formatINR } from "@/lib/site";
import { getBatches } from "@/lib/content";
import BuyCourseButton from "./BuyCourseButton";

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

/* Rail values are derived from the course data so they can never drift from
   the real fees/durations. Fees and lengths differ per course, so we show the
   spread rather than a single (wrong) number. */
const fees = courses.map((c) => Number(String(c.feeNumeric).replace(/[^\d]/g, "")));
const monthsList = courses.map((c) => c.durationMonths ?? parseInt(c.duration, 10));
const minFee = Math.min(...fees);
const maxFee = Math.max(...fees);
const minMonths = Math.min(...monthsList);
const maxMonths = Math.max(...monthsList);

const feeRange =
  minFee === maxFee
    ? formatINR(minFee)
    : `${formatINR(minFee)}–${maxFee.toLocaleString("en-IN")}`;
const durationRange =
  minMonths === maxMonths ? `${minMonths} months` : `${minMonths}–${maxMonths} months`;

const rail = [
  { icon: LuGraduationCap, k: "Courses", v: "3 job-ready tracks", sub: "DA · DS · SAP" },
  { icon: LuIndianRupee, k: "Fee", v: feeRange, sub: "All-inclusive, no add-ons" },
  { icon: LuCalendarDays, k: "Duration", v: durationRange, sub: "By programme" },
  { icon: LuLaptop, k: "Modes", v: "Class · Online · Weekend", sub: "Same syllabus" },
];

export default function Hero() {
  // Derived at render time — the soonest actually upcoming batch across every
  // course and mode. Re-computed on each ISR revalidation, so as today advances
  // the strip advances with it. No hand-maintained "nextBatch" string here.
  const batches = getBatches();
  const soonest = batches[0];

  return (
    <section className="relative isolate flex min-h-[92svh] items-center justify-center overflow-hidden py-20 sm:py-24 lg:min-h-[94svh]">
      <HeroBackdrop images={BACKDROP} />

      <div className="shell w-full">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <p className="chip !bg-white/[0.06] backdrop-blur">
                <LuMapPin aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
                Nagpur · Manish Nagar
              </p>
              <p className="chip !border-acid/30 !bg-acid/10 !text-acid backdrop-blur">
                <LuBadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                110+ recent alumni
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            {/* More generous leading across all sizes — gives the words room and
                keeps the acid highlight clear of the line above. */}
            <h1 className="mt-7 font-display text-[2.5rem] font-semibold leading-[1.28] tracking-tight text-zinc-50 sm:text-6xl sm:leading-[1.16] sm:tracking-tightest lg:text-[4.5rem] lg:leading-[1.08]">
              IT courses in Nagpur to elevate your{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-2 -inset-y-0.5 -z-10 rounded-md bg-acid sm:-inset-y-1"
                />
                <span className="relative text-ink-950">Tech career</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            {/* Tighter line spacing on the subheading so it reads as one calm block. */}
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-6 text-zinc-300 sm:text-lg sm:leading-7">
              Job-ready training in SAP, Data Analytics and Data Science — focused
              programs spanning four to nine months, where hands-on projects meet
              corporate grooming, taught by consultants who still work in the field.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <BuyCourseButton/>
              <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
                Book a free consultation
                <LuArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="#courses"
                className="btn-ghost w-full !border-white/20 !bg-white/[0.05] backdrop-blur-md sm:w-auto"
              >
                Explore courses
              </Link>
            </div>
          </Reveal>

          {/* Upcoming batch strip — driven by getBatches() so the date is always
              in the future relative to the current render. */}
          {soonest && (
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-white/10 bg-ink-950/60 px-5 py-3 backdrop-blur-xl">
                <p className="flex items-center gap-2 text-sm">
                  <span aria-hidden="true" className="h-2 w-2 animate-pulse-dot rounded-full bg-acid" />
                  <span className="text-zinc-400">Upcoming batch</span>
                  <strong className="font-display font-semibold text-zinc-50">
                    {soonest.start}
                  </strong>
                </p>
                <span aria-hidden="true" className="hidden h-4 w-px bg-white/15 sm:block" />
                <p className="text-xs text-zinc-400">
                  {soonest.course} · {soonest.mode}
                </p>
                <Link href="/batches" className="link-underline text-xs">
                  All dates
                  <LuArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>

        {/* Rail — icon-chip cells with a hover accent line and a supporting
            sub-label under each value. */}
        <Reveal delay={0.3}>
          <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {rail.map(({ icon: Icon, k, v, sub }) => (
              <div
                key={k}
                className="group relative bg-ink-950/75 p-5 backdrop-blur-xl transition-colors duration-300 hover:bg-ink-950/90"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <dt className="flex items-center gap-2 text-2xs uppercase tracking-[0.16em] text-zinc-500">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-acid/25 bg-acid/10 text-acid transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                  {k}
                </dt>

                <dd className="mt-3 font-display text-sm font-semibold leading-snug text-zinc-50 sm:text-base">
                  {v}
                </dd>
                <p className="mt-1 text-2xs leading-relaxed text-zinc-500">{sub}</p>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.36}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-zinc-500">
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