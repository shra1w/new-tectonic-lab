import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import Reveal from "./ui/Reveal";

export default function CtaBand({
  title = "Not sure which course fits you?",
  body = "A 20-minute call with a counsellor, no obligation and no sales script. We will look at your background and tell you which of the three — if any — makes sense.",
  primary = { href: "/connect-with-us", label: "Book a free consultation" },
  secondary = { href: "/batches", label: "See all batch dates" },
}) {
  return (
    <section aria-labelledby="cta-band-title" className="py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 px-6 py-14 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="ruled ruled-fade absolute inset-0 -z-10 opacity-60" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-acid to-transparent"
            />
            <h2
              id="cta-band-title"
              className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tightest sm:text-[2.75rem]"
            >
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">{body}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={primary.href} className="btn-primary w-full sm:w-auto">
                {primary.label}
                <LuArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              {secondary ? (
                <Link href={secondary.href} className="btn-ghost w-full sm:w-auto">
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
