import { LuMicVocal, LuBuilding2, LuSparkles } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Stagger from "./ui/Stagger";
import ImageSlot from "./ui/ImageSlot";
import { grooming } from "@/lib/site";

const ICONS = { interview: LuMicVocal, workplace: LuBuilding2 };

export default function Grooming() {
  return (
    <section aria-labelledby="grooming-title" className="py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <SectionHead
              id="grooming-title"
              eyebrow="Corporate ready"
              title="Trained for the job, and the interview"
              intro={grooming.intro}
            />

            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" itemClassName="h-full">
              {grooming.pillars.map((p) => {
                const Icon = ICONS[p.icon];
                return (
                  <div key={p.title} className="card h-full p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-acid">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold text-zinc-50">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.body}</p>
                  </div>
                );
              })}
            </Stagger>
          </div>

          <Reveal delay={0.12} className="lg:pt-16">
            <div className="relative overflow-hidden rounded-3xl border border-acid/25 bg-acid/[0.06] p-6 sm:p-8">
              <div aria-hidden="true" className="ruled absolute inset-0 -z-10 opacity-40" />

              <p className="eyebrow !text-acid">
                <LuSparkles aria-hidden="true" className="h-3.5 w-3.5" />
                Included in the fee
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-zinc-50 sm:text-[1.75rem]">
                One month of corporate grooming, at no extra cost
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                It is part of the ₹50,000, not an add-on sold later. Every learner on every
                course gets it, in every batch mode.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {grooming.chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-acid/30 bg-ink-950/50 px-3.5 py-1.5 text-xs font-medium text-acid"
                  >
                    {c}
                  </li>
                ))}
              </ul>

              <ImageSlot
                className="mt-7 aspect-[16/9] w-full"
                rounded="rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 40vw"
                id="IMG-05"
                note="Corporate grooming"
                hint="See IMAGE-PROMPTS.md for the generation prompt."
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
