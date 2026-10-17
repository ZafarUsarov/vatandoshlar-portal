BEGIN;
CREATE TABLE question_attachments (
 id BIGSERIAL PRIMARY KEY,
 question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
 storage_key TEXT NOT NULL UNIQUE,
 file_name TEXT NOT NULL,
 content_type TEXT NOT NULL CHECK (content_type IN ('image/jpeg','image/png','image/webp','application/pdf')),
 byte_size INTEGER NOT NULL CHECK (byte_size BETWEEN 1 AND 5242880),
 status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','ready')),
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX question_attachments_question_idx ON question_attachments(question_id, id);
CREATE FUNCTION enforce_question_attachment_limit() RETURNS TRIGGER AS $$
BEGIN
 PERFORM 1 FROM questions WHERE id=NEW.question_id FOR UPDATE;
 IF (SELECT count(*) FROM question_attachments WHERE question_id=NEW.question_id) >= 3 THEN
  RAISE EXCEPTION 'Attachment limit reached';
 END IF;
 RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER question_attachment_limit BEFORE INSERT ON question_attachments
 FOR EACH ROW EXECUTE FUNCTION enforce_question_attachment_limit();
COMMIT;
