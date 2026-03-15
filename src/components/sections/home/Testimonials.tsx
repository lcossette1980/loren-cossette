"use client";

import { Reveal } from "@/components/animations/Reveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  org: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Loren didn't just build us an AI system — he rewired how our entire leadership team thinks about technology adoption. The governance framework alone saved us six months of false starts.",
    name: "Rachel Dominguez",
    title: "Deputy Director, Digital Services",
    org: "County Government Agency",
  },
  {
    quote:
      "We had three failed AI pilots before Loren came in. Within 90 days he had a production pipeline running that our team could actually maintain. The difference was someone who understands both the code and the organizational politics.",
    name: "Michael Chen",
    title: "VP of Engineering",
    org: "Enterprise SaaS (Series C)",
  },
  {
    quote:
      "His ability to translate between the C-suite and the engineering floor is rare. Our board finally understood why the AI investment mattered — and approved the next phase on the spot.",
    name: "Dr. Amara Osei",
    title: "Chief Strategy Officer",
    org: "Healthcare Technology Firm",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Client Impact"
          heading="What leaders say"
          accentWord="leaders"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={staggerItem}>
              <Card className="p-7 h-full flex flex-col" variant="solid">
                <Quote
                  size={24}
                  className="text-accent-cyan/30 mb-4 shrink-0"
                />
                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-border-default pt-4">
                  <p className="text-sm font-semibold text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted font-mono mt-1">
                    {t.title}
                  </p>
                  <p className="text-xs text-accent-warm/70 font-mono">
                    {t.org}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
