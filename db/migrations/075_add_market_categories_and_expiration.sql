BEGIN;

ALTER TABLE market_listings
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS plan_type TEXT,
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

UPDATE market_listings SET category = 'items' WHERE category IS NULL;
UPDATE market_listings SET plan_type = 'free' WHERE plan_type IS NULL;

ALTER TABLE market_listings
  ALTER COLUMN category SET DEFAULT 'items',
  ALTER COLUMN category SET NOT NULL,
  ALTER COLUMN plan_type SET DEFAULT 'free',
  ALTER COLUMN plan_type SET NOT NULL;

ALTER TABLE market_listings
  ADD CONSTRAINT market_listings_category_check
    CHECK (category IN ('items', 'vehicles', 'housing', 'jobs', 'services')),
  ADD CONSTRAINT market_listings_plan_type_check
    CHECK (plan_type IN ('free', 'pro')),
  ADD CONSTRAINT market_listings_expiration_check
    CHECK (expires_at IS NULL OR published_at IS NOT NULL);

CREATE INDEX IF NOT EXISTS market_listings_public_expiration_idx
  ON market_listings (expires_at, published_at DESC, id DESC)
  WHERE status = 'published';

COMMIT;
