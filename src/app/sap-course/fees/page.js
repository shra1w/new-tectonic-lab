import CourseFeesPage from "@/components/CourseFeesPage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema, offerSchema } from "@/lib/schema";

const SLUG = "sap-course";
const course = courses.find((c) => c?.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "SAP", href: `/${SLUG}` },
  { name: "Fees", href: `/${SLUG}/fees` },
];

export const metadata = {
  title: "SAP Course Fees in Nagpur — ₹49,999 with S/4HANA Access",
  description: "SAP course fees in Nagpur: each S/4HANA module — MM, FICO, PP/QM or SD — is ₹49,999, all-inclusive, with live server access. EMI at ₹8,334 per month. Itemised in full.",
  alternates: { canonical: `/${SLUG}/fees` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}/fees`,
    siteName: "TECHTONIC LAB",
    title: "SAP Course Fees in Nagpur — ₹49,999 with S/4HANA Access",
    description: "SAP course fees in Nagpur: each S/4HANA module — MM, FICO, PP/QM or SD — is ₹49,999, all-inclusive, with live server access. EMI at ₹8,334 per month. Itemised in full.",
    images: [{ url: "/og/sap-course.jpg", width: 1200, height: 630, alt: "SAP Course Fees in Nagpur — ₹49,999 with S/4HANA Access" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP Course Fees in Nagpur — ₹49,999 with S/4HANA Access",
    description: "SAP course fees in Nagpur: each S/4HANA module — MM, FICO, PP/QM or SD — is ₹49,999, all-inclusive, with live server access. EMI at ₹8,334 per month. Itemised in full.",
    images: ["/og/sap-course.jpg"],
  },
};

export const revalidate = 86400;

export default function Page() {
  const jsonLd = [
    webPageSchema({
      path: `/${SLUG}/fees`,
      name: "SAP Course Fees in Nagpur — ₹49,999 with S/4HANA Access",
      description: "SAP course fees in Nagpur: each S/4HANA module — MM, FICO, PP/QM or SD — is ₹49,999, all-inclusive, with live server access. EMI at ₹8,334 per month. Itemised in full.",
    }),
    breadcrumbSchema(breadcrumbs),
    offerSchema(course),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CourseFeesPage course={course} detail={detail} breadcrumbs={breadcrumbs} />
    </>
  );
}
