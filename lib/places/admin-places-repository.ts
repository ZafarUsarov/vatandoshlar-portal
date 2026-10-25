import type { PoolClient } from "pg";
import { getDb } from "@/lib/db";
import { placeCategories, type PlaceCategory } from "@/lib/places/places-repository";

export type PlaceStatus = "draft" | "published" | "archived";
export type AdminPlaceInput = {
  slug: string;
  name: string;
  category: PlaceCategory;
  descriptionUz: string;
  descriptionDe: string;
  locationId: string;
  streetAddress: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
  website: string | null;
  logoPath: string | null;
  categoryLabelUz: string | null;
  categoryLabelDe: string | null;
  status: PlaceStatus;
  specialistIds: string[];
};

export type AdminPlace = {
  id: string;
  slug: string;
  name: string;
  category: PlaceCategory;
  status: PlaceStatus;
  location_id: string;
  city_name: string | null;
  state_name: string;
  description_uz: string;
  description_de: string;
  street_address: string | null;
  postal_code: string | null;
  latitude: string | null;
  longitude: string | null;
  website: string | null;
  logo_path: string | null;
  category_label_uz: string | null;
  category_label_de: string | null;
  specialist_ids: string[];
};

const fields = `p.id::text, p.slug, p.name, p.category, p.status,
 p.location_id::text, l.city_name, l.state_name, p.description_uz, p.description_de,
 p.street_address, p.postal_code, p.latitude::text, p.longitude::text,
 p.website, p.logo_path, p.category_label_uz, p.category_label_de,
 COALESCE((SELECT array_agg(pe.specialist_id::text ORDER BY pe.specialist_id)
  FROM place_entrepreneurs pe WHERE pe.place_id = p.id), ARRAY[]::text[]) AS specialist_ids`;

export async function listAdminPlaces(query = ""): Promise<AdminPlace[]> {
  const q = query.trim().slice(0, 100);
  const result = await getDb().query<AdminPlace>(
    `SELECT ${fields} FROM places p JOIN locations l ON l.id = p.location_id
     WHERE ($1::text = '' OR p.name ILIKE '%' || $1 || '%' OR p.slug ILIKE '%' || $1 || '%')
     ORDER BY p.updated_at DESC, p.id DESC LIMIT 200`, [q]);
  return result.rows;
}

export async function getAdminPlace(id: string): Promise<AdminPlace | null> {
  if (!/^\d{1,18}$/.test(id)) return null;
  const result = await getDb().query<AdminPlace>(
    `SELECT ${fields} FROM places p JOIN locations l ON l.id = p.location_id
     WHERE p.id = $1::bigint LIMIT 1`, [id]);
  return result.rows[0] ?? null;
}

function validate(input: AdminPlaceInput) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) || input.slug.length > 120) throw new Error("Invalid slug");
  if (!input.name.trim() || input.name.length > 180) throw new Error("Invalid name");
  if (!placeCategories.includes(input.category)) throw new Error("Invalid category");
  if (!/^\d{1,18}$/.test(input.locationId)) throw new Error("Invalid location");
  if (!["draft", "published", "archived"].includes(input.status)) throw new Error("Invalid status");
  if (input.postalCode && !/^\d{5}$/.test(input.postalCode)) throw new Error("Invalid postal code");
  if ((input.latitude === null) !== (input.longitude === null)) throw new Error("Coordinates must be paired");
  if (input.latitude !== null && (!Number.isFinite(input.latitude) || Math.abs(input.latitude) > 90)) throw new Error("Invalid latitude");
  if (input.longitude !== null && (!Number.isFinite(input.longitude) || Math.abs(input.longitude) > 180)) throw new Error("Invalid longitude");
  if (input.website) {
    const url = new URL(input.website);
    if (!["https:", "http:"].includes(url.protocol)) throw new Error("Invalid website URL");
  }
  if (input.logoPath && !/^(?:\/images\/places\/[a-zA-Z0-9][a-zA-Z0-9._/-]*|\/api\/places\/logos\/[a-f0-9-]{36}\.(?:jpg|png|webp))$/.test(input.logoPath)) throw new Error("Invalid logo path");
  if (input.specialistIds.some(id => !/^\d{1,18}$/.test(id))) throw new Error("Invalid specialist ID");
}

const columns = `slug, name, category, description_uz, description_de, location_id,
 street_address, postal_code, latitude, longitude, website, logo_path,
 category_label_uz, category_label_de, status`;
function params(i: AdminPlaceInput) {
  return [i.slug.trim(), i.name.trim(), i.category, i.descriptionUz.trim(), i.descriptionDe.trim(),
    i.locationId, i.streetAddress, i.postalCode, i.latitude, i.longitude, i.website,
    i.logoPath, i.categoryLabelUz, i.categoryLabelDe, i.status];
}

async function setFounders(client: PoolClient, placeId: string, ids: string[]) {
  await client.query("DELETE FROM place_entrepreneurs WHERE place_id = $1::bigint", [placeId]);
  for (const id of new Set(ids)) {
    await client.query("INSERT INTO place_entrepreneurs (place_id, specialist_id) VALUES ($1::bigint, $2::bigint)", [placeId, id]);
  }
}

export async function createAdminPlace(input: AdminPlaceInput): Promise<string> {
  validate(input);
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    const result = await client.query<{ id: string }>(
      `INSERT INTO places (${columns}) VALUES (${params(input).map((_, n) => `$${n + 1}`).join(", ")}) RETURNING id::text`, params(input));
    const id = result.rows[0].id;
    await setFounders(client, id, input.specialistIds);
    await client.query("COMMIT");
    return id;
  } catch (error) { await client.query("ROLLBACK"); throw error; }
  finally { client.release(); }
}

export async function updateAdminPlace(id: string, input: AdminPlaceInput): Promise<boolean> {
  if (!/^\d{1,18}$/.test(id)) return false;
  validate(input);
  const client = await getDb().connect();
  try {
    await client.query("BEGIN");
    const values = params(input);
    const result = await client.query(
      `UPDATE places SET ${columns.split(",").map((col, n) => `${col.trim()} = $${n + 2}`).join(", ")}, updated_at = NOW()
       WHERE id = $1::bigint`, [id, ...values]);
    if (!result.rowCount) { await client.query("ROLLBACK"); return false; }
    await setFounders(client, id, input.specialistIds);
    await client.query("COMMIT");
    return true;
  } catch (error) { await client.query("ROLLBACK"); throw error; }
  finally { client.release(); }
}
