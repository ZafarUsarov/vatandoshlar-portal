BEGIN;

ALTER TABLE news_articles
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

COMMENT ON COLUMN news_articles.published_at IS
  'Timestamp of the first transition to published status. Preserved across later edits, archives, and republishes.';

COMMIT;
