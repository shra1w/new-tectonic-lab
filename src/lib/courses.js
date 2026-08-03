// -----------------------------------------------------------------------------
// Deep course content — syllabus modules, projects, career paths, per-course FAQ.
// Kept separate from site.js so the homepage bundle stays small.
//
// GEO: every FAQ question is phrased the way a student would type it, and every
// answer opens with a direct sentence before it elaborates.
// -----------------------------------------------------------------------------

export const courseDetail = {
  "data-analytics-course": {
    h1: "Data Analyst Course in Nagpur — Job-Ready Training and Placement Preparation",
    summary:
      "Three months of training in Microsoft Excel, SQL, Python, Power BI and Tableau, plus one month of corporate grooming. Classroom, online and weekend batches in Nagpur.",
    primaryKeyword: "data analyst course in Nagpur",
    prerequisites: "None. The course opens with Excel and introduces Python gradually.",
    certification: "Techtonic Lab completion certificate, plus guidance towards Microsoft PL-300",
    language: "English, with Hindi and Marathi explanation on request",

    audience: [
      {
        segment: "College students",
        body: "In your final year and want a skill that gets interviews rather than another certificate on a resume. Weekend and evening batches mean you do not have to choose between this and your degree. You leave with four projects on GitHub, which matters far more to a hiring manager than your marks.",
      },
      {
        segment: "Fresh graduates",
        body: "Graduated in commerce, science, engineering or arts, and analytics is the fastest route into a technical role that does not demand a computer-science degree. This is the single largest group in every batch, and the Excel-first sequence exists specifically for them.",
      },
      {
        segment: "Working professionals",
        body: "Already pulling reports, maintaining sheets or raising tickets, and want the title and the salary that go with doing it properly. The weekend batch runs the same syllabus with the same faculty, so nothing about it is a lighter version.",
      },
    ],

    modules: [
      {
        n: "01",
        title: "Excel for analytics",
        hours: "24 hours",
        topics: [
          "Lookup and reference functions",
          "PivotTables and PivotCharts",
          "Power Query for cleaning messy data",
          "Conditional formatting and dashboards",
          "What-if analysis and Goal Seek",
        ],
        tools: ["Microsoft Excel", "Power Query"],
        project: "Clean a 40,000-row sales export and build a monthly performance dashboard",
      },
      {
        n: "02",
        title: "SQL and databases",
        hours: "36 hours",
        topics: [
          "SELECT, WHERE, GROUP BY, HAVING",
          "Joins across multiple tables",
          "Subqueries and common table expressions",
          "Window functions for running totals and ranks",
          "Query performance and indexing basics",
        ],
        tools: ["PostgreSQL", "MySQL Workbench"],
        project: "Answer twelve business questions against a normalised retail database",
      },
      {
        n: "03",
        title: "Python for data analysis",
        hours: "40 hours",
        topics: [
          "Python fundamentals from zero",
          "pandas for data wrangling",
          "NumPy for numerical work",
          "Matplotlib and Seaborn for exploration",
          "Reading from APIs, CSVs and databases",
        ],
        tools: ["Python", "pandas", "NumPy", "Jupyter"],
        project: "End-to-end exploratory analysis of a public dataset, written up as a notebook",
      },
      {
        n: "04",
        title: "Applied statistics",
        hours: "20 hours",
        topics: [
          "Descriptive statistics and distributions",
          "Correlation versus causation",
          "Hypothesis testing and p-values",
          "Confidence intervals",
          "A/B test design and reading results",
        ],
        tools: ["Python", "Excel"],
        project: "Design and evaluate an A/B test on a simulated conversion dataset",
      },
      {
        n: "05",
        title: "Power BI and Tableau",
        hours: "32 hours",
        topics: [
          "Data modelling and relationships",
          "DAX measures and calculated columns",
          "Interactive dashboard design",
          "Row-level security and publishing",
          "Tableau calculated fields and parameters",
        ],
        tools: ["Microsoft Power BI", "Tableau Desktop"],
        project: "Build a stakeholder-ready executive dashboard and present it live",
      },
      {
        n: "06",
        title: "Portfolio and corporate grooming",
        hours: "1 month",
        topics: [
          "Documenting projects on GitHub",
          "Resume and LinkedIn rebuild",
          "Three recorded mock interviews",
          "Aptitude and case practice",
          "Salary negotiation",
        ],
        tools: ["GitHub", "LinkedIn"],
        project: "A defended portfolio review with written feedback",
      },
    ],

    projects: [
      {
        title: "Retail sales performance dashboard",
        body: "Clean a messy multi-region sales export, model it, and build a Power BI dashboard a regional manager could actually run a meeting from.",
        tools: ["Power Query", "Power BI", "DAX"],
        dataset: "Synthetic retail transactions, 40k rows",
      },
      {
        title: "Customer churn exploration",
        body: "Work out which customers leave and why, using SQL to segment and Python to visualise. Ends in a written recommendation, not just a chart.",
        tools: ["PostgreSQL", "Python", "pandas"],
        dataset: "Telecom churn, public",
      },
      {
        title: "Pricing A/B test analysis",
        body: "Read an experiment properly — sample size, significance, and the honest answer when the result is inconclusive.",
        tools: ["Python", "Excel"],
        dataset: "Simulated experiment data",
      },
      {
        title: "Nagpur hiring-trends report",
        body: "Scrape and analyse local job postings to find which tools appear most in Vidarbha analyst roles. Original data, which is what makes a portfolio memorable.",
        tools: ["Python", "Tableau Desktop"],
        dataset: "Collected job postings",
      },
    ],

    careers: [
      { role: "Data Analyst", entry: "₹3.0L – ₹4.5L", mid: "₹6L – ₹9L" },
      { role: "Business Analyst", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹11L" },
      { role: "Reporting Analyst", entry: "₹2.8L – ₹4L", mid: "₹5L – ₹8L" },
      { role: "Power BI Developer", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹12L" },
    ],

    faqs: [
      {
        q: "How long is the data analyst course at Techtonic Lab?",
        a: "The Data Analyst course runs for 3 months of core training followed by 1 month of corporate grooming, for a total of 4 months. Classroom, online and weekend batches are available, and all three cover the same syllabus with the same faculty.",
      },
      {
        q: "Do I need coding experience to join the data analyst course?",
        a: "No coding background is required. The course begins with Excel and SQL, then introduces Python at a beginner-friendly pace from week five. Learners from commerce and arts backgrounds complete the programme in every batch.",
      },
      {
        q: "What is the fee for the data analyst course in Nagpur?",
        a: "The fee is ₹50,000 for the complete four-month programme. EMI is available at roughly ₹8,334 per month over six months. The fee includes all learning material, project datasets, the corporate grooming month and placement preparation. There is no separate registration, examination or certificate charge.",
      },
      {
        q: "Which tools will I learn in the data analyst course?",
        a: "Microsoft Excel with Power Query, SQL on PostgreSQL, Python with pandas and NumPy, Microsoft Power BI, and Tableau Desktop. Applied statistics runs alongside them so you can read a result rather than just produce one.",
      },
      {
        q: "Does Techtonic Lab offer placement assistance for data analysts?",
        a: "Yes. The programme includes a resume and LinkedIn rebuild, three recorded mock interviews with written feedback, aptitude practice and referrals to hiring contacts. Techtonic Lab provides placement assistance, not a placement guarantee.",
      },
      {
        q: "What salary can a data analyst expect in Nagpur?",
        a: "Entry-level data analyst roles in Nagpur and the wider Vidarbha region typically start between ₹3.0 lakh and ₹4.5 lakh per year, moving to ₹6 lakh and above with two to three years of experience. Roles with Power BI or SQL depth tend to sit at the upper end of that band.",
      },
      {
        q: "Is a data analyst course hard to learn?",
        a: "It is demanding but not mathematically hard. The real difficulty is consistency — around 6 to 8 hours of practice a week outside class. The concepts are business logic rather than advanced mathematics.",
      },
      {
        q: "Can I attend the data analyst course online from outside Nagpur?",
        a: "Yes. The fully online live batch runs the same syllabus, faculty and project reviews as the classroom batch. Students from Wardha, Bhandara, Chandrapur, Amravati and across Vidarbha attend either online or in the weekend classroom batch.",
      },
      {
        q: "How many projects will I build?",
        a: "Four portfolio projects on real or realistic data, each documented on GitHub and defended in a review session. A hiring manager reads projects far more closely than a certificate.",
      },
      {
        q: "When does the next data analytics batch start?",
        a: "The next Data Analytics batch begins on 18 August 2026, with classroom, online and weekend options. Batch dates for the rest of the year are published on the batches page.",
      },
    ],
  },

  "data-science-course": {
    h1: "Data Science Course in Nagpur — Python, Machine Learning and Applied Statistics",
    summary:
      "Three months of Python, statistics and machine learning taught through models you build and deploy, plus one month of corporate grooming. Classroom, online and weekend batches in Nagpur.",
    primaryKeyword: "data science course in Nagpur",
    prerequisites: "Comfort with school-level mathematics helps. Python is taught from scratch.",
    certification: "Techtonic Lab completion certificate, plus guidance on vendor certification",
    language: "English, with Hindi and Marathi explanation on request",

    audience: [
      {
        segment: "Engineering and science graduates",
        body: "You have the mathematical grounding and want to convert it into a role. This course spends its time on modelling judgement — what to try, what to discard, how to know a model is worse than it looks — rather than on syntax you can look up.",
      },
      {
        segment: "Analysts moving up",
        body: "Already comfortable with SQL and dashboards, and want to move from describing what happened to predicting what will. The statistics and machine-learning modules are built for exactly this transition.",
      },
      {
        segment: "Working professionals",
        body: "The weekend batch is the same syllabus and the same faculty, run so you never have to leave your job to retrain. Expect eight to ten hours of practice a week outside class.",
      },
    ],

    modules: [
      {
        n: "01",
        title: "Python foundations",
        hours: "32 hours",
        topics: [
          "Python syntax, control flow and functions",
          "Working with files and APIs",
          "NumPy arrays and vectorised operations",
          "Writing readable, reusable code",
          "Version control with Git",
        ],
        tools: ["Python", "NumPy", "Git"],
        project: "A reusable data-loading and cleaning module of your own",
      },
      {
        n: "02",
        title: "Data wrangling with pandas",
        hours: "28 hours",
        topics: [
          "Loading, merging and reshaping data",
          "Missing values and outlier handling",
          "Feature engineering",
          "Time-series resampling",
          "Exploratory visualisation",
        ],
        tools: ["pandas", "Matplotlib", "Seaborn"],
        project: "Turn three unrelated raw sources into one analysis-ready dataset",
      },
      {
        n: "03",
        title: "Statistics and probability",
        hours: "28 hours",
        topics: [
          "Distributions and sampling",
          "Hypothesis testing",
          "Regression assumptions",
          "Bayes' theorem in practice",
          "Reading a result honestly",
        ],
        tools: ["Python", "SciPy"],
        project: "A written statistical analysis with stated assumptions and limits",
      },
      {
        n: "04",
        title: "Machine learning",
        hours: "44 hours",
        topics: [
          "Supervised learning — regression and classification",
          "Decision trees, random forests, gradient boosting",
          "Unsupervised learning and clustering",
          "Cross-validation and hyperparameter tuning",
          "Overfitting, leakage and why models fail in production",
        ],
        tools: ["scikit-learn", "Python"],
        project: "A tuned, cross-validated classifier with an honest error analysis",
      },
      {
        n: "05",
        title: "SQL and deployment",
        hours: "24 hours",
        topics: [
          "SQL for feature extraction at scale",
          "Serialising and serving a model",
          "Building a simple prediction API",
          "Monitoring drift",
          "Communicating results to non-technical stakeholders",
        ],
        tools: ["PostgreSQL", "Flask", "Python"],
        project: "Deploy one of your models behind a working endpoint",
      },
      {
        n: "06",
        title: "Portfolio and corporate grooming",
        hours: "1 month",
        topics: [
          "Documenting projects on GitHub",
          "Resume and LinkedIn rebuild",
          "Three recorded mock interviews",
          "Case and aptitude practice",
          "Salary negotiation",
        ],
        tools: ["GitHub", "LinkedIn"],
        project: "A defended portfolio review with written feedback",
      },
    ],

    projects: [
      {
        title: "Demand forecasting model",
        body: "Forecast weekly demand for a retail category, then explain honestly where the model breaks and what it would cost the business.",
        tools: ["Python", "scikit-learn", "pandas"],
        dataset: "Public retail sales history",
      },
      {
        title: "Credit-risk classifier",
        body: "Build and tune a classifier, then work through the class-imbalance and fairness problems that make this a hard problem rather than a tutorial.",
        tools: ["scikit-learn", "Python"],
        dataset: "Public lending dataset",
      },
      {
        title: "Customer segmentation",
        body: "Cluster a customer base, name the segments in business language, and defend why the clusters are real rather than an artefact of the algorithm.",
        tools: ["scikit-learn", "Seaborn"],
        dataset: "Ecommerce transactions",
      },
      {
        title: "Deployed prediction service",
        body: "Take one model all the way to a running endpoint with a simple interface, so you can demonstrate it live in an interview.",
        tools: ["Flask", "Python", "Git"],
        dataset: "Your own choice from earlier projects",
      },
    ],

    careers: [
      { role: "Junior Data Scientist", entry: "₹4.0L – ₹6.5L", mid: "₹9L – ₹15L" },
      { role: "Machine Learning Engineer", entry: "₹4.5L – ₹7L", mid: "₹10L – ₹18L" },
      { role: "Data Analyst (advanced)", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹11L" },
      { role: "Research Analyst", entry: "₹3.5L – ₹5.5L", mid: "₹7L – ₹12L" },
    ],

    faqs: [
      {
        q: "How long is the data science course at Techtonic Lab?",
        a: "The Data Science course runs 3 months of core training plus 1 month of corporate grooming, for a total of 4 months. Classroom, online and weekend batches all follow the same syllabus.",
      },
      {
        q: "Do I need a maths or engineering background for data science?",
        a: "Comfort with school-level mathematics genuinely helps, more so than for the Data Analytics course. You do not need a mathematics degree. Python is taught from scratch, and the statistics module builds from distributions upward rather than assuming prior study.",
      },
      {
        q: "What is the fee for the data science course in Nagpur?",
        a: "The fee is ₹50,000 for the complete four-month programme, the same as the other two courses. EMI is available at roughly ₹8,334 per month over six months, and there are no separate registration or certificate charges.",
      },
      {
        q: "What is the difference between the data analytics and data science courses?",
        a: "Data Analytics is about describing what happened — Excel, SQL, dashboards and reporting. Data Science is about predicting what will happen next — Python, statistics and machine learning. Analytics is the faster route into a first job; Data Science pays more but expects more mathematical comfort.",
      },
      {
        q: "Will I actually deploy a model, or only build one in a notebook?",
        a: "You deploy one. The final module takes a model you built earlier all the way to a running prediction endpoint, because being able to demonstrate a live system in an interview separates you from candidates who only have notebooks.",
      },
      {
        q: "Does Techtonic Lab guarantee a data science job?",
        a: "No. Techtonic Lab provides placement assistance, not a placement guarantee. That means resume and LinkedIn rebuilds, recorded mock interviews, aptitude practice and referrals. Any institute promising a guaranteed job should be treated with caution.",
      },
      {
        q: "How much can a fresher earn in data science in India?",
        a: "Entry-level data science roles typically start between ₹4.0 lakh and ₹6.5 lakh per year in tier-two cities, higher in Pune, Bengaluru and Hyderabad. Salaries move quickly once you have shipped work in production.",
      },
      {
        q: "When does the next data science batch start?",
        a: "The next Data Science batch begins on 25 August 2026, with classroom, online and weekend options. Later dates are listed on the batches page.",
      },
    ],
  },

  "sap-course": {
    h1: "SAP Course in Nagpur — FICO, MM, SD and PP/QM on Live S/4HANA",
    summary:
      "Three months configuring real SAP modules on individual S/4HANA server access, plus one month of corporate grooming. Taught by working consultants. Classroom, online and weekend batches in Nagpur.",
    primaryKeyword: "SAP course in Nagpur",
    prerequisites: "None for functional modules. A commerce or business background helps for FICO.",
    certification: "Techtonic Lab completion certificate, plus SAP certification guidance",
    language: "English, with Hindi and Marathi explanation on request",

    audience: [
      {
        segment: "Commerce and business graduates",
        body: "SAP functional modules are business configuration, not programming, which makes them the most reliable route from a B.Com or BBA into a well-paid IT role. FICO in particular rewards people who already understand a ledger.",
      },
      {
        segment: "Working professionals in operations",
        body: "If you already raise purchase orders, process invoices or run production plans, you know the business process. Learning the configuration side is what moves you from end user to consultant, usually at a significant salary step.",
      },
      {
        segment: "Engineering graduates",
        body: "PP/QM and MM sit close to manufacturing and supply chain, and Indian employers hire heavily for both. The technical grounding you already have shortens the learning curve on integration.",
      },
    ],

    modules: [
      {
        n: "01",
        title: "SAP and S/4HANA foundations",
        hours: "16 hours",
        topics: [
          "What an ERP actually does",
          "S/4HANA architecture and Fiori",
          "Navigation, transaction codes and reports",
          "Organisational structure and enterprise design",
          "How the modules connect",
        ],
        tools: ["SAP S/4HANA"],
        project: "Map a company's org structure into SAP enterprise elements",
      },
      {
        n: "02",
        title: "SAP FICO — finance and controlling",
        hours: "44 hours",
        topics: [
          "Company code, chart of accounts, fiscal year variants",
          "General ledger, accounts payable and receivable",
          "Asset accounting and depreciation",
          "Cost centres, profit centres and internal orders",
          "Month-end and year-end close",
        ],
        tools: ["SAP FICO", "SAP S/4HANA"],
        project: "Configure a company code end to end and run a period close",
      },
      {
        n: "03",
        title: "SAP MM — materials management",
        hours: "36 hours",
        topics: [
          "Material and vendor master data",
          "Purchase requisitions and purchase orders",
          "Goods receipt and invoice verification",
          "Inventory management and physical inventory",
          "Release strategies and pricing procedures",
        ],
        tools: ["SAP MM", "SAP S/4HANA"],
        project: "Configure and run a full procure-to-pay cycle",
      },
      {
        n: "04",
        title: "SAP SD — sales and distribution",
        hours: "32 hours",
        topics: [
          "Customer master and sales organisation",
          "Sales orders, deliveries and billing",
          "Pricing conditions and output determination",
          "Credit management",
          "Returns and credit memos",
        ],
        tools: ["SAP SD", "SAP S/4HANA"],
        project: "Configure and run an order-to-cash cycle",
      },
      {
        n: "05",
        title: "SAP PP/QM — production and quality",
        hours: "28 hours",
        topics: [
          "Bills of material and routings",
          "Work centres and production versions",
          "MRP run and production orders",
          "Quality inspection lots and results recording",
          "Integration with MM and FICO",
        ],
        tools: ["SAP PP", "SAP QM", "SAP S/4HANA"],
        project: "Plan and confirm a production order through to quality release",
      },
      {
        n: "06",
        title: "Integration, certification and grooming",
        hours: "1 month",
        topics: [
          "Cross-module integration scenarios",
          "SAP certification exam preparation",
          "Resume and LinkedIn rebuild",
          "Three recorded mock interviews",
          "Salary negotiation for consultants",
        ],
        tools: ["SAP S/4HANA", "LinkedIn"],
        project: "An end-to-end business scenario touching all four modules",
      },
    ],

    projects: [
      {
        title: "Procure-to-pay configuration",
        body: "Configure a purchasing organisation from empty, then run a requisition through to vendor payment and prove the accounting entries landed correctly.",
        tools: ["SAP MM", "SAP FICO"],
        dataset: "Live S/4HANA training client",
      },
      {
        title: "Order-to-cash configuration",
        body: "Set up a sales area, pricing procedure and billing, then process an order end to end including a return.",
        tools: ["SAP SD", "SAP FICO"],
        dataset: "Live S/4HANA training client",
      },
      {
        title: "Company code and period close",
        body: "Build a company code with its chart of accounts and fiscal year variant, post a month of transactions, then close the period.",
        tools: ["SAP FICO"],
        dataset: "Live S/4HANA training client",
      },
      {
        title: "Make-to-stock production run",
        body: "Create the BOM and routing, run MRP, convert the planned order and confirm production through quality inspection.",
        tools: ["SAP PP", "SAP QM"],
        dataset: "Live S/4HANA training client",
      },
    ],

    careers: [
      { role: "SAP FICO Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹16L" },
      { role: "SAP MM Consultant", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹14L" },
      { role: "SAP SD Consultant", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹14L" },
      { role: "SAP PP/QM Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹15L" },
    ],

    faqs: [
      {
        q: "Which SAP modules does Techtonic Lab teach in Nagpur?",
        a: "Techtonic Lab teaches four functional modules — SAP FICO, SAP MM, SAP SD and SAP PP/QM — on live S/4HANA server access. All four are covered within the same four-month programme, along with the cross-module integration sessions that interviews actually test.",
      },
      {
        q: "Do I get my own SAP S/4HANA server access?",
        a: "Yes. Every SAP learner receives individual S/4HANA credentials from week two and configures in a real system rather than watching a demonstration. This is the single most common gap between institutes and the thing employers probe first.",
      },
      {
        q: "What is the fee for the SAP course in Nagpur?",
        a: "The fee is ₹50,000 for the complete four-month programme, including live S/4HANA server access, all learning material, the corporate grooming month and placement preparation. EMI is available at roughly ₹8,334 per month over six months.",
      },
      {
        q: "Who can do an SAP course — is a technical degree needed?",
        a: "No technical degree is needed for the functional modules. Commerce, BBA, arts and engineering graduates all complete the programme. SAP functional work is business configuration rather than programming, which is why FICO suits people who already understand accounting.",
      },
      {
        q: "Which SAP module has the most jobs in India?",
        a: "SAP FICO and SAP MM consistently carry the highest volume of Indian openings, with SD close behind. PP/QM is smaller but less crowded, which can work in your favour. Because the programme covers all four, you can decide where to specialise once you have configured each of them.",
      },
      {
        q: "Is SAP certification included in the course fee?",
        a: "The official SAP certification exam is paid separately to SAP and is not included in the ₹50,000 fee. What is included is full preparation guidance for it, plus a Techtonic Lab completion certificate. We will tell you honestly whether the official exam is worth the cost in your particular case.",
      },
      {
        q: "Does Techtonic Lab guarantee an SAP job?",
        a: "No. Techtonic Lab provides placement assistance, not a placement guarantee. Alumni working as SAP consultants are named on the placements page along with their programme and batch.",
      },
      {
        q: "When does the next SAP batch start?",
        a: "The next SAP batch begins on 11 August 2026, with classroom, online and weekend options. Later batch dates are published on the batches page.",
      },
    ],
  },
};

// -----------------------------------------------------------------------------
// SAP module deep-dive pages — /sap-course/fico, /mm, /sd, /pp-qm
// -----------------------------------------------------------------------------
export const sapModules = {
  fico: {
    slug: "fico",
    code: "FICO",
    name: "SAP FICO",
    fullName: "SAP FICO Course in Nagpur — Finance and Controlling on S/4HANA",
    tagline: "Finance and Controlling",
    summary:
      "Configure company codes, ledgers, asset accounting and cost centres on live S/4HANA. The module Indian employers hire for in the highest volume, and the natural route for commerce graduates.",
    bestFor: "Commerce, BBA and accounting backgrounds",
    hours: "44 hours within the four-month SAP programme",
    demand: "Highest volume of Indian openings",
    topics: [
      "Company code, chart of accounts and fiscal year variants",
      "General ledger accounting and document types",
      "Accounts payable — vendor master, invoices, payment runs",
      "Accounts receivable — customer master, dunning, incoming payments",
      "Asset accounting and depreciation areas",
      "Cost centre and profit centre accounting",
      "Internal orders and settlement",
      "Month-end and year-end closing procedures",
    ],
    careers: [
      { role: "SAP FICO Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹16L" },
      { role: "SAP FICO Analyst", entry: "₹3.0L – ₹4.5L", mid: "₹6L – ₹11L" },
    ],
    integratesWith: ["SAP MM", "SAP SD", "SAP PP/QM"],
  },
  mm: {
    slug: "mm",
    code: "MM",
    name: "SAP MM",
    fullName: "SAP MM Course in Nagpur — Materials Management on S/4HANA",
    tagline: "Materials Management",
    summary:
      "Configure the full procure-to-pay cycle — master data, purchase orders, goods receipt, invoice verification and inventory. The fastest route from a procurement or stores role into consulting.",
    bestFor: "Procurement, stores and supply-chain backgrounds",
    hours: "36 hours within the four-month SAP programme",
    demand: "Very high, especially in manufacturing",
    topics: [
      "Material master and vendor master data",
      "Purchasing organisation and enterprise structure",
      "Purchase requisitions, RFQs and purchase orders",
      "Release strategies and approval workflows",
      "Goods receipt, goods issue and stock transfers",
      "Invoice verification and three-way matching",
      "Pricing procedures and condition records",
      "Physical inventory and valuation",
    ],
    careers: [
      { role: "SAP MM Consultant", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹14L" },
      { role: "SAP MM Support Analyst", entry: "₹3.0L – ₹4.2L", mid: "₹6L – ₹10L" },
    ],
    integratesWith: ["SAP FICO", "SAP PP/QM", "SAP SD"],
  },
  sd: {
    slug: "sd",
    code: "SD",
    name: "SAP SD",
    fullName: "SAP SD Course in Nagpur — Sales and Distribution on S/4HANA",
    tagline: "Sales and Distribution",
    summary:
      "Configure order-to-cash from sales area design through pricing, delivery, billing and returns. Sits closest to revenue, which is why SD consultants get pulled into business conversations early.",
    bestFor: "Sales, customer-service and business backgrounds",
    hours: "32 hours within the four-month SAP programme",
    demand: "High, across services and manufacturing",
    topics: [
      "Sales organisation, distribution channel and division",
      "Customer master and partner functions",
      "Sales order types and item categories",
      "Pricing conditions and condition technique",
      "Delivery processing and shipping",
      "Billing documents and revenue account determination",
      "Credit management and blocks",
      "Returns, credit memos and rebates",
    ],
    careers: [
      { role: "SAP SD Consultant", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹14L" },
      { role: "SAP SD Support Analyst", entry: "₹3.0L – ₹4.2L", mid: "₹6L – ₹10L" },
    ],
    integratesWith: ["SAP FICO", "SAP MM"],
  },
  "pp-qm": {
    slug: "pp-qm",
    code: "PP/QM",
    name: "SAP PP/QM",
    fullName: "SAP PP/QM Course in Nagpur — Production Planning and Quality Management",
    tagline: "Production Planning and Quality Management",
    summary:
      "Configure BOMs, routings, MRP and production orders, then the inspection lots and results recording that release them. A smaller, less crowded field than FICO or MM.",
    bestFor: "Engineering and manufacturing backgrounds",
    hours: "28 hours within the four-month SAP programme",
    demand: "Smaller volume, but noticeably less competition",
    topics: [
      "Bills of material and routings",
      "Work centres and production versions",
      "Demand management and planned independent requirements",
      "MRP run and planned order conversion",
      "Production order execution and confirmation",
      "Quality inspection lots and inspection plans",
      "Results recording and usage decisions",
      "Integration with MM inventory and FICO costing",
    ],
    careers: [
      { role: "SAP PP Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹15L" },
      { role: "SAP QM Consultant", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹13L" },
    ],
    integratesWith: ["SAP MM", "SAP FICO"],
  },
};
