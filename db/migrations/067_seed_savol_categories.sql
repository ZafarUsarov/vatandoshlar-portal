BEGIN;

INSERT INTO question_categories (
  key,
  label_uz,
  label_de,
  sort_order,
  status
)
VALUES
  ('documents', 'Hujjatlar', 'Dokumente', 10, 'active'),
  ('work', 'Ish', 'Arbeit', 20, 'active'),
  ('education', 'Ta’lim', 'Bildung', 30, 'active'),
  ('housing', 'Uy-joy', 'Wohnen', 40, 'active'),
  ('family', 'Oila', 'Familie', 50, 'active'),
  ('daily-life', 'Kundalik hayot', 'Alltag', 60, 'active'),
  ('other', 'Boshqa', 'Sonstiges', 100, 'active')
ON CONFLICT (key) DO UPDATE
SET
  label_uz = EXCLUDED.label_uz,
  label_de = EXCLUDED.label_de,
  sort_order = EXCLUDED.sort_order,
  status = EXCLUDED.status,
  updated_at = NOW();

COMMIT;
