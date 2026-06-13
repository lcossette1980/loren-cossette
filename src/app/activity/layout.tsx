import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity Log",
  description:
    "Dated public log of everything I've shipped across the Multnomah County AI Program and other work — milestones, features, fixes. The build-in-public proof anyone can verify.",
  openGraph: {
    title: "Activity Log | Loren Cossette",
    description:
      "Dated public log of features, fixes, and milestones across the AI program and other work. Shipping weekly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Activity Log | Loren Cossette",
    description:
      "Build-in-public dated log of everything I've shipped. Anyone can verify the velocity.",
  },
};

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
