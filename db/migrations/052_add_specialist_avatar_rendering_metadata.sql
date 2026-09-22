BEGIN;

ALTER TABLE specialists
  ADD COLUMN IF NOT EXISTS image_fit TEXT,
  ADD COLUMN IF NOT EXISTS image_position TEXT;

ALTER TABLE specialists
  DROP CONSTRAINT IF EXISTS specialists_image_fit_check;

ALTER TABLE specialists
  ADD CONSTRAINT specialists_image_fit_check
  CHECK (image_fit IS NULL OR image_fit IN ('cover', 'contain'));

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
      'Expected exactly one Durdona Ibragimova specialist row, found %',
      target_count;
  END IF;
END $$;

UPDATE specialists
SET
  image_fit = 'contain',
  image_position = 'center',
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
      AND image_fit = 'contain'
      AND image_position = 'center'
  ) THEN
    RAISE EXCEPTION
      'Durdona Ibragimova avatar rendering metadata verification failed';
  END IF;
END $$;

COMMIT;
