BEGIN;
CREATE TABLE conversations (
 id BIGSERIAL PRIMARY KEY,
 market_listing_id BIGINT REFERENCES market_listings(id) ON DELETE SET NULL,
 travel_listing_id BIGINT REFERENCES travel_listings(id) ON DELETE SET NULL,
 starter_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE RESTRICT,
 owner_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE RESTRICT,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 CONSTRAINT conversations_distinct_users CHECK (starter_user_id <> owner_user_id),
 CONSTRAINT conversations_one_listing CHECK (num_nonnulls(market_listing_id, travel_listing_id) = 1)
);
CREATE UNIQUE INDEX conversations_market_unique ON conversations(market_listing_id, starter_user_id) WHERE market_listing_id IS NOT NULL;
CREATE UNIQUE INDEX conversations_travel_unique ON conversations(travel_listing_id, starter_user_id) WHERE travel_listing_id IS NOT NULL;
CREATE INDEX conversations_starter_idx ON conversations(starter_user_id, updated_at DESC);
CREATE INDEX conversations_owner_idx ON conversations(owner_user_id, updated_at DESC);
CREATE TABLE messages (
 id BIGSERIAL PRIMARY KEY,
 conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
 sender_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE RESTRICT,
 body TEXT NOT NULL,
 read_at TIMESTAMPTZ,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 CONSTRAINT messages_body_check CHECK (length(btrim(body)) BETWEEN 1 AND 2000)
);
CREATE INDEX messages_conversation_idx ON messages(conversation_id, id DESC);
COMMIT;
