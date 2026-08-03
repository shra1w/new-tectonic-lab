# Techtonic Lab

Next.js 15 (App Router, JavaScript only) rebuild of the Techtonic Lab site, built
against the *Website Audit, SEO & GEO Rebuild Plan*.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`. Everything else
runs with zero config.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 App Router, JSX (no TypeScript) |
| Styling | Tailwind CSS 3 |
| Animation | `motion` (Framer Motion) — `motion/react` |
| Icons | `react-icons` (Lucide set) |
| Fonts | `next/font/google` — Bricolage Grotesque (headings) + Figtree (body) |

## Routes

**Built and live (23 pages, all statically prerendered):**

```
/                              /aboutus              /connect-with-us
/faculty                       /placements           /batches
/fees                          /hire-from-us
/privacy-policy                /terms-of-service

/data-analytics-course         /data-analytics-course/fees   /data-analytics-course/syllabus
/data-science-course           /data-science-course/fees     /data-science-course/syllabus
/sap-course                    /sap-course/fees              /sap-course/syllabus
/sap-course/fico   /sap-course/mm   /sap-course/sd   /sap-course/pp-qm

/sitemap.xml   /robots.txt   /llms.txt   404   POST /api/lead
```

**Not built:** `/blog` and `/blog/[slug]`. Because those pages do not exist yet, the
Blog nav item and the footer "Guides" column have been removed — linking to a 404
from every page of the site is worse than not linking at all. Both are marked with a
TODO in `src/lib/site.js`; restore them the day the blog ships.

## Design direction

Dark zinc canvas, a single acid accent `#EAFD56`, no circular gradients.

The signature device is a **dashboard hairline grid** — every page sits on a faint
64px rule grid, the visual language of the spreadsheets and BI tools the institute
actually teaches. Three things reuse it:

- **The selected cell.** Every `<h1>` on the site ends on a solid lime block, borrowed
  from a highlighted cell in Excel or a selected row in a report.
- **Spec rows.** Course, fee, batch and placement cards use rule-separated label→value
  lists rather than paragraphs, because a spec sheet is how this audience compares.
- **Numbered module blocks.** Used only where order actually carries information —
  the syllabus runs in sequence and each module assumes the last.

Motion is one gesture used consistently: a 20px fade-up on scroll into view, staggered
across grids. Nothing loops, nothing parallaxes. `prefers-reduced-motion` disables all
of it (`Reveal.jsx`, `Stagger.jsx`, `globals.css`).

## Where the content lives

| File | Holds |
|---|---|
| `src/lib/site.js` | Brand, NAP, nav, courses, faculty, placements, testimonials, homepage FAQ, footer |
| `src/lib/courses.js` | Per-course syllabus modules, projects, careers, audience, FAQs; SAP module deep-dives |
| `src/lib/content.js` | About, batch schedule, hire-from-us, privacy policy, terms of service |
| `src/lib/schema.js` | Every JSON-LD block, built from the three files above |

Because schema is generated from the same data the pages render, the visible FAQ can
never drift out of sync with `FAQPage` markup, and headline counts are derived
(`placements.length`, `facultyYearsTotal`) rather than typed — so a number on the site
cannot become false without the underlying list changing too.

## Shared components

`PageHero` · `FactTable` · `FaqList` · `Breadcrumbs` · `Prose` · `SectionHead` ·
`Reveal` · `Stagger` · `ImageSlot` · `CtaBand` · `RelatedCourses` · `LeadForm`

`CoursePage`, `CourseFeesPage`, `CourseSyllabusPage`, `SapModulePage` and `LegalPage`
are full-page templates driven entirely by data, so each route file is ~50 lines of
metadata and schema.

## Images

Nothing is stock. Every image position renders a labelled placeholder with a badge
like `IMG-01`. The matching generation prompt, path and aspect ratio are in
**`IMAGE-PROMPTS.md`**. Drop the file in `/public` and pass `src`:

```jsx
<ImageSlot src="/photos/hero-lab.jpg" alt="Training lab at the Somalwada campus" … />
```

It then renders through `next/image` — AVIF/WebP, responsive `srcset`, explicit
dimensions, no layout shift.

**Faculty portraits, alumni photos and testimonial photos have no prompts, deliberately.**
Those must be real photographs of real people with written consent on file. Generating
a face for a named alumnus would be exactly the unverifiable claim this rebuild exists
to remove.

## What the audit asked for, and where it is

| Audit item | Where |
|---|---|
| **CRIT-1** all body content server-rendered | Every page statically prerendered. Every accordion is a native `<details>` — answers ship in the initial HTML. Verified with `curl` on all 23 routes |
| **CRIT-3** one brand string | `src/lib/site.js`. No "Techtonic Labs", no "techtomic lab" alt text anywhere |
| **CRIT-4** NAP consistency | `offices[]` feeds the footer, contact page, about page and both `LocalBusiness` blocks from one source. **PIN 440037 still needs confirming against JustDial's 441108** |
| **CRIT-5** partner logo wall | Replaced by "Companies our alumni work at" on the homepage and `/placements`. A named alumnus is required per logo; employers without one render a visible warning state on purpose |
| SEO-01/02 | `src/app/sitemap.js` (23 URLs, derived from course data), `src/app/robots.js` — GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, CCBot all allowed |
| SEO-03 meta keywords | Never emitted |
| SEO-04/05 canonical + unique meta | Self-referencing canonical and a unique title/description on all 23 pages |
| SEO-06/07 OG + Twitter | Full objects per page, `summary_large_image`, 1200×630 |
| SEO-09 URL shape | `redirects()` in `next.config.mjs` — underscored variants 301 to kebab-case |
| SEO-10 breadcrumbs | Visible `Breadcrumbs` above every non-home `<h1>`, plus `BreadcrumbList` JSON-LD |
| SEO-11 anchor text | "Explore the Data Analytics course", never "read more" |
| SEO-12 heading hierarchy | Exactly one `<h1>` per page; verified across all routes |
| Section 6.3 internal linking | Course cards deep-link to syllabus, fees and batches; every course page links to the other two, its fees page, faculty and placements. Zero orphan pages, zero broken links |
| Section 8 schema | 46 JSON-LD blocks site-wide, all parsing: EducationalOrganization, WebSite, WebPage, 2× LocalBusiness, 3× Course, Syllabus, Offer, FAQPage, BreadcrumbList, ItemList, 6× Person |
| Section 7 GEO | `/llms.txt`, question-format headings, answer-first copy, quick-facts `FactTable` near the top of every page, full tool names, "Last updated" line, `dateModified` in schema |
| UX-11/12 footer | One social block, icon links with `aria-label` |
| UX-14 WhatsApp | Floating FAB with prefilled message |
| UX-15/16 batches + fees | Published on the page and on dedicated `/batches` and `/fees` routes, no form gate |
| Section 5.1 compliance | "Placement assistance, not a guarantee" throughout; CIN line; DPDP-drafted privacy policy; cookie consent before any pixel fires |
| Section 5.2 form | `POST /api/lead` — server-side validation, honeypot, per-IP rate limit, UTM + `gclid` capture, specific success state |
| Section 12 a11y | Skip link, landmarks, real `<label>`s, visible focus, reduced motion, `lang="en-IN"`, table `<caption>`s and scoped `<th>` |

## Before you ship

1. **Confirm the head-office PIN** with the physical office, then update
   `offices[0].postalCode` and push the identical string to GBP, JustDial, Sulekha
   and IndiaMart.
2. **Verify three faculty records.** `Sudhir Deshmukh`, `Harshal Wankhede` and
   `Vivek Chandekar` are flagged `needsVerification: true` in `src/lib/site.js` — the
   live site names six instructors totalling 72+ years but only three fully. Confirm
   the real names, years and LinkedIn URLs.
3. **Add three more placement records.** The site claims 11 named alumni; eight are on
   file. Every count on the site derives from `placements.length`, so the number is
   currently true — but get the remaining three real names.
4. **Wire `/api/lead`.** Validation, honeypot and rate limiting are done. The three
   delivery calls (CRM, auto-response email, WhatsApp Cloud API) are stubbed with the
   exact shape you need — drop in credentials.
5. **Fire analytics on consent only.** `CookieBanner.jsx` dispatches a
   `tl:consent-granted` event; load GA4 and the Ads pixel there, never earlier.
6. **Fill the legal brackets.** `[24]` months, `[7]` years, `[X]%` refund, `[75]%`
   attendance and the CIN are placeholders. Have a lawyer review both documents.
7. **Generate the images** per `IMAGE-PROMPTS.md`, and the 11 OG cards in a design
   tool rather than an image model — a misspelled share card is worse than none.
8. **Validate the schema** at `search.google.com/test/rich-results` once deployed.
