import { marketCategories, marketCategoryLabels, type MarketCategory } from "@/lib/market/market-category";
export default function MarketCategoryField({ locale, value, disabled = false }: { locale: "uz" | "de"; value: MarketCategory; disabled?: boolean }) {
  return <div><label htmlFor="market-category" className="mb-2 block font-semibold">{locale === "de" ? "Kategorie" : "Kategoriya"}</label>
    <select id="market-category" name="category" defaultValue={value} disabled={disabled} required className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
      {marketCategories.map(category => <option key={category} value={category}>{marketCategoryLabels[locale][category]}</option>)}
    </select></div>;
}
