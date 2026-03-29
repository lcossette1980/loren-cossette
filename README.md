# Loren Cossette — Portfolio

Personal portfolio and content platform built with Next.js, featuring an AI-powered demo, blog system, 3D visuals, and admin dashboard.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4, Framer Motion animations
- **Database:** Supabase (PostgreSQL with RLS)
- **AI:** Anthropic Claude, OpenAI
- **3D:** Three.js with React Three Fiber
- **Auth:** JWT-based admin authentication
- **Deployment:** Vercel

## Features

- **Portfolio Pages** — Projects, experience, methodology, consulting
- **Blog System** — Full CMS with TipTap rich text editor, image uploads to Supabase storage
- **AI Demo** — Interactive assessment powered by Claude
- **3D Visuals** — Three.js hero section with particle effects
- **Admin Dashboard** — Protected blog management with JWT auth
- **Security** — HTTP-only cookies, security headers, RLS policies, rate limiting

## Getting Started

```bash
cp .env.example .env
# Configure Supabase and API keys
npm install
npm run dev
```

## License

[MIT](LICENSE)
