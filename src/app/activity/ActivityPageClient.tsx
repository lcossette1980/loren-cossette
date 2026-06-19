"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Flag,
  Sparkles,
  Wrench,
  Lightbulb,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import type { ActivityEntry, ActivityType } from "@/data/activity";

const typeStyle: Record<ActivityType, string> = {
  MILESTONE: "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan",
  FEATURE: "bg-accent-warm/10 border-accent-warm/30 text-accent-warm",
  FIX: "bg-green-500/10 border-green-500/30 text-green-400",
  RESEARCH: "bg-purple-500/10 border-purple-500/30 text-purple-400",
};

const typeIcon: Record<
  ActivityType,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  MILESTONE: Flag,
  FEATURE: Sparkles,
  FIX: Wrench,
  RESEARCH: Lightbulb,
};

function formatDate(iso: string): string {
  const [, m, d] = iso.split("-").map((v) => parseInt(v, 10));
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[m - 1]} ${d}`;
}

interface Props {
  entries: ActivityEntry[];
}

export function ActivityPageClient({ entries }: Props) {
  const [filter, setFilter] = useState<string>("all");

  const projects = useMemo(() => {
    const unique = Array.from(new Set(entries.map((a) => a.project)));
    return ["all", ...unique];
  }, [entries]);

  const filtered = useMemo(() => {
    if (filter === "all") return entries;
    return entries.filter((a) => a.project === filter);
  }, [filter, entries]);

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHeading
            label="Delivery Evidence"
            heading="Complete record of shipped work, dated"
            accentWord="shipped"
            description="Production milestones, validation improvements, and shipped functionality across the Multnomah County AI Program and other work. Each entry is dated and links to the underlying case study. The Multnomah County entries are pulled live from the program hub at multco-presentations.web.app and refresh hourly."
          />
        </Reveal>

        {/* Filter bar */}
        <Reveal delay={0.1}>
          <div className="flex gap-2 flex-wrap mt-10 mb-10">
            {projects.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFilter(p)}
                aria-pressed={filter === p}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] tracking-widest uppercase transition-all border ${
                  filter === p
                    ? "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan"
                    : "bg-transparent border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted"
                }`}
              >
                {p === "all" ? "All Projects" : p}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            <div className="text-center p-3 bg-bg-tertiary/50 rounded-lg border border-border-default">
              <div className="font-mono text-lg font-bold text-accent-cyan">
                {filtered.length}
              </div>
              <div className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">
                Total Entries
              </div>
            </div>
            <div className="text-center p-3 bg-bg-tertiary/50 rounded-lg border border-border-default">
              <div className="font-mono text-lg font-bold text-accent-cyan">
                {filtered.filter((a) => a.type === "MILESTONE").length}
              </div>
              <div className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">
                Milestones
              </div>
            </div>
            <div className="text-center p-3 bg-bg-tertiary/50 rounded-lg border border-border-default">
              <div className="font-mono text-lg font-bold text-accent-cyan">
                {filtered.filter((a) => a.type === "FEATURE").length}
              </div>
              <div className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">
                Features
              </div>
            </div>
            <div className="text-center p-3 bg-bg-tertiary/50 rounded-lg border border-border-default">
              <div className="font-mono text-lg font-bold text-accent-cyan">
                {filtered.filter((a) => a.type === "FIX").length}
              </div>
              <div className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">
                Fixes
              </div>
            </div>
          </div>
        </Reveal>

        <FilteredActivityList entries={filtered} />
      </div>
    </div>
  );
}

function FilteredActivityList({ entries }: { entries: ActivityEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16 rounded-xl border border-border-subtle bg-bg-secondary/50">
        <p className="text-text-muted">No activity for this filter yet.</p>
      </div>
    );
  }

  return (
    <div>
      {entries.map((e, i) => {
        const isExternal = e.href?.startsWith("http");
        const inner = (
          <div
            className={`grid grid-cols-[80px_1fr] md:grid-cols-[100px_120px_1fr] gap-3 md:gap-5 py-5 border-b border-border-subtle ${
              e.href
                ? "hover:bg-bg-elevated/30 -mx-3 px-3 rounded-lg transition-colors cursor-pointer"
                : ""
            }`}
          >
            <div className="font-mono text-[11px] tracking-widest uppercase text-text-muted pt-0.5 md:pt-1">
              {formatDate(e.date)}
            </div>
            <div className="hidden md:block">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full font-mono text-[9px] tracking-widest uppercase border ${typeStyle[e.type]}`}
              >
                {(() => {
                  const Icon = typeIcon[e.type];
                  return <Icon size={10} aria-hidden className="shrink-0" />;
                })()}
                {e.type}
              </span>
            </div>
            <div className="min-w-0">
              <span
                className={`md:hidden inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] tracking-widest uppercase border ${typeStyle[e.type]} mb-2`}
              >
                {(() => {
                  const Icon = typeIcon[e.type];
                  return <Icon size={10} aria-hidden className="shrink-0" />;
                })()}
                {e.type}
              </span>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[11px] text-accent-warm tracking-wide">
                  {e.project}
                </span>
                {e.href && (
                  <span className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    {isExternal ? (
                      <ExternalLink size={11} aria-hidden="true" />
                    ) : (
                      <ArrowRight size={11} aria-hidden="true" />
                    )}
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {e.summary}
              </p>
            </div>
          </div>
        );

        return (
          <motion.div
            key={`${e.date}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.4) }}
          >
            {e.href ? (
              isExternal ? (
                <a
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  {inner}
                </a>
              ) : (
                <Link href={e.href} className="block group">
                  {inner}
                </Link>
              )
            ) : (
              inner
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
