# Telegram Architecture

## Current source of truth

Vatandoshlar.de Telegram public runtime and admin runtime use PostgreSQL as the canonical source of truth.

The primary table is:

```text
telegram_groups
```

## Runtime flow

```text
PostgreSQL
    ↓
lib/telegram/public-telegram-repository.ts
    ↓
components/TelegramSection.tsx
    ↓
app/telegram/page.tsx
    ↓
app/[locale]/telegram/page.tsx
```

Only records with:

```text
status = 'published'
```

are visible on the public Telegram page.

## Admin flow

Telegram administration is available under:

```text
/[locale]/admin/telegram
```

Admin database access is implemented in:

```text
lib/telegram/admin-telegram-repository.ts
```

Supported admin operations include:

```text
edit group data
draft → published
published → draft
draft → archived
published → archived
archived → draft
active ↔ coming-soon
```

## Two independent statuses

Telegram groups intentionally use two status dimensions.

### Record lifecycle

```text
draft
published
archived
```

This controls whether the record is visible publicly.

Only:

```text
published
```

records are returned by the public repository.

### Telegram availability

```text
active
coming-soon
```

This describes whether the actual Telegram community is currently available.

This separation allows a public placeholder such as:

```text
status = published
group_status = coming-soon
```

## Active group invariant

An active Telegram group must have a valid Telegram URL stored in:

```text
href
```

The database schema prevents:

```text
group_status = active
href = null / empty
```

The admin edit validation also enforces this rule.

## Button type

Supported values are:

```text
bot
group
```

This controls localized public button copy.

Examples:

```text
bot
→ Bot orqali qo‘shilish
→ Über den Bot beitreten

group
→ Telegramga qo‘shilish
→ Telegram-Gruppe öffnen
```

## Localization model

Optional custom localized fields are:

```text
custom_name_uz
custom_name_de

custom_description_uz
custom_description_de
```

These fields are paired.

If a custom name is supplied, both UZ and DE values must exist.

If a custom description is supplied, both UZ and DE values must exist.

When no custom description exists, the public repository generates a localized fallback from:

```text
bundesland
group_status
locale
```

## Ordering

Public ordering uses:

```text
sort_order ASC
id ASC
```

Admin ordering uses the same stable sequence.

`sort_order` must never be negative.

## Static migration

The original static Telegram dataset contained 16 Bundesland records.

Migration was performed with:

```text
scripts/seed-static-telegram.mjs
```

The seed is idempotent.

Expected first run:

```text
Source groups: 16
Inserted: 16
Skipped: 0
```

Expected later run:

```text
Source groups: 16
Inserted: 0
Skipped: 16
```

## Public repository CI behavior

When:

```text
CI=true
```

and:

```text
DATABASE_URL
```

is unavailable, the public repository returns an empty result instead of requiring production database access.

Outside CI, missing database configuration is considered a runtime configuration error.

## Verification

Database invariants are checked with:

```text
scripts/verify-telegram-database.mjs
```

Run:

```bash
node --env-file=.env.local scripts/verify-telegram-database.mjs
```

The verification checks:

```text
total group count
record lifecycle counts
group availability counts
button type counts
active groups without href
duplicate short_name
empty short_name
unsupported record status
unsupported group status
unsupported button type
negative sort_order
UZ/DE custom-name pairing
UZ/DE custom-description pairing
empty Bundesland
```

A healthy database ends with:

```text
Verification PASSED.
```

## Runtime dependency audit

Static Telegram runtime dependencies are checked with:

```text
scripts/audit-telegram-runtime-dependencies.mjs
```

Run:

```bash
node scripts/audit-telegram-runtime-dependencies.mjs
```

After migration, public/runtime code must not import:

```text
data/telegram.ts
```

or call:

```text
getTelegramGroups()
```

A healthy runtime ends with:

```text
Audit PASSED.
```

## Static Telegram source

The file:

```text
data/telegram.ts
```

is legacy migration/history material after PostgreSQL runtime migration.

It must not be reintroduced as a competing public source of truth.

Delete it only after:

```text
runtime audit PASSED
production build PASSED
CI PASSED
```

and after confirming no migration or documentation workflow still requires it.

## Architecture rule

Do not introduce a second Telegram public data source.

Public Telegram data must read through:

```text
lib/telegram/public-telegram-repository.ts
```

Admin Telegram mutations must use:

```text
lib/telegram/admin-telegram-repository.ts
```

PostgreSQL remains canonical.

## Milestone closure criteria

Telegram PostgreSQL migration is complete when all of the following are true:

```text
PostgreSQL schema
16-record static seed
idempotent seed
admin dashboard integration
admin list
edit
record lifecycle
active / coming-soon lifecycle
public repository
public Telegram page
database verification
runtime dependency audit
production build
CI
```

When these checks pass, Telegram PostgreSQL migration is complete for Vatandoshlar.de v1.
