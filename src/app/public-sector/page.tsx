"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Shield,
  FileSearch,
  Bot,
  Users,
  BookOpen,
  Database,
  ArrowRight,
  ExternalLink,
  Calendar,
  Download,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ClipboardList,
} from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

const MULTCO_HUB = "https://multco-presentations.web.app";

/* ── Where I Help ── */
const services = [
  {
    icon: Shield,
    title: "Accessibility & WCAG Automation",
    desc: "PDF-to-HTML pipelines that clear backlogs before federal ADA Title II deadlines. axe-core validation, deterministic forms, human review queue.",
  },
  {
    icon: FileSearch,
    title: "Site Intelligence & CMS Auditing",
    desc: "Nightly Drupal-aware audit of files, pages, accessibility, SEO, links, PII, performance. Validated against independent external audits.",
  },
  {
    icon: BookOpen,
    title: "Legacy Modernization Support",
    desc: "Behavioral test capture from retiring SMEs. Acceptance contracts that make rebuilds safe. Knowledge corpora with full provenance.",
  },
  {
    icon: Bot,
    title: "AI QA & Testing Platforms",
    desc: "Multi-agent systems that index codebases, generate regression tests from captured knowledge, and guard against drift on every commit.",
  },
  {
    icon: Database,
    title: "Secure Internal Knowledge Systems",
    desc: "RAG over agency data with role-based access. PHI guardrails. Agency-controlled cloud — zero data leaves the environment.",
  },
  {
    icon: Users,
    title: "Executive Advisory & Training",
    desc: "Fractional AI leadership, governance frameworks, change management, executive workshops, and staff enablement programs.",
  },
];

/* ── Why Agencies Bring Me In ── */
const triggers = [
  {
    title: "Compliance deadline approaching",
    detail:
      "ADA Title II (April 2027), Section 508, state accessibility mandates, or records modernization deadlines you can't manually meet.",
  },
  {
    title: "Staff capacity gap",
    detail:
      "Critical knowledge held by 1-3 SMEs nearing retirement, or AI workload that won't scale without specialist hires you can't get budgeted.",
  },
  {
    title: "Failed AI pilot",
    detail:
      "Proof-of-concept worked but the system never made it to production. Procurement, governance, or technical handoff stalled the rollout.",
  },
  {
    title: "Legacy system risk",
    detail:
      "Custom-built application running for 15-30+ years that nobody fully understands, and the rebuild estimates from vendors all start at $5M.",
  },
  {
    title: "Manual process overload",
    detail:
      "Tagging, classifying, remediating, or reviewing tens of thousands of records by hand — at a pace that will never catch up.",
  },
  {
    title: "Need for secure internal automation",
    detail:
      "AI workflows that can't be sent to a third-party SaaS because of data classification, PII, or jurisdiction constraints.",
  },
];

/* ── How I Work ── */
const phases = [
  {
    num: "01",
    title: "Discovery",
    duration: "2–3 weeks · $8K–15K fixed",
    items: [
      "Stakeholder interviews + workflow walk-throughs",
      "Top-1-or-2 opportunity sketch with architecture",
      "Plain-language deliverables for executive review",
      "Recommended roadmap + sizing for the embedded engagement (or honest 'not the right time' if that's the answer)",
    ],
  },
  {
    num: "02",
    title: "Embedded AI Program Lead",
    duration: "12–24 weeks min · $25K–40K/month retainer",
    featured: true,
    items: [
      "Own the AI program end-to-end — architecture, code, adoption",
      "Ship features weekly with a dated delivery record (the same kind you can see at the Multco hub)",
      "Capture institutional knowledge before SMEs retire",
      "Stakeholder hub, executive briefings, ROI tracking",
      "Train your team to run it without me by the end",
    ],
  },
  {
    num: "03",
    title: "Architecture & Build Sprint",
    duration: "4–10 weeks · $30K–80K fixed",
    items: [
      "Specific system architected, built, and deployed",
      "Multi-agent pipelines, RAG, deterministic forms parsers",
      "Production deployment + observability baseline",
      "Hand-off documentation + train-the-trainer session",
    ],
  },
];

/* ── Procurement Snapshot ── */
const procurement = [
  { label: "Legal Entity", value: "Cossette Consulting LLC" },
  { label: "Entity Type", value: "Texas Domestic LLC (filed Dec 29, 2022)" },
  { label: "TX SOS File #", value: "0804858459" },
  { label: "TX Taxpayer #", value: "32087716570" },
  {
    label: "NAICS Codes",
    value:
      "541511 (Custom Programming) · 541512 (Systems Design) · 541618 (Management Consulting) · 541690 (Scientific & Technical Consulting) · 611430 (Training)",
  },
  {
    label: "Engagement Types",
    value:
      "Direct PO · Retainer · Fixed-price project · Sole-source justification · Subcontractor under cooperative purchasing primes",
  },
  {
    label: "Cooperative Purchasing Paths",
    value:
      "Available via Sourcewell, OMNIA Partners, TIPS, and NASPO ValuePoint primes — happy to identify a vehicle that maps to your existing procurement procedures.",
  },
  {
    label: "Insurance",
    value:
      "General Liability, Professional Liability (E&O), and Cyber Liability — current Certificates of Insurance available on request.",
  },
  {
    label: "Location",
    value: "San Antonio, TX · Remote primary · On-site as needed",
  },
];

/* ── Proof ── */
const proofPoints = [
  {
    title: "A11yReady",
    label: "In Production · Scaling",
    color: "green",
    detail: "30s PDF→HTML · 95%+ WCAG 2.1 AA · 34 doc clusters · 734 automated tests",
    href: "/projects/a11yready",
  },
  {
    title: "File Intelligence Platform",
    label: "In Production · Scaling",
    color: "green",
    detail: "56.5K files · 9.9K pages · 92.3% Xingwu agreement · 30 departments",
    href: "/projects/file-intel",
  },
  {
    title: "AI-Powered Testing Platform",
    label: "Active Development",
    color: "cyan",
    detail: "6-agent system · 9,420 indexed symbols · multi-tenant from day one",
    href: "/projects/ai-testing-platform",
  },
  {
    title: "UCR Modernization",
    label: "Discovery",
    color: "warm",
    detail: "704 SME sessions · 208 behavioral tests · acceptance contract",
    href: "/projects/ucr-modernization",
  },
];

const labelColor: Record<string, string> = {
  green: "bg-green-500/10 border-green-500/30 text-green-400",
  cyan: "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan",
  warm: "bg-accent-warm/10 border-accent-warm/30 text-accent-warm",
};

export default function PublicSectorPage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,231,240,0.06),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[3px] uppercase text-accent-warm font-semibold mb-6">
              State · County · Municipal · Mission-Driven
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.02] mb-8 text-text-primary">
              AI modernization for{" "}
              <span className="text-accent-cyan">public-sector teams</span>{" "}
              under real constraints
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed mb-10">
              I help state, county, and city agencies turn accessibility
              mandates, legacy workflows, and institutional knowledge risks into
              secure, maintainable AI-enabled systems &mdash; with measurable
              outcomes, clear governance, and documented handoff. Currently
              embedded as the AI lead for Multnomah County, running 5 production
              initiatives that any procurement officer can verify.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex gap-3 flex-wrap">
              <Button href={BOOKING_URL} external size="lg">
                <Calendar size={16} /> Book a Working Session
              </Button>
              <Button href="#proof" size="lg" variant="secondary">
                See the Multco Program <ArrowRight size={16} />
              </Button>
              <Button href="/capability-statement" size="lg" variant="ghost">
                <Download size={16} /> Capability Statement
              </Button>
            </div>
          </Reveal>

          {/* Quick credibility row */}
          <Reveal delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-border-default">
              <div>
                <div className="font-mono text-2xl md:text-3xl font-bold text-accent-cyan">
                  5
                </div>
                <p className="font-mono text-[11px] tracking-[1px] uppercase text-text-muted mt-1.5">
                  Production AI initiatives
                </p>
              </div>
              <div>
                <div className="font-mono text-2xl md:text-3xl font-bold text-accent-cyan">
                  56.5K
                </div>
                <p className="font-mono text-[11px] tracking-[1px] uppercase text-text-muted mt-1.5">
                  County files monitored nightly
                </p>
              </div>
              <div>
                <div className="font-mono text-2xl md:text-3xl font-bold text-accent-cyan">
                  92.3%
                </div>
                <p className="font-mono text-[11px] tracking-[1px] uppercase text-text-muted mt-1.5">
                  Independent audit agreement
                </p>
              </div>
              <div>
                <div className="font-mono text-2xl md:text-3xl font-bold text-accent-cyan">
                  704
                </div>
                <p className="font-mono text-[11px] tracking-[1px] uppercase text-text-muted mt-1.5">
                  SME sessions captured
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHERE I HELP ── */}
      <section className="py-24 lg:py-32 bg-bg-elevated">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            label="Where I Help"
            heading="What I do for public-sector teams"
            accentWord="public-sector"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} variants={staggerItem}>
                  <Card className="p-7 h-full" variant="solid">
                    <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-accent-cyan" />
                    </div>
                    <h3 className="font-bold text-text-primary text-base mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {s.desc}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── WHY AGENCIES BRING ME IN ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <SectionHeading
            label="When I'm The Right Call"
            heading="Why agencies bring me in"
            accentWord="bring"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
            {triggers.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05}>
                <Card className="p-6 h-full" variant="solid">
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      size={16}
                      className="text-accent-warm shrink-0 mt-1"
                    />
                    <div>
                      <h3 className="font-bold text-text-primary text-sm mb-2">
                        {t.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {t.detail}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW I WORK ── */}
      <section className="py-24 lg:py-32 bg-bg-elevated">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            label="How I Work"
            heading="Three engagement options"
            accentWord="engagement"
            description="Most engagements start with Discovery — a short fixed-fee assessment that scopes the embedded engagement (or honestly tells you it isn't the right time). No surprises, no sales-cycle bloat."
          />

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-14">
            {phases.map((p) => (
              <motion.div key={p.title} variants={staggerItem}>
                <Card
                  className={`p-7 h-full relative ${
                    p.featured
                      ? "border-accent-cyan/40 bg-accent-cyan/[0.03]"
                      : ""
                  }`}
                  variant={p.featured ? "glow" : "solid"}
                >
                  {p.featured && (
                    <div className="absolute top-0 right-6 bg-accent-cyan text-[#0a0a0f] font-mono text-[9px] font-bold tracking-[1.5px] uppercase px-3 py-1">
                      Flagship
                    </div>
                  )}
                  <p className="font-mono text-[10px] tracking-[2px] uppercase text-text-muted mb-2">
                    Tier {p.num}
                  </p>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {p.title}
                  </h3>
                  <p className="font-mono text-xs text-accent-warm mb-5">
                    {p.duration}
                  </p>

                  <div className="h-px bg-border-default mb-5" />

                  <div className="space-y-2.5">
                    {p.items.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={14}
                          className="text-accent-cyan shrink-0 mt-0.5"
                        />
                        <span className="text-[13px] text-text-secondary leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── PROCUREMENT SNAPSHOT ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <SectionHeading
            label="Procurement Snapshot"
            heading="How to contract with me"
            accentWord="contract"
            description="The information a procurement officer needs to start an internal conversation about an engagement, in one place."
          />

          <Reveal delay={0.15}>
            <Card className="mt-14 p-0 overflow-hidden" variant="solid" hover={false}>
              <div className="px-7 py-5 border-b border-border-default flex items-center gap-3">
                <Building2 size={18} className="text-accent-cyan" />
                <h3 className="font-bold text-text-primary text-sm">
                  Cossette Consulting LLC · Entity & Procurement Detail
                </h3>
              </div>
              <div>
                {procurement.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 md:gap-6 px-7 py-4 border-b border-border-subtle last:border-b-0"
                  >
                    <span className="font-mono text-[11px] tracking-widest uppercase text-text-muted">
                      {row.label}
                    </span>
                    <span className="text-sm text-text-secondary leading-relaxed">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/capability-statement" variant="primary" size="md">
                <Download size={14} /> Download Capability Statement
              </Button>
              <Button href="/security" variant="secondary" size="md">
                <Shield size={14} /> Security & Data Handling
              </Button>
              <Button href={BOOKING_URL} external variant="ghost" size="md">
                <Calendar size={14} /> Schedule a Working Session
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROOF ── */}
      <section
        id="proof"
        className="py-24 lg:py-32 bg-bg-elevated scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            label="Proof Of Work"
            heading="The Multnomah County AI Program"
            accentWord="AI"
            description="Five concurrent initiatives. One embedded architect. A live presentation hub with a dated delivery record that any procurement officer or peer agency can verify in 60 seconds."
          />

          <Reveal delay={0.1}>
            <div className="mt-14 p-7 rounded-xl border border-accent-cyan/30 bg-accent-cyan/[0.04]">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] tracking-[2px] uppercase text-accent-cyan mb-2">
                    Live Program Hub
                  </p>
                  <p className="text-base md:text-lg text-text-primary leading-relaxed">
                    Verify the work in real time at the Multnomah County AI
                    Development Hub — each initiative has its own page with
                    architecture, stats, and a dated activity feed.
                  </p>
                </div>
                <Button href={MULTCO_HUB} external variant="primary" size="md">
                  <ExternalLink size={14} /> multco-presentations.web.app
                </Button>
              </div>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {proofPoints.map((p) => (
              <motion.div key={p.title} variants={staggerItem}>
                <Link href={p.href} className="block group">
                  <Card
                    className="p-6 h-full hover:border-accent-cyan/40 transition-colors"
                    variant="solid"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-bold text-text-primary text-base">
                        {p.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[9px] tracking-widest uppercase border whitespace-nowrap ${labelColor[p.color]}`}
                      >
                        {p.label}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-3">
                      {p.detail}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-accent-cyan/70 text-xs font-mono group-hover:text-accent-cyan group-hover:gap-2.5 transition-all">
                      View case study <ArrowRight size={12} />
                    </span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </StaggerContainer>

          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-wrap gap-3 justify-center">
              <Badge variant="outline">
                <ClipboardList size={11} className="mr-1.5" />
                Dated delivery record
              </Badge>
              <Badge variant="outline">Independent third-party validation</Badge>
              <Badge variant="outline">Zero data leaves county cloud</Badge>
              <Badge variant="outline">Documented handoff in every engagement</Badge>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 text-center px-6 md:px-8 bg-bg-elevated">
        <Reveal>
          <div className="h-px bg-gradient-to-r from-transparent via-accent-warm/30 to-transparent max-w-[200px] mx-auto mb-10" />
          <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-4">
            Ready to talk
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-text-primary max-w-3xl mx-auto">
            Bring me in to{" "}
            <span className="text-accent-cyan">lead your AI program</span>.
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
            Start with a 30-minute working session — not a sales pitch. We map
            what you&apos;re trying to solve, I tell you whether embedded AI
            program leadership is the right fit, and you get a written summary
            you can forward internally.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button href={BOOKING_URL} external>
              <Calendar size={16} /> Book a Working Session
            </Button>
            <Button href="/capability-statement" variant="secondary">
              <Download size={16} /> Capability Statement
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
