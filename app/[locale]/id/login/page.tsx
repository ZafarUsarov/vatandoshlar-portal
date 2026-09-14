import type {
  Metadata,
} from "next";

import {
  getLocale,
} from "next-intl/server";

import PublicLoginForm from "@/components/auth/PublicLoginForm";
import {
  Link,
  redirect,
} from "@/i18n/navigation";
import {
  getCurrentPublicUser,
} from "@/lib/auth/user";

export const metadata: Metadata = {
  title:
    "Vatandoshlar ID",
  robots: {
    index:
      false,
    follow:
      false,
  },
};

export default async function VatandoshlarIdLoginPage() {
  const locale =
    (await getLocale()) === "de"
      ? "de"
      : "uz";

  const currentUser =
    await getCurrentPublicUser();

  if (currentUser) {
    return redirect({
      href:
        "/account",
      locale,
    });
  }

  const copy =
    locale === "de"
      ? {
          eyebrow:
            "VATANDOSHLAR ID",
          title:
            "Bei Vatandoshlar.de anmelden",
          description:
            "Melden Sie sich an, damit Vatandoshlar.de Inhalte nach Ihrem Ort und Ihren Interessen personalisieren kann.",
          newUser:
            "Neu bei Vatandoshlar.de?",
          register:
            "Vatandoshlar ID erstellen",
          back:
            "Zur Startseite",
        }
      : {
          eyebrow:
            "VATANDOSHLAR ID",
          title:
            "Vatandoshlar.de hisobingizga kiring",
          description:
            "Shahringiz va qiziqishlaringiz asosida portalni sizga moslashtirish uchun Vatandoshlar ID bilan kiring.",
          newUser:
            "Vatandoshlar ID hali yo‘qmi?",
          register:
            "Vatandoshlar ID yaratish",
          back:
            "Bosh sahifaga qaytish",
        };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-md">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            {copy.eyebrow}
          </p>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            {copy.title}
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {copy.description}
          </p>

          <div className="mt-8">
            <PublicLoginForm
              locale={locale}
            />
          </div>

          <div className="mt-7 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {copy.newUser}
            </p>

            <Link
              href="/id/register"
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-emerald-600 px-5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-500/10 dark:focus-visible:ring-offset-slate-900"
            >
              {copy.register}
            </Link>

            <Link
              href="/"
              className="mt-4 block text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {copy.back}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
