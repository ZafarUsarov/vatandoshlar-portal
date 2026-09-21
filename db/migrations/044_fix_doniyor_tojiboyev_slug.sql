BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'doniyor-tojiboyev-nigora-okhunova'
  ) THEN
    RAISE EXCEPTION
      'Doniyor Tojiboyev specialist profile with the legacy slug was not found.';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'doniyor-tojiboyev'
  ) THEN
    RAISE EXCEPTION
      'Target specialist slug doniyor-tojiboyev already exists.';
  END IF;
END
$$;

UPDATE specialists
SET
  slug = 'doniyor-tojiboyev',
  updated_at = NOW()
WHERE slug = 'doniyor-tojiboyev-nigora-okhunova';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE
      slug = 'doniyor-tojiboyev'
      AND name = 'Doniyor Tojiboyev'
  ) THEN
    RAISE EXCEPTION
      'Doniyor Tojiboyev slug update verification failed.';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'doniyor-tojiboyev-nigora-okhunova'
  ) THEN
    RAISE EXCEPTION
      'Legacy Doniyor Tojiboyev slug still exists.';
  END IF;
END
$$;

COMMIT;