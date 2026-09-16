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

const TITLE = "Data Science Course in Nagpur — 9 Months, ML, Deep Learning & GenAI";
const DESC =
  "9-month data science course in Nagpur covering Python, machine learning, deep learning, NLP, computer vision and Generative AI/LLMs, with model deployment and a capstone. Fees ₹89,999. Classroom, online and weekend batches.";

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
    images: [{ url: "/og/data-science-course.jpg", width: 1200, height: 630, alt: "Data Science Course at TECHTONIC LAB, Nagpur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
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