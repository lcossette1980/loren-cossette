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
    title: "AI Automation & Agentic Workflows",
    description:
      "Production multi-agent systems, tool-calling pipelines, and autonomous workflows that run in the real world — not just in notebooks.",
  },
  {
    icon: Search,
    title: "RAG & Retrieval Evaluation",
    description:
      "End-to-end retrieval-augmented generation: embedding pipelines, vector stores, hybrid search, reranking, and evaluation frameworks.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Accessibility at Scale",
    description:
      "Automated WCAG auditing, remediation pipelines, and governance frameworks that turn 56,000+ files into structured, compliant output.",
  },
  {
    icon: Users,
    title: "AI Transformation & Exec Enablement",
    description:
      "Strategic AI roadmaps, stakeholder alignment, and change management for organizations where not everyone is on board.",
  },
];

export function EngagementModes() {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Capabilities"
          heading="I can help with"
          accentWord="help"
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
