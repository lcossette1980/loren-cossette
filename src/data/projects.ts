import type { Project } from "@/types";

/* ── WCAG Remediation Platform Screenshots ── */
const wcagScreenshots = [
  {
    src: "/images/projects/wcag-remediation/wcag-screenshot-1.jpeg",
    alt: "PDF Accessibility Conversion — Upload Interface",
    caption:
      "Drag-and-drop upload supporting PDFs and Excel files up to 50 MB with automatic document type detection",
  },
  {
    src: "/images/projects/wcag-remediation/wcag-screenshot-3.jpeg",
    alt: "System Dashboard — Real-Time Metrics",
    caption:
      "Live dashboard tracking documents converted, success rate, average quality score, processing time, and estimated cost savings",
  },
  {
    src: "/images/projects/wcag-remediation/wcag-screenshot-7.jpeg",
    alt: "Conversion Results — Quality Scoring",
    caption:
      "Per-document quality breakdown: WCAG compliance, content confidence, structural accuracy — with validation checks and processing time",
  },
  {
    src: "/images/projects/wcag-remediation/wcag-screenshot-6.jpeg",
    alt: "Side-by-Side Review Interface",
    caption:
      "Human review workflow: original PDF and accessible HTML displayed side by side with approve, flag, and request-fix actions",
  },
  {
    src: "/images/projects/wcag-remediation/wcag-screenshot-4.jpeg",
    alt: "Batch Processing Console",
    caption:
      "Bulk conversion mode scanning upload folders with automatic skip of already-processed files",
  },
];

export const projects: Project[] = [
  {
    slug: "wcag-triage",
    title: "WCAG Compliance Engine",
    subtitle: "Automated Triage & Scope Reduction",
    tech: ["Python", "PyMySQL", "BeautifulSoup", "Web Crawling", "PDF Analysis"],
    stats: [
      { label: "Files Processed", value: "56,567" },
      { label: "Scope Reduction", value: "90%" },
      { label: "Hours Saved", value: "12,000" },
    ],
    shortDescription:
      "Six-stage automated triage pipeline replacing $150K\u2013$450K in manual classification with a 6-hour unattended process. Uncovered 4,265 \u2018false orphans\u2019 \u2014 live content invisible to the CMS.",
    fullDescription:
      "Automated six-stage triage data pipeline replacing 4,000\u201312,000 hours of manual classification ($150K\u2013$450K equivalent) with a 6-hour unattended process for 56,567 government files. Web crawl validation uncovered 4,265 \u201Cfalse orphans\u201D live on site but invisible to CMS. Deduplication across 2,481 groups eliminated redundant remediation. Priority scoring by traffic, content type, and effort; lane routing into PDF fix, OCR, HTML conversion, or rebuild. 30-minute weekly delta updates replaced monthly re-audits.",
    keyFeatures: [
      "Six-stage automated triage pipeline processing 56,567 files",
      "Web crawl validation uncovering 4,265 false orphans invisible to CMS",
      "Deduplication across 2,481 groups eliminating redundant remediation",
      "Priority scoring by traffic, content type, and effort",
      "Lane routing into PDF fix, OCR, HTML conversion, or rebuild",
      "30-minute weekly delta updates replacing monthly re-audits",
      "Enabled site averaging 400+ new files/month to stay current",
    ],
    icon: "Eye",
    featured: true,
    category: "compliance",
    image: "/images/projects/project-wcag-triage.png",
    dashboardImage: "/images/projects/project-wcag-triage-dashboard.png",
    architectureImage: "/images/projects/project-wcag-triage-architecture.png",
  },
  {
    slug: "wcag-remediation",
    title: "WCAG Remediation Platform",
    subtitle: "AI-Powered Document Accessibility at Scale",
    tech: [
      "LangGraph",
      "Gemini 2.5",
      "Claude",
      "Document AI",
      "Vertex AI",
      "axe-core",
      "Google Cloud",
      "Python",
    ],
    stats: [
      { label: "WCAG Compliance", value: "95%+" },
      { label: "Avg Processing", value: "36s" },
      { label: "Quality Score", value: "96" },
    ],
    shortDescription:
      "Production platform converting government PDFs and Excel files to WCAG 2.1 AA-compliant HTML in 30\u201390 seconds. Five-layer validation pipeline with axe-core, numeric integrity checks, and human review — deployed for Multnomah County under federal ADA deadline.",
    fullDescription:
      "End-to-end production platform making government documents accessible for residents who use screen readers and assistive technology. Converts PDFs to WCAG 2.1 AA-compliant HTML in 30\u201390 seconds (vs. 1\u20134 hours of manual specialist work). Excel budget exports process in under 1 second with perfect accuracy. Five-layer validation pipeline: axe-core accessibility checks (80+ WCAG rules), numeric integrity verification (every dollar amount and date cross-checked), completeness validation (every section and heading confirmed), quality scoring (0\u2013100, below 90 flagged), and mandatory human review with side-by-side comparison. All processing runs within county Google Cloud infrastructure \u2014 zero data leaves the environment. Deployed for Multnomah County to meet the April 2026 federal ADA compliance deadline across thousands of public documents.",
    keyFeatures: [
      "30\u201390 second PDF conversion vs. 1\u20134 hours manual remediation",
      "Five-layer validation: axe-core, numeric integrity, completeness, quality scoring, human review",
      "80+ automated WCAG 2.1 AA checks via industry-standard axe-core engine",
      "Side-by-side review interface: original PDF vs. accessible HTML with approve/reject/fix workflow",
      "Batch processing mode for bulk document conversion with auto-skip of processed files",
      "Real-time dashboard tracking documents converted, success rate, quality scores, and cost savings",
      "Excel budget exports: deterministic conversion in seconds at near-zero cost",
      "Reviewer feedback loop: approvals and corrections improve future conversions",
      "Enterprise security: all data stays within county Google Cloud project, zero external sharing",
    ],
    icon: "Shield",
    featured: true,
    category: "compliance",
    image: "/images/projects/wcag-remediation/wcag-screenshot-7.jpeg",
    dashboardImage: "/images/projects/wcag-remediation/wcag-screenshot-3.jpeg",
    architectureImage: "/images/projects/wcag-remediation/wcag-screenshot-6.jpeg",
    screenshots: wcagScreenshots,
    validationPipeline: [
      "Accessibility compliance \u2014 axe-core runs 80+ WCAG 2.1 AA checks (heading structure, color contrast, table markup, image descriptions, screen reader compatibility)",
      "Numeric integrity \u2014 every number, dollar amount, percentage, and date cross-checked against the original document",
      "Completeness \u2014 every section, heading, and content block verified to exist in the output",
      "Quality scoring \u2014 overall score 0\u2013100 based on WCAG compliance, content integrity, and structural accuracy; below 90 gets flagged",
      "Human review \u2014 reviewer compares original and output side by side, then approves or rejects; feedback improves future conversions",
    ],
    deliverables: [
      {
        title: "Leadership Explainer",
        description:
          "Plain-language guide for champions to explain the system to non-technical stakeholders, including objection handling and demo scripts",
        icon: "Presentation",
      },
      {
        title: "Operations Security Handbook",
        description:
          "Security architecture documentation covering data isolation, access controls, and compliance posture",
        icon: "ShieldCheck",
      },
      {
        title: "Champion Quick Reference",
        description:
          "One-page reference card with key stats, validation steps, and ready-to-use talking points",
        icon: "FileText",
      },
      {
        title: "Validation Pipeline Infographic",
        description:
          "Visual walkthrough of the five-checkpoint validation pipeline for stakeholder presentations",
        icon: "GitBranch",
      },
      {
        title: "Reviewer Onboarding Guide",
        description:
          "Step-by-step onboarding for human reviewers covering the side-by-side review workflow and quality standards",
        icon: "UserCheck",
      },
      {
        title: "Technical Turnover Binder",
        description:
          "Complete system documentation for long-term maintenance and knowledge transfer",
        icon: "BookOpen",
      },
    ],
    impactMetrics: [
      {
        label: "Processing Time",
        value: "30\u201390s",
        detail: "per PDF document vs. 1\u20134 hours manual",
      },
      {
        label: "Cost per Document",
        value: "$0.50\u2013$2",
        detail: "PDF conversion; Excel at ~$0",
      },
      {
        label: "WCAG Compliance",
        value: "95%+",
        detail: "automated compliance rate",
      },
      {
        label: "Validation Layers",
        value: "5",
        detail: "independent checks before human review",
      },
      {
        label: "Data Exposure",
        value: "Zero",
        detail: "all processing within county cloud",
      },
      {
        label: "Jobs Eliminated",
        value: "Zero",
        detail: "staff shift from tagging to quality review",
      },
    ],
  },
  {
    slug: "linkit",
    title: "Content Automation (Linkit)",
    subtitle: "Multilingual Translation Pipeline",
    tech: ["PHP", "Drupal 10", "Vertex AI", "Gemini", "Multi-Agent"],
    stats: [
      { label: "Pages Processed", value: "20,000+" },
      { label: "Speed", value: "26\u00D7" },
      { label: "Cost Saved", value: "$34,946" },
    ],
    shortDescription:
      "Four specialized PHP agents making government pages translation-ready in 24 hours vs. 79-day manual effort. Protected 32K internal links from translation corruption.",
    fullDescription:
      "Production NLP system making 20,000+ government pages translation-ready. Four specialized PHP agents: link conversion (32K internal links to Linkit UUID), address protection, phone/email shielding, orchestration with checkpoint/resume fault tolerance. Vertex AI designed agent logic and regex patterns; human-in-the-loop validation. 633-hour manual effort reduced to 24-hour deployment \u2014 26\u00D7 faster, $34,946 saved (89% cost reduction).",
    keyFeatures: [
      "Four specialized PHP agents with checkpoint/resume fault tolerance",
      "Link conversion protecting 32K internal links via Linkit UUID",
      "Address protection and phone/email shielding",
      "Vertex AI-designed agent logic and regex patterns",
      "Human-in-the-loop validation workflow",
      "633 hours reduced to 24 hours \u2014 26\u00D7 faster",
      "89% cost reduction ($34,946 saved)",
    ],
    icon: "Globe",
    featured: true,
    category: "nlp",
    image: "/images/projects/project-linkit.png",
    dashboardImage: "/images/projects/project-linkit-dashboard.png",
    architectureImage: "/images/projects/project-linkit-architecture.png",
  },
  {
    slug: "ai-commander",
    title: "AI Commander",
    subtitle: "Agentic RAG Orchestration",
    tech: ["Python", "Vertex AI", "Gemini", "RAG", "Streamlit", "Multi-Agent"],
    stats: [
      { label: "Specialized Agents", value: "5" },
      { label: "Documents", value: "56K+" },
      { label: "Architecture", value: "Hub-Spoke" },
    ],
    shortDescription:
      "Production hub-and-spoke orchestration with Commander router, Data Analyst, RAG-powered WCAG Expert, Operations agent with human-in-the-loop, and Data Dictionary.",
    fullDescription:
      "Production hub-and-spoke orchestration with 5 specialized agents: Commander router with sticky routing, conversational Data Analyst, RAG-powered WCAG Expert via Vertex AI Vector Search, Operations agent with human-in-the-loop approval, and Data Dictionary. Function-calling pipelines with exponential backoff, audit logging, and dynamic visualizations.",
    keyFeatures: [
      "Commander router with sticky routing for context preservation",
      "Conversational Data Analyst agent for real-time queries",
      "RAG-powered WCAG Expert via Vertex AI Vector Search",
      "Operations agent with human-in-the-loop approval workflows",
      "Data Dictionary agent for schema exploration",
      "Function-calling pipelines with exponential backoff",
      "Comprehensive audit logging and dynamic visualizations",
    ],
    icon: "Bot",
    featured: true,
    category: "ai-agents",
    image: "/images/projects/project-ai-commander.png",
    dashboardImage: "/images/projects/project-ai-commander-dashboard.png",
    architectureImage: "/images/projects/project-ai-commander-architecture.png",
  },
  {
    slug: "airs",
    title: "AIRS",
    subtitle: "Academic Reading Intelligence System",
    tech: ["React", "Azure OpenAI", "FastAPI", "PyTorch", "scikit-learn", "REST API"],
    stats: [
      { label: "Students Served", value: "500+" },
      { label: "Stack", value: "Full" },
      { label: "LLM", value: "Fine-tuned" },
    ],
    shortDescription:
      "Production LLM-powered academic reading coach with fine-tuning pipeline, synthetic training datasets, and real-time chat integration.",
    fullDescription:
      "Production LLM-powered academic reading coach serving 500+ students. Fine-tuning pipeline with synthetic training datasets using PyTorch and scikit-learn for model evaluation. React frontend with real-time chat and Azure OpenAI integration.",
    keyFeatures: [
      "Fine-tuning pipeline with synthetic training datasets",
      "PyTorch and scikit-learn for model evaluation",
      "React frontend with real-time chat interface",
      "Azure OpenAI integration for LLM backbone",
      "Serving 500+ university students in production",
      "Custom training pipeline for domain-specific comprehension",
    ],
    icon: "BookOpen",
    featured: false,
    category: "full-stack",
    image: "/images/projects/project-airs.png",
    dashboardImage: "/images/projects/project-airs-dashboard.png",
    architectureImage: "/images/projects/project-airs-architecture.png",
  },
];
