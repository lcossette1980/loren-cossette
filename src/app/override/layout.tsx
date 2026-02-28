import type { Metadata } from "next";
import { OverrideNav } from "@/components/sections/override/OverrideNav";

export const metadata: Metadata = {
  title: "OVERRIDE — The AI Transformation Playbook",
  description:
    "The first AI transformation methodology built for organizations that actively resist change. 312 pages, 17 templates, 11 scripts.",
  openGraph: {
    title: "OVERRIDE: The AI Transformation Playbook for Hostile Territory",
    description:
      "Change management assumes good faith. This book doesn't. The first AI transformation methodology built for organizations that actively resist change.",
    images: [
      {
        url: "/images/override-cover.jpg",
        width: 800,
        height: 1200,
        alt: "OVERRIDE book cover",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OVERRIDE: The AI Transformation Playbook for Hostile Territory",
    description:
      "Change management assumes good faith. This book doesn't. 312 pages, 17 templates, 11 scripts.",
    images: ["/images/override-cover.jpg"],
  },
};

export default function OverrideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="override-theme">
      <div className="pt-16">
        <OverrideNav />
      </div>
      {children}
    </div>
  );
}
