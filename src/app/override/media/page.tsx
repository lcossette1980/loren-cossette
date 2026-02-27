"use client";

import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  Mic2,
  MessageSquareQuote,
  FolderDown,
  Image as ImageIcon,
  FileText,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { interviewTopics } from "@/data/override";

const mediaAssets = [
  { name: "Author Headshot (High-Res)", type: "PNG", path: "/images/headshot.png", icon: ImageIcon },
  { name: "Author Portrait", type: "PNG", path: "/images/portrait.png", icon: ImageIcon },
  { name: "OVERRIDE Book Cover", type: "JPG", path: "/images/override-cover.jpg", icon: FileText },
];

export default function OverrideMediaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1A1A1A] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(196,153,59,0.06),transparent_60%)]" />
        <div className="site-container relative z-10">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#2D2D2D] flex items-center justify-center">
                <Mic2 size={18} className="text-[#C4993B]" />
              </div>
              <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold">
                Media & Speaking
              </p>
            </div>
            <h1 className="font-sans text-4xl md:text-5xl font-black text-white mb-5 tracking-[-1px]">
              Press Kit & Speaking Resources
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif text-lg text-[#ccc] leading-relaxed max-w-2xl">
              Loren T. Cossette is the author of OVERRIDE: The AI Transformation Playbook for
              Hostile Territory &mdash; the first AI transformation methodology built for
              organizations that actively resist change. He is available for keynotes, podcast
              interviews, workshops, and panel discussions.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C4993B]/30 to-transparent" />

      {/* Interview Topics */}
      <section className="bg-[#F8F7F4] py-24">
        <div className="site-container">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <MessageSquareQuote size={18} className="text-[#C4993B]" />
              <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold">
                Interview Topics
              </p>
            </div>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-10">
              Suggested Discussion Topics
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewTopics.map((topic, i) => (
              <Reveal key={topic} delay={i * 0.05}>
                <motion.div
                  className="bg-white rounded-xl border border-[#e5e3de] p-5 flex gap-4 items-start group relative overflow-hidden"
                  whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover:bg-[#C4993B] transition-colors duration-300" />
                  <span className="font-sans text-xs font-bold text-[#C4993B] bg-[#1A1A1A] w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-sm text-[#1A1A1A]/80 leading-relaxed">
                    {topic}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Assets */}
      <section className="bg-[#1A1A1A] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(196,153,59,0.04),transparent_60%)]" />
        <div className="site-container relative z-10">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <FolderDown size={18} className="text-[#C4993B]" />
              <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold">
                Press Assets
              </p>
            </div>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-10">
              Downloadable Resources
            </h2>
          </Reveal>

          <div className="space-y-3">
            {mediaAssets.map((asset, i) => {
              const AssetIcon = asset.icon;
              return (
                <Reveal key={asset.name} delay={i * 0.05}>
                  <motion.div
                    className="flex items-center justify-between bg-[#2D2D2D] rounded-xl p-6 border border-[rgba(196,153,59,0.08)] group"
                    whileHover={{ x: 4, borderColor: "rgba(196,153,59,0.2)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                        <AssetIcon size={16} className="text-[#C4993B]" />
                      </div>
                      <div>
                        <p className="font-sans text-sm font-bold text-white">{asset.name}</p>
                        <p className="font-sans text-[10px] text-[#666] uppercase tracking-wide mt-0.5">
                          {asset.type}
                        </p>
                      </div>
                    </div>
                    <a
                      href={asset.path}
                      download
                      className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wide text-[#1A1A1A] bg-[#C4993B] rounded-lg hover:bg-[#d4a940] transition-all duration-300"
                    >
                      <Download size={13} /> Download
                    </a>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact for Media */}
      <section className="bg-[#F8F7F4] py-24">
        <div className="site-container text-center">
          <Reveal>
            <div className="w-12 h-px bg-[#C4993B]/40 mx-auto mb-8" />
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
              Media Inquiries
            </h2>
            <p className="font-serif text-base text-[#666] mb-10 max-w-lg mx-auto leading-relaxed">
              For interview requests, speaking engagements, or press inquiries, please reach
              out through the contact page.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded-lg hover:bg-[#d4a940] hover:shadow-[0_0_40px_rgba(196,153,59,0.3)] transition-all duration-300"
            >
              Contact for Media
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
