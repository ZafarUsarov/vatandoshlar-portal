BEGIN;

UPDATE guide_articles AS housing
SET
  related_article_slugs = COALESCE(
    (
      SELECT ARRAY_AGG(candidate.slug ORDER BY candidate.sort_order)
      FROM (
        VALUES
          ('anmeldung-guide', 1),
          ('bank-account-guide', 2),
          ('health-insurance-guide', 3),
          ('tax-id-guide', 4)
      ) AS candidate(slug, sort_order)
      INNER JOIN guide_articles AS related
        ON related.slug = candidate.slug
       AND related.category_slug = 'after-arrival'
       AND related.status = 'published'
    ),
    ARRAY[]::TEXT[]
  ),
  updated_at = NOW()
WHERE
  housing.category_slug = 'housing-and-living'
  AND housing.slug = 'housing-in-germany';

COMMIT;
