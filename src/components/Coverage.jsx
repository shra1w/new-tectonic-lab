import { LuMapPin, LuClock, LuNavigation, LuPhone } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Stagger from "./ui/Stagger";
import { districts, offices, brand } from "@/lib/site";

/**
 * UX-05 — one strip in the DOM, moved with a CSS animation. Never render the
 * list four times. Duplicated once (aria-hidden) purely for a seamless loop,
 * and the animation is disabled under prefers-reduced-motion via globals.css.
 */
function DistrictMarquee() {
  const Row = ({ hidden }) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-2.5 pr-2.5"
    >
      {districts.map((d) => (
        <li
          key={d}
          className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
        >
          {d}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mask-fade-x mt-10 overflow-hidden">
      <div className="flex w-max animate-slide-x motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}

export default function Coverage() {
  return (
    <section
      id="locations"
      aria-labelledby="coverage-title"
      className="scroll-mt-24 border-y border-white/10 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHead
          id="coverage-title"
          eyebrow="Coverage"
          title="Nagpur-based, Vidarbha-wide"
          intro="Both campuses are in Nagpur, and students travel in from across Vidarbha. If the commute does not work, the weekend classroom batch and the fully online live batch run the same syllabus with the same faculty — nothing is a watered-down version of anything else."
        />

        <DistrictMarquee />

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-zinc-500">
            Three ways to attend: weekday classroom at either campus, weekend classroom for
            working professionals, or live online for students outside Nagpur.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 lg:grid-cols-2" itemClassName="h-full">
          {offices.map((o) => (
            <article key={o.id} className="card flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-acid/25 bg-acid/10 text-acid">
                  <LuMapPin aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="font-display text-lg font-semibold text-zinc-50">{o.label}</h3>
              </div>

              {/* CRIT-4 — this exact string must match GBP, JustDial and schema */}
              <address className="mt-5 not-italic text-sm leading-relaxed text-zinc-400">
                {o.street},
                <br />
                {o.locality}, {o.region} {o.postalCode}
              </address>

              <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                <LuClock aria-hidden="true" className="h-3.5 w-3.5" />
                {o.hours}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5 pt-1">
                <a
                  href={o.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !px-5 !py-2.5 !text-[0.8125rem]"
                >
                  <LuNavigation aria-hidden="true" className="h-3.5 w-3.5" />
                  Directions
                </a>
                <a href={brand.phoneHref} className="btn-ghost !px-5 !py-2.5 !text-[0.8125rem]">
                  <LuPhone aria-hidden="true" className="h-3.5 w-3.5" />
                  Call {brand.phone}
                </a>
              </div>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
