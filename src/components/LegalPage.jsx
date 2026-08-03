import Link from "next/link";
import { LuArrowRight, LuFileText } from "react-icons/lu";

import PageHero from "./ui/PageHero";
import Reveal from "./ui/Reveal";
import Prose from "./ui/Prose";
import { brand } from "@/lib/site";

/**
 * Shared shell for /privacy-policy and /terms-of-service. Renders a sticky
 * in-page contents list on desktop so a long document is actually navigable.
 */
export default function LegalPage({ doc, breadcrumbs, eyebrow }) {
  const anchor = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={eyebrow}
        title={doc.h1}
        summary={doc.intro}
      >
        <p className="mt-6 inline-flex items-center gap-2 text-xs text-zinc-500">
          <LuFileText aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
          Last updated: {doc.updated}
        </p>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-16">
          {/* Contents */}
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-2xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              On this page
            </h2>
            <ol className="mt-4 space-y-2">
              {doc.sections.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#${anchor(s.title)}`}
                    className="flex gap-3 text-sm text-zinc-400 transition-colors hover:text-acid"
                  >
                    <span className="font-display text-2xs text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-2xl border border-white/10 bg-ink-900/60 p-5">
              <p className="text-xs leading-relaxed text-zinc-400">
                Questions about this document? Write to{" "}
                <a href={`mailto:${brand.email}`} className="font-semibold text-acid">
                  {brand.email}
                </a>
                .
              </p>
            </div>
          </nav>

          {/* Body */}
          <div>
            {doc.sections.map((s, i) => (
              <Reveal key={s.title} delay={0.02 * i}>
                <section
                  id={anchor(s.title)}
                  className="scroll-mt-28 border-b border-white/10 py-10 first:pt-0 last:border-b-0"
                >
                  <h2 className="flex items-baseline gap-4 font-display text-xl font-semibold text-zinc-50 sm:text-2xl">
                    <span className="font-display text-sm text-acid">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h2>
                  <Prose className="mt-5">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </Prose>
                </section>
              </Reveal>
            ))}

            <Reveal>
              <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
                <Link href="/privacy-policy" className="link-underline text-sm">
                  Privacy policy
                  <LuArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link href="/terms-of-service" className="link-underline text-sm">
                  Terms of service
                  <LuArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link href="/connect-with-us" className="link-underline text-sm">
                  Contact us
                  <LuArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
