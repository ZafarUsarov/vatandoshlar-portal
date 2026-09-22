BEGIN;

DO $$
DECLARE
  target_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO target_count
  FROM telegram_groups
  WHERE
    bundesland = 'Bayern'
    AND short_name = 'BY';

  IF target_count <> 1 THEN
    RAISE EXCEPTION
      'Expected exactly one Bayern (BY) Telegram group, found %.',
      target_count;
  END IF;
END
$$;

UPDATE telegram_groups
SET
  custom_name_uz = 'München Vatandoshlar',
  custom_name_de = 'München Vatandoshlar',

  custom_description_uz =
    'München va uning atrofida yashayotgan o‘zbekistonliklar uchun Telegram hamjamiyati.',
  custom_description_de =
    'Telegram-Community für Usbeken, die in München und Umgebung leben.',

  href = 'https://t.me/Muenchen_Vatandoshlar_bot',
  button_type = 'bot',
  group_status = 'active',

  updated_at = NOW()
WHERE
  bundesland = 'Bayern'
  AND short_name = 'BY';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM telegram_groups
    WHERE
      bundesland = 'Bayern'
      AND short_name = 'BY'
      AND custom_name_uz = 'München Vatandoshlar'
      AND custom_name_de = 'München Vatandoshlar'
      AND custom_description_uz =
        'München va uning atrofida yashayotgan o‘zbekistonliklar uchun Telegram hamjamiyati.'
      AND custom_description_de =
        'Telegram-Community für Usbeken, die in München und Umgebung leben.'
      AND href = 'https://t.me/Muenchen_Vatandoshlar_bot'
      AND button_type = 'bot'
      AND group_status = 'active'
      AND status = 'published'
  ) THEN
    RAISE EXCEPTION
      'Bayern (BY) Telegram community activation verification failed.';
  END IF;
END
$$;

COMMIT;