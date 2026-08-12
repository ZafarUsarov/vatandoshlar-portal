BEGIN;

ALTER TABLE guide_articles
  DROP CONSTRAINT IF EXISTS guide_articles_category_slug_check;

ALTER TABLE guide_articles
  ADD CONSTRAINT guide_articles_category_slug_check
    CHECK (
      category_slug IN (
        'coming-to-germany',
        'visas',
        'family',
        'invitation',
        'embassy-and-appointments',
        'documents',
        'language-and-certificates',
        'education',
        'work-and-career',
        'after-arrival',
        'recognition',
        'integration'
      )
    );

COMMIT;