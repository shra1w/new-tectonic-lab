import CoursePage from "@/components/CoursePage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail } from "@/lib/courses";
import { breadcrumbSchema, courseSchemaFor, faqSchemaFrom, webPageSchema } from "@/lib/schema";

const SLUG = "data-analytics-course";
const course = courses.find((c) => c.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "Data Analyst Course", href: `/${SLUG}` },
];

export const metadata = {
  title: "Data Analyst Course in Nagpur — Python, SQL, Power BI",
  description: "Learn Python, SQL, Power BI, Tableau and applied statistics in a 3-month data analyst course in Nagpur. Fees ₹50,000. Includes corporate grooming and placement preparation.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}`,
    siteName: "Techtonic Lab",
    title: "Data Analyst Course in Nagpur — Python, SQL, Power BI",
    description: "Learn Python, SQL, Power BI, Tableau and applied statistics in a 3-month data analyst course in Nagpur. Fees ₹50,000. Includes corporate grooming and placement preparation.",
    images: [{ url: "/og/data-analytics-course.jpg", width: 1200, height: 630, alt: "Data Analyst Course at Techtonic Lab, Nagpur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analyst Course in Nagpur — Python, SQL, Power BI",
    description: "Learn Python, SQL, Power BI, Tableau and applied statistics in a 3-month data analyst course in Nagpur. Fees ₹50,000. Includes corporate grooming and placement preparation.",
    images: ["/og/data-analytics-course.jpg"],
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
