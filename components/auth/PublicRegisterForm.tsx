"use client";

import {
  useActionState,
} from "react";

import {
  initialPublicRegisterState,
  publicRegisterAction,
} from "@/app/[locale]/id/register/actions";

type PublicRegisterFormProps = Readonly<{
  locale:
    | "uz"
    | "de";
}>;

export default function PublicRegisterForm({
  locale,
}: PublicRegisterFormProps) {
  const [
    state,
    formAction,
    pending,
  ] =
    useActionState(
      publicRegisterAction,
      initialPublicRegisterState,
    );

  const copy =
    locale === "de"
      ? {
          name:
            "Name (optional)",
          email:
            "E-Mail",
          password:
            "Passwort",
          passwordConfirm:
            "Passwort wiederholen",
          passwordHint:
            "Mindestens 12 Zeichen.",
          submit:
            "Vatandoshlar ID erstellen",
          pending:
            "Konto wird erstellt…",
        }
      : {
          name:
            "Ism (ixtiyoriy)",
          email:
            "E-mail",
          password:
            "Parol",
          passwordConfirm:
            "Parolni takrorlang",
          passwordHint:
            "Kamida 12 ta belgi.",
          submit:
            "Vatandoshlar ID yaratish",
          pending:
            "Akkaunt yaratilmoqda…",
        };

  return (
    <form
      action={formAction}
      className="space-y-5"
    >
      <input
        type="hidden"
        name="locale"
        value={locale}
      />

      <div>
        <label
          htmlFor="public-register-name"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.name}
        </label>

        <input
          id="public-register-name"
          name="displayName"
          type="text"
          autoComplete="name"
          maxLength={80}
          className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="public-register-email"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.email}
        </label>

        <input
          id="public-register-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="public-register-password"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.password}
        </label>

        <input
          id="public-register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
          className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {copy.passwordHint}
        </p>
      </div>

      <div>
        <label
          htmlFor="public-register-password-confirm"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.passwordConfirm}
        </label>

        <input
          id="public-register-password-confirm"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
          className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? copy.pending
          : copy.submit}
      </button>
    </form>
  );
}
