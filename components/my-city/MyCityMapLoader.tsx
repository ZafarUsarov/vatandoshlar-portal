"use client";

import { useEffect, useState } from "react";

type Props = {
  cityName: string;
  stateName: string;
  latitude: number;
  longitude: number;
  locale: string;
};

export default function MyCityMapLoader({
  cityName,
  stateName,
  latitude,
  longitude,
  locale,
}: Props) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const query = encodeURIComponent(`${latitude},${longitude}`);
  const mapUrl = `https://www.google.com/maps?q=${query}&z=12&output=embed`;
  const externalUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const isGerman = locale === "de";

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("error"), 20000);
    return () => window.clearTimeout(timeout);
  }, [status, attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((value) => value + 1);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="relative h-[220px] bg-slate-100 dark:bg-slate-800 sm:h-[260px]">
        {status !== "error" && (
          <iframe
            key={`${latitude}-${longitude}-${attempt}`}
            title={`${cityName}, ${stateName} — Google Maps`}
            src={mapUrl}
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => setStatus("ready")}
            onError={() => setStatus("error")}
            className="block h-full w-full border-0"
          />
        )}
        {status === "loading" && (
          <div role="status" aria-live="polite" className="absolute inset-0 flex animate-pulse items-center justify-center bg-slate-100 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {isGerman ? "Karte wird geladen …" : "Xarita yuklanmoqda …"}
          </div>
        )}
        {status === "error" && (
          <div role="alert" className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center text-sm text-slate-700 dark:text-slate-200">
            <p>{isGerman ? "Die Karte konnte nicht geladen werden." : "Xaritani yuklab bo‘lmadi."}</p>
            <button type="button" onClick={retry} className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700">
              {isGerman ? "Erneut versuchen" : "Qayta urinish"}
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
        <span>{isGerman ? "Stadtkarte" : "Shahringiz xaritasi"}</span>
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
          {isGerman ? "In Google Maps öffnen ↗" : "Google Maps’da ochish ↗"}
        </a>
      </div>
    </div>
  );
}
