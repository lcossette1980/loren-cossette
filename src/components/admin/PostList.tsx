"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/Badge";

interface PostListProps {
  posts: BlogPost[];
}

export function PostList({ posts: initialPosts }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function handleTogglePublish(post: BlogPost) {
    setActionLoading(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}/publish`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to toggle publish status");
      const updated = await res.json();
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? updated : p))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update post status");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(post: BlogPost) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${post.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setActionLoading(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    } finally {
      setActionLoading(null);
    }
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "--";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted text-lg">
          No posts yet. Create your first post.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border-default">
            <th className="pb-3 text-xs font-mono text-text-muted uppercase tracking-wider">
              Title
            </th>
            <th className="pb-3 text-xs font-mono text-text-muted uppercase tracking-wider">
              Status
            </th>
            <th className="pb-3 text-xs font-mono text-text-muted uppercase tracking-wider">
              Date
            </th>
            <th className="pb-3 text-xs font-mono text-text-muted uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default">
          {posts.map((post) => (
            <tr key={post.id} className="group">
              <td className="py-4 pr-4">
                <span className="text-text-primary font-medium">
                  {post.title}
                </span>
                <span className="block text-xs text-text-muted mt-0.5">
                  /{post.slug}
                </span>
              </td>
              <td className="py-4 pr-4">
                {post.status === "published" ? (
                  <Badge variant="accent">Published</Badge>
                ) : (
                  <Badge
                    className="bg-accent-warm/10 border-accent-warm/20 text-accent-warm"
                  >
                    Draft
                  </Badge>
                )}
              </td>
              <td className="py-4 pr-4 text-sm text-text-secondary tabular-nums">
                {formatDate(post.published_at || post.created_at)}
              </td>
              <td className="py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-xs text-text-secondary hover:text-accent-cyan transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(post)}
                    disabled={actionLoading === post.id}
                    className="text-xs text-text-secondary hover:text-accent-warm transition-colors disabled:opacity-50"
                  >
                    {post.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    disabled={actionLoading === post.id}
                    className="text-xs text-text-secondary hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
