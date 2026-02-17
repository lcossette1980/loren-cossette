"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { impactMetrics } from "@/data/metrics";
import {
  TrendingUp, FileText, Zap, Activity, Star, ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TrendingUp, FileText, Zap, Activity, Star, ArrowRight,
};

export function ImpactMetrics() {
  return (
    <section id="impact" className="py-32 lg:py-40 bg-bg-elevated">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Impact"
          heading="Numbers that matter"
          accentWord="matter"
          center
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-14">
          {impactMetrics.map((m) => {
            const Icon = iconMap[m.icon] || Zap;
            return (
              <motion.div key={m.label} variants={staggerItem}>
                <Card className="p-6 text-center group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-warm scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <Icon size={20} className="text-accent-warm/60 mx-auto mb-3" />
                  <div className="font-mono text-2xl font-bold text-accent-warm mb-1 tabular-nums">
                    <AnimatedCounter
                      end={m.numericValue}
                      prefix={m.prefix}
                      suffix={m.suffix}
                      decimals={m.prefix === "$" ? 1 : 0}
                    />
                  </div>
                  <div className="text-[13px] text-text-secondary font-medium mb-1">
                    {m.label}
                  </div>
                  <div className="font-mono text-[10px] text-text-muted">
                    {m.sub}
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
