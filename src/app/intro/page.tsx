"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import {
  Printer,
  ArrowLeft,
  Calendar,
  Mail,
  Globe,
  Linkedin,
  CheckCircle2,
} from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

export default function IntroOnePagerPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="intro-page bg-white text-[#0a0a0f] min-h-screen">
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

      {/* One-pager content */}
      <main className="intro-doc max-w-[850px] mx-auto px-12 py-12 print:p-0 print:max-w-none">
        {/* Header */}
        <header className="border-b-[3px] border-[#0a3a5c] pb-4 mb-6 print:break-inside-avoid">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex items-start gap-4">
              <Image
                src="/images/logo-mark.png"
                alt=""
                width={56}
                height={56}
                className="rounded-md shrink-0"
                aria-hidden="true"
              />
              <div>
                <h1 className="text-2xl font-bold text-[#0a0a0f] tracking-tight mb-1">
                  Loren Cossette
                </h1>
                <p className="text-sm text-[#0a3a5c] font-semibold">
                  AI Program Architect · Embedded AI Lead for Public-Sector
                  Modernization
                </p>
                <p className="text-xs text-[#4a5063] font-mono mt-1">
                  Cossette Consulting LLC · Texas LLC · San Antonio, TX
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-[#4a5063] font-mono">
              <p>lorencossette.com</p>
              <p>linkedin.com/in/loren-cossette</p>
              <p>210.836.4789</p>
            </div>
          </div>
        </header>

        {/* What I do — single paragraph */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-[10px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-2">
            What I Do
          </h2>
          <p className="text-[13px] text-[#1a1f33] leading-relaxed">
            I become your agency&apos;s embedded AI lead. Not a vendor flying in
            and out — one accountable principal who architects the systems,
            writes the code, captures institutional knowledge before retiring
            staff walk out the door, builds stakeholder hubs that keep
            leadership confident, and ships features weekly. By the end of an
            engagement your team runs it; documentation and handoff are the
            deliverable, not an afterthought.
          </p>
        </section>

        {/* Proof — Multco program */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-[10px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-2">
            Proof of Work · Multnomah County AI Program
          </h2>
          <p className="text-[13px] text-[#1a1f33] leading-relaxed mb-3">
            Currently embedded as the AI lead for Multnomah County, Oregon,
            running five concurrent production initiatives with a dated public
            delivery record at{" "}
            <span className="text-[#0a3a5c] font-semibold">
              multco-presentations.web.app
            </span>{" "}
            — any procurement officer can verify the velocity in 60 seconds.
          </p>

          <table className="w-full text-[12px] border-collapse">
            <tbody>
              <tr className="border-b border-[#e0e3eb]">
                <td className="py-1.5 pr-3 font-bold text-[#0a3a5c] whitespace-nowrap align-top">
                  A11yReady
                </td>
                <td className="py-1.5 text-[#1a1f33]">
                  30s PDF→HTML · 95%+ WCAG 2.1 AA · 34 doc clusters · 734
                  automated tests · ADA Title II ready
                </td>
              </tr>
              <tr className="border-b border-[#e0e3eb]">
                <td className="py-1.5 pr-3 font-bold text-[#0a3a5c] whitespace-nowrap align-top">
                  File Intelligence
                </td>
                <td className="py-1.5 text-[#1a1f33]">
                  Nightly audit of 56.5K files · 9.9K pages · 30 departments ·
                  92.3% agreement vs independent Xingwu audit
                </td>
              </tr>
              <tr className="border-b border-[#e0e3eb]">
                <td className="py-1.5 pr-3 font-bold text-[#0a3a5c] whitespace-nowrap align-top">
                  Testing Platform
                </td>
                <td className="py-1.5 text-[#1a1f33]">
                  6-agent system for legacy modernization · 9,420 indexed
                  symbols · multi-tenant from day one
                </td>
              </tr>
              <tr className="border-b border-[#e0e3eb]">
                <td className="py-1.5 pr-3 font-bold text-[#0a3a5c] whitespace-nowrap align-top">
                  UCR Modernization
                </td>
                <td className="py-1.5 text-[#1a1f33]">
                  Behavioral test capture from retiring SMEs · 704 sessions ·
                  208 Playwright tests · behavioral acceptance contract
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-3 font-bold text-[#0a3a5c] whitespace-nowrap align-top">
                  IN1 Workflow
                </td>
                <td className="py-1.5 text-[#1a1f33]">
                  Engagement proposal (restricted)
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-[10px] text-[#4a5063] italic mt-2 leading-relaxed">
            Project descriptions reflect Loren Cossette&apos;s professional work
            and do not imply endorsement by Multnomah County.
          </p>
        </section>

        {/* Engagement options */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-[10px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-2">
            Three Engagement Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px]">
            <div className="border-l-2 border-[#0a3a5c] pl-3">
              <p className="font-bold text-[#0a0a0f] text-[13px]">
                01 · Discovery
              </p>
              <p className="text-[10px] text-[#4a5063] font-mono mb-1">
                2-3 wks · $8K-$15K fixed
              </p>
              <p className="text-[#1a1f33] leading-snug">
                Assessment, opportunity map, recommended roadmap. Honest answer
                if it&apos;s not the right fit.
              </p>
            </div>
            <div className="border-l-2 border-[#0a3a5c] pl-3 bg-[#f0f4f8] -ml-px py-2">
              <p className="font-bold text-[#0a0a0f] text-[13px]">
                02 · Embedded Lead{" "}
                <span className="text-[9px] bg-[#0a3a5c] text-white px-1.5 py-0.5 rounded ml-1">
                  FLAGSHIP
                </span>
              </p>
              <p className="text-[10px] text-[#4a5063] font-mono mb-1">
                12-24 wks min · $25K-$40K/mo
              </p>
              <p className="text-[#1a1f33] leading-snug">
                Own the program end-to-end. Same role I fill at Multnomah
                County.
              </p>
            </div>
            <div className="border-l-2 border-[#0a3a5c] pl-3">
              <p className="font-bold text-[#0a0a0f] text-[13px]">
                03 · Build Sprint
              </p>
              <p className="text-[10px] text-[#4a5063] font-mono mb-1">
                4-10 wks · $30K-$80K fixed
              </p>
              <p className="text-[#1a1f33] leading-snug">
                Specific system architected, built, deployed, documented.
              </p>
            </div>
          </div>
        </section>

        {/* How to contract */}
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-[10px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-2">
            How to Contract With Me
          </h2>
          <table className="w-full text-[12px] border-collapse">
            <tbody>
              {[
                ["Entity", "Cossette Consulting LLC · Texas Domestic LLC"],
                ["Federal EIN", "92-1502035"],
                ["TX SOS File", "0804858459 · ACTIVE"],
                [
                  "NAICS",
                  "541511 · 541512 · 541618 · 541690 · 611430",
                ],
                [
                  "Procurement Paths",
                  "Direct PO · Fixed-price · Retainer · Sole-source · Cooperative purchasing (Sourcewell, OMNIA, TIPS, NASPO primes)",
                ],
                [
                  "Insurance",
                  "GL · Professional E&O · Cyber Liability — Certificates available on request",
                ],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-[#e0e3eb] last:border-b-0">
                  <td className="py-1 pr-3 font-bold text-[#0a3a5c] align-top whitespace-nowrap">
                    {k}
                  </td>
                  <td className="py-1 text-[#1a1f33]">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Next step */}
        <section className="mb-2 pt-3 border-t-[3px] border-[#0a3a5c] print:break-inside-avoid">
          <h2 className="text-[10px] font-mono tracking-[2px] uppercase text-[#0a3a5c] font-bold mb-2">
            Next Step
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px] text-[#1a1f33]">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#0a3a5c] shrink-0 mt-0.5" />
              <span>
                <span className="font-bold">30-minute working session</span> —
                not a sales pitch. Map what you&apos;re trying to solve. Get a
                written summary you can forward internally.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#0a3a5c] shrink-0 mt-0.5" />
              <span>
                <span className="font-bold">Full capability statement</span>{" "}
                with detailed past performance, security & data handling at
                lorencossette.com/capability-statement
              </span>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-5 pt-3 border-t border-[#e0e3eb]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1.5 text-[11px] text-[#1a1f33]">
            <div className="flex items-center gap-1.5">
              <Mail size={11} className="text-[#0a3a5c]" />
              <span>loren.cossette@evolviqtx.com</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={11} className="text-[#0a3a5c]" />
              <span>Book via website</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe size={11} className="text-[#0a3a5c]" />
              <span>lorencossette.com</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Linkedin size={11} className="text-[#0a3a5c]" />
              <span>linkedin.com/in/loren-cossette</span>
            </div>
          </div>
        </section>

        <footer className="mt-4 text-[9px] text-[#4a5063] flex justify-between flex-wrap gap-1">
          <span>© 2026 Cossette Consulting LLC · Texas LLC · EIN 92-1502035</span>
          <span>One-pager · Revised June 2026</span>
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
          .intro-page {
            background: white !important;
          }
          .intro-doc {
            max-width: 100% !important;
            padding: 0 !important;
          }
          a {
            color: inherit !important;
            text-decoration: none !important;
          }
          @page {
            size: letter;
            margin: 0.4in;
          }
        }
      `}</style>

      <Reveal>
        <div className="no-print max-w-[850px] mx-auto px-12 pb-16 -mt-8 text-center">
          <p className="text-xs text-text-muted font-mono mb-4">
            Save as PDF using your browser&apos;s print dialog → Destination:
            Save as PDF
          </p>
        </div>
      </Reveal>
    </div>
  );
}
