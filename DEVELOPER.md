# Steadfast Student Services — Developer Documentation

**Repository:** `steadfast-services/steadfast_student`  
**Stack:** Next.js 14 · TypeScript · Supabase · Tailwind CSS · Gemini AI · Vercel  
**Last Updated:** June 2026

---

## Table of Contents

1. [What Was Built](#1-what-was-built)
2. [Repository Structure](#2-repository-structure)
3. [Tech Stack & Why](#3-tech-stack--why)
4. [Local Development Setup](#4-local-development-setup)
5. [Environment Variables Reference](#5-environment-variables-reference)
6. [Service Configuration (One-Time Setup)](#6-service-configuration-one-time-setup)
7. [Database Schema](#7-database-schema)
8. [API Routes Reference](#8-api-routes-reference)
9. [Pages & Components Reference](#9-pages--components-reference)
10. [Automation Flows](#10-automation-flows)
11. [Dev → Production Deployment Pipeline](#11-dev--production-deployment-pipeline)
12. [Production Checklist](#12-production-checklist)
13. [Post-Launch Tasks](#13-post-launch-tasks)
14. [Troubleshooting](#14-troubleshooting)
15. [Cost Tracking](#15-cost-tracking)

---

## 1. What Was Built

Steadfast Student Services is a U.S.-based international education consulting company. This repository contains the **complete platform** — from business documents through to the production web application.

### Business Documents (root folder)

These are standalone HTML files requiring no build step. Open directly in any browser.

| File | Description |
|---|---|
| `Steadfast_Student_Services_Business_Plan.html` | 10-section investor-grade business plan |
| `Steadfast_Student_Services_Flyer.html` | General two-page marketing flyer |
| `Flyer_LowRisk_Opportunity.html` | Market flyer for low-risk countries (≤35% visa denial) |
| `Flyer_ModerateRisk_Challenges.html` | Market flyer for moderate-risk countries (35–55% denial) |
| `Flyer_HighRisk_Confidence.html` | Market flyer for high-risk countries (>55% denial) |
| `Steadfast_Partnership_Acquisition_Playbook.html` | Full playbook — 7 aggregator platforms + 22 universities/colleges |

### Web Application (`app/` folder)

A full-stack Next.js web platform with:

- **Public website** — landing page, services, about, contact, resources/blog
- **Lead generation** — AI chatbot, risk assessment quiz, contact form
- **Student portal** — progress tracker, document upload, application kanban board
- **Admin CRM** — lead pipeline, student management dashboard
- **Automation engine** — 12 email automation flows via Resend
- **AI Chatbot "Sofia"** — powered by Google Gemini 1.5 Flash (free tier)
- **Booking system** — Cal.com embed for free consultations

### Key Design Decisions

- **Gemini over Claude for chatbot** — Gemini 1.5 Flash has a free tier (1M tokens/day). Claude Haiku has no free tier ($1/MTok from day one). Provider is abstracted in `src/lib/gemini.ts` — swapping requires changing one file.
- **Supabase over Firebase** — PostgreSQL gives proper relational data, row-level security, and easy export for compliance. Firebase's NoSQL model is harder to query for CRM-style reporting.
- **Next.js App Router** — Combines frontend, backend API routes, and SSR into one deployment unit on Vercel. No separate backend server needed.
- **Vercel over AWS/GCP** — Zero-config deployment from GitHub. Free tier covers startup needs. Auto-scales with traffic.
- **Three-tier service model** — Low/Moderate/High risk. Risk score is calculated in `src/lib/assessment.ts` using real U.S. State Department visa denial rate data per country.

---

## 2. Repository Structure

```
steadfast_student/
│
├── .gitignore
├── DEVELOPER.md                        ← This file
│
├── Steadfast_Student_Services_Business_Plan.html
├── Steadfast_Student_Services_Flyer.html
├── Flyer_LowRisk_Opportunity.html
├── Flyer_ModerateRisk_Challenges.html
├── Flyer_HighRisk_Confidence.html
├── Steadfast_Partnership_Acquisition_Playbook.html
│
└── app/                                ← Next.js application root
    ├── ARCHITECTURE.html               ← Visual architecture design doc (open in browser)
    ├── SETUP-GUIDE.html                ← Non-technical launch guide (open in browser)
    ├── supabase-setup.sql              ← Run once in Supabase SQL Editor
    ├── .env.example                    ← Template — copy to .env.local
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── postcss.config.js
    │
    └── src/
        ├── app/                        ← Next.js App Router (pages + API)
        │   ├── layout.tsx              ← Root layout: Nav + Footer + ChatWidget
        │   ├── page.tsx                ← / Landing page
        │   ├── globals.css             ← Tailwind + brand CSS variables
        │   │
        │   ├── about/page.tsx          ← /about
        │   ├── services/page.tsx       ← /services
        │   ├── contact/page.tsx        ← /contact
        │   ├── assessment/page.tsx     ← /assessment  (7-step quiz)
        │   ├── book/page.tsx           ← /book        (Cal.com embed)
        │   ├── resources/page.tsx      ← /resources   (blog hub)
        │   ├── admin/page.tsx          ← /admin       (CRM dashboard)
        │   │
        │   ├── portal/
        │   │   ├── page.tsx            ← /portal       (student dashboard)
        │   │   ├── documents/page.tsx  ← /portal/documents
        │   │   └── applications/page.tsx ← /portal/applications
        │   │
        │   └── api/
        │       ├── chat/route.ts       ← POST /api/chat       (Gemini chatbot)
        │       ├── assessment/route.ts ← POST /api/assessment  (risk scoring)
        │       ├── leads/route.ts      ← POST /api/leads       (CRM + welcome email)
        │       ├── documents/route.ts  ← POST /api/documents   (Supabase Storage upload)
        │       └── notify/route.ts     ← POST /api/notify      (Cal.com webhook handler)
        │
        ├── components/
        │   ├── layout/
        │   │   ├── Navigation.tsx      ← Sticky nav with mobile menu
        │   │   └── Footer.tsx          ← Footer with link columns
        │   ├── chat/
        │   │   └── ChatWidget.tsx      ← Floating AI chatbot widget
        │   └── (ui/, assessment/, portal/ — add as you build Phase 2)
        │
        └── lib/
            ├── types.ts                ← All TypeScript interfaces
            ├── supabase.ts             ← Supabase client + service role client
            ├── gemini.ts               ← Gemini AI adapter + Sofia system prompt
            ├── assessment.ts           ← Risk scoring algorithm + country denial rates
            └── email.ts                ← All Resend email templates
```

---

## 3. Tech Stack & Why

| Layer | Technology | Tier | Why |
|---|---|---|---|
| Framework | Next.js 14 (App Router) | Free | React + API routes + SSR in one. Zero-config Vercel deploy. |
| Language | TypeScript | Free | Type safety catches bugs before runtime. Better DX. |
| Styling | Tailwind CSS | Free | Utility-first = fast iteration. Tiny CSS bundle. |
| Animation | Framer Motion | Free | Smooth page transitions and micro-interactions. |
| Database | Supabase (PostgreSQL) | Free tier | Real SQL, auth, storage, real-time, edge functions — all in one. |
| Auth | Supabase Auth | Free tier | Magic link + OAuth. Integrates with the database RLS. |
| File Storage | Supabase Storage | Free (1GB) | Student document uploads stored securely, scoped per student. |
| AI Chatbot | Google Gemini 1.5 Flash | **Free** (1M tok/day) | Zero cost at launch. 15 RPM. Abstraced — swappable. |
| Email | Resend | Free (3K/mo) | Developer-first. React email templates. Reliable delivery. |
| Booking | Cal.com | Free | Open-source. Webhook support for automation triggers. |
| Hosting | Vercel | Free tier | Auto-deploy from GitHub. Edge CDN. Serverless functions. |
| CDN / DNS | Cloudflare | Free | DDoS protection, free CDN on top of Vercel. |
| Payments | Stripe | Pay-per-use | No monthly fee. 2.9% + 30¢ per transaction. |
| Forms | React Hook Form | Free | Performant form validation. |
| State | Zustand | Free | Lightweight global state for auth + chat history. |

---

## 4. Local Development Setup

### Prerequisites

- **Node.js v20+** — [nodejs.org](https://nodejs.org) (LTS version)
- **Git** — already installed (confirmed v2.54)
- A code editor — VS Code recommended

### Step 1 — Clone the Repo

```bash
git clone https://github.com/steadfast-services/steadfast_student.git
cd steadfast_student/app
```

### Step 2 — Install Dependencies

```bash
npm install
```

This installs ~500MB of packages into `node_modules/` (not committed to git). Takes 2–3 minutes.

### Step 3 — Set Up External Services

Complete **Section 6** (Service Configuration) before running the app — the app will fail without valid API keys.

### Step 4 — Create Environment File

```bash
# Windows
copy .env.example .env.local

# Mac/Linux
cp .env.example .env.local
```

Fill in all values in `.env.local` (see Section 5).

### Step 5 — Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the landing page.

### Step 6 — Verify Everything Works

Check each of these manually:

```
✓ http://localhost:3000           — Landing page loads
✓ http://localhost:3000/services  — Services page
✓ http://localhost:3000/assessment — Assessment quiz (all 7 steps)
✓ http://localhost:3000/contact   — Form submits (check Supabase leads table)
✓ http://localhost:3000/portal    — Student dashboard (demo data)
✓ http://localhost:3000/admin     — CRM pipeline
✓ Chatbot button (bottom-right)   — Click, send "hello", get Sofia response
✓ Assessment quiz → email gate → results page
```

### Useful Dev Commands

```bash
npm run dev      # Start dev server (hot reload)
npm run build    # Production build (test before deploying)
npm run start    # Run production build locally
npm run lint     # ESLint check
```

---

## 5. Environment Variables Reference

File location: `app/.env.local` (never commit this file — it's in `.gitignore`)

```bash
# ── Supabase ────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
# Found in: Supabase dashboard → Project Settings → API → Project URL

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
# Found in: Supabase dashboard → Project Settings → API → anon public key
# Safe to expose in browser (row-level security enforces access control)

SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
# Found in: Supabase dashboard → Project Settings → API → service_role key
# NEVER expose in browser — server-side only. Bypasses RLS.

# ── Google Gemini AI ────────────────────────────────────────────────────────
GEMINI_API_KEY=AIzaSy...
# Found in: aistudio.google.com → Get API Key → Create API Key
# Free tier: 15 RPM, 1,000,000 tokens/day — zero cost at launch

# ── Resend Email ────────────────────────────────────────────────────────────
RESEND_API_KEY=re_...
# Found in: resend.com → API Keys → Create API Key

RESEND_FROM_EMAIL=advisors@steadfaststudentservices.com
# Must be a verified domain/email in your Resend account

# ── Cal.com Booking ─────────────────────────────────────────────────────────
CAL_API_KEY=cal_live_...
# Found in: cal.com → Settings → API Keys (optional — used for advanced features)

CAL_EVENT_TYPE_ID=123456
# Found in: cal.com → Event Types → click your event → check URL for ID

# ── Stripe Payments ─────────────────────────────────────────────────────────
STRIPE_SECRET_KEY=sk_live_...           # Use sk_test_... during development
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Use pk_test_... during dev
STRIPE_WEBHOOK_SECRET=whsec_...
# All found in: stripe.com → Developers → API Keys / Webhooks

# ── App Config ──────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=https://www.steadfaststudentservices.com
# During dev: http://localhost:3000

NEXT_PUBLIC_COMPANY_NAME=Steadfast Student Services

# ── Admin ───────────────────────────────────────────────────────────────────
ADMIN_EMAIL=admin@steadfaststudentservices.com
# Advisor alert emails are sent to this address
```

> **Note for Vercel:** Add every variable above to Vercel dashboard → Project → Settings → Environment Variables. Do NOT use `.env.local` in production — Vercel reads its own env store.

---

## 6. Service Configuration (One-Time Setup)

### 6.1 Supabase — Database, Auth & Storage

**Time required: ~20 minutes**

1. Go to [supabase.com](https://supabase.com) → Create account → New Project
2. Name: `steadfast-student-services` | Region: `us-east-1` | Set a strong DB password
3. Wait ~2 minutes for project to provision
4. **Initialize database schema:**
   - Go to SQL Editor (left sidebar)
   - Paste the full contents of `app/supabase-setup.sql`
   - Click **Run** — you should see "Success. No rows returned."
5. **Create storage bucket:**
   - Go to Storage (left sidebar) → New Bucket
   - Name: `student-documents` | Toggle: **Private** (not public)
   - Click Create
6. **Get API credentials:**
   - Go to Project Settings → API
   - Copy `Project URL` → paste as `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role` key → paste as `SUPABASE_SERVICE_ROLE_KEY`

**To enable Email Auth (magic link login for students):**
- Authentication → Providers → Email → Enable → Save
- Authentication → URL Configuration → set Site URL to your production domain
- Authentication → Email Templates → customize the magic link template with Steadfast branding

---

### 6.2 Google Gemini — AI Chatbot

**Time required: 5 minutes | Cost: Free (1M tokens/day)**

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with a Google account
3. Click **Get API Key** → Create API Key in New Project
4. Copy the key (starts with `AIzaSy...`) → paste as `GEMINI_API_KEY`

**Rate limits (free tier):**
- 15 requests per minute
- 1,000,000 tokens per day
- Sufficient for ~500–700 chat sessions per day at launch

**To upgrade later:** Create a Google Cloud billing account and enable the Gemini API — same key, higher limits.

**To switch to Claude (when budget allows):**
- Replace `src/lib/gemini.ts` with a Claude adapter using `@anthropic-ai/sdk`
- Change the API call in `src/app/api/chat/route.ts` to use the new adapter
- No frontend changes required

---

### 6.3 Resend — Transactional Email

**Time required: 15 minutes | Cost: Free (3,000 emails/month)**

1. Go to [resend.com](https://resend.com) → Create account
2. **Add your domain:**
   - Domains → Add Domain → enter `steadfaststudentservices.com`
   - Add the DNS records shown to Cloudflare (copy the TXT, MX, CNAME records)
   - Click Verify (takes 2–5 minutes for DNS to propagate)
3. **Create API key:**
   - API Keys → Create API Key → name: `production` → Full Access
   - Copy → paste as `RESEND_API_KEY`
4. Set `RESEND_FROM_EMAIL` to `advisors@steadfaststudentservices.com`

**While testing locally:** Use Resend's test domain (`onboarding@resend.dev`) — no domain setup needed. Only real emails need the verified domain.

**Email templates in `src/lib/email.ts`:**
- `sendWelcomeEmail()` — triggered on new lead creation
- `sendAssessmentResultEmail()` — triggered after quiz completion
- `sendBookingConfirmationEmail()` — triggered by Cal.com webhook
- `sendAdvisorAlert()` — internal notification to `ADMIN_EMAIL`

---

### 6.4 Cal.com — Consultation Booking

**Time required: 15 minutes | Cost: Free**

1. Go to [cal.com](https://cal.com) → Create account
2. **Connect your calendar:**
   - Settings → Calendars → connect Google Calendar or Outlook
3. **Create the consultation event type:**
   - Event Types → New → One-on-One
   - Title: `Free 30-Minute Enrollment Consultation`
   - Duration: 30 minutes
   - Location: Zoom or Google Meet (connect your account)
   - Availability: set your working hours
4. **Get your embed URL:**
   - Open your event type → Embed → Inline Embed
   - Copy the `src` URL (format: `https://cal.com/your-username/event-slug`)
   - Paste it into `src/app/book/page.tsx` → replace the `src` in the `<iframe>`
5. **Set up webhook for automation:**
   - Settings → Developer → Webhooks → Add Webhook
   - URL: `https://your-domain.com/api/notify`
   - Events: check `BOOKING_CREATED`, `BOOKING_CANCELLED`
   - This triggers the confirmation email automatically

---

### 6.5 Cloudflare — CDN, DNS & DDoS Protection

**Time required: 20 minutes | Cost: Free**

1. Buy domain at [Namecheap](https://namecheap.com) (~$12/year for `.com`)
2. Go to [cloudflare.com](https://cloudflare.com) → Add Site → enter your domain
3. Cloudflare will scan existing DNS records → Continue
4. Select Free plan → Continue
5. Copy the two Cloudflare nameservers shown
6. Go to Namecheap → your domain → Nameservers → Custom DNS → paste Cloudflare nameservers
7. Back in Cloudflare, wait 5–30 minutes for propagation
8. Add DNS record pointing to Vercel (see Vercel section below)

---

### 6.6 Vercel — Hosting & Deployment

**Time required: 10 minutes | Cost: Free tier**

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **Import the repository:**
   - New Project → Import `steadfast-services/steadfast_student`
   - **Root Directory:** set to `app` (important — the Next.js project lives in the `app/` subfolder)
   - Framework Preset: Next.js (auto-detected)
3. **Add environment variables:**
   - Expand Environment Variables section
   - Add every variable from Section 5 with production values
   - Mark sensitive keys as Production-only (not Preview)
4. Click **Deploy** — first deploy takes ~3 minutes
5. **Add custom domain:**
   - Project → Settings → Domains → Add `steadfaststudentservices.com`
   - Vercel shows a DNS record — add it in Cloudflare (type: CNAME, name: `@`, value: `cname.vercel-dns.com`)
6. SSL certificate is auto-provisioned within 60 seconds

**Auto-deploy behavior:** Every push to `main` triggers a new production deployment. Vercel also creates preview deployments for pull requests — very useful for testing before merging.

---

### 6.7 Stripe — Payments (Phase 2)

**Time required: 20 minutes | Cost: 2.9% + 30¢ per transaction**

1. Go to [stripe.com](https://stripe.com) → Create account
2. **During development:** use test mode keys (`sk_test_...`, `pk_test_...`)
3. **Add webhook:**
   - Developers → Webhooks → Add Endpoint
   - URL: `https://your-domain.com/api/stripe-webhook` (needs to be built in Phase 2)
   - Events: `payment_intent.succeeded`, `checkout.session.completed`
   - Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`
4. **Switch to live keys** when ready for real payments

> **Note:** Stripe is wired into the environment but the payment flow UI is not yet built. It is scheduled for Phase 2 (Weeks 4–7). The Stripe secret key is loaded but not actively called in the current codebase.

---

## 7. Database Schema

Run `app/supabase-setup.sql` once in the Supabase SQL Editor to create all tables, policies, and indexes.

### Tables

#### `leads`
Stores every inquiry before a student creates an account.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `email` | text | Unique — prevents duplicate welcome emails |
| `full_name` | text | Optional at first contact |
| `source` | text | `chatbot` \| `quiz` \| `contact` \| `blog` |
| `quiz_data` | jsonb | Raw assessment answers if source = quiz |
| `converted` | boolean | Set to `true` when lead becomes a student |
| `created_at` | timestamptz | Auto-set |

#### `students`
One row per enrolled student, linked to Supabase Auth (`auth.users`).

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | FK → `auth.users.id` |
| `full_name` | text | Required |
| `email` | text | Unique |
| `country_of_origin` | text | ISO country name |
| `risk_tier` | text | `low` \| `moderate` \| `high` |
| `risk_score` | integer | 0–100, from assessment algorithm |
| `service_package` | text | `standard` \| `premium` \| `elite` |
| `status` | text | `lead` → `active` → `enrolled` → `alumni` |
| `advisor_id` | uuid | FK → `advisors.id` |
| `last_active_at` | timestamptz | Updated on portal login (used by re-engagement flow) |

#### `applications`
Each school a student has applied to.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `student_id` | uuid | FK → `students.id` |
| `institution_name` | text | School name |
| `program` | text | Degree program |
| `status` | text | `draft` → `submitted` → `decision` → `enrolled` |
| `deadline` | date | Application deadline |
| `decision` | text | `accepted` \| `rejected` \| `waitlist` |
| `notes` | text | Advisor notes |
| `updated_at` | timestamptz | Auto-updated via trigger |

#### `documents`
Student-uploaded files stored in Supabase Storage.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `student_id` | uuid | FK → `students.id` |
| `doc_type` | text | `passport`, `transcript`, `bank_statements`, `sop`, `lor`, etc. |
| `file_path` | text | Path in Supabase Storage bucket `student-documents` |
| `status` | text | `pending` → `reviewing` → `approved` \| `rejected` |
| `advisor_notes` | text | Review feedback visible to student |

#### `chat_sessions`
Logs every chatbot conversation for analytics and lead recovery.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `session_key` | text | Anonymous browser fingerprint or auth uid |
| `student_id` | uuid | Null if anonymous visitor |
| `messages` | jsonb | Array of `{role, content, timestamp}` |
| `lead_captured` | boolean | Whether email was collected in this session |

### Row-Level Security (RLS)

All tables have RLS enabled. Students can only read/write their own rows. The `SUPABASE_SERVICE_ROLE_KEY` (server-side only) bypasses RLS for admin operations.

```sql
-- Example: students can only see their own applications
CREATE POLICY "Applications: own student" ON applications
  FOR ALL USING (student_id = auth.uid());
```

---

## 8. API Routes Reference

All routes are serverless functions deployed on Vercel. Base path: `/api/`

### `POST /api/chat`

Proxies messages to Google Gemini and returns Sofia's response.

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "What visa do I need?", "timestamp": 1719600000000 },
    { "role": "model", "content": "For academic programs...", "timestamp": 1719600005000 }
  ]
}
```

**Response:**
```json
{ "reply": "For academic programs, you will need an F-1 student visa..." }
```

**File:** `src/app/api/chat/route.ts`  
**Service:** `src/lib/gemini.ts` → `getChatResponse()`

---

### `POST /api/assessment`

Calculates a student's visa risk score and optionally saves the lead + sends an email.

**Request body:** Full `AssessmentAnswers` object (see `src/lib/types.ts`)

**Response:** `RiskResult` object:
```json
{
  "score": 62,
  "tier": "high",
  "denialRate": "62%",
  "packageRecommendation": "Elite Package",
  "keyFactors": ["Nigeria has a high consular denial rate (62%)..."],
  "nextSteps": ["Book a free 30-minute consultation...", "..."]
}
```

**File:** `src/app/api/assessment/route.ts`  
**Services:** `src/lib/assessment.ts` → `calculateRisk()`, `src/lib/email.ts` → `sendAssessmentResultEmail()`

---

### `POST /api/leads`

Creates a new lead in Supabase and sends the welcome email. Idempotent — duplicate emails are silently ignored.

**Request body:**
```json
{
  "email": "student@example.com",
  "full_name": "Adaeze Okafor",
  "source": "contact",
  "quiz_data": { "message": "I need help with my F-1 visa..." }
}
```

**Response:** `{ "status": "created" }` or `{ "status": "existing" }`

**File:** `src/app/api/leads/route.ts`  
**Services:** Supabase `leads` table, `src/lib/email.ts` → `sendWelcomeEmail()` + `sendAdvisorAlert()`

---

### `POST /api/documents`

Accepts a multipart form upload and stores the file in Supabase Storage, then records the document in the `documents` table and notifies the advisor.

**Request:** `multipart/form-data` with fields: `student_id`, `doc_type`, `file`

**Response:** `{ "success": true, "document_id": "uuid" }`

**File:** `src/app/api/documents/route.ts`

---

### `POST /api/notify`

Webhook handler for Cal.com bookings and internal notification triggers.

**Request body:**
```json
{
  "type": "booking_confirmed",
  "email": "student@example.com",
  "name": "Adaeze Okafor",
  "dateTime": "Monday, July 7, 2026 at 2:00 PM EST"
}
```

Supported `type` values: `booking_confirmed`, `advisor_alert`

**File:** `src/app/api/notify/route.ts`

---

## 9. Pages & Components Reference

### Pages

| Route | File | Auth | Key Features |
|---|---|---|---|
| `/` | `app/page.tsx` | Public | Hero, stats bar, 3 service cards, 5-step process, testimonials, CTA |
| `/services` | `services/page.tsx` | Public | Full package details, FAQ accordion |
| `/assessment` | `assessment/page.tsx` | Public | 7-step animated quiz, risk calculation, email gate, results screen |
| `/book` | `book/page.tsx` | Public | Cal.com iframe embed, prep checklist sidebar |
| `/about` | `about/page.tsx` | Public | Story, 6 stats, 4 values, CTA |
| `/contact` | `contact/page.tsx` | Public | Lead capture form → auto welcome email |
| `/resources` | `resources/page.tsx` | Public | Article cards, downloadable checklist list |
| `/portal` | `portal/page.tsx` | Student | Progress stages, doc checklist summary, applications summary, action items |
| `/portal/documents` | `portal/documents/page.tsx` | Student | Drag-and-drop upload (react-dropzone), document type selector |
| `/portal/applications` | `portal/applications/page.tsx` | Student | Kanban board (Draft/Submitted/Decision/Enrolled), add new application |
| `/admin` | `admin/page.tsx` | Admin | Stats cards, searchable lead table with tier/source/status |

> **Note:** Portal and Admin pages currently render with demo data. Wire them to live Supabase queries once auth is implemented (Phase 2).

### Key Components

#### `ChatWidget.tsx` (`src/components/chat/`)
Floating chatbot widget. Auto-opens after 45 seconds on first visit (using `sessionStorage` to prevent repeat). Contains quick-prompt buttons, streaming message display, and graceful error fallback.

**To customize Sofia's personality/knowledge:** Edit the `SYSTEM_PROMPT` constant in `src/lib/gemini.ts`.

#### `Navigation.tsx` (`src/components/layout/`)
Sticky navbar. Transparent over hero, white/blurred on scroll (`scrollY > 20`). Collapses to hamburger on mobile.

#### `Footer.tsx` (`src/components/layout/`)
Three-column link footer with contact info. Update phone and email here.

---

## 10. Automation Flows

All 12 flows are designed to run via Supabase Edge Functions or direct API calls. Currently, flows 1–4 are implemented via API routes. Flows 5–12 require Supabase Edge Functions (Phase 2).

| # | Trigger | Actions | Status |
|---|---|---|---|
| 1 | New lead form submit | Create DB record → welcome email → advisor alert | ✅ Built |
| 2 | Assessment quiz complete | Calculate risk → save lead → email results | ✅ Built |
| 3 | Booking confirmed (Cal.com webhook) | Confirmation email → advisor alert | ✅ Built |
| 4 | Document uploaded | Update checklist → advisor notification | ✅ Built |
| 5 | Application status change | Portal update → student email | 🔲 Phase 2 |
| 6 | Visa appointment saved | 7-day, 3-day, morning-of reminders | 🔲 Phase 2 |
| 7 | No portal login 14 days | Re-engagement email with progress summary | 🔲 Phase 2 |
| 8 | Application deadline approaching | 30/14/7/3/1 day countdown alerts | 🔲 Phase 2 |
| 9 | Offer letter received | Trigger acceptance decision workflow | 🔲 Phase 2 |
| 10 | I-20 / acceptance letter issued | Auto-start visa prep checklist | 🔲 Phase 2 |
| 11 | SEVIS fee payment reminder | 30-day reminder before F-1 appointment | 🔲 Phase 2 |
| 12 | Post-arrival check-in | 2-week post-enrollment email | 🔲 Phase 2 |

**To implement Flows 5–12:** Use Supabase Edge Functions with `pg_cron` extension for time-based triggers, or a lightweight cron job on Vercel (cron is a Pro feature — use an external free cron service like cron-job.org as an alternative).

---

## 11. Dev → Production Deployment Pipeline

### Phase 1 — Foundation (Weeks 1–3) `[CURRENT STATE]`

All of this is built and in the repository.

```
✅ Next.js project scaffold
✅ All public pages (Landing, Services, About, Contact, Resources, Book)
✅ AI chatbot (Gemini 1.5 Flash)
✅ Lead capture → Supabase → welcome email
✅ Risk assessment quiz + scoring algorithm
✅ Student portal (demo data — not yet wired to Supabase auth)
✅ Document upload UI (Supabase Storage ready)
✅ Application kanban (demo data)
✅ Admin CRM (demo data)
✅ Vercel deployment config
✅ Supabase schema + RLS policies
✅ All email templates
```

**To go live right now from this state:**

```bash
# 1. Clone repo and install deps
git clone https://github.com/steadfast-services/steadfast_student.git
cd steadfast_student/app && npm install

# 2. Set up external services (Section 6) and fill .env.local

# 3. Run locally to verify
npm run dev

# 4. Build and check for errors
npm run build

# 5. Import repo on Vercel — set root directory to "app" — add env vars — deploy
```

---

### Phase 2 — Student Portal & Auth (Weeks 4–7)

These are the next development tasks.

**Task 2.1 — Supabase Auth Integration**
- File to create: `src/middleware.ts` — protect `/portal/*` and `/admin/*` routes
- File to create: `src/app/login/page.tsx` — magic link login page
- Update `src/lib/supabase.ts` — add cookie-based auth using `@supabase/ssr`
- Update `src/app/portal/page.tsx` — replace demo data with live Supabase query using `auth.uid()`

```typescript
// Example: fetch real student data in portal/page.tsx
const { data: { user } } = await supabase.auth.getUser()
const { data: student } = await supabase
  .from('students')
  .select('*, applications(*), documents(*)')
  .eq('id', user.id)
  .single()
```

**Task 2.2 — Wire Document Upload to Supabase Storage**
- Update `src/app/portal/documents/page.tsx` — send files to `/api/documents` with real `student_id`
- Test upload → verify file appears in Supabase Storage → verify row in `documents` table

**Task 2.3 — Wire Applications Kanban to Supabase**
- Replace demo data in `portal/applications/page.tsx` with live query
- Implement status update: advisor changes status → triggers email to student (Flow 5)

**Task 2.4 — Admin Dashboard Auth Guard**
- Add role check in `/admin` — only users with `is_admin = true` (add column to `auth.users` metadata) can access

**Task 2.5 — Stripe Payment Flow**
- Create `src/app/api/stripe-webhook/route.ts` — handle `checkout.session.completed`
- Create `src/app/pay/page.tsx` — Stripe Checkout redirect
- Wire to student `service_package` field on successful payment

**Task 2.6 — Cal.com Embed Activation**
- Update `src/app/book/page.tsx` with real Cal.com embed URL (see Section 6.4)

---

### Phase 3 — Growth & Intelligence (Weeks 8–12)

**Task 3.1 — Blog Content (Resources)**
- Create `src/app/resources/[slug]/page.tsx` — dynamic article route
- Write 6 initial articles (country guides + visa tips)
- Add email gate for premium downloads (`/api/leads` call on download click)

**Task 3.2 — Remaining Automation Flows (5–12)**
- Implement via Supabase Edge Functions or external cron
- See Section 10 for full flow specs

**Task 3.3 — SEO**
- Add `generateMetadata()` to every page
- Create `src/app/sitemap.ts`
- Create `src/app/robots.ts`

**Task 3.4 — Analytics**
- Enable Vercel Analytics (free): add `<Analytics />` to `layout.tsx`
- Optionally: Plausible or PostHog for more detailed funnel tracking

**Task 3.5 — University Partner Portal**
- New section under `/admin/partners`
- Track MOU status per university partner (from the Playbook document)

**Task 3.6 — Performance & PWA**
- `next/image` for all images
- Add `manifest.json` for PWA installability
- Run Lighthouse audit → target score ≥ 90

---

## 12. Production Checklist

Run through this before going live. All items must be ✅.

### Security
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is NOT in any `NEXT_PUBLIC_` variable
- [ ] `.env.local` is in `.gitignore` and never committed
- [ ] All Supabase tables have RLS enabled (verify in Supabase → Authentication → Policies)
- [ ] Stripe is in live mode (not test mode)
- [ ] Admin route (`/admin`) is protected by auth middleware
- [ ] Cal.com webhook has a secret and is verified in `/api/notify`

### Functionality
- [ ] Submit contact form → receive welcome email in inbox
- [ ] Complete assessment quiz → receive results email
- [ ] Book consultation → receive confirmation email
- [ ] Upload a document → advisor alert email received
- [ ] Chatbot responds correctly for at least 10 test questions
- [ ] Chatbot collects email after 3+ messages

### Performance
- [ ] `npm run build` completes with 0 errors and 0 type errors
- [ ] Lighthouse score ≥ 80 on mobile (run in Chrome DevTools)
- [ ] All images use `next/image` (no raw `<img>` tags)
- [ ] No console errors in browser on any page

### Content
- [ ] Real phone number in `Footer.tsx` and `contact/page.tsx`
- [ ] Real email address in `Footer.tsx` and `RESEND_FROM_EMAIL`
- [ ] Cal.com iframe src is a real booking URL (not placeholder)
- [ ] At least 3 real student testimonials on landing page
- [ ] Privacy Policy page exists at `/privacy`
- [ ] Terms of Service page exists at `/terms`

### Deployment
- [ ] Custom domain connected in Vercel
- [ ] SSL certificate active (padlock in browser)
- [ ] Cloudflare DNS propagated (test with `nslookup steadfaststudentservices.com`)
- [ ] All env variables set in Vercel dashboard (not just locally)
- [ ] Supabase project is on a paid plan OR confirmed within free tier limits
- [ ] `NEXT_PUBLIC_APP_URL` set to production domain (not `localhost`)

---

## 13. Post-Launch Tasks

Complete these in the first 30 days after going live.

### Week 1
- [ ] Monitor Vercel function logs for errors (Vercel dashboard → Logs)
- [ ] Monitor Supabase for unexpected queries or RLS violations
- [ ] Check Resend delivery dashboard — verify emails are not landing in spam
- [ ] Test the full student journey end-to-end with a real email address
- [ ] Set up Cloudflare email alerts for DDoS or unusual traffic

### Week 2–4
- [ ] Review chatbot conversation logs in `chat_sessions` table — refine Sofia's system prompt based on real questions
- [ ] Set up Vercel Analytics and review top pages, bounce rates
- [ ] Publish first 3 blog articles to drive organic SEO traffic
- [ ] Submit sitemap to Google Search Console

### Month 2+
- [ ] Implement remaining automation flows (Phase 2, flows 5–12)
- [ ] Build Stripe payment flow for package enrollment
- [ ] Build real admin authentication for `/admin` route
- [ ] Review Gemini usage — if approaching 1M tokens/day, upgrade billing or switch to Claude Haiku

---

## 14. Troubleshooting

### `npm install` fails
- Ensure Node.js v20+ is installed: `node --version`
- Delete `node_modules/` and `package-lock.json`, then re-run `npm install`

### Chatbot returns "Failed to get response"
- Check `GEMINI_API_KEY` is set correctly in `.env.local`
- Verify key is valid at aistudio.google.com
- Check Vercel function logs for the actual error message
- Free tier rate limit is 15 RPM — if exceeded, responses fail for ~1 minute

### Welcome emails not sending
- Verify `RESEND_API_KEY` is correct
- Verify `RESEND_FROM_EMAIL` domain is verified in Resend dashboard (green checkmark)
- Check Resend logs at resend.com/emails for delivery status
- During dev, check the `logs/` in your Supabase project for server-side errors

### Supabase RLS blocking queries
- Confirm you are using `getServiceClient()` (service role) in server-side API routes — not the anon client
- The anon client is for client-side reads that should respect RLS
- Verify the policy allows the operation: Supabase → Authentication → Policies

### Vercel build fails
- Run `npm run build` locally first — errors are clearer in the terminal than in Vercel logs
- Common cause: TypeScript errors — fix all type errors before deploying
- Check that all `NEXT_PUBLIC_` variables are set in Vercel (not just `.env.local`)

### Cal.com booking page shows blank iframe
- Replace the placeholder `src` URL in `src/app/book/page.tsx` with your real Cal.com embed URL
- Ensure the event type is set to public (not private) in Cal.com settings

### Portal shows demo data instead of real student data
- Authentication is not yet implemented (Phase 2 task)
- The portal currently renders hardcoded demo data — see Task 2.1 to wire it to Supabase Auth

---

## 15. Cost Tracking

Monitor monthly — all services have usage dashboards.

| Service | Free Limit | Paid Plan | Upgrade Trigger |
|---|---|---|---|
| Vercel | 100GB bandwidth, 6K function invocations/day | $20/mo Pro | If bandwidth or function limit exceeded |
| Supabase | 500MB DB, 1GB storage, 50K MAU | $25/mo Pro | When DB approaches 400MB or 40K MAU |
| Gemini 1.5 Flash | 1M tokens/day, 15 RPM | ~$0.075/MTok input | When daily token limit is regularly hit |
| Resend | 3,000 emails/month | $20/mo (50K emails) | When monthly emails exceed 2,500 |
| Cal.com | Unlimited | $12/mo Teams | Only if team scheduling features needed |
| Cloudflare | Unlimited bandwidth | $20/mo Pro | Only if advanced WAF rules needed |
| Stripe | No monthly fee | 2.9% + 30¢/txn | N/A — scales with revenue |
| Domain | ~$12/year | — | Annual renewal |

**Expected monthly total:**
- **Launch (0–100 students):** ~$1/month
- **Growth (100–500 students):** ~$1–46/month
- **Scale (500+ students):** ~$46–65/month

All within the $50/month target at launch and growth phases.

---

*Document maintained by the Steadfast Student Services development team.*  
*For questions about the codebase, refer to inline comments in each file or open a GitHub issue.*
