BEGIN;

CREATE TABLE IF NOT EXISTS specialists (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,

  profession_uz TEXT NOT NULL,
  profession_de TEXT NOT NULL,

  short_description_uz TEXT NOT NULL,
  short_description_de TEXT NOT NULL,

  categories TEXT[] NOT NULL DEFAULT '{}',
  languages TEXT[] NOT NULL DEFAULT '{}',

  services_uz TEXT[] NOT NULL DEFAULT '{}',
  services_de TEXT[] NOT NULL DEFAULT '{}',

  city TEXT,
  bundesland TEXT,
  postal_code TEXT,

  service_area_uz TEXT,
  service_area_de TEXT,

  email TEXT,
  phone TEXT,
  website TEXT,
  whatsapp TEXT,
  telegram TEXT,
  instagram TEXT,
  youtube TEXT,
  facebook TEXT,

  pricing_note_uz TEXT,
  pricing_note_de TEXT,

  avatar_url TEXT,

  years_of_experience INTEGER,
  rating NUMERIC(3, 2),
  review_count INTEGER,

  status TEXT NOT NULL DEFAULT 'draft',

  verified BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  premium BOOLEAN NOT NULL DEFAULT FALSE,
  sponsored BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT specialists_status_check
    CHECK (status IN ('draft', 'published', 'archived')),

  CONSTRAINT specialists_categories_not_empty
    CHECK (cardinality(categories) > 0),

  CONSTRAINT specialists_services_parallel
    CHECK (cardinality(services_uz) = cardinality(services_de)),

  CONSTRAINT specialists_years_of_experience_check
    CHECK (
      years_of_experience IS NULL
      OR years_of_experience >= 0
    ),

  CONSTRAINT specialists_rating_check
    CHECK (
      rating IS NULL
      OR (rating >= 0 AND rating <= 5)
    ),

  CONSTRAINT specialists_review_count_check
    CHECK (
      review_count IS NULL
      OR review_count >= 0
    )
);

CREATE INDEX IF NOT EXISTS specialists_status_updated_idx
  ON specialists (
    status,
    updated_at DESC,
    id DESC
  );

CREATE INDEX IF NOT EXISTS specialists_published_flags_idx
  ON specialists (
    featured DESC,
    verified DESC,
    premium DESC,
    updated_at DESC,
    id DESC
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS specialists_categories_gin_idx
  ON specialists
  USING GIN (categories);

CREATE INDEX IF NOT EXISTS specialists_languages_gin_idx
  ON specialists
  USING GIN (languages);

COMMIT;
