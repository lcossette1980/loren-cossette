import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { Badge } from "@/components/ui/Badge";
import type { BlogPostCard } from "@/types/blog";

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams;

  const { data: posts } = await getSupabase()
    .from("blog_posts")
    .select(
      "id, title, slug, excerpt, cover_image, tags, status, published_at, reading_time"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const allPosts = (posts ?? []) as BlogPostCard[];

  // Extract unique tags from all posts
  const allTags = Array.from(
    new Set(allPosts.flatMap((p) => p.tags ?? []))
  ).sort();

  // Filter by tag if specified
  const filtered = tag
    ? allPosts.filter((p) => p.tags?.includes(tag))
    : allPosts;

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Blog"
          heading="Thoughts on AI"
          accentWord="AI"
          description="Insights on AI systems, governance, and organizational transformation."
        />

        {/* Tag filters */}
        {allTags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-12 mb-10">
            <Link href="/blog">
              <button
                className={`px-4 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all border ${
                  !tag
                    ? "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan"
                    : "bg-transparent border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted"
                }`}
              >
                All
              </button>
            </Link>
            {allTags.map((t) => (
              <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}>
                <button
                  className={`px-4 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all border ${
                    tag === t
                      ? "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan"
                      : "bg-transparent border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted"
                  }`}
                >
                  {t}
                </button>
              </Link>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-20 rounded-xl border border-border-subtle bg-bg-secondary/50">
            <p className="text-text-muted text-lg">
              Coming soon — check back for insights on AI systems, governance,
              and organizational transformation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
