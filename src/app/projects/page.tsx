"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { Eye, Globe, Bot, Shield, BookOpen, ArrowRight } from "lucide-react";
import type { ProjectCategory } from "@/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Eye, Globe, Bot, Shield, BookOpen,
};

const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "AI Agents", value: "ai-agents" },
  { label: "NLP", value: "nlp" },
  { label: "Full Stack", value: "full-stack" },
  { label: "Compliance", value: "compliance" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Projects"
          heading="Built & shipped"
          accentWord="shipped"
          description="Production systems I've designed, built, and deployed."
        />

        {/* Filter bar */}
        <div className="flex gap-2 flex-wrap mt-10 mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all border ${
                filter === f.value
                  ? "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan"
                  : "bg-transparent border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => {
              const Icon = iconMap[p.icon] || Eye;
              return (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/projects/${p.slug}`}>
                    <Card className="overflow-hidden group h-full" variant="glow">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon size={18} className="text-accent-cyan" />
                          <h3 className="font-bold text-text-primary">
                            {p.title}
                          </h3>
                        </div>
                        <p className="font-mono text-[11px] text-text-muted mb-3">
                          {p.subtitle}
                        </p>
                        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                          {p.shortDescription}
                        </p>

                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {p.stats.map((s) => (
                            <div
                              key={s.label}
                              className="text-center p-2 bg-bg-tertiary/50 rounded-lg border border-border-default"
                            >
                              <div className="font-mono text-sm font-bold text-accent-warm">
                                {s.value}
                              </div>
                              <div className="text-[10px] text-text-muted mt-0.5">
                                {s.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {p.tech.slice(0, 4).map((t) => (
                            <Badge
                              key={t}
                              variant="outline"
                              className="text-[9px] px-2 py-0.5"
                            >
                              {t}
                            </Badge>
                          ))}
                          {p.tech.length > 4 && (
                            <Badge variant="outline" className="text-[9px] px-2 py-0.5">
                              +{p.tech.length - 4}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-4 text-accent-cyan text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          View details <ArrowRight size={12} />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
