import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capability Statement",
  description:
    "Cossette Consulting LLC capability statement — public-sector AI modernization services, NAICS codes, engagement types, procurement information, and past performance. Print-ready for procurement evaluation.",
  openGraph: {
    title: "Capability Statement | Cossette Consulting LLC",
    description:
      "Public-sector AI modernization capability statement. NAICS codes, engagement types, past performance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capability Statement | Cossette Consulting LLC",
    description:
      "Public-sector AI modernization capability statement.",
  },
};

export default function CapabilityStatementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
