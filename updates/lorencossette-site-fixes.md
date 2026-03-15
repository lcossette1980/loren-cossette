# lorencossette.com — Site Fix Plan
**Last updated:** March 2026  
**Prepared for:** Loren Cossette + dev team  
**Priority order:** Phase 1 → Phase 2 → Phase 3  
**Stack:** Next.js (App Router assumed), deployed on Vercel

---

## Quick Reference

| # | Fix | Phase | Owner | Effort |
|---|-----|-------|-------|--------|
| 1 | Switch to professional email | 1 | Loren | ~10 min |
| 2 | Wire CTAs to Calendly | 1 | Dev | ~30 min |
| 3 | Remove "open to roles" from Contact | 1 | Dev | ~5 min |
| 4 | Add testimonials | 1 | Loren + Dev | 1–2 hrs |
| 5 | Move hero line to homepage | 2 | Dev | ~1 hr |
| 6 | Trim top nav | 2 | Dev | ~2 hrs |
| 7 | Add "Who I work best with" section | 2 | Loren + Dev | ~1 hr |
| 8 | Add client/partner logo row | 2 | Loren + Dev | ~2 hrs |
| 9 | Expand project pages to full case studies | 2 | Loren | 1–2 days |
| 10 | Add JSON-LD schema markup | 3 | Dev | ~2 hrs |
| 11 | Start blog / content pages | 3 | Loren | Ongoing |
| 12 | LinkedIn content strategy | 3 | Loren | Ongoing |
| 13 | Add lead magnet + email capture | 3 | Loren + Dev | ~1 day |
| 14 | Build /government landing page | 3 | Loren + Dev | ~4 hrs |

---

## Phase 1 — Do This Week
*These are conversion hygiene fixes. Low effort, immediate payback.*

---

### Fix 1 — Switch to a professional email address

**Problem:** `lorentcossette@gmail.com` appears in the nav, footer, Contact page, and CTAs throughout the site. At $15–25K/month consulting rates, a Gmail address is a trust liability for enterprise and government buyers.

**Action (Loren):**
1. Set up `loren@lorencossette.com` via Google Workspace ($6/mo) or Zoho Mail (free tier).
2. Point the MX records on your domain registrar to the new mail provider.
3. Forward the old Gmail as a backup during transition.

**Action (Dev):**
Search the codebase for all instances of the Gmail address and replace:

```bash
# Find all occurrences in the project
grep -r "lorentcossette@gmail.com" ./src
```

Replace every instance with:
```
loren@lorencossette.com
```

Locations to check:
- `src/app/page.tsx` (homepage hero + footer)
- `src/app/consulting/page.tsx` (CTA section)
- `src/app/contact/page.tsx` (contact form mailto)
- `src/components/Footer.tsx` (or equivalent)
- Any `mailto:` href values

---

### Fix 2 — Wire "Book a Strategy Call" CTAs to a real calendar

**Problem:** Every "Book a Strategy Call" CTA links to `/consulting`, not an actual booking form. This adds unnecessary friction between a prospect's impulse and a booked call.

**Action (Loren):**
1. Create a free account at [cal.com](https://cal.com) or [calendly.com](https://calendly.com).
2. Set up a "Strategy Call" event type — 30 minutes, your available windows.
3. Copy your booking link (e.g. `https://cal.com/lorencossette/strategy-call`).

**Action (Dev):**
Update all "Book a Strategy Call" button `href` values:

```tsx
// Before
<a href="/consulting">Book a Strategy Call</a>

// After
<a 
  href="https://cal.com/lorencossette/strategy-call" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Book a Strategy Call
</a>
```

Search for this pattern in:
- `src/app/page.tsx`
- `src/app/consulting/page.tsx`
- `src/components/Hero.tsx` (or equivalent)
- Any shared CTA components

> **Note:** Keep the `/consulting` page as the destination for any "Learn more" or "Explore services" links. Only the explicit "Book a Call" CTAs should go directly to the calendar.

---

### Fix 3 — Remove "open to roles" language from Contact page

**Problem:** The Contact page currently signals that Loren is open to employment. This creates a split signal for enterprise and government buyers who are evaluating whether to spend $40–120K on a project — they want a committed consultant, not someone who may take a job next quarter.

**Action (Dev):**
Open `src/app/contact/page.tsx` and remove or replace any language about being open to senior AI engineering, principal architect, or strategic AI leadership roles.

Replace with a clean consulting-focused intro:

```tsx
// Remove language like:
// "I'm also open to senior AI engineering, principal architect, 
// and strategic AI leadership roles..."

// Replace Contact page intro with something like:
<p>
  Tell me what you're trying to build, fix, or transform. 
  I'll tell you if I'm the right person — and if not, 
  I'll point you to someone who is.
</p>
```

> **Note for Loren:** If you want to remain open to roles, keep that signal on LinkedIn only — not on the consulting site. Mixing the two signals on the same domain costs you more in consulting conversions than it gains in job leads.

---

### Fix 4 — Add testimonials to homepage and consulting page

**Problem:** The site has zero client or peer testimonials. At premium price points ($40–120K projects), buyers need third-party confirmation that the work was delivered. The credibility signals on the site are all self-reported — impressive, but unverified from a buyer's perspective.

**Action (Loren):**
1. Reach out to 2–4 clients, colleagues, or project stakeholders for short quotes.
2. Format: Name, Title, Organization (or "Federal Government Client" if NDA applies).
3. If getting fresh quotes is slow, pull 2–3 LinkedIn recommendations you already have and screenshot or transcribe them (with permission).

**Target quotes:** Ideally one from a government/public sector client, one from enterprise, one from an academic/training context.

**Action (Dev):**
Create a reusable testimonial component and add it to the homepage (after the impact metrics) and the consulting page (after the "Three Pillars" section).

```tsx
// src/components/Testimonials.tsx

interface Testimonial {
  quote: string
  name: string
  title: string
  org: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Placeholder — replace with real quote from Loren.",
    name: "Jane Smith",
    title: "Director of Digital Services",
    org: "Multnomah County"
  },
  {
    quote: "Placeholder — replace with real quote from Loren.",
    name: "John Doe",
    title: "Chief Data Officer",
    org: "Enterprise Client (NDA)"
  },
  {
    quote: "Placeholder — replace with real quote from Loren.",
    name: "Dr. Sarah Lee",
    title: "Program Director",
    org: "University of Texas at Austin"
  }
]

export function Testimonials() {
  return (
    <section>
      <h2>What clients say</h2>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <blockquote key={i}>
            <p>"{t.quote}"</p>
            <footer>
              <strong>{t.name}</strong>
              <span>{t.title}, {t.org}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
```

Add `<Testimonials />` to:
- `src/app/page.tsx` — after the impact metrics section
- `src/app/consulting/page.tsx` — after the "Three Pillars" section

---

## Phase 2 — This Month
*Messaging and funnel sharpening. Requires some copywriting from Loren.*

---

### Fix 5 — Move the hero line to the homepage

**Problem:** The best conversion copy on the site — *"Most AI initiatives fail between vision and execution. I close that gap."* — currently lives on `/consulting`. Cold visitors to the homepage never see it.

**Action (Dev):**
Update the homepage hero section in `src/app/page.tsx`. Move the pain-point line above or directly below the name/title:

```tsx
// Current homepage hero (approximate):
<h1>Loren Cossette</h1>
<p className="subtitle">AI Systems Architect & Automation Consultant</p>
<p>I design and deploy production AI systems that automate operations...</p>

// Updated homepage hero:
<p className="eyebrow">AI Systems Architect & Automation Consultant</p>
<h1>Loren Cossette</h1>
<p className="hero-hook">
  Most AI initiatives fail between vision and execution. I close that gap.
</p>
<p className="hero-sub">
  I design and deploy production AI systems that automate operations, 
  reduce cost, and scale decision-making — for governments, enterprises, and startups.
</p>
```

The pain-point line should be visually distinct — larger or bolder than the descriptive copy below it.

---

### Fix 6 — Trim and restructure the top navigation

**Problem:** 9 nav items (Home, Consulting, Projects, About, Methodology, Demo, Override, Apps, Contact) is too many for a solo consulting site. It fragments visitor attention and pulls high-intent buyers into side branches (apps, book) instead of the primary funnel.

**Primary nav (5 items):**
```
Home · Consulting · Projects · About · Contact
```

**Secondary / footer nav (moved items):**
```
Methodology · Demo · Override · Apps
```

**Action (Dev):**
Update the nav component (likely `src/components/Nav.tsx` or `src/components/Header.tsx`):

```tsx
// Primary nav links
const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Consulting', href: '/consulting' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// Move these to footer only
const secondaryNav = [
  { label: 'Methodology', href: '/methodology' },
  { label: 'Demo', href: '/demo' },
  { label: 'Override', href: '/override' },
  { label: 'Apps', href: '/apps' },
]
```

Update `src/components/Footer.tsx` to include the secondary nav items in a "More" or "Resources" column alongside the existing Expertise and Connect columns.

> **Optional:** Add a subtle "More ▾" dropdown to the primary nav for the secondary items if Loren wants them still accessible from the top, without cluttering the main bar.

---

### Fix 7 — Add "Who I work best with" to the Consulting page

**Problem:** Visitors who aren't sure if they're the right client have no guidance. A self-qualification section helps the right buyers move forward faster and filters out poor-fit inquiries.

**Action (Loren):** Write 3–4 short bullets describing ideal client types. Suggested starting point:

- Government teams facing compliance or accessibility deadlines (Section 508, WCAG, ADA)
- Enterprises stuck between AI pilots and full adoption
- Founders who need a senior architect to take AI from concept to production
- Organizations where the business case for AI is made but the technical path isn't clear

**Action (Dev):**
Add a new section to `src/app/consulting/page.tsx` between the "Three Pillars" section and the "How It Works" steps:

```tsx
<section className="ideal-clients">
  <h2>Who I work best with</h2>
  <p>
    My engagements work best when the problem is real, the stakes are high, 
    and the organization is ready to move — not just explore.
  </p>
  <ul>
    <li>
      <strong>Government agencies</strong> facing compliance or accessibility deadlines — 
      Section 508, WCAG, ADA, or federal AI governance requirements
    </li>
    <li>
      <strong>Enterprises</strong> that have run AI pilots but can't get to production 
      or adoption at scale
    </li>
    <li>
      <strong>Founders and startups</strong> who need a senior architect to build 
      the real thing, not a prototype
    </li>
    <li>
      <strong>Organizations with made business cases</strong> where the technical 
      path, governance, or change management is the missing piece
    </li>
  </ul>
  <p>
    Not sure if you're a fit? <a href="mailto:loren@lorencossette.com">Email me directly</a> — 
    I'll tell you honestly.
  </p>
</section>
```

---

### Fix 8 — Add a client/partner logo row

**Problem:** There are no visual signals of who Loren has worked with. A logo row (or sector badges if under NDA) provides instant credibility at a glance.

**Action (Loren):**
1. Identify which clients/organizations allow logo usage.
2. For NDA clients, use anonymized sector labels: "Federal Government Agency," "Fortune 500 Financial Services," "Public University System."
3. Gather SVG or PNG logos at consistent height (40–48px recommended).

**Action (Dev):**
Add a logo strip to `src/app/page.tsx` (homepage, after testimonials) and optionally `src/app/consulting/page.tsx`:

```tsx
// src/components/ClientLogos.tsx

const clients = [
  { name: 'Multnomah County', logo: '/images/logos/multnomah-county.svg' },
  { name: 'USAA', logo: '/images/logos/usaa.svg' },
  { name: 'UT Austin', logo: '/images/logos/ut-austin.svg' },
  { name: 'Johns Hopkins', logo: '/images/logos/johns-hopkins.svg' },
  // Add sector badges for NDA clients:
  { name: 'Federal Government Agency', logo: null }, // render as text badge
]

export function ClientLogos() {
  return (
    <section className="client-logos">
      <p className="label">Organizations I've worked with</p>
      <div className="logo-row">
        {clients.map((c) =>
          c.logo ? (
            <img key={c.name} src={c.logo} alt={c.name} height={40} />
          ) : (
            <span key={c.name} className="sector-badge">{c.name}</span>
          )
        )}
      </div>
    </section>
  )
}
```

Place logos in `/public/images/logos/`. Keep all logos the same height, desaturated or single-color for visual consistency.

---

### Fix 9 — Expand project pages into full case studies

**Problem:** Project previews currently lead with technical specs. Enterprise and government buyers think in terms of business problems and outcomes, not tech stacks. The case studies are close to being the most powerful sales asset on the site — they just need more narrative structure.

**Target structure for each case study:**

```markdown
## [Project Title]

### The problem
What was the client trying to solve? What was painful, broken, or expensive?

### What had been tried
What approaches had failed or been inadequate before?

### What I built
Architecture overview — keep it readable for a non-technical exec.
Specific technical decisions and why they were made.

### The outcome
Quantified results: cost saved, time reduced, compliance achieved, etc.

### Why it mattered
Business impact beyond the numbers. Risk reduced, deadline met, org unblocked.

### Stack
[Tech tags as currently shown]
```

**Action (Loren):**
Write or expand the following case studies first (highest proof value):

1. **WCAG Remediation Platform** (Multnomah County) — already has the best metrics, needs narrative
2. **Enterprise AI & Data Strategy** ($126B portfolio) — business impact story
3. **USAA Q1 project** ($2.7M saved) — most impressive ROI number on the site

**Action (Dev):**
The project detail pages at `/projects/[slug]/page.tsx` likely pull from a data source or MDX files. Add the new narrative sections to the page template and update the content accordingly. If using MDX:

```bash
# Likely location
src/content/projects/wcag-remediation.mdx
src/content/projects/enterprise-ai-strategy.mdx
```

Add a `<CaseStudyDownload />` component at the bottom of each project page — a PDF version of the case study that visitors can download as a leave-behind for proposals.

---

## Phase 3 — Next 90 Days
*SEO, content, and long-term lead generation infrastructure.*

---

### Fix 10 — Add JSON-LD schema markup

**Problem:** The site is missing structured data. Schema markup helps Google understand the content, enables rich results in SERPs, and is table stakes for a professional services site in 2026.

**Action (Dev):**
Add JSON-LD to the root layout and key pages. In Next.js App Router, inject via `<script>` in the page `<head>` or using a shared component.

**Root layout / homepage** — `Person` schema:
```tsx
// src/app/layout.tsx or src/app/page.tsx

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Loren Cossette",
  "jobTitle": "AI Systems Architect & Automation Consultant",
  "url": "https://lorencossette.com",
  "email": "loren@lorencossette.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Antonio",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://linkedin.com/in/loren-cossette",
    "https://github.com/lorentcossette"
  ],
  "knowsAbout": [
    "AI Systems Architecture",
    "Agentic AI",
    "RAG Systems",
    "AI Automation",
    "WCAG Compliance Automation",
    "AI Governance",
    "Machine Learning"
  ]
}

// In your component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
/>
```

**Consulting page** — `ProfessionalService` + `FAQPage` schema:
```tsx
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Loren Cossette AI Consulting",
  "description": "AI systems architecture, automation consulting, and organizational AI transformation for governments, enterprises, and startups.",
  "url": "https://lorencossette.com/consulting",
  "provider": {
    "@type": "Person",
    "name": "Loren Cossette"
  },
  "areaServed": "Worldwide",
  "serviceType": [
    "AI Consulting",
    "AI Systems Architecture",
    "RAG Pipeline Development",
    "AI Change Management",
    "WCAG Compliance Automation"
  ]
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What size organizations do you work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Government agencies, Fortune 500 enterprises, and funded startups. Engagements typically start at $5K for audits and scale to $120K+ for full agentic system builds."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work remotely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — available worldwide. Based in San Antonio, TX, with on-site options available at the day rate."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a typical engagement take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Audits and strategy roadmaps take 2–4 weeks. Full system builds (RAG pipelines, agentic systems) typically run 6–16 weeks depending on scope."
      }
    },
    {
      "@type": "Question", 
      "name": "Do you sign NDAs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, standard NDAs are available and routinely used for government and enterprise engagements."
      }
    }
  ]
}
```

> **Tip:** Add the FAQ schema even before adding a visible FAQ section to the page — the structured data is read by Google independently. But do add the visible FAQ section too; it helps both SEO and on-page conversion.

**Meta descriptions** — add custom `description` to each page's `metadata` export:

```tsx
// src/app/consulting/page.tsx
export const metadata = {
  title: 'AI Consulting Services | Loren Cossette',
  description: 'AI systems architecture, automation consulting, and organizational transformation for governments and enterprises. Strategy, build, and adoption — delivered by one senior architect.',
}

// src/app/projects/page.tsx
export const metadata = {
  title: 'AI Projects & Case Studies | Loren Cossette',
  description: 'Production AI systems with real outcomes: WCAG compliance automation, agentic RAG pipelines, enterprise AI strategy. $2.7M+ cost savings documented.',
}

// src/app/about/page.tsx
export const metadata = {
  title: 'About Loren Cossette | AI Systems Architect',
  description: 'PhD candidate, Prosci-certified, 20-year military career (E-9). AI consultant and educator at UT Austin and Johns Hopkins with 5 peer-reviewed publications.',
}
```

---

### Fix 11 — Start a blog (one post per month)

**Problem:** The site can only rank for branded searches ("Loren Cossette") without long-form content. Blog posts targeting specific problems Loren solves would capture high-intent search traffic from people who don't yet know his name.

**Target keyword themes (start here — these are winnable):**
- `WCAG remediation automation federal agencies`
- `AI change management consultant Prosci`
- `agentic RAG system production deployment`
- `AI consulting government Section 508`
- `how to evaluate RAG pipeline production`
- `enterprise AI adoption strategy framework`

**Action (Dev):**
If the site doesn't already have a blog route, add one:

```bash
src/app/blog/
  page.tsx          # Blog index
  [slug]/
    page.tsx        # Individual post
src/content/blog/
  wcag-automation-federal.mdx
  rag-production-guide.mdx
  ...
```

Use MDX with frontmatter for metadata:

```mdx
---
title: "How We Automated WCAG Compliance for 56,000 Government Files"
date: "2026-04-01"
description: "A practical walkthrough of the production pipeline built for Multnomah County..."
tags: ["WCAG", "Government AI", "Accessibility Automation"]
---
```

Add `Article` JSON-LD schema to each blog post page.

**Action (Loren):**
Write the first post — the WCAG case study is already 80% of the content. Structure it as:
1. The problem (federal ADA deadline, 56K files, manual process)
2. The technical approach (LangGraph, Gemini, five-layer validation)
3. The outcome (95%+ compliance, 36s processing, 96 quality score)
4. Lessons learned / what you'd do differently

Target 800–1,200 words. Publish it as both a blog post and link to it from the WCAG project page.

---

### Fix 12 — LinkedIn content strategy

**Problem:** For a B2B consultant at this price point, LinkedIn will outperform Google SEO in the near term for generating warm inbound leads. The site converts well for warm traffic — the bottleneck is volume.

**This is Loren's work, not a dev task.**

**Recommended cadence:** 2–3 posts per week

**Post types that work best for this positioning:**

| Type | Example |
|------|---------|
| Case study breakdown | "We automated 56,000 government files for WCAG compliance. Here's how the pipeline worked..." |
| Contrarian take | "Most AI consulting firms charge you to build a demo. Here's why that's the wrong model." |
| Lesson / mistake | "The hardest part of our USAA engagement wasn't the code. It was [stakeholder problem]..." |
| Framework share | "The 7 phases I use on every AI engagement — and why phase 2 is where most projects die." |
| Hot take on AI news | "Everyone is excited about [new model]. Here's what it actually changes for enterprise deployments." |

**Goal:** Build audience of government and enterprise decision-makers. Post consistently for 90 days before evaluating results.

---

### Fix 13 — Add a lead magnet and email capture

**Problem:** There's no email list. Visitors who aren't ready to book a call have no way to stay in the funnel. A free resource gives cold visitors a reason to engage and starts a nurture sequence.

**Suggested lead magnet:**
> **"The AI Readiness Audit: 15 Questions to Ask Before Investing in AI"**  
> A 2–3 page PDF Loren writes based on his consulting intake process. Practical, specific, and useful for exactly the buyer he wants to reach.

**Action (Loren):**
Write the PDF. Keep it under 3 pages. Frame it as the questions he asks in his Discovery call.

**Action (Dev):**

1. Set up a free email service account: [ConvertKit](https://convertkit.com), [Beehiiv](https://beehiiv.com), or [Resend](https://resend.com) + a simple list.

2. Add a lead capture component to the homepage (after the case studies section) and the consulting page:

```tsx
// src/components/LeadMagnet.tsx

export function LeadMagnet() {
  return (
    <section className="lead-magnet">
      <h3>Free: The AI Readiness Audit</h3>
      <p>
        15 questions to ask before investing in AI — based on what I ask 
        in every Discovery call. Used by government and enterprise teams 
        to avoid the most common (and expensive) mistakes.
      </p>
      <form action="[YOUR_CONVERTKIT_OR_RESEND_ENDPOINT]" method="POST">
        <input 
          type="email" 
          name="email" 
          placeholder="your@email.com" 
          required 
        />
        <button type="submit">Send me the audit</button>
      </form>
      <p className="fine-print">No spam. Unsubscribe anytime.</p>
    </section>
  )
}
```

3. Automate a welcome email that delivers the PDF download link.

---

### Fix 14 — Build a /government landing page

**Problem:** Government work is prominently referenced throughout the site (Multnomah County, federal ADA deadlines, USAA) but there is no dedicated page. Government procurement officers search for very specific terms and the current site doesn't speak their language explicitly.

**Target keywords for this page:**
- `AI consultant federal government`
- `Section 508 compliance automation`
- `WCAG 2.1 AA compliance AI`
- `government AI systems architect`
- `federal AI governance consultant`

**Action (Loren):**
Write the copy for this page. Key sections:
1. Hero: Frame the specific problem (federal compliance deadlines, AI adoption in gov)
2. Relevant experience: Multnomah County, federal ADA work, USAA
3. Services: WCAG automation, AI governance, change management, training
4. Compliance language: Section 508, WCAG 2.1 AA, ATO-readiness, FISMA awareness
5. CTA: Book a strategy call

**Action (Dev):**
Create `src/app/government/page.tsx` and add it to the footer navigation. Add to sitemap.

```tsx
export const metadata = {
  title: 'AI Consulting for Government Agencies | Loren Cossette',
  description: 'AI systems architecture and compliance automation for federal and local government. Section 508, WCAG 2.1 AA, and AI governance — deployed in production for county and federal clients.',
}
```

Add `LocalBusiness` / `GovernmentService` JSON-LD schema referencing the government-specific services.

---

## Ongoing Maintenance Checklist

These aren't one-time tasks — they should be reviewed quarterly:

- [ ] **Google Search Console** — set up if not already, monitor for crawl errors and keyword impressions
- [ ] **Page speed audit** — run Lighthouse on homepage, consulting, and projects pages. Hero images are currently being served at 3840px width; confirm Next.js `<Image>` responsive sizing is working correctly
- [ ] **Alt text audit** — ensure all images have descriptive, keyword-relevant alt text (not just filenames)
- [ ] **Sitemap** — confirm `sitemap.xml` is auto-generated and includes all pages (Next.js App Router does this automatically if configured)
- [ ] **robots.txt** — confirm no important pages are accidentally blocked
- [ ] **Backlink opportunities** — check if UT Austin and Johns Hopkins instructor/faculty pages link back to lorencossette.com; if not, request it

---

## Notes for Developers

- **Stack:** Next.js App Router. All metadata should use the `export const metadata` pattern, not `<Head>` from `next/head`.
- **Images:** Use `next/image` `<Image>` component for all images to get automatic WebP conversion and responsive sizing. The current hero images are being served at `w=3840` — confirm `sizes` prop is set correctly to avoid over-serving large images on mobile.
- **Email:** Do not commit any email addresses to the repo. Store them in environment variables or a config file that is gitignored if needed.
- **Calendly/Cal.com link:** Store the booking URL as an environment variable or a single constant so it's easy to update:
  ```ts
  // src/lib/constants.ts
  export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://cal.com/lorencossette/strategy-call'
  ```
- **Schema markup:** Test all JSON-LD with [Google's Rich Results Test](https://search.google.com/test/rich-results) after implementation.
- **Analytics:** Confirm Google Analytics or Plausible is set up to track: booking link clicks, contact form submissions, and lead magnet conversions as separate events.

---

*End of document. Questions or clarifications: loren@lorencossette.com*
