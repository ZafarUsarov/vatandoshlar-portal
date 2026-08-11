import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import AdminSignOutButton from "@/components/auth/AdminSignOutButton";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

const copy = {
  uz: {
    eyebrow: "VATANDOSHLAR.DE · ADMIN",
    title: "Boshqaruv paneli",
    welcome: "Xush kelibsiz",
    description:
      "Vatandoshlar.de boshqaruv modullarini shu yerdan boshqarishingiz mumkin.",
    modulesTitle: "Boshqaruv modullari",
    modulesDescription:
      "Birinchi modul sifatida Yangiliklar uchun PostgreSQL asosidagi boshqaruv foundation qo‘shildi.",
    newsTitle: "Yangiliklar",
    newsDescription:
      "Admin database’dagi yangiliklar ro‘yxatini ko‘ring. Yaratish va tahrirlash funksiyalari keyingi bosqichda qo‘shiladi.",
    newsAction: "Yangiliklarni boshqarish",
    account: "Admin account",
    role: "Rol",
    status: "Holat",
    active: "Faol",
    back: "Saytga qaytish",
  },

  de: {
    eyebrow: "VATANDOSHLAR.DE · ADMIN",
    title: "Verwaltungsbereich",
    welcome: "Willkommen",
    description:
      "Von hier aus können Sie die Verwaltungsbereiche von Vatandoshlar.de aufrufen.",
    modulesTitle: "Verwaltungsmodule",
    modulesDescription:
      "Als erstes Modul wurde die PostgreSQL-Grundlage für die Nachrichtenverwaltung hinzugefügt.",
    newsTitle: "Nachrichten",
    newsDescription:
      "Zeigen Sie die Nachrichten in der Admin-Datenbank an. Funktionen zum Erstellen und Bearbeiten folgen im nächsten Schritt.",
    newsAction: "Nachrichten verwalten",
    account: "Admin-Konto",
    role: "Rolle",
    status: "Status",
    active: "Aktiv",
    back: "Zur Website",
  },
} as const;

export default async function AdminPage() {
  const locale = await getLocale();
  const appLocale =
    locale === "de"
      ? "de"
      : "uz";

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  const admin =
    await requireAdmin(appLocale);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              {currentCopy.eyebrow}
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {currentCopy.title}
            </h1>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              {currentCopy.welcome},{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {admin.name}
              </span>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              {currentCopy.back}
            </Link>

            <AdminSignOutButton
              locale={appLocale}
            />
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
              {currentCopy.description}
            </p>

            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                {currentCopy.modulesTitle}
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.modulesDescription}
              </p>

              <Link
                href="/admin/news"
                className="group mt-6 block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/60 hover:shadow-lg hover:shadow-emerald-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-emerald-500/25 dark:hover:bg-emerald-500/[0.06] dark:focus-visible:ring-offset-slate-900 sm:p-6"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-xl font-black text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                      {currentCopy.newsTitle}
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {currentCopy.newsDescription}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-300 dark:group-hover:bg-emerald-500 dark:group-hover:text-white"
                  >
                    →
                  </span>
                </div>

                <p className="mt-5 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  {currentCopy.newsAction} →
                </p>
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <h2 className="font-black text-slate-950 dark:text-white">
              {currentCopy.account}
            </h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  E-mail
                </dt>
                <dd className="mt-1 break-all font-bold text-slate-900 dark:text-white">
                  {admin.email}
                </dd>
              </div>

              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  {currentCopy.role}
                </dt>
                <dd className="mt-1 font-bold text-slate-900 dark:text-white">
                  Admin
                </dd>
              </div>

              <div>
                <dt className="text-slate-500 dark:text-slate-400">
                  {currentCopy.status}
                </dt>
                <dd className="mt-1 font-bold text-emerald-700 dark:text-emerald-400">
                  {currentCopy.active}
                </dd>
              </div>
            </dl>
          </aside>
        </section>
      </div>
    </main>
  );
}
