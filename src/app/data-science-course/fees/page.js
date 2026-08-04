import CourseFeesPage from "@/components/CourseFeesPage";
import { courses, SITE_URL } from "@/lib/site";
import { courseDetail } from "@/lib/courses";
import { breadcrumbSchema, webPageSchema, offerSchema } from "@/lib/schema";

const SLUG = "data-science-course";
const course = courses.find((c) => c.slug === SLUG);
const detail = courseDetail[SLUG];

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/#courses" },
  { name: "Data Science", href: `/${SLUG}` },
  { name: "Fees", href: `/${SLUG}/fees` },
];

export const metadata = {
  title: "Data Science Course Fees in Nagpur — ₹49,999 All-Inclusive",
  description: "Data science course fees in Nagpur: ₹49,999 for the full 4-month programme, EMI at ₹8,334 per month. No registration, examination or certificate charges.",
  alternates: { canonical: `/${SLUG}/fees` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/${SLUG}/fees`,
    siteName: "Techtonic Lab",
    title: "Data Science Course Fees in Nagpur — ₹49,999 All-Inclusive",
    description: "Data science course fees in Nagpur: ₹49,999 for the full 4-month programme, EMI at ₹8,334 per month. No registration, examination or certificate charges.",
    images: [{ url: "/og/data-science-course.jpg", width: 1200, height: 630, alt: "Data Science Course Fees in Nagpur — ₹49,999 All-Inclusive" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Science Course Fees in Nagpur — ₹49,999 All-Inclusive",
    description: "Data science course fees in Nagpur: ₹49,999 for the full 4-month programme, EMI at ₹8,334 per month. No registration, examination or certificate charges.",
    images: ["/og/data-science-course.jpg"],
  },
};

export const revalidate = 86400;

export default function Page() {
  const jsonLd = [
    webPageSchema({
      path: `/${SLUG}/fees`,
      name: "Data Science Course Fees in Nagpur — ₹49,999 All-Inclusive",
      description: "Data science course fees in Nagpur: ₹49,999 for the full 4-month programme, EMI at ₹8,334 per month. No registration, examination or certificate charges.",
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
