import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How I Run the Program",
  description:
    "Seven-phase methodology for running embedded AI programs inside organizations — from problem discovery and SME knowledge capture through architecture, build, deployment, stakeholder enablement, and documented handoff. The same playbook currently running 5 production initiatives at Multnomah County.",
  openGraph: {
    title: "How I Run an AI Program | Loren Cossette",
    description:
      "Seven phases from discovery to scale. The codified methodology behind 5 production AI initiatives at Multnomah County.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How I Run an AI Program | Loren Cossette",
    description:
      "Seven-phase methodology for embedded AI program leadership. Discovery → architecture → build → handoff.",
    creator: "@lorencossette",
  },
};

export default function MethodologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
