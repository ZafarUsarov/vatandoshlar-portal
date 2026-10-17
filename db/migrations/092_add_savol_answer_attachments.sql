BEGIN;
CREATE TABLE answer_attachments (
 id BIGSERIAL PRIMARY KEY,
 answer_id BIGINT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
 storage_key TEXT NOT NULL UNIQUE,
 file_name TEXT NOT NULL,
 content_type TEXT NOT NULL CHECK (content_type IN ('image/jpeg','image/png','image/webp','application/pdf')),
 byte_size INTEGER NOT NULL CHECK (byte_size BETWEEN 1 AND 5242880),
 status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','ready')),
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX answer_attachments_answer_idx ON answer_attachments(answer_id,id);
CREATE FUNCTION enforce_answer_attachment_limit() RETURNS TRIGGER AS $$
BEGIN
 PERFORM 1 FROM answers WHERE id=NEW.answer_id FOR UPDATE;
 IF (SELECT count(*) FROM answer_attachments WHERE answer_id=NEW.answer_id) >= 3 THEN
  RAISE EXCEPTION 'Attachment limit reached';
 END IF;
 RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER answer_attachment_limit BEFORE INSERT ON answer_attachments
 FOR EACH ROW EXECUTE FUNCTION enforce_answer_attachment_limit();
COMMIT;
