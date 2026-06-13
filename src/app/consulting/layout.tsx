import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embedded AI Program Leadership",
  description:
    "Embedded AI program leadership for organizations modernizing legacy systems, scaling AI safely, or facing compliance deadlines. Currently the AI lead for Multnomah County, running 5 production AI initiatives.",
  openGraph: {
    title: "Embedded AI Program Leadership | Loren Cossette",
    description:
      "I become your embedded AI lead. Architect the program, write the code, ship features weekly — until the organization can run it without me.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Embedded AI Program Leadership | Loren Cossette",
    description:
      "Strategy. Build. Adoption. Embedded inside the organization, not flying in and out. Currently the AI lead for Multnomah County.",
  },
  keywords: [
    "AI consulting",
    "AI strategy",
    "fractional CAIO",
    "agentic systems",
    "RAG pipeline consulting",
    "AI transformation",
    "change management",
    "AI automation architect",
    "San Antonio AI consultant",
  ],
};

const siteUrl = "https://www.lorencossette.com";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Loren Cossette — Embedded AI Program Leadership",
  description:
    "Embedded AI program architect-builder for public sector and mission-driven organizations. Architecture, system build, knowledge capture, and organizational AI transformation — delivered by one embedded lead, not a flying-in-and-out consulting team.",
  url: `${siteUrl}/consulting`,
  provider: {
    "@type": "Person",
    name: "Loren Cossette",
  },
  areaServed: "Worldwide",
  serviceType: [
    "AI Consulting",
    "AI Systems Architecture",
    "RAG Pipeline Development",
    "AI Change Management",
    "WCAG Compliance Automation",
    "Fractional CAIO",
    "AI Strategy & Governance",
    "Executive AI Training",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What size organizations do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Government agencies, Fortune 500 enterprises, and funded startups. Engagements typically start at $5K for audits and scale to $120K+ for full agentic system builds.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work remotely?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — available worldwide. Based in San Antonio, TX, with on-site options available at the day rate.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical engagement take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Audits and strategy roadmaps take 2–4 weeks. Full system builds (RAG pipelines, agentic systems) typically run 6–16 weeks depending on scope.",
      },
    },
    {
      "@type": "Question",
      name: "Do you sign NDAs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, standard NDAs are available and routinely used for government and enterprise engagements.",
      },
    },
  ],
};

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceSchema, faqSchema]),
        }}
      />
      {children}
    </>
  );
}
