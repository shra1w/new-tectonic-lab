import {
  LuUsers,
  LuServer,
  LuReceiptIndianRupee,
  LuBriefcase,
  LuFolderGit2,
  LuMonitorSmartphone,
} from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import { differentiators } from "@/lib/site";

const ICONS = {
  faculty: LuUsers,
  server: LuServer,
  price: LuReceiptIndianRupee,
  grooming: LuBriefcase,
  projects: LuFolderGit2,
  modes: LuMonitorSmartphone,
};

export default function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="py-20 sm:py-28">
      <div className="shell">
        <SectionHead
          id="why-title"
          eyebrow="Why Techtonic Lab"
          title="What actually makes the difference"
          intro="Six specifics, not six adjectives. Every one of these is checkable before you pay."
        />

        <Stagger
          className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3"
          itemClassName="h-full"
          step={0.06}
        >
          {differentiators.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="group h-full bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-900 sm:p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors duration-300 group-hover:border-acid/40 group-hover:bg-acid/10 group-hover:text-acid">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-zinc-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.body}</p>
              </div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
