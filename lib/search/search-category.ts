import type { SearchCategory, SearchLocale } from "@/data/searchIndex";

const labels: Readonly<
  Record<SearchLocale, Record<SearchCategory, string>>
> = {
  uz: {
    Sahifa: "Sahifa",
    Yangilik: "Yangilik",
    Xizmat: "Xizmat",
    Mutaxassis: "Mutaxassis",
    Ish: "Ish",
    "Ish platformasi": "Ish platformasi",
    Telegram: "Telegram",
    Tadbir: "Tadbir",
    "Qo‘llanma": "Qo‘llanma",
  },
  de: {
    Sahifa: "Seite",
    Yangilik: "Nachricht",
    Xizmat: "Dienstleistung",
    Mutaxassis: "Fachkraft",
    Ish: "Arbeit",
    "Ish platformasi": "Jobportal",
    Telegram: "Telegram",
    Tadbir: "Veranstaltung",
    "Qo‘llanma": "Guide",
  },
};

export function getSearchCategoryLabel(
  category: SearchCategory,
  locale: SearchLocale,
): string {
  return labels[locale][category];
}
