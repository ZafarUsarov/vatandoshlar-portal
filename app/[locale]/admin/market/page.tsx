import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { getOpenMarketReports } from "@/lib/market/market-moderation-repository";
import { moderateMarketAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Market Moderation | Admin", robots: { index: false, follow: false } };

export default async function MarketModerationPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  await requireAdmin(locale);
  const reports = await getOpenMarketReports();
  const de = locale === "de";
  const reasons = de
    ? { spam: "Spam", abuse: "Missbrauch", misinformation: "Falsche Angaben", other: "Sonstiges" }
    : { spam: "Spam", abuse: "Suiiste’mol", misinformation: "Noto‘g‘ri ma’lumot", other: "Boshqa" };
  return <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
    <div className="mx-auto max-w-5xl">
      <Link href="/admin" className="text-sm font-bold text-emerald-700 dark:text-emerald-400">← {de ? "Adminbereich" : "Admin panel"}</Link>
      <h1 className="mt-5 text-3xl font-black">{de ? "Market-Moderation" : "Market moderatsiyasi"}</h1>
      {reports.length === 0 ? <p className="mt-8 rounded-2xl border p-6 dark:border-slate-700">{de ? "Keine offenen Meldungen." : "Ochiq shikoyatlar yo‘q."}</p> :
        <div className="mt-8 space-y-5">{reports.map(report =>
          <article key={report.id} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs text-slate-500">#{report.id} · {new Date(report.createdAt).toLocaleString(de ? "de-DE" : "uz-UZ")} · {report.listingStatus}</p>
            <h2 className="mt-3 text-xl font-bold">{report.title}</h2>
            <p className="mt-3 whitespace-pre-line break-words text-sm text-slate-700 dark:text-slate-200">{report.description}</p>
            <p className="mt-4 text-sm">{de ? "Grund" : "Sabab"}: {reasons[report.reason]} · {de ? "Nutzer" : "Foydalanuvchi"}: #{report.reporterUserId}</p>
            {report.details && <p className="mt-2 whitespace-pre-line break-words text-sm">{report.details}</p>}
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`/market/${report.slug}`} className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600">{de ? "Anzeige öffnen" : "E’lonni ochish"}</Link>
              {([
                ...(report.listingStatus === "published" ? ["hide"] as const : []),
                ...(report.listingStatus === "hidden" ? ["restore"] as const : []),
                ...(["published", "hidden"].includes(report.listingStatus) ? ["remove"] as const : []),
                "dismiss" as const,
              ]).map(op =>
                <form action={moderateMarketAction} key={op}>
                  <input type="hidden" name="reportId" value={report.id} />
                  <input type="hidden" name="listingId" value={report.listingId} />
                  <input type="hidden" name="operation" value={op} />
                  <button type="submit" className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:border-emerald-500 dark:border-slate-600">
                    {de ? { hide: "Ausblenden", restore: "Wiederherstellen", remove: "Entfernen", dismiss: "Meldung schließen" }[op] :
                      { hide: "Yashirish", restore: "Tiklash", remove: "Olib tashlash", dismiss: "Shikoyatni yopish" }[op]}
                  </button>
                </form>)}
            </div>
          </article>)}</div>}
    </div>
  </main>;
}
