BEGIN;

CREATE INDEX IF NOT EXISTS guide_articles_public_category_order_idx
  ON guide_articles (
    category_slug,
    featured DESC,
    last_reviewed_at DESC,
    id ASC
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS guide_articles_public_slug_lookup_idx
  ON guide_articles (
    category_slug,
    slug
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS guide_articles_public_featured_idx
  ON guide_articles (
    last_reviewed_at DESC,
    id ASC
  )
  WHERE
    status = 'published'
    AND featured = TRUE;

CREATE INDEX IF NOT EXISTS guide_articles_public_related_slug_idx
  ON guide_articles (
    slug
  )
  WHERE status = 'published';

COMMIT;
