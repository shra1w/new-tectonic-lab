import CourseSyllabusPage from "@/components/CourseSyllabusPage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema, syllabusSchema } from "@/lib/schema";

const SLUG = "data-analytics-course";
const course = courses.find((c) => c.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "Data Analytics", href: `/${SLUG}` },
  { name: "Syllabus", href: `/${SLUG}/syllabus` },
];

export const metadata = {
  title: "Data Analyst Course Syllabus in Nagpur — Full Module List",
  description: "The complete data analyst course syllabus: six modules covering Excel, SQL, Python, statistics, Power BI and Tableau, with hours, tools and projects for each.",
  alternates: { canonical: `/${SLUG}/syllabus` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}/syllabus`,
    siteName: "Techtonic Lab",
    title: "Data Analyst Course Syllabus in Nagpur — Full Module List",
    description: "The complete data analyst course syllabus: six modules covering Excel, SQL, Python, statistics, Power BI and Tableau, with hours, tools and projects for each.",
    images: [{ url: "/og/data-analytics-course.jpg", width: 1200, height: 630, alt: "Data Analyst Course Syllabus in Nagpur — Full Module List" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analyst Course Syllabus in Nagpur — Full Module List",
    description: "The complete data analyst course syllabus: six modules covering Excel, SQL, Python, statistics, Power BI and Tableau, with hours, tools and projects for each.",
    images: ["/og/data-analytics-course.jpg"],
  },
};

export const revalidate = 86400;

export default function Page() {
  const jsonLd = [
    webPageSchema({
      path: `/${SLUG}/syllabus`,
      name: "Data Analyst Course Syllabus in Nagpur — Full Module List",
      description: "The complete data analyst course syllabus: six modules covering Excel, SQL, Python, statistics, Power BI and Tableau, with hours, tools and projects for each.",
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
