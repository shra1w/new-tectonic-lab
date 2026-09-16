// -----------------------------------------------------------------------------
// Per-course detail: hero copy, audience, module-by-module syllabus, projects,
// careers and page-level FAQs. Modules mirror the official TECHTONIC LAB
// syllabus PDFs (Data Analyst, Data Science, SAP MM / FICO / PP-QM).
//
// Durations and fees live in site.js and must match: Data Analytics 6 months,
// Data Science 9 months. SAP is sold as four standalone modules (MM, FICO,
// PP/QM, SD), each ₹49,999 — never surface a combined all-four total.
// -----------------------------------------------------------------------------

export const courseDetail = {
  "data-analytics-course": {
    h1: "Data Analyst Course in Nagpur — Job-Ready Training and Placement Preparation",
    summary:
      "Six months of hands-on training in Advanced Excel, SQL, Power BI or Tableau, Python and applied statistics, plus a month of corporate grooming. Classroom, online and weekend batches in Nagpur.",
    primaryKeyword: "data analyst course in Nagpur",
    prerequisites: "None. The course opens with SQL and Excel and introduces Python gradually.",
    certification: "TECHTONIC LAB completion certificate, plus guidance towards Microsoft PL-300",
    language: "English, with Hindi and Marathi explanation on request",

    audience: [
      {
        segment: "College students",
        body: "In your final year and want a skill that gets interviews rather than another certificate on a resume. Weekend and evening batches mean you do not have to choose between this and your degree. You leave with an end-to-end project on GitHub, which matters far more to a hiring manager than your marks.",
      },
      {
        segment: "Fresh graduates",
        body: "Graduated in commerce, science, engineering or arts, and analytics is the fastest route into a technical role that does not demand a computer-science degree. This is the single largest group in every batch, and the Excel-and-SQL-first sequence exists specifically for them.",
      },
      {
        segment: "Working professionals",
        body: "Already pulling reports, maintaining sheets or raising tickets, and want the title and the salary that go with doing it properly. The weekend batch runs the same syllabus with the same faculty, so nothing about it is a lighter version.",
      },
    ],

    modules: [
      {
        n: "01",
        title: "Introduction to data analysis",
        hours: "Weeks 1–2",
        topics: [
          "What data and data analytics are, and the global scope",
          "Analytics across domains, and the BI landscape",
          "Understanding stakeholder vision and asking effective questions",
          "Data Analyst vs Business Analyst, and the analyst road map",
          "Types and methods of data analysis, and the analysis process",
        ],
        tools: ["—"],
        project: "Frame a real business question and design the analysis around it",
      },
      {
        n: "02",
        title: "SQL and databases",
        hours: "Weeks 3–7",
        topics: [
          "DBMS vs RDBMS, MySQL setup, DDL/DML/DQL/TCL/DCL",
          "Constraints, keys, operators and set operators",
          "All join types, subqueries and correlated subqueries",
          "CTEs, recursive CTEs, and window functions (rank, lead/lag, running totals)",
          "Stored procedures, functions, views, cursors and triggers",
          "Data modelling, ER diagrams and normalisation (1NF–BCNF)",
        ],
        tools: ["MySQL", "MySQL Workbench"],
        project: "Answer a set of business questions against a normalised retail database",
      },
      {
        n: "03",
        title: "Power BI and Tableau",
        hours: "Weeks 8–12",
        topics: [
          "Power Query editor, connections and transformations",
          "Full visual library, data modelling and relationships",
          "DAX: aggregation, filter, relationship, date and time-intelligence functions",
          "Report filters, drill-through, row-level security and publishing",
          "Tableau: connections, in-built and advanced charts, calculations and filters",
        ],
        tools: ["Microsoft Power BI", "Tableau Desktop"],
        project: "Build a stakeholder-ready executive dashboard and present it live",
      },
      {
        n: "04",
        title: "Python for data analysis",
        hours: "Weeks 13–16",
        topics: [
          "Python fundamentals, data structures, loops and functions",
          "Exception handling, classes and objects",
          "NumPy arrays, broadcasting and universal functions",
          "pandas for reading, cleaning and manipulating data",
          "Matplotlib and Seaborn for statistical and exploratory plots",
        ],
        tools: ["Python", "pandas", "NumPy", "Jupyter"],
        project: "End-to-end exploratory analysis of a public dataset, written up as a notebook",
      },
      {
        n: "05",
        title: "Applied statistics",
        hours: "Weeks 17–19",
        topics: [
          "Descriptive and inferential statistics",
          "Population vs sample, variables and distributions",
          "Hypothesis testing, Type I and Type II errors",
          "T-test, ANOVA and Chi-square",
          "Covariance and correlation",
        ],
        tools: ["Python", "Excel"],
        project: "Design and evaluate a hypothesis test on a real dataset",
      },
      {
        n: "06",
        title: "Advanced Excel",
        hours: "Weeks 20–22",
        topics: [
          "Lookup family — VLOOKUP, HLOOKUP, XLOOKUP, INDEX/MATCH, OFFSET",
          "Data validation, PivotTables and slicers",
          "Dashboard creation and formatting",
          "Power Query and Power Pivot",
          "Macros and VBA — subs, ranges, conditions and loops",
        ],
        tools: ["Microsoft Excel", "Power Query", "VBA"],
        project: "Build an interactive Excel dashboard from a raw export",
      },
      {
        n: "07",
        title: "Cloud bonus, capstone and corporate grooming",
        hours: "Month 6",
        topics: [
          "Introduction to cloud services (AWS / Azure)",
          "End-to-end capstone project",
          "Resume and LinkedIn rebuild, GitHub portfolio",
          "Three live mock interviews and aptitude practice",
          "Salary negotiation",
        ],
        tools: ["AWS / Azure", "GitHub", "LinkedIn"],
        project: "A defended end-to-end capstone with written feedback",
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
        tools: ["MySQL", "Python", "pandas"],
        dataset: "Telecom churn, public",
      },
      {
        title: "Statistical analysis report",
        body: "Read a dataset properly — sample, significance, and the honest answer when the result is inconclusive.",
        tools: ["Python", "Excel"],
        dataset: "Public survey data",
      },
      {
        title: "End-to-end capstone",
        body: "Take one problem from raw data through SQL, Python, statistics and a Power BI dashboard, documented and defended.",
        tools: ["MySQL", "Python", "Power BI"],
        dataset: "Your choice, guided",
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
        q: "How long is the data analyst course at TECHTONIC LAB?",
        a: "The Data Analyst course runs for 6 months, covering SQL, Power BI or Tableau, Python, statistics and Advanced Excel, and ending with a cloud bonus module, an end-to-end capstone and a month of corporate grooming. Classroom, online and weekend batches all cover the same syllabus with the same faculty.",
      },
      {
        q: "Do I need coding experience to join the data analyst course?",
        a: "No coding background is required. The course begins with SQL and Excel, then introduces Python at a beginner-friendly pace. Learners from commerce and arts backgrounds complete the programme in every batch.",
      },
      {
        q: "What is the fee for the data analyst course in Nagpur?",
        a: "The fee is ₹49,999 for the complete six-month programme, payable in 3 instalments of ₹20,000 + ₹15,000 + ₹15,000 across the first three months. The fee includes all learning material, project datasets, the corporate grooming month and placement preparation. There is no separate registration, examination or certificate charge.",
      },
      {
        q: "Which tools will I learn in the data analyst course?",
        a: "SQL on MySQL, Microsoft Power BI and Tableau, Python with pandas and NumPy, and Advanced Excel including Power Query and VBA. Applied statistics runs alongside them, plus an introduction to AWS or Azure as a bonus module.",
      },
      {
        q: "Does TECHTONIC LAB offer placement assistance for data analysts?",
        a: "Yes. The programme includes a resume and LinkedIn rebuild, three live mock interviews with written feedback, aptitude practice and referrals to hiring contacts. TECHTONIC LAB provides placement assistance, not a placement guarantee.",
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
        a: "Several across the six months, culminating in an end-to-end capstone documented on GitHub and defended in a review session. A hiring manager reads projects far more closely than a certificate.",
      },
      {
        q: "When does the next data analytics batch start?",
        a: "The next Data Analytics batch begins on 18 August 2026, with classroom, online and weekend options. Batch dates for the rest of the year are published on the batches page.",
      },
    ],
  },

  "data-science-course": {
    h1: "Data Science Course in Nagpur — Machine Learning, Deep Learning and Generative AI",
    summary:
      "Nine months from Python foundations through machine learning, deep learning, NLP, computer vision and Generative AI/LLMs, taught through models you build and deploy, plus a month of corporate grooming. Classroom, online and weekend batches in Nagpur.",
    primaryKeyword: "data science course in Nagpur",
    prerequisites: "Comfort with school-level mathematics helps. Python is taught from scratch.",
    certification: "TECHTONIC LAB completion certificate, plus guidance on vendor certification",
    language: "English, with Hindi and Marathi explanation on request",

    audience: [
      {
        segment: "Engineering and science graduates",
        body: "You have the mathematical grounding and want to convert it into a role. This course spends its time on modelling judgement — what to try, what to discard, how to know a model is worse than it looks — through machine learning, deep learning and Generative AI.",
      },
      {
        segment: "Analysts moving up",
        body: "Already comfortable with SQL and dashboards, and want to move from describing what happened to predicting what will. The statistics, machine-learning and deep-learning modules are built for exactly this transition.",
      },
      {
        segment: "Working professionals",
        body: "The weekend batch is the same syllabus and the same faculty, run so you never have to leave your job to retrain. Expect eight to ten hours of practice a week outside class across the nine months.",
      },
    ],

    modules: [
      {
        n: "01",
        title: "Python, NumPy and Pandas",
        hours: "Months 1–2",
        topics: [
          "Python fundamentals, data structures, OOP and file handling",
          "Exception handling, modules and packages",
          "NumPy arrays, broadcasting and linear algebra",
          "pandas — DataFrames, cleaning, GroupBy, merge and join",
          "Version control with Git and GitHub",
        ],
        tools: ["Python", "NumPy", "pandas", "Git"],
        project: "A reusable data-loading and cleaning module of your own",
      },
      {
        n: "02",
        title: "SQL, Advanced Excel and visualisation",
        hours: "Month 3",
        topics: [
          "SQL — joins, subqueries, CTEs, window functions, stored procedures",
          "Data modelling and normalisation",
          "Advanced Excel — Power Query, Power Pivot, VBA and macros",
          "Matplotlib, Seaborn and Plotly",
          "Statistical and interactive visualisations",
        ],
        tools: ["MySQL", "Excel", "Matplotlib", "Seaborn", "Plotly"],
        project: "An interactive dashboard combining SQL-sourced data and Python plots",
      },
      {
        n: "03",
        title: "Statistics and mathematics",
        hours: "Month 4 (first half)",
        topics: [
          "Descriptive and inferential statistics, probability and sampling",
          "Hypothesis testing — T-test, ANOVA, Chi-square",
          "Correlation and covariance",
          "Linear algebra, matrices and vectors",
          "Calculus basics, gradient descent and optimisation",
        ],
        tools: ["Python", "SciPy"],
        project: "A written statistical analysis with stated assumptions and limits",
      },
      {
        n: "04",
        title: "EDA and machine learning",
        hours: "Months 4–5",
        topics: [
          "Data profiling, outlier detection and feature engineering",
          "Supervised learning — regression, decision trees, random forest, SVM, XGBoost",
          "Unsupervised learning — K-Means, hierarchical, DBSCAN, PCA",
          "Model evaluation — precision, recall, F1, ROC-AUC",
          "Cross-validation and hyperparameter tuning",
        ],
        tools: ["scikit-learn", "XGBoost", "Python"],
        project: "A tuned, cross-validated classifier with an honest error analysis",
      },
      {
        n: "05",
        title: "Deep learning",
        hours: "Month 6",
        topics: [
          "Neural networks and the perceptron",
          "ANN, CNN, RNN and LSTM",
          "TensorFlow and Keras",
          "Transfer learning",
          "Image classification",
        ],
        tools: ["TensorFlow", "Keras", "Python"],
        project: "An image classifier trained and evaluated end to end",
      },
      {
        n: "06",
        title: "NLP and computer vision",
        hours: "Month 7",
        topics: [
          "Text processing, tokenisation, stemming and lemmatisation",
          "Sentiment analysis and text classification",
          "Word embeddings, transformers and BERT basics",
          "Image processing with OpenCV",
          "Object detection and face recognition",
        ],
        tools: ["OpenCV", "Transformers", "Python"],
        project: "A sentiment-analysis model and an OpenCV vision task",
      },
      {
        n: "07",
        title: "Generative AI and LLMs",
        hours: "Month 8",
        topics: [
          "Introduction to AI, GenAI and prompt engineering",
          "Large Language Models and the OpenAI APIs",
          "LangChain and Retrieval-Augmented Generation (RAG)",
          "AI agents and AI automation",
          "Building a GenAI application",
        ],
        tools: ["OpenAI API", "LangChain", "Python"],
        project: "A RAG-based application over your own document set",
      },
      {
        n: "08",
        title: "Deployment, capstone and corporate grooming",
        hours: "Month 9",
        topics: [
          "Model deployment — Flask, FastAPI, Streamlit and REST APIs",
          "Docker basics and an introduction to MLOps",
          "Cloud fundamentals (AWS / Azure)",
          "End-to-end industry capstone project",
          "Resume, LinkedIn, GitHub portfolio, mock interviews and grooming",
        ],
        tools: ["Flask", "FastAPI", "Streamlit", "Docker"],
        project: "A deployed model behind a working endpoint, defended in review",
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
        tools: ["scikit-learn", "XGBoost"],
        dataset: "Public lending dataset",
      },
      {
        title: "Sentiment analysis and NLP",
        body: "Process real text, build a classifier and interpret it, using embeddings and transformer basics rather than a bag-of-words toy.",
        tools: ["Transformers", "Python"],
        dataset: "Public review corpus",
      },
      {
        title: "Deployed GenAI capstone",
        body: "Take a model or a RAG application all the way to a running endpoint with a simple interface, so you can demonstrate it live in an interview.",
        tools: ["LangChain", "FastAPI", "Docker"],
        dataset: "Your own choice from earlier projects",
      },
    ],

    careers: [
      { role: "Junior Data Scientist", entry: "₹4.0L – ₹6.5L", mid: "₹9L – ₹15L" },
      { role: "Machine Learning Engineer", entry: "₹4.5L – ₹7L", mid: "₹10L – ₹18L" },
      { role: "Data Analyst (advanced)", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹11L" },
      { role: "AI / GenAI Engineer", entry: "₹5L – ₹8L", mid: "₹12L – ₹22L" },
    ],

    faqs: [
      {
        q: "How long is the data science course at TECHTONIC LAB?",
        a: "The Data Science course runs for 9 months, covering Python, statistics, machine learning, deep learning, NLP, computer vision and Generative AI/LLMs, ending with model deployment, an end-to-end capstone and a month of corporate grooming. Classroom, online and weekend batches all follow the same syllabus.",
      },
      {
        q: "Do I need a maths or engineering background for data science?",
        a: "Comfort with school-level mathematics genuinely helps, more so than for the Data Analytics course. You do not need a mathematics degree. Python is taught from scratch, and the statistics and mathematics module builds from distributions and linear algebra upward rather than assuming prior study.",
      },
      {
        q: "What is the fee for the data science course in Nagpur?",
        a: "The fee is ₹89,999 for the complete nine-month programme, reflecting the additional deep learning, NLP, computer vision and Generative AI content. It is payable in 3 instalments of ₹35,000 + ₹30,000 + ₹24,999 across the first six months, and there are no separate registration or certificate charges.",
      },
      {
        q: "What is the difference between the data analytics and data science courses?",
        a: "Data Analytics is about describing what happened — SQL, Excel, Power BI and reporting, over 6 months. Data Science is about predicting and generating — machine learning, deep learning, NLP, computer vision and Generative AI, over 9 months. Analytics is the faster route into a first job; Data Science pays more but expects more mathematical comfort and more time.",
      },
      {
        q: "Does the course cover Generative AI and LLMs?",
        a: "Yes. A dedicated module covers prompt engineering, Large Language Models, the OpenAI APIs, LangChain, Retrieval-Augmented Generation and AI agents, and you build a GenAI application as part of it. It sits after the machine-learning, deep-learning and NLP modules so you reach it with real foundations.",
      },
      {
        q: "Will I actually deploy a model, or only build one in a notebook?",
        a: "You deploy one. The final module takes a model or a RAG application you built earlier all the way to a running endpoint using Flask, FastAPI or Streamlit, because being able to demonstrate a live system in an interview separates you from candidates who only have notebooks.",
      },
      {
        q: "Does TECHTONIC LAB guarantee a data science job?",
        a: "No. TECHTONIC LAB provides placement assistance, not a placement guarantee. That means resume and LinkedIn rebuilds, live mock interviews, aptitude practice and referrals. Any institute promising a guaranteed job should be treated with caution.",
      },
      {
        q: "When does the next data science batch start?",
        a: "The next Data Science batch begins on 25 August 2026, with classroom, online and weekend options. Later dates are listed on the batches page.",
      },
    ],
  },

  "sap-course": {
    h1: "SAP Course in Nagpur — MM, FICO, PP/QM & SD on Live S/4HANA",
    summary:
      "Configure real SAP S/4HANA modules on individual server access from day one — Sourcing & Procurement (MM), Finance & Controlling (FICO), Production Planning & Quality (PP/QM) and Sales & Distribution (SD). Four standalone modules, each ₹49,999, taught by working consultants. Classroom, online and weekend batches in Nagpur.",
    primaryKeyword: "SAP course in Nagpur",
    prerequisites: "None for functional modules. A commerce or business background helps for FICO.",
    certification: "TECHTONIC LAB completion certificate, plus SAP certification guidance",
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
        title: "ERP and S/4HANA foundations",
        hours: "Week 1",
        topics: [
          "What an ERP actually does, and the SAP overview",
          "SAP R/3 architecture and S/4HANA",
          "Technical vs functional modules",
          "Phases of an SAP implementation project",
          "SAP GUI and Fiori navigation",
        ],
        tools: ["SAP S/4HANA", "SAP Fiori"],
        project: "Navigate S/4HANA and map the module landscape",
      },
      {
        n: "02",
        title: "SAP MM — Sourcing & Procurement",
        hours: "Standalone module on live S/4HANA",
        topics: [
          "Enterprise structure — company, plant, storage location, purchasing org",
          "Master data — material, business partner, info record, source list, quota",
          "Purchasing — PR, PO, RFQ, outline agreements and contracts",
          "Release procedures and pricing / calculation schema",
          "Inventory management — GR, GI, transfer postings and reservations",
          "Physical inventory, special stocks, split valuation and account determination",
          "Invoice verification, and integration with FI/CO and SD",
        ],
        tools: ["SAP MM", "SAP S/4HANA"],
        project: "Configure and run a full procure-to-pay cycle",
      },
      {
        n: "03",
        title: "SAP FICO — Finance & Controlling",
        hours: "Standalone module on live S/4HANA",
        topics: [
          "Organisation structure — company code, credit control, business area",
          "General ledger, fiscal year variant, document splitting, parallel ledgers",
          "Controlling area, profit centres and cost centres",
          "Accounts payable and receivable, special GL, dunning",
          "GST and TDS (withholding tax) configuration",
          "House bank, automatic payment programme and BRS",
          "Asset accounting, depreciation and financial statement versions",
        ],
        tools: ["SAP FICO", "SAP S/4HANA"],
        project: "Configure a company code end to end and run a period close",
      },
      {
        n: "04",
        title: "SAP PP/QM — Production & Quality",
        hours: "Standalone module on live S/4HANA",
        topics: [
          "Enterprise structure and PP master data — material, BOM, work centre, routing",
          "Production versions, demand management and MRP run",
          "Planned and production orders, capacity planning, shop-floor control",
          "Repetitive manufacturing and batch management",
          "QM — quality planning, inspection lots, results recording and usage decisions",
          "Quality notifications, certificates and vendor quality",
          "Integration — PP-MM, PP-SD, QM-MM and QM-PP",
        ],
        tools: ["SAP PP", "SAP QM", "SAP S/4HANA"],
        project: "Plan and confirm a production order through to quality release",
      },
      {
        n: "05",
        title: "SAP SD — Sales & Distribution",
        hours: "Standalone module on live S/4HANA",
        topics: [
          "Enterprise structure — sales organisation, distribution channel, division, sales area",
          "Master data — customer, material, customer-material info and condition records",
          "Sales documents — inquiry, quotation, order, contracts and scheduling agreements",
          "Item categories, schedule lines, copy control and the pricing procedure",
          "Availability check (ATP), shipping, delivery, picking and post goods issue",
          "Billing, credit/debit memos, returns, credit management and SD-FI integration",
        ],
        tools: ["SAP SD", "SAP S/4HANA"],
        project: "Run a full order-to-cash cycle from sales order through to billing",
      },
      {
        n: "06",
        title: "Integration, certification and grooming",
        hours: "1 month",
        topics: [
          "Cross-module integration scenarios and the end-to-end manufacturing cycle",
          "SAP tables, reports and ASAP methodology",
          "SAP certification exam preparation",
          "Resume and LinkedIn rebuild, three live mock interviews",
          "Salary negotiation for consultants",
        ],
        tools: ["SAP S/4HANA", "LinkedIn"],
        project: "An end-to-end business scenario touching MM, FICO, PP/QM and SD",
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
        title: "Company code and period close",
        body: "Build a company code with its chart of accounts, fiscal year variant and document splitting, post a month of transactions, then close the period.",
        tools: ["SAP FICO"],
        dataset: "Live S/4HANA training client",
      },
      {
        title: "Make-to-stock production run",
        body: "Create the BOM and routing, run MRP, convert the planned order and confirm production through quality inspection.",
        tools: ["SAP PP", "SAP QM"],
        dataset: "Live S/4HANA training client",
      },
      {
        title: "Cross-module integration scenario",
        body: "Run an end-to-end scenario that touches MM inventory, PP production and FICO costing, and reconcile the results across all three.",
        tools: ["SAP MM", "SAP PP", "SAP FICO"],
        dataset: "Live S/4HANA training client",
      },
    ],

    careers: [
      { role: "SAP FICO Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹16L" },
      { role: "SAP MM Consultant", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹14L" },
      { role: "SAP SD Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹15L" },
      { role: "SAP PP/QM Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹15L" },
    ],

    faqs: [
      {
        q: "Which SAP modules does TECHTONIC LAB teach in Nagpur?",
        a: "TECHTONIC LAB teaches four functional modules on live S/4HANA server access — SAP MM (Sourcing & Procurement), SAP FICO (Finance & Controlling), SAP PP/QM (Production Planning & Quality Management) and SAP SD (Sales & Distribution). Each is a standalone course priced at ₹49,999, and every module also covers the cross-module integration sessions that interviews actually test.",
      },
      {
        q: "Do I get my own SAP S/4HANA server access?",
        a: "Yes. Every SAP learner receives individual S/4HANA credentials from day one and configures in a real system rather than watching a demonstration. This is the single most common gap between institutes and the thing employers probe first.",
      },
      {
        q: "What is the fee for the SAP course in Nagpur?",
        a: "Each SAP module — MM, FICO, PP/QM or SD — is ₹49,999, all-inclusive: live S/4HANA server access, all learning material, the corporate grooming month and placement preparation. You choose the module that fits your background and can add another later. Each module is payable in 3 instalments of ₹20,000 + ₹15,000 + ₹15,000, with no separate registration, examination or certificate charge.",
      },
      {
        q: "Who can do an SAP course — is a technical degree needed?",
        a: "No technical degree is needed for the functional modules. Commerce, BBA, arts and engineering graduates all complete the programme. SAP functional work is business configuration rather than programming, which is why FICO suits people who already understand accounting.",
      },
      {
        q: "Which SAP module has the most jobs in India?",
        a: "SAP FICO and SAP MM consistently carry the highest volume of Indian openings; SAP SD is strong across distribution and consumer goods, while PP/QM is smaller but less crowded, which can work in your favour. Since each module is a standalone course, you can start with the one that matches your background and add another as you specialise.",
      },
      {
        q: "Is SAP certification included in the course fee?",
        a: "The official SAP certification exam is paid separately to SAP and is not included in the ₹49,999 course fee. What is included is full preparation guidance for it, plus a TECHTONIC LAB completion certificate. We will tell you honestly whether the official exam is worth the cost in your particular case.",
      },
      {
        q: "Does TECHTONIC LAB guarantee an SAP job?",
        a: "No. TECHTONIC LAB provides placement assistance, not a placement guarantee. Alumni working as SAP consultants are named on the placements page along with their programme and batch.",
      },
      {
        q: "When does the next SAP batch start?",
        a: "The next SAP batch begins on 11 August 2026, with classroom, online and weekend options. Later batch dates are published on the batches page.",
      },
    ],
  },
};

/* Basic details for each Data Analytics / Data Science module button, shown in
   the pop-up when a learner taps a module on the course card — the same "tap a
   module to see what it covers" pattern used for the SAP modules, so all course
   cards behave and size the same way. Keyed by the exact tool label used in
   `courses[].tools`. */
export const toolInfo = {
  "MySQL": {
    blurb: "The querying backbone of analytics — pull, join and shape data straight from a relational database.",
    learn: ["Joins, subqueries, CTEs and window functions", "Database design and normalisation", "Answering real business questions in SQL"],
  },
  "Power BI": {
    blurb: "Microsoft's industry-standard BI tool for turning raw tables into dashboards a manager actually uses.",
    learn: ["Power Query transformations and data modelling", "DAX measures and time-intelligence", "Interactive, stakeholder-ready dashboards"],
  },
  "Tableau": {
    blurb: "Drag-and-drop visual analytics for fast, exploratory dashboards and storytelling.",
    learn: ["Connections and calculated fields", "Advanced charts and filters", "Publishing and sharing dashboards"],
  },
  "Python": {
    blurb: "The core programming language for analysis, automation and machine learning.",
    learn: ["Fundamentals, data structures and functions", "NumPy and pandas for data work", "Matplotlib and Seaborn for plots"],
  },
  "Advanced Excel": {
    blurb: "The tool every workplace already runs on — taken to an analyst level.",
    learn: ["Lookup family, PivotTables and slicers", "Power Query and Power Pivot", "Macros and VBA automation"],
  },
  "AWS / Azure (Bonus)": {
    blurb: "A bonus introduction to the cloud services analytics increasingly runs on.",
    learn: ["Cloud fundamentals and key services", "Where data pipelines live in the cloud", "Deploying a simple workload"],
  },
  "Pandas": {
    blurb: "The workhorse library for cleaning, reshaping and analysing tabular data in Python.",
    learn: ["DataFrames, indexing and GroupBy", "Merging, joining and reshaping", "Cleaning and feature engineering"],
  },
  "Scikit-Learn": {
    blurb: "The go-to library for classical machine learning models and evaluation.",
    learn: ["Regression, trees, random forest and SVM", "Clustering and dimensionality reduction", "Cross-validation and tuning"],
  },
  "TensorFlow / PyTorch": {
    blurb: "The two frameworks used to build and train deep neural networks.",
    learn: ["ANN, CNN, RNN and LSTM architectures", "Training, transfer learning and evaluation", "Image and sequence models"],
  },
  "OpenCV": {
    blurb: "The standard library for computer vision and image processing.",
    learn: ["Image processing fundamentals", "Object detection", "Face recognition basics"],
  },
  "LangChain & LLMs": {
    blurb: "Build applications on top of Large Language Models — the most in-demand AI skill today.",
    learn: ["Prompt engineering and the OpenAI APIs", "LangChain and Retrieval-Augmented Generation (RAG)", "AI agents and a GenAI app"],
  },
  "Flask / FastAPI / Streamlit": {
    blurb: "Take a model out of a notebook and put it behind a working endpoint or app.",
    learn: ["REST APIs with Flask and FastAPI", "Streamlit data apps", "Docker basics for deployment"],
  },
  "Git & GitHub": {
    blurb: "Version control and the portfolio home hiring managers actually read.",
    learn: ["Branching, commits and pull requests", "Publishing a project portfolio", "Collaboration workflows"],
  },
};

export const sapModules = {
  mm: {
    slug: "mm",
    code: "MM",
    name: "SAP MM",
    fullName: "SAP MM Course in Nagpur — Sourcing & Procurement on S/4HANA",
    tagline: "Sourcing & Procurement (Materials Management)",
    process: "Procure-to-Pay",
    fee: "₹49,999",
    focus:
      "The purchasing side of the business — vendors, purchase orders, inventory and invoice verification.",
    summary:
      "Configure the full procure-to-pay cycle on live S/4HANA — enterprise structure, master data, purchasing, release strategies, inventory management, valuation and invoice verification. The fastest route from a procurement or stores role into consulting.",
    bestFor: "Procurement, stores and supply-chain backgrounds",
    hours: "A standalone module on live S/4HANA",
    demand: "Very high, especially in manufacturing",
    topics: [
      "Organisational structure — company code, plant, storage location, purchasing org",
      "Master data — material, business partner, info record, source list, quota arrangement",
      "Purchasing — PR, PO, RFQ, outline agreements, contracts and scheduling agreements",
      "Document types and release procedures for purchasing documents",
      "Pricing / calculation schema and condition technique",
      "External services management (ESM)",
      "Inventory management — GR, GI, transfer postings and reservations",
      "Physical inventory, special stocks and special procurement types",
      "Split valuation and automatic account determination",
      "Invoice verification, and integration with FI/CO and SD",
    ],
    careers: [
      { role: "SAP MM Consultant", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹14L" },
      { role: "SAP MM Support Analyst", entry: "₹3.0L – ₹4.2L", mid: "₹6L – ₹10L" },
    ],
    integratesWith: ["SAP FICO", "SAP PP/QM"],
  },
  fico: {
    slug: "fico",
    code: "FICO",
    name: "SAP FICO",
    fullName: "SAP FICO Course in Nagpur — Finance and Controlling on S/4HANA",
    tagline: "Finance and Controlling",
    process: "Record-to-Report",
    fee: "₹49,999",
    focus:
      "The finance backbone — general ledger, AP/AR, asset accounting and Indian GST/TDS. Highest hiring volume.",
    summary:
      "Configure organisation structure, general ledger, document splitting, parallel ledgers, AP/AR, asset accounting and Indian GST/TDS on live S/4HANA. The module Indian employers hire for in the highest volume, and the natural route for commerce graduates.",
    bestFor: "Commerce, BBA and accounting backgrounds",
    hours: "A standalone module on live S/4HANA",
    demand: "Highest volume of Indian openings",
    topics: [
      "Organisation structure — company code, credit control area, business area",
      "General ledger — chart of accounts, fiscal year variant, posting periods, field status",
      "Controlling area, profit centres and cost centres",
      "Parallel accounting, ledger groups and document splitting",
      "Document posting, reversals, cross-company, park/hold/sample and recurring documents",
      "Foreign currency valuation",
      "Accounts payable — vendor master, invoices, special GL, payment runs",
      "Accounts receivable — customer master, dunning, incoming payments",
      "GST (tax on sales & purchase) and TDS (withholding tax) configuration",
      "House bank, automatic payment programme and bank reconciliation",
      "Asset accounting and depreciation, and financial statement versions",
    ],
    careers: [
      { role: "SAP FICO Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹16L" },
      { role: "SAP FICO Analyst", entry: "₹3.0L – ₹4.5L", mid: "₹6L – ₹11L" },
    ],
    integratesWith: ["SAP MM", "SAP PP/QM"],
  },
  "pp-qm": {
    slug: "pp-qm",
    code: "PP/QM",
    name: "SAP PP/QM",
    fullName: "SAP PP/QM Course in Nagpur — Production Planning and Quality Management",
    tagline: "Production Planning and Quality Management",
    process: "Plan-to-Produce",
    fee: "₹49,999",
    focus:
      "The manufacturing floor — BOMs, routings, MRP, production orders and quality inspection.",
    summary:
      "Configure BOMs, routings, work centres, MRP and production orders, then the inspection lots, results recording and usage decisions that release them — with full PP-MM, PP-SD and QM integration on live S/4HANA. A smaller, less crowded field than FICO or MM.",
    bestFor: "Engineering and manufacturing backgrounds",
    hours: "A standalone module on live S/4HANA",
    demand: "Smaller volume, but noticeably less competition",
    topics: [
      "Enterprise structure for PP and MRP areas",
      "PP master data — material master, BOM, work centre, routing, production version",
      "Demand management and planned independent requirements",
      "MRP concepts, MRP run, planning strategies and procurement proposals",
      "Planned and production orders — creation, release, confirmation, settlement",
      "Capacity planning, shop-floor control and variance analysis",
      "Repetitive manufacturing and batch management",
      "QM master data — inspection characteristics, sampling, inspection plans",
      "Quality inspection — GR, in-process and final; usage decisions and defect recording",
      "Quality notifications, certificates and vendor quality management",
      "Integration — PP-MM, PP-SD, QM-MM and QM-PP",
    ],
    careers: [
      { role: "SAP PP Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹15L" },
      { role: "SAP QM Consultant", entry: "₹3.5L – ₹5L", mid: "₹7L – ₹13L" },
    ],
    integratesWith: ["SAP MM", "SAP FICO"],
  },
  sd: {
    slug: "sd",
    code: "SD",
    name: "SAP SD",
    fullName: "SAP SD Course in Nagpur — Sales and Distribution",
    tagline: "Sales and Distribution",
    process: "Order-to-Cash",
    fee: "₹49,999",
    focus:
      "The selling side of the business — sales orders, pricing, delivery, billing and returns.",
    summary:
      "Configure order-to-cash from sales area design through pricing, delivery, billing and returns on live S/4HANA — enterprise structure, sales documents, availability check, shipping and billing, with full MM and FICO integration.",
    bestFor: "Sales, order management and customer-facing backgrounds",
    hours: "A standalone module on live S/4HANA",
    demand: "High, especially in distribution and consumer goods",
    topics: [
      "Enterprise structure — sales organisation, distribution channel, division, sales area",
      "Master data — customer master, material master, customer-material info, condition master",
      "Sales document types — inquiry, quotation, sales order, contracts and scheduling agreements",
      "Item categories, schedule line categories and copy control",
      "Pricing procedure and condition technique, including discounts and surcharges",
      "Availability check (ATP) and transfer of requirements",
      "Shipping — delivery creation, picking, packing and post goods issue",
      "Billing — invoices, credit and debit memos, billing plans",
      "Returns, credit management and complaints processing",
      "Integration — SD-MM, SD-FICO and revenue account determination",
    ],
    careers: [
      { role: "SAP SD Consultant", entry: "₹3.5L – ₹5.5L", mid: "₹8L – ₹15L" },
      { role: "SAP SD Support Analyst", entry: "₹3.0L – ₹4.2L", mid: "₹6L – ₹10L" },
    ],
    integratesWith: ["SAP MM", "SAP FICO"],
  },
};