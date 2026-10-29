import {
  SITE_URL,
  brand,
  offices,
  courses,
  faculty,
  facultyYearsTotal,
  faqs,
  grooming,
  installmentPlan,
  placementStats,
  placementBreakdown,
  alumniEmployers,
  DISCLAIMER,
  differentiators,
} from "./site";
import { getBatches } from "./content";
import { courseDetail, sapModules } from "./courses";

// -----------------------------------------------------------------------------
// Markdown views of the site for AI agents (Accept: text/markdown).
// Built from the same data the pages render, so fees, dates and contacts can
// never drift from the HTML. src/middleware.js decides when to serve these.
// -----------------------------------------------------------------------------

/** Every real page on the site. Anything else is a 404. */
export const KNOWN_PATHS = new Set([
  "/",
  "/fees",
  "/placements",
  "/batches",
  "/faculty",
  "/aboutus",
  "/connect-with-us",
  "/hire-from-us",
  "/privacy-policy",
  "/terms-of-service",
  "/request-leads",
  ...courses.flatMap((c) => [`/${c.slug}`, `/${c.slug}/fees`, `/${c.slug}/syllabus`]),
  ...Object.keys(sapModules).map((k) => `/sap-course/${k}`),
]);

const url = (path = "/") => `${SITE_URL}${path}`;

function contactBlock() {
  const lines = offices.map(
    (o) =>
      `- **${o.label} (${o.area}):** ${o.street}, ${o.locality}, ${o.region} ${o.postalCode}, India. ${o.hours}. [Directions](${o.directions})`
  );
  return [
    "## Contact and admissions",
    "",
    `- **Phone / WhatsApp:** ${brand.phone}`,
    `- **Email:** ${brand.email}`,
    `- **Free career consultation:** [${url("/connect-with-us")}](${url("/connect-with-us")})`,
    ...lines,
  ].join("\n");
}

function feeLine(c) {
  const plan = installmentPlan(c);
  const per = c.feeNote ? ` ${c.feeNote}` : "";
  return `| [${c.name}](${url(`/${c.slug}`)}) | ${c.duration} | ${c.fee}${per} | ${plan.text} | ${c.nextBatch} |`;
}

function feesTable() {
  return [
    "| Course | Duration | Fee (all-inclusive) | 3 instalments | Next batch |",
    "| --- | --- | --- | --- | --- |",
    ...courses.map(feeLine),
  ].join("\n");
}

const footer = () =>
  [
    "---",
    "",
    `More: [Sitemap](${url("/sitemap.xml")}) · [llms.txt](${url("/llms.txt")}) · [All fees](${url("/fees")}) · [Batch schedule](${url("/batches")})`,
    "",
    `_${DISCLAIMER}_`,
  ].join("\n");

function homeMarkdown() {
  return [
    `# ${brand.name} — Data Analytics, Data Science & SAP courses in Nagpur`,
    "",
    `> ${brand.name} (operated by ${brand.legalName}) is an IT training institute in Nagpur, Maharashtra, India. It trains students, fresh graduates and working professionals for jobs as data analysts, data scientists and SAP S/4HANA consultants, with classroom, online and weekend batches across two Nagpur campuses.`,
    "",
    "## Who it is for",
    "",
    "- College students in their final year who want a job-ready skill and a portfolio.",
    "- Fresh graduates from commerce, science, engineering or arts — no coding background needed for Data Analytics or SAP.",
    "- Working professionals in procurement, finance, production, sales or reporting roles moving into analytics or SAP consulting.",
    "- Learners from across Vidarbha (Wardha, Amravati, Chandrapur, Bhandara, Gondia and more) via weekend or online batches.",
    "",
    "## Courses and fees",
    "",
    feesTable(),
    "",
    `Every fee is all-inclusive: training, learning material, datasets or individual live SAP S/4HANA server access, one month of corporate grooming (a ${grooming.standalonePrice} programme, included free), 3 live mock interviews and placement preparation. No separate registration, exam or certificate charges. SAP modules (MM, FICO, PP/QM, SD) are each a standalone course.`,
    "",
    ...courses.map((c) =>
      [`### ${c.fullName}`, "", c.blurb, "", ...c.teaches.map((t) => `- ${t}`), ""].join("\n")
    ),
    "## Placements",
    "",
    `- ${placementStats.totalPlaced}+ students trained and placed since 2021 (${placementBreakdown.map((p) => `${p.programme}: ${p.count}`).join(", ")}).`,
    `- ${placementStats.named} alumni are named on the record with consent — see [placement records](${url("/placements")}).`,
    `- Alumni work at companies including ${alumniEmployers.map((e) => e.company).slice(0, 10).join(", ")}.`,
    "- Placement assistance, not a job guarantee: resume and LinkedIn rebuild, mock interviews, aptitude practice and referrals.",
    "",
    "## Faculty",
    "",
    `${faculty.length} instructors with ${facultyYearsTotal}+ years of combined experience:`,
    "",
    ...faculty.map((f) => `- **${f.name}** — ${f.title} (${f.years})`),
    "",
    "## Certification",
    "",
    "Every course ends with a TECHTONIC LAB completion certificate. We also prepare you for the relevant vendor certification — Microsoft PL-300 (Power BI) or official SAP module certification. Vendor exam fees are paid to the vendor and are not part of the course fee.",
    "",
    contactBlock(),
    "",
    "## Frequently asked questions",
    "",
    ...faqs.map((f) => `**${f.q}**\n\n${f.a}\n`),
    footer(),
  ].join("\n");
}

function feesMarkdown() {
  return [
    `# Course fees — ${brand.name}, Nagpur`,
    "",
    feesTable(),
    "",
    "## How the instalments work",
    "",
    ...courses.map((c) => {
      const plan = installmentPlan(c);
      return `- **${c.name}** (${c.fee}${c.feeNote ? ` ${c.feeNote}` : ""}): ${plan.text} — ${c.installmentNote}.`;
    }),
    "",
    "## What the fee includes",
    "",
    "- All training, learning material and datasets (SAP: individual live S/4HANA server access)",
    `- One month of corporate grooming — a ${grooming.standalonePrice} programme, included free`,
    "- 3 live mock interviews, resume and LinkedIn rebuild",
    "- Placement preparation and referrals",
    "- TECHTONIC LAB completion certificate — no separate registration, exam or certificate charges",
    "",
    "## Refund policy",
    "",
    `Fees once paid are non-refundable — the seat, SAP server licence and faculty time are committed when you enrol. If a batch cannot run on its published date, you are offered the next equivalent batch or a full refund for that batch. Full terms: [Terms of service](${url("/terms-of-service")}).`,
    "",
    contactBlock(),
    "",
    footer(),
  ].join("\n");
}

function batchesMarkdown() {
  const rows = getBatches().map(
    (b) => `| ${b.course} | ${b.start} | ${b.mode} | ${b.timing} | ${b.campus} | ${b.status} |`
  );
  return [
    `# Upcoming batches — ${brand.name}, Nagpur`,
    "",
    "| Course | Starts | Mode | Timing | Campus | Status |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows,
    "",
    contactBlock(),
    "",
    footer(),
  ].join("\n");
}

function courseMarkdown(c) {
  const d = courseDetail[c.slug] || {};
  const plan = installmentPlan(c);
  const modules = c.slug === "sap-course"
    ? Object.values(sapModules).map((m) => `- [${m.name} — ${m.tagline}](${url(`/sap-course/${m.slug}`)}): ${m.summary}`)
    : (d.modules || []).map((m) => `- **${m.title}** (${m.hours})`);
  return [
    `# ${d.h1 || c.fullName}`,
    "",
    `> ${d.summary || c.blurb}`,
    "",
    `- **Duration:** ${c.duration}`,
    `- **Fee:** ${c.fee}${c.feeNote ? ` ${c.feeNote}` : ""}, all-inclusive — ${plan.text} (${c.installmentNote})`,
    `- **Next batch:** ${c.nextBatch}`,
    `- **Mode:** ${c.mode}`,
    `- **Level:** ${c.level}`,
    d.prerequisites ? `- **Prerequisites:** ${d.prerequisites}` : null,
    d.certification ? `- **Certification:** ${d.certification}` : null,
    `- **Tools:** ${c.tools.join(", ")}`,
    "",
    "## What you will learn",
    "",
    ...c.teaches.map((t) => `- ${t}`),
    "",
    "## What is included",
    "",
    ...c.includes.map((t) => `- ${t}`),
    "",
    c.slug === "sap-course" ? "## SAP modules" : "## Syllabus",
    "",
    ...modules,
    "",
    `Full syllabus: [${url(`/${c.slug}/syllabus`)}](${url(`/${c.slug}/syllabus`)})`,
    "",
    contactBlock(),
    "",
    footer(),
  ]
    .filter((l) => l !== null)
    .join("\n");
}

function sapModuleMarkdown(m) {
  const sap = courses.find((c) => c.slug === "sap-course");
  return [
    `# ${m.fullName}`,
    "",
    `> ${m.summary}`,
    "",
    `- **Process:** ${m.process}`,
    `- **Fee:** ${m.fee}, all-inclusive — ${installmentPlan(sap).text}`,
    `- **Best for:** ${m.bestFor}`,
    `- **Next batch:** ${sap.nextBatch}`,
    "",
    "## Topics",
    "",
    ...m.topics.map((t) => `- ${t}`),
    "",
    contactBlock(),
    "",
    footer(),
  ].join("\n");
}

/** Pages that have a Markdown view (cheap check for the middleware). */
export function hasMarkdown(path) {
  return (
    path === "/" ||
    path === "/fees" ||
    path === "/batches" ||
    courses.some((c) => path === `/${c.slug}`) ||
    (path.startsWith("/sap-course/") && path.slice("/sap-course/".length) in sapModules)
  );
}

/** Markdown for a known page, or null when the page has no Markdown view. */
export function markdownFor(path) {
  if (path === "/") return homeMarkdown();
  if (path === "/fees") return feesMarkdown();
  if (path === "/batches") return batchesMarkdown();
  const course = courses.find((c) => path === `/${c.slug}`);
  if (course) return courseMarkdown(course);
  const mod = path.startsWith("/sap-course/") && sapModules[path.slice("/sap-course/".length)];
  if (mod) return sapModuleMarkdown(mod);
  return null;
}

export function notFoundMarkdown(path) {
  return [
    "# 404 — Page not found",
    "",
    `There is no page at \`${path}\` on ${brand.name}'s website. The link may be out of date or mistyped.`,
    "",
    "Try one of these instead:",
    "",
    `- [Homepage](${url("/")}) — what ${brand.name} does and who it is for`,
    ...courses.map((c) => `- [${c.fullName}](${url(`/${c.slug}`)})`),
    `- [Course fees](${url("/fees")})`,
    `- [Batch schedule](${url("/batches")})`,
    `- [Contact us](${url("/connect-with-us")})`,
    `- [Sitemap](${url("/sitemap.xml")}) · [llms.txt](${url("/llms.txt")})`,
    "",
  ].join("\n");
}

/** llms.txt — regenerated per request so batch dates never go stale. */
export function llmsTxt() {
  return [
    `# ${brand.name}`,
    "",
    `> ${brand.name} is an IT training institute in Nagpur, Maharashtra, India, offering job-oriented courses in Data Analytics, Data Science and SAP S/4HANA (MM, FICO, PP/QM, SD) with placement preparation and a month of corporate grooming built into every fee. Classroom, online and weekend batches across two Nagpur campuses. Every page also answers \`Accept: text/markdown\`.`,
    "",
    "## Why learners choose TECHTONIC LAB",
    "",
    ...differentiators.map((d) => `- **${d.title}.** ${d.body}`),
    "",
    "## Courses",
    "",
    ...courses.map(
      (c) => `- [${c.fullName}](${url(`/${c.slug}`)}): ${c.duration}, ${c.fee}${c.feeNote ? ` ${c.feeNote}` : ""} all-inclusive. Next batch ${c.nextBatch}. ${c.blurb}`
    ),
    ...Object.values(sapModules).map((m) => `- [${m.name} — ${m.tagline}](${url(`/sap-course/${m.slug}`)}): ${m.fee}. ${m.bestFor}.`),
    "",
    "## Fees and batches",
    "",
    `- [Course fees](${url("/fees")}): all-inclusive, payable in 3 instalments — ${courses.map((c) => `${c.name} ${installmentPlan(c).text}`).join("; ")}. Fees once paid are non-refundable.`,
    `- [Batch schedule](${url("/batches")})`,
    "",
    "## Placement",
    "",
    `- [Placement records](${url("/placements")}): ${placementStats.totalPlaced}+ students trained and placed since 2021; ${placementStats.named} alumni named on the record. Placement assistance, not a guarantee.`,
    `- [Hire from us](${url("/hire-from-us")}): no placement fee for employers.`,
    "",
    "## About",
    "",
    `- [About ${brand.name}](${url("/aboutus")})`,
    `- [Faculty](${url("/faculty")}): ${faculty.length} instructors, ${facultyYearsTotal}+ years combined experience.`,
    `- [Contact](${url("/connect-with-us")})`,
    "",
    contactBlock(),
    "",
  ].join("\n");
}
