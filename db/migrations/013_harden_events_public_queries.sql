BEGIN;

CREATE INDEX IF NOT EXISTS events_public_upcoming_idx
  ON events (
    start_date ASC,
    start_time ASC,
    id ASC
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS events_public_slug_idx
  ON events (
    slug
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS events_public_featured_idx
  ON events (
    start_date ASC,
    start_time ASC,
    id ASC
  )
  WHERE
    status = 'published'
    AND featured = TRUE;

COMMIT;
