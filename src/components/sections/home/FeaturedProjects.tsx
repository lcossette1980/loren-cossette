"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { projects } from "@/data/projects";
import { ArrowRight, Eye, Globe, Bot, Shield, BookOpen } from "lucide-react";
import { analytics } from "@/lib/analytics";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Eye, Globe, Bot, Shield, BookOpen,
};

/* The one hero project to spotlight */
const spotlight = projects.find((p) => p.slug === "a11yready")!;
const SpotlightIcon = iconMap[spotlight.icon] || Shield;

export function FeaturedProjects() {
  return (
    <section className="py-24 lg:py-32 bg-bg-elevated">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-3 text-center">
            Featured Project
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href={`/projects/${spotlight.slug}`}
            onClick={() => analytics.projectClick(spotlight.slug)}
            className="block"
          >
            <Card className="overflow-hidden group" variant="glow">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-video md:aspect-auto w-full overflow-hidden border-b md:border-b-0 md:border-r border-border-default">
                  <Image
                    src={spotlight.image}
                    alt={spotlight.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <SpotlightIcon size={18} className="text-accent-cyan" />
                    <h3 className="font-bold text-text-primary text-lg">
                      {spotlight.title}
                    </h3>
                  </div>
                  <p className="font-mono text-[11px] text-text-muted mb-4">
                    {spotlight.subtitle}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {spotlight.shortDescription}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {spotlight.stats.map((s) => (
                      <div
                        key={s.label}
                        className="text-center p-2.5 bg-bg-tertiary/50 rounded-lg border border-border-default"
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

                  {/* Tech + CTA */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {spotlight.tech.slice(0, 5).map((t) => (
                        <Badge key={t} variant="outline" className="text-[9px] px-2 py-0.5">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-accent-cyan/70 text-xs font-mono shrink-0 group-hover:text-accent-cyan group-hover:gap-2.5 transition-all">
                      View project <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent-cyan/80 hover:text-accent-cyan text-sm font-mono hover:gap-3 transition-all"
            >
              View all projects <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
