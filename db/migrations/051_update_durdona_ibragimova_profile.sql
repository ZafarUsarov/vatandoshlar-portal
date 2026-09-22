BEGIN;

DO $$
DECLARE
  target_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO target_count
  FROM specialists
  WHERE slug = 'durdona-ibragimova'
    AND code = 'UZ-MED-0001';

  IF target_count <> 1 THEN
    RAISE EXCEPTION
      'Expected exactly one Durdona Ibragimova profile, found %.',
      target_count;
  END IF;
END
$$;

UPDATE specialists
SET
  avatar_url = '/images/specialists/durdona-ibragimova.webp',
  pricing_note_uz = NULL,
  pricing_note_de = NULL,
  updated_at = NOW()
WHERE slug = 'durdona-ibragimova'
  AND code = 'UZ-MED-0001';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'durdona-ibragimova'
      AND code = 'UZ-MED-0001'
      AND avatar_url = '/images/specialists/durdona-ibragimova.webp'
      AND pricing_note_uz IS NULL
      AND pricing_note_de IS NULL
      AND status = 'published'
  ) THEN
    RAISE EXCEPTION
      'Durdona Ibragimova profile verification failed.';
  END IF;
END
$$;

COMMIT;