import { LuPlus, LuMessageCircleQuestion } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import { faqs, brand } from "@/lib/site";


export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="faq-title"
              eyebrow="FAQ"
              title="Questions people actually ask"
              intro="If yours is not here, WhatsApp it to us — we answer within the hour on working days."
            />
            <a
              href={brand.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-7 !py-3 !text-[0.8125rem]"
            >
              <LuMessageCircleQuestion aria-hidden="true" className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </div>

          <Stagger className="divide-y divide-white/10 border-y border-white/10" step={0.04}>
            {faqs.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-base font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-acid sm:text-lg">
                    {f.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-zinc-400 transition-all duration-300 group-open:rotate-45 group-open:border-acid group-open:bg-acid group-open:text-ink-950"
                  >
                    <LuPlus className="h-3.5 w-3.5" />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-sm leading-relaxed text-zinc-400">{f.a}</p>
              </details>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
