BEGIN;

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
  phone,
  website,
  instagram,
  linkedin,
  avatar_url,
  image_fit,
  image_position,
  status,
  verified,
  featured,
  premium,
  sponsored
)
VALUES (
  'UZ-ENT-MN-0001',
  'muzaffar-nuritdinkhodjaev',
  'Muzaffar Nuritdinkhodjaev',
  'Tadbirkor | Boshqaruvchi direktor | Ta’lim, investitsiya va xalqaro malakali kadrlar',
  'Unternehmer | Geschäftsführer | Bildung, Investment & internationale Fachkräfte',
  'Muza Nuri professional nomi bilan faoliyat yurituvchi tadbirkor va boshqaruvchi direktor. BILDUNG & BERUF GmbH hamda MN Capital Holding GmbH boshqaruvida faoliyat yuritadi; asosiy yo‘nalishlari ta’lim, xalqaro malakali kadrlar, investitsiya va Germaniya bilan O‘zbekiston hamda Markaziy Osiyo o‘rtasidagi biznes aloqalaridir.',
  'Unternehmer und Geschäftsführer, beruflich unter dem Namen Muza Nuri aktiv. Er ist in der Geschäftsführung der BILDUNG & BERUF GmbH und der MN Capital Holding GmbH tätig; seine Schwerpunkte liegen in Bildung, internationalen Fachkräften, Investment sowie in Wirtschafts- und Geschäftsbeziehungen zwischen Deutschland, Usbekistan und Zentralasien.',
  ARRAY[
    'Professional nomi: Muza Nuri.',
    'BILDUNG & BERUF GmbH boshqaruvchi direktori. Kompaniya til ta’limi, mehnat bozoriga integratsiya va xalqaro malakali kadrlar yo‘nalishlarida faoliyat yuritadi.',
    'MN Capital Holding GmbH boshqaruvchi direktori.',
    'Germaniya va O‘zbekiston/Markaziy Osiyo o‘rtasidagi ta’lim, malakali kadrlar va biznes hamkorligini rivojlantirish bilan shug‘ullanadi.',
    'Faoliyat yo‘nalishlari strategik investitsiyalar, ko‘chmas mulk va biznes loyihalarini rivojlantirishni ham qamrab oladi.'
  ]::TEXT[],
  ARRAY[
    'Beruflich aktiv unter dem Namen Muza Nuri.',
    'Geschäftsführer der BILDUNG & BERUF GmbH. Das Unternehmen ist in den Bereichen Sprachbildung, Arbeitsmarktintegration und internationale Fachkräfte tätig.',
    'Geschäftsführer der MN Capital Holding GmbH.',
    'Engagiert sich für Bildungs-, Fachkräfte- und Wirtschaftskooperationen zwischen Deutschland und Usbekistan/Zentralasien.',
    'Zu seinen Tätigkeitsfeldern zählen außerdem strategische Investments, Immobilien und die Entwicklung von Geschäftsprojekten.'
  ]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY['entrepreneur']::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[
    'Ta’lim va xalqaro malakali kadrlar loyihalari',
    'Germaniya va O‘zbekiston/Markaziy Osiyo o‘rtasidagi biznes hamkorligi',
    'Strategik investitsiyalar va biznes loyihalarini rivojlantirish',
    'Ko‘chmas mulk yo‘nalishidagi loyihalar'
  ]::TEXT[],
  ARRAY[
    'Bildungsprojekte und internationale Fachkräfte',
    'Geschäftskooperationen zwischen Deutschland und Usbekistan/Zentralasien',
    'Strategische Investments und Entwicklung von Geschäftsprojekten',
    'Projekte im Immobilienbereich'
  ]::TEXT[],
  'Kempten (Allgäu)',
  'Bayern',
  'Deutschland · Usbekistan · Zentralasien',
  'Deutschland · Usbekistan · Zentralasien',
  '+49 831 960 665 0',
  'https://bildungundberuf.com/',
  'https://www.instagram.com/muzaffar_nuritdinkhodjaev',
  'https://www.linkedin.com/in/muzanuri/',
  '/images/specialists/muzaffar-nuritdinkhodjaev.webp',
  'cover',
  'center',
  'draft',
  FALSE,
  FALSE,
  FALSE,
  FALSE
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
  phone = EXCLUDED.phone,
  website = EXCLUDED.website,
  instagram = EXCLUDED.instagram,
  linkedin = EXCLUDED.linkedin,
  avatar_url = EXCLUDED.avatar_url,
  image_fit = EXCLUDED.image_fit,
  image_position = EXCLUDED.image_position,
  status = 'draft',
  verified = FALSE,
  featured = FALSE,
  premium = FALSE,
  sponsored = FALSE,
  updated_at = NOW();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'muzaffar-nuritdinkhodjaev'
      AND code = 'UZ-ENT-MN-0001'
      AND categories = ARRAY['entrepreneur']::TEXT[]
      AND cardinality(services_uz) = cardinality(services_de)
      AND phone = '+49 831 960 665 0'
      AND website = 'https://bildungundberuf.com/'
      AND instagram = 'https://www.instagram.com/muzaffar_nuritdinkhodjaev'
      AND linkedin = 'https://www.linkedin.com/in/muzanuri/'
      AND avatar_url = '/images/specialists/muzaffar-nuritdinkhodjaev.webp'
      AND status = 'draft'
      AND verified = FALSE
      AND featured = FALSE
      AND premium = FALSE
      AND sponsored = FALSE
  ) THEN
    RAISE EXCEPTION 'Muzaffar Nuritdinkhodjaev draft specialist migration verification failed';
  END IF;
END $$;

COMMIT;
