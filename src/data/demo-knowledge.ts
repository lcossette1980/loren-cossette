/* ── AILCM Framework Knowledge Base ──
 *  Encodes the AI-Integrated Leadership Competency Model
 *  for use in the assessment system prompt.
 *
 *  IP Protection: Only framework names, domain labels, and
 *  original signal descriptors (written for the demo) are included.
 *  No verbatim content from any book or publication.
 */

export interface SignalDescriptors {
  strong: string;
  moderate: string;
  gap: string;
  critical: string;
}

export interface Subdimension {
  id: string;
  name: string;
  signalDescriptors: SignalDescriptors;
}

export interface Domain {
  id: string;
  name: string;
  theoreticalBasis: string;
  description: string;
  subdimensions: Subdimension[];
}

export interface Framework {
  name: string;
  citation: string;
  domains: Domain[];
}

export const AILCM_FRAMEWORK: Framework = {
  name: "AI-Integrated Leadership Competency Model (AILCM)",
  citation: "Cossette (2026)",
  domains: [
    {
      id: "human-ai-alignment",
      name: "Human-AI Alignment in Governance",
      theoreticalBasis: "Transformational Leadership Theory (Bass & Riggio, 2006)",
      description:
        "How leadership maintains human agency, trust, and ethical oversight when integrating AI systems.",
      subdimensions: [
        {
          id: "emotional-intelligence",
          name: "Emotional Intelligence",
          signalDescriptors: {
            strong:
              "Leaders actively sense and respond to team anxiety about AI adoption; psychological safety is explicitly managed.",
            moderate:
              "Leaders acknowledge emotional dynamics but lack systematic approaches to workforce sentiment.",
            gap: "Emotional impact of AI adoption is recognized but not actively addressed in leadership practices.",
            critical:
              "AI is deployed with no consideration for workforce emotional response; change is imposed top-down.",
          },
        },
        {
          id: "trust-cultivation",
          name: "Trust Cultivation",
          signalDescriptors: {
            strong:
              "Transparent AI decision-making processes exist; stakeholders understand how AI informs decisions and trust the process.",
            moderate:
              "Some transparency exists but is inconsistent; trust varies across departments or teams.",
            gap: "Trust in AI systems is low or unaddressed; no formal mechanisms for building stakeholder confidence.",
            critical:
              "Active distrust of AI systems; staff circumvent or undermine AI-driven processes.",
          },
        },
        {
          id: "ethical-oversight",
          name: "Ethical Oversight",
          signalDescriptors: {
            strong:
              "Formal ethics frameworks govern AI deployment; bias audits, fairness reviews, and accountability structures are in place.",
            moderate:
              "Ethics is discussed but lacks formal structures; ad-hoc approach to bias and fairness concerns.",
            gap: "Ethical implications are acknowledged but not systematically addressed in AI deployment decisions.",
            critical:
              "No ethical oversight of AI systems; potential for unchecked bias and unintended consequences.",
          },
        },
        {
          id: "human-agency",
          name: "Human Agency Preservation",
          signalDescriptors: {
            strong:
              "Clear boundaries define where AI recommends and where humans decide; human override is always available.",
            moderate:
              "Some human oversight exists but authority lines are unclear; AI sometimes overrides human judgment.",
            gap: "Human decision-making authority is eroding as AI systems take on more autonomous roles.",
            critical:
              "AI systems make consequential decisions without meaningful human oversight or intervention capability.",
          },
        },
      ],
    },
    {
      id: "ai-digital-acumen",
      name: "AI and Digital Acumen",
      theoreticalBasis: "Digital Leadership Framework (Kane et al., 2019)",
      description:
        "The organization's technical literacy, data governance, and ability to critically evaluate AI systems.",
      subdimensions: [
        {
          id: "ai-literacy",
          name: "AI Literacy",
          signalDescriptors: {
            strong:
              "Leaders understand AI capabilities, limitations, and how models are trained; technical fluency enables informed decisions.",
            moderate:
              "Leaders have basic AI awareness but rely heavily on technical teams for interpretation.",
            gap: "Limited understanding of AI beyond surface-level concepts; leaders cannot evaluate AI recommendations critically.",
            critical:
              "AI is treated as a black box; leaders lack the vocabulary to engage with technical teams meaningfully.",
          },
        },
        {
          id: "data-driven-decisions",
          name: "Data-Driven Decision-Making",
          signalDescriptors: {
            strong:
              "Decisions are informed by data with clear metrics; AI insights are integrated into strategic planning with validation.",
            moderate:
              "Data is used selectively; some decisions rely on AI insights but validation is inconsistent.",
            gap: "Data exists but is underutilized; decisions are primarily intuition-driven despite available AI tools.",
            critical:
              "No data-driven culture; AI tools generate insights that are ignored or misunderstood.",
          },
        },
        {
          id: "ai-risk-management",
          name: "AI Risk Management",
          signalDescriptors: {
            strong:
              "Comprehensive risk frameworks address data privacy, security, compliance, and unintended AI behaviors systematically.",
            moderate:
              "Some risk assessment exists but is reactive rather than proactive; gaps in coverage across AI use cases.",
            gap: "Risk management for AI is minimal; security and privacy are addressed technically but not strategically.",
            critical:
              "No AI-specific risk management; organization is exposed to regulatory, reputational, and operational risks.",
          },
        },
        {
          id: "critical-ai-evaluation",
          name: "Critical AI Evaluation",
          signalDescriptors: {
            strong:
              "Leaders can assess AI outputs for accuracy, bias, and relevance; they know when to trust and when to question AI recommendations.",
            moderate:
              "Some critical evaluation occurs but is inconsistent; tendency to over-rely on AI outputs.",
            gap: "AI outputs are accepted at face value; limited ability to identify when AI is wrong or biased.",
            critical:
              "Complete reliance on AI recommendations without evaluation; no mechanisms to catch errors or biases.",
          },
        },
      ],
    },
    {
      id: "strategic-adaptability",
      name: "Strategic Adaptability",
      theoreticalBasis:
        "Adaptive Leadership Theory (Heifetz, 2014) & Complexity Leadership Theory",
      description:
        "The organization's capacity to learn continuously, adapt strategies, innovate, and maintain resilience through AI transformation.",
      subdimensions: [
        {
          id: "continuous-learning",
          name: "Continuous Learning Orientation",
          signalDescriptors: {
            strong:
              "Formal learning programs exist; leaders model growth mindset; AI skill development is a strategic priority.",
            moderate:
              "Training exists but participation is optional or inconsistent; learning is encouraged but not structured.",
            gap: "Learning about AI is left to individuals; no organizational investment in AI literacy development.",
            critical:
              "Resistance to learning; AI knowledge is concentrated in a few individuals with no knowledge transfer.",
          },
        },
        {
          id: "adaptive-thinking",
          name: "Adaptive Thinking",
          signalDescriptors: {
            strong:
              "Leaders embrace ambiguity; strategies are iterative; the organization pivots based on AI feedback loops.",
            moderate:
              "Some flexibility exists but change is slow; leaders are comfortable with incremental adjustments only.",
            gap: "Rigid strategic planning; difficulty adjusting when AI implementations reveal unexpected outcomes.",
            critical:
              "Fixed mindset; AI failures are treated as evidence against AI rather than learning opportunities.",
          },
        },
        {
          id: "innovation-facilitation",
          name: "Innovation Facilitation",
          signalDescriptors: {
            strong:
              "Psychological safety for experimentation; cross-functional AI innovation teams; structured pilot-to-production pathways.",
            moderate:
              "Innovation is encouraged in pockets; pilots exist but lack clear pathways to scaling.",
            gap: "Innovation is ad-hoc; AI experiments happen in isolation without organizational support.",
            critical:
              "Innovation is discouraged; AI experimentation is seen as risky or wasteful.",
          },
        },
        {
          id: "organizational-resilience",
          name: "Organizational Resilience",
          signalDescriptors: {
            strong:
              "Organization absorbs AI-driven disruptions; contingency plans exist; morale remains stable through transformation.",
            moderate:
              "Some resilience mechanisms exist but are untested; morale fluctuates during AI-related changes.",
            gap: "AI disruptions cause significant organizational stress; no contingency planning for AI-related failures.",
            critical:
              "Organization is fragile; any AI setback threatens broader operational stability and workforce confidence.",
          },
        },
      ],
    },
  ],
};

/* ── Supplementary Framework References ──
 *  Names and concepts only — no verbatim content
 */

export const OVERRIDE_CONCEPTS = {
  name: "OVERRIDE: The AI Transformation Playbook for Hostile Territory",
  citation: "Cossette (2026)",
  resistanceTypology: ["Confused", "Threatened", "Hostile"] as const,
  strategicTraditions: [
    "Machiavelli (understanding human nature and power dynamics)",
    "Sun Tzu (asymmetric strategy and choosing favorable terrain)",
    "Alinsky (leveraging documentation and organizational values)",
  ] as const,
  keyTools: [
    "Standards Ledger",
    "Decision Log",
    "Alignment Anchor",
    "Contrast Protocol",
    "Resistance Audit",
    "Power Mapping",
    "Fox/Lion Mode",
    "Shifting Grid",
  ] as const,
  description:
    "A tactical framework for navigating organizational resistance to AI transformation, designed for practitioners operating in hostile environments where leadership, culture, or politics actively block AI adoption.",
};

export const STRATEGIC_ADAPTABILITY_CONCEPTS = {
  name: "Strategic Adaptability in AI-Integrated Organizations",
  citation: "Cossette (2026)",
  keyConcepts: [
    "Dynamic Stability (maintaining purpose while adapting means)",
    "Organizational vs. Individual Adaptability",
    "Temporal Ethics (ethical quality revealed over time, not at deployment)",
    "Culture Readiness vs. Technology Readiness Gap",
    "Intelligence Audits for AI systems",
  ] as const,
  description:
    "A theoretical framework examining why technically sound AI implementations fail due to culture readiness gaps, and how adaptive leadership enables sustainable AI governance.",
};
