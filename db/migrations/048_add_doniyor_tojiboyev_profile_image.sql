BEGIN;

DO $$
DECLARE
  target_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO target_count
  FROM specialists
  WHERE
    slug = 'doniyor-tojiboyev'
    AND code = 'UZ-BY-DN-0001';

  IF target_count <> 1 THEN
    RAISE EXCEPTION
      'Expected exactly one Doniyor Tojiboyev specialist profile, found %.',
      target_count;
  END IF;
END
$$;

UPDATE specialists
SET
  avatar_url = '/images/specialists/doniyor-tojiboyev.webp',
  updated_at = NOW()
WHERE
  slug = 'doniyor-tojiboyev'
  AND code = 'UZ-BY-DN-0001';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE
      slug = 'doniyor-tojiboyev'
      AND code = 'UZ-BY-DN-0001'
      AND avatar_url = '/images/specialists/doniyor-tojiboyev.webp'
      AND status = 'published'
  ) THEN
    RAISE EXCEPTION
      'Doniyor Tojiboyev profile image verification failed.';
  END IF;
END
$$;

COMMIT;