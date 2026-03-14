import type { DemoScenario } from "@/types/demo";

export const demoScenarios: DemoScenario[] = [
  {
    id: "government-agency",
    title: "Government Agency",
    icon: "Building2",
    badge: "Public Sector",
    shortDescription:
      "A federal agency exploring AI for citizen services with compliance constraints and skeptical leadership.",
    fullDescription: `We are a mid-sized federal agency (2,000 employees) exploring AI to improve citizen service delivery. Our CIO has championed an AI roadmap, but most directors are skeptical. We have a small data science team (5 people) but no formal AI governance structure. Our IT systems are legacy (10+ years old), and procurement cycles are 12-18 months.

Several union representatives have raised concerns about job displacement. We've completed two small pilots — a chatbot for internal HR questions and an NLP tool for processing public comments — but neither has moved to production. Leadership wants to see ROI before committing budget, but the pilots weren't designed with clear success metrics.

There's no formal data governance policy, and departments own their data in silos. Training on AI tools has been optional and attendance is low. Our CISO has flagged data privacy concerns but hasn't been included in AI strategy discussions.`,
  },
  {
    id: "enterprise-manufacturer",
    title: "Manufacturing Enterprise",
    icon: "Factory",
    badge: "Enterprise",
    shortDescription:
      "A global manufacturer scaling AI from successful pilots to enterprise-wide adoption against plant-level resistance.",
    fullDescription: `We are a global manufacturing company ($2B revenue, 8,000 employees) with 12 factories across 4 countries. We've invested $5M in AI over the past 2 years, primarily in predictive maintenance and quality inspection. Our VP of Digital Transformation leads a centralized AI team of 15.

We have an AI governance committee that meets quarterly, and we've published internal AI usage guidelines. However, adoption beyond the innovation team is slow — plant managers prefer existing processes and see AI as a headquarters initiative imposed on them.

We have good data infrastructure (data lake, modern ERP) but struggle with data quality from older facilities. Our CEO publicly committed to "AI-first operations by 2027" at the last shareholder meeting. Training programs exist but are optional and have low attendance outside headquarters. One plant manager actively blocked sensor installation needed for predictive maintenance, citing "production disruption concerns."`,
  },
  {
    id: "healthcare-startup",
    title: "Healthcare Startup",
    icon: "HeartPulse",
    badge: "Startup",
    shortDescription:
      "A health-tech startup building AI diagnostics navigating the tension between speed and clinical validation.",
    fullDescription: `We are a Series B health-tech startup (85 employees) building AI-powered diagnostic support tools for radiologists. Our founding team includes ML researchers from a top university, and AI is core to our product. We have HIPAA compliance processes but are navigating FDA 510(k) clearance for the first time.

Our clinical advisory board includes 3 practicing radiologists who validate our models. Engineering moves fast — we ship weekly — but clinical validation takes months. Our sales team sells to hospital systems, and the biggest objection is "how do we trust the AI's recommendations?"

We don't have a formal AI ethics framework, though our models include confidence scores and explainability layers. We've hired a Head of Regulatory Affairs but they start next month. Our board is pushing for faster revenue growth, which creates tension with the careful clinical validation process. Two senior engineers recently left citing concerns about being pressured to ship before models were fully validated.`,
  },
];
