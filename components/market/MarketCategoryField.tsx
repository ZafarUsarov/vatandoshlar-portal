import { marketCategories, marketCategoryLabels, type MarketCategory } from "@/lib/market/market-category";
export default function MarketCategoryField({ locale, value, disabled = false }: { locale: "uz" | "de"; value: MarketCategory; disabled?: boolean }) {
  return <div><label htmlFor="market-category" className="mb-2 block font-semibold">{locale === "de" ? "Kategorie" : "Kategoriya"}</label>
    <div className="relative"><select id="market-category" name="category" defaultValue={value} disabled={disabled} required className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-14 text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
      {marketCategories.map(category => <option key={category} value={category}>{marketCategoryLabels[locale][category]}</option>)}
    </select><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 dark:text-slate-300"><path d="m6 9 6 6 6-6" /></svg></div></div>;
}
