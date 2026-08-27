import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminSupportContributions,
  type AdminSupportContribution,
  type SupportContributionStatus,
} from "@/lib/support/admin-support-repository";

import { updateSupportStatusAction } from "./actions";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === "de"
        ? "Unterstützung verwalten"
        : "Supportni boshqarish",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · SUPPORT",
    title: "Support contributionlarni boshqarish",
    description:
      "Real PayPal va Taps contributionlarini saqlang. Public ranking tasdiqlangan transactionlardan avtomatik hisoblanadi.",
    back: "Boshqaruv paneliga qaytish",
    create: "Yangi contribution",
    totalReceived: "Tasdiqlangan jami",
    transactions: "Transactionlar",
    publicSupporters: "Public supporterlar",
    emptyTitle: "Hozircha contribution yo‘q",
    emptyDescription:
      "Birinchi real support transactionini qo‘shishingiz mumkin.",
    edit: "Tahrirlash",
    confirm: "Tasdiqlash",
    cancel: "Bekor qilish",
    anonymous: "Anonymous",
    payment: "To‘lov",
    original: "Original",
    eurValue: "EUR qiymati",
    date: "Sana",
    visibility: "Ko‘rinish",
    statuses: {
      confirmed: "Tasdiqlangan",
      cancelled: "Bekor qilingan",
    },
  },
  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · UNTERSTÜTZUNG",
    title: "Unterstützungsbeiträge verwalten",
    description:
      "Verwalten Sie reale PayPal- und Taps-Beiträge. Die öffentliche Rangliste wird automatisch aus bestätigten Transaktionen berechnet.",
    back: "Zurück zum Verwaltungsbereich",
    create: "Neuen Beitrag",
    totalReceived: "Bestätigte Summe",
    transactions: "Transaktionen",
    publicSupporters: "Öffentliche Unterstützer",
    emptyTitle: "Noch keine Beiträge vorhanden",
    emptyDescription:
      "Sie können die erste reale Support-Transaktion erfassen.",
    edit: "Bearbeiten",
    confirm: "Bestätigen",
    cancel: "Stornieren",
    anonymous: "Anonym",
    payment: "Zahlung",
    original: "Original",
    eurValue: "EUR-Wert",
    date: "Datum",
    visibility: "Sichtbarkeit",
    statuses: {
      confirmed: "Bestätigt",
      cancelled: "Storniert",
    },
  },
} as const;

function formatMoney(
  cents: number,
  locale: "uz" | "de",
): string {
  return new Intl.NumberFormat(
    locale === "de" ? "de-DE" : "uz-UZ",
    {
      style: "currency",
      currency: "EUR",
    },
  ).format(cents / 100);
}

function formatOriginalAmount(
  contribution: AdminSupportContribution,
  locale: "uz" | "de",
): string {
  if (contribution.currency === "EUR") {
    return formatMoney(
      contribution.amountMinor,
      locale,
    );
  }

  return `${new Intl.NumberFormat(
    locale === "de" ? "de-DE" : "uz-UZ",
  ).format(contribution.amountMinor)} UZS`;
}

function formatDate(
  value: string,
  locale: "uz" | "de",
): string {
  return new Intl.DateTimeFormat(
    locale === "de" ? "de-DE" : "uz-UZ",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(new Date(value));
}

function getStatusClassName(
  status: SupportContributionStatus,
): string {
  return status === "confirmed"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
    : "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
}

export default async function AdminSupportPage() {
  const locale = await getLocale();

  const appLocale =
    locale === "de" ? "de" : "uz";

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  await requireAdmin(appLocale);

  const contributions =
    await getAdminSupportContributions();

  const confirmed =
    contributions.filter(
      (item) =>
        item.status === "confirmed",
    );

  const totalEurCents =
    confirmed.reduce(
      (total, item) =>
        total + item.amountEurCents,
      0,
    );

  const publicSupporterCount =
    new Set(
      confirmed
        .filter(
          (item) =>
            item.visibility === "public" &&
            item.supporterName,
        )
        .map((item) =>
          item.supporterName!
            .trim()
            .toLocaleLowerCase(),
        ),
    ).size;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Link
            href="/admin"
            className="inline-flex text-sm font-bold text-emerald-700 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {currentCopy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {currentCopy.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.description}
              </p>
            </div>

            <Link
              href="/admin/support/new"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              {currentCopy.create}
            </Link>
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-950/60">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                {currentCopy.totalReceived}
              </dt>
              <dd className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                {formatMoney(
                  totalEurCents,
                  appLocale,
                )}
              </dd>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-950/60">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                {currentCopy.transactions}
              </dt>
              <dd className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                {confirmed.length}
              </dd>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-950/60">
              <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                {currentCopy.publicSupporters}
              </dt>
              <dd className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                {publicSupporterCount}
              </dd>
            </div>
          </dl>
        </header>

        <section
          aria-label={currentCopy.title}
          className="mt-6"
        >
          {contributions.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-12">
              <div
                aria-hidden="true"
                className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-black text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
              >
                €
              </div>

              <h2 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
                {currentCopy.emptyTitle}
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.emptyDescription}
              </p>

              <Link
                href="/admin/support/new"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.create}
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {contributions.map(
                (contribution) => (
                  <article
                    key={contribution.id}
                    className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClassName(
                              contribution.status,
                            )}`}
                          >
                            {
                              currentCopy.statuses[
                                contribution.status
                              ]
                            }
                          </span>

                          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {
                              contribution.paymentMethod
                            }
                          </span>
                        </div>

                        <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                          {contribution.visibility ===
                          "anonymous"
                            ? currentCopy.anonymous
                            : contribution.supporterName}
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link
                            href={`/admin/support/${contribution.id}/edit`}
                            className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-emerald-200 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/30 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900"
                          >
                            {currentCopy.edit}
                          </Link>

                          <form
                            action={
                              updateSupportStatusAction
                            }
                          >
                            <input
                              type="hidden"
                              name="contributionId"
                              value={contribution.id}
                            />
                            <input
                              type="hidden"
                              name="targetStatus"
                              value={
                                contribution.status ===
                                "confirmed"
                                  ? "cancelled"
                                  : "confirmed"
                              }
                            />
                            <button
                              type="submit"
                              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
                            >
                              {contribution.status ===
                              "confirmed"
                                ? currentCopy.cancel
                                : currentCopy.confirm}
                            </button>
                          </form>
                        </div>
                      </div>

                      <dl className="grid shrink-0 gap-3 text-sm sm:grid-cols-2 lg:min-w-[28rem]">
                        <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            {currentCopy.original}
                          </dt>
                          <dd className="mt-1 font-bold text-slate-900 dark:text-white">
                            {formatOriginalAmount(
                              contribution,
                              appLocale,
                            )}
                          </dd>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            {currentCopy.eurValue}
                          </dt>
                          <dd className="mt-1 font-bold text-slate-900 dark:text-white">
                            {formatMoney(
                              contribution.amountEurCents,
                              appLocale,
                            )}
                          </dd>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            {currentCopy.date}
                          </dt>
                          <dd className="mt-1 font-bold text-slate-900 dark:text-white">
                            {formatDate(
                              contribution.contributedAt,
                              appLocale,
                            )}
                          </dd>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/60">
                          <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            {currentCopy.visibility}
                          </dt>
                          <dd className="mt-1 font-bold text-slate-900 dark:text-white">
                            {contribution.visibility}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
