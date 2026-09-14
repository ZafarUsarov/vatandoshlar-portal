import type {
  Metadata,
} from "next";

import {
  getLocale,
} from "next-intl/server";

import PublicSignOutButton from "@/components/auth/PublicSignOutButton";
import {
  Link,
} from "@/i18n/navigation";
import {
  requirePublicUser,
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

export default async function AccountPage() {
  const locale =
    (await getLocale()) === "de"
      ? "de"
      : "uz";

  const context =
    await requirePublicUser(
      locale,
    );

  const copy =
    locale === "de"
      ? {
          eyebrow:
            "VATANDOSHLAR ID",
          title:
            "Ihr Konto ist aktiv",
          description:
            "Ihre Vatandoshlar ID ist bereit. Ergänzen Sie Ihr Profil, damit wir Inhalte besser personalisieren können.",
          email:
            "E-Mail",
          profile:
            context.completion.isComplete
              ? "Profil bearbeiten"
              : "Profil einrichten",
          myCity:
            "Meine Stadt",
          home:
            "Zur Startseite",
        }
      : {
          eyebrow:
            "VATANDOSHLAR ID",
          title:
            "Akkauntingiz faol",
          description:
            "Vatandoshlar ID tayyor. Portalni sizga moslashtirish uchun profilingizni to‘ldiring.",
          email:
            "E-mail",
          profile:
            context.completion.isComplete
              ? "Profilni tahrirlash"
              : "Profilni sozlash",
          myCity:
            "Mening shahrim",
          home:
            "Bosh sahifaga qaytish",
        };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          {copy.eyebrow}
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          {copy.title}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
          {copy.description}
        </p>

        <dl className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            {copy.email}
          </dt>

          <dd className="mt-2 break-all font-semibold text-slate-950 dark:text-white">
            {context.user.email}
          </dd>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/my-city"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            {copy.myCity}
          </Link>

          <Link
            href="/account/profile"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-500"
          >
            {copy.profile}
          </Link>

          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {copy.home}
          </Link>

          <PublicSignOutButton
            locale={locale}
          />
        </div>
      </div>
    </main>
  );
}
