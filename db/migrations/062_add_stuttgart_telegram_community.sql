BEGIN;

DO $$
DECLARE
  target_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO target_count
  FROM telegram_groups
  WHERE
    bundesland = 'Baden-Württemberg'
    AND short_name = 'BW';

  IF target_count <> 1 THEN
    RAISE EXCEPTION
      'Expected exactly one Baden-Württemberg (BW) Telegram group, found %.',
      target_count;
  END IF;
END
$$;

INSERT INTO telegram_groups (
  bundesland,
  short_name,
  custom_name_uz,
  custom_name_de,
  custom_description_uz,
  custom_description_de,
  href,
  button_type,
  group_status,
  community_type,
  status,
  sort_order
)
SELECT
  'Baden-Württemberg',
  'BW-STR',
  'Stuttgart Vatandoshlar',
  'Stuttgart Vatandoshlar',
  'Stuttgart va uning atrofida yashayotgan o‘zbekistonliklar uchun Telegram hamjamiyati.',
  'Telegram-Community für Usbeken, die in Stuttgart und Umgebung leben.',
  'https://t.me/+33PMxxhkgLZiMDYy',
  'group',
  'active',
  'regional',
  'published',
  sort_order + 1
FROM telegram_groups
WHERE
  bundesland = 'Baden-Württemberg'
  AND short_name = 'BW'
ON CONFLICT (short_name) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM telegram_groups
    WHERE
      bundesland = 'Baden-Württemberg'
      AND short_name = 'BW-STR'
      AND custom_name_uz = 'Stuttgart Vatandoshlar'
      AND custom_name_de = 'Stuttgart Vatandoshlar'
      AND href = 'https://t.me/+33PMxxhkgLZiMDYy'
      AND button_type = 'group'
      AND group_status = 'active'
      AND community_type = 'regional'
      AND status = 'published'
  ) THEN
    RAISE EXCEPTION
      'Stuttgart Telegram community creation verification failed.';
  END IF;
END
$$;

COMMIT;
