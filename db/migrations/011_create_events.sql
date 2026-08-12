BEGIN;

CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,

  slug TEXT NOT NULL UNIQUE,

  title_uz TEXT NOT NULL,
  title_de TEXT NOT NULL,

  excerpt_uz TEXT NOT NULL,
  excerpt_de TEXT NOT NULL,

  description_uz TEXT[] NOT NULL DEFAULT '{}',
  description_de TEXT[] NOT NULL DEFAULT '{}',

  category TEXT NOT NULL,
  format TEXT NOT NULL,

  start_date DATE NOT NULL,
  end_date DATE,

  start_time TIME,
  end_time TIME,

  timezone TEXT NOT NULL DEFAULT 'Europe/Berlin',

  city TEXT,
  bundesland TEXT,
  venue_name TEXT,
  address TEXT,
  online_url TEXT,

  organizer_name TEXT NOT NULL,
  organizer_url TEXT,

  registration_status TEXT NOT NULL,
  registration_url TEXT,
  registration_deadline DATE,

  languages TEXT[] NOT NULL DEFAULT '{}',

  price_label_uz TEXT NOT NULL,
  price_label_de TEXT NOT NULL,

  official_source_name TEXT NOT NULL,
  official_source_url TEXT NOT NULL,

  verified_at DATE NOT NULL,

  important_notes_uz TEXT[] NOT NULL DEFAULT '{}',
  important_notes_de TEXT[] NOT NULL DEFAULT '{}',

  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT events_status_check
    CHECK (
      status IN (
        'draft',
        'published',
        'archived'
      )
    ),

  CONSTRAINT events_category_check
    CHECK (
      category IN (
        'culture',
        'education',
        'career',
        'business',
        'community',
        'sport',
        'children',
        'consular'
      )
    ),

  CONSTRAINT events_format_check
    CHECK (
      format IN (
        'offline',
        'online',
        'hybrid'
      )
    ),

  CONSTRAINT events_registration_status_check
    CHECK (
      registration_status IN (
        'open',
        'not_required',
        'sold_out',
        'closed'
      )
    ),

  CONSTRAINT events_description_parallel
    CHECK (
      cardinality(description_uz)
      =
      cardinality(description_de)
    ),

  CONSTRAINT events_important_notes_parallel
    CHECK (
      cardinality(important_notes_uz)
      =
      cardinality(important_notes_de)
    ),

  CONSTRAINT events_date_range_check
    CHECK (
      end_date IS NULL
      OR end_date >= start_date
    ),

  CONSTRAINT events_time_range_check
    CHECK (
      end_time IS NULL
      OR start_time IS NULL
      OR end_date IS NOT NULL
      OR end_time >= start_time
    ),

  CONSTRAINT events_registration_deadline_check
    CHECK (
      registration_deadline IS NULL
      OR registration_deadline <= COALESCE(
        end_date,
        start_date
      )
    ),

  CONSTRAINT events_location_check
    CHECK (
      (
        format = 'online'
        AND online_url IS NOT NULL
      )
      OR (
        format = 'offline'
        AND (
          city IS NOT NULL
          OR venue_name IS NOT NULL
          OR address IS NOT NULL
        )
      )
      OR (
        format = 'hybrid'
        AND online_url IS NOT NULL
        AND (
          city IS NOT NULL
          OR venue_name IS NOT NULL
          OR address IS NOT NULL
        )
      )
    )
);

CREATE INDEX IF NOT EXISTS events_status_start_date_idx
  ON events (
    status,
    start_date,
    id
  );

CREATE INDEX IF NOT EXISTS events_status_updated_idx
  ON events (
    status,
    updated_at DESC,
    id DESC
  );

CREATE INDEX IF NOT EXISTS events_upcoming_published_idx
  ON events (
    start_date,
    id
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS events_categories_idx
  ON events (
    category
  );

CREATE INDEX IF NOT EXISTS events_languages_gin_idx
  ON events
  USING GIN (languages);

COMMIT;
