export type SavolContentLanguage = "uz" | "de";
export type SavolContentStatus = "published" | "hidden" | "removed";
export type SavolTaxonomyStatus = "active" | "inactive";

export type QuestionCategory = Readonly<{
  id: string;
  key: string;
  labelUz: string;
  labelDe: string;
  sortOrder: number;
  status: SavolTaxonomyStatus;
}>;

export type QuestionTag = Readonly<{
  id: string;
  key: string;
  labelUz: string;
  labelDe: string;
  status: SavolTaxonomyStatus;
}>;

export type Question = Readonly<{
  id: string;
  authorUserId: string;
  categoryId: string;
  locationId: string | null;
  slug: string;
  title: string;
  body: string;
  contentLanguage: SavolContentLanguage;
  status: SavolContentStatus;
  createdAt: string;
  updatedAt: string;
}>;

export type Answer = Readonly<{
  id: string;
  questionId: string;
  authorUserId: string;
  body: string;
  status: SavolContentStatus;
  createdAt: string;
  updatedAt: string;
}>;
