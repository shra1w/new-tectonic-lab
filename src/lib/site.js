

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
    imagePath:"/photos/head-office.png"
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
      imagePath:"/photos/branch-office.png"
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
        note: "Excel, SQL, Python, Power BI, Tableau",
      },
      {
        label: "Data Science",
        href: "/data-science-course",
        note: "Python, machine learning, statistics",
      },
      { label: "SAP", href: "/sap-course", note: "FICO, MM, SD, PP/QM, S/4HANA" },
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
    blurb:
      "Learn the full analyst stack — Excel, SQL, Python, Power BI and Tableau — on real datasets, then build a portfolio employers read.",
    duration: "4 months",
    nextBatch: "18 August 2026",
    startDateISO: "2026-08-18",
    endDateISO: "2026-12-18",
    mode: "Classroom / Online / Weekend",
    fee: "₹49,999",
    feeNumeric: "49999",
    courseCode: "TL-DA-001",
    level: "Beginner to intermediate",
    tools: ["Microsoft Excel", "SQL", "Python", "Microsoft Power BI", "Tableau Desktop"],
    teaches: [
      "Python programming for data analysis",
      "SQL for data querying",
      "Microsoft Excel for analytics",
      "Power BI dashboards",
      "Tableau visualisations",
      "Applied statistics and hypothesis testing",
    ],
    includes: [
      "4 months of training",
      "All learning material and datasets",
      "4 portfolio projects",
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
    blurb:
      "Go past reporting into prediction — Python, statistics and machine learning, taught through models you deploy rather than models you read about.",
    duration: "4 months",
    nextBatch: "25 August 2026",
    startDateISO: "2026-08-25",
    endDateISO: "2026-12-25",
    mode: "Classroom / Online / Weekend",
    fee: "₹49,999",
    feeNumeric: "49999",
    courseCode: "TL-DS-001",
    level: "Intermediate",
    tools: ["Python", "pandas", "scikit-learn", "SQL", "Statistics"],
    teaches: [
      "Python for data science",
      "Applied statistics and probability",
      "Machine learning with scikit-learn",
      "Data wrangling with pandas",
      "Model evaluation and deployment",
    ],
    includes: [
      "4 months of training",
      "All learning material and datasets",
      "4 portfolio projects",
      "1 month corporate grooming",
      "3 recorded mock interviews",
      "Placement preparation and referrals",
    ],
  },
  {
    slug: "sap-course",
    name: "SAP",
    fullName: "SAP Course in Nagpur",
    flag: "Highest demand",
    blurb:
      "Configure real SAP modules on live S/4HANA server access — the ERP skill Indian employers hire for fastest, taught by working consultants.",
    duration: "4 months",
    nextBatch: "11 August 2026",
    startDateISO: "2026-08-11",
    endDateISO: "2026-12-11",
    mode: "Classroom / Online / Weekend",
    fee: "₹49,999",
    feeNumeric: "49999",
    courseCode: "TL-SAP-001",
    level: "Beginner to intermediate",
    tools: ["SAP S/4HANA", "SAP FICO", "SAP MM", "SAP SD", "SAP PP/QM"],
    teaches: [
      "SAP FICO configuration",
      "SAP MM procurement cycle",
      "SAP SD order to cash",
      "SAP PP/QM planning and quality",
      "Cross-module integration on S/4HANA",
    ],
    includes: [
      "4 months of training",
      "All learning material and datasets",
      "Live SAP S/4HANA server access",
      "1 month corporate grooming",
      "3 recorded mock interviews",
      "Placement preparation and referrals",
    ],
  },
];

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
    body: "₹49,999 for any of the three courses, every batch date listed on the site. You should not have to fill a form to find out what something costs.",
  },
  {
    icon: "grooming",
    title: "A month of corporate grooming, included",
    body: "Resume and LinkedIn rebuilds, three recorded mock interviews with written feedback, aptitude practice and salary-negotiation coaching — built into the fee, not sold as an add-on.",
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
    alumnus: null,}]
 

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
    photo: "/faculty/manish-pimpale.jpg",
  },
  {
    initials: "SK",
    name: "Shrawan Kumar",
    title: "Faculty — SAP MM and Supply Chain",
    years: "12+ years",
    yearsNum: 12,
    linkedin: null,
    teaches: ["SAP"],
    bio: "Twelve years in IT consulting, ERP implementation and supply chain. Runs the SAP MM module and the cross-module integration sessions.",
    tags: ["SAP MM", "SAP PP/QM", "ERP integration"],
    highlights: [
      "SAP MM configuration and procure-to-pay",
      "PP/QM and cross-module integration",
      "12 years of live ERP implementations",
    ],
    photo: "/faculty/shrawan-kumar.jpg",
  },
  {
    initials: "SD",
    name: "Sudhir Deshmukh",
    title: "Faculty — SAP FICO",
    years: "11+ years",
    yearsNum: 11,
    linkedin: null,
    needsVerification: true,
    teaches: ["SAP"],
    bio: "Eleven years as a practising SAP FICO consultant across manufacturing and services implementations. Teaches the finance and controlling configuration track on live S/4HANA.",
    tags: ["SAP FICO", "S/4HANA", "Financial close"],
    highlights: [
      "SAP FICO on live S/4HANA",
      "General ledger, assets and period close",
      "Practising consultant, not a career trainer",
    ],
    photo: "/faculty/sudhir-deshmukh.jpg",
  },
  {
    initials: "DT",
    name: "Dnyaneshwari Talekar",
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
    photo: "/faculty/dnyaneshwari-talekar.jpg",
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
    photo: "/faculty/harshal-wankhede.jpg",
  },
  {
    initials: "VC",
    name: "Vivek Chandekar",
    title: "Faculty — Data Analytics and Business Intelligence",
    years: "5+ years",
    yearsNum: 5,
    linkedin: null,
    needsVerification: true,
    teaches: ["Data Analytics"],
    bio: "Five years in analytics and reporting across BI teams, plus classroom teaching. Runs the Excel, Power BI and Tableau track and reviews every portfolio project.",
    tags: ["Power BI", "Tableau", "Excel"],
    highlights: [
      "Excel, Power BI and Tableau",
      "Dashboard design and DAX measures",
      "Reviews every portfolio project",
    ],
    photo: "/faculty/vivek-chandekar.jpg",
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
    a: "Techtonic Lab runs three job-oriented programmes: Data Analytics, Data Science, and SAP (FICO, MM, SD and PP/QM). Each runs for 3 months of core training plus 1 month of corporate grooming, and each is available as a classroom, online or weekend batch.",
  },
  {
    q: "What does a course at Techtonic Lab cost?",
    a: "All three courses are ₹49,999 for the complete 4-month programme. That covers training, learning material, project datasets or SAP S/4HANA server access, the corporate grooming month and placement preparation. A 6-month EMI at roughly ₹8,334 per month is available. There are no separate registration, examination or certificate charges.",
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
  { value: String(placements.length), label: "Named alumni placed, on record" },
  { value: `${facultyYearsTotal}+`, unit: "yrs", label: "Combined faculty experience" },
  { value: "3", label: "Courses — Data Analytics, Data Science, SAP" },
  { value: "₹49,999", label: "All-inclusive, published fee" },
  { value: "4", unit: "months", label: "Training plus corporate grooming" },
  { value: "2", label: "Campuses in Nagpur" },
];

export const DISCLAIMER =
  "Techtonic Lab provides placement assistance, not a placement guarantee. Outcomes depend on individual performance, batch, and market conditions at the time of hiring.";


export const chatbot = {
  number: "917000026612", // TODO: replace with the full chatbot number
  greeting: "Hi! I'd like to know about the courses at Techtonic Lab.",
};


export function whatsappLink(source = "site") {
  const text = `${chatbot.greeting} [${source}]`;
  return `https://wa.me/${chatbot.number}?text=${encodeURIComponent(text)}`;
}