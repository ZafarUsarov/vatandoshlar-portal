BEGIN;

ALTER TABLE events
  DROP CONSTRAINT IF EXISTS events_featured_requires_published;

ALTER TABLE events
  ADD CONSTRAINT events_featured_requires_published
    CHECK (
      featured = FALSE
      OR status = 'published'
    );

COMMIT;
