"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPostCard } from "@/types/blog";

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface FeaturedPostProps {
  post: BlogPostCard;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <Card variant="glow" className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image side */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[340px] overflow-hidden">
              {post.cover_image ? (
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.85] contrast-[1.1] saturate-[0.85]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/15 via-bg-tertiary to-accent-warm/10" />
              )}
              {/* Dark tint overlay */}
              <div className="absolute inset-0 bg-[#0a0a0f]/20 mix-blend-multiply pointer-events-none" />
              {/* Gradient for text on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0a0f]/60" />
              {/* Latest badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan text-[10px] font-mono tracking-widest uppercase backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  Latest
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              {/* Date + reading time */}
              <div className="flex items-center gap-3 text-[11px] font-mono text-text-muted mb-3">
                {post.published_at && (
                  <span>{formatDate(post.published_at)}</span>
                )}
                {post.reading_time > 0 && (
                  <>
                    <span className="text-border-default">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={10} />
                      {post.reading_time} min read
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3 leading-tight">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.slice(0, 5).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[9px] px-2 py-0.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 5 && (
                    <Badge
                      variant="outline"
                      className="text-[9px] px-2 py-0.5"
                    >
                      +{post.tags.length - 5}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm">
                  Read Article <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
