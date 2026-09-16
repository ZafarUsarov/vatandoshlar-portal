BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM locations
    WHERE country_code = 'DE'
      AND location_type = 'city'
      AND state_code = 'DE-NW'
      AND state_name = 'Nordrhein-Westfalen'
      AND city_name = 'Hamm'
      AND status = 'active'
  ) THEN
    RAISE EXCEPTION 'Canonical location Hamm, Nordrhein-Westfalen is missing.';
  END IF;
END
$$;

INSERT INTO specialists (
  code, slug, name, profession_uz, profession_de,
  short_description_uz, short_description_de,
  profile_uz, profile_de, education_uz, education_de,
  memberships_uz, memberships_de, categories, languages,
  services_uz, services_de, city, bundesland,
  service_area_uz, service_area_de, email, phone, mobile,
  telegram, avatar_url, years_of_experience, status,
  verified, featured, premium, sponsored
)
VALUES (
  'UZ-LT-FI-0001',
  'fazliddin-ismatov',
  'Fazliddin Ismatov',
  'Nemis tili o‘qituvchisi | BAMF-Lehrkraft | telc Prüfer | Pflege & Medizin',
  'Deutschlehrer | BAMF-Lehrkraft | telc-Prüfer | Pflege & Medizin',
  'BAMF ruxsatiga ega nemis tili o‘qituvchisi, telc imtihon oluvchisi va malakali Gesundheits- und Krankenpfleger. Asosiy yo‘nalishi — Pflege va Medizin uchun nemis tili hamda Ausbildung, ish va Germaniyadagi kasbiy faoliyatga til jihatdan tayyorlash.',
  'BAMF-zugelassener Deutschlehrer, telc-Prüfer und examinierter Gesundheits- und Krankenpfleger. Sein Schwerpunkt liegt auf Deutsch für Pflege und Medizin sowie auf der sprachlichen Vorbereitung auf Ausbildung, Beruf und die berufliche Tätigkeit in Deutschland.',
  ARRAY[
    'Fazliddin Ismatov Germaniyada til o‘qitish hamda tibbiyot va parvarish sohasida ko‘p yillik tajribaga ega. U umumiy nemis tili bilan birga Pflege va Medizin uchun Fachsprache, imtihonlarga tayyorgarlik va kasbiy kommunikatsiyaga ixtisoslashgan.'
  ]::TEXT[],
  ARRAY[
    'Fazliddin Ismatov verfügt über langjährige Erfahrung im Sprachunterricht sowie im Medizin- und Pflegebereich in Deutschland. Neben allgemeinem Deutsch spezialisiert er sich auf Fachsprache für Pflege und Medizin, Prüfungsvorbereitung und berufliche Kommunikation.'
  ]::TEXT[],
  ARRAY[
    'BAMF: Integrationskurse, Berufssprachkurse, Alphabetisierungskurse',
    'telc Prüfer: B1/B2, Pflege & Medizin',
    'Bachelor: Philologie und Sprachunterricht (Deutsch)',
    'Examinierter Gesundheits- und Krankenpfleger'
  ]::TEXT[],
  ARRAY[
    'BAMF: Integrationskurse, Berufssprachkurse, Alphabetisierungskurse',
    'telc-Prüfer: B1/B2, Pflege & Medizin',
    'Bachelor: Philologie und Sprachunterricht (Deutsch)',
    'Examinierter Gesundheits- und Krankenpfleger'
  ]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY['medical', 'education', 'language-teaching']::TEXT[],
  ARRAY['uz', 'de']::TEXT[],
  ARRAY[
    'Nemis tili A1–B2',
    'Pflege va Medizin uchun Fachsprache',
    'telc B1/B2 imtihonlariga tayyorlash',
    'Pflege va Medizin yo‘nalishidagi imtihonlarga tayyorlash',
    'Ausbildung va ish uchun kasbiy nemis tili',
    'Patientengespräch, Anamnese, Schichtübergabe va Pflegedokumentation',
    'Individual va kichik guruh darslari',
    'Online va Präsenz darslar'
  ]::TEXT[],
  ARRAY[
    'Deutsch A1–B2',
    'Fachsprache für Pflege und Medizin',
    'Vorbereitung auf telc B1/B2-Prüfungen',
    'Prüfungsvorbereitung für Pflege und Medizin',
    'Berufsbezogenes Deutsch für Ausbildung und Arbeit',
    'Patientengespräch, Anamnese, Schichtübergabe und Pflegedokumentation',
    'Einzelunterricht und Unterricht in Kleingruppen',
    'Online- und Präsenzunterricht'
  ]::TEXT[],
  'Hamm',
  'Nordrhein-Westfalen',
  'Online va Präsenz',
  'Online und Präsenz',
  'ismatovlehrkraftdeutsch@gmail.com',
  '+49 1590 1348138',
  '+49 176 52711321',
  'https://t.me/GermanMedicalTeacher',
  NULL,
  NULL,
  'published',
  FALSE,
  FALSE,
  FALSE,
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM specialists
    WHERE slug = 'fazliddin-ismatov'
      AND name = 'Fazliddin Ismatov'
      AND city = 'Hamm'
      AND bundesland = 'Nordrhein-Westfalen'
      AND status = 'published'
  ) THEN
    RAISE EXCEPTION 'Fazliddin Ismatov specialist insert verification failed.';
  END IF;
END
$$;

COMMIT;
