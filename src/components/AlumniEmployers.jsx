import { LuBadgeCheck, LuShieldCheck } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import Reveal from "./ui/Reveal";
import { alumniEmployers } from "@/lib/site";
import Image from "next/image";

function EmployerCard({ e }) {
  const verified = e.verified !== false;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70 transition-colors duration-300 hover:border-acid/35">
      {verified ? (
        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-acid/30 bg-acid/10 px-2.5 py-1 text-2xs font-semibold text-acid backdrop-blur">
          <LuBadgeCheck aria-hidden="true" className="h-3 w-3" />
          Verified
        </span>
      ) : null}

      <div className="flex h-32 shrink-0 items-center justify-center border-b border-white/10 bg-white/[0.02] px-8 sm:h-36">
        {e.logo ? (
          <Image
            width={300}
            height={100}
            src={e.logo}
            alt={`${e.company} logo`}
            loading="lazy"
            decoding="async"
            className={`block   object-contain transition-opacity duration-300 group-hover:opacity-100 w-[60%] `}
          />
        ) : (
          <span className="font-display text-xl font-semibold text-zinc-400">
            {e.company}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-zinc-50">{e.company}</h3>
      </div>
    </article>
  );
}

export default function AlumniEmployers({ standalone = false }) {
  return (
    <section
      aria-labelledby="employers-title"
      className={
        standalone
          ? "py-20 sm:py-24"
          : "border-y border-white/10 bg-ink-900/40 py-20 sm:py-28"
      }
    >
      <div className="shell">
        <SectionHead
          id="employers-title"
          align="center"
          eyebrow="Outcomes"
          title="Companies our alumni work at"
          intro="A factual claim about where our students ended up — not a partnership claim, and not a logo wall."
        />

        <Stagger
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          itemClassName="h-full"
        >
          {alumniEmployers.map((e) => (
            <EmployerCard key={e.company} e={e} />
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 flex max-w-3xl items-start gap-2.5 text-xs leading-relaxed text-zinc-500">
            <LuShieldCheck
              aria-hidden="true"
              className="mt-0.5 hidden h-4 w-4 shrink-0 text-zinc-600 sm:block"
            />
            <span>
              Only companies where a Techtonic Lab alumnus works are listed here. We make
              no claim of formal partnership, affiliation or endorsement with any employer
              shown, and all logos and trade marks remain the property of their respective
              owners.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}