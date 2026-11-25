BEGIN;
ALTER TABLE events DROP CONSTRAINT events_category_check;
ALTER TABLE events ADD CONSTRAINT events_category_check CHECK (
  category IN ('culture', 'education', 'career', 'business', 'community', 'sport', 'children', 'consular', 'science')
);
COMMIT;
