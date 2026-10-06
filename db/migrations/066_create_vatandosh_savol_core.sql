BEGIN;

CREATE TABLE IF NOT EXISTS question_categories (
  id BIGSERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  label_uz TEXT NOT NULL,
  label_de TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT question_categories_key_format_check
    CHECK (key ~ '^[a-z][a-z0-9_-]{1,63}$'),
  CONSTRAINT question_categories_label_uz_not_empty
    CHECK (BTRIM(label_uz) <> ''),
  CONSTRAINT question_categories_label_de_not_empty
    CHECK (BTRIM(label_de) <> ''),
  CONSTRAINT question_categories_status_check
    CHECK (status IN ('active', 'inactive'))
);

CREATE INDEX IF NOT EXISTS question_categories_status_sort_idx
  ON question_categories (status, sort_order, id);

CREATE TABLE IF NOT EXISTS question_tags (
  id BIGSERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  label_uz TEXT NOT NULL,
  label_de TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT question_tags_key_format_check
    CHECK (key ~ '^[a-z][a-z0-9_-]{1,63}$'),
  CONSTRAINT question_tags_label_uz_not_empty
    CHECK (BTRIM(label_uz) <> ''),
  CONSTRAINT question_tags_label_de_not_empty
    CHECK (BTRIM(label_de) <> ''),
  CONSTRAINT question_tags_status_check
    CHECK (status IN ('active', 'inactive'))
);

CREATE INDEX IF NOT EXISTS question_tags_status_key_idx
  ON question_tags (status, key, id);

CREATE TABLE IF NOT EXISTS questions (
  id BIGSERIAL PRIMARY KEY,
  author_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE RESTRICT,
  category_id BIGINT NOT NULL REFERENCES question_categories(id) ON DELETE RESTRICT,
  location_id BIGINT REFERENCES locations(id) ON DELETE SET NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  content_language TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT questions_slug_not_empty
    CHECK (BTRIM(slug) <> ''),
  CONSTRAINT questions_title_not_empty
    CHECK (BTRIM(title) <> ''),
  CONSTRAINT questions_body_not_empty
    CHECK (BTRIM(body) <> ''),
  CONSTRAINT questions_content_language_check
    CHECK (content_language IN ('uz', 'de')),
  CONSTRAINT questions_status_check
    CHECK (status IN ('published', 'hidden', 'removed'))
);

CREATE INDEX IF NOT EXISTS questions_status_created_idx
  ON questions (status, created_at DESC, id DESC);

CREATE INDEX IF NOT EXISTS questions_category_status_created_idx
  ON questions (category_id, status, created_at DESC, id DESC);

CREATE INDEX IF NOT EXISTS questions_location_status_created_idx
  ON questions (location_id, status, created_at DESC, id DESC)
  WHERE location_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS questions_author_created_idx
  ON questions (author_user_id, created_at DESC, id DESC);

CREATE TABLE IF NOT EXISTS question_tag_assignments (
  question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  tag_id BIGINT NOT NULL REFERENCES question_tags(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (question_id, tag_id)
);

CREATE INDEX IF NOT EXISTS question_tag_assignments_tag_idx
  ON question_tag_assignments (tag_id, question_id);

CREATE TABLE IF NOT EXISTS answers (
  id BIGSERIAL PRIMARY KEY,
  question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  author_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE RESTRICT,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT answers_body_not_empty
    CHECK (BTRIM(body) <> ''),
  CONSTRAINT answers_status_check
    CHECK (status IN ('published', 'hidden', 'removed'))
);

CREATE INDEX IF NOT EXISTS answers_question_status_created_idx
  ON answers (question_id, status, created_at, id);

CREATE INDEX IF NOT EXISTS answers_author_created_idx
  ON answers (author_user_id, created_at DESC, id DESC);

COMMIT;
