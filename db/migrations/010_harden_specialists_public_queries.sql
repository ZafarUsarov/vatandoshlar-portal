BEGIN;

CREATE INDEX IF NOT EXISTS specialists_published_directory_idx
  ON specialists (
    featured DESC,
    premium DESC,
    verified DESC,
    sponsored DESC,
    updated_at DESC,
    id DESC
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS specialists_published_slug_idx
  ON specialists (slug)
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS specialists_featured_verified_idx
  ON specialists (
    premium DESC,
    sponsored DESC,
    updated_at DESC,
    id DESC
  )
  WHERE
    status = 'published'
    AND featured = TRUE
    AND verified = TRUE;

COMMIT;
