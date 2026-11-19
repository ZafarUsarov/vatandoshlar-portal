export type FeaturedContentType =
  | "article"
  | "guide"
  | "platform"
  | "page"
  | "custom";

export type FeaturedLocale = "uz" | "de";

export type FeaturedContent = {
  id: string;
  contentType: FeaturedContentType;
  sourceId: string | null;
  internalPath: string;
  titleUz: string | null;
  titleDe: string | null;
  descriptionUz: string | null;
  descriptionDe: string | null;
  categoryUz: string | null;
  categoryDe: string | null;
  imageUrl: string | null;
  ctaLabelUz: string | null;
  ctaLabelDe: string | null;
  isActive: boolean;
  priority: number;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
};
