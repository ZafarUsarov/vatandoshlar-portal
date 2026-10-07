import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import { getNotificationsForUser } from "@/lib/notifications/notification-repository";
import {
  markAllNotificationsReadAction,
  markNotificationReadAction,
} from "./actions";

export const metadata: Metadata = {
  title: "Notifications | Vatandoshlar.de",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale, "/account/notifications");
  const notifications = await getNotificationsForUser(context.user.id);
  const unreadCount = notifications.filter((item) => item.readAt === null).length;
  const copy = locale === "de"
    ? {
        eyebrow: "VATANDOSHLAR ID",
        title: "Benachrichtigungen",
        description: "Neue Aktivitäten zu Fragen, denen Sie folgen oder die Sie gestellt haben.",
        empty: "Noch keine Benachrichtigungen.",
        newAnswer: "Neue Antwort",
        open: "Frage öffnen",
        markRead: "Als gelesen markieren",
        markAll: "Alle als gelesen markieren",
        back: "Zurück zum Konto",
      }
    : {
        eyebrow: "VATANDOSHLAR ID",
        title: "Bildirishnomalar",
        description: "Siz kuzatayotgan yoki bergan savollardagi yangi faollik.",
        empty: "Hozircha bildirishnoma yo‘q.",
        newAnswer: "Yangi javob",
        open: "Savolni ochish",
        markRead: "O‘qilgan deb belgilash",
        markAll: "Barchasini o‘qilgan deb belgilash",
        back: "Akkauntga qaytish",
      };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{copy.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-white sm:text-4xl">{copy.title}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">{copy.description}</p>
          </div>
          {unreadCount > 0 ? (
            <form action={markAllNotificationsReadAction}>
              <input type="hidden" name="locale" value={locale} />
              <button className="min-h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                {copy.markAll} ({unreadCount})
              </button>
            </form>
          ) : null}
        </div>

        <div className="mt-8 space-y-3">
          {notifications.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{copy.empty}</div>
          ) : notifications.map((notification) => (
            <article key={notification.id} className={`rounded-2xl border p-5 ${notification.readAt === null ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/20" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">{copy.newAnswer}</p>
                  <h2 className="mt-2 font-bold text-slate-950 dark:text-white">{notification.questionTitle}</h2>
                  {notification.actorDisplayName ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{notification.actorDisplayName}</p> : null}
                </div>
                {notification.readAt === null ? <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" aria-label={copy.newAnswer} /> : null}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/savol/${notification.questionSlug}`} className="inline-flex min-h-10 items-center rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950">{copy.open}</Link>
                {notification.readAt === null ? (
                  <form action={markNotificationReadAction}>
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="notificationId" value={notification.id} />
                    <button className="min-h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">{copy.markRead}</button>
                  </form>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <Link href="/account" className="mt-8 inline-flex text-sm font-bold text-emerald-700 hover:text-emerald-600 dark:text-emerald-300">← {copy.back}</Link>
      </div>
    </main>
  );
}
