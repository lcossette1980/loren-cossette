import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Data Handling",
  description:
    "How I handle agency data: agency-controlled cloud, model routing transparency, human-in-the-loop, role-based access, PHI/PII guardrails, full audit trails, and accessibility commitments. Operational defaults across every system I build.",
  openGraph: {
    title: "Security & Data Handling | Loren Cossette",
    description:
      "Plain-language security and data-handling principles enforced across every AI system I build. Zero data leaves the agency cloud.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security & Data Handling | Loren Cossette",
    description:
      "Operational defaults for agency data handling. No black-box AI.",
  },
  keywords: [
    "AI security",
    "government AI data handling",
    "Vertex AI security",
    "PHI guardrails",
    "agency cloud AI",
    "WCAG accessibility commitment",
    "AI audit trail",
    "model routing transparency",
  ],
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
