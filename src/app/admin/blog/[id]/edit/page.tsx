"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostForm } from "@/components/admin/PostForm";
import type { BlogPost, BlogPostFormData } from "@/types/blog";

export default function AdminEditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/admin/posts/${id}`);
        if (!res.ok) throw new Error("Failed to load post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  async function handleSave(data: BlogPostFormData) {
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to update post");
    }

    router.push("/admin/blog");
  }

  return (
    <AdminShell>
      <div className="mb-8">
        <Link
          href="/admin/blog"
          className="text-sm text-text-muted hover:text-accent-cyan transition-colors"
        >
          &larr; Back to posts
        </Link>
        <h1 className="text-2xl font-bold text-text-primary mt-2">
          Edit Post
        </h1>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-bg-tertiary rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-red-400">{error}</p>
        </div>
      ) : post ? (
        <PostForm initialData={post} onSave={handleSave} />
      ) : null}
    </AdminShell>
  );
}
