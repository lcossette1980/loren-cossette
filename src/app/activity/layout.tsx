import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Evidence",
  description:
    "Complete dated record of production milestones, validation improvements, and shipped functionality across the Multnomah County AI Program and other engagements. Auditable proof of delivery.",
  openGraph: {
    title: "Delivery Evidence | Loren Cossette",
    description:
      "Dated record of production milestones across the Multnomah County AI Program and other work. Auditable proof of delivery.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delivery Evidence | Loren Cossette",
    description:
      "Dated record of shipped functionality across the AI program. Auditable proof of delivery.",
  },
};

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
