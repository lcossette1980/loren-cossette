import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

const variantStyles = {
  default:
    "bg-bg-tertiary border-border-default text-text-secondary",
  accent:
    "bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan",
  outline:
    "bg-transparent border-border-default text-text-secondary",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] px-3 py-1 rounded font-mono border whitespace-nowrap",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
