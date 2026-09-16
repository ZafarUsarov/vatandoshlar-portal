import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import PublicRegisterForm from "@/components/auth/PublicRegisterForm";
import { Link, redirect } from "@/i18n/navigation";
import { getCurrentPublicUser } from "@/lib/auth/user";

export const metadata: Metadata = { title: "Vatandoshlar.de hisobini yaratish", robots: { index: false, follow: false } };

export default async function VatandoshlarIdRegisterPage({ searchParams }: Readonly<{ searchParams: Promise<{ oauthError?: string; privacyError?: string }> }>) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const currentUser = await getCurrentPublicUser();
  if (currentUser) return redirect({ href: "/account", locale });
  const query = await searchParams;

  const copy = locale === "de"
    ? {
        eyebrow: "VATANDOSHLAR ID",
        title: "Vatandoshlar.de Konto erstellen",
        description: "Erstellen Sie ein Konto mit E-Mail und Passwort oder mit Google. Danach können Sie Ihr Profil personalisieren.",
        login: "Sie haben bereits ein Konto? Anmelden",
        privacyError: "Bitte bestätigen Sie die Datenschutzerklärung, bevor Sie fortfahren.",
        emailConflict: "Für diese E-Mail-Adresse besteht bereits eine Vatandoshlar ID. Aus Sicherheitsgründen wird sie nicht automatisch mit Google verknüpft.",
        googleUnverified: "Google konnte keine bestätigte E-Mail-Adresse bereitstellen.",
      }
    : {
        eyebrow: "VATANDOSHLAR ID",
        title: "Vatandoshlar.de hisobini yarating",
        description: "E-mail va parol yoki Google orqali hisob yarating. Keyingi bosqichda profilingizni moslashtirishingiz mumkin.",
        login: "Hisobingiz bormi? Kirish",
        privacyError: "Davom etishdan oldin Maxfiylik siyosati bilan tanishganingizni tasdiqlang.",
        emailConflict: "Bu e-mail bilan Vatandoshlar ID mavjud. Xavfsizlik uchun u Google hisobiga avtomatik bog‘lanmaydi.",
        googleUnverified: "Google tasdiqlangan e-mail manzilini taqdim etmadi.",
      };

  const oauthMessage = query.privacyError === "1"
    ? copy.privacyError
    : query.oauthError === "email_conflict" || query.oauthError === "admin_email_conflict"
      ? copy.emailConflict
      : query.oauthError === "google_unverified"
        ? copy.googleUnverified
        : null;

  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 sm:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"><div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" /></div>
      <div className="relative mx-auto max-w-md">
        <div className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-2xl shadow-slate-900/8 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{copy.eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{copy.title}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{copy.description}</p>
          {oauthMessage && <p role="alert" className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">{oauthMessage}</p>}
          <div className="mt-8"><PublicRegisterForm locale={locale} /></div>
          <div className="mt-7 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
            <Link href="/id/login" className="font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-300">{copy.login}</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
