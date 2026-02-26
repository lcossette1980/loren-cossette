"use client";

import { Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { interviewTopics } from "@/data/override";

const mediaAssets = [
  { name: "Author Headshot (High-Res)", type: "PNG", path: "/images/headshot.png" },
  { name: "Author Portrait", type: "PNG", path: "/images/portrait.png" },
];

export default function OverrideMediaPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1A1A1A] py-16">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              Media & Speaking
            </p>
            <h1 className="font-sans text-3xl md:text-4xl font-bold text-white mb-4">
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

      {/* Interview Topics */}
      <section className="bg-[#F8F7F4] py-20">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              Interview Topics
            </p>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8">
              Suggested Discussion Topics
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewTopics.map((topic, i) => (
              <Reveal key={topic} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-[#e5e3de] p-5 flex gap-4 items-start">
                  <span className="font-sans text-xs font-bold text-[#C4993B] bg-[#C4993B]/10 w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="font-serif text-sm text-[#1A1A1A]/80 leading-relaxed">
                    {topic}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Assets */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              Press Assets
            </p>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-8">
              Downloadable Resources
            </h2>
          </Reveal>

          <div className="space-y-3">
            {mediaAssets.map((asset, i) => (
              <Reveal key={asset.name} delay={i * 0.05}>
                <div className="flex items-center justify-between bg-[#2D2D2D] rounded-xl p-5 border border-[rgba(196,153,59,0.1)]">
                  <div>
                    <p className="font-sans text-sm font-bold text-white">{asset.name}</p>
                    <p className="font-sans text-[10px] text-[#666] uppercase tracking-wide mt-1">
                      {asset.type}
                    </p>
                  </div>
                  <a
                    href={asset.path}
                    download
                    className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-[#C4993B] border border-[#C4993B]/30 rounded hover:bg-[#C4993B]/10 transition-colors"
                  >
                    <Download size={14} /> Download
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Media */}
      <section className="bg-[#F8F7F4] py-20">
        <div className="site-container text-center">
          <Reveal>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
              Media Inquiries
            </h2>
            <p className="font-serif text-base text-[#666] mb-8 max-w-lg mx-auto">
              For interview requests, speaking engagements, or press inquiries, please reach
              out through the contact page.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded hover:bg-[#d4a940] transition-colors"
            >
              Contact for Media <ExternalLink size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
