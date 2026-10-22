BEGIN;
CREATE TABLE message_attachments (
 id BIGSERIAL PRIMARY KEY,
 message_id BIGINT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
 storage_key TEXT NOT NULL UNIQUE,
 original_filename TEXT NOT NULL,
 mime_type TEXT NOT NULL,
 file_size BIGINT NOT NULL CHECK (file_size > 0 AND file_size <= 15728640),
 image_width INTEGER,
 image_height INTEGER,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX message_attachments_message_idx ON message_attachments(message_id, id);
COMMIT;
