BEGIN;

ALTER TABLE specialists
  ADD COLUMN IF NOT EXISTS location_id BIGINT;

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS location_id BIGINT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'specialists_location_id_fkey'
  ) THEN
    ALTER TABLE specialists
      ADD CONSTRAINT specialists_location_id_fkey
      FOREIGN KEY (location_id)
      REFERENCES locations(id)
      ON DELETE SET NULL;
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'events_location_id_fkey'
  ) THEN
    ALTER TABLE events
      ADD CONSTRAINT events_location_id_fkey
      FOREIGN KEY (location_id)
      REFERENCES locations(id)
      ON DELETE SET NULL;
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS specialists_location_id_idx
  ON specialists (location_id)
  WHERE location_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS events_location_id_idx
  ON events (location_id)
  WHERE location_id IS NOT NULL;

COMMIT;
