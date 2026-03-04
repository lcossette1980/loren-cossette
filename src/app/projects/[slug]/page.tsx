import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, ArrowRight, Eye, Globe, Bot, Shield, BookOpen } from "lucide-react";
import { ProjectDetailClient } from "./ProjectDetailClient";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Eye, Globe, Bot, Shield, BookOpen,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const Icon = iconMap[project.icon] || Eye;

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
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

        {/* Screenshots */}
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

        {/* Description */}
        <div className="mb-12">
          <h2 className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-4">
            Overview
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Hero image */}
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
                <ArrowRight
                  size={14}
                  className="text-accent-cyan shrink-0 mt-1"
                />
                {f}
              </div>
            ))}
          </div>
        </div>

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
