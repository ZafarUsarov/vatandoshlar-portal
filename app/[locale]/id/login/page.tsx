import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import PublicLoginForm from "@/components/auth/PublicLoginForm";
import { Link, redirect } from "@/i18n/navigation";
import { getCurrentPublicUser } from "@/lib/auth/user";

export const metadata: Metadata = {
  title: "Vatandoshlar ID",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginSearchParams = Readonly<{
  oauthError?: string;
  returnTo?: string;
}>;

function getSafeReturnTo(
  value: string | undefined,
): string {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/account";
  }

  return value;
}

export default async function VatandoshlarIdLoginPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<LoginSearchParams>;
}>) {
  const locale =
    (await getLocale()) === "de"
      ? "de"
      : "uz";

  const {
    oauthError,
    returnTo: rawReturnTo,
  } = await searchParams;

  const returnTo =
    getSafeReturnTo(rawReturnTo);

  const currentUser =
    await getCurrentPublicUser();

  if (currentUser) {
    return redirect({
      href: returnTo,
      locale,
    });
  }

  const copy =
    locale === "de"
      ? {
          eyebrow: "VATANDOSHLAR ID",
          title:
            "Bei Vatandoshlar.de anmelden",
          description:
            "Bleiben Sie im Portal und melden Sie sich mit Ihrer Vatandoshlar ID oder einem bereits verbundenen Google-Konto an.",
          newUser:
            "Noch kein Konto?",
          register:
            "Konto erstellen",
          back:
            "Zur Startseite",
          notLinked:
            "Dieses Google-Konto ist noch nicht registriert. Erstellen Sie zuerst ein Konto und wählen Sie dort Google.",
          googleUnverified:
            "Google konnte keine bestätigte E-Mail-Adresse bereitstellen.",
        }
      : {
          eyebrow: "VATANDOSHLAR ID",
          title:
            "Vatandoshlar.de hisobingizga kiring",
          description:
            "Portaldan uzilmasdan Vatandoshlar ID yoki avval bog‘langan Google hisobingiz orqali kiring.",
          newUser:
            "Hali hisobingiz yo‘qmi?",
          register:
            "Hisob yaratish",
          back:
            "Bosh sahifaga qaytish",
          notLinked:
            "Bu Google hisobi hali ro‘yxatdan o‘tmagan. Avval «Hisob yaratish» sahifasida Google orqali ro‘yxatdan o‘ting.",
          googleUnverified:
            "Google tasdiqlangan e-mail manzilini taqdim etmadi.",
        };

  const oauthMessage =
    oauthError === "not_linked"
      ? copy.notLinked
      : oauthError ===
          "google_unverified"
        ? copy.googleUnverified
        : null;

  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />
      </div>

      <div className="relative mx-auto max-w-md">
        <div className="rounded-[2rem] border border-white/80 bg-white/95 p-6 shadow-2xl shadow-slate-900/8 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            {copy.eyebrow}
          </p>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            {copy.title}
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {copy.description}
          </p>

          {oauthMessage && (
            <p
              role="alert"
              className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
            >
              {oauthMessage}
            </p>
          )}

          <div className="mt-8">
            <PublicLoginForm
              locale={locale}
              returnTo={returnTo}
            />
          </div>

          <div className="mt-7 border-t border-slate-200 pt-6 dark:border-slate-800">
            <p className="mb-3 text-center text-sm text-slate-600 dark:text-slate-300">
              {copy.newUser}
            </p>
            <Link
              href="/id/register"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-emerald-600 bg-emerald-50 px-5 py-3 text-center text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/20 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:bg-emerald-500/20"
            >
              {copy.register}
            </Link>
          </div>

          <Link
            href="/"
            className="mt-6 flex justify-center text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            ← {copy.back}
          </Link>
        </div>
      </div>
    </main>
  );
}