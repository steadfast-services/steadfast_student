# Development Log

Running record of what's been built, what's pending manual setup, and what's next. Add a new dated entry at the top each session rather than editing old ones — this is a log, not a spec (see `DEVELOPER.md` for the current architecture reference).

---

## 2026-07-01 to 2026-07-02

### Fixed — Sofia chatbot was completely broken
Three separate bugs, found and fixed in sequence via real Vercel error logs:
- **`4201bd2`** — Gemini rejected every first message ("history must start with role user") because the client-seeded greeting was included in chat history sent to the model.
- **`8bfa34b` → `e50405f` → `0d515b5`** — `gemini-1.5-flash` was retired by Google (404), then `gemini-2.0-flash` turned out to have zero free-tier quota on this API key (429), settled on `gemini-flash-latest` with `maxOutputTokens` raised to 2048 (the model does internal "thinking" that was eating the token budget and producing truncated/generic replies at the old 400-700 limit).

### Built — "Educate Yourself" narrated guide (`77bfcff` → `40a9b0c`)
A chat-style modal that narrates a 100-question application FAQ (sourced from `resource-docs/top-100-us-university-application-answers.md`, parsed into `app/src/data/faq-guide.json` by `scripts/build-faq-guide.mjs`) using the browser's built-in speech synthesis, with animated line-by-line text reveal, play/pause/skip controls, and an "Ask Sofia" handoff that pauses narration and opens the chat widget. Along the way: fixed a Chrome-specific speech-queue race that was silently dropping the question-header narration (`ef4e3d6`), added a female-matched voice for question headers (`3e408d6`), and made the panel slide aside when Sofia's chat opens so the two never overlap (`0a5492f`).

### Built — Admin security + applicant question tracking (`902c55c`)
`/admin` had zero authentication despite showing real lead data — added an HTTP Basic Auth password gate (`app/src/middleware.ts`, `ADMIN_PASSWORD` env var, fails closed if unset). Also: every Sofia conversation is now logged to `chat_sessions` (previously only conversations that converted to a captured lead were saved), with a new "Applicant Questions" panel on `/admin` to review them weekly (7/14/30-day filter, search).

### Built — Real authentication (`b94ae9a`)
The app had no user accounts anywhere — `/portal` was 100% hardcoded demo data with no session handling, same as `/admin` had been. Added real Supabase Auth: `/sign-up`, `/sign-in`, session-refresh middleware via `@supabase/ssr`, a `handle_new_user` Postgres trigger that reliably creates a `students` row on signup, `/portal` now actually gated behind login, and Navigation shows real signed-in state. Also added a homepage prompt that asks first-time visitors for their country 2 minutes after landing (blocking modal, saved to `sessionStorage`), which pre-fills the sign-up form.

### Built — Real document collection + unified student data (`f2a2397`)
`/api/documents` already uploaded to Supabase Storage correctly, but the frontend (`portal/documents/page.tsx`) never called it — it was a fake `setTimeout`. Wired the real upload through, and fixed a real security gap where the route trusted a client-supplied `student_id` instead of the authenticated session. Assessment quiz results now persist to the signed-in student's own record (previously computed and shown once, then discarded). Chat conversations link to the account when the visitor is signed in. Added a lightweight `student_milestones` timeline (account created, assessment completed, document uploaded, consultation booked) — not a CRM, just a clean record of what happened when per student.

### Also produced this session (docs, not app code)
- `docs/user-testing-plan.md` — plan for testing with real target-market users before/after launch.
- `docs/student-loan-landscape.csv` — bank/loan landscape across the 12 countries served.
- `resource-docs/top-100-us-university-application-questions.md` + `...-answers.md` — the FAQ content that powers the Educate Yourself guide.

---

## Pending manual setup (do these before the features above fully work)

Run in the Supabase SQL Editor, **in this order** (the trigger references `student_milestones`, so that table must exist first):
1. Storage bucket + policy block in `app/supabase-setup.sql` (creates `student-documents` bucket via SQL).
2. `student_milestones` table definition.
3. Re-run the `handle_new_user` trigger function (now also records an `account_created` milestone — safe to re-run, uses `create or replace`).
4. Confirm in Supabase Dashboard → Authentication → Providers → Email whether "Confirm email" is on (both sign-up UX branches are handled in code either way, just worth knowing which one applies).

In Vercel:
- `ADMIN_PASSWORD` must be set or `/admin` returns 503 by design (fails closed).

Two unrelated local files have been sitting uncommitted since 2026-07-01 and were intentionally left out of every push this session as out-of-scope: `app/src/app/assessment/page.tsx` and `docs/email-template-ambassador.md`. Worth finishing or discarding.

---

## What's next

**Immediate/deferred roadmap** (planned but not built — see `forum_auth_roadmap` context for full reasoning if picking this back up):
- **Stripe payments** — advisor-generated custom payment links per student (not public fixed pricing, to preserve Sofia's "personalized quote" sales model), with a webhook flipping `students.status` to `enrolled`.
- **Sofia access gating** — first-contact chat stays open to anonymous visitors; deeper help would prompt sign-in inline. Needs a plan for merging pre-login chat history into the account after a later login.
- **The community forum** ("You Are Not Alone") — one schema with a `risk_tier` column filtered per-user (not three separate forums), posting gated to enrolled students, needs a moderation plan.

**Also flagged, not yet scheduled:**
- `/portal`'s main dashboard and applications pages are still hardcoded demo data (only the documents page was made real this session) — TODO comment left in `portal/page.tsx`.
- No UI yet for the `student_milestones` timeline — the data layer exists, nothing displays it.
- Content work (the user has said this is a deliberate later pass, not urgent now).
- Broader accessibility — the narrated guide is a start, not full screen-reader (VoiceOver/NVDA/JAWS) compatibility across the site.
- Longer-term, non-code items raised in strategy discussion: industry accreditation (e.g. AIRC) and a real outcomes-tracking system are what actually unlock direct university partnerships — app features support that story but don't substitute for it.
