import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Loren Cossette — AI Automation Architect based in San Antonio, TX. Strategy to production: agentic systems, RAG pipelines, NLP, and full-stack engineering.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
