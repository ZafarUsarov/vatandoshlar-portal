"use client";
import { useEffect, useState } from "react";
import {
  Search, House, GraduationCap, BriefcaseBusiness, FileText,
  UsersRound, CalendarDays, Ellipsis, MessagesSquare,
} from "lucide-react";

type Category = { id: string; label: string; count: number };

// Resolve by stable category meaning, not by its position in the database response.
// Labels provide a fallback when IDs are UUIDs rather than readable slugs.
function categoryIcon(id: string, label: string) {
  const key = `${id} ${label}`.toLocaleLowerCase("de-DE")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (/hujjat|dokument|document|visa|viza|behor|auslander/.test(key)) return FileText;
  if (/(^|[^a-z])ish([^a-z]|$)|arbeit|beruf|job|karriere|employment/.test(key)) return BriefcaseBusiness;
  if (/ta.lim|talim|bildung|ausbildung|studium|schule|education/.test(key)) return GraduationCap;
  if (/uy.?joy|wohnen|wohnung|housing|immobil|miete/.test(key)) return House;
  if (/oila|famil|family/.test(key)) return UsersRound;
  if (/kundalik|alltag|daily|everyday|leben/.test(key)) return CalendarDays;
  return Ellipsis;
}

const iconColors = new Map([
  [FileText, "text-orange-500"],
  [BriefcaseBusiness, "text-blue-600"],
  [GraduationCap, "text-fuchsia-600"],
  [House, "text-indigo-600"],
  [UsersRound, "text-rose-500"],
  [CalendarDays, "text-cyan-600"],
  [Ellipsis, "text-slate-500"],
]);

export default function SavolCategoryFilter({ de, categories }: { de: boolean; categories: Category[] }) {
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");
  const chooseCategory = (id: string) => {
    setSelected(id);
    window.requestAnimationFrame(() => {
      document.getElementById("savol-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".savol-filter-item").forEach(el => {
      const match = (selected === "all" || el.dataset.savolCategory === selected)
        && (!query || el.dataset.savolSearch?.includes(query.toLocaleLowerCase()));
      el.hidden = !match;
      el.style.display = match ? "" : "none";
    });
  }, [selected, query]);

  return <>
    <style>{`
      .savol-category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      @media (min-width: 640px) {
        .savol-category-grid { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
      }
      @media (min-width: 1024px) {
        .savol-category-grid { grid-template-columns: repeat(8, minmax(0, 1fr)) !important; }
      }
    `}</style>
    <div className="savol-category-grid grid gap-3 pb-4">
      <button type="button" onClick={() => chooseCategory("all")} aria-pressed={selected === "all"} className={`flex min-w-0 min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition hover:-translate-y-1 hover:shadow-md ${selected === "all" ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"}`}>
        <MessagesSquare size={25} className="text-emerald-600" />
        <span className="text-xs font-bold">{de ? "Alle" : "Barchasi"}</span>
      </button>
      {categories.slice(0, 7).map(c => {
        const Icon = categoryIcon(c.id, c.label);
        return <button type="button" key={c.id} onClick={() => chooseCategory(c.id)} aria-pressed={selected === c.id} className={`grid min-w-0 min-h-28 grid-rows-[26px_32px_16px] content-center justify-items-center gap-1 rounded-2xl border p-3 text-center transition hover:-translate-y-1 hover:shadow-md ${selected === c.id ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"}`}>
          <Icon size={23} className={`shrink-0 ${iconColors.get(Icon) ?? "text-slate-500"}`} />
          <span className="flex h-8 w-full min-w-0 items-center justify-center break-words text-center text-xs font-semibold leading-snug">{c.label}</span>
          <span className="text-xs text-slate-500">{c.count}</span>
        </button>;
      })}
    </div>
    <label className="relative mt-2 block">
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder={de ? "Fragen suchen..." : "Savollar bo‘yicha qidirish..."} style={{ paddingLeft: 48 }} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900" />
    </label>
  </>;
}
