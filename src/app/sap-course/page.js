import CoursePage from "@/components/CoursePage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail } from "@/lib/courses";
import { breadcrumbSchema, courseSchemaFor, faqSchemaFrom, webPageSchema } from "@/lib/schema";

const SLUG = "sap-course";
const course = courses.find((c) => c.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "SAP Course", href: `/${SLUG}` },
];

export const metadata = {
  title: "SAP Course in Nagpur — FICO, MM, SD, PP/QM on S/4HANA",
  description: "SAP course in Nagpur covering FICO, MM, SD and PP/QM with individual live S/4HANA server access, certification guidance and placement preparation. Fees ₹50,000.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}`,
    siteName: "Techtonic Lab",
    title: "SAP Course in Nagpur — FICO, MM, SD, PP/QM on S/4HANA",
    description: "SAP course in Nagpur covering FICO, MM, SD and PP/QM with individual live S/4HANA server access, certification guidance and placement preparation. Fees ₹50,000.",
    images: [{ url: "/og/sap-course.jpg", width: 1200, height: 630, alt: "SAP Course at Techtonic Lab, Nagpur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP Course in Nagpur — FICO, MM, SD, PP/QM on S/4HANA",
    description: "SAP course in Nagpur covering FICO, MM, SD and PP/QM with individual live S/4HANA server access, certification guidance and placement preparation. Fees ₹50,000.",
    images: ["/og/sap-course.jpg"],
  },
};

export const revalidate = 86400;

export default function Page() {
  const jsonLd = [
    webPageSchema({
      path: `/${SLUG}`,
      name: detail.h1,
      description: detail.summary,
    }),
    breadcrumbSchema(breadcrumbs),
    courseSchemaFor(SLUG),
    faqSchemaFrom(detail.faqs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoursePage course={course} detail={detail} breadcrumbs={breadcrumbs} />
    </>
  );
}
