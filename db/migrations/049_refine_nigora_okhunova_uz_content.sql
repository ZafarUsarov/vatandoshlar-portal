BEGIN;

DO $$
DECLARE
  target_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO target_count
  FROM specialists
  WHERE slug = 'nigora-okhunova'
    AND code = 'UZ-BY-NO-0001';

  IF target_count <> 1 THEN
    RAISE EXCEPTION
      'Expected exactly one Nigora Okhunova profile, found %.',
      target_count;
  END IF;
END
$$;

UPDATE specialists
SET
  short_description_uz =
    'Nigora Okhunova — München shahrida faoliyat yurituvchi stomatolog. Asosiy yo‘nalishi bolalar va o‘smirlar stomatologiyasi. Polar Dent stomatologiya amaliyoti rahbari.',

  profile_uz = ARRAY[
    'Bolalar va o‘smirlar bilan ishlashga ixtisoslashgan. Davolash jarayonida bolaning yoshi, individual ehtiyojlari va o‘zini xotirjam his qilishiga alohida e’tibor qaratiladi.',
    'Professional rivojlanish yo‘nalishlari bolalar va o‘smirlar stomatologiyasi, Myobrace tizimi hamda og‘iz bo‘shlig‘idagi funksional cheklovlar bilan bog‘liq mavzularni qamrab oladi.',
    'Polar Dent — München shahridagi bolalar va o‘smirlar stomatologiyasiga ixtisoslashgan amaliyot.'
  ],

  updated_at = NOW()
WHERE slug = 'nigora-okhunova'
  AND code = 'UZ-BY-NO-0001';

DO $$
DECLARE
  target specialists%ROWTYPE;
  uz_content TEXT;
BEGIN
  SELECT *
  INTO target
  FROM specialists
  WHERE slug = 'nigora-okhunova'
    AND code = 'UZ-BY-NO-0001';

  IF target.short_description_uz <>
    'Nigora Okhunova — München shahrida faoliyat yurituvchi stomatolog. Asosiy yo‘nalishi bolalar va o‘smirlar stomatologiyasi. Polar Dent stomatologiya amaliyoti rahbari.'
  THEN
    RAISE EXCEPTION 'Nigora Uzbek intro verification failed.';
  END IF;

  IF target.profile_uz <> ARRAY[
    'Bolalar va o‘smirlar bilan ishlashga ixtisoslashgan. Davolash jarayonida bolaning yoshi, individual ehtiyojlari va o‘zini xotirjam his qilishiga alohida e’tibor qaratiladi.',
    'Professional rivojlanish yo‘nalishlari bolalar va o‘smirlar stomatologiyasi, Myobrace tizimi hamda og‘iz bo‘shlig‘idagi funksional cheklovlar bilan bog‘liq mavzularni qamrab oladi.',
    'Polar Dent — München shahridagi bolalar va o‘smirlar stomatologiyasiga ixtisoslashgan amaliyot.'
  ]::TEXT[]
  THEN
    RAISE EXCEPTION 'Nigora Uzbek professional profile verification failed.';
  END IF;

  uz_content :=
    COALESCE(target.short_description_uz, '') || ' ' ||
    array_to_string(COALESCE(target.profile_uz, ARRAY[]::TEXT[]), ' ');

  IF uz_content ~* '(Praxisinhaberin|Zahnarztpraxis|Unternehmer|tadbirkor|Doniyor)'
  THEN
    RAISE EXCEPTION
      'Nigora Uzbek content still contains unwanted terminology.';
  END IF;

  IF target.categories <> ARRAY['medical']::TEXT[] THEN
    RAISE EXCEPTION 'Nigora medical category changed unexpectedly.';
  END IF;

  IF target.city <> 'München'
     OR target.bundesland <> 'Bayern'
     OR target.location_id IS NULL
  THEN
    RAISE EXCEPTION 'Nigora location changed unexpectedly.';
  END IF;

  IF target.email <> 'info@polardent.de'
     OR target.phone <> '089 54803093'
     OR target.website <> 'https://www.polardent.de/'
  THEN
    RAISE EXCEPTION 'Nigora contact data changed unexpectedly.';
  END IF;
END
$$;

COMMIT;