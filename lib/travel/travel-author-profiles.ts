import { getDb } from "@/lib/db";

export type TravelAuthorProfile = Readonly<{
  displayName: string | null;
  avatarUrl: string | null;
  ratingAverage: number | null;
  ratingCount: number;
}>;

/** Public-facing profile fields only. Travel ratings are not yet collected;
 * marketplace seller ratings must not be presented as travel-driver ratings. */
export async function getTravelAuthorProfiles(authorIds: readonly string[]): Promise<Record<string, TravelAuthorProfile>> {
  const ids = [...new Set(authorIds.filter(id => /^[1-9]\d{0,17}$/.test(id)))];
  if (ids.length === 0) return {};
  const result = await getDb().query<{ id: string; display_name: string | null; avatar_url: string | null }>(`
    SELECT u.id::text AS id, p.display_name, p.avatar_url
    FROM public_users u
    LEFT JOIN user_profiles p ON p.user_id = u.id
    WHERE u.id = ANY($1::bigint[]) AND u.account_status = 'active'`, [ids]);
  return Object.fromEntries(result.rows.map(row => [row.id, {
    displayName: row.display_name?.trim() || null,
    avatarUrl: row.avatar_url?.startsWith("https://") || row.avatar_url?.startsWith("/") ? row.avatar_url : null,
    ratingAverage: null,
    ratingCount: 0,
  }]));
}
