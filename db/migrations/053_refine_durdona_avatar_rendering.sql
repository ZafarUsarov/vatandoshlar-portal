BEGIN;

ALTER TABLE specialists
  ADD COLUMN IF NOT EXISTS image_scale NUMERIC(4, 3);

ALTER TABLE specialists
  DROP CONSTRAINT IF EXISTS specialists_image_scale_check;

ALTER TABLE specialists
  ADD CONSTRAINT specialists_image_scale_check
  CHECK (image_scale IS NULL OR (image_scale >= 0.5 AND image_scale <= 1.5));

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
  image_fit = 'cover',
  image_position = 'center top',
  image_scale = 0.920,
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
      AND image_fit = 'cover'
      AND image_position = 'center top'
      AND image_scale = 0.920
  ) THEN
    RAISE EXCEPTION
      'Durdona Ibragimova avatar rendering metadata verification failed';
  END IF;
END $$;

COMMIT;
