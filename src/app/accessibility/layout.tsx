import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility statement for lorencossette.com. WCAG 2.1 Level AA target. Operational defaults, audit cadence, known limitations, and how to report a barrier.",
  openGraph: {
    title: "Accessibility Statement | Loren Cossette",
    description:
      "WCAG 2.1 AA target. We model the accessibility we sell.",
    type: "website",
  },
};

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
