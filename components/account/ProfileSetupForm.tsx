"use client";

import { useActionState } from "react";
import { initialProfileSetupState, saveProfileSetupAction } from "@/app/[locale]/account/profile/actions";
import type { Location } from "@/types/location";
import type { PublicUserContext } from "@/types/user";

type Option = Readonly<{ value: string; label: string }>;

type Props = Readonly<{
  locale: "uz" | "de";
  context: PublicUserContext;
  cities: ReadonlyArray<Location>;
  residencyOptions: ReadonlyArray<Option>;
  interestOptions: ReadonlyArray<Option>;
}>;

export default function ProfileSetupForm({
  locale,
  context,
  cities,
  residencyOptions,
  interestOptions,
}: Props) {
  const [state, formAction, pending] = useActionState(
    saveProfileSetupAction,
    initialProfileSetupState,
  );

  const selectedInterests = new Set(context.interests);

  const copy = locale === "de"
    ? { name: "Name", city: "Meine Stadt", cityPlaceholder: "Stadt auswählen", stage: "Meine Situation", stagePlaceholder: "Optional auswählen", interests: "Meine Interessen", submit: "Profil speichern", pending: "Wird gespeichert…" }
    : { name: "Ism", city: "Mening shahrim", cityPlaceholder: "Shaharni tanlang", stage: "Mening holatim", stagePlaceholder: "Ixtiyoriy tanlang", interests: "Qiziqishlarim", submit: "Profilni saqlash", pending: "Saqlanmoqda…" };

  return (
    <form action={formAction} className="space-y-7">
      <input type="hidden" name="locale" value={locale} />

      <div>
        <label htmlFor="profile-display-name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {copy.name}
        </label>
        <input
          id="profile-display-name"
          name="displayName"
          type="text"
          defaultValue={context.profile?.displayName ?? ""}
          maxLength={80}
          autoComplete="name"
          className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="profile-home-location" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {copy.city}
        </label>
        <select
          id="profile-home-location"
          name="homeLocationId"
          defaultValue={context.profile?.homeLocationId ?? ""}
          className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="">{copy.cityPlaceholder}</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.cityName}, {city.stateName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="profile-residency-stage" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {copy.stage}
        </label>
        <select
          id="profile-residency-stage"
          name="residencyStage"
          defaultValue={context.profile?.residencyStage ?? ""}
          className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="">{copy.stagePlaceholder}</option>
          {residencyOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          {copy.interests}
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {interestOptions.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
            >
              <input
                type="checkbox"
                name="interests"
                value={option.value}
                defaultChecked={selectedInterests.has(option.value)}
                className="size-4 accent-emerald-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {state.error && (
        <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? copy.pending : copy.submit}
      </button>
    </form>
  );
}
