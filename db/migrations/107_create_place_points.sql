BEGIN;

-- M4: Canonical geographic points of interest
-- Initial category: mosque
-- Future categories can be introduced through application validation.

CREATE TABLE IF NOT EXISTS place_points (
  id BIGSERIAL PRIMARY KEY,

  category TEXT NOT NULL,
  name TEXT NOT NULL,

  latitude NUMERIC(9, 6) NOT NULL,
  longitude NUMERIC(9, 6) NOT NULL,

  address TEXT,

  source TEXT NOT NULL DEFAULT 'openstreetmap',
  source_type TEXT NOT NULL,
  source_id BIGINT NOT NULL,

  source_updated_at TIMESTAMPTZ,
  last_synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT place_points_category_check
    CHECK (category IN ('mosque')),

  CONSTRAINT place_points_name_check
    CHECK (LENGTH(TRIM(name)) > 0),

  CONSTRAINT place_points_latitude_check
    CHECK (latitude BETWEEN -90 AND 90),

  CONSTRAINT place_points_longitude_check
    CHECK (longitude BETWEEN -180 AND 180),

  CONSTRAINT place_points_source_check
    CHECK (source IN ('openstreetmap')),

  CONSTRAINT place_points_source_type_check
    CHECK (source_type IN ('node', 'way', 'relation')),

  CONSTRAINT place_points_source_id_check
    CHECK (source_id > 0),

  CONSTRAINT place_points_source_unique
    UNIQUE (source, source_type, source_id)
);

CREATE INDEX IF NOT EXISTS place_points_category_idx
  ON place_points (category);

CREATE INDEX IF NOT EXISTS place_points_coordinates_idx
  ON place_points (latitude, longitude);

CREATE INDEX IF NOT EXISTS place_points_last_synced_idx
  ON place_points (last_synced_at);

COMMIT;
