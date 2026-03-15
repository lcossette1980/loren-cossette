export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  reading_time: number;
  meta_title: string | null;
  meta_description: string | null;
}

export type BlogPostCard = Pick<BlogPost, "id" | "title" | "slug" | "excerpt" | "cover_image" | "tags" | "status" | "published_at" | "reading_time">;

export interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  status: "draft" | "published";
  meta_title: string;
  meta_description: string;
}
