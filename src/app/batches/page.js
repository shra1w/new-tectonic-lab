import Link from "next/link";
import { LuCalendarDays, LuMapPin, LuClock, LuArrowRight, LuInfo } from "react-icons/lu";

import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Stagger from "@/components/ui/Stagger";
import Reveal from "@/components/ui/Reveal";
import FactTable from "@/components/ui/FactTable";
import FaqList from "@/components/ui/FaqList";
import CtaBand from "@/components/CtaBand";

import { courses, SITE_URL } from "@/lib/site";
import { batches } from "@/lib/content";
import { breadcrumbSchema, batchListSchema, faqSchemaFrom, webPageSchema } from "@/lib/schema";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Batches", href: "/batches" },
];

const TITLE = "Batch Schedule — Upcoming Course Dates in Nagpur | Techtonic Lab";
const DESC =
  "Every upcoming Data Analytics, Data Science and SAP batch at Techtonic Lab Nagpur — start dates, timings, mode, campus and seats remaining. Published in advance.";

const faqs = [
  {
    q: "How often do new batches start at Techtonic Lab?",
    a: "A new batch starts roughly every two weeks across the three courses, and each individual course begins a new intake about once a month. Weekday classroom, weekend classroom and live online batches all run on their own cycles.",
  },
  {
    q: "What is the difference between the classroom, weekend and online batches?",
    a: "The timing, and nothing else. All three modes use the same syllabus, the same faculty, the same project reviews and the same corporate grooming month. The weekend batch exists for people who cannot leave a job, and the online batch for students outside Nagpur.",
  },
  {
    q: "How many seats are in a batch?",
    a: "Batches are capped so that an instructor can review every learner's project personally. The seats remaining against each batch below are live counts, not a scarcity tactic.",
  },
  {
    q: "Can I switch batches after enrolling?",
    a: "Yes, once, if you tell us before your batch reaches the halfway point. People change jobs and move cities, and we would rather move you than have you drop out.",
  },
  {
    q: "What if I miss a session?",
    a: "Sessions are recorded and available to you, and the instructor will cover what you missed at the start of the next class. You can also repeat any module once, free, within twelve months of finishing.",
  },
  {
    q: "How do I reserve a seat?",
    a: "Book a free consultation first — we would rather confirm the course actually suits you before you pay. A seat is held once the enrolment form is completed and the first payment is received.",
  },
];

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/batches" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/batches`,
    siteName: "Techtonic Lab",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/batches.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/batches.jpg"] },
};

export const revalidate = 3600;

export default function BatchesPage() {
  const jsonLd = [
    webPageSchema({ path: "/batches", name: TITLE, description: DESC }),
    breadcrumbSchema(breadcrumbs),
    batchListSchema(batches),
    faqSchemaFrom(faqs),
  ];

  const next = batches[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Batch schedule"
        title="Every upcoming"
        highlight="batch date"
        summary="Published months ahead so you can plan around a notice period, a semester or a family commitment. Timings, campus and seats remaining are listed against each one."
        aside={
          <FactTable
            rows={[
              ["Upcoming batch", `${next.course} · ${next.start}`],
              ["Upcoming batches listed", String(batches.length)],
              ["Modes", "Classroom, weekend, online"],
              ["Campuses", "Somalwada, Jaitala Road, live online"],
              ["Programme length", "4 months"],
              ["Fee", "₹49,999 for any course"],
            ]}
          />
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/connect-with-us" className="btn-primary w-full sm:w-auto">
            Reserve a seat
            <LuArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href="/fees" className="btn-ghost w-full sm:w-auto">
            See the fees
          </Link>
        </div>
      </PageHero>

      {/* ---- Full table ---- */}
      <section aria-labelledby="schedule-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="schedule-title"
            eyebrow="Full schedule"
            title="All batches, all three courses"
            intro="Sorted by start date. Every one of these runs the same four-month programme."
          />

          <Reveal className="mt-10">
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[52rem] text-sm">
                  <caption className="sr-only">
                    Upcoming batch start dates, modes, timings, campuses and seats remaining
                  </caption>
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      {["Start date", "Course", "Mode", "Timing", "Campus", "Seats", ""].map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="px-4 py-4 text-2xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:px-5"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((b) => (
                      <tr
                        key={`${b.startISO}-${b.mode}-${b.course}`}
                        className="border-b border-white/[0.06] transition-colors last:border-b-0 hover:bg-white/[0.02]"
                      >
                        <th scope="row" className="whitespace-nowrap px-4 py-4 text-left font-medium text-zinc-100 sm:px-5">
                          {b.start}
                        </th>
                        <td className="whitespace-nowrap px-4 py-4 text-zinc-300 sm:px-5">{b.course}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-zinc-400 sm:px-5">{b.mode}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-zinc-400 sm:px-5">{b.timing}</td>
                        <td className="whitespace-nowrap px-4 py-4 text-zinc-400 sm:px-5">{b.campus}</td>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                          <span className={b.status === "Filling" ? "text-amber-300" : "text-acid"}>
                            {b.seats}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                          <Link href={`/${b.slug}`} className="text-xs font-semibold text-acid hover:text-acid-soft">
                            Course details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 flex items-start gap-2.5 text-xs leading-relaxed text-zinc-500">
              <LuInfo aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
              <span>
                Dates are our current schedule. If a batch cannot run on its published date we will
                offer you the next equivalent batch or a full refund of anything paid for it.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Upcoming batch per course ---- */}
      <section
        aria-labelledby="next-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="next-title"
            eyebrow="Starting soonest"
            title="The next intake for each course"
            intro="If none of these dates work, ask about the following month — there is almost always one more within four weeks."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" itemClassName="h-full">
            {courses.map((c) => {
              const b = batches.find((x) => x.slug === c.slug);
              return (
                <article key={c.slug} className="card flex h-full flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-zinc-50">{c.name}</h3>
                    <span className={`chip ${b.status === "Filling" ? "!border-amber-400/30 !text-amber-300" : ""}`}>
                      {b.status}
                    </span>
                  </div>

                  <p className="mt-5 flex items-center gap-2 font-display text-2xl font-semibold tracking-tightest text-acid">
                    <LuCalendarDays aria-hidden="true" className="h-5 w-5" />
                    {b.start}
                  </p>

                  <dl className="mt-5 flex-1">
                    <div className="spec-row">
                      <dt className="text-zinc-500">Mode</dt>
                      <dd className="font-medium text-zinc-100">{b.mode}</dd>
                    </div>
                    <div className="spec-row">
                      <dt className="text-zinc-500">Timing</dt>
                      <dd className="text-right font-medium text-zinc-100">{b.timing}</dd>
                    </div>
                    <div className="spec-row">
                      <dt className="text-zinc-500">Campus</dt>
                      <dd className="font-medium text-zinc-100">{b.campus}</dd>
                    </div>
                    <div className="spec-row">
                      <dt className="text-zinc-500">Seats left</dt>
                      <dd className="font-medium text-acid">{b.seats}</dd>
                    </div>
                  </dl>

                  <Link href={`/${c.slug}`} className="btn-ghost mt-6 w-full !py-3 !text-[0.8125rem]">
                    Explore the {c.name} course
                  </Link>
                </article>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---- Modes ---- */}
      <section aria-labelledby="modes-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="modes-title"
            eyebrow="Three ways to attend"
            title="Same syllabus, three timings"
            intro="Nothing here is a lighter version of anything else. The only variable is when you turn up."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" itemClassName="h-full">
            {[
              { icon: LuMapPin, t: "Weekday classroom", b: "Two hours a day, Monday to Friday, at either Nagpur campus. The most common choice for students and fresh graduates." },
              { icon: LuClock, t: "Weekend classroom", b: "Three hours on Saturday and Sunday. Built for working professionals — nobody has to resign to retrain." },
              { icon: LuCalendarDays, t: "Live online", b: "Live sessions, not recordings, with the same instructors and the same project reviews. For students across Vidarbha and beyond." },
            ].map((m) => (
              <div key={m.t} className="card h-full p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                  <m.icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">{m.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{m.b}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section
        aria-labelledby="batch-faq-title"
        className="border-t border-white/10 py-20 sm:py-24"
      >
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="batch-faq-title"
              eyebrow="FAQ"
              title="Questions about batches"
              intro="Timing, switching, missed sessions and how a seat is actually held."
            />
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Hold a seat in the Upcoming batch"
        body="Book a free consultation first. We will confirm the course actually suits you before anyone talks about payment."
        primary={{ href: "/connect-with-us", label: "Book a free consultation" }}
        secondary={{ href: "/fees", label: "See the fees" }}
      />
    </>
  );
}
