"use client";

import {
  Workflow,
  Brain,
  Sparkles,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ModelBadge } from "./ModelBadge";

export function ArchitectureExplainer() {
  return (
    <Card variant="solid" hover={false} className="p-5 h-fit sticky top-28">
      <div className="flex items-center gap-2 mb-4">
        <Workflow size={16} className="text-accent-cyan" />
        <h3 className="text-sm font-semibold text-text-primary">
          How This Works
        </h3>
      </div>

      {/* Pipeline Steps */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#10a37f]/10 border border-[#10a37f]/20 flex items-center justify-center text-[10px] font-mono text-[#10a37f]">
              1
            </div>
            <div className="w-px flex-1 bg-border-subtle mt-1" />
          </div>
          <div className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-text-primary">
                Domain Analysis
              </span>
              <ModelBadge model="GPT-4o" />
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Evaluates your description against 12 subdimensions using
              structured function calling for consistent scoring.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#d4a574]/10 border border-[#d4a574]/20 flex items-center justify-center text-[10px] font-mono text-[#d4a574]">
              2
            </div>
            <div className="w-px flex-1 bg-border-subtle mt-1" />
          </div>
          <div className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-text-primary">
                Strategic Synthesis
              </span>
              <ModelBadge model="Claude" />
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Synthesizes domain scores into resistance analysis and tactical
              recommendations using OVERRIDE frameworks.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
            <Zap size={10} className="text-accent-cyan" />
          </div>
          <div>
            <span className="text-xs font-medium text-text-primary">
              Combined Assessment
            </span>
            <p className="text-[11px] text-text-muted leading-relaxed mt-0.5">
              Structured scores + narrative insight + actionable next steps.
            </p>
          </div>
        </div>
      </div>

      {/* AILCM Framework Mini */}
      <div className="border-t border-border-subtle pt-4">
        <div className="flex items-center gap-1.5 mb-3">
          <Brain size={12} className="text-accent-warm" />
          <span className="font-mono text-[10px] tracking-[1px] uppercase text-accent-warm">
            AILCM Framework
          </span>
        </div>
        <div className="space-y-2">
          {[
            {
              icon: Shield,
              label: "Governance",
              count: "4 subdimensions",
            },
            {
              icon: BarChart3,
              label: "Digital Acumen",
              count: "4 subdimensions",
            },
            {
              icon: Sparkles,
              label: "Adaptability",
              count: "4 subdimensions",
            },
          ].map((domain) => (
            <div
              key={domain.label}
              className="flex items-center justify-between px-3 py-2 rounded-md bg-bg-elevated/50"
            >
              <div className="flex items-center gap-2">
                <domain.icon size={12} className="text-text-muted" />
                <span className="text-[11px] text-text-secondary">
                  {domain.label}
                </span>
              </div>
              <span className="font-mono text-[10px] text-text-muted">
                {domain.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Attribution */}
      <p className="text-[10px] text-text-muted mt-4 leading-relaxed">
        Based on the AILCM framework and OVERRIDE methodology by Loren
        Cossette (2026). This demo provides a simplified assessment — full
        analysis available through consulting engagement.
      </p>
    </Card>
  );
}
