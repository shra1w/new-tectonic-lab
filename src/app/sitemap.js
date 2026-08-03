import { SITE_URL, courses } from "@/lib/site";
import { sapModules } from "@/lib/courses";

// SEO-01 — every canonical URL with a lastmod date. Derived from the same data
// the pages render from, so a new course can never be missing here.
export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/fees", priority: 0.9, changeFrequency: "monthly" },
    { path: "/placements", priority: 0.9, changeFrequency: "monthly" },
    { path: "/batches", priority: 0.85, changeFrequency: "weekly" },
    { path: "/faculty", priority: 0.75, changeFrequency: "monthly" },
    { path: "/aboutus", priority: 0.6, changeFrequency: "yearly" },
    { path: "/connect-with-us", priority: 0.75, changeFrequency: "yearly" },
    { path: "/hire-from-us", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-of-service", priority: 0.2, changeFrequency: "yearly" },
  ];

  const coursePages = courses.flatMap((c) => [
    { path: `/${c.slug}`, priority: 0.95, changeFrequency: "weekly" },
    { path: `/${c.slug}/fees`, priority: 0.8, changeFrequency: "monthly" },
    { path: `/${c.slug}/syllabus`, priority: 0.8, changeFrequency: "monthly" },
  ]);

  const modulePages = Object.keys(sapModules).map((k) => ({
    path: `/sap-course/${k}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...coursePages, ...modulePages].map((p) => ({
    url: `${SITE_URL}${p.path || "/"}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
