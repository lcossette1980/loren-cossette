"use client";

import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

const tags = [
  "Ph.D. Candidate",
  "Prosci Certified",
  "SHRM-SCP",
  "SAFe Agilist",
  "20-Year Military (E-9, Top 1%)",
  "5 Publications",
];

export function AboutTeaser() {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-3">
            About
          </p>
          <div className="h-px bg-gradient-to-r from-accent-warm/30 to-transparent max-w-[120px] mb-6" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            I&apos;m an{" "}
            <strong className="text-text-primary font-semibold">
              embedded AI program architect
            </strong>
            . Currently the AI lead for{" "}
            <strong className="text-text-primary font-semibold">
              Multnomah County
            </strong>
            , running{" "}
            <strong className="text-text-primary font-semibold">
              5 production AI initiatives
            </strong>{" "}
            across accessibility, site intelligence, legacy modernization, and QA
            automation &mdash; shipping features weekly with a dated public
            activity feed.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mt-6">
            Multi-agent systems on Vertex AI (Claude, Gemini, GPT). LangGraph
            pipelines. RAG with pgvector. Behavioral test capture from retiring
            SMEs. Stakeholder hubs, ROI calculators, and validation against
            independent audits &mdash; plus executive training at{" "}
            <strong className="text-text-primary font-semibold">UT Austin</strong>{" "}
            and{" "}
            <strong className="text-text-primary font-semibold">
              Johns Hopkins
            </strong>{" "}
            and peer-reviewed AI research on the side.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex gap-2 flex-wrap mt-8">
            {tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-8 text-accent-cyan/80 hover:text-accent-cyan text-sm font-mono hover:gap-3 transition-all transition-colors"
          >
            Learn more about me <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
