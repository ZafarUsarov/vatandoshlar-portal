BEGIN;

DROP TABLE IF EXISTS entrepreneur_businesses;
DROP TABLE IF EXISTS entrepreneurs;
DROP TABLE IF EXISTS businesses;

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
    code, slug, name, profession_uz, profession_de,
    short_description_uz, short_description_de,
    profile_uz, profile_de, education_uz, education_de,
    memberships_uz, memberships_de, categories, languages,
    services_uz, services_de, city, bundesland,
    service_area_uz, service_area_de, website, avatar_url,
    years_of_experience, status, verified, featured, premium,
    sponsored, location_id
  )
  VALUES (
    'UZ-BY-DN-0001',
    'doniyor-tojiboyev-nigora-okhunova',
    'Doniyor Tojiboyev va Nigora Okhunova',
    'Oilaviy tadbirkorlik · IT va Stomatologiya',
    'Familienunternehmertum · IT und Zahnmedizin',
    'Doniyor Tojiboyev — IT mutaxassisi va tadbirkor. Nigora Okhunova — bolalar stomatologi va tadbirkor. Ular München shahrida oilaviy tadbirkorlik faoliyati bilan bog‘langan.',
    'Doniyor Tojiboyev ist IT-Fachkraft und Unternehmer. Nigora Okhunova ist Kinderzahnärztin und Unternehmerin. Gemeinsam stehen sie in München für unternehmerisches Engagement als Familie.',
    ARRAY[
      'Doniyor Tojiboyev va Nigora Okhunova — München shahrida yashab va faoliyat yuritayotgan er-xotin tadbirkorlar.',
      'Doniyor IT sohasi bo‘yicha mutaxassis va tadbirkor. Nigora bolalar stomatologiyasi yo‘nalishida faoliyat yuritadi va tadbirkor.',
      'Polar Dent — München shahridagi bolalar va o‘smirlar stomatologiyasiga yo‘naltirilgan amaliyot.'
    ]::TEXT[],
    ARRAY[
      'Doniyor Tojiboyev und Nigora Okhunova sind ein in München lebendes und beruflich tätiges Unternehmerpaar.',
      'Doniyor ist IT-Fachkraft und Unternehmer. Nigora ist im Bereich Kinderzahnmedizin tätig und Unternehmerin.',
      'Polar Dent ist eine auf Kinder- und Jugendzahnmedizin ausgerichtete Zahnarztpraxis in München.'
    ]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY['technology', 'medical']::TEXT[],
    ARRAY['uz', 'de']::TEXT[],
    ARRAY[
      'IT va tadbirkorlik',
      'Bolalar va o‘smirlar stomatologiyasi',
      'Polar Dent · München'
    ]::TEXT[],
    ARRAY[
      'IT und Unternehmertum',
      'Kinder- und Jugendzahnmedizin',
      'Polar Dent · München'
    ]::TEXT[],
    'München',
    'Bayern',
    'München, Bayern',
    'München, Bayern',
    'https://www.polardent.de/',
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
    code = EXCLUDED.code,
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
    avatar_url = EXCLUDED.avatar_url,
    years_of_experience = EXCLUDED.years_of_experience,
    status = EXCLUDED.status,
    verified = EXCLUDED.verified,
    featured = EXCLUDED.featured,
    premium = EXCLUDED.premium,
    sponsored = EXCLUDED.sponsored,
    location_id = EXCLUDED.location_id,
    updated_at = NOW();

  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'doniyor-tojiboyev-nigora-okhunova'
      AND name = 'Doniyor Tojiboyev va Nigora Okhunova'
      AND city = 'München'
      AND bundesland = 'Bayern'
      AND location_id = munich_location_id
      AND status = 'published'
  ) THEN
    RAISE EXCEPTION 'Joint Doniyor Tojiboyev and Nigora Okhunova specialist profile verification failed';
  END IF;
END
$$;

COMMIT;
