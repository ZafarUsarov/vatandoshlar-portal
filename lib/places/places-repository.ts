import { getDb } from "@/lib/db";
export const placeCategories = ["restaurant", "hotel", "shop", "service", "organization", "other"] as const;
export type PlaceCategory = (typeof placeCategories)[number];
export type PublicPlace = { slug: string; name: string; category: PlaceCategory; description: string; city: string; state: string; address: string | null; postalCode: string | null; website: string | null; latitude: number | null; longitude: number | null; logoPath: string | null; categoryLabel: string | null };
type Row = { slug:string; name:string; category:PlaceCategory; description:string; city:string; state:string; address:string|null; postal_code:string|null; website:string|null; latitude:string|null; longitude:string|null; logo_path:string|null; category_label:string|null };
function normalize(r: Row): PublicPlace { return {slug:r.slug,name:r.name,category:r.category,description:r.description,city:r.city,state:r.state,address:r.address,postalCode:r.postal_code,website:r.website,latitude:r.latitude===null?null:Number(r.latitude),longitude:r.longitude===null?null:Number(r.longitude),logoPath:r.logo_path,categoryLabel:r.category_label}; }
const select = `SELECT p.slug,p.name,p.category,COALESCE(NULLIF(CASE WHEN $1 = 'de' THEN p.description_de ELSE p.description_uz END,''),CASE WHEN $1 = 'de' THEN p.description_uz ELSE p.description_de END) AS description,COALESCE(l.city_name,l.state_name) AS city,l.state_name AS state,p.street_address AS address,p.postal_code,p.website,p.latitude::text,p.longitude::text,p.logo_path,COALESCE(NULLIF(CASE WHEN $1 = 'de' THEN p.category_label_de ELSE p.category_label_uz END,''),NULLIF(CASE WHEN $1 = 'de' THEN p.category_label_uz ELSE p.category_label_de END,'')) AS category_label FROM places p JOIN locations l ON l.id=p.location_id WHERE p.status='published' AND l.status='active'`;
export async function listPublicPlaces(locale: "uz" | "de", opts: { q?: string; category?: PlaceCategory; location?: string; locationId?: string } = {}): Promise<PublicPlace[]> {
 const q = (opts.q ?? "").trim().slice(0, 100);
 const location = (opts.location ?? "").trim().slice(0, 100);
 const locationId = (opts.locationId ?? "").trim();
 const validId = /^\d{1,18}$/.test(locationId) ? locationId : "";
 const result = await getDb().query<Row>(`${select}
  AND ($2::text = '' OR p.name ILIKE '%' || $2 || '%' OR p.description_uz ILIKE '%' || $2 || '%' OR p.description_de ILIKE '%' || $2 || '%')
  AND ($3::text = '' OR p.category = $3)
  AND ($4::text = '' OR l.id = $4::bigint)
  AND ($4::text <> '' OR $5::text = '' OR l.city_name ILIKE '%' || $5 || '%'
       OR p.postal_code LIKE $5 || '%'
       OR EXISTS (SELECT 1 FROM location_postal_codes lpc WHERE lpc.location_id = l.id AND lpc.postal_code LIKE $5 || '%'))
  ORDER BY p.name ASC, p.id ASC LIMIT 100`, [locale, q, opts.category ?? "", validId, location]);
 return result.rows.map(normalize);
}
export async function getPublicPlace(locale:"uz"|"de",slug:string):Promise<PublicPlace|null> { const result=await getDb().query<Row>(`${select} AND p.slug=$2 LIMIT 1`,[locale,slug]);return result.rows[0]?normalize(result.rows[0]):null; }
