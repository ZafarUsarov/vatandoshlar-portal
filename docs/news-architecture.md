# News Architecture

## Current source of truth

Vatandoshlar.de News runtime uses PostgreSQL as its single source of truth.

Public News pages do not read article data from `data/news.ts`.

The primary table is:

```text
news_articles