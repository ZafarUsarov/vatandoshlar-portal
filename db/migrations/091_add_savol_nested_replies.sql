BEGIN;
ALTER TABLE answer_replies ADD COLUMN IF NOT EXISTS parent_reply_id BIGINT;
ALTER TABLE answer_replies ADD CONSTRAINT answer_replies_parent_fk FOREIGN KEY (parent_reply_id) REFERENCES answer_replies(id) ON DELETE SET NULL;
ALTER TABLE answer_replies ADD CONSTRAINT answer_replies_not_self_parent CHECK (parent_reply_id IS NULL OR parent_reply_id <> id);
CREATE INDEX IF NOT EXISTS answer_replies_parent_idx ON answer_replies(parent_reply_id) WHERE parent_reply_id IS NOT NULL;
COMMIT;
