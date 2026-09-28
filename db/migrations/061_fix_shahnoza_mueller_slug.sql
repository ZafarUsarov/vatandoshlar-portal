BEGIN;

UPDATE specialists
SET
  slug = 'shahnoza-mueller',
  updated_at = NOW()
WHERE slug = 'shahnoza-muller'
  AND code = 'UZ-TR-SHAHNOZA-MUELLER';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'shahnoza-mueller'
      AND code = 'UZ-TR-SHAHNOZA-MUELLER'
  ) THEN
    RAISE EXCEPTION 'Shahnoza Mueller slug migration verification failed';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'shahnoza-muller'
      AND code = 'UZ-TR-SHAHNOZA-MUELLER'
  ) THEN
    RAISE EXCEPTION 'Old Shahnoza Muller slug still exists';
  END IF;
END $$;

COMMIT;
