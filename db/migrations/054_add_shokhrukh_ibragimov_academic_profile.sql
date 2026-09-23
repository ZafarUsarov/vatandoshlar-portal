BEGIN;

ALTER TABLE specialists
  ADD COLUMN IF NOT EXISTS achievements JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS google_scholar TEXT,
  ADD COLUMN IF NOT EXISTS research_gate TEXT,
  ADD COLUMN IF NOT EXISTS github TEXT,
  ADD COLUMN IF NOT EXISTS linkedin TEXT,
  ADD COLUMN IF NOT EXISTS avatar_credit TEXT,
  ADD COLUMN IF NOT EXISTS avatar_source_url TEXT;

ALTER TABLE specialists
  DROP CONSTRAINT IF EXISTS specialists_achievements_array_check;
ALTER TABLE specialists
  ADD CONSTRAINT specialists_achievements_array_check
  CHECK (jsonb_typeof(achievements) = 'array');

DO $$
DECLARE
  muenster_location_id BIGINT;
BEGIN
  SELECT id INTO muenster_location_id
  FROM locations
  WHERE country_code = 'DE'
    AND location_type = 'city'
    AND state_code = 'DE-NW'
    AND state_name = 'Nordrhein-Westfalen'
    AND city_name = 'Münster'
    AND slug = 'muenster'
    AND status = 'active'
  ORDER BY id
  LIMIT 1;

  IF muenster_location_id IS NULL THEN
    RAISE EXCEPTION 'Canonical active Münster location (DE-NW) was not found';
  END IF;

  INSERT INTO specialists (
    code, slug, name, profession_uz, profession_de,
    short_description_uz, short_description_de,
    profile_uz, profile_de, education_uz, education_de,
    memberships_uz, memberships_de, achievements,
    categories, languages, services_uz, services_de,
    city, bundesland, service_area_uz, service_area_de,
    email, website, avatar_url, image_fit, image_position, image_scale,
    avatar_credit, avatar_source_url,
    google_scholar, research_gate, github, linkedin,
    status, verified, featured, premium, sponsored, location_id
  ) VALUES (
    'UZ-SCI-SI-0001',
    'shokhrukh-ibragimov',
    'Shokhrukh Ibragimov',
    'Amaliy matematika va Machine Learning (mashinaviy o‘rganish) tadqiqotchisi',
    'Forscher für angewandte Mathematik und Machine Learning (maschinelles Lernen)',
    'Shokhrukh Ibragimov — Münster universitetida amaliy matematika va Machine Learning (mashinaviy o‘rganish) matematikasi yo‘nalishida PhD tadqiqotchisi. Ilmiy faoliyati Deep Learning (chuqur o‘rganish) usullarining matematik asoslari va nazariy kafolatlarini o‘rganishga qaratilgan.',
    'Shokhrukh Ibragimov ist Doktorand an der Universität Münster im Bereich Angewandte Mathematik und Mathematik des Machine Learning. Seine Forschung befasst sich mit den mathematischen Grundlagen und theoretischen Garantien von Deep-Learning-Verfahren.',
    ARRAY['Shokhrukh Ibragimov — Münster universitetida amaliy matematika va Machine Learning (mashinaviy o‘rganish) matematikasi yo‘nalishida PhD tadqiqotchisi. Ilmiy faoliyati Deep Learning (chuqur o‘rganish) usullarining matematik asoslari va nazariy kafolatlarini o‘rganishga qaratilgan.']::TEXT[],
    ARRAY['Shokhrukh Ibragimov ist Doktorand an der Universität Münster im Bereich Angewandte Mathematik und Mathematik des Machine Learning. Seine Forschung befasst sich mit den mathematischen Grundlagen und theoretischen Garantien von Deep-Learning-Verfahren.']::TEXT[],
    ARRAY['PhD Candidate — University of Münster — Applied Mathematics, Mathematics of Machine Learning']::TEXT[],
    ARRAY['Doktorand — Universität Münster — Angewandte Mathematik, Mathematik des Machine Learning']::TEXT[],
    ARRAY[]::TEXT[], ARRAY[]::TEXT[],
    '[
      {"year":"2014","title_uz":"Balkan Mathematical Olympiad (BMO)","title_de":"Balkan Mathematical Olympiad (BMO)","award_uz":"Kumush medal","award_de":"Silbermedaille","source_url":"https://scoreboard.bc-pf.org/en/results/math/balkan-mathematical-olympiad/2014"},
      {"year":"2016","title_uz":"SEEMOUS","title_de":"SEEMOUS","award_uz":"Oltin medal","award_de":"Goldmedaille","source_url":"https://armaganka.org.mk/uploads/books/Az-vXaSFVEKCjCq3Te-Aaw.pdf"},
      {"year":"2017","title_uz":"International Mathematics Competition for University Students (IMC)","title_de":"International Mathematics Competition for University Students (IMC)","award_uz":"Birinchi darajali mukofot (First Prize)","award_de":"Erster Preis (First Prize)","source_url":"https://www.imc-math.org.uk/imc2017/imc2017-closing.pdf"},
      {"year":"2018","title_uz":"International Mathematics Competition for University Students (IMC)","title_de":"International Mathematics Competition for University Students (IMC)","award_uz":"Birinchi darajali mukofot (First Prize)","award_de":"Erster Preis (First Prize)","source_url":"https://www.imc-math.org.uk/imc2018/imc2018-closing.pdf"},
      {"year":"2017, 2018, 2019","title_uz":"North Countries Universities Mathematical Competition (NCUMC)","title_de":"North Countries Universities Mathematical Competition (NCUMC)","award_uz":"Birinchi darajali mukofot (First Prize)","award_de":"Erster Preis (First Prize)"},
      {"year":"2019–2020","title_uz":"Prezident davlat stipendiyasi","title_de":"Präsidentliches Staatsstipendium"},
      {"year":"Keyinchalik","title_uz":"O‘zbekiston Milliy universiteti matematika olimpiada jamoasi","title_de":"Mathematik-Olympiadeteam der Nationalen Universität Usbekistans","award_uz":"Olimpiada jamoasi mentori va rahbari","award_de":"Mentor und Leiter des Olympiadeteams"}
    ]'::jsonb,
    ARRAY['science']::TEXT[],
    ARRAY[]::TEXT[],
    ARRAY[
      'Mathematical theory of Deep Learning (chuqur o‘rganish usullarining matematik nazariyasi)',
      'High-dimensional Approximation (ko‘p o‘lchamli masalalarni matematik yaqinlashtirish usullari)',
      'Curse of dimensionality (o‘lchamlar soni oshgani sari hisoblash murakkabligining keskin ortishi muammosi)',
      'Mathematical Optimization (eng maqbul yechimni matematik usullar orqali topish)'
    ]::TEXT[],
    ARRAY[
      'Mathematische Theorie des Deep Learning (mathematische Grundlagen von Deep-Learning-Verfahren)',
      'High-dimensional Approximation (mathematische Approximation hochdimensionaler Probleme)',
      'Curse of dimensionality (starker Anstieg der Rechenkomplexität bei wachsender Dimensionszahl)',
      'Mathematische Optimierung (Bestimmung optimaler Lösungen mit mathematischen Methoden)'
    ]::TEXT[],
    'Münster', 'Nordrhein-Westfalen', 'Münster, Nordrhein-Westfalen', 'Münster, Nordrhein-Westfalen',
    'shohruh.i.95@gmail.com', 'https://shokhrukhibragimov.vercel.app/',
    '/images/specialists/shokhrukh-ibragimov.webp', 'cover', 'center top', 1.000,
    'Yolkin Shamsiddinov / UzA', 'https://shokhrukhibragimov.vercel.app/',
    NULL, NULL, NULL, NULL,
    'draft', FALSE, FALSE, FALSE, FALSE, muenster_location_id
  )
  ON CONFLICT (slug) DO UPDATE SET
    profession_uz=EXCLUDED.profession_uz, profession_de=EXCLUDED.profession_de,
    short_description_uz=EXCLUDED.short_description_uz, short_description_de=EXCLUDED.short_description_de,
    profile_uz=EXCLUDED.profile_uz, profile_de=EXCLUDED.profile_de,
    education_uz=EXCLUDED.education_uz, education_de=EXCLUDED.education_de,
    memberships_uz=EXCLUDED.memberships_uz, memberships_de=EXCLUDED.memberships_de,
    achievements=EXCLUDED.achievements, categories=EXCLUDED.categories, languages=EXCLUDED.languages,
    services_uz=EXCLUDED.services_uz, services_de=EXCLUDED.services_de,
    city=EXCLUDED.city, bundesland=EXCLUDED.bundesland, service_area_uz=EXCLUDED.service_area_uz, service_area_de=EXCLUDED.service_area_de,
    email=EXCLUDED.email, website=EXCLUDED.website, avatar_url=EXCLUDED.avatar_url,
    image_fit=EXCLUDED.image_fit, image_position=EXCLUDED.image_position, image_scale=EXCLUDED.image_scale,
    avatar_credit=EXCLUDED.avatar_credit, avatar_source_url=EXCLUDED.avatar_source_url,
    google_scholar=NULL, research_gate=NULL, github=NULL, linkedin=NULL,
    status='draft', verified=FALSE, featured=FALSE, premium=FALSE, sponsored=FALSE,
    location_id=EXCLUDED.location_id, updated_at=NOW();
END $$;

COMMIT;
