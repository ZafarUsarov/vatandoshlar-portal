BEGIN;
ALTER TABLE market_listings ADD COLUMN IF NOT EXISTS price_type TEXT NOT NULL DEFAULT 'fixed';
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'market_listings_price_type_check'
      AND conrelid = 'market_listings'::regclass
  ) THEN
    ALTER TABLE market_listings
      ADD CONSTRAINT market_listings_price_type_check
      CHECK (price_type IN ('fixed', 'negotiable'));
  END IF;
END $$;
COMMIT;
