BEGIN;

UPDATE specialists
SET
  categories = ARRAY['entrepreneur']::TEXT[],
  updated_at = NOW()
WHERE slug = 'doniyor-tojiboyev-nigora-okhunova';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'doniyor-tojiboyev-nigora-okhunova'
      AND categories = ARRAY['entrepreneur']::TEXT[]
      AND status = 'published'
  ) THEN
    RAISE EXCEPTION 'Entrepreneur specialist category migration verification failed';
  END IF;
END
$$;

COMMIT;
