import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import PlaceForm from "@/components/admin/places/PlaceForm";
import { listPlaceSpecialists } from "@/lib/places/admin-specialists";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "New Place", robots: { index: false, follow: false } };
export default async function NewPlacePage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  await requireAdmin(locale);
  const specialists = await listPlaceSpecialists();
  return <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950"><div className="mx-auto max-w-5xl space-y-6"><Link href="/admin/places" className="text-violet-700 dark:text-violet-400">← {locale === "de" ? "Zurück" : "Orqaga"}</Link><h1 className="text-3xl font-bold dark:text-white">{locale === "de" ? "Neues Unternehmen" : "Yangi tashkilot"}</h1><PlaceForm locale={locale} specialists={specialists}/></div></main>;
}
