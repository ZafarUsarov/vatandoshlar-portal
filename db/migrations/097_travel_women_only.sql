-- M18.10.4. Apply ONLY to the isolated travel test database before QA.
ALTER TABLE travel_listings ADD COLUMN IF NOT EXISTS women_only boolean NOT NULL DEFAULT false;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'travel_women_only_service_check' AND conrelid = 'travel_listings'::regclass) THEN
    ALTER TABLE travel_listings ADD CONSTRAINT travel_women_only_service_check
      CHECK (NOT women_only OR kind LIKE 'ride_%' OR kind LIKE 'companion_%');
  END IF;
END $$;
