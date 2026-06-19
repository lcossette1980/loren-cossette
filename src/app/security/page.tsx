"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Lock,
  Cloud,
  Eye,
  Users,
  GitBranch,
  FileLock,
  AlertCircle,
  Network,
  Accessibility,
  Calendar,
  Download,
} from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

/* ── Core Principles ── */
const principles = [
  {
    icon: Cloud,
    title: "Agency-Controlled Cloud",
    detail:
      "All processing runs inside the agency's own cloud tenant. For Multnomah County, every byte of document content, model call, and audit record stays within the County's GCP project. No data leaves the environment for AI processing, training, or storage.",
  },
  {
    icon: Network,
    title: "Vendor & Model Neutrality",
    detail:
      "Model selection is driven by accuracy, cost, and data-residency requirements — not vendor preference. Vertex AI hosts Claude (via Anthropic) and Gemini (Google) under the agency's existing GCP agreements. Bedrock and Azure routing are available where existing contracts dictate.",
  },
  {
    icon: Eye,
    title: "Human-in-the-Loop by Default",
    detail:
      "Every system I build has explicit human checkpoints: reviewer approval before publication (A11yReady), SME confirmation before authoritative classification (UCR), Mounika briefing approval before agent actions take effect (Testing Platform). AI accelerates; humans remain accountable for the output.",
  },
  {
    icon: GitBranch,
    title: "Full Audit Trails",
    detail:
      "Every model call, every reviewer decision, every system mutation is logged with timestamp, actor, input, and output. Provenance flows from source artifact through extraction, validation, transformation, and publication. Procurement and compliance can reconstruct any decision.",
  },
  {
    icon: Lock,
    title: "Role-Based Access Control",
    detail:
      "All systems gate access by role and tenant. Multi-tenant systems use Row-Level Security keyed by tenant_id, per-agent service accounts, Identity-Aware Proxy gating, and Workload Identity Federation (no long-lived service-account JSON keys). Least-privilege is the default.",
  },
  {
    icon: FileLock,
    title: "PHI / PII Guardrails",
    detail:
      "Two-stage PHI/PII classification (deterministic heuristic short-circuit + LLM second-pass) holds sensitive content for human review before ingestion. Verified post-hoc on real data: when the heuristic misses, the LLM catches; misses are purged, and the routing config is updated so they SKIP on re-ingest.",
  },
];

/* ── Data Handling Lifecycle ── */
const lifecycle = [
  {
    step: "01",
    title: "Intake",
    detail:
      "Documents and data arrive through agency-controlled storage (GCS buckets, Drupal-mounted volumes, or Drive folders authorized by the agency). No third-party staging. No off-cloud staging.",
  },
  {
    step: "02",
    title: "Processing",
    detail:
      "Vertex AI handles model calls inside the agency tenant. No request leaves the GCP project. Prompt + response logged for audit but never sent to external analytics services.",
  },
  {
    step: "03",
    title: "Validation",
    detail:
      "axe-core WCAG checks, numeric integrity validation, completeness checks, and cross-source reconciliation run before any output reaches a reviewer. Failures route to human triage, not auto-publish.",
  },
  {
    step: "04",
    title: "Human Review",
    detail:
      "Side-by-side comparison interfaces let reviewers approve, reject, or request fixes. Reviewer decisions feed back into deterministic correction directives — not consensus-based templates that can force-fit.",
  },
  {
    step: "05",
    title: "Publication / Action",
    detail:
      "Only reviewer-approved output is published or acted on. Where automated actions occur (e.g. social posting in Clearview Politics), guardrails enforce frequency, content type, and approval triggers.",
  },
  {
    step: "06",
    title: "Retention & Audit",
    detail:
      "All processing artifacts retained per the agency's retention schedule. Auditors can reconstruct any document's path from source to publication, including model versions and reviewer decisions.",
  },
];

/* ── Accessibility commitments ── */
const a11yCommitments = [
  "All systems I build are validated against WCAG 2.1 Level AA criteria using axe-core in CI",
  "This site is built to meet WCAG 2.1 Level AA — accessibility issues can be reported via the Contact page",
  "PDFs and rich documents published by client systems are tagged for screen readers, keyboard navigable, and free of color-only meaning",
  "Forms include explicit labels, role attributes, and error guidance that screen readers can announce",
  "Color contrast on all client deliverables meets or exceeds WCAG AA ratios (4.5:1 for body text, 3:1 for large text and UI components)",
];

export default function SecurityPage() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* HERO */}
        <Reveal>
          <p className="font-mono text-[11px] tracking-[3px] uppercase text-accent-warm font-semibold mb-6">
            Security & Data Handling
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-8 text-text-primary">
            How I handle agency data,{" "}
            <span className="text-accent-cyan">in plain language</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-3xl">
            Public-sector AI work succeeds or fails on trust. The principles
            below are the operational defaults across every system I build —
            not aspirations. Each is enforced in production today inside the
            Multnomah County AI Program.
          </p>
        </Reveal>

        {/* ── CORE PRINCIPLES ── */}
        <div className="mt-20">
          <SectionHeading
            label="Core Principles"
            heading="The defaults I never override"
            accentWord="defaults"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} variants={staggerItem}>
                  <Card className="p-7 h-full" variant="solid">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-accent-cyan" />
                      </div>
                      <div>
                        <h3 className="font-bold text-text-primary text-base mb-2">
                          {p.title}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {p.detail}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>

        {/* ── DATA HANDLING LIFECYCLE ── */}
        <div className="mt-32">
          <SectionHeading
            label="Lifecycle"
            heading="How data moves through my systems"
            accentWord="data"
            description="Six stages from intake to retention, with the controls at each stage. This is the operational reality, not a marketing diagram."
          />

          <div className="mt-12 space-y-3">
            {lifecycle.map((l, i) => (
              <Reveal key={l.step} delay={i * 0.05}>
                <Card className="p-6" variant="solid" hover={false}>
                  <div className="grid grid-cols-[80px_1fr] gap-5">
                    <div>
                      <div className="font-mono text-3xl font-extrabold text-accent-cyan/30 tracking-tighter">
                        {l.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary text-base mb-1.5">
                        {l.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {l.detail}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── MODEL ROUTING TRANSPARENCY ── */}
        <div className="mt-32">
          <SectionHeading
            label="Model Routing"
            heading="No black-box AI"
            accentWord="black-box"
            description="Every model selection decision is documented and reviewable. No 'we used AI' hand-waving."
          />

          <Reveal delay={0.1}>
            <Card className="mt-12 p-7" variant="solid" hover={false}>
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-2">
                    Vision (page layout analysis)
                  </p>
                  <p className="text-sm text-text-secondary">
                    <span className="text-text-primary font-semibold">
                      Gemini 2.5 Flash (default) · Gemini 2.5 Pro (complex)
                    </span>{" "}
                    — accessed via Vertex AI inside the agency&apos;s GCP
                    tenant. Used for OCR, layout extraction, and visual fidelity
                    verification against rendered HTML.
                  </p>
                </div>
                <div className="h-px bg-border-subtle" />
                <div>
                  <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-2">
                    Text generation (content extraction, HTML, synthesis)
                  </p>
                  <p className="text-sm text-text-secondary">
                    <span className="text-text-primary font-semibold">
                      Claude Sonnet 4.5/4.6 (default) · Claude Haiku 4.5 (lightweight)
                    </span>{" "}
                    — accessed via Vertex AI Model Garden inside the
                    agency&apos;s GCP tenant. Used for structured extraction,
                    HTML generation, and reasoning over multi-document
                    contexts.
                  </p>
                </div>
                <div className="h-px bg-border-subtle" />
                <div>
                  <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-2">
                    Embeddings (semantic search, clustering)
                  </p>
                  <p className="text-sm text-text-secondary">
                    <span className="text-text-primary font-semibold">
                      text-embedding-3-small · embedding-001 (Vertex)
                    </span>{" "}
                    — stored as pgvector inside the agency&apos;s Postgres
                    instance. Used for retrieval-augmented generation and
                    duplicate detection.
                  </p>
                </div>
                <div className="h-px bg-border-subtle" />
                <div>
                  <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-2">
                    Training data
                  </p>
                  <p className="text-sm text-text-secondary">
                    <span className="text-text-primary font-semibold">
                      None of your data is used for model training.
                    </span>{" "}
                    Vertex AI enterprise APIs do not use customer data for
                    foundation model training. Anthropic and Google contractually
                    agree to this through GCP&apos;s enterprise data processing
                    agreement.
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* ── ACCESSIBILITY COMMITMENT ── */}
        <div className="mt-32">
          <SectionHeading
            label="Accessibility"
            heading="What I build, I build accessibly"
            accentWord="accessibly"
            description="Because I sell accessibility automation work, my own deliverables — including this site — model WCAG conformance. If you find an accessibility issue, please report it through the Contact page and I will respond within 5 business days."
          />

          <Reveal delay={0.1}>
            <Card className="mt-12 p-7" variant="solid" hover={false}>
              <div className="flex items-start gap-3 mb-5">
                <Accessibility size={20} className="text-accent-cyan shrink-0 mt-0.5" />
                <h3 className="font-bold text-text-primary text-base">
                  WCAG 2.1 Level AA Commitment
                </h3>
              </div>
              <ul className="space-y-3">
                {a11yCommitments.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm text-text-secondary"
                  >
                    <ShieldCheck
                      size={14}
                      className="text-accent-cyan shrink-0 mt-0.5"
                    />
                    <span className="leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        {/* ── INCIDENT / DISCLOSURE ── */}
        <div className="mt-32">
          <SectionHeading
            label="Incident & Disclosure"
            heading="If something goes wrong"
            accentWord="wrong"
          />

          <Reveal delay={0.1}>
            <Card
              className="mt-12 p-7 border-accent-warm/30 bg-accent-warm/[0.04]"
              variant="solid"
              hover={false}
            >
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle
                  size={20}
                  className="text-accent-warm shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-bold text-text-primary text-base mb-2">
                    Plain-language incident response
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    If a system I built or operate causes a data exposure,
                    accessibility regression, or compliance gap, I will: (1)
                    notify the agency point-of-contact within 24 hours of
                    discovery; (2) provide a written timeline within 5 business
                    days; (3) deliver a written remediation plan with completion
                    dates; (4) implement the fix on no-charge time until
                    resolved.
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    For responsible vulnerability disclosure relating to this
                    site or any deployed system I maintain, please email me
                    directly. I treat all good-faith reports as friendly.
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* ── CTA ── */}
        <div className="mt-32 text-center">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-4">
              Questions
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-text-primary">
              Need additional security documentation?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto mb-8 text-base leading-relaxed">
              I can provide a written security questionnaire response, a
              data-flow diagram for your specific use case, or a sample
              architecture review. Most agencies receive this during the
              Discovery Engagement.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button href={BOOKING_URL} external>
                <Calendar size={16} /> Schedule a Working Session
              </Button>
              <Button href="/capability-statement" variant="secondary">
                <Download size={16} /> Capability Statement
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 pt-8 border-t border-border-subtle">
          <p className="font-mono text-[10px] text-text-muted text-center leading-relaxed">
            Last updated: June 2026 · Cossette Consulting LLC · This statement
            reflects current operational practice and is updated as systems
            evolve. Specific contractual security terms are documented in each
            engagement&apos;s Statement of Work.
          </p>
        </div>
      </div>
    </div>
  );
}
