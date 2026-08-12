# Specialists Architecture

## Current source of truth

Vatandoshlar.de Specialists public runtime uses PostgreSQL as its canonical source of truth.

The primary table is:

```text
specialists
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
lib/specialists/public-specialists-repository.ts
    ↓
├── app/specialists/page.tsx
├── app/specialists/[slug]/page.tsx
└── components/home/FeaturedSpecialistsSection.tsx
```

Locale routes under:

```text
app/[locale]/specialists/
```

reuse the shared public implementation.

## Admin flow

The Specialists admin area is available under:

```text
/[locale]/admin/specialists
```

Admin routes are protected by the existing admin authentication layer.

The admin workflow supports:

- profile creation
- editing
- publishing
- returning to draft
- archiving
- restoring
- verified status management
- featured status management
- premium status management
- sponsored status management

Admin database access is implemented in:

```text
lib/specialists/admin-specialists-repository.ts
```

## Specialist lifecycle

The lifecycle uses three states:

```text
draft
published
archived
```

Typical transitions are:

```text
draft
  ↓
published
  ↓
archived
```

A published profile may also return to:

```text
draft
```

An archived profile may be restored to:

```text
draft
```

Only published profiles are exposed by the public repository.

## Status flags

Specialists use four independent status flags:

```text
verified
featured
premium
sponsored
```

### Verified

`verified` is independent of the publication lifecycle.

A profile may remain verified while it is:

```text
draft
```

or:

```text
archived
```

This allows verification history to be preserved while a profile is temporarily unpublished.

### Featured, Premium and Sponsored

The following flags require a published profile:

```text
featured
premium
sponsored
```

They cannot be enabled when:

```text
status != 'published'
```

When a profile moves from `published` to:

```text
draft
```

or:

```text
archived
```

these flags are automatically disabled:

```text
featured = false
premium = false
sponsored = false
```

The database constraints for these invariants are defined in:

```text
db/migrations/009_harden_specialists_lifecycle.sql
```

## Multiple featured profiles

Unlike Services, Specialists do not use a single-featured invariant.

Multiple published and verified specialist profiles may be:

```text
featured = true
```

at the same time.

The homepage limits how many featured profiles are displayed through the public repository query.

## Homepage Featured Specialists rule

The homepage Featured Specialists section only displays profiles matching all of:

```text
status = 'published'
verified = true
featured = true
```

The public query is exposed through:

```text
getFeaturedPublishedSpecialists()
```

in:

```text
lib/specialists/public-specialists-repository.ts
```

This means a published but unverified featured profile may still appear in the public directory, but it will not appear in the homepage Featured Specialists section.

## Public directory rule

The public directory displays all profiles where:

```text
status = 'published'
```

Filtering by:

- category
- Bundesland
- verified
- premium
- search text

continues to happen through the existing Specialists directory UI.

## Public detail rule

A specialist detail page can only be resolved when:

```text
status = 'published'
```

A draft or archived profile must not be publicly accessible through its slug.

Public detail lookup uses:

```text
getPublishedSpecialistBySlug()
```

## Specialist content model

Each profile contains shared identity data:

```text
code
slug
name
```

Localized content:

```text
profession_uz
profession_de

short_description_uz
short_description_de

services_uz
services_de

service_area_uz
service_area_de

pricing_note_uz
pricing_note_de
```

Directory/filter metadata:

```text
categories
languages

city
bundesland
postal_code
```

Contact fields:

```text
email
phone
website
whatsapp
telegram
instagram
youtube
facebook
```

Optional profile metadata:

```text
avatar_url
years_of_experience
rating
review_count
```

## Bilingual services invariant

The following fields form a parallel bilingual list:

```text
services_uz
services_de
```

Admin create and edit actions require them to contain the same number of entries.

The database also enforces:

```text
cardinality(services_uz)
=
cardinality(services_de)
```

This preserves semantic pairing between the Uzbek and German service descriptions.

## Categories

Every specialist must have at least one category.

The database enforces:

```text
cardinality(categories) > 0
```

Public filtering depends on these category values, so new category identifiers must not be introduced casually.

Current category identifiers are part of the Specialists domain contract.

## Languages

Languages are optional.

A profile may contain an empty language list when language information has not yet been verified.

Supported language identifiers are:

```text
uz
de
ru
en
tr
```

## Legacy Specialists recovery

The previous static Specialists profiles were migrated into PostgreSQL using:

```text
scripts/seed-static-specialists.mjs
```

The script is idempotent.

It checks existing profiles by:

```text
code
```

or:

```text
slug
```

before inserting.

Existing PostgreSQL records are never overwritten by the recovery seed.

The original static Specialists data remains useful for:

- recovery
- historical reference
- migration verification

but is no longer the canonical public runtime source.

## Public query indexes

Public Specialists queries are supported by indexes defined in:

```text
db/migrations/010_harden_specialists_public_queries.sql
```

These indexes cover:

- published directory ordering
- published slug lookup
- featured + verified homepage profiles

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

is not configured, the public Specialists repository returns empty results during build-time evaluation.

Outside CI, a missing database configuration is treated as a runtime configuration error.

## Database verification

Specialists database invariants can be checked with:

```text
scripts/verify-specialists-database.mjs
```

Run:

```bash
node --env-file=.env.local scripts/verify-specialists-database.mjs
```

The verification checks:

- total profile count
- draft / published / archived counts
- verified count
- featured count
- premium count
- sponsored count
- non-published lifecycle flag violations
- duplicate code values
- duplicate slug values
- empty or mismatched UZ/DE services lists
- profiles without categories

A healthy database ends with:

```text
Verification PASSED.
```

## Architecture rule

Do not introduce a second public Specialists runtime source.

New public Specialists features must read through:

```text
lib/specialists/public-specialists-repository.ts
```

Admin mutations must continue to use:

```text
lib/specialists/admin-specialists-repository.ts
```

PostgreSQL remains the canonical runtime source of truth.

## Milestone status

The Specialists v1 data architecture is complete when all of the following are true:

```text
Admin CRUD/lifecycle
PostgreSQL source of truth
Legacy profile recovery
Public directory
Public detail
Homepage featured profiles
Database verification
Build
CI
```

After these checks pass, Specialists is considered complete for Vatandoshlar.de v1.0.
