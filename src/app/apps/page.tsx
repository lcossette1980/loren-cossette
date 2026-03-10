"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { personalProjects } from "@/data/personal-projects";
import { analytics } from "@/lib/analytics";
import {
  Rocket,
  ShieldCheck,
  Brain,
  GraduationCap,
  FileSearch,
  Newspaper,
  ExternalLink,
  CheckCircle,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import type { PersonalProjectCategory } from "@/types";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Rocket,
  ShieldCheck,
  Brain,
  GraduationCap,
  FileSearch,
  Newspaper,
};

const filters: { label: string; value: PersonalProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "AI Tools", value: "ai-tools" },
  { label: "SaaS", value: "saas" },
  { label: "Research", value: "research" },
  { label: "Consulting", value: "consulting" },
];

const statusStyles = {
  live: "bg-green-500/10 border-green-500/20 text-green-400",
  beta: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  development: "bg-blue-500/10 border-blue-500/20 text-blue-400",
};

const statusLabels = {
  live: "Live",
  beta: "Beta",
  development: "In Development",
};

/* Separate the featured project from the rest */
const featuredProject = personalProjects.find((p) => p.featured)!;
const FeaturedIcon = iconMap[featuredProject.icon] || Rocket;
const otherProjects = personalProjects.filter((p) => !p.featured);

export default function AppsPage() {
  const [filter, setFilter] = useState<PersonalProjectCategory | "all">("all");

  const filtered =
    filter === "all"
      ? otherProjects
      : otherProjects.filter((p) => p.category === filter);

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Personal Projects"
          heading="Apps & ventures I've built"
          accentWord="built"
          description="Side projects, SaaS products, and AI tools — shipped and live."
        />

        {/* ── Featured Spotlight ── */}
        <Reveal>
          <div className="mt-14 mb-16">
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-4">
              Featured
            </p>
            <a
              href={featuredProject.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.ctaClick("featured_app", "apps_page")}
              className="block"
            >
              <Card className="overflow-hidden group" variant="glow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-video md:aspect-auto md:min-h-[400px] w-full overflow-hidden border-b md:border-b-0 md:border-r border-border-default">
                    <Image
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-7 md:p-10 flex flex-col justify-center">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                          <FeaturedIcon size={22} className="text-accent-cyan" />
                        </div>
                        <div>
                          <h3 className="font-bold text-text-primary text-xl">
                            {featuredProject.title}
                          </h3>
                          <p className="font-mono text-[11px] text-text-muted">
                            {featuredProject.subtitle}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`hidden sm:inline-flex items-center text-[10px] px-2.5 py-1 rounded-full font-mono border ${statusStyles[featuredProject.status]}`}
                      >
                        {statusLabels[featuredProject.status]}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary leading-relaxed mb-5 mt-2">
                      {featuredProject.description}
                    </p>

                    {/* Highlights — show more for featured */}
                    <div className="space-y-2 mb-5">
                      {featuredProject.highlights.slice(0, 6).map((h) => (
                        <div key={h} className="flex items-start gap-2.5">
                          <CheckCircle
                            size={14}
                            className="text-accent-warm shrink-0 mt-0.5"
                          />
                          <span className="text-xs text-text-secondary leading-relaxed">
                            {h}
                          </span>
                        </div>
                      ))}
                      {featuredProject.highlights.length > 6 && (
                        <p className="text-[10px] text-text-muted font-mono pl-6">
                          +{featuredProject.highlights.length - 6} more
                        </p>
                      )}
                    </div>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {featuredProject.tech.slice(0, 7).map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-[9px] px-2 py-0.5"
                        >
                          {t}
                        </Badge>
                      ))}
                      {featuredProject.tech.length > 7 && (
                        <Badge
                          variant="outline"
                          className="text-[9px] px-2 py-0.5"
                        >
                          +{featuredProject.tech.length - 7}
                        </Badge>
                      )}
                    </div>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-accent-cyan/80 group-hover:text-accent-cyan text-xs font-mono transition-colors">
                      <ExternalLink size={12} />
                      {featuredProject.url.replace(/^https?:\/\//, "")}
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </Reveal>

        {/* ── Section divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-warm/20 to-transparent mb-14" />

        {/* ── Other Projects heading ── */}
        <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-6">
          All Projects
        </p>

        {/* Filter bar */}
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

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => {
              const Icon = iconMap[p.icon] || Rocket;
              return (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="overflow-hidden group h-full" variant="glow">
                      {/* Thumbnail */}
                      <div className="relative aspect-video w-full overflow-hidden border-b border-border-default">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>

                      {/* Header */}
                      <div className="p-6 pb-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                              <Icon size={20} className="text-accent-cyan" />
                            </div>
                            <div>
                              <h3 className="font-bold text-text-primary text-lg">
                                {p.title}
                              </h3>
                              <p className="font-mono text-[11px] text-text-muted">
                                {p.subtitle}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-flex items-center text-[10px] px-2.5 py-1 rounded-full font-mono border ${statusStyles[p.status]}`}
                            >
                              {statusLabels[p.status]}
                            </span>
                            <ArrowUpRight
                              size={16}
                              className="text-text-muted group-hover:text-accent-cyan transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6 pt-4">
                        <p className="text-sm text-text-secondary leading-relaxed mb-5">
                          {p.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-2 mb-5">
                          {p.highlights.slice(0, 4).map((h) => (
                            <div
                              key={h}
                              className="flex items-start gap-2.5"
                            >
                              <CheckCircle
                                size={14}
                                className="text-accent-warm shrink-0 mt-0.5"
                              />
                              <span className="text-xs text-text-secondary leading-relaxed">
                                {h}
                              </span>
                            </div>
                          ))}
                          {p.highlights.length > 4 && (
                            <p className="text-[10px] text-text-muted font-mono pl-6">
                              +{p.highlights.length - 4} more features
                            </p>
                          )}
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.tech.slice(0, 5).map((t) => (
                            <Badge
                              key={t}
                              variant="outline"
                              className="text-[9px] px-2 py-0.5"
                            >
                              {t}
                            </Badge>
                          ))}
                          {p.tech.length > 5 && (
                            <Badge
                              variant="outline"
                              className="text-[9px] px-2 py-0.5"
                            >
                              +{p.tech.length - 5}
                            </Badge>
                          )}
                        </div>

                        {/* URL */}
                        <div className="flex items-center gap-2 text-accent-cyan/80 group-hover:text-accent-cyan text-xs font-mono transition-colors">
                          <ExternalLink size={12} />
                          {p.url.replace(/^https?:\/\//, "")}
                        </div>
                      </div>
                    </Card>
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
