import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Loren Cossette — AI Automation Architect based in San Antonio, TX. Strategy to production: agentic systems, RAG pipelines, NLP, and full-stack engineering.",
  openGraph: {
    title: "About Loren Cossette | AI Systems Architect",
    description:
      "Sole AI automation engineer owning the full lifecycle — strategy, architecture, code, deployment, and change management. PhD candidate, Prosci-certified, 20-year military career.",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Loren Cossette | AI Systems Architect",
    description:
      "Sole AI automation engineer: strategy to production. PhD candidate, Prosci-certified, SHRM-SCP, 20-year military (E-9).",
    creator: "@lorencossette",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
