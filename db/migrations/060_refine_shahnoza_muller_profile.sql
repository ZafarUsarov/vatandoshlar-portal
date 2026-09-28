BEGIN;

UPDATE specialists
SET
  short_description_uz = '2012-yildan buyon nemis va o‘zbek tillari bo‘yicha tarjimonlik faoliyati bilan shug‘ullanadi. 2014-yildan buyon o‘zbek tili bo‘yicha sud tomonidan vakolatlangan tarjimon. Master of Arts (M.A.) va Master of Education (M.Ed.) darajalariga ega.',
  short_description_de = 'Seit 2012 ist sie als Übersetzerin für Deutsch und Usbekisch tätig. Seit 2014 ist sie gerichtlich ermächtigte Übersetzerin für die usbekische Sprache. Sie verfügt über die Abschlüsse Master of Arts (M.A.) und Master of Education (M.Ed.).',
  profile_uz = ARRAY[
    '2012-yildan buyon nemis va o‘zbek tillari bo‘yicha tarjimonlik faoliyati bilan shug‘ullanadi. 2014-yildan buyon o‘zbek tili bo‘yicha sud tomonidan vakolatlangan tarjimon. Master of Arts (M.A.) va Master of Education (M.Ed.) darajalariga ega.'
  ]::TEXT[],
  profile_de = ARRAY[
    'Seit 2012 ist sie als Übersetzerin für Deutsch und Usbekisch tätig. Seit 2014 ist sie gerichtlich ermächtigte Übersetzerin für die usbekische Sprache. Sie verfügt über die Abschlüsse Master of Arts (M.A.) und Master of Education (M.Ed.).'
  ]::TEXT[],
  education_uz = ARRAY[
    'Samarqand davlat chet tillar instituti — Roman-german filologiyasi, nemis va ingliz tillari',
    'Universität Potsdam — Germanistik (nemis filologiyasi), M.A.',
    'Grundschulpädagogik (boshlang‘ich ta’lim pedagogikasi) — nemis tili, matematika va ingliz tili',
    'Übersetzungswissenschaft (tarjimashunoslik) va Simultandolmetschen (sinxron tarjima) bo‘yicha seminarlar'
  ]::TEXT[],
  education_de = ARRAY[
    'Samarkand State Institute of Foreign Languages — Romanisch-Germanische Philologie, Deutsch und Englisch',
    'Universität Potsdam — Germanistik, M.A.',
    'Grundschulpädagogik — Deutsch, Mathematik und Englisch',
    'Seminare in Übersetzungswissenschaft und Simultandolmetschen'
  ]::TEXT[],
  categories = ARRAY['translation']::TEXT[],
  services_uz = ARRAY[
    'Nemis ↔ o‘zbek yozma tarjimalari',
    'Tibbiy hujjatlar tarjimasi',
    'Huquqiy hujjatlar tarjimasi',
    'Sud va idoralar uchun tarjimalar',
    'Tasdiqlangan tarjimalar (beglaubigte Übersetzungen)'
  ]::TEXT[],
  services_de = ARRAY[
    'Schriftliche Übersetzungen Deutsch ↔ Usbekisch',
    'Übersetzungen medizinischer Dokumente',
    'Übersetzungen juristischer Dokumente',
    'Übersetzungen für Gerichte und Behörden',
    'Beglaubigte Übersetzungen'
  ]::TEXT[],
  updated_at = NOW()
WHERE slug = 'shahnoza-muller';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'shahnoza-muller'
      AND status = 'published'
      AND categories = ARRAY['translation']::TEXT[]
      AND cardinality(profile_uz) = 1
      AND cardinality(profile_de) = 1
      AND cardinality(education_uz) = 4
      AND cardinality(education_de) = 4
      AND cardinality(services_uz) = 5
      AND cardinality(services_de) = 5
      AND telegram = 'https://t.me/shahnoza_muelller'
      AND whatsapp = 'https://wa.me/4915906306322'
      AND avatar_url = '/images/specialists/shahnoza-muller.webp'
  ) THEN
    RAISE EXCEPTION 'Shahnoza Müller profile refinement verification failed';
  END IF;
END $$;

COMMIT;
