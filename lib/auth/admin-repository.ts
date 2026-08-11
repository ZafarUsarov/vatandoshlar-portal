import { compare } from "bcryptjs";

import { getDb } from "@/lib/db";

export type AdminRole = "admin";

export type AdminAccount = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
};

type AdminRow = {
  id: string;
  email: string;
  display_name: string;
  password_hash: string;
  role: string;
  is_active: boolean;
};

function toAdminAccount(
  row: AdminRow,
): AdminAccount | null {
  if (
    row.role !== "admin" ||
    !row.is_active
  ) {
    return null;
  }

  return {
    id: row.id,
    email: row.email,
    name: row.display_name,
    role: "admin",
  };
}

export async function findActiveAdminById(
  id: string,
): Promise<AdminAccount | null> {
  const result =
    await getDb().query<AdminRow>(
      `
        SELECT
          id::text,
          email,
          display_name,
          password_hash,
          role,
          is_active
        FROM admin_users
        WHERE id = $1
        LIMIT 1
      `,
      [id],
    );

  const row = result.rows[0];

  return row
    ? toAdminAccount(row)
    : null;
}

export async function verifyAdminCredentials(
  email: string,
  password: string,
): Promise<AdminAccount | null> {
  const normalizedEmail =
    email.trim().toLowerCase();

  const result =
    await getDb().query<AdminRow>(
      `
        SELECT
          id::text,
          email,
          display_name,
          password_hash,
          role,
          is_active
        FROM admin_users
        WHERE LOWER(email) = $1
        LIMIT 1
      `,
      [normalizedEmail],
    );

  const row = result.rows[0];

  if (!row) {
    return null;
  }

  const admin = toAdminAccount(row);

  if (!admin) {
    return null;
  }

  const passwordMatches =
    await compare(
      password,
      row.password_hash,
    );

  return passwordMatches
    ? admin
    : null;
}
