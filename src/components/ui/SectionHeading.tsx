"use client";

import { Reveal } from "@/components/animations/Reveal";

interface SectionHeadingProps {
  label: string;
  heading: string;
  accentWord?: string;
  description?: string;
  center?: boolean;
}

export function SectionHeading({
  label,
  heading,
  accentWord,
  description,
  center = false,
}: SectionHeadingProps) {
  const renderHeading = () => {
    if (!accentWord) return heading;
    const parts = heading.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="text-accent-cyan">{accentWord}</span>
        {parts[1] || ""}
      </>
    );
  };

  return (
    <div className={center ? "text-center" : ""}>
      <Reveal>
        <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-4">
          {label}
        </p>
        <div
          className={`h-px bg-gradient-to-r from-transparent via-accent-warm/30 to-transparent mb-8 ${
            center ? "max-w-[200px] mx-auto" : "max-w-[120px]"
          }`}
        />
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.01em] mb-6 text-text-primary">
          {renderHeading()}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed mt-2">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
