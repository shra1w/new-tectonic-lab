export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://techtoniccorporate.com";

export const brand = {
  name: "Techtonic Lab",
  legalName: "Skillcloud Solutions Pvt. Ltd.",
  cin: "U72900MH2021PTC[VERIFY]",
  tagline: "IT training institute in Nagpur",
  phone: "+91 87660 69947",
  phoneHref: "tel:+918766069947",
  email: "admin@techtoniccorporate.com",
  whatsapp:
    "https://wa.me/918766069947?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20the%20courses%20at%20Techtonic%20Lab.",
  lastUpdated: "1 August 2026",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/techtonic_lab" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61570667766428" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/techtonic-lab" },
  ],
};

// CRIT-4 — publish this exact string on GBP, JustDial, Sulekha, IndiaMart, socials.
export const offices = [
  {
    id: "head-office",
    label: "Head Office",
    area: "Somalwada",
    street:
      "SAI NIT-JIT PLAZA, Third Floor, Plot No. 10, Beltarodi Road, Near Gulmohar Restaurant, Manish Nagar, Somalwada",
    locality: "Nagpur",
    region: "Maharashtra",
    postalCode: "440037",
    hours: "Mon–Sat, 9:00 am – 8:00 pm",
    lat: 21.0839766,
    lng: 79.0799313,
    directions: "https://www.google.com/maps/search/?api=1&query=21.0839766,79.0799313",
    imagePath: "/photos/head-office.png",
  },
  {
    id: "branch-office",
    label: "Branch Office",
    area: "Jaitala Road",
    street:
      "Plot No. 81, First Floor, Hiranwar Layout, Near Mayur Kirana Store, Jaitala Road",
    locality: "Nagpur",
    region: "Maharashtra",
    postalCode: "440036",
    hours: "Mon–Sat, 9:00 am – 8:00 pm",
    lat: 21.1197,
    lng: 79.0102,
    directions:
      "https://www.google.com/maps/search/?api=1&query=Hiranwar+Layout+Jaitala+Road+Nagpur",
    imagePath: "/photos/branch-office.png",
  },
];

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "Courses",
    href: "/#courses",
    children: [
      {
        label: "Data Analytics",
        href: "/data-analytics-course",
        note: "SQL, Power BI/Tableau, Python, Advanced Excel, Statistics",
      },
      {
        label: "Data Science",
        href: "/data-science-course",
        note: "Python, ML, Deep Learning, NLP, GenAI & LLMs",
      },
      { label: "SAP", href: "/sap-course", note: "S/4HANA MM, FICO, PP/QM, Integration" },
    ],
  },
  { label: "Fees", href: "/fees" },
  { label: "Placements", href: "/placements" },
  { label: "Faculty", href: "/faculty" },
  { label: "About", href: "/aboutus" },
  { label: "Contact", href: "/connect-with-us" },
];

export const courses = [
  {
    slug: "data-analytics-course",
    name: "Data Analytics",
    fullName: "Data Analyst Course in Nagpur",
    flag: "Most enrolled",
    image: "/photos/courses/data-analytics.png",
    imageAlt: "Isometric illustration of analytics dashboards and bar charts in the Techtonic Lab lime-on-black style",
    blurb:
      "Learn the full analyst stack — Advanced Excel, SQL, Power BI or Tableau, Python, and Applied Statistics — on real datasets, then build a portfolio employers read.",
    duration: "6 months",
    durationMonths: 6,
    nextBatch: "18 August 2026",
    startDateISO: "2026-08-18",
    endDateISO: "2027-02-18",
    mode: "Classroom / Online / Weekend",
    fee: "₹49,999",
    feeNumeric: "49999",
    courseCode: "TL-DA-001",
    level: "Beginner to intermediate",
    tools: ["MySQL", "Power BI", "Tableau", "Python", "Advanced Excel", "AWS / Azure (Bonus)"],
    teaches: [
      "SQL database design, queries, joins, window functions & CTEs",
      "Power BI & Tableau interactive dashboards and DAX modeling",
      "Python programming, NumPy, Pandas, Matplotlib & Seaborn",
      "Applied statistics, probability & hypothesis testing",
      "Advanced Excel (VLOOKUP, XLOOKUP, Pivot Tables, Macros & VBA)",
      "Introduction to Cloud Services (AWS / Azure) and End-to-End Capstone Project",
    ],
    includes: [
      "6 months of training",
      "All learning material and datasets",
      "End-to-End industry portfolio projects",
      "1 month corporate grooming",
      "3 recorded mock interviews",
      "Placement preparation and referrals",
    ],
  },
  {
    slug: "data-science-course",
    name: "Data Science",
    fullName: "Data Science Course in Nagpur",
    flag: "Advanced track",
    image: "/photos/courses/data-science.png",
    imageAlt: "Isometric illustration of a neural-network node graph and a fitted model curve in the Techtonic Lab lime-on-black style",
    blurb:
      "Go past reporting into production AI — Python, machine learning, deep learning, NLP, and Generative AI/LLMs, taught through models you deploy.",
    duration: "9 months",
    durationMonths: 9,
    nextBatch: "25 August 2026",
    startDateISO: "2026-08-25",
    endDateISO: "2027-05-25",
    mode: "Classroom / Online / Weekend",
    fee: "₹89,999",
    feeNumeric: "89999",
    courseCode: "TL-DS-001",
    level: "Intermediate",
    tools: ["Python", "Pandas", "Scikit-Learn", "TensorFlow / PyTorch", "OpenCV", "LangChain & LLMs", "Flask / FastAPI / Streamlit", "Git & GitHub"],
    teaches: [
      "Advanced Python, EDA, Data Wrangling & Feature Engineering",
      "Supervised & Unsupervised Machine Learning with Scikit-Learn",
      "Deep Learning (ANN, CNN, RNN, LSTM) with TensorFlow/Keras",
      "Natural Language Processing (NLP) & Computer Vision (OpenCV)",
      "Generative AI, Prompt Engineering, LLMs, LangChain & RAG",
      "Model Deployment (Flask, FastAPI, Streamlit, Docker basics) & Cloud Fundamentals",
    ],
    includes: [
      "9 months of training",
      "All learning material and datasets",
      "End-to-End industry Capstone projects",
      "1 month corporate grooming",
      "3 recorded mock interviews",
      "Placement preparation, GitHub portfolio setup, and referrals",
    ],
  },
  {
    slug: "sap-course",
    name: "SAP",
    fullName: "SAP Course in Nagpur",
    flag: "Highest demand",
    image: "/photos/courses/sap.png",
    imageAlt: "Isometric illustration of connected SAP ERP module blocks and a process flow in the Techtonic Lab lime-on-black style",
    blurb:
      "Configure real SAP modules on live S/4HANA server access — featuring Sourcing & Procurement (MM), FICO, and PP-QM — taught by working consultants.",
    duration: "4 months",
    durationMonths: 4,
    nextBatch: "11 August 2026",
    startDateISO: "2026-08-11",
    endDateISO: "2026-12-11",
    mode: "Classroom / Online / Weekend",
    fee: "₹49,999",
    feeNumeric: "49999",
    feeNote: "per module",
    courseCode: "TL-SAP-001",
    level: "Beginner to intermediate",
    tools: ["SAP S/4HANA", "SAP MM (Sourcing & Procurement)", "SAP FICO", "SAP PP/QM", "SAP Fiori"],
    teaches: [
      "SAP S/4HANA MM: Purchasing, Inventory Management, Physical Inventory & Valuation",
      "SAP S/4HANA FICO: GL, Account Payable/Receivable, Asset Accounting & Controlling",
      "SAP S/4HANA PP/QM: Demand Management, MRP, Production Orders & Quality Inspection",
      "Pricing Procedure, Release Strategy, Document Splitting & GST/TDS Configuration",
      "Cross-Module Integration (MM-FI, MM-SD, PP-QM, PP-MM, QM-MM)",
      "System Landscape, ASAP Methodology, Tables, Reports & Real-Time Industry Case Studies",
    ],
    includes: [
      "4 months of training per module",
      "All learning material and documentation",
      "Live SAP S/4HANA server access from Day 1",
      "1 month corporate grooming",
      "3 recorded mock interviews",
      "Placement preparation and referrals",
    ],
  },
];

/* ---------------------------------------------------------------------------
   Fees & EMI — single source of truth.
   EMI is derived from each course's feeNumeric so the numbers can never drift
   from the price. Call emiPerMonth(course.feeNumeric) anywhere it is shown.
--------------------------------------------------------------------------- */

export const EMI_MONTHS = 6; // no-cost EMI tenure

export function formatINR(amount) {
  const n = Number(String(amount).replace(/[^\d.]/g, ""));
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function emiPerMonth(feeNumeric, months = EMI_MONTHS) {
  const n = Number(String(feeNumeric).replace(/[^\d.]/g, ""));
  if (!n || !months) return 0;
  return Math.ceil(n / months); // round up so the instalments always cover the fee
}

// Convenience map: { "data-analytics-course": { fee, feeNumeric, emi, emiText }, ... }
export const feeTable = courses.reduce((acc, c) => {
  const emi = emiPerMonth(c.feeNumeric);
  acc[c.slug] = {
    name: c.name,
    fee: c.fee,
    feeNumeric: c.feeNumeric,
    feeNote: c.feeNote || null,
    duration: c.duration,
    emi,
    emiText: `${formatINR(emi)}/mo × ${EMI_MONTHS}`,
  };
  return acc;
}, {});

export const differentiators = [
  {
    icon: "faculty",
    title: "Faculty who still work in the field",
    body: "Six instructors with a combined 72+ years across IT, ERP, business intelligence and HR. The SAP modules are taught by consultants who have run real implementations.",
  },
  {
    icon: "server",
    title: "Live SAP S/4HANA server access",
    body: "Every SAP learner gets individual credentials and configures in a real system from week two. Watching someone else's screen does not make a consultant.",
  },
  {
    icon: "price",
    title: "Published fees, published dates",
    body: "₹49,999 for SAP and Data Analytics, ₹89,999 for Data Science — every fee and every batch date is listed on the site. You should not have to fill a form to find out what something costs.",
  },
  {
    icon: "grooming",
    title: "A month of corporate grooming, included",
    body: "Resume and LinkedIn rebuilds, three recorded mock interviews with written feedback, aptitude practice and salary-negotiation coaching — a ₹29,999 programme built into the fee, not sold as an add-on.",
  },
  {
    icon: "projects",
    title: "Portfolio projects, not exercises",
    body: "You finish with four projects on real or realistic data, documented on GitHub and defensible in an interview. That is what a hiring manager reads.",
  },
  {
    icon: "modes",
    title: "Three ways to attend",
    body: "Classroom at either Nagpur campus, weekend batches for working professionals, or fully online live sessions — identical syllabus, identical faculty across all three.",
  },
];

// CRIT-5 — this is an alumni-outcome claim, never a partnership claim.
export const alumniEmployers = [
  {
    company: "InfoKrafts",
    logo: "/logos/infokraft.svg",
    invert: true,
    alumnus: "Pranal Rewatkar",
    role: "SAP MM Consultant",
  },
  {
    company: "Infosys",
    logo: "/logos/infosys.svg",
    invert: true,
    alumnus: null,
    role: null,
  },
  {
    company: "Capgemini",
    logo: "/logos/capgemini.svg",
    invert: true,
    alumnus: null,
    role: null,
  },
];

export const placements = [
  {
    initials: "PR",
    name: "Pranal Rewatkar",
    programme: "SAP MM",
    placedAs: "SAP MM Consultant",
    batch: "2025",
    employer: "InfoKrafts",
    background: "B.Com graduate with no prior ERP exposure",
    photo: "/alumni/pranal-rewatkar.PNG",
  },
  {
    initials: "AB",
    name: "Avinash Bawane",
    programme: "SAP MM",
    placedAs: "SAP MM Consultant",
    batch: "2025",
    background: "A procurement role, moved from end user to consultant",
    photo: "/alumni/avinash-bawane.PNG",
  },
  {
    initials: "AS",
    name: "Ayush Sorte",
    programme: "SAP FICO",
    placedAs: "SAP FICO Consultant",
    batch: "2025",
    background: "An accounts background and a first technical role",
    photo: "/alumni/ayush-sorte.PNG",
  },
  {
    initials: "DB",
    name: "Dhanashree Bhoj",
    programme: "SAP MM",
    placedAs: "SAP MM Consultant",
    batch: "2025",
    background: "A weekend batch, trained while employed full time",
    photo: "/alumni/dhanashree-bhoj.PNG",
  },
  {
    initials: "ND",
    name: "Neha Deshmukh",
    programme: "Data Analytics",
    placedAs: "Data Analyst",
    batch: "2025",
    background: "A commerce graduate who had never written a line of SQL",
    photo: "/alumni/neha-deshmukh.PNG",
  },
  {
    initials: "DD",
    name: "Dipali Dahane",
    programme: "Data Analytics",
    placedAs: "Data Analyst",
    batch: "2025",
    background: "A fresh graduate with no technical background",
    photo: "/alumni/dipali-dahane.PNG",
  },
  {
    initials: "UP",
    name: "Utkarsh Paliwal",
    programme: "Data Analytics",
    placedAs: "Data Analyst",
    batch: "2026",
    background: "An engineering graduate looking for a route into analytics",
    photo: "/alumni/utkarsh-paliwal.PNG",
  },
  {
    initials: "GT",
    name: "Gaurav Tagde",
    programme: "Data Analytics",
    placedAs: "Data Analyst",
    batch: "2026",
    background: "A fresh graduate, four portfolio projects and no experience",
    photo: "/alumni/gaurav-tagde.PNG",
  },
  {
    initials: "AP",
    name: "Aman Pathan",
    programme: "SAP MM",
    placedAs: "SAP MM Consultant",
    batch: "2026",
    background: "A weekend batch taken alongside a full-time job",
    photo: "/alumni/aman-pathan.PNG",
  },
  {
    initials: "AG",
    name: "Atul Gaiki",
    programme: "SAP FICO",
    placedAs: "SAP FICO Consultant",
    batch: "2026",
    background: "An accounts executive who wanted the configuration side",
    photo: "/alumni/atul-gaiki.PNG",
  },
  {
    initials: "AT",
    name: "Aniket Telrandhe",
    programme: "SAP MM",
    placedAs: "SAP MM Consultant",
    batch: "2026",
    background: "An engineering graduate, first role in ERP",
    photo: "/alumni/aniket-telrandhe.PNG",
  },
];

export const placementStats = {
  named: placements.length,
  courses: [...new Set(placements.map((p) => p.programme))].length,
  years: [...new Set(placements.map((p) => p.batch))].sort(),
  commonRole: "SAP MM Consultant",
};

export const homePlacements = placements.slice(0, 6);

export const testimonials = [
  {
    initials: "PR",
    name: "Pranal Rewatkar",
    role: "SAP MM Consultant, InfoKrafts",
    course: "SAP MM",
    verified: true,
    quote:
      "Thanks to Techtonic Lab's expert training and strong industry connections, I got placed at InfoKrafts in no time!",
  },
  {
    initials: "ND",
    name: "Neha Deshmukh",
    role: "Data Analyst",
    course: "Data Analytics",
    quote:
      "I came in from a commerce background and had never written a line of SQL. The Excel-first sequence meant I was building dashboards by week six instead of being lost in Python on day one.",
  },
  {
    initials: "AS",
    name: "Ayush Sorte",
    role: "SAP FICO Consultant",
    course: "SAP FICO",
    quote:
      "Getting my own S/4HANA login in week two changed everything. Configuring a company code myself is what I actually talked about in my interview.",
  },
  {
    initials: "UP",
    name: "Utkarsh Paliwal",
    role: "Data Analyst",
    course: "Data Analytics",
    quote:
      "The mock interviews were harder than the real one. Three recorded rounds with written feedback, and by the third I had stopped rambling.",
  },
  {
    initials: "AB",
    name: "Avinash Bawane",
    role: "SAP MM Consultant",
    course: "SAP MM",
    quote:
      "I was already raising purchase orders at work without understanding what sat behind the screen. Learning the configuration side is what moved me from end user to consultant.",
  },
  {
    initials: "DB",
    name: "Dhanashree Bhoj",
    role: "SAP MM Consultant",
    course: "SAP MM",
    quote:
      "Weekend batches meant I never had to leave my job while I trained. Same faculty, same server access, same syllabus as the weekday batch.",
  },
];

export const faculty = [
  {
    initials: "MP",
    name: "Manish Pimpale",
    title: "Faculty — IT, Database Management and AI",
    years: "27+ years",
    yearsNum: 27,
    linkedin: null,
    teaches: ["Data Analytics", "Data Science"],
    bio: "Twenty-seven years in IT, database management, artificial intelligence and cloud solutions. Teaches SQL, database design and the applied-AI module.",
    tags: ["SQL", "Databases", "Applied AI"],
    highlights: [
      "SQL, database design and data modelling",
      "Applied AI and cloud fundamentals",
      "Teaches on Data Analytics and Data Science",
    ],
    photo: "/faculty/manish-pimpale.png",
  },
  {
    initials: "SW",
    name: "Shrawan Wankhede",
    title: "Faculty — SAP, ERP and Supply Chain",
    years: "12+ years",
    yearsNum: 12,
    linkedin: "https://www.linkedin.com/in/shrawan-wankhede-83bb6586/",
    teaches: ["SAP"],
    bio: "Twelve years in IT consulting, ERP implementation and supply chain. Runs the SAP MM module and the cross-module integration sessions.",
    tags: ["SAP MM", "SAP PP/QM", "ERP integration"],
    highlights: [
      "SAP S/4HANA, ECC and ERP implementation",
      "Supply chain lead across FMCG, manufacturing and oil & gas",
      "MSc Supply Chain, Mumbai University",
    ],
    photo: "/faculty/shrawan-wankhede.png",
  },
  {
    initials: "ST",
    name: "Sudhir Talekar",
    title: "Faculty — Business Intelligence and Corporate Strategy",
    years: "12+ years",
    yearsNum: 12,
    linkedin: "https://www.linkedin.com/in/sudhir-talekar/",
    teaches: ["Data Analytics", "Data Science", "SAP"],
    bio: "Eleven years as a practising SAP FICO consultant across manufacturing and services implementations. Teaches the finance and controlling configuration track on live S/4HANA.",
    tags: ["SAP FICO", "S/4HANA", "Financial close"],
    highlights: [
      "Business intelligence, market research and strategy",
      "Corporate grooming and leadership mentoring",
      "Global client relations across the US, UK and Europe",
    ],
    photo: "/faculty/sudhir-talekar.png",
  },
  {
    initials: "DT",
    name: "Dnyaneshwari Lanjewar",
    title: "Head of HR, Training and Development",
    years: "10+ years",
    yearsNum: 10,
    linkedin: null,
    teaches: ["Data Analytics", "Data Science", "SAP"],
    bio: "Leads recruitment, learner counselling and the corporate grooming month. Ten years across HR, recruitment and learning-and-development in IT services.",
    tags: ["Corporate grooming", "Interview preparation"],
    highlights: [
      "Runs the corporate grooming month",
      "Resume, LinkedIn and mock interviews",
      "Counselling and placement preparation",
    ],
    photo: "/faculty/dnyaneshwari-lanjewar.png",
  },
  {
    initials: "HW",
    name: "Harshal Wankhede",
    title: "Faculty — Data Science and Machine Learning",
    years: "7+ years",
    yearsNum: 7,
    linkedin: null,
    needsVerification: true,
    teaches: ["Data Science"],
    bio: "Seven years building and deploying models in production, mostly in retail forecasting and risk. Runs the machine-learning and model-evaluation modules.",
    tags: ["Python", "scikit-learn", "Model deployment"],
    highlights: [
      "Machine learning with scikit-learn",
      "Model evaluation and deployment",
      "Retail forecasting and risk models",
    ],
    photo: "/faculty/harshal-wankhede.png",
  },
  {
    initials: "VK",
    name: "Vivek Khubalkar",
    title: "Faculty — Data Analytics and Business Intelligence",
    years: "5+ years",
    yearsNum: 5,
    linkedin: "https://www.linkedin.com/in/vivek-khubalkar/",
    teaches: ["Data Analytics"],
    bio: "Five years in analytics and reporting across BI teams, plus classroom teaching. Runs the Excel, Power BI and Tableau track and reviews every portfolio project.",
    tags: ["Power BI", "Tableau", "Excel"],
    highlights: [
      "Power BI dashboards and real-time reporting",
      "SQL, querying and database fundamentals",
      "5+ years across industry and classroom teaching",
    ],
    photo: "/faculty/vivek-khubalkar.png",
  },
];

export const facultyYearsTotal = faculty.reduce((n, f) => n + f.yearsNum, 0);

export const districts = [
  "Nagpur", "Wardha", "Bhandara", "Gondia", "Chandrapur", "Gadchiroli",
  "Amravati", "Akola", "Yavatmal", "Washim", "Buldhana",
];

export const grooming = {
  intro:
    "Technical skill gets you the interview. The month after your course ends is about everything that gets you the offer — how you present a project, how you answer a question you do not know, and how you talk about money without flinching.",
  standalonePrice: "₹29,999",
  standalonePriceNumeric: "29999",
  pillars: [
    {
      icon: "interview",
      title: "Interview grooming",
      body: "Three recorded mock interviews with written feedback, plus a line-by-line resume and LinkedIn rebuild.",
    },
    {
      icon: "workplace",
      title: "Workplace readiness",
      body: "Business communication, email etiquette, documentation habits and how corporate systems actually work.",
    },
  ],
  chips: [
    "Resume rebuild",
    "LinkedIn optimisation",
    "3 mock interviews",
    "Aptitude practice",
    "Salary negotiation",
  ],
};

export const faqs = [
  {
    q: "What IT courses does Techtonic Lab offer in Nagpur?",
    a: "Techtonic Lab runs three job-oriented programmes: Data Analytics (6 months), Data Science (9 months), and SAP (4 months per module — FICO, MM Sourcing & Procurement, and PP/QM). Every programme includes a month of corporate grooming and placement preparation, and each is available as a classroom, online or weekend batch.",
  },
  {
    q: "What does a course at Techtonic Lab cost?",
    a: `Fees are published per course: Data Analytics is ₹49,999 for 6 months, Data Science is ₹89,999 for 9 months, and each SAP module is ₹49,999 for 4 months. Every fee is all-inclusive — training, learning material, project datasets or SAP S/4HANA server access, the corporate grooming month (a ₹29,999 programme, included free) and placement preparation, with no separate registration, examination or certificate charges. A ${EMI_MONTHS}-month no-cost EMI is available: about ${formatINR(emiPerMonth("49999"))} per month for the ₹49,999 courses and ${formatINR(emiPerMonth("89999"))} per month for Data Science.`,
  },
  {
    q: "Are the courses suitable for complete beginners?",
    a: "Yes. The Data Analytics and SAP courses assume no prior technical background — Data Analytics opens with Excel, and SAP's functional modules are business configuration rather than programming. Data Science is the one course where prior comfort with mathematics genuinely helps, though it still teaches Python from the beginning.",
  },
  {
    q: "Does Techtonic Lab guarantee placement?",
    a: "No. Techtonic Lab provides placement assistance, not a placement guarantee. That means resume and LinkedIn rebuilds, recorded mock interviews, aptitude practice and referrals to hiring contacts. Any institute promising a guaranteed job or an assured salary should be treated with caution — outcomes always depend on individual performance and the hiring market.",
  },
  {
    q: "Will I receive a certificate after completing the course?",
    a: "Yes, you receive a Techtonic Lab course-completion certificate. We also guide you towards the relevant vendor certification — Microsoft PL-300 for Power BI, or official SAP module certification — which carries considerably more weight with employers than any institute certificate on its own.",
  },
  {
    q: "Can I attend from outside Nagpur?",
    a: "Yes. Students from Wardha, Bhandara, Chandrapur, Amravati, Gondia and across Vidarbha attend either the weekend classroom batch at one of the two Nagpur campuses, or the fully online live batch. All three modes use the same syllabus, faculty and project reviews.",
  },
  {
    q: "Is a data analyst course hard to learn?",
    a: "It is demanding but not mathematically hard. The real difficulty is consistency — around 6 to 8 hours of practice a week outside class. The concepts are business logic rather than advanced mathematics, which is why learners from commerce and arts backgrounds complete it every batch.",
  },
  {
    q: "How do I contact Techtonic Lab?",
    a: "Call or WhatsApp +91 87660 69947, email admin@techtoniccorporate.com, or visit either campus: the head office at SAI NIT-JIT PLAZA, Third Floor, Manish Nagar, Somalwada, or the branch office on Jaitala Road. Both are open Monday to Saturday, 9:00 am to 8:00 pm.",
  },
];

export const footerLinks = {
  Courses: [
    { label: "Data Analyst course in Nagpur", href: "/data-analytics-course" },
    { label: "Data Science course in Nagpur", href: "/data-science-course" },
    { label: "SAP course in Nagpur", href: "/sap-course" },
    { label: "Course fees", href: "/fees" },
    { label: "Batch schedule", href: "/batches" },
  ],
  Institute: [
    { label: "About Techtonic Lab", href: "/aboutus" },
    { label: "Meet the faculty", href: "/faculty" },
    { label: "Placement records", href: "/placements" },
    { label: "Hire from us", href: "/hire-from-us" },
    { label: "Contact us", href: "/connect-with-us" },
  ],

  "SAP modules": [
    { label: "SAP FICO course in Nagpur", href: "/sap-course/fico" },
    { label: "SAP MM course in Nagpur", href: "/sap-course/mm" },
    { label: "SAP SD course in Nagpur", href: "/sap-course/sd" },
    { label: "SAP PP/QM course in Nagpur", href: "/sap-course/pp-qm" },
    { label: "Full SAP syllabus", href: "/sap-course/syllabus" },
  ],
};

export const quickFacts = [
  // { value: String(placements.length), label: "Named alumni placed, on record" },
  { value: `${facultyYearsTotal}+`, unit: "yrs", label: "Combined faculty experience" },
  { value: "3", label: "Courses — Data Analytics, Data Science, SAP" },
  { value: "₹49,999", unit: "onwards", label: "All-inclusive, published fees" },
  { value: "4–9", unit: "months", label: "Programme length, by course" },
  { value: "2", label: "Campuses in Nagpur" },
];

export const DISCLAIMER =
  "Techtonic Lab provides placement assistance, not a placement guarantee. Outcomes depend on individual performance, batch, and market conditions at the time of hiring.";

export const chatbot = {
  number: "917000026612", // TODO: replace with the full chatbot number
  greeting: "Hi! I'd like to know about the courses at Techtonic Lab.",
};

export function whatsappLink(source = "site") {
  const text = `${chatbot.greeting}`;
  return `https://wa.me/${chatbot.number}?text=${encodeURIComponent(text)}`;
}