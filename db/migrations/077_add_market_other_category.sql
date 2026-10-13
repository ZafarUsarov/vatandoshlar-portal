BEGIN;
ALTER TABLE market_listings DROP CONSTRAINT IF EXISTS market_listings_category_check;
ALTER TABLE market_listings ADD CONSTRAINT market_listings_category_check
  CHECK (category IN ('items', 'vehicles', 'housing', 'jobs', 'services', 'other'));
CREATE INDEX IF NOT EXISTS market_listings_public_category_idx
  ON market_listings (category, published_at DESC, id DESC)
  WHERE status = 'published';
COMMIT;
