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
    title: "Architect & Build Production AI Systems",
    description:
      "Multi-agent orchestration, LangGraph pipelines, RAG, Vertex AI / Claude / GPT routing — the systems other people put on a roadmap, I put into production. A11yReady (95%+ WCAG, 30s/doc) and File Intelligence (56K files nightly) are live examples.",
  },
  {
    icon: Search,
    title: "Capture Knowledge Before It Walks Out",
    description:
      "Retiring SMEs take decades of tribal knowledge with them. I build typed knowledge corpora, SME-confirmation workflows, and behavioral test suites that turn institutional memory into executable specs. UCR Modernization captured 704 SME sessions and 208 behavioral Playwright tests.",
  },
  {
    icon: ShieldCheck,
    title: "Modernize Legacy Without Breaking It",
    description:
      "Multi-agent testing platforms that index legacy codebases, generate regression suites from captured knowledge, and watch for drift on every commit. Lets the modernized system prove behavioral parity before it ships — and gives leadership confidence to greenlight the rebuild.",
  },
  {
    icon: Users,
    title: "Run the Program, Not Just the Build",
    description:
      "Stakeholder hubs, dated activity feeds, ROI calculators, validation against independent audits, SME approval queues. I close the loop between technical work and executive trust — so AI initiatives stop dying in pilot purgatory.",
  },
];

export function EngagementModes() {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="The Four Pillars"
          heading="How I run an AI program"
          accentWord="program"
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
