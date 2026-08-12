import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminTelegramGroups,
  type AdminTelegramRecordStatus,
} from "@/lib/telegram/admin-telegram-repository";

import {
  updateTelegramGroupStatusAction,
  updateTelegramRecordStatusAction,
} from "./actions";

export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title:
    "Telegram Admin | Vatandoshlar.de",
  robots: {
    index: false,
    follow: false,
  },
};

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · TELEGRAM",
    title:
      "Telegram hamjamiyatlarini boshqarish",
    description:
      "Bundeslandlar bo‘yicha Telegram hamjamiyatlarini PostgreSQL orqali tahrirlang va lifecycle holatini boshqaring.",
    note:
      "Record status public visibility uchun, guruh holati esa real Telegram mavjudligi uchun ishlatiladi.",
    back:
      "Admin panelga qaytish",
    publicPage:
      "Public Telegram",
    total:
      "Jami",
    active:
      "Faol guruh",
    comingSoon:
      "Tez orada",
    published:
      "Public",
    shortName:
      "Kod",
    bundesland:
      "Bundesland",
    link:
      "Telegram",
    buttonType:
      "Turi",
    updated:
      "Yangilangan",
    noLink:
      "Havola yo‘q",
    bot:
      "Bot",
    group:
      "Guruh",
    edit:
      "Tahrirlash",
    publish:
      "Public qilish",
    draft:
      "Qoralamaga qaytarish",
    archive:
      "Arxivlash",
    restore:
      "Qoralamaga tiklash",
    makeActive:
      "Faol qilish",
    makeComingSoon:
      "Tez orada qilish",
    statuses: {
      draft:
        "Qoralama",
      published:
        "Public",
      archived:
        "Arxivlangan",
    },
  },

  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · TELEGRAM",
    title:
      "Telegram-Communitys verwalten",
    description:
      "Bearbeiten Sie Telegram-Communitys nach Bundesland in PostgreSQL und verwalten Sie deren Lifecycle.",
    note:
      "Der Datensatzstatus steuert die öffentliche Sichtbarkeit; der Gruppenstatus beschreibt die tatsächliche Telegram-Verfügbarkeit.",
    back:
      "Zur Admin-Übersicht",
    publicPage:
      "Öffentliche Telegram-Seite",
    total:
      "Gesamt",
    active:
      "Aktive Gruppen",
    comingSoon:
      "Demnächst",
    published:
      "Öffentlich",
    shortName:
      "Code",
    bundesland:
      "Bundesland",
    link:
      "Telegram",
    buttonType:
      "Typ",
    updated:
      "Aktualisiert",
    noLink:
      "Kein Link",
    bot:
      "Bot",
    group:
      "Gruppe",
    edit:
      "Bearbeiten",
    publish:
      "Veröffentlichen",
    draft:
      "Als Entwurf setzen",
    archive:
      "Archivieren",
    restore:
      "Als Entwurf wiederherstellen",
    makeActive:
      "Aktiv setzen",
    makeComingSoon:
      "Als demnächst setzen",
    statuses: {
      draft:
        "Entwurf",
      published:
        "Öffentlich",
      archived:
        "Archiviert",
    },
  },
} as const;

function formatDateTime(
  value: string,
  locale: "uz" | "de",
): string {
  return new Intl.DateTimeFormat(
    locale === "uz"
      ? "uz-UZ"
      : "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(
    new Date(value),
  );
}

function getStatusClasses(
  status: AdminTelegramRecordStatus,
): string {
  if (
    status === "published"
  ) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  if (
    status === "archived"
  ) {
    return "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300";
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300";
}

export default async function AdminTelegramPage() {
  const locale =
    await getLocale();

  const appLocale:
    | "uz"
    | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(
    appLocale,
  );

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  const groups =
    await getAdminTelegramGroups();

  const activeCount =
    groups.filter(
      (group) =>
        group.groupStatus === "active",
    ).length;

  const comingSoonCount =
    groups.filter(
      (group) =>
        group.groupStatus === "coming-soon",
    ).length;

  const publishedCount =
    groups.filter(
      (group) =>
        group.status === "published",
    ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                {currentCopy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {currentCopy.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.description}
              </p>

              <p className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
                {currentCopy.note}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {currentCopy.back}
              </Link>

              <Link
                href="/telegram"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-sky-600 px-4 text-sm font-bold text-white transition hover:bg-sky-500"
              >
                {currentCopy.publicPage}
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: currentCopy.total,
              value: groups.length,
            },
            {
              label: currentCopy.active,
              value: activeCount,
            },
            {
              label: currentCopy.comingSoon,
              value: comingSoonCount,
            },
            {
              label: currentCopy.published,
              value: publishedCount,
            },
          ].map(
            (item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                  {item.value}
                </p>
              </div>
            ),
          )}
        </section>

        <section className="mt-6 grid gap-4">
          {groups.map(
            (group) => (
              <article
                key={group.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                      group.status,
                    )}`}
                  >
                    {
                      currentCopy.statuses[
                        group.status
                      ]
                    }
                  </span>

                  <span
                    className={
                      group.groupStatus === "active"
                        ? "inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300"
                        : "inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }
                  >
                    {group.groupStatus === "active"
                      ? currentCopy.active
                      : currentCopy.comingSoon}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-950 dark:text-white">
                      {group.customNameUz ??
                        group.bundesland}
                    </h2>

                    {group.customNameDe && (
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {group.customNameDe}
                      </p>
                    )}
                  </div>

                  <span className="inline-flex w-fit rounded-xl bg-slate-100 px-3 py-2 font-mono text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {group.shortName}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/admin/telegram/${group.id}`}
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500/30 dark:hover:text-sky-300"
                  >
                    {currentCopy.edit}
                  </Link>

                  {group.status === "draft" && (
                    <>
                      <form action={updateTelegramRecordStatusAction}>
                        <input type="hidden" name="groupId" value={group.id} />
                        <input type="hidden" name="targetStatus" value="published" />
                        <button
                          type="submit"
                          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                        >
                          {currentCopy.publish}
                        </button>
                      </form>

                      <form action={updateTelegramRecordStatusAction}>
                        <input type="hidden" name="groupId" value={group.id} />
                        <input type="hidden" name="targetStatus" value="archived" />
                        <button
                          type="submit"
                          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
                        >
                          {currentCopy.archive}
                        </button>
                      </form>
                    </>
                  )}

                  {group.status === "published" && (
                    <>
                      <form action={updateTelegramRecordStatusAction}>
                        <input type="hidden" name="groupId" value={group.id} />
                        <input type="hidden" name="targetStatus" value="draft" />
                        <button
                          type="submit"
                          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        >
                          {currentCopy.draft}
                        </button>
                      </form>

                      <form action={updateTelegramRecordStatusAction}>
                        <input type="hidden" name="groupId" value={group.id} />
                        <input type="hidden" name="targetStatus" value="archived" />
                        <button
                          type="submit"
                          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
                        >
                          {currentCopy.archive}
                        </button>
                      </form>
                    </>
                  )}

                  {group.status === "archived" && (
                    <form action={updateTelegramRecordStatusAction}>
                      <input type="hidden" name="groupId" value={group.id} />
                      <input type="hidden" name="targetStatus" value="draft" />
                      <button
                        type="submit"
                        className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      >
                        {currentCopy.restore}
                      </button>
                    </form>
                  )}

                  {group.groupStatus === "active" ? (
                    <form action={updateTelegramGroupStatusAction}>
                      <input type="hidden" name="groupId" value={group.id} />
                      <input type="hidden" name="targetGroupStatus" value="coming-soon" />
                      <button
                        type="submit"
                        className="inline-flex min-h-10 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700 transition hover:bg-sky-100 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300"
                      >
                        {currentCopy.makeComingSoon}
                      </button>
                    </form>
                  ) : (
                    group.href && (
                      <form action={updateTelegramGroupStatusAction}>
                        <input type="hidden" name="groupId" value={group.id} />
                        <input type="hidden" name="targetGroupStatus" value="active" />
                        <button
                          type="submit"
                          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700 transition hover:bg-sky-100 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300"
                        >
                          {currentCopy.makeActive}
                        </button>
                      </form>
                    )
                  )}
                </div>

                <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="font-medium text-slate-500 dark:text-slate-400">
                      {currentCopy.bundesland}
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                      {group.bundesland}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-medium text-slate-500 dark:text-slate-400">
                      {currentCopy.link}
                    </dt>
                    <dd className="mt-1">
                      {group.href ? (
                        <a
                          href={group.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-sky-700 hover:underline dark:text-sky-400"
                        >
                          Telegram ↗
                        </a>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400">
                          {currentCopy.noLink}
                        </span>
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-medium text-slate-500 dark:text-slate-400">
                      {currentCopy.buttonType}
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                      {group.buttonType === "bot"
                        ? currentCopy.bot
                        : currentCopy.group}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-medium text-slate-500 dark:text-slate-400">
                      {currentCopy.updated}
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                      {formatDateTime(
                        group.updatedAt,
                        appLocale,
                      )}
                    </dd>
                  </div>
                </dl>
              </article>
            ),
          )}
        </section>
      </div>
    </main>
  );
}
