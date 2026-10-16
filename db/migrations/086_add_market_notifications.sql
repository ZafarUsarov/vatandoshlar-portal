BEGIN;
ALTER TABLE notifications ADD COLUMN market_listing_id BIGINT REFERENCES market_listings(id) ON DELETE SET NULL;
ALTER TABLE notifications DROP CONSTRAINT notifications_type_check;
ALTER TABLE notifications ADD CONSTRAINT notifications_type_check CHECK (type IN ('savol_new_answer', 'market_listing_hidden', 'market_listing_removed'));
ALTER TABLE notifications ADD CONSTRAINT notifications_market_target_check CHECK (
  type NOT IN ('market_listing_hidden', 'market_listing_removed') OR
  (market_listing_id IS NOT NULL AND question_id IS NULL AND answer_id IS NULL AND actor_user_id IS NULL)
);
CREATE INDEX notifications_market_listing_idx ON notifications (market_listing_id) WHERE market_listing_id IS NOT NULL;
COMMIT;
