import Stagger from "./ui/Stagger";
import { quickFacts } from "@/lib/site";

/**
 * GEO: a "quick facts" block near the top of the page, marked up as a
 * definition list so AI answer engines can lift it as-is.
 */
export default function QuickFacts() {
  return (
    <section aria-labelledby="quick-facts" className="border-y border-white/10 bg-ink-900/40">
      <h2 id="quick-facts" className="sr-only">
        Techtonic Lab at a glance
      </h2>

      <div className="shell py-10 sm:py-12">
        <Stagger
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
          step={0.05}
        >
          {quickFacts.map((f) => (
            <div key={f.label}>
              <dl>
                <dd className="font-display text-3xl font-semibold tracking-tightest text-acid sm:text-[2.1rem]">
                  {f.value}
                  {f.unit ? (
                    <span className="ml-1 text-sm font-medium text-zinc-500">{f.unit}</span>
                  ) : null}
                </dd>
                <dt className="mt-2 text-xs leading-relaxed text-zinc-400">{f.label}</dt>
              </dl>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
