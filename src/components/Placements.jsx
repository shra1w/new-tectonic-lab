import Link from "next/link";
import { LuArrowRight, LuInfo } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import ImageSlot from "./ui/ImageSlot";
import { homePlacements, DISCLAIMER } from "@/lib/site";

export default function Placements() {
  return (
    <section id="placements" aria-labelledby="placements-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHead
          id="placements-title"
          eyebrow="Placement stories"
          title="Real names. Real records."
          intro="Every person below completed a Techtonic Lab programme. Names and courses are on file, shared with consent."
        />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {homePlacements.map((p) => (
            <article
              key={p.name}
              className="card group flex h-full flex-col p-5 transition-colors duration-300 hover:border-acid/35"
            >
              <div className="flex items-center gap-4">
                <ImageSlot
                  className="h-14 w-14 shrink-0"
                  rounded="rounded-full"
                  note={p.initials}
                  hint=""
                />
                <div className="min-w-0">
                  <h3 className="truncate font-display text-base font-semibold text-zinc-50">
                    {p.name}
                  </h3>
                  <p className="truncate text-xs text-zinc-500">
                    {p.placedAs}
                    {p.employer ? ` · ${p.employer}` : ""}
                  </p>
                </div>
              </div>

              <dl className="mt-5">
                <div className="spec-row">
                  <dt className="text-zinc-500">Programme</dt>
                  <dd className="font-medium text-zinc-100">{p.programme}</dd>
                </div>
                <div className="spec-row">
                  <dt className="text-zinc-500">Placed as</dt>
                  <dd className="font-medium text-zinc-100">{p.placedAs}</dd>
                </div>
                <div className="spec-row">
                  <dt className="text-zinc-500">Batch</dt>
                  <dd className="font-medium text-zinc-100">{p.batch}</dd>
                </div>
              </dl>
            </article>
          ))}
        </Stagger>

        <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex max-w-2xl items-start gap-2.5 text-xs leading-relaxed text-zinc-500">
            <LuInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
            <span>Shared with student consent. Individual results vary. {DISCLAIMER}</span>
          </p>
          <Link href="/placements" className="btn-ghost shrink-0 !py-3 !text-[0.8125rem]">
            See all placement records
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
