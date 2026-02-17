import Link from "next/link";
import { personal } from "@/data/personal";
import { navItems } from "@/data/navigation";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary/50">
      <div className="site-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-mono text-sm tracking-[3px] text-accent-warm font-medium mb-4">
              LC
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {personal.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-text-secondary text-sm hover:text-accent-cyan transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-text-secondary text-sm hover:text-accent-cyan transition-colors"
              >
                <Mail size={14} /> {personal.email}
              </a>
              {personal.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-secondary text-sm hover:text-accent-cyan transition-colors"
                >
                  {s.platform === "LinkedIn" ? (
                    <Linkedin size={14} />
                  ) : (
                    <Github size={14} />
                  )}
                  {s.platform}
                  <ExternalLink size={10} className="opacity-40" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-default flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
            Designed & Engineered by Loren Cossette &middot; {new Date().getFullYear()}
          </p>
          <p className="font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
            Built with Next.js &middot; Tailwind &middot; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
