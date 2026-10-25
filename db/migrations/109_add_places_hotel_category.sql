BEGIN;
ALTER TABLE places DROP CONSTRAINT IF EXISTS places_category_check;
ALTER TABLE places ADD CONSTRAINT places_category_check CHECK (category IN ('restaurant','hotel','shop','service','organization','other'));
COMMIT;
