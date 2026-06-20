import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out about embedded AI program leadership, public-sector AI modernization, accessibility automation, legacy-system modernization, executive advisory, or training engagements.",
  openGraph: {
    title: "Contact Loren Cossette",
    description:
      "Bring me in as your embedded AI lead, or start with a 30-minute Discovery working session. Public-sector AI modernization, accessibility, legacy modernization, executive advisory.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Loren Cossette",
    description:
      "Embedded AI program leadership for state, county, and city agencies. 30-min Discovery working session — no sales pitch.",
    creator: "@lorencossette",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
