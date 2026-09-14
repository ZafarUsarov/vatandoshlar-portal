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
          firstName:
            "Vorname",
          lastName:
            "Nachname",
          email:
            "E-Mail",
          password:
            "Passwort",
          passwordConfirm:
            "Passwort wiederholen",
          passwordHint:
            "Mindestens 8 Zeichen.",
          submit:
            "Konto erstellen",
          pending:
            "Konto wird erstellt…",
        }
      : {
          firstName:
            "Ism",
          lastName:
            "Familiya",
          email:
            "E-mail",
          password:
            "Parol",
          passwordConfirm:
            "Parolni takrorlang",
          passwordHint:
            "Kamida 8 ta belgi.",
          submit:
            "Hisob yaratish",
          pending:
            "Hisob yaratilmoqda…",
        };

  const inputClassName =
    "min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-5"
    >
      <input
        type="hidden"
        name="locale"
        value={locale}
      />

      <div>
        <label
          htmlFor="public-register-first-name"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.firstName}
        </label>
        <input
          id="public-register-first-name"
          name="firstName"
          type="text"
          autoComplete="given-name"
          maxLength={40}
          required
          className={inputClassName}
        />
      </div>

      <div>
        <label
          htmlFor="public-register-last-name"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          {copy.lastName}
        </label>
        <input
          id="public-register-last-name"
          name="lastName"
          type="text"
          autoComplete="family-name"
          maxLength={40}
          required
          className={inputClassName}
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
          className={inputClassName}
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
          minLength={8}
          required
          className={inputClassName}
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
          minLength={8}
          required
          className={inputClassName}
        />
      </div>

      {state.error && (
        <p
          role="alert"
          aria-live="polite"
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
