BEGIN;
CREATE TABLE message_email_notification_throttle (
 conversation_id BIGINT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
 recipient_user_id BIGINT NOT NULL REFERENCES public_users(id) ON DELETE CASCADE,
 last_attempt_at TIMESTAMPTZ,
 last_sent_at TIMESTAMPTZ,
 PRIMARY KEY (conversation_id, recipient_user_id)
);
COMMIT;
