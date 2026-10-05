# VATANDOSH_MASTER_CONTEXT.md

> Permanent product, architecture, roadmap, and engineering context for Vatandoshlar.de.
>
> Purpose: this document is the canonical handoff context for future development sessions and AI-assisted work. A new development session should read this document before making architectural or product changes.
>
> IMPORTANT:
> - Do not infer missing project state.
> - Anything marked `UNKNOWN / NEEDS VERIFICATION` must be verified from the repository, database, deployment environment, or product owner before implementation.
> - Repository code and database schema remain the source of truth for implementation details.
> - This document records product and architecture decisions; it does not replace source code or migrations.

---

# 1. Product Vision

## 1.1 What Vatandoshlar.de is

Vatandoshlar.de is a digital platform for Uzbeks living in Germany.

The long-term goal is to evolve from an information-oriented diaspora portal into a community platform that users regularly use for:

- reliable information;
- practical guidance;
- local discovery;
- professional help;
- community questions and answers;
- finding other Uzbeks;
- trusted real-world matching;
- jobs and opportunities;
- events;
- businesses and services;
- personalized assistance;
- AI-assisted navigation through life in Germany.

Germany is the current primary market.

Expansion to Uzbek communities in other countries may be considered later.

## 1.2 Core strategy

The long-term product strategy is:

**Utility → Personalization → Ecosystem**

The existing platform provides utility.

The next stages add:

1. identity and personalization;
2. community participation;
3. trusted matching;
4. local ecosystem discovery;
5. AI;
6. eventually a mobile application.

## 1.3 Long-term product positioning

Vatandoshlar.de should not be treated only as:

> an information portal for Uzbeks in Germany.

The intended product direction is:

> **Vatandoshlar.de is a knowledge, community, local discovery, and trusted matching platform for the Uzbek diaspora.**

## 1.4 Core future product layers

The platform is expected to develop around four interconnected layers.

### Knowledge

- Guide
- News
- Vatandosh Savol
- Verified Expert answers
- Vatandosh AI
- Hayot Navigatori

### Community

- Questions
- Answers
- User profiles
- Experts
- Events
- Telegram communities
- Community participation

### Local

- Mening shahrim / My City
- Places
- Specialists
- Entrepreneurs
- Businesses
- Events
- Uzbek Map Germany

### Matching

- Vatandosh Market
- Trips
- Travel companions
- Airport pickup
- Help requests
- Delivery / carrying requests
- Smart Matching

All of these eventually share:

**Vatandosh ID + Location + Trust + Notifications**

---

# 2. Current Production State

## 2.1 General state

The existing Vatandoshlar.de web platform is functional and already contains multiple production-oriented public and admin modules.

The project is not a greenfield application.

Existing functionality must be preserved while the platform evolves.

## 2.2 Confirmed production history

Previously confirmed deployed work includes the refined public Support experience.

Known successful production/build baseline includes:

- Next.js production builds succeeding;
- UZ/DE localization;
- public content modules;
- admin functionality;
- PostgreSQL-backed content;
- Specialists;
- Guide;
- Telegram;
- Support;
- other existing modules listed below.

## 2.3 Latest local/branch work

Latest confirmed Git commit in the current development context:

`77e0a53 feat(specialists): add Muzaffar Nuritdinkhodjaev entrepreneur profile`

This commit includes:

- Muzaffar Nuritdinkhodjaev entrepreneur profile;
- entrepreneur category support in specialist verification;
- entrepreneur inclusion in the Specialists `all` filter;
- profile image;
- migrations 063 and 064.

Local migrations 063 and 064 were successfully applied.

Latest validation before commit:

- `npx tsc --noEmit` — PASS
- `npm run lint` — PASS
- `npm run build` — PASS
- `git diff --check` — PASS
- Next.js build generated 92/92 static pages successfully.

## 2.4 Git / deployment state requiring verification

Branch:

`feature/i18n-v2`

Latest confirmed local commit:

`77e0a53`

The user moved to product planning before providing the output of:

`git push origin feature/i18n-v2`

Therefore:

**Latest commit push status: UNKNOWN / NEEDS VERIFICATION**

Do not assume commit `77e0a53` is on the remote repository or production.

Earlier Telegram milestone commit:

`0d008b3 feat(telegram): add regional community detail experience`

Its final remote/deployment state also needs verification if relevant.

**Production application of migrations 062, 063, and 064: UNKNOWN / NEEDS VERIFICATION**

Local application is confirmed.

---

# 3. Tech Stack / Architecture

## 3.1 Confirmed stack

- Next.js App Router
- Next.js 16.2.12
- React
- TypeScript
- TypeScript strict mode
- Tailwind CSS v4
- next-intl
- PostgreSQL
- Railway production environment
- Git / GitHub

Repository:

`vatandoshlar-portal`

Primary working branch in recent development:

`feature/i18n-v2`

## 3.2 Languages

Current supported product languages:

- Uzbek (`uz`)
- German (`de`)

Do not introduce another UI language without an explicit product decision.

New product modules must preserve UZ/DE localization.

## 3.3 Architecture principles

### PostgreSQL is the canonical runtime source

Database-backed entities must not acquire a second independent static source of truth.

Existing recovery/seed scripts must not silently become runtime data sources.

### Reuse existing architecture

Do not create duplicate systems for:

- locations;
- users;
- specialists;
- businesses;
- translations;
- search;
- authentication;
- categories;
- content.

### Business logic should not be trapped inside UI components

Future architecture must support both web and mobile clients.

Preferred direction:

Domain / Service
→ Repository
→ PostgreSQL

Web UI should consume the same domain/business logic that a future mobile/API layer can use.

Do not build a native app now, but do not design new backend logic so that it can only be used from React server/client components.

## 3.4 Engineering principles

- production-grade changes;
- minimal scope;
- no unnecessary large refactors;
- preserve existing architecture;
- strict TypeScript;
- selective Git staging;
- Conventional Commits;
- test before commit;
- no unrelated changes in feature commits;
- inspect the source of truth before changing behavior;
- do not guess missing implementation details;
- mobile-first;
- dark mode support;
- accessibility;
- focus-visible behavior;
- reduced-motion considerations.

---

# 4. Existing Modules

Known existing public/product sections include:

- Home
- News
- Germany Guide
- Services
- Specialists
- Jobs
- Telegram
- Events
- Founder / About
- Support
- Privacy
- Account / Profile
- My City / Mening shahrim

Known admin areas include:

- Admin dashboard
- News
- Guide
- Jobs
- Services
- Specialists
- Support
- Telegram
- Events
- Analytics

The current application also contains:

- authentication routes;
- account routes;
- search infrastructure;
- analytics/content-view infrastructure;
- sitemap;
- robots;
- manifest.

Exact production completeness of every admin/public route:

**NEEDS VERIFICATION FROM CURRENT REPOSITORY / PRODUCTION**

---

# 5. Database and Important Domain Models

## 5.1 PostgreSQL

PostgreSQL is the canonical database.

Database migrations are maintained under:

`db/migrations/`

Recent known migration sequence includes at least migrations through:

`064_refine_muzaffar_nuritdinkhodjaev_profile.sql`

Migration runner commands include:

`npm run db:migrate`

and for local environment:

`npm run db:migrate:local`

## 5.2 Specialists

Public Specialists data is database-backed.

Known repository:

`lib/specialists/public-specialists-repository.ts`

Known admin repository:

`lib/specialists/admin-specialists-repository.ts`

Important Specialist concepts include:

- code
- slug
- name
- UZ/DE profession
- UZ/DE short description
- UZ/DE services
- UZ/DE profile
- UZ/DE education
- UZ/DE memberships
- categories
- languages
- city
- bundesland
- postal code
- contact channels
- image
- image rendering metadata
- status
- verified
- featured
- premium
- sponsored

Supported known language IDs for Specialists:

- `uz`
- `de`
- `ru`
- `en`
- `tr`

Known specialist category now includes:

`entrepreneur`

The database requires UZ and DE service arrays to have compatible cardinality.

## 5.3 Entrepreneur vs Business

**Entrepreneur = person**

**Business / Place = company, business, organization, or physical/service location**

Do not model an entrepreneur as a business entity.

Expected relationship:

Entrepreneur
↔ Business / Place
↔ Location

One entrepreneur may eventually be connected to one or more businesses.

Exact future database cardinality and schema:

**UNKNOWN / NEEDS DESIGN BEFORE IMPLEMENTATION**

## 5.4 Current entrepreneur implementation

Entrepreneurs currently use the Specialists infrastructure/category.

Example:

Muzaffar Nuritdinkhodjaev

Category:

`entrepreneur`

The Specialists directory behavior was intentionally changed so:

- `All / Barchasi` includes entrepreneurs;
- `Tadbirkorlar / Unternehmer` filters entrepreneur profiles;
- entrepreneur profiles do not need to be assigned a fake specialist category merely to appear in the full directory.

This behavior must not be reverted accidentally.

---

# 6. Canonical Location Architecture

Location is intended to be shared infrastructure across the platform.

Do NOT create independent city/location representations for every new module.

Location will eventually connect:

- user profiles;
- My City;
- Specialists;
- Entrepreneurs;
- Businesses / Places;
- Events;
- Questions;
- Market requests;
- Market offers;
- matching;
- Map;
- local discovery;
- AI personalization.

Conceptually:

Location
├── Users
├── Specialists
├── Entrepreneurs
├── Places
├── Events
├── Questions
├── Market
└── Map

The project already has a Canonical Location Architecture foundation from previous work.

However, the exact current tables, IDs, normalization rules, geospatial fields, and repository APIs are:

**NEEDS VERIFICATION FROM CURRENT REPOSITORY**

Before implementing Market, Places, Questions-by-city, or route matching, inspect and reuse the existing canonical location implementation.

Never create a second location system without explicit architecture review.

---

# 7. Auth / User / Profile State

The application has existing authentication/account infrastructure.

Known routes include:

- login;
- register;
- email verification;
- resend verification;
- forgot password;
- reset password;
- account;
- account profile.

Vatandosh ID must evolve from the existing user/auth/profile foundation rather than replacing it with an unrelated identity system.

Existing exact schema for:

- users;
- sessions;
- profile;
- email verification;
- roles;
- permissions;
- account location;
- privacy;

must be verified from the current repository before extending it.

Status:

**PARTIALLY IMPLEMENTED / NEEDS REPOSITORY VERIFICATION**

Future Vatandosh ID is expected to contain progressively:

- account identity;
- public profile;
- display name;
- avatar;
- canonical location;
- languages;
- email verification;
- phone verification;
- optional identity verification;
- privacy settings;
- activity;
- community contributions;
- market history;
- trust signals;
- notification preferences.

Do not build a second user/profile table family without reviewing existing auth/profile architecture.

---

# 8. Important Product and Architecture Decisions

## 8.1 Utility → Personalization → Ecosystem

This remains the master strategic sequence.

The new community/market vision extends this strategy; it does not replace it.

## 8.2 Existing utility modules stay

Do not remove or replace:

- Guide;
- News;
- Services;
- Specialists;
- Jobs;
- Events;
- Telegram;
- Support;

simply because community features are added.

They become inputs into the larger ecosystem.

## 8.3 Guide and Vatandosh Savol are different

Guide:

canonical/editorial knowledge.

Vatandosh Savol:

real user questions and community interaction.

They should be connected, not merged into one content model.

## 8.4 AI must not replace source-backed knowledge

Vatandosh AI should eventually use:

- Vatandoshlar Guide;
- trusted/official sources;
- Questions;
- Verified Expert answers;
- Specialists;
- Services;
- Places;
- Jobs;
- Events;
- canonical location context.

AI answers should be grounded and source-aware.

Do not build an ungrounded generic chatbot and label it Vatandosh AI.

## 8.5 Telegram is a distribution/acquisition channel

Long-term model:

Telegram question
→ search Vatandosh knowledge/questions
→ existing answer or relevant page
→ Vatandoshlar.de

## 8.6 Market is not a generic classifieds clone

Vatandosh Market is intended as structured need/offer matching.

Core use cases include:

- shared rides;
- travel companions;
- airport pickup;
- help;
- carrying/delivery;
- bringing items.

## 8.7 Trust should initially be explainable

Prefer:

- Email verified
- Phone verified
- Identity verified
- Verified Expert
- Completed trips
- Helpful answers
- Community contribution
- Completed matches

before introducing an opaque global score.

## 8.8 Mobile app comes after web validation

Do not start Android/iOS development now.

First validate product-market fit on the web.

## 8.9 Places and Entrepreneurs are different entities

Entrepreneur:

person.

Place / Business:

organization/business/location.

## 8.10 Hayot Navigatori and Vatandosh AI should converge

Hayot Navigatori represents structured life journeys.

Vatandosh AI can later become the conversational interface over this structured knowledge.

## 8.11 No duplicate source-of-truth systems

Especially do not duplicate:

- locations;
- users;
- specialist data;
- entrepreneur data;
- business/place data;
- Guide knowledge;
- authentication;
- translations.

---

# 9. Master Roadmap

The current unified roadmap is:

**Foundation → Vatandosh Savol → Vatandosh Market → Trust / Smart Matching → Vatandosh AI → Mobile App**

Places, Map, My City, Entrepreneurs, and Hayot Navigatori integrate into this sequence rather than disappearing.

## PHASE 0 — FOUNDATION / CURRENT PLATFORM

Core components:

- existing public modules;
- UZ/DE localization;
- PostgreSQL;
- Auth;
- Profile;
- Canonical Locations;
- My City;
- Specialists;
- Entrepreneur foundation;
- Admin;
- Search;
- Analytics.

Important ecosystem relationship:

Entrepreneur
→ Business / Place
→ Location

## PHASE 1 — VATANDOSH ID + VATANDOSH SAVOL

### Vatandosh ID Lite

MVP:

- existing account integration;
- public profile;
- display name;
- avatar;
- canonical city/location;
- languages;
- email verification;
- basic privacy settings.

### Vatandosh Savol

Core MVP:

- create question;
- answer question;
- categories;
- tags;
- optional location;
- related questions;
- related Guide content;
- relevant Specialists;
- Verified Expert answers;
- useful/helpful interaction;
- follow question/topic;
- report;
- moderation;
- admin tools.

### Notifications v1

Start with:

- in-app;
- email.

### Telegram bridge

After core Q&A works:

Telegram
→ find existing Vatandosh answer
→ route user to Vatandoshlar.de

## PHASE 2 — LOCAL ECOSYSTEM + VATANDOSH MARKET MVP

### Places

Planned concepts:

- business;
- entrepreneur relationship;
- canonical location;
- category;
- contact information;
- verification state.

Exact schema:

**NEEDS DESIGN**

### Uzbek Map Germany

Potential entities:

- Places;
- Specialists;
- Entrepreneurs;
- Events;
- Community.

### Market MVP

Recommended initial categories:

- Shared ride / Birga borish
- Travel companion / Safar hamrohi
- Community help / Yordam

### Matching v1

Start with:

- type;
- origin;
- destination;
- exact/near date.

## PHASE 3 — TRUST + SMART MATCHING

Progressively add:

- email verified;
- phone verified;
- identity verified;
- expert verified;
- activity history;
- completed matches;
- completed trips;
- helpful answers;
- reports;
- reviews.

Safety architecture includes:

- identity controls;
- reporting;
- blocking;
- moderation;
- privacy;
- prohibited-item rules;
- declarations;
- legal disclaimers;
- abuse handling.

Smart Matching v2 may include:

- route corridor matching;
- nearby cities;
- date flexibility;
- airport matching;
- connecting airports;
- flight numbers;
- offer ↔ need matching.

## PHASE 3.5 — VATANDOSH AI + HAYOT NAVIGATORI

Potential knowledge sources:

- Guide;
- official/trusted sources;
- Questions;
- Verified Expert answers;
- Specialists;
- Services;
- Places;
- Jobs;
- Events;
- canonical locations.

AI should be source-aware.

## PHASE 4 — MOBILE APP

Only after web usage validates the core product.

Potential features:

- Savol;
- AI;
- Market;
- Trips;
- Matches;
- Notifications;
- Profile;
- My City;
- Verification;
- Location.

Later:

- native push;
- chat;
- camera/document flows;
- richer location-aware matching.

---

# 10. Completed Work

## Platform

- Next.js App Router platform established.
- UZ/DE localization established.
- PostgreSQL-backed architecture established.
- production builds working.
- public/admin content architecture established.

## Germany Guide

Guide landing/category/article architecture exists.

Exact current article inventory:

**NEEDS VERIFICATION FROM REPOSITORY**

## Support

Public Support experience was refined and previously confirmed deployed.

## Specialists

Specialists directory and profile architecture exists.

Specialist data uses the database migration/import workflow rather than relying on manual Admin-only creation.

## Entrepreneur foundation

`entrepreneur` category is supported.

Muzaffar Nuritdinkhodjaev entrepreneur profile was added.

`All / Barchasi` includes entrepreneurs.

## Telegram

Known recent work includes:

- Telegram guide improvements;
- Baden-Württemberg/Stuttgart regional community detail experience;
- how-to-ask guidance.

Known commit:

`0d008b3 feat(telegram): add regional community detail experience`

Remote/production status:

**NEEDS VERIFICATION**

## Locations / My City

Canonical Location Architecture and My City foundation have been part of the 2.0 foundation.

Exact implementation completeness:

**NEEDS VERIFICATION**

---

# 11. Work in Progress

Latest local commit:

`77e0a53 feat(specialists): add Muzaffar Nuritdinkhodjaev entrepreneur profile`

Latest push/deployment:

**UNKNOWN / NEEDS VERIFICATION**

Local database migrations through 064:

confirmed applied locally.

Production migrations:

**UNKNOWN / NEEDS VERIFICATION**

Current agreed direction:

Foundation
→ Vatandosh ID
→ Vatandosh Savol
→ Market
→ Trust / Smart Matching
→ AI
→ Mobile.

No implementation of the new Savol/Market roadmap should begin until its domain and MVP blueprint is reviewed.

---

# 12. Next Tasks

## Immediate repository/deployment verification

1. Verify current branch status.
2. Verify whether commit `77e0a53` has been pushed.
3. Verify remote branch state.
4. Verify production deployment state.
5. Verify whether migrations 062, 063, and 064 are applied in production.
6. Verify production Muzaffar profile behavior if deployed.

## Product/architecture planning

Next recommended planning milestone:

**Phase 1: Vatandosh ID + Vatandosh Savol**

Before coding, define:

- domain model;
- database entities;
- relationship to existing User/Profile;
- Question model;
- Answer model;
- categories/tags;
- location relationship;
- expert answers;
- follow model;
- helpful/useful model;
- reports;
- moderation;
- notifications;
- public/private profile boundaries;
- admin requirements;
- UZ/DE behavior;
- SEO/public URLs;
- search integration;
- Guide integration;
- Specialist integration;
- service/repository/API boundaries;
- mobile-ready backend considerations.

---

# 13. Deferred Features

Do not prioritize before the core web product proves usage:

- native mobile application;
- full private real-time chat;
- payments / escrow;
- advanced reputation algorithm;
- advanced route optimization;
- flight API integration;
- generic classifieds marketplace;
- broad international expansion.

Germany remains the primary market.

---

# 14. Known Problems / Technical Debt

## Specialist database verifier

A pre-existing specialist verification issue was discovered:

`doniyor-tojiboyev`

had empty UZ/DE service lists during verification.

Status:

**KNOWN PRE-EXISTING ISSUE / NEEDS SEPARATE TASK**

## Untracked regression verifier

Known unrelated untracked file:

`scripts/verify-profile-save-regression.mjs`

Its purpose, ownership, and desired repository status:

**UNKNOWN / NEEDS VERIFICATION**

Do not automatically stage or delete it.

## Migration/deployment state

Production state for recent migrations needs verification.

## Auth/Profile completeness

Exact readiness for Vatandosh ID:

**NEEDS ARCHITECTURE REVIEW**

## Canonical Location completeness

Exact schema/API/geospatial readiness:

**NEEDS ARCHITECTURE REVIEW**

## Places schema

Not finalized.

## Market legal/safety requirements

Not finalized.

---

# 15. DO NOT BREAK / CHANGE WITHOUT REVIEW

1. PostgreSQL remains canonical for database-backed content.
2. UZ + DE must remain consistent.
3. Canonical Locations must be reused.
4. Entrepreneur is a person; Business/Place is a separate entity.
5. Existing public modules remain.
6. Vatandosh Savol does not replace Guide.
7. Vatandosh AI must be grounded.
8. Market is structured matching, not generic classifieds.
9. Mobile app is not the current implementation priority.
10. Safety is part of Market architecture from the beginning.
11. Do not introduce complex ratings prematurely.
12. Do not perform large unrelated refactors.
13. Use selective staging and Conventional Commits.
14. Do not invent specialist data.
15. Use established database migration/import workflow for specialists.
16. Do not regenerate/reinterpret official brand assets or specialist identity photos when originals are required.
17. `All / Barchasi` in Specialists must include entrepreneurs.
18. `Tadbirkorlar / Unternehmer` remains the dedicated entrepreneur filter.

---

# 16. Engineering Workflow for Future AI Sessions

When starting a development task:

1. Read this file.
2. Inspect `git status`.
3. Inspect relevant source files.
4. Inspect relevant migrations/schema.
5. Verify anything marked `UNKNOWN / NEEDS VERIFICATION`.
6. Do not assume production deployment from local Git history.
7. Do not modify unrelated working-tree changes.
8. Work only on the current milestone.
9. Run appropriate tests.
10. Use selective staging.
11. Commit only after a stable milestone.

If information is missing:

- do not guess;
- inspect/request only necessary source;
- identify uncertainty explicitly.

Preferred completion report:

`PASS/FAIL → changed files → tests → next`

---

# 17. Master Product Dependency Model

Conceptually:

Canonical Locations
        │
        ├─────────────────────────────┐
        │                             │
Auth → Vatandosh ID                   │
        │                             │
        ├── Public Profile            │
        ├── Verification              │
        ├── Preferences               │
        └── Activity                  │
              │                       │
              ↓                       ↓
        Community Core          Local Ecosystem
         /          \            /          \
        ↓            ↓          ↓            ↓
Vatandosh Savol   Market      Places       My City
        │            │          │            │
        │            ↓          └─────┬──────┘
        │        Matching             ↓
        │            │          Uzbek Map Germany
        │            ↓
        └──────→ Notifications
                     │
                     ↓
                  Trust
                     │
             ┌───────┴────────┐
             ↓                ↓
       Vatandosh AI      Smart Matching
             │
             ↓
      Hayot Navigatori
             │
             ↓
         Mobile App

This diagram is conceptual, not a finalized database schema.

---

# 18. Product Success Principle

The intended progression is:

**Find information**
→ **create an identity**
→ **ask and contribute**
→ **discover local people/services**
→ **find a trusted match**
→ **return because the platform knows what matters to me**

The objective is not simply to add more pages.

The objective is to create recurring user value and network effects while preserving the reliable utility platform already built.

---

# 19. Last Updated

**2026-10-05**

Context captured through:

- latest known local commit `77e0a53`;
- Master Roadmap covering Vatandosh Savol, Market, Trust, Smart Matching, AI, and Mobile App.

Before the next implementation session, verify:

- remote Git state;
- latest deployment;
- production migration state;
- current database/schema state where relevant.

---

# 20. Current Recommended Next Milestone

**DO NOT START CODING THIS AUTOMATICALLY.**

Recommended next planning task:

> Produce the technical/product blueprint for **Phase 1: Vatandosh ID + Vatandosh Savol**.

The blueprint must be approved before database migrations or UI implementation begin.

After approval, implementation should be divided into small production-safe milestones rather than one large feature branch.
