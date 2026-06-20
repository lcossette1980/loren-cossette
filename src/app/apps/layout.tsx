import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps & Ventures",
  description:
    "Multi-agent AI products I've built and shipped solo — GTM Teardown, DissertationAI, Clearview Politics, and DraftEngine. Production SaaS, not demos.",
  openGraph: {
    title: "AI Apps & Ventures | Loren Cossette",
    description:
      "Production multi-agent AI products: GTM Teardown (9-agent LangGraph SaaS), DissertationAI (11 concurrent agents), Clearview Politics (7-agent autonomous news platform), DraftEngine.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Apps & Ventures | Loren Cossette",
    description:
      "Production multi-agent AI products built and shipped solo. GTM Teardown, DissertationAI, Clearview Politics, DraftEngine.",
    creator: "@lorencossette",
  },
};

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
