BEGIN;

CREATE TABLE IF NOT EXISTS news_articles (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL,

  title_uz TEXT NOT NULL,
  title_de TEXT NOT NULL,

  excerpt_uz TEXT NOT NULL,
  excerpt_de TEXT NOT NULL,

  content_uz TEXT[] NOT NULL DEFAULT '{}',
  content_de TEXT[] NOT NULL DEFAULT '{}',

  category_uz TEXT NOT NULL,
  category_de TEXT NOT NULL,

  content_type TEXT NOT NULL,

  reading_time_uz TEXT NOT NULL,
  reading_time_de TEXT NOT NULL,

  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,

  source_language_uz TEXT NOT NULL,
  source_language_de TEXT NOT NULL,

  location_uz TEXT,
  location_de TEXT,

  verified_at DATE NOT NULL,

  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT news_articles_status_check
    CHECK (
      status IN (
        'draft',
        'published',
        'archived'
      )
    )
);

CREATE UNIQUE INDEX IF NOT EXISTS news_articles_slug_lower_unique
  ON news_articles (LOWER(slug));

CREATE INDEX IF NOT EXISTS news_articles_status_index
  ON news_articles (status);

CREATE INDEX IF NOT EXISTS news_articles_verified_at_index
  ON news_articles (verified_at DESC);

COMMIT;
