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

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
