"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { personal } from "@/data/personal";
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Send } from "lucide-react";

const CONTACT_EMAIL = "lorentcossette@gmail.com";

export default function ContactPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value ?? "";
    const fromEmail = emailRef.current?.value ?? "";
    const subject = subjectRef.current?.value ?? "General Inquiry";
    const message = messageRef.current?.value ?? "";

    const body = `${message}\n\n—\nFrom: ${name}\nEmail: ${fromEmail}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <SectionHeading
          label="Contact"
          heading="Let's build something extraordinary"
          accentWord="extraordinary"
          description="Open to senior AI engineering, principal architect, and strategic AI leadership roles."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {/* Contact Form */}
          <Reveal>
            <Card className="p-8">
              <h3 className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-6">
                Send a Message
              </h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs text-text-muted font-mono mb-2">
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/40 focus:shadow-[0_0_12px_rgba(0,255,255,0.08)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted font-mono mb-2">
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/40 focus:shadow-[0_0_12px_rgba(0,255,255,0.08)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted font-mono mb-2">
                    Subject
                  </label>
                  <select
                    ref={subjectRef}
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-4 py-3 text-sm text-text-secondary focus:outline-none focus:border-accent-cyan/40 transition-all"
                  >
                    <option>AI Engineering</option>
                    <option>Consulting</option>
                    <option>Speaking</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-text-muted font-mono mb-2">
                    Message
                  </label>
                  <textarea
                    ref={messageRef}
                    rows={4}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/40 focus:shadow-[0_0_12px_rgba(0,255,255,0.08)] transition-all resize-none"
                  />
                </div>
                <Button className="w-full">
                  <Send size={16} /> Send Message
                </Button>
                <p className="text-[10px] text-text-muted font-mono text-center">
                  Opens your email client with your message pre-filled.
                </p>
              </form>
            </Card>
          </Reveal>

          {/* Contact Info */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <Card className="p-8">
                <h3 className="font-mono text-[11px] tracking-[2px] uppercase text-accent-warm mb-6">
                  Direct Contact
                </h3>
                <div className="space-y-5">
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-center gap-4 text-text-secondary hover:text-accent-cyan transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent-warm/10 border border-accent-warm/20 flex items-center justify-center group-hover:bg-accent-warm/20 transition-colors">
                      <Mail size={16} className="text-accent-warm" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted font-mono">Email</p>
                      <p className="text-sm font-medium">{personal.email}</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 text-text-secondary">
                    <div className="w-10 h-10 rounded-lg bg-accent-warm/10 border border-accent-warm/20 flex items-center justify-center">
                      <Phone size={16} className="text-accent-warm" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted font-mono">Phone</p>
                      <p className="text-sm font-medium">{personal.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-text-secondary">
                    <div className="w-10 h-10 rounded-lg bg-accent-warm/10 border border-accent-warm/20 flex items-center justify-center">
                      <MapPin size={16} className="text-accent-warm" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted font-mono">Location</p>
                      <p className="text-sm font-medium">{personal.location}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border-default mt-6 pt-6">
                  <p className="text-xs text-text-muted font-mono mb-3">
                    Social
                  </p>
                  <div className="flex gap-3">
                    {personal.social.map((s) => (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary border border-border-default text-text-secondary text-sm font-mono hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
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
              </Card>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-glass-border">
                <Image
                  src="/images/contact-map.png"
                  alt="San Antonio, TX"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
