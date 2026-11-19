import type { FeaturedContentType } from "@/types/featured-content";

export type FeaturedContentInput = {
  contentType: FeaturedContentType;
  sourceId?: string | null;
  internalPath: string;
  titleUz?: string | null;
  titleDe?: string | null;
  descriptionUz?: string | null;
  descriptionDe?: string | null;
  categoryUz?: string | null;
  categoryDe?: string | null;
  imageUrl?: string | null;
  ctaLabelUz?: string | null;
  ctaLabelDe?: string | null;
  isActive: boolean;
  priority: number;
  startsAt?: string | null;
  endsAt?: string | null;
};

const contentTypes: ReadonlySet<string> = new Set([
  "article", "guide", "platform", "page", "custom",
]);

function optionalText(value: string | null | undefined, max: number): string | null {
  const text = value?.trim() || null;
  if (text && (text.length > max || /[\u0000-\u001f\u007f]/u.test(text))) {
    throw new Error("Invalid featured content text.");
  }
  return text;
}

export function validateInternalPath(value: string): string {
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.length > 1024 ||
      /[\\?#\u0000-\u001f\u007f]/u.test(path) || path.split("/").some((part) => part === "." || part === "..")) {
    throw new Error("Invalid internal path.");
  }
  return path;
}

function optionalImageUrl(value: string | null | undefined): string | null {
  const image = optionalText(value, 2048);
  if (!image) return null;
  if (image.startsWith("/")) return validateInternalPath(image);
  try {
    const url = new URL(image);
    if (url.protocol === "https:" && url.hostname && !url.username && !url.password) return image;
  } catch { /* Invalid URL. */ }
  throw new Error("Invalid image URL.");
}

function optionalDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime()) || !/^\d{4}-\d{2}-\d{2}T/.test(value)) {
    throw new Error("Invalid schedule date.");
  }
  return date.toISOString();
}

export function validateFeaturedContentInput(input: FeaturedContentInput): FeaturedContentInput {
  if (!contentTypes.has(input.contentType)) throw new Error("Invalid featured content type.");
  const sourceId = optionalText(input.sourceId, 128);
  if (["article", "guide"].includes(input.contentType) ? !sourceId : !!sourceId) {
    throw new Error("Invalid featured content source.");
  }
  if (typeof input.isActive !== "boolean" || !Number.isSafeInteger(input.priority) ||
      input.priority < -100000 || input.priority > 100000) {
    throw new Error("Invalid featured content settings.");
  }
  const startsAt = optionalDate(input.startsAt);
  const endsAt = optionalDate(input.endsAt);
  if (startsAt && endsAt && startsAt >= endsAt) throw new Error("Invalid featured content schedule.");
  const result: FeaturedContentInput = {
    contentType: input.contentType,
    sourceId,
    internalPath: validateInternalPath(input.internalPath),
    titleUz: optionalText(input.titleUz, 240),
    titleDe: optionalText(input.titleDe, 240),
    descriptionUz: optionalText(input.descriptionUz, 1200),
    descriptionDe: optionalText(input.descriptionDe, 1200),
    categoryUz: optionalText(input.categoryUz, 100),
    categoryDe: optionalText(input.categoryDe, 100),
    imageUrl: optionalImageUrl(input.imageUrl),
    ctaLabelUz: optionalText(input.ctaLabelUz, 80),
    ctaLabelDe: optionalText(input.ctaLabelDe, 80),
    isActive: input.isActive,
    priority: input.priority,
    startsAt,
    endsAt,
  };
  if (input.contentType === "custom" && (!result.titleUz || !result.titleDe)) {
    throw new Error("Custom featured content requires both titles.");
  }
  return result;
}
