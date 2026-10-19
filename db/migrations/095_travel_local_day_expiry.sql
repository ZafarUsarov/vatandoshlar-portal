-- M18.7.1: local-calendar-day expiry. Apply ONLY to isolated travel browser test DB first.
-- A listing remains visible throughout its departure date in departure_timezone.
BEGIN;
UPDATE travel_listings
SET expires_at = ((departure_at AT TIME ZONE departure_timezone)::date + INTERVAL '1 day') AT TIME ZONE departure_timezone,
    updated_at = NOW()
WHERE expires_at IS NULL
   OR expires_at IS DISTINCT FROM (((departure_at AT TIME ZONE departure_timezone)::date + INTERVAL '1 day') AT TIME ZONE departure_timezone);
-- CHECK (expires_at > departure_at) remains enforced.
CREATE INDEX IF NOT EXISTS travel_listings_active_expiry_idx
  ON travel_listings (expires_at, departure_at)
  WHERE status = 'published';
COMMIT;
