import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Consulting Services",
  description:
    "AI strategy, production agentic systems, RAG pipelines, and organizational transformation — delivered by one senior architect. Fractional CAIO, embedded architect, and advisory retainer engagements.",
  openGraph: {
    title: "AI Consulting Services | Loren Cossette",
    description:
      "Strategy. Build. Adoption. Most AI initiatives fail between vision and execution. I close that gap — by doing all three myself.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting Services | Loren Cossette",
    description:
      "Strategy. Build. Adoption. Production AI systems, organizational transformation, and executive training — delivered by one senior architect.",
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
  name: "Loren Cossette AI Consulting",
  description:
    "AI strategy, system design and build, and organizational AI transformation for public sector, mission-driven organizations, and teams with high-stakes workflows.",
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
