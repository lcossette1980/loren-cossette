import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps & Ventures",
  description:
    "AI-powered apps and SaaS products built by Loren Cossette — from bias detection and academic research tools to AI news platforms and personality assessments.",
  openGraph: {
    title: "AI Apps & Ventures | Loren Cossette",
    description:
      "Full-stack AI products from concept to production — multi-agent academic analysis, bias detection, AI news aggregation, and personality assessment platforms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Apps & Ventures | Loren Cossette",
    description:
      "AI-powered SaaS products: DissertationAI, EquitableAI, AI Newsroom, PersonaLens, and more. Built and shipped solo.",
    creator: "@lorencossette",
  },
};

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
