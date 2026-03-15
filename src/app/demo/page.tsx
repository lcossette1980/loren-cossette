"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mail, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { ScenarioSelector } from "@/components/demo/ScenarioSelector";
import { AssessmentInput } from "@/components/demo/AssessmentInput";
import { AssessmentResults } from "@/components/demo/AssessmentResults";
import { ArchitectureExplainer } from "@/components/demo/ArchitectureExplainer";
import { demoScenarios } from "@/data/demo-scenarios";
import { trackEvent } from "@/lib/analytics";
import type { AssessmentState, DemoScenario } from "@/types/demo";

const initialState: AssessmentState = {
  status: "idle",
  domainAnalysis: null,
  strategicSynthesis: null,
  synthesisPartialText: "",
  error: null,
  remainingRequests: null,
};

export default function DemoPage() {
  const [description, setDescription] = useState("");
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [state, setState] = useState<AssessmentState>(initialState);
  const abortRef = useRef<AbortController | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const handleScenarioSelect = useCallback((scenario: DemoScenario) => {
    setSelectedScenario(scenario.id);
    setDescription(scenario.fullDescription);
    trackEvent("demo_scenario_select", { scenario: scenario.id });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (description.length < 50) return;

    // Abort any in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setState({
      status: "analyzing",
      domainAnalysis: null,
      strategicSynthesis: null,
      synthesisPartialText: "",
      error: null,
      remainingRequests: state.remainingRequests,
    });

    trackEvent("demo_start", {
      scenario: selectedScenario || "custom",
      inputLength: description.length,
    });

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);

    try {
      const response = await fetch("/api/demo/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const err = await response.json();
        setState((prev) => ({
          ...prev,
          status: "error",
          error: err.error || "Something went wrong.",
        }));
        return;
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let sseBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        sseBuffer += decoder.decode(value, { stream: true });

        // SSE messages are delimited by double newlines — only
        // process complete messages to avoid split-chunk JSON failures
        const messages = sseBuffer.split("\n\n");
        // Keep the last element (may be incomplete)
        sseBuffer = messages.pop() || "";

        for (const msg of messages) {
          const dataLine = msg
            .split("\n")
            .find((l) => l.startsWith("data: "));
          if (!dataLine) continue;

          try {
            const payload = JSON.parse(dataLine.slice(6));

            if (payload.stage === "analyzing") {
              setState((prev) => ({ ...prev, status: "analyzing" }));
            }

            if (payload.stage === "domains_complete") {
              setState((prev) => ({
                ...prev,
                status: "synthesizing",
                domainAnalysis: payload.domainAnalysis,
              }));
            }

            if (payload.stage === "synthesizing") {
              setState((prev) => ({ ...prev, status: "synthesizing" }));
            }

            if (payload.stage === "complete") {
              setState((prev) => ({
                ...prev,
                status: "complete",
                strategicSynthesis: payload.strategicSynthesis,
                remainingRequests: payload.remaining ?? prev.remainingRequests,
              }));
              trackEvent("demo_complete", {
                scenario: selectedScenario || "custom",
              });
            }

            if (payload.stage === "error") {
              setState((prev) => ({
                ...prev,
                status: "error",
                error: payload.error,
              }));
            }
          } catch {
            // Skip malformed SSE lines
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setState((prev) => ({
        ...prev,
        status: "error",
        error: "Network error. Please try again.",
      }));
    }
  }, [description, selectedScenario, state.remainingRequests]);

  const isRunning = state.status === "analyzing" || state.status === "synthesizing";

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* ── Hero ── */}
        <SectionHeading
          label="Interactive AI System Demo"
          heading="How ready is your organization for AI?"
          accentWord="ready"
          description="Describe your organization's AI situation and receive a structured leadership readiness assessment — powered by a multi-model pipeline using GPT-4o for structured analysis and Claude for strategic synthesis."
        />

        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-2 mt-6">
            <Badge variant="accent">AILCM Framework</Badge>
            <Badge>12 Subdimensions</Badge>
            <Badge>Multi-Model Pipeline</Badge>
            <Badge>GPT-4o + Claude</Badge>
          </div>
        </Reveal>

        {/* ── Input Area ── */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Scenarios + Input */}
          <div className="lg:col-span-3">
            <Reveal>
              <ScenarioSelector
                scenarios={demoScenarios}
                selected={selectedScenario}
                onSelect={handleScenarioSelect}
                disabled={isRunning}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <AssessmentInput
                value={description}
                onChange={(val) => {
                  setDescription(val);
                  if (selectedScenario) setSelectedScenario(null);
                }}
                onSubmit={handleSubmit}
                disabled={isRunning}
                remaining={state.remainingRequests}
              />
            </Reveal>
          </div>

          {/* Right: Architecture Explainer */}
          <div className="lg:col-span-2">
            <Reveal delay={0.2}>
              <ArchitectureExplainer />
            </Reveal>
          </div>
        </div>

        {/* ── Results ── */}
        <div ref={resultsRef}>
          <AssessmentResults state={state} />
        </div>

        {/* ── CTA ── */}
        {state.status === "complete" && (
          <Reveal>
            <div className="mt-20 py-16 border-t border-border-subtle">
              <div className="text-center max-w-2xl mx-auto">
                <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-4">
                  Go Deeper
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                  Want the full assessment?
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  This demo shows a simplified version of what a full AILCM
                  assessment reveals. A consulting engagement includes
                  stakeholder interviews, detailed scoring across all 12
                  subdimensions, and a custom transformation roadmap.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="primary" href="/contact">
                    <Mail size={16} />
                    Book a Discovery Call
                  </Button>
                  <Button variant="secondary" href="/override">
                    <BookOpen size={16} />
                    Learn About OVERRIDE
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
