"use client";

import { cn } from "@/lib/utils";
import type { QualitativeScore } from "@/types/demo";

const scoreStyles: Record<QualitativeScore, string> = {
  Strong: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  Moderate: "bg-accent-warm/10 border-accent-warm/20 text-accent-warm",
  "Gap Identified": "bg-orange-500/10 border-orange-500/20 text-orange-400",
  "Critical Gap": "bg-red-500/10 border-red-500/20 text-red-400",
};

interface ScoreBadgeProps {
  score: QualitativeScore;
  className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] px-2.5 py-0.5 rounded font-mono border whitespace-nowrap",
        scoreStyles[score],
        className
      )}
    >
      {score}
    </span>
  );
}
