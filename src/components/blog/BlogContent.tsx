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
  img: ["src", "alt", "class"],
  code: ["class"],
  pre: ["class"],
  span: ["class"],
  figure: ["class"],
  figcaption: ["class"],
};

export function BlogContent({ content }: BlogContentProps) {
  const clean = sanitizeHtml(content, {
    allowedTags,
    allowedAttributes,
  });

  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
