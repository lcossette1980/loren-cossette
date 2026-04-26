"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import {
  Eye,
  Globe,
  Bot,
  Shield,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { ProjectCategory } from "@/types";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Eye,
  Globe,
  Bot,
  Shield,
  BookOpen,
};

const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "AI Agents", value: "ai-agents" },
  { label: "NLP", value: "nlp" },
  { label: "Full Stack", value: "full-stack" },
  { label: "Compliance", value: "compliance" },
];

/* ── Featured project: A11yReady ── */
const featuredProject = projects.find((p) => p.slug === "a11yready")!;

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
          heading="Complex problems, working systems"
          accentWord="working"
          description="Case studies in turning complex organizational problems into deployed AI systems with measurable outcomes."
        />

        {/* ── Featured Project Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 mb-14"
        >
          <Link href={`/projects/${featuredProject.slug}`} className="block group">
            <Card variant="glow" className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image side */}
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <Image
                    src={featuredProject.dashboardImage}
                    alt={featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85] contrast-[1.1] saturate-[0.85]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Dark tint overlay */}
                  <div className="absolute inset-0 bg-[#0a0a0f]/20 mix-blend-multiply pointer-events-none" />
                  {/* Gradient overlay for text legibility on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0f]/60" />
                  {/* Featured badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan text-[10px] font-mono tracking-widest uppercase backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield size={22} className="text-accent-cyan" />
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                      {featuredProject.title}
                    </h2>
                  </div>
                  <p className="font-mono text-xs text-text-muted mb-4">
                    {featuredProject.subtitle}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
                    {featuredProject.shortDescription}
                  </p>

                  {/* Key metrics row */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {featuredProject.stats.map((s) => (
                      <div
                        key={s.label}
                        className="text-center p-3 bg-bg-tertiary/50 rounded-lg border border-border-default"
                      >
                        <div className="font-mono text-lg font-bold text-accent-cyan">
                          {s.value}
                        </div>
                        <div className="text-[10px] text-text-muted mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {[
                      "34-cluster classifier + 3-agent polish gate",
                      "30\u201390 sec processing vs. 1\u20134 hrs manual",
                      "AI-powered reviewer fix workflow",
                    ].map((h) => (
                      <div
                        key={h}
                        className="flex items-start gap-2 text-xs text-text-secondary"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-accent-warm shrink-0 mt-0.5"
                        />
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                      View Case Study <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* ── Filter bar ── */}
        <div className="flex gap-2 flex-wrap mb-10">
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

        {/* ── Grid ── */}
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
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                >
                  <Link href={`/projects/${p.slug}`}>
                    <Card
                      className="overflow-hidden group h-full"
                      variant="glow"
                    >
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
                            <Badge
                              variant="outline"
                              className="text-[9px] px-2 py-0.5"
                            >
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
