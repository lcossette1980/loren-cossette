"use client";

import type { LucideIcon } from "lucide-react";
import { Building2, Factory, HeartPulse } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { DemoScenario } from "@/types/demo";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Factory,
  HeartPulse,
};

interface ScenarioSelectorProps {
  scenarios: DemoScenario[];
  selected: string | null;
  onSelect: (scenario: DemoScenario) => void;
  disabled?: boolean;
}

export function ScenarioSelector({
  scenarios,
  selected,
  onSelect,
  disabled,
}: ScenarioSelectorProps) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-3">
        Try a sample scenario
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scenarios.map((scenario) => {
          const Icon = iconMap[scenario.icon] || Building2;
          const isSelected = selected === scenario.id;

          return (
            <Card
              key={scenario.id}
              variant={isSelected ? "glow" : "solid"}
              className={cn(
                "p-4 cursor-pointer",
                disabled && "opacity-50 pointer-events-none"
              )}
              onClick={() => onSelect(scenario)}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center border",
                    isSelected
                      ? "bg-accent-cyan/10 border-accent-cyan/20"
                      : "bg-bg-elevated border-border-subtle"
                  )}
                >
                  <Icon
                    size={16}
                    className={
                      isSelected ? "text-accent-cyan" : "text-text-muted"
                    }
                  />
                </div>
                <Badge variant={isSelected ? "accent" : "default"}>
                  {scenario.badge}
                </Badge>
              </div>
              <h4 className="text-sm font-semibold text-text-primary mb-1">
                {scenario.title}
              </h4>
              <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                {scenario.shortDescription}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
