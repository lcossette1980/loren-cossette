"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertTriangle, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ScoreBadge } from "./ScoreBadge";
import { ModelBadge } from "./ModelBadge";
import type { DomainAssessment } from "@/types/demo";

interface DomainScoreCardProps {
  domain: DomainAssessment;
}

export function DomainScoreCard({ domain }: DomainScoreCardProps) {
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  const toggleSub = (id: string) => {
    setExpandedSub((prev) => (prev === id ? null : id));
  };

  return (
    <Card variant="solid" hover={false} className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-text-primary leading-tight">
            {domain.domainName}
          </h3>
          <p className="font-mono text-[10px] tracking-[1px] uppercase text-text-muted mt-1">
            {domain.theoreticalBasis}
          </p>
        </div>
        <ModelBadge model="GPT-4o" className="shrink-0 mt-1" />
      </div>

      {/* Domain Summary */}
      <p className="text-sm text-text-secondary leading-relaxed mt-3 mb-5">
        {domain.domainSummary}
      </p>

      {/* Subdimensions */}
      <div className="space-y-2">
        {domain.subdimensions.map((sub) => (
          <div
            key={sub.subdimensionId}
            className="border border-border-subtle rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleSub(sub.subdimensionId)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-bg-elevated/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <ScoreBadge score={sub.score} />
                <span className="text-sm text-text-primary truncate">
                  {sub.subdimensionName}
                </span>
              </div>
              <ChevronDown
                size={14}
                className={`text-text-muted shrink-0 transition-transform duration-200 ${
                  expandedSub === sub.subdimensionId ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {expandedSub === sub.subdimensionId && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border-subtle">
                    {/* Justification */}
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {sub.justification}
                    </p>

                    {/* Risks */}
                    {sub.risks.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <AlertTriangle size={12} className="text-orange-400" />
                          <span className="font-mono text-[10px] tracking-[1px] uppercase text-orange-400">
                            Risks
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {sub.risks.map((risk, i) => (
                            <li
                              key={i}
                              className="text-xs text-text-secondary pl-4 relative before:content-[''] before:absolute before:left-1.5 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-orange-400/50"
                            >
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    {sub.recommendedActions.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Lightbulb size={12} className="text-accent-cyan" />
                          <span className="font-mono text-[10px] tracking-[1px] uppercase text-accent-cyan">
                            Actions
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {sub.recommendedActions.map((action, i) => (
                            <li
                              key={i}
                              className="text-xs text-text-secondary pl-4 relative before:content-[''] before:absolute before:left-1.5 before:top-[7px] before:w-1 before:h-1 before:rounded-full before:bg-accent-cyan/50"
                            >
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Card>
  );
}
