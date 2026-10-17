"use client";

import { useActionState } from "react";
import { changeTravelStatusAction, removeTravelListingAction, type TravelMutationState } from "@/app/travel/mine/actions";

const initial: TravelMutationState = { error: null, success: false };
export default function TravelListingActions({ id, status, locale }: { id: string; status: string; locale: "uz" | "de" }) {
  const de = locale === "de";
  const [change, changeAction, changing] = useActionState(changeTravelStatusAction, initial);
  const [remove, removeAction, removing] = useActionState(removeTravelListingAction, initial);
  return <>
    {(status === "draft" || status === "published") && <form action={changeAction} className="space-y-2">
      <input type="hidden" name="listingId" value={id}/>
      <input type="hidden" name="operation" value={status === "draft" ? "publish" : "close"}/>
      <button disabled={changing} className="min-h-11 rounded-lg bg-emerald-700 px-4 font-semibold text-white disabled:opacity-50">{changing ? (de ? "Bitte warten…" : "Kutilmoqda…") : status === "draft" ? (de ? "Veröffentlichen" : "Nashr qilish") : (de ? "Schließen" : "Yopish")}</button>
      {change.error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{change.error}</p>}
    </form>}
    <details className="rounded-lg border border-red-200 dark:border-red-900">
      <summary className="cursor-pointer px-4 py-3 font-semibold text-red-700 dark:text-red-300">{de ? "Entfernen" : "O‘chirish"}</summary>
      <form action={removeAction} className="border-t border-red-200 p-4 dark:border-red-900">
        <p className="mb-3 text-sm">{de ? "Diese Anzeige wirklich entfernen?" : "E’lonni rostdan o‘chirasizmi?"}</p>
        <input type="hidden" name="listingId" value={id}/>
        <button disabled={removing} className="min-h-11 rounded-lg border border-red-300 px-4 font-semibold text-red-700 dark:border-red-900 dark:text-red-300 disabled:opacity-50">{removing ? (de ? "Bitte warten…" : "Kutilmoqda…") : (de ? "Ja, entfernen" : "Ha, o‘chirish")}</button>
        {remove.error && <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">{remove.error}</p>}
      </form>
    </details>
  </>;
}
