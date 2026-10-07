BEGIN;

CREATE TABLE IF NOT EXISTS content_reports (
  id BIGSERIAL PRIMARY KEY,
  reporter_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
  question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
  answer_id BIGINT REFERENCES answers(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  CONSTRAINT content_reports_exactly_one_target_check
    CHECK ((question_id IS NOT NULL)::int + (answer_id IS NOT NULL)::int = 1),
  CONSTRAINT content_reports_reason_check
    CHECK (reason IN ('spam', 'abuse', 'misinformation', 'other')),
  CONSTRAINT content_reports_status_check
    CHECK (status IN ('open', 'resolved')),
  CONSTRAINT content_reports_details_not_blank_check
    CHECK (details IS NULL OR BTRIM(details) <> '')
);

CREATE UNIQUE INDEX IF NOT EXISTS content_reports_unique_question_reporter_idx
  ON content_reports (reporter_user_id, question_id)
  WHERE question_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS content_reports_unique_answer_reporter_idx
  ON content_reports (reporter_user_id, answer_id)
  WHERE answer_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS content_reports_status_created_idx
  ON content_reports (status, created_at DESC, id DESC);

CREATE INDEX IF NOT EXISTS content_reports_question_idx
  ON content_reports (question_id, status)
  WHERE question_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS content_reports_answer_idx
  ON content_reports (answer_id, status)
  WHERE answer_id IS NOT NULL;

COMMIT;
