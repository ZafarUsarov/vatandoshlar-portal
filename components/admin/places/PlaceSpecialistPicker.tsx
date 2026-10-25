"use client";
import { useState } from "react";
import type { PlaceSpecialistOption } from "@/lib/places/admin-specialists";
export default function PlaceSpecialistPicker({ options, selected, locale }: { options: PlaceSpecialistOption[]; selected: string[]; locale: "uz" | "de" }) {
  const [ids, setIds] = useState<string[]>(selected);
  const [search, setSearch] = useState("");
  const shown = options.filter(x => `${x.name} ${x.slug}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="md:col-span-2 space-y-2"><label className="block text-sm font-semibold">{locale === "de" ? "Gründer / Spezialisten" : "Asoschilar / mutaxassislar"}</label>
    <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder={locale === "de" ? "Suchen" : "Qidirish"} className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
    <input type="hidden" name="specialistIds" value={ids.join(",")} />
    <div className="max-h-56 overflow-auto rounded-xl border border-slate-200 p-3 dark:border-slate-700">{shown.map(x => <label key={x.id} className="flex items-center gap-3 py-1.5 text-sm"><input type="checkbox" checked={ids.includes(x.id)} onChange={e => setIds(old => e.target.checked ? [...old, x.id] : old.filter(id => id !== x.id))}/><span>{x.name}</span></label>)}</div>
  </div>;
}
