import { getDb } from "@/lib/db";
export type PlaceSpecialistOption = { id: string; name: string; slug: string };
export async function listPlaceSpecialists(): Promise<PlaceSpecialistOption[]> {
  const result = await getDb().query<PlaceSpecialistOption>(
    "SELECT id::text, name, slug FROM specialists WHERE status = 'published' ORDER BY name ASC LIMIT 500"
  );
  return result.rows;
}
