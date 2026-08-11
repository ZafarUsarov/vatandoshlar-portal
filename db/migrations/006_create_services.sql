BEGIN;

CREATE TABLE IF NOT EXISTS services (
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

  services_uz TEXT[] NOT NULL DEFAULT '{}',
  services_de TEXT[] NOT NULL DEFAULT '{}',

  verification_steps_uz TEXT[] NOT NULL DEFAULT '{}',
  verification_steps_de TEXT[] NOT NULL DEFAULT '{}',

  important_notes_uz TEXT[] NOT NULL DEFAULT '{}',
  important_notes_de TEXT[] NOT NULL DEFAULT '{}',

  official_source_name TEXT NOT NULL,
  official_source_url TEXT NOT NULL,

  source_description_uz TEXT NOT NULL,
  source_description_de TEXT NOT NULL,

  location_uz TEXT NOT NULL,
  location_de TEXT NOT NULL,

  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT services_category_check
    CHECK (
      category IN (
        'translation',
        'legal',
        'tax',
        'medical',
        'craft',
        'consumer'
      )
    ),

  CONSTRAINT services_status_check
    CHECK (
      status IN (
        'draft',
        'published',
        'archived'
      )
    ),

  CONSTRAINT services_featured_requires_published
    CHECK (
      featured = FALSE
      OR status = 'published'
    )
);

CREATE INDEX IF NOT EXISTS services_status_updated_idx
  ON services (
    status,
    updated_at DESC,
    id DESC
  );

CREATE UNIQUE INDEX IF NOT EXISTS services_single_featured_unique
  ON services ((featured))
  WHERE featured = TRUE;

COMMIT;
