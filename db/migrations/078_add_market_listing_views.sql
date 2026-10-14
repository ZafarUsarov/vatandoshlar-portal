BEGIN;
CREATE TABLE IF NOT EXISTS market_listing_views (
  listing_id BIGINT NOT NULL REFERENCES market_listings(id) ON DELETE CASCADE,
  visitor_token UUID NOT NULL,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (listing_id, visitor_token)
);
COMMIT;
