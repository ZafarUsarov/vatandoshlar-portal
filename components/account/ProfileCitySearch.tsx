"use client";

import { useEffect, useState } from "react";
import { LocateFixed, Search } from "lucide-react";

type Result = {
  id: string;
  cityName: string;
  stateName: string;
  postalCode: string | null;
};

type Props = {
  locale: "uz" | "de";
  value: string;
  initialCity: string;
  initialState: string;
  onChange: (id: string, stateName: string) => void;
};

export default function ProfileCitySearch({
  locale,
  value,
  initialCity,
  initialState,
  onChange,
}: Props) {
  const de = locale === "de";
  const [query, setQuery] = useState(initialCity);
  const [results, setResults] = useState<Result[]>([]);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(Boolean(value));

  useEffect(() => {
    if (selected || !query.trim()) {
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const response = await fetch(
          `/api/market/location/search?q=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Search failed");

        const data: { results?: Result[] } = await response.json();
        if (!controller.signal.aborted) {
          setResults(data.results ?? []);
        }
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
          setMessage(de ? "Suche nicht verfügbar." : "Qidiruv ishlamadi.");
        }
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, selected, de]);

  function selectCity(city: Result) {
    setQuery(city.cityName);
    setSelected(true);
    setResults([]);
    setMessage("");
    onChange(city.id, city.stateName);
  }

  function locate() {
    if (!navigator.geolocation) {
      setMessage(de ? "Standort nicht verfügbar." : "GPS mavjud emas.");
      return;
    }

    setLocating(true);
    setMessage("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `/api/market/location/reverse?lat=${latitude}&lon=${longitude}`,
          );
          if (!response.ok) throw new Error("Reverse lookup failed");

          const place: { city?: string; state?: string } =
            await response.json();

          if (!place.city) throw new Error("City missing");

          const searchResponse = await fetch(
            `/api/market/location/search?q=${encodeURIComponent(place.city)}`,
          );
          if (!searchResponse.ok) throw new Error("Search failed");

          const data: { results?: Result[] } =
            await searchResponse.json();

          const normalize = (text: string) =>
            text.normalize("NFKC").trim().toLocaleLowerCase("de");

          const matches = (data.results ?? []).filter(
            (city) => normalize(city.cityName) === normalize(place.city ?? ""),
          );

          const exact = matches.find(
            (city) => normalize(city.stateName) === normalize(place.state ?? ""),
          );

          if (exact) {
            selectCity(exact);
            setMessage(
              de ? "Standort gefunden. Bitte prüfen."
                : "Joylashuv topildi. Tekshirib tasdiqlang.",
            );
          } else {
            setQuery(place.city);
            setSelected(false);
            setResults(matches);
            onChange("", "");
            setMessage(
              de
                ? "Bitte wählen Sie Ihren Ort aus den Suchergebnissen."
                : "Shaharingizni qidiruv natijalaridan tanlang.",
            );
          }
        } catch {
          setMessage(
            de ? "Standort konnte nicht zugeordnet werden."
              : "Joylashuvni shaharga bog‘lab bo‘lmadi.",
          );
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setMessage(
          de ? "Standortfreigabe nicht verfügbar."
            : "Joylashuvga ruxsat berilmadi yoki GPS ishlamadi.",
        );
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 },
    );
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor="profile-home-location-search"
        className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {de ? "Wohnort" : "Yashash joyim"}
      </label>

      <input type="hidden" name="homeLocationId" value={value} />

      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <Search
            size={18}
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            id="profile-home-location-search"
            type="text"
            autoComplete="off"
            value={query}
            placeholder={de ? "Stadt oder PLZ eingeben" : "Shahar yoki PLZ yozing"}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(false);
              setResults([]);
              setMessage("");
              onChange("", "");
            }}
            className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-950 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>

        <button
          type="button"
          onClick={locate}
          disabled={locating}
          aria-label={de ? "Standort ermitteln" : "Turgan joyimni aniqlash"}
          title={de ? "Standort ermitteln" : "Turgan joyimni aniqlash"}
          className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-50 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
        >
          <LocateFixed size={20} />
        </button>
      </div>

      {selected && value && (
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          {de ? "Ausgewählt" : "Tanlandi"}: {query}
          {initialState && query === initialCity ? ` — ${initialState}` : ""}
        </p>
      )}

      {searching && (
        <p className="text-sm text-slate-500">
          {de ? "Suche läuft…" : "Qidirilmoqda…"}
        </p>
      )}

      {!selected && results.length > 0 && (
        <div className="max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {results.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => selectCity(city)}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm hover:bg-emerald-50 dark:hover:bg-slate-800"
            >
              <span>
                <span className="font-semibold">{city.cityName}</span>
                <span className="ml-2 text-slate-500">{city.stateName}</span>
              </span>
              {city.postalCode && (
                <span className="shrink-0 text-slate-500">
                  {city.postalCode}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {message && (
        <p role="status" className="text-sm text-slate-600 dark:text-slate-300">
          {message}
        </p>
      )}
    </div>
  );
}
