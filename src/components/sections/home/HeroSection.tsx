"use client";

import { Suspense, lazy, useState, useEffect } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import {
  MapPin,
  Mail,
  ChevronDown,
  Linkedin,
  Github,
  ExternalLink,
  Download,
  Calendar,
} from "lucide-react";
import { analytics } from "@/lib/analytics";
import { BOOKING_URL } from "@/lib/constants";

const ParticleBackground = lazy(() =>
  import("@/components/particles/ParticleBackground").then((mod) => ({
    default: mod.ParticleBackground,
  }))
);

const HeroGeometry = lazy(() =>
  import("@/components/three/HeroGeometry").then((mod) => ({
    default: mod.HeroGeometry,
  }))
);

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToImpact = () => {
    document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen pt-24 md:pt-28 flex flex-col items-center justify-center overflow-hidden">
      {/* Particle Background */}
      {mounted && (
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      )}

      {/* 3D Geometry */}
      {mounted && (
        <Suspense fallback={null}>
          <HeroGeometry />
        </Suspense>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-6">
        <Reveal delay={0.1}>
          <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm font-medium mb-4">
            {personal.title}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-[-0.02em] mb-6">
            {personal.name.split(" ")[0]}{" "}
            <span className="text-accent-cyan">{personal.name.split(" ")[1]}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-text-primary max-w-xl leading-snug mb-4">
            Your AI initiative is stuck between strategy and reality.{" "}
            <span className="text-accent-cyan">I close that gap.</span>
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed mb-8">
            {personal.tagline}
          </p>
        </Reveal>

        {/* Trust strip — compact on mobile */}
        <Reveal delay={0.35}>
          <div className="flex gap-4 flex-wrap justify-center mb-8 text-[12px] font-mono text-text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-accent-warm/60" /> {personal.location}
            </span>
            <span className="hidden sm:inline text-border-default">·</span>
            <span>Public Sector · Mission-Driven Orgs · High-Stakes Workflows</span>
          </div>
        </Reveal>

        {/* Primary CTAs — clear hierarchy */}
        <Reveal delay={0.4}>
          <div className="flex gap-4 flex-wrap justify-center mb-6">
            <Button
              href={BOOKING_URL}
              external
              onClick={() => analytics.ctaClick("Book a Strategy Call", "hero")}
            >
              <Calendar size={16} /> Book a Strategy Call
            </Button>
            <Button
              variant="secondary"
              href="/projects"
              onClick={() => analytics.ctaClick("Explore Case Studies", "hero")}
            >
              Explore Case Studies
            </Button>
          </div>
        </Reveal>

        {/* Secondary links — visually subordinate */}
        <Reveal delay={0.5}>
          <div className="flex gap-4 items-center justify-center flex-wrap">
            {personal.social.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.externalLink(s.platform, s.url)}
                className="inline-flex items-center gap-1.5 text-text-muted text-[12px] font-mono hover:text-accent-cyan transition-colors"
              >
                {s.platform === "LinkedIn" ? <Linkedin size={13} /> : <Github size={13} />}
                {s.platform}
                <ExternalLink size={10} className="opacity-40" />
              </a>
            ))}
            <span className="text-border-default text-[10px]">|</span>
            <a
              href="/Loren_Cossette_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.resumeDownload()}
              className="inline-flex items-center gap-1.5 text-text-muted text-[12px] font-mono hover:text-accent-cyan transition-colors"
            >
              <Download size={12} />
              Resume
            </a>
            <span className="text-border-default text-[10px]">|</span>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-1.5 text-text-muted text-[12px] font-mono hover:text-accent-cyan transition-colors"
            >
              <Mail size={12} />
              {personal.email}
            </a>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToImpact}
        className="absolute bottom-10 z-10 text-text-muted opacity-50 hover:opacity-100 hover:text-accent-cyan transition-all animate-[float_3s_ease-in-out_infinite]"
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
