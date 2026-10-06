BEGIN;

CREATE TABLE IF NOT EXISTS answer_helpful_votes (
  answer_id BIGINT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (answer_id, user_id)
);

CREATE INDEX IF NOT EXISTS answer_helpful_votes_user_idx
  ON answer_helpful_votes (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS question_follows (
  question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (question_id, user_id)
);

CREATE INDEX IF NOT EXISTS question_follows_user_idx
  ON question_follows (user_id, created_at DESC);

COMMIT;
