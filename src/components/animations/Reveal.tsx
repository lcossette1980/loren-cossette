"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const directions = {
  up: { opacity: 0, y: 40 },
  down: { opacity: 0, y: -40 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  return (
    <motion.div
      initial={directions[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
