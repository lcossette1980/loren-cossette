"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { navItems, secondaryNavItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();
  const hasAnimated = useRef(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hasAnimated.current = true;
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSecondaryActive = secondaryNavItems.some(
    (item) => pathname.startsWith(item.href)
  );

  const allItems = [...navItems, ...secondaryNavItems];

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[rgba(10,10,15,0.85)] backdrop-blur-2xl border-b border-border-default shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-border-subtle"
        )}
        initial={hasAnimated.current ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="site-container h-16 flex items-center justify-between pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
          <Link
            href="/"
            className="font-mono text-sm tracking-[3px] text-accent-cyan font-medium hover:text-white transition-colors"
          >
            LC
          </Link>

          {/* Desktop nav */}
          <LayoutGroup>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const isDemo = item.href === "/demo";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => analytics.navClick(item.href)}
                    className={cn(
                      "relative px-4 py-2 font-mono text-[11px] tracking-[1px] uppercase transition-colors duration-300",
                      isDemo
                        ? isActive
                          ? "text-accent-warm"
                          : "text-accent-warm/80 hover:text-accent-warm"
                        : isActive
                          ? "text-accent-cyan"
                          : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {isDemo && (
                      <Sparkles
                        size={10}
                        className="inline-block mr-1 -mt-0.5 text-accent-warm/60"
                      />
                    )}
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={cn(
                          "absolute bottom-0 left-2 right-2 h-px",
                          isDemo
                            ? "bg-accent-warm shadow-[0_0_8px_rgba(226,184,84,0.5)]"
                            : "bg-accent-cyan shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                        )}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* More dropdown */}
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={cn(
                    "relative px-4 py-2 font-mono text-[11px] tracking-[1px] uppercase transition-colors duration-300 flex items-center gap-1",
                    isSecondaryActive
                      ? "text-accent-cyan"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  More
                  <ChevronDown
                    size={12}
                    className={cn(
                      "transition-transform duration-200",
                      moreOpen && "rotate-180"
                    )}
                  />
                  {isSecondaryActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-px bg-accent-cyan shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full right-0 mt-2 w-44 bg-[rgba(13,17,23,0.97)] backdrop-blur-2xl border border-border-default rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                      {secondaryNavItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setMoreOpen(false);
                              analytics.navClick(item.href);
                            }}
                            className={cn(
                              "block px-4 py-3 font-mono text-[11px] tracking-[1px] uppercase transition-colors",
                              isActive
                                ? "text-accent-cyan bg-accent-cyan/[0.06]"
                                : "text-text-secondary hover:text-text-primary hover:bg-[rgba(255,255,255,0.03)]"
                            )}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </LayoutGroup>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-accent-cyan transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(10,10,15,0.98)] backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {allItems.map((item, i) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const isDemo = item.href === "/demo";
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "font-mono text-lg tracking-[3px] uppercase transition-colors",
                      isDemo
                        ? isActive
                          ? "text-accent-warm"
                          : "text-accent-warm/80"
                        : isActive
                          ? "text-accent-cyan"
                          : "text-text-secondary"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {isDemo && (
                      <Sparkles
                        size={14}
                        className="inline-block mr-1.5 -mt-0.5 text-accent-warm/60"
                      />
                    )}
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
