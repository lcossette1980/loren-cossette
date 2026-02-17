"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { Reveal } from "@/components/animations/Reveal";
import { techStack, techBarData } from "@/data/skills";

export function TechShowcase() {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Skills & Tech"
          heading="The stack"
          accentWord="stack"
          center
        />

        {/* Skill bars */}
        <Reveal>
          <Card className="p-8 mt-14 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {techBarData.map((skill, i) => (
                <div key={skill.name} className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-text-secondary w-20 shrink-0 text-right">
                    {skill.name}
                  </span>
                  <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.val}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-accent-warm w-8">
                    {skill.val}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        {/* Tech categories */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {techStack.map((cat) => (
            <motion.div key={cat.category} variants={staggerItem}>
              <Card className="p-5 h-full">
                <h4 className="text-xs text-text-primary tracking-wide font-semibold mb-3">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <Badge key={item} variant="outline" className="text-[10px] px-2 py-0.5">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
