BEGIN;
-- M17: Public Places directory. Separate from OSM place_points.
CREATE TABLE IF NOT EXISTS places (
 id BIGSERIAL PRIMARY KEY,
 slug TEXT NOT NULL UNIQUE,
 name TEXT NOT NULL CHECK (BTRIM(name) <> ''),
 category TEXT NOT NULL CHECK (category IN ('restaurant','shop','service','organization','other')),
 description_uz TEXT NOT NULL DEFAULT '',
 description_de TEXT NOT NULL DEFAULT '',
 location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
 street_address TEXT,
 postal_code TEXT,
 latitude NUMERIC(9,6), longitude NUMERIC(9,6),
 website TEXT,
 status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 CONSTRAINT places_coordinates_pair CHECK ((latitude IS NULL AND longitude IS NULL) OR (latitude IS NOT NULL AND longitude IS NOT NULL)),
 CONSTRAINT places_latitude_check CHECK (latitude IS NULL OR latitude BETWEEN -90 AND 90),
 CONSTRAINT places_longitude_check CHECK (longitude IS NULL OR longitude BETWEEN -180 AND 180),
 CONSTRAINT places_postal_code_check CHECK (postal_code IS NULL OR postal_code ~ '^[0-9]{5}$')
);
CREATE INDEX IF NOT EXISTS places_public_filter_idx ON places (status, category, location_id, name, id);
CREATE TABLE IF NOT EXISTS place_entrepreneurs (
 place_id BIGINT NOT NULL REFERENCES places(id) ON DELETE CASCADE,
 specialist_id BIGINT NOT NULL REFERENCES specialists(id) ON DELETE CASCADE,
 PRIMARY KEY (place_id, specialist_id)
);
COMMIT;
