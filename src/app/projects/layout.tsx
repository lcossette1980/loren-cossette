import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Five production AI initiatives I currently run at Multnomah County — accessibility automation, site intelligence, legacy modernization, QA automation — plus earlier client work. Case studies with verifiable metrics.",
  openGraph: {
    title: "Production AI Projects | Loren Cossette",
    description:
      "5 production AI initiatives at Multnomah County: A11yReady (95%+ WCAG, 34 doc clusters), File Intelligence Platform (56K files nightly), AI-Powered Testing Platform (6-agent system), UCR Modernization, plus earlier client work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Production AI Projects | Loren Cossette",
    description:
      "5 production AI initiatives running inside Multnomah County. Verifiable case studies, not demos.",
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
