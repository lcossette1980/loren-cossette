import type { Metadata } from "next";
import { OverrideNav } from "@/components/sections/override/OverrideNav";

export const metadata: Metadata = {
  title: "OVERRIDE — The AI Transformation Playbook",
  description:
    "The first AI transformation methodology built for organizations that actively resist change. 312 pages, 17 templates, 11 scripts.",
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
