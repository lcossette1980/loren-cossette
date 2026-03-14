"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MAX_CHARS = 3000;
const MIN_CHARS = 50;

interface AssessmentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  remaining: number | null;
}

export function AssessmentInput({
  value,
  onChange,
  onSubmit,
  disabled,
  remaining,
}: AssessmentInputProps) {
  const charCount = value.length;
  const isValid = charCount >= MIN_CHARS && charCount <= MAX_CHARS;

  return (
    <div className="mt-5">
      <label className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted block mb-3">
        Describe your organization&apos;s AI situation
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
        placeholder="Describe your organization's size, industry, current AI initiatives, leadership structure, challenges, and goals. The more detail you provide, the more specific the assessment..."
        rows={8}
        disabled={disabled}
        className={cn(
          "w-full bg-bg-tertiary border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-accent-cyan/40 transition-colors",
          disabled
            ? "border-border-subtle opacity-60"
            : "border-border-default"
        )}
      />

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "font-mono text-[11px]",
              charCount < MIN_CHARS
                ? "text-text-muted"
                : charCount > MAX_CHARS * 0.9
                  ? "text-orange-400"
                  : "text-text-muted"
            )}
          >
            {charCount}/{MAX_CHARS}
          </span>
          {remaining !== null && (
            <span className="font-mono text-[11px] text-text-muted">
              {remaining} assessment{remaining !== 1 ? "s" : ""} remaining today
            </span>
          )}
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onSubmit}
          className={cn(!isValid || disabled ? "opacity-50 pointer-events-none" : "")}
        >
          <Sparkles size={16} />
          Analyze Readiness
        </Button>
      </div>
    </div>
  );
}
