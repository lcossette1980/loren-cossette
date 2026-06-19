"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { analytics } from "@/lib/analytics";

import { personal } from "@/data/personal";

const CONTACT_EMAIL = personal.email;

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();

  // Hide on the contact page itself — redundant there
  if (pathname === "/contact") return null;

  function handleOpen() {
    setOpen(true);
    analytics.contactFormStart();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value ?? "";
    const fromEmail = emailRef.current?.value ?? "";
    const message = messageRef.current?.value ?? "";

    const body = `${message}\n\n—\nFrom: ${name}\nEmail: ${fromEmail}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Website Inquiry")}&body=${encodeURIComponent(body)}`;

    analytics.contactFormSubmit();
    window.location.href = mailto;
    setOpen(false);
  }

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: 1.5 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent-cyan text-[#0a0a0f] flex items-center justify-center shadow-[0_4px_20px_rgba(0,255,255,0.25)] hover:shadow-[0_4px_30px_rgba(0,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Send a message"
          >
            <MessageCircle size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal overlay + panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="floating-contact-title"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-[380px] bg-[rgba(13,17,23,0.97)] backdrop-blur-2xl border border-border-accent rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,255,255,0.05)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-default">
                <div>
                  <h3
                    id="floating-contact-title"
                    className="font-semibold text-text-primary text-sm"
                  >
                    Send a message
                  </h3>
                  <p className="text-[11px] text-text-muted font-mono mt-0.5">
                    Opens your email client
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all"
                  aria-label="Close contact form"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="fc-name"
                    className="block text-[10px] text-text-secondary font-mono mb-1.5 uppercase tracking-wider"
                  >
                    Name <span aria-hidden="true">*</span>
                    <span className="sr-only">required</span>
                  </label>
                  <input
                    ref={nameRef}
                    id="fc-name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_12px_rgba(0,255,255,0.12)] transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="fc-email"
                    className="block text-[10px] text-text-secondary font-mono mb-1.5 uppercase tracking-wider"
                  >
                    Email <span aria-hidden="true">*</span>
                    <span className="sr-only">required</span>
                  </label>
                  <input
                    ref={emailRef}
                    id="fc-email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_12px_rgba(0,255,255,0.12)] transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="fc-message"
                    className="block text-[10px] text-text-secondary font-mono mb-1.5 uppercase tracking-wider"
                  >
                    Message <span aria-hidden="true">*</span>
                    <span className="sr-only">required</span>
                  </label>
                  <textarea
                    ref={messageRef}
                    id="fc-message"
                    name="message"
                    rows={3}
                    required
                    aria-required="true"
                    placeholder="Tell me about your project..."
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_12px_rgba(0,255,255,0.12)] transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-accent-cyan text-[#0a0a0f] font-semibold text-sm rounded-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300"
                >
                  <Send size={14} aria-hidden="true" /> Send Message
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
