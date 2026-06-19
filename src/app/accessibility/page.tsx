"use client";

import { Reveal } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mail,
  Calendar,
} from "lucide-react";
import { personal } from "@/data/personal";
import { BOOKING_URL } from "@/lib/constants";

const commitments = [
  "WCAG 2.1 Level AA conformance is the operational standard for this site and for every system Cossette Consulting LLC builds for clients.",
  "Visible keyboard focus indicators on all interactive elements.",
  "Color contrast meets or exceeds 4.5:1 for normal text and 3:1 for large text and UI components.",
  "Semantic HTML — landmarks (header / nav / main / footer), heading hierarchy, and ARIA roles only where they add value.",
  "Skip-to-main-content link for keyboard and screen-reader users.",
  "All non-text content has descriptive alternative text; decorative imagery is marked aria-hidden.",
  "All form fields have programmatically associated labels; required state is announced.",
  "Respect for prefers-reduced-motion — decorative animation (particles, 3D geometry, hover scales) is suppressed when requested.",
  "Two-tier responsive design that reflows at 320px without horizontal scrolling.",
];

const knownIssues = [
  {
    title: "Demo page background animation",
    detail:
      "The 3D geometry on the homepage hero is suppressed when prefers-reduced-motion is set. Some users on very low-end mobile devices may experience occasional jank; this is a performance issue, not an accessibility blocker.",
  },
  {
    title: "Override book sample pages",
    detail:
      "The /override route uses a separate visual identity (warm parchment + gold) tied to the book design. These pages have been audited but receive lighter ongoing testing than the main site.",
  },
];

const standards = [
  { label: "WCAG 2.1 Level AA", detail: "Conformance target" },
  { label: "Section 508", detail: "Aligned (US Federal procurement)" },
  { label: "EN 301 549", detail: "Aligned (EU public procurement)" },
  { label: "ADA Title II", detail: "Aligned for state/local agency contexts" },
];

export default function AccessibilityStatementPage() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Hero */}
        <Reveal>
          <p className="font-mono text-[11px] tracking-[3px] uppercase text-accent-warm font-semibold mb-6">
            Accessibility Statement
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] mb-8 text-text-primary">
            We model the{" "}
            <span className="text-accent-cyan">accessibility</span> we sell.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-3xl">
            Cossette Consulting LLC builds production accessibility automation
            for public-sector clients. This site is our own conformance proof
            point. If something here doesn&apos;t meet the standard we promise,
            it&apos;s a defect we want to fix.
          </p>
        </Reveal>

        {/* Standards */}
        <div className="mb-20">
          <SectionHeading
            label="Conformance"
            heading="Standards we target"
            accentWord="target"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {standards.map((s) => (
              <Reveal key={s.label} delay={0.05}>
                <Card className="p-5" variant="solid">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={18}
                      className="text-accent-cyan shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-text-primary text-sm mb-1">
                        {s.label}
                      </p>
                      <p className="text-xs text-text-secondary">{s.detail}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Commitments */}
        <div className="mb-20">
          <SectionHeading
            label="Operational Defaults"
            heading="What we commit to"
            accentWord="commit"
          />

          <Reveal delay={0.1}>
            <Card className="mt-10 p-7" variant="solid" hover={false}>
              <ul className="space-y-3.5">
                {commitments.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-accent-cyan shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        {/* Audit cadence */}
        <div className="mb-20">
          <SectionHeading
            label="Audit Cadence"
            heading="How we keep it honest"
            accentWord="honest"
          />

          <Reveal delay={0.1}>
            <Card className="mt-10 p-7" variant="solid" hover={false}>
              <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>
                  <span className="font-semibold text-text-primary">
                    Automated checks:
                  </span>{" "}
                  We run axe-core in continuous integration on every commit. Any
                  new violation blocks merge. This is the same engine that
                  validates output for our A11yReady accessibility automation
                  product.
                </p>
                <p>
                  <span className="font-semibold text-text-primary">
                    Manual checks:
                  </span>{" "}
                  Each new top-level page receives manual keyboard-only and
                  screen-reader testing (NVDA / VoiceOver) before publish.
                  Quarterly re-audits cover the full site.
                </p>
                <p>
                  <span className="font-semibold text-text-primary">
                    Color contrast:
                  </span>{" "}
                  Token-level audit performed on the design system. Brightening
                  applied where AA-on-darkest-card pairs would fail. Tokens
                  reaudited any time a new background or text color is
                  introduced.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Known limitations */}
        <div className="mb-20">
          <SectionHeading
            label="Transparency"
            heading="Known limitations"
            accentWord="limitations"
            description="We surface known issues here rather than waiting to be told. This list updates as items are remediated or new ones are found."
          />

          <div className="space-y-4 mt-10">
            {knownIssues.map((issue) => (
              <Reveal key={issue.title} delay={0.05}>
                <Card
                  className="p-6 border-accent-warm/30 bg-accent-warm/[0.04]"
                  variant="solid"
                  hover={false}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      size={16}
                      className="text-accent-warm shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-bold text-text-primary text-sm mb-1.5">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {issue.detail}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Reporting */}
        <div className="mb-12">
          <SectionHeading
            label="Reporting"
            heading="Tell us if we missed something"
            accentWord="missed"
          />

          <Reveal delay={0.1}>
            <Card className="mt-10 p-7" variant="solid" hover={false}>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                If you encounter an accessibility barrier on this site, please
                email me directly with: (1) the page URL, (2) what you were
                trying to do, (3) the assistive technology and browser you were
                using (if applicable). I aim to acknowledge reports within{" "}
                <strong className="text-text-primary">2 business days</strong>{" "}
                and ship a fix within{" "}
                <strong className="text-text-primary">5 business days</strong>{" "}
                for blocking issues.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  href={`mailto:${personal.email}?subject=${encodeURIComponent("Accessibility issue on lorencossette.com")}`}
                  variant="primary"
                  size="sm"
                >
                  <Mail size={14} aria-hidden="true" /> Email accessibility report
                </Button>
                <Button href={BOOKING_URL} external variant="secondary" size="sm">
                  <Calendar size={14} aria-hidden="true" /> Schedule a working session
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Footer note */}
        <div className="pt-8 border-t border-border-subtle">
          <p className="font-mono text-[10px] text-text-muted text-center leading-relaxed">
            Last reviewed: June 2026 · Cossette Consulting LLC · This statement
            is updated when material changes are made to the site or when new
            barriers are identified and fixed.
          </p>
        </div>
      </div>
    </div>
  );
}
