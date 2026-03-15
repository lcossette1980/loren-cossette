"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import type { BlogPost, BlogPostFormData } from "@/types/blog";
import { Badge } from "@/components/ui/Badge";
import { ImageUploader } from "./ImageUploader";
import { PostEditor } from "./PostEditor";

interface PostFormProps {
  initialData?: BlogPost;
  onSave: (data: BlogPostFormData) => Promise<void>;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function PostForm({ initialData, onSave }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImage, setCoverImage] = useState<string | null>(
    initialData?.cover_image || null
  );
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags.join(", ") || ""
  );
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.meta_description || ""
  );
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Track whether slug has been manually edited
  const slugManuallyEdited = useRef(!!initialData);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited.current) {
      setSlug(generateSlug(title));
    }
  }, [title]);

  function handleSlugChange(e: ChangeEvent<HTMLInputElement>) {
    slugManuallyEdited.current = true;
    setSlug(generateSlug(e.target.value));
  }

  function parseTags(): string[] {
    return tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  async function handleSave(status: "draft" | "published") {
    setSaveError("");
    setSaving(true);

    const data: BlogPostFormData = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content,
      cover_image: coverImage || null,
      tags: parseTags(),
      status,
      meta_title: metaTitle.trim(),
      meta_description: metaDescription.trim(),
    };

    try {
      await onSave(data);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload(): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) {
          resolve(null);
          return;
        }

        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
          });
          if (!res.ok) throw new Error("Upload failed");
          const data = await res.json();
          resolve(data.url);
        } catch {
          resolve(null);
        }
      };
      input.click();
    });
  }

  const inputClasses =
    "w-full px-4 py-2.5 bg-bg-tertiary border border-border-default rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-colors text-sm";

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <label className="block text-sm text-text-secondary mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className={inputClasses}
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm text-text-secondary mb-2">Slug</label>
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-sm">/blog/</span>
          <input
            type="text"
            value={slug}
            onChange={handleSlugChange}
            placeholder="post-slug"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm text-text-secondary mb-2">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief description of the post..."
          rows={3}
          className={`${inputClasses} resize-y`}
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm text-text-secondary mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="AI, automation, leadership"
          className={inputClasses}
        />
        {parseTags().length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {parseTags().map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm text-text-secondary mb-2">
          Cover Image
        </label>
        <ImageUploader
          onUpload={(url) => setCoverImage(url || null)}
          currentImage={coverImage}
        />
      </div>

      {/* Content Editor */}
      <div>
        <label className="block text-sm text-text-secondary mb-2">
          Content
        </label>
        <PostEditor
          content={content}
          onChange={setContent}
          onImageUpload={handleImageUpload}
        />
      </div>

      {/* SEO Section */}
      <div className="border-t border-border-default pt-8">
        <h3 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-6">
          SEO / Meta
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Meta Title (optional)
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Custom meta title (defaults to post title)"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Meta Description (optional)
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Custom meta description (defaults to excerpt)"
              rows={2}
              className={`${inputClasses} resize-y`}
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {saveError && (
        <p className="text-sm text-red-400">{saveError}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-border-default pt-8">
        <button
          type="button"
          onClick={() => handleSave("draft")}
          disabled={saving}
          className="px-6 py-2.5 bg-bg-secondary border border-border-default text-text-primary text-sm font-medium rounded-lg hover:border-text-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save as Draft"}
        </button>
        <button
          type="button"
          onClick={() => handleSave("published")}
          disabled={saving}
          className="px-6 py-2.5 bg-accent-cyan text-[#0a0a0f] text-sm font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
