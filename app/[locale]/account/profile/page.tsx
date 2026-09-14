import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import ProfileSetupForm from "@/components/account/ProfileSetupForm";
import { requirePublicUser } from "@/lib/auth/user";
import { getActiveCities } from "@/lib/locations/location-repository";
import { interestOptions, residencyStageOptions } from "@/lib/users/profile-options";

export const metadata: Metadata = {
  title: "Vatandoshlar ID profil",
  robots: { index: false, follow: false },
};

export default async function AccountProfilePage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";

  const [context, cities] = await Promise.all([
    requirePublicUser(locale),
    getActiveCities(),
  ]);

  const copy = locale === "de"
    ? {
        eyebrow: "VATANDOSHLAR ID",
        title: "Profil personalisieren",
        description: "Diese Angaben helfen Vatandoshlar.de, später lokale und relevante Inhalte für Sie auszuwählen.",
      }
    : {
        eyebrow: "VATANDOSHLAR ID",
        title: "Profilni moslashtiring",
        description: "Bu ma’lumotlar Vatandoshlar.de’ga sizga mos lokal va foydali kontentni tanlashga yordam beradi.",
      };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{copy.eyebrow}</p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{copy.title}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{copy.description}</p>

          <div className="mt-8">
            <ProfileSetupForm
              locale={locale}
              context={context}
              cities={cities}
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
