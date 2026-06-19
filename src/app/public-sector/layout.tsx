import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public-Sector AI Modernization",
  description:
    "AI modernization for state, county, and city agencies under real constraints — accessibility automation, legacy modernization, knowledge capture, and secure internal AI systems. Currently embedded as the AI lead for Multnomah County with 5 production initiatives.",
  openGraph: {
    title: "Public-Sector AI Modernization | Loren Cossette",
    description:
      "AI modernization for state, county, and city agencies. Embedded AI program leadership. Currently the AI lead for Multnomah County, running 5 production initiatives.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Public-Sector AI Modernization | Loren Cossette",
    description:
      "Embedded AI program leadership for state, county, and city agencies. Cossette Consulting LLC.",
  },
  keywords: [
    "public sector AI consultant",
    "government AI modernization",
    "county AI program lead",
    "state AI consultant",
    "municipal AI lead",
    "embedded AI architect",
    "Sourcewell AI consultant",
    "WCAG document remediation",
    "ADA Title II AI",
    "legacy system modernization",
    "behavioral test capture",
    "knowledge capture SME retirement",
    "fractional CAIO public sector",
    "Cossette Consulting LLC",
  ],
};

export default function PublicSectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
