"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { personal } from "@/data/personal";
import { education } from "@/data/education";
import { certifications } from "@/data/education";
import { publications } from "@/data/publications";
import { Award, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Hero / Bio */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 mb-20">
          <Reveal>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-glass-border">
              <Image
                src="/images/portrait.png"
                alt="Loren Cossette"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
                priority
              />
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-3">
                About
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
                {personal.name}
              </h1>
              <p className="font-mono text-sm text-text-muted mb-6">
                {personal.suffix} &middot; {personal.title}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                As a{" "}
                <strong className="text-text-primary font-semibold">
                  sole AI automation engineer,
                </strong>{" "}
                I own the full lifecycle &mdash; problem
                discovery, stakeholder alignment, architecture, code, deployment,
                and change management.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-text-secondary text-lg leading-relaxed mb-4">
                I build production agentic systems, RAG pipelines, and serverless
                infrastructure &mdash; while also standing up governance frameworks,
                training executives at{" "}
                <strong className="text-text-primary font-semibold">UT Austin</strong>{" "}
                and{" "}
                <strong className="text-text-primary font-semibold">Johns Hopkins</strong>
                , and publishing peer-reviewed AI research.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-text-secondary text-lg leading-relaxed">
                Deep expertise in NLP, deep learning, prompt engineering, and
                end-to-end ML model evaluation. PhD candidate. Prosci-certified.
                SHRM-SCP. 20-year military career culminating at E-9 (top 1%).
              </p>
            </Reveal>
          </div>
        </div>

        {/* Philosophy / Terminal */}
        <Reveal>
          <Card className="p-0 overflow-hidden mb-20">
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary border-b border-border-default">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="font-mono text-[10px] text-text-muted ml-2">
                ~/loren-cossette
              </span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <p className="text-text-muted">
                <span className="text-accent-cyan">$</span> cat philosophy.md
              </p>
              <div className="mt-4 space-y-3 text-text-secondary">
                <p>
                  <span className="text-accent-cyan">#</span> I believe the best AI engineers don&apos;t just write code &mdash;
                </p>
                <p>
                  <span className="text-accent-cyan">#</span> they understand the business problem deeply enough
                </p>
                <p>
                  <span className="text-accent-cyan">#</span> to know which problems are worth solving with AI,
                </p>
                <p>
                  <span className="text-accent-cyan">#</span> and which ones aren&apos;t.
                </p>
                <p className="mt-4">
                  <span className="text-accent-cyan">#</span> Strategy without code is a slide deck.
                </p>
                <p>
                  <span className="text-accent-cyan">#</span> Code without strategy is a science project.
                </p>
                <p>
                  <span className="text-accent-cyan">#</span> I do both.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Education */}
        <div className="mb-20">
          <SectionHeading
            label="Education"
            heading="Academic foundation"
            accentWord="foundation"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
            {education.map((ed) => (
              <motion.div key={ed.degree} variants={staggerItem}>
                <Card className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap
                      size={16}
                      className="text-accent-warm shrink-0 mt-1"
                    />
                    <div>
                      <p className="text-sm font-bold text-text-primary">
                        {ed.degree}
                      </p>
                      <p className="font-mono text-[11px] text-text-muted mt-1">
                        {ed.school}
                      </p>
                    </div>
                  </div>
                  {ed.status && <Badge variant="accent">{ed.status}</Badge>}
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <Reveal>
            <h3 className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-6">
              Certifications
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex gap-3 flex-wrap">
              {certifications.map((c) => (
                <Card key={c.name} className="px-5 py-3 flex items-center gap-2">
                  <Award size={14} className="text-accent-warm" />
                  <span className="text-sm font-bold text-text-primary">
                    {c.name}
                  </span>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Publications */}
        <div>
          <SectionHeading
            label="Publications"
            heading="Peer-reviewed research"
            accentWord="research"
          />

          <div className="mt-10 space-y-2">
            {publications.map((pub, i) => (
              <Reveal key={pub.title} delay={i * 0.05}>
                <div className="flex gap-5 items-start p-4 rounded-lg hover:bg-bg-tertiary/50 transition-colors">
                  <span className="font-mono text-[13px] text-accent-warm/70 font-medium shrink-0 mt-0.5">
                    {pub.year}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-text-primary leading-relaxed">
                      {pub.title}
                    </p>
                    <p className="font-mono text-[11px] text-text-muted mt-1">
                      {pub.venue}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
