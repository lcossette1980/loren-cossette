export interface WorkflowPhase {
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  items: { label: string; detail: string }[];
  callout: string;
}

export interface FolderNode {
  indent: number;
  text: string;
  type: "folder" | "file";
  note?: string;
}

export const workflowPhases: WorkflowPhase[] = [
  {
    number: "01",
    title: "Define End State",
    subtitle: "Never touch code without it",
    summary:
      "Answer three questions before anything else. Every decision flows from here.",
    items: [
      {
        label: "Who is the user?",
        detail:
          "Internal team? Client? End consumer? API consumer? Be specific.",
      },
      {
        label: "What does 'done' look like from their eyes?",
        detail:
          "Not your eyes. Theirs. What do they click, see, feel, accomplish?",
      },
      {
        label: "One-sentence job description",
        detail:
          "If you can't say it in one sentence, you don't understand it yet. Pin it. Reference it constantly.",
      },
    ],
    callout:
      "When you're 14 hours deep and the AI suggests some elegant abstraction — look at this and ask: does this serve the end state?",
  },
  {
    number: "02",
    title: "Three-Layer Research Sweep",
    subtitle: "Your biggest risk is rebuilding what exists",
    summary:
      "Every project gets a research phase. No exceptions. Three layers, every time.",
    items: [
      {
        label: "Layer 1 — GitHub & Open Source Recon",
        detail:
          "Search for existing repos, production code, folder structures. Check Issues & Discussions for landmines. Look for 'awesome-[topic]' lists.",
      },
      {
        label: "Layer 2 — Docs & API Deep Dives",
        detail:
          "Read real docs, not blog summaries. Check rate limits, auth patterns, error codes, deprecation notices. Pull SDK source when docs are unclear.",
      },
      {
        label: "Layer 3 — Community & Production Knowledge",
        detail:
          "Discord, Reddit, Stack Overflow war stories. Postmortems. Twitter/X from tool maintainers. Conference talks on YouTube.",
      },
    ],
    callout: "The code never lies. When docs are unclear, read the source.",
  },
  {
    number: "03",
    title: "Architecture First",
    subtitle:
      "You're an architect who codes, not a coder who stumbles into architecture",
    summary:
      "Draw the system before you build it. Every time. Even if it's ugly.",
    items: [
      {
        label: "Map every data flow",
        detail:
          "What enters, what transforms, what exits. If you can't trace data from input to output, you don't have architecture.",
      },
      {
        label: "Identify risks & dependencies",
        detail:
          "Mark every external dependency. Know what happens when each one fails. Define boundaries: your code vs. services vs. integrations.",
      },
      {
        label: "Decide where state lives",
        detail:
          "This single decision shapes everything. How state moves through your system determines your entire architecture.",
      },
      {
        label: "Pass the 2-minute test",
        detail:
          "Can you explain the full data flow in under 2 minutes? If not, simplify until you can.",
      },
    ],
    callout:
      "Don't build for 100x scale. Build for the current need with doors open to walk through later.",
  },
  {
    number: "04",
    title: "Build in Vertical Slices",
    subtitle: "End-to-end paths, not horizontal layers",
    summary:
      "Build one complete path through the system. Get it working with real data. Then add the next.",
    items: [
      {
        label: "Happy path E2E first",
        detail:
          "One flow, input to output, fully working. This gives the AI an anchor pattern to replicate.",
      },
      {
        label: "Real data, not mock data",
        detail:
          "Test with production-like data as early as possible. Mock data hides the bugs that matter.",
      },
      {
        label: "Error handling per slice",
        detail:
          "Add error handling to each path before moving on. Don't batch it — context is fresh now.",
      },
      {
        label: "Refactor at 3 repetitions",
        detail:
          "Only extract shared patterns after you see them repeat 3+ times. Premature abstraction kills.",
      },
    ],
    callout:
      "Horizontal layers give AI no anchor. Vertical slices give it a working reference to replicate.",
  },
  {
    number: "05",
    title: "AI Collaboration Protocol",
    subtitle:
      "A two-person team where one has mass knowledge but zero context",
    summary:
      "Structure every AI interaction with the same discipline you'd use briefing a contractor.",
    items: [
      {
        label: "The Prompt Stack",
        detail:
          "Always in order: (1) Context — the system and component's role. (2) Constraints — limits, environments, performance. (3) Patterns — paste existing code examples. (4) Request — the specific thing. (5) Verification — how it handles failure.",
      },
      {
        label: "Always provide",
        detail:
          "Full architectural context. The file's role in the system. End-user outcome. Existing conventions with code examples. Hard constraints.",
      },
      {
        label: "Always demand",
        detail:
          "Explanation of decisions, not just code. Error handling for every external call. Logging at decision points. Type safety at boundaries. Critical path tests.",
      },
    ],
    callout:
      "You're not 'using AI to code.' You're running a two-person engineering team.",
  },
  {
    number: "06",
    title: "Non-Negotiable Standards",
    subtitle: "The things that save you at 2 AM when production breaks",
    summary:
      "Config, error handling, logging, and code organization. No shortcuts.",
    items: [
      {
        label: "Config & Secrets",
        detail:
          "Env vars for everything. Never hardcode. Use .env.example. Document every variable.",
      },
      {
        label: "Error Handling & Resilience",
        detail:
          "Every external call: retry + timeout + fallback + logging. Circuit breakers for frequent calls. Dead letter queues for silent failures.",
      },
      {
        label: "Logging & Observability",
        detail:
          "Log decisions, not just errors. Structured JSON. Correlation/trace IDs. Log the 'why' — 'Retrying: rate_limit_exceeded' not just 'Retrying'.",
      },
      {
        label: "DECISIONS.md",
        detail:
          "Log every significant choice: context, options considered, decision, why, trade-offs, when to revisit. Your future self's best friend.",
      },
    ],
    callout: "Fail loud in dev. Fail graceful in prod.",
  },
  {
    number: "07",
    title: "Validate & Ship",
    subtitle: "The Future Solo Dev Test",
    summary:
      "Imagine you've been away 6 months. You get paged at midnight. Can you fix it?",
    items: [
      {
        label: "Find it in 2 minutes",
        detail:
          "Can you find the relevant code from the folder structure alone? If not, restructure.",
      },
      {
        label: "Understand from names alone",
        detail:
          "Function and file names should tell the story. If you need comments to understand intent, rename things.",
      },
      {
        label: "Debug from logs alone",
        detail:
          "Can you identify the failure without adding new log statements? If not, add more logging now.",
      },
      {
        label: "Fix without full context",
        detail:
          "Can you deploy a fix without understanding the entire system? Isolation and boundaries make this possible.",
      },
    ],
    callout: "If any answer is no, you're not done.",
  },
];

export const folderStructure: FolderNode[] = [
  { indent: 0, text: "project/", type: "folder" },
  { indent: 1, text: "src/", type: "folder" },
  { indent: 2, text: "core/", type: "folder", note: "Business logic — no external deps" },
  { indent: 2, text: "integrations/", type: "folder", note: "External API wrappers" },
  { indent: 2, text: "orchestration/", type: "folder", note: "Workflow coordination" },
  { indent: 2, text: "models/", type: "folder", note: "Data structures & schemas" },
  { indent: 2, text: "config/", type: "folder", note: "Config loading & validation" },
  { indent: 1, text: "tests/", type: "folder" },
  { indent: 1, text: "scripts/", type: "folder", note: "One-offs, migrations" },
  { indent: 1, text: "docs/", type: "folder", note: "Architecture, runbooks" },
  { indent: 1, text: ".env.example", type: "file" },
  { indent: 1, text: "README.md", type: "file" },
  { indent: 1, text: "DECISIONS.md", type: "file", note: "Most important file" },
];

export const retroQuestions = [
  "What pattern did I repeat that I should automate or templatize?",
  "Where did I waste the most time — knowledge gap or process gap?",
  "What did the AI get wrong that better prompting would've caught?",
  "What's one thing I learned that changes how I build?",
  "Is there a tool or service I should evaluate before next week?",
];
