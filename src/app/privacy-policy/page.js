import LegalPage from "@/components/LegalPage";
import { privacyPolicy } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Privacy policy", href: "/privacy-policy" },
];

const TITLE = "Privacy Policy — Techtonic Lab";
const DESC = "How Techtonic Lab collects, uses and retains personal data, your rights under India's DPDP Act 2023, and how to contact our grievance officer.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/privacy-policy`,
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
      path: "/privacy-policy",
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
      <LegalPage doc={privacyPolicy} breadcrumbs={breadcrumbs} eyebrow="Legal" />
    </>
  );
}
