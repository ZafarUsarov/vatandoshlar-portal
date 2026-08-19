BEGIN;

ALTER TABLE news_articles
  ADD COLUMN IF NOT EXISTS view_count BIGINT NOT NULL DEFAULT 0;

ALTER TABLE guide_articles
  ADD COLUMN IF NOT EXISTS view_count BIGINT NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS content_view_dedup (
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  visitor_key TEXT NOT NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT content_view_dedup_content_type_check
    CHECK (content_type IN ('news', 'guide')),

  CONSTRAINT content_view_dedup_primary_key
    PRIMARY KEY (
      content_type,
      content_id,
      visitor_key
    )
);

CREATE INDEX IF NOT EXISTS content_view_dedup_viewed_at_idx
  ON content_view_dedup (viewed_at);

COMMENT ON COLUMN news_articles.view_count IS
  'Aggregate public article view count. Updated only by the content view tracking flow.';

COMMENT ON COLUMN guide_articles.view_count IS
  'Aggregate public article view count. Updated only by the content view tracking flow.';

COMMENT ON TABLE content_view_dedup IS
  'Privacy-conscious temporary deduplication records used to prevent repeated article views from inflating public counters.';

COMMIT;