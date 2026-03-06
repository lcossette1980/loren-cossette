import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Globe,
  Bot,
  Shield,
  BookOpen,
  CheckCircle2,
  FileText,
  ShieldCheck,
  GitBranch,
  UserCheck,
  Presentation,
} from "lucide-react";
import { ProjectDetailClient } from "./ProjectDetailClient";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Eye, Globe, Bot, Shield, BookOpen,
};

const deliverableIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileText, ShieldCheck, GitBranch, UserCheck, BookOpen, Presentation,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — Loren Cossette`;
  const description = project.shortDescription;
  const statsLine = project.stats.map((s) => `${s.value} ${s.label}`).join(" · ");

  return {
    title,
    description,
    keywords: [
      ...project.tech,
      "AI project",
      "portfolio",
      "Loren Cossette",
      project.category,
    ],
    openGraph: {
      title,
      description: `${description} — ${statsLine}`,
      url: `https://www.lorencossette.com/projects/${slug}`,
      siteName: "Loren Cossette",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${description} — ${statsLine}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const Icon = iconMap[project.icon] || Eye;

  const hasExtendedContent =
    project.screenshots ||
    project.validationPipeline ||
    project.impactMetrics ||
    project.deliverables;

  return (
    <div className="pt-32 pb-32">
      <div className={`mx-auto px-6 md:px-8 ${hasExtendedContent ? "max-w-5xl" : "max-w-3xl"}`}>
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-accent-cyan/80 hover:text-accent-cyan text-sm font-mono transition-colors mb-10"
        >
          <ArrowLeft size={14} /> All Projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Icon size={24} className="text-accent-cyan" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              {project.title}
            </h1>
          </div>
          <p className="font-mono text-sm text-text-muted mb-6">
            {project.subtitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} variant="accent">
                {t}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <ProjectDetailClient stats={project.stats} />

        {/* Screenshots — enhanced gallery for projects with screenshots array */}
        {project.screenshots && project.screenshots.length > 0 ? (
          <div className="mb-12">
            <h2 className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-6">
              Platform Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.screenshots.map((ss, i) => (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl bg-[#0d1117] ${
                    i === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Browser chrome mockup */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-[#30363d]">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="bg-[#0d1117] rounded-md px-3 py-1 text-[10px] font-mono text-text-muted/60 text-center truncate">
                        multnomah-county-accessibility.app
                      </div>
                    </div>
                  </div>
                  {/* Screenshot with dark-mode CSS treatment */}
                  <div className={`relative w-full overflow-hidden ${i === 0 ? "aspect-[16/8]" : "aspect-video"}`}>
                    <Image
                      src={ss.src}
                      alt={ss.alt}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] brightness-[0.85] contrast-[1.1] saturate-[0.85]"
                      sizes={i === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                    />
                    {/* Dark tint overlay */}
                    <div className="absolute inset-0 bg-[#0a0a0f]/25 mix-blend-multiply pointer-events-none" />
                    {/* Cyan tint for brand color blending */}
                    <div className="absolute inset-0 bg-accent-cyan/[0.03] mix-blend-screen pointer-events-none" />
                    {/* Bottom gradient for caption */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/70 to-transparent" />
                  </div>
                  {/* Caption */}
                  <div className="absolute bottom-0 inset-x-0 px-5 pb-4">
                    <p className="text-xs text-text-secondary/90 leading-relaxed">
                      {ss.caption}
                    </p>
                  </div>
                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-2xl border border-accent-cyan/10 group-hover:border-accent-cyan/25 transition-colors pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Default two-image layout for projects without screenshots array */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-glass-border">
              <Image
                src={project.dashboardImage}
                alt={`${project.title} — Dashboard View`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-glass-border">
              <Image
                src={project.architectureImage}
                alt={`${project.title} — Architecture`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-12">
          <h2 className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-4">
            Overview
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Validation Pipeline */}
        {project.validationPipeline && (
          <div className="mb-12">
            <h2 className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-6">
              Validation Pipeline
            </h2>
            <div className="space-y-0">
              {project.validationPipeline.map((step, i) => {
                const [title, ...descParts] = step.split(" \u2014 ");
                const desc = descParts.join(" — ");
                return (
                  <div key={i} className="relative flex gap-5">
                    {/* Vertical connector line */}
                    {i < project.validationPipeline!.length - 1 && (
                      <div className="absolute left-[19px] top-10 bottom-0 w-px bg-accent-cyan/20" />
                    )}
                    {/* Step number */}
                    <div className="shrink-0 w-10 h-10 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center font-mono text-sm font-bold text-accent-cyan z-10">
                      {i + 1}
                    </div>
                    {/* Content */}
                    <div className="pb-8">
                      <h3 className="text-sm font-bold text-text-primary mb-1">
                        {title}
                      </h3>
                      {desc && (
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Impact Metrics */}
        {project.impactMetrics && (
          <div className="mb-12">
            <h2 className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-6">
              Impact & Results
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.impactMetrics.map((m) => (
                <div
                  key={m.label}
                  className="p-5 rounded-xl bg-[rgba(13,17,23,0.6)] border border-border-subtle text-center"
                >
                  <div className="font-mono text-xl font-bold text-accent-cyan mb-1">
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold text-text-primary mb-1">
                    {m.label}
                  </div>
                  <div className="text-[10px] text-text-muted">{m.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero image (only for projects without screenshots) */}
        {!project.screenshots && (
          <div className="mb-12">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-glass-border">
              <Image
                src={project.image}
                alt={`${project.title} — Screenshot`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        )}

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-4">
            Key Features
          </h2>
          <div className="space-y-3">
            {project.keyFeatures.map((f, i) => (
              <div
                key={i}
                className="flex gap-3 text-text-secondary text-sm leading-relaxed"
              >
                <CheckCircle2
                  size={14}
                  className="text-accent-cyan shrink-0 mt-1"
                />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        {project.deliverables && (
          <div className="mb-16">
            <h2 className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-6">
              Deliverables & Documentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.deliverables.map((d, i) => {
                const DIcon = deliverableIconMap[d.icon] || FileText;
                return (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-xl bg-[rgba(13,17,23,0.6)] border border-border-subtle"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-warm/10 border border-accent-warm/20 flex items-center justify-center">
                      <DIcon size={18} className="text-accent-warm" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-primary mb-1">
                        {d.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {d.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Next Project */}
        <div className="border-t border-border-default pt-8">
          <p className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-3">
            Next Project
          </p>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="flex items-center justify-between group text-accent-cyan/80 hover:text-accent-cyan transition-colors"
          >
            <span className="text-xl font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
              {nextProject.title}
            </span>
            <ArrowRight size={20} className="text-text-muted group-hover:text-accent-cyan transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
