-- M18.10.6: ride_request passenger count, independent of ride_offer seats.
ALTER TABLE travel_listings ADD COLUMN IF NOT EXISTS passenger_count integer;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'travel_passenger_count_range_check' AND conrelid = 'travel_listings'::regclass) THEN
    ALTER TABLE travel_listings ADD CONSTRAINT travel_passenger_count_range_check
      CHECK (passenger_count IS NULL OR passenger_count BETWEEN 1 AND 20);
  END IF;
END $$;
