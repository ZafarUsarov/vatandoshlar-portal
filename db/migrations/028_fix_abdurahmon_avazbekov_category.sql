BEGIN;

UPDATE specialists
SET categories = ARRAY['beauty']::TEXT[]
WHERE slug = 'abdurahmon-avazbekov';

COMMIT;
