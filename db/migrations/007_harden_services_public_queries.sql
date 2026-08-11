BEGIN;

CREATE INDEX IF NOT EXISTS services_published_order_idx
  ON services (
    featured DESC,
    updated_at DESC,
    id DESC
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS services_published_slug_idx
  ON services (slug)
  WHERE status = 'published';

COMMIT;
