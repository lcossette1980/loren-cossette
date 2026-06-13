"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  ExternalLink,
} from "lucide-react";
import type { Project } from "@/types";

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

const MULTCO_HUB_URL = "https://multco-presentations.web.app";

/* Split projects by lane */
const multcoProgram = projects.filter((p) => p.program === "multco-ai");
const linkit = projects.find((p) => p.slug === "linkit");
const otherProjects = projects.filter(
  (p) => !p.program && p.slug !== "linkit"
);

const statusStyle: Record<string, string> = {
  "In Production · Scaling":
    "bg-green-500/10 border-green-500/30 text-green-400",
  "Active Development":
    "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan",
  Discovery: "bg-accent-warm/10 border-accent-warm/30 text-accent-warm",
  Restricted: "bg-text-muted/10 border-text-muted/30 text-text-muted",
};

function ProjectCard({ p }: { p: Project }) {
  const Icon = iconMap[p.icon] || Eye;
  return (
    <Link href={`/projects/${p.slug}`} className="block h-full">
      <Card className="overflow-hidden group h-full" variant="glow">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={p.image}
            alt={p.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {p.programStatus && (
            <div className="absolute top-3 left-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase border backdrop-blur-sm ${
                  statusStyle[p.programStatus] ||
                  "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan"
                }`}
              >
                {p.programStatus}
              </span>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Icon size={18} className="text-accent-cyan" />
            <h3 className="font-bold text-text-primary">{p.title}</h3>
          </div>
          <p className="font-mono text-[11px] text-text-muted mb-1">
            {p.subtitle}
          </p>
          {p.department && (
            <p className="font-mono text-[10px] text-accent-warm/70 mb-3">
              {p.department}
            </p>
          )}
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
  );
}

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="The Program"
          heading="5 production AI initiatives, 1 embedded architect"
          accentWord="program"
          description="I currently run the AI program inside Multnomah County — architecting, building, and shipping production AI across 5 simultaneous initiatives. Plus other client work shipped in the last few years."
        />

        {/* ── Multnomah County AI Program Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 mb-10"
        >
          <Card variant="glow" className="overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-start gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan text-[10px] font-mono tracking-widest uppercase backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  Live Program
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-warm/10 border border-accent-warm/30 text-accent-warm text-[10px] font-mono tracking-widest uppercase">
                  Shipping Weekly
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                Multnomah County AI Program
              </h2>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6 max-w-3xl">
                Four production AI initiatives running simultaneously inside the
                County, plus one in discovery and one restricted engagement
                proposal. I&apos;m the embedded AI architect: I design the
                systems, write the code, capture the institutional knowledge,
                and ship features weekly. The program runs its own public
                presentation hub with a dated activity feed — anyone can verify
                the velocity.
              </p>

              {/* Program stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Production Systems", value: "2" },
                  { label: "Active Development", value: "1" },
                  { label: "In Discovery", value: "1" },
                  { label: "Restricted Proposal", value: "1" },
                ].map((s) => (
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

              <div className="flex flex-wrap gap-3">
                <Button
                  href={MULTCO_HUB_URL}
                  external
                  variant="primary"
                  size="sm"
                >
                  <ExternalLink size={14} /> View Live Program Hub
                </Button>
                <Button href="#multco-projects" variant="secondary" size="sm">
                  See the 4 Initiatives <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── Multco Program Project Grid ── */}
        <div id="multco-projects" className="scroll-mt-32">
          <div className="flex items-baseline justify-between mb-6 mt-12">
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium">
              Program Initiatives
            </p>
            <Link
              href={MULTCO_HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-muted hover:text-accent-cyan transition-colors"
            >
              Live hub <ExternalLink size={11} />
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {multcoProgram.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </motion.div>
        </div>

        {/* ── Earlier Multnomah County Work ── */}
        {linkit && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-accent-warm/20 to-transparent my-20" />

            <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-6">
              Earlier Multnomah County Work
            </p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <ProjectCard p={linkit} />
            </motion.div>
          </>
        )}

        {/* ── Other Production Systems ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-warm/20 to-transparent my-20" />

        <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-6">
          Other Production Systems
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {otherProjects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
