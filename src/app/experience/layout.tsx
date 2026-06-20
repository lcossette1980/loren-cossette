import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience: embedded AI lead at Multnomah County, executive AI training at UT Austin and Johns Hopkins, prior enterprise engineering at USAA and Accenture, plus a 20-year Air Force career (E-9, top 1%).",
  openGraph: {
    title: "Experience | Loren Cossette",
    description:
      "Embedded AI program lead at Multnomah County, executive AI training at UT Austin / Johns Hopkins, prior enterprise engineering at USAA and Accenture, 20-year Air Force career (E-9).",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | Loren Cossette",
    description:
      "Embedded AI program lead at Multnomah County. PhD candidate. 20-year military (E-9).",
    creator: "@lorencossette",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
