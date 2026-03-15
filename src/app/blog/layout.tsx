import type { Metadata } from "next";
import "./blog-styles.css";

export const metadata: Metadata = {
  title: "Blog — Loren Cossette",
  description:
    "Insights on AI systems, governance frameworks, and organizational transformation from an AI engineer and strategist.",
  openGraph: {
    title: "Blog — Loren Cossette",
    description:
      "Insights on AI systems, governance frameworks, and organizational transformation.",
    url: "https://www.lorencossette.com/blog",
    siteName: "Loren Cossette",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Loren Cossette",
    description:
      "Insights on AI systems, governance frameworks, and organizational transformation.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
