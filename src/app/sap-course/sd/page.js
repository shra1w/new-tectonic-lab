import SapModulePage from "@/components/SapModulePage";
import { SITE_URL } from "@/lib/site";
import { sapModules } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const KEY = "sd";
const mod = sapModules[KEY];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "SAP Course", href: "/sap-course" },
  { name: "SAP SD", href: `/sap-course/${KEY}` },
];

export const metadata = {
  title: "SAP SD Course in Nagpur — Sales and Distribution",
  description: "SAP SD course in Nagpur: configure order-to-cash from sales area design through pricing, delivery, billing and returns on live S/4HANA server access.",
  alternates: { canonical: `/sap-course/${KEY}` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/sap-course/${KEY}`,
    siteName: "Techtonic Lab",
    title: "SAP SD Course in Nagpur — Sales and Distribution",
    description: "SAP SD course in Nagpur: configure order-to-cash from sales area design through pricing, delivery, billing and returns on live S/4HANA server access.",
    images: [{ url: "/og/sap-course.jpg", width: 1200, height: 630, alt: "SAP SD Course in Nagpur — Sales and Distribution" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP SD Course in Nagpur — Sales and Distribution",
    description: "SAP SD course in Nagpur: configure order-to-cash from sales area design through pricing, delivery, billing and returns on live S/4HANA server access.",
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
