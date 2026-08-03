import Link from "next/link";
import { LuCheck, LuX, LuInfo, LuArrowRight, LuCalculator, LuScale } from "react-icons/lu";

import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Stagger from "@/components/ui/Stagger";
import Reveal from "@/components/ui/Reveal";
import FactTable from "@/components/ui/FactTable";
import FaqList from "@/components/ui/FaqList";
import CtaBand from "@/components/CtaBand";

import { courses, DISCLAIMER, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqSchemaFrom, offerSchema, webPageSchema } from "@/lib/schema";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Fees", href: "/fees" },
];

const TITLE = "Course Fees in Nagpur — ₹50,000 All-Inclusive | Techtonic Lab";
const DESC =
  "Techtonic Lab course fees: ₹50,000 for any of the Data Analytics, Data Science or SAP programmes. Four months, EMI at ₹8,334 per month, no registration or certificate charges.";

const NOT_INCLUDED = [
  "Vendor certification exam fees, paid directly to SAP or Microsoft",
  "Travel to and from either campus",
  "A personal laptop — campus machines are available if you do not have one",
];

const faqs = [
  {
    q: "How much does a course at Techtonic Lab cost?",
    a: "All three courses — Data Analytics, Data Science and SAP — cost ₹50,000 for the complete four-month programme. That is three months of core training plus one month of corporate grooming. There is no separate registration, examination or certificate charge, and there is no higher tier.",
  },
  {
    q: "Why do all three courses cost the same?",
    a: "Because the programme shape is identical — same hours, same grooming month, same placement preparation. Pricing them differently would push people towards a course based on cost rather than on which one actually suits their background.",
  },
  {
    q: "Is EMI available for the course fee?",
    a: "Yes. A six-month EMI works out at approximately ₹8,334 per month with no additional interest charged by Techtonic Lab. Exact terms depend on the financing partner and are given to you in writing before you commit to anything.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No. The ₹50,000 covers training, learning material, project datasets or SAP S/4HANA server access, four portfolio projects with review, the corporate grooming month, three recorded mock interviews, and placement preparation. The only things paid separately are vendor certification exam fees, which go directly to SAP or Microsoft.",
  },
  {
    q: "Can I pay in instalments without formal EMI?",
    a: "Yes. The most common arrangement is a first payment at enrolment and the balance before the second month begins, at no extra cost. Raise it on your first call — you will not have to negotiate for it.",
  },
  {
    q: "Do you offer discounts or scholarships?",
    a: "There is a modest concession for people enrolling together from the same college or workplace, and case-by-case support for students in genuine financial difficulty. What we will not do is advertise a fake discount against an inflated list price. ₹50,000 is the real number.",
  },
  {
    q: "What happens to my fee if I have to withdraw?",
    a: "If you withdraw before the batch starts you are refunded in full, less any non-recoverable third-party charges. After the batch begins the position is set out in our terms of service, because the seat, the server licence and the faculty time have already been committed.",
  },
  {
    q: "Is the fee different for online and weekend batches?",
    a: "No. Classroom, weekend and live online all cost ₹50,000, because all three run the same syllabus with the same faculty and the same project reviews. The online batch is not a cheaper, lighter version.",
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
    siteName: "Techtonic Lab",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/fees.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/fees.jpg"] },
};

export const revalidate = 86400;

export default function FeesPage() {
  const jsonLd = [
    webPageSchema({ path: "/fees", name: TITLE, description: DESC }),
    breadcrumbSchema(breadcrumbs),
    ...courses.map(offerSchema),
    faqSchemaFrom(faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Fees"
        title="One price, and it is"
        highlight="₹50,000"
        summary="The same for all three courses, published on the site rather than held behind a form. Four months of training and corporate grooming, EMI available at roughly ₹8,334 per month, no registration fee and no certificate fee."
        aside={
          <FactTable
            rows={[
              ["Fee, any course", "₹50,000"],
              ["Duration covered", "4 months"],
              ["EMI", "₹8,334 × 6 months"],
              ["Registration fee", "None"],
              ["Examination fee", "None"],
              ["Certificate fee", "None"],
              ["Repeat a module", "Once, free, within 12 months"],
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
            title="Three courses, one price"
            intro="Choose on where you want to end up, not on what it costs. That is the whole point of pricing them the same."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" itemClassName="h-full">
            {courses.map((c, i) => (
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
                <h3 className="font-display text-xl font-semibold text-zinc-50">{c.name}</h3>
                <p className="mt-1.5 text-xs text-zinc-500">3 months + 1 month corporate grooming</p>

                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold tracking-tightest text-acid">
                    {c.fee}
                  </span>
                  <span className="text-xs text-zinc-500">all-inclusive</span>
                </p>
                <p className="mt-2 text-xs text-zinc-500">or ₹8,334 × 6 months on EMI</p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
                  {c.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 space-y-2.5">
                  <Link href={`/${c.slug}/fees`} className="btn-primary w-full !py-3 !text-[0.8125rem]">
                    {c.name} fee breakdown
                  </Link>
                  <Link href={`/${c.slug}`} className="btn-ghost w-full !py-3 !text-[0.8125rem]">
                    Explore the course
                  </Link>
                </div>
              </article>
            ))}
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
                  Included in ₹50,000
                </h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "Four months of live training with named faculty",
                    "All learning material, datasets and tool licences used in class",
                    "Live SAP S/4HANA server access (SAP course)",
                    "Four portfolio projects with personal review",
                    "One month of corporate grooming",
                    "Three recorded mock interviews with written feedback",
                    "Resume and LinkedIn rebuild",
                    "Placement preparation and referrals",
                    "Techtonic Lab course-completion certificate",
                    "Repeat any module once, free, within twelve months",
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
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
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                      <LuX aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
                      {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-zinc-500">
                  We will tell you honestly whether a vendor certification is worth its exam fee in
                  your case. For a first role, four documented projects usually carry more weight
                  than a certificate does.
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
            title="Three ways to pay, same total"
            intro="We do not charge more for paying in parts, and we do not discount for paying in full. The number is the number."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" itemClassName="h-full">
            {[
              { t: "Pay in full", a: "₹50,000", n: "One payment at enrolment", b: "The simplest option, and nothing further to think about for four months." },
              { t: "Two instalments", a: "₹25,000 × 2", n: "At enrolment and before month two", b: "The most common arrangement. No interest and no extra paperwork." },
              { t: "Six-month EMI", a: "≈ ₹8,334 / month", n: "Through our financing partner", b: "Terms depend on the partner and your eligibility, given to you in writing first." },
            ].map((p) => (
              <div key={p.t} className="card h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                  <LuCalculator aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">{p.t}</h3>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tightest text-acid">{p.a}</p>
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
                You should be able to compare us against any other institute in Nagpur on price,
                syllabus and faculty before you speak to anyone. That is why the fee, the full
                syllabus, the batch dates and the named faculty are all on this site.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                If a comparison sends you somewhere else because it genuinely suits you better,
                that is a fine outcome. What we would rather avoid is someone enrolling here on
                incomplete information and regretting it in month two.
              </p>
              <p className="mt-6 flex items-start gap-2.5 border-t border-white/10 pt-5 text-xs leading-relaxed text-zinc-500">
                <LuInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
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
