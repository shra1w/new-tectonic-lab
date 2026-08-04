import { LuPlus } from "react-icons/lu";
import Stagger from "./Stagger";


export default function FaqList({ items }) {
  return (
    <Stagger className="divide-y divide-white/10 border-y border-white/10" step={0.04}>
      {items.map((f) => (
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
  );
}
