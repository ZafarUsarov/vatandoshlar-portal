import { getDb } from "@/lib/db";
import type { FeaturedContent, FeaturedLocale } from "@/types/featured-content";
import { validateFeaturedContentInput, type FeaturedContentInput } from "./featured-validation";

type FeaturedRow = {
  id: string;
  content_type: FeaturedContent["contentType"];
  source_id: string | null;
  internal_path: string;
  title_uz: string | null;
  title_de: string | null;
  description_uz: string | null;
  description_de: string | null;
  category_uz: string | null;
  category_de: string | null;
  image_url: string | null;
  cta_label_uz: string | null;
  cta_label_de: string | null;
  is_active: boolean;
  priority: number;
  starts_at: Date | string | null;
  ends_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

const columns = `id, content_type, source_id, internal_path, title_uz, title_de,
  description_uz, description_de, category_uz, category_de, image_url,
  cta_label_uz, cta_label_de, is_active, priority, starts_at, ends_at,
  created_at, updated_at`;

function dateString(value: Date | string | null): string | null {
  return value === null ? null : value instanceof Date ? value.toISOString() : value;
}

function toFeatured(row: FeaturedRow): FeaturedContent {
  return {
    id: row.id, contentType: row.content_type, sourceId: row.source_id,
    internalPath: row.internal_path, titleUz: row.title_uz, titleDe: row.title_de,
    descriptionUz: row.description_uz, descriptionDe: row.description_de,
    categoryUz: row.category_uz, categoryDe: row.category_de,
    imageUrl: row.image_url, ctaLabelUz: row.cta_label_uz,
    ctaLabelDe: row.cta_label_de, isActive: row.is_active,
    priority: row.priority, startsAt: dateString(row.starts_at),
    endsAt: dateString(row.ends_at), createdAt: dateString(row.created_at)!,
    updatedAt: dateString(row.updated_at)!,
  };
}

function values(input: FeaturedContentInput): unknown[] {
  const data = validateFeaturedContentInput(input);
  return [data.contentType, data.sourceId, data.internalPath,
    data.titleUz, data.titleDe, data.descriptionUz, data.descriptionDe,
    data.categoryUz, data.categoryDe, data.imageUrl, data.ctaLabelUz,
    data.ctaLabelDe, data.isActive, data.priority, data.startsAt, data.endsAt];
}

export async function getActiveFeaturedContent(): Promise<FeaturedContent | null> {
  const result = await getDb().query<FeaturedRow>(
    `SELECT ${columns} FROM featured_content
     WHERE is_active = TRUE AND (starts_at IS NULL OR starts_at <= NOW())
       AND (ends_at IS NULL OR ends_at > NOW())
     ORDER BY priority DESC, created_at DESC, id DESC LIMIT 1`,
  );
  return result.rows[0] ? toFeatured(result.rows[0]) : null;
}

export async function listFeaturedContent(): Promise<FeaturedContent[]> {
  const result = await getDb().query<FeaturedRow>(
    `SELECT ${columns} FROM featured_content ORDER BY priority DESC, created_at DESC, id DESC`,
  );
  return result.rows.map(toFeatured);
}

export async function getFeaturedContentById(id: string): Promise<FeaturedContent | null> {
  if (!/^[1-9]\d*$/.test(id)) return null;
  const result = await getDb().query<FeaturedRow>(
    `SELECT ${columns} FROM featured_content WHERE id = $1`, [id],
  );
  return result.rows[0] ? toFeatured(result.rows[0]) : null;
}

export async function createFeaturedContent(input: FeaturedContentInput): Promise<FeaturedContent> {
  const result = await getDb().query<FeaturedRow>(
    `INSERT INTO featured_content (content_type, source_id, internal_path,
      title_uz, title_de, description_uz, description_de, category_uz, category_de,
      image_url, cta_label_uz, cta_label_de, is_active, priority, starts_at, ends_at)
     VALUES (${Array.from({ length: 16 }, (_, i) => `$${i + 1}`).join(", ")})
     RETURNING ${columns}`,
    values(input),
  );
  return toFeatured(result.rows[0]);
}

export async function updateFeaturedContent(id: string, input: FeaturedContentInput): Promise<FeaturedContent | null> {
  if (!/^[1-9]\d*$/.test(id)) return null;
  const fields = ["content_type", "source_id", "internal_path", "title_uz", "title_de",
    "description_uz", "description_de", "category_uz", "category_de", "image_url",
    "cta_label_uz", "cta_label_de", "is_active", "priority", "starts_at", "ends_at"];
  const result = await getDb().query<FeaturedRow>(
    `UPDATE featured_content SET ${fields.map((field, i) => `${field} = $${i + 1}`).join(", ")},
     updated_at = NOW() WHERE id = $17 RETURNING ${columns}`,
    [...values(input), id],
  );
  return result.rows[0] ? toFeatured(result.rows[0]) : null;
}

export async function deleteFeaturedContent(id: string): Promise<boolean> {
  if (!/^[1-9]\d*$/.test(id)) return false;
  const result = await getDb().query("DELETE FROM featured_content WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}

export type LocalizedFeaturedContent = {
  id: string;
  contentType: FeaturedContent["contentType"];
  sourceId: string | null;
  internalPath: string;
  title: string | null;
  description: string | null;
  category: string | null;
  imageUrl: string | null;
  ctaLabel: string | null;
};

export function localizeFeaturedContent(item: FeaturedContent, locale: FeaturedLocale): LocalizedFeaturedContent {
  const de = locale === "de";
  return {
    id: item.id, contentType: item.contentType, sourceId: item.sourceId,
    internalPath: item.internalPath, title: de ? item.titleDe : item.titleUz,
    description: de ? item.descriptionDe : item.descriptionUz,
    category: de ? item.categoryDe : item.categoryUz,
    imageUrl: item.imageUrl, ctaLabel: de ? item.ctaLabelDe : item.ctaLabelUz,
  };
}
