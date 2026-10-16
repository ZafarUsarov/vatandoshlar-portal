import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { getMarketReports, type MarketReportFilters } from "@/lib/market/market-moderation-repository";
import { moderateMarketAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Market Moderation | Admin", robots: { index: false, follow: false } };

type Props = { searchParams?: Promise<{ status?: string; reason?: string }> };

export default async function MarketModerationPage({ searchParams }: Props) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  await requireAdmin(locale);
  const params = await searchParams;
  const status: MarketReportFilters["status"] =
    params?.status === "resolved" || params?.status === "all" ? params.status : "open";
  const reason: MarketReportFilters["reason"] =
    params?.reason === "spam" || params?.reason === "abuse" ||
    params?.reason === "misinformation" || params?.reason === "other" ? params.reason : "all";
  const reports = await getMarketReports({ status, reason });
  const de = locale === "de";
  const reasons = de
    ? { spam: "Spam", abuse: "Missbrauch", misinformation: "Falsche Angaben", other: "Sonstiges" }
    : { spam: "Spam", abuse: "Suiiste’mol", misinformation: "Noto‘g‘ri ma’lumot", other: "Boshqa" };
  return <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
    <div className="mx-auto max-w-5xl">
      <Link href="/admin" className="text-sm font-bold text-emerald-700 dark:text-emerald-400">← {de ? "Adminbereich" : "Admin panel"}</Link>
      <h1 className="mt-5 text-3xl font-black">{de ? "Market-Moderation" : "Market moderatsiyasi"}</h1>
      <form method="get" className="mt-7 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <label className="flex min-w-40 flex-1 flex-col gap-1.5 text-sm font-medium">
          {de ? "Status" : "Holat"}
          <div className="relative"><select name="status" defaultValue={status} className="w-full appearance-none rounded-xl border border-slate-300 bg-white pl-4 pr-12 py-2.5 text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white">
            <option value="open">{de ? "Offen" : "Ochiq"}</option>
            <option value="resolved">{de ? "Erledigt" : "Yopilgan"}</option>
            <option value="all">{de ? "Alle" : "Barchasi"}</option>
          </select><span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500 dark:text-slate-400"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></span></div>
        </label>
        <label className="flex min-w-40 flex-1 flex-col gap-1.5 text-sm font-medium">
          {de ? "Grund" : "Sabab"}
          <div className="relative"><select name="reason" defaultValue={reason} className="w-full appearance-none rounded-xl border border-slate-300 bg-white pl-4 pr-12 py-2.5 text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-white">
            <option value="all">{de ? "Alle Gründe" : "Barcha sabablar"}</option>
            {Object.entries(reasons).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select><span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500 dark:text-slate-400"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></span></div>
        </label>
        <button type="submit" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:border-emerald-600 dark:border-slate-600">{de ? "Filtern" : "Filtrlash"}</button>
      </form>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{de ? "Maximal 200 Meldungen pro Ansicht." : "Har bir ko‘rinishda ko‘pi bilan 200 ta shikoyat."}</p>
      {reports.length === 0 ? <p className="mt-5 rounded-2xl border p-6 dark:border-slate-700">{de ? "Keine passenden Meldungen." : "Mos shikoyatlar topilmadi."}</p> :
        <div className="mt-8 space-y-5">{reports.map(report =>
          <article key={report.id} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs text-slate-500">#{report.id} · {new Date(report.createdAt).toLocaleString(de ? "de-DE" : "uz-UZ")} · {report.listingStatus} · <span className={report.reportStatus === "open" ? "font-semibold text-amber-700 dark:text-amber-400" : "text-slate-500 dark:text-slate-400"}>{report.reportStatus === "open" ? (de ? "Offen" : "Ochiq") : (de ? "Erledigt" : "Yopilgan")}</span></p>
            {report.resolvedAt && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{de ? "Geschlossen" : "Yopilgan vaqt"}: {new Date(report.resolvedAt).toLocaleString(de ? "de-DE" : "uz-UZ")}</p>}
            <h2 className="mt-3 text-xl font-bold">{report.title}</h2>
            <p className="mt-3 whitespace-pre-line break-words text-sm text-slate-700 dark:text-slate-200">{report.description}</p>
            <p className="mt-4 text-sm">{de ? "Grund" : "Sabab"}: {reasons[report.reason]} · {de ? "Nutzer" : "Foydalanuvchi"}: #{report.reporterUserId}</p>
            {report.details && <p className="mt-2 whitespace-pre-line break-words text-sm">{report.details}</p>}
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`/market/${report.slug}`} className="rounded-xl border px-3 py-2 text-sm dark:border-slate-600">{de ? "Anzeige öffnen" : "E’lonni ochish"}</Link>
              {report.reportStatus === "open" && ([
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
