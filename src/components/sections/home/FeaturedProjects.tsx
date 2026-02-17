"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { projects } from "@/data/projects";
import { ArrowRight, Eye, Globe, Bot, Shield, BookOpen } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Eye, Globe, Bot, Shield, BookOpen,
};

const featured = projects.filter((p) => p.featured);

export function FeaturedProjects() {
  return (
    <section className="py-32 lg:py-40 bg-bg-elevated">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Projects"
          heading="Built & shipped"
          accentWord="shipped"
          center
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {featured.map((p) => {
            const Icon = iconMap[p.icon] || Eye;
            return (
              <motion.div key={p.slug} variants={staggerItem}>
                <Link href={`/projects/${p.slug}`}>
                  <Card className="overflow-hidden group h-full" variant="glow">
                    <div className="relative aspect-video w-full overflow-hidden border-b border-border-default">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
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
                          <Badge key={t} variant="outline" className="text-[9px] px-2 py-0.5">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </StaggerContainer>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent-cyan/80 hover:text-accent-cyan text-sm font-mono hover:gap-3 transition-all transition-colors"
          >
            View all projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
