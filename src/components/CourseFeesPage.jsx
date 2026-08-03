import Link from "next/link";
import { LuCheck, LuX, LuInfo, LuArrowRight, LuCalculator } from "react-icons/lu";

import PageHero from "./ui/PageHero";
import FactTable from "./ui/FactTable";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Stagger from "./ui/Stagger";
import FaqList from "./ui/FaqList";
import CtaBand from "./CtaBand";
import { courses, DISCLAIMER } from "@/lib/site";

const NOT_INCLUDED = [
  "The official SAP certification exam fee, paid directly to SAP",
  "The Microsoft PL-300 exam fee, paid directly to Microsoft",
  "Travel to and from either campus",
  "A personal laptop — we can lend one on campus if you do not have one",
];

export default function CourseFeesPage({ course, detail, breadcrumbs }) {
  const feeFaqs = [
    {
      q: `What is the total fee for the ${course.fullName}?`,
      a: `The total fee is ₹50,000 for the complete four-month programme — three months of core training plus one month of corporate grooming. There is no separate registration fee, examination fee or certificate fee, and there is no higher tier.`,
    },
    {
      q: "Is EMI available, and what does it cost?",
      a: "Yes. A six-month EMI works out at approximately ₹8,334 per month with no additional interest charged by Techtonic Lab. Exact terms depend on the financing partner and are set out in writing before you commit.",
    },
    {
      q: "What is included in the fee?",
      a: `The fee covers all training hours, learning material, ${
        course.slug === "sap-course"
          ? "individual SAP S/4HANA server access"
          : "project datasets and tool licences used in class"
      }, four portfolio projects with review, the full month of corporate grooming, three recorded mock interviews, and placement preparation and referrals.`,
    },
    {
      q: "What is not included?",
      a: "Vendor certification exam fees are paid directly to SAP or Microsoft and are not part of the ₹50,000. Travel and a personal laptop are also on you, though campus machines are available if you do not have one.",
    },
    {
      q: "Can I pay in instalments without EMI?",
      a: "Yes. A common arrangement is a first payment at enrolment and the balance before the second month begins. Talk to the counsellor on your first call — we will not make you ask twice.",
    },
    {
      q: "Do you offer any concessions?",
      a: "There is a modest concession for learners enrolling together from the same college or workplace, and case-by-case support for students in genuine financial difficulty. We will not advertise a fake discount against an inflated list price — ₹50,000 is the real number.",
    },
    {
      q: "What is the refund policy?",
      a: "If you withdraw before the batch starts, you are refunded in full less any non-recoverable third-party charges. After the batch begins, the refund position is set out in our terms of service, because the seat, the server licence and the faculty time have been committed.",
    },
    {
      q: `Why is the ${course.name} course the same price as the other two?`,
      a: "Because the programme shape is the same — same hours, same grooming month, same placement preparation. Pricing courses differently would push people towards a course based on cost rather than on which one actually suits them.",
    },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Fees"
        title={`${course.fullName} fees —`}
        highlight="₹50,000"
        summary={`Published, itemised and all-inclusive. Four months of training and corporate grooming, with EMI available at roughly ₹8,334 per month. You should not have to fill in a form to find out what a course costs.`}
        aside={
          <FactTable
            rows={[
              ["Total fee", "₹50,000"],
              ["EMI", "₹8,334 × 6 months"],
              ["Registration fee", "None"],
              ["Certificate fee", "None"],
              ["Examination fee", "None"],
              ["Duration covered", "4 months"],
              ["Next batch", course.nextBatch],
            ]}
          />
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
            Talk to a counsellor about payment
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href={`/${course.slug}`} className="btn-ghost w-full sm:w-auto">
            Back to the {course.name} course
          </Link>
        </div>
      </PageHero>

      {/* ---- What the money buys ---- */}
      <section aria-labelledby="included-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="included-title"
            eyebrow="Itemised"
            title="What the ₹50,000 actually buys"
            intro="Listed line by line, including the things it does not cover — because the second list is the one institutes usually leave out."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full p-6 sm:p-7">
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-zinc-50">
                  <LuCheck aria-hidden="true" className="h-4 w-4 text-acid" />
                  Included
                </h3>
                <ul className="mt-5 space-y-3">
                  {course.includes.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                      {i}
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                    Techtonic Lab course-completion certificate
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <LuCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                    Repeat any module once, free, within twelve months
                  </li>
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
                  We will tell you honestly whether a vendor certification is worth its exam fee
                  in your particular case. For many first roles, four documented projects carry
                  more weight than a certificate does.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Payment options ---- */}
      <section
        aria-labelledby="payment-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="payment-title"
            eyebrow="Payment"
            title="Three ways to pay"
            intro="Whichever you choose, the total is the same. We do not charge more for paying in parts."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" itemClassName="h-full">
            {[
              {
                title: "Pay in full",
                amount: "₹50,000",
                note: "One payment at enrolment",
                body: "The simplest option. Nothing further to think about for the rest of the programme.",
              },
              {
                title: "Two instalments",
                amount: "₹25,000 × 2",
                note: "At enrolment and before month two",
                body: "The most common arrangement. No interest, no paperwork beyond the enrolment form.",
              },
              {
                title: "Six-month EMI",
                amount: "≈ ₹8,334 / month",
                note: "Through our financing partner",
                body: "Terms depend on the partner and your eligibility, and are given to you in writing before you commit to anything.",
              },
            ].map((p) => (
              <div key={p.title} className="card h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                  <LuCalculator aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">{p.title}</h3>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tightest text-acid">
                  {p.amount}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{p.note}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{p.body}</p>
              </div>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <p className="mt-8 flex items-start gap-2.5 text-xs leading-relaxed text-zinc-500">
              <LuInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
              <span>{DISCLAIMER}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Compare across courses ---- */}
      <section aria-labelledby="compare-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="compare-title"
            eyebrow="Compare"
            title="All three courses, side by side"
            intro="Same fee, same shape. Choose on where you want to end up, not on price."
          />
          <Reveal className="mt-10">
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[38rem] text-sm">
                  <caption className="sr-only">Fee and duration comparison across all courses</caption>
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      {["Course", "Fee", "Duration", "Next batch"].map((h) => (
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
                    {courses.map((c) => (
                      <tr
                        key={c.slug}
                        className={`border-b border-white/[0.06] last:border-b-0 ${
                          c.slug === course.slug ? "bg-acid/[0.05]" : ""
                        }`}
                      >
                        <th scope="row" className="px-5 py-4 text-left sm:px-6">
                          <Link
                            href={`/${c.slug}`}
                            className="font-medium text-zinc-100 hover:text-acid"
                          >
                            {c.name}
                          </Link>
                        </th>
                        <td className="px-5 py-4 font-medium text-acid sm:px-6">{c.fee}</td>
                        <td className="px-5 py-4 text-zinc-400 sm:px-6">{c.duration}</td>
                        <td className="px-5 py-4 text-zinc-400 sm:px-6">{c.nextBatch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section
        aria-labelledby="fee-faq-title"
        className="border-t border-white/10 py-20 sm:py-24"
      >
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="fee-faq-title"
              eyebrow="FAQ"
              title="Questions about the fee"
              intro="Payment, refunds, concessions and what happens if you have to step away mid-course."
            />
          </div>
          <FaqList items={feeFaqs} />
        </div>
      </section>

      <CtaBand
        title="Any question about money, asked plainly"
        body="Call the counsellor and ask what a course costs, what it includes and what it does not. You will get a straight number on the first call."
        primary={{ href: "/connect-with-us", label: "Book a free consultation" }}
        secondary={{ href: `/${course.slug}/syllabus`, label: "See the full syllabus" }}
      />
    </>
  );
}
