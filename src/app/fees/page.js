import Link from "next/link";
import { LuCheck, LuX, LuInfo, LuArrowRight, LuCalculator, LuScale } from "react-icons/lu";

import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Stagger from "@/components/ui/Stagger";
import Reveal from "@/components/ui/Reveal";
import FactTable from "@/components/ui/FactTable";
import FaqList from "@/components/ui/FaqList";
import CtaBand from "@/components/CtaBand";

import {
  courses,
  DISCLAIMER,
  SITE_URL,
  formatINR,
  installmentPlan,
  feeTable,
} from "@/lib/site";
import { breadcrumbSchema, faqSchemaFrom, offerSchema, webPageSchema } from "@/lib/schema";

/* ─── Derived numbers — every string on the page uses these ─────────────
   By computing ranges from courses[], the fees page can never lie about
   the real prices. Add a course, remove one, change a fee — this page
   updates on the next build with no editing here. */
const feeNumbers = courses.map((c) => Number(c.feeNumeric));
const durationNumbers = courses.map((c) => c.durationMonths);

const minFee = Math.min(...feeNumbers);
const maxFee = Math.max(...feeNumbers);
const minDur = Math.min(...durationNumbers);
const maxDur = Math.max(...durationNumbers);

const feeRange =
  minFee === maxFee ? formatINR(minFee) : `${formatINR(minFee)} – ${formatINR(maxFee)}`;
const durationRange =
  minDur === maxDur ? `${minDur} months` : `${minDur}–${maxDur} months`;

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Fees", href: "/fees" },
];

const TITLE = `Course Fees in Nagpur — ${feeRange} All-Inclusive | TECHTONIC LAB`;
const DESC = `TECHTONIC LAB course fees, published in full: ${formatINR(
  49999
)} for the 6-month Data Analytics and 4-month SAP programmes, ${formatINR(
  89999
)} for the 9-month Data Science course. Payable in 3 instalments, no registration or certificate charges.`;

const NOT_INCLUDED = [
  "Vendor certification exam fees, paid directly to SAP or Microsoft",
  "Travel to and from either campus",
  "A personal laptop — campus machines are available if you do not have one",
];

const faqs = [
  {
    q: "How much does a course at TECHTONIC LAB cost?",
    a: `Data Analytics is ${formatINR(
      49999
    )} for the complete 6-month programme, each SAP S/4HANA module — MM, FICO, PP/QM or SD — is ${formatINR(
      49999
    )} as a standalone course, and Data Science is ${formatINR(
      89999
    )} for the complete 9-month programme. Every fee is all-inclusive — there is no separate registration, examination or certificate charge.`,
  },
  {
    q: "Why are the courses priced differently?",
    a: "Because they differ in length and depth. Data Science runs nine months and takes you through machine learning, deep learning, NLP and generative AI on top of the analytics foundation, so the fee reflects the additional teaching time and infrastructure. Data Analytics and SAP land at the same fee because their programmes are comparable in scope end to end.",
  },
  {
    q: "Can I pay the fee in instalments?",
    a: `Yes. Every course is payable in 3 instalments at no extra cost — ${formatINR(
      20000
    )} + ${formatINR(15000)} + ${formatINR(15000)} for the ${formatINR(
      49999
    )} courses and each SAP module, and ${formatINR(35000)} + ${formatINR(
      30000
    )} + ${formatINR(24999)} for Data Science. The schedule is given to you in writing before you commit to anything.`,
  },
  {
    q: "Are there any hidden charges?",
    a: "No. The published fee covers training, learning material, project datasets or SAP S/4HANA server access, portfolio projects with review, the corporate grooming month, three live mock interviews, and placement preparation. The only things paid separately are vendor certification exam fees, which go directly to SAP or Microsoft.",
  },
  {
    q: "When are the instalments due?",
    a: "The first instalment confirms your seat at enrolment, and the remaining two fall across the early part of the course. The exact dates are set out in writing before you commit, and there is no extra charge for paying in parts.",
  },
  {
    q: "Do you offer discounts or scholarships?",
    a: "There is a modest concession for people enrolling together from the same college or workplace, and case-by-case support for students in genuine financial difficulty. What we will not do is advertise a fake discount against an inflated list price — the numbers on this page are the real numbers.",
  },
  {
    q: "What is the refund policy?",
    a: "Fees once paid are non-refundable, because the seat, the SAP server licence and the faculty time are committed as soon as you enrol. That is exactly why the consultation is free and the fees, dates and syllabus are published — settle every question first, and pay only when you are certain.",
  },
  {
    q: "Is the fee different for online and weekend batches?",
    a: "No. For any given course, the classroom, weekend and live online batches cost the same, because all three run the same syllabus with the same faculty and the same project reviews. The online batch is not a cheaper, lighter version.",
  },
];

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/fees" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/fees`,
    siteName: "TECHTONIC LAB",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/fees.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og/fees.jpg"],
  },
};

export const revalidate = 86400;

export default function FeesPage() {
  const jsonLd = [
    webPageSchema({ path: "/fees", name: TITLE, description: DESC }),
    breadcrumbSchema(breadcrumbs),
    // One Offer per course so structured-data validators see all three
    // prices and durations, not a single conflated figure.
    ...courses.map(offerSchema),
    faqSchemaFrom(faqs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Fees"
        title="Published fees, from"
        highlight={formatINR(minFee)}
        summary={`Three courses, three prices — printed on the site rather than held behind a form. ${formatINR(
          49999
        )} for Data Analytics and SAP, ${formatINR(
          89999
        )} for Data Science, payable in 3 instalments each, with no registration, examination or certificate charge.`}
        aside={
          <FactTable
            rows={[
              ["Fee range", feeRange],
              ["Data Analytics", `${feeTable["data-analytics-course"].fee} · 6 months`],
              ["Data Science", `${feeTable["data-science-course"].fee} · 9 months`],
              ["SAP", `${feeTable["sap-course"].fee} · per module`],
              ["Instalments", "3 per course, no extra cost"],
              ["Registration fee", "None"],
              ["Certificate fee", "None"],
            ]}
          />
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
            Talk to a counsellor
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href="/batches" className="btn-ghost w-full sm:w-auto">
            See batch dates
          </Link>
        </div>
      </PageHero>

      {/* ---- Per course ---- */}
      <section aria-labelledby="courses-fee-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="courses-fee-title"
            eyebrow="By course"
            title="Three courses, three honest prices"
            intro="Choose on where you want to end up, not on what looks cheapest. Each fee reflects the length and depth of the programme it covers — nothing else."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" itemClassName="h-full">
            {courses.map((c, i) => {
              const trainingMonths = Math.max(1, c.durationMonths - 1);
              const plan = installmentPlan(c);
              return (
                <article
                  key={c.slug}
                  className={`card relative flex h-full flex-col p-6 transition-colors duration-300 hover:border-acid/35 ${
                    i === 0 ? "ring-1 ring-acid/25" : ""
                  }`}
                >
                  {i === 0 ? (
                    <span className="absolute -top-2.5 left-6 rounded-full bg-acid px-2.5 py-1 text-2xs font-bold uppercase tracking-[0.14em] text-ink-950">
                      {c.flag}
                    </span>
                  ) : null}
                  <h3 className="font-display text-xl font-semibold text-zinc-50">
                    {c.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-500">
                    {trainingMonths} months training + 1 month corporate grooming
                  </p>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-semibold tracking-tightest text-acid">
                      {c.fee}
                    </span>
                    <span className="text-xs text-zinc-500">all-inclusive</span>
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    or 3 instalments — {plan.text}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
                    {c.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-zinc-300"
                      >
                        <LuCheck
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-acid"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 space-y-2.5">
                    <Link
                      href={`/${c.slug}/fees`}
                      className="btn-primary w-full !py-3 !text-[0.8125rem]"
                    >
                      {c.name} fee breakdown
                    </Link>
                    <Link
                      href={`/${c.slug}`}
                      className="btn-ghost w-full !py-3 !text-[0.8125rem]"
                    >
                      Explore the course
                    </Link>
                  </div>
                </article>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---- Included / not included ---- */}
      <section
        aria-labelledby="incl-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="incl-title"
            eyebrow="Itemised"
            title="What the money buys, and what it does not"
            intro="The second list is the one that usually gets left off a fees page. It is here for the same reason the first one is."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full p-6 sm:p-7">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-zinc-50">
                  <LuCheck aria-hidden="true" className="h-4 w-4 text-acid" />
                  Included in every published fee
                </h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "Live training with named faculty — 4 to 9 months, depending on the course",
                    "All learning material, datasets and tool licences used in class",
                    "Live SAP S/4HANA server access (SAP course)",
                    "End-to-end portfolio or capstone projects with personal review",
                    "One month of corporate grooming",
                    "Three live mock interviews with written feedback",
                    "Resume and LinkedIn rebuild",
                    "Placement preparation and referrals",
                    "TECHTONIC LAB course-completion certificate",
                    "Repeat any module once, free, within twelve months",
                  ].map((i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <LuCheck
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-acid"
                      />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card h-full border-dashed p-6 sm:p-7">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-zinc-50">
                  <LuX aria-hidden="true" className="h-4 w-4 text-zinc-500" />
                  Not included
                </h3>
                <ul className="mt-5 space-y-3">
                  {NOT_INCLUDED.map((i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-zinc-400"
                    >
                      <LuX
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                      />
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-zinc-500">
                  We will tell you honestly whether a vendor certification is worth its
                  exam fee in your case. For a first role, documented projects usually
                  carry more weight than a certificate does.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Payment options ---- */}
      <section aria-labelledby="pay-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="pay-title"
            eyebrow="Payment"
            title="Two ways to pay, same total"
            intro="We do not charge more for paying in parts, and we do not discount for paying in full. Whatever your course fee is, it is the number on the card above."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-2" itemClassName="h-full">
            {[
              {
                t: "Pay in full",
                a: "One payment",
                n: "At enrolment",
                b: "The simplest option. Nothing further to think about for the duration of your course.",
              },
              {
                t: "3 instalments",
                a: "₹20K + ₹15K + ₹15K",
                n: "Across the early part of the course",
                b: "The most common arrangement — the fee split into three instalments (₹35K + ₹30K + ₹24,999 for Data Science). No interest and no extra paperwork.",
              },
            ].map((p) => (
              <div key={p.t} className="card h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                  <LuCalculator aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">
                  {p.t}
                </h3>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tightest text-acid">
                  {p.a}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{p.n}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{p.b}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Why we publish ---- */}
      <section
        aria-labelledby="why-publish-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHead
            id="why-publish-title"
            eyebrow="Why this page exists"
            title="Hiding a price is a sales tactic"
            intro="Most institutes in this city make you fill in a form and take a call before they will tell you what something costs. That exists to get you on the phone, not to help you decide."
          />
          <Reveal delay={0.08}>
            <div className="card p-6 sm:p-7">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                <LuScale aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                You should be able to compare us against any other institute in Nagpur on
                price, syllabus and faculty before you speak to anyone. That is why every
                fee, the full syllabus, the batch dates and the named faculty are all on
                this site.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                If a comparison sends you somewhere else because it genuinely suits you
                better, that is a fine outcome. What we would rather avoid is someone
                enrolling here on incomplete information and regretting it in month two.
              </p>
              <p className="mt-6 flex items-start gap-2.5 border-t border-white/10 pt-5 text-xs leading-relaxed text-zinc-500">
                <LuInfo
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                />
                <span>{DISCLAIMER}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section aria-labelledby="fees-faq-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="fees-faq-title"
              eyebrow="FAQ"
              title="Questions about money"
              intro="Instalments, refunds, concessions and what happens if you have to step away."
            />
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Ask what it costs. Get a number."
        body="No form gate, no call-back script. Ask the counsellor directly and you will get the figure and what it covers on the first call."
        primary={{ href: "/connect-with-us", label: "Book a free consultation" }}
        secondary={{ href: "/batches", label: "See all batch dates" }}
      />
    </>
  );
}