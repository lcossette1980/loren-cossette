"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, FileText, MessageSquare, Clock, Target } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/animations/Reveal";
import { bookInfo, stats, frameworks, features, personas } from "@/data/override";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  BookOpen,
  FileText,
  MessageSquare,
  Clock,
  Target,
};

/* ── Chess piece SVGs ── */
function ChessKnight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="32" height="32">
      <path d="M19 22H5v-2h14v2m-3-4H8l-1-2 5-4-3-2 1-6h2l1 2 3-1v3l-3 1 3 4-1 5z" />
    </svg>
  );
}

function ChessBishop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="32" height="32">
      <path d="M19 22H5v-2h14v2m-3-4H8l1-4-3-4 2-2 4 3 4-7h2l-4 8 3 3-1 3z" />
    </svg>
  );
}

function ChessRook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="32" height="32">
      <path d="M5 20h14v2H5v-2m2-2h10l1-8H6l1 8m1-14h2v3h4V4h2v3h2l-1 3H7L6 7h2V4z" />
    </svg>
  );
}

const chessPieces: Record<string, React.ComponentType<{ className?: string }>> = {
  knight: ChessKnight,
  bishop: ChessBishop,
  rook: ChessRook,
};

export default function OverrideLandingPage() {
  return (
    <div>
      {/* ── Section 1: Hero ── */}
      <section className="relative min-h-[90vh] flex items-center bg-[#1A1A1A] overflow-hidden">
        {/* Gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(196,153,59,0.08),transparent_70%)]" />

        <div className="site-container relative z-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Book cover */}
            <Reveal direction="left">
              <div className="flex justify-center">
                <motion.div
                  className="relative w-[280px] md:w-[320px] aspect-[2/3] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(196,153,59,0.2)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/override-cover.jpg"
                    alt="OVERRIDE — The AI Transformation Playbook for Hostile Territory by Loren T. Cossette"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 280px, 320px"
                    priority
                  />
                </motion.div>
              </div>
            </Reveal>

            {/* Copy */}
            <div>
              <Reveal delay={0.1}>
                <h1 className="font-sans text-5xl md:text-6xl font-black tracking-[-1px] text-white mb-4">
                  <span className="text-[#C4993B]">OVERRIDE</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-serif text-xl md:text-2xl text-[#ccc] leading-relaxed mb-6 italic">
                  {bookInfo.heroLine}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="font-sans text-sm tracking-[2px] uppercase text-[#C4993B]/80 mb-8">
                  {bookInfo.traditions}
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={bookInfo.buyUrl}
                    className="inline-flex items-center px-8 py-3.5 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded hover:bg-[#d4a940] transition-colors"
                  >
                    Buy Now
                  </Link>
                  <Link
                    href="/override/tools"
                    className="inline-flex items-center px-8 py-3.5 border border-[#C4993B]/40 text-[#C4993B] font-bold text-sm tracking-wide rounded hover:border-[#C4993B] hover:bg-[#C4993B]/10 transition-colors"
                  >
                    Free Tools
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: The Problem ── */}
      <section className="bg-[#F8F7F4] py-24">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              The Reality
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 max-w-2xl">
              80% of AI projects fail. Not because the technology doesn&apos;t work.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.15}>
                <div className="bg-[#1A1A1A] rounded-xl p-8 text-center">
                  <div className="text-[48px] md:text-[56px] font-black text-[#C4993B] tabular-nums leading-none mb-3">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="font-serif text-sm text-[#999] leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="font-serif text-lg text-[#1A1A1A]/80 leading-relaxed max-w-[680px] mx-auto text-center mt-12">
              The problem isn&apos;t your technology, your budget, or your timeline. The problem
              is that the people who should want AI transformation are the same people who
              will lose power, comfort, or relevance when it succeeds.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Section 3: The Playbook ── */}
      <section className="bg-[#1A1A1A] py-24">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              The Playbook
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-4">
              {bookInfo.traditions}
            </h2>
            <p className="font-serif text-lg text-[#999] leading-relaxed max-w-2xl mb-12">
              OVERRIDE draws on four strategic traditions to give you a methodology that
              actually works when the organization is fighting you every step of the way.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworks.map((fw, i) => (
              <Reveal key={fw.part} delay={i * 0.1}>
                <div className="bg-[#2D2D2D] rounded-xl border-t-[3px] border-[#C4993B] p-6 h-full hover:translate-y-[-2px] hover:border-t-[5px] hover:shadow-[0_8px_30px_rgba(196,153,59,0.1)] transition-all duration-300">
                  <span className="font-sans text-[11px] tracking-[2px] uppercase text-[#C4993B] font-semibold">
                    {fw.part}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-white mt-2 mb-3">
                    {fw.title}
                  </h3>
                  <p className="font-serif text-sm text-[#999] leading-relaxed">
                    {fw.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <Link
                href={bookInfo.buyUrl}
                className="inline-flex items-center px-8 py-3.5 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded hover:bg-[#d4a940] transition-colors"
              >
                Buy Now
              </Link>
              <Link
                href="/override/tools"
                className="inline-flex items-center px-8 py-3.5 border border-[#C4993B]/40 text-[#C4993B] font-bold text-sm tracking-wide rounded hover:border-[#C4993B] hover:bg-[#C4993B]/10 transition-colors"
              >
                Explore Free Tools
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section 4: What's Inside ── */}
      <section className="bg-[#F8F7F4] py-24">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              What&apos;s Inside
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-12">
              {bookInfo.pageCount} Pages of Operational Strategy
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = iconMap[feat.icon];
              return (
                <Reveal key={feat.heading} delay={i * 0.08}>
                  <div className="bg-white rounded-xl p-6 border border-[#e5e3de] hover:border-l-[3px] hover:border-l-[#C4993B] hover:shadow-md transition-all duration-300 h-full">
                    {Icon && <Icon size={24} className="text-[#C4993B] mb-4" />}
                    <h3 className="font-sans text-base font-bold text-[#1A1A1A] mb-2">
                      {feat.heading}
                    </h3>
                    <p className="font-serif text-sm text-[#666] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 5: Social Proof (placeholder) ── */}
      <section className="bg-[#1A1A1A] py-24">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              What Readers Are Saying
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { quote: "Finally, a methodology that doesn't pretend everyone wants to change.", name: "Coming Soon", title: "Reader Review" },
              { quote: "OVERRIDE gave me the language and frameworks to survive my own success.", name: "Coming Soon", title: "Reader Review" },
              { quote: "The templates alone are worth ten times the price of the book.", name: "Coming Soon", title: "Reader Review" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#2D2D2D] rounded-xl p-6 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-[#C4993B] text-sm">&#9733;</span>
                    ))}
                  </div>
                  <p className="font-serif text-sm text-[#ccc] leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-sans text-xs font-bold text-white">{t.name}</p>
                    <p className="font-sans text-[10px] text-[#666]">{t.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Who It's For ── */}
      <section className="bg-[#F8F7F4] py-24">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              Who This Book Is For
            </p>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-12 max-w-2xl">
              If You&apos;ve Ever Thought: &ldquo;Why Won&apos;t They Just Let Me Do My Job?&rdquo;
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personas.map((p, i) => {
              const ChessPiece = chessPieces[p.icon];
              return (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="bg-white rounded-xl border-l-[3px] border-[#C4993B] p-6 h-full">
                    {ChessPiece && <ChessPiece className="text-[#C4993B] mb-4" />}
                    <h3 className="font-sans text-base font-bold text-[#1A1A1A] mb-3">
                      {p.title}
                    </h3>
                    <p className="font-serif text-sm text-[#666] leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 7: Final CTA ── */}
      <section className="relative bg-[#1A1A1A] py-24 overflow-hidden">
        {/* Chess knight watermark */}
        <div className="absolute right-8 bottom-8 opacity-[0.05]">
          <ChessKnight className="text-[#C4993B] w-[120px] h-[120px]" />
        </div>

        <div className="site-container relative z-10 text-center">
          <Reveal>
            <h2 className="font-sans text-4xl md:text-5xl font-black text-white mb-4">
              Stop Asking for Permission.
            </h2>
            <p className="font-serif text-lg text-[#999] mb-10">
              OVERRIDE is available now in paperback and ebook.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={bookInfo.buyUrl}
                className="inline-flex items-center px-10 py-4 bg-[#C4993B] text-[#1A1A1A] font-bold text-base tracking-wide rounded hover:bg-[#d4a940] transition-colors"
              >
                Get the Book
              </Link>
              <Link
                href="/override/tools"
                className="inline-flex items-center px-10 py-4 border border-[#C4993B]/40 text-[#C4993B] font-bold text-base tracking-wide rounded hover:border-[#C4993B] hover:bg-[#C4993B]/10 transition-colors"
              >
                Download Free Templates
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
