BEGIN;
-- M17.15: Store presentation metadata on each Place, not in slug-based UI branches.
ALTER TABLE places
  ADD COLUMN IF NOT EXISTS logo_path TEXT,
  ADD COLUMN IF NOT EXISTS category_label_uz TEXT,
  ADD COLUMN IF NOT EXISTS category_label_de TEXT;

-- Preserve the two published profiles' existing branding.
UPDATE places SET
  logo_path = COALESCE(logo_path, '/images/places/bildung-beruf-telc-logo.png'),
  category_label_uz = COALESCE(category_label_uz, 'Ta’lim markazi'),
  category_label_de = COALESCE(category_label_de, 'Bildungszentrum')
WHERE slug = 'bildung-und-beruf';
UPDATE places SET
  logo_path = COALESCE(logo_path, '/images/places/polar-dent-logo.webp'),
  category_label_uz = COALESCE(category_label_uz, 'Stomatologiya'),
  category_label_de = COALESCE(category_label_de, 'Zahnarztpraxis')
WHERE slug = 'polar-dent';

ALTER TABLE places
  ADD CONSTRAINT places_logo_path_safe_check
  CHECK (logo_path IS NULL OR logo_path ~ '^(/images/places/[a-zA-Z0-9][a-zA-Z0-9._/-]*|/api/places/logos/[a-f0-9-]{36}\.(jpg|png|webp))$');
COMMIT;
