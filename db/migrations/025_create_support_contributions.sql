BEGIN;

CREATE TABLE IF NOT EXISTS support_contributions (
  id BIGSERIAL PRIMARY KEY,

  supporter_name TEXT,

  amount_minor BIGINT NOT NULL,

  currency TEXT NOT NULL,

  amount_eur_cents BIGINT NOT NULL,

  payment_method TEXT NOT NULL,

  visibility TEXT NOT NULL DEFAULT 'public',

  status TEXT NOT NULL DEFAULT 'confirmed',

  contributed_at TIMESTAMPTZ NOT NULL,

  note TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT support_contributions_supporter_name_check
    CHECK (
      supporter_name IS NULL
      OR (
        char_length(btrim(supporter_name)) > 0
        AND char_length(btrim(supporter_name)) <= 120
      )
    ),

  CONSTRAINT support_contributions_amount_minor_check
    CHECK (amount_minor > 0),

  CONSTRAINT support_contributions_currency_check
    CHECK (currency IN ('EUR', 'UZS')),

  CONSTRAINT support_contributions_amount_eur_cents_check
    CHECK (amount_eur_cents > 0),

  CONSTRAINT support_contributions_payment_method_check
    CHECK (payment_method IN ('paypal', 'taps')),

  CONSTRAINT support_contributions_visibility_check
    CHECK (
      visibility IN (
        'public',
        'anonymous'
      )
    ),

  CONSTRAINT support_contributions_status_check
    CHECK (
      status IN (
        'confirmed',
        'cancelled'
      )
    ),

  CONSTRAINT support_contributions_public_name_check
    CHECK (
      visibility <> 'public'
      OR supporter_name IS NOT NULL
    ),

  CONSTRAINT support_contributions_note_check
    CHECK (
      note IS NULL
      OR char_length(note) <= 1000
    )
);

CREATE INDEX IF NOT EXISTS support_contributions_contributed_at_idx
  ON support_contributions (
    contributed_at DESC
  );

CREATE INDEX IF NOT EXISTS support_contributions_status_contributed_at_idx
  ON support_contributions (
    status,
    contributed_at DESC
  );

CREATE INDEX IF NOT EXISTS support_contributions_public_ranking_idx
  ON support_contributions (
    visibility,
    status,
    amount_eur_cents DESC
  );

COMMENT ON TABLE support_contributions IS
  'Confirmed and administratively managed financial contributions supporting Vatandoshlar.de. Each row represents one contribution transaction.';

COMMENT ON COLUMN support_contributions.supporter_name IS
  'Supporter display name used for public recognition when visibility is public. May be null for anonymous contributions.';

COMMENT ON COLUMN support_contributions.amount_minor IS
  'Original contribution amount stored in the smallest practical unit for its currency. EUR uses cents; UZS is stored as whole som because UZS has no commonly used fractional unit.';

COMMENT ON COLUMN support_contributions.currency IS
  'Original contribution currency: EUR or UZS.';

COMMENT ON COLUMN support_contributions.amount_eur_cents IS
  'EUR-normalized contribution value in cents, fixed when the contribution is recorded and used for cross-currency totals and ranking.';

COMMENT ON COLUMN support_contributions.payment_method IS
  'External payment source through which the contribution was received: paypal or taps.';

COMMENT ON COLUMN support_contributions.visibility IS
  'Public recognition preference: public shows the supporter name; anonymous hides the supporter identity from public views.';

COMMENT ON COLUMN support_contributions.status IS
  'Administrative contribution state. Only confirmed contributions count toward public totals and supporter ranking.';

COMMENT ON COLUMN support_contributions.contributed_at IS
  'Timestamp representing when the contribution was received or confirmed from the external payment source.';

COMMENT ON COLUMN support_contributions.note IS
  'Optional internal administrative note. This field must never be exposed in the public supporter interface.';

COMMIT;