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
      "Quality gate surfaces specific structural issues — missing content, light text contrast, table count mismatches — with one-click fix workflow",
  },
  {
    src: "/images/projects/a11yready/a11yready-4-fix.png",
    alt: "Reviewer Fix Workflow",
    caption:
      "Reviewer types a plain-English fix instruction or clicks a suggestion; the deterministic directives loop turns each correction into a safe per-file change applied on the next run",
  },
  {
    src: "/images/projects/a11yready/a11yready-2-history.png",
    alt: "Conversion History",
    caption:
      "Searchable conversion history with per-document quality score, review status, and full audit trail across all uploads",
  },
];

/* ── File Intelligence Platform Screenshots ── */
const fileIntelScreenshots = [
  {
    src: "/images/projects/file-intel/file-intel-1-executive.png",
    alt: "Executive Summary — Digital Content Health",
    caption:
      "Director-level dashboard: 56.5K files classified, 9.9K pages crawled, six-bucket File_Status classification, with per-department health gauges",
  },
  {
    src: "/images/projects/file-intel/file-intel-2-site-health.png",
    alt: "Site Health — Four-Gauge View",
    caption:
      "Overall, Accessibility, Content Quality, and Link Health gauges with 14-day trends, audit-coverage transparency, and severity-banded issue counts across 30 departments",
  },
  {
    src: "/images/projects/file-intel/file-intel-3-accessibility.png",
    alt: "Accessibility Report — Rule-by-Rule",
    caption:
      "WCAG 2.1 AA compliance breakdown: most common problems with severity, affected page counts, and ranked worst-scoring pages — drill-down ready for editorial action",
  },
  {
    src: "/images/projects/file-intel/file-intel-4-file-detail.png",
    alt: "File Detail — Drupal-Aware Inventory",
    caption:
      "Drupal-native file inventory: every asset linked back to its database node, uploader, department, and live page references — surfaces orphans, duplicates, and ownership gaps",
  },
];

export const projects: Project[] = [
  /* ──────────────────────────────────────────
     MULTNOMAH COUNTY AI PROGRAM
     5 production / discovery initiatives
     ────────────────────────────────────────── */
  {
    slug: "a11yready",
    title: "A11yReady",
    subtitle: "AI-Powered Document Accessibility Platform",
    program: "multco-ai",
    programStatus: "In Production · Scaling",
    department: "DCA",
    presentationUrl: "https://multco-presentations.web.app/projects/a11yready/",
    tech: [
      "Vertex AI",
      "Gemini 2.5 Flash/Pro",
      "Claude Sonnet 4.5",
      "Claude Haiku 4.5",
      "LangGraph",
      "Python",
      "PyMuPDF",
      "WeasyPrint",
      "Cloud Run",
      "Firestore",
      "GCS",
    ],
    stats: [
      { label: "PDF → HTML", value: "30s" },
      { label: "WCAG 2.1 AA", value: "95%+" },
      { label: "Per Document", value: "$0.50–$2" },
    ],
    shortDescription:
      "Converts public-facing PDFs into fully accessible HTML in 30–90 seconds — versus 1–4 hours of manual remediation. A Vertex-AI pipeline routes each document through one of 34 type-specific clusters with a deterministic forms path that anchors fields to embedded AcroForm widgets, so extraction is stable run-to-run.",
    fullDescription:
      "Production AI platform clearing Multnomah County's public-PDF backlog ahead of the ADA Title II digital-accessibility deadline (extended to April 2027). Documents flow through LangGraph orchestration with per-cluster model routing on Vertex AI: Gemini 2.5 Flash for vision on most documents, Claude Sonnet 4.5 for complex multi-column / table-heavy layouts, Claude Haiku 4.5 for lightweight extraction. The deterministic forms pipeline anchors fields to the PDF's embedded AcroForm widgets, restores section headers from shaded/bold heading bands, merges character-comb fields (driver's-license / SSN digit boxes) into single inputs, synthesizes missing signature fields, and renders source tables as fillable accessible grids. A feedback loop turns each reviewer correction into a safe, per-file deterministic directive (delete / rename a specific field) applied on the next run — replacing the statistical consensus templates that used to force-fit and regress forms. A read-only Pipeline Advisor with persistent memory gathers windowed evidence, surfaces findings, and tracks whether each shipped fix actually moved the metric — without ever mutating prompts or config. 734 automated tests guard the pipeline.",
    keyFeatures: [
      "Deterministic forms pipeline anchored to AcroForm widgets — stable run-to-run extraction with synthesized signature fields and fillable accessible tables",
      "Feedback → directives loop: reviewer edits become per-file deterministic fixes applied on the next run (replacing the consensus templates that used to force-fit and regress)",
      "Per-cluster model routing on Vertex AI — Gemini Flash for vision, Claude Sonnet for complex layouts, Claude Haiku for lightweight extraction",
      "Pipeline Advisor — read-only analyst with persistent memory that surfaces findings and tracks whether each fix moved the metric, without ever mutating prompts or config",
      "34 document clusters with cluster-specific extraction methods and template renderers, dispatched through one centralized registry",
      "734 automated tests covering the full pipeline + axe-core WCAG 2.1 AA validation on every output",
      "Side-by-side reviewer interface with AI-powered fix suggestions and one-click section regeneration",
      "Zero data leaves the County's Vertex AI tenant — no direct OpenAI/Anthropic keys at runtime",
    ],
    icon: "Shield",
    featured: true,
    category: "compliance",
    image: "/images/projects/a11yready/a11yready-3-review.png",
    dashboardImage: "/images/projects/a11yready/a11yready-1-upload.png",
    architectureImage:
      "/images/projects/a11yready/a11yready-5-suggestions.png",
    screenshots: a11yreadyScreenshots,
    impactMetrics: [
      {
        label: "Processing Time",
        value: "30–90s",
        detail: "per PDF vs. 1–4 hours of manual Acrobat work",
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
        label: "Automated Tests",
        value: "734",
        detail: "guarding the pipeline against regression",
      },
      {
        label: "ADA Deadline",
        value: "Apr 2027",
        detail: "Title II — A11yReady is the County's path to clearing it",
      },
    ],
  },
  {
    slug: "file-intel",
    title: "File Intelligence Platform",
    subtitle: "Drupal-Aware Site Intelligence for multco.us",
    program: "multco-ai",
    programStatus: "In Production · Scaling",
    department: "Multnomah County · WDX",
    presentationUrl: "https://multco-presentations.web.app/projects/file-intel/",
    tech: [
      "Python 3.11",
      "FastAPI",
      "React 19",
      "Vite",
      "Tailwind 4",
      "Vertex AI",
      "Claude Sonnet 4.5",
      "Gemini 2.5 Flash",
      "Playwright",
      "axe-core",
      "Pandas",
      "Google Cloud Run",
      "Cloud Build",
      "Cloud Storage",
    ],
    stats: [
      { label: "Files Classified", value: "56.5K" },
      { label: "Pages Crawled", value: "9.9K" },
      { label: "Xingwu Agreement", value: "92.3%" },
    ],
    shortDescription:
      "Nightly Google Cloud pipeline that reconciles 56,500+ Drupal CMS files across 9,900+ published pages on multco.us. Six-bucket file classification, axe-core WCAG 2.1 AA scoring, Vertex AI service classification + remediation proposals, citizen-journey personas, per-department health trends, and an editor-attribution layer so every issue has an owner.",
    fullDescription:
      "Custom site-intelligence platform giving Multnomah County a single coherent picture of every file and every page on multco.us — measured nightly, scored honestly, routed to the person who can fix it. Six-bucket File_Status classification (CONNECTED · EMBEDDED · UNPUBLISHED_ONLY · NOISE_ONLY · ORPHAN_MEDIA · ORPHAN_FILE) is deterministic, not ML-based. A section-overview navigation (Home · Files · Pages · Services · Workbench · Departments) sits over a 10-module audit pipeline. An Analytics page with 8 tabs (Overview · Duplicates · Cross-Tab · Mismatches · Distributions · Languages · Images · Hotspots · Diagnostics) consolidates deep-insight views that used to live in three separate sections. A Validation page cross-checks the platform against Xingwu's independent PHP audit (92.3% agreement on 33,738 UUIDs) and the monthly Siteimprove snapshot — proving accuracy against external sources. Editor attribution means every file has an uploader and every page has an editor; \"Mine\" toggles on every report card let staff focus immediately. Per-department 30-day Health-score sparklines show trend direction at a glance. Vertex AI runs Claude Sonnet 4.5 for the Ask Agent + Citizen Journeys, and Gemini 2.5 Flash for the Service Scout classifier + the daily executive narrative. Min-instances=1 on Cloud Run + a RouteErrorBoundary in the React shell — no more cold-start lag, no whole-app crashes on a single page error.",
    keyFeatures: [
      "Six-bucket File_Status classification (CONNECTED · EMBEDDED · UNPUBLISHED_ONLY · NOISE_ONLY · ORPHAN_MEDIA · ORPHAN_FILE) — deterministic, not ML",
      "Validation against Xingwu's independent PHP audit (92.3% agreement on 33,738 UUIDs) + monthly Siteimprove reconciliation",
      "Section-overview UI (Home · Files · Pages · Services · Workbench · Departments) with collapsible sidebar and per-section overview pages",
      "Analytics page with 8 tabs — merged Deep Insights + Visualizations into one navigation surface in June 2026",
      "Editor attribution: every file has an Uploader, every page has an Editor — \"Mine\" toggles on every report card",
      "Per-department 30-day Health-score sparklines with trend direction at a glance",
      "Dictionary editor for misspellings allowlist (181 proper-noun overrides shipped → 35,413 misspellings, down from 45,856)",
      "Vertex AI: Claude Sonnet 4.5 (Ask Agent, Citizen Journeys) + Gemini 2.5 Flash (Service Scout + daily executive narrative)",
      "Cloud Run min-instances=1 + RouteErrorBoundary — no cold-start lag, no whole-app crashes on a single page error",
    ],
    icon: "Eye",
    featured: true,
    category: "compliance",
    image: "/images/projects/file-intel/file-intel-1-executive.png",
    dashboardImage:
      "/images/projects/file-intel/file-intel-2-site-health.png",
    architectureImage:
      "/images/projects/file-intel/file-intel-4-file-detail.png",
    screenshots: fileIntelScreenshots,
    impactMetrics: [
      {
        label: "Files Classified",
        value: "56,500",
        detail: "every nightly run, across 30 departments",
      },
      {
        label: "Pages Crawled",
        value: "9,900",
        detail: "with WCAG 2.1 AA axe-core scoring",
      },
      {
        label: "Xingwu Agreement",
        value: "92.3%",
        detail: "validated against independent PHP audit (33,738 UUIDs)",
      },
      {
        label: "Audit Modules",
        value: "10",
        detail: "a11y, SEO, links, performance, PII, spelling, more",
      },
      {
        label: "File Buckets",
        value: "6",
        detail: "deterministic classification (no ML guesswork)",
      },
      {
        label: "Departments Scored",
        value: "30",
        detail: "per-department 30-day health sparklines",
      },
    ],
  },
  {
    slug: "ai-testing-platform",
    title: "AI-Powered Testing Platform",
    subtitle: "6-Agent System for Legacy Modernization",
    program: "multco-ai",
    programStatus: "Active Development",
    department: "DCHS / QA",
    presentationUrl: "https://multco-presentations.web.app/projects/testing/",
    tech: [
      "Vertex AI",
      "Claude Sonnet 4.6",
      "Playwright",
      "FastAPI",
      "Postgres + pgvector",
      "React",
      "Vite",
      "Tailwind",
      "Cloud Run",
      "Cloud SQL",
      "Identity-Aware Proxy",
      "Workload Identity Federation",
    ],
    stats: [
      { label: "Agents Closed-Loop", value: "5/6" },
      { label: "Indexed Symbols", value: "9,420" },
      { label: "Specs / Run", value: "148" },
    ],
    shortDescription:
      "A team of 6 specialized AI agents that indexes legacy codebases, captures institutional knowledge before retiring staff walk out the door, generates regression tests from that knowledge, and watches for drift on every commit. Multi-tenant from day one — UCR is tenant 1; ACHP onboards next.",
    fullDescription:
      "A 6-agent system that lets legacy systems stay safe to change. CODEX (codebase intelligence with 9,420 indexed symbols + 8 drift detectors) reads the existing code; KNOWLEDGE (typed extraction across 704 sessions with plain-language search) captures tribal knowledge from retiring SMEs before they walk out the door; TESTGEN (Playwright generation at v2 + auto-confirm policy moving 146 drafts/day) turns that knowledge into executable specs; GUARDIAN (regression watch + queued-runner pattern) runs the specs and flags drift; OPERATOR (the orchestrator — Mounika's chief of staff) synthesizes cross-agent state into a daily briefing with actionable proposals; INTEGRATION (Phase F) is designed-not-built. Privacy guardrails verified on real data — a two-stage PHI classifier (heuristic short-circuit + LLM second-pass) held 321 files for human review, and after-the-fact audits found 11 leaks the heuristic missed and the LLM caught — purged, with the routing config updated so they SKIP on re-ingest. Multi-tenant architecture from day one: RLS on every table keyed by tenant_id, per-agent service accounts, IAP gating, Workload Identity Federation (no service-account JSON keys). UCR is tenant 1; ACHP onboards in Phase G.",
    keyFeatures: [
      "6 specialized agents: CODEX (codebase intelligence + 8 drift detectors), KNOWLEDGE (typed SME extraction), TESTGEN (Playwright generation), GUARDIAN (regression watch), OPERATOR (orchestrator), INTEGRATION (designed)",
      "TESTGEN v2 prompt iteration after live QAT runs — 208 drafts at 98.1% compile-clean under sequential-workflow + UCR hover-menu nav discipline",
      "Auto-confirm policy moves 146 drafts/day out of SME review backlog via pattern-match — 38% inbox clearance without SME involvement, fully audited",
      "GUARDIAN queued-runner pattern — browser \"Trigger run\" button writes to Postgres work queue; polling runner claims jobs and executes Playwright (~35s end-to-end)",
      "OPERATOR deterministic rule engine reads cross-agent state and produces Mounika a prioritized daily briefing + Approve/Reject proposals — solves the \"who orchestrates the orchestrator?\" gap that breaks 5-specialist fleets at 20 tenants",
      "Two-stage PHI privacy guardrails (heuristic short-circuit + LLM second-pass) validated on real data — 321 files held for review, 11 missed leaks caught + purged + routing updated",
      "Multi-tenant from day one — RLS keyed by tenant_id, per-agent service accounts, IAP gating, Workload Identity Federation (no service-account JSON keys)",
      "Stakeholder hub with open-questions surface — Rikki, Margretta, Antonio, Michelle answer tribal-knowledge questions async; 50 of 77 resolved",
    ],
    icon: "Bot",
    featured: true,
    category: "ai-agents",
    image: "/images/projects/ai-testing-platform/ai-testing-platform-1-cover.png",
    dashboardImage:
      "/images/projects/ai-testing-platform/ai-testing-platform-1-cover.png",
    architectureImage:
      "/images/projects/ai-testing-platform/ai-testing-platform-1-cover.png",
    impactMetrics: [
      {
        label: "Agents Closed-Loop",
        value: "5/6",
        detail: "CODEX · KNOWLEDGE · TESTGEN · GUARDIAN · OPERATOR shipped",
      },
      {
        label: "Indexed Symbols",
        value: "9,420",
        detail: "CODEX codebase intelligence with 8 drift detectors",
      },
      {
        label: "Auto-Confirm Rate",
        value: "146 / day",
        detail: "drafts moved out of SME backlog (38% inbox clearance)",
      },
      {
        label: "Latest GUARDIAN Run",
        value: "148 specs",
        detail: "144 passed in 22 minutes against UCR QAT",
      },
      {
        label: "PHI Leak Catches",
        value: "11",
        detail: "missed by heuristic, caught by LLM second-pass, purged",
      },
      {
        label: "Tenants",
        value: "1 → N",
        detail: "UCR is tenant 1; ACHP onboards in Phase G",
      },
    ],
  },
  {
    slug: "ucr-modernization",
    title: "UCR Modernization",
    subtitle: "Behavioral Test Capture from Retiring SMEs",
    program: "multco-ai",
    programStatus: "Discovery",
    department: "DCHS",
    presentationUrl: "https://multco-presentations.web.app/projects/ucr/",
    tech: [
      "Playwright (regression suite)",
      "FastAPI",
      "React",
      "Vite",
      "Postgres 16 + pgvector",
      "Vertex AI",
      "Claude Sonnet 4.6",
      "FHIR-aligned domain model",
      "Cloud Run",
      "Identity-Aware Proxy",
      "Workload Identity Federation",
    ],
    stats: [
      { label: "SME Knowledge Sessions", value: "704" },
      { label: "Behavioral Tests (v2)", value: "208" },
      { label: "Questions Answered", value: "32 / day" },
    ],
    shortDescription:
      "Vision for modernizing the Universal Client Registry — DCHS's system for managing client demographics, enrollments, and services across four divisions. Gated on first proving behavioral equivalence: every workflow Rikki documented over 36 years becomes an executable test the modernized UCR must pass before it ships.",
    fullDescription:
      "DCHS staff spend their time on people, not data entry. The modernization is gated on first proving behavioral equivalence — every workflow Rikki documented over 36 years becomes an executable test the modernized UCR must pass before it ships. Knowledge transfer is happening live: the open-questions hub lets SMEs answer the platform team async, and answers automatically update the behavioral specs. 208 Playwright tests under qa_items_v2 prompt enforce sequential workflow + UCR hover-menu nav discipline (iterated from v1 after live QAT runs surfaced two structural issues). 703 historical sessions (ERDs, ETL specs, Jama stories, runbooks, meeting notes) ingested into the knowledge platform — queryable as structured rows with full provenance. Rikki's retirement-risk timer is unwinding: 32 tribal-knowledge questions answered in a single round, open count 44 → 27 — each answer locks a specific behavioral spec the modernized app must preserve. WS6 reconciliation themes (legacy-vs-modernized gaps) are now direct DB queries; WS6 code-vs-intent reconciliation SME-signed for downstream agents. Cloud Run + Cloud SQL + Identity-Aware Proxy + Workload Identity Federation infrastructure ready — all Terraform, awaiting GCP IAM grant.",
    keyFeatures: [
      "Behavioral acceptance contract — 208 Playwright tests (98.1% compile-clean) become the criteria the modernized UCR must pass before shipping",
      "Historical UCR corpus ingested — 703 sessions across ERDs, ETL specs, Jama stories, runbooks, meeting notes — queryable as structured rows with full provenance",
      "Rikki retirement-risk timer unwinding — 32 tribal-knowledge questions answered in a single round; each answer locks a specific behavioral spec",
      "WS6 code-vs-intent reconciliation SME-signed — authoritative for downstream agents (CODEX queries, TESTGEN v1 generation)",
      "Open-questions hub — SMEs answer the platform team async; answers automatically update the behavioral specs they touch",
      "Cloud Run + Cloud SQL + IAP + Workload Identity Federation deployment infrastructure ready (Terraform, awaiting IAM grant)",
      "FHIR-aligned domain model under the hood — designed for human-services data semantics",
      "Mock UI screens complete — 7 interactive prototypes for stakeholder review",
    ],
    icon: "BookOpen",
    featured: true,
    category: "full-stack",
    image: "/images/projects/ucr-modernization/ucr-modernization-1-cover.png",
    dashboardImage:
      "/images/projects/ucr-modernization/ucr-modernization-1-cover.png",
    architectureImage:
      "/images/projects/ucr-modernization/ucr-modernization-1-cover.png",
    impactMetrics: [
      {
        label: "SME Knowledge Sessions",
        value: "704",
        detail: "ERDs, ETL, Jama stories, runbooks, meetings — full provenance",
      },
      {
        label: "Behavioral Tests Ready",
        value: "208",
        detail: "Playwright suite (v2) at 98.1% compile-clean",
      },
      {
        label: "Tribal Questions Closed",
        value: "32 / day",
        detail: "via the SME open-questions hub",
      },
      {
        label: "SME-Confirmed Sessions",
        value: "20",
        detail: "authoritative sources the rebuild must honor",
      },
      {
        label: "Years of Tribal Knowledge",
        value: "36",
        detail: "captured before Rikki's retirement",
      },
      {
        label: "Acceptance Contract",
        value: "Behavioral",
        detail: "modernized UCR must pass 208/208 before ship",
      },
    ],
  },
  /* ──────────────────────────────────────────
     OTHER MULTNOMAH COUNTY WORK (predecessor)
     ────────────────────────────────────────── */
  {
    slug: "linkit",
    title: "Content Automation (Linkit)",
    subtitle: "Multilingual Translation Pipeline",
    tech: ["PHP", "Drupal 10", "Vertex AI", "Gemini", "Multi-Agent"],
    stats: [
      { label: "Pages Processed", value: "20,000+" },
      { label: "Speed", value: "26×" },
      { label: "Cost Saved", value: "$34,946" },
    ],
    shortDescription:
      "Four specialized PHP agents making government pages translation-ready in 24 hours vs. 79-day manual effort. Protected 32K internal links from translation corruption.",
    fullDescription:
      "Production NLP system making 20,000+ government pages translation-ready. Four specialized PHP agents: link conversion (32K internal links to Linkit UUID), address protection, phone/email shielding, orchestration with checkpoint/resume fault tolerance. Vertex AI designed agent logic and regex patterns; human-in-the-loop validation. 633-hour manual effort reduced to 24-hour deployment — 26× faster, $34,946 saved (89% cost reduction).",
    keyFeatures: [
      "Four specialized PHP agents with checkpoint/resume fault tolerance",
      "Link conversion protecting 32K internal links via Linkit UUID",
      "Address protection and phone/email shielding",
      "Vertex AI-designed agent logic and regex patterns",
      "Human-in-the-loop validation workflow",
      "633 hours reduced to 24 hours — 26× faster",
      "89% cost reduction ($34,946 saved)",
    ],
    icon: "Globe",
    featured: true,
    category: "nlp",
    image: "/images/projects/project-linkit.png",
    dashboardImage: "/images/projects/project-linkit-dashboard.png",
    architectureImage: "/images/projects/project-linkit-architecture.png",
  },
  /* ──────────────────────────────────────────
     OTHER PROJECTS
     ────────────────────────────────────────── */
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
