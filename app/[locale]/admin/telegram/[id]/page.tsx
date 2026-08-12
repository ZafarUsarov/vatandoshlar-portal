import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import {
  updateTelegramGroupAction,
} from "@/app/[locale]/admin/telegram/[id]/actions";
import TelegramEditForm from "@/components/admin/telegram/TelegramEditForm";
import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminTelegramGroupById,
} from "@/lib/telegram/admin-telegram-repository";

export const dynamic =
  "force-dynamic";

type AdminTelegramEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    await getLocale();

  return {
    title:
      locale === "de"
        ? "Telegram-Community bearbeiten"
        : "Telegram hamjamiyatini tahrirlash",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const copy = {
  uz: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · TELEGRAM",
    title:
      "Telegram hamjamiyatini tahrirlash",
    description:
      "Bundesland ma’lumotlari, Telegram havolasi, bot/guruh turi, mavjudlik holati va UZ/DE custom kontentni boshqaring.",
    back:
      "Telegram boshqaruviga qaytish",
  },

  de: {
    eyebrow:
      "VATANDOSHLAR.DE · ADMIN · TELEGRAM",
    title:
      "Telegram-Community bearbeiten",
    description:
      "Bearbeiten Sie Bundesland-Daten, Telegram-Link, Bot-/Gruppentyp, Verfügbarkeit und benutzerdefinierte UZ/DE-Inhalte.",
    back:
      "Zur Telegram-Verwaltung",
  },
} as const;

export default async function AdminTelegramEditPage({
  params,
}: AdminTelegramEditPageProps) {
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

  const { id } =
    await params;

  const group =
    await getAdminTelegramGroupById(
      id,
    );

  if (!group) {
    notFound();
  }

  const currentCopy =
    appLocale === "de"
      ? copy.de
      : copy.uz;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <Link
            href="/admin/telegram"
            className="inline-flex text-sm font-bold text-sky-700 transition hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:text-sky-400 dark:hover:text-sky-300 dark:focus-visible:ring-offset-slate-900"
          >
            ← {currentCopy.back}
          </Link>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
            {currentCopy.eyebrow}
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {currentCopy.title}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            {currentCopy.description}
          </p>
        </header>

        <div className="mt-6">
          <TelegramEditForm
            locale={appLocale}
            group={group}
            formAction={
              updateTelegramGroupAction
            }
          />
        </div>
      </div>
    </main>
  );
}
