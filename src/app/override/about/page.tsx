"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";

export default function OverrideAboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
            <Reveal>
              <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-xl border border-[rgba(196,153,59,0.2)]">
                <Image
                  src="/images/portrait.png"
                  alt="Loren Cossette"
                  fill
                  className="object-cover"
                  sizes="280px"
                  priority
                />
              </div>
            </Reveal>

            <div>
              <Reveal delay={0.1}>
                <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
                  About the Author
                </p>
                <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-2">
                  Loren T. Cossette
                </h1>
                <p className="font-sans text-sm text-[#999] mb-6">
                  PhD Candidate &middot; AI Strategist &middot; Change Architect
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="font-serif text-lg text-[#ccc] leading-relaxed mb-4">
                  As the sole AI automation engineer for Multnomah County, Loren owns the full
                  lifecycle &mdash; from problem discovery and stakeholder alignment through
                  architecture, code, deployment, and change management.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="font-serif text-lg text-[#ccc] leading-relaxed mb-4">
                  OVERRIDE draws on his unique intersection of military strategic leadership
                  (20 years, E-9 / top 1%), doctoral research in AI-augmented organizational
                  change, and hands-on experience deploying AI systems in environments where
                  nobody asked for them.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="font-serif text-lg text-[#ccc] leading-relaxed">
                  He teaches AI strategy at UT Austin and Johns Hopkins, publishes peer-reviewed
                  AI research, and builds production agentic systems, RAG pipelines, and
                  serverless infrastructure.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-[#F8F7F4] py-20">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              Credentials
            </p>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-10">
              Research & Practice
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Research Focus",
                items: [
                  "AI-augmented organizational change in resistant environments",
                  "Agentic AI systems for government and enterprise",
                  "NLP, deep learning, and prompt engineering methodology",
                ],
              },
              {
                label: "Practice Areas",
                items: [
                  "Production agentic systems and RAG pipelines",
                  "AI governance frameworks and compliance automation",
                  "Stakeholder alignment and change management",
                  "Executive AI strategy and training",
                ],
              },
              {
                label: "Academic",
                items: [
                  "PhD Candidate — AI & Organizational Change",
                  "MS Strategic Communication",
                  "MBA",
                  "Adjunct Instructor, UT Austin & Johns Hopkins",
                ],
              },
              {
                label: "Certifications",
                items: [
                  "Prosci Change Management Certified",
                  "SHRM-SCP",
                  "20-Year Military Career — E-9 (Top 1%)",
                ],
              },
            ].map((group, i) => (
              <Reveal key={group.label} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-[#e5e3de] p-6 h-full">
                  <h3 className="font-sans text-xs tracking-[2px] uppercase text-[#C4993B] font-semibold mb-4">
                    {group.label}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="font-serif text-sm text-[#1A1A1A]/80 leading-relaxed flex gap-2"
                      >
                        <span className="text-[#C4993B] shrink-0">&bull;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking CTA */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="site-container text-center">
          <Reveal>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-4">
              Speaking & Consulting Inquiries
            </h2>
            <p className="font-serif text-base text-[#999] mb-8 max-w-lg mx-auto">
              Available for keynotes, workshops, podcast interviews, and strategic consulting
              on AI transformation in resistant environments.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded hover:bg-[#d4a940] transition-colors"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
