import CourseFeesPage from "@/components/CourseFeesPage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema, offerSchema } from "@/lib/schema";

const SLUG = "data-analytics-course";
const course = courses.find((c) => c.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "Data Analytics", href: `/${SLUG}` },
  { name: "Fees", href: `/${SLUG}/fees` },
];

export const metadata = {
  title: "Data Analyst Course Fees in Nagpur — ₹49,999 All-Inclusive",
  description: "Data analyst course fees in Nagpur: ₹49,999 for the full 4-month programme, EMI at ₹8,334 per month. Itemised, with what is and is not included.",
  alternates: { canonical: `/${SLUG}/fees` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}/fees`,
    siteName: "Techtonic Lab",
    title: "Data Analyst Course Fees in Nagpur — ₹49,999 All-Inclusive",
    description: "Data analyst course fees in Nagpur: ₹49,999 for the full 4-month programme, EMI at ₹8,334 per month. Itemised, with what is and is not included.",
    images: [{ url: "/og/data-analytics-course.jpg", width: 1200, height: 630, alt: "Data Analyst Course Fees in Nagpur — ₹49,999 All-Inclusive" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analyst Course Fees in Nagpur — ₹49,999 All-Inclusive",
    description: "Data analyst course fees in Nagpur: ₹49,999 for the full 4-month programme, EMI at ₹8,334 per month. Itemised, with what is and is not included.",
    images: ["/og/data-analytics-course.jpg"],
  },
};

export const revalidate = 86400;

export default function Page() {
  const jsonLd = [
    webPageSchema({
      path: `/${SLUG}/fees`,
      name: "Data Analyst Course Fees in Nagpur — ₹49,999 All-Inclusive",
      description: "Data analyst course fees in Nagpur: ₹49,999 for the full 4-month programme, EMI at ₹8,334 per month. Itemised, with what is and is not included.",
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
