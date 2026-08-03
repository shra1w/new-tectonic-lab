// -----------------------------------------------------------------------------
// Audit Section 8 — JSON-LD. Validate every block at
// https://search.google.com/test/rich-results before shipping.
// -----------------------------------------------------------------------------
import { SITE_URL, brand, offices, courses, faqs, faculty } from "./site";

const ORG_ID = `${SITE_URL}/#organization`;
export const ORG_ID_EXPORT = ORG_ID;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    name: brand.name,
    alternateName: "Techtonic Lab Institute",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og/homepage.jpg`,
    description:
      "Techtonic Lab is an IT training institute in Nagpur offering courses in Data Analytics, Data Science, and SAP with placement preparation and support.",
    email: brand.email,
    telephone: "+91-8766069947",
    address: {
      "@type": "PostalAddress",
      streetAddress: offices[0].street,
      addressLocality: offices[0].locality,
      addressRegion: offices[0].region,
      postalCode: offices[0].postalCode,
      addressCountry: "IN",
    },
    sameAs: brand.socials.map((s) => s.href),
    parentOrganization: { "@type": "Organization", name: brand.legalName },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Nagpur and Vidarbha, Maharashtra",
    },
  };
}

export function localBusinessSchemas() {
  return offices.map((o) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#${o.id}`,
    name: `${brand.name} — ${o.label} (${o.area})`,
    image: `${SITE_URL}/photos/${o.id}.jpg`,
    telephone: "+91-8766069947",
    email: brand.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.locality,
      addressRegion: o.region,
      postalCode: o.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: o.lat, longitude: o.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    parentOrganization: { "@id": ORG_ID },
  }));
}

export function courseSchemas() {
  return courses.map((c) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.fullName,
    description: c.blurb,
    provider: {
      "@type": "EducationalOrganization",
      "@id": ORG_ID,
      name: brand.name,
      sameAs: `${SITE_URL}/`,
    },
    url: `${SITE_URL}/${c.slug}`,
    courseCode: c.courseCode,
    educationalLevel: c.level,
    teaches: c.teaches,
    inLanguage: "en",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Onsite", "Blended", "Online"],
      location: {
        "@type": "Place",
        name: `${brand.name}, ${offices[0].area}`,
        address: `${offices[0].street}, ${offices[0].locality}, ${offices[0].region}`,
      },
      courseWorkload: "PT4M",
      startDate: c.startDateISO,
      endDate: c.endDateISO,
    },
    offers: {
      "@type": "Offer",
      category: "Paid course",
      price: c.feeNumeric,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/${c.slug}`,
    },
  }));
}

// Must match the visible FAQ block 1-to-1.
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function personSchemas() {
  return faculty.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.title,
    worksFor: { "@id": ORG_ID },
    description: `${p.years} — ${p.bio}`,
    image: `${SITE_URL}/faculty/${p.name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
  }));
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: brand.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

export function homepageJsonLd() {
  return [
    organizationSchema(),
    websiteSchema(),
    ...localBusinessSchemas(),
    ...courseSchemas(),
    faqSchema(),
    ...personSchemas(),
  ];
}

// -----------------------------------------------------------------------------
// Per-page helpers (audit Section 8.5 and Section 11).
// -----------------------------------------------------------------------------

/** SEO-10 — BreadcrumbList on every non-home page. */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

/** FAQPage from an arbitrary list — must mirror the visible FAQ exactly. */
export function faqSchemaFrom(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Single Course block, used on the individual course pages. */
export function courseSchemaFor(slug) {
  return courseSchemas().find((c) => c.url === `${SITE_URL}/${slug}`);
}

/** Syllabus pages get a Syllabus-flavoured Course block with hasPart modules. */
export function syllabusSchema(course, detail) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.fullName} — syllabus`,
    description: `Module-by-module syllabus for the ${course.fullName} at Techtonic Lab, including topics, tools, hours and the project built in each module.`,
    url: `${SITE_URL}/${course.slug}/syllabus`,
    provider: { "@id": ORG_ID_EXPORT },
    hasPart: detail.modules.map((m) => ({
      "@type": "Syllabus",
      name: m.title,
      timeRequired: m.hours,
      teaches: m.topics,
    })),
  };
}

/** Fee pages get an Offer-first block so price appears in AI answers. */
export function offerSchema(course) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `${course.fullName} — course fee`,
    url: `${SITE_URL}/${course.slug}/fees`,
    price: course.feeNumeric,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    category: "Paid course",
    offeredBy: { "@id": ORG_ID_EXPORT },
    itemOffered: {
      "@type": "Course",
      name: course.fullName,
      url: `${SITE_URL}/${course.slug}`,
    },
  };
}

/** Generic WebPage wrapper — ties a page to the org and carries dateModified. */
export function webPageSchema({ path, name, description, modified }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORG_ID_EXPORT },
    inLanguage: "en-IN",
    dateModified: modified || new Date().toISOString().slice(0, 10),
  };
}

/** ItemList of upcoming batches — the shape answer engines read for "when". */
export function batchListSchema(batches) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Upcoming batches at Techtonic Lab",
    itemListElement: batches.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CourseInstance",
        name: `${b.course} — ${b.mode} batch starting ${b.start}`,
        courseMode: b.mode === "Online" ? "Online" : "Onsite",
        startDate: b.startISO,
        location: { "@type": "Place", name: `Techtonic Lab, ${b.campus}` },
        url: `${SITE_URL}/${b.slug}`,
      },
    })),
  };
}
