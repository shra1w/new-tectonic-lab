import SapModulePage from "@/components/SapModulePage";
import { SITE_URL } from "@/lib/site";
import { sapModules } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const KEY = "fico";
const mod = sapModules[KEY];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "SAP Course", href: "/sap-course" },
  { name: "SAP FICO", href: `/sap-course/${KEY}` },
];

export const metadata = {
  title: "SAP FICO Course in Nagpur — Finance and Controlling",
  description: "SAP FICO course in Nagpur: configure company codes, general ledger, asset accounting and cost centres on live S/4HANA. Included in the ₹49,999 SAP programme.",
  alternates: { canonical: `/sap-course/${KEY}` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/sap-course/${KEY}`,
    siteName: "Techtonic Lab",
    title: "SAP FICO Course in Nagpur — Finance and Controlling",
    description: "SAP FICO course in Nagpur: configure company codes, general ledger, asset accounting and cost centres on live S/4HANA. Included in the ₹49,999 SAP programme.",
    images: [{ url: "/og/sap-course.jpg", width: 1200, height: 630, alt: "SAP FICO Course in Nagpur — Finance and Controlling" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP FICO Course in Nagpur — Finance and Controlling",
    description: "SAP FICO course in Nagpur: configure company codes, general ledger, asset accounting and cost centres on live S/4HANA. Included in the ₹49,999 SAP programme.",
    images: ["/og/sap-course.jpg"],
  },
};

export const revalidate = 86400;

export default function Page() {
  const jsonLd = [
    webPageSchema({ path: `/sap-course/${KEY}`, name: mod.fullName, description: mod.summary }),
    breadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SapModulePage mod={mod} breadcrumbs={breadcrumbs} />
    </>
  );
}
