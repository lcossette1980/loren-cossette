-- MANUAL STEPS in Supabase Dashboard:
-- 1. Go to Storage > Create bucket "blog-images"
-- 2. Set to PUBLIC
-- 3. Add policy: allow public SELECT on objects
-- 4. Add policy: allow authenticated INSERT/UPDATE/DELETE (or use service role in API)

-- Blog posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  cover_image text,
  tags text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  reading_time int NOT NULL DEFAULT 0,
  meta_title text,
  meta_description text
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Index for public queries
CREATE INDEX idx_blog_posts_status_published ON blog_posts (status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Service role has full access (used by API routes)
CREATE POLICY "Service role has full access"
  ON blog_posts FOR ALL
  USING (true)
  WITH CHECK (true);
