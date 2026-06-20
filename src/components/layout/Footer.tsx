import Link from "next/link";
import Image from "next/image";
import { personal } from "@/data/personal";
import { navItems, secondaryNavItems } from "@/data/navigation";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const seoKeywords = [
  { label: "Embedded AI Program Lead", href: "/consulting" },
  { label: "Public-Sector AI", href: "/public-sector" },
  { label: "AI Modernization", href: "/public-sector" },
  { label: "WCAG Document Automation", href: "/projects/a11yready" },
  { label: "Drupal-Aware Site Intelligence", href: "/projects/file-intel" },
  { label: "Multi-Agent Testing Platform", href: "/projects/ai-testing-platform" },
  { label: "Behavioral Knowledge Capture", href: "/projects/ucr-modernization" },
  { label: "Agentic AI", href: "/projects/ai-commander" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary/50">
      <div className="site-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Loren Cossette — Home" className="block mb-5 group">
              <Image
                src="/images/logo.png"
                alt=""
                width={220}
                height={130}
                className="rounded-md group-hover:opacity-95 transition-opacity"
                aria-hidden="true"
              />
            </Link>
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
            &copy; {new Date().getFullYear()} Cossette Consulting LLC &middot; Texas LLC
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center font-mono text-[10px] tracking-[2px] uppercase">
            <Link
              href="/accessibility"
              className="text-text-muted hover:text-accent-cyan transition-colors"
            >
              Accessibility
            </Link>
            <Link
              href="/security"
              className="text-text-muted hover:text-accent-cyan transition-colors"
            >
              Security
            </Link>
            <Link
              href="/capability-statement"
              className="text-text-muted hover:text-accent-cyan transition-colors"
            >
              Capability
            </Link>
            <span className="text-text-muted">
              San Antonio, TX
            </span>
          </div>
        </div>

        {/* Disclaimer band */}
        <div className="mt-6 pt-6 border-t border-border-subtle">
          <p className="font-mono text-[10px] text-text-muted leading-relaxed max-w-3xl mx-auto text-center">
            Project descriptions reflect Loren Cossette&apos;s professional work and do not
            imply endorsement by Multnomah County or any other public agency. All trademarks
            and case-study material are referenced for portfolio purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
