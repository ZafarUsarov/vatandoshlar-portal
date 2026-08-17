BEGIN;

UPDATE specialists
SET
  short_description_uz =
    'Vatandoshlar.de asoschisi va dasturchisi. Veb-platformalar hamda bakalavr, magistratura va doktorantura hujjatlari bo‘yicha amaliy yo‘naltirish bilan shug‘ullanadi.',
  short_description_de =
    'Gründer und Entwickler von Vatandoshlar.de. Unterstützt bei Webplattformen sowie bei der Orientierung rund um Bachelor-, Master- und Promotionsunterlagen.',
  languages =
    ARRAY['uz', 'de']::text[],
  services_uz =
    ARRAY[
      'Veb-sayt va veb-platformalarni ishlab chiqish',
      'Bakalavr, magistratura va doktorantura hujjatlari bo‘yicha yo‘naltirish'
    ]::text[],
  services_de =
    ARRAY[
      'Entwicklung von Websites und Webplattformen',
      'Orientierung bei Bachelor-, Master- und Promotionsunterlagen'
    ]::text[],
  updated_at = NOW()
WHERE slug = 'zafar-usarov';

COMMIT;