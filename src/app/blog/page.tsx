import { getSupabase } from "@/lib/supabase";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogCard } from "@/components/blog/BlogCard";
import { TagFilter } from "@/components/blog/TagFilter";
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

  // Extract unique tags sorted by frequency (most used first)
  const tagCounts = new Map<string, number>();
  allPosts.forEach((p) =>
    (p.tags ?? []).forEach((t) => tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1))
  );
  const allTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);

  // Featured post = most recent (only when viewing all, not filtered by tag)
  const featuredPost = !tag && allPosts.length > 0 ? allPosts[0] : null;

  // Remaining posts (exclude featured when showing)
  const remainingPosts = featuredPost ? allPosts.slice(1) : allPosts;

  // Filter by tag if specified
  const filtered = tag
    ? remainingPosts.filter((p) => p.tags?.includes(tag))
    : remainingPosts;

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Blog"
          heading="Thoughts on AI"
          accentWord="AI"
          description="Insights on AI systems, governance, and organizational transformation."
        />

        {/* ── Featured Post Hero ── */}
        {featuredPost && (
          <div className="mt-12 mb-14">
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-4">
              Latest
            </p>
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        {/* ── Divider ── */}
        {featuredPost && (
          <div className="h-px bg-gradient-to-r from-transparent via-accent-warm/20 to-transparent mb-14" />
        )}

        {/* ── Tag filter bar ── */}
        {allTags.length > 0 && (
          <div className="mb-10">
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-4">
              {tag ? `Filtered by "${tag}"` : "All Posts"}
            </p>
            <TagFilter tags={allTags} activeTag={tag} maxVisible={6} />
          </div>
        )}

        {/* ── Posts grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : allPosts.length === 0 ? (
          <div className="mt-16 text-center py-20 rounded-xl border border-border-subtle bg-bg-secondary/50">
            <p className="text-text-muted text-lg">
              Coming soon — check back for insights on AI systems, governance,
              and organizational transformation.
            </p>
          </div>
        ) : (
          <div className="mt-8 text-center py-16 rounded-xl border border-border-subtle bg-bg-secondary/50">
            <p className="text-text-muted">
              No posts found with tag &ldquo;{tag}&rdquo;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
