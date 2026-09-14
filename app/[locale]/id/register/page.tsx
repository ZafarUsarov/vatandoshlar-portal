import type {
  Metadata,
} from "next";

import {
  getLocale,
} from "next-intl/server";

import PublicRegisterForm from "@/components/auth/PublicRegisterForm";
import {
  Link,
  redirect,
} from "@/i18n/navigation";
import {
  getCurrentPublicUser,
} from "@/lib/auth/user";

export const metadata: Metadata = {
  title:
    "Vatandoshlar ID yaratish",
  robots: {
    index:
      false,
    follow:
      false,
  },
};

export default async function VatandoshlarIdRegisterPage() {
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
            "Vatandoshlar ID erstellen",
          description:
            "Erstellen Sie Ihr Konto. Ort und Interessen werden erst in den nächsten Profil-Schritten ergänzt.",
          login:
            "Bereits registriert? Anmelden",
          privacy:
            "Wir speichern in diesem Schritt nur die für das Konto notwendigen Angaben.",
        }
      : {
          eyebrow:
            "VATANDOSHLAR ID",
          title:
            "Vatandoshlar ID yarating",
          description:
            "Akkauntingizni yarating. Shahar va qiziqishlar keyingi profil bosqichida qo‘shiladi.",
          login:
            "Akkauntingiz bormi? Kirish",
          privacy:
            "Bu bosqichda faqat akkaunt uchun zarur ma’lumotlar saqlanadi.",
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
            <PublicRegisterForm
              locale={locale}
            />
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {copy.privacy}
          </p>

          <div className="mt-6 text-center text-sm">
            <Link
              href="/id/login"
              className="font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-300"
            >
              {copy.login}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
