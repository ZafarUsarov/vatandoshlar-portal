# Events Architecture

## Current source of truth

Vatandoshlar.de Events public runtime uses PostgreSQL as its canonical source of truth.

The primary table is:

```text
events
```

Only records with:

```text
status = 'published'
```

are visible on the public website.

## Runtime flow

```text
PostgreSQL
    ↓
lib/events/public-events-repository.ts
    ↓
├── app/events/page.tsx
└── app/events/[slug]/page.tsx
```

Locale routes under:

```text
app/[locale]/events/
```

reuse the shared public implementations.

## Admin flow

The Events admin area is available under:

```text
/[locale]/admin/events
```

Admin routes are protected by the existing admin authentication layer.

The admin workflow supports:

- event creation
- editing
- publishing
- returning to draft
- archiving
- restoring
- featured status management

Admin database access is implemented in:

```text
lib/events/admin-events-repository.ts
```

## Event lifecycle

Events use three lifecycle states:

```text
draft
published
archived
```

Typical transitions:

```text
draft
  ↓
published
  ↓
archived
```

A published event may also return to:

```text
draft
```

An archived event may be restored to:

```text
draft
```

Only published events are exposed by the public repository.

## Featured invariant

The `featured` flag is only valid when:

```text
status = 'published'
```

When an event moves to:

```text
draft
```

or:

```text
archived
```

the admin repository automatically applies:

```text
featured = false
```

The database also enforces this invariant through:

```text
db/migrations/012_harden_events_lifecycle.sql
```

## Public upcoming rule

An event is considered upcoming when:

```text
COALESCE(end_date, start_date) >= CURRENT_DATE
```

The public repository exposes this through:

```text
getUpcomingPublishedEvents()
```

Only published events are returned.

## Public past rule

An event is considered past when:

```text
COALESCE(end_date, start_date) < CURRENT_DATE
```

The public repository exposes this through:

```text
getPastPublishedEvents()
```

## Public detail rule

Event detail lookup uses:

```text
getPublishedEventBySlug()
```

A draft or archived event must not resolve publicly by slug.

This allows admin content to exist safely before publication.

## Related events rule

Related events are loaded through:

```text
getRelatedPublishedEvents()
```

An event may be considered related when it shares:

```text
category
```

or:

```text
city
```

with the current event.

The current event itself is excluded from the related list.

Only published events are returned.

## Featured upcoming query

The repository exposes:

```text
getFeaturedUpcomingEvent()
```

A featured public event must match:

```text
status = 'published'
featured = true
COALESCE(end_date, start_date) >= CURRENT_DATE
```

## Localization model

Localized database fields include:

```text
title_uz
title_de

excerpt_uz
excerpt_de

description_uz
description_de

price_label_uz
price_label_de

important_notes_uz
important_notes_de
```

The public repository localizes these fields before returning public event data.

## Parallel bilingual list invariants

The following arrays must remain semantically parallel:

```text
description_uz
description_de
```

and:

```text
important_notes_uz
important_notes_de
```

Admin create/edit actions verify equal list length.

The database also enforces equal cardinality.

## Event category contract

Supported category identifiers are:

```text
culture
education
career
business
community
sport
children
consular
```

These identifiers are domain values and must not be renamed casually because public filtering, admin forms and adapters depend on them.

## Event format contract

Supported format identifiers are:

```text
offline
online
hybrid
```

### Offline

Offline events require at least one physical location field:

```text
city
bundesland
venue_name
address
```

### Online

Online events require:

```text
online_url
```

### Hybrid

Hybrid events require both:

```text
online_url
```

and at least one physical location field.

These rules are enforced in both server actions and the database.

## Registration status contract

Database values are:

```text
open
not_required
sold_out
closed
```

The legacy `EventItem` UI contract uses:

```text
open
not-required
sold-out
closed
```

Therefore the public UI adapter must explicitly translate:

```text
not_required → not-required
sold_out → sold-out
```

Do not silently rename the database values without a migration.

## Date invariants

The database enforces:

```text
end_date >= start_date
```

when `end_date` exists.

For one-day events with both times:

```text
end_time >= start_time
```

The registration deadline must not be after:

```text
COALESCE(end_date, start_date)
```

## Public query indexes

Public Events queries are supported by:

```text
db/migrations/013_harden_events_public_queries.sql
```

The indexes cover:

- published upcoming ordering
- published slug lookup
- featured upcoming events

## Static Events data

The previous static Events dataset was empty when the PostgreSQL migration was started.

Therefore no legacy Events seed was required.

The old static Events model remains useful as a UI compatibility contract while components are migrated, but PostgreSQL is the canonical runtime source of truth.

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

is unavailable, the public Events repository returns empty results during build-time evaluation.

Outside CI, a missing database configuration is treated as a runtime configuration error.

## Database verification

Events database invariants can be checked with:

```text
scripts/verify-events-database.mjs
```

Run:

```bash
node --env-file=.env.local scripts/verify-events-database.mjs
```

The verification checks:

- total event count
- draft / published / archived counts
- featured count
- non-published featured violations
- duplicate slugs
- UZ/DE description list parity
- UZ/DE important notes parity
- invalid date ranges
- invalid one-day time ranges
- registration deadline violations
- offline / online / hybrid location invariants

A healthy database ends with:

```text
Verification PASSED.
```

## Architecture rule

Do not introduce a second public Events runtime source.

New public Events functionality must read through:

```text
lib/events/public-events-repository.ts
```

Admin mutations must continue to use:

```text
lib/events/admin-events-repository.ts
```

PostgreSQL remains the canonical source of truth.

## Milestone status

Events v1 data architecture is complete when all of the following are true:

```text
Admin foundation
Create → draft
Edit
Publish / draft / archive lifecycle
Featured lifecycle
Public repository
Public directory
Public detail
Related events
Database verification
Build
CI
```

After these checks pass, Events is considered complete for Vatandoshlar.de v1.0.
