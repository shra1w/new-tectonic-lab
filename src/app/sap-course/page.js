import CoursePage from "@/components/CoursePage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail, sapModules } from "@/lib/courses";
import { breadcrumbSchema, courseSchemaFor, faqSchemaFrom, webPageSchema } from "@/lib/schema";

const SLUG = "sap-course";
const course = courses.find((c) => c?.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "SAP Course", href: `/${SLUG}` },
];

const TITLE = "SAP Course in Nagpur — MM, FICO, PP/QM & SD on Live S/4HANA";
const DESC =
  "SAP S/4HANA training in Nagpur offered as four standalone modules — MM, FICO, PP/QM and SD — each ₹49,999, all-inclusive, with individual live server access, certification guidance and placement preparation.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}`,
    siteName: "TECHTONIC LAB",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og/sap-course.jpg", width: 1200, height: 630, alt: "SAP Course at TECHTONIC LAB, Nagpur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
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
      <CoursePage course={course} detail={detail} breadcrumbs={breadcrumbs} modules={sapModules} />
    </>
  );
}