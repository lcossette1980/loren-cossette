"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { analytics } from "@/lib/analytics";

const CONTACT_EMAIL = "lorentcossette@gmail.com";

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
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-[380px] bg-[rgba(13,17,23,0.97)] backdrop-blur-2xl border border-border-accent rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,255,255,0.05)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border-default">
                <div>
                  <h3 className="font-semibold text-text-primary text-sm">
                    Send a message
                  </h3>
                  <p className="text-[11px] text-text-muted font-mono mt-0.5">
                    Opens your email client
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-all"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-[10px] text-text-muted font-mono mb-1.5 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/40 focus:shadow-[0_0_12px_rgba(0,255,255,0.06)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-text-muted font-mono mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/40 focus:shadow-[0_0_12px_rgba(0,255,255,0.06)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-text-muted font-mono mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    ref={messageRef}
                    rows={3}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full bg-bg-tertiary border border-border-default rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-cyan/40 focus:shadow-[0_0_12px_rgba(0,255,255,0.06)] transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-accent-cyan text-[#0a0a0f] font-semibold text-sm rounded-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
