import CoursePage from "@/components/CoursePage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail } from "@/lib/courses";
import { breadcrumbSchema, courseSchemaFor, faqSchemaFrom, webPageSchema } from "@/lib/schema";

const SLUG = "data-science-course";
const course = courses.find((c) => c.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "Data Science Course", href: `/${SLUG}` },
];

export const metadata = {
  title: "Data Science Course in Nagpur — Python, ML, Statistics",
  description: "3-month data science course in Nagpur covering Python, machine learning, statistics and real-world projects. Fees ₹50,000. Classroom, online and weekend batches.",
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}`,
    siteName: "Techtonic Lab",
    title: "Data Science Course in Nagpur — Python, ML, Statistics",
    description: "3-month data science course in Nagpur covering Python, machine learning, statistics and real-world projects. Fees ₹50,000. Classroom, online and weekend batches.",
    images: [{ url: "/og/data-science-course.jpg", width: 1200, height: 630, alt: "Data Science Course at Techtonic Lab, Nagpur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Science Course in Nagpur — Python, ML, Statistics",
    description: "3-month data science course in Nagpur covering Python, machine learning, statistics and real-world projects. Fees ₹50,000. Classroom, online and weekend batches.",
    images: ["/og/data-science-course.jpg"],
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
