"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { staggerItem } from "@/components/animations/variants";
import { techStack } from "@/data/skills";

export function TechShowcase() {
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Technology"
          heading="The stack I ship with"
          accentWord="ship"
          center
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-14">
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
