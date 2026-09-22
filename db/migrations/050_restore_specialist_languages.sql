BEGIN;

DO $$
DECLARE
  target_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO target_count
  FROM specialists
  WHERE slug IN (
    'nigora-okhunova',
    'doniyor-tojiboyev',
    'abdurahmon-avazbekov'
  );

  IF target_count <> 3 THEN
    RAISE EXCEPTION
      'Expected exactly 3 specialist profiles, found %.',
      target_count;
  END IF;
END
$$;

UPDATE specialists
SET
  languages = ARRAY['uz', 'de']::TEXT[],
  updated_at = NOW()
WHERE slug IN (
  'nigora-okhunova',
  'doniyor-tojiboyev',
  'abdurahmon-avazbekov'
);

DO $$
DECLARE
  invalid_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO invalid_count
  FROM specialists
  WHERE slug IN (
    'nigora-okhunova',
    'doniyor-tojiboyev',
    'abdurahmon-avazbekov'
  )
  AND languages IS DISTINCT FROM ARRAY['uz', 'de']::TEXT[];

  IF invalid_count <> 0 THEN
    RAISE EXCEPTION
      'Specialist language verification failed for % profile(s).',
      invalid_count;
  END IF;
END
$$;

COMMIT;