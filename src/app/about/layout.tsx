import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Loren Cossette — AI Program Architect based in San Antonio, TX. Currently the embedded AI lead for Multnomah County, running 5 production AI initiatives. PhD candidate, Prosci-certified, 20-year military career.",
  openGraph: {
    title: "About Loren Cossette | AI Program Architect",
    description:
      "Embedded AI program architect currently leading 5 production AI initiatives at Multnomah County. PhD candidate, Prosci-certified, SHRM-SCP, 20-year military career (E-9).",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Loren Cossette | AI Program Architect",
    description:
      "Embedded AI lead. 5 production initiatives at Multnomah County. PhD candidate, Prosci-certified, SHRM-SCP, 20-year military (E-9).",
    creator: "@lorencossette",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
