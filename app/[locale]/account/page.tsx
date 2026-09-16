import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import AccountSignOutButton from "@/components/account/AccountSignOutButton";
import { Link } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";

export const metadata: Metadata = {
  title: "Vatandoshlar ID",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale);
  const profileComplete = Boolean(
    context.profile?.homeLocationId ||
    context.profile?.residencyStage ||
    context.interests.length > 0,
  );
  const hasHomeLocation = Boolean(context.profile?.homeLocationId);

  const copy = locale === "de"
    ? {
        eyebrow: "VATANDOSHLAR ID",
        title: "Ihr Konto ist aktiv",
        description: "Ihre Vatandoshlar ID ist bereit. Ergänzen Sie Ihr Profil, damit wir Inhalte später besser personalisieren können.",
        email: "E-Mail",
        profile: profileComplete ? "Profil bearbeiten" : "Profil einrichten",
        myCity: "Meine Stadt",
        myCityDisabled: "Wählen Sie zuerst einen Wohnort in Ihrem Profil aus.",
        home: "Zur Startseite",
      }
    : {
        eyebrow: "VATANDOSHLAR ID",
        title: "Akkauntingiz faol",
        description: "Vatandoshlar ID tayyor. Portalni sizga moslashtirish uchun profilingizni to‘ldiring.",
        email: "E-mail",
        profile: profileComplete ? "Profilni tahrirlash" : "Profilni sozlash",
        myCity: "Mening shahrim",
        myCityDisabled: "Avval profilingizda yashash joyingizni tanlang.",
        home: "Bosh sahifaga qaytish",
      };

  const buttonBase = "inline-flex min-h-11 items-center justify-center rounded-2xl px-5 text-sm font-bold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:focus-visible:ring-offset-slate-950";

  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="relative mx-auto max-w-2xl rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-slate-900/8 backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/90 sm:p-9">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{copy.eyebrow}</p>
        <h1 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-white sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">{copy.description}</p>

        <dl className="mt-8 rounded-[1.5rem] border border-slate-200/90 bg-slate-50/80 p-5 shadow-inner shadow-slate-900/[0.02] dark:border-slate-800 dark:bg-slate-950/50">
          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{copy.email}</dt>
          <dd className="mt-2 break-all font-semibold text-slate-950 dark:text-white">{context.user.email}</dd>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {hasHomeLocation ? (
            <Link href="/my-city" className={`${buttonBase} bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/10 hover:from-emerald-500 hover:to-teal-500`}>
              {copy.myCity}
            </Link>
          ) : (
            <div className="sm:max-w-xs">
              <span aria-disabled="true" className={`${buttonBase} w-full cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-500`}>
                {copy.myCity}
              </span>
              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{copy.myCityDisabled}</p>
            </div>
          )}

          <Link href="/account/profile" className={`${buttonBase} border border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-800/70 dark:bg-emerald-950/30 dark:text-emerald-200 dark:hover:bg-emerald-950/50`}>
            {copy.profile}
          </Link>

          <Link href="/" className={`${buttonBase} border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800`}>
            {copy.home}
          </Link>
        </div>

        <div className="mt-5 border-t border-slate-200/80 pt-5 dark:border-slate-800">
          <AccountSignOutButton locale={locale} />
        </div>
      </div>
    </main>
  );
}
