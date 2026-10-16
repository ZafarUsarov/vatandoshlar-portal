"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { reportMarketListingAction, type MarketReportState } from "@/app/market/[slug]/report-actions";

const initialState: MarketReportState = { status: "idle", message: null };

function Submit({ locale }: { locale: "uz" | "de" }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">{pending ? "…" : locale === "de" ? "Meldung senden" : "Shikoyatni yuborish"}</button>;
}

export default function MarketReportForm({ locale, slug, listingId }: { locale: "uz" | "de"; slug: string; listingId: string }) {
  const [state, action] = useActionState(reportMarketListingAction, initialState);
  const id = useId();
  const de = locale === "de";
  return <details className="rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
    <summary className="cursor-pointer text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-300 dark:hover:text-white">{de ? "Anzeige melden" : "E’lon ustidan shikoyat qilish"}</summary>
    {state.status === "success" || state.status === "duplicate" ? <p role="status" className="mt-4 text-sm text-slate-700 dark:text-slate-200">{state.message}</p> :
    <form action={action} className="mt-4 space-y-4">
      <input type="hidden" name="slug" value={slug} /><input type="hidden" name="listingId" value={listingId} />
      <div><label htmlFor={`${id}-reason`} className="mb-2 block text-sm font-medium">{de ? "Grund" : "Sabab"}</label>
        <div className="relative"><select id={`${id}-reason`} name="reason" required defaultValue="spam" className="w-full min-w-0 appearance-none rounded-xl border border-slate-300 bg-white px-3 py-3 pr-10 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
          <option value="spam">Spam</option><option value="abuse">{de ? "Missbrauch / Beleidigung" : "Haqorat / suiiste’mol"}</option><option value="misinformation">{de ? "Falsche Angaben" : "Noto‘g‘ri ma’lumot"}</option><option value="other">{de ? "Sonstiges" : "Boshqa"}</option>
        </select>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400"><path d="m6 9 6 6 6-6" /></svg></div></div>
      <div><label htmlFor={`${id}-details`} className="mb-2 block text-sm font-medium">{de ? "Details (optional)" : "Izoh (ixtiyoriy)"}</label>
        <textarea id={`${id}-details`} name="details" maxLength={1000} rows={3} className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white" /></div>
      {state.status === "error" && <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">{state.message}</p>}
      <Submit locale={locale} />
    </form>}
  </details>;
}
