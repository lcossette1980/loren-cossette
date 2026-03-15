import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BlogContent } from "@/components/blog/BlogContent";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BOOKING_URL } from "@/lib/constants";
import type { BlogPost } from "@/types/blog";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const { data } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  return data as BlogPost | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = `${post.title} — Loren Cossette`;
  const description = post.meta_description || post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.lorencossette.com/blog/${slug}`,
      siteName: "Loren Cossette",
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: ["Loren Cossette"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: "Loren Cossette" },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.cover_image,
    url: `https://www.lorencossette.com/blog/${slug}`,
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-32 pb-32">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-cyan/80 hover:text-accent-cyan text-sm font-mono transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-10">
            {/* Category / date line */}
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-4">
              Blog
              {post.published_at && (
                <>
                  {" "}
                  <span className="text-text-muted mx-2">/</span>{" "}
                  {formatDate(post.published_at)}
                </>
              )}
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              {post.title}
            </h1>

            {/* Meta line */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
              <span className="inline-flex items-center gap-1.5">
                <User size={14} />
                Loren Cossette
              </span>
              {post.published_at && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(post.published_at)}
                </span>
              )}
              {post.reading_time > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.reading_time} min read
                </span>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Cover image */}
          {post.cover_image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-glass-border mb-12">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}

          {/* Blog content */}
          <BlogContent content={post.content} />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border-default">
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-4">
              Share this article
            </p>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* CTA */}
          <div className="mt-16 pt-8 border-t border-border-default">
            <div className="rounded-xl bg-bg-secondary/50 border border-border-subtle p-8 text-center">
              <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-3">
                Let&apos;s Connect
              </p>
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                Interested in working together?
              </h3>
              <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
                Book a free strategy call to discuss how AI can transform your
                organization.
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md">
                  Book a Call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
