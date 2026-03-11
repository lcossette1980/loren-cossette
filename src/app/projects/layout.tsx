import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production AI systems and automation projects — WCAG compliance pipelines, multilingual content platforms, and enterprise RAG implementations.",
  openGraph: {
    title: "AI Projects & Case Studies | Loren Cossette",
    description:
      "Production AI systems: WCAG compliance automation ($2.7M saved), enterprise RAG pipelines (26x speed), and multilingual content platforms. Real results, not demos.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Projects & Case Studies | Loren Cossette",
    description:
      "Production AI systems: $2.7M+ cost saved, 26x speed increase, 90% scope reduction. WCAG automation, RAG pipelines, agentic systems.",
    creator: "@lorencossette",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
