"use client";

import { Card } from "@/components/ui/Card";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import type { ProjectStat } from "@/types";

interface Props {
  stats: ProjectStat[];
}

export function ProjectDetailClient({ stats }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      {stats.map((s) => {
        const numeric = parseFloat(s.value.replace(/[^0-9.]/g, ""));
        const suffix = s.value.replace(/[0-9.,]/g, "");

        return (
          <Card key={s.label} className="p-6 text-center">
            <div className="font-mono text-2xl font-bold text-accent-cyan mb-1 tabular-nums">
              {!isNaN(numeric) ? (
                <AnimatedCounter end={numeric} suffix={suffix} />
              ) : (
                s.value
              )}
            </div>
            <div className="text-xs text-text-muted">{s.label}</div>
          </Card>
        );
      })}
    </div>
  );
}
