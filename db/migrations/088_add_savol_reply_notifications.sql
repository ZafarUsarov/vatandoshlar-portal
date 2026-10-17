BEGIN;
ALTER TABLE notifications ADD COLUMN reply_id BIGINT REFERENCES answer_replies(id) ON DELETE CASCADE;
ALTER TABLE notifications DROP CONSTRAINT notifications_type_check;
ALTER TABLE notifications ADD CONSTRAINT notifications_type_check CHECK (type IN ('savol_new_answer', 'savol_answer_reply', 'market_listing_hidden', 'market_listing_removed'));
ALTER TABLE notifications ADD CONSTRAINT notifications_reply_target_check CHECK (
  type <> 'savol_answer_reply' OR (question_id IS NOT NULL AND answer_id IS NOT NULL AND reply_id IS NOT NULL AND actor_user_id IS NOT NULL)
);
CREATE UNIQUE INDEX notifications_savol_reply_user_idx ON notifications(user_id, reply_id, type) WHERE type = 'savol_answer_reply';
COMMIT;
