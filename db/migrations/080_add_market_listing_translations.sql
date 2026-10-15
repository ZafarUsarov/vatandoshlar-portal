-- M14.3: Market listing translations
-- Original content remains in market_listings.

CREATE TABLE IF NOT EXISTS market_listing_translations (
    id BIGSERIAL PRIMARY KEY,
    listing_id BIGINT NOT NULL
        REFERENCES market_listings(id) ON DELETE CASCADE,
    language TEXT NOT NULL
        CHECK (language IN ('uz', 'de')),
    title TEXT,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'ready', 'failed')),
    source_updated_at TIMESTAMPTZ,
    translated_at TIMESTAMPTZ,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT market_listing_translations_unique
        UNIQUE (listing_id, language),

    CONSTRAINT market_listing_translations_ready_content
        CHECK (
            status <> 'ready'
            OR (
                NULLIF(BTRIM(title), '') IS NOT NULL
                AND NULLIF(BTRIM(description), '') IS NOT NULL
            )
        )
);

CREATE INDEX IF NOT EXISTS
    idx_market_listing_translations_status
    ON market_listing_translations (status, updated_at);
