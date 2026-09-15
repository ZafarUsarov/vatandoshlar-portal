import { createHash, randomBytes } from "node:crypto";
import { hash as hashPassword } from "bcryptjs";
import { getDb } from "@/lib/db";

type Purpose = "email_verification" | "password_reset";
type Locale = "uz" | "de";

const digest = (token: string) => createHash("sha256").update(token).digest("hex");
const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function createAuthTokenForUser(userId: string, purpose: Purpose, ttlMinutes: number): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = digest(token);
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `UPDATE public_user_auth_tokens SET used_at = NOW()
       WHERE user_id = $1 AND purpose = $2 AND used_at IS NULL`,
      [userId, purpose],
    );
    await client.query(
      `INSERT INTO public_user_auth_tokens (user_id, purpose, token_hash, expires_at)
       VALUES ($1, $2, $3, NOW() + ($4 * INTERVAL '1 minute'))`,
      [userId, purpose, tokenHash, ttlMinutes],
    );
    await client.query("COMMIT");
    return token;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}

export async function createAuthTokenForEmail(email: string, purpose: Purpose, ttlMinutes: number): Promise<{ token: string; email: string; locale: Locale } | null> {
  const result = await getDb().query<{ id: string; email: string; preferred_locale: string }>(
    `SELECT u.id::text, u.email, COALESCE(p.preferred_locale, 'uz') AS preferred_locale
     FROM public_users u LEFT JOIN user_profiles p ON p.user_id = u.id
     WHERE u.email = $1 AND u.account_status = 'active' LIMIT 1`,
    [normalizeEmail(email)],
  );
  const row = result.rows[0];
  if (!row) return null;
  return { token: await createAuthTokenForUser(row.id, purpose, ttlMinutes), email: row.email, locale: row.preferred_locale === "de" ? "de" : "uz" };
}

export async function verifyEmailWithToken(token: string): Promise<boolean> {
  if (!token || token.length > 256) return false;
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    const consumed = await client.query<{ user_id: string }>(
      `UPDATE public_user_auth_tokens
       SET used_at = NOW()
       WHERE id = (
         SELECT id FROM public_user_auth_tokens
         WHERE token_hash = $1 AND purpose = 'email_verification'
           AND used_at IS NULL AND expires_at > NOW()
         FOR UPDATE SKIP LOCKED LIMIT 1
       )
       RETURNING user_id::text`,
      [digest(token)],
    );
    const row = consumed.rows[0];
    if (!row) { await client.query("ROLLBACK"); return false; }
    await client.query(
      `UPDATE public_users SET email_verified_at = COALESCE(email_verified_at, NOW()), updated_at = NOW() WHERE id = $1`,
      [row.user_id],
    );
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally { client.release(); }
}

export async function resetPasswordWithToken(token: string, password: string): Promise<boolean> {
  if (!token || token.length > 256 || password.length < 8) return false;
  const passwordHash = await hashPassword(password, 12);
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    const consumed = await client.query<{ user_id: string }>(
      `UPDATE public_user_auth_tokens
       SET used_at = NOW()
       WHERE id = (
         SELECT id FROM public_user_auth_tokens
         WHERE token_hash = $1 AND purpose = 'password_reset'
           AND used_at IS NULL AND expires_at > NOW()
         FOR UPDATE SKIP LOCKED LIMIT 1
       )
       RETURNING user_id::text`,
      [digest(token)],
    );
    const row = consumed.rows[0];
    if (!row) { await client.query("ROLLBACK"); return false; }
    await client.query(`UPDATE public_users SET password_hash = $1, updated_at = NOW() WHERE id = $2`, [passwordHash, row.user_id]);
    await client.query(`UPDATE public_user_auth_tokens SET used_at = NOW() WHERE user_id = $1 AND used_at IS NULL`, [row.user_id]);
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally { client.release(); }
}
