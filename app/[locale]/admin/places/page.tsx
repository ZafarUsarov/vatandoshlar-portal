import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { listAdminPlaces } from "@/lib/places/admin-places-repository";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Places Admin", robots: { index: false, follow: false } };

export default async function AdminPlacesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  await requireAdmin(locale);
  const { q = "" } = await searchParams;
  const places = await listAdminPlaces(q);
  const de = locale === "de";
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link href="/admin" className="text-sm font-semibold text-violet-700 dark:text-violet-400">← {de ? "Verwaltung" : "Admin panel"}</Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><h1 className="text-3xl font-bold text-slate-950 dark:text-white">{de ? "Unternehmen & Organisationen" : "Biznes va tashkilotlar"}</h1><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{de ? "Einträge verwalten" : "Tashkilotlarni boshqarish"}</p></div>
          <Link href="/admin/places/new" className="rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white hover:bg-violet-600">+ {de ? "Neu erstellen" : "Yangi tashkilot"}</Link>
        </div>
        <form className="flex gap-3"><input name="q" defaultValue={q} maxLength={100} placeholder={de ? "Name suchen" : "Nom bo‘yicha qidirish"} className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900 dark:text-white"/><button className="rounded-xl border border-slate-300 px-5 py-3 dark:text-white">{de ? "Suchen" : "Qidirish"}</button></form>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left text-sm"><thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"><tr><th className="p-4">{de ? "Name" : "Nomi"}</th><th className="p-4">Slug</th><th className="p-4">{de ? "Ort" : "Shahar"}</th><th className="p-4">Status</th><th className="p-4">{de ? "Aktion" : "Amal"}</th></tr></thead><tbody>
          {places.map(p => <tr key={p.id} className="border-t border-slate-200 dark:border-slate-800"><td className="p-4 font-semibold text-slate-900 dark:text-white">{p.name}</td><td className="p-4 text-slate-600 dark:text-slate-300">{p.slug}</td><td className="p-4 text-slate-600 dark:text-slate-300">{p.city_name ?? p.state_name}</td><td className="p-4 text-slate-600 dark:text-slate-300">{p.status}</td><td className="p-4"><Link href={`/admin/places/${p.id}/edit`} className="font-semibold text-violet-700 dark:text-violet-400">{de ? "Bearbeiten" : "Tahrirlash"}</Link></td></tr>)}
          </tbody></table>{places.length === 0 && <p className="p-6 text-slate-600 dark:text-slate-300">{de ? "Keine Einträge" : "Tashkilotlar topilmadi"}</p>}
        </div>
      </div>
    </main>
  );
}
