import CourseSyllabusPage from "@/components/CourseSyllabusPage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema, syllabusSchema } from "@/lib/schema";

const SLUG = "data-science-course";
const course = courses.find((c) => c.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "Data Science", href: `/${SLUG}` },
  { name: "Syllabus", href: `/${SLUG}/syllabus` },
];

export const metadata = {
  title: "Data Science Course Syllabus in Nagpur — Full Module List",
  description: "The complete data science course syllabus: Python, pandas, statistics, machine learning and deployment, with hours, tools and projects for every module.",
  alternates: { canonical: `/${SLUG}/syllabus` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}/syllabus`,
    siteName: "Techtonic Lab",
    title: "Data Science Course Syllabus in Nagpur — Full Module List",
    description: "The complete data science course syllabus: Python, pandas, statistics, machine learning and deployment, with hours, tools and projects for every module.",
    images: [{ url: "/og/data-science-course.jpg", width: 1200, height: 630, alt: "Data Science Course Syllabus in Nagpur — Full Module List" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Science Course Syllabus in Nagpur — Full Module List",
    description: "The complete data science course syllabus: Python, pandas, statistics, machine learning and deployment, with hours, tools and projects for every module.",
    images: ["/og/data-science-course.jpg"],
  },
};

export const revalidate = 86400;

export default function Page() {
  const jsonLd = [
    webPageSchema({
      path: `/${SLUG}/syllabus`,
      name: "Data Science Course Syllabus in Nagpur — Full Module List",
      description: "The complete data science course syllabus: Python, pandas, statistics, machine learning and deployment, with hours, tools and projects for every module.",
    }),
    breadcrumbSchema(breadcrumbs),
    syllabusSchema(course, detail),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CourseSyllabusPage course={course} detail={detail} breadcrumbs={breadcrumbs} />
    </>
  );
}
