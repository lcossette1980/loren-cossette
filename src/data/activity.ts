/* ── Activity Feed / Delivery Evidence ──
 *
 *  Single source of truth: the Multnomah County AI Program hub at
 *  multco-presentations.web.app. The personal site fetches a public
 *  activity.json from that hub at build time (ISR, revalidate every hour).
 *
 *  This file holds two things:
 *   1. The fallback Multco entries (used only if the live fetch fails)
 *   2. The non-Multco entries (Clearview Politics launch, GTM Teardown
 *      launch, etc.) which are always appended to whatever Multco feed
 *      we end up with.
 *
 *  EXPECTED JSON SHAPE at https://multco-presentations.web.app/activity.json:
 *
 *    [
 *      {
 *        "date": "2026-06-19",                                // ISO YYYY-MM-DD
 *        "type": "MILESTONE",                                 // MILESTONE | FEATURE | FIX | RESEARCH
 *        "project": "AI Testing Platform",                    // project name (mapped to local slug)
 *        "summary": "knowledge_v2 baseline + ADR 0015 ...",   // one-line description
 *        "href": "https://multco-presentations.web.app/projects/testing/"
 *      },
 *      ...
 *    ]
 *
 *  CORS: the personal site fetches server-side via Next.js ISR, so
 *  cross-origin isn't an issue. No special headers needed on the hub.
 */

export type ActivityType = "MILESTONE" | "FEATURE" | "FIX" | "RESEARCH";

export interface ActivityEntry {
  /** ISO date string, e.g. "2026-06-19" */
  date: string;
  type: ActivityType;
  /** Project label — display name from Multco hub */
  project: string;
  /** Link to a detail page (relative path on this site or external URL) */
  href?: string;
  /** One-line description of what shipped */
  summary: string;
}

/* ── Multco hub URL ── */
const MULTCO_FEED_URL = "https://multco-presentations.web.app/activity.json";

/* ── Project name → local slug map ──
 * The Multco hub may use slightly different project naming. When an
 * entry comes in from the live feed, we rewrite the href to point at
 * the local case study so users stay on the personal site. */
const PROJECT_SLUG_MAP: Record<string, string> = {
  "A11yReady": "a11yready",
  "a11yReady": "a11yready",
  "File Intelligence Platform": "file-intel",
  "File Intelligence": "file-intel",
  "File Intel": "file-intel",
  "AI Testing Platform": "ai-testing-platform",
  "AI-Powered Testing Platform": "ai-testing-platform",
  "Testing Platform": "ai-testing-platform",
  "UCR Modernization": "ucr-modernization",
  UCR: "ucr-modernization",
};

function localHrefForProject(project: string): string | undefined {
  const slug = PROJECT_SLUG_MAP[project] || PROJECT_SLUG_MAP[project.trim()];
  return slug ? `/projects/${slug}` : undefined;
}

/* ── Non-Multco entries — always rendered alongside the County feed ── */
const otherProjectsActivity: ActivityEntry[] = [
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
];

/* ── Multco fallback ──
 * Used only if the live feed at multco-presentations.web.app is
 * unreachable (e.g. during initial deploy before the hub exposes JSON,
 * or if the hub is down). Always rendered in order, most recent first.
 * Updated by hand any time the live feed is broken for an extended period. */
const multcoStaticFallback: ActivityEntry[] = [
  /* ── June 19, 2026 ── */
  {
    date: "2026-06-19",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "knowledge_v2 baseline + ADR 0015 (MEDIC) build gate opens. First end-to-end GUARDIAN baseline against the new knowledge_v2 corpus: 10 workflow subdirs, 17 tests. Failures categorized cleanly for MEDIC v0 scoping — selector-hallucinations as the primary bullseye. ADR 0015 build gate now open after capturing ≥10 PageObject-using failures.",
  },
  {
    date: "2026-06-19",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "First GUARDIAN-auto-surfaced legacy bug. While diagnosing the OPI Classic In-Home Approval workflow, the platform surfaced a real runtime exception in UCR's ContractDeliverables endpoint. Plain-language brief written for Mounika with URL, run_id, 3 hypotheses, ELMAH pointer. The platform working as designed — automated tests catching real production bugs faster than humans would have flagged.",
  },
  {
    date: "2026-06-19",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "4 knowledge_v2 prompt lessons encoded and verified stuck on first regen. L1 (exact menu→sub-item match), L2 (scope assertions to one element type), L3 (no page.goto('/')), L4 (test.skip on missing seed env). Regen smoke on Care Transitions session confirmed L1-L3 stuck on the very next generation — no hand-holding. Manual analog of MEDIC: read failure → categorize → update prompt → regen → verify.",
  },
  /* ── June 17, 2026 ── */
  {
    date: "2026-06-17",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "Confidence scoring fix — knowledge_v2 drafts can now bucket HIGH. Every draft was scoring LOW despite coming from SME-confirmed sessions because the band function couldn't distinguish NOT_RUN from FAILED. Refactored to take CompileStatus enum directly + added SME-confirmed boost path. One-shot re-bucket on 13 drafts: 6 → HIGH, 7 → MEDIUM. Unblocks auto-confirm policy from picking up knowledge_v2 drafts.",
  },
  {
    date: "2026-06-17",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "4 follow-on fixes from real-data SME ingest session. (1) nginx 1 MB upload limit removed — training docs reach the backend. (2) POOL_FETCH_LIMIT 50 → 500 — fresh knowledge_v2 drafts no longer buried behind old high-confidence ones. (3) PHI override path with explicit SME attestation logging. (4) Cloud Run cpu-throttling=false — knowledge_v2 trigger runs in seconds, not minutes.",
  },
  {
    date: "2026-06-17",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "TESTGEN preview/expand UX fixes. NeedsYouLane was burying fresh knowledge_v2 drafts behind older high-confidence ones — fixed with client-side sort on generated_at DESC, 'newest N first' subtitle. 'See all drafts' button was opening a single-draft drawer due to copy-paste bug — replaced with inline expand/collapse toggle.",
  },
  {
    date: "2026-06-17",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "KNOWLEDGE → TESTGEN loop closed end-to-end. New knowledge_v2 generator + on-confirm BackgroundTasks hook: SME confirms a KNOWLEDGE session → TESTGEN auto-fires and generates one Playwright draft per workflow. First proof: Margretta's Medical Alert PDF → 2 drafts with correct PageObject imports and env-var defaults pulled from extracted key_facts. The platform's marketing flow now actually works: SME walks through a workflow → tests appear in the inbox.",
  },
  {
    date: "2026-06-17",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "KNOWLEDGE ingestion accepts files, not just paste-in text. Drag-drop or click-to-browse for .docx, .pdf, .xlsx, .csv, .md, .txt (50 MB limit). Pipeline: tmpfile → convert → STAGE 1 heuristic PHI triage → env-gated STAGE 2 LLM PHI classification → extract → persist. Unblocks ingestion of UCR training documents Margretta's team is sharing.",
  },
  /* ── June 12, 2026 ── */
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
  /* ── June 10–11, 2026 ── */
  {
    date: "2026-06-11",
    type: "MILESTONE",
    project: "AI Testing Platform",
    href: "/projects/ai-testing-platform",
    summary:
      "GUARDIAN v0 shipped per ADR 0009 — Playwright runner + per-test persist + flake detection + actor-inbox UI. 4 of 5 agents now operationally closed-loop. Captured the admin-perms-gap failure from yesterday's v2 admin spec stress-test as the first real artifact in the inbox.",
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
      "TESTGEN qa_items_v2 prompt iteration after live QAT runs surfaced 2 structural issues. v2 rewrote: one sequential test() per sheet + UCR hover-menu nav discipline. Full 208-draft regen at 98.1% compile clean in 42 min.",
  },
  {
    date: "2026-06-10",
    type: "MILESTONE",
    project: "File Intelligence Platform",
    href: "/projects/file-intel",
    summary:
      "Vertex narrative parser now tolerates markdown code fences; dictionary extended 120 → 181 entries — both effective on tomorrow's nightly run.",
  },
  /* ── June 8–9, 2026 ── */
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
  /* ── May 2026 + earlier ── */
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
    date: "2026-03-20",
    type: "MILESTONE",
    project: "A11yReady",
    href: "/projects/a11yready",
    summary:
      "Production deployment serving Multnomah County agencies — first public document conversions begin running through the deployed pipeline.",
  },
];

/* ── Live fetch with ISR + graceful fallback ── */

interface RawMultcoEntry {
  date?: string;
  type?: string;
  project?: string;
  summary?: string;
  href?: string;
}

function isValidType(t: unknown): t is ActivityType {
  return t === "MILESTONE" || t === "FEATURE" || t === "FIX" || t === "RESEARCH";
}

function normalizeMultcoEntry(raw: RawMultcoEntry): ActivityEntry | null {
  if (
    typeof raw.date !== "string" ||
    typeof raw.project !== "string" ||
    typeof raw.summary !== "string"
  ) {
    return null;
  }
  const type = isValidType(raw.type) ? raw.type : "MILESTONE";
  // Prefer local case study link over the external Multco URL so users
  // stay on the personal site. Falls back to whatever the hub provided.
  const href = localHrefForProject(raw.project) ?? raw.href;
  return {
    date: raw.date,
    type,
    project: raw.project,
    summary: raw.summary,
    href,
  };
}

/**
 * Fetch the Multco activity feed, merge with non-Multco entries, sort by date.
 * Uses ISR — Vercel re-fetches every hour. Graceful fallback to the
 * hand-maintained array if the live endpoint is unavailable.
 */
export async function getActivity(): Promise<ActivityEntry[]> {
  let multco: ActivityEntry[] = multcoStaticFallback;

  try {
    const res = await fetch(MULTCO_FEED_URL, {
      next: { revalidate: 3600 }, // 1 hour
    });
    if (res.ok) {
      const data: unknown = await res.json();
      if (Array.isArray(data)) {
        const parsed = data
          .map((raw) => normalizeMultcoEntry(raw as RawMultcoEntry))
          .filter((e): e is ActivityEntry => e !== null);
        if (parsed.length > 0) multco = parsed;
      }
    }
  } catch {
    // Network or parse error — use fallback array silently. The page
    // still renders cleanly; only the Multco section may be stale.
  }

  return [...multco, ...otherProjectsActivity].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

/* Legacy synchronous export — kept for any consumer that imports the
 * static array directly. New code should call getActivity(). */
export const activity: ActivityEntry[] = [
  ...multcoStaticFallback,
  ...otherProjectsActivity,
].sort((a, b) => b.date.localeCompare(a.date));
