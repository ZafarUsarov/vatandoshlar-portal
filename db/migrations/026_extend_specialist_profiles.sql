BEGIN;

ALTER TABLE specialists
  ADD COLUMN IF NOT EXISTS profile_uz TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS profile_de TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS education_uz TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS education_de TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS memberships_uz TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS memberships_de TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS mobile TEXT;

ALTER TABLE specialists
  DROP CONSTRAINT IF EXISTS specialists_profile_parallel,
  DROP CONSTRAINT IF EXISTS specialists_education_parallel,
  DROP CONSTRAINT IF EXISTS specialists_memberships_parallel;

ALTER TABLE specialists
  ADD CONSTRAINT specialists_profile_parallel
    CHECK (cardinality(profile_uz) = cardinality(profile_de)),
  ADD CONSTRAINT specialists_education_parallel
    CHECK (cardinality(education_uz) = cardinality(education_de)),
  ADD CONSTRAINT specialists_memberships_parallel
    CHECK (cardinality(memberships_uz) = cardinality(memberships_de));

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
  email,
  phone,
  mobile,
  telegram,
  avatar_url,
  years_of_experience,
  status,
  verified,
  featured,
  premium,
  sponsored
)
VALUES (
  'UZ-AR-0001',
  'ulugbek-agzamov',
  'Ulugbek Agzamov',
  'M.A. Arxitektor | Germaniya',
  'M.A. Architekt | Deutschland',
  'Arxitektura va qurilish sohasida 20 yildan ortiq professional tajribaga ega arxitektor. Germaniyaning Beckum shahridagi Korte-Hoffmann kompaniyasida M.A. Arxitektor sifatida faoliyat yuritadi.',
  'Architekt mit mehr als 20 Jahren Berufserfahrung in Architektur und Bauwesen. Derzeit ist er als M.A. Architekt bei Korte-Hoffmann in Beckum tätig.',
  ARRAY[
    'Men arxitektura va qurilish sohasida 20 yildan ortiq professional tajribaga ega arxitektorman. Hozirda Germaniyaning Beckum shahridagi Korte-Hoffmann kompaniyasida M.A. Arxitektor sifatida faoliyat yuritaman.',
    'Faoliyatim davomida yirik qishloq xo‘jaligi va sut chorvachilik komplekslari (Agralis, Germaniya), turar joy va jamoat binolari (Gold Step Invest, O‘zbekiston), shuningdek sanoat va ishlab chiqarish obyektlarini loyihalash bo‘yicha katta tajriba orttirganman.',
    'Hozirgi faoliyatimning muhim yo‘nalishlaridan biri — zamonaviy qurilish texnologiyalari va 3D-beton bosib qurish texnologiyasidir.'
  ]::TEXT[],
  ARRAY[
    'Ich bin Architekt mit mehr als 20 Jahren Berufserfahrung in Architektur und Bauwesen. Derzeit bin ich als M.A. Architekt bei Korte-Hoffmann in Beckum tätig.',
    'Im Laufe meiner beruflichen Tätigkeit habe ich umfassende Erfahrung in der Planung großer landwirtschaftlicher Anlagen und Milchviehkomplexe (Agralis, Deutschland), von Wohn- und öffentlichen Gebäuden (Gold Step Invest, Usbekistan) sowie von Industrie- und Produktionsbauten gesammelt.',
    'Ein wichtiger Schwerpunkt meiner heutigen Tätigkeit liegt auf modernen Bautechnologien, insbesondere auf dem 3D-Betondruck und dessen Einsatz im Bauwesen.'
  ]::TEXT[],
  ARRAY[
    'TASI — Toshkent arxitektura va qurilish instituti'
  ]::TEXT[],
  ARRAY[
    'TASI — Taschkenter Institut für Architektur und Bauwesen'
  ]::TEXT[],
  ARRAY[
    'O‘zbekiston Arxitektorlar uyushmasi a’zosi',
    'Nordrhein-Westfalen Arxitektorlar palatasi (AKNW) a’zosi'
  ]::TEXT[],
  ARRAY[
    'Mitglied des Architektenverbandes Usbekistans',
    'Mitglied der Architektenkammer Nordrhein-Westfalen (AKNW)'
  ]::TEXT[],
  ARRAY['home']::TEXT[],
  ARRAY['uz', 'ru', 'de', 'en']::TEXT[],
  ARRAY[
    'Arxitektura va loyiha rejalashtirish',
    'Turar joy va jamoat binolarini loyihalash',
    'Sanoat va ishlab chiqarish obyektlarini loyihalash',
    'Qishloq xo‘jaligi va chorvachilik majmualarini loyihalash',
    '3D-beton bosib qurish texnologiyasi',
    'Ko‘chmas mulk va investitsiya bo‘yicha maslahat'
  ]::TEXT[],
  ARRAY[
    'Architektur und Entwurfsplanung',
    'Planung von Wohn- und öffentlichen Gebäuden',
    'Planung von Industrie- und Produktionsbauten',
    'Planung landwirtschaftlicher Anlagen und Tierhaltungskomplexe',
    '3D-Betondruck im Bauwesen',
    'Beratung zu Immobilien und Investitionen'
  ]::TEXT[],
  'Hamm / Beckum',
  'Nordrhein-Westfalen',
  'Hamm / Beckum va Germaniya bo‘ylab',
  'Hamm / Beckum und deutschlandweit',
  'u.agzamov@korte-hoffmann.de',
  '+49 2521 851359',
  '+49 157 58996801',
  'https://t.me/UliAgzamov',
  '/images/specialists/ulugbek-agzamov.jpg',
  20,
  'published',
  FALSE,
  FALSE,
  FALSE,
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

COMMIT;
