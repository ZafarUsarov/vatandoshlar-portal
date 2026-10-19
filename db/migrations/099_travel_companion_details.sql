BEGIN;

-- M18.11: structured flight companion details; existing listings remain valid.
ALTER TABLE public.travel_listings
  ADD COLUMN IF NOT EXISTS companion_details jsonb;
DO $$ BEGIN
 IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='travel_companion_details_object_check' AND conrelid='public.travel_listings'::regclass) THEN
  ALTER TABLE public.travel_listings ADD CONSTRAINT travel_companion_details_object_check
    CHECK (companion_details IS NULL OR jsonb_typeof(companion_details)='object');
 END IF;
END $$;

COMMIT;
