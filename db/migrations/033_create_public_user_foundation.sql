BEGIN;

CREATE TABLE IF NOT EXISTS public_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT,
  account_status TEXT NOT NULL DEFAULT 'active',
  email_verified_at TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT public_users_email_not_empty CHECK (BTRIM(email) <> ''),
  CONSTRAINT public_users_email_normalized CHECK (email = LOWER(BTRIM(email))),
  CONSTRAINT public_users_account_status_check CHECK (account_status IN ('active','disabled','deleted'))
);

CREATE UNIQUE INDEX IF NOT EXISTS public_users_email_unique_idx
  ON public_users (LOWER(email));

CREATE INDEX IF NOT EXISTS public_users_status_idx
  ON public_users (account_status, id);

CREATE TABLE IF NOT EXISTS user_profiles (
  user_id BIGINT PRIMARY KEY REFERENCES public_users(id) ON DELETE CASCADE,
  display_name TEXT,
  preferred_locale TEXT NOT NULL DEFAULT 'uz',
  home_location_id BIGINT REFERENCES locations(id) ON DELETE SET NULL,
  residency_stage TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT user_profiles_display_name_not_blank CHECK (display_name IS NULL OR BTRIM(display_name) <> ''),
  CONSTRAINT user_profiles_preferred_locale_check CHECK (preferred_locale IN ('uz','de')),
  CONSTRAINT user_profiles_residency_stage_check CHECK (
    residency_stage IS NULL OR residency_stage IN (
      'planning_move','new_arrival','settling_in','long_term_resident','citizen','prefer_not_to_say'
    )
  )
);

CREATE INDEX IF NOT EXISTS user_profiles_home_location_idx
  ON user_profiles (home_location_id)
  WHERE home_location_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS user_profiles_residency_stage_idx
  ON user_profiles (residency_stage, user_id)
  WHERE residency_stage IS NOT NULL;

CREATE TABLE IF NOT EXISTS user_interests (
  user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  interest_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, interest_key),
  CONSTRAINT user_interests_key_format_check CHECK (interest_key ~ '^[a-z][a-z0-9_-]{1,63}$')
);

CREATE INDEX IF NOT EXISTS user_interests_key_idx
  ON user_interests (interest_key, user_id);

COMMIT;
