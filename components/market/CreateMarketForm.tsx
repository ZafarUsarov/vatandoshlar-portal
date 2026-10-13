"use client";
import MarketCategoryField from "@/components/market/MarketCategoryField";


import { useActionState } from "react";
import MarketContactFields from "@/components/market/MarketContactFields";
import MarketCityCombobox from "@/components/market/MarketCityCombobox";
import { createMarketDraftAction, type CreateMarketState } from "@/app/market/new/actions";

type Props = Readonly<{
  locale: "uz" | "de";
}>;
const initialState: CreateMarketState = {
  error: null,
  values: { category: "items", listingType: "", locationId: "", title: "", description: "", priceAmount: "", telegram: "", whatsapp: "", phone: "", email: "" },
  revision: 0,
};
const control = "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export default function CreateMarketForm({ locale }: Props) {
  const [state, action, pending] = useActionState(createMarketDraftAction, initialState);
  const t = locale === "de" ? {
    type: "Anzeigenart", city: "Stadt", title: "Titel", description: "Beschreibung", price: "Preis in EUR", save: "Entwurf speichern", saving: "Wird gespeichert…", select: "Bitte auswählen", sell: "Verkaufen", buy: "Suche", giveaway: "Verschenken", note: "Speichern Sie zuerst den Entwurf. Danach können Sie bis zu fünf Bilder hochladen und die Anzeige veröffentlichen.",
  } : {
    type: "E’lon turi", city: "Shahar", title: "Sarlavha", description: "Tavsif", price: "Narx (EUR)", save: "Qoralamani saqlash", saving: "Saqlanmoqda…", select: "Tanlang", sell: "Sotaman", buy: "Sotib olaman", giveaway: "Bepul beraman", note: "Avval qoralamani saqlang. Keyingi bosqichda 5 tagacha rasm yuklab, e’lonni nashr qilishingiz mumkin.",
  };
  return <form key={state.revision} action={action} className="space-y-5" noValidate>
    <input type="hidden" name="locale" value={locale} />
    {state.error && <p role="alert" className="rounded-xl border border-red-300 p-3 text-red-700 dark:text-red-300">{state.error}</p>}
    <div><label htmlFor="market-type" className="mb-2 block font-semibold">{t.type}</label><div className="relative"><select id="market-type" name="listingType" defaultValue={state.values.listingType} required disabled={pending} className={`${control} appearance-none pr-14`}><option value="" disabled>{t.select}</option><option value="sell">{t.sell}</option><option value="buy">{t.buy}</option><option value="giveaway">{t.giveaway}</option></select><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 dark:text-slate-300"><path d="m6 9 6 6 6-6" /></svg></div></div>
    <MarketCategoryField locale={locale} value={state.values.category as import("@/lib/market/market-category").MarketCategory} disabled={pending} />
    <MarketCityCombobox initialId={state.values.locationId} locale={locale} disabled={pending} />
    <div><label htmlFor="market-title" className="mb-2 block font-semibold">{t.title}</label><input id="market-title" name="title" defaultValue={state.values.title} required disabled={pending} className={control} /></div>
    <div><label htmlFor="market-description" className="mb-2 block font-semibold">{t.description}</label><textarea id="market-description" name="description" defaultValue={state.values.description} minLength={20} maxLength={10000} rows={7} required disabled={pending} className={control} /></div>
    <div><label htmlFor="market-price" className="mb-2 block font-semibold">{t.price}</label><input id="market-price" name="priceAmount" defaultValue={state.values.priceAmount} inputMode="decimal" placeholder="0.00" disabled={pending} className={control} /></div>
    <MarketContactFields locale={locale} values={state.values} disabled={pending} />
    <p className="text-sm text-slate-600 dark:text-slate-300">{t.note}</p>
    <button disabled={pending} className="min-h-12 rounded-xl bg-emerald-700 px-6 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">{pending ? t.saving : t.save}</button>
  </form>;
}
