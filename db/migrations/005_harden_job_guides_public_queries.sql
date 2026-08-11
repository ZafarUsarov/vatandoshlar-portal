BEGIN;

CREATE INDEX IF NOT EXISTS job_guides_published_order_idx
  ON job_guides (
    featured DESC,
    verified_at DESC,
    updated_at DESC,
    id DESC
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS job_guides_published_slug_idx
  ON job_guides (slug)
  WHERE status = 'published';

COMMIT;
