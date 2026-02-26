"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Download, X, Eye } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { templates, bookInfo } from "@/data/override";
import type { OverrideTemplate } from "@/types";

type Filter = "all" | "keystone" | "digital";

export default function OverrideToolsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [preview, setPreview] = useState<OverrideTemplate | null>(null);

  const filtered = filter === "all" ? templates : templates.filter((t) => t.category === filter);

  const filters: { label: string; value: Filter }[] = [
    { label: "All Templates", value: "all" },
    { label: "Keystone", value: "keystone" },
    { label: "Digital Downloads", value: "digital" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1A1A1A] py-16">
        <div className="site-container text-center">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              Templates & Tools
            </p>
            <h1 className="font-sans text-3xl md:text-4xl font-bold text-white mb-4">
              Your AI Transformation Toolkit
            </h1>
            <p className="font-serif text-lg text-[#999] max-w-xl mx-auto">
              17 field-ready templates from OVERRIDE. Download free.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-[#F8F7F4] py-16">
        <div className="site-container">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-colors ${
                  filter === f.value
                    ? "bg-[#1A1A1A] text-[#C4993B]"
                    : "bg-white text-[#666] border border-[#e5e3de] hover:border-[#C4993B]/40"
                }`}
              >
                {f.label}
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
                  <div className="bg-white rounded-xl border border-[#e5e3de] overflow-hidden hover:shadow-lg hover:border-[#C4993B]/30 transition-all duration-300 group h-full flex flex-col">
                    {/* Header bar */}
                    <div className="flex items-center justify-between px-5 pt-5 pb-3">
                      <span className="w-8 h-8 rounded-full bg-[#1A1A1A] text-[#C4993B] flex items-center justify-center text-xs font-bold">
                        {String(t.number).padStart(2, "0")}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                          t.category === "keystone"
                            ? "bg-[#C4993B]/10 text-[#C4993B]"
                            : "bg-[#6B8E9B]/10 text-[#6B8E9B]"
                        }`}
                      >
                        {t.category === "keystone" ? "Keystone" : "Digital Download"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="px-5 pb-5 flex-1 flex flex-col">
                      <h3 className="font-sans text-sm font-bold text-[#1A1A1A] mb-1">
                        {t.name}
                      </h3>
                      {t.chapter && (
                        <p className="font-sans text-[10px] text-[#999] mb-3">
                          {t.chapter}
                        </p>
                      )}
                      <p className="font-serif text-xs text-[#666] leading-relaxed mb-4 flex-1">
                        {t.description}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreview(t)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#666] border border-[#e5e3de] rounded hover:border-[#C4993B]/40 hover:text-[#C4993B] transition-colors"
                        >
                          <Eye size={12} /> Preview
                        </button>
                        <a
                          href={t.pdfPath}
                          download
                          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#C4993B] border border-[#C4993B]/30 rounded hover:bg-[#C4993B]/10 transition-colors"
                        >
                          <Download size={12} /> PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Book upsell */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="site-container text-center">
          <Reveal>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-4">
              Templates Are Powerful.<br />
              The Methodology Makes Them Unstoppable.
            </h2>
            <p className="font-serif text-base text-[#999] mb-8 max-w-lg mx-auto">
              These 17 templates are extracted from a {bookInfo.pageCount}-page operational
              playbook. Get the full methodology, scripts, and strategic frameworks.
            </p>
            <Link
              href={bookInfo.buyUrl}
              className="inline-flex items-center px-8 py-3.5 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded hover:bg-[#d4a940] transition-colors"
            >
              Get the Full Playbook
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
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setPreview(null)}
            />

            {/* Modal */}
            <motion.div
              className="relative bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 text-[#999] hover:text-[#1A1A1A] transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#C4993B] flex items-center justify-center text-sm font-bold">
                  {String(preview.number).padStart(2, "0")}
                </span>
                <span
                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                    preview.category === "keystone"
                      ? "bg-[#C4993B]/10 text-[#C4993B]"
                      : "bg-[#6B8E9B]/10 text-[#6B8E9B]"
                  }`}
                >
                  {preview.category === "keystone" ? "Keystone Template" : "Digital Download"}
                </span>
              </div>

              <h3 className="font-sans text-xl font-bold text-[#1A1A1A] mb-2">
                {preview.name}
              </h3>
              {preview.chapter && (
                <p className="font-sans text-xs text-[#999] mb-4">{preview.chapter}</p>
              )}
              <p className="font-serif text-sm text-[#666] leading-relaxed mb-6">
                {preview.description}
              </p>

              <a
                href={preview.pdfPath}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm rounded hover:bg-[#d4a940] transition-colors"
              >
                <Download size={16} /> Download PDF
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
