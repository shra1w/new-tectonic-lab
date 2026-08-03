import Hero from "@/components/Hero";
import QuickFacts from "@/components/QuickFacts";
import Courses from "@/components/Courses";
import Fees from "@/components/Fees";
import WhyUs from "@/components/WhyUs";
import AlumniEmployers from "@/components/AlumniEmployers";
import Placements from "@/components/Placements";
import Testimonials from "@/components/Testimonials";
import Faculty from "@/components/Faculty";
import Coverage from "@/components/Coverage";
import Grooming from "@/components/Grooming";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import FinalCta from "@/components/FinalCta";

import { SITE_URL } from "@/lib/site";
import {
  localBusinessSchemas,
  courseSchemas,
  faqSchema,
  personSchemas,
} from "@/lib/schema";

export const metadata = {
  title: "Data Analyst, SAP & Data Science Courses in Nagpur | Techtonic Lab",
  description:
    "Job-ready IT courses in Nagpur — Data Analytics, Data Science, and SAP with classroom, online, and weekend batches. Fees ₹50,000. Placement preparation included.",
  alternates: { canonical: "/" },
  // Next.js merges metadata shallowly, so openGraph/twitter must be declared in
  // full here or the parent's og:image is dropped (audit SEO-05, SEO-07).
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/`,
    siteName: "Techtonic Lab",
    title: "Data Analyst, SAP & Data Science Courses in Nagpur | Techtonic Lab",
    description:
      "Job-ready IT courses in Nagpur — Data Analytics, Data Science, and SAP with classroom, online, and weekend batches. Fees ₹50,000. Placement preparation included.",
    images: [
      {
        url: "/og/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Techtonic Lab — IT training institute in Nagpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analyst, SAP & Data Science Courses in Nagpur | Techtonic Lab",
    description:
      "Job-ready IT courses in Nagpur — Data Analytics, Data Science, and SAP. Fees ₹50,000. Placement preparation included.",
    images: ["/og/homepage.jpg"],
  },
};

// initial HTML response — that is the whole point of audit CRIT-1.
export const revalidate = 86400;

export default function HomePage() {
  const pageJsonLd = [
    ...localBusinessSchemas(),
    ...courseSchemas(),
    faqSchema(),
    ...personSchemas(),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <Hero />
      <QuickFacts />
      <Courses />
      <Fees />
      <WhyUs />
      <AlumniEmployers />
      <Placements />
      <Testimonials />
      <Faculty />
      <Coverage />
      <Grooming />
      <Faq />
      <Contact />
      <FinalCta />
    </>
  );
}
