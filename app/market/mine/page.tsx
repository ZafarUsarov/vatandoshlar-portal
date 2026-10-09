import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getOwnMarketListings } from "@/lib/market/market-contribution-repository";
import { changeMarketStatusAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Market | My listings", robots: { index: false, follow: false } };

export default async function MyMarketPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale, "/market/mine");
  const listings = await getOwnMarketListings(context.user.id);
  const t = locale === "de" ? {
    heading: "Meine Anzeigen", create: "Neue Anzeige", empty: "Sie haben noch keine Anzeigen.",
    publish: "Veröffentlichen", close: "Schließen", view: "Anzeige ansehen", edit: "Bearbeiten",
    draft: "Entwurf", published: "Veröffentlicht", closed: "Geschlossen", hidden: "Ausgeblendet", removed: "Entfernt",
  } : {
    heading: "Mening e’lonlarim", create: "Yangi e’lon", empty: "Hozircha e’lonlaringiz yo‘q.",
    publish: "Nashr qilish", close: "Yopish", view: "E’lonni ko‘rish", edit: "Tahrirlash",
    draft: "Qoralama", published: "Nashr qilingan", closed: "Yopilgan", hidden: "Yashirilgan", removed: "O‘chirilgan",
  };
  return <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
    <Header />
    <main className="mx-auto max-w-4xl px-5 pb-20 pt-32 sm:px-8">
      <h1 className="text-3xl font-bold">{t.heading}</h1>
      <Link href="/market/new" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800">{t.create}</Link>
      {listings.length === 0 ? <p className="mt-8 rounded-xl border border-slate-200 p-6 dark:border-slate-800">{t.empty}</p> :
        <ul className="mt-8 space-y-4">{listings.map(item =>
          <li key={item.id} className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="break-words font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.cityName} · {t[item.status]}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {(item.status === "draft" || item.status === "published") && <Link href={`/market/${item.id}/edit`} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-4 font-semibold dark:border-slate-700">{t.edit}</Link>}
              {item.status === "published" && <Link href={`/market/${item.slug}`} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-4 font-semibold dark:border-slate-700">{t.view}</Link>}
              {(item.status === "draft" || item.status === "published") &&
                <form action={changeMarketStatusAction}>
                  <input type="hidden" name="listingId" value={item.id} />
                  <input type="hidden" name="operation" value={item.status === "draft" ? "publish" : "close"} />
                  <button type="submit" className="min-h-11 rounded-xl bg-emerald-700 px-4 font-semibold text-white hover:bg-emerald-800">
                    {item.status === "draft" ? t.publish : t.close}
                  </button>
                </form>}
            </div>
          </li>)}</ul>}
    </main><Footer />
  </div>;
}
