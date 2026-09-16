BEGIN;

ALTER TABLE public_users
  ADD COLUMN IF NOT EXISTS privacy_accepted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS privacy_version TEXT;

CREATE TABLE IF NOT EXISTS public_user_oauth_accounts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT public_user_oauth_provider_check CHECK (provider IN ('google')),
  CONSTRAINT public_user_oauth_provider_account_unique UNIQUE (provider, provider_account_id),
  CONSTRAINT public_user_oauth_user_provider_unique UNIQUE (user_id, provider)
);

CREATE INDEX IF NOT EXISTS public_user_oauth_accounts_user_id_idx
  ON public_user_oauth_accounts (user_id);

COMMIT;
