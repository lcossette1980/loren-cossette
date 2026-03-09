import type { Metadata } from "next";
import { OverrideNav } from "@/components/sections/override/OverrideNav";

export const metadata: Metadata = {
  title:
    "OVERRIDE: The AI Transformation Playbook for Organizational Resistance | Loren Cossette",
  description:
    "A practical AI transformation book for leaders and practitioners facing resistance, bureaucracy, and stalled adoption. Learn how to drive AI change management when organizations fight back. 312 pages, 17 templates, 11 scripts.",
  openGraph: {
    title:
      "OVERRIDE: The AI Transformation Playbook for Organizational Resistance",
    description:
      "A practical AI adoption and change management book for leaders facing resistance. 312 pages of operational strategy, 17 field-ready templates, and a proven methodology for driving AI transformation in hostile organizations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "OVERRIDE: The AI Transformation Playbook for Organizational Resistance",
    description:
      "A practical AI transformation book for leaders and practitioners facing resistance, bureaucracy, and stalled adoption. 312 pages, 17 templates, 11 scripts.",
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
