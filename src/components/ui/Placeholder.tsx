import { cn } from "@/lib/utils";
import { User, Code, Image, MapPin, Building2 } from "lucide-react";

interface PlaceholderProps {
  type: "headshot" | "project" | "portrait" | "logo" | "map";
  label?: string;
  className?: string;
}

const icons = {
  headshot: User,
  project: Code,
  portrait: Image,
  logo: Building2,
  map: MapPin,
};

export function Placeholder({ type, label, className }: PlaceholderProps) {
  const Icon = icons[type];

  if (type === "headshot") {
    return (
      <div
        className={cn(
          "w-[180px] h-[180px] rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-accent-cyan/10 to-bg-tertiary",
          "border-2 border-accent-cyan/20",
          "shadow-[0_0_40px_rgba(0,255,255,0.1)]",
          "animate-[glow-pulse_4s_ease-in-out_infinite]",
          className
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Icon size={40} className="text-accent-cyan/40" />
          <span className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
            {label || "Photo"}
          </span>
        </div>
      </div>
    );
  }

  if (type === "portrait") {
    return (
      <div
        className={cn(
          "w-full aspect-[3/4] rounded-xl flex items-center justify-center",
          "bg-gradient-to-br from-accent-cyan/5 to-bg-tertiary",
          "border border-dashed border-border-accent",
          className
        )}
      >
        <div className="flex flex-col items-center gap-3">
          <Icon size={48} className="text-accent-cyan/30" />
          <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
            {label || "Portrait"}
          </span>
        </div>
      </div>
    );
  }

  if (type === "project") {
    return (
      <div
        className={cn(
          "w-full aspect-video rounded-lg flex items-center justify-center relative overflow-hidden",
          "bg-gradient-to-br from-bg-secondary to-bg-tertiary",
          "border border-dashed border-border-default",
          className
        )}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative flex flex-col items-center gap-3">
          <Icon size={32} className="text-accent-cyan/30" />
          <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
            {label || "Screenshot"}
          </span>
        </div>
      </div>
    );
  }

  if (type === "logo") {
    return (
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          "bg-bg-tertiary border border-border-default",
          "font-mono text-sm text-text-muted font-bold",
          className
        )}
      >
        {label?.[0] || "?"}
      </div>
    );
  }

  // map
  return (
    <div
      className={cn(
        "w-full aspect-video rounded-xl flex items-center justify-center relative overflow-hidden",
        "bg-gradient-to-br from-bg-secondary to-bg-tertiary",
        "border border-dashed border-border-default",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3">
        <Icon size={32} className="text-accent-cyan/30" />
        <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
          {label || "San Antonio, TX"}
        </span>
      </div>
    </div>
  );
}
