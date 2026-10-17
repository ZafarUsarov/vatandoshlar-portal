BEGIN;

-- M18.1: independent travel foundation. Does not alter Market, Savol or notifications.
CREATE TABLE IF NOT EXISTS travel_listings (
  id BIGSERIAL PRIMARY KEY,
  author_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE RESTRICT,
  slug TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  content_language TEXT NOT NULL DEFAULT 'uz',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  transport_mode TEXT NOT NULL,
  origin_country_code CHAR(2) NOT NULL,
  origin_city TEXT NOT NULL,
  destination_country_code CHAR(2) NOT NULL,
  destination_city TEXT NOT NULL,
  departure_at TIMESTAMPTZ NOT NULL,
  departure_timezone TEXT NOT NULL,
  arrival_at TIMESTAMPTZ,
  flight_number TEXT,
  transit_details TEXT,
  seats_available SMALLINT,
  assistance_details TEXT,
  parcel_details TEXT,
  price_amount NUMERIC(12,2),
  price_currency CHAR(3),
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT travel_listings_slug_check CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT travel_listings_kind_check CHECK (kind IN (
    'ride_offer','ride_request','companion_request','companion_offer','parcel_request','parcel_offer'
  )),
  CONSTRAINT travel_listings_status_check CHECK (status IN ('draft','published','hidden','closed','removed')),
  CONSTRAINT travel_listings_locale_check CHECK (content_language IN ('uz','de')),
  CONSTRAINT travel_listings_transport_check CHECK (transport_mode IN ('car','plane','train','bus','other')),
  CONSTRAINT travel_listings_title_check CHECK (BTRIM(title) <> ''),
  CONSTRAINT travel_listings_description_check CHECK (BTRIM(description) <> ''),
  CONSTRAINT travel_listings_origin_check CHECK (origin_country_code ~ '^[A-Z]{2}$' AND BTRIM(origin_city) <> ''),
  CONSTRAINT travel_listings_destination_check CHECK (destination_country_code ~ '^[A-Z]{2}$' AND BTRIM(destination_city) <> ''),
  CONSTRAINT travel_listings_timezone_check CHECK (BTRIM(departure_timezone) <> ''),
  CONSTRAINT travel_listings_seats_check CHECK (seats_available IS NULL OR seats_available BETWEEN 1 AND 20),
  CONSTRAINT travel_listings_price_check CHECK (
    (price_amount IS NULL AND price_currency IS NULL)
    OR (price_amount >= 0 AND price_currency ~ '^[A-Z]{3}$')
  ),
  CONSTRAINT travel_listings_publication_check CHECK (status <> 'published' OR published_at IS NOT NULL),
  CONSTRAINT travel_listings_arrival_check CHECK (arrival_at IS NULL OR arrival_at >= departure_at),
  CONSTRAINT travel_listings_expiration_check CHECK (expires_at IS NULL OR expires_at > departure_at)
);

CREATE INDEX IF NOT EXISTS travel_listings_public_search_idx
  ON travel_listings (kind, departure_at, published_at DESC)
  WHERE status = 'published';
CREATE INDEX IF NOT EXISTS travel_listings_author_idx
  ON travel_listings (author_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS travel_listings_route_idx
  ON travel_listings (origin_country_code, destination_country_code, departure_at)
  WHERE status = 'published';

COMMIT;
