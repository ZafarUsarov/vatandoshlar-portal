BEGIN;

CREATE TABLE IF NOT EXISTS businesses (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description_uz TEXT NOT NULL,
  description_de TEXT NOT NULL,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  website TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT businesses_name_not_empty CHECK (BTRIM(name) <> ''),
  CONSTRAINT businesses_slug_not_empty CHECK (BTRIM(slug) <> ''),
  CONSTRAINT businesses_status_check CHECK (status IN ('draft', 'published', 'archived'))
);

CREATE INDEX IF NOT EXISTS businesses_location_status_idx
  ON businesses (location_id, status, name, id);

CREATE TABLE IF NOT EXISTS entrepreneurs (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  professional_title_uz TEXT NOT NULL,
  professional_title_de TEXT NOT NULL,
  short_bio_uz TEXT NOT NULL,
  short_bio_de TEXT NOT NULL,
  photo_url TEXT,
  location_id BIGINT NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  website TEXT,
  instagram TEXT,
  linkedin TEXT,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT entrepreneurs_name_not_empty CHECK (BTRIM(name) <> ''),
  CONSTRAINT entrepreneurs_slug_not_empty CHECK (BTRIM(slug) <> ''),
  CONSTRAINT entrepreneurs_status_check CHECK (status IN ('draft', 'published', 'archived'))
);

CREATE INDEX IF NOT EXISTS entrepreneurs_location_status_idx
  ON entrepreneurs (location_id, status, verified DESC, name, id);

CREATE TABLE IF NOT EXISTS entrepreneur_businesses (
  entrepreneur_id BIGINT NOT NULL REFERENCES entrepreneurs(id) ON DELETE CASCADE,
  business_id BIGINT NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (entrepreneur_id, business_id)
);

DO $$
DECLARE
  munich_location_id BIGINT;
  polar_dent_id BIGINT;
  doniyor_id BIGINT;
  nigora_id BIGINT;
BEGIN
  SELECT id INTO munich_location_id
  FROM locations
  WHERE location_type = 'city'
    AND city_name = 'München'
    AND state_code = 'DE-BY'
    AND status = 'active'
  ORDER BY id
  LIMIT 1;

  IF munich_location_id IS NULL THEN
    RAISE EXCEPTION 'Canonical active München location (DE-BY) was not found';
  END IF;

  INSERT INTO businesses (
    name, slug, description_uz, description_de, location_id, website, status
  ) VALUES (
    'Polar Dent',
    'polar-dent',
    'Bolalar va o‘smirlar stomatologiyasi amaliyoti.',
    'Zahnarztpraxis für Kinder und Jugendliche.',
    munich_location_id,
    'https://www.polardent.de/',
    'published'
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description_uz = EXCLUDED.description_uz,
    description_de = EXCLUDED.description_de,
    location_id = EXCLUDED.location_id,
    website = EXCLUDED.website,
    status = EXCLUDED.status,
    updated_at = NOW()
  RETURNING id INTO polar_dent_id;

  INSERT INTO entrepreneurs (
    slug, name, professional_title_uz, professional_title_de,
    short_bio_uz, short_bio_de, location_id, verified, status
  ) VALUES (
    'doniyor-tojiboyev',
    'Doniyor Tojiboyev',
    'IT mutaxassisi · Tadbirkor',
    'IT-Fachkraft · Unternehmer',
    'IT mutaxassisi va tadbirkor. München shahridagi oilaviy tadbirkorlik kontekstida faoliyat yuritadi.',
    'IT-Fachkraft und Unternehmer. Tätig im Kontext eines Familienunternehmertums in München.',
    munich_location_id,
    FALSE,
    'published'
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    professional_title_uz = EXCLUDED.professional_title_uz,
    professional_title_de = EXCLUDED.professional_title_de,
    short_bio_uz = EXCLUDED.short_bio_uz,
    short_bio_de = EXCLUDED.short_bio_de,
    location_id = EXCLUDED.location_id,
    status = EXCLUDED.status,
    updated_at = NOW()
  RETURNING id INTO doniyor_id;

  INSERT INTO entrepreneurs (
    slug, name, professional_title_uz, professional_title_de,
    short_bio_uz, short_bio_de, location_id, verified, status
  ) VALUES (
    'nigora-okhunova',
    'Nigora Okhunova',
    'Bolalar stomatologi · Tadbirkor',
    'Kinderzahnärztin · Unternehmerin',
    'Bolalar stomatologi va tadbirkor. München shahridagi oilaviy tadbirkorlik kontekstida faoliyat yuritadi.',
    'Kinderzahnärztin und Unternehmerin. Tätig im Kontext eines Familienunternehmertums in München.',
    munich_location_id,
    FALSE,
    'published'
  )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    professional_title_uz = EXCLUDED.professional_title_uz,
    professional_title_de = EXCLUDED.professional_title_de,
    short_bio_uz = EXCLUDED.short_bio_uz,
    short_bio_de = EXCLUDED.short_bio_de,
    location_id = EXCLUDED.location_id,
    status = EXCLUDED.status,
    updated_at = NOW()
  RETURNING id INTO nigora_id;

  INSERT INTO entrepreneur_businesses (entrepreneur_id, business_id)
  VALUES (doniyor_id, polar_dent_id), (nigora_id, polar_dent_id)
  ON CONFLICT DO NOTHING;
END $$;

COMMIT;
