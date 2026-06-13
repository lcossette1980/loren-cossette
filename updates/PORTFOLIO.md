# Clearview Politics — Portfolio Overview

**Live site:** [clearviewpolitics.com](https://clearviewpolitics.com)  
**Type:** Full-stack AI-powered news platform  
**Status:** Production (launched May 2026)

---

## What It Is

Clearview Politics is an AI-native political news platform that reads hundreds of sources across the political spectrum — left, right, and center — and synthesizes them into clear, bias-audited stories. No spin. No agenda. Just the signal.

Every morning, the platform automatically ingests articles from RSS feeds, the GNews API, and Congress.gov, clusters related stories together, writes multi-source summaries, audits each one for political bias, and publishes the best stories to the live site — all without human intervention. An editor agent reviews and approves stories autonomously, and a social producer schedules posts to X (Twitter), LinkedIn, and Facebook throughout the day.

---

## The Problem It Solves

Political news has a trust problem. Every outlet has a perspective, and readers know it. Clearview Politics doesn't try to be another outlet — it acts as a meta-reader, aggregating dozens of sources, finding the consensus reality, and delivering it cleanly. Readers get the full picture without having to triangulate between competing narratives themselves.

---

## How It Works (Non-Technical)

1. **Every 30 minutes** — The platform checks for breaking news using velocity detection: if 3+ sources are suddenly covering the same story, it flags it as breaking and synthesizes a story immediately (within ~10 minutes of the story breaking).

2. **Every 4 AM** — The full daily pipeline runs: hundreds of articles are fetched, deduplicated, categorized, clustered by topic, and synthesized into clean multi-source summaries by GPT-4o.

3. **Bias auditing** — Every story is reviewed by Claude (Haiku) to check for loaded language, one-sided framing, and political bias before it goes live. Stories that fail are flagged for human review.

4. **The Editor Agent** — An AI editor reviews all pending stories, auto-approves quality content, auto-rejects off-topic or low-quality stories, and reorders the live feed based on freshness and significance.

5. **Daily Brief** — Each morning a structured briefing (like an intelligence report) is generated summarizing the day's key political developments in 10 bullet points.

6. **Political Analysis** — High-priority stories receive a deeper AI-generated analysis covering thesis, power dynamics, stakeholder implications, and historical context.

7. **Social posting** — Stories, analyses, and the daily brief are automatically formatted and posted to X, LinkedIn, and Facebook on a scheduled cadence throughout the day (7 AM – 8:30 PM ET).

8. **Newsletter** — A beehiiv-integrated newsletter is assembled daily and queued for admin review before sending to subscribers.

---

## How It Works (Technical)

### Architecture

| Layer | Technology |
|---|---|
| **Backend** | Python 3.12, FastAPI (async) |
| **Database** | PostgreSQL + pgvector (vector similarity search) |
| **ORM** | SQLAlchemy 2.0 (async) + Alembic migrations |
| **Task scheduling** | APScheduler (AsyncIOScheduler, 17 cron jobs) |
| **Hosting** | Railway (Docker container, always-on) |
| **Frontend** | Jinja2 server-rendered templates + vanilla JS |

### AI Stack

| Purpose | Model |
|---|---|
| Story synthesis | OpenAI GPT-4o |
| Bias auditing | Anthropic Claude 3 Haiku |
| Copy editing | OpenAI GPT-4o-mini |
| Social blurb generation | OpenAI GPT-4o-mini |
| Political analysis | OpenAI GPT-4o |
| Embeddings (clustering) | OpenAI text-embedding-3-small |

### Data Pipeline (Step by Step)

```
RSS / GNews API / Congress.gov
        ↓
  Article fetch + dedup (rapidfuzz fuzzy title matching)
        ↓
  Category classification (GPT-4o-mini)
        ↓
  Vector embeddings (text-embedding-3-small → pgvector)
        ↓
  HDBSCAN clustering (scikit-learn) → StoryCluster records
        ↓
  GPT-4o synthesis → SynthesizedStory (headline, summary, bias check)
        ↓
  Claude Haiku bias audit → pass/fail + notes
        ↓
  Editor Agent auto-approve/reject/flag
        ↓
  Thread assignment (continuing story arcs)
        ↓
  Political analysis generation (GPT-4o)
        ↓
  Fact/claim extraction + verification
        ↓
  Trend scoring
        ↓
  Daily digest + social blurb generation
        ↓
  Scheduled social posting (X / LinkedIn / Facebook)
```

### Agentic System

The platform runs a multi-agent system where each agent has a defined role, operates autonomously on a schedule, and logs structured reasoning for auditability:

- **VelocityDetectorAgent** — Scans embeddings every 30 min for breaking news clusters (cosine similarity + recency weighting). Emits `Signal` records when 3+ sources converge on a story within 6 hours.
- **EditorAgent** — Reviews pending stories every 3 hours. Auto-approves (score ≥ 0.50), auto-rejects (score < 0.35), or flags for human review. Reorders the live feed using a composite freshness + breaking-signal score.
- **CopyEditorAgent** — Tightens headlines to ≤80 chars and summaries to ≤140 words without changing meaning.
- **SocialProducerAgent** — Generates platform-native blurbs (X tweet, LinkedIn post) for the top 5 stories + 3 analyses per day.
- **SocialPosterAgent** — Posts blurbs to X (OAuth 1.0a via Tweepy), LinkedIn (REST API), and Facebook (Graph API v21.0) on a scheduled cadence. Tracks per-blurb post state in JSONB to prevent duplicates.
- **CongressBeatAgent** — Monitors Congress.gov for bill status changes and emits signals for significant legislative activity.
- **SourceHealthAgent** — Checks RSS feed staleness every 6 hours and flags broken or slow sources.

### Key Engineering Details

- **Async throughout** — FastAPI + SQLAlchemy async sessions + httpx for all I/O. No blocking calls on the event loop.
- **Vector search** — pgvector extension on PostgreSQL stores 1536-dim embeddings for all articles. Clustering uses cosine similarity + HDBSCAN (no fixed cluster count needed).
- **Deduplication** — Two-layer: exact external ID match + fuzzy title similarity (RapidFuzz ratio > 85) against the last 48 hours of articles.
- **JSONB mutation tracking** — SQLAlchemy doesn't auto-detect mutations to nested JSONB fields. All agents use `copy.deepcopy()` + `flag_modified()` to ensure social post state persists correctly.
- **JWT auth** — RS256 asymmetric JWT with httpOnly cookies. Role-based access control (subscriber / editor / admin / super_admin).
- **Breaking news latency** — ~10 minutes from story breaking to live site (fetch → embed → velocity detect → synthesize → editor approve).
- **Cost efficiency** — ~$0.08 per breaking story synthesis (GPT-4o + Claude Haiku). Full daily pipeline: ~$0.40–$0.80 depending on article volume.

### Social Posting Schedule (all ET)

| Time | Content | Platforms |
|---|---|---|
| 7:00 AM | Daily Brief | X + LinkedIn + Facebook |
| 7:30 AM | Top Story | X + LinkedIn + Facebook |
| 8:00 AM | Story #2 | X + Facebook |
| 8:30 AM | Story #3 | X + Facebook |
| 12:30 PM | Analysis #1 | X + LinkedIn + Facebook |
| 3:00 PM | Analysis #2 | X + LinkedIn + Facebook |
| 5:00 PM | Story #4 | X + LinkedIn + Facebook |
| 7:00 PM | Story #5 | X + Facebook |
| 8:30 PM | Analysis #3 | X + LinkedIn + Facebook |

### Third-Party Integrations

| Service | Purpose |
|---|---|
| GNews API | Article search + top-headlines (breaking detection) |
| Congress.gov API | Federal bill tracking |
| OpenStates API | State legislature bill tracking |
| beehiiv | Newsletter delivery |
| X / Twitter API v2 | Social posting (OAuth 1.0a) |
| LinkedIn API | Company page posting |
| Facebook Graph API v21.0 | Page posting (permanent page token) |
| Sentry | Error monitoring |

---

## Lines of Code / Scale

- **~8,500 lines of Python** across 60+ modules
- **17 scheduled cron jobs** running 24/7
- **7 autonomous AI agents**
- **3 LLM providers** (OpenAI, Anthropic, GNews)
- **9 daily social posts** across 3 platforms (fully automated)
- Processes **200–400 articles per day**, synthesizes **20–40 stories**

---

## What Makes It Different

Most AI news tools are wrappers around an LLM — paste in a URL, get a summary. Clearview Politics is a full production system: it discovers news autonomously, decides what matters, writes and edits its own content, audits it for quality and bias, manages a publishing schedule, and maintains a social media presence — all without human input on a day-to-day basis.

The engineering challenge wasn't any single AI call — it was building reliable orchestration around many AI calls, with proper error handling, cost controls, deduplication, and state management, running continuously in production.

---

*Built by Loren Cossette — [clearviewpolitics.com](https://clearviewpolitics.com)*
