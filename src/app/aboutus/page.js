import Link from "next/link";
import {
  LuArrowRight,
  LuEye,
  LuHammer,
  LuHandshake,
  LuMessageSquareWarning,
  LuMapPin,
  LuClock,
} from "react-icons/lu";

import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Stagger from "@/components/ui/Stagger";
import Reveal from "@/components/ui/Reveal";
import ImageSlot from "@/components/ui/ImageSlot";
import FactTable from "@/components/ui/FactTable";
import Prose from "@/components/ui/Prose";
import CtaBand from "@/components/CtaBand";

import { about } from "@/lib/content";
import { brand, offices, courses, faculty, facultyYearsTotal, districts, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, organizationSchema, webPageSchema } from "@/lib/schema";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/aboutus" },
];

const TITLE = "About Techtonic Lab — IT Training Institute in Nagpur";
const DESC =
  "Techtonic Lab is a Nagpur-based IT training institute offering job-ready courses in Data Analytics, Data Science and SAP for students, graduates and working professionals.";

const ICONS = {
  publish: LuEye,
  practise: LuHammer,
  honest: LuHandshake,
  counsel: LuMessageSquareWarning,
};

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/aboutus" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/aboutus`,
    siteName: "Techtonic Lab",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/about.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/about.jpg"] },
};

export const revalidate = 86400;

export default function AboutPage() {
  const jsonLd = [
    webPageSchema({ path: "/aboutus", name: TITLE, description: DESC }),
    breadcrumbSchema(breadcrumbs),
    organizationSchema(),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="About"
        title="Three courses,"
        highlight="taught properly"
        summary={about.summary}
        aside={
          <ImageSlot
            id="IMG-02"
            className="aspect-[4/3] w-full lg:aspect-[4/5]"
            rounded="rounded-3xl"
            sizes="(max-width: 1024px) 100vw, 38vw"
            priority
            note="About page hero"
            hint="See IMAGE-PROMPTS.md for the generation prompt."
          />
        }
      />

      {/* ---- Story ---- */}
      <section aria-labelledby="story-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="story-title"
              eyebrow="Why we exist"
              title="A narrow, unglamorous idea"
            />
          </div>
          <Reveal delay={0.08}>
            <Prose>
              {about.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Prose>
          </Reveal>
        </div>
      </section>

      {/* ---- Principles ---- */}
      <section
        aria-labelledby="principles-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="principles-title"
            eyebrow="How we work"
            title="Four rules we actually keep"
            intro="Each of these costs us something, which is the only reason any of them are worth stating."
          />
          <Stagger
            className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2"
            itemClassName="h-full"
            step={0.06}
          >
            {about.principles.map((p) => {
              const Icon = ICONS[p.icon];
              return (
                <div key={p.title} className="group h-full bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-900 sm:p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors duration-300 group-hover:border-acid/40 group-hover:bg-acid/10 group-hover:text-acid">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-zinc-50">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.body}</p>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---- The institute in numbers ---- */}
      <section aria-labelledby="numbers-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHead
              id="numbers-title"
              eyebrow="The institute"
              title="What Techtonic Lab is, factually"
              intro="No adjectives. Everything on this list can be checked before you pay us anything."
            />
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-2xl border border-acid/25 bg-acid/[0.06] p-6">
                <p className="eyebrow !text-acid">Mission</p>
                <p className="mt-3 text-base leading-relaxed text-zinc-200">{about.mission}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <FactTable
              rows={[
                ...about.numbers.map((n) => [n.k, n.v]),
                ["Faculty", `${faculty.length} instructors, ${facultyYearsTotal}+ years combined`],
                ["Operated by", brand.legalName],
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ---- Campuses ---- */}
      <section
        aria-labelledby="campus-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="campus-title"
            eyebrow="Campuses"
            title="Two in Nagpur, students from across Vidarbha"
            intro={`Learners travel in from ${districts.slice(1, 6).join(", ")} and further. Where the commute does not work, the weekend and live online batches run the same syllabus with the same faculty.`}
          />

          <Stagger className="mt-10 grid gap-5 lg:grid-cols-2" itemClassName="h-full">
            {offices.map((o, i) => (
              <article key={o.id} className="card flex h-full flex-col overflow-hidden">
                <ImageSlot
                  src={o.imagePath}
                  id={i === 0 ? "IMG-03" : "IMG-04"}
                  className="aspect-[16/9] w-full"
                  rounded="rounded-none"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  note={`${o.label} — ${o.area}`}
                  hint="See IMAGE-PROMPTS.md for the generation prompt."
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-acid/25 bg-acid/10 text-acid">
                      <LuMapPin aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-zinc-50">{o.label}</h3>
                  </div>

                  {/* CRIT-4 — identical to GBP, JustDial and LocalBusiness schema */}
                  <address className="mt-5 flex-1 not-italic text-sm leading-relaxed text-zinc-400">
                    {o.street},
                    <br />
                    {o.locality}, {o.region} {o.postalCode}
                  </address>

                  <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                    <LuClock aria-hidden="true" className="h-3.5 w-3.5" />
                    {o.hours}
                  </p>

                  <a
                    href={o.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-6 !py-2.5 !text-[0.8125rem]"
                  >
                    Directions to {o.area}
                  </a>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Courses ---- */}
      <section aria-labelledby="about-courses-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="about-courses-title"
            eyebrow="What we teach"
            title="Three, and only three"
            intro="Every course runs three months of core training plus a month of corporate grooming, at the same fee."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" itemClassName="h-full">
            {courses.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="card group flex h-full flex-col p-6 transition-colors duration-300 hover:border-acid/35"
              >
                <h3 className="font-display text-xl font-semibold text-zinc-50">{c.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{c.blurb}</p>
                <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-acid">
                  Explore the {c.name} course
                  <LuArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand
        title="Come and see it before you decide"
        body="Sit in on a live session at either campus, meet the person who would teach you, and ask them what they last built. All of it is free and none of it commits you."
        primary={{ href: "/connect-with-us", label: "Book a free consultation" }}
        secondary={{ href: "/faculty", label: "Meet the faculty" }}
      />
    </>
  );
}
