"use client";

import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { personal } from "@/data/personal";
import { Mail, Linkedin, ExternalLink } from "lucide-react";

export function FooterCTA() {
  return (
    <section className="py-32 lg:py-40 text-center px-6 md:px-8 bg-bg-elevated">
      <Reveal>
        <div className="h-px bg-gradient-to-r from-transparent via-accent-warm/30 to-transparent max-w-[200px] mx-auto mb-10" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-text-primary">
          Let&apos;s build something{" "}
          <span className="text-accent-cyan">extraordinary</span>
        </h2>
        <p className="text-text-secondary max-w-lg mx-auto mb-10 text-base md:text-lg leading-relaxed">
          Open to senior AI engineering, principal architect, and strategic AI
          leadership roles.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button href={`mailto:${personal.email}`}>
            <Mail size={16} /> Get in Touch
          </Button>
          <Button
            variant="secondary"
            href={personal.social[0].url}
            external
          >
            <Linkedin size={16} /> Connect on LinkedIn{" "}
            <ExternalLink size={12} className="opacity-40" />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
