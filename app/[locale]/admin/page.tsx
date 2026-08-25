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
      "Yangiliklar, Ish va karyera, Xizmatlar, Mutaxassislar, Tadbirlar, Germaniya qo‘llanmasi, Telegram hamjamiyatlari va sayt analitikasi PostgreSQL asosida boshqariladi.",

    newsTitle: "Yangiliklar",
    newsDescription:
      "Yangiliklarni yaratish, tahrirlash, e’lon qilish, arxivlash va featured holatini boshqaring.",
    newsAction: "Yangiliklarni boshqarish",

    jobsTitle: "Ish va karyera",
    jobsDescription:
      "Jobs qo‘llanmalarini yaratish, tahrirlash, e’lon qilish, arxivlash va featured holatini boshqaring.",
    jobsAction: "Ish qo‘llanmalarini boshqarish",

    servicesTitle: "Xizmatlar",
    servicesDescription:
      "Tarjima, huquq, soliq, tibbiyot, hunarmandchilik va boshqa xizmat yo‘nalishlarini boshqaring.",
    servicesAction: "Xizmatlarni boshqarish",

    specialistsTitle: "Mutaxassislar",
    specialistsDescription:
      "Mutaxassis profillari, kategoriyalar, tillar, joylashuv va verification statuslarini boshqaring.",
    specialistsAction: "Mutaxassislarni boshqarish",

    eventsTitle: "Tadbirlar",
    eventsDescription:
      "Tadbirlarni yaratish, sana va joylashuv ma’lumotlarini boshqarish, e’lon qilish, arxivlash va featured holatini boshqaring.",
    eventsAction: "Tadbirlarni boshqarish",

    guideTitle: "Germaniya qo‘llanmasi",
    guideDescription:
      "Guide maqolalari, kategoriyalar, rasmiy manbalar, FAQ, bosqichlar va tekshiruv sanalarini boshqaring.",
    guideAction: "Guide maqolalarini boshqarish",

    telegramTitle: "Telegram hamjamiyatlari",
    telegramDescription:
      "Bundeslandlar bo‘yicha Telegram guruhlari, havolalar, bot yoki guruh turi va mavjudlik holatini boshqaring.",
    telegramAction: "Telegram hamjamiyatlarini boshqarish",

    analyticsTitle: "Sayt analitikasi",
    analyticsDescription:
      "Sahifa ko‘rishlari, davlatlar, tillar, eng ko‘p ko‘rilgan sahifalar va oxirgi 30 kunlik trafikni kuzating.",
    analyticsAction: "Analitikani ko‘rish",

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
      "Nachrichten, Arbeit und Karriere, Dienstleistungen, Fachkräfte, Veranstaltungen, der Deutschland-Ratgeber, Telegram-Communitys und die Website-Analyse werden PostgreSQL-basiert verwaltet.",

    newsTitle: "Nachrichten",
    newsDescription:
      "Erstellen, bearbeiten, veröffentlichen und archivieren Sie Nachrichten und verwalten Sie den Featured-Status.",
    newsAction: "Nachrichten verwalten",

    jobsTitle: "Arbeit und Karriere",
    jobsDescription:
      "Erstellen, bearbeiten, veröffentlichen und archivieren Sie Jobleitfäden und verwalten Sie den Featured-Status.",
    jobsAction: "Jobleitfäden verwalten",

    servicesTitle: "Dienstleistungen",
    servicesDescription:
      "Verwalten Sie Übersetzung, Recht, Steuern, Medizin, Handwerk und weitere Dienstleistungsbereiche.",
    servicesAction: "Dienstleistungen verwalten",

    specialistsTitle: "Fachkräfte",
    specialistsDescription:
      "Verwalten Sie Fachkraftprofile, Kategorien, Sprachen, Standort und Verifizierungsstatus.",
    specialistsAction: "Fachkräfte verwalten",

    eventsTitle: "Veranstaltungen",
    eventsDescription:
      "Erstellen und verwalten Sie Veranstaltungen, Termine und Orte sowie Veröffentlichung, Archivierung und Featured-Status.",
    eventsAction: "Veranstaltungen verwalten",

    guideTitle: "Deutschland-Ratgeber",
    guideDescription:
      "Verwalten Sie Guide-Artikel, Kategorien, offizielle Quellen, FAQ, Schritte und Prüfdatum.",
    guideAction: "Guide-Artikel verwalten",

    telegramTitle: "Telegram-Communitys",
    telegramDescription:
      "Verwalten Sie Telegram-Gruppen nach Bundesland, Links, Bot- oder Gruppentyp und Verfügbarkeitsstatus.",
    telegramAction: "Telegram-Communitys verwalten",

    analyticsTitle: "Website-Analyse",
    analyticsDescription:
      "Beobachten Sie Seitenaufrufe, Länder, Sprachen, meistbesuchte Seiten und den Traffic der letzten 30 Tage.",
    analyticsAction: "Analyse ansehen",

    account: "Admin-Konto",
    role: "Rolle",
    status: "Status",
    active: "Aktiv",
    back: "Zur Website",
  },
} as const;

type AdminModuleHref =
  | "/admin/news"
  | "/admin/jobs"
  | "/admin/services"
  | "/admin/specialists"
  | "/admin/events"
  | "/admin/guide"
  | "/admin/telegram"
  | "/admin/analytics";

type AdminModuleTone =
  | "emerald"
  | "blue"
  | "violet"
  | "fuchsia"
  | "orange"
  | "teal"
  | "sky"
  | "cyan";

type AdminModuleCardProps = {
  href: AdminModuleHref;
  title: string;
  description: string;
  action: string;
  tone: AdminModuleTone;
};

const moduleToneClasses = {
  emerald: {
    card:
      "group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/60 hover:shadow-lg hover:shadow-emerald-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-emerald-500/25 dark:hover:bg-emerald-500/[0.06] dark:focus-visible:ring-offset-slate-900 sm:p-6",
    title:
      "text-xl font-black text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300",
    icon:
      "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-300 dark:group-hover:bg-emerald-500 dark:group-hover:text-white",
    action:
      "mt-5 text-sm font-bold text-emerald-700 dark:text-emerald-400",
  },

  blue: {
    card:
      "group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-lg hover:shadow-blue-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-blue-500/25 dark:hover:bg-blue-500/[0.06] dark:focus-visible:ring-offset-slate-900 sm:p-6",
    title:
      "text-xl font-black text-slate-950 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300",
    icon:
      "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-blue-100 font-black text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-300 dark:group-hover:bg-blue-500 dark:group-hover:text-white",
    action:
      "mt-5 text-sm font-bold text-blue-700 dark:text-blue-400",
  },

  violet: {
    card:
      "group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50/60 hover:shadow-lg hover:shadow-violet-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-violet-500/25 dark:hover:bg-violet-500/[0.06] dark:focus-visible:ring-offset-slate-900 sm:p-6",
    title:
      "text-xl font-black text-slate-950 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300",
    icon:
      "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-violet-100 font-black text-violet-700 transition group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-500/10 dark:text-violet-300 dark:group-hover:bg-violet-500 dark:group-hover:text-white",
    action:
      "mt-5 text-sm font-bold text-violet-700 dark:text-violet-400",
  },

  fuchsia: {
    card:
      "group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-fuchsia-200 hover:bg-fuchsia-50/60 hover:shadow-lg hover:shadow-fuchsia-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-fuchsia-500/25 dark:hover:bg-fuchsia-500/[0.06] dark:focus-visible:ring-offset-slate-900 sm:p-6",
    title:
      "text-xl font-black text-slate-950 transition-colors group-hover:text-fuchsia-700 dark:text-white dark:group-hover:text-fuchsia-300",
    icon:
      "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-100 font-black text-fuchsia-700 transition group-hover:bg-fuchsia-600 group-hover:text-white dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:group-hover:bg-fuchsia-500 dark:group-hover:text-white",
    action:
      "mt-5 text-sm font-bold text-fuchsia-700 dark:text-fuchsia-400",
  },

  orange: {
    card:
      "group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/60 hover:shadow-lg hover:shadow-orange-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-orange-500/25 dark:hover:bg-orange-500/[0.06] dark:focus-visible:ring-offset-slate-900 sm:p-6",
    title:
      "text-xl font-black text-slate-950 transition-colors group-hover:text-orange-700 dark:text-white dark:group-hover:text-orange-300",
    icon:
      "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 font-black text-orange-700 transition group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-500/10 dark:text-orange-300 dark:group-hover:bg-orange-500 dark:group-hover:text-white",
    action:
      "mt-5 text-sm font-bold text-orange-700 dark:text-orange-400",
  },

  teal: {
    card:
      "group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50/60 hover:shadow-lg hover:shadow-teal-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-teal-500/25 dark:hover:bg-teal-500/[0.06] dark:focus-visible:ring-offset-slate-900 sm:p-6",
    title:
      "text-xl font-black text-slate-950 transition-colors group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300",
    icon:
      "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-teal-100 font-black text-teal-700 transition group-hover:bg-teal-500 group-hover:text-white dark:bg-teal-500/10 dark:text-teal-300 dark:group-hover:bg-teal-500 dark:group-hover:text-white",
    action:
      "mt-5 text-sm font-bold text-teal-700 dark:text-teal-400",
  },

  sky: {
    card:
      "group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/60 hover:shadow-lg hover:shadow-sky-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-sky-500/25 dark:hover:bg-sky-500/[0.06] dark:focus-visible:ring-offset-slate-900 sm:p-6",
    title:
      "text-xl font-black text-slate-950 transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300",
    icon:
      "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 font-black text-sky-700 transition group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-500/10 dark:text-sky-300 dark:group-hover:bg-sky-500 dark:group-hover:text-white",
    action:
      "mt-5 text-sm font-bold text-sky-700 dark:text-sky-400",
  },

  cyan: {
    card:
      "group block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50/60 hover:shadow-lg hover:shadow-cyan-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950/50 dark:hover:border-cyan-500/25 dark:hover:bg-cyan-500/[0.06] dark:focus-visible:ring-offset-slate-900 sm:p-6",
    title:
      "text-xl font-black text-slate-950 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300",
    icon:
      "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 font-black text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:group-hover:bg-cyan-500 dark:group-hover:text-white",
    action:
      "mt-5 text-sm font-bold text-cyan-700 dark:text-cyan-400",
  },
} as const;

function AdminModuleCard({
  href,
  title,
  description,
  action,
  tone,
}: AdminModuleCardProps) {
  const styles =
    moduleToneClasses[tone];

  return (
    <Link
      href={href}
      className={styles.card}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <h2 className={styles.title}>
            {title}
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={styles.icon}
        >
          →
        </span>
      </div>

      <p className={styles.action}>
        {action} →
      </p>
    </Link>
  );
}

export default async function AdminPage() {
  const locale =
    await getLocale();

  const appLocale =
    locale === "de"
      ? "de"
      : "uz";

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  const admin =
    await requireAdmin(
      appLocale,
    );

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

              <div className="mt-6 grid gap-4">
                <AdminModuleCard
                  href="/admin/news"
                  title={currentCopy.newsTitle}
                  description={currentCopy.newsDescription}
                  action={currentCopy.newsAction}
                  tone="emerald"
                />

                <AdminModuleCard
                  href="/admin/jobs"
                  title={currentCopy.jobsTitle}
                  description={currentCopy.jobsDescription}
                  action={currentCopy.jobsAction}
                  tone="blue"
                />

                <AdminModuleCard
                  href="/admin/services"
                  title={currentCopy.servicesTitle}
                  description={currentCopy.servicesDescription}
                  action={currentCopy.servicesAction}
                  tone="violet"
                />

                <AdminModuleCard
                  href="/admin/specialists"
                  title={currentCopy.specialistsTitle}
                  description={currentCopy.specialistsDescription}
                  action={currentCopy.specialistsAction}
                  tone="fuchsia"
                />

                <AdminModuleCard
                  href="/admin/events"
                  title={currentCopy.eventsTitle}
                  description={currentCopy.eventsDescription}
                  action={currentCopy.eventsAction}
                  tone="orange"
                />

                <AdminModuleCard
                  href="/admin/guide"
                  title={currentCopy.guideTitle}
                  description={currentCopy.guideDescription}
                  action={currentCopy.guideAction}
                  tone="teal"
                />

                <AdminModuleCard
                  href="/admin/telegram"
                  title={currentCopy.telegramTitle}
                  description={currentCopy.telegramDescription}
                  action={currentCopy.telegramAction}
                  tone="sky"
                />

                <AdminModuleCard
                  href="/admin/analytics"
                  title={currentCopy.analyticsTitle}
                  description={currentCopy.analyticsDescription}
                  action={currentCopy.analyticsAction}
                  tone="cyan"
                />
              </div>
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
