import type {
  OverrideTemplate,
  OverridePersona,
  OverrideStat,
  OverrideFramework,
  OverrideFeature,
} from "@/types";

export const bookInfo = {
  title: "OVERRIDE",
  subtitle: "The AI Transformation Playbook for Hostile Territory",
  tagline: "Change management assumes good faith. This book doesn't.",
  heroLine: "You weren't hired to ask permission. You were hired to deliver results.",
  traditions: "Machiavelli. Sun Tzu. Alinsky. Now You.",
  pageCount: 312,
  buyUrl: "#", // TODO: Add actual buy link
};

export const stats: OverrideStat[] = [
  { value: 80, suffix: "%", label: "of AI transformation projects fail to deliver expected value" },
  { value: 31, suffix: "%", label: "of workers actively resist new technology adoption" },
  { value: 88, suffix: "%", label: "of transformations fail without structured methodology" },
];

export const frameworks: OverrideFramework[] = [
  {
    part: "Part I",
    title: "Map the Terrain",
    description: "Decode the resistance genome. Identify who fights you, why, and how.",
  },
  {
    part: "Part II",
    title: "Build Your Arsenal",
    description: "Forge stealth coalitions. Create proof that silences skeptics.",
  },
  {
    part: "Part III",
    title: "Deploy & Survive",
    description: "Execute the 72-hour framework. Navigate attacks. Protect your position.",
  },
  {
    part: "Part IV",
    title: "Scale & Institutionalize",
    description: "Transform insurgency into infrastructure. Make change irreversible.",
  },
];

export const features: OverrideFeature[] = [
  { icon: "BookOpen", heading: "15 Chapters", description: "Four-part strategic methodology from reconnaissance to institutionalization" },
  { icon: "FileText", heading: "17 Templates", description: "Field-ready worksheets for every phase of your transformation campaign" },
  { icon: "MessageSquare", heading: "11 Scripts", description: "Word-for-word scripts for the conversations nobody wants to have" },
  { icon: "Clock", heading: "72-Hour Framework", description: "Rapid deployment playbook for time-critical transformation windows" },
  { icon: "Swords", heading: "4 Strategic Traditions", description: "Machiavelli, Sun Tzu, Alinsky, and Gramsci — operationalized" },
  { icon: "Target", heading: "Real-World Playbooks", description: "Battle-tested scenarios from organizations that actively resisted change" },
];

export const personas: OverridePersona[] = [
  {
    title: "The Mid-Level Leader",
    icon: "knight",
    description: "You see the opportunity. You have the mandate. But the organization won't move. You need tactics, not theory.",
  },
  {
    title: "The AI Practitioner",
    icon: "bishop",
    description: "You can build the solution. But nobody asked you to. And the people who should want it are actively fighting it.",
  },
  {
    title: "The Change Agent",
    icon: "rook",
    description: "You've read the change management books. They assumed rational actors and good faith. Your organization has neither.",
  },
];

export const templates: OverrideTemplate[] = [
  {
    number: 1,
    name: "The Resistance Audit",
    slug: "resistance-audit",
    category: "keystone",
    chapter: "Chapter 1",
    description: "A living stakeholder table that classifies each person as Confused, Threatened, or Hostile relative to a specific initiative. Designed to be updated quarterly.",
    pdfPath: "/templates/01_Resistance_Audit.pdf",
  },
  {
    number: 2,
    name: "The Standards Ledger",
    slug: "standards-ledger",
    category: "keystone",
    chapter: "Chapter 4",
    description: "Documents the gap between what the organization states as values and what it actually does, recorded as observable facts with business impact.",
    pdfPath: "/templates/02_Standards_Ledger.pdf",
  },
  {
    number: 3,
    name: "The Decision Log",
    slug: "decision-log",
    category: "keystone",
    chapter: "Chapter 8",
    description: "Captures every decision, objection, and block with date, rationale, and business impact so individual friction entries accumulate into a visible pattern.",
    pdfPath: "/templates/03_Decision_Log.pdf",
  },
  {
    number: 4,
    name: "The Contrast Protocol",
    slug: "contrast-protocol",
    category: "keystone",
    chapter: "Chapter 9",
    description: "A staged pre-meeting checklist (72 hours to post-meeting) ensuring you arrive so prepared that any lack of preparation from opponents becomes self-evident.",
    pdfPath: "/templates/04_Contrast_Protocol.pdf",
  },
  {
    number: 5,
    name: "The Sun Tzu Diagnostic",
    slug: "sun-tzu-diagnostic",
    category: "keystone",
    chapter: "Chapter 1",
    description: "Five strategic questions that must be answered before engaging any resistor: what they stand to lose, your actual power, and what victory looks like.",
    pdfPath: "/templates/05_Sun_Tzu_Diagnostic.pdf",
  },
  {
    number: 6,
    name: "The Power Map",
    slug: "power-map",
    category: "digital",
    chapter: "Chapter 3",
    description: "Maps each resource or approval needed to its formal decision-maker and actual influencer, revealing the real decision architecture behind the org chart.",
    pdfPath: "/templates/06_Power_Map.pdf",
  },
  {
    number: 7,
    name: "The Alliance Map",
    slug: "alliance-map",
    category: "digital",
    chapter: "Chapter 10",
    description: "Structured profiles for five required ally types — Champion, First Follower, Bridge, Beneficiary, and External Ally — with relationship strength tracking.",
    pdfPath: "/templates/07_Alliance_Map.pdf",
  },
  {
    number: 8,
    name: "The Drip Campaign Calendar",
    slug: "drip-campaign-calendar",
    category: "digital",
    chapter: "Chapter 7",
    description: "A two-track 12-month calendar pairing internal deliverables with a portable credibility archive that compounds across organizations.",
    pdfPath: "/templates/08_Drip_Campaign_Calendar.pdf",
  },
  {
    number: 9,
    name: "The Escalation Framework",
    slug: "escalation-framework",
    category: "digital",
    chapter: "Chapter 11",
    description: "A four-level escalation ladder with a pre-escalation checklist ensuring pattern, business impact, and radical professionalism are established first.",
    pdfPath: "/templates/09_Escalation_Decision_Tree.pdf",
  },
  {
    number: 10,
    name: "The ROI One-Pager",
    slug: "roi-one-pager",
    category: "digital",
    chapter: "Appendix C",
    description: "A single-page structured document designed to deliver an AI initiative's financial case to an executive without requiring a meeting.",
    pdfPath: "/templates/10_ROI_OnePager.pdf",
  },
  {
    number: 11,
    name: 'The "What This Cost Us" Retrospective',
    slug: "what-this-cost-us",
    category: "digital",
    description: "Quantifies what was lost during a delayed or blocked initiative across categories like manual labor, errors, opportunity cost, and competitive positioning.",
    pdfPath: "/templates/11_What_This_Cost_Us.pdf",
  },
  {
    number: 12,
    name: "The Handoff Package Checklist",
    slug: "handoff-package",
    category: "digital",
    chapter: "Chapter 12",
    description: "A five-section checklist covering system documentation, user guide, maintenance playbook, training materials, and governance kit for successor readiness.",
    pdfPath: "/templates/12_Handoff_Package.pdf",
  },
  {
    number: 13,
    name: "The First Follower Matrix",
    slug: "first-follower-matrix",
    category: "digital",
    chapter: "Chapter 10",
    description: "Scores potential early adopters on curiosity, pain point alignment, access to others, and personal risk to identify your movement's catalyst.",
    pdfPath: "/templates/13_First_Follower_Matrix.pdf",
  },
  {
    number: 14,
    name: "The Fox / Lion Mode Selector",
    slug: "fox-lion-mode",
    category: "digital",
    chapter: "Chapter 3",
    description: "A situational checklist that helps you decide between Fox Mode (maneuvering around obstacles) and Lion Mode (standing with data and evidence).",
    pdfPath: "/templates/14_Fox_Lion_Mode.pdf",
  },
  {
    number: 15,
    name: "The Interview Protection Checklist",
    slug: "interview-protection",
    category: "digital",
    chapter: "Chapter 3",
    description: "Recognizes when a multi-round interview has crossed from evaluation into free consulting and provides protection protocols at each stage.",
    pdfPath: "/templates/15_Interview_Protection.pdf",
  },
  {
    number: 16,
    name: "The Endorsement Gap Tracker",
    slug: "endorsement-gap-tracker",
    category: "digital",
    chapter: "Chapter 6",
    description: "Pairs each leadership public statement about AI with the action it implies and what actually happened, classifying gaps as Aligned, Delayed, or Contradicted.",
    pdfPath: "/templates/16_Endorsement_Gap_Tracker.pdf",
  },
  {
    number: 17,
    name: "The Governance Mini-Kit",
    slug: "governance-mini-kit",
    category: "digital",
    chapter: "Chapter 10",
    description: "A one-page governance document covering approved tools, data categories, red lines, and human review process to pre-empt governance objections.",
    pdfPath: "/templates/17_Governance_MiniKit.pdf",
  },
];

export const interviewTopics = [
  "Why traditional change management fails in AI transformation",
  "The resistance genome: Confused, Threatened, and Hostile stakeholders",
  "Applying Machiavelli and Sun Tzu to corporate AI adoption",
  "The 72-hour rapid deployment framework",
  "Building stealth coalitions in hostile organizations",
  "Why the solo AI practitioner is the most dangerous role in tech",
  "From insurgency to infrastructure: making change irreversible",
  "The ethics of strategic maneuvering in organizational change",
];

export const overrideNavItems = [
  { label: "The Book", href: "/override" },
  { label: "Free Tools", href: "/override/tools" },
  { label: "About", href: "/override/about" },
  { label: "Media", href: "/override/media" },
];
