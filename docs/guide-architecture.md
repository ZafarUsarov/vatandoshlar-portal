# Guide Architecture

## Current source of truth

Vatandoshlar.de Guide public runtime uses PostgreSQL as its canonical article source of truth.

The primary table is:

```text
guide_articles
```

Only records with:

```text
status = 'published'
```

are visible on the public Guide.

## Runtime flow

```text
PostgreSQL
    ↓
lib/guide/public-guide-repository.ts
    ↓
├── app/guide/page.tsx
├── app/guide/[category]/page.tsx
└── app/guide/[category]/[article]/page.tsx
```

Locale routes under:

```text
app/[locale]/guide/
```

reuse the shared public implementations.

## Static data that intentionally remains

Guide category metadata still comes from the existing static category definitions.

This includes stable taxonomy information such as:

```text
category slug
localized category title
localized category description
icon / presentation metadata
```

Article content does not use static runtime data anymore.

PostgreSQL is the canonical source for:

```text
article counts
featured articles
category article lists
article detail content
related articles
article lifecycle
```

## Admin flow

The Guide admin area is available under:

```text
/[locale]/admin/guide
```

Admin routes are protected by the existing admin authentication layer.

Supported workflows include:

```text
create → draft
edit
draft → published
published → draft
draft → archived
published → archived
archived → draft
featured on/off
```

Admin database access is implemented in:

```text
lib/guide/admin-guide-repository.ts
```

## Article lifecycle

Guide articles use three database states:

```text
draft
published
archived
```

Only:

```text
published
```

articles are returned by the public repository.

This means draft and archived content can safely exist in PostgreSQL without being publicly reachable.

## Featured invariant

Featured is only valid for published articles.

The invariant is:

```text
featured = true
→
status = published
```

When an article moves from published to:

```text
draft
```

or:

```text
archived
```

the admin repository automatically sets:

```text
featured = false
```

The database also enforces the same rule.

## Category contract

Supported Guide category slugs are:

```text
coming-to-germany
visas
family
invitation
embassy-and-appointments
documents
language-and-certificates
education
work-and-career
after-arrival
recognition
integration
```

These are domain identifiers and must not be renamed casually.

They are shared across:

```text
static category metadata
admin forms
database constraints
public repository
public routes
```

Any future rename requires a coordinated database migration and route compatibility plan.

## Localization model

Localized database fields include:

```text
title_uz
title_de

excerpt_uz
excerpt_de

intro_uz
intro_de

reading_time_uz
reading_time_de

facts_uz
facts_de

sections_uz
sections_de

steps_uz
steps_de

faq_uz
faq_de
```

The public repository selects the correct locale and returns the existing GuideArticle UI contract.

## Structured content model

Guide content intentionally preserves the existing rich article structure.

### Facts

Stored as JSON arrays:

```text
facts_uz
facts_de
```

Each item has:

```text
label
value
```

### Sections

Stored as JSON objects:

```text
sections_uz
sections_de
```

Supported section keys are:

```text
overview
eligibility
requirements
documents
conditions
warnings
```

Each section may contain:

```text
title
paragraphs[]
items[]
```

### Steps

Stored as JSON arrays:

```text
steps_uz
steps_de
```

Each item contains:

```text
title
description
```

### FAQ

Stored as JSON arrays:

```text
faq_uz
faq_de
```

Each item contains:

```text
question
answer
```

### Sources

Official sources are stored in:

```text
sources
```

Each source contains:

```text
title
organization
url
language
```

Supported source language values are:

```text
de
en
```

## Parallel bilingual invariants

The following UZ/DE arrays must remain parallel:

```text
facts_uz
facts_de

steps_uz
steps_de

faq_uz
faq_de
```

The corresponding arrays must have equal lengths.

For sections:

```text
sections_uz
sections_de
```

the same section keys must be present in both locales.

Admin create/edit validation enforces these rules before saving.

The database verification script independently checks them.

## Related article model

Related article references are stored as:

```text
related_article_slugs
```

The current domain model stores slug-only references rather than category + slug pairs.

Therefore Guide article slugs must remain globally unique, even though the primary route is:

```text
/guide/<category>/<slug>
```

The verification script checks this invariant.

Related articles are returned only when they are:

```text
status = published
```

The current article itself is excluded.

## Public landing page

The Guide landing page gets real runtime values from PostgreSQL:

```text
published article counts by category
featured published articles
```

Category availability is calculated as:

```text
articleCount > 0
→ available

articleCount = 0
→ coming-soon
```

## Public category pages

Category article lists use:

```text
getPublishedGuideArticlesByCategory()
```

Only published articles are returned.

The public category count shown by the route is derived from the same PostgreSQL result.

## Public detail pages

Article detail lookup uses:

```text
getPublishedGuideArticleBySlug()
```

A draft or archived article returns no public result and therefore resolves to 404.

Related content uses:

```text
getRelatedPublishedGuideArticles()
```

## SEO

Guide public routes preserve:

```text
localized metadata
canonical URLs
UZ/DE alternates
OpenGraph metadata
Article JSON-LD
FAQ JSON-LD
```

FAQ structured data is emitted only when the article contains FAQ items.

## Public query indexes

Public Guide queries are supported by:

```text
db/migrations/016_harden_guide_public_queries.sql
```

Indexes cover:

```text
category listing and ordering
published category + slug lookup
featured articles
related slug lookup
```

## Static article migration

The original modular static Guide dataset contained 51 articles.

Migration was performed through:

```text
scripts/seed-static-guide.mjs
```

The seed is idempotent.

A successful first migration produced:

```text
Source articles: 51
Inserted: 51
Skipped: 0
```

A successful second run produced:

```text
Source articles: 51
Inserted: 0
Skipped: 51
```

This confirms the migration does not create duplicate records.

## Public repository CI behavior

CI does not require production PostgreSQL access.

When:

```text
CI=true
```

and:

```text
DATABASE_URL
```

is unavailable, the public repository returns empty build-time results.

Outside CI, missing database configuration is considered a runtime configuration error.

## Database verification

Guide database invariants are checked with:

```text
scripts/verify-guide-database.mjs
```

Run:

```bash
node --env-file=.env.local scripts/verify-guide-database.mjs
```

The verification checks:

```text
total article count
status counts
featured count
featured lifecycle violations
duplicate legacy IDs
duplicate category + slug pairs
global slug uniqueness
supported category values
required UZ/DE text fields
facts parity
steps parity
FAQ parity
section-key parity
JSONB container shapes
dangling related slugs
```

A healthy database ends with:

```text
Verification PASSED.
```

## Architecture rule

Do not introduce a second public Guide article source.

New public Guide article functionality must read through:

```text
lib/guide/public-guide-repository.ts
```

Admin mutations must continue to use:

```text
lib/guide/admin-guide-repository.ts
```

PostgreSQL remains the canonical Guide article source of truth.

Static files under:

```text
data/guide/articles/
```

are migration/history material after runtime migration and must not be reintroduced as a competing public article source.

Static category metadata may remain until category taxonomy itself requires database management.

## Milestone closure criteria

Guide v1 data architecture is complete when all of the following are true:

```text
PostgreSQL schema
static article migration
idempotent seed
admin list
create → draft
edit
publish / draft / archive lifecycle
featured lifecycle
public repository
public landing
public category pages
public article detail
related article lookup
database verification
production build
CI
```

When these checks pass, the Guide PostgreSQL migration is complete for Vatandoshlar.de v1.
