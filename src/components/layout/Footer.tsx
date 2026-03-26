import Link from "next/link";
import { personal } from "@/data/personal";
import { navItems, secondaryNavItems } from "@/data/navigation";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const seoKeywords = [
  { label: "AI Consulting", href: "/consulting" },
  { label: "AI Strategy", href: "/consulting" },
  { label: "AI Systems Design & Build", href: "/projects" },
  { label: "RAG Systems", href: "/projects/ai-commander" },
  { label: "Agentic AI", href: "/projects/ai-commander" },
  { label: "AI Automation", href: "/projects/wcag-remediation" },
  { label: "AI Governance", href: "/consulting" },
  { label: "WCAG Compliance", href: "/projects/wcag-triage" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary/50">
      <div className="site-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div>
            <p className="font-mono text-sm tracking-[3px] text-accent-warm font-medium mb-4">
              LC
            </p>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {personal.tagline}
            </p>
          </div>

          {/* Primary nav */}
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

          {/* Resources (secondary nav) */}
          <div>
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-4">
              Resources
            </p>
            <div className="flex flex-col gap-2">
              {secondaryNavItems.map((item) => (
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

          {/* Expertise (SEO keyword links) */}
          <div>
            <p className="font-mono text-[11px] tracking-[2px] uppercase text-text-muted mb-4">
              Expertise
            </p>
            <div className="flex flex-col gap-2">
              {seoKeywords.map((kw) => (
                <Link
                  key={kw.label}
                  href={kw.href}
                  className="text-text-secondary text-sm hover:text-accent-cyan transition-colors"
                >
                  {kw.label}
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
            &copy; {new Date().getFullYear()} Loren Cossette &middot; Applied AI Strategist, Architect &amp; Builder
          </p>
          <p className="font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
            San Antonio, TX &middot; Available Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
