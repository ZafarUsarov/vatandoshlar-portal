"use client";

import { useActionState, useMemo, useState } from "react";
import { initialProfileSetupState, saveProfileSetupAction } from "@/app/[locale]/account/profile/actions";
import type { Location } from "@/types/location";
import type { PublicUserContext } from "@/types/user";

type Option = Readonly<{ value: string; label: string }>;
type CountryCode = "DE" | "UZ";

type Props = Readonly<{
  locale: "uz" | "de";
  context: PublicUserContext;
  locations: ReadonlyArray<Location>;
  residencyOptions: ReadonlyArray<Option>;
  interestOptions: ReadonlyArray<Option>;
}>;

const controlClass = "min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-900 dark:disabled:text-slate-600";

function SectionIcon({ kind }: Readonly<{ kind: "location" | "stage" | "interests" }>) {
  const path = kind === "location"
    ? "M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    : kind === "stage"
      ? "M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 5v4l3 2"
      : "M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a5.5 5.5 0 0 1 11 0m0 0a4.5 4.5 0 0 1 7 0";

  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
      <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    </span>
  );
}

export default function ProfileSetupForm({
  locale,
  context,
  locations,
  residencyOptions,
  interestOptions,
}: Props) {
  const [state, formAction, pending] = useActionState(saveProfileSetupAction, initialProfileSetupState);
  const selectedInterests = new Set(context.interests);
  const currentLocation = context.homeLocation;
  const initialCountry: CountryCode = currentLocation?.countryCode === "UZ" ? "UZ" : "DE";
  const [country, setCountry] = useState<CountryCode>(initialCountry);
  const [stateCode, setStateCode] = useState(currentLocation?.stateCode ?? "");
  const [homeLocationId, setHomeLocationId] = useState(context.profile?.homeLocationId ?? "");

  const regions = useMemo(
    () => locations.filter((location) => location.countryCode === country && location.type === "state"),
    [country, locations],
  );
  const cities = useMemo(
    () => locations.filter((location) => location.countryCode === country && location.type === "city" && location.stateCode === stateCode),
    [country, locations, stateCode],
  );

  const copy = locale === "de"
    ? {
        name: "Name", location: "Mein Wohnort", locationHint: "Wählen Sie zuerst das Land und die Region, danach den verfügbaren kanonischen Ort.", country: "Land", countryPlaceholder: "Land auswählen", germany: "Deutschland", uzbekistan: "Usbekistan", region: "Region / Bundesland", regionPlaceholder: "Region auswählen", city: "Wohnort", cityPlaceholder: "Ort auswählen", noCities: "Für diese Region sind noch keine verifizierten Orte verfügbar.", stage: "Meine Situation", stageHint: "Diese Angabe hilft bei späterer Personalisierung.", stagePlaceholder: "Optional auswählen", interests: "Meine Interessen", interestsHint: "Wählen Sie Themen, die für Sie relevant sind.", submit: "Profil speichern", pending: "Wird gespeichert…",
      }
    : {
        name: "Ism", location: "Joylashuvim", locationHint: "Avval mamlakat va regionni, keyin mavjud canonical yashash joyini tanlang.", country: "Mamlakat", countryPlaceholder: "Mamlakatni tanlang", germany: "Germaniya", uzbekistan: "O‘zbekiston", region: "Region / Bundesland / Viloyat", regionPlaceholder: "Regionni tanlang", city: "Yashash joyim", cityPlaceholder: "Joylashuvni tanlang", noCities: "Bu region uchun hali tekshirilgan shahar ma’lumotlari mavjud emas.", stage: "Mening holatim", stageHint: "Bu ma’lumot keyingi personalizatsiya uchun ishlatiladi.", stagePlaceholder: "Ixtiyoriy tanlang", interests: "Qiziqishlarim", interestsHint: "Siz uchun muhim mavzularni tanlang.", submit: "Profilni saqlash", pending: "Saqlanmoqda…",
      };

  function changeCountry(value: string) {
    const nextCountry: CountryCode = value === "UZ" ? "UZ" : "DE";
    setCountry(nextCountry);
    setStateCode("");
    setHomeLocationId("");
  }

  function changeRegion(value: string) {
    setStateCode(value);
    setHomeLocationId("");
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />

      <div>
        <label htmlFor="profile-display-name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{copy.name}</label>
        <input id="profile-display-name" name="displayName" type="text" defaultValue={context.profile?.displayName ?? ""} maxLength={80} autoComplete="name" className={controlClass} />
      </div>

      <section className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/45 sm:p-5" aria-labelledby="profile-location-heading">
        <div className="mb-5 flex gap-3">
          <SectionIcon kind="location" />
          <div><h2 id="profile-location-heading" className="font-bold text-slate-950 dark:text-white">{copy.location}</h2><p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy.locationHint}</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="profile-country" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{copy.country}</label><select id="profile-country" value={country} onChange={(event) => changeCountry(event.target.value)} className={controlClass}><option value="DE">{copy.germany}</option><option value="UZ">{copy.uzbekistan}</option></select></div>
          <div><label htmlFor="profile-region" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{copy.region}</label><select id="profile-region" value={stateCode} onChange={(event) => changeRegion(event.target.value)} className={controlClass}><option value="">{copy.regionPlaceholder}</option>{regions.map((region) => <option key={region.id} value={region.stateCode}>{region.stateName}</option>)}</select></div>
        </div>
        <div className="mt-4">
          <label htmlFor="profile-home-location" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{copy.city}</label>
          <select id="profile-home-location" name="homeLocationId" value={homeLocationId} onChange={(event) => setHomeLocationId(event.target.value)} disabled={!stateCode || cities.length === 0} className={controlClass}>
            <option value="">{copy.cityPlaceholder}</option>
            {cities.map((city) => <option key={city.id} value={city.id}>{city.cityName}</option>)}
          </select>
          {stateCode && cities.length === 0 && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{copy.noCities}</p>}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/45 sm:p-5" aria-labelledby="profile-stage-heading">
        <div className="mb-5 flex gap-3"><SectionIcon kind="stage" /><div><h2 id="profile-stage-heading" className="font-bold text-slate-950 dark:text-white">{copy.stage}</h2><p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy.stageHint}</p></div></div>
        <select id="profile-residency-stage" name="residencyStage" defaultValue={context.profile?.residencyStage ?? ""} className={controlClass} aria-label={copy.stage}><option value="">{copy.stagePlaceholder}</option>{residencyOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
      </section>

      <fieldset className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/45 sm:p-5">
        <legend className="sr-only">{copy.interests}</legend>
        <div className="mb-5 flex gap-3"><SectionIcon kind="interests" /><div><h2 className="font-bold text-slate-950 dark:text-white">{copy.interests}</h2><p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{copy.interestsHint}</p></div></div>
        <div className="grid gap-3 sm:grid-cols-2">
          {interestOptions.map((option) => (
            <label key={option.value} className="group relative flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50 has-[:checked]:text-emerald-900 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:has-[:checked]:border-emerald-500/70 dark:has-[:checked]:bg-emerald-500/10 dark:has-[:checked]:text-emerald-200">
              <input type="checkbox" name="interests" value={option.value} defaultChecked={selectedInterests.has(option.value)} className="size-4 accent-emerald-600" />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {state.error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">{state.error}</p>}
      <button type="submit" disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none dark:focus-visible:ring-offset-slate-900">{pending ? copy.pending : copy.submit}</button>
    </form>
  );
}
