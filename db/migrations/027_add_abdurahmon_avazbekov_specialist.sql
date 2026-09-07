BEGIN;

INSERT INTO specialists (
  code, slug, name, profession_uz, profession_de,
  short_description_uz, short_description_de,
  profile_uz, profile_de, education_uz, education_de,
  memberships_uz, memberships_de, categories, languages,
  services_uz, services_de, city, bundesland,
  service_area_uz, service_area_de, email, phone, mobile,
  telegram, avatar_url, years_of_experience, status,
  verified, featured, premium, sponsored
)
VALUES (
  'UZ-BR-0001',
  'abdurahmon-avazbekov',
  'Abdurahmon Avazbekov',
  'Erkaklar sartaroshi',
  'Herrenfriseur',
  'Osnabrück shahrida erkaklar uchun soch va soqol parvarishi bo‘yicha sartaroshlik xizmatlarini ko‘rsatuvchi mutaxassis.',
  'Herrenfriseur in Osnabrück mit Dienstleistungen rund um Haarschnitt, Haarstyling und Bartpflege.',
  ARRAY[
    'Abdurahmon Avazbekov — Osnabrück shahrida erkaklar uchun sartaroshlik xizmatlarini ko‘rsatuvchi mutaxassis. Erkaklar sochini olish va turmaklash, shuningdek soqolni olish, shakllantirish va tartibga keltirish bo‘yicha xizmatlar ko‘rsatadi.',
    'Osnabrückdan tashqari, yaqin shaharlarda bir nechta mijoz bir joyda xizmat olishni istasa, oldindan kelishuv asosida o‘sha manzilga borib xizmat ko‘rsatish imkoniyati ham mavjud. Shartlar va vaqt telefon yoki Telegram orqali oldindan kelishiladi.'
  ]::TEXT[],
  ARRAY[
    'Abdurahmon Avazbekov bietet in Osnabrück Friseurdienstleistungen für Herren an. Zu seinen Leistungen gehören Herrenhaarschnitte und Haarstyling sowie das Rasieren, Formen und Pflegen des Bartes.',
    'Nach vorheriger Absprache sind auch Termine in umliegenden Städten möglich, wenn mehrere Kunden die Dienstleistung am selben Ort in Anspruch nehmen möchten. Einzelheiten zu Anfahrt, Termin und Leistungen können telefonisch oder über Telegram vereinbart werden.'
  ]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY['home']::TEXT[],
  ARRAY[]::TEXT[],
  ARRAY[
    'Erkaklar sochini olish',
    'Erkaklar sochini turmaklash',
    'Soqol olish',
    'Soqolni shakllantirish va tartibga keltirish',
    'Soch va soqolni kompleks parvarish qilish',
    'Yaqin shaharlarga guruhli buyurtma asosida borib xizmat ko‘rsatish'
  ]::TEXT[],
  ARRAY[
    'Herrenhaarschnitt',
    'Haarstyling für Herren',
    'Bartrasur',
    'Bartkontur und Bartpflege',
    'Kombinierte Haar- und Bartpflege',
    'Mobile Termine für Gruppen in umliegenden Städten'
  ]::TEXT[],
  'Osnabrück',
  'Niedersachsen',
  'Osnabrück va oldindan kelishuv asosida yaqin shaharlar',
  'Osnabrück und nach vorheriger Absprache umliegende Städte',
  NULL,
  '+49 162 6216523',
  NULL,
  'https://t.me/avazbekovv_7',
  '/images/specialists/abdurahmon-avazbekov.webp',
  NULL,
  'published',
  FALSE,
  FALSE,
  FALSE,
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

COMMIT;
