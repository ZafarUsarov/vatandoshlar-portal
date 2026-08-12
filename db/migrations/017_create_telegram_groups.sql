BEGIN;

CREATE TABLE IF NOT EXISTS telegram_groups (
  id BIGSERIAL PRIMARY KEY,

  bundesland TEXT NOT NULL,
  short_name TEXT NOT NULL UNIQUE,

  custom_name_uz TEXT,
  custom_name_de TEXT,

  custom_description_uz TEXT,
  custom_description_de TEXT,

  href TEXT,

  button_type TEXT NOT NULL DEFAULT 'group'
    CHECK (
      button_type IN (
        'bot',
        'group'
      )
    ),

  group_status TEXT NOT NULL
    CHECK (
      group_status IN (
        'active',
        'coming-soon'
      )
    ),

  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (
      status IN (
        'draft',
        'published',
        'archived'
      )
    ),

  sort_order INTEGER NOT NULL DEFAULT 0
    CHECK (
      sort_order >= 0
    ),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT telegram_groups_active_href_check
    CHECK (
      group_status <> 'active'
      OR (
        href IS NOT NULL
        AND BTRIM(href) <> ''
      )
    ),

  CONSTRAINT telegram_groups_custom_name_pair_check
    CHECK (
      (
        custom_name_uz IS NULL
        AND custom_name_de IS NULL
      )
      OR (
        custom_name_uz IS NOT NULL
        AND BTRIM(custom_name_uz) <> ''
        AND custom_name_de IS NOT NULL
        AND BTRIM(custom_name_de) <> ''
      )
    ),

  CONSTRAINT telegram_groups_custom_description_pair_check
    CHECK (
      (
        custom_description_uz IS NULL
        AND custom_description_de IS NULL
      )
      OR (
        custom_description_uz IS NOT NULL
        AND BTRIM(custom_description_uz) <> ''
        AND custom_description_de IS NOT NULL
        AND BTRIM(custom_description_de) <> ''
      )
    )
);

CREATE INDEX IF NOT EXISTS telegram_groups_admin_status_idx
  ON telegram_groups (
    status,
    sort_order,
    id
  );

CREATE INDEX IF NOT EXISTS telegram_groups_public_order_idx
  ON telegram_groups (
    sort_order,
    id
  )
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS telegram_groups_public_active_idx
  ON telegram_groups (
    sort_order,
    id
  )
  WHERE
    status = 'published'
    AND group_status = 'active';

COMMIT;
