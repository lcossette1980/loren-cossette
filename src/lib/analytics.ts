import { track } from "@vercel/analytics";

/**
 * Centralized analytics event tracking.
 * Uses Vercel Analytics custom events.
 *
 * Events show up in:  Vercel Dashboard → Analytics → Events
 */

export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>
) {
  try {
    track(name, properties);
  } catch {
    // Silently fail — analytics should never break the app
  }
}

/* ── Pre-defined event helpers ── */

export const analytics = {
  /** CTA button clicks */
  ctaClick: (label: string, location: string) =>
    trackEvent("cta_click", { label, location }),

  /** Project card clicks */
  projectClick: (project: string) =>
    trackEvent("project_click", { project }),

  /** Navigation clicks */
  navClick: (destination: string) =>
    trackEvent("nav_click", { destination }),

  /** External link clicks (LinkedIn, GitHub, Amazon, etc.) */
  externalLink: (platform: string, url: string) =>
    trackEvent("external_link", { platform, url }),

  /** Resume download */
  resumeDownload: () =>
    trackEvent("resume_download"),

  /** Override book page — Buy click */
  overrideBuy: (format: string) =>
    trackEvent("override_buy_click", { format }),

  /** Override — Free tools click */
  overrideTools: () =>
    trackEvent("override_tools_click"),

  /** Contact form started */
  contactFormStart: () =>
    trackEvent("contact_form_start"),

  /** Contact form submitted */
  contactFormSubmit: () =>
    trackEvent("contact_form_submit"),

  /** Routing lane click on homepage */
  routingLane: (lane: string) =>
    trackEvent("routing_lane_click", { lane }),
};
