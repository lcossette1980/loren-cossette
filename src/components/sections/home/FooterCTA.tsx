"use client";

import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { Calendar, Mail, Linkedin, ExternalLink } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { BOOKING_URL } from "@/lib/constants";

export function FooterCTA() {
  return (
    <section className="py-32 lg:py-40 text-center px-6 md:px-8 bg-bg-elevated">
      <Reveal>
        <div className="h-px bg-gradient-to-r from-transparent via-accent-warm/30 to-transparent max-w-[200px] mx-auto mb-10" />
        <p className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-4">
          Work With Me
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-text-primary">
          Ready to turn your AI ambition into a{" "}
          <span className="text-accent-cyan">working system</span>?
        </h2>
        <p className="text-text-secondary max-w-lg mx-auto mb-10 text-base md:text-lg leading-relaxed">
          Whether you need a strategy, a build, or both — I help organizations
          close the gap between AI ambition and operational reality. Let&apos;s
          talk about what you&apos;re trying to solve.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            href={BOOKING_URL}
            external
            onClick={() => analytics.ctaClick("Book a Strategy Call", "footer")}
          >
            <Calendar size={16} /> Book a Strategy Call
          </Button>
          <Button
            href={`mailto:${personal.email}`}
            variant="secondary"
            onClick={() => analytics.ctaClick("Email Me Directly", "footer")}
          >
            <Mail size={16} /> Email Me Directly
          </Button>
        </div>
        <div className="flex gap-4 justify-center mt-5">
          <a
            href={personal.social[0].url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.externalLink("LinkedIn", personal.social[0].url)}
            className="inline-flex items-center gap-2 text-text-muted text-[12px] font-mono hover:text-accent-cyan transition-colors"
          >
            <Linkedin size={13} /> LinkedIn{" "}
            <ExternalLink size={10} className="opacity-40" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
