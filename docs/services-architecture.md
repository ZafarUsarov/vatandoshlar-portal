# Services Architecture

## Current source of truth

Vatandoshlar.de Services public runtime uses PostgreSQL as its canonical source of truth.

The primary table is:

```text
services
```

Only records with:

```text
status = 'published'
```

are visible on the public website.

## Public runtime flow

```text
PostgreSQL
    ↓
lib/services/public-services-repository.ts
    ↓
├── app/services/page.tsx
├── app/services/[slug]/page.tsx
└── components/ServicesSection.tsx
```

Locale routes under:

```text
app/[locale]/services/
```

reuse the shared public implementations.

## Admin flow

Admin routes are protected by the existing admin authentication layer.

The Services admin area is available under:

```text
/[locale]/admin/services
```

The admin workflow supports:

- service creation
- editing
- publishing
- returning to draft
- archiving
- restoring
- featured service management

Admin database access is implemented in:

```text
lib/services/admin-services-repository.ts
```

## Service lifecycle

```text
draft
  ↓
published
  ↓
archived
```

A published service may also be returned to draft.

Only published services are exposed by the public repository.

## Featured invariant

Only one published service may be featured at a time.

The database schema enforces a single featured row through a partial unique index.

The repository also ensures that a service loses its featured state when its status changes to:

```text
draft
```

or:

```text
archived
```

## Bilingual content

Services contain parallel Uzbek and German data.

The following list fields are stored separately for both locales:

```text
services_uz
services_de

verification_steps_uz
verification_steps_de

important_notes_uz
important_notes_de
```

Admin create and edit actions require the corresponding UZ and DE lists to contain the same number of entries.

This preserves semantic pairing between both language versions.

## Public repository rules

Public Services functionality must read data through:

```text
lib/services/public-services-repository.ts
```

The repository separates summary and detail queries.

List, homepage, featured, and related queries do not load:

```text
verification_steps_uz
verification_steps_de
important_notes_uz
important_notes_de
```

Those fields are loaded only for service detail pages.

This keeps public list-query payloads smaller.

## Static Services migration

The original static Services dataset was migrated to PostgreSQL through:

```text
scripts/seed-static-services.mjs
```

The original dataset remains in:

```text
data/services.ts
```

for seed, recovery, and historical reference purposes.

It is no longer the canonical public runtime source.

The seed script is idempotent and skips an existing slug instead of overwriting it.

## Public query indexes

Published Services queries use partial indexes defined in:

```text
db/migrations/007_harden_services_public_queries.sql
```

The public-order index supports list ordering by:

```text
featured DESC
updated_at DESC
id DESC
```

The published-slug index supports public detail lookup.

## CI behavior

CI does not require access to the production PostgreSQL database.

If:

```text
CI=true
```

and:

```text
DATABASE_URL
```

is not configured, the public Services repository returns empty results during the build.

Outside CI, a missing database configuration is treated as a runtime configuration error.

## Database verification

Services database invariants can be checked with:

```text
scripts/verify-services-database.mjs
```

The verification checks:

- total and per-status counts
- at most one featured service
- featured services are published
- UZ/DE parallel list lengths match
- no duplicate slugs
- required list fields are not empty

Run it with:

```bash
node --env-file=.env.local scripts/verify-services-database.mjs
```

A healthy database ends with:

```text
Verification PASSED.
```

## Architecture rule

Do not introduce a second public Services runtime source.

New public Services features must use:

```text
lib/services/public-services-repository.ts
```

PostgreSQL remains the canonical runtime source of truth.
