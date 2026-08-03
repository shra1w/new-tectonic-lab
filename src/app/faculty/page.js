import Link from "next/link";
import { LuArrowRight, LuLinkedin, LuGraduationCap } from "react-icons/lu";

import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Stagger from "@/components/ui/Stagger";
import Reveal from "@/components/ui/Reveal";
import ImageSlot from "@/components/ui/ImageSlot";
import FactTable from "@/components/ui/FactTable";
import CtaBand from "@/components/CtaBand";

import { faculty, facultyYearsTotal, courses, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, personSchemas, webPageSchema } from "@/lib/schema";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Faculty", href: "/faculty" },
];

const TITLE = "Meet the Faculty at Techtonic Lab, Nagpur";
const DESC =
  "The Techtonic Lab faculty — six industry professionals teaching Data Analytics, Data Science and SAP courses in Nagpur, with 5 to 27 years of hands-on experience each.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/faculty" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/faculty`,
    siteName: "Techtonic Lab",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/faculty.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/faculty.jpg"] },
};

export const revalidate = 86400;

function slug(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function FacultyPage() {
  const jsonLd = [
    webPageSchema({ path: "/faculty", name: TITLE, description: DESC }),
    breadcrumbSchema(breadcrumbs),
    ...personSchemas(),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="The team"
        title="Meet the"
        highlight="faculty"
        summary={`Six instructors, ${facultyYearsTotal}+ years of combined industry experience across IT, ERP, business intelligence and HR. Every one of them still works in the field — the SAP modules are taught by consultants who have run real implementations, not by career trainers.`}
        aside={
          <FactTable
            rows={[
              ["Instructors", String(faculty.length)],
              ["Combined experience", `${facultyYearsTotal}+ years`],
              ["Longest tenure", "27+ years in IT and databases"],
              ["Courses covered", String(courses.length)],
              ["Campuses", "Somalwada and Jaitala Road"],
            ]}
          />
        }
      />

      {/* ---- All faculty ---- */}
      <section aria-labelledby="all-faculty-title" className="py-20 sm:py-24">
        <div className="shell">
          <SectionHead
            id="all-faculty-title"
            eyebrow="Full roster"
            title="Who will be in the room"
            intro="Named, with the years behind each of them and the modules they run. If someone teaches your course, you will meet them in week one — not in a recorded video."
          />

          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
            {faculty.map((f) => (
              <article
                key={f.name}
                className="card group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-acid/35"
              >
                <ImageSlot
                  className="aspect-[4/3] w-full"
                  rounded="rounded-none"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  note={`Portrait — ${f.name}`}
                  hint={`Real photograph, same lighting and framing across all six. 800×600px → /public/faculty/${slug(f.name)}.jpg`}
                />

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-zinc-50">{f.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    {f.title} · <span className="text-acid">{f.years}</span>
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{f.bio}</p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {f.tags.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-5">
                    <p className="flex items-center gap-1.5 text-2xs text-zinc-500">
                      <LuGraduationCap aria-hidden="true" className="h-3.5 w-3.5 text-acid" />
                      Teaches {f.teaches.join(", ")}
                    </p>
                    {f.linkedin ? (
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-2xs text-zinc-400 hover:text-acid"
                      >
                        <LuLinkedin aria-hidden="true" className="h-3.5 w-3.5" />
                        LinkedIn
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-2xs text-zinc-600">
                        <LuLinkedin aria-hidden="true" className="h-3.5 w-3.5" />
                        Add LinkedIn URL in src/lib/site.js
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- By course ---- */}
      <section
        aria-labelledby="by-course-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="by-course-title"
            eyebrow="By course"
            title="Who teaches what"
            intro="Every course has at least two named instructors plus the corporate grooming lead, so a single person being unavailable never stalls a batch."
          />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3" itemClassName="h-full">
            {courses.map((c) => {
              const team = faculty.filter((f) => f.teaches.includes(c.name));
              return (
                <div key={c.slug} className="card flex h-full flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-zinc-50">{c.name}</h3>
                  <ul className="mt-5 flex-1 space-y-3">
                    {team.map((f) => (
                      <li key={f.name} className="flex items-start gap-3">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] font-display text-2xs font-semibold text-acid">
                          {f.initials}
                        </span>
                        <span className="text-sm">
                          <span className="block font-medium text-zinc-100">{f.name}</span>
                          <span className="block text-xs text-zinc-500">{f.years}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${c.slug}`}
                    className="mt-6 text-sm font-semibold text-acid hover:text-acid-soft"
                  >
                    Explore the {c.name} course
                  </Link>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---- Teaching approach ---- */}
      <section aria-labelledby="approach-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHead
            id="approach-title"
            eyebrow="How they teach"
            title="Practitioners, not presenters"
            intro="There is a real difference between someone who explains a concept and someone who has had to make it work under a deadline. The second kind knows where it breaks."
          />
          <Reveal delay={0.08}>
            <div className="space-y-4">
              {[
                {
                  t: "Batch sizes stay small",
                  b: "Small enough that an instructor reviews your project personally and can tell you what is wrong with it rather than marking it complete.",
                },
                {
                  t: "The same faculty across all three modes",
                  b: "Weekday classroom, weekend classroom and live online run with the same instructors. The online batch is not a recorded course with a moderator.",
                },
                {
                  t: "Projects are defended out loud",
                  b: "You present your work and answer questions on it. That rehearsal is the single biggest predictor of how a first interview goes.",
                },
              ].map((x) => (
                <div key={x.t} className="card p-5">
                  <h3 className="font-display text-base font-semibold text-zinc-50">{x.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{x.b}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Come and sit in on a session"
        body="Meet the person who would teach you before you pay anything. Ask them what they last built and when. It is a fair question and they will answer it."
        primary={{ href: "/connect-with-us", label: "Book a free consultation" }}
        secondary={{ href: "/batches", label: "See all batch dates" }}
      />
    </>
  );
}
