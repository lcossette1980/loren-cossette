"use client";

import { useState } from "react";
import { Linkedin, Copy, Check, ExternalLink } from "lucide-react";

const SITE_URL = "https://www.lorencossette.com";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const postUrl = `${SITE_URL}/blog/${slug}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — silently fail
    }
  };

  const buttonClass =
    "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono border border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted transition-all";

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        <ExternalLink size={14} />
        Share on X
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        <Linkedin size={14} />
        LinkedIn
      </a>
      <button onClick={handleCopy} className={buttonClass}>
        {copied ? <Check size={14} className="text-accent-cyan" /> : <Copy size={14} />}
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
