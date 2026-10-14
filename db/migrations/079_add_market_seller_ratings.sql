BEGIN;
CREATE TABLE IF NOT EXISTS market_seller_ratings (
  seller_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  rater_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (seller_user_id, rater_user_id),
  CONSTRAINT market_seller_ratings_no_self_rating CHECK (seller_user_id <> rater_user_id)
);
CREATE INDEX IF NOT EXISTS market_seller_ratings_seller_idx ON market_seller_ratings(seller_user_id);
COMMIT;
