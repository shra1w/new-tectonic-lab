import Link from "next/link";
import { LuInfo, LuBadgeCheck, LuTriangleAlert, LuShieldCheck, LuArrowRight } from "react-icons/lu";

import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Stagger from "@/components/ui/Stagger";
import Reveal from "@/components/ui/Reveal";
import ImageSlot from "@/components/ui/ImageSlot";
import FactTable from "@/components/ui/FactTable";
import FaqList from "@/components/ui/FaqList";
import CtaBand from "@/components/CtaBand";

import { placements, placementStats, alumniEmployers, testimonials, DISCLAIMER, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqSchemaFrom, webPageSchema } from "@/lib/schema";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Placements", href: "/placements" },
];

const TITLE = "Placements at Techtonic Lab — Alumni and Hiring Records";
const DESC =
  "Named placement records for Techtonic Lab alumni across Data Analytics, Data Science and SAP courses in Nagpur. Roles, programmes and batch-wise outcomes, shared with consent.";

const faqs = [
  {
    q: "Does Techtonic Lab guarantee placement?",
    a: "No. Techtonic Lab provides placement assistance, not a placement guarantee. That means a resume and LinkedIn rebuild, three recorded mock interviews with written feedback, aptitude practice and referrals to hiring contacts. Any institute promising a guaranteed job or an assured salary should be treated with caution.",
  },
  {
    q: "How many students has Techtonic Lab placed?",
    a: `We publish named records rather than a headline number. Every alumnus listed on this page has given written consent and can be verified. The count shown at the top of this page is exactly the number of records published — it is not an estimate, and it does not include anyone we cannot name.`,
  },
  {
    q: "What does placement assistance actually include?",
    a: "A line-by-line resume rebuild, LinkedIn optimisation, three recorded mock interviews with written feedback, aptitude and case practice, salary-negotiation coaching, and active referral of your profile to hiring contacts where your project work matches the role.",
  },
  {
    q: "Do I have to complete the course to get placement support?",
    a: "Yes. Placement preparation and referral are offered to learners who complete the programme including the corporate grooming month, and who maintain the attendance set out in our terms of service. The support is real work on our side, so we ask you to finish yours.",
  },
  {
    q: "Will you share my details with employers without asking?",
    a: "No. We ask for your consent before each introduction, and we name you on this page only if you agree in writing. You can ask to be removed at any time and we will take the entry down.",
  },
  {
    q: "Which companies hire from Techtonic Lab?",
    a: "We list only companies where a named alumnus of ours actually works. We do not display the logo of any company we have no named alumnus at, and we make no claim of formal partnership with any employer listed on this site.",
  },
];

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/placements" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/placements`,
    siteName: "Techtonic Lab",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/placements.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/placements.jpg"] },
};

export const revalidate = 86400;

export default function PlacementsPage() {
  const jsonLd = [
    webPageSchema({ path: "/placements", name: TITLE, description: DESC }),
    breadcrumbSchema(breadcrumbs),
    faqSchemaFrom(faqs),
  ];

  const byProgramme = placements.reduce((acc, p) => {
    acc[p.programme] = (acc[p.programme] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Placement records"
        title="Real names."
        highlight="Real records."
        summary="Every person on this page completed a Techtonic Lab programme and agreed in writing to be named. We publish records rather than a headline percentage, because a percentage cannot be checked and a name can."
        aside={
          <FactTable
            rows={[
              ["Named alumni on record", String(placementStats.named)],
              ["Programmes represented", String(placementStats.courses)],
              ["Batch years", placementStats.years.join(", ")],
              ["Most common role", placementStats.commonRole],
              ["Consent", "Written, on file, revocable"],
              ["Guarantee", "None — assistance only"],
            ]}
          />
        }
      />

      {/* ---- The records ---- */}
      <section aria-labelledby="records-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="records-title"
            eyebrow="Alumni"
            title="Everyone we can name"
            intro="Programme, role and batch for each. Where an employer is shown, that alumnus consented to us naming it too."
          />

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
            {placements.map((p) => (
              <article
                key={p.name}
                className="card group flex h-full flex-col p-5 transition-colors duration-300 hover:border-acid/35"
              >
                <div className="flex items-center gap-4">
                  <ImageSlot className="h-14 w-14 shrink-0" rounded="rounded-full" note={p.initials} hint="" />
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

                <dl className="mt-5 flex-1">
                  <div className="spec-row">
                    <dt className="text-zinc-500">Programme</dt>
                    <dd className="font-medium text-zinc-100">{p.programme}</dd>
                  </div>
                  <div className="spec-row">
                    <dt className="text-zinc-500">Placed as</dt>
                    <dd className="text-right font-medium text-zinc-100">{p.placedAs}</dd>
                  </div>
                  <div className="spec-row">
                    <dt className="text-zinc-500">Batch</dt>
                    <dd className="font-medium text-zinc-100">{p.batch}</dd>
                  </div>
                </dl>

                {p.background ? (
                  <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-zinc-500">
                    Came in as: {p.background}
                  </p>
                ) : null}
              </article>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <p className="mt-8 flex max-w-3xl items-start gap-2.5 text-xs leading-relaxed text-zinc-500">
              <LuInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
              <span>Shared with student consent. Individual results vary. {DISCLAIMER}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Breakdown ---- */}
      <section
        aria-labelledby="breakdown-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="breakdown-title"
            eyebrow="Breakdown"
            title="Records by programme"
            intro="Counted straight off the list above, so these numbers can never drift away from the names."
          />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" itemClassName="h-full">
            {Object.entries(byProgramme).map(([prog, count]) => (
              <div key={prog} className="card h-full p-6">
                <p className="font-display text-4xl font-semibold tracking-tightest text-acid">
                  {count}
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-200">{prog}</p>
                <p className="mt-1 text-xs text-zinc-500">named alumni on record</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Employers (CRIT-5) ---- */}
      <section aria-labelledby="employers-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="employers-title"
            eyebrow="Employers"
            title="Companies our alumni work at"
            intro="A factual claim about where our students ended up — not a partnership claim, and not a logo wall."
          />

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
            {alumniEmployers.map((e) => (
              <div
                key={e.company}
                className={`card flex h-full flex-col p-5 ${e.verified ? "border-acid/25" : "border-dashed"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <ImageSlot className="h-14 w-32 shrink-0" rounded="rounded-xl" note={`${e.company} logo`} hint="" />
                  {e.verified ? (
                    <span className="chip !border-acid/30 !bg-acid/10 !text-acid">
                      <LuBadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  ) : (
                    <span className="chip !border-amber-400/30 !bg-amber-400/10 !text-amber-300">
                      <LuTriangleAlert aria-hidden="true" className="h-3.5 w-3.5" />
                      Needs a name
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">{e.company}</h3>
                {e.verified ? (
                  <p className="mt-1.5 text-sm text-zinc-400">
                    {e.alumnus} — {e.role}
                  </p>
                ) : (
                  <p className="mt-1.5 text-sm text-amber-300/80">
                    Name the alumnus before publishing this logo.
                  </p>
                )}
              </div>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <p className="mt-8 flex max-w-3xl items-start gap-2.5 text-xs leading-relaxed text-zinc-500">
              <LuShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
              <span>
                Only companies where a Techtonic Lab alumnus works are listed here. We do not
                display the logo of any company we have no named alumnus at, and we make no claim
                of formal partnership with any employer listed.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section
        aria-labelledby="process-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="process-title"
            eyebrow="The process"
            title="Exactly what we do, and where it stops"
            intro="Set out in full so nobody enrols on a misunderstanding. This is a real amount of work, and it is also not a job offer."
          />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" itemClassName="h-full">
            {[
              { n: "01", t: "Portfolio review", b: "Your four projects are reviewed and rewritten until they are defensible. Weak work does not go out with our name attached to it." },
              { n: "02", t: "Resume and LinkedIn", b: "A line-by-line rebuild against the roles you are actually applying for, not a template." },
              { n: "03", t: "Three mock interviews", b: "Recorded, with written feedback after each. By the third you will have stopped rambling." },
              { n: "04", t: "Referral", b: "We put your profile in front of hiring contacts where the match is real. We will not spray it at everyone." },
            ].map((s) => (
              <div key={s.n} className="card h-full p-6">
                <span className="font-display text-sm font-semibold text-acid">{s.n}</span>
                <h3 className="mt-4 font-display text-base font-semibold text-zinc-50">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.b}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section aria-labelledby="pl-testimonials-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="pl-testimonials-title"
            eyebrow="In their words"
            title="What they said afterwards"
            intro="Shared with consent. Individual results vary."
          />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-full" step={0.05}>
            {testimonials.map((t) => (
              <figure key={t.name} className="card flex h-full flex-col p-6">
                <blockquote className="flex-1 text-sm leading-relaxed text-zinc-300">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <ImageSlot className="h-11 w-11 shrink-0" rounded="rounded-full" note={t.initials} hint="" />
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-semibold text-zinc-50">{t.name}</p>
                    <p className="truncate text-xs text-zinc-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section
        aria-labelledby="pl-faq-title"
        className="border-t border-white/10 py-20 sm:py-24"
      >
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="pl-faq-title"
              eyebrow="FAQ"
              title="Questions about placement"
              intro="Including the ones institutes usually avoid answering plainly."
            />
            <Link href="/hire-from-us" className="link-underline mt-7 text-sm">
              Hiring? Talk to us instead
              <LuArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Ask us about outcomes before you enrol"
        body="Ask what happened to the last batch. Ask to speak to an alumnus. Both are fair questions and we would rather you asked them now than afterwards."
        primary={{ href: "/connect-with-us", label: "Book a free consultation" }}
        secondary={{ href: "/faculty", label: "Meet the faculty" }}
      />
    </>
  );
}
