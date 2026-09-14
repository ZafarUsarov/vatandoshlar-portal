import {
  compare,
  hash,
} from "bcryptjs";
import { getDb } from "@/lib/db";
import type {
  UserPreferredLocale,
} from "@/types/user";

type PublicCredentialRow = {
  id: string;
  email: string;
  password_hash: string | null;
  account_status: string;
  display_name: string | null;
};

type RegisterPublicUserInput = Readonly<{
  email: string;
  password: string;
  displayName: string;
  preferredLocale: UserPreferredLocale;
}>;

export type PublicCredentialUser = Readonly<{
  id: string;
  email: string;
  name: string | null;
  role: "user";
}>;

export type RegisterPublicUserResult =
  | {
      ok: true;
      userId: string;
    }
  | {
      ok: false;
      reason:
        | "email_taken"
        | "admin_email_conflict";
    };

function normalizeEmail(
  email: string,
): string {
  return email
    .trim()
    .toLowerCase();
}

export async function verifyPublicUserCredentials(
  email: string,
  password: string,
): Promise<PublicCredentialUser | null> {
  const normalizedEmail =
    normalizeEmail(email);

  const result =
    await getDb().query<PublicCredentialRow>(
      `
        SELECT
          u.id::text,
          u.email,
          u.password_hash,
          u.account_status,
          p.display_name
        FROM public_users u
        LEFT JOIN user_profiles p
          ON p.user_id = u.id
        WHERE u.email = $1
        LIMIT 1
      `,
      [
        normalizedEmail,
      ],
    );

  const row =
    result.rows[0];

  if (
    !row ||
    row.account_status !== "active" ||
    !row.password_hash
  ) {
    return null;
  }

  const passwordMatches =
    await compare(
      password,
      row.password_hash,
    );

  if (!passwordMatches) {
    return null;
  }

  await getDb().query(
    `
      UPDATE public_users
      SET
        last_login_at = NOW(),
        updated_at = NOW()
      WHERE id = $1
    `,
    [
      row.id,
    ],
  );

  return {
    id:
      row.id,
    email:
      row.email,
    name:
      row.display_name,
    role:
      "user",
  };
}

export async function registerPublicUser(
  input: RegisterPublicUserInput,
): Promise<RegisterPublicUserResult> {
  if (
    input.password.length < 8
  ) {
    throw new Error(
      "Public user password must contain at least 8 characters.",
    );
  }

  if (
    !input.displayName.trim()
  ) {
    throw new Error(
      "Public user display name is required.",
    );
  }

  const normalizedEmail =
    normalizeEmail(
      input.email,
    );

  const passwordHash =
    await hash(
      input.password,
      12,
    );

  const pool =
    getDb();
  const client =
    await pool.connect();

  try {
    await client.query(
      "BEGIN",
    );

    const adminConflict =
      await client.query<{
        id: string;
      }>(
        `
          SELECT
            id::text
          FROM admin_users
          WHERE LOWER(email) = $1
          LIMIT 1
        `,
        [
          normalizedEmail,
        ],
      );

    if (adminConflict.rows[0]) {
      await client.query(
        "ROLLBACK",
      );

      return {
        ok: false,
        reason:
          "admin_email_conflict",
      };
    }

    const existingUser =
      await client.query<{
        id: string;
      }>(
        `
          SELECT
            id::text
          FROM public_users
          WHERE email = $1
          LIMIT 1
        `,
        [
          normalizedEmail,
        ],
      );

    if (existingUser.rows[0]) {
      await client.query(
        "ROLLBACK",
      );

      return {
        ok: false,
        reason:
          "email_taken",
      };
    }

    const userResult =
      await client.query<{
        id: string;
      }>(
        `
          INSERT INTO public_users (
            email,
            password_hash,
            account_status
          )
          VALUES (
            $1,
            $2,
            'active'
          )
          RETURNING
            id::text
        `,
        [
          normalizedEmail,
          passwordHash,
        ],
      );

    const userId =
      userResult.rows[0]?.id;

    if (!userId) {
      throw new Error(
        "Public user insert did not return an id.",
      );
    }

    await client.query(
      `
        INSERT INTO user_profiles (
          user_id,
          display_name,
          preferred_locale
        )
        VALUES (
          $1,
          $2,
          $3
        )
      `,
      [
        userId,
        input.displayName.trim(),
        input.preferredLocale,
      ],
    );

    await client.query(
      "COMMIT",
    );

    return {
      ok: true,
      userId,
    };
  } catch (error) {
    try {
      await client.query(
        "ROLLBACK",
      );
    } catch {
      // Preserve original error.
    }

    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error
        ? error.code
        : null;

    if (code === "23505") {
      return {
        ok: false,
        reason:
          "email_taken",
      };
    }

    throw error;
  } finally {
    client.release();
  }
}
