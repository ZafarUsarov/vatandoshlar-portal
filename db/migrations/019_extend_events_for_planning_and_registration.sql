BEGIN;

ALTER TABLE events
  ADD COLUMN event_status TEXT NOT NULL DEFAULT 'scheduled',
  ADD COLUMN organizer_type TEXT NOT NULL DEFAULT 'external',
  ADD COLUMN registration_method TEXT,
  ADD COLUMN registration_value TEXT,
  ADD COLUMN registration_required BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN capacity INTEGER;

UPDATE events
SET
  registration_method =
    CASE
      WHEN registration_status = 'not_required'
        THEN 'none'
      WHEN registration_url IS NOT NULL
        THEN 'external_url'
      ELSE 'none'
    END,
  registration_required =
    registration_url IS NOT NULL
    AND registration_status <> 'not_required';

ALTER TABLE events
  ALTER COLUMN registration_method SET NOT NULL,
  ALTER COLUMN start_date DROP NOT NULL,
  ALTER COLUMN official_source_name DROP NOT NULL,
  ALTER COLUMN official_source_url DROP NOT NULL,
  ALTER COLUMN verified_at DROP NOT NULL;

DO $$
DECLARE
  constraint_name TEXT;
BEGIN
  SELECT c.conname
  INTO constraint_name
  FROM pg_constraint AS c
  WHERE
    c.conrelid = 'events'::regclass
    AND c.contype = 'c'
    AND pg_get_constraintdef(c.oid) ILIKE '%format%'
    AND pg_get_constraintdef(c.oid) ILIKE '%online_url%'
    AND pg_get_constraintdef(c.oid) ILIKE '%venue_name%'
  ORDER BY c.conname
  LIMIT 1;

  IF constraint_name IS NOT NULL THEN
    EXECUTE format(
      'ALTER TABLE events DROP CONSTRAINT %I',
      constraint_name
    );
  END IF;
END
$$;

ALTER TABLE events
  ADD CONSTRAINT events_event_status_check
    CHECK (
      event_status IN (
        'planning',
        'scheduled',
        'cancelled'
      )
    ),
  ADD CONSTRAINT events_organizer_type_check
    CHECK (
      organizer_type IN (
        'vatandoshlar',
        'external'
      )
    ),
  ADD CONSTRAINT events_registration_method_check
    CHECK (
      registration_method IN (
        'google_form',
        'telegram',
        'email',
        'phone',
        'external_url',
        'none'
      )
    ),
  ADD CONSTRAINT events_capacity_check
    CHECK (
      capacity IS NULL
      OR capacity > 0
    ),
  ADD CONSTRAINT events_registration_destination_check
    CHECK (
      (
        registration_method = 'none'
        AND registration_url IS NULL
        AND registration_value IS NULL
        AND registration_required = FALSE
      )
      OR (
        registration_method IN (
          'google_form',
          'external_url'
        )
        AND registration_url IS NOT NULL
        AND registration_value IS NULL
      )
      OR (
        registration_method IN (
          'telegram',
          'email',
          'phone'
        )
        AND registration_value IS NOT NULL
        AND registration_url IS NULL
      )
    ),
  ADD CONSTRAINT events_scheduled_requirements_check
    CHECK (
      event_status <> 'scheduled'
      OR (
        start_date IS NOT NULL
        AND official_source_name IS NOT NULL
        AND official_source_url IS NOT NULL
        AND verified_at IS NOT NULL
        AND (
          (
            format = 'online'
            AND online_url IS NOT NULL
          )
          OR (
            format = 'offline'
            AND (
              city IS NOT NULL
              OR bundesland IS NOT NULL
              OR venue_name IS NOT NULL
              OR address IS NOT NULL
            )
          )
          OR (
            format = 'hybrid'
            AND online_url IS NOT NULL
            AND (
              city IS NOT NULL
              OR bundesland IS NOT NULL
              OR venue_name IS NOT NULL
              OR address IS NOT NULL
            )
          )
        )
      )
    );

CREATE INDEX IF NOT EXISTS events_public_event_status_idx
  ON events (
    status,
    event_status,
    start_date
  );

COMMIT;
