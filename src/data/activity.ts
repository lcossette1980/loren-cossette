/* ── Activity Feed ──
 *  Dated record of what shipped, when. Mirrors the multco-presentations
 *  hub feed but lives on the personal site for buyer credibility.
 *
 *  Add new entries at the TOP of the array. Use ISO date strings.
 *  Keep summaries terse and specific — names, numbers, what changed.
 *  Avoid marketing language; this feed only works if it reads like a
 *  changelog, not a press release.
 */

export type ActivityType = "MILESTONE" | "FEATURE" | "FIX" | "RESEARCH";

export interface ActivityEntry {
  /** ISO date string, e.g. "2026-06-12" */
  date: string;
  type: ActivityType;
  /** Short project label that maps to a known program/project */
  project: string;
  /** Optional href — links to the project detail page or external URL */
  href?: string;
  /** One-line description of what shipped */
  summary: string;
}

export const activity: ActivityEntry[] = [
  /* ── Multco AI Program — June 2026 ── */
  {
    date: "2026-06-12",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "OPERATOR v0 shipped end-to-end (the 6th agent — ADRs 0012 + 0013). Deterministic rule engine reads cross-agent state and produces Mounika a prioritized daily briefing + Approve/Reject proposals. Schema (4 tables w/ RLS) → Python agent (8 rules + dedupe) → CLI → 6 backend endpoints → PlatformHome briefing card — all shipped + validated against real Cloud SQL data.",
  },
  {
    date: "2026-06-12",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "TESTGEN auto-confirm policy live (ADR 0011) — 146 drafts moved out of SME review backlog via pattern-match (3+ prior confirms in same role/area, medium/high confidence, GUARDIAN as regression catcher). 38% of inbox cleared without SME involvement; auditable trail for every promotion.",
  },
  {
    date: "2026-06-12",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "GUARDIAN v0.5 queued-runner pattern shipped (ADR 0010). Browser \"Trigger run\" button writes to a Postgres work queue; a polling runner claims jobs and executes Playwright. End-to-end loop validated in production — ~35s from trigger to inbox-row-visible.",
  },
  {
    date: "2026-06-12",
    type: "MILESTONE",
    project: "UCR Modernization",
    href: "/projects/ucr-modernization",
    summary:
      "Testing platform deployed end-to-end on GCP — the regression harness for the UCR rebuild is now operational. Cloud Run × 2 + Cloud SQL + IAP + auto-deploy on every push to main. When the modernized UCR comes online, GUARDIAN replays the captured Playwright suite to prove behavior parity per workflow.",
  },
  {
    date: "2026-06-12",
    type: "MILESTONE",
    project: "UCR Modernization",
    href: "/projects/ucr-modernization",
    summary:
      "First SME confirms via the deployed UI: 10 KNOWLEDGE sessions now SME-confirmed (DCHS strategy report, Rikki test-user provisioning walkthrough, Q-hub answers, password-reset runbook, 4 v1-smoke sessions, 2026-06-10 Rikki demo). These are the authoritative sources the rebuild must honor.",
  },
  {
    date: "2026-06-12",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "Full non-admin GUARDIAN suite ran against UCR QAT: 148 specs, 144 passed, 4 failed, 22 minutes. TESTGEN v1 prototype (KNOWLEDGE workflow → Playwright spec) shipped as pattern doc + working sample spec for the next-iteration generator.",
  },
  {
    date: "2026-06-11",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "GUARDIAN v0 shipped per ADR 0009 — Playwright runner + per-test persist + flake detection + actor-inbox UI. 4 of 5 agents now operationally closed-loop (was 3). 17/17 tests pass. Captured the admin-perms-gap failure from yesterday's v2 admin spec stress-test as the first real artifact in the inbox.",
  },
  {
    date: "2026-06-11",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "CODEX detector pack expanded from WS6 gap analysis: +CsrfTokenMissing +VendorUrlHardcoded +TestArtifactInProd + widened LookupID v0.1 → v0.4 to cover all *TypeID fields. Stress-test against UCR_app surfaced TestFundingSourceService.cs (net-new finding WS6 didn't catch). 99/99 tests pass.",
  },
  {
    date: "2026-06-10",
    type: "MILESTONE",
    project: "A11yReady",
    href: "/projects/a11yready",
    summary:
      "Forms structural overhaul (H207–H211b): source section headers, professional field naming, page-primary multi-page ordering, fillable tables, and character-comb field merge — driven by real reviewer rejections.",
  },
  {
    date: "2026-06-10",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "TESTGEN qa_items_v2 prompt iteration after live QAT runs surfaced 2 structural issues (per-step test() blocks lost state; hover-menu nav assumed direct links). v2 rewrote: one sequential test() per sheet + UCR hover-menu nav discipline. Full 208-draft regen at 98.1% compile clean in 42 min.",
  },
  {
    date: "2026-06-10",
    type: "MILESTONE",
    project: "File Intelligence Platform",
    href: "/projects/file-intel",
    summary:
      "Vertex narrative parser now tolerates markdown code fences; dictionary extended 120 → 181 entries — both effective on tomorrow's nightly run.",
  },
  {
    date: "2026-06-09",
    type: "FEATURE",
    project: "A11yReady",
    href: "/projects/a11yready",
    summary:
      "Feedback → directives loop (H208): reviewer edits now change outputs via safe, per-file deterministic fixes instead of being write-only. Replaces the statistical consensus templates that used to force-fit and regress forms.",
  },
  {
    date: "2026-06-09",
    type: "FEATURE",
    project: "File Intelligence Platform",
    href: "/projects/file-intel",
    summary:
      "Analytics page redesign: Errors → Diagnostics, Languages rebuilt on page-side data, Visualizations retired (unique charts merged into Analytics, redundant ones moved to Departments).",
  },
  {
    date: "2026-06-09",
    type: "MILESTONE",
    project: "UCR Modernization",
    href: "/projects/ucr-modernization",
    summary:
      "Rikki answered 32 tribal-knowledge questions on the open-questions hub across two rounds; open count 44 → 27. Each answer locks a specific behavioral spec the modernized app must preserve.",
  },
  {
    date: "2026-06-09",
    type: "MILESTONE",
    project: "UCR Modernization",
    href: "/projects/ucr-modernization",
    summary:
      "Legacy code drift detector retuned: 105 false-positive alerts on UCR_app legacy code dropped to 4 real findings after recognizing the older web.config auth pattern.",
  },
  {
    date: "2026-06-08",
    type: "FEATURE",
    project: "A11yReady",
    href: "/projects/a11yready",
    summary:
      "AcroForm anchoring + deterministic reading order (H203–H206): semantic field roles, role-driven sizing, and the \"Other: ___\" companion attachment.",
  },
  {
    date: "2026-06-08",
    type: "FIX",
    project: "File Intelligence Platform",
    href: "/projects/file-intel",
    summary:
      "Cloud Run min-instances bumped to 0 → 1; Workbench crash fix + RouteErrorBoundary shipped. No more cold-start lag, no more whole-app crashes on a single page error.",
  },
  {
    date: "2026-06-08",
    type: "MILESTONE",
    project: "UCR Modernization",
    href: "/projects/ucr-modernization",
    summary:
      "Historical UCR documentation absorbed: 835-file corpus ingested into the knowledge platform; 703 sessions live with full provenance and PHI safety checks.",
  },
  {
    date: "2026-06-05",
    type: "FEATURE",
    project: "File Intelligence Platform",
    href: "/projects/file-intel",
    summary:
      "Section-overview UI restructure: collapsible sidebar, six top-level sections (Home · Files · Pages · Services · Workbench · Departments), every section has an overview page.",
  },
  {
    date: "2026-06-04",
    type: "FEATURE",
    project: "A11yReady",
    href: "/projects/a11yready",
    summary:
      "Pipeline Advisor shipped — read-only analyst with persistent memory that gathers windowed evidence, surfaces findings, and tracks whether each shipped fix actually moved the metric, without ever mutating prompts or config. Plus intelligent per-cluster model routing on Vertex AI.",
  },
  {
    date: "2026-06-02",
    type: "FEATURE",
    project: "File Intelligence Platform",
    href: "/projects/file-intel",
    summary:
      "Editor attribution: page editor enrichment + Owner column on every report + Mine-only toggle. Every file has an Uploader; every page has an Editor.",
  },
  {
    date: "2026-05-28",
    type: "FEATURE",
    project: "File Intelligence Platform",
    href: "/projects/file-intel",
    summary:
      "Per-department 30-day Health-score sparklines added to Departments page.",
  },
  {
    date: "2026-05-22",
    type: "FEATURE",
    project: "File Intelligence Platform",
    href: "/projects/file-intel",
    summary:
      "Validation page polish: side-by-side Xingwu + Siteimprove reconciliation with month-over-month deltas.",
  },
  {
    date: "2026-05-20",
    type: "MILESTONE",
    project: "UCR Modernization",
    href: "/projects/ucr-modernization",
    summary:
      "Mock UI screens complete — 7 interactive prototypes for stakeholder review.",
  },
  {
    date: "2026-05-15",
    type: "MILESTONE",
    project: "File Intelligence Platform",
    href: "/projects/file-intel",
    summary:
      "Xingwu validation reaches 92.3% agreement on 33,738 UUIDs — independent PHP audit cross-check confirms the platform's classification accuracy.",
  },
  {
    date: "2026-05-11",
    type: "MILESTONE",
    project: "Clearview Politics",
    href: "https://clearviewpolitics.com",
    summary:
      "Production launch — AI-native political news platform with 7 autonomous agents, 17 cron jobs, multi-source synthesis with bias auditing, and fully automated cross-platform social posting.",
  },
  {
    date: "2026-04-03",
    type: "MILESTONE",
    project: "GTM Teardown",
    href: "https://gtmteardown.com",
    summary:
      "Production launch — 9-agent LangGraph SaaS platform producing complete go-to-market playbooks in under 10 minutes. Quick scan at ~3 min, full report at ~10 min.",
  },
  {
    date: "2026-03-20",
    type: "MILESTONE",
    project: "A11yReady",
    href: "/projects/a11yready",
    summary:
      "Production deployment serving Multnomah County agencies — first public document conversions begin running through the deployed pipeline.",
  },
];
