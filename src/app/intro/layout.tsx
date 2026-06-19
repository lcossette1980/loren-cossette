import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "One-Pager Intro",
  description:
    "Three-minute intro to Loren Cossette and Cossette Consulting LLC — what I do, the Multnomah County AI Program, three engagement options, and how to contract. Printable to PDF.",
  openGraph: {
    title: "One-Pager Intro | Loren Cossette",
    description:
      "Three-minute intro and contracting reference. Printable to PDF.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One-Pager Intro | Loren Cossette",
    description:
      "Three-minute intro and contracting reference.",
  },
};

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
