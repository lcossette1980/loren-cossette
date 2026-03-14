"use client";

import { Target, Shield, Zap, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ModelBadge } from "./ModelBadge";
import type { StrategicSynthesis as StrategicSynthesisType } from "@/types/demo";

interface StrategicSynthesisProps {
  synthesis: StrategicSynthesisType;
}

export function StrategicSynthesis({ synthesis }: StrategicSynthesisProps) {
  return (
    <Card variant="glow" hover={false} className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <h3 className="text-lg font-semibold text-text-primary">
          Strategic Synthesis
        </h3>
        <ModelBadge model="Claude" />
      </div>

      {/* Overall Readiness */}
      <div className="mb-6">
        <p className="text-sm text-text-secondary leading-relaxed">
          {synthesis.overallReadiness}
        </p>
      </div>

      {/* Resistance Profile */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <Shield size={14} className="text-accent-warm" />
          <span className="font-mono text-[10px] tracking-[1px] uppercase text-accent-warm">
            Resistance Profile
          </span>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          {synthesis.resistanceProfile}
        </p>
      </div>

      {/* Tactical Recommendations */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-3">
          <Target size={14} className="text-accent-cyan" />
          <span className="font-mono text-[10px] tracking-[1px] uppercase text-accent-cyan">
            Tactical Recommendations
          </span>
        </div>
        <ul className="space-y-2.5">
          {synthesis.tacticalRecommendations.map((rec, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-text-secondary">
              <ArrowRight
                size={14}
                className="text-accent-cyan/60 shrink-0 mt-0.5"
              />
              <span className="leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Highest Priority */}
      <div className="bg-accent-cyan/5 border border-accent-cyan/15 rounded-lg p-4 mb-5">
        <div className="flex items-center gap-1.5 mb-2">
          <Zap size={14} className="text-accent-cyan" />
          <span className="font-mono text-[10px] tracking-[1px] uppercase text-accent-cyan">
            Highest Priority
          </span>
        </div>
        <p className="text-sm text-text-primary leading-relaxed">
          {synthesis.highestPriority}
        </p>
      </div>

      {/* Engagement Fit + Frameworks */}
      <div className="flex flex-wrap gap-4 text-xs text-text-muted pt-3 border-t border-border-subtle">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[1px]">
            Suggested engagement:{" "}
          </span>
          <span className="text-text-secondary">{synthesis.engagementFit}</span>
        </div>
      </div>
      {synthesis.frameworksReferenced.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {synthesis.frameworksReferenced.map((fw, i) => (
            <span
              key={i}
              className="inline-flex items-center text-[10px] px-2 py-0.5 rounded font-mono border border-border-subtle text-text-muted"
            >
              {fw}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
