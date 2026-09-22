BEGIN;

DO $$
DECLARE
  target_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO target_count
  FROM specialists
  WHERE
    slug = 'nigora-okhunova'
    AND code = 'UZ-BY-NO-0001';

  IF target_count <> 1 THEN
    RAISE EXCEPTION
      'Expected exactly one Nigora Okhunova specialist profile, found %.',
      target_count;
  END IF;
END
$$;

UPDATE specialists
SET
  profession_uz = 'Bolalar va o‘smirlar stomatologiyasi',
  profession_de = 'Kinder- und Jugendzahnheilkunde',

  short_description_uz =
    'Nigora Okhunova — bolalar va o‘smirlar stomatologiyasi yo‘nalishida faoliyat yurituvchi stomatolog. U München shahridagi Polar Dent — bolalar va o‘smirlar stomatologiya amaliyotining Praxisinhaberin’i.',

  short_description_de =
    'Nigora Okhunova ist Zahnärztin im Bereich der Kinder- und Jugendzahnheilkunde und Praxisinhaberin von Polar Dent, einer Zahnarztpraxis für Kinder und Jugendliche in München.',

  profile_uz = ARRAY[
    'Nigora Okhunova bolalar va o‘smirlar stomatologiyasi yo‘nalishida faoliyat yuritadi.',
    'U München shahridagi Polar Dent — Zahnarztpraxis für Kinder und Jugendliche amaliyotining Praxisinhaberin’i.',
    'Polar Dent bolalarni davolashda ehtiyotkor, sabrli va ularning yoshiga mos yondashuvga e’tibor qaratadi.'
  ],

  profile_de = ARRAY[
    'Nigora Okhunova ist im Bereich der Kinder- und Jugendzahnheilkunde tätig.',
    'Sie ist Praxisinhaberin von Polar Dent — Zahnarztpraxis für Kinder und Jugendliche in München.',
    'Bei der Behandlung von Kindern legt Polar Dent Wert auf einen behutsamen, geduldigen und altersgerechten Umgang.'
  ],

  categories = ARRAY['medical'],

  services_uz = ARRAY[
    'Bolalar va o‘smirlar stomatologiyasi'
  ],

  services_de = ARRAY[
    'Kinder- und Jugendzahnheilkunde'
  ],

  email = 'info@polardent.de',
  phone = '089 54803093',
  website = 'https://www.polardent.de/',

  avatar_url = '/images/specialists/nigora-okhunova.webp',

  postal_code = '81248',
  service_area_uz = 'Albert-Camus-Straße 6, 81248 München',
  service_area_de = 'Albert-Camus-Straße 6, 81248 München',

  education_uz = ARRAY[]::text[],
  education_de = ARRAY[]::text[],

  updated_at = NOW()
WHERE
  slug = 'nigora-okhunova'
  AND code = 'UZ-BY-NO-0001';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE
      slug = 'nigora-okhunova'
      AND code = 'UZ-BY-NO-0001'
      AND name = 'Nigora Okhunova'

      AND profession_uz =
        'Bolalar va o‘smirlar stomatologiyasi'
      AND profession_de =
        'Kinder- und Jugendzahnheilkunde'

      AND categories = ARRAY['medical']::text[]

      AND city = 'München'
      AND bundesland = 'Bayern'
      AND postal_code = '81248'
      AND location_id IS NOT NULL

      AND email = 'info@polardent.de'
      AND phone = '089 54803093'
      AND website = 'https://www.polardent.de/'

      AND avatar_url =
        '/images/specialists/nigora-okhunova.webp'

      AND status = 'published'
  ) THEN
    RAISE EXCEPTION
      'Nigora Okhunova professional profile verification failed.';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM specialists
    WHERE
      slug = 'nigora-okhunova'
      AND (
        'entrepreneur' = ANY(categories)

        OR profession_uz ILIKE ANY (
          ARRAY[
            '%tadbirkor%',
            '%entrepreneur%',
            '%doniyor%'
          ]
        )

        OR profession_de ILIKE ANY (
          ARRAY[
            '%unternehmer%',
            '%entrepreneur%',
            '%doniyor%'
          ]
        )

        OR short_description_uz ILIKE ANY (
          ARRAY[
            '%tadbirkor%',
            '%entrepreneur%',
            '%doniyor%'
          ]
        )

        OR short_description_de ILIKE ANY (
          ARRAY[
            '%unternehmer%',
            '%entrepreneur%',
            '%mitgründer%',
            '%doniyor%'
          ]
        )

        OR array_to_string(profile_uz, ' ') ILIKE ANY (
          ARRAY[
            '%tadbirkor%',
            '%entrepreneur%',
            '%doniyor%'
          ]
        )

        OR array_to_string(profile_de, ' ') ILIKE ANY (
          ARRAY[
            '%unternehmer%',
            '%entrepreneur%',
            '%mitgründer%',
            '%doniyor%'
          ]
        )
      )
  ) THEN
    RAISE EXCEPTION
      'Legacy entrepreneur or Doniyor relation remains on Nigora Okhunova profile.';
  END IF;
END
$$;

COMMIT;