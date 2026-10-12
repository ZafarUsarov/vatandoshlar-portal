BEGIN;

-- Fixed hourly per-user quota for presigned Market image upload requests.
CREATE TABLE market_image_upload_rate_limits (
  user_id BIGINT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  request_count INTEGER NOT NULL CHECK (request_count BETWEEN 1 AND 20),
  PRIMARY KEY (user_id, window_start)
);

COMMIT;
