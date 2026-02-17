"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  primary:
    "bg-accent-cyan text-[#0a0a0f] font-bold hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]",
  secondary:
    "bg-[rgba(13,17,23,0.6)] backdrop-blur-xl border border-border-accent text-text-primary hover:border-accent-cyan/40 hover:bg-[rgba(22,27,34,0.8)]",
  ghost:
    "bg-transparent text-text-secondary hover:text-accent-cyan",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-sm gap-2.5",
  lg: "px-8 py-4 text-base gap-3",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg font-sans font-semibold transition-all duration-300 tracking-wide",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  );
}
