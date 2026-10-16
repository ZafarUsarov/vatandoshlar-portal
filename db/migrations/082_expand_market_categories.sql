BEGIN;
ALTER TABLE market_listings DROP CONSTRAINT IF EXISTS market_listings_category_check;
ALTER TABLE market_listings ADD CONSTRAINT market_listings_category_check
  CHECK (category IN ('items', 'electronics', 'furniture', 'clothing', 'children', 'sports', 'vehicles', 'housing', 'jobs', 'services', 'other'));
COMMIT;
