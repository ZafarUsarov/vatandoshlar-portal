BEGIN;

CREATE TABLE IF NOT EXISTS analytics_daily_page_views (
  day DATE NOT NULL,

  country_code TEXT NOT NULL,
  locale TEXT NOT NULL,
  path TEXT NOT NULL,

  views BIGINT NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT analytics_daily_page_views_country_code_check
    CHECK (
      country_code = 'ZZ'
      OR country_code ~ '^[A-Z]{2}$'
    ),

  CONSTRAINT analytics_daily_page_views_locale_check
    CHECK (locale IN ('uz', 'de')),

  CONSTRAINT analytics_daily_page_views_path_check
    CHECK (
      char_length(path) > 0
      AND char_length(path) <= 512
      AND left(path, 1) = '/'
    ),

  CONSTRAINT analytics_daily_page_views_views_check
    CHECK (views >= 0),

  CONSTRAINT analytics_daily_page_views_primary_key
    PRIMARY KEY (
      day,
      country_code,
      locale,
      path
    )
);

CREATE INDEX IF NOT EXISTS analytics_daily_page_views_day_idx
  ON analytics_daily_page_views (
    day DESC
  );

CREATE INDEX IF NOT EXISTS analytics_daily_page_views_country_day_idx
  ON analytics_daily_page_views (
    country_code,
    day DESC
  );

CREATE INDEX IF NOT EXISTS analytics_daily_page_views_locale_day_idx
  ON analytics_daily_page_views (
    locale,
    day DESC
  );

CREATE INDEX IF NOT EXISTS analytics_daily_page_views_path_day_idx
  ON analytics_daily_page_views (
    path,
    day DESC
  );

COMMENT ON TABLE analytics_daily_page_views IS
  'Privacy-conscious daily aggregate page-view analytics. Stores no raw IP address, visitor identifier, user-agent, precise location, or request history.';

COMMENT ON COLUMN analytics_daily_page_views.day IS
  'Analytics day resolved in the application using the Europe/Berlin timezone.';

COMMENT ON COLUMN analytics_daily_page_views.country_code IS
  'ISO 3166-1 alpha-2 country code derived server-side from GeoLite2 Country; ZZ means unknown or unavailable.';

COMMENT ON COLUMN analytics_daily_page_views.locale IS
  'Public site locale associated with the page view: uz or de.';

COMMENT ON COLUMN analytics_daily_page_views.path IS
  'Normalized public pathname without query string or fragment.';

COMMENT ON COLUMN analytics_daily_page_views.views IS
  'Aggregate number of accepted page views for the day, country, locale, and path bucket.';

COMMIT;
