BEGIN;
ALTER TABLE travel_listings ADD COLUMN IF NOT EXISTS origin_region_code TEXT;
ALTER TABLE travel_listings ADD COLUMN IF NOT EXISTS destination_region_code TEXT;
CREATE INDEX IF NOT EXISTS travel_listings_region_search_idx ON travel_listings (origin_country_code, origin_region_code, destination_country_code, destination_region_code, departure_at) WHERE status='published';
COMMIT;
