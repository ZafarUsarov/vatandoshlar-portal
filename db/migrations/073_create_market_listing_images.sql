BEGIN;

CREATE TABLE IF NOT EXISTS market_listing_images (
  id BIGSERIAL PRIMARY KEY,
  listing_id BIGINT NOT NULL REFERENCES market_listings(id) ON DELETE CASCADE,
  storage_key TEXT NOT NULL UNIQUE,
  content_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL,
  position SMALLINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT market_listing_images_content_type_check
    CHECK (content_type IN ('image/jpeg', 'image/png', 'image/webp')),
  CONSTRAINT market_listing_images_size_check
    CHECK (byte_size BETWEEN 1 AND 5242880),
  CONSTRAINT market_listing_images_position_check
    CHECK (position BETWEEN 0 AND 4),
  CONSTRAINT market_listing_images_status_check
    CHECK (status IN ('pending', 'ready')),
  CONSTRAINT market_listing_images_storage_key_check
    CHECK (length(storage_key) BETWEEN 1 AND 512),
  CONSTRAINT market_listing_images_position_unique
    UNIQUE (listing_id, position) DEFERRABLE INITIALLY IMMEDIATE
);

CREATE INDEX IF NOT EXISTS market_listing_images_listing_status_idx
  ON market_listing_images (listing_id, status, position);

-- Enforce a maximum of five rows per listing at the database boundary.
-- Serialize concurrent inserts for the same listing using its parent row.
CREATE OR REPLACE FUNCTION market_listing_images_limit_five()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  PERFORM 1 FROM market_listings WHERE id = NEW.listing_id FOR UPDATE;
  IF (SELECT count(*) FROM market_listing_images WHERE listing_id = NEW.listing_id) >= 5 THEN
    RAISE EXCEPTION 'A market listing may have at most five images'
      USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS market_listing_images_limit_five_trigger ON market_listing_images;
CREATE TRIGGER market_listing_images_limit_five_trigger
  BEFORE INSERT ON market_listing_images
  FOR EACH ROW EXECUTE FUNCTION market_listing_images_limit_five();

COMMIT;
