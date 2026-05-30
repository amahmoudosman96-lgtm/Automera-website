# WhatsApp Bot MVP — Build Spec Addendum (to v1.2)

**Status:** Build-ready addendum · resolves the gaps left open by `WhatsApp_Bot_MVP_1.2_final.pdf`
**Relationship to v1.2:** The PDF remains the product/strategy source of truth. This document resolves the
engineering decisions v1.2 deliberately or accidentally left unspecified, so that an AI-agent build loop can
start Phase 1 without re-litigating architecture mid-build.
**Date:** 2026-05-30

---

## 0. Decisions locked in this addendum

These four were confirmed with the founder and are now fixed for v1:

| # | Decision | Choice |
|---|----------|--------|
| D1 | Product codebase location | **New dedicated repo** (separate from the marketing website) |
| D2 | Control-page authentication | **Managed auth provider** |
| D3 | Non-text WhatsApp messages | **Transcribe (voice) + OCR/vision (images, PDFs)**, then classify extracted text |
| D4 | Immediate deliverable | **This document** — no app code yet |

Everything below either (a) makes a concrete recommended decision with rationale, or (b) is tagged
**🔲 NEEDS INPUT** because it depends on a fact only the founder knows or a commercial choice. The
consolidated list of NEEDS-INPUT items is in §17.

---

## 1. Repository & project structure (D1)

A single new repo, `automera-whatsapp-bot`, Python-end-to-end backend plus the Next.js control page,
matching the v1.2 stack table. Proposed top-level layout:

```
automera-whatsapp-bot/
├─ apps/
│  ├─ api/                      # FastAPI: webhook receiver, classifier, router, REST for control page
│  │  ├─ ingestion/             # Meta webhook handler, HMAC verify, payload → message envelope
│  │  ├─ classifier/            # LLM call, prompt, Pydantic schemas, model tiering
│  │  ├─ media/                 # transcription + OCR pipeline (D3)
│  │  ├─ identity/              # per-message resolution + weekly sweep
│  │  ├─ destinations/          # google_sheets.py, webhook.py, recipes/
│  │  ├─ rules/                 # rule engine
│  │  ├─ control_chat/          # interactive-button flow + pending-action state machine
│  │  ├─ audit/                 # audit log writes/queries
│  │  ├─ db/                    # SQLAlchemy 2.0 models, Alembic migrations
│  │  └─ core/                  # config, auth glue, tenancy, queue, LLM provider abstraction
│  └─ control-page/             # Next.js 15 + TS; Inbox, Sources, Destinations, Rules, Admin/Eval
├─ packages/
│  └─ eval/                     # CLI eval tool, golden set (JSONL), HTML+JSON reporters
├─ deploy/
│  ├─ saas/                     # shared multi-tenant infra (Render/AWS)
│  └─ self-hosted/              # single-tenant Terraform + vLLM/Qwen swap-in (Phase 5, gated)
├─ DESIGN-SPEC.md               # 🔲 NEEDS INPUT — referenced by v1.2 but absent; must be supplied/recreated
└─ AGENTS.md                    # agent build instructions (spec-per-deliverable loop)
```

**🔲 NEEDS INPUT (D1-a): `DESIGN-SPEC.md` does not exist in any accessible repo.** v1.2 §11 and the
"DESIGN SYSTEM" callout treat it as already-written and governing every screen (Inter/Cairo, colour tokens,
spacing, component patterns, Stripe-meets-Linear aesthetic). The frontend cannot be built coherently without
it. Please either (i) provide the file, or (ii) authorize me to draft a first `DESIGN-SPEC.md` from the
aesthetic cues in v1.2 and the existing marketing-site tokens (Geist/Inter, the colour system already in this
repo) for your review.

---

## 2. Authentication & authorization (D2)

v1.2 never mentions auth at all. Concrete model:

- **Provider:** managed auth. Recommend **Clerk** (fastest polished React integration, org/multi-tenant
  primitives built in) for the SaaS tier. **Caveat for the regulated tier:** Clerk is US-hosted SaaS, which
  conflicts with the "data never leaves the client environment" promise. For self-hosted/Phase 5, the auth
  layer must be swappable to a self-hostable provider (**Supabase Auth**, **Ory Kratos**, or **Authentik**).
  → Decision: abstract auth behind a thin internal interface so SaaS=Clerk, self-hosted=Supabase/Ory is a
  config swap, not a rewrite. **🔲 NEEDS INPUT (D2-a):** confirm Clerk for SaaS, or name a preferred provider.
- **Tenancy binding:** every authenticated user belongs to exactly one `tenant` (client). One organization in
  the auth provider == one tenant. Enforced server-side on every request (see §3).
- **Roles (v1):** `owner` and `operator` only. `owner` manages destinations, rules, billing, and user invites;
  `operator` triages the inbox and resolves identity matches. Deferring richer RBAC to v2.
- **Control-chat ↔ account binding (the missing link in v1.2):** the WhatsApp number that receives
  control-chat pings must be mapped to a control-page user. During onboarding the owner enters/verifies the
  control-chat WhatsApp number; the system stores `tenant.control_chat_phone_e164`. Inbound control-chat
  button replies are authenticated by matching the sender's E.164 against that field (plus a short-lived
  signed token embedded in the interactive message payload — see §11). No control action is honored from an
  unbound number.

---

## 3. Multi-tenancy & data isolation

v1.2 names "SaaS multi-tenant" and "single-tenant regulated" but not the mechanism.

- **SaaS tier:** **shared Postgres, row-level isolation by `tenant_id`** on every business table, enforced by
  **Postgres Row-Level Security (RLS)** plus an application-layer `tenant_id` filter (defense in depth). Every
  query runs under a session GUC (`app.current_tenant`) set from the authenticated principal. RLS is chosen
  over schema-per-tenant because per-client volume is "low thousands of messages/month" — a single small
  Postgres comfortably holds all SaaS clients, and RLS is far less operational overhead than N schemas.
- **Self-hosted/regulated tier:** the *same* schema, deployed single-tenant — one database, one tenant,
  RLS still on (harmless, keeps code identical). This is the "same code, different topology" promise in v1.2 §10.
- **Secrets per tenant** (WABA tokens, Sheets service-account creds, webhook URLs, recipe secrets) stored
  encrypted at rest (envelope encryption; KMS in SaaS, client-supplied key in self-hosted). Never in plaintext
  columns.

---

## 4. Data model (concrete schema)

v1.2 names the tables but not their columns. Proposed core schema (Postgres, all business tables carry
`tenant_id` + RLS):

- **`tenants`** — id, name, tier (`saas`|`self_hosted`), control_chat_phone_e164, waba_id,
  phone_number_id, soft_cap_records, created_at.
- **`sources`** — id, tenant_id, wa_chat_id, kind (`direct`|`group`), display_name, **`excluded` bool**
  (opt-out model from v1.2 §4), created_at. (We store the exclusion list, not an inclusion list.)
- **`messages`** — id, tenant_id, wa_message_id (unique per tenant — idempotency, see §6), source_id,
  sender_phone_e164, sender_wa_name, direction, type (`text`|`audio`|`image`|`document`|`other`),
  body_text, media_id, media_mime, transcript_text (D3), received_at, raw_payload (jsonb).
- **`classifications`** — id, tenant_id, message_id, intent, person_name, person_appears_to_be,
  company_name, company_domain_hint, phone_e164, language, summary_one_line, suggested_record_type,
  confidence_overall, confidence_intent, confidence_person, confidence_company, model_used, prompt_version,
  latency_ms, created_at. (Mirrors the §3 schema 1:1 — same Pydantic model.)
- **`inbox_items`** — id, tenant_id, message_id, classification_id, status
  (`pending`|`auto_routed`|`confirmed`|`skipped`|`needs_review`), band (`high`|`medium`|`low`),
  assigned_action (jsonb), resolved_by, resolved_at.
- **`crm_cache`** — id, tenant_id, external_record_id, record_type, name, company, phones (array, E.164),
  emails, source_destination_id, last_synced_at. *(Resolves the lookup tension — see §10.)*
- **`identity_resolutions`** — id, tenant_id, message_id, candidate_ids (jsonb), decision
  (`merge`|`link_related`|`new`), decided_by, decided_at, considered (jsonb, for "never ask twice").
- **`destinations`** — id, tenant_id, kind (`google_sheets`|`webhook`), label, config (jsonb: sheet URL /
  webhook URL + recipe id), field_mapping (jsonb), created_at.
- **`rules`** — id, tenant_id, name, conditions (jsonb), action (jsonb), enabled, priority, created_at.
- **`audit_log`** — id, tenant_id, message_id, action, classification_snapshot (jsonb), destination_id,
  destination_record_id, destination_record_url, actor (`bot`|user_id), created_at.
- **`eval_runs`** — id, golden_set_version, model, prompt_version, overall_accuracy, per_field (jsonb),
  calibration (jsonb), per_language (jsonb), confusion (jsonb), created_at.

All Pydantic v2 models live once and back the LLM output, the DB row, and the REST contract (v1.2 §9).

---

## 5. Message ingestion — reliability details (not in v1.2)

The Meta Cloud API has delivery semantics v1.2 doesn't address:

- **HMAC verification:** validate `X-Hub-Signature-256` against the app secret on every POST; reject on
  mismatch. (v1.2 mentions this — keeping it explicit.)
- **Idempotency:** Meta **re-delivers** webhooks on non-2xx and sometimes duplicates. Dedup on
  `wa_message_id` (unique constraint per tenant). Return `200` quickly *after* enqueue, before classification,
  so Meta doesn't retry on slow LLM calls.
- **Ordering:** WhatsApp messages can arrive out of order; conversation-history assembly (§8) must order by
  message timestamp, not arrival.
- **Status webhooks:** Meta also sends `statuses.*` (delivered/read) events — filter these out of the
  classification path; only `messages.*` enter the pipeline.
- **Queue:** v1.2 says FastAPI background tasks for MVP → arq+Redis at scale. Acceptable, but the
  webhook handler must persist the raw envelope to `messages` *before* enqueuing, so a worker crash never
  loses a message (at-least-once + idempotency = effectively once).

---

## 6. Media handling pipeline (D3)

GCC traffic is voice-note-heavy; v1.2's schema is text-only. Pipeline:

1. Webhook receives a media message → store `messages` row with `media_id`, download the media via the
   Meta media endpoint into tenant-scoped object storage (S3/compatible; client-bucket in self-hosted).
2. **Audio (voice notes):** transcribe. **🔲 NEEDS INPUT (D3-a):** transcription provider — recommend
   **OpenAI Whisper API** for SaaS (strong Arabic + dialect), with a self-hostable **`whisper.cpp`/`faster-whisper`**
   path for the regulated tier (no audio egress). Confirm acceptable, or name a preferred ASR.
3. **Images / PDFs:** extract text. Recommend the **vision capability of the primary LLM** (Claude) for
   images and business cards (handles layout + Arabic better than classic OCR); fall back to **Tesseract**
   for the self-hosted tier. Documents (PDF) → text extraction then same classifier path.
4. The extracted `transcript_text` flows into the **same** classifier as `body_text`. The classifier prompt is
   told the source modality (a transcript is noisier than typed text) so it can calibrate confidence down
   slightly for ASR output.
5. **Cost note:** transcription + vision raise per-message cost above v1.2's "single-digit dollars" estimate.
   Still small at MVP volume, but the cost model in §16 of the PDF should be updated. Add a per-tenant
   monthly media-processing ceiling as a guardrail.

---

## 7. Conversation-history retrieval (under-specified in v1.2)

The confidence rubric explicitly depends on prior context. Define it:

- Per incoming message, fetch the **last N messages in the same `wa_chat_id`** (recommend N=10 or a
  ~2,000-token budget, whichever is smaller), ordered by timestamp, oldest→newest, and include them in the
  classifier prompt as prior turns with role + timestamp.
- History comes from our own `messages` table (we already persist everything on the watched number), so no
  extra Meta API calls.
- Token budget capped so escalation-tier calls don't balloon cost; truncate oldest-first.

---

## 8. Classifier service (model pinning + tiering)

- **Tiering (v1.2 §7):** first pass on the cheap tier; escalate when `confidence.overall < 0.85`. Concrete:
  re-run the *same* message+history through the larger model, take the larger model's result.
- **🔲 NEEDS INPUT (D8-a): pin exact model IDs.** v1.2 says "Haiku first, Sonnet/Opus on escalation" and
  "OpenAI as peer fallback," but model availability has moved since the doc was drafted. Recommend pinning
  the current Claude Haiku tier as first-pass and the current Sonnet tier as escalation, with an OpenAI peer
  for the eval anchor + outage fallback — but I need you to confirm the specific model IDs (and whether
  budget allows Opus on the hardest escalations). These go in config, not code.
- **Structured output:** constrained decoding / tool-call mode enforcing the §3 Pydantic schema. Reject +
  retry once on schema-invalid output; on second failure, mark `unclear` and route to inbox.
- **Prompt versioning:** every classification stores `prompt_version`; the eval tool keys regressions to it.
- **Provider abstraction:** one internal `classify(message, history) -> Classification` interface with
  Anthropic / OpenAI / vLLM-Qwen implementations behind it (enables the self-hosted swap and the eval
  cross-provider runs).

---

## 9. Identity resolution — resolving the architectural contradiction

**This is the most important correction in this addendum.** v1.2 §7 says every message does a synchronous
**lookup against the destination CRM**, but v1.2 §5 commits to **webhook-only destinations (no native CRM
connectors)** — and a generic outbound webhook **cannot be queried**. These two sections contradict each
other. The bot cannot read HubSpot/Pipedrive through a write-only Zapier/Make webhook.

Resolution for v1:

- Per-message identity check runs against **our own `crm_cache`** (§4), not the live CRM. The cache is
  populated two ways:
  1. **Write-through:** every record the bot creates is also written to `crm_cache` — so the bot always knows
     about contacts *it* created (the common duplicate source).
  2. **Google Sheets:** the native Sheets connector *can* read back, so for Sheets destinations the cache can
     be refreshed by reading the sheet.
- For pure-webhook CRMs (HubSpot etc.) where we genuinely cannot read back in v1, be **honest in the
  product**: per-message dedup covers bot-created records and Sheets; cross-system dedup against records
  created *outside* the bot is a **v2** capability (matches v1.2's own out-of-scope row "auto-dedup across
  multiple destination CRMs"). This needs to be said explicitly so the pilot isn't surprised.
- **🔲 NEEDS INPUT (D9-a):** confirm this framing, OR decide that HubSpot specifically warrants a *read*
  integration (a small exception to webhook-only) to make per-message dedup real for the most common CRM.
- **Fuzzy matching mechanics:** E.164 exact + alternate-phone match (primary signal); name+company fuzzy
  match via `rapidfuzz` (token-set ratio) with thresholds: ≥0.92 auto-merge candidate (still surfaced for
  medium band), 0.75–0.92 surface for review, <0.75 treat as new. Thresholds tunable per tenant.

---

## 10. Control-chat state machine (missing in v1.2)

The interactive-button flow needs server-side state v1.2 doesn't describe:

- On medium-confidence classification, send a WhatsApp **interactive button message** to
  `control_chat_phone` with buttons `Confirm` / `Change` / `Skip`. Each button's `id` encodes
  `inbox_item_id` + a short-lived **signed token** (HMAC, ~15 min TTL) so replies are authenticated and
  bound to a specific pending item.
- Inbound button reply → verify token + sender E.164 == `control_chat_phone` → apply action → write audit
  → send a one-line confirmation back in the control chat.
- **Expiry/timeout:** if no reply within a window (recommend 24h, inside the Meta service window), the item
  stays in the control-page inbox as the fallback — the button message just expires.
- **`Change`** deep-links to the control-page inbox item.
- High-confidence: no buttons, one-line audit summary only. Low-confidence: straight to inbox, no ping.

---

## 11. Destinations & recipe format

- **Google Sheets:** service-account model (v1.2 table). Onboarding: user pastes sheet URL + shares it with
  the service-account email. Field mapping stored per destination.
- **Webhook recipes:** define the recipe artifact concretely — a versioned JSON template per destination
  (HubSpot, Pipedrive, Notion, Airtable) describing the payload shape + a field-mapping UI binding our
  internal record fields → the recipe's placeholders. Ship the 3 recipes named in Phase 2 (HubSpot,
  Pipedrive, Notion). Store recipe id + resolved mapping on the `destinations` row.
- **Delivery reliability:** webhook POSTs get retry-with-backoff + a dead-letter surface in the admin view so a
  failed route is visible, not silently lost. Every attempt + final record id/url written to `audit_log`.

---

## 12. Rules engine

Matches v1.2 §9 (simple, no DSL). Conditions stored as jsonb list (`sender_in_list`, `sender_is_new`,
`message_contains`), ANDed, with `priority` ordering; first match wins, action auto-routes + writes audit with
`actor=bot`. Auto-routed items still appear in the inbox marked `auto` (audit-trail requirement, v1.2 §4).

---

## 13. Eval tool — confirmations

v1.2 §12 is already detailed. Two clarifications needed:

- **CI gate:** "blocks merge if accuracy drops >2pp" requires the golden set + a provider API key available in
  CI. **🔲 NEEDS INPUT (D13-a):** confirm we can store an LLM key in CI secrets, or the gate runs against a
  cached/recorded-response fixture instead (cheaper, deterministic, no live key).
- **Golden set ownership:** real client messages promoted into the golden set are customer data. Define a
  redaction/consent rule before any production message enters a repo-committed JSONL (ties to §14).

---

## 14. Data residency, retention, PII (partially in v1.2 §10)

- **Retention:** **🔲 NEEDS INPUT (D14-a):** how long do we keep raw WhatsApp content + media? Recommend
  a configurable per-tenant retention (default 12 months) with hard delete of raw bodies/media after, keeping
  only the structured classification + audit record. Regulated tenants may demand shorter.
- **Subject deletion (PDPL/GDPR):** need a "delete everything for this phone number / contact" operation.
  Not in v1.2; recommend including a minimal version in v1 since GCC regulated buyers will ask.
- **Golden-set PII:** production messages promoted to the eval set must be redacted (names/numbers
  pseudonymized) before being committed to git, or the golden set must live outside the repo in
  tenant-scoped storage.
- **Self-hosted LLM path:** §10's open-weights/Bedrock question is already well-framed; tracked as an
  external watch item, not a blocker for SaaS Phase 1–4.

---

## 15. Localization of the control page itself

v1.2 specifies Cairo/Inter fonts but not whether the UI chrome is bilingual/RTL. Recommend: **English UI
chrome for v1** (the operator is typically the founder/ops lead), with Arabic *data* rendered correctly
(RTL-aware text rendering inside inbox cards, Cairo font). Full RTL UI mirroring = v2. **🔲 NEEDS INPUT
(D15-a):** confirm English-chrome-for-v1 is acceptable for your pilot clients.

---

## 16. Updated cost model note

v1.2 §"COST EXPECTATIONS" predates D3. Add: transcription (~$0.006/min Whisper) and vision/OCR per
media message. At low-thousands msgs/month with a media minority, still well under the $20/client target, but
the soft cap should count media-heavy clients separately. Recommend surfacing per-tenant monthly LLM +
media spend in the admin view.

---

## 17. Consolidated open questions (NEEDS INPUT)

Grouped by urgency. The first block blocks Phase 1; the rest can be answered during Phase 0/1.

### Blocks starting the build
1. **(D1-a) `DESIGN-SPEC.md`** — provide it, or authorize me to draft one from v1.2 + the marketing-site tokens?
2. **(D8-a) Model IDs** — confirm the exact first-pass / escalation / fallback model IDs and whether Opus is
   budgeted for hardest escalations.
3. **(D2-a) Auth provider** — confirm Clerk for SaaS (+ Supabase/Ory for self-hosted), or name another.
4. **Accounts/access** — do you already have: a verified Meta Business + WABA (or test number)? Anthropic +
   OpenAI API access? A cloud account for hosting (AWS/Render)?

### Shapes Phase 1–2
5. **(D3-a)** Transcription provider (Whisper API vs self-hostable) — confirm.
6. **(D9-a)** Identity dedup framing — accept "cache + Sheets only in v1, webhook CRMs are v2 for read-back",
   or fund a HubSpot *read* exception?
7. **(D13-a)** Can we put an LLM key in CI for the eval gate, or use recorded fixtures?
8. **(D14-a)** Data-retention default + do we include subject-deletion in v1?
9. **(D15-a)** English UI chrome for v1 acceptable?

### Commercial / Phase 0
10. **Named pilot?** Do you already have ≥1 of the "2–3 LOIs" from Phase 0, or is sourcing them part of the work?
11. **Soft-cap number** — what's the routed-records soft cap, and what happens on overage (warn? throttle?
    overage fee?)?
12. **Self-hosted tier pricing** — v1.2 §15 leaves this open pending GCC conversations; flagged so it isn't
    forgotten before Phase 5.
13. **Group messages** — confirm the bot watches WhatsApp *group* chats too (v1.2 §2 says "groups"); group
    sender identity + per-participant extraction has extra edge cases worth a dedicated mini-spec.

---

## 18. Recommended first build slices (once §17 block-1 is answered)

Unchanged from v1.2's Phase 1, sequenced for the agent loop:
1. Repo scaffold + Pydantic schemas (the §3 schema is the single source of truth — build it first).
2. Meta webhook receiver with HMAC + idempotency + persist-before-enqueue (§5).
3. Classifier with provider abstraction + tiering + structured output (§8).
4. Eval tool + 50-example golden set → baseline number (v1.2 §12).
5. Only then: control page (Phase 2).

Media pipeline (§6) slots in right after the text classifier works end-to-end, before the first pilot, so
voice-note traffic isn't a Phase-3 surprise.
