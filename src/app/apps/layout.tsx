import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps & Ventures",
  description:
    "AI-powered apps and SaaS products built by Loren Cossette — from bias detection and academic research tools to AI news platforms and personality assessments.",
};

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
