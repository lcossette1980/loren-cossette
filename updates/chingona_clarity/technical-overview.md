# Chingona Clarity — Technical Overview

## Architecture at a Glance

Chingona Clarity is a full-stack AI-powered news aggregation and synthesis platform built for women in San Antonio, TX. It ingests articles from 11+ RSS feeds, clusters related coverage, synthesizes multi-source narratives using GPT-4o-mini, runs automated bias audits, and serves the results through a server-rendered web dashboard.

**Stack:** Python 3.12 · FastAPI · PostgreSQL 17 + pgvector · Redis 7 · OpenAI GPT-4o-mini · HTMX + Jinja2 + Tailwind CSS · Railway (Docker)

---

## System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                        INGESTION LAYER                          │
│  RSS Feeds (11 sources) · GNews API · Eventbrite · Congress.gov │
│  OpenStates API                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                     PROCESSING PIPELINE                         │
│  1. Fetch → 2. Classify → 3. Embed → 4. Cluster → 5. Synth    │
│  → 6. Bias Audit                                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      DATA LAYER                                 │
│  PostgreSQL (raw_articles, sources, story_clusters,             │
│  synthesized_stories, tracked_bills, community_events, users)   │
│  pgvector for semantic similarity · Redis for sessions/cache    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                    PRESENTATION LAYER                            │
│  FastAPI + Jinja2 SSR · HTMX partial updates · Tailwind CSS    │
│  Admin dashboard · Email newsletter (Resend)                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## News Pipeline (6-Step Process)

The daily pipeline runs at **4:00 AM CT** via APScheduler and processes news in six sequential stages.

### Step 1: Article Fetching

**Module:** `src/articles/service.py`

- Iterates all active `Source` records from the database
- Fetches and parses RSS/Atom feeds using `feedparser`
- Also queries the GNews API for supplementary coverage
- Deduplicates by `external_id` (usually the article URL or GUID)
- Stores raw articles in `raw_articles` table with metadata (title, content, URL, author, published date, image URL)
- Gracefully handles feed errors — one broken feed doesn't block others

**Sources (11 default):**

| Source | Type | Category Default | Bias Rating |
|--------|------|-----------------|-------------|
| KSAT 12 | RSS | SA Local | Least Biased |
| KENS 5 | RSS | SA Local | Least Biased |
| SA Express-News | RSS | SA Local | Left-Center |
| MySA | RSS | SA Local | Left-Center |
| San Antonio Report | RSS | SA Local | Least Biased |
| Texas Tribune | RSS | US Politics | Least Biased |
| AP News | RSS | US Politics | Least Biased |
| Reuters | RSS | World Events | Least Biased |
| The 19th | RSS | Women's Policy | Left-Center |
| NPR World | RSS | World Events | Left-Center |
| SA Current | RSS | Community | Left-Center |

### Step 2: Category Classification

**Module:** `src/categories/classifier.py`

Hybrid two-pass approach:

1. **Keyword Rules (fast path):** Pattern matching against curated keyword lists per category. E.g., "Bexar County", "SAISD", "CPS Energy" → `sa_local`; "NATO", "UN", "G7" → `world_events`; "reproductive", "Title IX", "maternal" → `womens_policy`.

2. **GPT-4o-mini Fallback:** Articles not matched by keywords are sent to GPT-4o-mini with a structured prompt asking it to classify into one of the five categories. Uses temperature 0 for deterministic results.

**Categories:**
- `world_events` — International news
- `us_politics` — National/federal politics, Texas state politics
- `sa_local` — San Antonio and Bexar County local news
- `womens_policy` — Women's rights, reproductive health, gender equity
- `community` — Local culture, events, lifestyle

### Step 3: Embedding Generation

**Module:** `src/clustering/embeddings.py`

- Uses OpenAI `text-embedding-3-small` model (1536 dimensions)
- Processes articles in batches of 50
- Input: concatenated `title + " " + summary` (or content snippet)
- Stores embeddings in the `embedding` column using pgvector's `Vector(1536)` type
- Only generates embeddings for articles that don't already have one

### Step 4: Semantic Clustering

**Module:** `src/clustering/clusterer.py`

Groups related articles into story clusters using unsupervised machine learning:

- **Algorithm:** Scikit-learn `AgglomerativeClustering` with `cosine` distance metric and `average` linkage
- **Distance threshold:** 0.20 (articles within 80%+ cosine similarity are grouped)
- **Time window:** 48 hours — only clusters articles published within the last 2 days
- **Minimum cluster size:** 2 articles (single-source stories are excluded)
- **Process:**
  1. Load unprocessed articles with embeddings from the last 48 hours
  2. Build a distance matrix from embedding vectors
  3. Run agglomerative clustering
  4. Create `StoryCluster` records and link articles via `cluster_id`
  5. Mark articles as `is_processed = True`

This ensures every synthesized story is backed by **multiple independent sources**, which is core to the editorial model.

### Step 5: AI Synthesis

**Module:** `src/synthesis/summarizer.py`

Transforms each cluster into a reader-friendly synthesized story:

- **Model:** GPT-4o-mini with `response_format={"type": "json_object"}`
- **Temperature:** 0.3 (slightly creative but mostly factual)
- **Prompt instructs the model to:**
  - Write a clear, informative headline (no clickbait)
  - Generate a concise summary (2-3 sentences)
  - Write a full narrative (300-500 words) synthesizing all source perspectives
  - Identify key quotes from sources
  - Note any disagreements or tensions between sources
  - Frame relevance to San Antonio women where applicable
  - Assign a final category (can override the classifier)
  - Generate slug, reading time estimate, and SEO metadata

- **Output stored in `synthesized_stories` table:**
  - `headline`, `summary`, `body` (full narrative)
  - `category`, `source_articles` (JSON array of source metadata)
  - `admin_approved` (defaults to `False` for scheduled runs, auto-approved for admin-triggered runs)
  - `image_url` (inherited from highest-quality source article)

### Step 6: Bias Audit

**Module:** `src/synthesis/bias_auditor.py`

Every synthesized story undergoes an automated bias review before publication:

- **Model:** GPT-4o-mini
- **Audit checks for:**
  - Loaded or emotionally manipulative language
  - Asymmetric treatment of political figures/parties
  - Omission of significant perspectives
  - Unsubstantiated claims or fabrications
  - Framing bias (headlines vs. body content)
  - Source diversity and balance

- **Severity-based scoring:**
  - **Major issues** (asymmetric treatment, fabrication, egregious omission) → **automatic fail**
  - **3+ minor issues** → **fail**
  - **Fewer than 3 minor issues** → **pass**

- **On failure:** Story is flagged and held for human review in the admin queue. The auditor provides specific feedback on what issues were detected.

---

## Content Domains Beyond News

### Events (Eventbrite Integration)

**Module:** `src/events/service.py`

- Fetches events from 5 curated San Antonio organizers:
  - Artpace, SA Parks Foundation, Launch SA, SA River Foundation, UTSA
- Also runs keyword searches: "women San Antonio", "latina empowerment", "mujeres"
- Stores in `community_events` table
- Scheduled daily at 5:00 AM CT
- Past events auto-deactivated nightly

### Legislation Tracking

**Federal Bills — Congress.gov API** (`src/legislative/congress_client.py`)
- Queries the Library of Congress API (free, 5,000 req/hour)
- Searches 119th Congress for bills matching women/family/health keywords
- Maps Congress.gov status → internal `BillStatus` enum (INTRODUCED → IN_COMMITTEE → PASSED_COMMITTEE → PASSED_CHAMBER → SIGNED/VETOED)
- Runs AI impact analysis via GPT-4o-mini

**Texas State Bills — OpenStates API** (`src/legislative/openstates_client.py`)
- Queries Plural Policy's OpenStates API for Texas legislature
- 7-second rate limiting between requests
- Same keyword filtering and AI impact analysis
- Scheduled daily at 5:30 AM CT

---

## Scheduler

**Module:** `src/pipeline/scheduler.py`

Uses APScheduler `AsyncIOScheduler` with US/Central timezone:

| Time | Job | Description |
|------|-----|-------------|
| 4:00 AM | `run_daily_pipeline` | Full 6-step news pipeline |
| Every 6 hours | `run_incremental_fetch` | Quick article fetch (no full reprocessing) |
| 5:00 AM | `fetch_eventbrite_events` | Eventbrite event sync |
| 5:30 AM | `fetch_legislation` | Congress.gov + OpenStates bill sync |
| 7:00 AM | `send_daily_newsletter` | Email digest via Resend |
| 8:00 PM | `purge_old_content` | Remove raw article content older than 30 days |

---

## Authentication & Authorization

**Module:** `src/subscribers/auth.py`

- **Password hashing:** Argon2id (via `argon2-cffi`)
- **JWT tokens:** RS256 (RSA 2048-bit key pair)
  - Access tokens: 30-minute expiry
  - Refresh tokens: 7-day expiry
- **Roles:** `UserRole.ADMIN` and `UserRole.SUBSCRIBER`
- **Admin protection:** `require_admin` dependency checks JWT + role
- **Session management:** Redis-backed session store

---

## Database Schema (Key Tables)

```
sources              → RSS feed definitions (11 default)
raw_articles         → Ingested articles with embeddings (pgvector)
story_clusters       → Groups of related articles
synthesized_stories  → AI-generated multi-source narratives
community_events     → Eventbrite events
tracked_bills        → Federal + state legislation
users                → Subscribers + admins
email_sends          → Newsletter delivery tracking
```

**Indexes:**
- `ix_raw_articles_source_fetched` — Composite on (source_id, fetched_at)
- `ix_raw_articles_external_id` — Unique index for deduplication
- pgvector indexes for embedding similarity queries

---

## Frontend Architecture

- **Server-side rendered** with Jinja2 templates
- **HTMX** for partial page updates (category filtering, infinite scroll, form submissions)
- **Tailwind CSS** via CDN with custom design tokens:
  - Night (#0F0F0F), Midnight (#1A1A1A), Smoke (#252525)
  - Coral (#EF6351), Gold (#E8B931), Teal (#2EC4B6)
  - Cream (#FDF5E6), Plum (#A855F7), Rosa (#E84393)
- **Fonts:** Space Grotesk (display), Inter (body)
- **Responsive:** Mobile hamburger menu, desktop category bar
- **Accessibility:** Skip-to-content link, ARIA roles/labels, semantic HTML

---

## Deployment

- **Platform:** Railway (Docker-based)
- **DNS:** Cloudflare (CNAME flattening to Railway)
- **Domain:** chingonaclarity.com
- **Environment variables:** 15+ config values including API keys, JWT keys, database URLs
- **Database:** Railway-managed PostgreSQL 17 with pgvector extension
- **Cache:** Railway-managed Redis 7

---

## Admin Dashboard

Located at `/admin` (hidden link in footer):

- **Story queue:** Approve/reject synthesized stories before publication
- **Manual triggers:** Run pipeline, fetch events, fetch legislation, seed sources
- **Analytics:** Subscriber counts, story stats, email delivery metrics
- **Feedback:** Reader feedback submissions

Admin-triggered pipeline runs **auto-approve** all stories. Scheduled runs leave stories in pending state for human review.
