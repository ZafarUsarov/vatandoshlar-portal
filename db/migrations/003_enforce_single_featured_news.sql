BEGIN;

UPDATE news_articles
SET featured = FALSE
WHERE featured = TRUE
  AND status <> 'published';

WITH ranked_featured AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      ORDER BY
        updated_at DESC,
        id DESC
    ) AS position
  FROM news_articles
  WHERE featured = TRUE
)
UPDATE news_articles
SET featured = FALSE
WHERE id IN (
  SELECT id
  FROM ranked_featured
  WHERE position > 1
);

ALTER TABLE news_articles
  DROP CONSTRAINT IF EXISTS news_articles_featured_requires_published;

ALTER TABLE news_articles
  ADD CONSTRAINT news_articles_featured_requires_published
  CHECK (
    featured = FALSE
    OR status = 'published'
  );

CREATE UNIQUE INDEX IF NOT EXISTS news_articles_single_featured_unique
  ON news_articles ((featured))
  WHERE featured = TRUE;

COMMIT;
