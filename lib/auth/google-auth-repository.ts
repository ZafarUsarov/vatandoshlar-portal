import { getDb } from "@/lib/db";

import type { UserPreferredLocale } from "@/types/user";

export type GoogleAuthUser = Readonly<{
  id: string;
  email: string;
  name: string | null;
  role: "user";
}>;

export type GoogleAuthResult =
  | { ok: true; user: GoogleAuthUser; created: boolean }
  | { ok: false; reason: "admin_email_conflict" | "email_conflict" | "not_linked" };

type ResolveInput = Readonly<{
  providerAccountId: string;
  email: string;
  displayName: string | null;
  preferredLocale: UserPreferredLocale;
  allowRegistration: boolean;
  privacyAccepted: boolean;
  privacyVersion: string;
}>;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function resolveGoogleAuthUser(input: ResolveInput): Promise<GoogleAuthResult> {
  const email = normalizeEmail(input.email);
  const client = await getDb().connect();

  try {
    await client.query("BEGIN");

    const linked = await client.query<{
      id: string;
      email: string;
      account_status: string;
      display_name: string | null;
    }>(
      `SELECT u.id::text, u.email, u.account_status, p.display_name
       FROM public_user_oauth_accounts oa
       JOIN public_users u ON u.id = oa.user_id
       LEFT JOIN user_profiles p ON p.user_id = u.id
       WHERE oa.provider = 'google' AND oa.provider_account_id = $1
       LIMIT 1
       FOR UPDATE OF oa, u`,
      [input.providerAccountId],
    );

    const linkedRow = linked.rows[0];
    if (linkedRow) {
      if (linkedRow.account_status !== "active") {
        await client.query("ROLLBACK");
        return { ok: false, reason: "not_linked" };
      }

      await client.query(
        `UPDATE public_users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1`,
        [linkedRow.id],
      );
      await client.query("COMMIT");
      return {
        ok: true,
        created: false,
        user: {
          id: linkedRow.id,
          email: linkedRow.email,
          name: linkedRow.display_name,
          role: "user",
        },
      };
    }

    const admin = await client.query<{ id: string }>(
      `SELECT id::text FROM admin_users WHERE LOWER(email) = $1 LIMIT 1`,
      [email],
    );
    if (admin.rows[0]) {
      await client.query("ROLLBACK");
      return { ok: false, reason: "admin_email_conflict" };
    }

    const existing = await client.query<{ id: string }>(
      `SELECT id::text FROM public_users WHERE email = $1 LIMIT 1 FOR UPDATE`,
      [email],
    );
    if (existing.rows[0]) {
      await client.query("ROLLBACK");
      return { ok: false, reason: "email_conflict" };
    }

    if (!input.allowRegistration || !input.privacyAccepted) {
      await client.query("ROLLBACK");
      return { ok: false, reason: "not_linked" };
    }

    const userResult = await client.query<{ id: string; email: string }>(
      `INSERT INTO public_users (
         email, password_hash, account_status, email_verified_at,
         privacy_accepted_at, privacy_version
       ) VALUES ($1, NULL, 'active', NOW(), NOW(), $2)
       RETURNING id::text, email`,
      [email, input.privacyVersion],
    );
    const user = userResult.rows[0];
    if (!user) throw new Error("Google registration did not return a public user.");

    await client.query(
      `INSERT INTO user_profiles (user_id, display_name, preferred_locale)
       VALUES ($1, $2, $3)`,
      [user.id, input.displayName?.trim() || null, input.preferredLocale],
    );
    await client.query(
      `INSERT INTO public_user_oauth_accounts (user_id, provider, provider_account_id)
       VALUES ($1, 'google', $2)`,
      [user.id, input.providerAccountId],
    );

    await client.query("COMMIT");
    return {
      ok: true,
      created: true,
      user: { id: user.id, email: user.email, name: input.displayName?.trim() || null, role: "user" },
    };
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    const code = typeof error === "object" && error !== null && "code" in error ? error.code : null;
    if (code === "23505") return { ok: false, reason: "email_conflict" };
    throw error;
  } finally {
    client.release();
  }
}
