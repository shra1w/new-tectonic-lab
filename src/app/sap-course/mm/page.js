import SapModulePage from "@/components/SapModulePage";
import { SITE_URL } from "@/lib/site";
import { sapModules } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const KEY = "mm";
const mod = sapModules[KEY];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "SAP Course", href: "/sap-course" },
  { name: "SAP MM", href: `/sap-course/${KEY}` },
];

export const metadata = {
  title: "SAP MM Course in Nagpur — Materials Management",
  description: "SAP MM course in Nagpur: configure the full procure-to-pay cycle — master data, purchase orders, goods receipt and invoice verification — on live S/4HANA.",
  alternates: { canonical: `/sap-course/${KEY}` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/sap-course/${KEY}`,
    siteName: "Techtonic Lab",
    title: "SAP MM Course in Nagpur — Materials Management",
    description: "SAP MM course in Nagpur: configure the full procure-to-pay cycle — master data, purchase orders, goods receipt and invoice verification — on live S/4HANA.",
    images: [{ url: "/og/sap-course.jpg", width: 1200, height: 630, alt: "SAP MM Course in Nagpur — Materials Management" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP MM Course in Nagpur — Materials Management",
    description: "SAP MM course in Nagpur: configure the full procure-to-pay cycle — master data, purchase orders, goods receipt and invoice verification — on live S/4HANA.",
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
