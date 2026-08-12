BEGIN;

ALTER TABLE specialists
  DROP CONSTRAINT IF EXISTS specialists_featured_requires_published;

ALTER TABLE specialists
  ADD CONSTRAINT specialists_featured_requires_published
    CHECK (
      featured = FALSE
      OR status = 'published'
    );

ALTER TABLE specialists
  DROP CONSTRAINT IF EXISTS specialists_premium_requires_published;

ALTER TABLE specialists
  ADD CONSTRAINT specialists_premium_requires_published
    CHECK (
      premium = FALSE
      OR status = 'published'
    );

ALTER TABLE specialists
  DROP CONSTRAINT IF EXISTS specialists_sponsored_requires_published;

ALTER TABLE specialists
  ADD CONSTRAINT specialists_sponsored_requires_published
    CHECK (
      sponsored = FALSE
      OR status = 'published'
    );

COMMIT;
