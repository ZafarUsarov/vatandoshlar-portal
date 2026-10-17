BEGIN;
CREATE TABLE IF NOT EXISTS answer_replies (
  id BIGSERIAL PRIMARY KEY,
  answer_id BIGINT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  author_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE RESTRICT,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT answer_replies_body_not_empty CHECK (BTRIM(body) <> ''),
  CONSTRAINT answer_replies_status_check CHECK (status IN ('published','hidden','removed'))
);
CREATE INDEX IF NOT EXISTS answer_replies_answer_status_created_idx ON answer_replies(answer_id,status,created_at,id);
CREATE INDEX IF NOT EXISTS answer_replies_author_idx ON answer_replies(author_user_id,created_at DESC);
COMMIT;
