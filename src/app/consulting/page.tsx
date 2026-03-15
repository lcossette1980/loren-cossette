"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { personal } from "@/data/personal";
import {
  Bot,
  GitBranch,
  GraduationCap,
  Mail,
  Linkedin,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Award,
  Sword,
  Search,
  MessageSquare,
  FileText,
  Zap,
  Users,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

/* ─── DATA ─── */

const heroStats = [
  { value: 2.7, prefix: "$", suffix: "M+", label: "Cost Saved (Q1 USAA)", decimals: 1 },
  { value: 26, suffix: "×", label: "Speed Increase" },
  { value: 90, suffix: "%", label: "Scope Reduction" },
  { value: 5, suffix: "", label: "Peer-Reviewed Publications" },
];

const credentials = [
  "PhD Candidate",
  "Prosci Certified",
  "SHRM-SCP",
  "SAFe Agilist",
  "20-Year Military (E-9)",
  "UT Austin & Johns Hopkins",
];

const pillars = [
  {
    num: "01",
    title: "Build",
    icon: Bot,
    accent: "accent-cyan",
    description:
      "Production agentic systems, RAG pipelines, and full-stack AI products. Not demos. Deployed infrastructure that runs in the real world.",
    items: [
      "Multi-agent orchestration systems",
      "RAG pipelines & retrieval evaluation",
      "Full-stack AI application development",
      "Serverless cloud infrastructure (GCP/Azure/AWS)",
      "Compliance & automation pipelines",
      "LLM integration & prompt engineering",
      "ETL & vector database pipelines",
    ],
  },
  {
    num: "02",
    title: "Transform",
    icon: GitBranch,
    accent: "accent-warm",
    description:
      "AI strategy, governance, and the organizational change management that makes technical projects actually get funded, adopted, and sustained.",
    items: [
      "AI readiness assessments & audits",
      "Strategy & roadmap development",
      "Governance & compliance frameworks",
      "Change management programs (Prosci)",
      "Executive stakeholder alignment",
      "Vendor & platform selection advisory",
      "AI adoption & rollout strategy",
    ],
  },
  {
    num: "03",
    title: "Teach",
    icon: GraduationCap,
    accent: "accent-cyan",
    description:
      "Research-backed training programs for executives, engineers, and entire organizations — from awareness to hands-on production capability.",
    items: [
      "Executive AI workshops (C-suite)",
      "Technical bootcamps for engineering teams",
      "AI literacy programs for non-technical staff",
      "Curriculum design & certification paths",
      "Train-the-trainer program development",
      "Conference keynotes & speaking",
      "Applied AI research & white papers",
    ],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    description:
      "30-minute call to understand your problem, current state, and what success actually looks like for your organization.",
  },
  {
    num: "02",
    title: "Scoping",
    description:
      "I deliver a plain-language proposal: what gets built, what changes, what your team learns, timeline, and fixed-price cost.",
  },
  {
    num: "03",
    title: "Execution",
    description:
      "I own the full lifecycle. Architecture, code, stakeholder communication, change management. You get weekly updates, not surprises.",
  },
  {
    num: "04",
    title: "Handoff",
    description:
      "Your team is trained, your system is documented, and you're not dependent on me to keep it running. That's the goal.",
  },
];

/* Methodology cross-link shown after process steps */
const methodologyCTA = {
  text: "Want the full playbook?",
  description: "My 7-phase engineering methodology — from problem discovery to production handoff.",
  href: "/methodology",
};

const engagementModels = [
  {
    type: "Engagement Model",
    title: "Advisory Retainer",
    price: "$3K–5K",
    unit: "per month",
    featured: false,
    items: [
      "4–6 hrs/mo strategy calls",
      "Async architecture review",
      "AI roadmap guidance",
      "Vendor & tool advisory",
      "Email/Slack access",
    ],
  },
  {
    type: "Engagement Model",
    title: "Fractional CAIO",
    price: "$15K–25K",
    unit: "per month",
    featured: true,
    badge: "Highest Leverage",
    items: [
      "AI strategy ownership",
      "Build oversight & architecture",
      "Executive presence & board reporting",
      "Change management programs",
      "Team training & enablement",
      "Governance framework design",
    ],
  },
  {
    type: "Engagement Model",
    title: "Embedded Architect",
    price: "$8K–15K",
    unit: "per month",
    featured: false,
    items: [
      "Active build oversight",
      "Architecture reviews",
      "Engineering team guidance",
      "Code review & QA",
      "Technical documentation",
    ],
  },
];

const hourlyRates = [
  { label: "AI Strategy & Advisory", price: "$300–$400/hr" },
  { label: "Technical Architecture", price: "$250–$375/hr" },
  { label: "Hands-On Engineering", price: "$200–$300/hr" },
  { label: "Training Delivery", price: "$250–$350/hr" },
  { label: "Expert Review / Audit", price: "$350–$500/hr" },
  { label: "On-Site / Day Rate", price: "$2,000–$3,000/day" },
];

const projectRates = [
  { label: "AI Readiness Audit + Report", price: "$5K–$12K" },
  { label: "RAG Pipeline (End-to-End)", price: "$25K–$60K" },
  { label: "Agentic System Build", price: "$40K–$120K" },
  { label: "AI Strategy Roadmap", price: "$8K–$20K" },
  { label: "Executive Workshop (1 Day)", price: "$5K–$10K" },
  { label: "Full Training Curriculum", price: "$15K–$40K" },
];

/* ─── PAGE ─── */

export default function ConsultingPage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,231,240,0.06),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[3px] uppercase text-accent-warm font-semibold mb-6">
              Consulting Services
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] leading-[0.95] mb-8 text-text-primary">
              Strategy.
              <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]">
                Build.
              </span>
              <br />
              Adoption.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed mb-10">
              Most AI initiatives fail between vision and execution. I close
              that gap — by doing all three myself.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex gap-4 flex-wrap">
              <Button href={BOOKING_URL} external size="lg">
                <Calendar size={16} /> Book a Strategy Call
              </Button>
              <Button href={`mailto:${personal.email}`} size="lg" variant="secondary">
                <Mail size={16} /> Email Me Directly
              </Button>
            </div>
          </Reveal>

          {/* Hero stats */}
          <Reveal delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-border-default">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-3xl md:text-4xl font-bold text-accent-cyan tabular-nums">
                    <AnimatedCounter
                      end={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                    />
                  </div>
                  <p className="font-mono text-xs tracking-[1px] uppercase text-text-muted mt-2">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CREDENTIALS BAND ── */}
      <div className="border-y border-border-default bg-bg-elevated py-5 overflow-hidden">
        <div className="flex gap-12 justify-center flex-wrap px-6">
          {credentials.map((c) => (
            <span
              key={c}
              className="flex items-center gap-2.5 text-text-muted text-[12px] font-mono tracking-wide whitespace-nowrap"
            >
              <span className="text-accent-warm text-[8px]">◆</span>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ── THREE PILLARS ── */}
      <section className="py-32 lg:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            label="What I Do"
            heading="Three pillars. One person."
            accentWord="One"
            description="The rarest combination in AI consulting: end-to-end technical execution, organizational transformation, and professional education — delivered without a team of 12."
          />

          {/* Value statement */}
          <Reveal delay={0.2}>
            <div className="border-l-2 border-accent-cyan bg-accent-cyan/[0.04] px-8 py-6 mt-10 mb-14 max-w-3xl rounded-r-lg">
              <p className="text-text-primary text-lg md:text-xl italic leading-relaxed">
                &ldquo;I define the AI strategy, then write the code — a rare
                combination that closes the gap between GenAI&apos;s potential
                and operational reality.&rdquo;
              </p>
              <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mt-4">
                — Loren Cossette
              </p>
            </div>
          </Reveal>

          {/* Pillar cards */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} variants={staggerItem}>
                  <Card className="p-0 h-full overflow-hidden group" variant="solid">
                    {/* Top accent bar */}
                    <div
                      className={`h-[3px] w-full ${
                        p.num === "01"
                          ? "bg-accent-cyan"
                          : p.num === "02"
                            ? "bg-accent-warm"
                            : "bg-accent-cyan"
                      } scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    />
                    <div className="p-7">
                      {/* Number + Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-[56px] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(34,231,240,0.45)]">
                          {p.num}
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                          <Icon size={18} className="text-accent-cyan" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-text-primary mb-3">
                        {p.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-6">
                        {p.description}
                      </p>

                      <div className="space-y-3">
                        {p.items.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <ArrowRight
                              size={13}
                              className="text-accent-warm shrink-0 mt-0.5"
                            />
                            <span className="text-sm text-text-secondary leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── WHO I WORK BEST WITH ── */}
      <section className="py-32 lg:py-40 bg-bg-elevated">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <SectionHeading
            label="Ideal Clients"
            heading="Who I work best with"
            accentWord="best"
          />

          <Reveal>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mt-8 mb-10 max-w-2xl">
              My engagements work best when the problem is real, the stakes are
              high, and the organization is ready to move — not just explore.
            </p>
          </Reveal>

          <div className="space-y-5">
            {[
              {
                icon: Shield,
                label: "Government agencies",
                description:
                  "facing compliance or accessibility deadlines — Section 508, WCAG, ADA, or federal AI governance requirements",
              },
              {
                icon: TrendingUp,
                label: "Enterprises",
                description:
                  "that have run AI pilots but can't get to production or adoption at scale",
              },
              {
                icon: Zap,
                label: "Founders and startups",
                description:
                  "who need a senior architect to build the real thing, not a prototype",
              },
              {
                icon: Target,
                label: "Organizations with a made business case",
                description:
                  "where the technical path, governance, or change management is the missing piece",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={i * 0.08}>
                  <Card className="p-6 flex items-start gap-5" variant="solid">
                    <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-accent-cyan" />
                    </div>
                    <div>
                      <p className="text-sm text-text-primary">
                        <strong>{item.label}</strong> {item.description}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.4}>
            <p className="text-sm text-text-muted mt-8">
              Not sure if you&apos;re a fit?{" "}
              <a
                href={`mailto:${personal.email}`}
                className="text-accent-cyan hover:underline"
              >
                Email me directly
              </a>{" "}
              — I&apos;ll tell you honestly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-32 lg:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            label="How It Works"
            heading="From first call to production"
            accentWord="production"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {processSteps.map((s) => (
              <motion.div key={s.num} variants={staggerItem}>
                <Card className="p-7 h-full group" variant="solid">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-cyan font-semibold mb-5">
                    Step {s.num}
                  </p>
                  <h3 className="text-lg font-bold text-text-primary mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {s.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── METHODOLOGY CROSS-LINK ── */}
      <Reveal>
        <div className="max-w-6xl mx-auto px-6 md:px-8 -mt-16 mb-0">
          <Link href={methodologyCTA.href} className="block group">
            <Card className="p-6 flex items-center justify-between gap-4 hover:border-accent-cyan/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                  <Zap size={18} className="text-accent-cyan" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">
                    {methodologyCTA.text}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {methodologyCTA.description}
                  </p>
                </div>
              </div>
              <ArrowRight size={16} className="text-text-muted group-hover:text-accent-cyan group-hover:translate-x-1 transition-all shrink-0" />
            </Card>
          </Link>
        </div>
      </Reveal>

      {/* ── PRICING ── */}
      <section className="py-32 lg:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            label="Investment"
            heading="Transparent pricing"
            accentWord="Transparent"
            description="Priced to reflect what a team of specialists would cost — delivered by one senior architect who owns the whole thing."
          />

          {/* Engagement model cards */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-14">
            {engagementModels.map((m) => (
              <motion.div key={m.title} variants={staggerItem}>
                <Card
                  className={`p-0 h-full overflow-hidden relative ${
                    m.featured ? "border-accent-cyan/40 bg-accent-cyan/[0.03]" : ""
                  }`}
                  variant={m.featured ? "glow" : "solid"}
                >
                  {m.badge && (
                    <div className="absolute top-0 right-6 bg-accent-cyan text-[#0a0a0f] font-mono text-[9px] font-bold tracking-[1.5px] uppercase px-3 py-1">
                      {m.badge}
                    </div>
                  )}
                  <div className="p-7">
                    <p className="font-mono text-[10px] tracking-[2px] uppercase text-text-muted mb-2">
                      {m.type}
                    </p>
                    <h3 className="text-lg font-bold text-text-primary mb-6">
                      {m.title}
                    </h3>
                    <p className="font-mono text-4xl font-extrabold text-accent-cyan tracking-[-0.04em] leading-none mb-1">
                      {m.price}
                    </p>
                    <p className="text-xs text-text-muted mb-7">{m.unit}</p>

                    <div className="h-px bg-border-default mb-6" />

                    <div className="space-y-3">
                      {m.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <CheckCircle
                            size={14}
                            className="text-accent-cyan shrink-0 mt-0.5"
                          />
                          <span className="text-[13px] text-text-secondary">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* Rate tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
            {/* Hourly rates */}
            <Reveal>
              <Card className="p-0 overflow-hidden" variant="solid" hover={false}>
                <div className="px-7 py-5 border-b border-border-default flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                  <h3 className="font-bold text-text-primary text-sm">
                    Hourly Rates
                  </h3>
                </div>
                {hourlyRates.map((r) => (
                  <div
                    key={r.label}
                    className="flex justify-between items-center px-7 py-3.5 border-b border-border-subtle last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <span className="text-[13px] text-text-secondary">
                      {r.label}
                    </span>
                    <span className="font-mono text-sm font-semibold text-text-primary">
                      {r.price}
                    </span>
                  </div>
                ))}
              </Card>
            </Reveal>

            {/* Project-based */}
            <Reveal delay={0.1}>
              <Card className="p-0 overflow-hidden" variant="solid" hover={false}>
                <div className="px-7 py-5 border-b border-border-default flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent-warm" />
                  <h3 className="font-bold text-text-primary text-sm">
                    Project-Based Pricing
                  </h3>
                </div>
                {projectRates.map((r) => (
                  <div
                    key={r.label}
                    className="flex justify-between items-center px-7 py-3.5 border-b border-border-subtle last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <span className="text-[13px] text-text-secondary">
                      {r.label}
                    </span>
                    <span className="font-mono text-sm font-semibold text-text-primary">
                      {r.price}
                    </span>
                  </div>
                ))}
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 lg:py-40 bg-bg-elevated relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,231,240,0.04),transparent_60%)]" />
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center relative z-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[3px] uppercase text-accent-warm font-semibold mb-6">
              Let&apos;s Work Together
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-6 text-text-primary">
              Ready to close
              <br />
              the <span className="text-accent-cyan">gap</span>?
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Tell me what you&apos;re trying to build, fix, or transform.
              I&apos;ll tell you if I&apos;m the right person — and if not,
              I&apos;ll point you to someone who is.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button href={BOOKING_URL} external>
                <Calendar size={16} /> Book a Strategy Call
              </Button>
              <Button href={`mailto:${personal.email}`} variant="secondary">
                <Mail size={16} /> Email Me Directly
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
