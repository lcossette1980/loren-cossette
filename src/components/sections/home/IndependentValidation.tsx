"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, ShieldCheck, FileSearch } from "lucide-react";

interface ValidationCard {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  source: string;
  headline: string;
  metric: string;
  metricLabel: string;
  description: string;
  project: string;
}

const validations: ValidationCard[] = [
  {
    icon: FileSearch,
    source: "Independent PHP Audit · Xingwu",
    headline: "Cross-Validated File Classification",
    metric: "92.3%",
    metricLabel: "agreement on 33,738 UUIDs",
    description:
      "The File Intelligence Platform's six-bucket classification was independently audited by Xingwu's PHP-based site crawler against the same Drupal inventory. Result: 92.3% direct agreement across 33,738 file UUIDs, with reconciled deltas tracked month-over-month.",
    project: "File Intelligence Platform",
  },
  {
    icon: ShieldCheck,
    source: "axe-core · Industry-Standard WCAG Engine",
    headline: "First-Pass WCAG 2.1 AA Compliance",
    metric: "95%+",
    metricLabel: "first-pass axe-core score",
    description:
      "Every A11yReady-converted document is validated through axe-core running real automated checks via Playwright in the production container — the same WCAG 2.1 AA testing engine used by accessibility auditors worldwide. Validation runs before any document reaches human review.",
    project: "A11yReady",
  },
  {
    icon: CheckCircle2,
    source: "SME Review Queue · Deployed UI",
    headline: "Human-Validated Knowledge Capture",
    metric: "20+",
    metricLabel: "SME-confirmed sessions",
    description:
      "Subject Matter Experts confirm captured knowledge through the deployed review interface before it becomes authoritative for downstream agents. 20 SME-confirmed knowledge sessions and 32 tribal-knowledge questions answered in a single day prove the workflow operates end-to-end.",
    project: "UCR Modernization",
  },
];

export function IndependentValidation() {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHeading
            label="Independent Validation"
            heading="Verifiable, not just claimed"
            accentWord="Verifiable"
            description="Every metric on this site can be traced to a public artifact, an industry-standard validation engine, or an external audit. No testimonials. No hand-waving."
          />
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {validations.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.headline} variants={staggerItem}>
                <Card className="p-7 h-full flex flex-col" variant="solid">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Icon size={18} className="text-accent-cyan shrink-0" />
                    <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-text-muted">
                      {v.source}
                    </p>
                  </div>

                  <h3 className="text-base font-bold text-text-primary leading-snug mb-4">
                    {v.headline}
                  </h3>

                  {/* Metric */}
                  <div className="mb-5">
                    <p className="font-mono text-4xl font-extrabold text-accent-cyan tracking-[-0.04em] leading-none">
                      {v.metric}
                    </p>
                    <p className="text-[11px] text-text-muted mt-1.5 font-mono">
                      {v.metricLabel}
                    </p>
                  </div>

                  <div className="h-px bg-border-default mb-4" />

                  <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-4">
                    {v.description}
                  </p>

                  <p className="text-[10px] text-accent-warm/70 font-mono tracking-widest uppercase">
                    {v.project}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
