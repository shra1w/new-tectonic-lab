import CourseSyllabusPage from "@/components/CourseSyllabusPage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema, syllabusSchema } from "@/lib/schema";

const SLUG = "sap-course";
const course = courses.find((c) => c.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "SAP", href: `/${SLUG}` },
  { name: "Syllabus", href: `/${SLUG}/syllabus` },
];

export const metadata = {
  title: "SAP Course Syllabus in Nagpur — FICO, MM, SD, PP/QM",
  description: "The complete SAP course syllabus: S/4HANA foundations, FICO, MM, SD and PP/QM configuration, with hours, topics and the scenario built in each module.",
  alternates: { canonical: `/${SLUG}/syllabus` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}/syllabus`,
    siteName: "Techtonic Lab",
    title: "SAP Course Syllabus in Nagpur — FICO, MM, SD, PP/QM",
    description: "The complete SAP course syllabus: S/4HANA foundations, FICO, MM, SD and PP/QM configuration, with hours, topics and the scenario built in each module.",
    images: [{ url: "/og/sap-course.jpg", width: 1200, height: 630, alt: "SAP Course Syllabus in Nagpur — FICO, MM, SD, PP/QM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP Course Syllabus in Nagpur — FICO, MM, SD, PP/QM",
    description: "The complete SAP course syllabus: S/4HANA foundations, FICO, MM, SD and PP/QM configuration, with hours, topics and the scenario built in each module.",
    images: ["/og/sap-course.jpg"],
  },
};

export const revalidate = 86400;

export default function Page() {
  const jsonLd = [
    webPageSchema({
      path: `/${SLUG}/syllabus`,
      name: "SAP Course Syllabus in Nagpur — FICO, MM, SD, PP/QM",
      description: "The complete SAP course syllabus: S/4HANA foundations, FICO, MM, SD and PP/QM configuration, with hours, topics and the scenario built in each module.",
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
