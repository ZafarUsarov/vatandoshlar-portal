# Static News → PostgreSQL seed

This script migrates the six existing static News articles into `news_articles`.

## Source of localized content

The script reads the existing project translations directly:

- `messages/uz.json`
- `messages/de.json`

It uses:

- `NewsPage.items.<id>` for title, excerpt, category, reading time, source language and location.
- `NewsDetailPage.items.<id>.content` for the full article paragraphs.

Locale-independent metadata such as slug, official source URL and verification date follows the existing `data/news.ts` records.

## Safety

The seed is intentionally idempotent and conservative.

- Existing slugs are **not overwritten**.
- Missing static articles are inserted as `published`.
- Seeded articles are **not automatically marked featured**.
- The whole seed runs inside one PostgreSQL transaction.
- If validation or an insert fails, the transaction is rolled back.

## Run

From the project root:

```bash
node --env-file=.env.local scripts/seed-static-news.mjs
```

Run it a second time to verify idempotency. The second run should report all six static slugs as skipped.
