# What Would You Do? (WWYD)

## Overview

Moral decision-making personality quiz that reveals how people actually think through ethical dilemmas. 10 gut-punch scenarios, 4 options each, 3 minutes. No signup required. Users get instant results: one of 6 personality types, 3 decision-making tensions, and a shareable moral fingerprint card.

Free results drive virality through comparison invites and social sharing. A $4.99 premium Deep Dive unlocks a full personality report with historical figure matches, decision-making DNA, superpowers and blind spots, and a personalized growth playbook.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         Client (React 19)                        │
│                                                                  │
│  Landing ──▶ Quiz (10 Qs) ──▶ Free Results ──▶ Deep Dive ($4.99)│
│                                    │                             │
│                            ┌───────┴───────┐                    │
│                        Share Card    Challenge a Friend           │
│                       (html2canvas)  (Firestore comparison)      │
└──────────────────────────────┬───────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
     ┌────────▼──────┐  ┌─────▼──────┐  ┌──────▼───────┐
     │   Firestore   │  │  Cloud     │  │   Stripe     │
     │               │  │  Functions │  │   Checkout   │
     │  shares       │  │            │  │              │
     │  comparisons  │  │  checkout  │  │  $4.99 USD   │
     │  users        │  │  webhook   │  │  one-time    │
     │               │  │  OG share  │  │              │
     └───────────────┘  └────────────┘  └──────────────┘
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 19.1.0 |
| Routing | React Router DOM | 7.5.0 |
| Styling | Tailwind CSS | 3.4.1 |
| Animation | Framer Motion | 12.19.2 |
| Icons | Lucide React | 0.563.0 |
| Charts | D3 + Recharts | 7.9.0 / 2.15.2 |
| Image Export | html2canvas | 1.4.1 |
| Database | Firebase Firestore | 11.6.0 |
| Auth | Firebase Auth | 11.6.0 |
| Payments | Stripe (client + server) | stripe-js 7.2.0 / stripe 18.1.0 |
| Functions | Firebase Cloud Functions (Gen 2) | Node.js 20 |
| Hosting | Vercel (primary) + Firebase Hosting | - |
| Monitoring | Sentry | 9.34.0 |
| Performance | Web Vitals | 2.1.4 |
| CSV Parsing | PapaParse | 5.5.2 |

---

## The Quiz: 10 Moral Dilemmas

Each scenario presents 4 options mapping to distinct moral dimensions. No right answers. Every option reveals something about how the user weighs competing values.

| # | Scenario | Core Tension |
|---|----------|-------------|
| 1 | Best friend asks to borrow your emergency fund | Personal loyalty vs. self-preservation vs. systemic thinking |
| 2 | Coworkers making racist jokes | Formal action vs. private compassion vs. public courage |
| 3 | Partner wants to move for their career | Roots vs. partnership equity vs. sacrifice |
| 4 | Company using ethically questionable (but legal) practice | Complicity vs. whistleblowing vs. moral exit |
| 5 | Family member posts opposing political views | Family loyalty vs. moral lines vs. tolerance |
| 6 | Promotion with significantly more hours | Ambition vs. wellbeing vs. community expectations |
| 7 | Less qualified coworker promoted via politics | Justice-seeking vs. meritocratic patience vs. exit |
| 8 | Firing an underperformer who has a family | Efficiency vs. compassion vs. questioning the system |
| 9 | Teen wants to skip college for creative career | Supporting passion vs. requiring safety nets |
| 10 | Child being bullied, school is ineffective | Protective escalation vs. systemic fix vs. relational repair |

---

## 8 Moral Dimensions

The scoring matrix maps each answer to a primary dimension (7 pts) and a secondary dimension (3 pts). Each dimension appears as a primary option 5 times across the 40 total option slots, ensuring balanced type distribution.

| Dimension | What It Measures |
|-----------|-----------------|
| **Care & Empathy** | Compassion, reducing suffering, prioritizing relationships |
| **Fairness & Equity** | Justice, proportionality, systemic equality |
| **Security & Authority** | Stability, order, respect for established structures |
| **Tradition & Loyalty** | Heritage, family bonds, proven ways of doing things |
| **Autonomy & Liberty** | Individual freedom, self-determination, independence |
| **Progress & Openness** | Innovation, experimentation, challenging the status quo |
| **Sanctity & Purity** | Personal integrity, moral clarity, principled boundaries |
| **Achievement & Pragmatism** | Results-orientation, efficiency, practical problem-solving |

Scores are normalized to 0-100 per dimension. Max possible scores are auto-calculated from the scoring matrix.

---

## 6 Personality Types

| Type | Name | Tagline | Color |
|------|------|---------|-------|
| The Compass | Equity Champions | Guided by justice, you point the way forward. | Rust (#C45B4F) |
| The Torch | Progressive Catalysts | You illuminate paths others can't yet see. | Gold (#D4A843) |
| The Mirror | Expressive Innovators | You reflect truths others aren't ready to face. | Sage (#6B8F71) |
| The Bridge | Balanced Nonconformists | You connect worlds that refuse to talk to each other. | Slate (#7C8186) |
| The Architect | Pragmatic Visionaries | You build what works, not what sounds good. | Teal (#3A7D7E) |
| The Anchor | Traditional Guardians | You hold the line when everything else is shifting. | Blue-slate (#4A5568) |

**Type assignment** uses heuristic rules on the top 3 scoring dimensions. Exhaustive simulation across all 1,048,576 possible answer combinations confirms balanced distribution: 7-22% per type (no dominant type, no unreachable type).

---

## 3 Decision-Making Tensions

Each tension is a spectrum from -100 to +100, derived from the 8 dimension scores:

| Tension | Left Pole (-100) | Right Pole (+100) | Computed From |
|---------|-------------------|---------------------|---------------|
| **Heart vs. Head** | Logic-first decisions | Empathy-first decisions | Care - Achievement |
| **Roots vs. Wings** | Freedom and innovation | Stability and tradition | (Tradition + Security) - (Progress + Autonomy) |
| **Rules vs. Context** | Every situation is unique | Consistent principles matter | (Security + Sanctity) - (Fairness + Autonomy) |

Rendered as visual slider bars with the user's position marked. Narrative descriptions adapt based on intensity.

---

## User Flows

### Free Flow (no auth required)
```
Landing Page ──▶ Quiz (10 questions) ──▶ Free Results
                                              │
                                    ┌─────────┼──────────┐
                                    │         │          │
                               Type Card  Tensions  Moral Fingerprint
                                    │         │          │
                              Share buttons   │     Save/Copy Image
                              (X, FB, LI,    │     (1:1 + 9:16 story)
                               WhatsApp)      │
                                              │
                                   "Challenge a Friend"
                                   (comparison invite link)
```

### Comparison Flow
```
User A: Results ──▶ "Challenge a Friend" ──▶ Creates Firestore doc
                                                    │
                                              Share invite link
                                                    │
User B: Receives link ──▶ Takes quiz ──▶ Results written to same doc
                                                    │
                                        Side-by-side comparison:
                                        - Both type cards
                                        - Tension bar overlays
                                        - "Where you align" / "Where you diverge"
```

### Premium Flow ($4.99)
```
Free Results ──▶ "Go Deeper" ──▶ Auth (if needed) ──▶ Stripe Checkout
                                                            │
                                                    Webhook writes to Firestore
                                                            │
                                                     Deep Dive Page:
                                                     - Decision-Making DNA (radar chart)
                                                     - How You Answered (scenario breakdowns)
                                                     - 12 Historical Figure Matches
                                                     - Superpowers & Blind Spots
                                                     - Personal Playbook
                                                     - Growth Edge + Reflection Prompts
```

---

## Social Sharing & Virality

### Shareable Moral Fingerprint
- **Square card (1:1)**: 480x480px for feed posts
- **Story card (9:16)**: 360x640px for Stories/Reels
- Generated client-side via html2canvas (2x/3x quality)
- Actions: Save Image, Copy to Clipboard, Save as Story

### Dynamic OG Previews
- `/r/<shareId>` URLs served by Firebase Cloud Function
- Fetches share data from Firestore, generates per-type OG meta tags
- Type-specific OG images (1200x630) at `/og/<type-slug>.png`
- Proxied through Vercel rewrites to Cloud Run

### Social Platforms
- X/Twitter, Facebook, LinkedIn, WhatsApp
- Native Share API on mobile
- 3 caption presets: Neutral, Playful, Spicy
- Copy link fallback

---

## Payments & Monetization

| Detail | Value |
|--------|-------|
| Product | Deep Dive personality report |
| Price | $4.99 USD (fixed, server-enforced) |
| Payment method | Card via Stripe Checkout |
| Model | One-time purchase (no subscription) |
| Verification | Stripe webhook writes `hasPurchasedReport` to Firestore |
| Client behavior | Polls Firestore for webhook confirmation (up to 8 attempts, ~25s) |
| Security | Firestore rules block client-side writes to payment fields |

---

## Infrastructure

### Hosting
- **Primary**: Vercel (wwyd.me, www.wwyd.me)
- **Legacy**: worldviewexplorer.com, www.worldviewexplorer.com
- **Functions**: Firebase Cloud Functions Gen 2 (Google Cloud Run, Node.js 20)

### Cloud Functions
| Function | Type | Purpose |
|----------|------|---------|
| `createStripeCheckout` | onCall (authenticated) | Creates Stripe checkout session |
| `stripeWebhook` | onRequest (public) | Handles Stripe payment events |
| `sharePageHandler` | onRequest (public) | Serves dynamic OG meta tags for social previews |

### Firestore Collections
| Collection | Purpose | Access |
|------------|---------|--------|
| `users` | Auth profiles + payment status | Owner read; payment fields server-only |
| `shares` | Share preview data (type, scores, tensions) | Public read, public create |
| `comparisons` | Comparison invites + partner results | Public read/create, update limited to partnerResults |

### Security
- Stripe webhook signature verification
- Server-side price enforcement (ignores client-sent amounts)
- URL whitelist for redirect validation
- HTML entity escaping in OG tags
- CSP, HSTS, X-Frame-Options, Permissions-Policy headers
- Firestore security rules enforce field-level write restrictions

### Monitoring
- **Sentry**: Error tracking + performance monitoring
- **Web Vitals**: LCP, FID, CLS tracking
- **Custom analytics**: quiz_started, quiz_completed, invite_opened, share_created, compare_completed
- **Structured logging**: Server-side logger utility (no console.log)

---

## Key Metrics

| Metric | Value |
|--------|-------|
| Quiz length | 10 questions |
| Time to complete | ~3 minutes |
| Answer options per question | 4 |
| Moral dimensions scored | 8 |
| Personality types | 6 |
| Decision-making tensions | 3 |
| Historical figure matches (premium) | 12 |
| Premium price | $4.99 |
| Total possible answer combinations | 1,048,576 |
