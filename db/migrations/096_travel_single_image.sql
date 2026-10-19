BEGIN;

-- Apply only to the isolated travel test database before local QA.
ALTER TABLE travel_listings ADD COLUMN IF NOT EXISTS image_key text;
ALTER TABLE travel_listings ADD COLUMN IF NOT EXISTS image_thumb_key text;

COMMIT;
