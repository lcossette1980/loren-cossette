"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  Layers,
  ScrollText,
  MessageCircleWarning,
  Timer,
  Crosshair,
  Swords,
  Map,
  Hammer,
  Rocket,
  Building2,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/animations/Reveal";
import { bookInfo, stats, frameworks, features, personas } from "@/data/override";

/* ── Icon map for "What's Inside" feature cards ── */
const featureIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Layers,           // 15 Chapters
  ScrollText,       // 17 Templates
  MessageCircleWarning, // 11 Scripts
  Timer,            // 72-Hour Framework
  Swords,           // 4 Strategic Traditions
  Crosshair,        // Real-World Playbooks
};

/* ── Icons for the 4 framework parts ── */
const frameworkIcons = [Map, Hammer, Rocket, Building2];

/* ── Chess piece SVGs (refined) ── */
function ChessKnight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="currentColor" className={className} width="36" height="36">
      <g>
        <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" style={{fill:"currentColor",stroke:"currentColor"}} />
        <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" style={{fill:"currentColor",stroke:"currentColor"}} />
        <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" style={{fill:"#1A1A1A",stroke:"#1A1A1A"}} />
        <path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" style={{fill:"#1A1A1A",stroke:"#1A1A1A"}} />
      </g>
    </svg>
  );
}

function ChessBishop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="currentColor" className={className} width="36" height="36">
      <g style={{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5}}>
        <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
        <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
        <circle cx="22.5" cy="8" r="2.5" />
        <path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" style={{fill:"none",stroke:"#1A1A1A",strokeLinejoin:"miter"}} />
      </g>
    </svg>
  );
}

function ChessRook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" fill="currentColor" className={className} width="36" height="36">
      <g style={{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5}}>
        <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z" />
        <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z" />
        <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" />
        <path d="M 34,14 L 31,17 L 14,17 L 11,14" />
        <path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" />
        <path d="M 31,29.5 L 33,31.5 L 12,31.5 L 14,29.5" />
        <path d="M 14,17 L 31,17" style={{fill:"none",stroke:"#1A1A1A"}} />
        <rect x="14" y="17" width="17" height="12.5" style={{fill:"none",stroke:"#1A1A1A"}} />
      </g>
    </svg>
  );
}

const chessPieces: Record<string, React.ComponentType<{ className?: string }>> = {
  knight: ChessKnight,
  bishop: ChessBishop,
  rook: ChessRook,
};

export default function OverrideLandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div>
      {/* ── Section 1: Hero ── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center bg-[#1A1A1A] overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(196,153,59,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(196,153,59,0.04),transparent_50%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(196,153,59,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(196,153,59,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <motion.div className="site-container relative z-10 py-20" style={{ opacity: heroOpacity, y: heroY }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Book cover */}
            <Reveal direction="left">
              <div className="flex justify-center">
                <motion.div
                  className="relative w-[280px] md:w-[340px] aspect-[2/3] rounded-lg overflow-hidden"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.03, rotateY: 3 }}
                  style={{ perspective: 800 }}
                >
                  {/* Gold glow behind book */}
                  <div className="absolute -inset-4 bg-[radial-gradient(ellipse,rgba(196,153,59,0.2),transparent_70%)] blur-xl" />
                  <Image
                    src="/images/override-cover.jpg"
                    alt="OVERRIDE — The AI Transformation Playbook for Hostile Territory by Loren T. Cossette"
                    fill
                    className="object-cover rounded-lg relative z-10 shadow-[0_25px_80px_rgba(0,0,0,0.5),0_8px_30px_rgba(196,153,59,0.15)]"
                    sizes="(max-width: 768px) 280px, 340px"
                    priority
                  />
                </motion.div>
              </div>
            </Reveal>

            {/* Copy */}
            <div>
              <Reveal delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-[#C4993B] to-transparent" />
                  <span className="font-sans text-[10px] tracking-[4px] uppercase text-[#C4993B]/60 font-medium">
                    Now Available
                  </span>
                </div>
                <h1 className="font-sans text-5xl md:text-7xl font-black tracking-[-2px] text-white mb-5 leading-[0.95]">
                  <span className="text-[#C4993B]">OVERRIDE</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-serif text-xl md:text-2xl text-[#ccc] leading-relaxed mb-3 italic">
                  {bookInfo.heroLine}
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="font-serif text-base text-[#999]/80 leading-relaxed mb-8">
                  {bookInfo.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="font-sans text-xs tracking-[3px] uppercase text-[#C4993B]/70 mb-10 flex items-center gap-3">
                  <Swords size={14} className="text-[#C4993B]/50" />
                  {bookInfo.traditions}
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={bookInfo.buyUrl}
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded-lg hover:bg-[#d4a940] hover:shadow-[0_0_40px_rgba(196,153,59,0.3)] transition-all duration-300"
                  >
                    Buy Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/override/tools"
                    className="group inline-flex items-center gap-2 px-8 py-4 border border-[#C4993B]/30 text-[#C4993B] font-bold text-sm tracking-wide rounded-lg hover:border-[#C4993B]/60 hover:bg-[#C4993B]/5 transition-all duration-300"
                  >
                    <Sparkles size={14} />
                    Free Tools
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-[#C4993B]/40" />
        </motion.div>
      </section>

      {/* ── Gold divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C4993B]/30 to-transparent" />

      {/* ── Section 2: The Problem ── */}
      <section className="bg-[#F8F7F4] py-28">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              The Reality
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 max-w-2xl leading-tight">
              80% of AI projects fail.<br />
              <span className="text-[#C4993B]">Not because the technology doesn&apos;t work.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.15}>
                <motion.div
                  className="relative bg-[#1A1A1A] rounded-2xl p-10 text-center overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,rgba(196,153,59,0.08),transparent_70%)] transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="text-[56px] md:text-[64px] font-black text-[#C4993B] tabular-nums leading-none mb-4">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="font-serif text-sm text-[#888] leading-relaxed max-w-[200px] mx-auto">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="font-serif text-lg text-[#1A1A1A]/70 leading-relaxed max-w-[640px] mx-auto text-center mt-14">
              The problem isn&apos;t your technology, your budget, or your timeline. The problem
              is that the people who should want AI transformation are the same people who
              will lose power, comfort, or relevance when it succeeds.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Section 3: The Playbook ── */}
      <section className="bg-[#1A1A1A] py-28 relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(rgba(196,153,59,0.5) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="site-container relative z-10">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              The Playbook
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-4">
              {bookInfo.traditions}
            </h2>
            <p className="font-serif text-lg text-[#888] leading-relaxed max-w-2xl mb-14">
              OVERRIDE draws on four strategic traditions to give you a methodology that
              actually works when the organization is fighting you every step of the way.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworks.map((fw, i) => {
              const FwIcon = frameworkIcons[i];
              return (
                <Reveal key={fw.part} delay={i * 0.1}>
                  <motion.div
                    className="group bg-[#2D2D2D] rounded-2xl border-t-[3px] border-[#C4993B] p-7 h-full relative overflow-hidden"
                    whileHover={{ y: -6, borderTopWidth: "5px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
                      <FwIcon size={48} />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <FwIcon size={16} className="text-[#C4993B]" />
                      <span className="font-sans text-[10px] tracking-[2px] uppercase text-[#C4993B] font-semibold">
                        {fw.part}
                      </span>
                    </div>
                    <h3 className="font-sans text-lg font-bold text-white mb-3">
                      {fw.title}
                    </h3>
                    <p className="font-serif text-sm text-[#888] leading-relaxed">
                      {fw.description}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4 mt-14">
              <Link
                href={bookInfo.buyUrl}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded-lg hover:bg-[#d4a940] hover:shadow-[0_0_40px_rgba(196,153,59,0.3)] transition-all duration-300"
              >
                Buy Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/override/tools"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#C4993B]/30 text-[#C4993B] font-bold text-sm tracking-wide rounded-lg hover:border-[#C4993B]/60 hover:bg-[#C4993B]/5 transition-all duration-300"
              >
                <Sparkles size={14} /> Explore Free Tools
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C4993B]/30 to-transparent" />

      {/* ── Section 4: What's Inside ── */}
      <section className="bg-[#F8F7F4] py-28">
        <div className="site-container">
          <div className="text-center mb-14">
            <Reveal>
              <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
                What&apos;s Inside
              </p>
              <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#1A1A1A]">
                {bookInfo.pageCount} Pages of Operational Strategy
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = featureIcons[feat.icon];
              return (
                <Reveal key={feat.heading} delay={i * 0.08}>
                  <motion.div
                    className="group bg-white rounded-2xl p-7 border border-[#e5e3de] h-full relative overflow-hidden"
                    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Gold accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-[#C4993B] transition-colors duration-300 rounded-l-2xl" />
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#1A1A1A] flex items-center justify-center shrink-0">
                        {Icon && <Icon size={20} className="text-[#C4993B]" />}
                      </div>
                      <div>
                        <h3 className="font-sans text-base font-bold text-[#1A1A1A] mb-1.5">
                          {feat.heading}
                        </h3>
                        <p className="font-serif text-sm text-[#666] leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C4993B]/30 to-transparent" />

      {/* ── Section 6: Who It's For ── */}
      <section className="bg-[#F8F7F4] py-28">
        <div className="site-container">
          <div className="text-center mb-14">
            <Reveal>
              <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
                Who This Book Is For
              </p>
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#1A1A1A] max-w-2xl mx-auto">
                If You&apos;ve Ever Thought: &ldquo;Why Won&apos;t They Just Let Me Do My Job?&rdquo;
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((p, i) => {
              const ChessPiece = chessPieces[p.icon];
              return (
                <Reveal key={p.title} delay={i * 0.12}>
                  <motion.div
                    className="relative bg-white rounded-2xl border border-[#e5e3de] p-8 h-full overflow-hidden group"
                    whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Gold accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C4993B] rounded-l-2xl" />
                    {/* Watermark */}
                    <div className="absolute bottom-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                      {ChessPiece && <ChessPiece className="text-[#C4993B] w-[72px] h-[72px]" />}
                    </div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center mb-5">
                        {ChessPiece && <ChessPiece className="text-[#C4993B]" />}
                      </div>
                      <h3 className="font-sans text-lg font-bold text-[#1A1A1A] mb-3">
                        {p.title}
                      </h3>
                      <p className="font-serif text-sm text-[#666] leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 7: Final CTA ── */}
      <section className="relative bg-[#1A1A1A] py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(196,153,59,0.06),transparent_60%)]" />
        <div className="absolute right-12 bottom-12 opacity-[0.03]">
          <ChessKnight className="text-[#C4993B] w-[160px] h-[160px]" />
        </div>

        <div className="site-container relative z-10 text-center">
          <Reveal>
            <div className="w-12 h-px bg-[#C4993B]/40 mx-auto mb-8" />
            <h2 className="font-sans text-4xl md:text-6xl font-black text-white mb-5 tracking-[-1px]">
              Stop Asking for Permission.
            </h2>
            <p className="font-serif text-lg text-[#888] mb-12 max-w-md mx-auto">
              OVERRIDE is available now in paperback and ebook.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={bookInfo.buyUrl}
                className="group inline-flex items-center gap-2 px-12 py-5 bg-[#C4993B] text-[#1A1A1A] font-bold text-base tracking-wide rounded-lg hover:bg-[#d4a940] hover:shadow-[0_0_60px_rgba(196,153,59,0.3)] transition-all duration-300"
              >
                Get the Book
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/override/tools"
                className="inline-flex items-center gap-2 px-12 py-5 border border-[#C4993B]/30 text-[#C4993B] font-bold text-base tracking-wide rounded-lg hover:border-[#C4993B]/60 hover:bg-[#C4993B]/5 transition-all duration-300"
              >
                <Sparkles size={16} /> Download Free Templates
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
