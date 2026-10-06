BEGIN;

ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS public_slug TEXT,
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS public_profile_enabled BOOLEAN NOT NULL DEFAULT FALSE;

CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_public_slug_unique
  ON user_profiles (public_slug)
  WHERE public_slug IS NOT NULL;

CREATE INDEX IF NOT EXISTS user_profiles_public_profile_enabled_idx
  ON user_profiles (public_profile_enabled)
  WHERE public_profile_enabled = TRUE;

COMMIT;
