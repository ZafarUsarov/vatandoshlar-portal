import type { PopularCategory } from "@/types/category";

export const popularCategories: ReadonlyArray<PopularCategory> = [
  {
    id: "medical",
    messageKey: "medical",
    icon: "medical",
    href: "/specialists?category=medical",
    accent: "emerald",
  },
  {
    id: "legal",
    messageKey: "legal",
    icon: "legal",
    href: "/specialists?category=legal",
    accent: "blue",
  },
  {
    id: "technology",
    messageKey: "technology",
    icon: "technology",
    href: "/specialists?category=technology",
    accent: "violet",
  },
  {
    id: "automotive",
    messageKey: "automotive",
    icon: "automotive",
    href: "/specialists?category=automotive",
    accent: "amber",
  },
  {
    id: "home",
    messageKey: "home",
    icon: "home",
    href: "/specialists?category=home",
    accent: "cyan",
  },
  {
    id: "education",
    messageKey: "education",
    icon: "education",
    href: "/specialists?category=education",
    accent: "rose",
  },
  {
    id: "finance",
    messageKey: "finance",
    icon: "finance",
    href: "/specialists?category=finance",
    accent: "emerald",
  },
  {
    id: "creative",
    messageKey: "creative",
    icon: "creative",
    href: "/specialists?category=creative",
    accent: "violet",
  },
];
