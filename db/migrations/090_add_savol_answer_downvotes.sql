BEGIN;

-- M17c: Negative answer votes, stored separately to preserve existing helpful votes.
CREATE TABLE IF NOT EXISTS answer_unhelpful_votes (
  answer_id BIGINT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (answer_id, user_id)
);
CREATE INDEX IF NOT EXISTS answer_unhelpful_votes_user_idx ON answer_unhelpful_votes(user_id);

COMMIT;
