BEGIN;

CREATE TABLE IF NOT EXISTS job_guides (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,

  title_uz TEXT NOT NULL,
  title_de TEXT NOT NULL,

  short_title_uz TEXT NOT NULL,
  short_title_de TEXT NOT NULL,

  description_uz TEXT NOT NULL,
  description_de TEXT NOT NULL,

  category TEXT NOT NULL,
  icon TEXT NOT NULL,

  audience_uz TEXT NOT NULL,
  audience_de TEXT NOT NULL,

  highlights_uz TEXT[] NOT NULL DEFAULT '{}',
  highlights_de TEXT[] NOT NULL DEFAULT '{}',

  search_keywords TEXT[] NOT NULL DEFAULT '{}',

  steps_uz TEXT[] NOT NULL DEFAULT '{}',
  steps_de TEXT[] NOT NULL DEFAULT '{}',

  important_notes_uz TEXT[] NOT NULL DEFAULT '{}',
  important_notes_de TEXT[] NOT NULL DEFAULT '{}',

  official_source_name TEXT NOT NULL,
  official_source_url TEXT NOT NULL,

  source_description_uz TEXT NOT NULL,
  source_description_de TEXT NOT NULL,

  verified_at DATE NOT NULL,

  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT job_guides_category_check
    CHECK (
      category IN (
        'students',
        'english',
        'minijob',
        'internship',
        'professionals',
        'safety'
      )
    ),

  CONSTRAINT job_guides_status_check
    CHECK (
      status IN (
        'draft',
        'published',
        'archived'
      )
    ),

  CONSTRAINT job_guides_featured_requires_published
    CHECK (
      featured = FALSE
      OR status = 'published'
    )
);

CREATE INDEX IF NOT EXISTS job_guides_status_verified_idx
  ON job_guides (
    status,
    verified_at DESC,
    updated_at DESC
  );

CREATE UNIQUE INDEX IF NOT EXISTS job_guides_single_featured_unique
  ON job_guides ((featured))
  WHERE featured = TRUE;

COMMIT;
