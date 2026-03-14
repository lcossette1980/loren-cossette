import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Leadership Readiness Analyzer",
  description:
    "Assess your organization's AI leadership readiness using the AILCM framework. Multi-model pipeline powered by GPT-4o and Claude analyzes 12 subdimensions across governance, digital acumen, and strategic adaptability.",
  openGraph: {
    title: "AI Leadership Readiness Analyzer | Loren Cossette",
    description:
      "How ready is your organization for AI? Get a structured assessment across 12 leadership competency dimensions — powered by multi-model orchestration.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Leadership Readiness Analyzer | Loren Cossette",
    description:
      "Assess your organization's AI leadership readiness using the AILCM framework — a multi-model pipeline analyzing governance, digital acumen, and strategic adaptability.",
  },
  keywords: [
    "AI leadership assessment",
    "AILCM framework",
    "AI readiness",
    "AI governance",
    "leadership competency model",
    "AI transformation",
    "multi-model orchestration",
    "agentic RAG",
    "AI demo",
  ],
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
