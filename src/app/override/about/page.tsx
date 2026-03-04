"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Mic,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

const credentialIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Research Focus": FlaskConical,
  "Practice Areas": Briefcase,
  "Academic": GraduationCap,
  "Certifications": ShieldCheck,
};

const credentials = [
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
      "Ph.D. — Leadership & Program Evaluation (In Progress)",
      "M.S. — Organizational Development",
      "M.A. — Psychology",
      "AI for Leaders Program Mentor, UT Austin & Johns Hopkins",
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
];

export default function OverrideAboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1A1A1A] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(196,153,59,0.06),transparent_60%)]" />
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-14 items-start">
            <Reveal>
              <motion.div
                className="relative aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -inset-2 bg-[radial-gradient(ellipse,rgba(196,153,59,0.15),transparent_70%)] blur-lg" />
                <Image
                  src="/images/portrait.png"
                  alt="Loren Cossette"
                  fill
                  className="object-cover rounded-2xl relative z-10 border border-[rgba(196,153,59,0.15)]"
                  sizes="300px"
                  priority
                />
              </motion.div>
            </Reveal>

            <div>
              <Reveal delay={0.1}>
                <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
                  About the Author
                </p>
                <h1 className="font-sans text-4xl md:text-5xl font-black text-white mb-3 tracking-[-1px]">
                  Loren T. Cossette
                </h1>
                <p className="font-sans text-sm text-[#888] mb-8 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4993B]" />
                  PhD Candidate &middot; AI Strategist &middot; Change Architect
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="font-serif text-lg text-[#ccc] leading-relaxed mb-5">
                  As the sole AI automation engineer for Multnomah County, Loren owns the full
                  lifecycle &mdash; from problem discovery and stakeholder alignment through
                  architecture, code, deployment, and change management.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="font-serif text-lg text-[#ccc] leading-relaxed mb-5">
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

      <div className="h-px bg-gradient-to-r from-transparent via-[#C4993B]/30 to-transparent" />

      {/* Credentials */}
      <section className="bg-[#F8F7F4] py-24">
        <div className="site-container">
          <Reveal>
            <p className="font-sans text-[11px] tracking-[3px] uppercase text-[#C4993B] font-semibold mb-3">
              Credentials
            </p>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-12">
              Research & Practice
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((group, i) => {
              const Icon = credentialIcons[group.label];
              return (
                <Reveal key={group.label} delay={i * 0.1}>
                  <motion.div
                    className="bg-white rounded-2xl border border-[#e5e3de] p-7 h-full relative overflow-hidden group"
                    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-[#C4993B] transition-colors duration-300 rounded-l-2xl" />
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                        {Icon && <Icon size={16} className="text-[#C4993B]" />}
                      </div>
                      <h3 className="font-sans text-xs tracking-[2px] uppercase text-[#C4993B] font-semibold">
                        {group.label}
                      </h3>
                    </div>
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="font-serif text-sm text-[#1A1A1A]/75 leading-relaxed flex gap-3"
                        >
                          <span className="text-[#C4993B] shrink-0 mt-1.5 w-1 h-1 rounded-full bg-[#C4993B]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Speaking CTA */}
      <section className="bg-[#1A1A1A] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(196,153,59,0.05),transparent_60%)]" />
        <div className="site-container text-center relative z-10">
          <Reveal>
            <div className="w-14 h-14 rounded-2xl bg-[#2D2D2D] flex items-center justify-center mx-auto mb-6">
              <Mic size={24} className="text-[#C4993B]" />
            </div>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-white mb-4">
              Speaking & Consulting Inquiries
            </h2>
            <p className="font-serif text-base text-[#888] mb-10 max-w-lg mx-auto leading-relaxed">
              Available for keynotes, workshops, podcast interviews, and strategic consulting
              on AI transformation in resistant environments.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#C4993B] text-[#1A1A1A] font-bold text-sm tracking-wide rounded-lg hover:bg-[#d4a940] hover:shadow-[0_0_40px_rgba(196,153,59,0.3)] transition-all duration-300"
            >
              Get in Touch
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
