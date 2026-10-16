BEGIN;

CREATE TABLE market_moderation_audit (
  id BIGSERIAL PRIMARY KEY,
  admin_user_id BIGINT NOT NULL REFERENCES admin_users(id),
  market_listing_id BIGINT NOT NULL REFERENCES market_listings(id),
  report_id BIGINT NOT NULL REFERENCES content_reports(id),
  operation TEXT NOT NULL CHECK (operation IN ('hide', 'restore', 'remove', 'dismiss')),
  previous_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX market_moderation_audit_listing_created_idx
  ON market_moderation_audit (market_listing_id, created_at DESC, id DESC);
CREATE INDEX market_moderation_audit_report_created_idx
  ON market_moderation_audit (report_id, created_at DESC, id DESC);

COMMIT;
