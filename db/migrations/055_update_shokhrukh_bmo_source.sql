BEGIN;

UPDATE specialists
SET achievements = (
  SELECT jsonb_agg(
    CASE
      WHEN achievement.item ->> 'year' = '2014'
        AND achievement.item ->> 'title_uz' = 'Balkan Mathematical Olympiad (BMO)'
      THEN jsonb_set(
        achievement.item,
        '{source_url}',
        to_jsonb('https://moresults.org/competitions/bmo-2014'::text),
        true
      )
      ELSE achievement.item
    END
    ORDER BY achievement.ordinality
  )
  FROM jsonb_array_elements(achievements)
    WITH ORDINALITY AS achievement(item, ordinality)
)
WHERE slug = 'shokhrukh-ibragimov';

COMMIT;
