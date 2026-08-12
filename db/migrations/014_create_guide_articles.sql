BEGIN;

CREATE TABLE IF NOT EXISTS guide_articles (
  id BIGSERIAL PRIMARY KEY,

  legacy_id TEXT NOT NULL UNIQUE,

  slug TEXT NOT NULL,
  category_slug TEXT NOT NULL,

  title_uz TEXT NOT NULL,
  title_de TEXT NOT NULL,

  excerpt_uz TEXT NOT NULL,
  excerpt_de TEXT NOT NULL,

  intro_uz TEXT NOT NULL,
  intro_de TEXT NOT NULL,

  reading_time_uz TEXT NOT NULL,
  reading_time_de TEXT NOT NULL,

  facts_uz JSONB NOT NULL DEFAULT '[]'::jsonb,
  facts_de JSONB NOT NULL DEFAULT '[]'::jsonb,

  sections_uz JSONB NOT NULL DEFAULT '{}'::jsonb,
  sections_de JSONB NOT NULL DEFAULT '{}'::jsonb,

  steps_uz JSONB NOT NULL DEFAULT '[]'::jsonb,
  steps_de JSONB NOT NULL DEFAULT '[]'::jsonb,

  faq_uz JSONB NOT NULL DEFAULT '[]'::jsonb,
  faq_de JSONB NOT NULL DEFAULT '[]'::jsonb,

  sources JSONB NOT NULL DEFAULT '[]'::jsonb,

  related_article_slugs TEXT[] NOT NULL DEFAULT '{}',

  last_reviewed_at DATE NOT NULL,

  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT guide_articles_category_slug_check
    CHECK (
      category_slug IN (
        'coming-to-germany',
        'visas',
        'family',
        'invitation',
        'embassy',
        'documents',
        'language',
        'education',
        'career',
        'after-arrival',
        'recognition',
        'integration'
      )
    ),

  CONSTRAINT guide_articles_status_check
    CHECK (
      status IN (
        'draft',
        'published',
        'archived'
      )
    ),

  CONSTRAINT guide_articles_slug_category_unique
    UNIQUE (
      category_slug,
      slug
    ),

  CONSTRAINT guide_articles_facts_uz_array
    CHECK (
      jsonb_typeof(facts_uz) = 'array'
    ),

  CONSTRAINT guide_articles_facts_de_array
    CHECK (
      jsonb_typeof(facts_de) = 'array'
    ),

  CONSTRAINT guide_articles_sections_uz_object
    CHECK (
      jsonb_typeof(sections_uz) = 'object'
    ),

  CONSTRAINT guide_articles_sections_de_object
    CHECK (
      jsonb_typeof(sections_de) = 'object'
    ),

  CONSTRAINT guide_articles_steps_uz_array
    CHECK (
      jsonb_typeof(steps_uz) = 'array'
    ),

  CONSTRAINT guide_articles_steps_de_array
    CHECK (
      jsonb_typeof(steps_de) = 'array'
    ),

  CONSTRAINT guide_articles_faq_uz_array
    CHECK (
      jsonb_typeof(faq_uz) = 'array'
    ),

  CONSTRAINT guide_articles_faq_de_array
    CHECK (
      jsonb_typeof(faq_de) = 'array'
    ),

  CONSTRAINT guide_articles_sources_array
    CHECK (
      jsonb_typeof(sources) = 'array'
    ),

  CONSTRAINT guide_articles_facts_parallel
    CHECK (
      jsonb_array_length(facts_uz)
      =
      jsonb_array_length(facts_de)
    ),

  CONSTRAINT guide_articles_steps_parallel
    CHECK (
      jsonb_array_length(steps_uz)
      =
      jsonb_array_length(steps_de)
    ),

  CONSTRAINT guide_articles_faq_parallel
    CHECK (
      jsonb_array_length(faq_uz)
      =
      jsonb_array_length(faq_de)
    ),

  CONSTRAINT guide_articles_featured_requires_published
    CHECK (
      featured = FALSE
      OR status = 'published'
    )
);

CREATE INDEX IF NOT EXISTS guide_articles_status_category_idx
  ON guide_articles (
    status,
    category_slug,
    updated_at DESC,
    id DESC
  );

CREATE INDEX IF NOT EXISTS guide_articles_category_slug_idx
  ON guide_articles (
    category_slug,
    slug
  );

CREATE INDEX IF NOT EXISTS guide_articles_published_category_idx
  ON guide_articles (
    category_slug,
    featured DESC,
    last_reviewed_at DESC,
    id DESC
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS guide_articles_related_slugs_gin_idx
  ON guide_articles
  USING GIN (
    related_article_slugs
  );

COMMIT;
