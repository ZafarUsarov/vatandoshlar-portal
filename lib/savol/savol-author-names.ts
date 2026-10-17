import { getDb } from "@/lib/db";

/** Only public display names; never expose private emails or account identifiers. */
export async function getSavolAuthorNames(userIds: ReadonlyArray<string>): Promise<Map<string, string>> {
  const ids = [...new Set(userIds)];
  if (ids.length === 0) return new Map();
  const result = await getDb().query<{ user_id: string; display_name: string | null }>(
    `SELECT user_id::text, NULLIF(BTRIM(display_name), '') AS display_name
     FROM user_profiles WHERE user_id = ANY($1::bigint[])`,
    [ids],
  );
  return new Map(
    result.rows
      .filter((row): row is { user_id: string; display_name: string } => Boolean(row.display_name))
      .map((row) => [row.user_id, row.display_name]),
  );
}
