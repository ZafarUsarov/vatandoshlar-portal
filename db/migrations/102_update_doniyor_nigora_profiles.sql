BEGIN;

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM specialists WHERE slug = 'doniyor-tojiboyev' AND code = 'UZ-BY-DN-0001') <> 1 THEN
    RAISE EXCEPTION 'Doniyor profile not uniquely found';
  END IF;
  IF (SELECT COUNT(*) FROM specialists WHERE slug = 'nigora-okhunova') <> 1 THEN
    RAISE EXCEPTION 'Nigora profile not uniquely found';
  END IF;
END $$;

UPDATE specialists
SET
  profession_uz = 'Ma’lumotlar bazasi administratori (Database Administrator)',
  profession_de = 'Datenbankadministrator',
  short_description_uz = 'Germaniyada 19 yildan buyon yashayotgan IT mutaxassisi. 2018-yildan beri Bavariyadagi Kassenärztliche Vereinigung (KV) tizimida ma’lumotlar bazalari va axborot xavfsizligi bilan shug‘ullanadi.',
  short_description_de = 'IT-Spezialist mit 19 Jahren Lebenserfahrung in Deutschland. Seit Ende 2018 in Bayern bei einer Kassenärztlichen Vereinigung (KV) im Bereich Datenbankadministration und Informationssicherheit tätig.',
  profile_uz = COALESCE(profile_uz, ARRAY[]::text[]) || ARRAY[
    '2018-yil oxiridan buyon Bavariyadagi Kassenärztliche Vereinigung (KV) tashkilotida ma’lumotlar bazalarini boshqarish, xavfsizligi va dasturlash yo‘nalishida ishlaydi.',
    'Yo‘nalishlari: Oracle Database Administration & Security, tibbiy va moliyaviy ma’lumotlar tahlili, IT-infratuzilma va konsalting.',
    'Ta’lim: Studienkolleg Coburg; Hochschule München (University of Applied Sciences).',
    'Jamoat faoliyati: Yevropadagi o‘zbek diasporasi tashabbuslari va Davra Cup futbol turniri tashkilotchilaridan biri.',
    'Shaxsiy qiziqishlari: fond va kriptovalyuta bozorlari.'
  ],
  profile_de = COALESCE(profile_de, ARRAY[]::text[]) || ARRAY[
    'Seit Ende 2018 bei einer Kassenärztlichen Vereinigung (KV) in Bayern für Datenbankadministration, Sicherheit und Programmierung tätig.',
    'Schwerpunkte: Oracle Database Administration & Security, medizinische und finanzielle Datenanalyse, IT-Infrastruktur und Consulting.',
    'Ausbildung: Studienkolleg Coburg; Hochschule München (University of Applied Sciences).',
    'Engagement: usbekische Diaspora in Europa und Mitorganisation des Fußballturniers Davra Cup.',
    'Persönliche Interessen: Aktien- und Kryptomärkte.'
  ],
  updated_at = NOW()
WHERE slug = 'doniyor-tojiboyev' AND code = 'UZ-BY-DN-0001';

UPDATE specialists
SET
  profile_uz = COALESCE(profile_uz, ARRAY[]::text[]) || ARRAY[
    'Ta’lim: Ludwig-Maximilians-Universität München (LMU München), stomatologiya yo‘nalishi.',
    'Sakkiz yillik kasbiy tajribadan so‘ng Myunxenda bolalar va o‘smirlar stomatologiyasiga ixtisoslashgan Polar Dent klinikasiga asos solgan. Hozirda klinikani mustaqil boshqaradi.'
  ],
  profile_de = COALESCE(profile_de, ARRAY[]::text[]) || ARRAY[
    'Studium der Zahnmedizin an der Ludwig-Maximilians-Universität München (LMU München).',
    'Nach acht Jahren Berufserfahrung gründete sie in München die auf Kinder- und Jugendzahnheilkunde spezialisierte Zahnarztpraxis Polar Dent, die sie heute eigenständig führt.'
  ],
  updated_at = NOW()
WHERE slug = 'nigora-okhunova';

COMMIT;
