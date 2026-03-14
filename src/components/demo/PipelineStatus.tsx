"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AssessmentStatus } from "@/types/demo";

interface PipelineStatusProps {
  status: AssessmentStatus;
}

const stages = [
  { id: "analyzing", label: "GPT-4o Analysis", model: "GPT-4o" },
  { id: "synthesizing", label: "Claude Synthesis", model: "Claude" },
  { id: "complete", label: "Complete", model: "" },
];

function getStageIndex(status: AssessmentStatus): number {
  if (status === "analyzing") return 0;
  if (status === "synthesizing") return 1;
  if (status === "complete") return 2;
  return -1;
}

export function PipelineStatus({ status }: PipelineStatusProps) {
  const activeIndex = getStageIndex(status);
  if (activeIndex < 0) return null;

  return (
    <div className="flex items-center gap-2 mb-8">
      {stages.map((stage, i) => {
        const isActive = i === activeIndex;
        const isDone = i < activeIndex;

        return (
          <div key={stage.id} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={cn(
                  "w-8 h-px transition-colors duration-500",
                  isDone ? "bg-accent-cyan/50" : "bg-border-subtle"
                )}
              />
            )}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full border transition-all duration-500",
                    isDone
                      ? "bg-accent-cyan border-accent-cyan"
                      : isActive
                        ? "border-accent-cyan bg-transparent"
                        : "border-border-default bg-transparent"
                  )}
                />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-accent-cyan/50"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[1px] uppercase transition-colors duration-500",
                  isDone
                    ? "text-accent-cyan"
                    : isActive
                      ? "text-text-primary"
                      : "text-text-muted"
                )}
              >
                {stage.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
