import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Loren Cossette for AI consulting, automation projects, speaking engagements, or collaboration opportunities.",
  openGraph: {
    title: "Contact Loren Cossette | AI Consulting",
    description:
      "Start a conversation about AI strategy, production systems, or organizational transformation. 30-minute discovery calls. No obligation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Loren Cossette | AI Consulting",
    description:
      "AI consulting, strategy, and production engineering. Tell me what you're trying to build, fix, or transform.",
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
