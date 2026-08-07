import type { SpecialistCategory } from "./specialist";

export type PopularCategoryIcon =
  | "medical"
  | "legal"
  | "technology"
  | "automotive"
  | "home"
  | "education"
  | "finance"
  | "creative";

export type PopularCategoryMessageKey =
  PopularCategoryIcon;

export type PopularCategory = Readonly<{
  id: SpecialistCategory;
  messageKey: PopularCategoryMessageKey;
  icon: PopularCategoryIcon;
  href: string;
  accent:
    | "emerald"
    | "blue"
    | "violet"
    | "amber"
    | "cyan"
    | "rose";
}>;
