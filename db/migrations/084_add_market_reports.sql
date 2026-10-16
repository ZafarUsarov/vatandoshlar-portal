BEGIN;

ALTER TABLE content_reports
  ADD COLUMN IF NOT EXISTS market_listing_id BIGINT
  REFERENCES market_listings(id) ON DELETE CASCADE;

ALTER TABLE content_reports
  DROP CONSTRAINT IF EXISTS content_reports_exactly_one_target_check;

ALTER TABLE content_reports
  ADD CONSTRAINT content_reports_exactly_one_target_check
  CHECK (
    (question_id IS NOT NULL)::int +
    (answer_id IS NOT NULL)::int +
    (market_listing_id IS NOT NULL)::int = 1
  );

CREATE UNIQUE INDEX IF NOT EXISTS content_reports_unique_market_reporter_idx
  ON content_reports (reporter_user_id, market_listing_id)
  WHERE market_listing_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS content_reports_market_status_idx
  ON content_reports (market_listing_id, status, created_at DESC)
  WHERE market_listing_id IS NOT NULL;

COMMIT;
