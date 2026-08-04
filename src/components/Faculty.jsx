import Link from "next/link";
import { LuArrowRight, LuLinkedin } from "react-icons/lu";
import SectionHead from "./ui/SectionHead";
import Stagger from "./ui/Stagger";
import ImageSlot from "./ui/ImageSlot";
import { faculty } from "@/lib/site";

function slug(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function Faculty() {
  return (
    <section id="faculty" aria-labelledby="faculty-title" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            id="faculty-title"
            eyebrow="The team"
            title="Meet the faculty"
            intro="Six instructors, 72+ years of combined industry experience across IT, ERP, business intelligence and HR."
          />
          <Link href="/faculty" className="link-underline shrink-0 text-sm">
            Meet all six faculty members
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {faculty.slice(0, 3).map((p) => (
            <article
              key={p.name}
              className="card group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-acid/35"
            >
              <ImageSlot
                className="aspect-[4/3] w-full"
                rounded="rounded-none"
                sizes="(max-width: 768px) 100vw, 33vw"
                note={`Portrait — ${p.name}`}
                hint={`Consistent head-and-shoulders shot, same lighting across all six. 800×600px → /public/faculty/${slug(
                  p.name
                )}.jpg`}
              />

              <div className="flex flex-1 flex-col p-6">
                {/* Name + title */}
                <h3 className="font-display text-lg font-semibold text-zinc-50">{p.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{p.title}</p>

                {/* Experience — large, highlighted */}
                <div className="mt-5 flex items-end gap-2.5 border-l-2 border-acid/50 pl-3.5">
                  <span className="font-display text-4xl font-bold leading-none text-acid sm:text-5xl">
                    {p.yearsNum}+
                  </span>
                  <span className="pb-1 text-[0.7rem] font-semibold uppercase tracking-wider text-zinc-400">
                    years
                    <br />
                    in field
                  </span>
                </div>

                {/* 2–3 highlights */}
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm leading-relaxed text-zinc-400"
                    >
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-acid" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* LinkedIn at bottom */}
                {/* LinkedIn button at bottom, centered */}
<div className="mt-6 flex justify-center border-t border-white/10 pt-4">
  {p.linkedin ? (
    <Link
      href={`${p.linkedin}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-acid/40 bg-acid/10 px-4 py-2 text-2xs font-semibold text-acid transition-colors hover:bg-acid/20"
    >
      <LuLinkedin aria-hidden="true" className="h-3.5 w-3.5 mt-1" />
      Connect on LinkedIn
    </Link>
  ) : (
    <Link
      href="/faculty"
      className="inline-flex items-center gap-1.5 rounded-md border border-acid/40 bg-acid/10 px-4 py-2 text-2xs font-semibold text-acid transition-colors hover:bg-acid/20"
    >
      <LuLinkedin aria-hidden="true" className="h-3.5 w-3.5 mb-1" />
      See profile
    </Link>
  )}
</div>
              </div>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}