import { getDb } from "@/lib/db";

export type SupportCurrency = "EUR" | "UZS";

export type SupportPaymentMethod =
  | "paypal"
  | "taps";

export type SupportVisibility =
  | "public"
  | "anonymous";

export type SupportContributionStatus =
  | "confirmed"
  | "cancelled";

export type AdminSupportContribution = {
  id: string;
  supporterName: string | null;
  amountMinor: number;
  currency: SupportCurrency;
  amountEurCents: number;
  paymentMethod: SupportPaymentMethod;
  visibility: SupportVisibility;
  status: SupportContributionStatus;
  contributedAt: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminSupportContributionInput = {
  supporterName?: string | null;
  amountMinor: number;
  currency: SupportCurrency;
  amountEurCents: number;
  paymentMethod: SupportPaymentMethod;
  visibility: SupportVisibility;
  status: SupportContributionStatus;
  contributedAt: string;
  note?: string | null;
};

type AdminSupportContributionRow = {
  id: string;
  supporter_name: string | null;
  amount_minor: string | number;
  currency: string;
  amount_eur_cents: string | number;
  payment_method: string;
  visibility: string;
  status: string;
  contributed_at: string | Date;
  note: string | null;
  created_at: string | Date;
  updated_at: string | Date;
};

function normalizeCurrency(
  value: string,
): SupportCurrency {
  return value === "UZS" ? "UZS" : "EUR";
}

function normalizePaymentMethod(
  value: string,
): SupportPaymentMethod {
  return value === "taps" ? "taps" : "paypal";
}

function normalizeVisibility(
  value: string,
): SupportVisibility {
  return value === "anonymous"
    ? "anonymous"
    : "public";
}

function normalizeStatus(
  value: string,
): SupportContributionStatus {
  return value === "cancelled"
    ? "cancelled"
    : "confirmed";
}

function toDateTimeString(
  value: string | Date,
): string {
  return value instanceof Date
    ? value.toISOString()
    : value;
}

function toSafeInteger(
  value: string | number,
  fieldName: string,
): number {
  const parsed =
    typeof value === "number"
      ? value
      : Number.parseInt(value, 10);

  if (!Number.isSafeInteger(parsed)) {
    throw new Error(
      `Support contribution ${fieldName} is outside the safe integer range.`,
    );
  }

  return parsed;
}

function toAdminSupportContribution(
  row: AdminSupportContributionRow,
): AdminSupportContribution {
  return {
    id: row.id,
    supporterName: row.supporter_name,
    amountMinor: toSafeInteger(
      row.amount_minor,
      "amount_minor",
    ),
    currency: normalizeCurrency(row.currency),
    amountEurCents: toSafeInteger(
      row.amount_eur_cents,
      "amount_eur_cents",
    ),
    paymentMethod: normalizePaymentMethod(
      row.payment_method,
    ),
    visibility: normalizeVisibility(
      row.visibility,
    ),
    status: normalizeStatus(row.status),
    contributedAt: toDateTimeString(
      row.contributed_at,
    ),
    note: row.note,
    createdAt: toDateTimeString(row.created_at),
    updatedAt: toDateTimeString(row.updated_at),
  };
}

export async function getAdminSupportContributions(): Promise<
  AdminSupportContribution[]
> {
  const result =
    await getDb().query<AdminSupportContributionRow>(
      `
        SELECT
          id::text,
          supporter_name,
          amount_minor,
          currency,
          amount_eur_cents,
          payment_method,
          visibility,
          status,
          contributed_at,
          note,
          created_at,
          updated_at
        FROM support_contributions
        ORDER BY
          contributed_at DESC,
          id DESC
      `,
    );

  return result.rows.map(
    toAdminSupportContribution,
  );
}

export async function getAdminSupportContributionById(
  id: string,
): Promise<AdminSupportContribution | null> {
  const result =
    await getDb().query<AdminSupportContributionRow>(
      `
        SELECT
          id::text,
          supporter_name,
          amount_minor,
          currency,
          amount_eur_cents,
          payment_method,
          visibility,
          status,
          contributed_at,
          note,
          created_at,
          updated_at
        FROM support_contributions
        WHERE id = $1
        LIMIT 1
      `,
      [id],
    );

  const row = result.rows[0];

  return row
    ? toAdminSupportContribution(row)
    : null;
}

export async function createAdminSupportContribution(
  input: AdminSupportContributionInput,
): Promise<string> {
  const result = await getDb().query<{
    id: string;
  }>(
    `
      INSERT INTO support_contributions (
        supporter_name,
        amount_minor,
        currency,
        amount_eur_cents,
        payment_method,
        visibility,
        status,
        contributed_at,
        note
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
      )
      RETURNING id::text
    `,
    [
      input.supporterName?.trim() || null,
      input.amountMinor,
      input.currency,
      input.amountEurCents,
      input.paymentMethod,
      input.visibility,
      input.status,
      input.contributedAt,
      input.note?.trim() || null,
    ],
  );

  const row = result.rows[0];

  if (!row) {
    throw new Error(
      "Support contribution was not created.",
    );
  }

  return row.id;
}

export async function updateAdminSupportContribution(
  id: string,
  input: AdminSupportContributionInput,
): Promise<boolean> {
  const result = await getDb().query(
    `
      UPDATE support_contributions
      SET
        supporter_name = $1,
        amount_minor = $2,
        currency = $3,
        amount_eur_cents = $4,
        payment_method = $5,
        visibility = $6,
        status = $7,
        contributed_at = $8,
        note = $9,
        updated_at = NOW()
      WHERE id = $10
    `,
    [
      input.supporterName?.trim() || null,
      input.amountMinor,
      input.currency,
      input.amountEurCents,
      input.paymentMethod,
      input.visibility,
      input.status,
      input.contributedAt,
      input.note?.trim() || null,
      id,
    ],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function updateAdminSupportContributionStatus(
  id: string,
  status: SupportContributionStatus,
): Promise<boolean> {
  const result = await getDb().query(
    `
      UPDATE support_contributions
      SET
        status = $1,
        updated_at = NOW()
      WHERE id = $2
    `,
    [status, id],
  );

  return (result.rowCount ?? 0) > 0;
}
