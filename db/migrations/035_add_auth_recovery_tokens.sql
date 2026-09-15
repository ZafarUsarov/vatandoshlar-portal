BEGIN;

CREATE TABLE IF NOT EXISTS public_user_auth_tokens (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT public_user_auth_tokens_purpose_check
    CHECK (purpose IN ('email_verification', 'password_reset')),
  CONSTRAINT public_user_auth_tokens_hash_not_blank CHECK (BTRIM(token_hash) <> '')
);

CREATE UNIQUE INDEX IF NOT EXISTS public_user_auth_tokens_hash_unique_idx
  ON public_user_auth_tokens (token_hash);

CREATE INDEX IF NOT EXISTS public_user_auth_tokens_active_idx
  ON public_user_auth_tokens (user_id, purpose, expires_at DESC)
  WHERE used_at IS NULL;

COMMIT;
