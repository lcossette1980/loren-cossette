"use client";

import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import {
  Printer,
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
} from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

export default function CapabilityStatementPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="capability-page bg-white text-[#0a0a0f] min-h-screen">
      {/* Toolbar — hidden in print */}
      <div className="no-print sticky top-0 z-50 bg-bg-elevated border-b border-border-default">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/public-sector"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-cyan font-mono text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Public Sector</span>
          </Link>
          <div className="flex gap-3">
            <Button onClick={handlePrint} variant="secondary" size="sm">
              <Printer size={14} /> Print / Save as PDF
            </Button>
            <Button href={BOOKING_URL} external size="sm">
              <Calendar size={14} /> Working Session
            </Button>
          </div>
        </div>
      </div>

      {/* Print-styled capability statement */}
      <main className="cap-statement-doc max-w-[850px] mx-auto px-12 py-16 print:p-0 print:max-w-none">
        {/* ── Letterhead ── */}
        <header className="border-b-[3px] border-[#0a3a5c] pb-6 mb-8 print:break-inside-avoid">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-[#0a0a0f] tracking-tight mb-1">
                Cossette Consulting LLC
              </h1>
              <p className="text-sm text-[#4a5063] font-mono tracking-wide">
                Capability Statement · Public-Sector AI Modernization
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#0a3a5c]">Loren Cossette</p>
              <p className="text-xs text-[#4a5063]">Principal · AI Program Architect</p>
              <p className="text-xs text-[#4a5063] font-mono mt-1">
                lorencossette.com
              </p>
            </div>
          </div>
        </header>

        {/* ── Profile ── */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-[11px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-3">
            Firm Profile
          </h2>
          <p className="text-[14px] text-[#1a1f33] leading-relaxed">
            Cossette Consulting LLC is a Texas-domiciled professional services
            firm specializing in embedded AI program leadership for state,
            county, and city government agencies. The firm&apos;s principal,
            Loren Cossette, currently serves as the embedded AI lead for
            Multnomah County, Oregon, running five concurrent production AI
            initiatives across accessibility, site intelligence, legacy
            modernization, and QA automation. Unlike traditional consulting
            engagements that staff multiple vendors against a single program,
            Cossette Consulting delivers full-lifecycle AI work — strategy,
            architecture, build, knowledge capture, stakeholder enablement, and
            documented handoff — under one accountable principal.
          </p>
        </section>

        {/* ── Core Competencies ── */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-[11px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-3">
            Core Competencies
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] text-[#1a1f33]">
            {[
              "Embedded AI program leadership (fractional CAIO / AI lead)",
              "Multi-agent AI system architecture & implementation",
              "WCAG / Section 508 / ADA Title II accessibility automation",
              "Drupal-aware CMS auditing & site intelligence platforms",
              "Legacy-system modernization with behavioral test capture",
              "Knowledge corpus & SME-confirmation workflows",
              "RAG over agency data (pgvector, embeddings, retrieval)",
              "Multi-tenant architecture (RLS, IAP, Workload Identity Fed.)",
              "AI governance frameworks & change management",
              "Executive AI training & staff enablement programs",
              "Independent technical review & validation",
              "AI ROI modeling & cost-benefit analysis",
            ].map((c) => (
              <li key={c} className="flex items-start gap-1.5">
                <span className="text-[#0a3a5c] font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Differentiators ── */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-[11px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-3">
            Differentiators
          </h2>
          <ol className="space-y-2.5 text-[13px] text-[#1a1f33] leading-relaxed">
            <li>
              <span className="font-bold">
                1 · Currently embedded as an AI lead in a real public agency.
              </span>{" "}
              Not a slide-deck consultant. Five production AI initiatives
              running simultaneously inside Multnomah County, with a dated
              public delivery record (multco-presentations.web.app) any
              procurement officer can verify.
            </li>
            <li>
              <span className="font-bold">
                2 · Independent third-party validation.
              </span>{" "}
              File Intelligence Platform validated against Xingwu PHP audit at
              92.3% agreement on 33,738 UUIDs. A11yReady validated by axe-core
              at 95%+ first-pass WCAG 2.1 AA compliance. No vendor-supplied
              testimonials; verifiable metrics.
            </li>
            <li>
              <span className="font-bold">
                3 · Documented handoff is the engagement outcome.
              </span>{" "}
              The objective is to leave the agency stronger, not dependent.
              Every engagement produces leadership explainers, operations
              security handbooks, reviewer onboarding guides, validation
              pipeline infographics, and technical turnover binders.
            </li>
            <li>
              <span className="font-bold">
                4 · Agency-controlled cloud, zero data exfiltration.
              </span>{" "}
              All AI processing runs inside the agency&apos;s own cloud
              tenant. Model calls flow through enterprise APIs (Vertex AI) that
              contractually exclude customer data from foundation-model
              training.
            </li>
            <li>
              <span className="font-bold">
                5 · 20-year military leadership background.
              </span>{" "}
              U.S. Air Force E-9 (top 1% of enlisted leadership), Distinguished
              Graduate of the Senior NCO Academy, multiple NCO-of-the-year
              awards. Disciplined operations, documentation, and accountability
              are habitual, not aspirational.
            </li>
          </ol>
        </section>

        {/* ── Past Performance ── */}
        <section className="mb-8">
          <h2 className="text-[11px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-3">
            Past Performance · Multnomah County AI Program
          </h2>
          <div className="space-y-3 text-[13px] text-[#1a1f33] leading-relaxed">
            <div className="border-l-2 border-[#0a3a5c] pl-4">
              <p>
                <span className="font-bold">A11yReady</span> · Production AI
                document accessibility platform. 30-second PDF→HTML conversion
                (vs. 1–4 hours manual). 95%+ first-pass WCAG 2.1 AA. 34
                document clusters. 734 automated tests. Built to clear the
                County&apos;s public-PDF backlog before the ADA Title II April
                2027 deadline. Live at a11y-ready.multco.us.
              </p>
            </div>
            <div className="border-l-2 border-[#0a3a5c] pl-4">
              <p>
                <span className="font-bold">File Intelligence Platform</span> ·
                Nightly Drupal-aware audit of 56,500+ files and 9,900+ pages
                across 30 departments. Six-bucket deterministic file
                classification, 10-module audit pipeline. Validated against
                independent Xingwu PHP audit at 92.3% agreement on 33,738 UUIDs.
              </p>
            </div>
            <div className="border-l-2 border-[#0a3a5c] pl-4">
              <p>
                <span className="font-bold">AI-Powered Testing Platform</span> ·
                Six-agent system for legacy-system modernization. 9,420 indexed
                code symbols. Multi-tenant from day one (Row-Level Security,
                per-agent service accounts, Identity-Aware Proxy, Workload
                Identity Federation). Designed to onboard additional agencies
                after Multnomah County&apos;s UCR rebuild.
              </p>
            </div>
            <div className="border-l-2 border-[#0a3a5c] pl-4">
              <p>
                <span className="font-bold">UCR Modernization</span> ·
                Behavioral test capture from retiring Subject Matter Experts.
                704 knowledge sessions ingested with full provenance. 208
                behavioral Playwright tests at 98.1% compile-clean. Behavioral
                acceptance contract: the modernized Universal Client Registry
                must pass 208/208 before it ships.
              </p>
            </div>
            <div className="border-l-2 border-[#0a3a5c] pl-4">
              <p>
                <span className="font-bold">Content Automation (Linkit)</span> ·
                Earlier engagement. Four-agent PHP pipeline translation-ready
                20,000+ government pages. 633 hours manual effort reduced to 24
                hours deployed (26× faster). $34,946 saved (89% cost
                reduction). Protected 32K internal links from translation
                corruption.
              </p>
            </div>
          </div>
          <p className="text-[10px] text-[#4a5063] italic mt-3 leading-relaxed">
            Project descriptions reflect Loren Cossette&apos;s professional work
            and do not imply endorsement by Multnomah County or any other public
            agency.
          </p>
        </section>

        {/* ── NAICS / PSC Codes ── */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-[11px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-3">
            NAICS Codes
          </h2>
          <table className="w-full text-[12px] border-collapse">
            <tbody>
              {[
                ["541511", "Custom Computer Programming Services"],
                ["541512", "Computer Systems Design Services"],
                [
                  "541618",
                  "Other Management Consulting Services (incl. AI Strategy)",
                ],
                [
                  "541690",
                  "Other Scientific and Technical Consulting Services",
                ],
                ["611430", "Professional & Management Development Training"],
              ].map(([code, desc]) => (
                <tr key={code} className="border-b border-[#e0e3eb]">
                  <td className="py-1.5 pr-4 font-mono font-bold text-[#0a3a5c] whitespace-nowrap">
                    {code}
                  </td>
                  <td className="py-1.5 text-[#1a1f33]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Engagement Types ── */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-[11px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-3">
            Engagement Types
          </h2>
          <ul className="space-y-2 text-[13px] text-[#1a1f33]">
            <li>
              <span className="font-bold">Discovery Engagement</span> — 2–3
              weeks, $8K–$15K fixed-price. AI program assessment, opportunity
              mapping, recommended roadmap.
            </li>
            <li>
              <span className="font-bold">
                Embedded AI Program Lead (Flagship)
              </span>{" "}
              — 12–24 weeks minimum, $25K–$40K/month retainer. End-to-end
              program leadership: architecture, build, knowledge capture,
              stakeholder enablement, team handoff.
            </li>
            <li>
              <span className="font-bold">Architecture & Build Sprint</span> —
              4–10 weeks, $30K–$80K fixed-price. Specific system architected,
              built, deployed, and documented.
            </li>
            <li>
              <span className="font-bold">Executive Workshop & Training</span>{" "}
              — 1 day to multi-cohort curricula, $5K–$40K depending on scope.
            </li>
            <li>
              <span className="font-bold">Technical Review / Validation</span>{" "}
              — Independent expert review of in-progress or completed AI
              systems. Fixed scope.
            </li>
          </ul>
        </section>

        {/* ── Contracting & Procurement Information ── */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-[11px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-3">
            Contracting & Procurement
          </h2>
          <table className="w-full text-[12px] border-collapse">
            <tbody>
              {[
                ["Legal Entity", "Cossette Consulting LLC"],
                ["Entity Type", "Texas Domestic Limited Liability Company"],
                ["Date Formed", "December 29, 2022"],
                ["TX Secretary of State File #", "0804858459"],
                ["TX Taxpayer ID", "32087716570"],
                ["Federal EIN", "92-1502035"],
                [
                  "Registered Agent",
                  "Registered Agents Inc., 5900 Balcones Drive STE 100, Austin, TX 78731",
                ],
                ["Principal Office", "San Antonio, TX 78261"],
                ["Insurance", "General Liability · Professional Liability (E&O) · Cyber Liability — Certificates of Insurance available upon request"],
                ["Banking", "Established U.S. business banking relationship"],
                [
                  "Engagement Options",
                  "Direct PO · Fixed-price · Monthly retainer · Sole-source justification · Cooperative purchasing subcontract",
                ],
                [
                  "Cooperative Purchasing",
                  "Available via Sourcewell, OMNIA Partners, TIPS, and NASPO ValuePoint primes — vehicle identification during Discovery",
                ],
                ["Geographic Service Area", "United States · Remote primary · On-site as needed"],
                ["Conflict-of-Interest", "Reviewed during Discovery prior to any binding scope"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-[#e0e3eb]">
                  <td className="py-1.5 pr-4 font-bold text-[#0a3a5c] align-top whitespace-nowrap">
                    {k}
                  </td>
                  <td className="py-1.5 text-[#1a1f33]">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── Principal Bio ── */}
        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-[11px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-3">
            Principal · Loren Cossette
          </h2>
          <p className="text-[13px] text-[#1a1f33] leading-relaxed mb-3">
            Currently the embedded AI lead for Multnomah County, Oregon. PhD
            candidate in Leadership & Program Evaluation. M.S. Organizational
            Development. M.A. Psychology. Prosci-certified Change Practitioner.
            SHRM-SCP. SAFe Agilist. Twenty-year U.S. Air Force career
            culminating at E-9 (top 1% of enlisted leadership), including
            Distinguished Graduate of the Senior Noncommissioned Officer
            Academy, 19th Air Force First Sergeant of the Year (2016), and Air
            Force Materiel Command Noncommissioned Officer of the Year (2013).
            Five peer-reviewed AI publications. Executive AI training engagements
            at UT Austin and Johns Hopkins.
          </p>
        </section>

        {/* ── Contact ── */}
        <section className="mb-4 pt-6 border-t-[3px] border-[#0a3a5c]">
          <h2 className="text-[11px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-3">
            Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1.5 text-[13px] text-[#1a1f33]">
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-[#0a3a5c]" />
              <span>loren.cossette@evolviqtx.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-[#0a3a5c]" />
              <span>210.836.4789</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={13} className="text-[#0a3a5c]" />
              <span>lorencossette.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin size={13} className="text-[#0a3a5c]" />
              <span>linkedin.com/in/loren-cossette</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-[#0a3a5c]" />
              <span>San Antonio, Texas, United States</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-[#0a3a5c]" />
              <span>Book a working session via the website</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-[#e0e3eb] text-[10px] text-[#4a5063] flex justify-between flex-wrap gap-2">
          <span>© 2026 Cossette Consulting LLC · Texas LLC</span>
          <span>Capability Statement · Revised June 2026</span>
        </footer>
      </main>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          html,
          body {
            background: white !important;
            color: #0a0a0f !important;
          }
          .capability-page {
            background: white !important;
          }
          .cap-statement-doc {
            max-width: 100% !important;
            padding: 0 !important;
          }
          a {
            color: inherit !important;
            text-decoration: none !important;
          }
          @page {
            size: letter;
            margin: 0.5in;
          }
        }
      `}</style>

      <Reveal>
        <div className="no-print max-w-[850px] mx-auto px-12 pb-16 -mt-8 text-center">
          <p className="text-xs text-text-muted font-mono mb-4">
            Save as PDF using your browser&apos;s print dialog → Destination: Save as PDF
          </p>
        </div>
      </Reveal>
    </div>
  );
}
