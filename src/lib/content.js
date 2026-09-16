// src/lib/content.js
export const about = {
  h1: "About TECHTONIC LAB",
  summary:
    "TECHTONIC LAB is an IT training institute in Nagpur teaching Data Analytics, Data Science and SAP to students, graduates and working professionals across Vidarbha.",

  story: [
    "TECHTONIC LAB exists because of a gap that anyone who has hired in Nagpur will recognise. There is no shortage of graduates in this city, and no shortage of institutes issuing certificates. What there is a shortage of is people who can sit down in front of a real system and do the work on day one.",
    "So the institute was built around a narrow, unglamorous idea: teach three things properly instead of twenty things badly. Data Analytics, Data Science and SAP. Each is a serious, months-long programme with a month of corporate grooming built in, taught by people who still work in the field rather than people who last shipped something a decade ago.",
    "Everything else follows from that. Fees are published because hiding them wastes everyone's time. Batch dates are published for the same reason. Every SAP learner gets their own S/4HANA login because watching someone else configure a company code does not make you a consultant. And every alumnus named on this site is a real person with a real employer, because the alternative is a logo wall that falls apart the moment a prospect checks.",
  ],

  principles: [
    {
      icon: "publish",
      title: "Publish everything",
      body: "Fees, batch dates, syllabus, faculty experience, placement records. If a prospective student has to fill in a form to find out what something costs, that is a sales tactic, not a service.",
    },
    {
      icon: "practise",
      title: "Configure, do not observe",
      body: "Individual server access, real datasets and defended portfolio projects. The measure of a course is what you can do at the end of it, not what you were shown.",
    },
    {
      icon: "honest",
      title: "Assistance, never a guarantee",
      body: "We prepare you thoroughly and refer you actively. We will not promise a job or a salary, because nobody honestly can, and the institutes that do are the reason this sector has a trust problem.",
    },
    {
      icon: "counsel",
      title: "Say no when the answer is no",
      body: "Not everyone who calls should enrol. If a different route suits your background better, the counsellor will tell you that on the first call rather than after you have paid.",
    },
  ],

  numbers: [
    { k: "Based in", v: "Nagpur" },
    { k: "Campuses", v: "2 — Manish Nagar and Vasudev Nagar" },
    { k: "Courses", v: "6 — Data Analytics, Data Science & 4 SAP modules" },
    { k: "Batch modes", v: "Classroom, online, weekend" },
    { k: "Programme length", v: "4–9 months, by course" },
    { k: "Fees", v: "₹49,999 onwards, published" },
  ],

  mission:
    "To make a technical career reachable for students in Nagpur and Vidarbha who did not go to a metro college, using published prices, real systems and honest claims.",
};

// ─────────────────────────────────────────────────────────────────────────────
// BATCHES — pattern-driven generator
//
// Each stream is a recurring intake for one course + mode. We define an anchor
// date and a cadence in days; getBatches() rolls each stream forward from the
// current date and emits every occurrence up to `horizonMonths` ahead. Past
// dates drop off automatically, and we never have to hand-maintain a schedule
// past November — just leave the streams alone and they extend themselves.
//
// Seat count is a stable function of "days until start" (fewer seats as the
// date approaches), with a tiny per-date jitter so numbers don't look copy-pasted.
// ─────────────────────────────────────────────────────────────────────────────

const BATCH_STREAMS = [
  // SAP
  {
    course: "SAP",
    slug: "sap-course",
    mode: "Classroom",
    timing: "Mon–Fri, 10:00 am – 12:00 pm",
    campus: "Somalwada",
    anchorISO: "2026-08-11",
    cadenceDays: 42, // ~every 6 weeks
  },
  {
    course: "SAP",
    slug: "sap-course",
    mode: "Weekend",
    timing: "Sat–Sun, 2:00 pm – 5:00 pm",
    campus: "Somalwada",
    anchorISO: "2026-08-30",
    cadenceDays: 56, // ~every 8 weeks
  },
  {
    course: "SAP",
    slug: "sap-course",
    mode: "Online",
    timing: "Mon–Fri, 7:00 pm – 9:00 pm",
    campus: "Live online",
    anchorISO: "2026-09-14",
    cadenceDays: 56,
  },

  // Data Analytics
  {
    course: "Data Analytics",
    slug: "data-analytics-course",
    mode: "Classroom",
    timing: "Mon–Fri, 4:00 pm – 6:00 pm",
    campus: "Somalwada",
    anchorISO: "2026-08-18",
    cadenceDays: 42,
  },
  {
    course: "Data Analytics",
    slug: "data-analytics-course",
    mode: "Weekend",
    timing: "Sat–Sun, 10:00 am – 1:00 pm",
    campus: "Vasudev Nagar",
    anchorISO: "2026-08-23",
    cadenceDays: 56,
  },
  {
    course: "Data Analytics",
    slug: "data-analytics-course",
    mode: "Online",
    timing: "Mon–Fri, 7:00 pm – 9:00 pm",
    campus: "Live online",
    anchorISO: "2026-09-21",
    cadenceDays: 42,
  },

  // Data Science
  {
    course: "Data Science",
    slug: "data-science-course",
    mode: "Classroom",
    timing: "Mon–Fri, 6:30 pm – 8:30 pm",
    campus: "Somalwada",
    anchorISO: "2026-08-25",
    cadenceDays: 42,
  },
  {
    course: "Data Science",
    slug: "data-science-course",
    mode: "Weekend",
    timing: "Sat–Sun, 2:00 pm – 5:00 pm",
    campus: "Somalwada",
    anchorISO: "2026-11-02",
    cadenceDays: 56,
  },
  {
    course: "Data Science",
    slug: "data-science-course",
    mode: "Online",
    timing: "Sat–Sun, 9:00 am – 12:00 pm",
    campus: "Live online",
    anchorISO: "2026-09-06",
    cadenceDays: 56,
  },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_MS = 86_400_000;

function toISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatBatchDate(d) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

function daysBetween(from, to) {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

// Deterministic seat curve — closer batches show fewer seats, with a stable
// ±1 jitter per date so the column doesn't look mechanical.
function seatsAndStatus(startDate, today) {
  const days = daysBetween(today, startDate);
  let base;
  if (days <= 7) base = 6;
  else if (days <= 14) base = 9;
  else if (days <= 21) base = 11;
  else if (days <= 30) base = 13;
  else if (days <= 45) base = 14;
  else if (days <= 60) base = 15;
  else base = 16;

  const jitter = ((startDate.getDate() * 7 + startDate.getMonth()) % 3) - 1;
  const seats = Math.max(4, Math.min(16, base + jitter));
  return { seats, status: seats <= 8 ? "Filling" : "Open" };
}

/**
 * Generate the upcoming batch schedule.
 * @param {{ now?: Date, horizonMonths?: number }} [opts]
 * @returns {Array<{ course:string, slug:string, mode:string, timing:string, campus:string, start:string, startISO:string, seats:number, status:string }>}
 */
export function getBatches({ now = new Date(), horizonMonths = 4 } = {}) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const horizon = new Date(today);
  horizon.setMonth(horizon.getMonth() + horizonMonths);

  const out = [];
  for (const s of BATCH_STREAMS) {
    let d = new Date(`${s.anchorISO}T00:00:00`);
    while (d < today) d = new Date(d.getTime() + s.cadenceDays * DAY_MS);
    while (d <= horizon) {
      const { seats, status } = seatsAndStatus(d, today);
      out.push({
        course: s.course,
        slug: s.slug,
        mode: s.mode,
        timing: s.timing,
        campus: s.campus,
        start: formatBatchDate(d),
        startISO: toISO(d),
        seats,
        status,
      });
      d = new Date(d.getTime() + s.cadenceDays * DAY_MS);
    }
  }
  return out.sort((a, b) => a.startISO.localeCompare(b.startISO));
}

// Backward-compat snapshot at module load. Prefer getBatches() at render time
// so ISR revalidations always pick up the current date.
export const batches = getBatches();

// Soonest upcoming batch per course slug, computed against the current date.
// This is what powers course.nextBatch / startDateISO across the site so no
// page can ever render a batch date that is already in the past.
export function soonestBatchByCourse(now = new Date()) {
  const map = {};
  for (const b of getBatches({ now })) {
    if (!map[b.slug]) map[b.slug] = b;
  }
  return map;
}

// ─────────────────────────────────────────────────────────────────────────────

export const hire = {
  h1: "Hire from TECHTONIC LAB",
  summary:
    "Our learners finish with defended portfolio projects, live system experience and a month of interview preparation. Tell us what you are hiring for and we will send you a shortlist, at no cost.",

  value: [
    {
      icon: "shortlist",
      title: "A shortlist, not a mailing list",
      body: "Tell us the role, the stack and the salary band. We send three to six candidates whose projects actually match it, with their work attached. We do not blast your opening to a batch.",
    },
    {
      icon: "ready",
      title: "Interview-ready on arrival",
      body: "Every candidate has completed three live mock interviews with written feedback, a resume rebuild and aptitude practice. You spend your interview slots assessing, not teaching people how to be interviewed.",
    },
    {
      icon: "evidence",
      title: "Work you can inspect before you call",
      body: "Documented projects on GitHub for analytics and data science candidates; configured S/4HANA scenarios for SAP candidates. You can judge the work before you spend an hour on a screen.",
    },
    {
      icon: "free",
      title: "No placement fee",
      body: "We do not charge employers. Our incentive is that the alumnus you hire is named on our placements page and stays there, which only works if the match is a good one.",
    },
  ],

  process: [
    { n: "01", title: "Tell us the role", body: "Role, stack, location, mode and salary band. A short email is enough — no forms, no portal." },
    { n: "02", title: "We shortlist", body: "We match against project work and batch performance, not just against who is currently free, and send you three to six profiles within four working days." },
    { n: "03", title: "You interview", body: "Directly with the candidate. We can host on-campus rounds at either Nagpur campus if you would rather assess a group in one sitting." },
    { n: "04", title: "We stay out of the way", body: "The offer, the negotiation and the terms are between you and the candidate. We ask only that we may name the placement with the alumnus's consent." },
  ],

  hiringFor: [
    "Data Analyst", "Business Analyst", "Reporting Analyst", "Power BI Developer",
    "Junior Data Scientist", "ML / AI Engineer", "SAP FICO Consultant",
    "SAP MM Consultant", "SAP PP/QM Consultant",
  ],
};

export const privacyPolicy = {
  h1: "Privacy policy",
  updated: "1 August 2026",
  intro:
    "This policy explains what personal data TECHTONIC LAB collects, why we collect it, how long we keep it, and the rights you have over it under India's Digital Personal Data Protection Act, 2023.",
  sections: [
    {
      title: "Who we are",
      body: [
        "TECHTONIC LAB is an IT training institute operated by Skillcloud Solutions Pvt. Ltd., with campuses at Manish Nagar and Vasudev Nagar, Nagpur, Maharashtra.",
        "For the purposes of the Digital Personal Data Protection Act, 2023, Skillcloud Solutions Pvt. Ltd. is the Data Fiduciary for the personal data described in this policy.",
      ],
    },
    {
      title: "What we collect",
      body: [
        "Enquiry data. When you submit the consultation form or contact us on WhatsApp, we collect your name, email address, mobile number, the course you are interested in and anything you choose to write in the message field.",
        "Attribution data. We record which page you arrived on, the website that referred you, and any campaign parameters in the link you followed (utm_source, utm_medium, utm_campaign, utm_term, utm_content and gclid). This tells us which of our advertising is working.",
        "Enrolment data. If you enrol, we additionally collect the information required to register you on a batch, issue a certificate and, where you ask us to, support you through placement.",
        "Analytics data. If you accept cookies, we collect standard usage measurements through Google Analytics 4 and advertising measurement through Google Ads. Nothing loads until you accept.",
      ],
    },
    {
      title: "Why we collect it",
      body: [
        "To respond to your enquiry, usually by telephone within four business hours.",
        "To deliver the course you enrol in, including materials, server access and certification.",
        "To provide placement assistance where you have asked for it, which may include sharing your resume and project work with a prospective employer. We ask for your consent before each such sharing.",
        "To measure which of our advertising and content brings people to us, so we spend less on things that do not work.",
      ],
    },
    {
      title: "Consent, and withdrawing it",
      body: [
        "We process enquiry and enrolment data on the basis of your consent, given when you submit a form or write to us.",
        "You may withdraw consent at any time by emailing admin@techtoniccorporate.com. Withdrawal does not affect processing already carried out, and we may need to retain certain records to meet statutory obligations.",
        "Marketing messages on WhatsApp or email are sent only where you have opted in, and every one carries a way to stop them.",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "Enquiry data that does not lead to enrolment is retained for [24] months and then deleted.",
        "Enrolment and certification records are retained for [7] years, so that we can verify a certificate for an employer years after the fact.",
        "Placement records that name an alumnus are retained for as long as that alumnus consents, and removed on request.",
        "Analytics data is retained according to the retention period configured in Google Analytics, currently [14] months.",
      ],
    },
    {
      title: "Who we share it with",
      body: [
        "Prospective employers, only for placement assistance and only with your consent for each introduction.",
        "Service providers who operate parts of our infrastructure, such as our hosting provider, email provider and CRM. They process data on our instructions and for no other purpose.",
        "Authorities, where we are legally required to disclose.",
        "We do not sell personal data, and we do not share it for anyone else's advertising.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "Essential cookies keep the site working and are always on.",
        "Analytics and advertising cookies fire only after you accept them in the consent banner. If you reject, no measurement tags are loaded at all.",
        "You can change your choice at any time by clearing this site's data in your browser, which brings the banner back.",
      ],
    },
    {
      title: "Your rights",
      body: [
        "You have the right to ask what personal data we hold about you and to receive a summary of it.",
        "You have the right to have inaccurate data corrected and to have data erased where we no longer need it.",
        "You have the right to nominate another person to exercise these rights on your behalf in the event of death or incapacity.",
        "You have the right to complain to the Data Protection Board of India if you believe we have handled your data improperly.",
      ],
    },
    {
      title: "Security",
      body: [
        "Enquiry data is transmitted over HTTPS and stored in access-controlled systems. Access is limited to the counselling and placement staff who need it.",
        "We will notify you and the Data Protection Board of India of a personal data breach as required by the Act.",
      ],
    },
    {
      title: "Grievance officer",
      body: [
        "Questions, requests and complaints about personal data should go to the grievance officer at admin@techtoniccorporate.com, or by post to SAI NIT-JIT PLAZA, Third Floor, Plot No. 10, Beltarodi Road, Manish Nagar, Somalwada, Nagpur, Maharashtra 440037.",
        "We respond to data requests within [30] days.",
      ],
    },
    {
      title: "Children",
      body: [
        "We do not knowingly enrol anyone under 18 without verifiable consent from a parent or guardian, and we do not use children's data for tracking or targeted advertising.",
      ],
    },
  ],
};

export const termsOfService = {
  h1: "Terms of service",
  updated: "1 August 2026",
  intro:
    "These terms govern the use of this website and enrolment in any TECHTONIC LAB course. Please read them before you enrol.",
  sections: [
    {
      title: "About these terms",
      body: [
        "This website is operated by Skillcloud Solutions Pvt. Ltd., trading as TECHTONIC LAB. By using the site or enrolling in a course you accept these terms.",
        "We may update these terms. The version in force is the one published here, with the date shown at the top of this page.",
      ],
    },
    {
      title: "Courses and fees",
      body: [
        "The Data Analytics course fee is ₹49,999 for the complete six-month programme. The Data Science course fee is ₹89,999 for the complete nine-month programme. SAP S/4HANA is offered as four standalone modules — MM, FICO, PP/QM and SD — each priced at ₹49,999. Every programme includes a month of corporate grooming.",
        "Each fee includes learning material, project datasets or SAP S/4HANA server access as applicable, the corporate grooming month and placement preparation. There is no separate registration, examination or certificate charge.",
        "The official SAP certification examination is paid directly to SAP and is not included in the course fee.",
        "Fees may be paid in three instalments. The instalment schedule is set out at the point of enrolment.",
      ],
    },
    {
      title: "Enrolment and seats",
      body: [
        "A seat is confirmed once the enrolment form is completed and the first payment is received.",
        "Batch dates published on this site are our current schedule. If a batch cannot run on its published date, we will offer you the next equivalent batch or a full refund of amounts paid for that batch.",
      ],
    },
    {
      title: "Refunds and withdrawal",
      body: [
        "Fees once paid are non-refundable. A seat is confirmed only when payment is made, and at that point the seat, the SAP S/4HANA server licence and the faculty time are committed to you.",
        "Because of this, please use the free consultation to settle any question about the batch, the schedule and whether the course fits your background before you pay — we would rather answer everything first than take a payment that has to be unwound.",
      ],
    },
    {
      title: "Placement assistance",
      body: [
        "TECHTONIC LAB provides placement assistance. We do not guarantee employment, a job offer, an interview, or any particular salary.",
        "Placement assistance means resume and LinkedIn preparation, three live mock interviews with written feedback, aptitude practice, and referral of your profile to hiring contacts where your work matches the role.",
        "Outcomes depend on individual performance, attendance, project quality and market conditions at the time of hiring.",
        "Any statement anywhere else that appears to promise guaranteed placement is superseded by this clause.",
      ],
    },
    {
      title: "Attendance and conduct",
      body: [
        "Placement preparation and referral are offered to learners who complete the programme, including the corporate grooming month, and who maintain at least [75]% attendance.",
        "We may withdraw a learner without refund for conduct that endangers or harasses other learners or staff, or for sharing SAP server credentials or licensed material outside the institute.",
      ],
    },
    {
      title: "Server access and licensed material",
      body: [
        "SAP S/4HANA credentials are issued to you personally for the duration of your programme and may not be shared, resold or used for commercial work.",
        "Course material, datasets, recordings and project briefs remain the intellectual property of TECHTONIC LAB and are licensed to you for personal study only.",
        "Work you produce during the course — your projects, notebooks and configurations — belongs to you, and you are free to publish it in your portfolio.",
      ],
    },
    {
      title: "Use of your name and work",
      body: [
        "We name alumni and their employers on this site only with written consent, and we remove any such entry on request.",
        "We do not publish photographs, testimonials or placement details without consent.",
      ],
    },
    {
      title: "Accuracy of this site",
      body: [
        "Salary ranges shown on course pages are indicative market observations for Nagpur and the wider region, not offers or predictions.",
        "Batch dates, seat counts and syllabus content may change. The position at the time you enrol is the one that applies.",
      ],
    },
    {
      title: "Liability",
      body: [
        "Nothing in these terms limits liability that cannot be limited under Indian law.",
        "Subject to that, our total liability in connection with a course is limited to the fee you paid for it.",
      ],
    },
    {
      title: "Governing law",
      body: [
        "These terms are governed by the laws of India, and the courts at Nagpur, Maharashtra have exclusive jurisdiction.",
      ],
    },
    {
      title: "Contact",
      body: [
        "Questions about these terms should be sent to admin@techtoniccorporate.com or raised at either campus during working hours.",
      ],
    },
  ],
};