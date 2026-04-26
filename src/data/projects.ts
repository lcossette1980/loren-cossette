import type { Project } from "@/types";

/* ── A11yReady Screenshots ── */
const a11yreadyScreenshots = [
  {
    src: "/images/projects/a11yready/a11yready-1-upload.png",
    alt: "a11yReady — Upload Interface",
    caption:
      "Branded upload landing with drag-and-drop support, document type auto-detection, and per-department logo selection",
  },
  {
    src: "/images/projects/a11yready/a11yready-3-review.png",
    alt: "Side-by-Side Human Review with Approve & Download",
    caption:
      "Reviewer compares the original PDF and the accessible HTML side by side, then approves and exports as HTML+PDF, HTML only, or PDF only",
  },
  {
    src: "/images/projects/a11yready/a11yready-5-suggestions.png",
    alt: "AI-Powered Suggested Fixes",
    caption:
      "Quality gate surfaces specific structural issues — missing content, light text contrast, table count mismatches, semantic timeline items — with one-click fix workflow",
  },
  {
    src: "/images/projects/a11yready/a11yready-4-fix.png",
    alt: "Reviewer Fix Workflow",
    caption:
      "Reviewer types a plain-English fix instruction or clicks a suggestion; system regenerates the affected section without rerunning the whole pipeline",
  },
  {
    src: "/images/projects/a11yready/a11yready-2-history.png",
    alt: "Conversion History",
    caption:
      "Searchable conversion history with per-document quality score, review status, and full audit trail across all uploads",
  },
];

/* ── Civic Sentinel Screenshots ── */
const civicSentinelScreenshots = [
  {
    src: "/images/projects/civic-sentinel/civic-sentinel-1-executive.png",
    alt: "Executive Summary — Digital Content Health",
    caption:
      "Director-level dashboard: 59,073 files tracked, 18,214 pages audited, 40 critical accessibility issues — total content footprint and live site-health gauges across File and Site Intelligence",
  },
  {
    src: "/images/projects/civic-sentinel/civic-sentinel-2-site-health.png",
    alt: "Site Health — Four-Gauge View",
    caption:
      "Overall, Accessibility, Content Quality, and Link Health gauges with 14-day trends, audit-coverage transparency, and severity-banded issue counts across 16 departments",
  },
  {
    src: "/images/projects/civic-sentinel/civic-sentinel-3-accessibility.png",
    alt: "Accessibility Report — Rule-by-Rule",
    caption:
      "WCAG 2.1 AA compliance breakdown: most common problems with severity, affected page counts, and ranked worst-scoring pages — drill-down ready for editorial action",
  },
  {
    src: "/images/projects/civic-sentinel/civic-sentinel-4-file-detail.png",
    alt: "File Detail — Drupal-Aware Inventory",
    caption:
      "Drupal-native file inventory: every asset linked back to its database node, uploader, department, and live page references — surfaces orphans, duplicates, and ownership gaps",
  },
];

export const projects: Project[] = [
  {
    slug: "civic-sentinel",
    title: "Civic Sentinel",
    subtitle: "Drupal-Aware Site Intelligence Platform",
    tech: [
      "Python",
      "FastAPI",
      "React 19",
      "Vertex AI",
      "Claude Sonnet 4.5",
      "Gemini 2.5 Flash",
      "Playwright",
      "axe-core",
      "Pandas",
      "Google Cloud Run",
      "Drupal 10",
    ],
    stats: [
      { label: "Files Tracked", value: "59K+" },
      { label: "Pages Audited", value: "18K+" },
      { label: "Departments", value: "60" },
    ],
    shortDescription:
      "Custom site-intelligence platform replacing Siteimprove for Multnomah County. Crawls 18K+ pages and 57K+ files nightly, audits accessibility, SEO, performance, links, content, PII, and spelling — Drupal-aware, AI-augmented, and editorial-workflow-ready.",
    fullDescription:
      "An open-codebase replacement for a six-figure SaaS contract — built specifically for Multnomah County's Drupal 10 site (multco.gov) with 18,000+ pages, 57,000+ files, 60 departments, and 145+ uploaders. Off-the-shelf alternatives charge per page (which balloons at this scale), give scores without explanations, and don't understand Drupal. Civic Sentinel does both: it crawls the live site nightly, audits accessibility against WCAG 2.1 AA via axe-core, runs Lighthouse for performance, scans for broken links, PII patterns, and spelling, and classifies every page using Gemini for service intent. It then layers AI on top — an Ask Agent for plain-English investigation, AI-generated remediation proposals in an editor approval queue, and Citizen Journey simulations that walk real workflows like a resident would. Three deployable units share one repo: a nightly Cloud Build pipeline, a docs-explorer dashboard (4 GB), and a html-hub companion service. All running on Google Cloud Run with @multco.us OAuth, JWT auth, and shared security middleware. Surfaced 25,867 true orphan files (45% of inventory), 4,499 live-only files invisible to the database, and 1,158 duplicate clusters — findings nobody at the County had ever seen before.",
    keyFeatures: [
      "10-module nightly pipeline: crawl, accessibility (axe-core), SEO, link health, Lighthouse, PII, spelling, unsafe domains, page duplicates, AI service classification",
      "Drupal-native inventory — uploaders, departments, node references, orphan detection, DB-vs-live mismatches",
      "Ask Agent (Claude Sonnet 4.5 on Vertex AI) — chat over the full inventory with read-only DataFrame tools and 8-iteration tool-calling loops",
      "Citizen Journey simulator — AI personas walk live workflows, capture dead-ends, and produce structured reports",
      "Service Scout (Gemini 2.5 Flash) — classifies every page into APPLY / TRANSACT / INFORM / CONTACT / FIND service patterns",
      "AI-generated remediation proposals in an editorial approval queue with PENDING → APPROVED/REJECTED → APPLIED lifecycle",
      "Custom policy engine — editors write rules in JSON, see plain English, edit/add/delete (e.g. \"no PDFs in /forms/\")",
      "Square-root penalty curve scoring with audit-coverage transparency — replaces the inflated \"93.3% scored 100\" of v1",
      "In-memory pandas data store — 57K rows × 80 cols, 200 MB RAM, no DB in the read path",
      "Two access tiers via Google OAuth domain check (@multco.us) and JWT — Standard (any employee) and Advanced (named users)",
    ],
    icon: "Eye",
    featured: true,
    category: "compliance",
    image: "/images/projects/civic-sentinel/civic-sentinel-1-executive.png",
    dashboardImage:
      "/images/projects/civic-sentinel/civic-sentinel-2-site-health.png",
    architectureImage:
      "/images/projects/civic-sentinel/civic-sentinel-4-file-detail.png",
    screenshots: civicSentinelScreenshots,
    impactMetrics: [
      {
        label: "True Orphans Found",
        value: "25,867",
        detail: "45% of inventory — invisible to users, costing storage",
      },
      {
        label: "Live-Only Files",
        value: "4,499",
        detail: "Found via crawl but missing from Drupal DB",
      },
      {
        label: "Duplicate Clusters",
        value: "1,158",
        detail: "2,581 files — roughly 5% of storage",
      },
      {
        label: "Pages Classified",
        value: "18,214",
        detail: "AI service-intent classification (APPLY, TRANSACT, INFORM…)",
      },
      {
        label: "SaaS Contract Replaced",
        value: "Six-figure",
        detail: "Open codebase running on existing GCP infrastructure",
      },
      {
        label: "Audit Cadence",
        value: "Nightly",
        detail: "Full re-crawl + 10 audit modules + AI classification",
      },
    ],
  },
  {
    slug: "a11yready",
    title: "A11yReady",
    subtitle: "AI-Powered Document Accessibility Platform",
    tech: [
      "LangGraph",
      "Gemini 2.5",
      "Claude Sonnet 4.5",
      "Vertex AI",
      "Document AI",
      "Playwright",
      "axe-core",
      "Python 3.11",
      "Flask",
      "Google Cloud Run",
    ],
    stats: [
      { label: "WCAG Compliance", value: "95%+" },
      { label: "Document Clusters", value: "34" },
      { label: "Time Saved", value: "95%" },
    ],
    shortDescription:
      "Production multi-agent platform converting government PDFs to WCAG 2.1 AA-compliant HTML and tagged PDFs in 30–90 seconds. Three-agent polish gate, 34-cluster document classifier, and AI-powered reviewer fix workflow — deployed for Multnomah County at a11y-ready.multco.us.",
    fullDescription:
      "End-to-end platform replacing 1–4 hours of manual Adobe Acrobat work with a 30–90 second AI pipeline. Documents flow through LangGraph orchestration: a 34-cluster triage classifier routes each PDF to its appropriate path (budget program offers, hearing agendas, election statistics, fillable forms, Zoom transcripts, and 29 more). Known clusters use deterministic Jinja2 templates for consistent output; unknown clusters fall back to LLM-based generation. A three-agent polish gate runs before review: (1) deterministic HTML fixes, (2) cluster-specific common-sense rule packs that enforce doc-type conventions, and (3) an optional Gemini 2.5 Pro Layout Verifier that compares rendered output against PDF page images for visual fidelity. Validation runs axe-core via Playwright on every document. Reviewers get a side-by-side compare interface with AI-powered fix suggestions — one-click to regenerate a section without rerunning the full pipeline. After 3+ approvals of similar documents, the system builds structural templates that deterministically correct heading hierarchies on future extractions — continuous learning across all 34 document types. All processing stays inside the County's GCP project; no data leaves the environment. ~63,000 lines across 95+ Python files.",
    keyFeatures: [
      "30–90 second PDF conversion vs. 1–4 hours of manual Acrobat remediation",
      "34-cluster triage classifier with centralized dispatch registry — adding a new doc type = one ClusterDispatch entry",
      "Three-agent polish gate: deterministic HTML fixes + cluster rule packs + Gemini 2.5 Pro Layout Verifier with quorum merger",
      "axe-core via Playwright running real automated WCAG 2.1 AA checks on every document",
      "Side-by-side reviewer interface with AI-powered fix suggestions and one-click section regeneration",
      "Continuous learning — 3+ reviewer approvals build structural templates that auto-correct heading hierarchies on future docs",
      "Excel program-offer auto-approval — Questica 3-tab and multi-sheet exports converted at 100% accuracy in seconds",
      "Regeneration mode for image-heavy slides — rebuilds the document semantically rather than tracing source layout",
      "Google Drive Picker integration — single-file or whole-folder upload directly from Drive",
      "Zero data leaves county cloud — all processing inside Multnomah County GCP project",
    ],
    icon: "Shield",
    featured: true,
    category: "compliance",
    image: "/images/projects/a11yready/a11yready-3-review.png",
    dashboardImage: "/images/projects/a11yready/a11yready-1-upload.png",
    architectureImage:
      "/images/projects/a11yready/a11yready-5-suggestions.png",
    screenshots: a11yreadyScreenshots,
    validationPipeline: [
      "Triage classification — 34-cluster classifier routes the document to the appropriate extraction method, template renderer, and meeting type via a centralized ClusterDispatch registry",
      "Vision + content extraction — Document AI Layout Parser runs first; for complex docs, Gemini vision provides full page analysis; Claude handles content extraction merged with PyMuPDF text for accurate heading detection",
      "HTML generation + axe-core validation — Claude generates the accessible HTML; Playwright runs axe-core against it for WCAG 2.1 AA compliance with iterative refinement on failure",
      "Three-agent polish gate — deterministic HTML fixes, cluster-specific common-sense rule packs (e.g. meeting section ordering, form groupings), and an optional Gemini 2.5 Pro Layout Verifier that compares rendered output against source PDF page images, with a quorum merger that boosts corroborated findings",
      "Human review with AI assistance — reviewer sees original PDF and accessible HTML side by side, gets AI-generated fix suggestions, and can regenerate individual sections without rerunning the full pipeline; approvals feed structural templates back into future extractions",
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
          "Visual walkthrough of the polish gate and validation pipeline for stakeholder presentations",
        icon: "GitBranch",
      },
      {
        title: "Reviewer Onboarding Guide",
        description:
          "Step-by-step onboarding for human reviewers covering the side-by-side workflow and AI fix-suggestion conventions",
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
        value: "30–90s",
        detail: "per PDF vs. 1–4 hours manual Acrobat work",
      },
      {
        label: "Cost per Document",
        value: "$0.50–$2",
        detail: "AI processing; Excel exports at near-zero",
      },
      {
        label: "First-Pass WCAG",
        value: "95%+",
        detail: "axe-core 2.1 AA compliance before human review",
      },
      {
        label: "Document Clusters",
        value: "34",
        detail: "classified types with deterministic templates",
      },
      {
        label: "Time Reduction",
        value: "95%",
        detail: "from 1–4 hours to 30–90 seconds per document",
      },
      {
        label: "Data Exposure",
        value: "Zero",
        detail: "all processing within county Google Cloud project",
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
