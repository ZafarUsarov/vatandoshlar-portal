BEGIN;

CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  actor_user_id BIGINT REFERENCES public_users(id) ON DELETE SET NULL,
  question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
  answer_id BIGINT REFERENCES answers(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT notifications_type_check CHECK (type IN ('savol_new_answer')),
  CONSTRAINT notifications_savol_target_check CHECK (
    type <> 'savol_new_answer' OR (question_id IS NOT NULL AND answer_id IS NOT NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS notifications_savol_new_answer_user_idx
  ON notifications (user_id, answer_id, type)
  WHERE type = 'savol_new_answer';

CREATE INDEX IF NOT EXISTS notifications_user_created_idx
  ON notifications (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS notifications_user_unread_idx
  ON notifications (user_id, created_at DESC)
  WHERE read_at IS NULL;

COMMIT;
