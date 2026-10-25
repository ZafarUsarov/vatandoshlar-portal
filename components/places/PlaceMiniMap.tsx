"use client";

import { useState } from "react";
import { Minus, Plus, ExternalLink } from "lucide-react";

type Props = {
  query: string;
  mapLink: string;
  title: string;
  openLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
};

export default function PlaceMiniMap({ query, mapLink, title, openLabel, zoomInLabel, zoomOutLabel }: Props) {
  const [zoom, setZoom] = useState(15);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
  const controlClass = "flex h-8 w-8 items-center justify-center bg-white text-slate-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700";

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
      <div className="relative h-44">
        <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
        <div className="absolute bottom-2 right-2 flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md dark:border-slate-600 dark:bg-slate-800">
          <button type="button" aria-label={zoomInLabel} title={zoomInLabel} disabled={zoom >= 20} onClick={() => setZoom(z => Math.min(20, z + 1))} className={controlClass}><Plus aria-hidden="true" size={17} /></button>
          <div className="h-px bg-slate-200 dark:bg-slate-600" />
          <button type="button" aria-label={zoomOutLabel} title={zoomOutLabel} disabled={zoom <= 3} onClick={() => setZoom(z => Math.max(3, z - 1))} className={controlClass}><Minus aria-hidden="true" size={17} /></button>
        </div>
      </div>
      <a href={mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 px-3 py-2 text-xs font-semibold text-emerald-800 hover:underline dark:text-emerald-300">{openLabel}<ExternalLink aria-hidden="true" size={14}/></a>
    </div>
  );
}
