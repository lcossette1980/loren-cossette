"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { Bot, Search, ShieldCheck, Users } from "lucide-react";

const modes = [
  {
    icon: Bot,
    title: "Automate Complex, High-Stakes Workflows",
    description:
      "Turn manual, error-prone processes into production AI systems that run reliably — multi-agent orchestration, tool-calling pipelines, and autonomous workflows.",
  },
  {
    icon: Search,
    title: "Turn Institutional Knowledge Into Searchable Systems",
    description:
      "Your organization's knowledge is trapped in documents, databases, and people's heads. I build retrieval systems that make it findable, trustworthy, and actionable.",
  },
  {
    icon: ShieldCheck,
    title: "Make Compliance Manageable at Scale",
    description:
      "Facing a WCAG, Section 508, or federal compliance deadline with thousands of files? I build automated pipelines that turn that backlog into structured, auditable output.",
  },
  {
    icon: Users,
    title: "Get Your AI Initiative Out of Pilot Purgatory",
    description:
      "You've proven the concept but can't get to production. I build the strategy, governance, and change management that gets AI adopted — not just approved.",
  },
];

export function EngagementModes() {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Problems I Solve"
          heading="Where I create impact"
          accentWord="impact"
          center
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <motion.div key={mode.title} variants={staggerItem}>
                <Card className="p-7 h-full group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-accent-cyan" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary text-base mb-2">
                        {mode.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {mode.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
