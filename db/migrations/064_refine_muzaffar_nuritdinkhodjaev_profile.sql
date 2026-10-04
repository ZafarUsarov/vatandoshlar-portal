BEGIN;

UPDATE specialists
SET
  short_description_uz = 'Muzaffar Nuritdinkhodjaev — tadbirkor va boshqaruvchi direktor. BILDUNG & BERUF GmbH va MN Capital Holding GmbH faoliyatini boshqaradi. Asosiy yo‘nalishlari: ta’lim, xalqaro malakali kadrlar, investitsiya va biznes loyihalari.',
  short_description_de = 'Muzaffar Nuritdinkhodjaev ist Unternehmer und Geschäftsführer der BILDUNG & BERUF GmbH sowie der MN Capital Holding GmbH. Seine Tätigkeitsbereiche umfassen Bildung, internationale Fachkräfte, Investments und Geschäftsentwicklung.',
  profile_uz = ARRAY[
    'Muzaffar Nuritdinkhodjaev — BILDUNG & BERUF GmbH va MN Capital Holding GmbH boshqaruvchi direktori.',
    'BILDUNG & BERUF GmbH doirasida ta’lim, mehnat bozoriga integratsiya va xalqaro malakali kadrlar bilan bog‘liq loyihalar ustida ishlaydi.',
    'Shuningdek, investitsiya, ko‘chmas mulk va biznes loyihalarini rivojlantirish bilan shug‘ullanadi.',
    'Faoliyatining yana bir yo‘nalishi — Germaniya, O‘zbekiston va Markaziy Osiyo o‘rtasidagi biznes hamkorligini rivojlantirish.'
  ]::TEXT[],
  profile_de = ARRAY[
    'Muzaffar Nuritdinkhodjaev ist Geschäftsführer der BILDUNG & BERUF GmbH und der MN Capital Holding GmbH.',
    'Bei BILDUNG & BERUF GmbH arbeitet er in den Bereichen Bildung, Arbeitsmarktintegration und internationale Fachkräfte.',
    'Darüber hinaus beschäftigt er sich mit Investments, Immobilien und der Entwicklung von Geschäftsprojekten.',
    'Ein weiterer Schwerpunkt ist die wirtschaftliche Zusammenarbeit zwischen Deutschland, Usbekistan und Zentralasien.'
  ]::TEXT[],
  updated_at = NOW()
WHERE slug = 'muzaffar-nuritdinkhodjaev';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'muzaffar-nuritdinkhodjaev'
      AND name = 'Muzaffar Nuritdinkhodjaev'
      AND short_description_uz NOT ILIKE '%Muza Nuri%'
      AND short_description_de NOT ILIKE '%Muza Nuri%'
      AND NOT EXISTS (
        SELECT 1 FROM UNNEST(profile_uz) AS item
        WHERE item ILIKE '%Muza Nuri%'
      )
      AND NOT EXISTS (
        SELECT 1 FROM UNNEST(profile_de) AS item
        WHERE item ILIKE '%Muza Nuri%'
      )
  ) THEN
    RAISE EXCEPTION 'Muzaffar Nuritdinkhodjaev profile refinement verification failed';
  END IF;
END $$;

COMMIT;
