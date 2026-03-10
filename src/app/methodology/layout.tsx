import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Methodology",
  description:
    "A 7-phase engineering methodology for building production AI systems — from defining the end state through architecture, vertical slices, AI collaboration, and validation. Built from real-world experience deploying AI in resistant organizations.",
  openGraph: {
    title: "The AI Automation Engineer Workflow | Loren Cossette",
    description:
      "Seven phases from idea to production. A codified methodology for building AI systems that survive contact with the real world.",
  },
};

export default function MethodologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
