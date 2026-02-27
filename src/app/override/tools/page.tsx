"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Download,
  X,
  Eye,
  FileDown,
  KeyRound,
  CloudDownload,
  ArrowRight,
  Filter,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { templates, bookInfo } from "@/data/override";
import type { OverrideTemplate } from "@/types";

type FilterType = "all" | "keystone" | "digital";

export default function OverrideToolsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [preview, setPreview] = useState<OverrideTemplate | null>(null);

  const filtered = filter === "all" ? templates : templates.filter((t) => t.category === filter);

  const filters: { label: string; value: FilterType; icon: React.ReactNode; count: number }[] = [
    { label: "All Templates", value: "all", icon: <Filter size={13} />, count: templates.length },
    { label: "Keystone", value: "keystone", icon: <KeyRound size={13} />, count: templates.filter((t) => t.category === "keystone").length },
    { label: "Digital Downloads", value: "digital", icon: <CloudDownload size={13} />, count: templates.filter((t) => t.category === "digital").length },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1A1A1A] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(196,153,59,0.06),transparent_60%)]" />
        <div className="site-container text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C4993B]/20 text-[#C4993B] text-[10px] font-bold tracking-[2px] uppercase mb-6">
              <Sparkles size={12} /> Free Resources
            </div>
            <h1 className="font-sans text-4xl md:text-5xl font-black text-white mb-5 tracking-[-1px]">
              Your AI Transformation Toolkit
            </h1>
            <p className="font-serif text-lg text-[#888] max-w-xl mx-auto leading-relaxed">
              17 field-ready templates from OVERRIDE. Each one battle-tested
              in hostile environments. Download free.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C4993B]/30 to-transparent" />

      {/* Filter + Grid */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="site-container">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-300 ${
                  filter === f.value
                    ? "bg-[#1A1A1A] text-[#C4993B] shadow-lg"
                    : "bg-white text-[#666] border border-[#e5e3de] hover:border-[#C4993B]/40 hover:text-[#C4993B]"
                }`}
              >
                {f.icon}
                {f.label}
                <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded ${
                  filter === f.value ? "bg-[#C4993B]/20" : "bg-[#eee]"
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((t) => (
                <motion.div
                  key={t.number}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="bg-white rounded-2xl border border-[#e5e3de] overflow-hidden group h-full flex flex-col relative"
                    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Gold accent on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-[#C4993B] transition-colors duration-300 rounded-l-2xl" />

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pt-6 pb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] text-[#C4993B] flex items-center justify-center text-xs font-bold">
                        {String(t.number).padStart(2, "0")}
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
                          t.category === "keystone"
                            ? "bg-[#C4993B]/10 text-[#C4993B]"
                            : "bg-[#6B8E9B]/10 text-[#6B8E9B]"
                        }`}
                      >
                        {t.category === "keystone" ? <KeyRound size={10} /> : <CloudDownload size={10} />}
                        {t.category === "keystone" ? "Keystone" : "Digital Download"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-6 flex-1 flex flex-col">
                      <h3 className="font-sans text-base font-bold text-[#1A1A1A] mb-1">
                        {t.name}
                      </h3>
                      {t.chapter && (
                        <p className="font-sans text-[10px] text-[#999] mb-3 tracking-wide">
                          {t.chapter}
                        </p>
                      )}
                      <p className="font-serif text-sm text-[#666] leading-relaxed mb-5 flex-1">
                        {t.description}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreview(t)}
                          className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[#666] border border-[#e5e3de] rounded-lg hover:border-[#C4993B]/40 hover:text-[#C4993B] transition-all duration-300"
                        >
                          <Eye size={13} /> Preview
                        </button>
                        <a
                          href={t.pdfPath}
                          download
                          className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[#1A1A1A] bg-[#C4993B] rounded-lg hover:bg-[#d4a940] transition-all duration-300"
                        >
                          <FileDown size={13} /> Download
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Book upsell */}
      <section className="bg-[#1A1A1A] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(196,153,59,0.06),transparent_60%)]" />
        <div className="site-container text-center relative z-10">
          <Reveal>
            <div className="w-12 h-px bg-[#C4993B]/40 mx-auto mb-8" />
            <h2 className="font-sans text-2xl md:text-4xl font-black text-white mb-5 tracking-[-1px]">
              Templates Are Powerful.<br />
              <span className="text-[#C4993B]">The Methodology Makes Them Unstoppable.</span>
            </h2>
            <p className="font-serif text-base text-[#888] mb-10 max-w-lg mx-auto leading-relaxed">
              These 17 templates are extracted from a {bookInfo.pageCount}-page operational
              playbook. Get the full methodology, scripts, and strategic frameworks.
            </p>
            <Link
              href={bookInfo.buyUrl}
              className="group inline-flex items-center gap-2 px-10 py-4 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded-lg hover:bg-[#d4a940] hover:shadow-[0_0_40px_rgba(196,153,59,0.3)] transition-all duration-300"
            >
              Get the Full Playbook
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setPreview(null)}
            />

            <motion.div
              className="relative bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#f5f5f5] flex items-center justify-center text-[#999] hover:text-[#1A1A1A] hover:bg-[#eee] transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] text-[#C4993B] flex items-center justify-center text-sm font-bold">
                  {String(preview.number).padStart(2, "0")}
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
                    preview.category === "keystone"
                      ? "bg-[#C4993B]/10 text-[#C4993B]"
                      : "bg-[#6B8E9B]/10 text-[#6B8E9B]"
                  }`}
                >
                  {preview.category === "keystone" ? <KeyRound size={10} /> : <CloudDownload size={10} />}
                  {preview.category === "keystone" ? "Keystone Template" : "Digital Download"}
                </span>
              </div>

              <h3 className="font-sans text-2xl font-bold text-[#1A1A1A] mb-2">
                {preview.name}
              </h3>
              {preview.chapter && (
                <p className="font-sans text-xs text-[#999] mb-5 tracking-wide">{preview.chapter}</p>
              )}

              <div className="h-px bg-[#eee] mb-5" />

              <p className="font-serif text-[15px] text-[#555] leading-relaxed mb-8">
                {preview.description}
              </p>

              <a
                href={preview.pdfPath}
                download
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm rounded-lg hover:bg-[#d4a940] transition-all duration-300"
              >
                <FileDown size={16} /> Download PDF
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
