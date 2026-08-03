import Link from "next/link";
import {
  LuArrowRight,
  LuUsersRound,
  LuBadgeCheck,
  LuFolderGit2,
  LuIndianRupee,
  LuMail,
  LuPhone,
} from "react-icons/lu";

import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Stagger from "@/components/ui/Stagger";
import Reveal from "@/components/ui/Reveal";
import FactTable from "@/components/ui/FactTable";
import FaqList from "@/components/ui/FaqList";
import LeadForm from "@/components/LeadForm";
import CtaBand from "@/components/CtaBand";

import { hire } from "@/lib/content";
import { brand, placements, faculty, facultyYearsTotal, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, faqSchemaFrom, webPageSchema } from "@/lib/schema";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Hire from us", href: "/hire-from-us" },
];

const TITLE = "Hire from Techtonic Lab — Nagpur Analytics and SAP Talent";
const DESC =
  "Hire Data Analytics, Data Science and SAP candidates from Techtonic Lab in Nagpur. Interview-ready, four documented portfolio projects each, no placement fee for employers.";

const ICONS = {
  shortlist: LuUsersRound,
  ready: LuBadgeCheck,
  evidence: LuFolderGit2,
  free: LuIndianRupee,
};

const faqs = [
  {
    q: "Does Techtonic Lab charge employers a placement fee?",
    a: "No. There is no fee to hire from us. Our incentive is that the person you hire stays named on our placements page, which only works if the match was a good one in the first place.",
  },
  {
    q: "What roles can I hire for?",
    a: `Most commonly ${hire.hiringFor.slice(0, 5).join(", ")} and the SAP functional roles across FICO, MM, SD and PP/QM. Candidates come from all three of our programmes and from a range of academic backgrounds.`,
  },
  {
    q: "How prepared are the candidates?",
    a: "Every candidate has completed four documented portfolio projects with review, a resume and LinkedIn rebuild, three recorded mock interviews with written feedback, and aptitude practice. SAP candidates have configured on live S/4HANA rather than watching a demonstration.",
  },
  {
    q: "How long does it take to get a shortlist?",
    a: "Three to six matched profiles within four working days of you telling us the role, stack, location and salary band. We match against project work, not just against who happens to be free.",
  },
  {
    q: "Can we run an on-campus hiring round?",
    a: "Yes. We can host a round at either Nagpur campus if you would rather assess a group in one sitting, including a room, machines and scheduling.",
  },
  {
    q: "Do you get involved in the offer or the negotiation?",
    a: "No. The offer, the terms and the negotiation are between you and the candidate. We ask only that we may name the placement afterwards, with the candidate's consent.",
  },
];

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/hire-from-us" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/hire-from-us`,
    siteName: "Techtonic Lab",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/hire.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/hire.jpg"] },
};

export const revalidate = 86400;

export default function HirePage() {
  const jsonLd = [
    webPageSchema({ path: "/hire-from-us", name: TITLE, description: DESC }),
    breadcrumbSchema(breadcrumbs),
    faqSchemaFrom(faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="For employers"
        title="Hire from"
        highlight="Techtonic Lab"
        summary={hire.summary}
        aside={
          <FactTable
            rows={[
              ["Placement fee", "None"],
              ["Shortlist turnaround", "4 working days"],
              ["Projects per candidate", "4, documented"],
              ["Mock interviews completed", "3, recorded, with feedback"],
              ["Programmes", "Data Analytics, Data Science, SAP"],
              ["Named alumni on record", String(placements.length)],
              ["Faculty behind them", `${faculty.length} instructors, ${facultyYearsTotal}+ years`],
            ]}
          />
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={`mailto:${brand.email}?subject=Hiring%20from%20Techtonic%20Lab`} className="btn-primary w-full sm:w-auto">
            <LuMail aria-hidden="true" className="h-4 w-4" />
            Email us a role
          </a>
          <a href={brand.phoneHref} className="btn-ghost w-full sm:w-auto">
            <LuPhone aria-hidden="true" className="h-4 w-4" />
            {brand.phone}
          </a>
        </div>
      </PageHero>

      {/* ---- Value ---- */}
      <section aria-labelledby="value-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="value-title"
            eyebrow="Why us"
            title="What you get that a job board does not give you"
            intro="Four specifics. Every one of them is checkable before you spend an interview slot."
          />
          <Stagger
            className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2"
            itemClassName="h-full"
            step={0.06}
          >
            {hire.value.map((v) => {
              const Icon = ICONS[v.icon];
              return (
                <div key={v.title} className="group h-full bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-900 sm:p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors duration-300 group-hover:border-acid/40 group-hover:bg-acid/10 group-hover:text-acid">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{v.body}</p>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---- Process ---- */}
      <section
        aria-labelledby="hire-process-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="hire-process-title"
            eyebrow="How it works"
            title="Four steps, no portal"
            intro="A short email starts it. We have deliberately not built a system you have to learn."
          />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" itemClassName="h-full">
            {hire.process.map((s) => (
              <div key={s.n} className="card h-full p-6">
                <span className="font-display text-sm font-semibold text-acid">{s.n}</span>
                <h3 className="mt-4 font-display text-base font-semibold text-zinc-50">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Roles ---- */}
      <section aria-labelledby="roles-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHead
            id="roles-title"
            eyebrow="Roles"
            title="What our alumni are hired for"
            intro="Across analytics, data science and the four SAP functional modules. If your role is not on this list, ask anyway — the underlying skills often transfer."
          />
          <Reveal delay={0.08}>
            <ul className="flex flex-wrap gap-2">
              {hire.hiringFor.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300"
                >
                  {r}
                </li>
              ))}
            </ul>
            <Link href="/placements" className="link-underline mt-8 text-sm">
              See where our alumni currently work
              <LuArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Employer enquiry ---- */}
      <section
        aria-labelledby="hire-form-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHead
              id="hire-form-title"
              eyebrow="Tell us the role"
              title="Send us an opening"
              intro="Role, stack, location, mode and salary band in the message field is enough. We come back within four working days with three to six matched profiles."
            />
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-2xl border border-acid/25 bg-acid/[0.06] p-5">
                <p className="text-sm leading-relaxed text-zinc-300">
                  Prefer email? Write to{" "}
                  <a href={`mailto:${brand.email}`} className="font-semibold text-acid">
                    {brand.email}
                  </a>{" "}
                  with the role details. There is no form you are required to use.
                </p>
              </div>
            </Reveal>
          </div>
          <LeadForm courseDefault="Not sure yet" source="hire-from-us" />
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section aria-labelledby="hire-faq-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="hire-faq-title"
              eyebrow="FAQ"
              title="Questions from employers"
              intro="Fees, turnaround, candidate readiness and how far we get involved."
            />
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Tell us what you are hiring for"
        body="A shortlist of three to six matched candidates within four working days, with their project work attached. No fee, and no obligation to interview any of them."
        primary={{ href: "/hire-from-us#hire-form-title", label: "Send us a role" }}
        secondary={{ href: "/placements", label: "See placement records" }}
      />
    </>
  );
}
