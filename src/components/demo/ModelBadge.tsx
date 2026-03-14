"use client";

import { cn } from "@/lib/utils";

const modelStyles: Record<string, string> = {
  "GPT-4o": "bg-[#10a37f]/10 border-[#10a37f]/20 text-[#10a37f]",
  Claude: "bg-[#d4a574]/10 border-[#d4a574]/20 text-[#d4a574]",
};

interface ModelBadgeProps {
  model: "GPT-4o" | "Claude";
  className?: string;
}

export function ModelBadge({ model, className }: ModelBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded font-mono border whitespace-nowrap uppercase tracking-[1px]",
        modelStyles[model],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {model}
    </span>
  );
}
