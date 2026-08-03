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
                <h3 className="font-display text-lg font-semibold text-zinc-50">{p.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {p.title} · <span className="text-acid">{p.years}</span>
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{p.bio}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* Section 7.1 — credential + LinkedIn strengthens entity confidence */}
                <Link
                  href="/faculty"
                  className="mt-5 flex items-center gap-1.5 text-2xs text-zinc-500 transition-colors hover:text-acid"
                >
                  <LuLinkedin aria-hidden="true" className="h-3.5 w-3.5" />
                  Full profile on the faculty page
                </Link>
              </div>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
