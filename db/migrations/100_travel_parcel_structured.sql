BEGIN;

-- M18.13: additive parcel metadata. No existing rows are rewritten.
ALTER TABLE public.travel_listings ADD COLUMN IF NOT EXISTS parcel_structured jsonb;
DO $$ BEGIN
 IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='travel_parcel_structured_object_check' AND conrelid='public.travel_listings'::regclass) THEN
  ALTER TABLE public.travel_listings ADD CONSTRAINT travel_parcel_structured_object_check CHECK (parcel_structured IS NULL OR jsonb_typeof(parcel_structured)='object');
 END IF;
END $$;
CREATE INDEX IF NOT EXISTS travel_parcel_cargo_payment_idx ON public.travel_listings ((parcel_structured->>'cargoType'),(parcel_structured->>'paymentType')) WHERE kind IN ('parcel_offer','parcel_request') AND status='published';

COMMIT;
