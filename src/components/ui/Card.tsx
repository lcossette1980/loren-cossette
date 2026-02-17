"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "glass" | "solid" | "outline" | "glow";
  hover?: boolean;
  onClick?: () => void;
}

const variantStyles = {
  glass:
    "bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-border-subtle",
  solid:
    "bg-bg-tertiary border border-border-default",
  outline:
    "bg-transparent border border-border-subtle",
  glow:
    "bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-border-accent",
};

export function Card({
  children,
  className,
  variant = "glass",
  hover = true,
  onClick,
}: CardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl transition-all duration-400",
        variantStyles[variant],
        hover &&
          "hover:bg-[rgba(22,27,34,0.8)] hover:border-accent-cyan/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.05)]",
        onClick && "cursor-pointer",
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
