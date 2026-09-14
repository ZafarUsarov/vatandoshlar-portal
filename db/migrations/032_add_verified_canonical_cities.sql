BEGIN;

INSERT INTO locations (
  country_code,
  location_type,
  state_code,
  state_name,
  city_name,
  slug,
  parent_id,
  status
)
SELECT
  'DE',
  'city',
  'DE-NW',
  'Nordrhein-Westfalen',
  'Beckum',
  'beckum-nordrhein-westfalen',
  parent.id,
  'active'
FROM locations AS parent
WHERE
  parent.location_type = 'state'
  AND parent.state_code = 'DE-NW'
  AND parent.status = 'active'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO locations (
  country_code,
  location_type,
  state_code,
  state_name,
  city_name,
  slug,
  parent_id,
  status
)
SELECT
  'DE',
  'city',
  'DE-NI',
  'Niedersachsen',
  'Osnabrück',
  'osnabrueck-niedersachsen',
  parent.id,
  'active'
FROM locations AS parent
WHERE
  parent.location_type = 'state'
  AND parent.state_code = 'DE-NI'
  AND parent.status = 'active'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO locations (
  country_code,
  location_type,
  state_code,
  state_name,
  city_name,
  slug,
  parent_id,
  status
)
SELECT
  'DE',
  'city',
  'DE-SH',
  'Schleswig-Holstein',
  'Rendsburg',
  'rendsburg-schleswig-holstein',
  parent.id,
  'active'
FROM locations AS parent
WHERE
  parent.location_type = 'state'
  AND parent.state_code = 'DE-SH'
  AND parent.status = 'active'
ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
  missing_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO missing_count
  FROM (
    VALUES
      ('beckum-nordrhein-westfalen'),
      ('osnabrueck-niedersachsen'),
      ('rendsburg-schleswig-holstein')
  ) AS expected(slug)
  LEFT JOIN locations
    ON locations.slug = expected.slug
  WHERE locations.id IS NULL;

  IF missing_count > 0 THEN
    RAISE EXCEPTION
      'Verified canonical city insert incomplete: % expected row(s) missing.',
      missing_count;
  END IF;
END
$$;

COMMIT;
