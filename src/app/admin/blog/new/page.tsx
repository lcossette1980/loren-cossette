"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostForm } from "@/components/admin/PostForm";
import type { BlogPostFormData } from "@/types/blog";

export default function AdminNewPostPage() {
  const router = useRouter();

  async function handleSave(data: BlogPostFormData) {
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to create post");
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
        <h1 className="text-2xl font-bold text-text-primary mt-2">New Post</h1>
      </div>

      <PostForm onSave={handleSave} />
    </AdminShell>
  );
}
