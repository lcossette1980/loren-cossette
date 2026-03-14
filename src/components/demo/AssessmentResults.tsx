"use client";

import { motion } from "framer-motion";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { DomainScoreCard } from "./DomainScoreCard";
import { StrategicSynthesis } from "./StrategicSynthesis";
import { PipelineStatus } from "./PipelineStatus";
import type { AssessmentState } from "@/types/demo";

interface AssessmentResultsProps {
  state: AssessmentState;
}

export function AssessmentResults({ state }: AssessmentResultsProps) {
  const { status, domainAnalysis, strategicSynthesis, error } = state;

  if (status === "idle") return null;

  return (
    <div className="mt-12">
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent mb-8" />

      {/* Pipeline Status */}
      <PipelineStatus status={status} />

      {/* Error State */}
      {status === "error" && error && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Loading Skeleton (Stage 1 in progress) */}
      {status === "analyzing" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-bg-tertiary border border-border-default rounded-xl p-6 animate-pulse"
            >
              <div className="h-5 bg-bg-elevated rounded w-3/4 mb-2" />
              <div className="h-3 bg-bg-elevated rounded w-1/2 mb-4" />
              <div className="h-4 bg-bg-elevated rounded w-full mb-2" />
              <div className="h-4 bg-bg-elevated rounded w-5/6 mb-6" />
              {[0, 1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="h-10 bg-bg-elevated rounded mb-2"
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Domain Analysis Cards (Stage 1 complete) */}
      {domainAnalysis && (
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {domainAnalysis.domains.map((domain) => (
            <motion.div key={domain.domainId} variants={staggerItem}>
              <DomainScoreCard domain={domain} />
            </motion.div>
          ))}
        </StaggerContainer>
      )}

      {/* Synthesis Loading (Stage 2 in progress) */}
      {status === "synthesizing" && !strategicSynthesis && (
        <div className="mt-6 bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-border-accent rounded-xl p-6 animate-pulse">
          <div className="h-5 bg-bg-elevated rounded w-48 mb-4" />
          <div className="h-4 bg-bg-elevated rounded w-full mb-2" />
          <div className="h-4 bg-bg-elevated rounded w-5/6 mb-2" />
          <div className="h-4 bg-bg-elevated rounded w-4/6 mb-6" />
          <div className="h-4 bg-bg-elevated rounded w-full mb-2" />
          <div className="h-4 bg-bg-elevated rounded w-3/4" />
        </div>
      )}

      {/* Strategic Synthesis (Stage 2 complete) */}
      {strategicSynthesis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <StrategicSynthesis synthesis={strategicSynthesis} />
        </motion.div>
      )}
    </div>
  );
}
