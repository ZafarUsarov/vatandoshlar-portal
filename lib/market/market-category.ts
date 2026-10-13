export const marketCategories = ["items", "vehicles", "housing", "jobs", "services", "other"] as const;
export type MarketCategory = (typeof marketCategories)[number];
export function isMarketCategory(value: string): value is MarketCategory {
  return (marketCategories as readonly string[]).includes(value);
}
export const marketCategoryLabels: Record<"uz" | "de", Record<MarketCategory, string>> = {
  uz: { items: "Buyumlar", vehicles: "Avtomobillar", housing: "Uy-joy", jobs: "Ish o‘rinlari", services: "Xizmatlar", other: "Boshqalar" },
  de: { items: "Artikel", vehicles: "Fahrzeuge", housing: "Immobilien", jobs: "Jobs", services: "Dienstleistungen", other: "Sonstiges" },
};
