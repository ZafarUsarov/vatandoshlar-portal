-- M14.6: Persist monthly reservation of Gemini translation input characters.
-- This is an application-side safety cap, not a billing guarantee.
CREATE TABLE IF NOT EXISTS market_translation_monthly_usage (
    month_utc DATE PRIMARY KEY,
    reserved_characters BIGINT NOT NULL DEFAULT 0 CHECK (reserved_characters >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
