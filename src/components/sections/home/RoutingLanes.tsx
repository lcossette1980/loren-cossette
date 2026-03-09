"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowRight, Briefcase, FolderOpen, User } from "lucide-react";
import { analytics } from "@/lib/analytics";

const lanes = [
  {
    icon: Briefcase,
    title: "Work With Me",
    description:
      "Consulting, strategy, architecture, and AI transformation for governments and enterprises.",
    href: "/consulting",
    key: "consulting",
  },
  {
    icon: FolderOpen,
    title: "See What I\u2019ve Built",
    description:
      "Production case studies with real outcomes — compliance automation, RAG systems, agentic workflows.",
    href: "/projects",
    key: "projects",
  },
  {
    icon: User,
    title: "About Loren",
    description:
      "Military leadership, doctoral research, academic teaching, and a decade of deploying AI systems.",
    href: "/about",
    key: "about",
  },
];

export function RoutingLanes() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lanes.map((lane, i) => {
            const Icon = lane.icon;
            return (
              <Reveal key={lane.key} delay={i * 0.1}>
                <Link
                  href={lane.href}
                  onClick={() => analytics.routingLane(lane.key)}
                  className="block h-full"
                >
                  <motion.div
                    className="relative bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-7 h-full group overflow-hidden"
                    whileHover={{
                      y: -4,
                      borderColor: "rgba(0,255,255,0.25)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Top accent bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-5">
                      <Icon size={18} className="text-accent-cyan" />
                    </div>

                    <h3 className="font-bold text-text-primary text-base mb-2">
                      {lane.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {lane.description}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-accent-cyan/70 text-xs font-mono group-hover:text-accent-cyan group-hover:gap-2.5 transition-all">
                      Explore <ArrowRight size={12} />
                    </span>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
