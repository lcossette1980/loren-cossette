"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { experience } from "@/data/experience";
import { ArrowRight, ChevronDown, ChevronUp, Briefcase } from "lucide-react";

const primary = experience.filter((e) => e.type === "primary");
const additional = experience.filter((e) => e.type === "additional");

function TimelineItem({ exp, index }: { exp: (typeof experience)[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const maxPreview = 2;
  const hasMore = exp.highlights.length > maxPreview;

  return (
    <Reveal delay={index * 0.1}>
      <div className="flex gap-6 md:gap-10 relative pb-10">
        {/* Timeline line + dot */}
        <div className="flex flex-col items-center shrink-0">
          <div className="w-3 h-3 rounded-full border-2 border-accent-cyan bg-background shadow-[0_0_8px_rgba(0,255,255,0.3)] relative z-10" />
          <div className="w-px flex-1 bg-gradient-to-b from-accent-warm/30 to-border-default" />
        </div>

        {/* Content */}
        <div className="flex-1 -mt-1">
          <div className="flex items-baseline gap-3 flex-wrap mb-1">
            <h3 className="text-lg font-bold text-text-primary">
              {exp.role}
            </h3>
            <span className="font-mono text-[12px] text-accent-warm font-medium">
              {exp.company}
            </span>
          </div>
          <p className="font-mono text-[11px] text-text-muted mb-4">
            {exp.period} &middot; {exp.location}
          </p>

          {exp.summary && (
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {exp.summary}
            </p>
          )}

          <div className="space-y-3">
            {exp.highlights
              .slice(0, expanded ? undefined : maxPreview)
              .map((h, j) => (
                <div
                  key={j}
                  className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                >
                  <ArrowRight
                    size={14}
                    className="text-accent-cyan shrink-0 mt-1 opacity-60"
                  />
                  <span>
                    {h.label && (
                      <strong className="text-text-primary font-semibold">
                        {h.label}:{" "}
                      </strong>
                    )}
                    {h.text}
                  </span>
                </div>
              ))}
          </div>

          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 mt-4 text-accent-cyan text-xs font-mono hover:text-accent-blue transition-colors"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp size={12} />
                </>
              ) : (
                <>
                  Show {exp.highlights.length - maxPreview} more{" "}
                  <ChevronDown size={12} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function ExperiencePage() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Experience"
          heading="Career trajectory"
          accentWord="trajectory"
          description="From combat zones to C-suites to code. Each chapter built on the last."
        />

        {/* Timeline */}
        <div className="mt-14">
          {primary.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} />
          ))}
        </div>

        {/* Additional Roles */}
        <div className="mt-16">
          <SectionHeading
            label="Additional"
            heading="Teaching & advisory"
            accentWord="advisory"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {additional.map((exp) => (
              <motion.div key={exp.company} variants={staggerItem}>
                <Card className="p-5 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={14} className="text-accent-warm" />
                    <span className="font-mono text-[10px] text-text-muted">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-text-primary mb-1">
                    {exp.role}
                  </h4>
                  <p className="font-mono text-[11px] text-text-muted mb-3">
                    {exp.company}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {exp.highlights[0]?.text}
                  </p>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
