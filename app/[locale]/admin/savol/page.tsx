import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { getOpenSavolReports } from "@/lib/savol/moderation-repository";

import { moderateSavolAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Savol Moderation | Admin", robots: { index: false, follow: false } };

const copy = {
  uz: { title: "Savol moderatsiyasi", back: "Admin panel", empty: "Ochiq shikoyatlar yo‘q.", question: "Savol", answer: "Javob", reporter: "Shikoyatchi", reason: "Sabab", details: "Izoh", open: "Savolni ochish", publish: "Tiklash", hide: "Yashirish", remove: "Olib tashlash", reasons: { spam: "Spam", abuse: "Haqorat / suiiste’mol", misinformation: "Noto‘g‘ri ma’lumot", other: "Boshqa" } },
  de: { title: "Savol-Moderation", back: "Adminbereich", empty: "Keine offenen Meldungen.", question: "Frage", answer: "Antwort", reporter: "Meldender Nutzer", reason: "Grund", details: "Hinweis", open: "Frage öffnen", publish: "Wiederherstellen", hide: "Ausblenden", remove: "Entfernen", reasons: { spam: "Spam", abuse: "Beleidigung / Missbrauch", misinformation: "Falsche Information", other: "Sonstiges" } },
} as const;

export default async function SavolModerationPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  await requireAdmin(locale);
  const reports = await getOpenSavolReports();
  const t = copy[locale];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="text-sm font-bold text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400">← {t.back}</Link>
        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t.title}</h1>

        {reports.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{t.empty}</div>
        ) : (
          <div className="mt-8 space-y-5">
            {reports.map((report) => (
              <article key={report.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <span>{report.targetType === "question" ? t.question : t.answer}</span><span>·</span><span>#{report.targetId}</span><span>·</span><span>{new Date(report.createdAt).toLocaleString(locale === "de" ? "de-DE" : "uz-UZ")}</span>
                </div>
                <h2 className="mt-3 text-xl font-black text-slate-950 dark:text-white">{report.questionTitle}</h2>
                <p className="mt-4 whitespace-pre-line rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700 dark:bg-slate-950/60 dark:text-slate-200">{report.contentBody}</p>
                <dl className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                  <div><dt className="font-bold">{t.reason}</dt><dd>{t.reasons[report.reason]}</dd></div>
                  <div><dt className="font-bold">{t.reporter}</dt><dd>#{report.reporterUserId}</dd></div>
                  {report.details ? <div className="sm:col-span-2"><dt className="font-bold">{t.details}</dt><dd>{report.details}</dd></div> : null}
                </dl>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link href={`/savol/${report.questionSlug}`} className="inline-flex min-h-10 items-center rounded-xl border border-slate-300 px-3.5 text-sm font-bold dark:border-slate-700">{t.open}</Link>
                  {(["published", "hidden", "removed"] as const).map((status) => (
                    <form action={moderateSavolAction} key={status}>
                      <input type="hidden" name="locale" value={locale} /><input type="hidden" name="reportId" value={report.id} /><input type="hidden" name="targetId" value={report.targetId} /><input type="hidden" name="targetType" value={report.targetType} /><input type="hidden" name="status" value={status} />
                      <button type="submit" className="min-h-10 rounded-xl border border-slate-300 px-3.5 text-sm font-bold transition hover:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700">
                        {status === "published" ? t.publish : status === "hidden" ? t.hide : t.remove}
                      </button>
                    </form>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
