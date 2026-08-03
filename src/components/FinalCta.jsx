import Link from "next/link";
import { LuArrowRight, LuCalendarDays } from "react-icons/lu";
import Reveal from "./ui/Reveal";

export default function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 px-6 py-14 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="ruled ruled-fade absolute inset-0 -z-10 opacity-60" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-acid to-transparent"
            />

            <h2
              id="cta-title"
              className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tightest sm:text-[2.75rem]"
            >
              Not sure which course fits you?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
              A 20-minute call with a counsellor, no obligation and no sales script. We will
              look at your background and tell you which of the three — if any — makes sense.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
                Book a free consultation
                <LuArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/batches" className="btn-ghost w-full sm:w-auto">
                <LuCalendarDays aria-hidden="true" className="h-4 w-4" />
                See all batch dates
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
