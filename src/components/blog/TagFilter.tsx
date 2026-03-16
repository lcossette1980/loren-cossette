"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface TagFilterProps {
  tags: string[];
  activeTag: string | undefined;
  /** How many tags to show inline before collapsing into "More" */
  maxVisible?: number;
}

export function TagFilter({ tags, activeTag, maxVisible = 6 }: TagFilterProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const visibleTags = tags.slice(0, maxVisible);
  const overflowTags = tags.slice(maxVisible);
  const hasOverflow = overflowTags.length > 0;
  const activeInOverflow = activeTag
    ? overflowTags.includes(activeTag)
    : false;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const pillClass = (isActive: boolean) =>
    `px-4 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all border ${
      isActive
        ? "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan"
        : "bg-transparent border-border-default text-text-secondary hover:text-text-primary hover:border-text-muted"
    }`;

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {/* All button */}
      <Link href="/blog">
        <button className={pillClass(!activeTag)}> All</button>
      </Link>

      {/* Visible tags */}
      {visibleTags.map((t) => (
        <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`}>
          <button className={pillClass(activeTag === t)}>{t}</button>
        </Link>
      ))}

      {/* More dropdown */}
      {hasOverflow && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`${pillClass(activeInOverflow)} inline-flex items-center gap-1.5`}
          >
            {activeInOverflow ? activeTag : `+${overflowTags.length} more`}
            <ChevronDown
              size={12}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full right-0 mt-2 z-50 min-w-[180px] max-h-[280px] overflow-y-auto rounded-xl border border-border-default bg-bg-secondary/95 backdrop-blur-xl shadow-xl"
              >
                <div className="py-2">
                  {overflowTags.map((t) => (
                    <Link
                      key={t}
                      href={`/blog?tag=${encodeURIComponent(t)}`}
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className={`px-4 py-2.5 text-xs font-mono transition-colors ${
                          activeTag === t
                            ? "text-accent-cyan bg-accent-cyan/5"
                            : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50"
                        }`}
                      >
                        {t}
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
