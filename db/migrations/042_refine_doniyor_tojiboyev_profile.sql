BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE slug = 'doniyor-tojiboyev-nigora-okhunova'
  ) THEN
    RAISE EXCEPTION 'Specialist profile doniyor-tojiboyev-nigora-okhunova was not found';
  END IF;
END $$;

UPDATE specialists
SET
  name = 'Doniyor Tojiboyev',
  short_description_uz = 'Doniyor Tojiboyev — IT mutaxassisi va tadbirkor. Nigora Okhunova — bolalar stomatologi va tadbirkor. Ular München shahridagi Polar Dent bolalar va o''smirlar stomatologiyasi asoschilari hisoblanishadi.',
  short_description_de = 'Doniyor Tojiboyev ist IT-Fachkraft und Unternehmer. Nigora Okhunova ist Kinderzahnärztin und Unternehmerin. Sie sind die Gründer von Polar Dent, einer Praxis für Kinder- und Jugendzahnmedizin in München.',
  profile_uz = ARRAY[
    'Doniyor Tojiboyev — IT mutaxassisi va tadbirkor.',
    'Nigora Okhunova — bolalar stomatologi va tadbirkor.',
    'Ular München shahridagi Polar Dent bolalar va o''smirlar stomatologiyasi asoschilari hisoblanishadi.'
  ]::TEXT[],
  profile_de = ARRAY[
    'Doniyor Tojiboyev ist IT-Fachkraft und Unternehmer.',
    'Nigora Okhunova ist Kinderzahnärztin und Unternehmerin.',
    'Sie sind die Gründer von Polar Dent, einer Praxis für Kinder- und Jugendzahnmedizin in München.'
  ]::TEXT[],
  services_uz = ARRAY[
    'Bolalar va o''smirlar stomatologiyasi'
  ]::TEXT[],
  services_de = ARRAY[
    'Kinder- und Jugendzahnmedizin'
  ]::TEXT[],
  updated_at = NOW()
WHERE slug = 'doniyor-tojiboyev-nigora-okhunova';

COMMIT;
