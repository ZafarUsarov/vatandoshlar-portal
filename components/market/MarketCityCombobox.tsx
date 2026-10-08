"use client";

import { useEffect, useId, useRef, useState } from "react";

type City = { id: string; cityName: string; stateName: string; postalCode: string | null };
type Props = Readonly<{ initialId: string; locale: "uz" | "de"; disabled: boolean }>;
const label = (city: City) => `${city.postalCode ? `${city.postalCode} — ` : ""}${city.cityName} — ${city.stateName}`;
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("de-DE").trim();

export default function MarketCityCombobox({ initialId, locale, disabled }: Props) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(initialId);
  const [results, setResults] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const [locating, setLocating] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const de = locale === "de";
  const show = open && results.length > 0 && !selectedId;

  useEffect(() => {
    if (!initialId) return;
    const controller = new AbortController();
    fetch(`/api/market/location/search?id=${encodeURIComponent(initialId)}`, { signal: controller.signal })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: { results: City[] }) => {
        const city = data.results[0];
        if (city) { setQuery(label(city)); setSelectedId(city.id); }
      }).catch(() => {});
    return () => controller.abort();
  }, [initialId]);

  useEffect(() => {
    if (selectedId || !query.trim()) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setBusy(true);
      try {
        const r = await fetch(`/api/market/location/search?q=${encodeURIComponent(query.trim())}`, { signal: controller.signal });
        if (!r.ok) throw new Error("search failed");
        const data: { results: City[] } = await r.json();
        setResults(data.results);
        setActive(0);
      } catch { if (!controller.signal.aborted) setMessage(de ? "Suche momentan nicht verfügbar." : "Qidiruv vaqtincha ishlamayapti."); }
      finally { if (!controller.signal.aborted) setBusy(false); }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, selectedId, de]);

  function select(city: City) {
    setSelectedId(city.id); setQuery(label(city)); setOpen(false); setResults([]); setActive(0); setMessage("");
  }

  async function locate() {
    if (disabled || locating) return;
    if (!navigator.geolocation) { setMessage(de ? "Standort wird nicht unterstützt." : "Brauzer lokatsiyani qo‘llab-quvvatlamaydi."); return; }
    setLocating(true); setMessage("");
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const reverse = await fetch(`/api/market/location/reverse?lat=${encodeURIComponent(coords.latitude)}&lon=${encodeURIComponent(coords.longitude)}`, { cache: "no-store" });
        if (!reverse.ok) throw new Error("reverse failed");
        const place: { city?: string; state?: string } = await reverse.json();
        if (!place.city) throw new Error("missing city");
        const search = await fetch(`/api/market/location/search?q=${encodeURIComponent(place.city)}`, { cache: "no-store" });
        if (!search.ok) throw new Error("search failed");
        const data: { results: City[] } = await search.json();
        const city = data.results.find(c => norm(c.cityName) === norm(place.city ?? "") && norm(c.stateName) === norm(place.state ?? ""))
          ?? data.results.find(c => norm(c.cityName) === norm(place.city ?? ""));
        if (city) select(city);
        else { setQuery(place.city); setSelectedId(""); setOpen(true); setMessage(de ? "Ort erkannt, bitte aus der Liste auswählen." : "Shahar aniqlandi, ro‘yxatdan tanlang."); }
      } catch { setMessage(de ? "Standort konnte nicht zugeordnet werden." : "Joylashuvni shaharga bog‘lab bo‘lmadi."); }
      finally { setLocating(false); }
    }, (error) => { setLocating(false); setMessage(error.code === 1 ? (de ? "Standortfreigabe verweigert." : "Lokatsiyaga ruxsat berilmadi.") : (de ? "Standort konnte nicht ermittelt werden." : "Joylashuvni aniqlab bo‘lmadi.")); }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 });
  }

  return <div className="relative">
    <label htmlFor="market-city-search" className="mb-2 block font-semibold">{de ? "Stadt oder PLZ" : "Shahar yoki PLZ"}</label>
    <input type="hidden" name="locationId" value={selectedId} />
    <div className="relative flex items-center">
      <input ref={inputRef} id="market-city-search" role="combobox" aria-autocomplete="list" aria-expanded={show} aria-controls={show ? listId : undefined} aria-activedescendant={show ? `${listId}-${active}` : undefined} autoComplete="off" placeholder={de ? "Stadt oder Postleitzahl…" : "Shahar yoki pochta indeksi…"} value={query} disabled={disabled || locating}
        onChange={e => { setQuery(e.target.value); setSelectedId(""); setResults([]); setBusy(false); setOpen(true); setActive(0); setMessage(""); }}
        onFocus={() => { if (!selectedId) setOpen(true); }} onBlur={() => setOpen(false)}
        onKeyDown={e => {
          if (e.key === "Escape") { setOpen(false); return; }
          if (!show) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setActive(v => (v + 1) % results.length); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive(v => (v - 1 + results.length) % results.length); }
          if (e.key === "Enter") { e.preventDefault(); select(results[active]); }
        }}
        className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-14 text-slate-950 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
      <button type="button" disabled={disabled || locating} onClick={() => void locate()} title={de ? "Meinen Standort ermitteln" : "Turgan joyimni aniqlash"} aria-label={de ? "Meinen Standort ermitteln" : "Turgan joyimni aniqlash"} className="absolute right-2 flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-800"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></button>
    </div>
    {(locating || busy) && <p role="status" className="mt-2 text-sm text-slate-600 dark:text-slate-300">{locating ? (de ? "Standort wird ermittelt…" : "Joylashuv aniqlanmoqda…") : (de ? "Suche…" : "Qidirilmoqda…")}</p>}
    {message && <p role="status" className="mt-2 text-sm text-amber-700 dark:text-amber-300">{message}</p>}
    {show && <ul id={listId} role="listbox" className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      {results.map((city, index) => <li key={city.id} id={`${listId}-${index}`} role="option" aria-selected={active === index} className={index === active ? "bg-emerald-50 dark:bg-slate-800" : ""}><button type="button" tabIndex={-1} onMouseDown={e => e.preventDefault()} onClick={() => { select(city); inputRef.current?.focus(); }} className="w-full px-4 py-3 text-left text-sm text-slate-900 hover:bg-emerald-50 dark:text-white dark:hover:bg-slate-800">{label(city)}</button></li>)}
    </ul>}
  </div>;
}
