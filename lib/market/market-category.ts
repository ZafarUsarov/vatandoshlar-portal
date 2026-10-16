export const marketCategories = ["items", "electronics", "furniture", "clothing", "children", "sports", "vehicles", "housing", "jobs", "services", "other"] as const;
export type MarketCategory = (typeof marketCategories)[number];
export function isMarketCategory(value: string): value is MarketCategory {
  return (marketCategories as readonly string[]).includes(value);
}
export const marketCategoryLabels: Record<"uz" | "de", Record<MarketCategory, string>> = {
  uz: { items: "Buyumlar", electronics: "Elektronika", furniture: "Mebel va uy jihozlari", clothing: "Kiyim-kechak", children: "Bolalar buyumlari", sports: "Sport va hordiq", vehicles: "Avtomobillar", housing: "Uy-joy", jobs: "Ish o‘rinlari", services: "Xizmatlar", other: "Boshqalar" },
  de: { items: "Artikel", electronics: "Elektronik", furniture: "Möbel & Haushalt", clothing: "Kleidung", children: "Baby & Kind", sports: "Sport & Freizeit", vehicles: "Fahrzeuge", housing: "Immobilien", jobs: "Jobs", services: "Dienstleistungen", other: "Sonstiges" },
};
