BEGIN;

-- Preserve all existing Germany rows/IDs and existing home_location_id mappings.
-- Extend the existing location model to support country-aware region codes.
ALTER TABLE locations
  DROP CONSTRAINT IF EXISTS locations_state_code_check;

ALTER TABLE locations
  ADD CONSTRAINT locations_state_code_check
  CHECK (
    state_code ~ '^[A-Z]{2}-[A-Z0-9]{1,8}$'
    AND LEFT(state_code, 2) = country_code
  );

-- Uzbekistan top-level administrative hierarchy.
-- No existing Germany row is updated or recreated.
INSERT INTO locations (
  country_code,
  location_type,
  state_code,
  state_name,
  city_name,
  slug,
  parent_id,
  latitude,
  longitude,
  status
)
VALUES
  ('UZ', 'state', 'UZ-AN', 'Andijon viloyati', NULL, 'uz-andijon-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-BU', 'Buxoro viloyati', NULL, 'uz-buxoro-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-FA', 'Farg‘ona viloyati', NULL, 'uz-fargona-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-JI', 'Jizzax viloyati', NULL, 'uz-jizzax-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-NG', 'Namangan viloyati', NULL, 'uz-namangan-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-NW', 'Navoiy viloyati', NULL, 'uz-navoiy-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-QA', 'Qashqadaryo viloyati', NULL, 'uz-qashqadaryo-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-SA', 'Samarqand viloyati', NULL, 'uz-samarqand-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-SI', 'Sirdaryo viloyati', NULL, 'uz-sirdaryo-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-SU', 'Surxondaryo viloyati', NULL, 'uz-surxondaryo-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-TO', 'Toshkent viloyati', NULL, 'uz-toshkent-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-XO', 'Xorazm viloyati', NULL, 'uz-xorazm-viloyati', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-QR', 'Qoraqalpog‘iston Respublikasi', NULL, 'uz-qoraqalpogiston-respublikasi', NULL, NULL, NULL, 'active'),
  ('UZ', 'state', 'UZ-TK', 'Toshkent shahri', NULL, 'uz-toshkent-shahri', NULL, NULL, NULL, 'active')
ON CONFLICT (slug) DO NOTHING;

-- Seed only explicitly established city-level Uzbekistan locations.
INSERT INTO locations (
  country_code,
  location_type,
  state_code,
  state_name,
  city_name,
  slug,
  parent_id,
  latitude,
  longitude,
  status
)
SELECT
  'UZ',
  'city',
  state.state_code,
  state.state_name,
  city.city_name,
  city.slug,
  state.id,
  NULL,
  NULL,
  'active'
FROM (
  VALUES
    ('UZ-QR', 'Nukus', 'uz-nukus'),
    ('UZ-TK', 'Toshkent', 'uz-toshkent')
) AS city(state_code, city_name, slug)
JOIN locations AS state
  ON state.country_code = 'UZ'
 AND state.location_type = 'state'
 AND state.state_code = city.state_code
ON CONFLICT (slug) DO NOTHING;

-- Preserve legacy values for existing users while enabling the new stable codes.
ALTER TABLE user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_residency_stage_check;

ALTER TABLE user_profiles
  ADD CONSTRAINT user_profiles_residency_stage_check
  CHECK (
    residency_stage IS NULL
    OR residency_stage IN (
      'planning_move',
      'new_arrival',
      'settling_in',
      'citizen',
      'planning_germany',
      'au_pair',
      'fsj_bfd',
      'language_course',
      'ausbildung',
      'bachelor',
      'master',
      'phd',
      'internship',
      'skilled_worker',
      'employed',
      'entrepreneur',
      'family',
      'long_term_resident',
      'other',
      'prefer_not_to_say'
    )
  );

COMMIT;
