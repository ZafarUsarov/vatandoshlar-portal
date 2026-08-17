BEGIN;

-- Preserve the existing Uzbek source name column.
ALTER TABLE news_articles
  RENAME COLUMN source_name TO source_name_uz;

-- Add a separate German source name.
ALTER TABLE news_articles
  ADD COLUMN source_name_de TEXT;

-- Preserve existing records with a safe temporary fallback.
UPDATE news_articles
SET source_name_de = source_name_uz
WHERE source_name_de IS NULL;

-- Correct the known German source name.
UPDATE news_articles
SET source_name_de =
  'Botschaft der Republik Usbekistan in Deutschland'
WHERE slug =
  'ozbekistonning-berlindagi-konsullik-xizmatlari';

-- Both localized source names are required by the application.
ALTER TABLE news_articles
  ALTER COLUMN source_name_de SET NOT NULL;

COMMIT;