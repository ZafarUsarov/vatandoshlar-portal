# Jobs Architecture

## Current source of truth

Vatandoshlar.de Jobs public runtime uses PostgreSQL as its canonical source of truth.

The primary table is:

```text
job_guides
```

Only rows with:

```text
status = 'published'
```

are visible on the public website.

## Public runtime flow

```text
PostgreSQL
    ↓
lib/jobs/public-jobs-repository.ts
    ↓
├── app/jobs/page.tsx
├── app/jobs/[slug]/page.tsx
└── components/JobsSection.tsx
```

Locale wrappers under:

```text
app/[locale]/jobs/
```

reuse the shared public implementations.

## Admin flow

Admin authentication protects the management routes under:

```text
/[locale]/admin/jobs
```

The admin workflow supports:

- guide creation
- editing
- publishing
- returning to draft
- archiving
- restoring
- featured guide management

Admin database access is implemented in:

```text
lib/jobs/admin-jobs-repository.ts
```

## Guide lifecycle

```text
draft
  ↓
published
  ↓
archived
```

A published guide may also be returned to draft.

Only published guides are available to the public runtime.

## Featured guide invariant

Only one published guide may be featured at a time.

The database enforces this with a partial unique index.

A featured guide automatically loses its featured state when it becomes:

```text
draft
```

or:

```text
archived
```

## Public repository rules

Public Jobs functionality must read data through:

```text
lib/jobs/public-jobs-repository.ts
```

The public repository intentionally separates summary and detail queries.

List, homepage, featured, and related queries do not load:

```text
steps_uz
steps_de
important_notes_uz
important_notes_de
```

Those fields are loaded only for a detail-page query.

This keeps list-query payloads smaller as the number of guides grows.

## Static Jobs migration

The original static Jobs guides were migrated to PostgreSQL.

The migration utility remains available at:

```text
scripts/seed-static-jobs.mjs
```

The original dataset remains in:

```text
data/jobs.ts
```

for seed and recovery purposes.

`data/jobs.ts` is not the canonical public runtime source.

The seed script is intentionally idempotent and does not overwrite an existing slug.

## Search

The current global command palette does not import the static Jobs dataset.

Jobs search commands are manually defined navigation entries for:

- Jobs landing page
- Job platforms
- Minijob

Dynamic PostgreSQL Jobs guide indexing is a separate search feature and must not be coupled back to `data/jobs.ts`.

## Database query indexes

Published public queries use partial indexes defined by the Jobs migrations.

The public-order index supports queries ordered by:

```text
featured DESC
verified_at DESC
updated_at DESC
id DESC
```

The published-slug index supports public detail lookup by slug.

## CI behavior

CI does not require access to the production database.

If `DATABASE_URL` is unavailable in CI, public Jobs repository calls return empty results rather than initializing PostgreSQL during the build.

Outside CI, a missing `DATABASE_URL` is treated as a runtime configuration error.

## Architecture rule

Do not introduce a second public Jobs runtime source.

New public Jobs features must use:

```text
lib/jobs/public-jobs-repository.ts
```

PostgreSQL remains the canonical runtime source of truth.
