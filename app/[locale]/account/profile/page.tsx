import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import ProfileNavigation from "@/components/account/ProfileNavigation";
import ProfileSetupForm from "@/components/account/ProfileSetupForm";
import { requirePublicUser } from "@/lib/auth/user";
import { getActiveProfileLocations } from "@/lib/locations/location-repository";
import { interestOptions, residencyStageOptions } from "@/lib/users/profile-options";

export const metadata: Metadata = {
  title: "Vatandoshlar ID profil",
  robots: { index: false, follow: false },
};

export default async function AccountProfilePage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";

  const [context, locations] = await Promise.all([
    requirePublicUser(locale),
    getActiveProfileLocations(),
  ]);

  const copy = locale === "de"
    ? {
        eyebrow: "VATANDOSHLAR ID",
        title: "Profil personalisieren",
        description: "Wählen Sie Ihren Wohnort, Ihre aktuelle Situation und Ihre Interessen. So kann Vatandoshlar.de Inhalte besser auf Sie abstimmen.",
      }
    : {
        eyebrow: "VATANDOSHLAR ID",
        title: "Profilni moslashtiring",
        description: "Yashash joyingiz, hozirgi holatingiz va qiziqishlaringizni tanlang. Bu Vatandoshlar.de’ga sizga mos lokal va foydali kontentni ko‘rsatishga yordam beradi.",
      };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <ProfileNavigation locale={locale} />
        <div className="rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-2xl shadow-slate-900/8 backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/90 sm:p-9">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{copy.eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black tracking-[-0.03em] text-slate-950 dark:text-white sm:text-4xl">{copy.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">{copy.description}</p>

          <div className="mt-8">
            <ProfileSetupForm
              locale={locale}
              context={context}
              locations={locations}
              residencyOptions={residencyStageOptions.map((option) => ({
                value: option.value,
                label: locale === "de" ? option.de : option.uz,
              }))}
              interestOptions={interestOptions.map((option) => ({
                value: option.value,
                label: locale === "de" ? option.de : option.uz,
              }))}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
