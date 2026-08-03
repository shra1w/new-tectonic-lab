import LegalPage from "@/components/LegalPage";
import { termsOfService } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Terms of service", href: "/terms-of-service" },
];

const TITLE = "Terms of Service — Techtonic Lab";
const DESC = "Terms governing enrolment at Techtonic Lab: fees, refunds, placement assistance, attendance, server access and use of course material.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/terms-of-service`,
    siteName: "Techtonic Lab",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/homepage.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/homepage.jpg"] },
};

export const revalidate = 86400;

export default function Page() {
  const jsonLd = [
    webPageSchema({
      path: "/terms-of-service",
      name: TITLE,
      description: DESC,
      modified: "2026-08-01",
    }),
    breadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalPage doc={termsOfService} breadcrumbs={breadcrumbs} eyebrow="Legal" />
    </>
  );
}
