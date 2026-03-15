import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getSupabase } from "@/lib/supabase";

export const alt = "Blog — Loren Cossette";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await getSupabase()
    .from("blog_posts")
    .select("title, tags, cover_image")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return new Response("Not found", { status: 404 });

  const logoBuffer = await readFile(
    join(process.cwd(), "public/images/logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  const tags = (post.tags ?? []) as string[];
  const hasCover = !!post.cover_image;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          background: hasCover
            ? "#0a0a0f"
            : "linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 40%, #111122 100%)",
          padding: "60px 70px",
        }}
      >
        {/* Cover image background */}
        {hasCover && (
          <img
            src={post.cover_image}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Dark gradient overlay for readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background: hasCover
              ? "linear-gradient(180deg, rgba(10,10,15,0.35) 0%, rgba(10,10,15,0.55) 40%, rgba(10,10,15,0.92) 100%)"
              : "transparent",
          }}
        />

        {/* Grid overlay (subtle, only without cover) */}
        {!hasCover && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              opacity: 0.04,
              backgroundImage:
                "linear-gradient(rgba(34,231,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,231,240,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        )}

        {/* Glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: hasCover
              ? "radial-gradient(circle, rgba(34,231,240,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(34,231,240,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Blog label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "#e2b854",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#e2b854",
                letterSpacing: "4px",
                textTransform: "uppercase" as const,
                fontFamily: "monospace",
              }}
            >
              Blog
            </span>
          </div>

          {/* Post title */}
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#f0f0f5",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-1px",
              maxWidth: "950px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
              textShadow: hasCover ? "0 2px 12px rgba(0,0,0,0.6)" : "none",
            }}
          >
            {post.title}
          </h1>
        </div>

        {/* Bottom section: tags + logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Tags */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {tags.slice(0, 4).map((tag: string) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  border: "1px solid rgba(34,231,240,0.25)",
                  borderRadius: "8px",
                  background: hasCover
                    ? "rgba(10,10,15,0.6)"
                    : "rgba(34,231,240,0.06)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#22e7f0",
                  fontFamily: "monospace",
                  letterSpacing: "0.5px",
                  backdropFilter: hasCover ? "blur(8px)" : "none",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Logo + name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(240,240,245,0.5)",
                fontFamily: "monospace",
                textShadow: hasCover ? "0 1px 4px rgba(0,0,0,0.5)" : "none",
              }}
            >
              lorencossette.com
            </span>
            <img
              src={logoSrc}
              alt="LC"
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
