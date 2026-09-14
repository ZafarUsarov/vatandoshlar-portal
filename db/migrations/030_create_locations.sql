BEGIN;

CREATE TABLE IF NOT EXISTS locations (
  id BIGSERIAL PRIMARY KEY,

  country_code TEXT NOT NULL DEFAULT 'DE',
  location_type TEXT NOT NULL,

  state_code TEXT NOT NULL,
  state_name TEXT NOT NULL,
  city_name TEXT,

  slug TEXT NOT NULL UNIQUE,

  parent_id BIGINT
    REFERENCES locations(id)
    ON DELETE RESTRICT,

  latitude NUMERIC(9, 6),
  longitude NUMERIC(9, 6),

  status TEXT NOT NULL DEFAULT 'active',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT locations_country_code_check
    CHECK (country_code ~ '^[A-Z]{2}$'),

  CONSTRAINT locations_type_check
    CHECK (location_type IN ('state', 'city')),

  CONSTRAINT locations_status_check
    CHECK (status IN ('active', 'inactive')),

  CONSTRAINT locations_state_code_check
    CHECK (state_code ~ '^DE-[A-Z]{2}$'),

  CONSTRAINT locations_state_name_not_empty
    CHECK (BTRIM(state_name) <> ''),

  CONSTRAINT locations_slug_not_empty
    CHECK (BTRIM(slug) <> ''),

  CONSTRAINT locations_coordinate_pair_check
    CHECK (
      (latitude IS NULL AND longitude IS NULL)
      OR
      (latitude IS NOT NULL AND longitude IS NOT NULL)
    ),

  CONSTRAINT locations_latitude_check
    CHECK (
      latitude IS NULL
      OR (latitude >= -90 AND latitude <= 90)
    ),

  CONSTRAINT locations_longitude_check
    CHECK (
      longitude IS NULL
      OR (longitude >= -180 AND longitude <= 180)
    ),

  CONSTRAINT locations_hierarchy_shape_check
    CHECK (
      (
        location_type = 'state'
        AND city_name IS NULL
        AND parent_id IS NULL
      )
      OR
      (
        location_type = 'city'
        AND city_name IS NOT NULL
        AND BTRIM(city_name) <> ''
        AND parent_id IS NOT NULL
      )
    )
);

CREATE UNIQUE INDEX IF NOT EXISTS locations_state_code_unique
  ON locations (state_code)
  WHERE location_type = 'state';

CREATE UNIQUE INDEX IF NOT EXISTS locations_city_state_name_unique
  ON locations (state_code, LOWER(city_name))
  WHERE location_type = 'city';

CREATE INDEX IF NOT EXISTS locations_active_type_order_idx
  ON locations (
    location_type,
    state_name,
    city_name,
    id
  )
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS locations_parent_idx
  ON locations (
    parent_id,
    status,
    city_name,
    id
  );

COMMIT;
