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
  email,
  phone,
  whatsapp,
  telegram,
  avatar_url,
  years_of_experience,
  rating,
  review_count,
  status,
  verified,
  featured,
  premium,
  sponsored
)
VALUES (
  'UZ-TR-SHAHNOZA-MUELLER',
  'shahnoza-muller',
  'Shahnoza Müller',
  'Vakolatlangan tarjimon — Nemis ↔ O‘zbek',
  'Ermächtigte Übersetzerin — Deutsch ↔ Usbekisch',
  '2012-yildan buyon nemis va o‘zbek tillari o‘rtasida tarjimonlik qiladi. 2014-yildan buyon o‘zbek tili bo‘yicha sud tomonidan vakolatlangan tarjimon. Master of Arts (M.A.) va Master of Education (M.Ed.) darajalariga ega.',
  'Seit 2012 als Übersetzerin für Deutsch und Usbekisch tätig. Seit 2014 gerichtlich ermächtigte Übersetzerin für die usbekische Sprache. Sie verfügt über die Abschlüsse Master of Arts (M.A.) und Master of Education (M.Ed.).',
  ARRAY[
    '2012-yildan buyon tarjimonlik faoliyati',
    '2014-yildan buyon o‘zbek tili bo‘yicha sud tomonidan vakolatlangan tarjimon',
    'Master of Arts (M.A.)',
    'Master of Education (M.Ed.)'
  ]::TEXT[],
  ARRAY[
    'Seit 2012 als Übersetzerin tätig',
    'Seit 2014 gerichtlich ermächtigte Übersetzerin für die usbekische Sprache',
    'Master of Arts (M.A.)',
    'Master of Education (M.Ed.)'
  ]::TEXT[],
  ARRAY[
    'Samarqand davlat chet tillar instituti — Roman-german filologiyasi, nemis va ingliz tillari',
    'Universität Potsdam — Germanistik (M.A.)',
    'Grundschulpädagogik — Deutsch, Mathematik, Englisch',
    'Übersetzungswissenschaft va Simultandolmetschen bo‘yicha seminarlar'
  ]::TEXT[],
  ARRAY[
    'Staatliches Fremdspracheninstitut Samarkand — Romanisch-germanische Philologie, Deutsch und Englisch',
    'Universität Potsdam — Germanistik (M.A.)',
    'Grundschulpädagogik — Deutsch, Mathematik, Englisch',
    'Seminare in Übersetzungswissenschaft und Simultandolmetschen'
  ]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY['medical', 'legal']::TEXT[],
  ARRAY['uz', 'de']::TEXT[],
  ARRAY[
    'Nemis ↔ o‘zbek yozma tarjimalari',
    'Tibbiy hujjatlar tarjimasi',
    'Huquqiy hujjatlar tarjimasi',
    'Sud va idoralar uchun tarjimalar',
    'Tasdiqlangan tarjimalar (Beglaubigung)'
  ]::TEXT[],
  ARRAY[
    'Schriftliche Übersetzungen Deutsch ↔ Usbekisch',
    'Übersetzungen medizinischer Dokumente',
    'Übersetzungen juristischer Dokumente',
    'Übersetzungen für Gerichte und Behörden',
    'Beglaubigte Übersetzungen'
  ]::TEXT[],
  'shahnoza_mueller@yahoo.com',
  '+49 159 06306322',
  'https://wa.me/4915906306322',
  'https://t.me/shahnoza_muelller',
  '/images/specialists/shahnoza-muller.webp',
  NULL,
  NULL,
  NULL,
  'published',
  FALSE,
  FALSE,
  FALSE,
  FALSE
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
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  telegram = EXCLUDED.telegram,
  avatar_url = EXCLUDED.avatar_url,
  years_of_experience = EXCLUDED.years_of_experience,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  status = EXCLUDED.status,
  verified = EXCLUDED.verified,
  featured = EXCLUDED.featured,
  premium = EXCLUDED.premium,
  sponsored = EXCLUDED.sponsored,
  updated_at = NOW();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'shahnoza-muller'
      AND code = 'UZ-TR-SHAHNOZA-MUELLER'
      AND status = 'published'
      AND categories = ARRAY['medical', 'legal']::TEXT[]
      AND languages = ARRAY['uz', 'de']::TEXT[]
      AND email = 'shahnoza_mueller@yahoo.com'
      AND phone = '+49 159 06306322'
      AND whatsapp = 'https://wa.me/4915906306322'
      AND telegram = 'https://t.me/shahnoza_muelller'
      AND avatar_url = '/images/specialists/shahnoza-muller.webp'
  ) THEN
    RAISE EXCEPTION 'Shahnoza Müller specialist migration verification failed';
  END IF;
END $$;

COMMIT;
