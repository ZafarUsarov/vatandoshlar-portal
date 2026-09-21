BEGIN;

DO $$
DECLARE
  munich_location_id BIGINT;
BEGIN
  SELECT id
  INTO munich_location_id
  FROM locations
  WHERE country_code = 'DE'
    AND location_type = 'city'
    AND state_code = 'DE-BY'
    AND city_name = 'München'
    AND status = 'active'
  ORDER BY id
  LIMIT 1;

  IF munich_location_id IS NULL THEN
    RAISE EXCEPTION 'Canonical active München location (DE-BY) was not found';
  END IF;

  INSERT INTO specialists (
    code,
    slug,
    name,
    profession_uz,
    profession_de,
    short_description_uz,
    short_description_de,
    profile_uz,
    profile_de,
    education_uz,
    education_de,
    memberships_uz,
    memberships_de,
    categories,
    languages,
    services_uz,
    services_de,
    city,
    bundesland,
    service_area_uz,
    service_area_de,
    website,
    instagram,
    avatar_url,
    years_of_experience,
    status,
    verified,
    featured,
    premium,
    sponsored,
    location_id
  )
  VALUES (
    'UZ-BY-NO-0001',
    'nigora-okhunova',
    'Nigora Okhunova',
    'Bolalar tish shifokori',
    'Kinderzahnärztin',
    'Nigora Okhunova — bolalar tish shifokori va tadbirkor. U München shahridagi Polar Dent bolalar va o''smirlar stomatologiyasi asoschilaridan biri.',
    'Nigora Okhunova ist Kinderzahnärztin und Unternehmerin. Sie ist Mitgründerin von Polar Dent, einer Praxis für Kinder- und Jugendzahnmedizin in München.',
    ARRAY[
      'Nigora Okhunova — bolalar tish shifokori va tadbirkor.',
      'U München shahridagi Polar Dent bolalar va o''smirlar stomatologiyasi asoschilaridan biri.'
    ]::TEXT[],
    ARRAY[
      'Nigora Okhunova ist Kinderzahnärztin und Unternehmerin.',
      'Sie ist Mitgründerin von Polar Dent, einer Praxis für Kinder- und Jugendzahnmedizin in München.'
    ]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY['medical']::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[
      'Bolalar va o''smirlar stomatologiyasi'
    ]::TEXT[],
    ARRAY[
      'Kinder- und Jugendzahnmedizin'
    ]::TEXT[],
    'München',
    'Bayern',
    'München, Bayern',
    'München, Bayern',
    'https://www.polardent.de/',
    'https://www.instagram.com/polardent.de/',
    NULL,
    NULL,
    'published',
    FALSE,
    FALSE,
    FALSE,
    FALSE,
    munich_location_id
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    profession_uz = EXCLUDED.profession_uz,
    profession_de = EXCLUDED.profession_de,
    short_description_uz = EXCLUDED.short_description_uz,
    short_description_de = EXCLUDED.short_description_de,
    profile_uz = EXCLUDED.profile_uz,
    profile_de = EXCLUDED.profile_de,
    education_uz = EXCLUDED.education_uz,
    education_de = EXCLUDED.education_de,
    memberships_uz = EXCLUDED.memberships_uz,
    memberships_de = EXCLUDED.memberships_de,
    categories = EXCLUDED.categories,
    languages = EXCLUDED.languages,
    services_uz = EXCLUDED.services_uz,
    services_de = EXCLUDED.services_de,
    city = EXCLUDED.city,
    bundesland = EXCLUDED.bundesland,
    service_area_uz = EXCLUDED.service_area_uz,
    service_area_de = EXCLUDED.service_area_de,
    website = EXCLUDED.website,
    instagram = EXCLUDED.instagram,
    avatar_url = EXCLUDED.avatar_url,
    years_of_experience = EXCLUDED.years_of_experience,
    status = EXCLUDED.status,
    verified = EXCLUDED.verified,
    featured = EXCLUDED.featured,
    premium = EXCLUDED.premium,
    sponsored = EXCLUDED.sponsored,
    location_id = EXCLUDED.location_id,
    updated_at = NOW();
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'nigora-okhunova'
      AND status = 'published'
      AND categories = ARRAY['medical']::TEXT[]
      AND website = 'https://www.polardent.de/'
      AND instagram = 'https://www.instagram.com/polardent.de/'
  ) THEN
    RAISE EXCEPTION 'Nigora Okhunova specialist migration verification failed';
  END IF;
END $$;

COMMIT;
