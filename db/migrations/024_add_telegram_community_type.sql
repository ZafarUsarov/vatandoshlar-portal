BEGIN;

ALTER TABLE telegram_groups
  ADD COLUMN IF NOT EXISTS community_type TEXT NOT NULL DEFAULT 'regional';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'telegram_groups_community_type_check'
  ) THEN
    ALTER TABLE telegram_groups
      ADD CONSTRAINT telegram_groups_community_type_check
      CHECK (
        community_type IN (
          'regional',
          'professional'
        )
      );
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS telegram_groups_public_community_type_idx
  ON telegram_groups (
    community_type,
    sort_order,
    id
  )
  WHERE status = 'published';

COMMIT;
