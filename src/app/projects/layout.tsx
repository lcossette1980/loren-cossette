import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production AI systems and automation projects — WCAG compliance pipelines, multilingual content platforms, and enterprise RAG implementations.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
