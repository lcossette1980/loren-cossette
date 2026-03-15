"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { staggerItem } from "@/components/animations/variants";
import type { BlogPostCard } from "@/types/blog";

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface BlogCardProps {
  post: BlogPostCard;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Link href={`/blog/${post.slug}`}>
        <Card variant="solid" hover className="overflow-hidden group h-full">
          {/* Cover image or gradient placeholder */}
          <div className="relative aspect-video w-full overflow-hidden">
            {post.cover_image ? (
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-accent-warm/10" />
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-bold text-lg text-text-primary mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Bottom row: date + reading time + tags */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-text-muted mb-3">
              {post.published_at && (
                <span>{formatDate(post.published_at)}</span>
              )}
              {post.reading_time > 0 && (
                <>
                  <span className="text-border-default">·</span>
                  <span>{post.reading_time} min read</span>
                </>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[9px] px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-[9px] px-2 py-0.5"
                  >
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
