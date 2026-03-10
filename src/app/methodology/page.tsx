"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/animations/Reveal";
import {
  ChevronDown,
  FolderOpen,
  FileCode2,
  RotateCcw,
  Workflow,
  AlertCircle,
} from "lucide-react";
import {
  workflowPhases,
  folderStructure,
  retroQuestions,
} from "@/data/workflow";

type Tab = "workflow" | "structure" | "retro";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "workflow", label: "Workflow", icon: <Workflow size={14} /> },
  { key: "structure", label: "Project Structure", icon: <FolderOpen size={14} /> },
  { key: "retro", label: "Weekly Retro", icon: <RotateCcw size={14} /> },
];

/* ── Phase accordion item ── */
function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof workflowPhases)[0];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 0.06}>
      <div className="relative pl-8 mb-3">
        {/* Timeline connector */}
        <div className="absolute left-0 top-7 flex flex-col items-center">
          <div
            className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
              open
                ? "bg-accent-cyan border-accent-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]"
                : "bg-bg-tertiary border-border-default"
            }`}
          />
          {index < workflowPhases.length - 1 && (
            <div className="w-px h-full bg-border-default mt-1" />
          )}
        </div>

        {/* Card */}
        <Card
          className={`overflow-hidden transition-all duration-300 ${
            open ? "border-accent-cyan/20" : ""
          }`}
        >
          {/* Header — clickable */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center gap-4 p-5 text-left"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-all duration-300 ${
                open
                  ? "bg-accent-cyan text-[#0a0a0f]"
                  : "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
              }`}
            >
              {phase.number}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-text-primary text-base">
                {phase.title}
              </h3>
              <p className="font-mono text-[11px] text-text-muted truncate">
                {phase.subtitle}
              </p>
            </div>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
            >
              <ChevronDown size={16} className="text-text-muted" />
            </motion.div>
          </button>

          {/* Body — collapsible */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0">
                  <div className="pl-14">
                    <p className="text-sm text-text-secondary leading-relaxed mb-5">
                      {phase.summary}
                    </p>

                    {/* Items */}
                    <div className="space-y-3">
                      {phase.items.map((item) => (
                        <div key={item.label} className="group">
                          <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan/50 shrink-0 mt-2" />
                            <div>
                              <p className="text-sm font-semibold text-text-primary">
                                {item.label}
                              </p>
                              <p className="text-xs text-text-secondary leading-relaxed mt-1">
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Callout */}
                    <div className="mt-5 flex items-start gap-3 p-3.5 rounded-lg bg-accent-cyan/5 border border-accent-cyan/10">
                      <AlertCircle
                        size={14}
                        className="text-accent-cyan shrink-0 mt-0.5"
                      />
                      <p className="text-xs text-text-secondary leading-relaxed italic">
                        {phase.callout}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </Reveal>
  );
}

export default function MethodologyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("workflow");

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Solo Engineer Playbook"
          heading="The AI automation engineer workflow"
          accentWord="workflow"
          description="Seven phases from idea to production. A codified methodology built from deploying AI systems in the real world."
        />

        {/* Tab bar */}
        <Reveal>
          <div className="flex gap-1 mt-10 mb-10 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl p-1 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Workflow Tab ── */}
        {activeTab === "workflow" && (
          <div>
            {workflowPhases.map((phase, i) => (
              <PhaseCard key={phase.number} phase={phase} index={i} />
            ))}

            {/* Bottom quote */}
            <Reveal delay={0.3}>
              <Card className="mt-8 p-8 text-center">
                <p className="text-sm text-text-secondary italic leading-relaxed max-w-lg mx-auto">
                  &ldquo;The best solo AI automation engineers aren&apos;t the
                  ones who write the most code. They&apos;re the ones who make
                  the{" "}
                  <span className="text-accent-cyan font-semibold not-italic">
                    fewest decisions they have to reverse.
                  </span>
                  &rdquo;
                </p>
              </Card>
            </Reveal>
          </div>
        )}

        {/* ── Project Structure Tab ── */}
        {activeTab === "structure" && (
          <Reveal>
            <Card className="p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <FolderOpen size={16} className="text-accent-cyan" />
                </div>
                <h3 className="font-bold text-text-primary text-base">
                  Recommended Project Structure
                </h3>
              </div>

              <div className="bg-bg-tertiary rounded-xl p-5 border border-border-default font-mono text-[12px] leading-[2]">
                {folderStructure.map((node, i) => {
                  const isImportant = node.note === "Most important file";
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2"
                      style={{ paddingLeft: node.indent * 22 }}
                    >
                      {node.type === "folder" ? (
                        <FolderOpen
                          size={12}
                          className="text-accent-cyan shrink-0"
                        />
                      ) : (
                        <FileCode2
                          size={12}
                          className="text-accent-warm shrink-0"
                        />
                      )}
                      <span
                        className={`${
                          isImportant
                            ? "text-accent-warm font-bold"
                            : "text-text-primary"
                        }`}
                      >
                        {node.text}
                      </span>
                      {node.note && (
                        <span
                          className={`text-[10px] ${
                            isImportant
                              ? "text-accent-warm font-semibold"
                              : "text-text-muted"
                          }`}
                        >
                          {node.note}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex items-start gap-3 p-3.5 rounded-lg bg-accent-cyan/5 border border-accent-cyan/10">
                <AlertCircle
                  size={14}
                  className="text-accent-cyan shrink-0 mt-0.5"
                />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <span className="text-accent-warm font-bold">
                    DECISIONS.md
                  </span>{" "}
                  — For each entry log the context, options considered, final
                  decision, reasoning, trade-offs, and conditions to revisit.
                </p>
              </div>
            </Card>
          </Reveal>
        )}

        {/* ── Weekly Retro Tab ── */}
        {activeTab === "retro" && (
          <Reveal>
            <Card className="p-7">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <RotateCcw size={16} className="text-accent-cyan" />
                </div>
                <h3 className="font-bold text-text-primary text-base">
                  Weekly Solo Retro
                </h3>
              </div>
              <p className="font-mono text-[11px] text-text-muted mb-6 pl-12">
                15 minutes, non-negotiable. These compound.
              </p>

              <div className="space-y-3">
                {retroQuestions.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-bg-tertiary/50 border border-border-default hover:border-accent-cyan/20 transition-colors"
                  >
                    <div className="w-7 h-6 rounded-md bg-accent-cyan flex items-center justify-center shrink-0">
                      <span className="font-mono text-[10px] font-bold text-[#0a0a0f]">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {q}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 p-3.5 rounded-lg bg-accent-cyan/5 border border-accent-cyan/10">
                <AlertCircle
                  size={14}
                  className="text-accent-cyan shrink-0 mt-0.5"
                />
                <p className="text-xs text-text-secondary leading-relaxed italic">
                  In 6 months, you&apos;ll have built a personal engineering
                  methodology that no one else has.
                </p>
              </div>
            </Card>
          </Reveal>
        )}
      </div>
    </div>
  );
}
