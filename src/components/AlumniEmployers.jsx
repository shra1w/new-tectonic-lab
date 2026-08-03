import { LuBadgeCheck, LuTriangleAlert, LuShieldCheck } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import ImageSlot from "./ui/ImageSlot";
import { alumniEmployers } from "@/lib/site";

/**
 * Audit CRIT-5 — this replaces the old "Trusted Partners" logo wall.
 * It is a factual claim about where alumni ended up, never a partnership claim.
 * Do not add a company here without a named alumnus on file.
 */
export default function AlumniEmployers() {
  return (
    <section
      aria-labelledby="employers-title"
      className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHead
          id="employers-title"
          eyebrow="Outcomes"
          title="Companies our alumni work at"
          intro="A factual claim about where our students ended up — not a partnership claim."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {alumniEmployers.map((e) => (
            <div
              key={e.company}
              className={`card flex h-full flex-col p-5 ${
                e.verified ? "border-acid/25" : "border-dashed"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <ImageSlot
                  className="h-14 w-32 shrink-0"
                  rounded="rounded-xl"
                  note={`${e.company} logo`}
                  hint=""
                />
                {e.verified ? (
                  <span className="chip !border-acid/30 !bg-acid/10 !text-acid">
                    <LuBadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                    Verified
                  </span>
                ) : (
                  <span className="chip !border-amber-400/30 !bg-amber-400/10 !text-amber-300">
                    <LuTriangleAlert aria-hidden="true" className="h-3.5 w-3.5" />
                    Needs a name
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">{e.company}</h3>

              {e.verified ? (
                <p className="mt-1.5 text-sm text-zinc-400">
                  {e.alumnus} — {e.role}
                </p>
              ) : (
                <p className="mt-1.5 text-sm text-amber-300/80">
                  Name the alumnus before publishing this logo.
                </p>
              )}
            </div>
          ))}
        </Stagger>

        <p className="mt-8 flex max-w-3xl items-start gap-2.5 text-xs leading-relaxed text-zinc-500">
          <LuShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
          <span>
            Only companies where a Techtonic Lab alumnus works are listed here. We do not display
            the logo of any company we have no named alumnus at, and we make no claim of formal
            partnership with any employer listed.
          </span>
        </p>
      </div>
    </section>
  );
}
