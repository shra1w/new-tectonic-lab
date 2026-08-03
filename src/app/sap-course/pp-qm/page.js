import SapModulePage from "@/components/SapModulePage";
import { SITE_URL } from "@/lib/site";
import { sapModules } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const KEY = "pp-qm";
const mod = sapModules[KEY];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "SAP Course", href: "/sap-course" },
  { name: "SAP PP/QM", href: `/sap-course/${KEY}` },
];

export const metadata = {
  title: "SAP PP/QM Course in Nagpur — Production and Quality",
  description: "SAP PP/QM course in Nagpur: BOMs, routings, MRP, production orders and quality inspection on live S/4HANA. Included in the ₹50,000 SAP programme.",
  alternates: { canonical: `/sap-course/${KEY}` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/sap-course/${KEY}`,
    siteName: "Techtonic Lab",
    title: "SAP PP/QM Course in Nagpur — Production and Quality",
    description: "SAP PP/QM course in Nagpur: BOMs, routings, MRP, production orders and quality inspection on live S/4HANA. Included in the ₹50,000 SAP programme.",
    images: [{ url: "/og/sap-course.jpg", width: 1200, height: 630, alt: "SAP PP/QM Course in Nagpur — Production and Quality" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP PP/QM Course in Nagpur — Production and Quality",
    description: "SAP PP/QM course in Nagpur: BOMs, routings, MRP, production orders and quality inspection on live S/4HANA. Included in the ₹50,000 SAP programme.",
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
