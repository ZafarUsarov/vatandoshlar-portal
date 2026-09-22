BEGIN;

DO $$
DECLARE
  target_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO target_count
  FROM specialists
  WHERE
    slug = 'doniyor-tojiboyev'
    AND code = 'UZ-BY-DN-0001';

  IF target_count <> 1 THEN
    RAISE EXCEPTION
      'Expected exactly one Doniyor Tojiboyev specialist profile, found %.',
      target_count;
  END IF;
END
$$;

UPDATE specialists
SET
  profession_uz = 'IT mutaxassisi',
  profession_de = 'IT-Fachkraft',

  short_description_uz =
    'Doniyor Tojiboyev — München shahrida faoliyat yuritayotgan IT mutaxassisi.',
  short_description_de =
    'Doniyor Tojiboyev ist eine in München tätige IT-Fachkraft.',

  profile_uz = ARRAY[
    'Doniyor Tojiboyev — München shahrida faoliyat yuritayotgan IT mutaxassisi.'
  ],
  profile_de = ARRAY[
    'Doniyor Tojiboyev ist eine in München tätige IT-Fachkraft.'
  ],

  categories = ARRAY['technology'],

  languages = ARRAY[]::text[],

  services_uz = ARRAY[]::text[],
  services_de = ARRAY[]::text[],

  website = NULL,
  instagram = 'https://www.instagram.com/dtojibayev2020',

  updated_at = NOW()
WHERE
  slug = 'doniyor-tojiboyev'
  AND code = 'UZ-BY-DN-0001';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM specialists
    WHERE
      slug = 'doniyor-tojiboyev'
      AND code = 'UZ-BY-DN-0001'
      AND name = 'Doniyor Tojiboyev'

      AND profession_uz = 'IT mutaxassisi'
      AND profession_de = 'IT-Fachkraft'

      AND categories = ARRAY['technology']::text[]
      AND languages = ARRAY[]::text[]
      AND services_uz = ARRAY[]::text[]
      AND services_de = ARRAY[]::text[]

      AND website IS NULL
      AND instagram = 'https://www.instagram.com/dtojibayev2020'

      AND city = 'München'
      AND bundesland = 'Bayern'
      AND location_id IS NOT NULL

      AND status = 'published'
  ) THEN
    RAISE EXCEPTION
      'Doniyor Tojiboyev IT specialist profile verification failed.';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM specialists
    WHERE
      slug = 'doniyor-tojiboyev'
      AND (
        'entrepreneur' = ANY(categories)

        OR profession_uz ILIKE ANY (
          ARRAY[
            '%tadbirkor%',
            '%stomatolog%',
            '%polar dent%',
            '%nigora%'
          ]
        )

        OR profession_de ILIKE ANY (
          ARRAY[
            '%unternehmer%',
            '%zahnmedizin%',
            '%polar dent%',
            '%nigora%'
          ]
        )

        OR short_description_uz ILIKE ANY (
          ARRAY[
            '%tadbirkor%',
            '%stomatolog%',
            '%polar dent%',
            '%nigora%'
          ]
        )

        OR short_description_de ILIKE ANY (
          ARRAY[
            '%unternehmer%',
            '%zahn%',
            '%polar dent%',
            '%nigora%'
          ]
        )

        OR array_to_string(profile_uz, ' ') ILIKE ANY (
          ARRAY[
            '%tadbirkor%',
            '%stomatolog%',
            '%polar dent%',
            '%nigora%'
          ]
        )

        OR array_to_string(profile_de, ' ') ILIKE ANY (
          ARRAY[
            '%unternehmer%',
            '%zahn%',
            '%polar dent%',
            '%nigora%'
          ]
        )

        OR array_to_string(services_uz, ' ') ILIKE ANY (
          ARRAY[
            '%stomatolog%',
            '%polar dent%',
            '%nigora%'
          ]
        )

        OR array_to_string(services_de, ' ') ILIKE ANY (
          ARRAY[
            '%zahn%',
            '%polar dent%',
            '%nigora%'
          ]
        )

        OR COALESCE(website, '') ILIKE '%polardent%'
      )
  ) THEN
    RAISE EXCEPTION
      'Legacy entrepreneur, Nigora Okhunova or Polar Dent data remains on Doniyor Tojiboyev profile.';
  END IF;
END
$$;

COMMIT;