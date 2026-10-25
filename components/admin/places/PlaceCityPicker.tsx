"use client";

import { useEffect, useState } from "react";

type Suggestion = { id: string; city: string; state: string; postalCode: string | null };

export default function PlaceCityPicker({ locale, initialId, initialLabel }: {
  locale: "uz" | "de"; initialId: string; initialLabel: string;
}) {
  const [query, setQuery] = useState(initialLabel);
  const [id, setId] = useState(initialId);
  const [items, setItems] = useState<Suggestion[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (id || query.trim().length < 2) return;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setBusy(true); setError(false);
      try {
        const res = await fetch(`/api/places/city-suggestions?q=${encodeURIComponent(query.trim())}`, { signal: controller.signal });
        if (!res.ok) throw new Error("search failed");
        const data: { suggestions?: Suggestion[] } = await res.json();
        setItems(data.suggestions ?? []);
      } catch {
        if (!controller.signal.aborted) { setItems([]); setError(true); }
      } finally { if (!controller.signal.aborted) setBusy(false); }
    }, 250);
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [query, id]);
  const de = locale === "de";
  return <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
    <label htmlFor="place-city">{de ? "Stadt auswählen" : "Shaharni tanlang"}</label>
    <input id="place-city" type="text" autoComplete="off" value={query} onChange={e => { setQuery(e.target.value); setId(""); setItems([]); }} placeholder={de ? "Stadt oder PLZ eingeben" : "Shahar yoki indeksni kiriting"} className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
    <input type="hidden" name="locationId" value={id} />
    {busy && <p className="mt-2 text-xs font-normal text-slate-500">{de ? "Suche..." : "Qidirilmoqda..."}</p>}
    {error && <p className="mt-2 text-xs font-normal text-red-600">{de ? "Suche fehlgeschlagen" : "Qidiruvda xatolik"}</p>}
    {!id && items.length > 0 && <ul className="mt-2 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
      {items.map(item => <li key={item.id}><button type="button" className="w-full px-3 py-2 text-left text-sm font-normal hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => { setId(item.id); setQuery(`${item.city}, ${item.state}`); setItems([]); }}>{item.city}, {item.state}{item.postalCode ? ` (${item.postalCode})` : ""}</button></li>)}
    </ul>}
    {!id && <p className="mt-2 text-xs font-normal text-amber-700 dark:text-amber-400">{de ? "Bitte einen Ort aus der Ergebnisliste wählen." : "Natijalar ro‘yxatidan shaharni tanlang."}</p>}
  </div>;
}
