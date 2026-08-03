import Link from "next/link";
import { LuCheck, LuArrowRight, LuArrowUpRight, LuServer, LuTrendingUp, LuTarget } from "react-icons/lu";

import PageHero from "./ui/PageHero";
import FactTable from "./ui/FactTable";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Stagger from "./ui/Stagger";
import FaqList from "./ui/FaqList";
import LeadForm from "./LeadForm";
import CtaBand from "./CtaBand";
import { sapModules } from "@/lib/courses";
import { courses } from "@/lib/site";

export default function SapModulePage({ mod, breadcrumbs }) {
  const sap = courses.find((c) => c.slug === "sap-course");
  const others = Object.values(sapModules).filter((m) => m.slug !== mod.slug);

  const faqs = [
    {
      q: `What is ${mod.name} used for?`,
      a: `${mod.name} is the ${mod.tagline} area of SAP. ${mod.summary}`,
    },
    {
      q: `Who should learn ${mod.name}?`,
      a: `${mod.bestFor} suit this module best. That said, all four functional modules are business configuration rather than programming, so no technical degree is required for any of them.`,
    },
    {
      q: `How many hours of ${mod.name} are in the Techtonic Lab SAP course?`,
      a: `${mod.hours}. The SAP programme at Techtonic Lab covers FICO, MM, SD and PP/QM together over four months, plus the cross-module integration sessions that interviews actually test.`,
    },
    {
      q: `Do I get live S/4HANA access for ${mod.name}?`,
      a: "Yes. Every SAP learner receives individual S/4HANA credentials from week two and configures in a real system rather than watching a demonstration.",
    },
    {
      q: `What is the fee for learning ${mod.name} in Nagpur?`,
      a: "₹50,000 covers the whole four-month SAP programme including this module, all the others, live server access, the corporate grooming month and placement preparation. Modules are not sold separately.",
    },
    {
      q: `What jobs can I get with ${mod.name}?`,
      a: `The common roles are ${mod.careers
        .map((c) => c.role)
        .join(" and ")}. Entry-level packages in this area typically start around ${
        mod.careers[0].entry
      }, moving to ${mod.careers[0].mid} with two to four years of implementation experience.`,
    },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={`SAP module · ${mod.tagline}`}
        title={mod.fullName}
        summary={mod.summary}
        aside={
          <FactTable
            rows={[
              ["Module", mod.name],
              ["Area", mod.tagline],
              ["Hours", mod.hours],
              ["Best suited to", mod.bestFor],
              ["Market demand", mod.demand],
              ["Server access", "Individual live S/4HANA"],
              ["Fee", "Included in the ₹50,000 SAP course"],
              ["Next batch", sap.nextBatch],
            ]}
          />
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
            Book a free consultation
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href="/sap-course" className="btn-ghost w-full sm:w-auto">
            See the full SAP course
          </Link>
        </div>
      </PageHero>

      {/* ---- Note: modules are taught together ---- */}
      <section className="py-12 sm:py-16">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-4 rounded-2xl border border-acid/25 bg-acid/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <LuServer aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-acid" />
                <p className="text-sm leading-relaxed text-zinc-300">
                  <strong className="font-semibold text-zinc-100">
                    {mod.name} is not sold as a standalone course.
                  </strong>{" "}
                  It is taught inside the four-month SAP programme alongside FICO, MM, SD and
                  PP/QM, because consultants get hired on integration knowledge, not on one
                  module in isolation.
                </p>
              </div>
              <Link href="/sap-course" className="btn-ghost shrink-0 !py-2.5 !text-[0.8125rem]">
                How the programme works
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Topics ---- */}
      <section
        aria-labelledby="mod-topics-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="mod-topics-title"
            eyebrow="Coverage"
            title={`What ${mod.name} covers`}
            intro="Configuration topics, in the order they are taught. Each one is done by you on your own server, not demonstrated at the front of the room."
          />
          <Stagger
            className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2"
            itemClassName="h-full"
            step={0.04}
          >
            {mod.topics.map((t, i) => (
              <div key={t} className="flex h-full items-start gap-4 bg-ink-950 p-5 sm:p-6">
                <span className="font-display text-sm font-semibold text-zinc-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="flex-1 text-sm leading-relaxed text-zinc-300">{t}</p>
                <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Careers + integration ---- */}
      <section aria-labelledby="mod-careers-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <SectionHead
              id="mod-careers-title"
              eyebrow="Careers"
              title={`Roles ${mod.name} leads to`}
              intro="Indicative Indian salary bands. Implementation experience moves these faster than certifications do."
            />
            <Reveal className="mt-8">
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[30rem] text-sm">
                    <caption className="sr-only">Roles and salary ranges for {mod.name}</caption>
                    <thead>
                      <tr className="border-b border-white/10 text-left">
                        {["Role", "Entry level", "2–4 years"].map((h) => (
                          <th
                            key={h}
                            scope="col"
                            className="px-5 py-4 text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:px-6"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mod.careers.map((c) => (
                        <tr key={c.role} className="border-b border-white/[0.06] last:border-b-0">
                          <th scope="row" className="px-5 py-4 text-left font-medium text-zinc-100 sm:px-6">
                            {c.role}
                          </th>
                          <td className="px-5 py-4 text-zinc-400 sm:px-6">{c.entry}</td>
                          <td className="px-5 py-4 text-acid sm:px-6">{c.mid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="space-y-4 lg:pt-16">
            <Reveal delay={0.08}>
              <div className="card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                  <LuTrendingUp aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-zinc-50">
                  Market demand
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{mod.demand}</p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                  <LuTarget aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-zinc-50">
                  Integrates with
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {mod.integratesWith.map((m) => (
                    <li key={m} className="chip">
                      {m}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-zinc-500">
                  Integration scenarios are where interviews get hard. The final module of the
                  programme runs a business process across all four.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Other modules ---- */}
      <section
        aria-labelledby="other-mods-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="other-mods-title"
            eyebrow="The other modules"
            title="All four are in the same programme"
            intro="You configure every one of them. Where you specialise is a decision you make after you have tried each, not before."
          />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
            {others.map((m) => (
              <Link
                key={m.slug}
                href={`/sap-course/${m.slug}`}
                className="card group flex h-full flex-col p-6 transition-colors duration-300 hover:border-acid/35"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-zinc-50">{m.name}</h3>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 text-zinc-400 transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-ink-950">
                    <LuArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{m.tagline}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{m.summary}</p>
                <span className="mt-5 text-sm font-semibold text-acid">
                  Explore the {m.name} module
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- FAQ + enquiry ---- */}
      <section aria-labelledby="mod-faq-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="mod-faq-title"
              eyebrow="FAQ"
              title={`${mod.name} — common questions`}
              intro="Who it suits, what it pays, and what you actually get access to."
            />
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <section
        aria-labelledby="mod-enquiry-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHead
            id="mod-enquiry-title"
            eyebrow="Enquire"
            title={`Ask about ${mod.name}`}
            intro="Tell us your background and we will tell you honestly whether this module is where you should specialise — or whether one of the other three suits you better."
          />
          <LeadForm courseDefault="SAP" source={`sap-${mod.slug}`} />
        </div>
      </section>

      <CtaBand
        title="Configure it yourself, from week two"
        body="Individual S/4HANA credentials, real configuration, and consultants teaching it who still run implementations."
        primary={{ href: "/connect-with-us", label: "Book a free consultation" }}
        secondary={{ href: "/sap-course/syllabus", label: "See the full SAP syllabus" }}
      />
    </>
  );
}
