BEGIN;

ALTER TABLE market_listings
  ADD COLUMN contact_telegram TEXT,
  ADD COLUMN contact_whatsapp TEXT,
  ADD COLUMN contact_phone TEXT,
  ADD COLUMN contact_email TEXT;

ALTER TABLE market_listings
  ADD CONSTRAINT market_listings_contact_telegram_check CHECK (contact_telegram IS NULL OR contact_telegram ~ '^@?[A-Za-z0-9_]{5,32}$'),
  ADD CONSTRAINT market_listings_contact_whatsapp_check CHECK (contact_whatsapp IS NULL OR contact_whatsapp ~ '^\+[1-9][0-9]{6,14}$'),
  ADD CONSTRAINT market_listings_contact_phone_check CHECK (contact_phone IS NULL OR contact_phone ~ '^\+[1-9][0-9]{6,14}$'),
  ADD CONSTRAINT market_listings_contact_email_check CHECK (contact_email IS NULL OR (length(contact_email) <= 254 AND contact_email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'));

-- Existing published listings remain valid; newly published listings must have contact data.
COMMIT;
