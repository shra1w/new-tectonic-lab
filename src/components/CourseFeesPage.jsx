import Link from "next/link";
import { LuCheck, LuX, LuInfo, LuArrowRight, LuCalculator } from "react-icons/lu";

import PageHero from "./ui/PageHero";
import FactTable from "./ui/FactTable";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Stagger from "./ui/Stagger";
import FaqList from "./ui/FaqList";
import CtaBand from "./CtaBand";
import BuyCourseButton from "./BuyCourseButton";
import { courses, DISCLAIMER, formatINR, installmentPlan } from "@/lib/site";

/* The "not included" list is course-specific: the SAP certification exam is
   only relevant to the SAP course, and the Microsoft PL-300 exam only to the
   data courses. */
function notIncludedFor(course) {
  const isSap = course.slug === "sap-course";
  return [
    isSap
      ? "The official SAP certification exam fee, paid directly to SAP"
      : "The Microsoft PL-300 exam fee, paid directly to Microsoft",
    "Travel to and from either campus",
    "A personal laptop — we can lend one on campus if you do not have one",
  ];
}

export default function CourseFeesPage({ course, detail, breadcrumbs }) {
  const trainingMonths = (course.durationMonths || 0) - 1;
  const plan = installmentPlan(course);
  const NOT_INCLUDED = notIncludedFor(course);

  const feeFaqs = [
    {
      q: `What is the total fee for the ${course.fullName}?`,
      a: course.feeNote
        ? `Each SAP module — MM, FICO, PP/QM or SD — is ${course.fee}, all-inclusive. That covers full training in the module, individual live S/4HANA server access, the corporate grooming month and placement preparation, with no separate registration, examination or certificate fee and no higher tier. Take one module, or add another as you specialise.`
        : `The total fee is ${course.fee} for the complete ${course.duration} programme — ${trainingMonths} months of core training plus one month of corporate grooming. There is no separate registration fee, examination fee or certificate fee, and there is no higher tier.`,
    },
    {
      q: "Can I pay in instalments?",
      a: `Yes. The fee is payable in 3 instalments — ${plan.text} — ${course.installmentNote || "spread across the early part of the course"}, with no extra charge for paying in parts. The schedule is set out in writing before you commit.`,
    },
    {
      q: "What is included in the fee?",
      a: `The fee covers all training hours, learning material, ${
        course.slug === "sap-course"
          ? "individual SAP S/4HANA server access"
          : "project datasets and tool licences used in class"
      }, four portfolio projects with review, the full month of corporate grooming, three live mock interviews, and placement preparation and referrals.`,
    },
    {
      q: "What is not included?",
      a: `${
        course.slug === "sap-course"
          ? "The official SAP certification exam fee is paid directly to SAP and is not part of the course fee."
          : "The Microsoft PL-300 exam fee is paid directly to Microsoft and is not part of the course fee."
      } Travel and a personal laptop are also on you, though campus machines are available if you do not have one.`,
    },
    {
      q: "Do you offer any concessions?",
      a: `There is a modest concession for learners enrolling together from the same college or workplace, and case-by-case support for students in genuine financial difficulty. We will not advertise a fake discount against an inflated list price — ${course.fee} is the real number.`,
    },
    {
      q: "What is the refund policy?",
      a: "Fees once paid are non-refundable, because the seat, the server licence and the faculty time are committed as soon as you enrol. This is exactly why the consultation is free and the fees, dates and syllabus are all published — settle every question before you pay, and pay only when you are sure.",
    },
    {
      q: `Why is the ${course.name} course priced the way it is?`,
      a: "The fee reflects the length of the programme and what it includes — every training hour, the grooming month and full placement preparation, with nothing held back for a higher tier. We would rather you chose a course on where you want to end up than on price.",
    },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Fees"
        title={`${course.fullName} fees —`}
        highlight={course.fee}
        summary={`${course.feeNote ? `Each SAP module is ${course.fee}, ${course.feeNote}. ` : ""}Published, itemised and all-inclusive. ${course.duration} of training and corporate grooming, payable in 3 instalments. You should not have to fill in a form to find out what a course costs.`}
        aside={
          <FactTable
            rows={[
              ["Total fee", course.feeNote ? `${course.fee} ${course.feeNote}` : course.fee],
              ["Instalments", `3 — ${plan.text}`],
              ["Registration fee", "None"],
              ["Certificate fee", "None"],
              ["Examination fee", "None"],
              ["Duration covered", course.duration],
              ["Upcoming batch", course.nextBatch],
            ]}
          />
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
            Talk to a counsellor about payment
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <BuyCourseButton size="lg" className="w-full sm:w-auto" />
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
            title={`What the ${course.fee} actually buys`}
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
                    TECHTONIC LAB course-completion certificate
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
                      <LuX aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
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
            title="Two ways to pay"
            intro="Whichever you choose, the total is the same. We do not charge more for paying in parts."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-2" itemClassName="h-full">
            {[
              {
                title: "Pay in full",
                amount: course.fee,
                note: "One payment at enrolment",
                body: "The simplest option. Nothing further to think about for the rest of the programme.",
              },
              {
                title: "3 instalments",
                amount: plan.text,
                note: course.installmentNote || "Spread across the early part of the course",
                body: "The most common arrangement — the fee split into three instalments, with no interest and no paperwork beyond the enrolment form.",
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
              <LuInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
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
            intro="Published prices and the same all-inclusive shape. Choose on where you want to end up, not on price."
          />
          <Reveal className="mt-10">
            <div className="card overflow-hidden">
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full min-w-[38rem] text-sm">
                  <caption className="sr-only">Fee and duration comparison across all courses</caption>
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      {["Course", "Fee", "Duration", "Upcoming batch"].map((h) => (
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
                        <td className="px-5 py-4 font-medium text-acid sm:px-6">
                          {c.fee}
                          {c.feeNote ? (
                            <span className="text-2xs font-normal text-zinc-500"> {c.feeNote}</span>
                          ) : null}
                        </td>
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
