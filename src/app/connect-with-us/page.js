import Link from "next/link";
import { LuMapPin, LuPhone, LuMail, LuMessageCircle, LuClock, LuNavigation } from "react-icons/lu";

import PageHero from "@/components/ui/PageHero";
import SectionHead from "@/components/ui/SectionHead";
import Stagger from "@/components/ui/Stagger";
import Reveal from "@/components/ui/Reveal";
import FaqList from "@/components/ui/FaqList";
import LeadForm from "@/components/LeadForm";

import { brand, offices, courses, SITE_URL } from "@/lib/site";
import {
  breadcrumbSchema,
  localBusinessSchemas,
  faqSchemaFrom,
  webPageSchema,
} from "@/lib/schema";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/connect-with-us" },
];

const TITLE = "Contact Techtonic Lab — Nagpur IT Training Institute";
const DESC =
  "Contact Techtonic Lab in Nagpur — Somalwada head office and Jaitala Road branch. Call +91 87660 69947 or email admin@techtoniccorporate.com to book a free consultation.";

const faqs = [
  {
    q: "How do I contact Techtonic Lab?",
    a: "Call or WhatsApp +91 87660 69947, email admin@techtoniccorporate.com, or visit either campus — the head office at SAI NIT-JIT PLAZA, Third Floor, Manish Nagar, Somalwada, or the branch office on Jaitala Road. Both are open Monday to Saturday, 9:00 am to 8:00 pm.",
  },
  {
    q: "How quickly will someone get back to me?",
    a: "We call within four business hours, Monday to Saturday. WhatsApp messages are usually answered within the hour on working days.",
  },
  {
    q: "What happens on the free consultation call?",
    a: "About twenty minutes. A counsellor asks about your background and what you want to do next, then tells you which of the three courses fits — including when the honest answer is none of them. There is no sales script and no obligation to enrol.",
  },
  {
    q: "Can I visit the campus without an appointment?",
    a: "Yes, during working hours. Calling ahead means the right person will be free when you arrive, so you are not waiting for a counsellor who is in a class.",
  },
  {
    q: "Can I sit in on a live class before enrolling?",
    a: "Yes. Ask on your first call and we will put you in a running session for the course you are considering. Seeing an instructor teach is worth more than any brochure.",
  },
  {
    q: "Do you respond to enquiries from outside Nagpur?",
    a: "Yes. Students from across Vidarbha and beyond attend the live online batch, and the consultation call works the same whether you are in Nagpur or not.",
  },
];

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/connect-with-us" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/connect-with-us`,
    siteName: "Techtonic Lab",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/contact.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/contact.jpg"] },
};

export const revalidate = 86400;

export default function ContactPage() {
  const jsonLd = [
    webPageSchema({ path: "/connect-with-us", name: TITLE, description: DESC }),
    breadcrumbSchema(breadcrumbs),
    ...localBusinessSchemas(),
    faqSchemaFrom(faqs),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow="Contact"
        title="Book a"
        highlight="free consultation"
        summary="Tell us your background and what you want to do next. We will tell you honestly whether one of our courses is the right route — including when it is not. About twenty minutes, no obligation, no sales script."
        aside={
          <div className="space-y-3">
            <a
              href={brand.phoneHref}
              className="card flex items-center gap-4 p-5 transition-colors hover:border-acid/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                <LuPhone aria-hidden="true" className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-2xs uppercase tracking-[0.16em] text-zinc-500">Call us</span>
                <span className="mt-0.5 block font-display text-base font-semibold text-zinc-50">
                  {brand.phone}
                </span>
              </span>
            </a>

            <a
              href={brand.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 p-5 transition-colors hover:border-acid/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                <LuMessageCircle aria-hidden="true" className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-2xs uppercase tracking-[0.16em] text-zinc-500">WhatsApp</span>
                <span className="mt-0.5 block font-display text-base font-semibold text-zinc-50">
                  Answered within the hour
                </span>
              </span>
            </a>

            <a
              href={`mailto:${brand.email}`}
              className="card flex items-center gap-4 p-5 transition-colors hover:border-acid/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-acid/25 bg-acid/10 text-acid">
                <LuMail aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-2xs uppercase tracking-[0.16em] text-zinc-500">Email</span>
                <span className="mt-0.5 block break-all font-display text-sm font-semibold text-zinc-50">
                  {brand.email}
                </span>
              </span>
            </a>
          </div>
        }
      />

      {/* ---- Form + offices ---- */}
      <section aria-labelledby="form-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <SectionHead
              id="form-title"
              eyebrow="Enquiry form"
              title="Tell us where you are starting from"
              intro="The more you write in the last field, the more useful the call will be. Your background matters far more to the answer than which course you think you want."
            />
            <div className="mt-9">
              <LeadForm source="contact-page" />
            </div>
          </div>

          <div className="space-y-4 lg:pt-2">
            {offices.map((o) => (
              <div key={o.id} className="card p-6">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-acid/25 bg-acid/10 text-acid">
                    <LuMapPin aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <h2 className="font-display text-base font-semibold text-zinc-50">{o.label}</h2>
                </div>

                {/* CRIT-4 — identical everywhere */}
                <address className="mt-4 not-italic text-sm leading-relaxed text-zinc-400">
                  {o.street},
                  <br />
                  {o.locality}, {o.region} {o.postalCode}
                </address>

                <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                  <LuClock aria-hidden="true" className="h-3.5 w-3.5" />
                  {o.hours}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    href={o.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !px-5 !py-2.5 !text-[0.8125rem]"
                  >
                    <LuNavigation aria-hidden="true" className="h-3.5 w-3.5" />
                    Directions
                  </a>
                  <a href={brand.phoneHref} className="btn-ghost !px-5 !py-2.5 !text-[0.8125rem]">
                    <LuPhone aria-hidden="true" className="h-3.5 w-3.5" />
                    Call
                  </a>
                </div>
              </div>
            ))}

            <div className="card overflow-hidden">
              <iframe
                title="Map showing the Techtonic Lab head office in Somalwada, Nagpur"
                src="https://www.google.com/maps?q=21.0839766,79.0799313&hl=en&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0 grayscale-[35%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Straight to a course ---- */}
      <section
        aria-labelledby="direct-title"
        className="border-y border-white/10 bg-ink-900/40 py-20 sm:py-24"
      >
        <div className="shell">
          <SectionHead
            id="direct-title"
            eyebrow="Already decided?"
            title="Go straight to the course"
            intro="Fees, full syllabus, batch dates and named faculty are published on each one. No form required to read any of it."
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
                <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                  <span>{c.fee}</span>
                  <span aria-hidden="true">·</span>
                  <span>{c.duration}</span>
                  <span aria-hidden="true">·</span>
                  <span>Upcoming batch {c.nextBatch}</span>
                </p>
                <span className="mt-5 text-sm font-semibold text-acid">
                  Explore the {c.name} course
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section aria-labelledby="contact-faq-title" className="py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="contact-faq-title"
              eyebrow="FAQ"
              title="Before you call"
              intro="What happens on the consultation, how fast we respond, and whether you can just turn up."
            />
            <Reveal delay={0.1}>
              <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-7 !py-3 !text-[0.8125rem]">
                <LuMessageCircle aria-hidden="true" className="h-4 w-4" />
                Ask on WhatsApp instead
              </a>
            </Reveal>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  );
}
