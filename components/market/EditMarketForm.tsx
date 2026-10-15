"use client";
import MarketCategoryField from "@/components/market/MarketCategoryField";

import { useActionState } from "react";
import MarketImageManager from "@/components/market/MarketImageManager";
import MarketContactFields from "@/components/market/MarketContactFields";
import MarketCityCombobox from "@/components/market/MarketCityCombobox";
import { editMarketAction, type EditMarketState } from "@/app/market/[slug]/edit/actions";
import type { EditableMarketListing } from "@/lib/market/market-contribution-repository";
const control = "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white";
export default function EditMarketForm({ locale, listing, initialImages }: { locale: "uz" | "de"; listing: EditableMarketListing; initialImages: { id: string; status: "pending" | "ready"; position: number }[] }) {
  const initial: EditMarketState = { error: null, revision: 0, values: {
    listingType: listing.listingType, category: listing.category, locationId: listing.locationId, title: listing.title,
    description: listing.description, priceAmount: listing.priceAmount,
    contentLanguage: listing.contentLanguage,
    telegram: listing.telegram, whatsapp: listing.whatsapp, phone: listing.phone, email: listing.email,
  }};
  const [state, action, pending] = useActionState(editMarketAction, initial);
  const de = locale === "de";
  return <><form id="market-edit-form" key={state.revision} action={action} noValidate className="space-y-5" aria-busy={pending}>
    <input type="hidden" name="locale" value={locale} /><input type="hidden" name="listingId" value={listing.id} />
    {state.error && <p role="alert" className="rounded-xl border border-red-300 p-3 text-red-700 dark:text-red-300">{state.error}</p>}
    <div><label htmlFor="market-edit-type" className="mb-2 block font-semibold">{de ? "Anzeigenart" : "E’lon turi"}</label><div className="relative"><select id="market-edit-type" name="listingType" defaultValue={state.values.listingType} disabled={pending} required className={`${control} appearance-none pr-14`}><option value="sell">{de ? "Verkaufen" : "Sotaman"}</option><option value="buy">{de ? "Suche" : "Sotib olaman"}</option><option value="giveaway">{de ? "Verschenken" : "Bepul beraman"}</option></select><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 dark:text-slate-300"><path d="m6 9 6 6 6-6" /></svg></div></div>
    <div><label htmlFor="market-edit-language" className="mb-2 block font-semibold">{de ? "Sprache der Anzeige" : "E’lon tili"}</label><select id="market-edit-language" name="contentLanguage" defaultValue={state.values.contentLanguage} required disabled={pending} className={control}><option value="uz">O‘zbekcha</option><option value="de">Deutsch</option></select></div>
    <MarketCategoryField locale={locale} value={state.values.category as import("@/lib/market/market-category").MarketCategory} disabled={pending} />
    <MarketCityCombobox initialId={state.values.locationId} locale={locale} disabled={pending} />
    <div><label htmlFor="market-edit-title" className="mb-2 block font-semibold">{de ? "Titel" : "Sarlavha"}</label><input id="market-edit-title" name="title" defaultValue={state.values.title} required disabled={pending} className={control} /></div>
    <div><label htmlFor="market-edit-description" className="mb-2 block font-semibold">{de ? "Beschreibung" : "Tavsif"}</label><textarea id="market-edit-description" name="description" defaultValue={state.values.description} minLength={20} maxLength={10000} rows={7} required disabled={pending} className={control} /></div>
    <div><label htmlFor="market-edit-price" className="mb-2 block font-semibold">{de ? "Preis in EUR" : "Narx (EUR)"}</label><input id="market-edit-price" name="priceAmount" defaultValue={state.values.priceAmount} inputMode="decimal" placeholder="0.00" disabled={pending} className={control} /></div>
    <MarketContactFields locale={locale} values={state.values} disabled={pending} />
    <p className="text-sm text-slate-600 dark:text-slate-300">{de ? "Änderungen an veröffentlichten Anzeigen werden sofort öffentlich sichtbar." : "Nashr qilingan e’londagi o‘zgarishlar darhol ommaga ko‘rinadi."}</p>
  </form>
    <MarketImageManager locale={locale} listingId={listing.id} initialImages={initialImages} />
    <div className="pt-6">
      <button type="submit" form="market-edit-form" disabled={pending} aria-disabled={pending} className="min-h-12 rounded-xl bg-emerald-700 px-6 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">{pending ? (de ? "Speichern…" : "Saqlanmoqda…") : (de ? "Änderungen speichern" : "O‘zgarishlarni saqlash")}</button>
      <p role="status" aria-live="polite" className="mt-3 text-sm text-emerald-700 dark:text-emerald-400">
        {pending ? (de ? "Änderungen werden gespeichert…" : "O‘zgarishlar saqlanmoqda…") : state.revision > 0 && !state.error ? (de ? "Änderungen gespeichert." : "O‘zgarishlar saqlandi.") : null}
      </p>
    </div>
  </>;
}
