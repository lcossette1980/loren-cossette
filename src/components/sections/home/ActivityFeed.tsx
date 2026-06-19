"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { activity, type ActivityType } from "@/data/activity";
import { ArrowRight, ExternalLink } from "lucide-react";

const typeStyle: Record<ActivityType, string> = {
  MILESTONE: "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan",
  FEATURE: "bg-accent-warm/10 border-accent-warm/30 text-accent-warm",
  FIX: "bg-green-500/10 border-green-500/30 text-green-400",
  RESEARCH: "bg-purple-500/10 border-purple-500/30 text-purple-400",
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

interface ActivityFeedProps {
  /** How many recent entries to show. Defaults to 6. */
  limit?: number;
  /** When true, renders without the surrounding section wrapper — for the dedicated /activity page. */
  embedded?: boolean;
}

export function ActivityFeed({ limit = 6, embedded = false }: ActivityFeedProps) {
  const entries = activity.slice(0, limit);

  const list = (
    <div className="space-y-0">
      {entries.map((e, i) => {
        const isExternal = e.href?.startsWith("http");
        const Wrapper = e.href
          ? ({ children }: { children: React.ReactNode }) =>
              isExternal ? (
                <a
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  {children}
                </a>
              ) : (
                <Link href={e.href!} className="block group">
                  {children}
                </Link>
              )
          : ({ children }: { children: React.ReactNode }) => (
              <div>{children}</div>
            );

        return (
          <motion.div
            key={`${e.date}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <Wrapper>
              <div
                className={`grid grid-cols-[80px_1fr] md:grid-cols-[100px_120px_1fr] gap-3 md:gap-5 py-5 border-b border-border-subtle ${
                  e.href ? "hover:bg-bg-elevated/30 -mx-3 px-3 rounded-lg transition-colors cursor-pointer" : ""
                }`}
              >
                {/* Date */}
                <div className="font-mono text-[11px] tracking-widest uppercase text-text-muted pt-0.5 md:pt-1">
                  {formatDate(e.date)}
                </div>

                {/* Type chip — desktop only */}
                <div className="hidden md:block">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full font-mono text-[9px] tracking-widest uppercase border ${typeStyle[e.type]}`}
                  >
                    {e.type}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0">
                  {/* Mobile chip */}
                  <span
                    className={`md:hidden inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[9px] tracking-widest uppercase border ${typeStyle[e.type]} mb-2`}
                  >
                    {e.type}
                  </span>

                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[11px] text-accent-warm tracking-wide">
                      {e.project}
                    </span>
                    {e.href && (
                      <span className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                        {isExternal ? (
                          <ExternalLink size={11} />
                        ) : (
                          <ArrowRight size={11} />
                        )}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {e.summary}
                  </p>
                </div>
              </div>
            </Wrapper>
          </motion.div>
        );
      })}
    </div>
  );

  if (embedded) return list;

  return (
    <section className="py-32 lg:py-40 bg-bg-elevated">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHeading
            label="Delivery Evidence"
            heading="Dated record of what shipped"
            accentWord="shipped"
            description="Production milestones, validation improvements, and shipped functionality across the Multnomah County AI Program and other work — dated and traceable to specific case studies. The same auditability standard the program maintains internally."
          />
        </Reveal>

        <div className="mt-12">{list}</div>

        <Reveal delay={0.15}>
          <div className="text-center mt-10">
            <Link
              href="/activity"
              className="inline-flex items-center gap-2 text-accent-cyan/80 hover:text-accent-cyan text-sm font-mono hover:gap-3 transition-all"
            >
              See the full delivery record <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
