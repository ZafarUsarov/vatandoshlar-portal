"use client";

import { useActionState, useState } from "react";
import { rateMarketSellerAction, type SellerRatingState } from "@/app/market/sellers/[id]/actions";

export default function MarketSellerRatingForm({
  sellerId, initialRating, locale,
}: { sellerId: string; initialRating: number | null; locale: "uz" | "de" }) {
  const [rating, setRating] = useState(initialRating ?? 0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [state, action, pending] = useActionState<SellerRatingState, FormData>(
    rateMarketSellerAction, { ok: false, message: "" },
  );
  const de = locale === "de";
  return <form action={action} className="mt-5 rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/70">
    <p className="font-semibold">{de ? "Anbieter bewerten" : "Sotuvchini baholash"}</p>
    <input type="hidden" name="sellerId" value={sellerId} />
    <input type="hidden" name="rating" value={rating} />
    <div role="group" aria-label={de ? "Bewertung von 1 bis 5 Sternen" : "1 dan 5 gacha yulduz bilan baholash"} onMouseLeave={() => setHoverRating(null)} className="mt-3 flex gap-1">
      {[1, 2, 3, 4, 5].map(value =>
        <button key={value} type="button" disabled={pending} onClick={() => setRating(value)} onMouseEnter={() => setHoverRating(value)} onFocus={() => setHoverRating(value)} onBlur={() => setHoverRating(null)}
          aria-label={`${value} ${de ? "Sterne" : "yulduz"}`}
          aria-pressed={rating === value}
          className={`rounded-lg p-1 text-3xl transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-emerald-600 ${value <= (hoverRating ?? rating) ? "text-amber-500" : "text-slate-300 dark:text-slate-600"}`}>
          <span aria-hidden="true">★</span>
        </button>)}
    </div>
    <button type="submit" disabled={pending || rating === 0}
      className="mt-3 min-h-11 rounded-xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50">
      {pending ? (de ? "Speichern…" : "Saqlanmoqda…") : (de ? "Bewertung speichern" : "Bahoni saqlash")}
    </button>
    {state.message && <p role="status" className={`mt-2 text-sm ${state.ok ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>{state.message}</p>}
    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{de ? "Nutzerbewertung, kein verifizierter Kauf." : "Foydalanuvchi bahosi, tasdiqlangan xarid emas."}</p>
  </form>;
}
