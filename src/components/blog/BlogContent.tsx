"use client";

import sanitizeHtml from "sanitize-html";

interface BlogContentProps {
  content: string;
}

const allowedTags = [
  "h2", "h3", "h4", "p", "a", "strong", "em",
  "ul", "ol", "li", "blockquote", "pre", "code",
  "img", "br", "hr", "figure", "figcaption", "span",
];

const allowedAttributes: Record<string, string[]> = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "class", "loading"],
  code: ["class"],
  pre: ["class"],
  span: ["class"],
  figure: ["class"],
  figcaption: ["class"],
};

// Only allow images from our own Supabase bucket or relative paths
const ALLOWED_IMG_HOSTS = ["supabase.co", "lorencossette.com"];

export function BlogContent({ content }: BlogContentProps) {
  const clean = sanitizeHtml(content, {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ["https", "mailto"],
    // Force all links to open safely
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: "noopener noreferrer",
          target: attribs.target || "_blank",
        },
      }),
      img: (tagName, attribs) => {
        // Block images from untrusted sources
        const src = attribs.src || "";
        try {
          if (src.startsWith("/")) {
            // Relative paths are fine
            return { tagName, attribs: { ...attribs, loading: "lazy" } };
          }
          const url = new URL(src);
          const isAllowed = ALLOWED_IMG_HOSTS.some((h) =>
            url.hostname.endsWith(h)
          );
          if (!isAllowed) {
            return { tagName: "", attribs: {} }; // Strip the tag
          }
        } catch {
          return { tagName: "", attribs: {} }; // Invalid URL — strip
        }
        return { tagName, attribs: { ...attribs, loading: "lazy" } };
      },
    },
  });

  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
