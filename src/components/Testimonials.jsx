import { LuQuote, LuBadgeCheck } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import ImageSlot from "./ui/ImageSlot";
import { testimonials } from "@/lib/site";

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-28"
    >
      <div className="shell">
        <SectionHead
          id="testimonials-title"
          eyebrow="In their words"
          title="What students say"
          intro="Six students, all named, all on record. Shared with consent — individual results vary."
        />

        <Stagger
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          itemClassName="h-full"
          step={0.06}
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="card group flex h-full flex-col p-6 transition-colors duration-300 hover:border-acid/30"
            >
              <LuQuote
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-acid/60 transition-transform duration-300 group-hover:scale-110"
              />

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <ImageSlot
                  className="h-11 w-11 shrink-0"
                  rounded="rounded-full"
                  note={t.initials}
                  hint=""
                />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 truncate font-display text-sm font-semibold text-zinc-50">
                    {t.name}
                    {t.verified ? (
                      <LuBadgeCheck
                        aria-label="Verified placement"
                        className="h-3.5 w-3.5 shrink-0 text-acid"
                      />
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-zinc-500">{t.role}</p>
                </div>
                <span className="chip shrink-0 max-sm:hidden">{t.course}</span>
              </figcaption>
            </figure>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
