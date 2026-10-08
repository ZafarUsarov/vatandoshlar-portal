BEGIN;

-- Postal codes are many-to-many with canonical city locations.
-- Existing locations and market_listings references are preserved.
CREATE TABLE IF NOT EXISTS location_postal_codes (
  id BIGSERIAL PRIMARY KEY,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  postal_code VARCHAR(5) NOT NULL,
  country_code CHAR(2) NOT NULL DEFAULT 'DE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT location_postal_codes_de_only CHECK (country_code = 'DE'),
  CONSTRAINT location_postal_codes_format CHECK (postal_code ~ '^[0-9]{5}$'),
  CONSTRAINT location_postal_codes_location_unique UNIQUE (location_id, postal_code)
);

CREATE INDEX IF NOT EXISTS location_postal_codes_postal_code_idx
  ON location_postal_codes (postal_code, location_id);

COMMIT;
