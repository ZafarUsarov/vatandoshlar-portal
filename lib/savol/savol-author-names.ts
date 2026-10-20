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


export type SavolAuthorProfile = Readonly<{
  displayName: string | null;
  avatarUrl: string | null;
}>;

export async function getSavolAuthorProfiles(
  userIds: ReadonlyArray<string>,
): Promise<Map<string, SavolAuthorProfile>> {
  const ids = [...new Set(userIds)];
  if (ids.length === 0) return new Map();

  const result = await getDb().query<{
    user_id: string;
    display_name: string | null;
    avatar_url: string | null;
  }>(
    `SELECT u.id::text AS user_id,
            NULLIF(BTRIM(p.display_name), '') AS display_name,
            p.avatar_url
     FROM public_users u
     LEFT JOIN user_profiles p ON p.user_id = u.id
     WHERE u.id = ANY($1::bigint[])
       AND u.account_status = 'active'`,
    [ids],
  );

  return new Map(result.rows.map(row => [
    row.user_id,
    {
      displayName: row.display_name,
      avatarUrl: row.avatar_url,
    },
  ]));
}
