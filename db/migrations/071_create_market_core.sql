BEGIN;

CREATE TABLE IF NOT EXISTS market_listings (
  id BIGSERIAL PRIMARY KEY,
  author_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE RESTRICT,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  slug TEXT NOT NULL UNIQUE,
  listing_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content_language TEXT NOT NULL,
  price_amount NUMERIC(12, 2),
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  CONSTRAINT market_listings_slug_check CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT market_listings_title_check CHECK (BTRIM(title) <> ''),
  CONSTRAINT market_listings_description_check CHECK (BTRIM(description) <> ''),
  CONSTRAINT market_listings_type_check CHECK (listing_type IN ('sell', 'buy', 'giveaway')),
  CONSTRAINT market_listings_language_check CHECK (content_language IN ('uz', 'de')),
  CONSTRAINT market_listings_currency_check CHECK (currency = 'EUR'),
  CONSTRAINT market_listings_status_check CHECK (status IN ('draft', 'published', 'hidden', 'closed', 'removed')),
  CONSTRAINT market_listings_price_check CHECK (
    (listing_type = 'giveaway' AND price_amount = 0)
    OR (listing_type = 'sell' AND price_amount IS NOT NULL AND price_amount >= 0)
    OR (listing_type = 'buy' AND (price_amount IS NULL OR price_amount >= 0))
  ),
  CONSTRAINT market_listings_publication_check CHECK (status <> 'published' OR published_at IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS market_listings_status_published_idx
  ON market_listings (status, published_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS market_listings_location_status_idx
  ON market_listings (location_id, status, published_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS market_listings_author_created_idx
  ON market_listings (author_user_id, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS market_listings_type_status_idx
  ON market_listings (listing_type, status, published_at DESC, id DESC);

COMMIT;
